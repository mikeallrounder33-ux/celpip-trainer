/* ============================================================
   PART 42 — SPEAKING RUNNER
   MediaRecorder audio + Web Speech API live transcript.
   Prep starts automatically; recording starts automatically when
   prep ends. No pause, no re-record, no skipping.
   ============================================================ */

const Rec = {
  stream: null, recorder: null, chunks: [], recog: null,
  finalText: '', interimText: '',

  async ensureMic() {
    if (this.stream && this.stream.active) return true;
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      return true;
    } catch (e) {
      console.warn('mic denied', e);
      return false;
    }
  },

  startRecognition(onUpdate) {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    this.finalText = ''; this.interimText = '';
    if (!SR) { this.recog = null; return false; }
    try {
      const r = new SR();
      r.continuous = true; r.interimResults = true; r.lang = 'en-CA'; r.maxAlternatives = 1;
      r.onresult = e => {
        let interim = '';
        for (let i = e.resultIndex; i < e.results.length; i++) {
          const t = e.results[i][0].transcript;
          if (e.results[i].isFinal) this.finalText += t + ' ';
          else interim += t;
        }
        this.interimText = interim;
        onUpdate && onUpdate(this.finalText, interim);
      };
      r.onerror = ev => { if (ev.error !== 'no-speech') console.warn('recognition error', ev.error); };
      r.onend = () => { if (this.wantRecog) { try { r.start(); } catch (e) { } } };
      this.wantRecog = true;
      r.start();
      this.recog = r;
      return true;
    } catch (e) { this.recog = null; return false; }
  },

  startAudio() {
    this.chunks = [];
    if (!this.stream) return false;
    let mime = '';
    ['audio/webm;codecs=opus', 'audio/webm', 'audio/mp4', 'audio/ogg'].forEach(m => {
      if (!mime && window.MediaRecorder && MediaRecorder.isTypeSupported && MediaRecorder.isTypeSupported(m)) mime = m;
    });
    try {
      this.recorder = mime ? new MediaRecorder(this.stream, { mimeType: mime }) : new MediaRecorder(this.stream);
      this.recorder.ondataavailable = e => { if (e.data && e.data.size) this.chunks.push(e.data); };
      this.recorder.start(500);
      return true;
    } catch (e) { console.warn('MediaRecorder failed', e); this.recorder = null; return false; }
  },

  stop() {
    return new Promise(resolve => {
      this.wantRecog = false;
      if (this.recog) { try { this.recog.stop(); } catch (e) { } this.recog = null; }
      const text = (this.finalText + ' ' + this.interimText).replace(/\s+/g, ' ').trim();
      if (this.recorder && this.recorder.state !== 'inactive') {
        this.recorder.onstop = () => {
          const blob = new Blob(this.chunks, { type: this.recorder.mimeType || 'audio/webm' });
          this.recorder = null;
          resolve({ text, blob });
        };
        try { this.recorder.stop(); } catch (e) { resolve({ text, blob: null }); }
      } else {
        resolve({ text, blob: null });
      }
    });
  },

  release() {
    this.wantRecog = false;
    if (this.recog) { try { this.recog.stop(); } catch (e) { } this.recog = null; }
    if (this.stream) { this.stream.getTracks().forEach(t => t.stop()); this.stream = null; }
  }
};

