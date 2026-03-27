# Bastion Nginx Configuration Changes — VPS Runbook

**Target:** 46.225.107.2
**Date:** 2026-03-10
**Executor:** Andrey
**Estimated time:** 45-60 minutes

---

## Pre-flight Checks

```bash
# 1. SSH to VPS
ssh root@46.225.107.2

# 2. Check nginx-proxy container status
docker ps | grep nginx-proxy

# 3. Verify current nginx configs exist
ls -lh ~/*/nginx-*.conf

# 4. Create backup directory
mkdir -p ~/nginx-backups-2026-03-10
cd ~/nginx-backups-2026-03-10

# 5. Backup ALL nginx configs
cp /etc/nginx/vhost.d/ecosystem.folkup.app ecosystem.folkup.app.bak 2>/dev/null || echo "No vhost.d/ecosystem config"
cp ~/retro-tech/nginx-retro-tech.conf retro-tech.bak
cp ~/setubal-encyclopedia/nginx-setubal.conf setubal.bak
cp ~/padel/nginx-padel.conf padel.bak
cp ~/mushrooms/nginx-mushrooms.conf mushrooms.bak
cp ~/tarot-hub/nginx-tarot.conf tarot.bak
cp ~/comic-factory/nginx-comic.conf comic.bak
cp ~/folkup-quest/nginx-quest.conf quest.bak
cp ~/lucerna/nginx-lucerna.conf lucerna.bak
cp ~/folkup-docs/nginx-docs.conf docs.bak
cp ~/folkup-auth/nginx-auth.conf auth.bak
cp ~/barnes/nginx-barnes.conf barnes.bak
cp ~/dayforge/nginx-dayforge.conf dayforge.bak
cp ~/umami/nginx-umami.conf umami.bak 2>/dev/null || echo "No umami config"

# 6. Verify backups
ls -lh
echo "✓ Backups created. Proceed with changes."
```

---

## Change #1: ecosystem.folkup.app — Add X-Robots-Tag

