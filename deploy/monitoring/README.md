# FolkUp Monitoring Scripts

Scripts for INFR-127: Security & Monitoring Perimeter.
All scripts run as `deploy` user on VPS. No root required.

## Deploy to VPS

```bash
# From local machine (Windows):
scp -r deploy/monitoring/ deploy@46.225.107.2:~/monitoring/

# On VPS:
chmod +x ~/monitoring/*.sh ~/monitoring/lib/*.sh
sed -i 's/\r$//' ~/monitoring/*.sh ~/monitoring/lib/*.sh  # Fix Windows line endings
mkdir -p ~/state/gh-traffic ~/logs

# Create allowed users whitelist (default: anklem)
echo "anklem" > ~/state/kc-allowed-users.txt
```

## Migration from old kc-monitor.sh

If upgrading from the old `~/kc-monitor.sh`:

```bash
# 1. Remove old cron entry
crontab -l | grep -v 'kc-monitor.sh' | crontab -

# 2. Clean old state files
rm -f /tmp/kc-monitor-debounce

# 3. Back up and remove old script
mv ~/kc-monitor.sh ~/kc-monitor.sh.bak

# 4. Add new cron entries (see Cron Entries section below)
```

## Cron Entries

```cron
# GH Traffic archive (daily 06:00 UTC)
0 6 * * * /home/deploy/monitoring/gh-traffic-archive.sh >> /home/deploy/logs/gh-traffic.log 2>&1

# nginx error alerting (every 10 min)
*/10 * * * * /home/deploy/monitoring/nginx-error-alert.sh >> /home/deploy/logs/nginx-errors.log 2>&1

# KC event monitor (every 15 min)
*/15 * * * * /home/deploy/monitoring/kc-monitor.sh >> /home/deploy/logs/kc-monitor.log 2>&1

# State cleanup (weekly, Sunday 03:00 UTC)
0 3 * * 0 /home/deploy/monitoring/lib/cleanup.sh >> /home/deploy/logs/cleanup.log 2>&1
```

## Prerequisites

- `/opt/folkup/secrets/telegram-bot.env` — TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID
- `/opt/folkup/secrets/github-traffic.env` — GH_TOKEN (fine-grained PAT, metadata:read)
- `/opt/folkup/secrets/keycloak.env` — KC_BOOTSTRAP_ADMIN_USERNAME and KC_BOOTSTRAP_ADMIN_PASSWORD
- `~/state/kc-allowed-users.txt` — one username per line (default: anklem)
- nginx access log accessible at `~/logs/nginx-access.log` (mounted volume or symlink)

## nginx Rate-Limit Deploy

OAuth2 login rate-limit requires a `limit_req_zone` in http context. Since nginx-proxy
auto-generates config, the zone must be in a persistent conf.d file (NOT `docker cp` — lost on recreate).

```bash
# 1. Copy conf to host path accessible by nginx-proxy volume:
sudo cp deploy/snippets/custom-rate-limits.conf /home/deploy/nginx-custom/custom-rate-limits.conf
sudo sed -i 's/\r$//' /home/deploy/nginx-custom/custom-rate-limits.conf

# 2. Add volume mount to nginx-proxy docker-compose (in nginx-proxy service):
#    volumes:
#      - /home/deploy/nginx-custom:/etc/nginx/conf.d/custom:ro
#    (or mount individual file to /etc/nginx/conf.d/custom-rate-limits.conf)

# 3. Test and reload:
sudo docker exec nginx-proxy nginx -t && sudo docker exec nginx-proxy nginx -s reload
```

**Important:** `docker cp` does NOT persist across container recreates. Use a volume mount.

Rollback: remove volume mount from docker-compose, restart nginx-proxy.

## Scripts

| Script | Cron | Purpose |
|--------|------|---------|
| `lib/telegram.sh` | (library) | Shared send + debounce functions |
| `lib/cleanup.sh` | Weekly | State file rotation (90d gzip, 365d delete) |
| `gh-traffic-archive.sh` | Daily | GitHub Traffic API → JSONL archive |
| `nginx-error-alert.sh` | */10 | 4xx/5xx spike alerting |
| `kc-monitor.sh` | */15 | KC login errors + non-whitelisted user alerting |

## Telegram Alert Categories

| Tag | Source |
|-----|--------|
| `[GH]` | GitHub traffic, webhooks |
| `[NGX]` | nginx errors, suspicious patterns |
| `[KC]` | Keycloak login events |
| `[SYS]` | Health, disk, SSL |

## Rollback

- **Cron jobs:** `crontab -e`, comment out or remove line
- **Scripts:** Remove from ~/monitoring/, no system impact
- **nginx rate-limit:** Remove `limit_req` from location block, `nginx -t && nginx -s reload`
