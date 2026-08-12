/* ============================================================
   PART 20 — OFFLINE ITEM BANK: LISTENING, Parts 1–3
   Every passage is original. Keys: s=speaker, t=text,
   q=question, o=options, a=answer index, w=why.
   ============================================================ */
const BANK_LISTENING = [];

/* ---------------- PART 1 — Listening to Problem Solving (8 Q, 3 blocks) ---------------- */
BANK_LISTENING.push({
  id: 'L1-01', part: 1, clb: 7, title: 'Water Coming Through the Ceiling',
  setting: 'Winnipeg apartment building',
  blocks: [
    {
      segments: [
        { s: 'Narrator', t: 'You will hear a conversation between a tenant and her building manager. Listen carefully. You will hear the conversation only once.' },
        { s: 'Dana', t: "Hi, this is Dana Okonjo in unit five-twelve. I have water coming through the ceiling in my bathroom. It started sometime last night. I noticed a brown ring around the light fixture this morning, and now there's a drop landing in the tub about every ten seconds." },
        { s: 'Rob', t: "Okay, thanks for calling it in right away. Is the light still working?" },
        { s: 'Dana', t: "It is, but I shut the breaker off for that room because I didn't want to take the chance. The part that worries me more is the paint. It's bubbling along about half a metre of the ceiling." },
        { s: 'Rob', t: "Understood. Have you spoken to the unit above you, six-twelve?" },
        { s: 'Dana', t: "I knocked twice this morning. Nobody answered. I don't really want to keep banging on their door." }
      ],
      questions: [
        { q: 'What was the first sign of a problem that Dana noticed?', o: ['Water dripping into the bathtub', 'A brown ring around the light fixture', 'Paint bubbling on the ceiling', 'A knock from the unit above'], a: 1, w: 'She saw the brown ring in the morning; the dripping is described as happening "now".' },
        { q: 'Why did Dana turn off the breaker?', o: ['The light had stopped working', 'The building manager told her to', 'She was concerned about an electrical risk', 'She wanted to save electricity'], a: 2, w: '"I didn\'t want to take the chance" — she acted on the risk, not on instructions.' },
        { q: 'What has Dana already done about unit 612?', o: ['She left a note on the door', 'She knocked twice with no answer', 'She called the tenant by phone', 'She asked another neighbour to check'], a: 1, w: 'She knocked twice that morning and nobody answered.' }
      ]
    },
    {
      segments: [
        { s: 'Rob', t: "Here's where we stand. Our regular plumber is booked solid until Thursday, but I can send the on-call technician this afternoon. The catch is that the on-call rate gets billed to the building, so I need to be reasonably confident it isn't something simple, like a tub overflowing upstairs." },
        { s: 'Dana', t: "How would you find that out?" },
        { s: 'Rob', t: "I'd have to get into six-twelve. Normally I give twenty-four hours' written notice, but I can enter immediately if I judge it an emergency, and active water damage usually qualifies." },
        { s: 'Dana', t: "So this afternoon, then." },
        { s: 'Rob', t: "I'd rather do that than sit on it for three days. What I need from you is a photo of the ceiling with the time on it, and keep that breaker off. And don't put a bucket in the tub — I want to see the actual drip rate when I come up." }
      ],
      questions: [
        { q: 'Why can the regular plumber not come today?', o: ['He only handles emergencies', 'His schedule is full until Thursday', 'The building has not paid his last invoice', 'He does not work on ceilings'], a: 1, w: 'Rob says the regular plumber is "booked solid until Thursday".' },
        { q: 'Under what condition can Rob enter unit 612 without 24 hours\' notice?', o: ['If the tenant is not home', 'If another tenant complains twice', 'If he judges the situation an emergency', 'If the on-call technician is with him'], a: 2, w: 'Immediate entry is allowed when he judges it an emergency; active water damage usually qualifies.' },
        { q: 'What does Rob specifically ask Dana NOT to do?', o: ['Put a bucket in the tub', 'Take photographs of the ceiling', 'Turn the breaker back on', 'Knock on the neighbour\'s door again'], a: 0, w: 'He wants to see the real drip rate himself.' }
      ]
    },
    {
      segments: [
        { s: 'Rob', t: "One more thing. If this turns out to be a burst washing-machine hose in six-twelve, the ceiling repair is still the building's cost, but damage to your own belongings goes through your tenant insurance, not ours." },
        { s: 'Dana', t: "I do have contents coverage. There's a wool rug and a laundry hamper sitting right under that spot." },
        { s: 'Rob', t: "Move them now, but photograph them where they are first. Adjusters are strict about that. I'll text you when I'm heading up — somewhere between two and four." },
        { s: 'Dana', t: "I'm at work until three. My roommate will be home all afternoon." },
        { s: 'Rob', t: "That's fine, as long as somebody over eighteen is there to let me in." }
      ],
      questions: [
        { q: 'Who would pay to replace Dana\'s damaged rug?', o: ['The building owner', 'The tenant in unit 612', 'Dana\'s own tenant insurance', 'The on-call technician\'s company'], a: 2, w: 'Rob says damage to her belongings goes through her tenant insurance.' },
        { q: 'What condition does Rob set for coming to the unit?', o: ['Dana must be there in person', 'Someone at least eighteen must let him in', 'The breaker must be switched back on', 'The insurance adjuster must arrive first'], a: 1, w: 'A roommate is acceptable as long as they are over eighteen.' }
      ]
    }
  ]
});

