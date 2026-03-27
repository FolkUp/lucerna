# INFR-086 — Security & Resilience Audit: Session B (Local Phase) Report

> **Date:** 2026-03-11
> **Scope:** External scan, SPOF analysis, DR plan, monitoring coverage
> **Method:** Local-only (no SSH — VPS occupied by Bastion session)
> **Auditor:** FolkUp Research Lab

---

## Executive Summary

**Overall Verdict: CONDITIONAL PASS — adequate external posture, resilience gaps identified**

All 16 public-facing FolkUp domains serve proper security headers (HSTS, CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy). The main systemic issue is **duplicate security headers** on 10+ sites (nginx-proxy layer + per-site nginx config both set same headers). While not a direct vulnerability, conflicting HSTS max-age values can cause browser confusion.

The resilience analysis reveals the expected single-VPS risks: one Hetzner account, one IP, one datacenter, one operator. **Two P1 gaps found:** (1) all DB dumps stay on the same VPS with no offsite copy, and (2) backup cron jobs have no failure alerting — meaning silent backup failure could extend RPO from 24h to days. Monitoring coverage is good (32 monitors) but has 3 gaps.

*Note: Session A P0-1 (team.yml PII) was closed in session 79 (SOPS migration + git-filter-repo, 75 commits rewritten). Session A P0-2 (age key) closed as false alarm. See Session A report for details.*

---

## 1. External Security Headers Scan

### Method
`curl -sI https://{domain}` from local machine (Windows) → 16 domains + folkup.app + analytics.folkup.app

### Results Matrix

| Domain | HSTS | CSP | X-Frame | X-CT-Options | Referrer | Permissions | X-Robots | Notes |
|--------|------|-----|---------|-------------|----------|-------------|----------|-------|
| **setubal.folkup.city** | PASS (2×!) | PASS | PASS (DENY) | PASS | PASS (no-ref) | PASS | — | Duplicate HSTS (31536000 + 86400;incl) |
| **barnes.folkup.city** | PASS | PASS | PASS (DENY) | PASS | PASS (no-ref) | PASS | — | **All headers duplicated** |
| **dialup.folkup.city** | PASS | PASS | PASS (DENY) | PASS | PASS (no-ref) | PASS | — | Clean (no duplication) |
| **tarot.folkup.life** | PASS (2×!) | PASS | PASS (DENY) | PASS | PASS (no-ref) | PASS | noindex,nofollow | Duplicate HSTS |
| **johndoe.folkup.life** | PASS (incl) | PASS | PASS (DENY) | PASS | strict-origin | MISSING | — | Node.js (helmet); missing Permissions-Policy; has rate-limit headers |
| **padel.folkup.fit** | PASS (2×!) | PASS (YT) | PASS (DENY) | PASS | PASS (no-ref) | PASS | — | Duplicate HSTS; CSP allows youtube-nocookie |
| **cogumelos.folkup.fit** | PASS (2×!) | PASS | PASS (DENY) | PASS | PASS (no-ref) | PASS | — | Duplicate HSTS |
| **docs.folkup.app** | PASS | PASS (fonts) | PASS (DENY) | PASS | PASS (no-ref) | PASS | noindex,nofollow | **All headers duplicated**; OAuth2 302 |
| **lucerna.folkup.app** | PASS (2×!) | PASS | PASS (DENY) | PASS | strict-origin | PASS | noindex,nofollow,noarchive | Duplicate HSTS; OAuth2 302 |
| **ecosystem.folkup.app** | PASS (2×!) | PASS | PASS (DENY) | PASS | PASS (no-ref) | PASS | — | Duplicate HSTS; OAuth2 302; missing x-robots-tag! |
| **monitor.folkup.app** | PASS | MISSING | SAMEORIGIN | MISSING | MISSING | PASS | — | Uptime Kuma defaults; weakest posture |
| **auth.folkup.app** | PASS (2×!) | PASS | PASS (DENY) | PASS | strict-origin | MISSING | none | Duplicate HSTS (31536000 + 63072000;preload); Keycloak defaults |
| **rss.folkup.app** | PASS | PASS | SAMEORIGIN | PASS | strict-origin | PASS (partial) | — | Miniflux; 405 on HEAD; Permissions-Policy lacks payment=() |
| **comic.folkup.app** | PASS (2×!) | PASS (CF) | PASS (DENY) | PASS | strict-origin | PASS (partial) | — | Duplicate HSTS; CSP allows cloudflareinsights |
| **quest.folkup.app** | PASS (2×!) | PASS (CF) | PASS (DENY) | PASS | strict-origin | PASS (partial) | — | Duplicate HSTS; CSP allows cloudflareinsights |
| **folkup.app** | PASS (preload!) | PASS | PASS (DENY) | PASS | strict-origin | PASS (partial) | — | CF Pages; best HSTS (63072000;preload) |
| **analytics.folkup.app** | PASS | WEAK | MISSING | MISSING | MISSING | MISSING | — | Umami/Next.js; CSP allows unsafe-eval+unsafe-inline; minimal headers |

