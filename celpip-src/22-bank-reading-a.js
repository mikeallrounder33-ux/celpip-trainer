/* ============================================================
   PART 22 — OFFLINE ITEM BANK: READING, Parts 1–2
   Part 1 = 6 MC + 5 dropdown blanks (11 Q)
   Part 2 = 5 diagram-matching + 3 dropdown blanks (8 Q)
   ============================================================ */
const BANK_READING = [];

/* ---------------- PART 1 — Reading Correspondence (11 Q) ---------------- */
BANK_READING.push({
  id: 'R1-01', part: 1, clb: 7, title: 'A Job Opening at a Former Workplace',
  letter: {
    from: 'Renée Beauchamp <r.beauchamp@northvalefoods.ca>', to: 'Sam', date: 'March 4',
    subject: 'Something you should look at',
    body: `Hi Sam,

I know you said you were happy at the distribution centre, so ignore this if the timing is wrong — but I'd rather you hear it from me than see it on a job board.

We're posting a Quality Coordinator position next Monday. It's the role Halim held before he moved to Guelph, though it has changed quite a bit since. The audit paperwork has all moved to the new system, so the person coming in will spend less time filing and more time on the floor with the line supervisors. Honestly, that's why I thought of you. The part of the job that most people find tedious is the part you were unusually good at: getting supervisors to actually follow a corrective action instead of nodding at it.

Two things you should know before you decide. First, the shift pattern is not what you're used to. It's four days on, four off, and two of those four are afternoons finishing at eleven. Second, the posting is internal-first for ten days. That doesn't block you, but it does mean you'd be in the second round, and I can't tell you yet whether anyone inside is putting their name in.

The salary band is a little above what you were on when you left, and the benefits start on day one rather than after three months, which was the thing you complained about last time.

If you want to talk it through, I'm around Thursday afternoon or any time Friday. No pressure either way — and if you'd rather I didn't mention your name to anyone until you decide, just say so.

Renée`
  },
  mc: [
    { q: 'Why is Renée writing to Sam directly?', o: ['She wants him to apply immediately', 'She prefers he hear about it from her rather than from a job board', 'She needs a reference for another candidate', 'She is required to notify former employees'], a: 1, w: 'She says she would rather he hear it from her.' },
    { q: 'How has the Quality Coordinator role changed since Halim held it?', o: ['It now involves more filing', 'It has been moved to a different department', 'Paperwork moved to a new system, so more time is spent on the floor', 'It has become a part-time position'], a: 2, w: 'The audit paperwork moved to the new system.' },
    { q: 'Which quality does Renée value in Sam?', o: ['His speed at processing paperwork', 'His ability to get supervisors to follow through on corrective actions', 'His knowledge of the new software', 'His willingness to work nights'], a: 1, w: 'She calls it the part most people find tedious.' },
    { q: 'What is the disadvantage of the shift pattern?', o: ['It requires weekend work every week', 'Two of the four working days finish at eleven at night', 'The hours change without notice', 'It is only thirty hours per week'], a: 1, w: 'Four on, four off, with two afternoon shifts ending at eleven.' },
    { q: 'What does "internal-first for ten days" mean for Sam?', o: ['He cannot apply at all', 'He would be considered in a second round', 'He must wait ten days before contacting Renée', 'He needs an internal referral to apply'], a: 1, w: 'It does not block him but places him in the second round.' },
    { q: 'What improvement does Renée mention about benefits?', o: ['They now include dental coverage', 'They begin on the first day rather than after three months', 'They cost employees less', 'They extend to family members'], a: 1, w: 'She links it to something Sam complained about previously.' }
  ],
  reply: {
    header: 'From: Sam Ojo   To: Renée Beauchamp   Subject: Re: Something you should look at',
    text: `Hi Renée,

Thanks for thinking of me — the timing is actually {{1}} than you'd expect, since my team here is being restructured in June.

The shift pattern is my main {{2}}. Four days on is manageable, but the eleven o'clock finishes overlap with my daughter's schedule, so I'd need to work that out at home first.

I'm not worried about being in the second round. If someone internal is stronger, that's {{3}}. What I would like to know is whether the corrective-action piece is genuinely part of the role or something the posting mentions and nobody enforces.

Could we talk on {{4}}? Any time after one works for me.

For now, please {{5}} my name to yourself until I've spoken to my family.

Sam`
  },
  blanks: [
    { o: ['worse', 'better', 'stranger', 'later'], a: 1 },
    { o: ['advantage', 'hesitation', 'preference', 'recommendation'], a: 1 },
    { o: ['unfortunate', 'fair enough', 'unacceptable', 'surprising'], a: 1 },
    { o: ['Monday', 'Thursday', 'Saturday', 'Sunday'], a: 1 },
    { o: ['keep', 'send', 'forward', 'announce'], a: 0 }
  ]
});

