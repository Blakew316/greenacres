#!/usr/bin/env bash
# Downloads the photos, menus, price sheets and PDFs that the original
# greenacresbowl.com pages referenced, into the paths the new pages expect.
# Runs automatically in the Netlify build (see netlify.toml); can also be run
# locally from the repository root:  bash scripts/fetch-original-assets.sh
# Requires: curl, node.
set -uo pipefail
cd "$(dirname "$0")/.."
MANIFEST=scripts/assets-manifest.json
BASE=$(node -e "process.stdout.write(require('./$MANIFEST').base)")
ok=0; fail=0
while IFS=$'\t' read -r from to; do
  mkdir -p "$(dirname "$to")"
  if [ -s "$to" ]; then ok=$((ok+1)); continue; fi
  url="$BASE$from"
  if curl -fsSL --retry 3 --retry-delay 2 --max-time 60 -A "Mozilla/5.0 (compatible; GreenAcresBowl-site-build)" -o "$to" "$url"; then
    echo "saved  $to"; ok=$((ok+1))
  else
    echo "FAILED $url" >&2; rm -f "$to"; fail=$((fail+1))
  fi
done < <(node -e "for (const f of require('./$MANIFEST').files) process.stdout.write(f.from + '\t' + f.to + '\n')")
echo "assets: $ok ok, $fail failed"
[ "$fail" -eq 0 ]