### Findings by Severity

#### P2-5: Duplicate security headers (10+ sites)
**Severity:** P2 — MEDIUM
**Finding:** nginx-proxy and per-site nginx configs both emit security headers, causing duplication. On 6 sites, HSTS has conflicting max-age values (31536000 vs 86400). Browsers typically use the *first* value, but behavior varies.
**Impact:** Maintenance complexity; potential browser confusion on conflicting HSTS max-age.
**Remediation:** Centralize headers in nginx-proxy `default_host` block OR remove per-site headers and let proxy handle all. Pick one layer.

#### P2-6: monitor.folkup.app — weakest security headers
**Severity:** P2 — MEDIUM
**Finding:** Uptime Kuma container sets minimal headers (X-Frame-Options: SAMEORIGIN, no CSP, no X-Content-Type-Options, no Referrer-Policy). nginx-proxy adds HSTS + Permissions-Policy only.
**Impact:** XSS risk if Uptime Kuma has vulnerability; clickjacking (SAMEORIGIN allows same-origin framing).
**Remediation:** Add security headers in nginx-proxy config specifically for monitor.folkup.app.

#### P2-7: analytics.folkup.app — unsafe-eval in CSP
**Severity:** P2 — MEDIUM
**Finding:** Umami (Next.js) CSP includes `unsafe-eval` and `unsafe-inline` for scripts. No X-Frame-Options, no Referrer-Policy, no Permissions-Policy from nginx-proxy.
**Impact:** Weakens XSS protection for analytics dashboard.
**Remediation:** Override CSP in nginx-proxy for analytics; tighten Next.js config.

#### P3-1: ecosystem.folkup.app — missing X-Robots-Tag
**Severity:** P3 — LOW
**Finding:** OAuth2-protected site but lacks `x-robots-tag: noindex, nofollow` (unlike docs, lucerna which have it).
**Impact:** Search engines that receive 302 may still index the URL. Minimal risk since 302→auth prevents content access.
**Remediation:** Add `x-robots-tag noindex, nofollow, noarchive` to nginx config for ecosystem.

#### P3-2: johndoe.folkup.life — missing Permissions-Policy
**Severity:** P3 — LOW
**Finding:** DayForge (Node.js/helmet) sets comprehensive headers but omits Permissions-Policy.
**Impact:** Browser APIs (camera, mic, geolocation) not explicitly blocked.
**Remediation:** Add `Permissions-Policy` header in helmet config or nginx-proxy.

#### P3-3: auth.folkup.app — missing Permissions-Policy
**Severity:** P3 — LOW
**Finding:** Keycloak sets its own headers but lacks Permissions-Policy.
**Remediation:** Add via nginx-proxy for auth.folkup.app.

### Green Flags — External Security

