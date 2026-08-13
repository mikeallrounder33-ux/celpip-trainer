/* ============================================================
   PART 40 — LISTENING & READING RUNNERS (auto-marked)
   ============================================================ */

const APP = { route: 'dashboard', session: null, mockQueue: null, examMode: false };

function screenEl() { return $('#app'); }
function setScreen(node) {
  const app = screenEl();
  app.innerHTML = '';
  app.appendChild(node);
  window.scrollTo(0, 0);
}
function examChrome(title, subtitle, timer) {
  const bar = el('div', { class: 'exambar' });
  bar.innerHTML =
    '<div><div style="font-weight:700">' + esc(title) + '</div><div class="tiny muted">' + esc(subtitle || '') + '</div></div>' +
    '<div style="flex:1"><div class="bar"><i style="width:100%"></i></div></div>' +
    '<div class="clock" role="timer" aria-live="off" aria-atomic="true">--:--</div>';
  if (timer) bindClock(bar, timer);
  return bar;
}

/* ---------------- 40.1 module timing ---------------- */
const MODULE_TIME = { listening: 55 * 60, reading: 56 * 60 };
function partAllotment(module, qCount) {
  const total = MODULE_TIME[module];
  const allQ = 38;
  return Math.max(300, Math.round(total * (qCount / allQ)));
}

