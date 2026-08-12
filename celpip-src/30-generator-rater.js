/* ============================================================
   PART 30 — ITEM GENERATION (Anthropic API + offline bank)
             and the CELPIP RATER (API + offline heuristic)
   ============================================================ */

/* ---------------- 30.1 originality + variety guardrails ---------------- */
const ORIGINALITY_RULE =
  'ORIGINALITY: Every item you produce must be entirely original. Do not reproduce, paraphrase, ' +
  'translate, or reconstruct any real CELPIP test material, official sample answers, or any ' +
  'third-party published practice item. Invent fresh Canadian scenarios (workplace, community, ' +
  'services, housing, transit, healthcare, school). Use invented names, invented street names and ' +
  'invented organisations. Do not name real companies or real people.';

function sessionAvoidList() {
  return Array.from(MEM.sessionSeen).slice(-25);
}
function rememberScenario(label) { if (label) MEM.sessionSeen.add(String(label).slice(0, 90)); }

/* ---------------- 30.2 per-part generation prompts ---------------- */
function genPromptListening(part, clb) {
  const spec = LISTENING_SPEC[part];
  const shape = part === 1
    ? `{"id":"gen","part":1,"clb":${clb},"title":"...","setting":"...","blocks":[{"segments":[{"s":"Speaker name","t":"..."}],"questions":[{"q":"...","o":["a","b","c","d"],"a":0,"w":"one-line reason"}]},{...},{...}]}
Block 1 has 3 questions, block 2 has 3 questions, block 3 has 2 questions (8 total). Each block's segments are 60–110 words of dialogue between exactly two named speakers, continuing one story.`
    : `{"id":"gen","part":${part},"clb":${clb},"title":"...","setting":"...","blocks":[{"segments":[{"s":"Speaker name","t":"..."}],"questions":[{"q":"...","o":["a","b","c","d"],"a":0,"w":"one-line reason"}]}]}
One block only, with exactly ${spec.q} questions.`;
  const style = {
    2: 'A relaxed everyday conversation between exactly two named speakers, about 200–240 words in total, alternating turns.',
    3: 'An information-seeking conversation between a member of the public and a service provider, two named speakers, 240–300 words, dense with specific facts, numbers and conditions.',
    4: 'A single news reader monologue of 190–230 words in one segment (speaker "Anchor"), containing several specific figures, a named objection from a stakeholder group, and an official response.',
    5: 'A meeting discussion among THREE OR FOUR named speakers, 300–380 words, in which speakers disagree, refine each other\'s proposals, and reach a partial decision.',
    6: 'A single speaker of 260–330 words expressing a nuanced personal opinion (speaker "Speaker"), including a concession, a change of mind, and a conditional conclusion.'
  }[part] || 'A three-part problem-solving dialogue between exactly two named speakers.';

  return `Write ONE original CELPIP-General Listening item for Part ${part} (${spec.name}), targeting CLB ${clb}.

${style}

Begin the first segment with a "Narrator" segment giving the standard instruction line.
Questions are 4-option multiple choice; exactly one option is correct; distractors must be plausible and drawn from the audio, not obviously wrong. Answers must be spread across positions, not all the same index.

${ORIGINALITY_RULE}
Do not reuse any of these scenarios: ${JSON.stringify(sessionAvoidList())}

Output JSON only, no commentary, exactly this shape:
${shape}`;
}

function genPromptReading(part, clb) {
  const shapes = {
    1: `{"id":"gen","part":1,"clb":${clb},"title":"...","letter":{"from":"Name <email>","to":"Name","date":"Month D","subject":"...","body":"a 260–330 word letter or email with real specifics, using \\n\\n between paragraphs"},"mc":[6 items {"q":"...","o":["a","b","c","d"],"a":0,"w":"..."}],"reply":{"header":"From: ... To: ... Subject: Re: ...","text":"a 90–130 word reply containing EXACTLY the five markers {{1}} {{2}} {{3}} {{4}} {{5}} in order"},"blanks":[5 items {"o":["a","b","c","d"],"a":0}]}`,
    2: `{"id":"gen","part":2,"clb":${clb},"title":"...","diagram":{"type":"table","title":"...","caption":"...","head":["col","col","col","col"],"rows":[["...","...","...","..."], 4 or 5 rows total, each row starting with a label like "A." or "1."]},"email":{"header":"From: ... To: ... Subject: ...","body":"a 150–220 word email that refers to rows of the table WITHOUT naming them directly"},"mc":[5 items {"q":"...","o":["row label 1","row label 2","row label 3","row label 4"],"a":0,"w":"..."}],"reply":{"header":"From: ... Subject: Re: ...","text":"a 60–90 word reply containing EXACTLY the markers {{1}} {{2}} {{3}}"},"blanks":[3 items {"o":["a","b","c","d"],"a":0}]}`,
    3: `{"id":"gen","part":3,"clb":${clb},"title":"...","intro":"one sentence framing four related paragraphs","paras":[4 items {"k":"A","title":"short label","text":"90–130 words"} with k = A,B,C,D],"statements":[9 items {"t":"a statement","a":"A"} where exactly ONE statement has a:"E" meaning the information is not given in any paragraph, and the other 8 are spread across A,B,C,D]}`,
    4: `{"id":"gen","part":4,"clb":${clb},"title":"...","article":{"title":"...","byline":"Opinion — publication","body":"a 380–460 word opinion column with a clear personal viewpoint, at least one concession to the other side, and a specific recommendation, using \\n\\n between paragraphs"},"mc":[5 items {"q":"...","o":["a","b","c","d"],"a":0,"w":"..."}],"comment":{"header":"Reader comment — posted by ...","text":"a 110–150 word reader reply containing EXACTLY the markers {{1}} {{2}} {{3}} {{4}} {{5}}"},"blanks":[5 items {"o":["a","b","c","d"],"a":0}]}`
  };
  return `Write ONE original CELPIP-General Reading item for Part ${part} (${READING_SPEC[part].name}), targeting CLB ${clb}.

Every blank marker must have exactly one contextually correct option; the three distractors must be grammatically possible but wrong in meaning. Correct-answer indexes must vary.

${ORIGINALITY_RULE}
Do not reuse any of these scenarios: ${JSON.stringify(sessionAvoidList())}

Output JSON only, no commentary, exactly this shape:
${shapes[part]}`;
}

