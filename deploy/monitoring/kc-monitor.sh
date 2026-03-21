#!/bin/bash
# kc-monitor.sh — Keycloak event monitor with non-Андрей user alerting
# Cron: */15 * * * * /home/deploy/monitoring/kc-monitor.sh >> /home/deploy/logs/kc-monitor.log 2>&1
#
# Checks: (1) KC health (2) Login errors spike (3) Non-whitelisted user logins
# Uses shared lib/telegram.sh for alerting and debounce.
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
# shellcheck source=lib/telegram.sh
. "${SCRIPT_DIR}/lib/telegram.sh"

# --- Configuration ---
THRESHOLD=10  # Alert if more than N login errors in last 15 min
STATE_FILE="/home/deploy/state/kc-monitor.state"
WINDOW_MINUTES=15
ALLOWED_USERS_FILE="/home/deploy/state/kc-allowed-users.txt"

log() {
  echo "$(date -u '+%Y-%m-%d %H:%M:%S UTC') $1"
}

# --- Check KC health ---
if ! curl -sf http://localhost:8080/realms/folkup > /dev/null 2>&1; then
  log "WARN: KC not healthy, skipping check"
  send_telegram "<b>[KC] Health Check FAILED</b>

Keycloak unreachable at $(date -u '+%H:%M UTC')
Action: check container status
---
$(date -u '+%Y-%m-%d %H:%M UTC')"
  exit 0
fi

# --- Get admin token (single sudo read to minimize /proc exposure) ---
_kc_env=$(sudo cat /opt/folkup/secrets/keycloak.env 2>/dev/null || echo "")
KC_USER=$(echo "$_kc_env" | grep KC_BOOTSTRAP_ADMIN_USERNAME | sed 's/^[^=]*=//')
KC_PASS=$(echo "$_kc_env" | grep KC_BOOTSTRAP_ADMIN_PASSWORD | sed 's/^[^=]*=//')
unset _kc_env
TOKEN=$(curl -s http://localhost:8080/realms/master/protocol/openid-connect/token \
  -d "grant_type=password" -d "client_id=admin-cli" \
  -d "username=$KC_USER" -d "password=$KC_PASS" | \
  python3 -c "import sys,json;print(json.load(sys.stdin).get('access_token',''))" 2>/dev/null)

if [ -z "$TOKEN" ]; then
  log "ERROR: Failed to get admin token"
  exit 1
fi

# --- Time window ---
SINCE=$(python3 -c "from datetime import datetime,timedelta,timezone;print((datetime.now(timezone.utc)-timedelta(minutes=${WINDOW_MINUTES})).strftime('%Y-%m-%dT%H:%M:%S.000Z'))")

# ==========================================================
# CHECK 1: Login errors spike
# ==========================================================

ERRORS=$(curl -s "http://localhost:8080/admin/realms/folkup/events?type=LOGIN_ERROR&dateFrom=$SINCE&max=100" \
  -H "Authorization: Bearer $TOKEN")

ERROR_COUNT=$(echo "$ERRORS" | python3 -c "import sys,json;print(len(json.load(sys.stdin)))" 2>/dev/null || echo "0")

log "Login errors (last ${WINDOW_MINUTES}m): $ERROR_COUNT"

if [ "$ERROR_COUNT" -gt "$THRESHOLD" ]; then
  NOW_UTC=$(date -u '+%Y-%m-%d %H:%M UTC')
  ALERT_TEXT=$(echo "$ERRORS" | NOW_UTC="$NOW_UTC" python3 -c "
import sys,json,os
from collections import Counter
events=json.load(sys.stdin)
ips=Counter(e.get('ipAddress','?') for e in events)
errors=Counter(e.get('error','?') for e in events)
lines=['<b>[KC] Login Error Spike</b>','']
lines.append(f'{len(events)} errors in last 15 min')
lines.append('')
lines.append('<b>IPs:</b>')
for ip,cnt in ips.most_common(5):
    lines.append(f'  {ip}: {cnt}')
lines.append('')
lines.append('<b>Errors:</b>')
for err,cnt in errors.most_common(5):
    lines.append(f'  {err}: {cnt}')
lines.append('---')
lines.append(os.environ['NOW_UTC'])
print(chr(10).join(lines))
" 2>/dev/null || echo "<b>[KC] Login Error Spike</b>
${ERROR_COUNT} errors in last ${WINDOW_MINUTES}m (parse error)
---
$(date -u '+%Y-%m-%d %H:%M UTC')")

  if should_alert "$STATE_FILE" "$ERROR_COUNT"; then
    send_telegram "$ALERT_TEXT"
    log "Alert sent: login error spike"
  else
    log "Alert suppressed (debounce active)"
  fi
else
  if [ -f "$STATE_FILE" ]; then
    log "Errors below threshold, clearing debounce"
    clear_debounce "$STATE_FILE"
  fi
fi

# ==========================================================
# CHECK 2: Successful logins — non-whitelisted user detection
# ==========================================================

LOGINS=$(curl -s "http://localhost:8080/admin/realms/folkup/events?type=LOGIN&dateFrom=$SINCE&max=100" \
  -H "Authorization: Bearer $TOKEN")

LOGIN_COUNT=$(echo "$LOGINS" | python3 -c "import sys,json;print(len(json.load(sys.stdin)))" 2>/dev/null || echo "0")
log "Successful logins (last ${WINDOW_MINUTES}m): $LOGIN_COUNT"

# Load whitelist (default: anklem only)
if [ -f "$ALLOWED_USERS_FILE" ]; then
  ALLOWED_USERS=$(cat "$ALLOWED_USERS_FILE")
else
  ALLOWED_USERS="anklem"
  log "WARN: ${ALLOWED_USERS_FILE} not found, using default whitelist (anklem)"
fi

# Check each login against whitelist — IMMEDIATE alert for unknown users (no debounce)
# SECURITY: ALLOWED_USERS passed via env (not heredoc interpolation) to prevent injection
if [ "$LOGIN_COUNT" -gt 0 ]; then
  UNKNOWN_LOGINS=$(echo "$LOGINS" | ALLOWED="$ALLOWED_USERS" python3 -c "
import sys, json, os
allowed = set(os.environ['ALLOWED'].strip().split())
events = json.load(sys.stdin)
unknown = []
for e in events:
    user = e.get('details', {}).get('username', e.get('userId', '?'))
    if user not in allowed:
        unknown.append({
            'user': user,
            'ip': e.get('ipAddress', '?'),
            'time': e.get('time', 0),
            'client': e.get('clientId', '?')
        })
if unknown:
    lines = ['<b>[KC] UNKNOWN USER LOGIN</b>', '']
    for u in unknown:
        lines.append(f'User: <b>{u[\"user\"]}</b>')
        lines.append(f'IP: {u[\"ip\"]}')
        lines.append(f'Client: {u[\"client\"]}')
        lines.append('')
    lines.append(f'{len(unknown)} non-whitelisted login(s)')
    lines.append('Action: verify identity immediately')
    lines.append('---')
    print(chr(10).join(lines))
else:
    print('')
" 2>/dev/null || echo "")

  if [ -n "$UNKNOWN_LOGINS" ]; then
    # IMMEDIATE alert — no debounce for unknown user logins (security critical)
    TIMESTAMP=$(date -u '+%Y-%m-%d %H:%M UTC')
    send_telegram "${UNKNOWN_LOGINS}${TIMESTAMP}"
    log "SECURITY ALERT: Non-whitelisted user login detected"
  fi
fi
