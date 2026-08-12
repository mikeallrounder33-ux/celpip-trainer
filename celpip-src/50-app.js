/* ============================================================
   PART 50 — DASHBOARD, REVIEW, SETTINGS, ROUTER, FULL MOCK
   ============================================================ */

/* ---------------- 50.1 navigation ---------------- */
const ROUTES = [
  ['dashboard', 'Dashboard'], ['drill', 'Drill'], ['section', 'Section'],
  ['mock', 'Full Mock'], ['errors', 'Error Log'], ['review', 'Review'], ['settings', 'Settings']
];
function renderNav() {
  const nav = $('#nav');
  nav.innerHTML = '';
  if (APP.examMode) {
    nav.appendChild(el('span', { class: 'tag bad', text: 'TEST IN PROGRESS' }));
    const ab = el('button', { text: 'Abort' });
    ab.onclick = async () => {
      const ok = await modal({
        title: 'Abort this test?', body: 'Your progress in this section will be discarded and nothing will be logged.',
        buttons: [{ label: 'Keep going', value: false, class: 'ghost' }, { label: 'Abort', value: true, class: 'danger' }]
      });
      if (ok) {
        try { if (Listening.s && Listening.s.timer) Listening.s.timer.stop(); } catch (e) { }
        try { if (Listening.s && Listening.s.speaking) Listening.s.speaking.cancel(); } catch (e) { }
        try { if (Reading.s && Reading.s.timer) Reading.s.timer.stop(); } catch (e) { }
        try { if (Writing.s && Writing.s.timer) Writing.s.timer.stop(); } catch (e) { }
        try { if (Speaking.s && Speaking.s.phaseTimer) Speaking.s.phaseTimer.stop(); } catch (e) { }
        if (window.speechSynthesis) speechSynthesis.cancel();
        Rec.release();
        APP.mockQueue = null; APP.examMode = false;
        go('dashboard');
      }
    };
    nav.appendChild(ab);
  } else {
    ROUTES.forEach(([k, label]) => {
      const b = el('button', { text: label, class: APP.route === k ? 'on' : '' });
      b.onclick = () => go(k);
      nav.appendChild(b);
    });
  }
  const ks = $('#keystate');
  const st = DB.settings();
  ks.innerHTML = !API.available()
    ? '<span class="tag warn">Offline mode — built-in item bank' +
      (st.provider === 'browser' && BrowserLLM.supported() && !BrowserLLM.ready ? ' · load the in-browser model in Settings' : '') + '</span>'
    : st.provider === 'browser'
      ? '<span class="tag ok">In-browser model (' + esc(BrowserLLM.modelId || '?').replace(/-q4f16.*$/, '') + ') — no key, runs on this machine</span>'
      : API.isLocal() || st.noKeyNeeded
        ? '<span class="tag ok">' + esc(st.model || '?') + ' — no key in this browser</span>'
        : '<span class="tag ok">' + esc(API.providerName()) + ' key set — fresh items + full rating</span>';
}

function go(route, params) {
  if (APP.examMode) return;
  APP.route = route; APP.params = params || {};
  renderNav();
  ({
    dashboard: renderDashboard, drill: renderDrill, section: renderSection,
    mock: renderMock, errors: renderErrorLog, review: renderReview, settings: renderSettings
  }[route] || renderDashboard)();
}

/* ---------------- 50.2 small SVG chart ---------------- */
function lineChart(series, opts) {
  opts = opts || {};
  const W = opts.w || 560, H = opts.h || 190, P = 32;
  const all = series.flatMap(s => s.points.map(p => p.y));
  if (!all.length) return el('p', { class: 'muted small', text: 'No data yet — complete an attempt to start the trend line.' });
  const ymin = Math.max(0, Math.min(...all) - 1), ymax = Math.max(...all) + 1;
  const maxLen = Math.max(...series.map(s => s.points.length), 2);
  const x = i => P + (W - P - 12) * (maxLen === 1 ? 0.5 : i / (maxLen - 1));
  const y = v => H - P - (H - P - 14) * ((v - ymin) / (ymax - ymin || 1));
  let svg = '<svg viewBox="0 0 ' + W + ' ' + H + '" width="100%" style="max-width:' + W + 'px">';
  for (let g = Math.ceil(ymin); g <= Math.floor(ymax); g++) {
    svg += '<line x1="' + P + '" y1="' + y(g) + '" x2="' + (W - 12) + '" y2="' + y(g) + '" stroke="#e8ebef"/>' +
      '<text x="4" y="' + (y(g) + 4) + '" font-size="10" fill="#5d6673">' + g + '</text>';
  }
  series.forEach(s => {
    if (!s.points.length) return;
    const d = s.points.map((p, i) => (i ? 'L' : 'M') + x(i) + ' ' + y(p.y)).join(' ');
    svg += '<path d="' + d + '" fill="none" stroke="' + s.color + '" stroke-width="2.5" stroke-linejoin="round"/>';
    s.points.forEach((p, i) => { svg += '<circle cx="' + x(i) + '" cy="' + y(p.y) + '" r="3.5" fill="' + s.color + '"/>'; });
  });
  svg += '</svg>';
  const box = el('div');
  box.innerHTML = svg;
  const leg = el('div', { class: 'row', style: 'gap:14px;margin-top:6px' });
  series.forEach(s => leg.appendChild(el('span', {
    class: 'tiny', html: '<span style="display:inline-block;width:10px;height:10px;border-radius:2px;background:' + s.color + ';margin-right:5px"></span>' + esc(s.name)
  })));
  box.appendChild(leg);
  return box;
}

/* ---------------- 50.3 DASHBOARD ---------------- */
function attemptCLB(a) {
  if (a.module === 'listening' || a.module === 'reading') {
    if (!a.isFullSection) return null;
    return clbFromRaw(a.raw).clb;
  }
  return a.rating ? a.rating.overall_clb : null;
}