BANK_LISTENING.push({
  id: 'L1-02', part: 1, clb: 8, title: 'A Cancelled Swim Program',
  setting: 'Halifax community recreation centre',
  blocks: [
    {
      segments: [
        { s: 'Narrator', t: 'You will hear a conversation between a parent and a recreation programmer. Listen carefully. You will hear the conversation only once.' },
        { s: 'Amara', t: "I got an email at six this morning saying the Tuesday preschool swim is cancelled for the rest of the session. My daughter has been in that class since September." },
        { s: 'Terrance', t: "I'm sorry — that email went out later than it should have. We lost two certified instructors in the same week. One moved to Moncton and the other is off with a shoulder injury." },
        { s: 'Amara', t: "Can't you use the instructors from the Saturday classes?" },
        { s: 'Terrance', t: "Saturday is already running at the ratio limit. For preschool we're required to have one instructor for every four children in the water, and that's not a guideline, it's the provincial standard. I can't move someone from Saturday without cancelling a class there instead." }
      ],
      questions: [
        { q: 'Why was the Tuesday class cancelled?', o: ['Not enough children registered', 'The pool needs repairs', 'Two certified instructors became unavailable', 'The provincial standard changed'], a: 2, w: 'One instructor moved away and one is injured.' },
        { q: 'What does Terrance say about the instructor-to-child ratio?', o: ['It is a recommendation the centre tries to follow', 'It is a provincial requirement he cannot break', 'It applies only to Saturday classes', 'It was recently relaxed for preschoolers'], a: 1, w: 'He calls it "the provincial standard", not a guideline.' },
        { q: 'What does Amara suggest as a solution?', o: ['Hiring a new instructor immediately', 'Moving Saturday instructors to Tuesday', 'Combining two preschool classes', 'Getting a refund for the session'], a: 1, w: 'She asks whether Saturday instructors can be used.' }
      ]
    },
    {
      segments: [
        { s: 'Terrance', t: "Here's what I can actually offer. Option one: a full pro-rated credit on your account for the six remaining Tuesdays, which you can put toward any program, not just swimming." },
        { s: 'Amara', t: "A credit doesn't teach her to swim." },
        { s: 'Terrance', t: "Fair. Option two is the Thursday four-fifteen class at the Cole Harbour pool. There are two spots left. It's the same curriculum and the same level, but it's a twenty-minute drive from here." },
        { s: 'Amara', t: "Thursday at four-fifteen is tight. I don't finish until four." },
        { s: 'Terrance', t: "Then option three: I put her at the top of the waitlist for the spring session here, and I hold that place with no deposit. But spring doesn't start until the third week of April." }
      ],
      questions: [
        { q: 'What is the main limitation of the Cole Harbour option?', o: ['It teaches a different curriculum', 'It is at a higher level than her daughter\'s', 'It requires a twenty-minute drive and starts at 4:15', 'It costs more than the Tuesday class'], a: 2, w: 'Same curriculum and level; the problems are distance and the 4:15 start.' },
        { q: 'What is special about the account credit?', o: ['It can be used for any program, not only swimming', 'It expires at the end of the month', 'It is worth more than the original fee', 'It can be transferred to another family'], a: 0, w: 'He says it can go toward any program.' },
        { q: 'What does the third option require from Amara?', o: ['A deposit to hold the place', 'Waiting until the third week of April', 'Registering at a different centre', 'Providing a doctor\'s note'], a: 1, w: 'No deposit is needed, but spring starts in late April.' }
      ]
    },
    {
      segments: [
        { s: 'Amara', t: "Let me think out loud. If I take the spring waitlist, she goes four months without being in the water, and she's just at the point where she'll put her face in." },
        { s: 'Terrance', t: "That's a real concern. Skills at that age slide back quickly." },
        { s: 'Amara', t: "What about the family swim times? Could I work with her myself on Tuesdays?" },
        { s: 'Terrance', t: "That's actually a good bridge. Family swim runs Tuesday and Sunday, it's included in your membership, and the shallow end is roped off for exactly that. I'd take the Cole Harbour spot as well if you can get there even three weeks out of six — some continuity beats none." }
      ],
      questions: [
        { q: 'What is Amara\'s main objection to waiting until spring?', o: ['The spring fee will be higher', 'Her daughter will lose the skills she has gained', 'The spring class is at an inconvenient time', 'Her daughter will be too old for the class'], a: 1, w: 'She says her daughter is just learning to put her face in; Terrance confirms skills slide back.' },
        { q: 'What does Terrance finally recommend?', o: ['Taking only the account credit', 'Family swim plus the Cole Harbour class when possible', 'Waiting for spring and using family swim', 'Registering at a private swim school'], a: 1, w: 'He suggests taking the Cole Harbour spot even for three of six weeks, alongside family swim.' }
      ]
    }
  ]
});