const Speaking = {
  async start(cfg) {
    // cfg: {mode:'drill'|'section'|'mock', tasks:[...]}
    APP.examMode = true; renderNav();
    const loading = el('div', { class: 'wrap' });
    loading.innerHTML = '<div class="card"><h2>Preparing Speaking…</h2></div>';
    setScreen(loading);

    const items = [];
    if (cfg.mode !== 'drill') items.push(Object.assign({ _source: 'bank' }, SPEAKING_PRACTICE));
    for (const t of cfg.tasks) {
      if (t === 3 || t === 4) {
        // scene tasks come from the local scene set; keep 3 and 4 on the SAME scene
        const chosen = cfg._scene || pick(Object.keys(SCENES));
        cfg._scene = chosen;
        const pool = BANK_SPEAKING.filter(i => i.task === t && i.scene === chosen);
        const it = JSON.parse(JSON.stringify(pool.length ? pick(pool) : BANK_SPEAKING.filter(i => i.task === t)[0]));
        it.scene = chosen; it._source = 'bank';
        items.push(it);
      } else {
        const r = await getItem('speaking', t);
        if (!r.item) continue;
        r.item._source = r.source;
        items.push(r.item);
      }
    }
    if (!items.length) { APP.examMode = false; go('dashboard'); return; }

    const ok = await Rec.ensureMic();
    if (!ok) {
      const proceed = await modal({
        title: 'Microphone unavailable',
        html: '<p>Your browser did not grant microphone access, so audio cannot be recorded.</p>' +
          '<p>You can still run the task with the on-screen timers and type nothing — but no transcript will be produced and no score can be given. ' +
          'To record, allow microphone access and reload. On Chrome, a page opened directly from a <code>file://</code> path may block the microphone; ' +
          'serving the file over <code>http://localhost</code> resolves it.</p>',
        buttons: [{ label: 'Cancel', value: false, class: 'ghost' }, { label: 'Continue without audio', value: true }]
      });
      if (!proceed) { APP.examMode = false; go('dashboard'); return; }
    }

    this.s = { cfg, items, idx: 0, takes: [] };
    this.intro();
  },

  intro() {
    const s = this.s;
    const item = s.items[s.idx];
    const spec = SPEAKING_SPEC[item.task];
    const wrap = el('div');
    wrap.appendChild(examChrome('Speaking — Task ' + item.task + (spec.scored ? '' : ' (not scored)') + ': ' + spec.name,
      'Task ' + (s.idx + 1) + ' of ' + s.items.length + '  ·  ' + spec.prep + 's preparation, ' + spec.resp + 's response', null));
    const body = el('div', { class: 'wrap' });
    wrap.appendChild(body);
    const c = el('div', { class: 'card center' });
    c.innerHTML = '<h2>Task ' + item.task + ' — ' + esc(spec.name) + '</h2>' +
      '<p class="muted">You will get <strong>' + spec.prep + ' seconds</strong> to prepare' +
      (spec.choose ? ' (after ' + spec.choose + ' seconds to choose an option)' : '') +
      ', then recording starts <strong>automatically</strong> for <strong>' + spec.resp + ' seconds</strong>.</p>' +
      '<div class="flagline">There is no pause, no re-record and no skip — exactly like the real test. Speak until the timer stops you.</div>';
    const b = el('button', { class: 'btn lg', text: 'Begin Task ' + item.task });
    b.onclick = () => (spec.choose ? this.choosePhase() : this.prepPhase());
    c.appendChild(b);
    body.appendChild(c);
    setScreen(wrap);
  },

  promptBody(item) {
    const box = el('div', { class: 'card' });
    if (item.scene) {
      box.innerHTML = '<h3>' + esc(SCENES[item.scene].name) + '</h3>' +
        '<div style="border:1px solid var(--line);border-radius:8px;overflow:hidden">' + SCENES[item.scene].svg + '</div>' +
        '<p style="margin-top:12px">' + esc(item.prompt) + '</p>';
    } else if (item.task === 5) {
      box.innerHTML = '<h3>Compare and persuade</h3><p>' + esc(item.context) + '</p>' +
        '<div class="grid g2">' +
        '<div class="card tight" style="background:var(--soft)"><strong>' + esc(item.optionA.label) + '</strong><div class="small">' + esc(item.optionA.desc) + '</div></div>' +
        '<div class="card tight" style="background:var(--soft)"><strong>' + esc(item.optionB.label) + '</strong><div class="small">' + esc(item.optionB.desc) + '</div></div></div>';
    } else {
      box.innerHTML = '<h3>Your task</h3><p style="font-size:16px">' + esc(item.prompt) + '</p>';
    }
    return box;
  },

  choosePhase() {
    const s = this.s;
    const item = s.items[s.idx];
    const spec = SPEAKING_SPEC[item.task];
    const t = new Timer(spec.choose, null, () => this.prepPhase());
    const wrap = el('div');
    const body = el('div', { class: 'wrap' });
    const stage = el('div', { class: 'stage' });
    stage.innerHTML = '<div class="tag warn">CHOOSE AN OPTION</div><div class="bigtimer" id="bt">' + spec.choose + '</div>' +
      '<p class="muted">Decide which option you will argue for. You are not being recorded yet.</p>';
    body.appendChild(stage);
    body.appendChild(this.promptBody(item));
    wrap.appendChild(body);
    setScreen(wrap);
    t.onTick = left => { const n = $('#bt'); if (n) n.textContent = Math.ceil(left); };
    t.start();
    s.phaseTimer = t;
  },

  prepPhase() {
    const s = this.s;
    const item = s.items[s.idx];
    const spec = SPEAKING_SPEC[item.task];
    if (s.phaseTimer) s.phaseTimer.stop();
    const t = new Timer(spec.prep, null, () => this.recordPhase());
    const wrap = el('div');
    const body = el('div', { class: 'wrap' });
    const stage = el('div', { class: 'stage' });
    stage.innerHTML = '<div class="tag">PREPARATION</div><div class="bigtimer" id="bt">' + spec.prep + '</div>' +
      '<p class="muted">Recording begins automatically when this reaches zero.</p>';
    body.appendChild(stage);
    body.appendChild(this.promptBody(item));
    wrap.appendChild(body);
    setScreen(wrap);
    t.onTick = left => { const n = $('#bt'); if (n) { n.textContent = Math.ceil(left); n.style.color = left < 6 ? 'var(--bad)' : ''; } };
    t.start();
    s.phaseTimer = t;
  },

  recordPhase() {
    const s = this.s;
    const item = s.items[s.idx];
    const spec = SPEAKING_SPEC[item.task];
    if (s.phaseTimer) s.phaseTimer.stop();

    const wrap = el('div');
    const body = el('div', { class: 'wrap' });
    const stage = el('div', { class: 'stage' });
    stage.innerHTML = '<div class="tag bad"><span class="pulse"></span> &nbsp;RECORDING</div>' +
      '<div class="bigtimer" id="bt">' + spec.resp + '</div>' +
      '<div class="bar" style="max-width:420px;margin:0 auto"><i style="width:100%"></i></div>' +
      '<p class="muted" style="margin-top:12px">Keep speaking until the timer stops. There is no pause and no second attempt.</p>' +
      '<div id="live" class="passage" style="text-align:left;margin-top:14px;min-height:90px;font-size:14px;color:var(--muted)">…</div>';
    body.appendChild(stage);
    body.appendChild(this.promptBody(item));
    wrap.appendChild(body);
    setScreen(wrap);

    Rec.startAudio();
    Rec.startRecognition((fin, interim) => {
      const n = $('#live');
      if (n) n.innerHTML = '<span style="color:var(--ink)">' + esc(fin) + '</span><span style="opacity:.55">' + esc(interim) + '</span>';
    });

    const t = new Timer(spec.resp, null, () => this.endTake());
    t.onTick = (left, total) => {
      const n = $('#bt'); if (n) { n.textContent = Math.ceil(left); n.style.color = left < 11 ? 'var(--bad)' : ''; }
      const b = $('.bar i'); if (b) b.style.width = (100 * left / total) + '%';
    };
    t.start();
    s.phaseTimer = t;
    s.takeStart = Date.now();
  },

  async endTake() {
    const s = this.s;
    const item = s.items[s.idx];
    const spec = SPEAKING_SPEC[item.task];
    if (s.phaseTimer) s.phaseTimer.stop();
    const wait = el('div', { class: 'wrap' });
    wait.innerHTML = '<div class="card center"><h2>Saving your response…</h2></div>';
    setScreen(wait);

    const out = await Rec.stop();
    const spokenSec = Math.min(spec.resp, (Date.now() - s.takeStart) / 1000);
    const usedPct = Math.round(100 * spokenSec / spec.resp);
    s.takes.push({ item, transcript: out.text, blob: out.blob, usedPct, respSec: spec.resp, scored: spec.scored });

    if (s.idx < s.items.length - 1) {
      s.idx++;
      this.intro();
      return;
    }
    Rec.release();
    APP.examMode = false; renderNav();
    this.gradeAll();
  },

  async gradeAll() {
    const s = this.s;
    const scored = s.takes.filter(t => t.scored);
    const attempts = [];
    for (let i = 0; i < scored.length; i++) {
      const tk = scored[i];
      const wait = el('div', { class: 'wrap' });
      wait.innerHTML = '<div class="card"><h2>Marking ' + (i + 1) + ' of ' + scored.length + '…</h2>' +
        '<p class="muted">Task ' + tk.item.task + ' — ' + esc(SPEAKING_SPEC[tk.item.task].name) + '</p>' +
        '<div class="bar"><i style="width:' + Math.round(100 * i / scored.length) + '%"></i></div></div>';
      setScreen(wait);

      const res = await rateResponse('speaking', tk.item, tk.transcript, tk.usedPct, tk.respSec);
      const tp = detectTemplates(tk.transcript);
      const errs = (res.rating.errors || []).map(e => ({ type: e.type || 'other', mine: e.mine, correct: e.correct }));
      logErrors(errs);

      const id = uid();
      if (tk.blob) MEM.audio[id] = URL.createObjectURL(tk.blob);
      const attempt = {
        id, ts: Date.now(), module: 'speaking', mode: s.cfg.mode, task: tk.item.task,
        item: tk.item, response: tk.transcript, wordCount: words(tk.transcript),
        rating: res.rating, ratingSource: res.source, ratingProvider: API.providerName() + " · " + (DB.settings().provider === "browser" ? (BrowserLLM.modelId || "") : DB.settings().model),
        analysis: { templates: tp, register: { want: 'n/a', flags: [] }, bulletsCovered: [] },
        clbNum: res.rating.overall_clb, clb: 'CLB ' + res.rating.overall_clb,
        timeUsedPct: tk.usedPct, allottedSec: tk.respSec, usedSec: Math.round(tk.respSec * tk.usedPct / 100),
        errors: errs, hasAudio: !!tk.blob
      };
      if (tk.blob && DB.settings().persistAudio) {
        try { attempt.audioData = await blobToDataURL(tk.blob); } catch (e) { }
      }
      DB.addAttempt(attempt);
      attempts.push(attempt);
    }
    if (APP.mockQueue) { mockAdvance(attempts[attempts.length - 1]); return; }
    if (attempts.length === 1) showProductiveResult(attempts[0]);
    else showSpeakingSummary(attempts);
  }
};