**Why:** Defense in depth for OAuth-protected site (already has Keycloak, but search engines shouldn't try to index login pages)

```bash
# Check current config location
ls -lh /etc/nginx/vhost.d/ecosystem.folkup.app
ls -lh ~/ecosystem-dashboard/nginx-ecosystem.conf

# Most likely location: vhost.d (nginx-proxy level)
# If file doesn't exist, create it
cat > /tmp/ecosystem-robots.conf <<'EOF'
# X-Robots-Tag for OAuth-protected dashboard
add_header X-Robots-Tag "noindex, nofollow, noarchive" always;
EOF

# Deploy
sudo cp /tmp/ecosystem-robots.conf /etc/nginx/vhost.d/ecosystem.folkup.app

# Test
docker exec nginx-proxy nginx -t

# Reload
docker exec nginx-proxy nginx -s reload

# Verify
curl -I https://ecosystem.folkup.app 2>&1 | grep -i "x-robots-tag"
# Expected: X-Robots-Tag: noindex, nofollow, noarchive

echo "✓ Change #1 complete"
```

---

## Change #2: retro-tech — Remove Legacy OAuth Blocks (INFR-073)

**Why:** Site moved from Tier 2 (OAuth) to Tier 1 (public) on 06.03.2026. Legacy auth_request blocks may still exist.

```bash
# Check for OAuth remnants
grep -n "auth_request\|oauth2" ~/retro-tech/nginx-retro-tech.conf

# If found, show context
grep -B2 -A2 "auth_request\|oauth2" ~/retro-tech/nginx-retro-tech.conf

# Document findings (copy output to local notes)
# Expected: NO matches (should be clean)
# If matches found, remove blocks like:
#   auth_request /oauth2/auth;
#   error_page 401 = /oauth2/sign_in;
#   proxy_pass http://oauth2-proxy-app:4180;

# If cleanup needed (ONLY if grep found matches):
# sed -i.legacy '/auth_request/d' ~/retro-tech/nginx-retro-tech.conf
# sed -i.legacy '/oauth2/d' ~/retro-tech/nginx-retro-tech.conf
# docker restart retro-tech
# docker logs retro-tech --tail 20

# Test site accessibility
curl -I https://dialup.folkup.city 2>&1 | head -1
# Expected: HTTP/2 200

echo "✓ Change #2 complete (documented)"
```

---

## Change #3: HSTS Deduplication — 11 Domains (4 Batches)

**Why:** Duplicate Strict-Transport-Security headers with different max-age values. Keep nginx-proxy level, remove site level.

### Batch 1: setubal, padel, cogumelos

```bash
# 1. setubal.folkup.city
grep -n "Strict-Transport-Security" ~/setubal-encyclopedia/nginx-setubal.conf
sed -i.hsts '/add_header Strict-Transport-Security/d' ~/setubal-encyclopedia/nginx-setubal.conf
docker restart setubal-encyclopedia
sleep 3
docker logs setubal-encyclopedia --tail 10

# 2. padel.folkup.fit
grep -n "Strict-Transport-Security" ~/padel/nginx-padel.conf
sed -i.hsts '/add_header Strict-Transport-Security/d' ~/padel/nginx-padel.conf
docker restart padel
sleep 3
docker logs padel --tail 10

# 3. cogumelos.folkup.fit
grep -n "Strict-Transport-Security" ~/mushrooms/nginx-mushrooms.conf
sed -i.hsts '/add_header Strict-Transport-Security/d' ~/mushrooms/nginx-mushrooms.conf
docker restart mushrooms
sleep 3
docker logs mushrooms --tail 10

# Verify Batch 1
for domain in setubal.folkup.city padel.folkup.fit cogumelos.folkup.fit; do
  echo "=== $domain ==="
  curl -I https://$domain 2>&1 | grep -i "strict-transport-security" | wc -l
  # Expected: 1 (one header, not two)
  curl -I https://$domain 2>&1 | grep -i "strict-transport-security"
done

echo "✓ Batch 1 complete"
```

### Batch 2: tarot, comic, quest

```bash
# 1. tarot.folkup.life
grep -n "Strict-Transport-Security" ~/tarot-hub/nginx-tarot.conf
sed -i.hsts '/add_header Strict-Transport-Security/d' ~/tarot-hub/nginx-tarot.conf
docker restart tarot-hub
sleep 3
docker logs tarot-hub --tail 10

# 2. comic.folkup.app
grep -n "Strict-Transport-Security" ~/comic-factory/nginx-comic.conf
sed -i.hsts '/add_header Strict-Transport-Security/d' ~/comic-factory/nginx-comic.conf
docker restart comic-factory
sleep 3
docker logs comic-factory --tail 10

# 3. quest.folkup.app
grep -n "Strict-Transport-Security" ~/folkup-quest/nginx-quest.conf
sed -i.hsts '/add_header Strict-Transport-Security/d' ~/folkup-quest/nginx-quest.conf
docker restart folkup-quest
sleep 3
docker logs folkup-quest --tail 10

# Verify Batch 2
for domain in tarot.folkup.life comic.folkup.app quest.folkup.app; do
  echo "=== $domain ==="
  curl -I https://$domain 2>&1 | grep -i "strict-transport-security" | wc -l
  # Expected: 1
  curl -I https://$domain 2>&1 | grep -i "strict-transport-security"
done

echo "✓ Batch 2 complete"
```

### Batch 3: lucerna, docs, auth

```bash
# 1. lucerna.folkup.app
grep -n "Strict-Transport-Security" ~/lucerna/nginx-lucerna.conf
sed -i.hsts '/add_header Strict-Transport-Security/d' ~/lucerna/nginx-lucerna.conf
docker restart lucerna
sleep 3
docker logs lucerna --tail 10

# 2. docs.folkup.app
grep -n "Strict-Transport-Security" ~/folkup-docs/nginx-docs.conf
sed -i.hsts '/add_header Strict-Transport-Security/d' ~/folkup-docs/nginx-docs.conf
docker restart folkup-docs
sleep 3
docker logs folkup-docs --tail 10

# 3. auth.folkup.app
grep -n "Strict-Transport-Security" ~/folkup-auth/nginx-auth.conf
sed -i.hsts '/add_header Strict-Transport-Security/d' ~/folkup-auth/nginx-auth.conf
docker restart folkup-auth
sleep 3
docker logs folkup-auth --tail 10

# Verify Batch 3
for domain in lucerna.folkup.app docs.folkup.app auth.folkup.app; do
  echo "=== $domain ==="
  curl -I https://$domain 2>&1 | grep -i "strict-transport-security" | wc -l
  # Expected: 1
  curl -I https://$domain 2>&1 | grep -i "strict-transport-security"
done

echo "✓ Batch 3 complete"
```

### Batch 4: barnes, ecosystem

```bash
# 1. barnes.folkup.city
grep -n "Strict-Transport-Security" ~/barnes/nginx-barnes.conf
sed -i.hsts '/add_header Strict-Transport-Security/d' ~/barnes/nginx-barnes.conf
docker restart barnes
sleep 3
docker logs barnes --tail 10

# 2. ecosystem.folkup.app
# Check if HSTS is in vhost.d or site config
grep -n "Strict-Transport-Security" /etc/nginx/vhost.d/ecosystem.folkup.app 2>/dev/null
grep -n "Strict-Transport-Security" ~/ecosystem-dashboard/nginx-ecosystem.conf 2>/dev/null
# Remove from whichever has it (site-level only, keep nginx-proxy level)
# If in site config:
# sed -i.hsts '/add_header Strict-Transport-Security/d' ~/ecosystem-dashboard/nginx-ecosystem.conf
# docker restart ecosystem-dashboard

# Verify Batch 4
for domain in barnes.folkup.city ecosystem.folkup.app; do
  echo "=== $domain ==="
  curl -I https://$domain 2>&1 | grep -i "strict-transport-security" | wc -l
  # Expected: 1
  curl -I https://$domain 2>&1 | grep -i "strict-transport-security"
done

echo "✓ Batch 4 complete"
echo "✓ Change #3 complete (all 11 domains)"
```

---

## Change #4: Duplicate Security Headers — docs, barnes

**Why:** X-Frame-Options and X-Content-Type-Options duplicated (nginx-proxy + site). Remove from site configs.

```bash
# docs.folkup.app
grep -n "X-Frame-Options\|X-Content-Type-Options" ~/folkup-docs/nginx-docs.conf
sed -i.sec '/add_header X-Frame-Options/d' ~/folkup-docs/nginx-docs.conf
sed -i.sec '/add_header X-Content-Type-Options/d' ~/folkup-docs/nginx-docs.conf
docker restart folkup-docs
sleep 3

# barnes.folkup.city
grep -n "X-Frame-Options\|X-Content-Type-Options" ~/barnes/nginx-barnes.conf
sed -i.sec '/add_header X-Frame-Options/d' ~/barnes/nginx-barnes.conf
sed -i.sec '/add_header X-Content-Type-Options/d' ~/barnes/nginx-barnes.conf
docker restart barnes
sleep 3

# Verify
for domain in docs.folkup.app barnes.folkup.city; do
  echo "=== $domain ==="
  curl -I https://$domain 2>&1 | grep -i "x-frame-options" | wc -l
  curl -I https://$domain 2>&1 | grep -i "x-content-type-options" | wc -l
  # Expected: 1 for each
done

echo "✓ Change #4 complete"
```

---

## Change #5: monitor.folkup.app — Add Security Headers

**Why:** Umami analytics dashboard missing standard security headers.

```bash
# Check current config
cat ~/umami/nginx-umami.conf | grep -A10 "server {"

# Add headers (append to server block before closing brace)
# Find the line number of the last closing brace
grep -n "^}" ~/umami/nginx-umami.conf | tail -1

# Create updated config
cp ~/umami/nginx-umami.conf ~/umami/nginx-umami.conf.pre-sec
cat > /tmp/umami-security-headers.txt <<'EOF'
    # Security headers
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
EOF

# MANUAL STEP: Insert before closing brace of server block
# Use nano or vim:
nano ~/umami/nginx-umami.conf
# Paste the 3 add_header lines before the final "}"

# OR if config is simple, reconstruct:
# (Only if you're confident about the structure)

# Test and reload
docker exec umami nginx -t
docker restart umami
sleep 3
docker logs umami --tail 10

# Verify
curl -I https://monitor.folkup.app 2>&1 | grep -E "X-Content-Type-Options|Referrer-Policy|X-Frame-Options"
# Expected: all 3 headers present

echo "✓ Change #5 complete"
```

---

## Change #6: DayForge (johndoe.folkup.life) — INFR-072

**Why:** Node.js app needs X-Robots-Tag + robots.txt served via nginx (not the app).

```bash
# Check current config
cat ~/dayforge/nginx-dayforge.conf | head -20

# Add X-Robots-Tag header and robots.txt location
cp ~/dayforge/nginx-dayforge.conf ~/dayforge/nginx-dayforge.conf.pre-robots
cat > /tmp/dayforge-robots.patch <<'EOF'
# Insert in server block (after existing add_header lines or near top):

    # Anti-indexing for private tool
    add_header X-Robots-Tag "noindex, nofollow, noarchive" always;

# Insert before proxy_pass location:

    # Serve robots.txt via nginx (not the app)
    location = /robots.txt {
        add_header Content-Type text/plain;
        return 200 "User-agent: *\nDisallow: /\n";
    }
EOF

# MANUAL STEP: Edit config
nano ~/dayforge/nginx-dayforge.conf
# Add the X-Robots-Tag header line after existing headers
# Add the location = /robots.txt block before "location / { proxy_pass }"

# Test
docker exec dayforge nginx -t || echo "Check syntax"
docker restart dayforge
sleep 3
docker logs dayforge --tail 10

# Verify X-Robots-Tag
curl -I https://johndoe.folkup.life 2>&1 | grep -i "x-robots-tag"
# Expected: X-Robots-Tag: noindex, nofollow, noarchive

# Verify robots.txt
curl https://johndoe.folkup.life/robots.txt
# Expected:
# User-agent: *
# Disallow: /

echo "✓ Change #6 complete"
```

---

## Post-Deployment Verification

```bash
# 1. Check all containers are running
docker ps | grep -E "nginx-proxy|retro-tech|setubal|padel|mushrooms|tarot|comic|quest|lucerna|docs|auth|barnes|ecosystem|dayforge|umami"

# 2. Full header audit (save to file for review)
cat > /tmp/verify-headers.sh <<'EOF'
#!/bin/bash
for domain in \
  setubal.folkup.city \
  padel.folkup.fit \
  cogumelos.folkup.fit \
  tarot.folkup.life \
  comic.folkup.app \
  quest.folkup.app \
  lucerna.folkup.app \
  docs.folkup.app \
  auth.folkup.app \
  barnes.folkup.city \
  ecosystem.folkup.app \
  dialup.folkup.city \
  monitor.folkup.app \
  johndoe.folkup.life
do
  echo "=========================================="
  echo "$domain"
  echo "=========================================="
  curl -I https://$domain 2>&1 | grep -iE "strict-transport|x-frame|x-content|x-robots|referrer-policy"
  echo ""
done
EOF

chmod +x /tmp/verify-headers.sh
/tmp/verify-headers.sh > ~/header-audit-2026-03-10.txt

# 3. Review audit
cat ~/header-audit-2026-03-10.txt

# 4. Check for any nginx errors
docker exec nginx-proxy tail -50 /var/log/nginx/error.log

echo "✓ Post-deployment verification complete"
echo "Review ~/header-audit-2026-03-10.txt for final status"
```

---

## Rollback Instructions

**If something breaks:**

```bash
cd ~/nginx-backups-2026-03-10

# Rollback specific site (example: setubal)
cp setubal.bak ~/setubal-encyclopedia/nginx-setubal.conf
docker restart setubal-encyclopedia

# Rollback vhost.d change
sudo cp ecosystem.folkup.app.bak /etc/nginx/vhost.d/ecosystem.folkup.app 2>/dev/null
docker exec nginx-proxy nginx -s reload

# Rollback ALL (nuclear option)
for site in retro-tech setubal padel mushrooms tarot comic quest lucerna docs auth barnes dayforge umami; do
  config=$(ls $site.bak 2>/dev/null)
  if [ -n "$config" ]; then
    echo "Rolling back $site..."
    cp $config ~/$(echo $site | sed 's/-encyclopedia//')/nginx-*.conf
    docker restart $(echo $site | sed 's/-encyclopedia//')
  fi
done

docker exec nginx-proxy nginx -s reload

echo "✓ Rollback complete"
```

---

## Completion Checklist

After all changes:

- [ ] All 14 containers running (`docker ps`)
- [ ] No nginx syntax errors (`docker exec nginx-proxy nginx -t`)
- [ ] HSTS: 1 header per domain (not 2)
- [ ] X-Robots-Tag: present on ecosystem, johndoe
- [ ] Security headers: present on monitor
- [ ] robots.txt: serves on johndoe
- [ ] retro-tech: no OAuth remnants
- [ ] Header audit file saved (`~/header-audit-2026-03-10.txt`)
- [ ] Backups retained (`~/nginx-backups-2026-03-10/`)
- [ ] No 500/502 errors on any domain (spot check 3-4 sites manually)

**If all checked:** changes complete. Update INFR tickets (071, 072, 073) and notify team.

**If issues:** review logs, check rollback, escalate to Andrey.

---

## Notes

- **Idempotency:** Most `sed` commands with `-i.backup` create .backup files. Running twice is safe but creates .backup.backup — clean up after verification.
- **Manual edits:** Changes #5 and #6 require manual editing (nano/vim) because insertion points vary. Automated sed for these risks breaking configs.
- **Testing after each batch:** CRITICAL for HSTS changes. Don't proceed to next batch until current batch verified.
- **vhost.d vs site configs:** nginx-proxy uses vhost.d for per-domain overrides. Site containers have their own nginx configs. Both layers exist, check both.

**Estimated total time:** 45-60 minutes (including verification pauses)