BANK_LISTENING.push({
  id: 'L1-03', part: 1, clb: 9, title: 'A Transit Pass That Stopped Working',
  setting: 'Calgary transit customer service',
  blocks: [
    {
      segments: [
        { s: 'Narrator', t: 'You will hear a conversation between a transit rider and a customer service agent. Listen carefully. You will hear the conversation only once.' },
        { s: 'Wei', t: "My monthly pass stopped being accepted on Monday. The reader beeps twice and shows a red light. I've been paying cash all week and it's costing me about seven dollars a day." },
        { s: 'Joanne', t: "Let me look at the card number. Right — I see the issue. Your card was flagged as reported lost on the fourteenth." },
        { s: 'Wei', t: "I never reported anything lost. I've had it in my wallet the whole time." },
        { s: 'Joanne', t: "Then somebody entered the wrong digit on another file. It happens more than I'd like. The good news is the pass itself is paid through the end of the month; it's the card that's been deactivated, not the fare product." }
      ],
      questions: [
        { q: 'What is the actual cause of the problem?', o: ['Wei\'s pass expired at the end of the month', 'The card was wrongly flagged as lost', 'The card reader on that route is broken', 'Wei\'s payment was declined'], a: 1, w: 'Joanne concludes someone entered a wrong digit on another file.' },
        { q: 'What does Joanne clarify about the fare product?', o: ['It has already been refunded', 'It expired on the fourteenth', 'It is still paid through the end of the month', 'It must be repurchased at full price'], a: 2, w: '"The pass itself is paid through the end of the month."' },
        { q: 'How has Wei been travelling this week?', o: ['Paying cash fares each day', 'Using a friend\'s pass', 'Buying single-ride tickets online', 'Driving instead of taking transit'], a: 0, w: 'He says he has been paying cash, about seven dollars a day.' }
      ]
    },
    {
      segments: [
        { s: 'Joanne', t: "I can issue a replacement card right now and transfer the balance. That takes about four minutes. What I can't do at this counter is refund the cash you spent — that goes through a fare adjustment claim." },
        { s: 'Wei', t: "How long does a claim take?" },
        { s: 'Joanne', t: "Ten business days, and you need proof of travel. Did you keep the paper transfers?" },
        { s: 'Wei', t: "Some of them. Maybe three days' worth." },
        { s: 'Joanne', t: "Submit what you have. Here's the part people miss: because the deactivation was our error, the claim gets processed under the service-error category, and that category doesn't require the full set. Three days of transfers is enough to establish the pattern; they'll pay the whole week." }
      ],
      questions: [
        { q: 'What can Joanne do immediately?', o: ['Refund the cash fares', 'Issue a replacement card and transfer the balance', 'Approve the fare adjustment claim', 'Waive next month\'s pass fee'], a: 1, w: 'She can replace the card in about four minutes; refunds need a claim.' },
        { q: 'Why does Wei\'s incomplete proof still work?', o: ['Claims under fifty dollars need no proof', 'Service-error claims do not require the full set of transfers', 'The agent will vouch for him personally', 'Cash fares are automatically recorded'], a: 1, w: 'The service-error category accepts a pattern rather than every receipt.' },
        { q: 'How long does the claim take to process?', o: ['Four minutes', 'Three days', 'Ten business days', 'One month'], a: 2, w: 'Joanne states ten business days.' }
      ]
    },
    {
      segments: [
        { s: 'Wei', t: "Is there anything I should do so this doesn't happen again?" },
        { s: 'Joanne', t: "Register the new card to your account. An unregistered card is just a piece of plastic — if it's lost or wrongly flagged, there's no record tying it to you. Registered cards can be frozen and restored in a minute, from your phone." },
        { s: 'Wei', t: "I assumed buying the monthly pass online had already registered it." },
        { s: 'Joanne', t: "That's the most common misunderstanding we get. Buying a product loads value onto the card. Registering links the card to a person. They're two separate steps, and only the second one protects you." }
      ],
      questions: [
        { q: 'What does Joanne advise Wei to do?', o: ['Keep every paper transfer for a year', 'Register the new card to his account', 'Buy passes at the counter instead of online', 'Switch to a monthly cash budget'], a: 1, w: 'Registration is what ties the card to a person.' },
        { q: 'What misunderstanding does Joanne describe as common?', o: ['That cash fares are refundable', 'That buying a pass online also registers the card', 'That passes work on all routes', 'That replacement cards cost money'], a: 1, w: 'She explains loading value and registering are separate steps.' }
      ]
    }
  ]
});