/* ---------------- 40.2 LISTENING ---------------- */
const Listening = {
  async start(cfg) {
    // cfg: {mode:'drill'|'section'|'mock', parts:[1..6], onFinish}
    APP.examMode = true;
    renderNav();
    const parts = cfg.parts;
    const loading = el('div', { class: 'wrap' });
    loading.innerHTML = '<div class="card"><h2>Preparing Listening…</h2><p class="muted">Generating ' + parts.length + ' passage(s). This takes a few seconds when the API key is set.</p></div>';
    setScreen(loading);

    const items = [];
    for (const p of parts) {
      const r = await getItem('listening', p);
      if (!r.item) { toast('No item available for Listening Part ' + p, 'bad'); continue; }
      r.item._source = r.source;
      items.push(r.item);
    }
    if (!items.length) { APP.examMode = false; go('dashboard'); return; }

    // The real test embeds unscored trial items you cannot identify. Practising
    // without them fails to train the "strange question, don't panic" reflex.
    if (cfg.mode !== 'drill') {
      const tp = pick([2, 3, 4, 6]);
      const extra = await getItem('listening', tp);
      if (extra.item) {
        extra.item._source = extra.source;
        extra.item._trial = true;
        items.splice(1 + Math.floor(Math.random() * (items.length - 1)), 0, extra.item);
      }
    }

    const qTotal = items.filter(i => !i._trial).reduce((a, i) => a + i.blocks.reduce((x, b) => x + b.questions.length, 0), 0);
    const allotted = cfg.mode === 'drill' ? partAllotment('listening', qTotal) : MODULE_TIME.listening;

    this.s = {
      cfg, items, qTotal, allotted, answers: [], idx: 0, blockIdx: 0,
      phase: 'intro', audioDone: false, speaking: null,
      timer: new Timer(allotted, null, () => this.finish(true))
    };
    this.s.timer.start();
    this.render();
  },

  render() {
    const s = this.s;
    const item = s.items[s.idx];
    const block = item.blocks[s.blockIdx];
    const spec = LISTENING_SPEC[item.part];
    const wrap = el('div');
    wrap.appendChild(examChrome(
      'Listening — Part ' + item.part + ': ' + spec.name,
      'Passage ' + (s.idx + 1) + ' of ' + s.items.length +
      (item.blocks.length > 1 ? '  ·  Section ' + (s.blockIdx + 1) + ' of ' + item.blocks.length : ''),
      s.timer));
    const body = el('div', { class: 'wrap' });
    wrap.appendChild(body);

    if (s.phase === 'intro') {
      const c = el('div', { class: 'card' });
      c.innerHTML = '<h2>' + esc(item.title || spec.name) + '</h2>' +
        '<p class="muted">' + esc(item.setting || '') + '</p>' +
        '<div class="flagline">The audio plays <strong>once only</strong>. There is no replay button and no transcript. ' +
        'Make sure your volume is up before you begin.' + (item.blocks.length > 1 ? ' Questions follow each section of the conversation.' : '') + '</div>';
      const btn = el('button', { class: 'btn lg', text: '▶ Play audio (once)' });
      btn.onclick = () => this.playBlock();
      c.appendChild(btn);
      if (!window.speechSynthesis) {
        c.appendChild(el('div', { class: 'flagline bad', style: 'margin-top:12px', html: 'Your browser does not support speech synthesis. Use the <em>Show script</em> button to read the passage instead — timing will not match the real test.' }));
        const alt = el('button', { class: 'btn ghost sm', style: 'margin-top:8px', text: 'Show script (fallback)' });
        alt.onclick = () => { alt.remove(); c.appendChild(el('div', { class: 'passage', style: 'margin-top:12px', html: block.segments.map(x => '<p><strong>' + esc(x.s) + ':</strong> ' + esc(x.t) + '</p>').join('') })); this.s.audioDone = true; c.appendChild(this.contBtn()); };
        c.appendChild(alt);
      }
      body.appendChild(c);
    }

    if (s.phase === 'playing') {
      const c = el('div', { class: 'card center' });
      c.innerHTML = '<h2>Audio playing</h2><p class="muted">Listen carefully. Do not take notes on the screen.</p>' +
        '<div style="font-size:44px;margin:18px 0">🔊</div>' +
        '<div id="nowspk" class="tag">…</div>' +
        '<div class="tiny muted" style="margin-top:14px">Segment <span id="segn">1</span> of ' + block.segments.length + '</div>';
      body.appendChild(c);
    }

    if (s.phase === 'questions') {
      const c = el('div', { class: 'card' });
      c.innerHTML = '<h3>Questions</h3><p class="tiny muted">Answer every question. You cannot return to this section.</p>';
      body.appendChild(c);
      const startQ = this.questionOffset();
      block.questions.forEach((q, qi) => {
        body.appendChild(this.qBlock(q, startQ + qi, item, qi));
      });
      const nav = el('div', { class: 'row', style: 'justify-content:flex-end' });
      const last = (s.idx === s.items.length - 1) && (s.blockIdx === item.blocks.length - 1);
      const b = el('button', { class: 'btn lg', text: last ? 'Finish Listening' : 'Continue' });
      b.onclick = () => this.next();
      nav.appendChild(b);
      body.appendChild(nav);
    }

    setScreen(wrap);
  },

  contBtn() {
    const b = el('button', { class: 'btn lg', style: 'margin-top:12px', text: 'Go to questions' });
    b.onclick = () => { this.s.phase = 'questions'; this.render(); };
    return b;
  },

  questionOffset() {
    const s = this.s;
    let n = 0;
    for (let i = 0; i < s.idx; i++) n += s.items[i].blocks.reduce((a, b) => a + b.questions.length, 0);
    for (let b = 0; b < s.blockIdx; b++) n += s.items[s.idx].blocks[b].questions.length;
    return n;
  },

  qBlock(q, globalIdx, item, qi) {
    const s = this.s;
    const box = el('div', { class: 'qblock' });
    box.appendChild(el('div', { class: 'qtext', text: (globalIdx + 1) + '. ' + q.q }));
    q.o.forEach((opt, oi) => {
      const lab = el('label', { class: 'opt' });
      const inp = el('input', { type: 'radio', name: 'q' + globalIdx });
      inp.onchange = () => {
        const rec = { itemId: item.id, part: item.part, block: s.blockIdx, q: qi, global: globalIdx, chosen: oi, correct: q.a, ok: oi === q.a };
        const ex = s.answers.findIndex(a => a.global === globalIdx);
        if (ex >= 0) s.answers[ex] = rec; else s.answers.push(rec);
        $$('.opt', box).forEach(o => o.classList.remove('sel'));
        lab.classList.add('sel');
      };
      lab.appendChild(inp);
      lab.appendChild(el('span', { class: 'optk', text: 'ABCD'[oi] }));
      lab.appendChild(el('span', { text: opt }));
      box.appendChild(lab);
    });
    return box;
  },

  playBlock() {
    const s = this.s;
    const item = s.items[s.idx];
    const block = item.blocks[s.blockIdx];
    const speakers = [...new Set(block.segments.map(x => x.s))];
    const vmap = TTS.assign(speakers);
    s.phase = 'playing';
    this.render();
    s.speaking = TTS.speakSequence(block.segments, vmap,
      (i, seg) => {
        const n = $('#nowspk'); if (n) { n.textContent = seg.s + '  ·  ' + (vmap[seg.s] ? vmap[seg.s].label : ''); }
        const sn = $('#segn'); if (sn) sn.textContent = String(i + 1);
      },
      () => { s.phase = 'questions'; s.audioDone = true; this.render(); });
  },

  next() {
    const s = this.s;
    const item = s.items[s.idx];
    // unanswered are simply wrong (no penalty structure, but they cost the mark)
    if (s.blockIdx < item.blocks.length - 1) {
      s.blockIdx++; s.phase = 'intro'; this.render();
      // subsequent blocks of Part 1 auto-play, as in the real test
      setTimeout(() => { if (this.s.phase === 'intro') this.playBlock(); }, 900);
      return;
    }
    if (s.idx < s.items.length - 1) { s.idx++; s.blockIdx = 0; s.phase = 'intro'; this.render(); return; }
    this.finish(false);
  },

  finish(timedOut) {
    const s = this.s;
    s.timer.stop();
    if (s.speaking) s.speaking.cancel();
    APP.examMode = false;
    const trialIds = new Set(s.items.filter(i => i._trial).map(i => i.id));
    const scored = s.answers.filter(a => !trialIds.has(a.itemId));
    const raw = scored.filter(a => a.ok).length;
    const usedPct = Math.round(s.timer.usedPct());
    const perPart = {};
    s.items.filter(i => !i._trial).forEach(it => { perPart[it.part] = { part: it.part, name: LISTENING_SPEC[it.part].name, correct: 0, total: 0 }; });
    scored.forEach(a => { if (perPart[a.part]) { perPart[a.part].total++; if (a.ok) perPart[a.part].correct++; } });
    s.items.filter(i => !i._trial).forEach(it => {
      const q = it.blocks.reduce((x, b) => x + b.questions.length, 0);
      if (perPart[it.part]) perPart[it.part].total = q;
    });
    const full = s.cfg.mode !== 'drill' && s.qTotal === 38;
    const attempt = {
      id: uid(), ts: Date.now(), module: 'listening', mode: s.cfg.mode,
      raw, total: s.qTotal, isFullSection: full,
      clb: full ? clbFromRaw(raw).label : null,
      perPart: Object.values(perPart),
      trialCount: s.items.filter(i => i._trial).reduce((a, i) => a + i.blocks.reduce((x, b) => x + b.questions.length, 0), 0),
      answers: s.answers, items: s.items, timeUsedPct: usedPct,
      allottedSec: s.allotted, usedSec: Math.round(s.timer.usedSec()), timedOut: !!timedOut
    };
    DB.addAttempt(attempt);
    renderNav();
    if (APP.mockQueue) { mockAdvance(attempt); return; }
    showLRResult(attempt);
  }
};