function genPromptWriting(task, clb) {
  if (task === 1) {
    return `Write ONE original CELPIP-General Writing Task 1 (Writing an Email) prompt, targeting CLB ${clb}.

The scenario must be a realistic Canadian situation. The recipient must be either a named individual (for informal/semi-formal) or a role (for formal). There must be EXACTLY three bullet points, each one a distinct communicative purpose that a strong answer must address.

${ORIGINALITY_RULE}
Do not reuse any of these scenarios: ${JSON.stringify(sessionAvoidList())}

Output JSON only:
{"id":"gen","task":1,"clb":${clb},"formality":"formal|semi-formal|informal","recipient":"who you are writing to","recipientRole":"role-based salutation to use if gender unknown","recipientGenderKnown":true|false,"scenario":"3–4 sentences","instruction":"Write an email to ... Your email should be about 150–200 words.","bullets":["...","...","..."]}`;
  }
  return `Write ONE original CELPIP-General Writing Task 2 (Responding to Survey Questions) prompt, targeting CLB ${clb}.

There must be EXACTLY two options. Neither may be obviously better than the other: each must carry a real trade-off, so that a candidate could defend either.

${ORIGINALITY_RULE}
Do not reuse any of these scenarios: ${JSON.stringify(sessionAvoidList())}

Output JSON only:
{"id":"gen","task":2,"clb":${clb},"scenario":"2–3 sentences describing who is surveying whom","question":"Which option do you support, and why?","optionA":{"label":"Option A: ...","desc":"the trade-off in one sentence"},"optionB":{"label":"Option B: ...","desc":"the trade-off in one sentence"}}`;
}

function genPromptSpeaking(task, clb) {
  if (task === 3 || task === 4) return null; // scenes come from the local SVG set
  if (task === 5) {
    return `Write ONE original CELPIP-General Speaking Task 5 (Comparing and Persuading) prompt, targeting CLB ${clb}.
Two options with genuine trade-offs, in a realistic Canadian everyday decision.
${ORIGINALITY_RULE}
Avoid: ${JSON.stringify(sessionAvoidList())}
Output JSON only:
{"id":"gen","task":5,"clb":${clb},"context":"one or two sentences ending with: Compare the two options, choose one, and persuade the person you are speaking to.","optionA":{"label":"...","desc":"specific details including numbers"},"optionB":{"label":"...","desc":"specific details including numbers"}}`;
  }
  const desc = {
    1: 'Giving Advice — a friend or relative faces a decision with competing pressures; the candidate must advise them.',
    2: 'Talking about a Personal Experience — asks the candidate to recount a specific past experience with three sub-parts.',
    6: 'Dealing with a Difficult Situation — the candidate must make a call or speak to someone about an awkward problem where both choices have a cost.',
    7: 'Expressing Opinions — a debatable public issue on which the candidate must take and defend a position.',
    8: 'Describing an Unusual Situation — the candidate must describe an unfamiliar object in detail from a written description of its size, material, and 4–5 distinctive features, then guess its purpose.'
  }[task];
  return `Write ONE original CELPIP-General Speaking Task ${task} (${SPEAKING_SPEC[task].name}) prompt, targeting CLB ${clb}.
${desc}
${ORIGINALITY_RULE}
Avoid: ${JSON.stringify(sessionAvoidList())}
Output JSON only:
{"id":"gen","task":${task},"clb":${clb},"prompt":"the full prompt text as the candidate would read it"}`;
}