function renderDashboard() {
  const wrap = el('div', { class: 'wrap wide' });
  const attempts = DB.attempts();
  const errors = DB.errors();

  const head = el('div', { class: 'card' });
  head.innerHTML = '<h1>Dashboard</h1><p class="muted">' + attempts.length + ' logged attempt' + (attempts.length === 1 ? '' : 's') +
    '. All data is stored in this browser under the <code>celpip_</code> keys — export it regularly.</p>';
  wrap.appendChild(head);

  // ---- headline numbers ----
  const timeUse = attempts.filter(a => typeof a.timeUsedPct === 'number');
  const avgTime = timeUse.length ? Math.round(timeUse.reduce((s, a) => s + a.timeUsedPct, 0) / timeUse.length) : 0;
  const prod = attempts.filter(a => a.module === 'writing' || a.module === 'speaking');
  const avgTpl = prod.length ? (prod.reduce((s, a) => s + (a.analysis && a.analysis.templates ? a.analysis.templates.total : 0), 0) / prod.length).toFixed(1) : '0.0';
  const stats = el('div', { class: 'grid g4' });
  const mk = (label, val, note, cls) => {
    const d = el('div', { class: 'card tight' });
    d.innerHTML = '<div class="tiny muted">' + label + '</div><div style="font-size:30px;font-weight:750;line-height:1.1;' +
      (cls ? 'color:' + cls : '') + '">' + val + '</div><div class="tiny muted">' + note + '</div>';
    return d;
  };
  stats.appendChild(mk('AVERAGE TIME USED', avgTime + '%', avgTime < 85 ? 'Below 85% — you are leaving marks behind' : 'Good use of the clock',
    avgTime < 85 ? 'var(--bad)' : 'var(--ok)'));
  stats.appendChild(mk('TEMPLATE PHRASES / ATTEMPT', avgTpl, prod.length ? 'across ' + prod.length + ' written/spoken attempts' : 'no data yet',
    parseFloat(avgTpl) >= 2 ? 'var(--bad)' : parseFloat(avgTpl) >= 1 ? 'var(--warn)' : 'var(--ok)'));
  stats.appendChild(mk('DISTINCT REPEAT ERRORS', errors.filter(e => e.count > 1).length, 'errors seen more than once'));
  stats.appendChild(mk('ATTEMPTS THIS WEEK', attempts.filter(a => Date.now() - a.ts < 7 * 864e5).length, 'last 7 days'));
  wrap.appendChild(stats);

  // ---- CLB trend per module ----
  const colors = { listening: '#1f5fd0', reading: '#12805c', writing: '#b06a00', speaking: '#8b3fb0' };
  const series = ['listening', 'reading', 'writing', 'speaking'].map(m => ({
    name: m[0].toUpperCase() + m.slice(1), color: colors[m],
    points: attempts.filter(a => a.module === m).map(a => ({ y: attemptCLB(a), ts: a.ts }))
      .filter(p => typeof p.y === 'number' && p.y > 0).reverse()
  })).filter(s => s.points.length);
  const trend = el('div', { class: 'card' });
  trend.innerHTML = '<h3>CLB trend by module</h3><p class="tiny muted">Oldest attempt on the left. Listening and Reading appear only for full 38-question sections.</p>';
  trend.appendChild(lineChart(series, { w: 900, h: 220 }));
  wrap.appendChild(trend);

  // ---- repeat offenders ----
  const ro = el('div', { class: 'card' });
  ro.innerHTML = '<h3>Your repeat offenders</h3>';
  const top = errors.filter(e => e.count >= 1).slice(0, 5);
  if (!top.length) ro.appendChild(el('p', { class: 'muted small', text: 'Nothing logged yet. Complete a Writing or Speaking task to start the table.' }));
  else {
    const t = el('table');
    t.innerHTML = '<thead><tr><th>Type</th><th>You wrote</th><th>Correct</th><th>×</th><th>Last seen</th></tr></thead>';
    const tb = el('tbody');
    top.forEach(e => {
      const tr = el('tr');
      tr.innerHTML = '<td><span class="tag ' + (e.count >= 3 ? 'bad' : 'grey') + '">' + esc(e.type) + '</span></td>' +
        '<td>' + esc(e.mine) + '</td><td>' + esc(e.correct) + '</td><td><strong>' + e.count + '</strong></td>' +
        '<td class="tiny muted">' + fmtDate(e.lastSeen) + '</td>';
      tb.appendChild(tr);
    });
    t.appendChild(tb); ro.appendChild(t);
    const b = el('button', { class: 'btn ghost sm', style: 'margin-top:10px', text: 'Open the full error log' });
    b.onclick = () => go('errors');
    ro.appendChild(b);
  }
  wrap.appendChild(ro);

  // ---- coverage: tasks not yet attempted ----
  const cov = el('div', { class: 'card' });
  cov.innerHTML = '<h3>Not yet attempted</h3>';
  const done = new Set();
  attempts.forEach(a => {
    if (a.module === 'writing' || a.module === 'speaking') done.add(a.module + ':' + a.task);
    if (a.module === 'listening' || a.module === 'reading') (a.perPart || []).forEach(p => done.add(a.module + ':' + p.part));
  });
  const missing = [];
  [1, 2, 3, 4, 5, 6].forEach(p => { if (!done.has('listening:' + p)) missing.push('Listening Part ' + p + ' — ' + LISTENING_SPEC[p].name); });
  [1, 2, 3, 4].forEach(p => { if (!done.has('reading:' + p)) missing.push('Reading Part ' + p + ' — ' + READING_SPEC[p].name); });
  [1, 2].forEach(t => { if (!done.has('writing:' + t)) missing.push('Writing Task ' + t + ' — ' + (t === 1 ? 'Email' : 'Survey')); });
  [1, 2, 3, 4, 5, 6, 7, 8].forEach(t => { if (!done.has('speaking:' + t)) missing.push('Speaking Task ' + t + ' — ' + SPEAKING_SPEC[t].name); });
  if (!missing.length) cov.appendChild(el('div', { class: 'flagline ok', text: 'You have attempted every task type at least once.' }));
  else {
    const g = el('div', { class: 'row' });
    missing.forEach(m => g.appendChild(el('span', { class: 'pill', text: m })));
    cov.appendChild(g);
  }
  wrap.appendChild(cov);

  // ---- recent attempts ----
  const rec = el('div', { class: 'card' });
  rec.innerHTML = '<h3>Recent attempts</h3>';
  if (!attempts.length) rec.appendChild(el('p', { class: 'muted small', text: 'Nothing yet. Start with a Drill.' }));
  else {
    const t = el('table');
    t.innerHTML = '<thead><tr><th>When</th><th>Module</th><th>Mode</th><th>Result</th><th>Time used</th><th></th></tr></thead>';
    const tb = el('tbody');
    attempts.slice(0, 10).forEach(a => {
      const tr = el('tr');
      const result = (a.module === 'listening' || a.module === 'reading')
        ? a.raw + '/' + a.total + (a.clb ? ' · ' + a.clb : '')
        : 'CLB ' + (a.rating ? a.rating.overall_clb : '?') + ' · Task ' + a.task;
      tr.innerHTML = '<td class="tiny muted">' + fmtDate(a.ts) + '</td><td>' + a.module + '</td><td>' + a.mode + '</td>' +
        '<td><strong>' + esc(result) + '</strong></td><td>' + (a.timeUsedPct || 0) + '%</td><td></td>';
      const b = el('button', { class: 'btn ghost sm', text: 'Review' });
      b.onclick = () => go('review', { id: a.id });
      tr.lastChild.appendChild(b);
      tb.appendChild(tr);
    });
    t.appendChild(tb); rec.appendChild(t);
  }
  wrap.appendChild(rec);
  setScreen(wrap);
}

/* ---------------- 50.4 DRILL ---------------- */
function renderDrill() {
  const wrap = el('div', { class: 'wrap' });
  wrap.appendChild(el('div', {
    class: 'card', html: '<h1>Drill mode</h1><p class="muted">One task type, on demand, under a proportional clock. ' +
      'Use this daily; use Section mode two or three times a week.</p>'
  }));

  const mkCard = (title, note, buttons) => {
    const c = el('div', { class: 'card' });
    c.innerHTML = '<h3>' + title + '</h3><p class="small muted">' + note + '</p>';
    const row = el('div', { class: 'row' });
    buttons.forEach(b => {
      const btn = el('button', { class: 'btn ghost sm', text: b.label });
      btn.onclick = b.fn;
      row.appendChild(btn);
    });
    c.appendChild(row);
    return c;
  };

  wrap.appendChild(mkCard('Listening', 'Audio plays once. No replay, no transcript until review.',
    [1, 2, 3, 4, 5, 6].map(p => ({
      label: 'Part ' + p + ' · ' + LISTENING_SPEC[p].name + ' (' + LISTENING_SPEC[p].q + 'Q)',
      fn: () => Listening.start({ mode: 'drill', parts: [p] })
    }))));

  wrap.appendChild(mkCard('Reading', 'Passage and questions side by side, as on the real test.',
    [1, 2, 3, 4].map(p => ({
      label: 'Part ' + p + ' · ' + READING_SPEC[p].name + ' (' + READING_SPEC[p].q + 'Q)',
      fn: () => Reading.start({ mode: 'drill', parts: [p] })
    }))));

  wrap.appendChild(mkCard('Writing', 'Full clock, live word count, proofread gate, rubric-mapped rating.', [
    { label: 'Task 1 · Email (27 min)', fn: () => Writing.start({ mode: 'drill', tasks: [1] }) },
    { label: 'Task 2 · Survey (26 min)', fn: () => Writing.start({ mode: 'drill', tasks: [2] }) }
  ]));

  wrap.appendChild(mkCard('Speaking', 'Prep starts automatically; recording starts automatically. No re-record.',
    [1, 2, 3, 4, 5, 6, 7, 8].map(t => ({
      label: 'Task ' + t + ' · ' + SPEAKING_SPEC[t].name,
      fn: () => Speaking.start({ mode: 'drill', tasks: [t] })
    }))));

  setScreen(wrap);
}