BANK_READING.push({
  id: 'R1-02', part: 1, clb: 8, title: 'A Change to Parking Arrangements',
  letter: {
    from: 'Building Management, Cedarcrest Court', to: 'All Residents', date: 'September 12',
    subject: 'Underground parking — stall reassignment',
    body: `Dear Resident,

Beginning October 1, the underground parking level will be reorganised, and most residents will be assigned a different stall number than the one they currently use.

The reason is structural rather than administrative. The engineering assessment completed in July identified deterioration in the concrete slab along the east wall, in the area covering stalls 14 through 29. Those sixteen stalls must be taken out of use for the duration of the repair, which is expected to run from October through late February. Rather than displacing sixteen households and leaving everyone else untouched, we have chosen to redistribute all stalls so that the burden is shared. Approximately forty percent of residents will find their new stall further from the elevator lobby than their current one; the remainder will be closer or unchanged in walking distance.

Residents with a registered accessibility permit will keep priority placement near the lobby, and these placements have been made first. If you hold a permit and have not received confirmation by September 20, contact the office rather than assuming an error has been corrected.

Your new stall number will be posted on your door by September 25 and will also appear on the resident portal. Please do not move your vehicle before October 1; the line repainting is scheduled for the last weekend of September and vehicles parked in the wrong stall will delay it.

Visitor parking is unaffected. However, because sixteen stalls are out of service, we are temporarily suspending the second-vehicle allocation. Households currently using two stalls will keep one and may join a waiting list for the second, which we expect to clear in March.

We recognise this is an inconvenience, and we appreciate that it arrives without much warning. The alternative — waiting until the slab failed — was not one we were prepared to accept.

Cedarcrest Court Building Management`
  },
  mc: [
    { q: 'What is the reason for the reassignment?', o: ['A new resident allocation policy', 'Concrete deterioration requiring repair', 'An increase in the number of residents', 'A change of parking contractor'], a: 1, w: 'The July engineering assessment found slab deterioration.' },
    { q: 'Why is management redistributing all stalls rather than only the affected ones?', o: ['To reduce administrative work', 'So that the inconvenience is shared rather than falling on sixteen households', 'Because the portal cannot handle partial changes', 'To create additional visitor spaces'], a: 1, w: 'The letter states the burden is shared deliberately.' },
    { q: 'What should permit holders do if they receive no confirmation by September 20?', o: ['Wait until September 25', 'Assume the error has been corrected', 'Contact the office', 'Reapply for the permit'], a: 2, w: 'The letter warns explicitly against assuming it is fixed.' },
    { q: 'Why must residents not move their vehicles before October 1?', o: ['The new stalls are not yet assigned', 'Line repainting is scheduled and misparked cars will delay it', 'Insurance does not cover early moves', 'The elevator will be out of service'], a: 1, w: 'Repainting happens the last weekend of September.' },
    { q: 'What happens to households currently using two stalls?', o: ['They keep both stalls', 'They lose both stalls until March', 'They keep one and may join a waiting list', 'They must pay an additional fee'], a: 2, w: 'The second-vehicle allocation is suspended temporarily.' },
    { q: 'What tone does the final paragraph take?', o: ['Apologetic but firm about the necessity', 'Defensive and dismissive of complaints', 'Uncertain about whether the work is needed', 'Celebratory about the improvements'], a: 0, w: 'It acknowledges inconvenience while rejecting the alternative.' }
  ],
  reply: {
    header: 'From: Unit 807   To: Building Management   Subject: Re: Stall reassignment',
    text: `To the Building Manager,

Thank you for the {{1}} explanation. Knowing that the change comes from an engineering assessment rather than a policy decision makes it much easier to accept.

I hold an accessibility permit and I have not yet received the confirmation you mentioned, so I am writing rather than {{2}} that it has been handled.

I also want to raise one point about the second-vehicle suspension. My household uses the second stall for a vehicle that is registered to my father, who provides care three days a week. I understand the {{3}}, but I would ask whether care-related vehicles could be considered separately from convenience second vehicles.

Finally, could you confirm whether the March timeline for clearing the waiting list is {{4}} or an estimate?

I appreciate the work involved in reorganising the entire level and will keep my vehicle in its current stall {{5}} October 1.

Unit 807`
  },
  blanks: [
    { o: ['vague', 'detailed', 'unnecessary', 'brief'], a: 1 },
    { o: ['assuming', 'insisting', 'complaining', 'confirming'], a: 0 },
    { o: ['objection', 'constraint', 'preference', 'compliment'], a: 1 },
    { o: ['firm', 'irrelevant', 'incorrect', 'optional'], a: 0 },
    { o: ['during', 'since', 'until', 'without'], a: 2 }
  ]
});