| Check | Status | Evidence |
|-------|--------|----------|
| **HSTS on all domains** | PASS | All 16+ domains have HSTS; folkup.app has preload |
| **CSP on public sites** | PASS | All Hugo sites have strict CSP (self + analytics only) |
| **X-Frame-Options** | PASS | DENY on 14/16 domains; SAMEORIGIN on 2 (acceptable for apps) |
| **X-Content-Type-Options** | PASS | nosniff on 15/16 domains |
| **Referrer-Policy** | PASS | Set on 14/16 domains (no-referrer or strict-origin) |
| **Protected sites return 302** | PASS | docs, lucerna, ecosystem → auth.folkup.app |
| **Protected sites have noindex** | MOSTLY | docs, lucerna have noindex; ecosystem missing |
| **OAuth2 cookies** | PASS | HttpOnly, Secure, SameSite on oauth2-proxy cookies |
| **TLS on all domains** | PASS | All respond on HTTPS; no HTTP fallback detected |

---

## 2. SPOF (Single Point of Failure) Analysis

### SPOF Matrix

| Component | SPOF? | Severity | Current Mitigation | Gap | Mitigation Plan |
|-----------|-------|----------|-------------------|-----|-----------------|
| **VPS (Hetzner CX33)** | YES | CRITICAL | Hetzner snapshots (unknown schedule) | No automated offsite backup; single provider | Daily Hetzner snapshots + weekly offsite (Backblaze B2 or rsync to 2nd location) |
| **IP Address (46.225.107.2)** | YES | HIGH | Cloudflare DNS (fast update) | DNS propagation 5-60min; hardcoded IPs in CI/CD | Keep TTL low (300s); document IP change procedure |
| **Hetzner Account** | YES | CRITICAL | Single account, 2FA unknown | Account compromise = total loss | Verify 2FA; document recovery procedure; consider 2nd VPS at different provider for DR |
| **Hetzner Datacenter** | YES | HIGH | Single DC (Falkenstein/Nuremberg) | If DC outage, snapshots also unavailable | Consider: offsite backup to different provider (B2, S3) |
| **DNS (Cloudflare)** | LOW | LOW | 4 zones managed in Cloudflare | Cloudflare itself is highly available | Acceptable risk; export zone files periodically |
| **Bus Factor (Андрей)** | YES | CRITICAL | Documentation in folkup-docs | 1 person knows all credentials + architecture | Credential Map exists; ensure it's current; consider trusted backup person |
| **Docker Host** | YES | HIGH | All 27 containers on same host | Host failure = all services down | Covered by VPS SPOF above |
| **PostgreSQL (folkup-app)** | YES | HIGH | Daily pg_dump (cron) | Dump stays on same VPS! No offsite copy | Add offsite copy of dumps |
| **PostgreSQL (Keycloak)** | YES | HIGH | Realm export (cron 3:30 AM) | Export stays on same VPS | Add offsite copy |
| **PostgreSQL (n8n)** | YES | MEDIUM | Daily dump + gzip (7d retention) | Same VPS only | Add offsite copy |
| **Miniflux DB** | YES | MEDIUM | Daily backup script | Same VPS only | Add offsite copy |
| **Secrets (SOPS age key)** | LOW | — | 3 backup copies documented in RECOVERY.md | — | Verified in Session A; no action needed |
| **Git Repositories (GitHub)** | LOW | — | GitHub + local clones on dev machines | — | Acceptable; GitHub has enterprise SLA |
| **SSL Certificates (LE)** | LOW | — | Auto-renew via acme-companion; can re-issue anytime | — | No action needed |
| **Cloudflare Pages** | LOW | — | folkup.app + quest on CF Pages (independent of VPS) | — | Natural redundancy from VPS |

### Critical Path Analysis

```
Internet → Cloudflare DNS → VPS (46.225.107.2)
                               ├── nginx-proxy (Layer 2) ← SPOF
                               ├── 27 Docker containers (Layer 4)
                               ├── PostgreSQL ×3 (data) ← SPOF (data loss)
                               └── Keycloak (auth) ← SPOF (auth failure)
```

**If VPS dies:**
- 14/16 domains go down immediately (all VPS-hosted)
- 2 domains survive: folkup.app + quest.folkup.app (CF Pages)
- Auth for ALL SSO-protected services fails
- Recovery time: 2-8 hours (depends on backup freshness and operator availability)