/* ---------------- 30.3 validation of generated items ---------------- */
function validQuestion(q) {
  return q && typeof q.q === 'string' && Array.isArray(q.o) && q.o.length === 4 &&
    q.o.every(x => typeof x === 'string' && x.length) &&
    Number.isInteger(q.a) && q.a >= 0 && q.a < 4;
}
function validateListening(it, part) {
  if (!it || !Array.isArray(it.blocks) || !it.blocks.length) return false;
  const wantBlocks = part === 1 ? 3 : 1;
  if (it.blocks.length !== wantBlocks) return false;
  let total = 0;
  for (const b of it.blocks) {
    if (!Array.isArray(b.segments) || !b.segments.length) return false;
    if (!b.segments.every(s => s && typeof s.s === 'string' && typeof s.t === 'string' && s.t.length > 10)) return false;
    if (!Array.isArray(b.questions) || !b.questions.every(validQuestion)) return false;
    total += b.questions.length;
  }
  return total === LISTENING_SPEC[part].q;
}
function countMarkers(text, n) {
  for (let i = 1; i <= n; i++) if (!new RegExp('\\{\\{' + i + '\\}\\}').test(text || '')) return false;
  return true;
}
function validateReading(it, part) {
  if (!it) return false;
  if (part === 1) {
    return it.letter && typeof it.letter.body === 'string' && it.letter.body.length > 300 &&
      Array.isArray(it.mc) && it.mc.length === 6 && it.mc.every(validQuestion) &&
      it.reply && countMarkers(it.reply.text, 5) &&
      Array.isArray(it.blanks) && it.blanks.length === 5 && it.blanks.every(b => Array.isArray(b.o) && b.o.length === 4 && Number.isInteger(b.a));
  }
  if (part === 2) {
    return it.diagram && Array.isArray(it.diagram.rows) && it.diagram.rows.length >= 4 &&
      it.email && typeof it.email.body === 'string' &&
      Array.isArray(it.mc) && it.mc.length === 5 && it.mc.every(validQuestion) &&
      it.reply && countMarkers(it.reply.text, 3) &&
      Array.isArray(it.blanks) && it.blanks.length === 3 && it.blanks.every(b => Array.isArray(b.o) && b.o.length === 4 && Number.isInteger(b.a));
  }
  if (part === 3) {
    return Array.isArray(it.paras) && it.paras.length === 4 &&
      it.paras.every(p => p && 'ABCD'.includes(p.k) && typeof p.text === 'string' && p.text.length > 200) &&
      Array.isArray(it.statements) && it.statements.length === 9 &&
      it.statements.every(s => s && typeof s.t === 'string' && 'ABCDE'.includes(s.a));
  }
  if (part === 4) {
    return it.article && typeof it.article.body === 'string' && it.article.body.length > 900 &&
      Array.isArray(it.mc) && it.mc.length === 5 && it.mc.every(validQuestion) &&
      it.comment && countMarkers(it.comment.text, 5) &&
      Array.isArray(it.blanks) && it.blanks.length === 5 && it.blanks.every(b => Array.isArray(b.o) && b.o.length === 4 && Number.isInteger(b.a));
  }
  return false;
}
function validateWriting(it, task) {
  if (!it) return false;
  if (task === 1) return typeof it.scenario === 'string' && Array.isArray(it.bullets) && it.bullets.length === 3 && it.bullets.every(b => typeof b === 'string' && b.length > 5);
  return typeof it.scenario === 'string' && it.optionA && it.optionB && it.optionA.label && it.optionB.label;
}
function validateSpeaking(it, task) {
  if (!it) return false;
  if (task === 5) return it.context && it.optionA && it.optionB;
  return typeof it.prompt === 'string' && it.prompt.length > 40;
}

/* ---------------- 30.4 bank selection with no in-session repeats ---------------- */
function bankPick(list, filterFn) {
  const pool = list.filter(filterFn);
  if (!pool.length) return null;
  const fresh = pool.filter(i => !MEM.sessionSeen.has(i.id));
  const chosen = pick(fresh.length ? fresh : pool);
  MEM.sessionSeen.add(chosen.id);
  rememberScenario(chosen.title || chosen.scenario || chosen.prompt);
  DB.markSeen(chosen.id);
  return JSON.parse(JSON.stringify(chosen));
}

