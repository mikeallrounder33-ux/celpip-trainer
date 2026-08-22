/* ============================================================
   PART 41 — WRITING RUNNER
   Includes: live word count, no spellcheck, time-use tracker gate,
             forced 90-second proofread gate, template detector,
             register checker, rubric-mapped rating.
   ============================================================ */

const WRITING_TIME = { 1: 27 * 60, 2: 26 * 60 };

const Writing = {
  async start(cfg) {
    // cfg: {mode, tasks:[1] | [1,2]}
    APP.examMode = true; renderNav();
    const loading = el('div', { class: 'wrap' });
    loading.innerHTML = '<div class="card"><h2>Preparing Writing…</h2></div>';
    setScreen(loading);
    const items = [];
    for (const t of cfg.tasks) {
      const r = await getItem('writing', t);
      if (!r.item) continue;
      r.item._source = r.source;
      items.push(r.item);
    }
    if (!items.length) { APP.examMode = false; toast('No writing prompt available', 'bad'); go('dashboard'); return; }
    this.s = { cfg, items, idx: 0, results: [] };
    this.openTask();
  },

  openTask() {
    const s = this.s;
    const item = s.items[s.idx];
    s.text = '';
    s.warned = false;
    s.allotted = s.cfg.untimed ? 3 * 3600 : WRITING_TIME[item.task];
    s.timer = new Timer(s.allotted, null, () => this.hardStop());
    if (s.cfg.untimed) s.timer.untimed = true;
    s.timer.start();
    this.render();
  },

  render() {
    const s = this.s;
    const item = s.items[s.idx];
    const wrap = el('div');
    wrap.appendChild(examChrome(
      'Writing — Task ' + item.task + ': ' + (item.task === 1 ? 'Writing an Email' : 'Responding to Survey Questions'),
      (s.cfg.untimed ? 'Untimed practice' : (item.task === 1 ? '27 minutes' : '26 minutes')) + '  ·  150–200 words',
      s.timer));
    const body = el('div', { class: 'wrap wide' });
    wrap.appendChild(body);

    const grid = el('div', { class: 'grid g2' });
    const left = el('div'), right = el('div');
    grid.appendChild(left); grid.appendChild(right);
    body.appendChild(grid);

    // ---- prompt ----
    const p = el('div', { class: 'card' });
    if (item.task === 1) {
      p.innerHTML = '<h3>Read the following scenario</h3><p>' + esc(item.scenario) + '</p>' +
        '<p><strong>' + esc(item.instruction || 'Write an email. Your email should be about 150–200 words.') + '</strong></p>' +
        '<p class="small muted">Writing to: <strong>' + esc(item.recipient) + '</strong>' +
        (item.recipientGenderKnown === false ? ' — the recipient\'s gender is not stated, so use a role-based salutation.' : '') + '</p>' +
        '<p class="small"><strong>Your email must address all three of the following:</strong></p>' +
        '<ul class="bullets">' + item.bullets.map(b => '<li>' + esc(b) + '</li>').join('') + '</ul>';
    } else {
      p.innerHTML = '<h3>Read the following survey question</h3><p>' + esc(item.scenario) + '</p>' +
        '<p><strong>' + esc(item.question || 'Which option do you support, and why?') + '</strong></p>' +
        '<div class="card tight" style="background:var(--soft);border-color:#c9d8f4"><strong>' + esc(item.optionA.label) + '</strong><div class="small">' + esc(item.optionA.desc) + '</div></div>' +
        '<div class="card tight" style="background:var(--soft);border-color:#c9d8f4;margin-bottom:0"><strong>' + esc(item.optionB.label) + '</strong><div class="small">' + esc(item.optionB.desc) + '</div></div>' +
        '<p class="small muted" style="margin-top:10px">Choose <strong>one</strong> option and defend it. Write about 150–200 words.</p>';
    }
    left.appendChild(p);

    // ---- editor ----
    const ed = el('div', { class: 'card' });
    ed.innerHTML = '<div class="row" style="justify-content:space-between"><h3 style="margin:0">Your response</h3>' +
      '<div class="tiny muted">Spellcheck and autocorrect are off, as on the real test.</div></div>';
    const ta = el('textarea', {
      rows: 18, spellcheck: 'false', autocorrect: 'off', autocapitalize: 'off', autocomplete: 'off',
      style: 'margin-top:10px;font-size:15px;line-height:1.6;min-height:380px',
      placeholder: item.task === 1 ? 'Dear …' : 'Start with the option you have chosen.'
    });
    ta.value = s.text || '';
    const meter = el('div', { class: 'row', style: 'justify-content:space-between;margin-top:8px' });
    const wc = el('div', { class: 'wc', text: '0 words' });
    const hint = el('div', { class: 'tiny muted', text: 'Target 150–200 words' });
    meter.appendChild(wc); meter.appendChild(hint);
    const update = () => {
      s.text = ta.value;
      const n = words(ta.value);
      wc.textContent = n + ' words';
      wc.className = 'wc ' + (n >= 150 && n <= 200 ? 'ok' : n > 210 || (n < 140 && n > 0) ? 'bad' : '');
    };
    ta.addEventListener('input', update);
    ed.appendChild(ta); ed.appendChild(meter);

    const sub = el('button', { class: 'btn lg', style: 'margin-top:12px', text: 'Submit Task ' + item.task });
    sub.onclick = () => this.trySubmit();
    ed.appendChild(sub);
    right.appendChild(ed);

    setScreen(wrap);
    update();
    ta.focus();
  },

  hardStop() {
    // time expired — go straight to grading, no proofread gate
    const s = this.s;
    s.timer.stop();
    this.grade(100, true);
  },

  /* ---- FEATURE 1: time-use tracker gate ---- */
  async trySubmit() {
    const s = this.s;
    const leftPct = 100 - s.timer.usedPct();
    if (!s.cfg.untimed && leftPct > 20 && !s.warned) {
      s.warned = true;
      await modal({
        title: 'You have ' + fmtTime(s.timer.left) + ' left',
        html: '<p style="font-size:16px">You have <strong>' + fmtTime(s.timer.left) + '</strong> remaining — that is ' +
          Math.round(leftPct) + '% of your time for this task.</p>' +
          '<p style="font-size:16px"><strong>Read your answer aloud in your head and fix three things first.</strong></p>' +
          '<p class="small muted">Submitting early is the single most reliable way to lose a band you had already earned. ' +
          'Click Submit again when you have actually made three changes.</p>',
        buttons: [{ label: 'Go back and fix three things', value: 'back' }]
      });
      return;
    }
    s.timer.stop();
    s.usedPct = Math.min(100, Math.round(s.timer.usedPct()));
    this.proofreadGate();
  },

  /* ---- FEATURE 2: forced proofread gate ---- */
  proofreadGate() {
    const s = this.s;
    const item = s.items[s.idx];
    const checks = [
      'Capital letters and periods on every sentence',
      'Subject–verb agreement (he has / they have)',
      'their / there / they\'re and other homophones',
      item.task === 1 ? 'All 3 bullet points are covered' : 'One option chosen explicitly, and the trade-off addressed'
    ];
    const ticked = [false, false, false, false];
    const gateTimer = new Timer(90, null, () => { toast('Proofread time is up — submitting.', 'bad'); this.grade(s.usedPct, false); });

    const wrap = el('div');
    const bar = el('div', { class: 'exambar' });
    bar.innerHTML = '<div><div style="font-weight:700">Proofread — Task ' + item.task + '</div>' +
      '<div class="tiny muted">90 seconds. You cannot submit until all four boxes are ticked.</div></div>' +
      '<div style="flex:1"><div class="bar"><i style="width:100%"></i></div></div><div class="clock">1:30</div>';
    bindClock(bar, gateTimer);
    wrap.appendChild(bar);

    const body = el('div', { class: 'wrap wide' });
    wrap.appendChild(body);
    const grid = el('div', { class: 'grid g2' });
    const left = el('div'), right = el('div');
    grid.appendChild(left); grid.appendChild(right);
    body.appendChild(grid);

    const tp = detectTemplates(s.text);
    const reg = item.task === 1 ? checkRegister(s.text, item) : { flags: [] };

    const txt = el('div', { class: 'card' });
    txt.innerHTML = '<h3>Your text (' + words(s.text) + ' words)</h3>' +
      '<div class="passage" style="max-height:520px;overflow:auto">' + highlightTemplates(s.text) + '</div>' +
      '<p class="tiny muted" style="margin-top:8px">Highlighted spans are memorised scaffold phrases the marker will discount.</p>';
    left.appendChild(txt);

    const cl = el('div', { class: 'card' });
    cl.innerHTML = '<h3>Before you submit</h3><p class="small muted">Tick each one only after you have actually checked it.</p>';
    const subBtn = el('button', { class: 'btn lg', style: 'margin-top:10px', text: 'Submit for marking' });
    subBtn.disabled = true;
    checks.forEach((c, i) => {
      const lab = el('label', { class: 'chk' });
      const inp = el('input', { type: 'checkbox' });
      inp.onchange = () => {
        ticked[i] = inp.checked;
        lab.classList.toggle('on', inp.checked);
        subBtn.disabled = !ticked.every(Boolean);
      };
      lab.appendChild(inp);
      lab.appendChild(el('span', { text: c }));
      cl.appendChild(lab);
    });
    if (tp.total) {
      cl.appendChild(el('div', {
        class: 'flagline', html: '<strong>' + tp.total + ' template phrase' + (tp.total > 1 ? 's' : '') + ' detected</strong> (' +
          tp.density + ' per 100 words). ' + (tp.density >= 1.5 ? 'This density will cap your Vocabulary score at CLB 7.' : 'Consider replacing them.')
      }));
    }
    reg.flags.forEach(f => cl.appendChild(el('div', { class: 'flagline ' + (f.level === 'bad' ? 'bad' : ''), text: f.msg })));
    cl.appendChild(subBtn);
    subBtn.onclick = () => { gateTimer.stop(); this.grade(s.usedPct, false); };
    right.appendChild(cl);

    setScreen(wrap);
    gateTimer.start();
  },

  async grade(usedPct, timedOut) {
    const s = this.s;
    const item = s.items[s.idx];
    APP.examMode = false; renderNav();
    const wait = el('div', { class: 'wrap' });
    wait.innerHTML = '<div class="card"><h2>Marking…</h2><p class="muted">' +
      (API.available() ? 'Sending your response to the rater.' : 'Using the offline rater — add an API key in Settings for full rubric feedback and a rewritten sample.') +
      '</p></div>';
    setScreen(wait);

    const res = await rateResponse('writing', item, s.text, usedPct, null);
    const tp = detectTemplates(s.text);

    wait.innerHTML = '<div class="card"><h2>Preparing your reference answer…</h2></div>';
    const corrected = buildCorrected(s.text, res.rating.errors || [], tp);
    const reference = await getReference(item, 'writing');
    const reg = item.task === 1 ? checkRegister(s.text, item) : { want: 'n/a', flags: [], ok: true };

    // recurring error log (feature 4)
    const errs = (res.rating.errors || []).map(e => ({ type: e.type || 'other', mine: e.mine, correct: e.correct }));
    if (!reg.ok) reg.flags.filter(f => f.level === 'bad').forEach(f => errs.push({ type: 'register mismatch', mine: f.msg.slice(0, 90), correct: 'Match the salutation and tone to the recipient.' }));
    logErrors(errs);

    const attempt = {
      id: uid(), ts: Date.now(), module: 'writing', mode: s.cfg.mode, task: item.task,
      item, response: s.text, wordCount: words(s.text), corrected, reference,
      rating: res.rating, ratingSource: res.source, ratingProvider: API.providerName() + " · " + (DB.settings().provider === "browser" ? (BrowserLLM.modelId || "") : DB.settings().model), analysis: {
        templates: tp, register: reg, bulletsCovered: res.rating.bullets_covered || res.analysis.bulletsCovered
      },
      clbNum: res.rating.overall_clb, clb: 'CLB ' + res.rating.overall_clb,
      timeUsedPct: s.cfg.untimed ? null : Math.round(usedPct), allottedSec: s.allotted, usedSec: Math.round(s.allotted * usedPct / 100),
      timedOut: !!timedOut, errors: errs
    };
    DB.addAttempt(attempt);
    s.results.push(attempt);

    if (s.idx < s.items.length - 1) {
      await modal({
        title: 'Task ' + item.task + ' submitted',
        html: '<p>Estimated <strong>CLB ' + res.rating.overall_clb + '</strong> for this task. ' +
          'Task ' + s.items[s.idx + 1].task + ' begins when you click continue, and the clock starts immediately.</p>',
        buttons: [{ label: 'Continue to Task ' + s.items[s.idx + 1].task, value: 1 }]
      });
      s.idx++;
      APP.examMode = true; renderNav();
      this.openTask();
      return;
    }
    if (APP.mockQueue) { mockAdvance(attempt); return; }
    showProductiveResult(attempt);
  }
};

