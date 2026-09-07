#!/usr/bin/env bash
# Downloads the photos, menus, price sheets and PDFs that the original
# greenacresbowl.com pages referenced, into the paths the new pages expect.
# Requires: curl, python3. Run from the repository root:
#   bash scripts/fetch-original-assets.sh
set -uo pipefail
cd "$(dirname "$0")/.."
MANIFEST=scripts/assets-manifest.json
BASE=$(python3 -c "import json;print(json.load(open('$MANIFEST'))['base'])")
ok=0; fail=0
while IFS=$'\t' read -r from to; do
  mkdir -p "$(dirname "$to")"
  if [ -s "$to" ]; then echo "skip   $to (exists)"; ok=$((ok+1)); continue; fi
  url="$BASE$from"
  if curl -fsSL --retry 3 --max-time 60 -o "$to" "$url"; then
    echo "saved  $to"; ok=$((ok+1))
  else
    echo "FAILED $url" >&2; rm -f "$to"; fail=$((fail+1))
  fi
done < <(python3 -c "
import json
for f in json.load(open('$MANIFEST'))['files']:
    print(f['from'] + '\t' + f['to'])
")
echo "done: $ok ok, $fail failed"
[ "$fail" -eq 0 ]