/* ---------------- PART 2 — Daily Life Conversation (5 Q) ---------------- */
BANK_LISTENING.push({
  id: 'L2-01', part: 2, clb: 6, title: 'Sharing a Ride to Work',
  setting: 'Mississauga office',
  blocks: [{
    segments: [
      { s: 'Narrator', t: 'You will hear a conversation between two coworkers. Listen carefully. You will hear the conversation only once.' },
      { s: 'Priya', t: "You drive in from Streetsville, don't you? I just moved to Erin Mills and the bus takes me an hour and ten each way." },
      { s: 'Marcus', t: "I do, and I go right past the Erin Mills terminal. I'd be happy to take you, honestly — the carpool lane on the 403 saves me about twelve minutes, and you need two people to use it." },
      { s: 'Priya', t: "That's a real offer? I'd want to pay something toward gas." },
      { s: 'Marcus', t: "Let's not make it complicated. Cover a tank once a month and we're even. The bigger question is timing. I leave at seven-fifteen sharp because after seven-thirty the Eglinton merge falls apart." },
      { s: 'Priya', t: "Seven-fifteen is earlier than I need to be here, but earlier is survivable. What about going home?" },
      { s: 'Marcus', t: "That's where it gets messy. Tuesdays and Thursdays I pick up my son from hockey at five-forty, so I leave at four-thirty. Other days I'm flexible until about six." },
      { s: 'Priya', t: "I can take the bus home on Tuesdays and Thursdays. Half a commute back is still half a commute back." },
      { s: 'Marcus', t: "Then let's try it for two weeks and see whether we still like each other." }
    ],
    questions: [
      { q: 'What is Marcus\'s practical reason for wanting a passenger?', o: ['He dislikes driving alone', 'Two people allow him to use the carpool lane', 'He wants help paying for parking', 'His car insurance is cheaper'], a: 1, w: 'The carpool lane saves him twelve minutes and needs two people.' },
      { q: 'What does Marcus suggest about payment?', o: ['Priya should pay half the gas weekly', 'No payment at all', 'Covering one tank of gas per month', 'Splitting the cost of a monthly parking pass'], a: 2, w: '"Cover a tank once a month and we\'re even."' },
      { q: 'Why does Marcus leave at 7:15 exactly?', o: ['His shift starts at 7:30', 'Traffic at the Eglinton merge worsens after 7:30', 'The carpool lane closes at 7:30', 'He drops his son off first'], a: 1, w: 'He says the Eglinton merge falls apart after seven-thirty.' },
      { q: 'What is the problem with the return trip?', o: ['Marcus works later than Priya', 'Marcus leaves early on Tuesdays and Thursdays for hockey', 'Priya finishes at different times each day', 'The carpool lane is closed in the evening'], a: 1, w: 'He picks up his son from hockey those two days.' },
      { q: 'What do they agree to do?', o: ['Try the arrangement for two weeks', 'Ask a third coworker to join', 'Start after the new year', 'Alternate cars each week'], a: 0, w: 'Marcus proposes a two-week trial.' }
    ]
  }]
});

