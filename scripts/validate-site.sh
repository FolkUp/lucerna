#!/bin/bash
# validate-site.sh — Lucerna site validation
# Usage: bash scripts/validate-site.sh

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

ERRORS=0
WARNINGS=0

error() { echo -e "${RED}ERROR:${NC} $1"; ERRORS=$((ERRORS + 1)); }
warn()  { echo -e "${YELLOW}WARN:${NC} $1"; WARNINGS=$((WARNINGS + 1)); }
ok()    { echo -e "${GREEN}OK:${NC} $1"; }

echo "=== Lucerna — Site Validation ==="
echo ""

# 1. Hugo build
echo "--- 1. Hugo build ---"
BUILD_OUTPUT=$(hugo --gc --minify 2>&1) || true
if echo "$BUILD_OUTPUT" | grep -q "^ERROR"; then
    error "Hugo build failed"
    echo "$BUILD_OUTPUT" | grep "^ERROR"
else
    ok "Hugo build successful"
fi
BUILD_WARNINGS=$(echo "$BUILD_OUTPUT" | grep "^WARN" || true)
if [ -n "$BUILD_WARNINGS" ]; then
    WARN_COUNT=$(echo "$BUILD_WARNINGS" | wc -l)
    warn "Build warnings: $WARN_COUNT"
fi
echo ""

# 2. Article count
echo "--- 2. Article count ---"
ARTICLES=$(find content -name "*.md" ! -name "_index*" -type f 2>/dev/null | wc -l)
echo "  Content files: $ARTICLES"
if [ "$ARTICLES" -lt 3 ]; then
    error "Fewer than 3 content files"
fi
echo ""

# 3. .md links in HTML
echo "--- 3. .md links in HTML ---"
MD_LINKS=$(grep -rl 'href="[^"]*\.md"' public/ --include="*.html" 2>/dev/null | grep -v "searchindex\.\|print\.\|lawyer-pack/" || true)
if [ -n "$MD_LINKS" ]; then
    MD_COUNT=$(echo "$MD_LINKS" | wc -l)
    error "Found .md links in $MD_COUNT HTML files"
    echo "$MD_LINKS" | head -5
else
    ok "No .md links in HTML"
fi
echo ""

# 4. Frontmatter (title required)
echo "--- 4. Frontmatter ---"
FM_ERRORS=0
for f in $(find content -name "*.md" ! -name "_index*" -type f 2>/dev/null); do
    if ! head -30 "$f" | grep -q "^title:"; then
        error "Missing title: in $f"
        FM_ERRORS=$((FM_ERRORS + 1))
    fi
done
if [ "$FM_ERRORS" -eq 0 ]; then
    ok "All content files have title"
fi
echo ""

# 5. Publication compliance (investigations + studies)
echo "--- 5. Publication compliance ---"
PUB_ERRORS=0
for f in $(find content/investigations content/studies -name "*.md" ! -name "_index*" -type f 2>/dev/null); do
    FRONT=$(sed -n '/^---$/,/^---$/p' "$f" | head -40)
    STATUS=$(echo "$FRONT" | grep "^status:" | head -1 | sed 's/status: *//;s/"//g')

    # Skip drafts and stubs
    if [ "$STATUS" = "draft" ] || [ "$STATUS" = "stub" ]; then
        continue
    fi

    BASENAME=$(basename "$f")

    # Check pii_reviewed
    if ! echo "$FRONT" | grep -q "^pii_reviewed: *true"; then
        error "Missing pii_reviewed: true in $BASENAME"
        PUB_ERRORS=$((PUB_ERRORS + 1))
    fi

    # Check reviewed_by
    if ! echo "$FRONT" | grep -q "^reviewed_by:"; then
        error "Missing reviewed_by in $BASENAME"
        PUB_ERRORS=$((PUB_ERRORS + 1))
    fi

    # Check review_date
    if ! echo "$FRONT" | grep -q "^review_date:"; then
        error "Missing review_date in $BASENAME"
        PUB_ERRORS=$((PUB_ERRORS + 1))
    fi

    # Check legal_risk (warn if missing, not error — field is new)
    if ! echo "$FRONT" | grep -q "^legal_risk:"; then
        warn "Missing legal_risk in $BASENAME (new field)"
    fi

    # Check sources_count >= 2 for verified/partially_verified
    if [ "$STATUS" = "verified" ] || [ "$STATUS" = "partially_verified" ]; then
        SRC_COUNT=$(echo "$FRONT" | grep "^sources_count:" | head -1 | sed 's/sources_count: *//')
        if [ -n "$SRC_COUNT" ] && [ "$SRC_COUNT" -lt 2 ] 2>/dev/null; then
            error "sources_count < 2 for $STATUS article: $BASENAME"
            PUB_ERRORS=$((PUB_ERRORS + 1))
        fi
    fi
done
if [ "$PUB_ERRORS" -eq 0 ]; then
    ok "All investigations and studies pass publication compliance"
fi
echo ""

# Summary
echo "==============================="
echo -e "Errors:   ${RED}$ERRORS${NC}"
echo -e "Warnings: ${YELLOW}$WARNINGS${NC}"
echo "==============================="
if [ "$ERRORS" -gt 0 ]; then
    echo -e "${RED}FAILED${NC}"
    exit 1
else
    echo -e "${GREEN}PASSED${NC}"
    exit 0
fi