BANK_READING.push({
  id: 'R1-03', part: 1, clb: 6, title: 'An Invitation to Coordinate a Community Garden',
  letter: {
    from: 'Wesley Tran, Riverbend Community League', to: 'Ingrid', date: 'April 2',
    subject: 'Would you take on the garden?',
    body: `Hi Ingrid,

You mentioned at the winter potluck that you'd be interested in doing more with the league, so I wanted to ask you about the community garden before we advertise it more widely.

Marta has coordinated the garden for six years and is stepping back this season. She's not disappearing — she's offered to stay on as an advisor for the first summer — but she wants someone else making the decisions.

Here's what the role actually involves. It is not gardening. The coordinator assigns the forty-two plots each spring, manages the waiting list, opens and closes the water line in May and October, and chairs four meetings a year. Marta estimates it takes about five hours a month from April to September and almost nothing over the winter, except for the plot lottery in March, which is a long weekend of work.

The hardest part, and I want to be honest about this, is the waiting list. There are twenty-six households on it and some have been waiting three years. Every spring the coordinator has to tell most of them no. Marta handled that well because she was straight with people rather than encouraging.

The league covers a small honorarium — three hundred dollars for the season — and you'd have access to the shed and the tool budget.

If you'd rather not, please just say so. I'd rather ask three people and get a real yes than talk one person into it.

Wesley`
  },
  mc: [
    { q: 'Why is Wesley writing to Ingrid before advertising the role?', o: ['She is the only qualified candidate', 'She expressed interest in doing more with the league', 'Marta recommended her specifically', 'The role must be filled by a member'], a: 1, w: 'She mentioned it at the winter potluck.' },
    { q: 'What will Marta continue to do?', o: ['Assign the plots each spring', 'Serve as an advisor for the first summer', 'Chair the four annual meetings', 'Manage the waiting list'], a: 1, w: 'She stays as advisor but wants someone else deciding.' },
    { q: 'What does Wesley emphasise about the role?', o: ['It requires expert gardening knowledge', 'It is mainly administrative rather than gardening', 'It is a full-time commitment', 'It involves fundraising'], a: 1, w: '"It is not gardening" — the tasks listed are organisational.' },
    { q: 'When is the workload heaviest?', o: ['May, when the water line opens', 'March, during the plot lottery', 'October, at closing', 'December, during budget planning'], a: 1, w: 'The lottery is described as a long weekend of work.' },
    { q: 'What does Wesley describe as the hardest part?', o: ['Managing the tool budget', 'Chairing meetings', 'Telling most waiting-list households no', 'Opening the water line'], a: 2, w: 'Twenty-six households, some waiting three years.' },
    { q: 'What was Marta\'s approach to the waiting list?', o: ['She was straightforward rather than encouraging', 'She gave people hope about next season', 'She avoided contacting them', 'She let the league board handle it'], a: 0, w: 'Wesley contrasts "straight with people" against "encouraging".' }
  ],
  reply: {
    header: 'From: Ingrid Halvorsen   To: Wesley Tran   Subject: Re: Would you take on the garden?',
    text: `Hi Wesley,

Thank you for asking me {{1}} rather than putting it on the notice board first.

I want to say yes, but I have one {{2}}. My work travel is heaviest in March, which is exactly when the lottery happens. If Marta would be willing to run the lottery with me in my first year, I could take everything else on {{3}}.

The waiting list doesn't worry me as much as you might expect. I would rather tell someone honestly that their odds are low than let them {{4}} for three years.

Could we meet before the water line opens so I can see how the plot assignments are recorded? Any evening next week is {{5}} for me.

Ingrid`
  },
  blanks: [
    { o: ['secretly', 'directly', 'formally', 'reluctantly'], a: 1 },
    { o: ['complaint', 'condition', 'objection', 'refusal'], a: 1 },
    { o: ['immediately', 'eventually', 'reluctantly', 'partly'], a: 0 },
    { o: ['wait', 'apply', 'complain', 'garden'], a: 0 },
    { o: ['impossible', 'fine', 'unlikely', 'crowded'], a: 1 }
  ]
});