/* Main entry: returns {item, source:'api'|'bank', error?} */
async function getItem(module, partOrTask, clbTarget) {
  const clb = clbTarget || pick([6, 7, 8, 9, 10]);
  const useApi = API.available();
  let prompt = null;
  if (useApi) {
    if (module === 'listening') prompt = genPromptListening(partOrTask, clb);
    else if (module === 'reading') prompt = genPromptReading(partOrTask, clb);
    else if (module === 'writing') prompt = genPromptWriting(partOrTask, clb);
    else if (module === 'speaking') prompt = genPromptSpeaking(partOrTask, clb);
  }
  if (prompt) {
    try {
      const s = DB.settings();
      const txt = await API.call(
        'You are a CELPIP-General test item writer. You output valid JSON only, with no preamble, no markdown fences and no trailing commentary.',
        prompt, s.maxTokens || 1000);
      const obj = API.parseJSON(txt);
      const ok =
        module === 'listening' ? validateListening(obj, partOrTask) :
        module === 'reading' ? validateReading(obj, partOrTask) :
        module === 'writing' ? validateWriting(obj, partOrTask) :
        validateSpeaking(obj, partOrTask);
      if (ok) {
        obj.id = 'GEN-' + module[0].toUpperCase() + partOrTask + '-' + uid().slice(-4);
        obj.clb = obj.clb || clb;
        if (module === 'listening') obj.part = partOrTask;
        if (module === 'reading') obj.part = partOrTask;
        if (module === 'speaking' || module === 'writing') obj.task = partOrTask;
        rememberScenario(obj.title || obj.scenario || obj.prompt);
        MEM.sessionSeen.add(obj.id);
        return { item: obj, source: 'api' };
      }
      console.warn('generated item failed validation, falling back to bank', obj);
    } catch (e) {
      console.warn('generation failed, falling back to bank:', e.message);
      var genError = e.message;
    }
  }
  // ---- offline / fallback path ----
  if (prompt && !MEM._fellBack) {
    // Tell the user *why* they got a bank item, and give advice that matches
    // the actual failure rather than a generic guess.
    MEM._fellBack = true;
    const e = typeof genError !== 'undefined' ? String(genError) : '';
    let why, advice;
    if (!e) {
      why = 'the reply did not match the required format';
      advice = 'Usually max_tokens truncation on a long item — raise it in Settings, or use a larger model. Small local models often fail this.';
    } else if (/Failed to fetch|NetworkError|Load failed/i.test(e)) {
      why = 'the model could not be reached';
      advice = API.isLocal()
        ? 'Is your local server running? If it is, this is CORS: run launchctl setenv OLLAMA_ORIGINS "*" and restart Ollama, or enable CORS in LM Studio.'
        : 'Check your connection. On a file:// page all API calls are blocked — serve the app over http://localhost.';
    } else if (/\b401\b|authentication|invalid.*key/i.test(e)) {
      why = 'the key was rejected';
      advice = 'Check the key in Settings, and that it matches the selected provider.';
    } else if (/\b429\b|rate.?limit/i.test(e)) {
      why = 'you hit a rate limit';
      advice = 'Wait a minute, or switch to a provider with more headroom. Free tiers are limited per minute.';
    } else if (/\b40[03]\b|credit|billing|quota/i.test(e)) {
      why = e;
      advice = 'Usually no credit on the account. Add credit, or switch to a free local model in Settings.';
    } else {
      why = e;
      advice = 'Run Settings → Diagnostics for a full check.';
    }
    toast('Using the built-in bank — ' + why + '. ' + advice, 'bad');
  }
  let item = null;
  if (module === 'listening') item = bankPick(BANK_LISTENING, i => i.part === partOrTask);
  else if (module === 'reading') item = bankPick(BANK_READING, i => i.part === partOrTask);
  else if (module === 'writing') item = bankPick(BANK_WRITING, i => i.task === partOrTask);
  else if (module === 'speaking') item = bankPick(BANK_SPEAKING, i => i.task === partOrTask);
  return { item, source: 'bank', error: typeof genError !== 'undefined' ? genError : null };
}

/* ---------------- 30.5 THE RATER ---------------- */
const RATER_SYSTEM = `You are a certified CELPIP rater. You are strict. You are marking against the official CELPIP-General rating scale, which reports a Canadian Language Benchmark (CLB) level from 3 to 12 for each of four dimensions.

RULES YOU MUST FOLLOW:
1. Score each of the four dimensions SEPARATELY. Do not let a strong dimension lift a weak one.
2. For EACH dimension you must quote, verbatim, the single exact sentence from the candidate's response that CAPS that dimension — the sentence that prevents a higher band. Copy it character for character from the response. Do not paraphrase it. If the response is too short to contain such a sentence, quote the whole response.
3. NEVER round up. If a response sits between two bands, award the lower band. A response with any recurring basic error (subject-verb agreement, article errors, homophone confusion, missing end punctuation) cannot exceed CLB 8 on Readability/Listenability, regardless of vocabulary.
4. Formulaic, memorised scaffolding phrases are NOT evidence of range. When template density is reported to you as high, you must cap Vocabulary at CLB 7 and say so in the evidence field.
5. Task Fulfillment: if ANY required bullet point is unaddressed, Task Fulfillment cannot exceed CLB 6. If the response is outside 150-200 words for Writing, deduct at least one band from Task Fulfillment and say so.
6. The rewritten_sample must be the candidate's OWN ideas rewritten at roughly one band above their current level — not a model answer on a different topic, and not longer than the original by more than 15%.
7. The "errors" array must list each distinct error you found, with the candidate's exact wording and the correction. Use only these type values: "homophone confusion", "dropped verb forms and auxiliaries", "missing end punctuation", "run-on sentences", "spelling", "article errors", "register mismatch".

Output JSON ONLY. No preamble, no markdown fences, no commentary after the JSON.`;