/* ---------------- 40.3 READING ---------------- */
function renderDiagram(d) {
  const box = el('div', { class: 'diagram' });
  box.appendChild(el('h4', { text: d.title || 'Diagram' }));
  if (d.caption) box.appendChild(el('p', { class: 'tiny muted', text: d.caption }));
  if (d.type === 'floorplan') {
    const grid = el('div', { class: 'fp', style: 'grid-template-columns:repeat(' + (d.cols || 3) + ',1fr)' });
    (d.cells || []).forEach(c => {
      const cell = el('div', { class: 'fpcell', style: c.full ? 'grid-column:1/-1;background:#eef1f5' : '' });
      cell.innerHTML = '<strong>' + esc(c.k) + '.</strong> ' + esc(c.label) + (c.sub ? '<small>' + esc(c.sub) + '</small>' : '');
      grid.appendChild(cell);
    });
    box.appendChild(grid);
  } else {
    const scroll = el('div', { class: 'scroll' });
    const t = el('table', { class: 'dtable' });
    if (d.head) {
      const tr = el('tr');
      d.head.forEach(h => tr.appendChild(el('th', { text: h })));
      t.appendChild(el('thead', {}, [tr]));
    }
    const tb = el('tbody');
    (d.rows || []).forEach(r => {
      const tr = el('tr');
      r.forEach(c => tr.appendChild(el('td', { text: c })));
      tb.appendChild(tr);
    });
    t.appendChild(tb);
    scroll.appendChild(t);
    box.appendChild(scroll);
  }
  return box;
}