BANK_READING.push({
  id: 'R1-04', part: 1, clb: 9, title: 'A Rescheduled Practicum Placement',
  letter: {
    from: 'Office of the Practicum Coordinator, Sandford College', to: 'Enrolled Students, PSW Program', date: 'January 8',
    subject: 'Winter placement — revised arrangements',
    body: `Dear Student,

This message concerns the winter practicum and contains information that affects your graduation date. Please read it in full before contacting the office.

Two of our four placement partners have reduced their intake for the winter term. Meadowbrook Lodge has withdrawn entirely following a change in its accreditation status, and Harbourview has cut its student capacity from twelve to five. The combined effect is that twenty-three students cannot be placed on the original schedule.

We have secured additional capacity through two new partners, but neither can begin before February 24. Students affected will therefore complete the placement between February 24 and May 9, rather than January 20 to April 4.

What this means in practice depends on your situation. If you are on the standard timeline and intended to graduate in June, the revised placement still concludes before the convocation deadline, and your graduation is unaffected. If you deferred a course from the fall term, the compressed schedule creates a conflict with the theory block, and you will need to meet an academic advisor before January 22. If you hold a conditional employment offer contingent on an April completion, contact this office directly — we have prepared a letter for employers explaining the institutional cause of the delay, and in our experience employers accept it when it comes from us rather than from the student.

Placement assignments will be released in two stages. The February 24 cohort will be notified by January 15. Students remaining on the original January 20 schedule were notified last week; if you have not heard from us, assume you are in the February cohort.

We are aware that this is disruptive, particularly for students who arranged childcare or reduced work hours around the original dates. Where documented costs have been incurred, the program has a small hardship fund, and applications are assessed within ten days.

Practicum Coordination, Sandford College`
  },
  mc: [
    { q: 'What caused the placement shortage?', o: ['A shortage of qualified instructors', 'One partner withdrew and another cut capacity', 'A change in provincial regulations', 'Higher student enrolment than expected'], a: 1, w: 'Meadowbrook withdrew; Harbourview cut twelve places to five.' },
    { q: 'Who must see an academic advisor before January 22?', o: ['All students in the program', 'Students who deferred a course from the fall term', 'Students graduating in June', 'Students with employment offers'], a: 1, w: 'The compressed schedule conflicts with their theory block.' },
    { q: 'What does the college offer students with conditional job offers?', o: ['A guaranteed January placement', 'A letter to employers explaining the institutional cause', 'A refund of tuition', 'An extension of the offer deadline'], a: 1, w: 'Employers accept it more readily coming from the college.' },
    { q: 'How should a student interpret not having heard from the office?', o: ['Their enrolment has lapsed', 'They are in the February cohort', 'They must reapply for placement', 'Their placement is cancelled'], a: 1, w: 'January-schedule students were notified last week.' },
    { q: 'Does the revised schedule affect June graduation for standard-timeline students?', o: ['Yes, it delays graduation to the fall', 'No, it still concludes before the convocation deadline', 'Only if they miss a single day', 'The letter does not say'], a: 1, w: 'Explicitly stated as unaffected.' },
    { q: 'What is required to access the hardship fund?', o: ['A recommendation from a placement partner', 'Documented costs incurred', 'Proof of financial need from a bank', 'Enrolment in a full course load'], a: 1, w: 'Applications relate to documented costs and are assessed in ten days.' }
  ],
  reply: {
    header: 'From: A. Nwosu   To: Practicum Coordination   Subject: Re: Winter placement',
    text: `Dear Practicum Coordination,

Thank you for setting out the changes so {{1}}. I have read the message in full before writing.

I did not receive a notification last week, so I am {{2}} that I am in the February cohort. Please correct me if that is wrong.

I deferred Theory 210 from the fall term, so I fall into the group that must meet an advisor. I have booked an appointment for January 16, which is {{3}} the deadline you set.

I also arranged reduced hours at my current job around the original dates and have {{4}} a documented loss of income for four weeks. I will apply to the hardship fund and attach my employer's confirmation.

I would be grateful if you could confirm my cohort {{5}} the January 15 notification, since my advisor will ask.

A. Nwosu`
  },
  blanks: [
    { o: ['briefly', 'clearly', 'reluctantly', 'privately'], a: 1 },
    { o: ['denying', 'assuming', 'refusing', 'proving'], a: 1 },
    { o: ['after', 'well before', 'exactly on', 'instead of'], a: 1 },
    { o: ['avoided', 'incurred', 'refunded', 'ignored'], a: 1 },
    { o: ['in place of', 'in advance of', 'in spite of', 'as a result of'], a: 1 }
  ]
});

BANK_READING.push({
  id: 'R1-05', part: 1, clb: 7, title: 'A Note About the Shared Fence',
  letter: {
    from: 'Delia Okafor, 118 Rosedale Ave', to: 'The Kowalczyk household, 120 Rosedale Ave', date: 'May 19',
    subject: 'The fence between our yards',
    body: `Hello,

I'm putting this in writing not because anything has gone wrong, but because I've learned the hard way that fence conversations go better when both sides can reread them.

The cedar fence between our yards is leaning noticeably toward your side near the back corner. I had a contractor look at it on Saturday. His view is that four posts have rotted at the base and that patching them would last perhaps two seasons, while replacing the back half properly would last fifteen to twenty years. The quotes are $1,180 for the patch and $4,600 for the replacement.

My understanding is that a fence on the property line is a shared responsibility and that costs are normally split evenly, though I've never actually done this before and I may have it wrong. I'm not asking you to commit to anything by replying.

What I'd suggest is this. Before either of us decides, we get a second quote — you choose the contractor, so it isn't only my person's opinion. If the second quote broadly agrees, we decide between patch and replacement together, and if we disagree, I'd be willing to pay the difference between whichever option you prefer and the one I prefer, rather than have this drag on.

One time pressure: the contractor said the lean will get worse quickly once the ground dries in July, and at that point the fence may come down on its own, which would be more expensive for both of us and possibly land on your shed.

I'm home most evenings. There's no rush this week.

Delia`
  },
  mc: [
    { q: 'Why is Delia writing rather than speaking in person?', o: ['She does not know the neighbours', 'Written notes let both sides reread the discussion', 'She is away from home', 'She wants a legal record'], a: 1, w: 'She says fence conversations go better in writing.' },
    { q: 'What is the contractor\'s assessment?', o: ['The whole fence must come down immediately', 'Four posts have rotted; patching lasts about two seasons', 'The fence is structurally sound', 'The lean is caused by the neighbour\'s shed'], a: 1, w: 'Patch versus a fifteen-to-twenty-year replacement.' },
    { q: 'How does Delia describe her knowledge of cost-sharing rules?', o: ['She is certain the costs are split evenly', 'She believes costs are shared but admits she may be wrong', 'She says the owner of the leaning side pays', 'She has consulted a lawyer'], a: 1, w: 'She explicitly allows that she may have it wrong.' },
    { q: 'Why does Delia suggest the neighbours choose the second contractor?', o: ['Her contractor is unavailable', 'So the decision does not rest on her contractor\'s opinion alone', 'Because they live closer to the back corner', 'To reduce the cost of the quote'], a: 1, w: 'She wants a check on her own quote.' },
    { q: 'What does Delia offer if they disagree on the option?', o: ['To pay the entire cost', 'To pay the difference between the two preferences', 'To delay the work until next year', 'To have the fence removed entirely'], a: 1, w: 'She offers to cover the gap rather than let it drag.' },
    { q: 'What creates time pressure?', o: ['A city bylaw deadline', 'The contractor\'s schedule filling up', 'The lean worsening once the ground dries in July', 'A rise in lumber prices'], a: 2, w: 'The fence may come down on its own after July.' }
  ],
  reply: {
    header: 'From: T. Kowalczyk   To: Delia Okafor   Subject: Re: The fence between our yards',
    text: `Hi Delia,

Thanks for writing this down — I {{1}} the approach, and you're right that it's easier to think about on paper.

We had noticed the lean but assumed it was {{2}} than it apparently is. Four rotted posts is more serious than we expected.

We're happy to get the second quote. My cousin does fencing in Brampton and I'd trust him to be {{3}} even though he knows us.

On patch versus replacement, our instinct is replacement, mostly because of the July timing you mentioned. Spending $1,180 twice in five years makes {{4}} sense to us than spending $4,600 once.

We won't need you to cover any difference. If we both land on replacement, an even split is {{5}}.

Can we talk Thursday evening?

T. Kowalczyk`
  },
  blanks: [
    { o: ['appreciate', 'resent', 'question', 'ignore'], a: 0 },
    { o: ['worse', 'newer', 'less serious', 'more urgent'], a: 2 },
    { o: ['generous', 'honest', 'cheap', 'quick'], a: 1 },
    { o: ['more', 'less', 'better', 'equal'], a: 1 },
    { o: ['unfair', 'fine with us', 'impossible', 'negotiable'], a: 1 }
  ]
});

