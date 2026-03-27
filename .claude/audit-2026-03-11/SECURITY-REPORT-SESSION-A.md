# INFR-085 — Security & Resilience Audit: Session A Report

> **Date:** 2026-03-11
> **Scope:** P0/P1 findings — FolkUp Ecosystem
> **Auditor:** FolkUp Research Lab (automated + manual SSH inspection)
> **Server:** deploy@46.225.107.2 (Hetzner CX33, Ubuntu 24.04, kernel 6.8.0-101)

---

## Executive Summary

**Overall Verdict: CONDITIONAL PASS — 1 P0, 5 P1, 4 P2 findings**

The FolkUp ecosystem demonstrates solid security posture in server hardening, firewall, TLS, and secrets management. One critical issue requires immediate attention: PII exposure in a tracked git repository. SOPS age key location confirmed at standard path (P0-2 closed as false alarm). Server-side configuration is well-hardened with no privileged Docker containers, proper SSH lockdown, and active fail2ban.

---

## P0 — CRITICAL (immediate action required)

### P0-1: PII in tracked git repository (vault/memory/team.yml)

| Field | Value |
|-------|-------|
| **Severity** | P0 — CRITICAL |
| **Location** | `C:\JOHNDOE_CLAUDE\vault\memory\team.yml` |
| **Status** | OPEN |
| **Risk** | Data breach, GDPR violation |

**Finding:** `team.yml` contains personally identifiable information (full names, email addresses, phone numbers, NIF, physical addresses) in a tracked git file. While the vault repository is private, this data should not be in version control history.

**Evidence:** Git secrets scan detected PII patterns in tracked files.

**Remediation:**
1. Move sensitive fields to SOPS-encrypted file (`team.enc.yaml`)
2. Keep `team.yml` with non-sensitive data only (names, roles, project assignments)
3. Use `git-filter-repo` to purge PII from git history
4. Verify `.gitignore` covers any unencrypted PII files

---

### ~~P0-2: SOPS age key — non-standard location~~ → CLOSED

| Field | Value |
|-------|-------|
| **Severity** | ~~P0~~ → **CLOSED** (false alarm) |
| **Location** | `%APPDATA%\sops\age\keys.txt` — EXISTS (184 bytes, valid age format) |
| **Status** | CLOSED |

**Resolution:** Age key confirmed at standard path `C:\Users\ankle\AppData\Roaming\sops\age\keys.txt` (created 2026-03-04). Background agent could not resolve `%APPDATA%` environment variable. All 16/16 SOPS files decrypt correctly. RECOVERY.md documented with 3 backup locations.

**Remaining action:** Verify backup copies per RECOVERY.md are current (P3).

---

## P1 — HIGH (action within 48 hours)

### ~~P1-1: Keycloak OIDC issuer uses HTTP (not HTTPS)~~ → CLOSED

| Field | Value |
|-------|-------|
| **Severity** | ~~P1~~ → **CLOSED** |
| **Location** | Keycloak 26.0.5, realm `folkup` |
| **Evidence** | `oidc_issuer: http://auth.folkup.app:8080/realms/folkup` (on localhost only) |
| **Status** | CLOSED |

**Resolution (session 86):** External verification via WebFetch of `https://auth.folkup.app/realms/folkup/.well-known/openid-configuration` confirms issuer = `https://auth.folkup.app/realms/folkup` (HTTPS). The `http://` URL only appears when curling Keycloak directly on localhost (bypassing nginx-proxy), which is expected behavior with `KC_PROXY_HEADERS=xforwarded`. All OAuth2 clients and external requests receive the correct HTTPS issuer. No action needed.

---

### P1-2: Root authorized_keys contains 1 key

| Field | Value |
|-------|-------|
| **Severity** | P1 — HIGH |
| **Location** | `/root/.ssh/authorized_keys` |
| **Evidence** | 1 SSH key found in root authorized_keys |
| **Risk** | Direct root access bypasses audit trail |

**Finding:** Root account has 1 authorized SSH key despite `PermitRootLogin no` in sshd_config. While the SSHD config prevents SSH root login, the key's presence is a hygiene issue — if config is accidentally changed or another SSH daemon started, root access would be available.

**Remediation:**
1. Identify key owner (check key comment)
2. Remove key from `/root/.ssh/authorized_keys` (root login is disabled anyway)
3. Ensure all administration goes through `deploy` user + `sudo`