/* Turn "text with {{1}} markers" into a node with <select> dropdowns. */
function blankText(text, blanks, onPick, keyPrefix, showAnswers, given) {
  const box = el('div', { class: 'passage' });
  const parts = String(text).split(/(\{\{\d+\}\})/);
  parts.forEach(seg => {
    const m = seg.match(/^\{\{(\d+)\}\}$/);
    if (m) {
      const n = parseInt(m[1], 10) - 1;
      const b = blanks[n];
      if (!b) { box.appendChild(document.createTextNode(seg)); return; }
      const span = el('span', { class: 'blank' });
      if (showAnswers) {
        const mineIdx = given ? given[n] : undefined;
        const ok = mineIdx === b.a;
        span.innerHTML = '<span class="tag ' + (ok ? 'ok' : 'bad') + '">' + esc(b.o[b.a]) + '</span>' +
          (mineIdx !== undefined && mineIdx !== null && !ok ? ' <span class="tiny" style="color:var(--bad)">(you: ' + esc(b.o[mineIdx]) + ')</span>' : '') +
          (mineIdx === undefined || mineIdx === null ? ' <span class="tiny muted">(blank)</span>' : '');
      } else {
        const sel = el('select');
        sel.appendChild(el('option', { value: '', text: '— choose —' }));
        b.o.forEach((o, i) => sel.appendChild(el('option', { value: String(i), text: o })));
        sel.onchange = () => onPick(n, sel.value === '' ? null : parseInt(sel.value, 10));
        span.appendChild(sel);
      }
      box.appendChild(span);
    } else {
      seg.split('\n').forEach((line, i) => {
        if (i) box.appendChild(el('br'));
        box.appendChild(document.createTextNode(line));
      });
    }
  });
  return box;
}

