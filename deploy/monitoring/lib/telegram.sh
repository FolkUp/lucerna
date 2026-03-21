#!/bin/bash
# telegram.sh — shared Telegram alerting library for FolkUp monitoring scripts
# Source this file: . /home/deploy/monitoring/lib/telegram.sh
#
# Provides:
#   send_telegram "message"          — send HTML message to System topic
#   should_alert STATE_FILE COUNT    — debounce check (30min cooldown, 3x escalation)
#   clear_debounce STATE_FILE        — clear debounce state (recovery)
#
# Requires: TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID set before sourcing,
#           or reads from /opt/folkup/secrets/telegram-bot.env via sudo cat.

# --- Load Telegram credentials (if not already set) ---
if [ -z "${TELEGRAM_BOT_TOKEN:-}" ] || [ -z "${TELEGRAM_CHAT_ID:-}" ]; then
  _tg_env=$(sudo cat /opt/folkup/secrets/telegram-bot.env 2>/dev/null || echo "")
  TELEGRAM_BOT_TOKEN=$(echo "$_tg_env" | grep TELEGRAM_BOT_TOKEN | sed 's/^[^=]*=//')
  TELEGRAM_CHAT_ID=$(echo "$_tg_env" | grep TELEGRAM_CHAT_ID | sed 's/^[^=]*=//')
  unset _tg_env
fi

TELEGRAM_THREAD_ID="${TELEGRAM_THREAD_ID:-9}"  # System topic in FolkUp Deploy
DEBOUNCE_COOLDOWN="${DEBOUNCE_COOLDOWN:-1800}"  # 30 minutes
ESCALATION_MULTIPLIER="${ESCALATION_MULTIPLIER:-3}"

# --- Send message to Telegram ---
# Usage: send_telegram "HTML formatted message"
send_telegram() {
  local text="$1"
  if [ -n "${TELEGRAM_BOT_TOKEN:-}" ] && [ -n "${TELEGRAM_CHAT_ID:-}" ]; then
    curl -sf -X POST "https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage" \
      -d "chat_id=${TELEGRAM_CHAT_ID}" \
      -d "message_thread_id=${TELEGRAM_THREAD_ID}" \
      -d "parse_mode=HTML" \
      --data-urlencode "text=${text}" \
      > /dev/null 2>&1 || echo "$(date -u '+%Y-%m-%d %H:%M:%S UTC') WARN: Telegram send failed"
  else
    echo "$(date -u '+%Y-%m-%d %H:%M:%S UTC') WARN: Telegram credentials not available"
  fi
}

# --- Debounce logic ---
# Usage: should_alert /path/to/state_file current_count
# Returns 0 (should alert) or 1 (suppress)
# Each script uses its OWN state file to avoid race conditions.
should_alert() {
  local state_file="$1"
  local current_count="$2"
  local now
  now=$(date +%s)

  # Ensure state directory exists
  mkdir -p "$(dirname "$state_file")"

  # Use flock to prevent race conditions
  (
    flock -n 200 || { echo "$(date -u) WARN: flock failed on $state_file"; return 0; }

    if [ ! -f "$state_file" ]; then
      echo "${now}:${current_count}" > "$state_file"
      return 0
    fi

    local last_ts last_count
    last_ts=$(cut -d: -f1 "$state_file")
    last_count=$(cut -d: -f2 "$state_file")
    local elapsed=$(( now - last_ts ))

    # Cooldown expired
    if [ "$elapsed" -ge "$DEBOUNCE_COOLDOWN" ]; then
      echo "${now}:${current_count}" > "$state_file"
      return 0
    fi

    # Escalation: count >= Nx baseline
    if [ "$current_count" -ge $(( last_count * ESCALATION_MULTIPLIER )) ]; then
      echo "${now}:${current_count}" > "$state_file"
      return 0
    fi

    # Suppress
    return 1
  ) 200>"${state_file}.lock"
}

# --- Clear debounce (call on recovery) ---
# Usage: clear_debounce /path/to/state_file
clear_debounce() {
  local state_file="$1"
  rm -f "$state_file" "${state_file}.lock"
}