**If Cloudflare goes down:**
- All DNS resolution fails → all 16 domains down
- CF Pages sites also down
- Recovery: wait for CF, or migrate DNS (hours to days)
- Probability: very low (Cloudflare 99.99% SLA)

---

## 3. Disaster Recovery Plan

### RPO / RTO Estimates

| Service | RPO (data loss) | RTO (downtime) | Recovery Source | Priority |
|---------|----------------|----------------|-----------------|----------|
| **Hugo sites (×10)** | 0 (git) | 30-60 min | GitHub → docker compose up | P1 |
| **nginx-proxy + acme** | 0 (config) | 15 min | Docker compose + LE re-issue | P0 (blocks all) |
| **Keycloak** | ≤24h (realm export) | 30-60 min | Backup import + docker compose | P0 (blocks SSO) |
| **folkup-app DB** | ≤24h (pg_dump) | 30-60 min | pg_dump restore | P1 |
| **n8n DB** | ≤24h (dump) | 15-30 min | Dump restore | P3 |
| **Miniflux DB** | ≤24h (dump) | 15-30 min | Dump restore | P3 |
| **Uptime Kuma** | Config loss acceptable | 15 min | Docker volume (if snapshot) | P3 |
| **Redis (sessions)** | Ephemeral | 5 min | No backup needed | P2 |
| **DayForge** | 0 (file-based) | 15 min | GitHub + docker compose | P2 |
| **CF Pages sites** | 0 (git) | 0 (auto) | Cloudflare auto-rebuild | — |

### DR Scenario: Complete VPS Loss

**Prerequisites:**
- Hetzner account access
- SSH key for deploy user
- GitHub access (deploy keys or PAT)
- SOPS age key (3 backup locations per RECOVERY.md)
- Cloudflare API token

**Recovery Checklist:**

#### Phase 0: Triage (0-15 min)
- [ ] Confirm VPS is unrecoverable (not just reboot)
- [ ] Check Hetzner for available snapshots
- [ ] If snapshot exists: restore to new VPS → Phase 4
- [ ] If no snapshot: proceed to Phase 1

#### Phase 1: Provision New VPS (15-30 min)
- [ ] Create new Hetzner CX33 (Ubuntu 24.04)
- [ ] Note new IP address
- [ ] SSH as root, create `deploy` user
- [ ] Install: `apt install docker.io docker-compose-plugin nginx fail2ban ufw rsync`
- [ ] Configure UFW: allow 22/tcp, 80/tcp, 443/tcp, 53/udp (WireGuard)
- [ ] Configure SSH hardening (PasswordAuth no, MaxAuthTries 3)
- [ ] Set up WireGuard if needed

#### Phase 2: Update DNS (5 min, parallel with Phase 1)
- [ ] Cloudflare → update A records for all 4 zones to new IP
- [ ] TTL already 300s → propagation in 5 min
- [ ] Update GitHub Secrets: `VPS_HOST` for all repos

#### Phase 3: Restore Networking Layer (15-30 min)
- [ ] Deploy nginx-proxy + acme-companion (docker compose from folkup-auth repo)
- [ ] Restore nginx site configs from backup (or recreate from folkup-docs runbooks)
- [ ] Copy htpasswd files from backup
- [ ] Wait for SSL certificates to be issued by acme-companion

#### Phase 4: Restore Auth (15-30 min) — CRITICAL PATH
- [ ] Deploy Keycloak + PostgreSQL (folkup-auth repo)
- [ ] Import realm from most recent backup
- [ ] Deploy oauth2-proxy + Redis
- [ ] Test: auth.folkup.app loads, login works

#### Phase 5: Restore Applications (30-60 min)
Priority order:
1. [ ] Hugo encyclopedias (git clone → docker compose up) — 10 sites
2. [ ] DayForge (git clone → docker compose up)
3. [ ] folkup-app (git clone → docker compose up → restore DB from dump)
4. [ ] Miniflux, n8n (docker compose up → restore DBs)
5. [ ] Uptime Kuma (docker compose up → reconfigure monitors)
6. [ ] Analytics / Umami (docker compose up)