const Reading = {
  async start(cfg) {
    APP.examMode = true; renderNav();
    const loading = el('div', { class: 'wrap' });
    loading.innerHTML = '<div class="card"><h2>Preparing Reading…</h2><p class="muted">Building ' + cfg.parts.length + ' passage(s).</p></div>';
    setScreen(loading);

    const items = [];
    for (const p of cfg.parts) {
      const r = await getItem('reading', p);
      if (!r.item) { toast('No item for Reading Part ' + p, 'bad'); continue; }
      r.item._source = r.source;
      items.push(r.item);
    }
    if (!items.length) { APP.examMode = false; go('dashboard'); return; }

    if (cfg.mode !== 'drill') {
      const extra = await getItem('reading', pick([1, 2, 3, 4]));
      if (extra.item) {
        extra.item._source = extra.source;
        extra.item._trial = true;
        items.splice(1 + Math.floor(Math.random() * (items.length - 1)), 0, extra.item);
      }
    }

    const qTotal = items.filter(i => !i._trial).reduce((a, i) => a + readingQCount(i), 0);
    const allotted = cfg.mode === 'drill' ? partAllotment('reading', qTotal) : MODULE_TIME.reading;
    this.s = { cfg, items, qTotal, allotted, idx: 0, answers: {}, timer: new Timer(allotted, null, () => this.finish(true)) };
    this.s.timer.start();
    this.render();
  },

  ans(item) {
    if (!this.s.answers[item.id]) this.s.answers[item.id] = { mc: {}, blanks: {}, statements: {} };
    return this.s.answers[item.id];
  },

  render() {
    const s = this.s;
    const item = s.items[s.idx];
    const spec = READING_SPEC[item.part];
    const A = this.ans(item);
    const wrap = el('div');
    wrap.appendChild(examChrome('Reading — Part ' + item.part + ': ' + spec.name,
      'Passage ' + (s.idx + 1) + ' of ' + s.items.length, s.timer));
    const body = el('div', { class: 'wrap wide' });
    wrap.appendChild(body);

    const grid = el('div', { class: 'grid g2' });
    const left = el('div'), right = el('div');
    grid.appendChild(left); grid.appendChild(right);
    body.appendChild(grid);

    let qn = 0;
    const mcOffset = () => qn;

    if (item.part === 1) {
      const p = el('div', { class: 'passage' });
      p.innerHTML = '<div class="letterhead"><div><strong>From:</strong> ' + esc(item.letter.from) + '</div>' +
        '<div><strong>To:</strong> ' + esc(item.letter.to) + '</div><div><strong>Date:</strong> ' + esc(item.letter.date) + '</div>' +
        '<div><strong>Subject:</strong> ' + esc(item.letter.subject) + '</div></div>' +
        item.letter.body.split('\n').map(l => l.trim() ? '<p>' + esc(l) + '</p>' : '').join('');
      left.appendChild(p);
      right.appendChild(el('h3', { text: 'Questions 1–6' }));
      item.mc.forEach((q, i) => right.appendChild(this.mcBlock(q, i, item, i + 1)));
      right.appendChild(el('h3', { text: 'Questions 7–11', style: 'margin-top:18px' }));
      right.appendChild(el('p', { class: 'tiny muted', text: item.reply.header }));
      right.appendChild(blankText(item.reply.text, item.blanks, (n, v) => { A.blanks[n] = v; }, 'b'));
    }

    if (item.part === 2) {
      left.appendChild(renderDiagram(item.diagram));
      const e = el('div', { class: 'passage', style: 'margin-top:14px' });
      e.innerHTML = '<div class="letterhead">' + esc(item.email.header) + '</div>' +
        item.email.body.split('\n').map(l => l.trim() ? '<p>' + esc(l) + '</p>' : '').join('');
      left.appendChild(e);
      right.appendChild(el('h3', { text: 'Questions 1–5' }));
      item.mc.forEach((q, i) => right.appendChild(this.mcBlock(q, i, item, i + 1)));
      right.appendChild(el('h3', { text: 'Questions 6–8', style: 'margin-top:18px' }));
      right.appendChild(el('p', { class: 'tiny muted', text: item.reply.header }));
      right.appendChild(blankText(item.reply.text, item.blanks, (n, v) => { A.blanks[n] = v; }, 'b'));
    }

    if (item.part === 3) {
      if (item.intro) left.appendChild(el('p', { class: 'muted', text: item.intro }));
      item.paras.forEach(p => {
        const box = el('div', { class: 'passage', style: 'margin-bottom:12px' });
        box.innerHTML = '<h4>' + esc(p.k) + '. ' + esc(p.title || '') + '</h4><p>' + esc(p.text) + '</p>';
        left.appendChild(box);
      });
      right.appendChild(el('h3', { text: 'Questions 1–9' }));
      right.appendChild(el('p', { class: 'tiny muted', text: 'Choose the paragraph each statement belongs to. Choose E if the information is not given in any paragraph.' }));
      item.statements.forEach((st, i) => {
        const box = el('div', { class: 'qblock' });
        box.appendChild(el('div', { class: 'qtext', text: (i + 1) + '. ' + st.t }));
        const sel = el('select');
        sel.appendChild(el('option', { value: '', text: '— choose —' }));
        ['A', 'B', 'C', 'D', 'E'].forEach(k => sel.appendChild(el('option', { value: k, text: k === 'E' ? 'E — not given' : k })));
        sel.onchange = () => { A.statements[i] = sel.value || null; };
        box.appendChild(sel);
        right.appendChild(box);
      });
    }

    if (item.part === 4) {
      const p = el('div', { class: 'passage' });
      p.innerHTML = '<h4>' + esc(item.article.title) + '</h4><p class="tiny muted">' + esc(item.article.byline || '') + '</p>' +
        item.article.body.split('\n').map(l => l.trim() ? '<p>' + esc(l) + '</p>' : '').join('');
      left.appendChild(p);
      right.appendChild(el('h3', { text: 'Questions 1–5' }));
      item.mc.forEach((q, i) => right.appendChild(this.mcBlock(q, i, item, i + 1)));
      right.appendChild(el('h3', { text: 'Questions 6–10', style: 'margin-top:18px' }));
      right.appendChild(el('p', { class: 'tiny muted', text: item.comment.header }));
      right.appendChild(blankText(item.comment.text, item.blanks, (n, v) => { A.blanks[n] = v; }, 'b'));
    }

    const nav = el('div', { class: 'row', style: 'justify-content:space-between;margin-top:16px' });
    const back = el('button', { class: 'btn ghost', text: '← Previous passage' });
    back.disabled = s.idx === 0;
    back.onclick = () => { s.idx--; this.render(); };
    const fwd = el('button', { class: 'btn lg', text: s.idx === s.items.length - 1 ? 'Finish Reading' : 'Next passage →' });
    fwd.onclick = () => { if (s.idx === s.items.length - 1) this.confirmFinish(); else { s.idx++; this.render(); } };
    nav.appendChild(back); nav.appendChild(fwd);
    body.appendChild(nav);
    setScreen(wrap);
  },

  mcBlock(q, i, item, num) {
    const A = this.ans(item);
    const box = el('div', { class: 'qblock' });
    box.appendChild(el('div', { class: 'qtext', text: num + '. ' + q.q }));
    q.o.forEach((opt, oi) => {
      const lab = el('label', { class: 'opt' + (A.mc[i] === oi ? ' sel' : '') });
      const inp = el('input', { type: 'radio', name: item.id + '-mc' + i });
      if (A.mc[i] === oi) inp.checked = true;
      inp.onchange = () => { A.mc[i] = oi; $$('.opt', box).forEach(o => o.classList.remove('sel')); lab.classList.add('sel'); };
      lab.appendChild(inp);
      lab.appendChild(el('span', { class: 'optk', text: 'ABCD'[oi] }));
      lab.appendChild(el('span', { text: opt }));
      box.appendChild(lab);
    });
    return box;
  },

  async confirmFinish() {
    const s = this.s;
    const leftPct = 100 - s.timer.usedPct();
    if (leftPct > 20 && !s.warned) {
      s.warned = true;
      await modal({
        title: 'You still have ' + fmtTime(s.timer.left) + ' left',
        html: '<p>You have <strong>' + Math.round(leftPct) + '%</strong> of your reading time remaining ' +
          '(' + fmtTime(s.timer.left) + ').</p><p>Go back and recheck the questions you guessed. In Reading, ' +
          'the marks you leave behind are almost always in the gap-fill sections.</p>',
        buttons: [{ label: 'Go back and check', value: 'back', class: 'ghost' }, { label: 'Submit anyway', value: 'go' }]
      });
      return; // must click Finish again
    }
    this.finish(false);
  },

  finish(timedOut) {
    const s = this.s;
    s.timer.stop();
    APP.examMode = false;
    let raw = 0, total = 0;
    const perPart = [];
    const detail = [];
    s.items.forEach(it => {
      const A = this.s.answers[it.id] || { mc: {}, blanks: {}, statements: {} };
      let c = 0, t = 0;
      if (it.mc) it.mc.forEach((q, i) => { t++; const ok = A.mc[i] === q.a; if (ok) c++; detail.push({ itemId: it.id, part: it.part, kind: 'mc', i, chosen: A.mc[i], correct: q.a, ok }); });
      if (it.blanks) it.blanks.forEach((b, i) => { t++; const ok = A.blanks[i] === b.a; if (ok) c++; detail.push({ itemId: it.id, part: it.part, kind: 'blank', i, chosen: A.blanks[i], correct: b.a, ok }); });
      if (it.statements) it.statements.forEach((st, i) => { t++; const ok = A.statements[i] === st.a; if (ok) c++; detail.push({ itemId: it.id, part: it.part, kind: 'stmt', i, chosen: A.statements[i], correct: st.a, ok }); });
      if (it._trial) return;                       // trial passage: answered, never scored
      raw += c; total += t;
      perPart.push({ part: it.part, name: READING_SPEC[it.part].name, correct: c, total: t });
    });
    const full = s.cfg.mode !== 'drill' && total === 38;
    const attempt = {
      id: uid(), ts: Date.now(), module: 'reading', mode: s.cfg.mode,
      raw, total, isFullSection: full, clb: full ? clbFromRaw(raw).label : null,
      perPart, trialCount: s.items.filter(i => i._trial).reduce((a, i) => a + readingQCount(i), 0),
      answers: detail, rawAnswers: s.answers, items: s.items,
      timeUsedPct: Math.round(s.timer.usedPct()), allottedSec: s.allotted,
      usedSec: Math.round(s.timer.usedSec()), timedOut: !!timedOut
    };
    DB.addAttempt(attempt);
    renderNav();
    if (APP.mockQueue) { mockAdvance(attempt); return; }
    showLRResult(attempt);
  }
};

