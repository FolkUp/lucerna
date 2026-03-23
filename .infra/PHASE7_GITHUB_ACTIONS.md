# INFR-127 Phase 7: GitHub Actions Webhook Setup

**Date:** 22.03.2026
**Status:** CONDITIONAL_PASS
**Blocker:** GitHub org secrets require manual setup by Андрей

---

## Execution Summary

### Step 7.1: Check org secrets
- **Command:** `gh secret list --org FolkUp`
- **Result:** ❌ EMPTY — no secrets found
- **Required secrets:**
  - `TELEGRAM_NOTIFY_BOT_TOKEN`
  - `TELEGRAM_NOTIFY_CHAT_ID`

### Step 7.2: Setup workflow file ✅
- **Source:** `deploy/github/workflows/notify-telegram.yml`
- **Destination:** `.github/workflows/notify-telegram.yml`
- **Action:** Copied, staged, committed
- **Security:** Workflow uses secure `env:` block (no template injection risk)

### Step 7.3: Commit and push ✅
- **Commit:** `4ec111a`
- **Message:** "INFR-127: Add GitHub Actions webhook for Telegram notifications"
- **Status:** Pushed to main
- **Build status:** GH Actions available, but workflow will skip if secrets missing (graceful fallback per line 42-44 of notify-telegram.yml)

### Step 7.4: Workflow triggers
Workflow activated on:
- `fork` — repo forked
- `watch.started` — repo starred (test via UI)
- `issues` — opened/closed
- `pull_request` — opened/closed/merged
- `public` — repo visibility changed

---

## Workflow Details

**File:** `.github/workflows/notify-telegram.yml` (96 lines)

**Security checks:**
- ✅ All `github.event.*` values passed via `env:` block (prevents script injection)
- ✅ Bot token and chat ID gated by `if [ -z "$BOT_TOKEN" ]` (skips gracefully)
- ✅ Message formatting via `case` statement (safe)
- ✅ curl `-sf` (silent, fail on HTTP error)
- ✅ `--data-urlencode` used for message text (safe URL encoding)

---

## Blocking Item (P0): GitHub Org Secrets

**Action required from Андрей:**

1. Navigate to: https://github.com/organizations/FolkUp/settings/secrets/actions
2. Create org-level action secrets:
   - Name: `TELEGRAM_NOTIFY_BOT_TOKEN`
     Value: [FolkUp Telegram bot token]
   - Name: `TELEGRAM_NOTIFY_CHAT_ID`
     Value: [FolkUp Deploy group thread ID or chat ID]

   *Note:* Thread ID 9 is hardcoded in workflow (line 33). If different, update workflow.

3. Verify by starring lucerna repo — should see Telegram notification

---

## Test Plan

Once secrets are configured:

1. **Test trigger:** Star the repo via GH web UI
2. **Expected message:**
   ```
   [GH] Star
   FolkUp/lucerna starred by @anklemPT
   ---
   2026-03-22 23:48 UTC
   ```
3. **Verification:** Check FolkUp Deploy Telegram group topic 9

---

## Rollback

If workflow needs disable:
```bash
git rm .github/workflows/notify-telegram.yml
git commit -m "Disable GitHub Actions Telegram webhook"
git push origin main
```

Or just don't set secrets in GitHub.

---

## Files Changed

- `.github/workflows/notify-telegram.yml` — NEW (96 lines)

## Next Steps

1. **MANUAL (Андрей):** Set org secrets in GitHub
2. **TEST:** Star lucerna repo, verify Telegram notification
3. **CLOSURE:** Update PLAN.md → Phase 7 status = PASS

---

## Risk Assessment

- **Graceful degradation:** Workflow skips if secrets missing (no CI/CD blocker)
- **Security:** Injection-safe environment variables
- **Rate limiting:** Single notification per event (Telegram API rate limit not a concern for FolkUp scale)
