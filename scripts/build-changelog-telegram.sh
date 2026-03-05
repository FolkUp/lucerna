#!/bin/bash
# build-changelog-telegram.sh — FolkUp Telegram deploy notification
# Adapted for Lucerna (Blowfish theme, config in config/_default/)
#
# Usage: ./scripts/build-changelog-telegram.sh [output_file]
# If no content changes detected — exits WITHOUT creating the file.

set -euo pipefail

OUTPUT="${1:-/tmp/changelog-telegram.txt}"
MAX_CHARS=3900

# --- Extract project info from hugo config ---
HUGO_YAML="config/_default/hugo.yaml"
if [ ! -f "$HUGO_YAML" ]; then
  HUGO_YAML="hugo.yaml"
fi
BASE_URL=$(grep -m1 '^baseURL:' "$HUGO_YAML" | sed 's/baseURL:[[:space:]]*"\?\(.*\)"\?/\1/' | tr -d '"' | sed 's:/*$::')
SITE_TITLE="Lucerna"
DEPLOY_DATE=$(date -u +'%d %b %Y, %H:%M UTC')
DOMAIN=$(echo "$BASE_URL" | sed 's|https\?://||')

# --- HTML-escape helper ---
html_escape() {
  echo "$1" | sed 's/&/\&amp;/g; s/</\&lt;/g; s/>/\&gt;/g'
}

# --- Get changed content files from the latest push ---
CHANGED_FILES=$(git diff --name-only --diff-filter=ACMR HEAD~1 HEAD -- 'content/' 2>/dev/null || echo "")

if [ -z "$CHANGED_FILES" ]; then
  exit 0
fi

# --- Categorize files ---
NEW_FILES=""
UPDATED_FILES=""

for f in $CHANGED_FILES; do
  if git diff --name-only --diff-filter=A HEAD~1 HEAD -- "$f" | grep -q .; then
    NEW_FILES="${NEW_FILES}${f}\n"
  else
    UPDATED_FILES="${UPDATED_FILES}${f}\n"
  fi
done

# --- Helper: extract title from .md file ---
get_title() {
  local file="$1"
  if [ -f "$file" ]; then
    local title
    title=$(sed -n '/^---$/,/^---$/p' "$file" | grep -m1 '^title:' | sed 's/title:[[:space:]]*"\?\(.*\)"\?/\1/' | tr -d '"')
    html_escape "$title"
  else
    html_escape "$(basename "$file" .md | tr '-' ' ')"
  fi
}

# --- Helper: convert content path to public URL ---
path_to_url() {
  local file="$1"
  local rel="${file#content/}"
  rel=$(echo "$rel" | sed 's/\.\(ru\|en\)\.md$/.md/')
  rel=$(echo "$rel" | sed 's/_\?index\.md$//')
  rel=$(echo "$rel" | sed 's/\.md$/\//')
  [[ "$rel" != /* ]] && rel="/${rel}"
  rel=$(echo "$rel" | sed 's://:/:g')
  echo "${BASE_URL}${rel}"
}

# --- Helper: check if file is a language variant ---
is_lang_variant() {
  echo "$1" | grep -qE '\.(ru|en)\.md$'
}

# --- Count unique articles ---
count_articles() {
  local files="$1"
  local count=0
  while IFS= read -r f; do
    [ -z "$f" ] && continue
    if is_lang_variant "$f"; then continue; fi
    count=$((count + 1))
  done < <(echo -e "$files")
  echo "$count"
}

NEW_COUNT=$(count_articles "$NEW_FILES")
UPD_COUNT=$(count_articles "$UPDATED_FILES")

if [ "$NEW_COUNT" -eq 0 ] && [ "$UPD_COUNT" -eq 0 ]; then
  exit 0
fi

# --- Build message ---
MSG="&#128230; <b>${SITE_TITLE}</b>"
MSG="${MSG}"$'\n'"Deploy successful &#8212; ${DEPLOY_DATE}"

ITEMS=""
if [ -n "$NEW_FILES" ] && [ "$NEW_COUNT" -gt 0 ]; then
  while IFS= read -r f; do
    [ -z "$f" ] && continue
    if is_lang_variant "$f"; then continue; fi
    TITLE=$(get_title "$f")
    URL=$(path_to_url "$f")
    ITEMS="${ITEMS}"$'\n'"  &#8594; <a href=\"${URL}\">${TITLE}</a>"
  done < <(echo -e "$NEW_FILES")
  if [ -n "$ITEMS" ]; then
    MSG="${MSG}"$'\n'$'\n'"<b>New (${NEW_COUNT}):</b>${ITEMS}"
    ITEMS=""
  fi
fi

if [ -n "$UPDATED_FILES" ] && [ "$UPD_COUNT" -gt 0 ]; then
  while IFS= read -r f; do
    [ -z "$f" ] && continue
    if is_lang_variant "$f"; then continue; fi
    TITLE=$(get_title "$f")
    URL=$(path_to_url "$f")
    ITEMS="${ITEMS}"$'\n'"  &#8594; <a href=\"${URL}\">${TITLE}</a>"
  done < <(echo -e "$UPDATED_FILES")
  if [ -n "$ITEMS" ]; then
    MSG="${MSG}"$'\n'$'\n'"<b>Updated (${UPD_COUNT}):</b>${ITEMS}"
  fi
fi

MSG="${MSG}"$'\n'$'\n'"&#128279; <a href=\"${BASE_URL}/\">${DOMAIN}</a>"

if [ ${#MSG} -gt $MAX_CHARS ]; then
  MSG="${MSG:0:$MAX_CHARS}"$'\n'"..."
fi

echo "$MSG" > "$OUTPUT"
echo "$OUTPUT"
