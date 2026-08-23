/* ============================================================
   PART 27 — STRATEGY GUIDE FOR EVERY TASK TYPE
   One guide per part. Written for this project from the official
   test structure — no third-party guide text is reproduced.
   Shape: format (what you face) · trap (what costs most marks)
        · method (numbered) · caps (what holds a band down here)
   ============================================================ */
const TASK_GUIDES = {

/* ---------- LISTENING ---------- */
'listening:1': {
  name: 'Listening to Problem Solving',
  format: 'A three-part conversation between two people working through a problem. Questions come after each part, and you cannot return to a part once you have answered it. 8 questions.',
  trap: 'Treating it as three separate conversations. It is one story, and part three usually turns on a detail dropped casually in part one.',
  method: [
    'Before the audio, decide who the two speakers are and what each one wants. Almost every question turns on that.',
    'Track the problem, not the words. Ask yourself after each part: what changed, and what is still unresolved?',
    'Listen for conditions — "only if", "unless", "as long as". Those clauses are where the answer usually hides.',
    'Answer immediately while the part is fresh. Hesitating costs you the next part.'
  ],
  caps: 'The commonest loss is on the last two questions, because attention drops. Treat part three as the one that matters most.'
},
'listening:2': {
  name: 'Listening to a Daily Life Conversation',
  format: 'One relaxed conversation between two people about an everyday arrangement. 5 questions, all after the audio.',
  trap: 'Listening for facts and missing attitude. Several questions ask how someone feels about a plan, not what the plan is.',
  method: [
    'Note the relationship: friends, colleagues, neighbours. Tone questions follow from it.',
    'Track who proposes and who resists. The disagreement is where the questions live.',
    'Listen for the reversal — "actually", "on second thought", "but". Plans usually change once.',
    'Hold the final agreement in mind. It is almost always asked.'
  ],
  caps: 'Distractors are often things that were said but then rejected. Correct-sounding is not the same as still true at the end.'
},
'listening:3': {
  name: 'Listening for Information',
  format: 'A member of the public getting information from someone official — a pharmacist, a librarian, a counsellor. Dense with numbers, conditions and eligibility rules. 6 questions.',
  trap: 'Trying to memorise every figure. There are more numbers than questions, and most are decoys.',
  method: [
    'Listen for what the person is eligible for, what it costs, and what they must bring or do. Those three carry most questions.',
    'When you hear a number, immediately attach it to its noun. "Eight weeks" is useless; "eight weeks for the assessment" is an answer.',
    'Exceptions matter more than rules here. "Normally X, but if Y then Z" is a question every time.',
    'Note anything the official corrects or clarifies — misunderstandings are deliberately planted.'
  ],
  caps: 'A number attached to the wrong thing is the single most common wrong answer in this part.'
},
'listening:4': {
  name: 'Listening to a News Item',
  format: 'A single news reader, 190–230 words, no dialogue. Figures, an objection from some group, and an official response. 5 questions.',
  trap: 'News is written as an inverted pyramid — the most important fact comes first, and people are still settling when it arrives.',
  method: [
    'Be fully attentive from the first sentence. The main decision or change is usually stated within ten seconds.',
    'Separate three voices: what happened, who objects, and how the authority responded.',
    'Money and dates are usually asked. Attach each to whose money and which deadline.',
    'Listen for the concession — "however", "though", "the city says" — which marks the objection.'
  ],
  caps: 'Missing the first sentence costs two questions. There is no second chance in this part.'
},
'listening:5': {
  name: 'Listening to a Discussion',
  format: 'Three or four named speakers in a meeting. They disagree, refine each other\'s ideas, and reach a partial decision. 8 questions — the joint-longest part.',
  trap: 'Losing track of who said what. Most wrong answers are correct statements attributed to the wrong speaker.',
  method: [
    'Fix the names in the first fifteen seconds and hold a one-word position for each — cost, staffing, fairness.',
    'When a speaker changes position, note it. "I could support that" is asked more often than the original stance.',
    'Listen for who raises a constraint nobody had costed. That person is usually the subject of a question.',
    'The decision at the end is normally conditional. Note what it depends on.'
  ],
  caps: 'Eight questions on one passage means one lapse of attention costs several marks. This is the part to be freshest for.'
},
'listening:6': {
  name: 'Listening to Viewpoints',
  format: 'One speaker, 260–330 words, giving a nuanced personal opinion. Usually includes a concession and a change of mind. 6 questions.',
  trap: 'Hearing the opinion and stopping. The speaker almost always concedes something to the other side, and that concession is examined.',
  method: [
    'Establish the speaker\'s position early, then listen specifically for where they qualify it.',
    'Mark the pivot — "what changed my mind", "I used to think", "where I would push back".',
    'Distinguish what they believe from what they report others believing.',
    'The conclusion is usually conditional: they support X only if Y. Both halves get asked.'
  ],
  caps: 'Answers that state the opinion too simply are wrong here by design. The nuance is the point.'
},

/* ---------- READING ---------- */
'reading:1': {
  name: 'Reading Correspondence',
  format: 'A letter or email of 260–330 words, then six multiple-choice questions, then a short reply with five dropdown blanks. 11 questions — the largest reading part.',
  trap: 'Answering the multiple-choice from memory instead of returning to the text. The distractors are built from things the letter nearly says.',
  method: [
    'Read the letter once for the situation and the relationship, not for detail.',
    'For each question, find the sentence that proves it before choosing. If you cannot point at it, you are guessing.',
    'For the reply blanks, read the whole sentence including what follows the gap. The word after the blank usually decides it.',
    'Blanks test meaning and tone, not grammar — all four options usually fit grammatically.'
  ],
  caps: 'Inference questions ask what is implied, not stated. If an option is stated outright it is often the decoy.'
},
'reading:2': {
  name: 'Reading to Apply a Diagram',
  format: 'A table, schedule or floor plan alongside an email that refers to it without naming rows directly. Five matching questions, then three dropdown blanks. 8 questions.',
  trap: 'Reading the diagram first and trying to hold it in your head. It is reference material, not a passage.',
  method: [
    'Read the email first. It tells you which columns of the diagram matter and which are noise.',
    'Work one question at a time, returning to the diagram for each. Never answer from memory.',
    'Watch the "does not accept" and "except" columns. Most questions turn on an exclusion, not an inclusion.',
    'For the blanks, the answer is usually a figure sitting in the diagram — go and read it rather than reasoning.'
  ],
  caps: 'Time is the risk here. Reading the diagram end to end before the email wastes two or three minutes you need later.'
},
'reading:3': {
  name: 'Reading for Information',
  format: 'Four short paragraphs labelled A to D on one topic, and nine statements to assign. One statement belongs to none of them — the E option. 9 questions.',
  trap: 'Reading all four paragraphs carefully first. You will run out of time and remember little of it.',
  method: [
    'Skim each paragraph for its single job — what makes it different from the other three. One phrase each is enough.',
    'Read a statement, decide which job it belongs to, then confirm in that paragraph only.',
    'A paragraph can answer more than one statement. Do not eliminate it after using it once.',
    'Choose E only after checking all four. It is there once, and candidates both over-use and under-use it.'
  ],
  caps: 'Statements are paraphrases, never the paragraph\'s own words. Matching on a shared keyword is the classic trap.'
},
'reading:4': {
  name: 'Reading for Viewpoints',
  format: 'An opinion column of 380–460 words, five multiple-choice questions on it, then a reader comment with five dropdown blanks. 10 questions.',
  trap: 'Assuming the writer holds the strongest version of their view. These columns concede ground deliberately, and the questions target the concessions.',
  method: [
    'Read for the writer\'s position and, separately, for what they admit the other side gets right.',
    'Note the specific recommendation at the end — it is usually narrower than the argument implies.',
    'For the comment blanks, first decide whether the commenter agrees, disagrees or partly agrees. Every blank follows from that.',
    'The comment is a second voice. Do not attribute its opinions to the article.'
  ],
  caps: 'The longest passage in the test sits here. If you are behind on time, this is where it hurts.'
},

/* ---------- WRITING ---------- */
'writing:1': {
  name: 'Writing an Email',
  format: '27 minutes, 150–200 words, a named or role-based recipient and exactly three bullet points that must all be addressed.',
  trap: 'Writing a good email that quietly skips one bullet. One unaddressed bullet caps Task Fulfillment at 6 no matter how well the rest reads.',
  method: [
    'Before writing, put one line in the box for each bullet. Expand afterwards. It makes omission impossible.',
    'Decide the register from the recipient. A role rather than a name means formal, and a role-based salutation — "Dear Course Coordinator".',
    'Give at least one concrete specific: a date, a figure, a named consequence. Vagueness caps Content at 7.',
    'Spend the last four minutes reading it back sentence by sentence. Agreement and homophone errors are what cap Readability.'
  ],
  caps: 'Memorised openers cost more than they save. "I hope this email finds you well" is a phrase the marker discounts and this app penalises.'
},
'writing:2': {
  name: 'Responding to Survey Questions',
  format: '26 minutes, 150–200 words, two options with genuine trade-offs. You must pick one and defend it.',
  trap: 'Weighing both options evenly and never committing. A balanced essay scores worse here than a one-sided one.',
  method: [
    'State your choice in the first sentence. Not "both have merits" — name the option.',
    'Give two developed reasons, not four thin ones. Depth beats coverage in this task.',
    'Concede one real strength of the option you rejected, then explain why it does not change your decision.',
    'Ground at least one reason in something concrete — a household, a cost, a specific situation.'
  ],
  caps: 'Neither option is better. Markers reward the defence, not the choice, so pick the one you can support with a specific example.'
},

/* ---------- SPEAKING ---------- */
'speaking:1': {
  name: 'Giving Advice',
  format: '30 seconds preparation, 90 seconds speaking — the joint-longest response. Someone faces a decision with competing pressures.',
  trap: 'Running out of things to say at forty seconds and repeating yourself. Ninety seconds is much longer than it sounds.',
  method: [
    'Give the advice in one sentence first, then spend the rest justifying it. Do not build up to it.',
    'Use three reasons rather than one elaborated reason — it fills the time and shows range.',
    'Address the competing pressure directly. Acknowledging the hard part is what separates 8 from 10.',
    'Close with a concrete next step: what should they actually do tomorrow?'
  ],
  caps: 'Silence and filler both cost Listenability. If you run dry, add a specific example rather than restating.'
},
'speaking:2': {
  name: 'Talking about a Personal Experience',
  format: '30 seconds preparation, 60 seconds speaking. A specific past experience with several sub-parts to cover.',
  trap: 'Describing a general habit instead of one specific occasion. The task asks for an event, and generality caps Content.',
  method: [
    'Pick one occasion with a date or place attached. Specificity is the whole task.',
    'Set the scene in one sentence, spend most of the time on what happened, and end with what you felt or learned.',
    'Use past tense consistently — tense slips are the commonest grammar loss here.',
    'Do not choose the most dramatic story; choose the one you have the vocabulary for.'
  ],
  caps: 'Every sub-part in the prompt is examined. Missing the "how did you feel" half caps Task Fulfillment.'
},
'speaking:3': {
  name: 'Describing a Scene',
  format: '30 seconds preparation, 60 seconds speaking, describing a picture to someone who cannot see it.',
  trap: 'Listing objects. A list of nouns scores low however accurate it is.',
  method: [
    'Start with the setting and the overall impression in one sentence — where, when, what kind of place.',
    'Move systematically: foreground to background, or left to right. Wandering makes it hard to follow.',
    'Use prepositions of place heavily — behind, next to, in the corner. They are the vocabulary being tested.',
    'Describe what people are doing, not only what they are. Verbs raise the band.'
  ],
  caps: 'Do not interpret or predict here — that is the next task. Stick to what is visible.'
},
'speaking:4': {
  name: 'Making Predictions',
  format: '30 seconds preparation, 60 seconds speaking, on the same picture you just described.',
  trap: 'Describing the scene again. The marker has already scored your description; repeating it earns nothing.',
  method: [
    'Use future and modal forms throughout — will, is going to, is likely to, probably, I would expect.',
    'Predict for specific people in the scene, not the scene in general.',
    'Give a reason for each prediction, tied to something visible. That is where Content marks are.',
    'Cover a short horizon and a longer one: the next few minutes, then how it ends.'
  ],
  caps: 'This task exists to test future forms. Using present tense throughout caps Listenability regardless of content.'
},
'speaking:5': {
  name: 'Comparing and Persuading',
  format: '60 seconds to choose between two options, then 60 seconds preparation and 60 seconds speaking. You are persuading a specific person.',
  trap: 'Comparing evenly and never persuading. The task word is persuade, and neutrality fails it.',
  method: [
    'Choose fast. The choosing minute is not thinking time you can borrow later.',
    'Name your choice immediately, then give the strongest reason first in case you run short.',
    'Address the other option honestly — "I know it is cheaper, but" — then dismantle it.',
    'Speak to the person, not the room. "You would not have to drive" outperforms abstract argument.'
  ],
  caps: 'Neither option is correct. Choose the one with the more concrete supporting details in its description.'
},
'speaking:6': {
  name: 'Dealing with a Difficult Situation',
  format: '60 seconds preparation, 60 seconds speaking. An awkward problem where both choices have a cost, spoken to a real person.',
  trap: 'Apologising for the whole minute. Apology is the opening, not the content.',
  method: [
    'State the problem plainly in the first ten seconds. Do not bury it.',
    'Acknowledge the cost to the other person specifically — what they lose because of this.',
    'Offer at least two concrete options and let them choose. Offering a solution is what the task rewards.',
    'Close by confirming what happens next and when.'
  ],
  caps: 'Tone is scored here. Too casual reads as careless; too formal reads as evasive. Aim for direct and warm.'
},
'speaking:7': {
  name: 'Expressing Opinions',
  format: '30 seconds preparation, 90 seconds speaking. A debatable public issue on which you must take a position.',
  trap: 'Sitting on the fence to sound balanced. An unclear position caps Task Fulfillment.',
  method: [
    'Take a side in the first sentence, even if you hold it loosely.',
    'Two developed arguments with examples beat four assertions.',
    'Concede the strongest opposing point and answer it — that is what a 10 sounds like.',
    'Use the full ninety seconds. Stopping at fifty is the most common way to lose marks here.'
  ],
  caps: 'Opinions without support cap Content at 7. Every claim needs a because.'
},
'speaking:8': {
  name: 'Describing an Unusual Situation',
  format: '30 seconds preparation, 60 seconds speaking. You describe an unfamiliar object to someone who cannot see it, then say what you think it is for.',
  trap: 'Guessing what it is immediately and then having nothing left to say.',
  method: [
    'Describe before you interpret. Size, material, colour, shape — in that order.',
    'Compare to something familiar: "about the size of a shoebox". Comparison is the vocabulary being tested.',
    'Work through the distinctive features one at a time, naming where each sits.',
    'Only in the last fifteen seconds, speculate about its purpose, and say that you are speculating.'
  ],
  caps: 'Precision of description is the whole score. "A thing with a bit on the side" caps Vocabulary immediately.'
}
};