/* ---------------- PART 2 — Reading to Apply a Diagram (8 Q) ---------------- */
BANK_READING.push({
  id: 'R2-01', part: 2, clb: 7, title: 'Weekend Workshop Schedule',
  diagram: {
    type: 'table', title: 'Brookfield Learning Centre — Saturday Workshops (Fall Term)',
    caption: 'All rooms are on the second floor unless marked. Fees include materials.',
    head: ['Workshop', 'Time', 'Room', 'Fee', 'Notes'],
    rows: [
      ['A. Resume Clinic', '9:00 – 10:30', '203', '$0', 'Drop-in; no registration'],
      ['B. Basic Bookkeeping', '9:00 – 12:00', '210', '$45', 'Bring a calculator'],
      ['C. Conversation Circle', '10:45 – 12:15', '205', '$0', 'Capacity 14; register by Thursday'],
      ['D. Intro to Woodworking', '13:00 – 16:00', 'Shop (ground floor)', '$80', 'Closed-toe shoes required'],
      ['E. Digital Photo Basics', '13:00 – 15:00', '203', '$25', 'Bring your own camera or phone']
    ]
  },
  email: {
    header: 'From: Priya Raman   To: Devon Clarke   Subject: Saturday plans',
    body: `Devon,

I finally sorted out my Saturday. I'm going to the one that runs the whole morning — the bookkeeping one — because my sister said the instructor is excellent. I'll need to remember my calculator.

You said you wanted something free that you could just show up to without signing up in advance. That one starts at nine as well, so we could ride in together.

After lunch, I'd like to do the photography session, but I don't own a camera. I'll use my phone.

One warning: if you're thinking about the afternoon session in the shop downstairs, you can't wear your sandals. They turn people away for that.

Priya`
  },
  mc: [
    { q: 'Which workshop is Priya attending in the morning?', o: ['A. Resume Clinic', 'B. Basic Bookkeeping', 'C. Conversation Circle', 'D. Intro to Woodworking'], a: 1, w: 'It runs 9:00–12:00 and requires a calculator.' },
    { q: 'Which workshop matches what Devon wants?', o: ['A. Resume Clinic', 'B. Basic Bookkeeping', 'C. Conversation Circle', 'E. Digital Photo Basics'], a: 0, w: 'Free, drop-in with no registration, starting at 9:00.' },
    { q: 'Which workshop does Priya plan to attend in the afternoon?', o: ['C. Conversation Circle', 'D. Intro to Woodworking', 'E. Digital Photo Basics', 'A. Resume Clinic'], a: 2, w: 'She will use her phone instead of a camera.' },
    { q: 'Which workshop has the footwear restriction Priya mentions?', o: ['B. Basic Bookkeeping', 'C. Conversation Circle', 'D. Intro to Woodworking', 'E. Digital Photo Basics'], a: 2, w: 'Closed-toe shoes required in the ground-floor shop.' },
    { q: 'Which workshop requires registration in advance?', o: ['A. Resume Clinic', 'C. Conversation Circle', 'D. Intro to Woodworking', 'E. Digital Photo Basics'], a: 1, w: 'Capacity 14, register by Thursday.' }
  ],
  reply: {
    header: 'From: Devon Clarke   To: Priya Raman   Subject: Re: Saturday plans',
    text: `Priya,

Good plan. I'll take the free drop-in at nine, which means we finish at {{1}} different times — you're in class until noon and I'm out by ten-thirty.

I'll wait for you rather than going home. And thanks for the warning about the shop; I was going to wear sandals, so you {{2}} me an embarrassing trip.

I might join you for the photo session since it only costs {{3}}.

Devon`
  },
  blanks: [
    { o: ['exactly the same', 'completely', 'slightly', 'very'], a: 3 },
    { o: ['saved', 'cost', 'gave', 'told'], a: 0 },
    { o: ['nothing', '$25', '$45', '$80'], a: 1 }
  ]
});