BANK_LISTENING.push({
  id: 'L2-02', part: 2, clb: 7, title: 'Planning a Weekend at the Park',
  setting: 'Ontario provincial park trip',
  blocks: [{
    segments: [
      { s: 'Narrator', t: 'You will hear a conversation between two friends. Listen carefully. You will hear the conversation only once.' },
      { s: 'Jasmine', t: "The reservation window for Killarney opens Friday at seven in the morning. If we're not online at seven exactly, the waterfront sites are gone in about ninety seconds." },
      { s: 'Owen', t: "I've heard that. Can we book more than one site and cancel later?" },
      { s: 'Jasmine', t: "Technically yes, but the cancellation fee is thirteen dollars per site, and they've started limiting how many reservations one account can hold. I'd rather we agree on a first and second choice tonight." },
      { s: 'Owen', t: "My first choice is anything on George Lake. My second is a backcountry site, but only if Deb is coming, because she's the one who can actually read a topographic map." },
      { s: 'Jasmine', t: "Deb texted this morning. She's out — her sister's wedding is that weekend." },
      { s: 'Owen', t: "Then scratch backcountry. Car camping it is." },
      { s: 'Jasmine', t: "One more thing: there's a fire ban in effect right now and the forecast is dry. Assume we're cooking on the camp stove, so we need two fuel canisters, not one." },
      { s: 'Owen', t: "I'll pick those up. You handle the reservation, since your internet is faster than mine." }
    ],
    questions: [
      { q: 'Why must they be online at exactly 7 a.m.?', o: ['The website closes at 7:05', 'Waterfront sites are taken within about ninety seconds', 'Prices increase after 7 a.m.', 'Only early bookings avoid the fee'], a: 1, w: 'Jasmine says the waterfront sites go in ninety seconds.' },
      { q: 'Why does Jasmine discourage booking multiple sites?', o: ['It is not allowed at all', 'There is a $13 cancellation fee per site and a reservation limit', 'The park requires payment in full', 'They would not be refunded at all'], a: 1, w: 'She cites the fee and the limit on reservations per account.' },
      { q: 'Why is the backcountry option dropped?', o: ['The trails are closed', 'Owen has never camped in the backcountry', 'Deb, who reads maps, cannot come', 'It costs more than car camping'], a: 2, w: 'Owen only wanted backcountry if Deb was coming.' },
      { q: 'What does the fire ban mean for their planning?', o: ['They cannot camp at all', 'They must bring extra stove fuel', 'They need a special permit', 'They must cook before arriving'], a: 1, w: 'Cooking on the camp stove means two fuel canisters.' },
      { q: 'What task does Owen take on?', o: ['Making the reservation', 'Buying the fuel canisters', 'Contacting Deb', 'Checking the weather forecast'], a: 1, w: 'He says he will pick up the canisters.' }
    ]
  }]
});

BANK_LISTENING.push({
  id: 'L2-03', part: 2, clb: 6, title: 'The Shovelling Rota',
  setting: 'Edmonton residential street',
  blocks: [{
    segments: [
      { s: 'Narrator', t: 'You will hear a conversation between two neighbours. Listen carefully. You will hear the conversation only once.' },
      { s: 'Hal', t: "I saw the bylaw notice on your door this morning. Did you get one too, or just me?" },
      { s: 'Rosa', t: "Just you, I think. The city gives you forty-eight hours after a snowfall to clear the public walk. Mine faces the lane, so the rule works differently for me." },
      { s: 'Hal', t: "Forty-eight hours is fine when I'm home. The trouble is I drive to Fort McMurray for eight days at a stretch." },
      { s: 'Rosa', t: "Then you need a standing arrangement, not good intentions. The teenager at number fourteen charges twenty dollars a clear, and he's reliable, but he only does it if you text him." },
      { s: 'Hal', t: "I'd have to text him from the road every time it snows." },
      { s: 'Rosa', t: "Or you pay him a flat rate for the season — I think it's two hundred — and he watches the forecast himself. That's what the Alvarezes do." },
      { s: 'Hal', t: "Two hundred for the whole winter is less than one bylaw fine, isn't it?" },
      { s: 'Rosa', t: "The first fine is two-fifty, and they can bill you for city crews on top of that. Take the flat rate." }
    ],
    questions: [
      { q: 'Why did only Hal receive a notice?', o: ['Rosa cleared her walk on time', 'Rosa\'s property faces the lane, so different rules apply', 'Rosa has an exemption for her age', 'Hal\'s neighbour complained about him'], a: 1, w: 'She says the rule works differently because her walk faces the lane.' },
      { q: 'What is Hal\'s central difficulty?', o: ['He has no snow shovel', 'He is away for eight days at a time', 'He disagrees with the bylaw', 'He cannot afford to pay anyone'], a: 1, w: 'He drives to Fort McMurray for eight-day stretches.' },
      { q: 'What is the drawback of paying per clearing?', o: ['It costs more overall', 'Hal must text from the road every snowfall', 'The teenager is unreliable', 'The city does not accept it'], a: 1, w: 'The teenager only comes if texted.' },
      { q: 'What does the seasonal flat rate include?', o: ['Clearing the road as well as the walk', 'The teenager watching the forecast himself', 'A guarantee against bylaw fines', 'Salt and sand supplies'], a: 1, w: 'With the flat rate the teenager monitors the forecast.' },
      { q: 'How much is the first bylaw fine?', o: ['$20', '$200', '$250', '$480'], a: 2, w: 'Rosa says the first fine is two-fifty, plus possible city crew charges.' }
    ]
  }]
});

