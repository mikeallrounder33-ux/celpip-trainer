/* ============================================================
   PART 10 — CORE: storage, utils, timers, API client, analysers
   ============================================================ */

/* ---------- 10.1 tiny DOM helpers ---------- */
const $ = (s, r) => (r || document).querySelector(s);
const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
function el(tag, attrs, kids) {
  const n = document.createElement(tag);
  if (attrs) for (const k in attrs) {
    if (k === 'class') n.className = attrs[k];
    else if (k === 'html') n.innerHTML = attrs[k];
    else if (k === 'text') n.textContent = attrs[k];
    else if (k.startsWith('on') && typeof attrs[k] === 'function') n.addEventListener(k.slice(2), attrs[k]);
    else if (attrs[k] !== null && attrs[k] !== undefined) n.setAttribute(k, attrs[k]);
  }
  (kids || []).forEach(c => n.appendChild(typeof c === 'string' ? document.createTextNode(c) : c));
  return n;
}
function esc(s) {
  return String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}
function fmtTime(sec) {
  sec = Math.max(0, Math.round(sec));
  const m = Math.floor(sec / 60), s = sec % 60;
  return m + ':' + String(s).padStart(2, '0');
}
function fmtDate(ts) {
  const d = new Date(ts);
  return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) + ' ' +
         d.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' });
}
function uid() { return Date.now().toString(36) + Math.random().toString(36).slice(2, 7); }
function shuffle(a) { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1));[a[i], a[j]] = [a[j], a[i]]; } return a; }
function pick(a) { return a[Math.floor(Math.random() * a.length)]; }
function words(t) { return (String(t || '').trim().match(/[A-Za-z0-9'’\-]+/g) || []).length; }
function sentences(t) {
  return String(t || '').split(/(?<=[.!?])\s+|\n+/).map(s => s.trim()).filter(s => s.length > 0);
}

/* ---------- 10.2 storage (all keys prefixed celpip_) ---------- */
const K = {
  settings: 'celpip_settings',
  attempts: 'celpip_attempts',
  errors: 'celpip_errors',
  seen: 'celpip_seen',
  audio: 'celpip_audio'
};
const DB = {
  get(k, dflt) {
    try { const v = localStorage.getItem(k); return v == null ? dflt : JSON.parse(v); }
    catch (e) { console.warn('read fail', k, e); return dflt; }
  },
  set(k, v) {
    try { localStorage.setItem(k, JSON.stringify(v)); return true; }
    catch (e) { console.warn('write fail (quota?)', k, e); return false; }
  },
  settings() {
    return Object.assign({
      apiKey: '', provider: 'anthropic', model: 'claude-sonnet-4-6',
      baseUrl: 'https://api.openai.com/v1', useApi: true, persistAudio: false,
      voiceMap: {}, ttsRateJitter: true
    }, DB.get(K.settings, {}));
  },
  saveSettings(s) { DB.set(K.settings, s); },
  attempts() { return DB.get(K.attempts, []); },
  addAttempt(a) {
    const list = DB.get(K.attempts, []);
    list.unshift(a);
    if (!DB.set(K.attempts, list)) {
      // quota: drop stored audio then oldest attempts until it fits
      list.forEach(x => { delete x.audioData; });
      while (list.length && !DB.set(K.attempts, list)) list.pop();
    }
    return a;
  },
  updateAttempt(id, patch) {
    const list = DB.get(K.attempts, []);
    const i = list.findIndex(a => a.id === id);
    if (i >= 0) { Object.assign(list[i], patch); DB.set(K.attempts, list); }
  },
  errors() { return DB.get(K.errors, []); },
  saveErrors(e) { DB.set(K.errors, e); },
  seen() { return DB.get(K.seen, {}); },
  markSeen(id) { const s = DB.get(K.seen, {}); s[id] = Date.now(); DB.set(K.seen, s); }
};

/* ---------- 10.3 session-only memory (audio blobs, generated items) ---------- */
const MEM = { audio: {}, genCache: {}, sessionSeen: new Set() };

/* ---------- 10.4 CLB estimate from raw L/R score (out of 38) ---------- */
/* The official scale runs M (minimal), then 1 to 12. Our raw-score mapping cannot
   distinguish 10 from 12 — a perfect raw score is consistent with any of them — so
   the top band is reported as a range rather than invented precision. */
function clbFromRaw(raw) {
  if (raw >= 36) return { clb: 10, label: 'CLB 10–12' };
  if (raw >= 33) return { clb: 9, label: 'CLB 9' };
  if (raw >= 29) return { clb: 8, label: 'CLB 8' };
  if (raw >= 25) return { clb: 7, label: 'CLB 7' };
  if (raw >= 21) return { clb: 6, label: 'CLB 6' };
  if (raw >= 17) return { clb: 5, label: 'CLB 5' };
  if (raw >= 13) return { clb: 4, label: 'CLB 4' };
  if (raw >= 9) return { clb: 3, label: 'CLB 3' };
  return { clb: 2, label: 'CLB M–2 (minimal)' };
}

/* Lowest-anchored blend: never a generous average.
   overall = floor( min + 0.4*(mean - min) ), and never more than min+1. */
function anchoredOverall(dims) {
  const v = dims.filter(x => typeof x === 'number' && !isNaN(x));
  if (!v.length) return 0;
  const min = Math.min(...v);
  const mean = v.reduce((a, b) => a + b, 0) / v.length;
  return Math.max(min, Math.min(min + 1, Math.floor(min + 0.4 * (mean - min))));
}

/* ---------- 10.5 timer ---------- */
class Timer {
  constructor(seconds, onTick, onEnd) {
    this.total = seconds; this.left = seconds; this.onTick = onTick; this.onEnd = onEnd;
    this.h = null; this.startedAt = null; this.stopped = false;
  }
  start() {
    this.startedAt = Date.now();
    const tick = () => {
      if (this.stopped) return;
      const elapsed = (Date.now() - this.startedAt) / 1000;
      this.left = Math.max(0, this.total - elapsed);
      this.onTick && this.onTick(this.left, this.total);
      if (this.left <= 0) { this.stop(); this.onEnd && this.onEnd(); }
    };
    tick();
    this.h = setInterval(tick, 250);
    return this;
  }
  stop() { this.stopped = true; if (this.h) clearInterval(this.h); this.h = null; }
  usedSec() { return this.total - this.left; }
  usedPct() { return this.total ? Math.round(((this.total - this.left) / this.total) * 100) : 0; }
}
function bindClock(node, timer) {
  const bar = node.querySelector('.bar');
  timer.onTick = (left, total) => {
    const c = node.querySelector('.clock');
    if (timer.untimed) {
      // Practice mode: show time spent, with no pressure and no expiry.
      if (c) { c.textContent = fmtTime(total - left); c.classList.remove('low'); }
      if (bar) { bar.querySelector('i').style.width = '100%'; bar.classList.remove('low'); }
      return;
    }
    if (c) { c.textContent = fmtTime(left); c.classList.toggle('low', left < total * 0.1); }
    if (bar) { bar.querySelector('i').style.width = (100 * left / total) + '%'; bar.classList.toggle('low', left < total * 0.1); }
  };
}

/* ---------- 10.6a In-browser model (WebLLM + WebGPU) ----------
   Runs an open-weights model on this machine's GPU. No key, no account,
   no server, no cost. Weights download once from a CDN and are then cached
   by the browser, so later sessions work offline too. */
const BrowserLLM = {
  engine: null, ready: false, loading: false, modelId: null, lastError: null,
  MODELS: [
    { id: 'Qwen2.5-1.5B-Instruct-q4f16_1-MLC', label: 'Qwen 2.5 1.5B — fastest', size: '~1.0 GB' },
    { id: 'Llama-3.2-3B-Instruct-q4f16_1-MLC', label: 'Llama 3.2 3B — balanced', size: '~1.9 GB' },
    { id: 'Qwen2.5-3B-Instruct-q4f16_1-MLC', label: 'Qwen 2.5 3B — best JSON at this size', size: '~2.0 GB' },
    { id: 'Qwen2.5-7B-Instruct-q4f16_1-MLC', label: 'Qwen 2.5 7B — best quality, needs a strong GPU', size: '~4.7 GB' }
  ],
  supported() { return !!navigator.gpu; },
  async load(modelId, onProgress) {
    if (this.loading) throw new Error('A model is already loading.');
    if (!this.supported()) throw new Error('This browser has no WebGPU. Use Chrome or Edge (Safari 18+ also works).');
    this.loading = true; this.ready = false; this.lastError = null;
    try {
      const webllm = await import('https://esm.run/@mlc-ai/web-llm');
      this.engine = await webllm.CreateMLCEngine(modelId, {
        initProgressCallback: r => onProgress && onProgress(r.progress || 0, r.text || '')
      });
      this.modelId = modelId; this.ready = true;
      return true;
    } catch (e) {
      this.lastError = e.message; throw e;
    } finally { this.loading = false; }
  },
  async chat(system, user, maxTokens, wantJson) {
    if (!this.ready) throw new Error('The in-browser model is not loaded yet — load it in Settings.');
    // NOTE: WebLLM's response_format:{type:'json_object'} throws a BindingError
    // in the current build, so JSON is requested in the prompt instead and
    // recovered by API.parseJSON, which tolerates prose and code fences.
    const r = await this.engine.chat.completions.create({
      messages: [
        { role: 'system', content: system + (wantJson ? '\nRespond with the JSON object only. Begin your reply with { and end it with }. No prose before or after.' : '') },
        { role: 'user', content: user }
      ],
      max_tokens: maxTokens || 1000, temperature: 0.6
    });
    return (r.choices && r.choices[0] && r.choices[0].message && r.choices[0].message.content) || '';
  }
};

/* ---------- 10.6 model providers ---------- */
const API = {
  key() { return DB.settings().apiKey.trim(); },
  /* A local server (Ollama, LM Studio, llama.cpp) needs no key at all. */
  isLocal(s) {
    s = s || DB.settings();
    return s.provider === 'openai' && /^https?:\/\/(localhost|127\.0\.0\.1|0\.0\.0\.0|\[::1\])/i.test(s.baseUrl || '');
  },
  available() {
    const s = DB.settings();
    if (s.useApi === false) return false;
    if (s.provider === 'browser') return BrowserLLM.ready;
    // A key, a local server, or your own proxy that holds the key server-side.
    return !!s.apiKey.trim() || this.isLocal(s) || !!s.noKeyNeeded;
  },
  providerName() {
    const p = DB.settings().provider;
    return p === 'browser' ? 'In-browser model' : p === 'openai' ? 'OpenAI-compatible' : 'Anthropic';
  },

  wantsJSON(system, user) { return /output\s+(this\s+)?json|json only/i.test(system + ' ' + user); },

  async call(system, user, maxTokens) {
    const s = DB.settings();
    if (s.provider === 'browser') return BrowserLLM.chat(system, user, maxTokens, this.wantsJSON(system, user));
    return s.provider === 'openai'
      ? this.callOpenAI(s, system, user, maxTokens, {})
      : this.callAnthropic(s, system, user, maxTokens);
  },

  async callAnthropic(s, system, user, maxTokens) {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': s.apiKey.trim(),
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true'
      },
      body: JSON.stringify({
        model: s.model || 'claude-sonnet-4-6',
        max_tokens: maxTokens || 1000,
        system: system,
        messages: [{ role: 'user', content: user }]
      })
    });
    if (!res.ok) {
      let detail = '';
      try { detail = (await res.json()).error?.message || ''; } catch (e) { }
      throw new Error('API ' + res.status + (detail ? ': ' + detail : ''));
    }
    const data = await res.json();
    return (data.content || []).filter(b => b.type === 'text').map(b => b.text).join('');
  },

  /* OpenAI chat/completions shape. Also covers OpenAI-compatible gateways
     (OpenRouter, Groq, Together, LM Studio, Ollama) via a custom base URL.
     Newer reasoning models renamed max_tokens and dropped response_format,
     so both are retried on the specific error the API returns. */
  async callOpenAI(s, system, user, maxTokens, opt) {
    const base = (s.baseUrl || 'https://api.openai.com/v1').trim().replace(/\/+$/, '');
    const body = {
      model: s.model || 'gpt-4o',
      messages: [{ role: 'system', content: system }, { role: 'user', content: user }]
    };
    body[opt.tokenParam || 'max_tokens'] = maxTokens || 1000;
    // Force strict JSON when the prompt actually asks for it.
    if (!opt.noJsonMode && /output\s+(this\s+)?json|json only/i.test(system + ' ' + user)) {
      body.response_format = { type: 'json_object' };
    }
    const headers = { 'content-type': 'application/json' };
    // Local servers accept (and ignore) any token; only send one if we have it.
    if (s.apiKey.trim()) headers.authorization = 'Bearer ' + s.apiKey.trim();
    else if (this.isLocal(s)) headers.authorization = 'Bearer local';
    const res = await fetch(base + '/chat/completions', { method: 'POST', headers, body: JSON.stringify(body) });
    if (!res.ok) {
      let detail = '';
      try { detail = (await res.json()).error?.message || ''; } catch (e) { }
      if (!opt.tokenParam && /max_completion_tokens/i.test(detail)) {
        return this.callOpenAI(s, system, user, maxTokens, Object.assign({}, opt, { tokenParam: 'max_completion_tokens' }));
      }
      if (!opt.noJsonMode && /response_format|json_object/i.test(detail)) {
        return this.callOpenAI(s, system, user, maxTokens, Object.assign({}, opt, { noJsonMode: true }));
      }
      throw new Error('API ' + res.status + (detail ? ': ' + detail : ''));
    }
    const data = await res.json();
    const msg = data.choices && data.choices[0] && data.choices[0].message;
    return (msg && msg.content) || '';
  },
  /* Extract the first balanced JSON object from a model reply. */
  parseJSON(text) {
    if (!text) throw new Error('empty response');
    let t = text.trim();
    const fence = t.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (fence) t = fence[1].trim();
    const start = t.indexOf('{');
    if (start < 0) throw new Error('no JSON object in response');
    let depth = 0, inStr = false, escd = false;
    for (let i = start; i < t.length; i++) {
      const c = t[i];
      if (inStr) {
        if (escd) escd = false;
        else if (c === '\\') escd = true;
        else if (c === '"') inStr = false;
      } else if (c === '"') inStr = true;
      else if (c === '{') depth++;
      else if (c === '}') { depth--; if (depth === 0) return JSON.parse(t.slice(start, i + 1)); }
    }
    // Ran out of text: the reply was truncated mid-object, which is the usual
    // failure with small local models. Close what is still open and reparse.
    return this.repairJSON(t.slice(start));
  },

  repairJSON(frag) {
    let inStr = false, escd = false;
    const stack = [];
    for (let i = 0; i < frag.length; i++) {
      const c = frag[i];
      if (inStr) {
        if (escd) escd = false;
        else if (c === '\\') escd = true;
        else if (c === '"') inStr = false;
      } else if (c === '"') inStr = true;
      else if (c === '{' || c === '[') stack.push(c === '{' ? '}' : ']');
      else if (c === '}' || c === ']') stack.pop();
    }
    let out = frag;
    if (inStr) out += '"';                       // close a dangling string
    out = out.replace(/,\s*$/, '');              // drop a trailing comma
    while (stack.length) out += stack.pop();     // close open objects/arrays
    try { return JSON.parse(out); }
    catch (e) { throw new Error('unbalanced JSON in response (reply was truncated — raise max_tokens)'); }
  }
};

/* ---------- 10.7 TEMPLATE-DEPENDENCY DETECTOR (feature 3) ---------- */
const TEMPLATES = [
  { re: /\bI am writing this (?:email|letter) to\b/gi, name: 'I am writing this email to', alt: ['I need your help with…', 'Could you look into…'] },
  { re: /\bI am writing to (?:inform|inquire|request|let you know)\b/gi, name: 'I am writing to inform/inquire/request', alt: ['I wanted to flag…', 'Quick question about…'] },
  { re: /\bI hope this (?:email|letter|message) finds you well\b/gi, name: 'I hope this email finds you well', alt: ['Thanks for getting back to me last week.', '(delete it — go straight to the point)'] },
  { re: /\bIn my opinion,? I would like to say that\b/gi, name: 'In my opinion, I would like to say that', alt: ['I think…', 'From what I have seen,…'] },
  { re: /\bLast but not least\b/gi, name: 'Last but not least', alt: ['One more thing:', 'Finally,'] },
  { re: /\bTo sum up\b/gi, name: 'To sum up', alt: ['So,', '(delete it — end on your strongest point)'] },
  { re: /\bIn conclusion\b/gi, name: 'In conclusion', alt: ['That is why…', '(delete it and stop)'] },
  { re: /\bThere are many reasons why\b/gi, name: 'There are many reasons why', alt: ['Two things matter here:', 'I chose this mainly because…'] },
  { re: /\bFirst(?:ly)? of all\b/gi, name: 'First of all', alt: ['To start,', '(name the reason instead)'] },
  { re: /\bI would like to take this opportunity to\b/gi, name: 'I would like to take this opportunity to', alt: ['I want to…', 'Let me…'] },
  { re: /\bPlease do not hesitate to contact me\b/gi, name: 'Please do not hesitate to contact me', alt: ['Call me at 604-555-0148 if anything is unclear.', 'Let me know either way.'] },
  { re: /\bThank you for your time and consideration\b/gi, name: 'Thank you for your time and consideration', alt: ['Thanks for sorting this out.', 'I appreciate the quick turnaround.'] },
  { re: /\bLooking forward to hearing from you\b/gi, name: 'Looking forward to hearing from you', alt: ['Could you reply by Friday?', 'Let me know what works.'] },
  { re: /\bit is (?:a )?well[- ]known fact that\b/gi, name: 'It is a well-known fact that', alt: ['Most people find that…', '(state the fact plainly)'] },
  { re: /\bnowadays\b/gi, name: 'Nowadays', alt: ['These days,', 'Since the pandemic,'] },
  { re: /\bin today'?s (?:modern )?(?:world|society)\b/gi, name: "In today's world/society", alt: ['In my neighbourhood,', 'At my workplace,'] },
  { re: /\bfrom my point of view\b/gi, name: 'From my point of view', alt: ['I think', 'As a parent of two,'] },
  { re: /\bon the other hand\b/gi, name: 'On the other hand', alt: ['But', 'The trade-off is…'] },
  { re: /\ball in all\b/gi, name: 'All in all', alt: ['So', '(cut it)'] },
  { re: /\bI would like to express my\b/gi, name: 'I would like to express my', alt: ['I am frustrated that…', 'I am glad that…'] }
];
function detectTemplates(text) {
  const hits = [];
  TEMPLATES.forEach(t => {
    const m = String(text || '').match(t.re);
    if (m && m.length) hits.push({ name: t.name, count: m.length, alt: t.alt, matched: m[0] });
  });
  const total = hits.reduce((a, h) => a + h.count, 0);
  const w = Math.max(1, words(text));
  return { hits, total, density: +(total / (w / 100)).toFixed(2) }; // per 100 words
}
function highlightTemplates(text) {
  let out = esc(text);
  TEMPLATES.forEach(t => {
    out = out.replace(new RegExp(t.re.source, 'gi'), m => '<span class="hl">' + m + '</span>');
  });
  return out.replace(/\n/g, '<br>');
}

/* ---------- 10.8 REGISTER CHECKER (feature 5) ---------- */
const FORMAL_SALUTES = /^\s*(dear\s+[a-z .'-]+|to whom it may concern)/i;
const INFORMAL_SALUTES = /^\s*(hi|hey|hello|yo)\b/i;
const GENDERED_SALUTE = /\bdear\s+(mr|mrs|ms|miss|sir|madam)\b\.?/i;
const CONTRACTIONS = /\b(?:can't|won't|don't|doesn't|didn't|isn't|aren't|wasn't|weren't|I'm|I've|I'd|I'll|you're|you'll|it's|we're|we'll|they're|there's|that's|haven't|hasn't|shouldn't|couldn't|wouldn't)\b/gi;
const SLANG = /\b(gonna|wanna|kinda|gotta|stuff|guys|awesome|super\s+\w+|a lot of stuff|yeah|ok|okay)\b/gi;

function checkRegister(text, item) {
  const want = (item && item.formality) || 'formal';
  const flags = [];
  const firstLine = (String(text || '').split('\n').find(l => l.trim()) || '').trim();
  const hasFormalSal = FORMAL_SALUTES.test(firstLine);
  const hasInformalSal = INFORMAL_SALUTES.test(firstLine);
  const genderUnknown = item && item.recipientGenderKnown === false;

  if (!hasFormalSal && !hasInformalSal) {
    flags.push({ level: 'bad', msg: 'No salutation found on the first line. A CELPIP email must open with a greeting line (e.g. "Dear Course Coordinator,").' });
  }
  if (want === 'formal' && hasInformalSal) {
    flags.push({ level: 'bad', msg: 'Informal greeting ("' + firstLine.split(/[ ,]/)[0] + '") in a formal email to ' + (item.recipient || 'this recipient') + '. Use "Dear ' + (item.recipientRole || 'Sir or Madam') + ',".' });
  }
  if (want === 'informal' && hasFormalSal && !/dear\s+(a-z)/i.test(firstLine) && /dear\s+(mr|mrs|ms|sir|madam)/i.test(firstLine)) {
    flags.push({ level: 'warn', msg: 'Over-formal greeting for a friend/neighbour. "Hi ' + (item.recipient || 'Sam') + '," fits better.' });
  }
  const g = firstLine.match(GENDERED_SALUTE);
  if (g && genderUnknown) {
    flags.push({ level: 'bad', msg: 'Gendered salutation "' + g[0] + '" but the recipient\'s gender is not given. Use the role instead: "Dear ' + (item.recipientRole || 'Manager') + ',".' });
  }
  const cons = String(text || '').match(CONTRACTIONS) || [];
  if (want === 'formal' && cons.length) {
    flags.push({ level: 'warn', msg: 'Contractions in a formal email (' + cons.length + '): ' + [...new Set(cons)].slice(0, 5).join(', ') + '. Write them out in full.' });
  }
  if (want === 'informal' && cons.length === 0 && words(text) > 80) {
    flags.push({ level: 'warn', msg: 'No contractions at all in an informal email — it reads stiff. "I\'ll", "don\'t" are natural here.' });
  }
  const sl = String(text || '').match(SLANG) || [];
  if (want !== 'informal' && sl.length) {
    flags.push({ level: 'warn', msg: 'Casual wording for this register: ' + [...new Set(sl)].slice(0, 5).join(', ') + '.' });
  }
  const closing = /\b(sincerely|regards|best regards|yours truly|thank you|thanks|cheers|talk soon)\b/i.test(String(text).slice(-160));
  if (!closing) flags.push({ level: 'warn', msg: 'No sign-off near the end. Close with "Sincerely," (formal) or "Thanks," (informal) plus your name.' });

  return { want, flags, ok: flags.filter(f => f.level === 'bad').length === 0 };
}

/* ---------- 10.9 LOCAL ERROR DETECTOR (feeds feature 4, works offline) ---------- */
const HOMOPHONES = [
  [/\btheir\s+(is|are|was|were)\b/gi, 'their $1', 'there $1', 'homophone confusion'],
  [/\bthere\s+(car|house|team|kids|children|manager|idea|opinion|family|apartment|dog)\b/gi, 'there $1', 'their $1', 'homophone confusion'],
  [/\byour\s+(welcome|right|wrong|going|coming|invited)\b/gi, 'your $1', "you're $1", 'homophone confusion'],
  [/\byou'?re\s+(car|house|help|email|team|idea|reply)\b/gi, "you're $1", 'your $1', 'homophone confusion'],
  [/\bits\s+(a|the|been|going|very|important|clear|not)\b/gi, 'its $1', "it's $1", 'homophone confusion'],
  [/\bits\s+(affecting|going|getting|becoming|causing|making|taking|being|working|happening)\b/gi, 'its $1', "it's $1", 'homophone confusion'],
  [/\bit'?s\s+(own|purpose|price|value|design)\b/gi, "it's $1", 'its $1', 'homophone confusion'],
  [/\bto\s+(much|many|late|early|expensive|noisy|slow)\b/gi, 'to $1', 'too $1', 'homophone confusion'],
  [/\bthen\s+(me|him|her|us|them|before|ever)\b/gi, 'then $1', 'than $1', 'homophone confusion'],
  [/\baffect\s+of\b/gi, 'affect of', 'effect of', 'homophone confusion'],
  [/\bwould of\b|\bcould of\b|\bshould of\b/gi, 'would/could/should of', 'would/could/should have', 'homophone confusion'],
  [/\bloose\s+(the|my|our|his|her|their)\b/gi, 'loose …', 'lose …', 'homophone confusion'],
  [/\baccept for\b/gi, 'accept for', 'except for', 'homophone confusion'],
  [/\badvice\s+(you|me|us|him|her|them)\b/gi, 'advice you', 'advise you', 'homophone confusion']
];
/* Irregular third-person singular forms, so corrections are not naive "+s". */
const THIRD_PERSON = {
  have: 'has', do: 'does', go: 'goes', say: 'says', make: 'makes', take: 'takes',
  know: 'knows', need: 'needs', want: 'wants', think: 'thinks', live: 'lives', work: 'works'
};
const AGREEMENT = [
  [/\b(he|she|it)\s+(have|do|go|say|make|take|know|need|want|think|live|work)\b/gi, '$1 $2',
    m => { const p = m.split(/\s+/); return p[0] + ' ' + (THIRD_PERSON[p[1].toLowerCase()] || p[1] + 's'); },
    'dropped verb forms and auxiliaries'],
  [/\b(they|we|you)\s+(has|does|is)\b/gi, '$1 $2', '$1 (have/do/are)', 'dropped verb forms and auxiliaries'],
  /* Singular noun subjects take the -s form too: "my mother use" → "my mother uses". */
  [/\b((?:my|his|her|our|their|the|this|that)\s+(?:mother|father|sister|brother|friend|manager|teacher|son|daughter|wife|husband|neighbour|neighbor|company|employer|child|doctor|landlord|supervisor|partner|cousin|aunt|uncle))\s+(have|do|go|say|make|take|know|need|want|think|live|work|use|come|seem|look)\b/gi,
    '$1 $2',
    m => { const p = m.split(/\s+/); const v = p.pop().toLowerCase(); return p.join(' ') + ' ' + (THIRD_PERSON[v] || (/[sxz]$|ch$|sh$/.test(v) ? v + 'es' : v + 's')); },
    'dropped verb forms and auxiliaries'],
  [/\b(I)\s+(is|has|are)\b/g, 'I $2', 'I am / I have', 'dropped verb forms and auxiliaries'],
  [/\b(is|are|was|were)\s+(go|come|work|wait|look|try)\b(?!\w)/gi, '$1 $2', '$1 $2ing', 'dropped verb forms and auxiliaries'],
  [/\bdid\s+(went|came|saw|took|made|had)\b/gi, 'did $1', 'did (go/come/see/take/make/have)', 'dropped verb forms and auxiliaries'],
  [/\b(has|have)\s+(went|came|did|saw|took|ran|began)\b/gi, '$1 $2', '$1 (gone/come/done/seen/taken/run/begun)', 'dropped verb forms and auxiliaries']
];
const ARTICLES = [
  [/\ba\s+([aeiou]\w+)/gi, 'a $1', 'an $1', 'article errors'],
  [/\ban\s+([bcdfgjklmnpqrstvwxyz]\w+)/gi, 'an $1', 'a $1', 'article errors'],
  [/\b(?:go|went|going)\s+to\s+(hospital|bank|library|office|store|gym)\b/gi, 'to $1', 'to the $1', 'article errors'],
  [/\bin\s+(morning|afternoon|evening)\b/gi, 'in $1', 'in the $1', 'article errors']
];
const SPELLING = [
  ['recieve', 'receive'], ['definately', 'definitely'], ['seperate', 'separate'], ['occured', 'occurred'],
  ['untill', 'until'], ['beacuse', 'because'], ['becuase', 'because'], ['alot', 'a lot'],
  ['tommorow', 'tomorrow'], ['tomorow', 'tomorrow'], ['adress', 'address'], ['begining', 'beginning'],
  ['calender', 'calendar'], ['comming', 'coming'], ['convinient', 'convenient'], ['enviroment', 'environment'],
  ['grammer', 'grammar'], ['immediatly', 'immediately'], ['neccessary', 'necessary'], ['occassion', 'occasion'],
  ['oppurtunity', 'opportunity'], ['posession', 'possession'], ['refered', 'referred'], ['succesful', 'successful'],
  ['sucessful', 'successful'], ['truely', 'truly'], ['wich', 'which'], ['writting', 'writing'],
  ['accomodate', 'accommodate'], ['apologise', 'apologize'], ['maintainance', 'maintenance'],
  ['responsable', 'responsible'], ['availabe', 'available'], ['diffrent', 'different'], ['freind', 'friend'],
  ['intrested', 'interested'], ['knowlege', 'knowledge'], ['managment', 'management'], ['garantee', 'guarantee']
];

function detectErrorsLocal(text) {
  const found = [];
  const push = (type, mine, correct) => {
    if (!mine) return;
    if (found.some(f => f.type === type && f.mine.toLowerCase() === mine.toLowerCase())) return;
    found.push({ type, mine, correct, source: 'local' });
  };
  const T = String(text || '');

  [...HOMOPHONES, ...AGREEMENT, ...ARTICLES].forEach(([re, mineT, corrT, type]) => {
    let m; const rx = new RegExp(re.source, re.flags.includes('g') ? re.flags : re.flags + 'g');
    while ((m = rx.exec(T)) !== null) {
      const mine = m[0];
      let correct;
      if (typeof corrT === 'function') {
        correct = corrT(mine);
      } else {
        correct = corrT;
        for (let i = 1; i < m.length; i++) correct = correct.replace('$' + i, m[i] || '');
      }
      push(type, mine.trim(), String(correct).trim());
      if (m.index === rx.lastIndex) rx.lastIndex++;
    }
  });

  SPELLING.forEach(([bad, good]) => {
    const rx = new RegExp('\\b' + bad + '\\b', 'gi');
    if (rx.test(T)) push('spelling', bad, good);
  });

  // missing end punctuation
  sentences(T).forEach(s => {
    if (s.length > 25 && !/[.!?:,;"'’)]$/.test(s)) push('missing end punctuation', s.slice(0, 60), s.slice(0, 60) + '.');
  });
  // Only flag a missing final period when the last line is a real sentence —
  // a sign-off ("Sincerely," / "Amara") legitimately has none.
  const trimmed = T.trim();
  const lastLine = trimmed.split('\n').map(l => l.trim()).filter(Boolean).pop() || '';
  if (trimmed && !/[.!?]$/.test(trimmed) && words(lastLine) > 4) {
    push('missing end punctuation', '…' + lastLine.slice(-40), '…' + lastLine.slice(-40) + '.');
  }

  // run-on sentences: >32 words, or comma splice
  sentences(T).forEach(s => {
    if (words(s) > 32) push('run-on sentences', s.slice(0, 70) + '…', 'Split into two sentences at the second clause.');
    const splice = s.match(/,\s+(I|we|he|she|they|it|you|this|that|there)\s+(am|is|are|was|were|will|can|have|has|had|do|does|did|would|should|could)\b/i);
    if (splice) push('run-on sentences', '…' + splice[0] + '…', 'Use a period or "and/but" instead of the comma.');
  });

  // sentence-initial capitals
  // Log capitalisation compactly. The correction is parenthesised so the
  // "corrected" builder treats it as advice rather than a literal replacement
  // (it fixes sentence capitals itself, in one pass).
  sentences(T).forEach(s => {
    if (/^[a-z]/.test(s) && s.length > 3) {
      push('missing end punctuation', 'lower-case sentence start: "' + s.split(/\s+/).slice(0, 4).join(' ') + '…"',
        '(capitalise the first letter)');
    }
  });
  if (/\bi\b/.test(T)) push('spelling', 'lowercase "i"', 'I');

  return found;
}

/* Merge new errors into the persistent recurring-error log (feature 4). */
function logErrors(list) {
  const store = DB.errors();
  const key = e => (e.type + '|' + String(e.mine).toLowerCase().trim()).slice(0, 160);
  list.forEach(e => {
    if (!e || !e.mine) return;
    const k = key(e);
    const hit = store.find(s => s.key === k);
    if (hit) { hit.count++; hit.lastSeen = Date.now(); if (e.correct) hit.correct = e.correct; }
    else store.push({ key: k, type: e.type || 'other', mine: String(e.mine).slice(0, 200), correct: String(e.correct || '').slice(0, 200), count: 1, lastSeen: Date.now() });
  });
  store.sort((a, b) => b.count - a.count || b.lastSeen - a.lastSeen);
  DB.saveErrors(store);
  return store;
}

/* ---------- 10.10 modal ---------- */
function modal(opts) {
  return new Promise(resolve => {
    const root = $('#modalroot');
    const bg = el('div', { class: 'modalbg' });
    const box = el('div', { class: 'modal' });
    box.innerHTML = '<h2>' + esc(opts.title) + '</h2>' + (opts.html || '<p>' + esc(opts.body || '') + '</p>');
    const row = el('div', { class: 'row', style: 'justify-content:flex-end;margin-top:16px' });
    (opts.buttons || [{ label: 'OK', value: true }]).forEach(b => {
      row.appendChild(el('button', {
        class: 'btn ' + (b.class || ''), text: b.label,
        onclick: () => { root.innerHTML = ''; resolve(b.value); }
      }));
    });
    box.appendChild(row);
    bg.appendChild(box);
    root.innerHTML = '';
    root.appendChild(bg);
    if (opts.onMount) opts.onMount(box);
  });
}
function toast(msg, kind) {
  const t = el('div', {
    class: 'card tight', text: msg,
    style: 'position:fixed;bottom:18px;left:50%;transform:translateX(-50%);z-index:200;max-width:520px;border-color:' +
      (kind === 'bad' ? 'var(--bad)' : kind === 'ok' ? 'var(--ok)' : 'var(--line)')
  });
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 4200);
}

/* ---------- 10.11 speech synthesis (Listening) ---------- */
/* macOS/Windows ship joke voices ("Bad News", "Zarvox", …). They would make a
   listening passage absurd, so they are excluded unless nothing else exists. */
const NOVELTY_VOICES = /^(albert|bad news|bahh|bells|boing|bubbles|cellos|good news|jester|organ|pipe organ|superstar|trinoids|whisper|wobble|zarvox|deranged|hysterical|princess|bruce|junior|ralph|fred|kathy|agnes|victoria|-|null)$/i;

const TTS = {
  voices: [],
  ready: false,
  load() {
    const v = window.speechSynthesis ? speechSynthesis.getVoices() : [];
    if (!v || !v.length) return this.ready;
    let en = v.filter(x => /^en/i.test(x.lang));
    if (!en.length) en = v.slice();
    const natural = en.filter(x => !NOVELTY_VOICES.test((x.name || '').trim()));
    this.voices = natural.length >= 2 ? natural : en;
    this.ready = true;
    return this.ready;
  },

  /* Interleave accents (en-CA, en-GB, en-US, en-AU, en-IN …) so consecutive
     speakers rarely share one, as the spec asks. */
  accentOrderedPool() {
    const byLang = {};
    this.voices.forEach(v => { const k = (v.lang || 'en').toLowerCase(); (byLang[k] = byLang[k] || []).push(v); });
    const langs = Object.keys(byLang).sort();
    const out = [];
    let more = true;
    for (let i = 0; more; i++) {
      more = false;
      langs.forEach(l => { if (byLang[l][i]) { out.push(byLang[l][i]); more = true; } });
    }
    return out;
  },
  init() {
    if (!window.speechSynthesis) return;
    this.load();
    speechSynthesis.onvoiceschanged = () => this.load();
  },
  /* Deterministically assign a distinct voice + rate to each speaker name. */
  assign(speakers) {
    this.load();
    const map = {};
    const pool = this.voices.length ? this.accentOrderedPool() : [null];
    speakers.forEach((sp, i) => {
      const v = pool[i % pool.length];
      // rate 0.95–1.05, distinct per speaker
      const rate = +(0.95 + ((i * 0.037) % 0.10)).toFixed(3);
      const pitch = +(0.92 + ((i * 0.13) % 0.28)).toFixed(2);
      map[sp] = { voice: v, rate, pitch, label: v ? v.name : 'default' };
    });
    return map;
  },
  speakSequence(segments, voiceMap, onSegment, onDone) {
    if (!window.speechSynthesis) { onDone && onDone(false); return { cancel() { } }; }
    speechSynthesis.cancel();
    let i = 0, cancelled = false;
    const next = () => {
      if (cancelled) return;
      if (i >= segments.length) { onDone && onDone(true); return; }
      const seg = segments[i];
      onSegment && onSegment(i, seg);
      const u = new SpeechSynthesisUtterance(seg.text);
      const vm = voiceMap[seg.speaker] || {};
      if (vm.voice) u.voice = vm.voice;
      u.rate = vm.rate || 1; u.pitch = vm.pitch || 1; u.lang = (vm.voice && vm.voice.lang) || 'en-CA';
      u.onend = () => { i++; setTimeout(next, 260); };
      u.onerror = () => { i++; setTimeout(next, 260); };
      speechSynthesis.speak(u);
    };
    next();
    return { cancel() { cancelled = true; speechSynthesis.cancel(); } };
  }
};
TTS.init();