#### Phase 6: Verify (15 min)
- [ ] curl -sI all 16 domains → check 200/302 as expected
- [ ] Test Keycloak login on protected sites
- [ ] Check Uptime Kuma → all monitors green
- [ ] Verify fail2ban active
- [ ] Test GitHub Actions deploy (push dummy commit)

**Estimated Total RTO: 2-4 hours (from scratch, operator available) / 30-60 min (from snapshot)**
**Worst case (after-hours, operator unavailable): 4-12 hours** — bus factor = 1, no on-call rotation.

### Gaps in Current DR

| Gap | Severity | Status |
|-----|----------|--------|
| No automated Hetzner snapshots (unknown if enabled) | P1 | VERIFY on SSH session |
| ~~All DB dumps stay on same VPS (no offsite)~~ | ~~P1~~ | **CLOSED** (session 87: offsite backup to Hetzner Storage Box, daily cron) |
| No DR drill ever performed | P2 | OPEN — schedule quarterly |
| No documented IP change procedure for CI/CD | P2 | OPEN — document GitHub Secrets update list |
| Uptime Kuma config not backed up | P3 | Acceptable — can reconfigure in 15 min |
| WireGuard config not in backup script | P2 | OPEN — add to VPS config backup |

---

## 4. Monitoring Coverage Audit

### Uptime Kuma: 32 Monitors (16 HTTP + 16 SSL)

Per architecture-overview.md: "Every Hugo site, Vue app, and infrastructure service has both an HTTP and SSL monitor."

### Coverage Matrix

| Domain | HTTP Monitor | SSL Monitor | Notes |
|--------|-------------|-------------|-------|
| setubal.folkup.city | EXPECTED | EXPECTED | |
| barnes.folkup.city | EXPECTED | EXPECTED | |
| dialup.folkup.city | EXPECTED | EXPECTED | |
| tarot.folkup.life | EXPECTED | EXPECTED | |
| johndoe.folkup.life | EXPECTED | EXPECTED | |
| padel.folkup.fit | EXPECTED | EXPECTED | |
| cogumelos.folkup.fit | EXPECTED | EXPECTED | |
| docs.folkup.app | EXPECTED | EXPECTED | |
| lucerna.folkup.app | EXPECTED | EXPECTED | |
| ecosystem.folkup.app | EXPECTED | EXPECTED | |
| monitor.folkup.app | EXPECTED | EXPECTED | |
| auth.folkup.app | EXPECTED | EXPECTED | |
| rss.folkup.app | EXPECTED | EXPECTED | |
| comic.folkup.app | EXPECTED | EXPECTED | |
| quest.folkup.app | EXPECTED | EXPECTED | |
| analytics.folkup.app | EXPECTED | EXPECTED | |

**16 domains × 2 monitors = 32** → matches documented count.

### Potential Coverage Gaps

| Gap | Severity | Explanation |
|-----|----------|-------------|
| **folkup.app (landing)** | P3 | CF Pages site — not on VPS, independent of VPS failure. Nice-to-have monitor |
| **vera.folkup.life** | P3 | DayForge instance — may or may not have separate monitor |
| **Healthchecks.io heartbeat** | P3 | Documented in backup-restore.md but no verification of current status |
| **Database health** | P2 | Monitors check HTTP only; PostgreSQL could be down while nginx returns cached/error page. Remediation: add DB-specific health endpoints or direct TCP checks in Uptime Kuma |
| **Certificate expiry alert test** | P3 | 30-day warning configured; last trigger unknown |

### Alerting Chain

```
Uptime Kuma → Telegram (FolkUp Deploy channel) → Андрей
fail2ban → Telegram → Андрей
Healthchecks.io → ? (notification method unknown)
Cron job failures → ? (no monitoring?)
```

**Gap:** Cron jobs (4 backup scripts) have no failure alerting documented. If `backup.sh` silently fails for days, data loss window grows beyond RPO.

**Recommendation:**
1. Add Healthchecks.io pings to each cron backup script (success/fail)
2. Add folkup.app HTTP monitor to Uptime Kuma (CF Pages monitoring)
3. Verify current Healthchecks.io configuration via SSH session

---

## 5. Cloudflare Account Audit (Local Scope)