/* ---------------- shared result screen for Writing + Speaking ---------------- */
function dimCard(label, d, note) {
  const box = el('div', { class: 'dim' });
  const band = d && d.clb ? d.clb : 0;
  const col = band >= 9 ? 'var(--ok)' : band >= 7 ? 'var(--brand)' : band >= 5 ? 'var(--warn)' : 'var(--bad)';
  box.innerHTML = '<div class="tiny muted">' + esc(label.toUpperCase()) + '</div>' +
    '<div class="dimscore" style="color:' + col + '">CLB ' + band + '</div>' +
    '<div class="tiny muted" style="margin:6px 0 8px">' + esc(note || '') + '</div>' +
    '<div class="small"><strong>What caps it:</strong> <em>“' + esc(String((d && d.evidence) || '—')).slice(0, 300) + '”</em></div>' +
    '<div class="small" style="margin-top:6px"><strong>Fix:</strong> ' + esc((d && d.fix) || '—') + '</div>';
  return box;
}

/* Four ways to look at the same answer: what you wrote, the same thing with the
   errors repaired, the same ideas one band higher, and an independent model
   answer to the same prompt. */
function answerPanels(a, r, isW) {
  const box = el('div');
  const corr = a.corrected || { text: a.response || '', changed: false, templateSwaps: [] };
  const ref = a.reference || { text: '—', source: 'none' };

  const row1 = el('div', { class: 'grid g2' });
  const mine = el('div', { class: 'card' });
  mine.innerHTML = '<h3>1 · ' + (isW ? 'What you wrote' : 'What you said') + '</h3>' +
    '<p class="tiny muted">Highlighted spans are memorised scaffolding the marker discounts.</p>' +
    '<div class="passage">' + highlightTemplates(a.response || '') + '</div>';

  const fixed = el('div', { class: 'card' });
  fixed.innerHTML = '<h3>2 · Your answer, corrected</h3>' +
    '<p class="tiny muted">Your own words and structure, with every error found repaired. Compare it line by line against panel 1 — the differences are your habits.</p>' +
    '<div class="passage">' + esc(corr.text).replace(/\n/g, '<br>') + '</div>' +
    (corr.changed ? '' : '<div class="flagline ok" style="margin-top:8px">No mechanical errors were found to repair.</div>') +
    (corr.templateSwaps && corr.templateSwaps.length
      ? '<div class="flagline" style="margin-top:8px"><strong>Still to swap by hand:</strong><br>' +
        corr.templateSwaps.map(t => esc(t)).join('<br>') + '</div>' : '');
  row1.appendChild(mine); row1.appendChild(fixed);
  box.appendChild(row1);

  const row2 = el('div', { class: 'grid g2' });
  const up = el('div', { class: 'card' });
  up.innerHTML = '<h3>3 · Your ideas, one band higher</h3>' +
    '<p class="tiny muted">The same content, restructured and reworded as a stronger candidate would put it.</p>' +
    '<div class="passage">' + esc(r.rewritten_sample || '—').replace(/\n/g, '<br>') + '</div>';

  const refCard = el('div', { class: 'card', style: 'border-color:#8fcdb4' });
  refCard.innerHTML = '<h3>4 · Reference answer <span class="tag ok">CLB 10–11</span></h3>' +
    '<p class="tiny muted">An independent model answer to the same prompt — not based on what you wrote. ' +
    'Read it for structure and for how it makes ideas specific. ' +
    (ref.source === 'bank' ? 'Written for this item.' : ref.source === 'model' ? 'Generated for this item.' : '') + '</p>' +
    '<div class="passage">' + esc(ref.text || '—').replace(/\n/g, '<br>') + '</div>' +
    (ref.source !== 'none'
      ? '<p class="tiny muted" style="margin-top:8px">Do not memorise it. Copying a model answer is exactly what the ' +
        'template detector penalises. Take the <em>moves</em> it makes, not its sentences.</p>' : '');
  row2.appendChild(up); row2.appendChild(refCard);
  box.appendChild(row2);
  return box;
}