function blobToDataURL(blob) {
  return new Promise((res, rej) => {
    if (blob.size > 900000) return rej(new Error('too large to persist'));
    const fr = new FileReader();
    fr.onload = () => res(fr.result);
    fr.onerror = rej;
    fr.readAsDataURL(blob);
  });
}

function showSpeakingSummary(attempts) {
  const wrap = el('div', { class: 'wrap' });
  const nums = attempts.map(a => a.rating.overall_clb).filter(n => n > 0);
  const overall = anchoredOverall(nums);
  const head = el('div', { class: 'card' });
  head.innerHTML = '<h1>Speaking section — result</h1>' +
    '<div class="row" style="gap:30px;align-items:flex-end">' +
    '<div><div class="tiny muted">SECTION ESTIMATE</div><div style="font-size:44px;font-weight:750;line-height:1">CLB ' + overall + '</div></div>' +
    '<div><div class="tiny muted">TASKS SCORED</div><div style="font-size:44px;font-weight:750;line-height:1">' + attempts.length + '</div></div>' +
    '<div><div class="tiny muted">WEAKEST TASK</div><div style="font-size:24px;font-weight:750;line-height:1.4">Task ' +
    attempts.slice().sort((a, b) => a.rating.overall_clb - b.rating.overall_clb)[0].task + '</div></div>' +
    '</div><p class="tiny muted" style="margin-top:10px">The section estimate is lowest-anchored across your eight tasks, not an average.</p>';
  wrap.appendChild(head);

  const t = el('table');
  t.innerHTML = '<thead><tr><th>Task</th><th>Overall</th><th>Words</th><th>Time used</th><th>Templates</th><th></th></tr></thead>';
  const tb = el('tbody');
  attempts.forEach(a => {
    const tr = el('tr');
    tr.innerHTML = '<td>Task ' + a.task + ' — ' + esc(SPEAKING_SPEC[a.task].name) + '</td>' +
      '<td><strong>CLB ' + a.rating.overall_clb + '</strong></td><td>' + a.wordCount + '</td>' +
      '<td>' + a.timeUsedPct + '%</td><td>' + a.analysis.templates.total + '</td><td></td>';
    const btn = el('button', { class: 'btn ghost sm', text: 'Detail' });
    btn.onclick = () => showProductiveResult(a);
    tr.lastChild.appendChild(btn);
    tb.appendChild(tr);
  });
  t.appendChild(tb);
  const card = el('div', { class: 'card' });
  card.appendChild(t);
  wrap.appendChild(card);

  const b = el('button', { class: 'btn', text: 'Back to dashboard' });
  b.onclick = () => go('dashboard');
  wrap.appendChild(b);
  setScreen(wrap);
}