BANK_READING.push({
  id: 'R2-02', part: 2, clb: 8, title: 'Clinic Floor Plan',
  diagram: {
    type: 'floorplan', title: 'Riverbend Health Centre — Main Floor',
    caption: 'Entrance is at the south side. Corridor runs east–west through the centre of the building.',
    cols: 3,
    cells: [
      { k: 'A', label: 'Reception & Check-in', sub: 'Northwest corner' },
      { k: 'B', label: 'Lab / Blood Draw', sub: 'North, centre' },
      { k: 'C', label: 'Imaging (X-ray)', sub: 'Northeast corner' },
      { k: 'W', label: '— Corridor —', sub: 'runs east to west', full: true },
      { k: 'D', label: 'Waiting Area', sub: 'Southwest, next to entrance' },
      { k: 'E', label: 'Exam Rooms 1–6', sub: 'South, centre' },
      { k: 'F', label: 'Pharmacy', sub: 'Southeast corner, separate street door' }
    ]
  },
  email: {
    header: 'From: Nurse Coordinator   To: New patient   Subject: Your appointment on Tuesday',
    body: `Hello,

A few directions so your visit goes smoothly.

When you arrive through the south doors, the first thing you'll see on your left is where you sit and wait — please don't go straight down the corridor.

Check in first at the desk in the far corner diagonally opposite the waiting area; the staff there will confirm your health card.

Your blood work is scheduled before the doctor sees you. That department is directly across the corridor from the exam rooms, in the middle of the north side.

Your appointment itself is in room 4, which is in the block along the south side of the corridor.

If your doctor prescribes something, you can collect it without going back through the main entrance — that unit has its own door onto the street on the southeast side.

You do not need imaging on this visit, so ignore the northeast corner entirely.`
  },
  mc: [
    { q: 'Where should the patient go first?', o: ['A. Reception & Check-in', 'B. Lab / Blood Draw', 'D. Waiting Area', 'F. Pharmacy'], a: 0, w: 'Check in first at the desk diagonally opposite the waiting area — the northwest corner.' },
    { q: 'Which area is immediately on the left as the patient enters?', o: ['A. Reception', 'C. Imaging', 'D. Waiting Area', 'E. Exam Rooms'], a: 2, w: 'Southwest, next to the entrance.' },
    { q: 'Where is the blood work done?', o: ['B. Lab / Blood Draw', 'C. Imaging', 'E. Exam Rooms', 'F. Pharmacy'], a: 0, w: 'Middle of the north side, across the corridor from exam rooms.' },
    { q: 'Where is room 4?', o: ['A. Reception', 'B. Lab', 'E. Exam Rooms 1–6', 'C. Imaging'], a: 2, w: 'The block along the south side of the corridor.' },
    { q: 'Which area has its own street entrance?', o: ['C. Imaging', 'D. Waiting Area', 'E. Exam Rooms', 'F. Pharmacy'], a: 3, w: 'Southeast corner with a separate street door.' }
  ],
  reply: {
    header: 'From: Patient   To: Nurse Coordinator   Subject: Re: Your appointment on Tuesday',
    text: `Thank you — that is clearer than the map on your website.

So my route is: enter from the south, walk {{1}} the waiting area to reception, then cross the corridor north for blood work, then back {{2}} to the exam rooms.

I will not need the {{3}} corner at all this time.

See you Tuesday.`
  },
  blanks: [
    { o: ['into', 'past', 'through the middle of', 'away from'], a: 1 },
    { o: ['north', 'east', 'south', 'outside'], a: 2 },
    { o: ['northwest', 'northeast', 'southwest', 'southeast'], a: 1 }
  ]
});

