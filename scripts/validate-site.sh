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

# 6. Level 1 Compliance Check
echo "--- 6. Level 1 Compliance ---"
LEVEL1_ERRORS=0
# Check content/ for AI tool names (case-insensitive)
AI_MENTIONS=$(grep -riE "claude|anthropic|openai|chatgpt|gemini|copilot" content/ --include="*.md" || true)
if [ -n "$AI_MENTIONS" ]; then
    LEVEL1_ERRORS=$((LEVEL1_ERRORS + 1))
    error "AI tool names found in content (Level 1 violation)"
    echo "$AI_MENTIONS" | head -10
    echo ""
fi

# Check layouts/ for AI tool names
if [ -d "layouts" ]; then
    AI_LAYOUTS=$(grep -riE "claude|anthropic|openai|chatgpt|gemini|copilot" layouts/ || true)
    if [ -n "$AI_LAYOUTS" ]; then
        LEVEL1_ERRORS=$((LEVEL1_ERRORS + 1))
        error "AI tool names found in layouts (Level 1 violation)"
        echo "$AI_LAYOUTS" | head -5
        echo ""
    fi
fi

# Check static/ for AI tool names
if [ -d "static" ]; then
    AI_STATIC=$(grep -riE "claude|anthropic|openai|chatgpt|gemini|copilot" static/ --exclude-dir=".git" || true)
    if [ -n "$AI_STATIC" ]; then
        LEVEL1_ERRORS=$((LEVEL1_ERRORS + 1))
        error "AI tool names found in static files (Level 1 violation)"
        echo "$AI_STATIC" | head -5
        echo ""
    fi
fi

if [ "$LEVEL1_ERRORS" -eq 0 ]; then
    ok "Level 1 compliance: No AI tool names in public files"
fi
echo ""

# 7. Enhanced Publication Checks
echo "--- 7. Enhanced Publication ---"
ENHANCED_ERRORS=0

# AI pattern detection in content
AI_PATTERNS=$(grep -riE "\bdelve\b|\bmeticulous\b|it's worth noting|furthermore|moreover|additionally" content/ --include="*.md" || true)
if [ -n "$AI_PATTERNS" ]; then
    AI_PATTERN_COUNT=$(echo "$AI_PATTERNS" | wc -l)
    if [ "$AI_PATTERN_COUNT" -gt 5 ]; then
        warn "Potential AI patterns detected ($AI_PATTERN_COUNT instances)"
    fi
fi

# Check for placeholder content
PLACEHOLDER_CONTENT=$(grep -riE "lorem ipsum|placeholder|todo:|fixme:|xxx" content/ --include="*.md" || true)
if [ -n "$PLACEHOLDER_CONTENT" ]; then
    ENHANCED_ERRORS=$((ENHANCED_ERRORS + 1))
    error "Placeholder content found in articles"
    echo "$PLACEHOLDER_CONTENT" | head -5
    echo ""
fi

# Check naming_justified for articles that mention people
while IFS= read -r -d '' file; do
    # Extract content after frontmatter
    CONTENT_BODY=$(sed -n '/^---$/,/^---$/{/^---$/d;/^---$/d;n;:a;n;p;ba;}' "$file" 2>/dev/null)

    # Check if content mentions people (names with capital letters pattern)
    if echo "$CONTENT_BODY" | grep -qE "\b[A-ZÁÀÂÃÇÉÊÍÓÔÕÚ][a-záàâãçéêíóôõú]+ [A-ZÁÀÂÃÇÉÊÍÓÔÕÚ][a-záàâãçéêíóôõú]+"; then
        FRONT=$(sed -n '/^---$/,/^---$/p' "$file" | head -40)
        if ! echo "$FRONT" | grep -q "^naming_justified: *true"; then
            BASENAME=$(basename "$file")
            ENHANCED_ERRORS=$((ENHANCED_ERRORS + 1))
            error "Article mentions people but missing naming_justified: true in $BASENAME"
        fi
    fi
done < <(find content/investigations content/studies -name "*.md" ! -name "_index*" -type f -print0 2>/dev/null)

if [ "$ENHANCED_ERRORS" -eq 0 ]; then
    ok "Enhanced publication checks passed"
fi
echo ""

# 8. Content Quality Verification
echo "--- 8. Content Quality ---"
QUALITY_ERRORS=0