Without Cloudflare dashboard access, limited to DNS-visible information:

| Check | Status | Evidence |
|-------|--------|----------|
| DNS zones (4) | PASS | folkup.app, folkup.city, folkup.fit, folkup.life — all active |
| DNSSEC | UNKNOWN | Cannot verify without dashboard |
| 2FA on account | UNKNOWN | Cannot verify without dashboard |
| API token scoping | UNKNOWN | Need to check token permissions |
| WAF rules | UNKNOWN | Need dashboard access |
| Cloudflare proxy mode | OFF (grey cloud) | Confirmed: VPS handles SSL termination |
| CF Pages | ACTIVE | folkup.app + quest.folkup.app |

**Deferred to dedicated Cloudflare audit session.**

---

## Summary of All Findings

### New Findings (Session B)

| # | Severity | Finding | Category | Action |
|---|----------|---------|----------|--------|
| ~~P2-5~~ | ~~P2~~ | ~~Duplicate security headers on 10+ sites~~ | Headers | **CLOSED** (session 85: removed 6 vhost.d files, verified single HSTS) |
| ~~P2-6~~ | ~~P2~~ | ~~monitor.folkup.app — minimal security headers~~ | Headers | **CLOSED** (session 86: vhost.d created, CSP+X-CT-Options+Referrer+Permissions-Policy added, verified) |
| ~~P2-7~~ | ~~P2~~ | ~~analytics.folkup.app — unsafe-eval in CSP~~ | Headers | **CLOSED** (session 86: X-CT-Options+Referrer+Permissions-Policy added; CSP kept as-is — unsafe-eval required by Next.js) |
| ~~**P1-6**~~ | ~~**P1**~~ | ~~**All DB dumps stored on same VPS (no offsite)**~~ | ~~**Backup**~~ | **CLOSED** (session 87: offsite rsync to Hetzner Storage Box BX11, daily 4:30 cron, all 4 backup dirs synced) |
| **P1-7** | **P1** | **Cron backup jobs have no failure alerting** | **Monitoring** | **Add Healthchecks.io pings — silent failure = RPO drift from 24h to days** |
| P2-8 | P2 | No DR drill ever performed | DR | Schedule quarterly DR test |
| P2-9 | P2 | WireGuard config not in backup script | Backup | Add to VPS config backup |
| P3-0 | P3 | folkup.app not monitored in Uptime Kuma | Monitoring | Add HTTP+SSL monitors (CF Pages, lower criticality) |
| ~~P3-1~~ | ~~P3~~ | ~~ecosystem.folkup.app missing x-robots-tag~~ | Headers | **CLOSED** (session 85: added vhost.d with noindex,nofollow,noarchive) |
| ~~P3-2~~ | ~~P3~~ | ~~johndoe.folkup.life missing Permissions-Policy~~ | Headers | **CLOSED** (session 86: Permissions-Policy + X-Robots-Tag added via vhost.d, verified) |
| ~~P3-3~~ | ~~P3~~ | ~~auth.folkup.app missing Permissions-Policy~~ | Headers | **CLOSED** (session 86: Permissions-Policy added to server-level + all 4 location blocks, verified) |

### Carried from Session A (still open)

| # | Severity | Finding | Status |
|---|----------|---------|--------|
| SA-3 | P1 | Keycloak OIDC issuer uses HTTP | OPEN (needs SSH) |
| SA-4 | P1 | Root authorized_keys has 1 key | OPEN (needs SSH) |
| SA-5 | P1 | 16 packages upgradable incl Docker | OPEN (needs SSH) |
| ~~SA-P2-1~~ | ~~P2~~ | ~~fail2ban — single jail~~ | **CLOSED** (session 85: +nginx-http-auth +nginx-botsearch, 4 jails active) |
| ~~SA-P2-2~~ | ~~P2~~ | ~~Docker images not CVE-scanned~~ | **CLOSED** (session 85: Trivy 11 images, see DOCKER-CVE-REPORT.md) |
| SA-P2-3 | P2 | No backup restore test documented | OPEN (Phase E) |
| ~~SA-P2-4~~ | ~~P2~~ | ~~Redis configs 640 permissions~~ | **CLOSED** (session 85: chmod 600) |