BANK_READING.push({
  id: 'R2-03', part: 2, clb: 9, title: 'Recycling Depot Sorting Guide',
  diagram: {
    type: 'table', title: 'Kettle Creek Depot — Where Does It Go?',
    caption: 'Depot open Wed–Sun. Bins 1–5 are outdoors; the Hazardous counter is indoors and staffed.',
    head: ['Bin', 'Accepts', 'Does NOT accept', 'Fee'],
    rows: [
      ['1. Mixed Paper', 'Newspaper, office paper, flattened cardboard', 'Waxed or food-soiled cardboard', 'Free'],
      ['2. Rigid Plastics', 'Buckets, laundry baskets, plant pots', 'Plastic film and bags', 'Free'],
      ['3. Metals', 'Cans, small appliances, wire, pipe', 'Anything with a sealed refrigerant line', 'Free'],
      ['4. Wood & Yard', 'Untreated lumber, branches under 2 m', 'Painted or pressure-treated wood', '$5 / load'],
      ['5. Mattresses', 'Mattresses and box springs only', 'Furniture, upholstered chairs', '$18 each'],
      ['H. Hazardous Counter', 'Paint, solvents, batteries, propane cylinders', 'Commercial quantities (over 20 L)', 'Free, residential only']
    ]
  },
  email: {
    header: 'From: Ozzie   To: Renata   Subject: Depot run Saturday',
    body: `Renata,

Here's the pile from the basement clear-out and where I think each thing goes. Correct me if I'm wrong.

The old bar fridge — I assumed metals, but it still has its cooling line intact, so I don't think that bin will take it. We may need to book a separate pickup.

The four cans of leftover deck stain and the two dead drill batteries have to go to the staffed counter inside. That's free as long as we're residential, which we are.

The stack of flattened moving boxes goes in the first bin, except the pizza boxes with grease on them, which don't qualify.

The broken plastic laundry basket and three cracked plant pots go in the rigid bin. The bundle of plastic grocery bags does not — those go back to the supermarket.

The deck boards we pulled up are pressure-treated, so bin four won't take them either. That's the one that annoys me, because it's the biggest pile.

The guest room mattress is eighteen dollars, and the armchair is not accepted at all.

Ozzie`
  },
  mc: [
    { q: 'Which bin will NOT accept the bar fridge?', o: ['1. Mixed Paper', '3. Metals', '4. Wood & Yard', 'H. Hazardous Counter'], a: 1, w: 'Metals excludes anything with a sealed refrigerant line.' },
    { q: 'Where do the deck stain and drill batteries go?', o: ['2. Rigid Plastics', '3. Metals', '5. Mattresses', 'H. Hazardous Counter'], a: 3, w: 'Paint, solvents and batteries go to the staffed indoor counter.' },
    { q: 'Which item is rejected by Bin 1?', o: ['Flattened moving boxes', 'Newspaper', 'Grease-stained pizza boxes', 'Office paper'], a: 2, w: 'Food-soiled cardboard is excluded.' },
    { q: 'Which item does Bin 2 refuse?', o: ['Cracked plant pots', 'A plastic laundry basket', 'Plastic grocery bags', 'A plastic bucket'], a: 2, w: 'Plastic film and bags are excluded.' },
    { q: 'Why can the deck boards not go in Bin 4?', o: ['They are longer than two metres', 'They are pressure-treated', 'The bin charges a fee', 'They contain metal fasteners'], a: 1, w: 'Painted or pressure-treated wood is excluded.' }
  ],
  reply: {
    header: 'From: Renata   To: Ozzie   Subject: Re: Depot run Saturday',
    text: `Ozzie,

Your sorting looks right. Two corrections on cost: the only things we actually pay for are the mattress at eighteen dollars and, if we bring any clean lumber, {{1}} per load.

The armchair and the deck boards both need a {{2}} solution — neither is accepted at the depot.

And remember the depot is closed on {{3}}, so Saturday works but Tuesday would not.

Renata`
  },
  blanks: [
    { o: ['$5', '$18', 'nothing', '$20'], a: 0 },
    { o: ['cheaper', 'different', 'faster', 'temporary'], a: 1 },
    { o: ['Wednesdays', 'Sundays', 'Mondays and Tuesdays', 'weekends'], a: 2 }
  ]
});

BANK_READING.push({
  id: 'R2-04', part: 2, clb: 7, title: 'Transit Route Changes',
  diagram: {
    type: 'table', title: 'Route Changes Effective September 5',
    caption: 'Frequencies shown are peak weekday. "Peak" means 6:30–9:00 and 15:00–18:00.',
    head: ['Route', 'Change', 'New Frequency', 'Effect on riders'],
    rows: [
      ['12 Riverside', 'Extended north to Maple Ridge Mall', 'Every 15 min', 'Adds 6 min to end-to-end trip'],
      ['18 Crosstown', 'No change to route; frequency reduced', 'Every 20 min (was 12)', 'Longer waits, same stops'],
      ['24 Industrial', 'Weekday peak only; midday service cancelled', 'Every 30 min, peak only', 'No service 9:00–15:00'],
      ['31 University', 'Rerouted off Elm St onto Bergen Ave', 'Every 10 min', 'Elm St stops closed; 400 m walk to Bergen'],
      ['47 Night Owl', 'New route', 'Every 40 min, 23:00–4:00', 'First overnight service in the east end']
    ]
  },
  email: {
    header: 'From: Salim   To: Coworkers   Subject: Heads up about September 5',
    body: `Team,

Several of us will be affected by the changes next month.

If you catch the bus on Elm Street, those stops disappear entirely. You'll have a four-hundred-metre walk to a different avenue, though the buses themselves come more often than any other route.

Amina, the one you take to the plant now only runs at rush hour. If you keep doing the ten-to-two shift, there is no bus at all in the middle of the day.

For those of you on the crosstown, the route is identical but you'll wait almost twice as long as you do today.

Jonah, you asked about getting home after the late shift — there's finally something for you, running through the night in the east end, though only every forty minutes.

And the Riverside bus now goes all the way to the mall, which is good for shopping and slightly worse if you ride the whole line.

Salim`
  },
  mc: [
    { q: 'Which route has its Elm Street stops removed?', o: ['12 Riverside', '18 Crosstown', '31 University', '47 Night Owl'], a: 2, w: 'Rerouted onto Bergen Ave; Elm stops closed.' },
    { q: 'Which route is Amina\'s?', o: ['12 Riverside', '18 Crosstown', '24 Industrial', '47 Night Owl'], a: 2, w: 'Peak only, with no service between 9:00 and 15:00.' },
    { q: 'Which route keeps the same stops but runs less often?', o: ['12 Riverside', '18 Crosstown', '24 Industrial', '31 University'], a: 1, w: 'No route change; frequency drops from 12 to 20 minutes.' },
    { q: 'Which route helps Jonah after a late shift?', o: ['24 Industrial', '31 University', '47 Night Owl', '12 Riverside'], a: 2, w: 'Overnight service 23:00–4:00 in the east end.' },
    { q: 'Which route becomes longer end to end?', o: ['12 Riverside', '18 Crosstown', '31 University', '47 Night Owl'], a: 0, w: 'The northern extension adds six minutes.' }
  ],
  reply: {
    header: 'From: Amina   To: Salim   Subject: Re: Heads up about September 5',
    text: `Salim,

Thanks. My route being {{1}} only is a real problem — my shift starts at ten, which is exactly when there is nothing running.

I may switch to the crosstown and walk, even though the wait is going up to {{2}} minutes.

Jonah will be pleased. Every forty minutes overnight is far better than {{3}}.

Amina`
  },
  blanks: [
    { o: ['midday', 'peak', 'weekend', 'overnight'], a: 1 },
    { o: ['12', '15', '20', '30'], a: 2 },
    { o: ['nothing at all', 'every ten minutes', 'a taxi', 'the old schedule'], a: 0 }
  ]
});