BANK_LISTENING.push({
  id: 'L2-04', part: 2, clb: 8, title: 'The Grocery Budget Conversation',
  setting: 'Vancouver shared apartment',
  blocks: [{
    segments: [
      { s: 'Narrator', t: 'You will hear a conversation between two roommates. Listen carefully. You will hear the conversation only once.' },
      { s: 'Nadia', t: "I added up the shared grocery spending for October. It was six hundred and forty dollars, which is a hundred and sixty more than September." },
      { s: 'Colin', t: "Some of that is just prices. Butter alone went up more than a dollar." },
      { s: 'Nadia', t: "Prices are part of it. The other part is that we shopped eleven separate times, and nine of those were after seven in the evening, hungry, with no list." },
      { s: 'Colin', t: "That's fair. What are you proposing — a single big shop?" },
      { s: 'Nadia', t: "One main shop on Sunday morning, one small top-up midweek for produce and milk. And we cook double portions twice a week so there's something in the fridge on the nights we'd otherwise order in." },
      { s: 'Colin', t: "The ordering-in is really the leak. That's not even in the six-forty." },
      { s: 'Nadia', t: "No, it isn't. That's another two hundred on top, roughly." },
      { s: 'Colin', t: "Okay. Sunday shop, midweek top-up, batch cooking. But I want a hard rule that neither of us shops alone after work — that's the trigger." }
    ],
    questions: [
      { q: 'By how much did October grocery spending rise?', o: ['$160', '$200', '$480', '$640'], a: 0, w: 'Six hundred and forty in October versus a hundred and sixty less in September.' },
      { q: 'What does Nadia identify as the behavioural problem?', o: ['Buying premium brands', 'Shopping eleven times, often late and hungry without a list', 'Shopping at expensive stores', 'Cooking too many different meals'], a: 1, w: 'Nine of eleven trips were after 7 p.m., hungry, listless.' },
      { q: 'What does Colin call "the real leak"?', o: ['The price of butter', 'The midweek top-up shop', 'Ordering food in', 'Buying too much produce'], a: 2, w: 'He says ordering in is the leak and it is not in the $640.' },
      { q: 'Roughly how much extra is spent on ordering in?', o: ['$100', '$160', '$200', '$640'], a: 2, w: 'Nadia says roughly another two hundred.' },
      { q: 'What rule does Colin insist on?', o: ['A weekly spending cap', 'Neither roommate shops alone after work', 'Only shopping at one store', 'Splitting all costs by receipt'], a: 1, w: 'He calls shopping alone after work "the trigger".' }
    ]
  }]
});

