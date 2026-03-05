#!/bin/bash
# build-changelog-email.sh — FolkUp deploy report email for Lucerna
# If no content changes detected — exits WITHOUT creating the file.

set -euo pipefail

OUTPUT="${1:-/tmp/changelog-email.html}"

# --- Extract project info ---
HUGO_YAML="config/_default/hugo.yaml"
if [ ! -f "$HUGO_YAML" ]; then
  HUGO_YAML="hugo.yaml"
fi
BASE_URL=$(grep -m1 '^baseURL:' "$HUGO_YAML" | sed 's/baseURL:[[:space:]]*"\?\(.*\)"\?/\1/' | tr -d '"' | sed 's:/*$::')
SITE_TITLE="Lucerna"
DEPLOY_DATE=$(date -u +'%d %B %Y')
MONTH_YEAR=$(date +'%B %Y')
YEAR=$(date +'%Y')

# --- Get changed content files ---
CHANGED_FILES=$(git diff --name-only --diff-filter=ACMR HEAD~1 HEAD -- 'content/' 2>/dev/null || echo "")

if [ -z "$CHANGED_FILES" ]; then
  exit 0
fi

# --- Helpers ---
get_title() {
  local file="$1"
  if [ -f "$file" ]; then
    sed -n '/^---$/,/^---$/p' "$file" | grep -m1 '^title:' | sed 's/title:[[:space:]]*"\?\(.*\)"\?/\1/' | tr -d '"'
  else
    basename "$file" .md | tr '-' ' '
  fi
}

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

is_lang_variant() {
  echo "$1" | grep -qE '\.(ru|en)\.md$'
}

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

# --- Branded header ---
branded_header() {
  cat <<'HEADER'
<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>FolkUp Deploy Report</title>
  <style>
    @media only screen and (max-width: 660px) {
      .email-card { width: 100% !important; border-radius: 0 !important; }
      .email-padding { padding-left: 20px !important; padding-right: 20px !important; }
    }
  </style>
</head>
<body style="margin:0;padding:0;background-color:#F0EDE8;font-family:'Source Sans 3',Arial,Helvetica,sans-serif;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#F0EDE8;">
<tr><td align="center" style="padding:24px 16px;">
<table role="presentation" class="email-card" width="640" cellpadding="0" cellspacing="0" style="max-width:640px;width:100%;background-color:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
<tr>
<td style="background:linear-gradient(135deg,#2D3436 0%,#3d4548 100%);padding:32px 40px;text-align:center;" class="email-padding">
  <img src="https://docs.folkup.app/images/folkup-email-logo.png?v=2" alt="FolkUp" width="260" style="display:block;margin:0 auto 16px;max-width:260px;height:auto;">
  <div style="color:#E8AD4A;font-size:14px;letter-spacing:3px;text-transform:uppercase;font-weight:bold;">Deploy Report</div>
HEADER
  echo "  <div style=\"color:#9DA5AB;font-size:12px;margin-top:6px;\">${MONTH_YEAR}</div>"
  echo '</td>'
  echo '</tr>'
}

branded_footer() {
  cat <<FOOTER
<tr>
<td style="background-color:#FEFCF6;border-bottom:2px solid #E8AD4A;padding:20px 40px;text-align:center;" class="email-padding">
  <div style="color:#7D4450;font-size:12px;line-height:1.6;">FolkUp &middot; Knowledge, organized.</div>
  <div style="color:#6B6560;font-size:10px;margin-top:4px;">&copy; ${YEAR} FolkUp</div>
</td>
</tr>
</table>
</td></tr>
</table>
</body>
</html>
FOOTER
}

# --- Build email ---
{
  branded_header

  echo '<tr><td style="padding:32px 40px;color:#2A2725;font-size:15px;line-height:1.6;" class="email-padding">'
  echo "<h2 style=\"margin:0 0 8px;color:#2A2725;font-size:20px;font-family:'Source Sans 3',Arial,Helvetica,sans-serif;\">${SITE_TITLE} &mdash; Deploy Report</h2>"
  echo "<p style=\"margin:0 0 20px;color:#6B6560;font-size:13px;\">${DEPLOY_DATE}</p>"

  PRINTED_NEW=0
  if [ -n "$NEW_FILES" ] && [ "$NEW_COUNT" -gt 0 ]; then
    while IFS= read -r f; do
      [ -z "$f" ] && continue
      if is_lang_variant "$f"; then continue; fi
      if [ "$PRINTED_NEW" -eq 0 ]; then
        echo "<h3 style=\"margin:16px 0 8px;color:#2A2725;font-size:16px;\">New (${NEW_COUNT})</h3>"
        echo "<ul style=\"margin:0;padding-left:20px;\">"
        PRINTED_NEW=1
      fi
      TITLE=$(get_title "$f")
      URL=$(path_to_url "$f")
      echo "  <li style=\"margin:4px 0;\"><a href=\"${URL}\" style=\"color:#7D4450;text-decoration:none;\">${TITLE}</a></li>"
    done < <(echo -e "$NEW_FILES")
    if [ "$PRINTED_NEW" -eq 1 ]; then echo "</ul>"; fi
  fi

  PRINTED_UPD=0
  if [ -n "$UPDATED_FILES" ] && [ "$UPD_COUNT" -gt 0 ]; then
    while IFS= read -r f; do
      [ -z "$f" ] && continue
      if is_lang_variant "$f"; then continue; fi
      if [ "$PRINTED_UPD" -eq 0 ]; then
        echo "<h3 style=\"margin:16px 0 8px;color:#2A2725;font-size:16px;\">Updated (${UPD_COUNT})</h3>"
        echo "<ul style=\"margin:0;padding-left:20px;\">"
        PRINTED_UPD=1
      fi
      TITLE=$(get_title "$f")
      URL=$(path_to_url "$f")
      echo "  <li style=\"margin:4px 0;\"><a href=\"${URL}\" style=\"color:#7D4450;text-decoration:none;\">${TITLE}</a></li>"
    done < <(echo -e "$UPDATED_FILES")
    if [ "$PRINTED_UPD" -eq 1 ]; then echo "</ul>"; fi
  fi

  echo "<hr style=\"border:none;border-top:2px solid #E8AD4A;margin:24px 0;\">"
  echo "<p style=\"margin:0;\"><a href=\"${BASE_URL}/\" style=\"color:#7D4450;text-decoration:none;\">${SITE_TITLE}</a></p>"

  echo '</td></tr>'

  branded_footer
} > "$OUTPUT"

echo "$OUTPUT"