function readingQCount(it) {
  return (it.mc ? it.mc.length : 0) + (it.blanks ? it.blanks.length : 0) + (it.statements ? it.statements.length : 0);
}

/* ---------------- 40.4 result screen for L/R ---------------- */
function showLRResult(a) {
  const wrap = el('div', { class: 'wrap' });
  const est = a.isFullSection ? clbFromRaw(a.raw) : null;
  const pct = Math.round(100 * a.raw / a.total);
  const head = el('div', { class: 'card' });
  head.innerHTML =
    '<h1>' + (a.module === 'listening' ? 'Listening' : 'Reading') + ' result</h1>' +
    '<div class="row" style="gap:26px;align-items:flex-end">' +
    '<div><div class="tiny muted">RAW SCORE</div><div style="font-size:40px;font-weight:750;line-height:1">' + a.raw + '<span class="muted" style="font-size:20px"> / ' + a.total + '</span></div></div>' +
    '<div><div class="tiny muted">ESTIMATED BAND</div><div style="font-size:40px;font-weight:750;line-height:1">' + (est ? esc(est.label) : '—') + '</div></div>' +
    '<div><div class="tiny muted">TIME USED</div><div style="font-size:40px;font-weight:750;line-height:1">' + a.timeUsedPct + '%</div></div>' +
    '</div>' +
    (est
      ? '<p class="tiny muted" style="margin-top:12px">This is an <strong>estimate only</strong>, mapped from your raw score out of 38. It is not an official CELPIP result and the real conversion varies by test form.</p>'
      : '<p class="tiny muted" style="margin-top:12px">A CLB estimate is only shown for a full 38-question section. This was a ' + a.total + '-question drill (' + pct + '% correct).</p>') +
    (a.trialCount ? '<div class="flagline" style="margin-top:10px">This section contained <strong>' + a.trialCount +
      ' unscored trial questions</strong>, mixed in where you could not identify them — exactly as the real test does. ' +
      'They are excluded from the score above. If a passage felt strange, that may be why.</div>' : '') +
    (a.timedOut ? '<div class="flagline bad" style="margin-top:10px">Time ran out before you finished. Unanswered questions were marked wrong.</div>' : '') +
    (a.timeUsedPct < 80 ? '<div class="flagline" style="margin-top:10px">You used only ' + a.timeUsedPct + '% of the allotted time. On the real test, unused time is wasted marks — go back over the items you were unsure about.</div>' : '');
  wrap.appendChild(head);

  const parts = el('div', { class: 'card' });
  parts.innerHTML = '<h3>By part</h3>';
  const t = el('table');
  t.innerHTML = '<thead><tr><th>Part</th><th>Correct</th><th>Rate</th></tr></thead>';
  const tb = el('tbody');
  a.perPart.forEach(p => {
    const r = el('tr');
    const rate = p.total ? Math.round(100 * p.correct / p.total) : 0;
    r.innerHTML = '<td>Part ' + p.part + ' — ' + esc(p.name) + '</td><td>' + p.correct + ' / ' + p.total + '</td>' +
      '<td><span class="tag ' + (rate >= 80 ? 'ok' : rate >= 60 ? 'warn' : 'bad') + '">' + rate + '%</span></td>';
    tb.appendChild(r);
  });
  t.appendChild(tb);
  parts.appendChild(t);
  wrap.appendChild(parts);

  const row = el('div', { class: 'row' });
  const rev = el('button', { class: 'btn', text: 'Review answers and transcripts' });
  rev.onclick = () => go('review', { id: a.id });
  const again = el('button', { class: 'btn ghost', text: 'Back to dashboard' });
  again.onclick = () => go('dashboard');
  row.appendChild(rev); row.appendChild(again);
  wrap.appendChild(row);
  setScreen(wrap);
}
