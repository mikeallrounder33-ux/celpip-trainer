#!/bin/sh
# Assemble the single-file CELPIP trainer from the numbered parts.
# Usage:  sh celpip-src/build.sh
set -e
DIR="$(cd "$(dirname "$0")" && pwd)"
OUT="$DIR/../celpip-trainer.html"

cat \
  "$DIR/00-head.html" \
  "$DIR/10-core.js" \
  "$DIR/20-bank-listening-a.js" \
  "$DIR/21-bank-listening-b.js" \
  "$DIR/22-bank-reading-a.js" \
  "$DIR/23-bank-reading-b.js" \
  "$DIR/24-bank-writing-speaking.js" \
  "$DIR/30-generator-rater.js" \
  "$DIR/40-module-listening-reading.js" \
  "$DIR/41-module-writing.js" \
  "$DIR/42-module-speaking.js" \
  "$DIR/50-app.js" \
  "$DIR/99-foot.html" \
  > "$OUT"

echo "Built $OUT ($(wc -c < "$OUT" | tr -d ' ') bytes)"