/* ---------------- 50.5 SECTION ---------------- */
function renderSection() {
  const wrap = el('div', { class: 'wrap' });
  wrap.appendChild(el('div', {
    class: 'card', html: '<h1>Section mode</h1><p class="muted">One complete module under real timing. ' +
      'Listening and Reading are 38 scored questions each, so both produce a CLB estimate.</p>'
  }));
  const rows = [
    ['Listening — 6 parts, 38 questions, 55 minutes', () => Listening.start({ mode: 'section', parts: [1, 2, 3, 4, 5, 6] })],
    ['Reading — 4 parts, 38 questions, 56 minutes', () => Reading.start({ mode: 'section', parts: [1, 2, 3, 4] })],
    ['Writing — Task 1 then Task 2, 53 minutes total', () => Writing.start({ mode: 'section', tasks: [1, 2] })],
    ['Speaking — practice task + 8 scored tasks, ~15 minutes', () => Speaking.start({ mode: 'section', tasks: [1, 2, 3, 4, 5, 6, 7, 8] })]
  ];
  rows.forEach(([label, fn]) => {
    const c = el('div', { class: 'card row', style: 'justify-content:space-between' });
    c.appendChild(el('div', { html: '<strong>' + label.split(' — ')[0] + '</strong><div class="small muted">' + label.split(' — ')[1] + '</div>' }));
    const b = el('button', { class: 'btn', text: 'Start' });
    b.onclick = fn;
    c.appendChild(b);
    wrap.appendChild(c);
  });
  setScreen(wrap);
}

/* ---------------- 50.6 FULL MOCK ---------------- */
function renderMock() {
  const wrap = el('div', { class: 'wrap' });
  const c = el('div', { class: 'card' });
  c.innerHTML = '<h1>Full mock test</h1>' +
    '<p>All four modules back to back, in the official order, with no pausing between them:</p>' +
    '<ul class="clean"><li>Listening — 55 minutes, 38 questions</li><li>Reading — 56 minutes, 38 questions</li>' +
    '<li>Writing — 53 minutes, two tasks</li><li>Speaking — about 15 minutes, 8 scored tasks</li></ul>' +
    '<p class="small muted">Total about three hours. Once you begin, the only way out is Abort, which discards the run. ' +
    'Sit it in one block, with your phone in another room.</p>' +
    '<div class="flagline">Make sure your microphone works and your speakers are on before you start. ' +
    'The Speaking section cannot be re-recorded.</div>';
  const b = el('button', { class: 'btn lg', text: 'Begin full mock' });
  b.onclick = async () => {
    const ok = await modal({
      title: 'Begin the full mock?',
      body: 'Roughly three hours with no pause. Do not start unless you can finish.',
      buttons: [{ label: 'Not now', value: false, class: 'ghost' }, { label: 'Begin', value: true }]
    });
    if (!ok) return;
    APP.mockQueue = { stage: 0, results: [] };
    mockRun();
  };
  c.appendChild(b);
  wrap.appendChild(c);
  setScreen(wrap);
}

function mockRun() {
  const q = APP.mockQueue;
  if (!q) return;
  if (q.stage === 0) return Listening.start({ mode: 'mock', parts: [1, 2, 3, 4, 5, 6] });
  if (q.stage === 1) return Reading.start({ mode: 'mock', parts: [1, 2, 3, 4] });
  if (q.stage === 2) return Writing.start({ mode: 'mock', tasks: [1, 2] });
  if (q.stage === 3) return Speaking.start({ mode: 'mock', tasks: [1, 2, 3, 4, 5, 6, 7, 8] });
  return mockFinish();
}
async function mockAdvance(attempt) {
  const q = APP.mockQueue;
  if (!q) return;
  q.results.push(attempt);
  q.stage++;
  if (q.stage > 3) return mockFinish();
  const names = ['Listening', 'Reading', 'Writing', 'Speaking'];
  await modal({
    title: names[q.stage - 1] + ' complete',
    html: '<p>' + names[q.stage] + ' begins as soon as you continue. There is no break in the real test either.</p>',
    buttons: [{ label: 'Continue to ' + names[q.stage], value: 1 }]
  });
  mockRun();
}
function mockFinish() {
  const q = APP.mockQueue;
  APP.mockQueue = null; APP.examMode = false; renderNav();
  const attempts = DB.attempts().filter(a => a.mode === 'mock').slice(0, 12);
  const byModule = {};
  attempts.forEach(a => { if (!byModule[a.module]) byModule[a.module] = []; byModule[a.module].push(a); });
  const wrap = el('div', { class: 'wrap' });
  const head = el('div', { class: 'card' });
  const bands = [];
  ['listening', 'reading', 'writing', 'speaking'].forEach(m => {
    const list = byModule[m] || [];
    if (!list.length) return;
    let b = null;
    if (m === 'listening' || m === 'reading') b = list[0].isFullSection ? clbFromRaw(list[0].raw).clb : null;
    else b = anchoredOverall(list.map(a => a.rating.overall_clb));
    if (b) bands.push({ m, b });
  });
  head.innerHTML = '<h1>Full mock — result</h1>' +
    '<div class="grid g4">' + bands.map(x =>
      '<div class="card tight"><div class="tiny muted">' + x.m.toUpperCase() + '</div>' +
      '<div style="font-size:34px;font-weight:750;line-height:1.1">CLB ' + x.b + '</div></div>').join('') + '</div>' +
    '<p class="tiny muted" style="margin-top:10px">Estimates only. Listening and Reading come from the raw-score mapping; Writing and Speaking from the rater, lowest-anchored.</p>';
  wrap.appendChild(head);
  const b = el('button', { class: 'btn', text: 'Go to dashboard' });
  b.onclick = () => go('dashboard');
  wrap.appendChild(b);
  setScreen(wrap);
}

/* ---------------- 50.7 ERROR LOG ---------------- */
function renderErrorLog() {
  const wrap = el('div', { class: 'wrap' });
  const errors = DB.errors();
  const head = el('div', { class: 'card' });
  head.innerHTML = '<h1>Recurring error log</h1><p class="muted">Every error extracted from a graded attempt, sorted by how often it has come back. ' +
    'Anything with a count of 3 or more is a habit, not a slip.</p>';
  wrap.appendChild(head);

  const cats = {};
  errors.forEach(e => { cats[e.type] = (cats[e.type] || 0) + e.count; });
  const catCard = el('div', { class: 'card' });
  catCard.innerHTML = '<h3>By category</h3>';
  const row = el('div', { class: 'row' });
  const TRACKED = ['homophone confusion', 'dropped verb forms and auxiliaries', 'missing end punctuation',
    'run-on sentences', 'spelling', 'article errors', 'register mismatch'];
  TRACKED.forEach(t => {
    const n = cats[t] || 0;
    row.appendChild(el('span', { class: 'pill', html: esc(t) + ' <strong style="color:' + (n >= 5 ? 'var(--bad)' : n ? 'var(--warn)' : 'var(--ok)') + '">' + n + '</strong>' }));
  });
  catCard.appendChild(row);
  wrap.appendChild(catCard);

  const c = el('div', { class: 'card' });
  if (!errors.length) c.innerHTML = '<p class="muted">Nothing logged yet.</p>';
  else {
    const t = el('table');
    t.innerHTML = '<thead><tr><th>Type</th><th>Your version</th><th>Correct version</th><th>Times</th><th>Last seen</th><th></th></tr></thead>';
    const tb = el('tbody');
    errors.forEach(e => {
      const tr = el('tr');
      tr.innerHTML = '<td><span class="tag ' + (e.count >= 3 ? 'bad' : e.count === 2 ? 'warn' : 'grey') + '">' + esc(e.type) + '</span></td>' +
        '<td>' + esc(e.mine) + '</td><td>' + esc(e.correct) + '</td><td><strong>' + e.count + '</strong></td>' +
        '<td class="tiny muted">' + fmtDate(e.lastSeen) + '</td><td></td>';
      const del = el('button', { class: 'btn ghost sm', text: 'Clear' });
      del.onclick = () => { DB.saveErrors(DB.errors().filter(x => x.key !== e.key)); renderErrorLog(); };
      tr.lastChild.appendChild(del);
      tb.appendChild(tr);
    });
    t.appendChild(tb); c.appendChild(t);
  }
  wrap.appendChild(c);
  setScreen(wrap);
}

