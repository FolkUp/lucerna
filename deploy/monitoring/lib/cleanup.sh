#!/bin/bash
# cleanup.sh — state file rotation for FolkUp monitoring
# Cron: 0 3 * * 0 /home/deploy/monitoring/lib/cleanup.sh >> /home/deploy/logs/cleanup.log 2>&1
#
# Policy:
#   - Files older than 90 days → gzip
#   - Files older than 365 days → delete
#   - Applies to ~/state/gh-traffic/ JSONL archives
set -euo pipefail

STATE_DIR="${STATE_DIR:-/home/deploy/state}"
GZIP_DAYS=90
DELETE_DAYS=365

log() {
  echo "$(date -u '+%Y-%m-%d %H:%M:%S UTC') $1"
}

# Compress JSONL files older than 90 days (skip already compressed)
compress_old() {
  local dir="$1"
  if [ ! -d "$dir" ]; then
    return
  fi
  find "$dir" -name "*.jsonl" -mtime +"$GZIP_DAYS" -print0 | while IFS= read -r -d '' file; do
    log "GZIP: $file"
    gzip "$file"
  done
}

# Delete compressed files older than 365 days
delete_ancient() {
  local dir="$1"
  if [ ! -d "$dir" ]; then
    return
  fi
  find "$dir" -name "*.jsonl.gz" -mtime +"$DELETE_DAYS" -print0 | while IFS= read -r -d '' file; do
    log "DELETE: $file"
    rm -f "$file"
  done
}

log "=== State cleanup started ==="

# GH Traffic archives
compress_old "${STATE_DIR}/gh-traffic"
delete_ancient "${STATE_DIR}/gh-traffic"

# Report disk usage
log "State dir usage: $(du -sh "$STATE_DIR" 2>/dev/null | cut -f1)"

log "=== State cleanup complete ==="