function showProductiveResult(a) {
  const wrap = el('div', { class: 'wrap wide' });
  const r = a.rating;
  const isW = a.module === 'writing';
  const rdKey = isW ? 'readability' : 'listenability';
  const D = r.dimensions || {};

  const head = el('div', { class: 'card' });
  head.innerHTML = '<h1>' + (isW ? 'Writing' : 'Speaking') + ' Task ' + a.task + ' — result</h1>' +
    '<div class="row" style="gap:30px;align-items:flex-end">' +
    '<div><div class="tiny muted">OVERALL (LOWEST-ANCHORED)</div><div style="font-size:44px;font-weight:750;line-height:1">CLB ' + (r.overall_clb || 0) + '</div></div>' +
    '<div><div class="tiny muted">' + (isW ? 'WORDS' : 'TRANSCRIBED WORDS') + '</div><div style="font-size:44px;font-weight:750;line-height:1">' + (a.wordCount || 0) + '</div></div>' +
    '<div><div class="tiny muted">TIME USED</div><div style="font-size:44px;font-weight:750;line-height:1">' + a.timeUsedPct + '%</div></div>' +
    '<div><div class="tiny muted">TEMPLATE PHRASES</div><div style="font-size:44px;font-weight:750;line-height:1">' + (a.analysis.templates.total || 0) + '</div></div>' +
    '</div>' +
    '<p class="tiny muted" style="margin-top:12px">Overall is the <strong>lowest-anchored blend</strong> of the four dimensions, not their average — ' +
    'it is pulled toward your weakest dimension deliberately, because that is how CELPIP behaves. ' +
    'Marked by: ' + (a.ratingSource === 'api' ? esc(a.ratingProvider || 'model rater') : 'offline heuristic rater (connect a model for full feedback)') + '.</p>' +
    (r._patched && r._patched.length
      ? '<div class="flagline">The model returned no usable score for <strong>' + esc(r._patched.join(', ')) +
        '</strong>, so those came from the built-in heuristic rater. Small in-browser models do this often; a larger model returns all four reliably.</div>'
      : '') +
    (a.timedOut ? '<div class="flagline bad">Time expired before you submitted.</div>' : '');
  wrap.appendChild(head);

  const dims = el('div', { class: 'grid g4' });
  dims.appendChild(dimCard('Content / Coherence', D.content_coherence, 'ideas, organisation, support'));
  dims.appendChild(dimCard('Vocabulary', D.vocabulary, 'choice, range, precision'));
  dims.appendChild(dimCard(isW ? 'Readability' : 'Listenability', D[rdKey], isW ? 'grammar, structure, variety' : 'grammar, fluency, delivery'));
  dims.appendChild(dimCard('Task Fulfillment', D.task_fulfillment, 'relevance, completeness, tone'));
  wrap.appendChild(dims);

  if (r._capsApplied && r._capsApplied.length) {
    const caps = el('div', { class: 'card', style: 'border-color:var(--bad)' });
    caps.innerHTML = '<h3>Hard caps applied <span class="tag bad">strict marking</span></h3>' +
      '<p class="small muted">These are enforced in code against measurements of your text, not left to the marker\'s judgement. ' +
      'Each one held a dimension down regardless of how good the rest of the response was.</p>' +
      r._capsApplied.map(c => '<div class="flagline bad">' + esc(c) + '</div>').join('');
    wrap.appendChild(caps);
  }

  const fixes = el('div', { class: 'card' });
  fixes.innerHTML = '<h3>Your top 3 fixes</h3><ol class="clean">' +
    (r.top_3_fixes || []).map(f => '<li>' + esc(f) + '</li>').join('') + '</ol>';
  wrap.appendChild(fixes);

  // bullets covered
  if (a.analysis.bulletsCovered && a.analysis.bulletsCovered.length && a.item.bullets) {
    const bc = el('div', { class: 'card' });
    bc.innerHTML = '<h3>Required points</h3>' + a.item.bullets.map((b, i) =>
      '<div class="flagline ' + (a.analysis.bulletsCovered[i] ? 'ok' : 'bad') + '">' +
      (a.analysis.bulletsCovered[i] ? '✓ ' : '✗ NOT ADDRESSED — ') + esc(b) + '</div>').join('');
    wrap.appendChild(bc);
  }

  // template detector (feature 3)
  const tp = a.analysis.templates;
  const tcard = el('div', { class: 'card' });
  tcard.innerHTML = '<h3>Template-dependency detector</h3>' +
    '<p class="small">Detected <strong>' + tp.total + '</strong> memorised phrase' + (tp.total === 1 ? '' : 's') +
    ' — a density of <strong>' + tp.density + '</strong> per 100 words. ' +
    (tp.density >= 1.5 ? '<span class="tag bad">HIGH — Vocabulary capped at CLB 7</span>' : tp.total ? '<span class="tag warn">Reduce these</span>' : '<span class="tag ok">Clean</span>') + '</p>';
  if (tp.hits.length) {
    const tb = el('table');
    tb.innerHTML = '<thead><tr><th>Phrase</th><th>×</th><th>Use instead</th></tr></thead>';
    const body = el('tbody');
    tp.hits.forEach(h => {
      const tr = el('tr');
      tr.innerHTML = '<td><em>' + esc(h.name) + '</em></td><td>' + h.count + '</td><td>' +
        h.alt.map(x => '<div>→ ' + esc(x) + '</div>').join('') + '</td>';
      body.appendChild(tr);
    });
    tb.appendChild(body);
    tcard.appendChild(tb);
  }
  wrap.appendChild(tcard);

  // register checker (feature 5) — writing task 1 only
  if (isW && a.task === 1) {
    const rc = el('div', { class: 'card' });
    rc.innerHTML = '<h3>Register check</h3><p class="small">Expected register for <strong>' + esc(a.item.recipient) + '</strong>: <span class="tag">' + esc(a.analysis.register.want) + '</span></p>';
    if (!a.analysis.register.flags.length) rc.appendChild(el('div', { class: 'flagline ok', text: 'No register problems detected.' }));
    a.analysis.register.flags.forEach(f => rc.appendChild(el('div', { class: 'flagline ' + (f.level === 'bad' ? 'bad' : ''), text: f.msg })));
    wrap.appendChild(rc);
  }

  // errors
  if (a.errors && a.errors.length) {
    const ec = el('div', { class: 'card' });
    ec.innerHTML = '<h3>Errors logged to your recurring-error table</h3>';
    const t = el('table');
    t.innerHTML = '<thead><tr><th>Type</th><th>You wrote</th><th>Correct</th></tr></thead>';
    const tb = el('tbody');
    a.errors.forEach(e => {
      const tr = el('tr');
      tr.innerHTML = '<td><span class="tag grey">' + esc(e.type) + '</span></td><td>' + esc(e.mine) + '</td><td>' + esc(e.correct) + '</td>';
      tb.appendChild(tr);
    });
    t.appendChild(tb); ec.appendChild(t);
    wrap.appendChild(ec);
  }

  wrap.appendChild(answerPanels(a, r, isW));

  const row = el('div', { class: 'row noprint' });
  const bp = el('button', { class: 'btn ghost', text: '🖨 Save as PDF' });
  bp.onclick = () => window.print();
  row.appendChild(bp);
  const b1 = el('button', { class: 'btn', text: 'Back to dashboard' });
  b1.onclick = () => go('dashboard');
  const b2 = el('button', { class: 'btn ghost', text: 'Practise this task type again' });
  b2.onclick = () => { if (isW) Writing.start({ mode: 'drill', tasks: [a.task] }); else Speaking.start({ mode: 'drill', tasks: [a.task] }); };
  row.appendChild(b1); row.appendChild(b2);
  wrap.appendChild(row);
  setScreen(wrap);
}