/* ---------------- 50.8 REVIEW ---------------- */
function renderReview() {
  const id = APP.params && APP.params.id;
  const attempts = DB.attempts();
  if (id) {
    const a = attempts.find(x => x.id === id);
    if (a) return reviewDetail(a);
  }
  const wrap = el('div', { class: 'wrap' });
  wrap.appendChild(el('div', { class: 'card', html: '<h1>Review</h1><p class="muted">Every past attempt, with your answers, the marker\'s feedback, the transcript and the model rewrite.</p>' }));
  const c = el('div', { class: 'card' });
  if (!attempts.length) c.innerHTML = '<p class="muted">No attempts yet.</p>';
  else {
    const t = el('table');
    t.innerHTML = '<thead><tr><th>When</th><th>Module</th><th>Detail</th><th>Result</th><th>Time</th><th></th></tr></thead>';
    const tb = el('tbody');
    attempts.forEach(a => {
      const tr = el('tr');
      const det = (a.module === 'writing' || a.module === 'speaking') ? 'Task ' + a.task
        : (a.perPart || []).map(p => 'P' + p.part).join(' ');
      const result = (a.module === 'listening' || a.module === 'reading')
        ? a.raw + '/' + a.total + (a.clb ? ' · ' + a.clb : '') : 'CLB ' + (a.rating ? a.rating.overall_clb : '?');
      tr.innerHTML = '<td class="tiny muted">' + fmtDate(a.ts) + '</td><td>' + a.module + '</td><td class="tiny">' + esc(det) + '</td>' +
        '<td><strong>' + esc(result) + '</strong></td><td>' + (a.timeUsedPct || 0) + '%</td><td></td>';
      const b = el('button', { class: 'btn ghost sm', text: 'Open' });
      b.onclick = () => go('review', { id: a.id });
      tr.lastChild.appendChild(b);
      tb.appendChild(tr);
    });
    t.appendChild(tb); c.appendChild(t);
  }
  wrap.appendChild(c);
  setScreen(wrap);
}

function reviewDetail(a) {
  const wrap = el('div', { class: 'wrap wide' });
  const back = el('button', { class: 'btn ghost sm', text: '← All attempts' });
  back.onclick = () => go('review');
  wrap.appendChild(el('div', { class: 'row', style: 'margin-bottom:12px' }, [back]));

  if (a.module === 'writing' || a.module === 'speaking') {
    const head = el('div', { class: 'card' });
    head.innerHTML = '<h1>' + a.module[0].toUpperCase() + a.module.slice(1) + ' Task ' + a.task + '</h1>' +
      '<p class="tiny muted">' + fmtDate(a.ts) + ' · ' + a.mode + ' mode · CLB ' + (a.rating ? a.rating.overall_clb : '?') +
      ' · ' + a.timeUsedPct + '% of time used</p>';
    wrap.appendChild(head);

    // prompt
    const pr = el('div', { class: 'card' });
    const it = a.item;
    if (a.module === 'writing') {
      pr.innerHTML = '<h3>The prompt</h3><p>' + esc(it.scenario) + '</p>' +
        (it.bullets ? '<ul class="bullets">' + it.bullets.map(b => '<li>' + esc(b) + '</li>').join('') + '</ul>' :
          '<p><strong>' + esc(it.optionA.label) + '</strong> — ' + esc(it.optionA.desc) + '<br><strong>' + esc(it.optionB.label) + '</strong> — ' + esc(it.optionB.desc) + '</p>');
    } else {
      pr.innerHTML = '<h3>The prompt</h3>' + (it.scene ? '<div style="max-width:520px;border:1px solid var(--line);border-radius:8px;overflow:hidden;margin-bottom:10px">' + SCENES[it.scene].svg + '</div>' : '') +
        '<p>' + esc(it.prompt || (it.context || '')) + '</p>' +
        (it.optionA ? '<p><strong>' + esc(it.optionA.label) + '</strong> — ' + esc(it.optionA.desc) + '<br><strong>' + esc(it.optionB.label) + '</strong> — ' + esc(it.optionB.desc) + '</p>' : '');
    }
    wrap.appendChild(pr);

    // audio playback
    if (a.module === 'speaking' && (MEM.audio[a.id] || a.audioData)) {
      const ac = el('div', { class: 'card' });
      ac.innerHTML = '<h3>Your recording</h3>';
      const au = el('audio', { controls: 'controls', src: MEM.audio[a.id] || a.audioData, style: 'width:100%' });
      ac.appendChild(au);
      if (!a.audioData) ac.appendChild(el('p', { class: 'tiny muted', text: 'Held in memory for this browser session only. Turn on "persist audio" in Settings to keep short clips across reloads.' }));
      wrap.appendChild(ac);
    } else if (a.module === 'speaking') {
      wrap.appendChild(el('div', { class: 'card', html: '<h3>Your recording</h3><p class="small muted">The audio for this attempt is no longer in memory. Transcripts are always kept.</p>' }));
    }

    // side-by-side: mine | feedback | rewrite
    const D = (a.rating && a.rating.dimensions) || {};
    const rdKey = a.module === 'writing' ? 'readability' : 'listenability';
    const dims = el('div', { class: 'grid g4' });
    dims.appendChild(dimCard('Content / Coherence', D.content_coherence, ''));
    dims.appendChild(dimCard('Vocabulary', D.vocabulary, ''));
    dims.appendChild(dimCard(a.module === 'writing' ? 'Readability' : 'Listenability', D[rdKey], ''));
    dims.appendChild(dimCard('Task Fulfillment', D.task_fulfillment, ''));
    wrap.appendChild(dims);

    const fb = el('div', { class: 'card' });
    fb.innerHTML = '<h3>Rater feedback</h3><ol class="clean">' + ((a.rating && a.rating.top_3_fixes) || []).map(f => '<li>' + esc(f) + '</li>').join('') + '</ol>' +
      (a.errors && a.errors.length ? '<h4 style="margin-top:12px">Errors logged</h4>' + a.errors.map(e => '<div class="small">· <span class="tag grey">' + esc(e.type) + '</span> ' + esc(e.mine) + ' → <strong>' + esc(e.correct) + '</strong></div>').join('') : '');
    wrap.appendChild(fb);
    wrap.appendChild(answerPanels(a, a.rating || {}, a.module === 'writing'));
    setScreen(wrap);
    return;
  }

  // ---- Listening / Reading review ----
  const head = el('div', { class: 'card' });
  head.innerHTML = '<h1>' + a.module[0].toUpperCase() + a.module.slice(1) + ' review</h1>' +
    '<p class="tiny muted">' + fmtDate(a.ts) + ' · ' + a.mode + ' mode · ' + a.raw + '/' + a.total +
    (a.clb ? ' · ' + a.clb : '') + ' · ' + a.timeUsedPct + '% of time used</p>';
  wrap.appendChild(head);

  (a.items || []).forEach(item => {
    const c = el('div', { class: 'card' });
    const specName = a.module === 'listening' ? LISTENING_SPEC[item.part].name : READING_SPEC[item.part].name;
    c.innerHTML = '<h3>Part ' + item.part + ' — ' + esc(specName) + (item.title ? ': ' + esc(item.title) : '') + '</h3>';

    if (a.module === 'listening') {
      const tr = el('details');
      tr.innerHTML = '<summary style="cursor:pointer;font-weight:600;margin-bottom:8px">Show transcript (hidden during the test)</summary>';
      const box = el('div', { class: 'passage' });
      item.blocks.forEach((b, bi) => {
        box.appendChild(el('p', { class: 'tiny muted', text: item.blocks.length > 1 ? '— Section ' + (bi + 1) + ' —' : '' }));
        b.segments.forEach(sg => {
          box.appendChild(el('p', { html: '<strong>' + esc(sg.s) + ':</strong> ' + esc(sg.t) }));
        });
      });
      tr.appendChild(box);
      c.appendChild(tr);

      let gi = 0;
      const before = (a.items.indexOf(item));
      let offset = 0;
      for (let i = 0; i < before; i++) offset += a.items[i].blocks.reduce((x, b) => x + b.questions.length, 0);
      item.blocks.forEach((b, bi) => {
        b.questions.forEach((q, qi) => {
          const rec = (a.answers || []).find(x => x.itemId === item.id && x.block === bi && x.q === qi);
          c.appendChild(reviewQ(offset + gi + 1, q.q, q.o, q.a, rec ? rec.chosen : null, q.w));
          gi++;
        });
      });
    } else {
      // reading
      if (item.letter) {
        const d = el('details');
        d.innerHTML = '<summary style="cursor:pointer;font-weight:600;margin-bottom:8px">Show the passage</summary>';
        d.appendChild(el('div', { class: 'passage', html: esc(item.letter.body).replace(/\n/g, '<br>') }));
        c.appendChild(d);
      }
      if (item.article) {
        const d = el('details');
        d.innerHTML = '<summary style="cursor:pointer;font-weight:600;margin-bottom:8px">Show the article</summary>';
        d.appendChild(el('div', { class: 'passage', html: '<h4>' + esc(item.article.title) + '</h4>' + esc(item.article.body).replace(/\n/g, '<br>') }));
        c.appendChild(d);
      }
      if (item.paras) {
        const d = el('details');
        d.innerHTML = '<summary style="cursor:pointer;font-weight:600;margin-bottom:8px">Show the paragraphs</summary>';
        d.appendChild(el('div', { class: 'passage', html: item.paras.map(p => '<p><strong>' + esc(p.k) + '. ' + esc(p.title || '') + '</strong><br>' + esc(p.text) + '</p>').join('') }));
        c.appendChild(d);
      }
      if (item.diagram) c.appendChild(renderDiagram(item.diagram));

      let n = 1;
      const A = (a.rawAnswers && a.rawAnswers[item.id]) || { mc: {}, blanks: {}, statements: {} };
      (item.mc || []).forEach((q, i) => { c.appendChild(reviewQ(n++, q.q, q.o, q.a, A.mc[i], q.w)); });
      (item.statements || []).forEach((st, i) => {
        c.appendChild(reviewQ(n++, st.t, ['A', 'B', 'C', 'D', 'E — not given'], 'ABCDE'.indexOf(st.a),
          A.statements[i] ? 'ABCDE'.indexOf(A.statements[i]) : null, 'Paragraph ' + st.a));
      });
      if (item.blanks && item.blanks.length) {
        const src = item.reply || item.comment;
        c.appendChild(el('h4', { text: 'Gap-fill — correct answers shown' }));
        c.appendChild(blankText(src.text, item.blanks, () => { }, 'r', true, A.blanks));
      }
    }
    wrap.appendChild(c);
  });
  setScreen(wrap);
}

