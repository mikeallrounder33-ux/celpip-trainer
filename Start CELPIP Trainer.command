#!/bin/bash
# Double-click this file to run the trainer with everything working
# (microphone + API calls, which browsers block on a plain file:// page).
cd "$(dirname "$0")"
PORT=4180
# if something is already serving on the port, just open the page
if ! lsof -nP -iTCP:$PORT -sTCP:LISTEN >/dev/null 2>&1; then
  echo "Starting local server on port $PORT…"
  python3 -m http.server $PORT >/dev/null 2>&1 &
  sleep 1
fi
open "http://localhost:$PORT/celpip-trainer.html"
echo ""
echo "  CELPIP Trainer is running at http://localhost:$PORT/celpip-trainer.html"
echo "  Leave this window open while you practise."
echo "  Close this window (or press Ctrl-C) when you are finished."
echo ""
wait