function raterUserWriting(item, text, analysis) {
  const bullets = item.task === 1 ? item.bullets : [
    'Choose ONE of the two options explicitly',
    'Give reasons that support the chosen option',
    'Address the trade-off of the option not chosen'
  ];
  return `TASK TYPE: CELPIP-General Writing Task ${item.task} — ${item.task === 1 ? 'Writing an Email' : 'Responding to Survey Questions'}
REQUIRED LENGTH: 150-200 words. ACTUAL LENGTH: ${analysis.wordCount} words.
${item.task === 1 ? 'RECIPIENT: ' + item.recipient + ' (register expected: ' + item.formality + ')' : ''}

PROMPT GIVEN TO CANDIDATE:
${item.scenario}
${item.task === 1 ? 'Bullet points that MUST all be addressed:\n- ' + bullets.join('\n- ') : 'Option A: ' + item.optionA.label + ' — ' + item.optionA.desc + '\nOption B: ' + item.optionB.label + ' — ' + item.optionB.desc}

AUTOMATED PRE-ANALYSIS (use it, do not merely repeat it):
- Memorised template phrases detected: ${analysis.templates.total} (density ${analysis.templates.density} per 100 words)${analysis.templates.total ? ': ' + analysis.templates.hits.map(h => '"' + h.name + '" x' + h.count).join(', ') : ''}
- Template density is ${analysis.templates.density >= 1.5 ? 'HIGH — you must cap Vocabulary at CLB 7' : 'acceptable'}
- Register check (${analysis.register.want} expected): ${analysis.register.flags.length ? analysis.register.flags.map(f => f.msg).join(' | ') : 'no automated flags'}
- Time used: ${analysis.timeUsedPct}% of the allotted time.

CANDIDATE RESPONSE (verbatim, between the markers):
<<<RESPONSE
${text}
RESPONSE>>>

Output this JSON exactly:
{"dimensions":{"content_coherence":{"clb":0,"evidence":"exact quoted sentence that caps this dimension","fix":"one concrete instruction"},"vocabulary":{"clb":0,"evidence":"...","fix":"..."},"readability":{"clb":0,"evidence":"...","fix":"..."},"task_fulfillment":{"clb":0,"evidence":"...","fix":"..."}},"overall_clb":0,"top_3_fixes":["...","...","..."],"rewritten_sample":"...","errors":[{"type":"spelling","mine":"exact wrong wording","correct":"corrected wording"}],"bullets_covered":[true,true,true]}`;
}

function raterUserSpeaking(item, transcript, analysis) {
  return `TASK TYPE: CELPIP-General Speaking Task ${item.task} — ${SPEAKING_SPEC[item.task].name}
ALLOTTED RESPONSE TIME: ${SPEAKING_SPEC[item.task].resp} seconds. TIME USED: ${analysis.timeUsedPct}%.
TRANSCRIPT LENGTH: ${analysis.wordCount} words.

PROMPT GIVEN TO CANDIDATE:
${item.prompt || (item.context + '\nOption A: ' + (item.optionA ? item.optionA.label + ' — ' + item.optionA.desc : '') + '\nOption B: ' + (item.optionB ? item.optionB.label + ' — ' + item.optionB.desc : ''))}

IMPORTANT: This is an automatic speech-recognition transcript. Punctuation and capitalisation are unreliable, so do NOT penalise them. DO judge grammar, word choice, structure, repetition, self-correction, false starts and filler words, all of which the transcript does preserve. For Listenability, judge what the transcript reveals about sentence structure, fluency breaks and repair, and say explicitly that pronunciation could not be assessed from text.

AUTOMATED PRE-ANALYSIS:
- Memorised template phrases: ${analysis.templates.total} (density ${analysis.templates.density} per 100 words)${analysis.templates.total ? ': ' + analysis.templates.hits.map(h => '"' + h.name + '" x' + h.count).join(', ') : ''}
- Filler words counted: ${analysis.fillers}
- Speaking rate: about ${analysis.wpm} words per minute.

CANDIDATE TRANSCRIPT (verbatim):
<<<RESPONSE
${transcript}
RESPONSE>>>

Output this JSON exactly:
{"dimensions":{"content_coherence":{"clb":0,"evidence":"exact quoted stretch that caps this dimension","fix":"one concrete instruction"},"vocabulary":{"clb":0,"evidence":"...","fix":"..."},"listenability":{"clb":0,"evidence":"...","fix":"..."},"task_fulfillment":{"clb":0,"evidence":"...","fix":"..."}},"overall_clb":0,"top_3_fixes":["...","...","..."],"rewritten_sample":"...","errors":[{"type":"dropped verb forms and auxiliaries","mine":"exact wrong wording","correct":"corrected wording"}]}`;
}