function reviewQ(num, qtext, options, correctIdx, chosenIdx, why) {
  const box = el('div', { class: 'qblock' });
  const ok = chosenIdx === correctIdx;
  box.appendChild(el('div', {
    class: 'qtext',
    html: num + '. ' + esc(qtext) + ' ' + (ok ? '<span class="tag ok">correct</span>' :
      chosenIdx === null || chosenIdx === undefined ? '<span class="tag grey">no answer</span>' : '<span class="tag bad">wrong</span>')
  }));
  options.forEach((o, i) => {
    const cls = i === correctIdx ? 'opt correct' : (i === chosenIdx ? 'opt wrong' : 'opt');
    const d = el('div', { class: cls });
    d.appendChild(el('span', { class: 'optk', text: 'ABCDE'[i] }));
    d.appendChild(el('span', { text: o }));
    if (i === chosenIdx && i !== correctIdx) d.appendChild(el('span', { class: 'tiny', style: 'margin-left:auto;color:var(--bad)', text: 'your answer' }));
    if (i === correctIdx) d.appendChild(el('span', { class: 'tiny', style: 'margin-left:auto;color:var(--ok)', text: 'correct' }));
    box.appendChild(d);
  });
  if (why) box.appendChild(el('div', { class: 'small muted', style: 'margin-top:6px', html: '<strong>Why:</strong> ' + esc(why) }));
  return box;
}