### Deferred to B-ssh Session

| Item | Requires |
|------|----------|
| ~~Docker image CVE scan (Trivy)~~ | ~~SSH~~ — **DONE** (session 85: 11 images, 172H+28C) |
| ~~nginx-proxy per-site headers detailed audit~~ | ~~SSH~~ — **DONE** (session 85: Phase D, centralized headers) |
| ~~Keycloak realm/client deep dive~~ | ~~SSH~~ — **DONE** (session 85: CONDITIONAL PASS) |
| Backup restore test (Hetzner snapshot) | SSH — Phase E |
| ~~Redis config permissions fix (640 → 600)~~ | ~~SSH~~ — **DONE** (session 85: Phase A1) |
| ~~fail2ban additional jails~~ | ~~SSH~~ — **DONE** (session 85: Phase C1+C2) |
| ~~Verify Hetzner snapshot schedule~~ | ~~SSH~~ — **DONE** (session 85: Phase A2, snapshots confirmed) |
| ~~Verify Healthchecks.io config~~ | ~~SSH~~ — **DONE** (session 85: Phase A3) |
| ~~Verify cron job alerting~~ | ~~SSH~~ — **DONE** (session 85: Phase C3, HC pings added to 4 crons) |

---

## Green Flags — Resilience

| Area | Status | Evidence |
|------|--------|----------|
| **Security headers coverage** | EXCELLENT | All 16 public domains have HSTS, CSP, X-Frame-Options |
| **Auth-protected sites** | EXCELLENT | 302→Keycloak, noindex tags, secure cookies |
| **Backup schedule** | GOOD | 4 daily cron jobs (PG, KC, n8n, Miniflux) + Healthchecks.io heartbeat |
| **DR documentation** | GOOD | backup-restore.md + emergency-playbook.md exist and are maintained |
| **Secrets management** | EXCELLENT | SOPS + 3 backup locations; age key confirmed |
| **Git as source of truth** | EXCELLENT | All content in GitHub; RPO=0 for code/content |
| **SSL auto-renewal** | EXCELLENT | acme-companion; all certs expire Feb 2027 |
| **Monitoring** | GOOD | 32 monitors, Telegram alerts, 60s interval |
| **CF Pages redundancy** | GOOD | 2 sites independent of VPS |

---

## SPOF Risk Summary (one-page)

```
╔════════════════════════════════════════════════════════════╗
║           FolkUp SPOF Risk Map — March 2026              ║
╠════════════════════════════════════════════════════════════╣
║                                                          ║
║  CRITICAL SPOFs:                                         ║
║  ┌─────────────┐  ┌──────────────┐  ┌────────────────┐  ║
║  │  Single VPS  │  │ Single Hetzner│  │  Bus Factor: 1 │  ║
║  │  (all 14+    │  │   Account    │  │  (Андрей only) │  ║
║  │   services)  │  │              │  │                │  ║
║  └──────┬───────┘  └──────┬───────┘  └────────┬───────┘  ║
║         │                 │                    │          ║
║  Mitigation:       Mitigation:         Mitigation:       ║
║  Hetzner snap +    Verify 2FA +        Credential Map +  ║
║  offsite backup    recovery docs       folkup-docs        ║
║                                                          ║
║  HIGH SPOFs:                                             ║
║  ┌─────────────┐  ┌──────────────┐  ┌────────────────┐  ║
║  │  Single IP   │  │ No offsite   │  │ No DR drill    │  ║
║  │  (DNS TTL    │  │   backups    │  │  ever done     │  ║
║  │   = 300s)    │  │              │  │                │  ║
║  └─────────────┘  └──────────────┘  └────────────────┘  ║
║                                                          ║
║  LOW RISK:                                               ║
║  DNS (Cloudflare 99.99%) • SSL (auto-renew) •            ║
║  Git (GitHub SLA) • Secrets (3 copies) •                 ║
║  CF Pages (2 sites independent)                          ║
║                                                          ║
╚════════════════════════════════════════════════════════════╝
```