BANK_READING.push({
  id: 'R2-05', part: 2, clb: 8, title: 'Conference Room Booking Grid',
  diagram: {
    type: 'table', title: 'Fourth Floor Meeting Spaces — Tuesday',
    caption: 'Rooms must be released 10 minutes before the next booking. AV = projector and video conferencing.',
    head: ['Room', 'Capacity', 'Features', 'Booked Tuesday'],
    rows: [
      ['Aspen', '6', 'Whiteboard only', '9:00–10:00, 14:00–15:00'],
      ['Birch', '12', 'AV, whiteboard', '10:00–12:00'],
      ['Cedar', '20', 'AV, tiered seating, no whiteboard', 'All day (training)'],
      ['Dogwood', '4', 'No AV, phone only', 'Free all day'],
      ['Elm Lounge', '10', 'AV, informal seating, no door', '13:00–14:00']
    ]
  },
  email: {
    header: 'From: Facilities   To: Project leads   Subject: Tuesday bookings',
    body: `Leads,

Please read before booking anything on Tuesday.

The largest space is unavailable — it's tied up with training from open to close.

The team running the client video call at 15:30 needs nine people and AV. The room that seats twelve is free by then, so use it.

Nadine, your one-to-one at 11:00 needs only two people and a phone. Take the small room that has nothing booked all day.

Whoever is doing the whiteboard planning session for five people at 10:30 — the six-person room is free between its two bookings, so it works.

Please avoid the informal space for anything confidential. It has AV, but it does not have a door.

Facilities`
  },
  mc: [
    { q: 'Which room is unavailable all day?', o: ['Aspen', 'Birch', 'Cedar', 'Dogwood'], a: 2, w: 'Cedar is booked for training all day.' },
    { q: 'Which room should the 15:30 client video call use?', o: ['Aspen', 'Birch', 'Dogwood', 'Elm Lounge'], a: 1, w: 'Birch seats 12, has AV, and is free after 12:00.' },
    { q: 'Which room suits Nadine\'s 11:00 one-to-one?', o: ['Aspen', 'Birch', 'Cedar', 'Dogwood'], a: 3, w: 'Two people, phone only, free all day.' },
    { q: 'Which room works for the 10:30 whiteboard session?', o: ['Aspen', 'Cedar', 'Dogwood', 'Elm Lounge'], a: 0, w: 'Aspen is free between 10:00 and 14:00 and has a whiteboard.' },
    { q: 'Why is Elm Lounge unsuitable for confidential meetings?', o: ['It has no AV', 'It seats too few people', 'It has no door', 'It is booked all day'], a: 2, w: 'Informal seating, AV, but no door.' }
  ],
  reply: {
    header: 'From: Nadine   To: Facilities   Subject: Re: Tuesday bookings',
    text: `Thanks — that resolves the clash I was worried about.

One question: the whiteboard session at 10:30 runs an hour, and Aspen's next booking is at {{1}}, so there is plenty of margin even with the ten-minute release rule.

Also, please note that Cedar has {{2}}, so the training group will need to bring a flip chart if they want one.

I'll take the four-person room, which needs no {{3}} at all for what I'm doing.

Nadine`
  },
  blanks: [
    { o: ['12:00', '13:00', '14:00', '15:30'], a: 2 },
    { o: ['no AV', 'no whiteboard', 'no seating', 'no door'], a: 1 },
    { o: ['AV', 'capacity', 'whiteboard', 'booking'], a: 0 }
  ]
});
