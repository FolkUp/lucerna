#!/bin/bash
# gh-traffic-archive.sh — daily GitHub Traffic API archiver
# Cron: 0 6 * * * /home/deploy/monitoring/gh-traffic-archive.sh >> /home/deploy/logs/gh-traffic.log 2>&1
#
# Archives clone/view/referrer data for all FolkUp repos.
# GitHub retains traffic data only 14 days — this script preserves it.
# Format: JSONL (one JSON object per line per day)
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
# shellcheck source=lib/telegram.sh
. "${SCRIPT_DIR}/lib/telegram.sh"

STATE_DIR="/home/deploy/state/gh-traffic"
DEBOUNCE_FILE="/home/deploy/state/gh-traffic-alert.state"
TODAY=$(date -u '+%Y-%m-%d')

# Read GitHub PAT
GH_TOKEN=$(sudo cat /opt/folkup/secrets/github-traffic.env 2>/dev/null | grep GH_TOKEN | cut -d= -f2 || echo "")
if [ -z "$GH_TOKEN" ]; then
  echo "$(date -u) ERROR: GH_TOKEN not found in /opt/folkup/secrets/github-traffic.env"
  send_telegram "<b>[GH] Traffic Archive FAILED</b>
GH_TOKEN not found. Check /opt/folkup/secrets/github-traffic.env
---
${TODAY}"
  exit 1
fi

# Repo list (FolkUp org + anklemPT personal)
# Update this list when repos are created/deleted
REPOS=(
  "FolkUp/lucerna"
  "FolkUp/folkup-docs"
  "FolkUp/folkup-auth"
  "FolkUp/folkup-app"
  "FolkUp/folkup-quest"
  "FolkUp/setubal-encyclopedia"
  "FolkUp/retro-tech"
  "FolkUp/barnes-encyclopedia"
  "FolkUp/folkup-padel"
  "FolkUp/portugal-mushrooms"
  "FolkUp/tarot-hub"
  "FolkUp/ecosystem-dashboard"
  "anklemPT/dayforge"
  "anklemPT/folkup-landing"
  "anklemPT/claudeskill-loki-mode"
)
# Note: not all 24 repos listed — add remaining private repos as needed.
# Only repos with traffic data matter (public + recently active private).

log() {
  echo "$(date -u '+%Y-%m-%d %H:%M:%S UTC') $1"
}

gh_api() {
  local endpoint="$1"
  curl -sf -H "Authorization: Bearer ${GH_TOKEN}" \
    -H "Accept: application/vnd.github+json" \
    "https://api.github.com${endpoint}" 2>/dev/null || echo "{}"
}

mkdir -p "$STATE_DIR"

total_clones=0
total_views=0
top_repos=""
errors=0

for repo in "${REPOS[@]}"; do
  repo_slug="${repo//\//-}"  # FolkUp/lucerna -> FolkUp-lucerna

  # Clones
  clones_data=$(gh_api "/repos/${repo}/traffic/clones")
  if echo "$clones_data" | python3 -c "import sys,json; json.load(sys.stdin)" 2>/dev/null; then
    echo "{\"date\":\"${TODAY}\",\"data\":${clones_data}}" >> "${STATE_DIR}/${repo_slug}-clones.jsonl"
    repo_clones=$(echo "$clones_data" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('count',0))" 2>/dev/null || echo "0")
    total_clones=$((total_clones + repo_clones))
  else
    log "WARN: Failed to fetch clones for ${repo}"
    errors=$((errors + 1))
  fi

  # Views
  views_data=$(gh_api "/repos/${repo}/traffic/views")
  if echo "$views_data" | python3 -c "import sys,json; json.load(sys.stdin)" 2>/dev/null; then
    echo "{\"date\":\"${TODAY}\",\"data\":${views_data}}" >> "${STATE_DIR}/${repo_slug}-views.jsonl"
    repo_views=$(echo "$views_data" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('count',0))" 2>/dev/null || echo "0")
    total_views=$((total_views + repo_views))
    if [ "$repo_views" -gt 0 ] || [ "${repo_clones:-0}" -gt 0 ]; then
      top_repos="${top_repos}  ${repo}: ${repo_clones:-0}c/${repo_views}v\n"
    fi
  else
    log "WARN: Failed to fetch views for ${repo}"
    errors=$((errors + 1))
  fi

  # Referrers
  ref_data=$(gh_api "/repos/${repo}/traffic/popular/referrers")
  if echo "$ref_data" | python3 -c "import sys,json; json.load(sys.stdin)" 2>/dev/null; then
    echo "{\"date\":\"${TODAY}\",\"data\":${ref_data}}" >> "${STATE_DIR}/${repo_slug}-referrers.jsonl"
  fi

  # Rate-limit courtesy: small delay between repos
  sleep 0.5
done

log "Daily totals: ${total_clones} clones, ${total_views} views, ${errors} errors"

# Daily summary to Telegram (always, even if zero — confirms script is running)
summary="<b>[GH] Daily Traffic Summary</b>

Clones: ${total_clones} | Views: ${total_views}
Repos: ${#REPOS[@]} checked, ${errors} errors"

if [ -n "$top_repos" ]; then
  summary="${summary}

<b>Active repos:</b>
$(echo -e "$top_repos")"
fi

summary="${summary}
---
${TODAY} 06:00 UTC"

send_telegram "$summary"
log "Summary sent to Telegram"