/* ---------------- PART 3 — Listening for Information (6 Q) ---------------- */
BANK_LISTENING.push({
  id: 'L3-01', part: 3, clb: 8, title: 'The Medication Review Program',
  setting: 'Community pharmacy, Saskatoon',
  blocks: [{
    segments: [
      { s: 'Narrator', t: 'You will hear a conversation between a customer and a pharmacist. Listen carefully. You will hear the conversation only once.' },
      { s: 'Customer', t: "The sticker on my bag says I'm eligible for a medication review. What is that, exactly?" },
      { s: 'Pharmacist', t: "It's a scheduled appointment, usually twenty to thirty minutes, where we go through everything you take — prescriptions, over-the-counter products, vitamins, and herbal supplements — and check them against each other." },
      { s: 'Customer', t: "Everything? I take a fish oil capsule; surely that doesn't matter." },
      { s: 'Pharmacist', t: "Fish oil is exactly the kind of thing that matters. At higher doses it affects clotting, and if you're also on a blood thinner, that combination is worth knowing about. The supplements people don't mention are the ones that cause surprises." },
      { s: 'Customer', t: "Who qualifies for it?" },
      { s: 'Pharmacist', t: "In this province, you qualify if you take three or more prescription medications for a chronic condition, or if you've been discharged from hospital in the past thirty days. The province covers one review per year, and a follow-up if something changes." },
      { s: 'Customer', t: "Is there a cost to me?" },
      { s: 'Pharmacist', t: "Not for the annual review. If you want a second one in the same year without a qualifying change, that's a private fee, and it's forty dollars." },
      { s: 'Customer', t: "What should I bring?" },
      { s: 'Pharmacist', t: "Bring the actual bottles, not a list. People copy their lists wrong more often than you'd expect, and the bottles tell me the dose, the prescriber, and how much is left, which tells me whether you're actually taking it." }
    ],
    questions: [
      { q: 'How long does a medication review usually take?', o: ['Ten minutes', 'Twenty to thirty minutes', 'About an hour', 'It varies with no set length'], a: 1, w: 'The pharmacist states twenty to thirty minutes.' },
      { q: 'Why does the pharmacist care about fish oil?', o: ['It is expensive and usually unnecessary', 'It can affect clotting and interact with blood thinners', 'It reduces the effect of vitamins', 'It is not approved in Canada'], a: 1, w: 'High doses affect clotting; the blood-thinner combination matters.' },
      { q: 'Which person qualifies for the covered review?', o: ['Anyone who fills a prescription at the pharmacy', 'Someone taking three or more prescriptions for a chronic condition', 'Someone over sixty-five only', 'Someone taking any herbal supplement'], a: 1, w: 'Three or more chronic prescriptions, or recent hospital discharge.' },
      { q: 'How much does a second review in the same year cost without a qualifying change?', o: ['Nothing', '$20', '$40', '$75'], a: 2, w: 'A private fee of forty dollars.' },
      { q: 'Why does the pharmacist want the actual bottles?', o: ['To verify the pharmacy dispensed them', 'Because lists are often copied incorrectly and bottles show dose and quantity left', 'To dispose of expired medication', 'Because the province requires it'], a: 1, w: 'Bottles reveal dose, prescriber, and how much is left.' },
      { q: 'What does the remaining quantity in a bottle tell the pharmacist?', o: ['Whether the medication has expired', 'Whether the patient is actually taking it', 'Whether the dose was correct', 'Whether a refill is covered'], a: 1, w: 'He says it shows whether the patient is actually taking it.' }
    ]
  }]
});

BANK_LISTENING.push({
  id: 'L3-02', part: 3, clb: 7, title: 'New Rules at the Public Library',
  setting: 'Public library, Ottawa',
  blocks: [{
    segments: [
      { s: 'Narrator', t: 'You will hear a conversation between a library user and a staff member. Listen carefully. You will hear the conversation only once.' },
      { s: 'User', t: "I got a notice saying the library has gone fine-free. Does that mean I can keep books as long as I like?" },
      { s: 'Staff', t: "Not quite. We removed daily overdue fines, but the loan period hasn't changed — three weeks for books, one week for new releases and DVDs." },
      { s: 'User', t: "So what happens if I'm late?" },
      { s: 'Staff', t: "Nothing for the first two weeks past the due date. At twenty-one days overdue, the system marks the item lost and bills you the replacement cost. That charge disappears the moment you bring the item back, even if it's months later." },
      { s: 'User', t: "And renewals?" },
      { s: 'Staff', t: "Items renew automatically up to three times, unless someone else has placed a hold. If there's a hold, no renewal, and you'll get an email three days before it's due." },
      { s: 'User', t: "What about damage? My toddler got at a picture book last month." },
      { s: 'Staff', t: "Damage is separate from overdue policy and we still charge for it — but bring it in and let us look. We only bill when the item can't circulate. A bent corner is fine. Missing pages or water damage isn't." },
      { s: 'User', t: "Has removing fines changed anything?" },
      { s: 'Staff', t: "Return rates went up, not down. What actually changed was the number of people who came back after years away because they were embarrassed about an old two-dollar balance." }
    ],
    questions: [
      { q: 'What has changed under the fine-free policy?', o: ['Loan periods are longer', 'Daily overdue fines were removed', 'Replacement costs were eliminated', 'Renewals became unlimited'], a: 1, w: 'Loan periods are unchanged; only daily fines were removed.' },
      { q: 'What happens at 21 days overdue?', o: ['The account is closed', 'The item is marked lost and billed at replacement cost', 'A daily fine begins', 'The item is renewed automatically'], a: 1, w: 'It is billed as lost, and the charge is removed on return.' },
      { q: 'When will an item NOT renew automatically?', o: ['When it is a new release', 'When another user has placed a hold', 'After one renewal', 'When the account has a balance'], a: 1, w: 'Holds block automatic renewal.' },
      { q: 'How is damage handled?', o: ['It is also fine-free now', 'It is charged only if the item can no longer circulate', 'It always costs the full replacement price', 'It is forgiven for children\'s books'], a: 1, w: 'They bill only when the item cannot circulate.' },
      { q: 'What was the effect on return rates?', o: ['They fell noticeably', 'They stayed the same', 'They went up', 'The library did not measure them'], a: 2, w: 'The staff member says return rates went up.' },
      { q: 'What surprising result does the staff member mention?', o: ['More donations of used books', 'People returned after years away, having avoided small old balances', 'A drop in new memberships', 'More damaged items overall'], a: 1, w: 'Embarrassment about a small old balance had kept people away.' }
    ]
  }]
});

