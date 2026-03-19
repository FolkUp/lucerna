#!/usr/bin/env bash
# Load CI notification secrets from runner-local config.
# Secret paths are configured on the runner, not in this repo.
# See: deploy/setup-server.sh for initial provisioning.
set -euo pipefail

SECRETS_DIR="${CI_SECRETS_DIR:-/run/secrets}"

for f in ci-notify.env telegram-bot.env; do
  if [ -f "$SECRETS_DIR/$f" ]; then
    sudo cat "$SECRETS_DIR/$f"
  fi
done
