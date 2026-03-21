#!/bin/bash
# nginx-error-alert.sh — alerting on 4xx/5xx spikes in nginx access logs
# Cron: */10 * * * * /home/deploy/monitoring/nginx-error-alert.sh >> /home/deploy/logs/nginx-errors.log 2>&1
#
# Reads nginx access log, counts error responses in last 10 minutes.
# Alerts if 4xx > THRESHOLD_4XX or 5xx > THRESHOLD_5XX.
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
# shellcheck source=lib/telegram.sh
. "${SCRIPT_DIR}/lib/telegram.sh"

# --- Configuration ---
# Adjust log path based on actual VPS setup:
# Option A: Docker volume mounted to host
NGINX_LOG="/home/deploy/logs/nginx-access.log"
# Option B: Docker logs (requires sudo docker)
# Uncomment if using docker logs instead of mounted volume:
# USE_DOCKER_LOGS=true
# DOCKER_CONTAINER="nginx-proxy"

THRESHOLD_4XX=50
THRESHOLD_5XX=5
STATE_FILE="/home/deploy/state/nginx-errors.state"
WINDOW_MINUTES=10

log() {
  echo "$(date -u '+%Y-%m-%d %H:%M:%S UTC') $1"
}

# --- Get recent log lines ---
get_recent_logs() {
  if [ "${USE_DOCKER_LOGS:-false}" = "true" ]; then
    # Docker logs approach (needs sudo docker in sudoers)
    sudo docker logs "${DOCKER_CONTAINER}" --since "${WINDOW_MINUTES}m" 2>/dev/null
  elif [ -f "$NGINX_LOG" ]; then
    # File-based approach: filter by timestamp in last N minutes
    local since
    since=$(date -u -d "${WINDOW_MINUTES} minutes ago" '+%d/%b/%Y:%H:%M' 2>/dev/null || \
            date -u -v-"${WINDOW_MINUTES}"M '+%d/%b/%Y:%H:%M' 2>/dev/null || echo "")
    if [ -n "$since" ]; then
      # nginx default log format: IP - - [timestamp] "request" status ...
      awk -v since="$since" '$0 ~ since || printed { printed=1; print }' "$NGINX_LOG" 2>/dev/null
    else
      # Fallback: last 1000 lines (approximate 10 min at low traffic)
      tail -n 1000 "$NGINX_LOG" 2>/dev/null
    fi
  else
    log "WARN: nginx log not found at ${NGINX_LOG}"
    echo ""
  fi
}

# --- Count error codes ---
recent_logs=$(get_recent_logs)

if [ -z "$recent_logs" ]; then
  log "No recent logs found (${WINDOW_MINUTES}m window)"
  exit 0
fi

# Extract HTTP status codes (field 9 in default nginx log format)
# Whitelist: skip 401 on /oauth2/ (normal auth redirect), 404 on favicon.ico
count_4xx=$(echo "$recent_logs" | awk '{
  status=$9;
  url=$7;
  if (status ~ /^4[0-9][0-9]$/) {
    if (status == 401 && url ~ /oauth2/) next;
    if (status == 404 && url ~ /favicon/) next;
    count++
  }
} END { print count+0 }')

count_5xx=$(echo "$recent_logs" | awk '{
  status=$9;
  if (status ~ /^5[0-9][0-9]$/) count++
} END { print count+0 }')

log "Last ${WINDOW_MINUTES}m: 4xx=${count_4xx}, 5xx=${count_5xx}"

# --- Alert logic ---
alert_needed=false
alert_type=""

if [ "$count_5xx" -gt "$THRESHOLD_5XX" ]; then
  alert_needed=true
  alert_type="5xx"
fi

if [ "$count_4xx" -gt "$THRESHOLD_4XX" ]; then
  alert_needed=true
  alert_type="${alert_type:+${alert_type}+}4xx"
fi

if [ "$alert_needed" = "true" ]; then
  total_errors=$((count_4xx + count_5xx))

  # Build top URLs and IPs
  # mawk-compatible: output unsorted, pipe to sort (PROCINFO is gawk-only)
  top_urls=$(echo "$recent_logs" | awk '{
    status=$9;
    if (status ~ /^[45][0-9][0-9]$/) urls[$7" ("status")"]++
  } END {
    for (u in urls) print urls[u] "\t" u
  }' 2>/dev/null | sort -rn | head -5 | awk '{ print "  "$2": "$1 }' || echo "  (parse error)")

  top_ips=$(echo "$recent_logs" | awk '{
    status=$9;
    if (status ~ /^[45][0-9][0-9]$/) ips[$1]++
  } END {
    for (ip in ips) print ips[ip] "\t" ip
  }' 2>/dev/null | sort -rn | head -5 | awk '{ print "  "$2": "$1 }' || echo "  (parse error)")

  alert_text="<b>[NGX] Error Spike (${alert_type})</b>

4xx: ${count_4xx} | 5xx: ${count_5xx} (last ${WINDOW_MINUTES}m)

<b>Top URLs:</b>
${top_urls}

<b>Top IPs:</b>
${top_ips}
---
$(date -u '+%Y-%m-%d %H:%M UTC')"

  if should_alert "$STATE_FILE" "$total_errors"; then
    send_telegram "$alert_text"
    log "Alert sent: ${alert_type} spike"
  else
    log "Alert suppressed (debounce active)"
  fi
else
  # Recovery: clear debounce if errors are below threshold
  if [ -f "$STATE_FILE" ]; then
    log "Errors below threshold, clearing debounce"
    clear_debounce "$STATE_FILE"
  fi
fi