BANK_LISTENING.push({
  id: 'L3-03', part: 3, clb: 9, title: 'A Bridging Program for Internationally Trained Workers',
  setting: 'Employment services office, Toronto',
  blocks: [{
    segments: [
      { s: 'Narrator', t: 'You will hear a conversation between a client and an employment counsellor. Listen carefully. You will hear the conversation only once.' },
      { s: 'Client', t: "I was an accountant for nine years before I came here. Everyone tells me to take the bridging program, but nobody explains what it actually does." },
      { s: 'Counsellor', t: "A bridging program isn't a second degree. It's built to close the specific gap between the training you already have and what a Canadian employer or regulator expects. For accounting, that gap is usually three things: Canadian tax law, workplace communication norms, and the documentation standards used in audits here." },
      { s: 'Client', t: "How long?" },
      { s: 'Counsellor', t: "Eight months part-time, or five months if you can attend full-time. Both include a placement, and the placement is the part that matters — about sixty percent of participants are hired by their placement employer or a referral from them." },
      { s: 'Client', t: "Is it free?" },
      { s: 'Counsellor', t: "Tuition is subsidized down to four hundred and fifty dollars. What people underestimate is the cost of not earning during the full-time option. Most people I see choose part-time for that reason, even though it's three months longer." },
      { s: 'Client', t: "What do I need to apply?" },
      { s: 'Counsellor', t: "A credential assessment, proof of language at CLB seven or higher, and two years of documented experience in the field. You clearly have the experience. The assessment takes about eight weeks, so start it before anything else." },
      { s: 'Client', t: "My language test is from two years ago." },
      { s: 'Counsellor', t: "Then it's expired for this purpose — most programs want a result under two years old. Book the test now; that's your bottleneck, not the application." }
    ],
    questions: [
      { q: 'What is a bridging program designed to do?', o: ['Replace a foreign degree with a Canadian one', 'Close the specific gap between existing training and Canadian expectations', 'Provide temporary income while job searching', 'Prepare students for university admission'], a: 1, w: 'The counsellor explicitly says it is not a second degree.' },
      { q: 'Which is NOT named as a typical gap for accountants?', o: ['Canadian tax law', 'Workplace communication norms', 'Audit documentation standards', 'Software certification'], a: 3, w: 'Only the first three are mentioned.' },
      { q: 'Why do most clients choose the part-time option?', o: ['It is cheaper in tuition', 'It has a better placement rate', 'They cannot afford to stop earning', 'The full-time option has no placement'], a: 2, w: 'The lost income during full-time study is the deciding factor.' },
      { q: 'What proportion are hired through their placement or a referral?', o: ['About forty percent', 'About sixty percent', 'About eighty percent', 'Almost all'], a: 1, w: 'The counsellor states about sixty percent.' },
      { q: 'What does the counsellor identify as the client\'s real bottleneck?', o: ['The credential assessment', 'The tuition payment', 'The expired language test', 'Two years of documented experience'], a: 2, w: 'The two-year-old result is expired, so the test must be rebooked.' },
      { q: 'How long does the credential assessment take?', o: ['Two weeks', 'Five weeks', 'About eight weeks', 'Eight months'], a: 2, w: 'About eight weeks, which is why it should be started first.' }
    ]
  }]
});