---

### P1-3: 16 packages upgradable (including Docker)

| Field | Value |
|-------|-------|
| **Severity** | P1 — HIGH |
| **Location** | APT package manager |
| **Evidence** | Docker 29.2.1 → 29.3.x, plus 15 other packages |
| **Risk** | Known vulnerabilities in outdated packages |

**Finding:** 16 packages have available updates. While unattended-upgrades (v2.9.1) is installed for security patches, Docker and some base packages are not auto-updated.

**Package list includes:** docker-ce, docker-ce-cli, containerd.io, docker-buildx-plugin, docker-compose-plugin, initramfs-tools, base-files, etc.

**Remediation:**
1. Review Docker changelog for security fixes between 29.2.1 and latest
2. Schedule maintenance window for `apt upgrade` + Docker restart
3. Verify unattended-upgrades covers security updates (likely already does for Ubuntu repos)

---

### P1-4: DayForge hardcoded test secrets

| Field | Value |
|-------|-------|
| **Severity** | P1 — HIGH (downgrade to P2 if confirmed test-only) |
| **Location** | `dayforge/server/tests/api.test.js` |
| **Evidence** | Hardcoded test API keys/tokens in test files |
| **Risk** | Credential leak if test secrets match production |

**Finding:** Test files contain hardcoded secrets. If these match production credentials, they represent a direct credential leak. If they are test-only (fake/mock), the risk is lower but still poor practice.

**Remediation:**
1. Verify test secrets are NOT production credentials
2. Replace with environment variables or test fixtures
3. Add test credential patterns to pre-commit hook

---

### P1-5: Lucerna dossiers — 172 tracked files with PII

| Field | Value |
|-------|-------|
| **Severity** | P1 — HIGH (mitigated by private repo + not in Hugo build) |
| **Location** | `lucerna/dossiers/` — 172 tracked files |
| **Evidence** | OSINT reports, personal data, documents |
| **Risk** | GDPR exposure if repo becomes public |

**Finding:** The lucerna repository (currently private) contains 172 tracked files in `dossiers/` with personal information from OSINT investigations. These files are not included in Hugo builds (not in `content/`) but are in git history.

**Mitigating factors:**
- Repository is private on GitHub
- Files are not in Hugo `content/` directory (not deployed)
- This is the intended purpose of the lucerna repository (OSINT research)

**Remediation:**
1. Ensure `.gitignore` or Hugo config excludes `dossiers/` from builds
2. Before any repo visibility change, run `git-filter-repo` to purge sensitive files
3. Consider moving most sensitive dossiers to vault (SOPS-encrypted)
4. Add deployment pipeline check: verify no dossier content in Hugo output

---

## P2 — MEDIUM (action within 2 weeks)

### P2-1: fail2ban — single jail (sshd only)

| Field | Value |
|-------|-------|
| **Severity** | P2 |
| **Finding** | Only SSH jail active. No nginx-http-auth, nginx-botsearch, or custom jails |
| **Impact** | Web application brute-force not rate-limited by fail2ban |

**Note:** nginx-proxy may have its own rate limiting. Verify in Session B.

### P2-2: Docker image versions — not audited

| Field | Value |
|-------|-------|
| **Severity** | P2 |
| **Finding** | 27 running containers — image versions not checked for CVEs |
| **Impact** | Potential known vulnerabilities in container images |

**Defer to Session B** for full Docker image audit.

### P2-3: Backup verification — no restore test documented

| Field | Value |
|-------|-------|
| **Severity** | P2 |
| **Finding** | Backups run daily (confirmed in cron + logs), but no restore test documentation found |
| **Impact** | Backups may be corrupted or incomplete without testing |

**Defer to Session B** for backup deep dive.

### P2-4: Redis configs with group-read permissions

| Field | Value |
|-------|-------|
| **Severity** | P2 |
| **Location** | `/opt/folkup/secrets/redis*.conf` — permissions 640 root:deploy |
| **Finding** | Redis configs are 640 (group-readable by deploy) while all other secrets are 600 |
| **Impact** | Wider access than necessary |

---

## GREEN FLAGS (what's working well)