/* ---------------- 30.6 offline heuristic rater ---------------- */
const FILLER_RE = /\b(um+|uh+|er+|ah+|like|you know|I mean|sort of|kind of|basically|actually|literally)\b/gi;

function heuristicRate(kind, item, text, analysis) {
  const w = analysis.wordCount;
  const sents = sentences(text);
  const uniq = new Set((text.toLowerCase().match(/[a-z']+/g) || []));
  const ttr = w ? uniq.size / w : 0;
  const longWords = (text.match(/\b[a-z]{8,}\b/gi) || []).length;
  const errs = analysis.localErrors.length;
  const lens = sents.map(words).filter(n => n > 0);
  const meanLen = lens.length ? lens.reduce((a, b) => a + b, 0) / lens.length : 0;
  const variance = lens.length > 1 ? Math.sqrt(lens.reduce((a, b) => a + (b - meanLen) ** 2, 0) / lens.length) : 0;
  const connectives = (text.match(/\b(because|although|however|whereas|since|unless|while|therefore|which|whose|even though|as long as|provided that|rather than)\b/gi) || []).length;

  const clamp = n => Math.max(3, Math.min(11, Math.round(n)));

  // Content / coherence
  let cc = 5;
  if (w >= 120) cc += 1;
  if (w >= 160) cc += 1;
  if (connectives >= 3) cc += 1;
  if (connectives >= 7) cc += 1;
  if (/\b(for example|for instance|such as|last (year|month|week)|in my case)\b/i.test(text)) cc += 1;
  if (w < 90) cc -= 2;
  if (sents.length < 4) cc -= 1;

  // Vocabulary
  let vo = 5;
  if (ttr > 0.45) vo += 1;
  if (ttr > 0.55) vo += 1;
  if (longWords >= 6) vo += 1;
  if (longWords >= 14) vo += 1;
  if (analysis.templates.density >= 1.5) vo = Math.min(vo, 7);
  if (analysis.templates.density >= 3) vo = Math.min(vo, 6);
  if (w < 90) vo -= 1;

  // Readability / Listenability
  let rd = 6;
  if (kind === 'writing') {
    // Sentence-length variety is only measurable where punctuation is real.
    if (variance > 4) rd += 1;
    if (variance > 7) rd += 1;
    if (meanLen >= 12 && meanLen <= 24) rd += 1;
  } else {
    // On an ASR transcript, subordination is the readable signal for structure.
    if (connectives >= 3) rd += 1;
    if (connectives >= 6) rd += 1;
  }
  rd -= Math.min(4, Math.floor(errs / 2));
  if (errs > 0) rd = Math.min(rd, 8); // rule 3: recurring basic errors cap Readability
  if (kind === 'speaking') {
    const fillRate = w ? analysis.fillers / (w / 100) : 0;
    if (fillRate > 4) rd -= 1;
    if (fillRate > 8) rd -= 1;
    if (analysis.wpm >= 100 && analysis.wpm <= 160) rd += 1;
  }

  // Task fulfilment
  let tf = 7;
  const covered = analysis.bulletsCovered || [];
  const missing = covered.filter(c => !c).length;
  if (missing) tf = Math.min(tf, 6) - (missing - 1);
  if (kind === 'writing') {
    if (w < 150 || w > 200) tf -= 1;
    if (w < 120 || w > 240) tf -= 1;
    if (analysis.register.flags.some(f => f.level === 'bad')) tf -= 1;
  } else {
    const target = SPEAKING_SPEC[item.task] ? SPEAKING_SPEC[item.task].resp : 60;
    const expected = target * 2.1; // ~126 wpm
    if (w < expected * 0.55) tf -= 2;
    else if (w < expected * 0.75) tf -= 1;
  }
  if (analysis.timeUsedPct < 60) tf -= 1;

  const dims = { cc: clamp(cc), vo: clamp(vo), rd: clamp(rd), tf: clamp(tf) };
  const overall = anchoredOverall([dims.cc, dims.vo, dims.rd, dims.tf]);

  const worstSent = sents.slice().sort((a, b) => words(b) - words(a))[0] || text.slice(0, 120);
  const errSent = analysis.localErrors.length ? analysis.localErrors[0].mine : worstSent;
  const rdKey = kind === 'writing' ? 'readability' : 'listenability';

  const fixes = [];
  if (missing) fixes.push('You left ' + missing + ' required point unaddressed. Write one sentence for each required point before you elaborate on any of them.');
  if (analysis.templates.total) fixes.push('Remove the ' + analysis.templates.total + ' memorised phrase(s) — replace "' + analysis.templates.hits[0].name + '" with something specific to this situation.');
  if (errs) fixes.push('Fix the repeated ' + analysis.localErrors[0].type + ': you wrote "' + analysis.localErrors[0].mine + '" — it should be "' + analysis.localErrors[0].correct + '".');
  if (kind === 'writing' && (w < 150 || w > 200)) fixes.push('Your response was ' + w + ' words. Land between 150 and 200 — under-length costs Task Fulfillment directly.');
  if (kind === 'writing' && variance <= 4) fixes.push('Your sentences are all similar in length. Deliberately write one short sentence of under eight words after a long one.');
  if (kind === 'speaking' && analysis.fillers > 4) fixes.push('You used ' + analysis.fillers + ' filler words (um, like, you know). Replace each one with a silent pause — silence costs you nothing, fillers cost Listenability.');
  if (kind === 'speaking' && connectives < 3) fixes.push('Almost every clause stands alone. Join ideas with "because", "although", "which" and "even though" to show grammatical range.');
  if (analysis.timeUsedPct < 70) fixes.push('You used only ' + analysis.timeUsedPct + '% of your time. The unused minutes are free marks — spend them re-reading.');
  while (fixes.length < 3) fixes.push('Add one concrete example with a number, a name or a date — vague support is what holds most responses at CLB 7.');

  const D = {};
  D.content_coherence = { clb: dims.cc, evidence: worstSent.slice(0, 220), fix: 'Add a specific supporting detail (a number, a date, a named consequence) to your weakest idea.' };
  D.vocabulary = { clb: dims.vo, evidence: analysis.templates.total ? 'Template phrase used: "' + analysis.templates.hits[0].name + '"' : worstSent.slice(0, 220), fix: analysis.templates.total ? 'Replace memorised openers with wording specific to this scenario.' : 'Replace two general words (thing, good, very, a lot) with precise ones.' };
  D[rdKey] = { clb: dims.rd, evidence: String(errSent).slice(0, 220), fix: errs ? 'Correct the ' + analysis.localErrors[0].type + ' shown, then reread every sentence for the same pattern.' : 'Vary your sentence openings — three consecutive sentences begin the same way.' };
  D.task_fulfillment = { clb: dims.tf, evidence: missing ? 'Required point ' + (covered.indexOf(false) + 1) + ' is not addressed anywhere in the response.' : 'Length ' + w + ' words; time used ' + analysis.timeUsedPct + '%.', fix: missing ? 'Address every required point explicitly, in its own sentence.' : 'Keep the length in range and match the register to the recipient.' };

  return {
    dimensions: D,
    overall_clb: overall,
    top_3_fixes: fixes.slice(0, 3),
    rewritten_sample: '(Offline mode: no model rewrite available. Add your Anthropic API key in Settings to receive a rewritten sample one band above your current level.)',
    errors: analysis.localErrors.map(e => ({ type: e.type, mine: e.mine, correct: e.correct })),
    bullets_covered: covered,
    _offline: true
  };
}

/* ---------------- 30.7 bullet coverage detection ---------------- */
const STOP = new Set(('a an the and or but of to in on for with your you my me is are was were be been it its this that ' +
  'about from as at by if then than so not no do does did have has had will would can could should one two three ' +
  'each any all what which who whom whose how why when where more most some such into over under also').split(' '));
function keyTerms(s) {
  return [...new Set((String(s).toLowerCase().match(/[a-z][a-z'-]{2,}/g) || []).filter(w => !STOP.has(w)))];
}
function bulletCoverage(bullets, text) {
  const lower = ' ' + String(text || '').toLowerCase() + ' ';
  return (bullets || []).map(b => {
    const terms = keyTerms(b);
    if (!terms.length) return true;
    const hit = terms.filter(t => {
      const stem = t.length > 5 ? t.slice(0, Math.max(4, t.length - 2)) : t;
      return lower.includes(stem);
    }).length;
    return hit / terms.length >= 0.34;
  });
}

/* ---------------- 30.8 public rate() ---------------- */
async function rateResponse(kind, item, text, timeUsedPct, respSeconds) {
  const wordCount = words(text);
  const templates = detectTemplates(text);
  let localErrors = detectErrorsLocal(text);
  if (kind === 'speaking') {
    // Punctuation, capitalisation and sentence boundaries are artefacts of the
    // speech-recognition transcript, not the candidate's speech. Logging them
    // would poison the recurring-error table with errors nobody made.
    const ASR_ARTEFACT = new Set(['missing end punctuation', 'run-on sentences']);
    localErrors = localErrors.filter(e => !ASR_ARTEFACT.has(e.type) && e.mine !== 'lowercase "i"');
  }
  const register = kind === 'writing' && item.task === 1
    ? checkRegister(text, item)
    : { want: 'n/a', flags: [], ok: true };
  const bullets = kind === 'writing' && item.task === 1 ? item.bullets
    : kind === 'writing' ? ['choose one option explicitly', 'give reasons for the chosen option', 'address the other option']
      : null;
  const analysis = {
    wordCount, templates, localErrors, register,
    timeUsedPct: Math.round(timeUsedPct),
    fillers: (String(text).match(FILLER_RE) || []).length,
    wpm: respSeconds ? Math.round(wordCount / (respSeconds / 60)) : 0,
    bulletsCovered: bullets ? bulletCoverage(bullets, text) : []
  };

  if (!words(text)) {
    return {
      rating: {
        dimensions: {
          content_coherence: { clb: 0, evidence: '(no response)', fix: 'Produce a response.' },
          vocabulary: { clb: 0, evidence: '(no response)', fix: '—' },
          [kind === 'writing' ? 'readability' : 'listenability']: { clb: 0, evidence: '(no response)', fix: '—' },
          task_fulfillment: { clb: 0, evidence: '(no response)', fix: '—' }
        },
        overall_clb: 0, top_3_fixes: ['No response was recorded.'], rewritten_sample: '', errors: [], _offline: true
      }, analysis, source: 'none'
    };
  }

  if (API.available()) {
    try {
      let user = kind === 'writing' ? raterUserWriting(item, text, analysis) : raterUserSpeaking(item, text, analysis);
      const s = DB.settings();
      // An in-browser model cannot hold a full rating AND a rewrite in one reply
      // without truncating. Ask for the scores only, then fetch the rewrite
      // separately — two short replies parse where one long one does not.
      const compact = s.provider === 'browser';
      if (compact) {
        user = user.replace(/,"rewritten_sample":"\.\.\."/, '')
          .replace('Output this JSON exactly:', 'Keep every "evidence" under 20 words and every "fix" under 25 words. Output this JSON exactly:');
      }
      // A full four-dimension rating with evidence, fixes and a rewrite does not
      // fit in 1000 tokens; truncating it produces no rating at all.
      const out = await API.call(RATER_SYSTEM, user, Math.max(2000, s.maxTokens || 1000));
      const r = API.parseJSON(out);
      if (r && r.dimensions) {
        const rdKey = kind === 'writing' ? 'readability' : 'listenability';
        const keys = ['content_coherence', 'vocabulary', rdKey, 'task_fulfillment'];

        // Small models routinely omit a dimension or return 0. Left alone that
        // drags the lowest-anchored overall to nonsense, so any missing or
        // out-of-range dimension is refilled from the local heuristic rater.
        const fallback = heuristicRate(kind, item, text, analysis);
        const patched = [];
        keys.forEach(k => {
          const d = r.dimensions[k];
          const n = d ? Number(d.clb) : NaN;
          if (!d || !isFinite(n) || n < 3 || n > 12) {
            r.dimensions[k] = fallback.dimensions[k];
            patched.push(k);
          } else { d.clb = Math.round(n); }
        });
        if (!r.top_3_fixes || !r.top_3_fixes.length) r.top_3_fixes = fallback.top_3_fixes;
        if (patched.length) r._patched = patched;

        if (compact && !r.rewritten_sample) {
          try {
            const rw = await API.call(
              'You rewrite English test responses. You output only the rewritten text — no preamble, no explanation, no quotation marks.',
              'Rewrite the response below one CLB band higher. Keep the same ideas and the same length. Fix the grammar, ' +
              'replace memorised phrases with natural wording, and vary the sentence lengths.\n\n' + text,
              900);
            r.rewritten_sample = String(rw).trim();
          } catch (e) {
            r.rewritten_sample = '(The in-browser model could not produce a rewrite. A larger model, or a key-based provider, will.)';
          }
        }
        if (!r.rewritten_sample) r.rewritten_sample = fallback.rewritten_sample;

        const nums = keys.map(k => Number(r.dimensions[k].clb)).filter(n => !isNaN(n));
        // Enforce the lowest-anchored blend locally; never trust a generous overall.
        const computed = anchoredOverall(nums);
        r.overall_clb = Math.min(Number(r.overall_clb) || computed, computed);
        r.errors = Array.isArray(r.errors) ? r.errors : [];
        // merge local detector findings the model missed
        localErrors.forEach(le => {
          if (!r.errors.some(e => String(e.mine || '').toLowerCase() === le.mine.toLowerCase())) r.errors.push(le);
        });
        r.bullets_covered = r.bullets_covered || analysis.bulletsCovered;
        // If every dimension had to be refilled, this was not really a model rating.
        return { rating: r, analysis, source: patched.length === keys.length ? 'offline' : 'api' };
      }
    } catch (e) {
      console.warn('rating failed, using offline heuristic:', e.message);
      return { rating: heuristicRate(kind, item, text, analysis), analysis, source: 'offline', error: e.message };
    }
  }
  return { rating: heuristicRate(kind, item, text, analysis), analysis, source: 'offline' };
}