/* ---------------- 50.9 SETTINGS ---------------- */
function renderSettings() {
  const s = DB.settings();
  const wrap = el('div', { class: 'wrap' });

  const c = el('div', { class: 'card' });
  c.innerHTML = '<h1>Settings</h1>';

  c.appendChild(el('label', { class: 'fl', text: 'Provider' }));
  const prov = el('select');
  [['browser', 'In-browser model — no key, no account, no cost'],
   ['anthropic', 'Anthropic (Claude) — key required'],
   ['openai', 'OpenAI-compatible (OpenAI, Groq, OpenRouter, local, your proxy)']]
    .forEach(([v, l]) => prov.appendChild(el('option', { value: v, text: l })));
  prov.value = s.provider || 'anthropic';
  c.appendChild(prov);

  /* ---- in-browser model panel ---- */
  const bWrap = el('div', { style: 'margin-top:14px' });
  if (!BrowserLLM.supported()) {
    bWrap.appendChild(el('div', {
      class: 'flagline bad',
      html: 'This browser has no <strong>WebGPU</strong>, which the in-browser model needs. ' +
        'Use Chrome or Edge (or Safari 18+). Everything else in the app still works.'
    }));
  } else {
    bWrap.appendChild(el('div', {
      class: 'flagline ok',
      html: 'The model runs <strong>on this machine\'s GPU</strong>. No key, no account, no billing, and nothing you write is sent anywhere. ' +
        'The weights download once (over the internet), then the browser caches them — after that it works offline too.'
    }));
    bWrap.appendChild(el('label', { class: 'fl', text: 'Model' }));
    const bSel = el('select');
    BrowserLLM.MODELS.forEach(m => bSel.appendChild(el('option', { value: m.id, text: m.label + '  ·  ' + m.size })));
    bSel.value = s.browserModel || BrowserLLM.MODELS[1].id;
    bWrap.appendChild(bSel);

    const status = el('div', { class: 'small', style: 'margin-top:10px' });
    const prog = el('div', { class: 'bar', style: 'margin-top:8px;display:none' });
    prog.innerHTML = '<i style="width:0%"></i>';
    const loadBtn = el('button', { class: 'btn', style: 'margin-top:10px' });

    const paintStatus = () => {
      if (BrowserLLM.ready) {
        status.innerHTML = '<span class="tag ok">Loaded</span> ' + esc(BrowserLLM.modelId) + ' — ready to generate and mark.';
        loadBtn.textContent = 'Load a different model';
      } else if (BrowserLLM.loading) {
        status.innerHTML = '<span class="tag warn">Loading…</span>';
        loadBtn.textContent = 'Loading…';
      } else {
        status.innerHTML = '<span class="tag grey">Not loaded</span> — the app uses the built-in bank until you load a model.' +
          (BrowserLLM.lastError ? ' <span style="color:var(--bad)">Last error: ' + esc(BrowserLLM.lastError) + '</span>' : '');
        loadBtn.textContent = 'Download and load model';
      }
      loadBtn.disabled = BrowserLLM.loading;
    };
    loadBtn.onclick = async () => {
      const id = bSel.value;
      DB.saveSettings(Object.assign(DB.settings(), { provider: 'browser', browserModel: id }));
      prog.style.display = '';
      paintStatus();
      try {
        await BrowserLLM.load(id, (p, text) => {
          prog.querySelector('i').style.width = Math.round((p || 0) * 100) + '%';
          status.innerHTML = '<span class="tag warn">Loading…</span> <span class="tiny muted">' + esc(String(text).slice(0, 120)) + '</span>';
        });
        prog.querySelector('i').style.width = '100%';
        toast('Model loaded. Item generation and rating are now on, with no key.', 'ok');
      } catch (e) {
        toast('Could not load the model: ' + e.message, 'bad');
      }
      prog.style.display = 'none';
      paintStatus();
      renderNav();
    };
    bWrap.appendChild(status);
    bWrap.appendChild(prog);
    bWrap.appendChild(loadBtn);
    bWrap.appendChild(el('p', {
      class: 'tiny muted', style: 'margin-top:8px',
      html: 'First load downloads the weights and takes a few minutes on a normal connection. ' +
        'A small model is reliable at <strong>marking</strong> your writing and speaking, but often fails the strict format needed to ' +
        '<strong>generate</strong> a full Reading passage — when that happens the app quietly uses its built-in bank instead and tells you why. ' +
        'The 7B model is much better at generation if your machine can carry it.'
    }));
    paintStatus();
  }
  c.appendChild(bWrap);

  c.appendChild(el('label', { class: 'fl', style: 'margin-top:14px', text: 'API key' }));
  const key = el('input', { type: 'password', value: s.apiKey, placeholder: 'sk-…' });
  c.appendChild(key);
  const keyNote = el('p', { class: 'tiny muted', style: 'margin-top:6px' });
  c.appendChild(keyNote);

  c.appendChild(el('label', { class: 'fl', style: 'margin-top:14px', text: 'Model' }));
  const model = el('input', { type: 'text', value: s.model || 'claude-sonnet-4-6' });
  c.appendChild(model);
  const modelNote = el('p', { class: 'tiny muted', style: 'margin-top:6px' });
  c.appendChild(modelNote);

  const baseWrap = el('div');
  baseWrap.appendChild(el('label', { class: 'fl', style: 'margin-top:14px', text: 'Base URL' }));
  const baseUrl = el('input', { type: 'text', value: s.baseUrl || 'https://api.openai.com/v1', placeholder: 'https://api.openai.com/v1' });
  baseWrap.appendChild(baseUrl);
  baseWrap.appendChild(el('p', {
    class: 'tiny muted', style: 'margin-top:6px',
    html: 'Anything speaking the OpenAI <code>/chat/completions</code> shape. Pick a preset:'
  }));

  const PRESETS = [
    {
      name: 'Ollama (local, free, no key)', url: 'http://localhost:11434/v1', model: 'llama3.1:8b', free: true,
      note: 'Free and private — the model runs on this Mac, nothing leaves it, no key and no billing. ' +
        'Install from ollama.com, then run <code>ollama pull llama3.1:8b</code>. ' +
        'You must also let the browser talk to it: run <code>launchctl setenv OLLAMA_ORIGINS "*"</code> and restart Ollama, ' +
        'otherwise every request is blocked by CORS. Bigger models follow the strict JSON format far better — ' +
        'if generation keeps falling back to the offline bank, try <code>qwen2.5:14b</code> or a 70B model.'
    },
    {
      name: 'LM Studio (local, free, no key)', url: 'http://localhost:1234/v1', model: 'local-model', free: true,
      note: 'Free and private. In LM Studio: load a model, open the Developer/Server tab, start the server, ' +
        'and turn ON "Enable CORS". Leave the model name as whatever LM Studio shows.'
    },
    {
      name: 'Groq (free tier, key needed)', url: 'https://api.groq.com/openai/v1', model: 'llama-3.3-70b-versatile',
      note: 'Free tier with no credit card at console.groq.com. Fast, and the 70B model handles the JSON format well. Rate limited per minute.'
    },
    {
      name: 'OpenRouter (free models, key needed)', url: 'https://openrouter.ai/api/v1', model: 'meta-llama/llama-3.3-70b-instruct:free',
      note: 'Sign up at openrouter.ai for a key. Any model id ending in <code>:free</code> costs nothing. Free models are heavily rate limited.'
    },
    { name: 'OpenAI (paid)', url: 'https://api.openai.com/v1', model: 'gpt-4o', note: 'Key from platform.openai.com/api-keys. Requires credit on the account.' }
  ];
  const presetRow = el('div', { class: 'row', style: 'margin-top:8px' });
  const presetNote = el('div', { class: 'tiny muted', style: 'margin-top:8px' });
  PRESETS.forEach(p => {
    const b = el('button', { class: 'btn ghost sm', text: (p.free ? '● ' : '') + p.name });
    if (p.free) b.style.borderColor = 'var(--ok)';
    b.onclick = () => {
      baseUrl.value = p.url;
      model.value = p.model;
      presetNote.innerHTML = '<strong>' + esc(p.name) + '</strong><br>' + p.note;
      if (p.free) key.value = '';
    };
    presetRow.appendChild(b);
  });
  baseWrap.appendChild(presetRow);
  baseWrap.appendChild(presetNote);
  baseWrap.appendChild(el('p', {
    class: 'tiny muted', style: 'margin-top:8px',
    html: '<strong>●</strong> = runs entirely on your own machine: no key, no account, no cost, nothing sent anywhere.'
  }));
  c.appendChild(baseWrap);

  /* Endpoints that hold the key server-side (your own proxy) need no key here. */
  const nkWrap = el('div');
  const nk = el('label', { class: 'chk' + (s.noKeyNeeded ? ' on' : '') });
  const nki = el('input', { type: 'checkbox' }); nki.checked = !!s.noKeyNeeded;
  nki.onchange = () => nk.classList.toggle('on', nki.checked);
  nk.appendChild(nki);
  nk.appendChild(el('span', { text: 'This endpoint needs no key from the browser (a local server, or your own proxy that keeps the key server-side)' }));
  nkWrap.appendChild(nk);
  c.appendChild(nkWrap);

  const syncProvider = () => {
    const isBrowser = prov.value === 'browser';
    const isOA = prov.value === 'openai';
    bWrap.style.display = isBrowser ? '' : 'none';
    nkWrap.style.display = isOA ? '' : 'none';
    key.parentElement === c && (key.previousElementSibling.style.display = isBrowser ? 'none' : '');
    key.style.display = isBrowser ? 'none' : '';
    keyNote.style.display = isBrowser ? 'none' : '';
    model.style.display = isBrowser ? 'none' : '';
    modelNote.style.display = isBrowser ? 'none' : '';
    if (model.previousElementSibling) model.previousElementSibling.style.display = isBrowser ? 'none' : '';
    baseWrap.style.display = isOA ? '' : 'none';
    if (isBrowser) return;
    key.placeholder = isOA ? 'sk-…' : 'sk-ant-…';
    keyNote.innerHTML = 'Stored in this browser\'s localStorage under <code>celpip_settings</code> and sent only to ' +
      (isOA ? 'the base URL below' : '<code>api.anthropic.com</code>') + '. ' +
      'Anyone with access to this browser profile can read it — use a key you can rotate. ' +
      'Without a key the app runs entirely offline on the built-in bank of 20+ items per module.';
    modelNote.innerHTML = isOA
      ? 'For example <code>gpt-4o</code>, <code>gpt-4o-mini</code>, or the exact model id your gateway expects.'
      : 'For example <code>claude-sonnet-4-6</code>.';
    if (isOA && /^claude/.test(model.value)) model.value = 'gpt-4o';
    if (!isOA && /^gpt|^o\d/.test(model.value)) model.value = 'claude-sonnet-4-6';
  };
  prov.onchange = syncProvider;
  syncProvider();

  c.appendChild(el('label', { class: 'fl', style: 'margin-top:14px', text: 'max_tokens per request' }));
  const mt = el('input', { type: 'number', value: s.maxTokens || 1000, min: '400', max: '8000' });
  c.appendChild(mt);
  c.appendChild(el('p', { class: 'tiny muted', text: '1000 is the specified default. Raise it if generated Part 5 discussions or Part 4 articles come back truncated (the app falls back to the offline bank when that happens).' }));

  const useApi = el('label', { class: 'chk' + (s.useApi !== false ? ' on' : ''), style: 'margin-top:14px' });
  const ua = el('input', { type: 'checkbox' }); ua.checked = s.useApi !== false;
  ua.onchange = () => useApi.classList.toggle('on', ua.checked);
  useApi.appendChild(ua); useApi.appendChild(el('span', { text: 'Use the API to generate fresh items and to mark Writing/Speaking (uncheck to force offline mode for a session)' }));
  c.appendChild(useApi);

  const pa = el('label', { class: 'chk' + (s.persistAudio ? ' on' : '') });
  const pai = el('input', { type: 'checkbox' }); pai.checked = !!s.persistAudio;
  pai.onchange = () => pa.classList.toggle('on', pai.checked);
  pa.appendChild(pai); pa.appendChild(el('span', { text: 'Persist speaking audio in localStorage (short clips only; may hit the browser storage quota)' }));
  c.appendChild(pa);

  const save = el('button', { class: 'btn', style: 'margin-top:14px', text: 'Save settings' });
  save.onclick = () => {
    DB.saveSettings(Object.assign(DB.settings(), {
      apiKey: key.value.trim(), provider: prov.value,
      model: model.value.trim() || (prov.value === 'openai' ? 'gpt-4o' : 'claude-sonnet-4-6'),
      baseUrl: baseUrl.value.trim() || 'https://api.openai.com/v1',
      noKeyNeeded: nki.checked,
      maxTokens: Math.max(400, Math.min(8000, parseInt(mt.value, 10) || 1000)),
      useApi: ua.checked, persistAudio: pai.checked
    }));
    renderNav();
    toast('Settings saved.', 'ok');
  };
  c.appendChild(save);

  const test = el('button', { class: 'btn ghost', style: 'margin-top:14px;margin-left:8px', text: 'Test the connection' });
  test.onclick = async () => {
    if (prov.value === 'browser') {
      if (!BrowserLLM.ready) return toast('Load the in-browser model first.', 'bad');
      try { const o = await API.call('Reply with the single word OK.', 'Say OK.', 16); return toast('Working. Model replied: ' + o.trim().slice(0, 40), 'ok'); }
      catch (e) { return toast('Failed: ' + e.message, 'bad'); }
    }
    if (!key.value.trim() && !nki.checked && !/^https?:\/\/(localhost|127\.0\.0\.1)/i.test(baseUrl.value)) return toast('Enter a key first.', 'bad');
    DB.saveSettings(Object.assign(DB.settings(), {
      apiKey: key.value.trim(), provider: prov.value,
      model: model.value.trim() || (prov.value === 'openai' ? 'gpt-4o' : 'claude-sonnet-4-6'),
      baseUrl: baseUrl.value.trim() || 'https://api.openai.com/v1'
    }));
    test.disabled = true; test.textContent = 'Testing…';
    try {
      const out = await API.call('Reply with the single word OK.', 'Say OK.', 16);
      toast('Key works. Model replied: ' + out.trim().slice(0, 40), 'ok');
    } catch (e) {
      toast('Failed: ' + e.message, 'bad');
    }
    test.disabled = false; test.textContent = 'Test the key';
  };
  c.appendChild(test);
  wrap.appendChild(c);

  // ---- data ----
  const d = el('div', { class: 'card' });
  d.innerHTML = '<h3>Your data</h3><p class="small muted">' + DB.attempts().length + ' attempts and ' + DB.errors().length +
    ' logged errors. Export before clearing your browser data — there is no server copy.</p>';
  const row = el('div', { class: 'row' });

  const exp = el('button', { class: 'btn', text: 'Export JSON' });
  exp.onclick = () => {
    const payload = {
      _format: 'celpip-trainer-v1', exportedAt: new Date().toISOString(),
      settings: Object.assign({}, DB.settings(), { apiKey: '' }), // never export the key
      attempts: DB.attempts(), errors: DB.errors(), seen: DB.seen()
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = el('a', { href: url, download: 'celpip-history-' + new Date().toISOString().slice(0, 10) + '.json' });
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 2000);
    toast('Exported. Your API key is deliberately not included.', 'ok');
  };
  row.appendChild(exp);

  const impBtn = el('button', { class: 'btn ghost', text: 'Import JSON' });
  const file = el('input', { type: 'file', accept: 'application/json', style: 'display:none' });
  file.onchange = () => {
    const f = file.files[0];
    if (!f) return;
    const fr = new FileReader();
    fr.onload = async () => {
      try {
        const data = JSON.parse(fr.result);
        if (!data.attempts) throw new Error('not a CELPIP Trainer export');
        const mode = await modal({
          title: 'Import ' + data.attempts.length + ' attempts?',
          html: '<p>Merge keeps what you have and adds anything new. Replace discards your current history.</p>',
          buttons: [{ label: 'Cancel', value: null, class: 'ghost' }, { label: 'Merge', value: 'merge' }, { label: 'Replace', value: 'replace', class: 'danger' }]
        });
        if (!mode) return;
        if (mode === 'replace') {
          DB.set(K.attempts, data.attempts); DB.saveErrors(data.errors || []); DB.set(K.seen, data.seen || {});
        } else {
          const have = new Set(DB.attempts().map(a => a.id));
          const merged = DB.attempts().concat((data.attempts || []).filter(a => !have.has(a.id)));
          merged.sort((a, b) => b.ts - a.ts);
          DB.set(K.attempts, merged);
          logErrors((data.errors || []).flatMap(e => Array(Math.max(1, e.count)).fill({ type: e.type, mine: e.mine, correct: e.correct })));
        }
        toast('Imported.', 'ok');
        go('dashboard');
      } catch (e) { toast('Import failed: ' + e.message, 'bad'); }
    };
    fr.readAsText(f);
  };
  impBtn.onclick = () => file.click();
  row.appendChild(impBtn); row.appendChild(file);

  const clr = el('button', { class: 'btn danger', text: 'Clear all data' });
  clr.onclick = async () => {
    const ok = await modal({
      title: 'Delete everything?',
      body: 'All attempts, feedback and the error log will be removed from this browser. Export first if you might want them.',
      buttons: [{ label: 'Cancel', value: false, class: 'ghost' }, { label: 'Delete permanently', value: true, class: 'danger' }]
    });
    if (!ok) return;
    [K.attempts, K.errors, K.seen, K.audio].forEach(k => localStorage.removeItem(k));
    toast('Cleared.', 'ok');
    go('dashboard');
  };
  row.appendChild(clr);
  d.appendChild(row);
  wrap.appendChild(d);

  // ---- diagnostics ----
  const dg = el('div', { class: 'card' });
  dg.innerHTML = '<h3>Diagnostics</h3><p class="small muted">Run this in whatever browser or profile is giving you trouble. ' +
    'It reports what works here and what does not, and why.</p>';
  const dgOut = el('div');
  const dgBtn = el('button', { class: 'btn', text: 'Run diagnostics' });
  dgBtn.onclick = async () => {
    dgBtn.disabled = true; dgBtn.textContent = 'Running…';
    dgOut.innerHTML = '';
    const rows = [];
    const add = (name, ok, detail, fix) => rows.push({ name, ok, detail, fix });

    // where are we running
    const proto = location.protocol;
    add('Page origin', proto === 'http:' || proto === 'https:', proto + '//' + (location.host || '(none)'),
      'Opened from a file:// path. The microphone and the Anthropic API will both be blocked. Serve the file over http://localhost instead.');
    add('Secure context', !!window.isSecureContext, String(!!window.isSecureContext),
      'Browsers only allow microphone capture on https:// or http://localhost.');

    // storage
    let storeOK = false, keyCount = 0;
    try { localStorage.setItem('celpip_probe', '1'); localStorage.removeItem('celpip_probe'); storeOK = true; } catch (e) { }
    keyCount = Object.keys(localStorage).filter(k => k.indexOf('celpip_') === 0).length;
    add('localStorage writable', storeOK, storeOK ? keyCount + ' celpip_ keys in this profile' : 'blocked',
      'Private/incognito windows and "block third-party cookies" can disable storage. Your history cannot be saved without it.');
    // Not a fault — but the usual reason a second Chrome profile "looks broken".
    rows.push({
      name: 'History in this profile', ok: true, info: keyCount === 0,
      detail: keyCount > 0 ? 'present' : 'empty — fresh profile, normal on first use',
      fix: 'localStorage is per browser profile AND per address. A different Google/Chrome profile, or the same file opened at a different URL, starts empty. Re-paste your API key there, and carry your history over with Export JSON here → Import JSON there.'
    });

    // item bank
    const bankOK = typeof BANK_LISTENING !== 'undefined' && BANK_LISTENING.length >= 20;
    add('Offline item bank', bankOK,
      bankOK ? BANK_LISTENING.length + ' listening, ' + BANK_READING.length + ' reading, ' + BANK_WRITING.length + ' writing, ' + BANK_SPEAKING.length + ' speaking' : 'not loaded',
      'The single HTML file did not load fully. Re-download celpip-trainer.html.');

    // audio out
    TTS.load();
    add('Listening audio (speech synthesis)', TTS.voices.length > 0, TTS.voices.length + ' usable English voices',
      'No voices found. Chrome loads them a second after the page opens — reload. On Linux, install a speech-dispatcher voice package.');

    // audio in
    add('MediaRecorder API', typeof window.MediaRecorder !== 'undefined', typeof window.MediaRecorder !== 'undefined' ? 'available' : 'missing',
      'Your browser cannot record audio. Use Chrome, Edge or Safari.');
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    add('Speech recognition (live transcript)', !!SR, SR ? 'available' : 'missing',
      'Only Chrome, Edge and Safari support this. Firefox does not — Speaking will record audio but produce no transcript, so it cannot be scored.');

    let micState = 'unknown';
    try { micState = (await navigator.permissions.query({ name: 'microphone' })).state; } catch (e) { }
    add('Microphone permission', micState === 'granted' || micState === 'prompt', micState,
      'Denied. Click the padlock/camera icon in the address bar and allow the microphone, then reload.');

    // API
    add('WebGPU (needed for the in-browser model)', BrowserLLM.supported(), BrowserLLM.supported() ? 'available' : 'missing',
      'Only Chrome, Edge and Safari 18+ expose WebGPU. Without it, use a key-based provider or stay on the offline bank.');

    const label = API.providerName() + ' (' + (DB.settings().provider === 'browser' ? (BrowserLLM.modelId || 'none loaded') : (DB.settings().model || '?')) + ')';
    if (DB.settings().provider === 'browser') {
      if (!BrowserLLM.ready) {
        add(label, false, 'model not loaded',
          'Go to Settings → Provider → In-browser model → "Download and load model". It is a one-time download.');
      } else {
        try {
          const t0 = Date.now();
          await API.call('Reply with the single word OK.', 'Say OK.', 16);
          add(label, true, 'generating locally, ' + (Date.now() - t0) + ' ms', '');
        } catch (e) { add(label, false, e.message, 'Reload the page and load the model again.'); }
      }
    } else if (API.isLocal() || DB.settings().noKeyNeeded) {
      try {
        const t0 = Date.now();
        await API.call('Reply with the single word OK.', 'Say OK.', 16);
        add(label + ' — no key in browser', true, 'reachable, ' + (Date.now() - t0) + ' ms', '');
      } catch (e) {
        add(label + ' — no key in browser', false, e.message,
          'Is the server running and reachable? If it is, this is almost always CORS. Ollama: run ' +
          'launchctl setenv OLLAMA_ORIGINS "*" and restart it. LM Studio: turn on "Enable CORS". A proxy must return Access-Control-Allow-Origin.');
      }
    } else if (!DB.settings().apiKey.trim()) {
      add(label, false, 'no key saved in this profile',
        'Paste your key above and press Save. Without it the app still runs on the offline bank, but there is no item generation and no rubric rating.');
    } else {
      try {
        const t0 = Date.now();
        await API.call('Reply with the single word OK.', 'Say OK.', 16);
        add(label, true, 'reachable, ' + (Date.now() - t0) + ' ms', '');
      } catch (e) {
        add(label, false, e.message,
          proto === 'file:'
            ? 'Requests from a file:// page send Origin: null and are rejected. Serve over http://localhost.'
            : 'Check the key is valid and has credit. A 401 means a bad key; a 429 means rate limited; "Failed to fetch" usually means a network block or an extension.');
      }
    }

    const t = el('table');
    t.innerHTML = '<thead><tr><th>Check</th><th>Result</th><th>What it means</th></tr></thead>';
    const tb = el('tbody');
    rows.forEach(r => {
      const tr = el('tr');
      const tag = r.info ? '<span class="tag grey">NOTE</span>' : r.ok ? '<span class="tag ok">OK</span>' : '<span class="tag bad">PROBLEM</span>';
      tr.innerHTML = '<td>' + esc(r.name) + '</td>' +
        '<td>' + tag + ' <span class="tiny muted">' + esc(r.detail) + '</span></td>' +
        '<td class="small">' + (r.ok && !r.info ? '<span class="muted">—</span>' : esc(r.fix)) + '</td>';
      tb.appendChild(tr);
    });
    t.appendChild(tb);
    dgOut.appendChild(t);

    const report = 'CELPIP Trainer diagnostics\n' + new Date().toISOString() + '\n' + navigator.userAgent + '\n\n' +
      rows.map(r => (r.info ? '[NOTE]    ' : r.ok ? '[OK]      ' : '[PROBLEM] ') + r.name + ' — ' + r.detail +
        (r.ok && !r.info ? '' : '\n          ' + (r.info ? 'NOTE: ' : 'FIX: ') + r.fix)).join('\n');
    const copy = el('button', { class: 'btn ghost sm', style: 'margin-top:10px', text: 'Copy report' });
    copy.onclick = () => {
      navigator.clipboard.writeText(report).then(() => toast('Report copied.', 'ok'), () => toast('Could not copy — select the text below instead.', 'bad'));
    };
    dgOut.appendChild(copy);
    const pre = el('textarea', { rows: 8, style: 'margin-top:10px;font-family:ui-monospace,monospace;font-size:12px' });
    pre.value = report;
    dgOut.appendChild(pre);

    dgBtn.disabled = false; dgBtn.textContent = 'Run diagnostics again';
  };
  dg.appendChild(dgBtn);
  dg.appendChild(dgOut);
  wrap.appendChild(dg);

  // ---- voices ----
  const v = el('div', { class: 'card' });
  TTS.load();
  v.innerHTML = '<h3>Listening voices</h3><p class="small muted">' +
    (TTS.voices.length ? TTS.voices.length + ' English voices available. Each speaker in a passage is given a different voice, and a rate between 0.95 and 1.05.' :
      'No speech-synthesis voices detected yet. Chrome and Edge load them a moment after the page opens — reload if this stays empty. Safari and Firefox on macOS use the system voices.') + '</p>';
  if (TTS.voices.length) {
    const row2 = el('div', { class: 'row' });
    TTS.voices.slice(0, 14).forEach(x => row2.appendChild(el('span', { class: 'pill', text: x.name + ' · ' + x.lang })));
    v.appendChild(row2);
    const t = el('button', { class: 'btn ghost sm', style: 'margin-top:10px', text: 'Test audio' });
    t.onclick = () => {
      const map = TTS.assign(['A', 'B']);
      TTS.speakSequence([
        { speaker: 'A', text: 'This is the first speaker. The audio in a real test plays only once.' },
        { speaker: 'B', text: 'And this is the second speaker, with a different voice and a slightly different rate.' }
      ], map, null, null);
    };
    v.appendChild(t);
  }
  wrap.appendChild(v);
  setScreen(wrap);
}

/* ---------------- 50.10 boot ---------------- */
window.addEventListener('beforeunload', e => {
  if (APP.examMode) { e.preventDefault(); e.returnValue = ''; }
});
renderNav();
go('dashboard');
