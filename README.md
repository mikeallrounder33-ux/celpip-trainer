# CELPIP-General Trainer

A single-file practice platform for the CELPIP-General test. No build step, no backend,
no database, no account. Open one HTML file and it runs.

**Free to run with no API key at all** — see [Running it free](#running-it-free).

> Not affiliated with CELPIP or Paragon Testing Enterprises. Every practice item is
> original. Reported bands are estimates, not official results.

---

## What it does

| | |
|---|---|
| **Listening** | 6 parts, 38 questions, 55 min. Audio plays **once** via speech synthesis — no replay, no transcript until review. A distinct voice and accent per speaker. |
| **Reading** | 4 parts, 38 questions, 56 min. Diagrams rendered as HTML/SVG, never images. |
| **Writing** | Task 1 email (27 min) + Task 2 survey (26 min). Live word count, spellcheck disabled. |
| **Speaking** | 8 scored tasks + 1 unscored practice. Prep and recording start automatically. No pause, no re-record, no skip. |

**Modes:** Drill (one task type) · Section (one full module, real timing) · Full Mock
(all four back to back, ~3 hours) · Review (past attempts side by side).

### Built for specific weaknesses

1. **Time-use tracker** — submit with >20% left and it blocks you once with a modal. Logs time-used % on every attempt.
2. **Forced proofread gate** — Writing submits open a 90-second review with a 4-item checklist you must tick.
3. **Template-dependency detector** — flags 20 memorised scaffolds ("I hope this email finds you well"), counts density, caps Vocabulary in the rater prompt when it is high, and offers two natural alternatives for each.
4. **Recurring error log** — every graded error persists to a table sorted by frequency. Top 5 surface as "Your repeat offenders". Tracks homophones, dropped verb forms, missing end punctuation, run-ons, spelling, articles, register.
5. **Register checker** — classifies the recipient formal/semi-formal/informal and flags wrong salutations, contractions in formal mail, and gendered salutations when the recipient's gender is unknown.
6. **Dashboard** — CLB trend per module, average time-used %, template count per attempt, repeat errors, tasks not yet attempted.

### Scoring

Listening and Reading are auto-marked out of 38 with an estimated band
(36–38 = CLB 10+ · 33–35 = 9 · 29–32 = 8 · 25–28 = 7 · 21–24 = 6 · 17–20 = 5).

Writing and Speaking are scored on the four official dimensions **separately**, then
combined with a **lowest-anchored blend** — pulled toward your weakest dimension, never
a generous average. The blend is always recomputed locally, so no model can hand back an
inflated overall.

---

## Running it

```bash
python3 -m http.server 4180
```

Then open <http://localhost:4180/celpip-trainer.html>.

Opening the file directly by double-clicking works too, but browsers block the
**microphone** and **outbound API calls** on `file://`, so Speaking and any AI features
will not work. Serving over `localhost` costs one command and avoids both problems.

**Settings → Run diagnostics** checks the origin, storage, voices, microphone and API
in one pass and tells you the fix for anything that fails.

---

## Running it free

The built-in bank — 20 Listening passages, 20 Reading passages, 20 Writing prompts,
28 Speaking prompts — works with **no key and no internet**. Timers, all four detectors,
the error log and a strict offline rater all run locally. This alone is a complete
practice environment.

Adding a model gets you unlimited *fresh* items and full rubric feedback with a model
rewrite. You do not need to pay for that:

### In-browser model — no key, no account, no install ★

**Settings → Provider → "In-browser model" → Download and load model.**

That is the whole setup. An open-weights model downloads once from a CDN and runs on
your GPU through WebGPU. No key, no account, no billing, and nothing you write leaves
the machine. After the first download the browser caches the weights, so it works
offline afterwards.

| Model | Size | Good for |
|---|---|---|
| Qwen 2.5 1.5B | ~1.0 GB | fastest; often too weak for the rating schema |
| Llama 3.2 3B | ~1.9 GB | balanced |
| **Qwen 2.5 3B** | ~2.0 GB | **recommended** — returns all four dimensions reliably |
| Qwen 2.5 7B | ~4.7 GB | best quality, needs a strong GPU |

Measured on an Apple M-series Mac with Qwen 2.5 3B: a full four-dimension rating with
evidence quotes plus a rewritten sample took **21 seconds**. Requires Chrome, Edge, or
Safari 18+ (WebGPU). Item *generation* still often falls back to the built-in bank at
this size — the strict passage schemas are hard for a 3B model — but *marking* works.

### Ollama — free, private, no key

```bash
brew install ollama          # or download from ollama.com
ollama pull llama3.1:8b
launchctl setenv OLLAMA_ORIGINS "*"   # lets the browser reach it; restart Ollama after
```

In the app: **Settings → Provider → OpenAI-compatible → preset "Ollama (local, free, no key)"** → Save.

Nothing leaves your machine. Small models sometimes fail the strict JSON item format —
when that happens the app says so and falls back to the bank. `qwen2.5:14b` or a 70B
model is markedly more reliable if you have the RAM.

### Other options

| Preset | Cost | Key |
|---|---|---|
| **In-browser model** | **free, local** | **none** |
| Ollama / LM Studio | free, local | none |
| Groq | free tier | free signup, no card |
| OpenRouter (`:free` models) | free | free signup |
| OpenAI / Anthropic | paid | requires credit |

### Keeping a key off the browser entirely

If you do use a paid provider, you do not have to put the key in the browser. Deploy
[`worker/celpip-proxy.js`](worker/celpip-proxy.js) as a free Cloudflare Worker, store the
key as a Worker secret, then in Settings choose OpenAI-compatible, set Base URL to your
worker, and tick **"This endpoint needs no key from the browser"**. The key stays
server-side and never reaches the page.

The rater prompt is tuned against Claude. Other models follow it but tend to mark about
a band more generously — read their per-dimension numbers as slightly optimistic.

---

## Your data

Everything lives in `localStorage` under `celpip_` keys. It is **per browser profile and
per address** — a different Chrome profile or a different URL starts empty. That is the
usual reason the app "stops working" after switching accounts.

Use **Settings → Export JSON** to back up, and **Import JSON** to move or merge history.
Exports deliberately exclude your API key.

---

## Editing it

`celpip-trainer.html` is generated. Edit the numbered parts in `celpip-src/`, then:

```bash
sh celpip-src/build.sh
```

| Part | Contents |
|---|---|
| `00-head` | CSS and app shell |
| `10-core` | storage, timers, API client, template detector, register checker, error detector, speech synthesis |
| `20`–`21` | Listening bank (20 passages, 124 questions) |
| `22`–`23` | Reading bank (20 passages, 190 questions) |
| `24` | Writing + Speaking prompts, 5 SVG scenes |
| `30` | item generator and rater (API + offline) |
| `40`–`42` | Listening/Reading, Writing, Speaking runners |
| `50` | dashboard, review, settings, router, full mock |

Adding bank items is just appending an object to the relevant array — the schemas are
documented by example at the top of each bank file, and a structural validator rejects
malformed items at runtime.

---

## Licence

MIT — see [LICENSE](LICENSE).