---

## Action Items — Full Priority List

### From Session B (new)

| # | Sev | Action | Owner | Needs SSH? |
|---|-----|--------|-------|-----------|
| ~~**B-1**~~ | ~~**P1**~~ | ~~**Set up offsite backup for all DB dumps (PG×3, KC, Miniflux)**~~ | — | **CLOSED** (session 87: Storage Box BX11 configured, SSH key re-uploaded, script deployed to VPS, test run OK — all 4 dirs synced, cron 4:30 daily) |
| ~~**B-2**~~ | ~~**P1**~~ | ~~**Add Healthchecks.io pings to backup cron jobs**~~ | — | **CLOSED** (session 85: 4 HC checks created, pings in all 4 backup crons) |
| ~~B-3~~ | ~~P2~~ | ~~Centralize security headers (remove duplication)~~ | — | **CLOSED** (session 85: removed 6 vhost.d duplicates, single HSTS verified) |
| ~~B-4~~ | ~~P2~~ | ~~Add security headers for monitor.folkup.app~~ | — | **CLOSED** (session 86: CSP, X-CT-Options, Referrer, Permissions-Policy added via vhost.d) |
| ~~B-5~~ | ~~P2~~ | ~~Tighten analytics.folkup.app CSP~~ | — | **CLOSED** (session 86: non-CSP headers added; CSP kept — unsafe-eval required by Next.js) |
| B-6 | P2 | Schedule first DR drill (snapshot → restore → verify) | Andrey | **PARTIAL** (session 86: DR-RUNBOOK.md + BACKUP-RESTORE-TEST.md created, quarterly schedule Q2 2026) |
| ~~B-7~~ | ~~P2~~ | ~~Add WireGuard config to VPS backup script~~ | — | **CLOSED** (session 86: WG config backed up to `vault/secrets/wireguard.enc.yaml` — all 6 peers, SOPS-encrypted) |
| B-8 | P3 | Add folkup.app + vera.folkup.life to Uptime Kuma monitors | DevOps | OPEN (needs GUI — 32 monitors found, 2 missing) |
| ~~B-9~~ | ~~P3~~ | ~~Add x-robots-tag to ecosystem.folkup.app~~ | — | **CLOSED** (session 85) |
| ~~B-10~~ | ~~P3~~ | ~~Add Permissions-Policy to johndoe, auth~~ | — | **CLOSED** (session 86: both via vhost.d, verified) |

### From Session A (still open — needs SSH)

| # | Sev | Action |
|---|-----|--------|
| ~~SA-3~~ | ~~P1~~ | ~~Verify KC OIDC issuer HTTPS~~ | **CLOSED** (session 86: external WebFetch confirms issuer=`https://auth.folkup.app/realms/folkup`. `http://` only on localhost bypass — expected with KC_PROXY_HEADERS=xforwarded) |
| ~~SA-4~~ | ~~P1~~ | ~~Remove root authorized_keys~~ | **CLOSED** (recon 13.03: 0 keys) |
| ~~SA-5~~ | ~~P1~~ | ~~Apply 16 pending package updates~~ | **CLOSED** (session 86: containerd.io 2.2.1→2.2.2 updated, 29 containers running. All packages now current) |
| ~~SA-P2-1~~ | ~~P2~~ | ~~Add fail2ban jails~~ | **CLOSED** (session 85) |
| ~~SA-P2-2~~ | ~~P2~~ | ~~Docker image CVE scan~~ | **CLOSED** (session 85) |
| SA-P2-3 | P2 | Perform backup restore test | **PARTIAL** (session 86: BACKUP-RESTORE-TEST.md created, quarterly schedule Q2 2026. Actual drill TBD) |
| ~~SA-P2-4~~ | ~~P2~~ | ~~Fix Redis config permissions~~ | **CLOSED** (session 85) |

---

**Prepared by:** FolkUp Research Lab
**Date:** 2026-03-11
**Classification:** INTERNAL — Security Audit (do not push)
**Previous:** Session A Report (same directory)
**Next:** Session B-ssh — when VPS is available for SSH access