| Area | Status | Evidence |
|------|--------|----------|
| **SSH hardening** | EXCELLENT | PasswordAuth disabled, PubkeyOnly, MaxAuthTries 3, X11/TCP forwarding off |
| **Firewall (UFW)** | EXCELLENT | Deny incoming, only expected ports open, VPN-restricted services |
| **fail2ban** | GOOD | Active, 350 total bans, Telegram alerts, VPN subnet whitelisted |
| **Docker security** | GOOD | No privileged containers, socket only on nginx-proxy+acme |
| **TLS configuration** | EXCELLENT | TLSv1.2+1.3, modern ciphers, HSTS on all domains |
| **SSL certificates** | EXCELLENT | All expire Feb 2027 (11 months), LE auto-renew working |
| **Disk/Memory** | HEALTHY | 45% disk, 2.5G/7.6G RAM, no pressure |
| **Secrets management** | GOOD | /opt/folkup/secrets/ all 600 root:root, SOPS 16/16 decrypt OK |
| **Backup schedule** | GOOD | Daily: postgres, redis, keycloak, miniflux, n8n. Healthchecks.io heartbeat |
| **WireGuard VPN** | GOOD | 3 peers, port 53/UDP, Cockpit+n8n VPN-restricted |
| **Unattended upgrades** | ACTIVE | v2.9.1 installed |
| **OS** | CURRENT | Ubuntu 24.04, kernel 6.8.0-101, no reboot required |
| **SOPS recovery** | HIGH | RECOVERY.md with 3 backup locations documented |
| **Cron hygiene** | GOOD | 7 cron jobs, all backup/health related, no suspicious entries |

---

## Session B Scope (deferred)

| Phase | Items |
|-------|-------|
| **1.4 External Scan** | TLS grades (SSL Labs), security headers (CSP, X-Frame), robots.txt compliance for ~15 domains |
| **2.4 Docker Deep Dive** | Image versions, CVE scan, network isolation audit |
| **2.5 nginx-proxy** | Security headers per-site, CSP policies, rate limiting, access logs |
| **2.8 Keycloak** | Full config audit, realm settings, client configs, session policies |
| **3.1 Backup Strategy** | Offsite backup, RPO/RTO, restore testing |
| **3.2 SPOF Analysis** | Single points of failure, bus factor assessment |
| **3.3 DR Plan** | Disaster recovery runbook, failover procedures |
| **3.4 Monitoring** | Uptime Kuma 32 monitors coverage, alerting gaps |
| **Cloudflare** | Account security, API token scoping, WAF rules |

---

## Action List (P0/P1)

| # | Severity | Action | Owner | ETA | Status |
|---|----------|--------|-------|-----|--------|
| ~~1~~ | ~~P0~~ | ~~Move PII from team.yml to SOPS-encrypted file~~ | — | — | **CLOSED** (session 79: SOPS+filter-repo, 75 commits rewritten) |
| ~~2~~ | ~~P0~~ | ~~Locate and document SOPS age key actual path~~ | — | — | CLOSED (found at standard path) |
| 3 | P1 | Verify Keycloak OIDC issuer HTTPS configuration | Andrey (SSH) | Next SSH session | OPEN — recon 13.03: localhost returns http://, but KC_PROXY_HEADERS=xforwarded set. Likely OK via proxy. Test externally to confirm |
| ~~4~~ | ~~P1~~ | ~~Remove root authorized_keys entry~~ | — | — | **CLOSED** (recon 13.03: 0 keys in /root/.ssh/authorized_keys) |
| ~~5~~ | ~~P1~~ | ~~Review and apply 16 pending package updates~~ | — | — | **MOSTLY CLOSED** (recon 13.03: Docker 29.3.0 already updated. Only containerd.io 2.2.1→2.2.2 remains) |
| ~~6~~ | ~~P1~~ | ~~Verify DayForge test secrets are not production creds~~ | — | — | **CLOSED** (session 79: .env ≠ SOPS, not in git) |
| ~~7~~ | ~~P1~~ | ~~Ensure lucerna dossiers excluded from Hugo builds + add pipeline check~~ | — | — | **CLOSED** (session 79: dossiers/ outside content/, Hugo ignores by design. FP3D files verified absent from public/) |

---

**Prepared by:** FolkUp Research Lab
**Date:** 2026-03-11
**Classification:** INTERNAL — Security Audit (do not push)
**Next:** Session B — P2/P3 + Resilience Audit