# Check metadata consistency (date_created <= date_updated)
while IFS= read -r -d '' file; do
    FRONT=$(sed -n '/^---$/,/^---$/p' "$file" | head -40)
    DATE_CREATED=$(echo "$FRONT" | grep "^date_created:" | head -1 | sed 's/date_created: *//;s/"//g')
    DATE_UPDATED=$(echo "$FRONT" | grep "^date_updated:" | head -1 | sed 's/date_updated: *//;s/"//g')

    if [ -n "$DATE_CREATED" ] && [ -n "$DATE_UPDATED" ]; then
        # Convert dates to comparable format (YYYY-MM-DD)
        CREATED_COMP=$(echo "$DATE_CREATED" | sed 's/T.*//')
        UPDATED_COMP=$(echo "$DATE_UPDATED" | sed 's/T.*//')

        if [[ "$CREATED_COMP" > "$UPDATED_COMP" ]]; then
            BASENAME=$(basename "$file")
            QUALITY_ERRORS=$((QUALITY_ERRORS + 1))
            error "date_created ($DATE_CREATED) after date_updated ($DATE_UPDATED) in $BASENAME"
        fi
    fi
done < <(find content -name "*.md" ! -name "_index*" -type f -print0 2>/dev/null)

# Check category validation (only for investigations and studies)
VALID_CATEGORIES="legal|corporate|financial|political|environmental|social|technology|historical"
while IFS= read -r -d '' file; do
    FRONT=$(sed -n '/^---$/,/^---$/p' "$file" | head -40)
    CATEGORY=$(echo "$FRONT" | grep "^category:" | head -1 | sed 's/category: *//;s/"//g')
    STATUS=$(echo "$FRONT" | grep "^status:" | head -1 | sed 's/status: *//;s/"//g')

    # Skip drafts and stubs for category validation
    if [ "$STATUS" = "draft" ] || [ "$STATUS" = "stub" ]; then
        continue
    fi

    if [ -n "$CATEGORY" ] && ! echo "$CATEGORY" | grep -qE "^($VALID_CATEGORIES)$"; then
        BASENAME=$(basename "$file")
        QUALITY_ERRORS=$((QUALITY_ERRORS + 1))
        error "Invalid category '$CATEGORY' in $BASENAME"
    fi
done < <(find content/investigations content/studies -name "*.md" ! -name "_index*" -type f -print0 2>/dev/null)

# Check word count minimums (non-stub articles >= 500 words)
while IFS= read -r -d '' file; do
    FRONT=$(sed -n '/^---$/,/^---$/p' "$file" | head -40)
    STATUS=$(echo "$FRONT" | grep "^status:" | head -1 | sed 's/status: *//;s/"//g')

    # Skip stubs and drafts for word count
    if [ "$STATUS" = "stub" ] || [ "$STATUS" = "draft" ]; then
        continue
    fi

    # Count words in content body (after frontmatter)
    WORD_COUNT=$(sed -n '/^---$/,/^---$/{/^---$/d;/^---$/d;n;:a;n;p;ba;}' "$file" 2>/dev/null | wc -w)

    if [ "$WORD_COUNT" -lt 500 ]; then
        BASENAME=$(basename "$file")
        warn "Article has only $WORD_COUNT words (< 500 minimum): $BASENAME"
    fi
done < <(find content -name "*.md" ! -name "_index*" -type f -print0 2>/dev/null)

# Check language file consistency (.md + .en.md pairs)
while IFS= read -r file; do
    if [[ "$file" == *.md ]] && [[ "$file" != *.en.md ]] && [[ "$file" != *.pt.md ]] && [[ "$file" != *.ru.md ]]; then
        EN_FILE="${file%.md}.en.md"
        if [ -f "$EN_FILE" ]; then
            # Check if both files have same frontmatter structure (title, status)
            MAIN_TITLE=$(grep "^title:" "$file" | head -1)
            EN_TITLE=$(grep "^title:" "$EN_FILE" | head -1)
            MAIN_STATUS=$(grep "^status:" "$file" | head -1)
            EN_STATUS=$(grep "^status:" "$EN_FILE" | head -1)

            if [ -n "$MAIN_STATUS" ] && [ -n "$EN_STATUS" ] && [ "$MAIN_STATUS" != "$EN_STATUS" ]; then
                BASENAME=$(basename "$file")
                QUALITY_ERRORS=$((QUALITY_ERRORS + 1))
                error "Status mismatch between $BASENAME and ${BASENAME%.md}.en.md"
            fi
        fi
    fi
done < <(find content -name "*.md" ! -name "_index*" -type f 2>/dev/null)

if [ "$QUALITY_ERRORS" -eq 0 ]; then
    ok "Content quality verification passed"
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
