/* ============================================================
   PART 23 — OFFLINE ITEM BANK: READING, Parts 3–4
   Part 3 = 9 statements matched to paragraphs A–D or E (not given)
   Part 4 = 5 MC on an opinion article + 5 dropdown blanks in a comment
   ============================================================ */

/* ---------------- PART 3 — Reading for Information (9 Q) ---------------- */
BANK_READING.push({
  id: 'R3-01', part: 3, clb: 8, title: 'Four Approaches to Household Food Waste',
  intro: 'Four Canadian municipalities have taken different approaches to reducing household food waste. Read each description, then decide which paragraph each statement belongs to.',
  paras: [
    { k: 'A', title: 'Sherbrooke: measuring first', text: 'Before changing anything, the city spent a full year weighing and sorting the contents of green bins from four hundred randomly selected households. The results reshaped the plan. Staff had assumed that spoiled produce was the largest category; in fact, bread and baked goods made up nearly a quarter of what was discarded, and most of it was still within its date. The city redirected its education budget away from general "reduce waste" messaging toward a single specific instruction about freezing bread, and repeated that message for eighteen months. Follow-up sampling showed a fourteen percent reduction in that category alone, though total organic waste fell by only four percent.' },
    { k: 'B', title: 'Kelowna: the price signal', text: 'Kelowna went a different route, replacing flat-rate garbage collection with a variable-rate system in which households choose a bin size and pay accordingly. A household downsizing from the largest to the smallest bin saves roughly one hundred and ninety dollars a year. The council expected resistance and got it, particularly from large families who argued the system penalised household size rather than wasteful behaviour. In response, the city added a free additional pickup allowance for households of five or more. Overall garbage tonnage fell eleven percent in the first two years, but staff caution that some of the decline reflects waste moving to other streams rather than disappearing.' },
    { k: 'C', title: 'Moncton: working with retailers', text: 'Rather than targeting households at all, Moncton concentrated on the point of sale. The city negotiated with the four largest grocery chains operating in the region to standardise date labelling, replacing a mix of "best before", "sell by" and "packed on" dates with a single consistent format, and to move discounted near-date items into a clearly marked section rather than scattering them through the store. Participating retailers reported that near-date sell-through improved substantially. The city\'s own measurements of household waste, however, showed no statistically significant change, which staff attribute to the short measurement window.' },
    { k: 'D', title: 'Guelph: the neighbourhood kitchen', text: 'Guelph funded eight neighbourhood kitchens where residents could bring surplus produce to be processed and preserved collectively, with the output shared among participants and a portion donated. The programme was popular and heavily oversubscribed, but an evaluation found that its measurable effect on waste volumes was small, because participants were largely people who already wasted little. The evaluators nonetheless recommended continuing it, arguing that the programme\'s value lay in building the social networks that made other municipal programmes easier to launch, and that judging it solely on tonnage missed the point.' }
  ],
  statements: [
    { t: 'This approach began by collecting data rather than by launching a programme.', a: 'A' },
    { t: 'Criticism led to a modification that accommodated larger households.', a: 'B' },
    { t: 'The initiative did not target residents directly at all.', a: 'C' },
    { t: 'Evaluators argued the programme should be judged on something other than its stated goal.', a: 'D' },
    { t: 'An assumption held by staff turned out to be incorrect.', a: 'A' },
    { t: 'Officials warned that part of the apparent improvement may be waste shifting elsewhere.', a: 'B' },
    { t: 'The programme attracted more interest than it could accommodate.', a: 'D' },
    { t: 'A change in labelling practices was negotiated with businesses.', a: 'C' },
    { t: 'The municipality introduced fines for households that failed to sort correctly.', a: 'E' }
  ]
});

BANK_READING.push({
  id: 'R3-02', part: 3, clb: 9, title: 'Four Perspectives on Winter Cycling',
  intro: 'Four writers describe efforts to make winter cycling practical in Canadian cities. Read each paragraph, then decide which one each statement belongs to.',
  paras: [
    { k: 'A', title: 'The engineer', text: 'The failure people notice is snow on the path, but the failure that actually stops them riding is ice, and ice is a drainage problem before it is a clearing problem. Most of our separated lanes were built with the same crown and gutter detail as the roadway beside them, which means meltwater from the plowed road runs across the bike lane and refreezes overnight. Where we have rebuilt lanes with their own drainage and a slight reverse slope, the winter maintenance cost per kilometre has actually fallen, because we clear less often and salt less. The capital cost is higher and that is the whole argument at budget time.' },
    { k: 'B', title: 'The parent', text: 'I ride my two children to school through the winter, and I want to be honest that I do it despite the infrastructure rather than because of it. The route is cleared, more or less, but it is cleared last, usually around ten in the morning, which is four hours after I need it. What changed things for us was not a new lane. It was that the school moved its bike storage from an outdoor rack to a heated vestibule, so we are no longer chipping ice off the locks at half past three. Small things determine whether a family keeps going in February.' },
    { k: 'C', title: 'The economist', text: 'The most rigorous work compares cities with similar climates and different levels of winter maintenance. What it finds is that ridership in January is not primarily a function of temperature. Oulu, in Finland, is colder than Winnipeg and sustains roughly ten times the winter mode share. The variable that tracks best with January ridership is not average temperature or even snowfall, but the consistency of clearing — specifically, the proportion of days on which the network is cleared to a usable standard within four hours of a snowfall. Consistency, rather than absolute quality, appears to be what converts occasional riders into year-round ones.' },
    { k: 'D', title: 'The city councillor', text: 'I supported the winter maintenance expansion and I would vote for it again, but I want to correct a story that gets told about it. It did not pass because we persuaded anyone with statistics. It passed because the snow-clearing contract was up for renewal in the same year, and adding the cycling network to an existing tender cost far less than procuring it separately would have. The politics were incidental to the timing. My advice to advocates in other cities is unglamorous: find out when your contracts expire, and be ready with a costed proposal eighteen months before that date.' }
  ],
  statements: [
    { t: 'A comparison between cities suggests that temperature is not the main determinant of winter ridership.', a: 'C' },
    { t: 'A change to storage facilities mattered more than a change to the route.', a: 'B' },
    { t: 'A design change reduced ongoing maintenance costs despite a higher initial cost.', a: 'A' },
    { t: 'Timing of a procurement cycle, rather than persuasion, explains a policy success.', a: 'D' },
    { t: 'The writer identifies a problem that originates in how water moves off the roadway.', a: 'A' },
    { t: 'The writer continues an activity in spite of, not because of, public provision.', a: 'B' },
    { t: 'Reliability of service is identified as more important than its absolute quality.', a: 'C' },
    { t: 'The writer offers practical advice to advocates elsewhere.', a: 'D' },
    { t: 'The writer describes a pilot programme that was cancelled after one season.', a: 'E' }
  ]
});

BANK_READING.push({
  id: 'R3-03', part: 3, clb: 8, title: 'Four Findings on Shift Work and Sleep',
  intro: 'Four summaries describe research on shift work. Read each, then decide which paragraph each statement belongs to.',
  paras: [
    { k: 'A', title: 'Rotation direction', text: 'A study following four hundred hospital staff over two years compared forward-rotating schedules, in which shifts move from days to evenings to nights, with backward-rotating schedules moving in the opposite direction. Workers on forward rotations reported falling asleep an average of twenty-six minutes faster and recorded fewer errors on a standard attention task. The effect held after controlling for age and years of experience. The authors were careful to note that the difference, while consistent, was smaller than the difference between any rotating schedule and a fixed one.' },
    { k: 'B', title: 'Light exposure', text: 'Researchers tested whether controlled light exposure could shift the body clock enough to make night work tolerable. Participants exposed to bright light during the first half of their night shift and instructed to wear dark glasses on the commute home adapted more completely than a control group. The catch emerged on days off: the same participants who adapted best to night work had the most difficulty returning to a daytime schedule for family and social life, and several withdrew from the study for that reason.' },
    { k: 'C', title: 'Naps', text: 'A workplace trial gave one group of transport workers a scheduled twenty-minute nap opportunity in a dedicated room during the night shift. Objective alertness measures improved and self-reported fatigue fell. Uptake, however, was the interesting finding: only about a third of eligible workers used the nap room, and interviews suggested the main barrier was not scheduling but a belief that colleagues would view napping as shirking. Where a supervisor visibly used the room, uptake in that team rose above seventy percent.' },
    { k: 'D', title: 'Long-term health', text: 'A large cohort study tracked workers over eighteen years and found elevated rates of certain metabolic conditions among those with more than ten years of night work. The association weakened substantially when diet and physical activity were included in the model, suggesting that a considerable portion of the risk may operate through behaviour rather than through circadian disruption directly. The authors argued this is grounds for optimism, since behavioural pathways are more amenable to workplace intervention than the body clock itself.' }
  ],
  statements: [
    { t: 'A benefit at work created a problem in participants\' personal lives.', a: 'B' },
    { t: 'Social perception, rather than practicality, limited use of a resource.', a: 'C' },
    { t: 'The direction in which shifts change affected how quickly workers fell asleep.', a: 'A' },
    { t: 'The authors suggest their finding is encouraging because the mechanism can be addressed.', a: 'D' },
    { t: 'The behaviour of a leader substantially changed participation.', a: 'C' },
    { t: 'The observed difference was smaller than another comparison the authors highlighted.', a: 'A' },
    { t: 'Including lifestyle factors weakened a statistical association.', a: 'D' },
    { t: 'Some participants left the study because of difficulties on their days off.', a: 'B' },
    { t: 'Workers were paid a bonus for participating in the trial.', a: 'E' }
  ]
});

BANK_READING.push({
  id: 'R3-04', part: 3, clb: 7, title: 'Four Newcomers, Four Small Towns',
  intro: 'Four people describe their first year after moving to a small Canadian town. Read each account, then decide which paragraph each statement belongs to.',
  paras: [
    { k: 'A', title: 'Yusuf, Nova Scotia', text: 'I came expecting the hardest part to be the winter and it was not; it was the silence of the first three months. In the city I had been anonymous and comfortable with it. Here, everyone knew who I was within a week and nobody spoke to me for two months, which I read as coldness and later understood as a kind of waiting. The turn came when my car would not start in the grocery store lot and four people stopped within ten minutes. After that, the same people who had said nothing began saying everything. I have concluded that the town was not unfriendly. It was simply slower than I was used to, and I mistook pace for attitude.' },
    { k: 'B', title: 'Lucía, Saskatchewan', text: 'The professional side worked out better than I expected and the practical side worse. I had assumed my nursing credentials would be the obstacle, and in fact the hospital was so short-staffed that the licensing process was expedited and someone walked me through every form. What nobody warned me about was housing. There were exactly two rental listings in the town when I arrived, both taken. I lived in a motel for eleven weeks. If I were advising someone, I would say secure the housing before you accept the job, even if the employer sounds confident.' },
    { k: 'C', title: 'Tomas, Ontario', text: 'My mistake was assuming that a small town meant a small commute. The job was in the town; the affordable housing was forty minutes away, and there is no transit between them, so a second car became compulsory. That cost erased most of the savings that had made the move attractive. I do not regret coming, but I would tell anyone doing the calculation to price the car, the insurance, and the winter tires before comparing rents. The gap between city and town costs is real but much narrower than the headline rent figures suggest.' },
    { k: 'D', title: 'Priya, British Columbia', text: 'What I underestimated was how much of the social infrastructure runs through volunteering. There is no way to meet people here that does not involve joining something — the fire hall, the food bank, the curling club, the school council. I joined nothing for six months and was lonely, then joined the community hall committee and had more acquaintances than I could manage within eight weeks. It is an efficient system if you know it exists and an isolating one if you do not. Nobody tells you, because to the people who grew up here it is not a system, it is just how things are.' }
  ],
  statements: [
    { t: 'The writer initially misinterpreted local behaviour as hostility.', a: 'A' },
    { t: 'A shortage of accommodation forced a long stay in temporary lodging.', a: 'B' },
    { t: 'Transportation costs cancelled out an expected financial advantage.', a: 'C' },
    { t: 'Participation in organised groups is described as the main route to social connection.', a: 'D' },
    { t: 'A professional barrier proved easier to cross than anticipated.', a: 'B' },
    { t: 'A single incident changed how the writer was treated.', a: 'A' },
    { t: 'The writer advises calculating the full cost before comparing rents.', a: 'C' },
    { t: 'The writer notes that long-term residents do not recognise the pattern they follow.', a: 'D' },
    { t: 'The writer eventually returned to the city they came from.', a: 'E' }
  ]
});

BANK_READING.push({
  id: 'R3-05', part: 3, clb: 9, title: 'Four Attempts to Shorten Waiting Times',
  intro: 'Four health regions describe efforts to reduce waiting times. Read each paragraph, then decide which one each statement belongs to.',
  paras: [
    { k: 'A', title: 'Pooled referrals', text: 'Rather than each surgeon holding a personal waiting list, the region moved to a single pooled list from which the next available surgeon takes the next patient, unless the patient specifically requests an individual. The median wait fell from thirty-one weeks to nineteen. The variation fell further and faster than the median: before pooling, the longest individual list was six times the shortest, and within a year that ratio was under two. Surgeon resistance was significant at first and declined once the data showed that no one\'s operating volume had fallen.' },
    { k: 'B', title: 'Central intake with triage', text: 'This region did not change who performed procedures but changed who assessed patients first. A team of physiotherapists screened every spine referral before it reached a surgeon, and found that slightly more than sixty percent of referred patients were not surgical candidates at all and could be managed conservatively. Those patients began treatment weeks earlier than they would have, and the surgical queue shortened as a side effect rather than as the direct object of the intervention.' },
    { k: 'C', title: 'Extending the working day', text: 'The region funded evening operating lists twice a week, using the same theatres after regular hours. Throughput rose by roughly fourteen percent in the first year. The programme was discontinued in year three, not because it failed clinically, but because the staffing model depended on overtime that the nursing agreement made progressively more expensive, and because sustained evening work drove an attrition rate in theatre nursing that the region judged unacceptable. Administrators described it as effective but not sustainable.' },
    { k: 'D', title: 'Publishing the data', text: 'This region made no operational change at all in the first phase. It simply published wait times by facility and by procedure, updated monthly and searchable by the public. Waits at the longest-waiting facilities fell by about a fifth within eighteen months, with no additional funding and no formal directive. Analysts were divided on the mechanism: some attributed it to patients choosing shorter-wait facilities, others to administrators responding to visibility. The region\'s own view was that both operated, but that the administrative response was the larger effect.' }
  ],
  statements: [
    { t: 'A reduction in inequality between lists was greater than the reduction in the average wait.', a: 'A' },
    { t: 'Most patients referred turned out not to need the specialist they were sent to.', a: 'B' },
    { t: 'The intervention was ended for workforce reasons rather than clinical ones.', a: 'C' },
    { t: 'Improvement occurred without any change to how care was delivered.', a: 'D' },
    { t: 'Opposition from clinicians decreased once evidence about workload appeared.', a: 'A' },
    { t: 'The shorter queue was a by-product rather than the direct aim.', a: 'B' },
    { t: 'Experts disagreed about why the improvement happened.', a: 'D' },
    { t: 'Capacity was increased by using existing facilities outside normal hours.', a: 'C' },
    { t: 'The region hired additional surgeons from outside the province.', a: 'E' }
  ]
});

/* ---------------- PART 4 — Reading for Viewpoints (10 Q) ---------------- */
BANK_READING.push({
  id: 'R4-01', part: 4, clb: 8, title: 'Should Cities Ban Gas Leaf Blowers?',
  article: {
    title: 'The Loudest Argument on the Street',
    byline: 'Opinion — Regional Weekly',
    body: `Every autumn the same motion appears on the same municipal agendas, and every autumn it is described in the same misleading terms. A gas leaf blower ban is presented as a fight between people who value quiet and people who value work, and that framing has kept the debate stuck for a decade.

The noise case is the weakest one, which is why it is strange that supporters lead with it. A gas blower is loud, certainly, but it operates for a fraction of the day and its sound is no more intrusive than the lawnmowers nobody proposes to ban. Where the noise argument does hold is in frequency rather than volume: a commercial crew running four machines for six hours on a windless street is a different phenomenon from one homeowner clearing a driveway, and a rule that treated the two identically would be both unfair and unpopular.

The stronger case is about emissions, and it is genuinely surprising. A two-stroke engine burns a fuel and oil mixture and does not burn it cleanly; on some measures an hour of use produces hydrocarbon emissions comparable to driving a modern car for hundreds of kilometres. That figure gets quoted so often that it has become suspicious, but the underlying point survives scrutiny: the machines are dirty out of proportion to their size, and the people breathing the exhaust most directly are the operators, who are usually the lowest-paid people in the industry.

Opponents make an argument that deserves more respect than it gets. Battery equipment has improved enormously, but a commercial crew clearing a large property needs battery capacity that costs thousands of dollars to assemble, and the transition falls hardest on small operators with the least capital. A ban with no transition support is a policy that quietly redistributes work from small contractors to large ones. Several cities have discovered this after the fact.

What I would like to see is a rule that stops pretending this is about noise. Regulate the engine, not the activity: prohibit two-stroke equipment, allow four-stroke and battery, give commercial operators three years and a rebate, and drop the hourly restrictions that are unenforceable anyway. It is less satisfying than a ban and it would work.`
  },
  mc: [
    { q: 'What does the writer say about the noise argument?', o: ['It is the strongest case for a ban', 'It is the weakest case, though frequency of commercial use has some force', 'It is entirely without merit', 'It applies equally to lawnmowers and should extend to them'], a: 1, w: 'The writer calls it weakest but concedes the commercial-frequency point.' },
    { q: 'How does the writer treat the widely quoted emissions comparison?', o: ['Rejects it as false', 'Accepts it uncritically', 'Notes it is over-quoted but says the underlying point holds', 'Says it applies only to older machines'], a: 2, w: '"That figure... has become suspicious, but the underlying point survives scrutiny."' },
    { q: 'Who does the writer say is most exposed to the exhaust?', o: ['Nearby residents', 'Children at schools', 'The operators themselves', 'Municipal inspectors'], a: 2, w: 'Operators, described as the lowest-paid people in the industry.' },
    { q: 'What is the writer\'s view of the opponents\' argument?', o: ['It is self-interested and should be dismissed', 'It deserves more respect than it receives', 'It is identical to the noise argument', 'It has been disproved by recent battery improvements'], a: 1, w: 'The writer explicitly says it deserves more respect.' },
    { q: 'What does the writer ultimately recommend?', o: ['An immediate full ban on all leaf blowers', 'Restricting the hours during which blowers may be used', 'Banning two-stroke engines with a three-year transition and rebates', 'Leaving the matter to individual property owners'], a: 2, w: '"Regulate the engine, not the activity."' }
  ],
  comment: {
    header: 'Reader comment — posted by M. Ferreira',
    text: `I run a four-person landscaping crew and I have argued against these bans for years, so it is unusual for me to say that this column is broadly {{1}}.

The part that matters to me is the recognition that a ban without transition support {{2}} small operators more than large ones. My competitor with forty crews can absorb a battery fleet. I cannot, at least not in one season.

I would push back on one thing. The writer treats the hourly restrictions as {{3}}, but in my experience they are the only rule residents actually call about, and they do change crew behaviour.

Where I fully agree is the point about who breathes the exhaust. My own crew is the group most {{4}} by the current equipment, and I had not thought about it that way until a supplier raised it.

If the city offered the three-year timeline and the rebate described here, I would {{5}} it, and I say that as someone who signed the petition against the last proposal.`
  },
  blanks: [
    { o: ['unfair', 'fair', 'exaggerated', 'irrelevant'], a: 1 },
    { o: ['helps', 'ignores', 'harms', 'excludes'], a: 2 },
    { o: ['unenforceable', 'essential', 'expensive', 'popular'], a: 0 },
    { o: ['protected', 'affected', 'compensated', 'consulted'], a: 1 },
    { o: ['oppose', 'support', 'ignore', 'delay'], a: 1 }
  ]
});

BANK_READING.push({
  id: 'R4-02', part: 4, clb: 9, title: 'The Open-Plan Office Reconsidered',
  article: {
    title: 'We Were Wrong About Walls',
    byline: 'Opinion — Workplace Quarterly',
    body: `I spent eleven years designing open-plan offices and I would like to explain, without the usual defensiveness, what we got wrong and what the critics get wrong in return.

The original case was not about cost, whatever people now assume. Cost was a happy consequence. The case was about visibility: the belief that people who can see one another will speak to one another, and that the unplanned conversation is where the useful work begins. That belief was not invented by accountants. It came out of research on engineering teams that found proximity predicted collaboration far better than reporting structure did.

What we underestimated was that the same visibility that enables a conversation also enables interruption, and that these are not symmetrical. A conversation you choose is a benefit. A conversation you cannot avoid is a cost, and the cost is paid disproportionately by people doing work that requires sustained concentration. When measurements finally caught up, they showed something the field had not predicted: in several large firms, face-to-face interaction actually fell after a move to open plan, while electronic messaging rose. People did not collaborate more. They retreated into headphones and chat windows, which is collaboration with the sound turned off.

The critics, however, have overcorrected. The lesson is not that private offices are better; it is that a single spatial arrangement cannot serve tasks with opposite requirements. The firms I now see succeeding have not gone back to corridors of closed doors. They have built settings — a quiet floor with an enforced no-meeting rule, project rooms a team occupies for a month, small enclosed booths available without booking — and they let people move between them during the day. The expensive part is not the construction. It is the management discipline required to make the quiet floor actually quiet, which most organisations abandon within a year.

I am also sceptical of the argument that remote work settles the question. It relocates it. A home is a spatial arrangement too, and for a great many people it is a worse one, with less control and no ability to move between settings at all.`
  },
  mc: [
    { q: 'What does the writer say was the original justification for open plan?', o: ['Reducing real-estate costs', 'Increasing visibility to encourage unplanned conversation', 'Complying with building regulations', 'Improving natural light'], a: 1, w: 'Cost was "a happy consequence", not the case.' },
    { q: 'What surprising measurement does the writer report?', o: ['Productivity rose but satisfaction fell', 'Face-to-face interaction fell while electronic messaging rose', 'Noise levels were lower than expected', 'Collaboration increased only among managers'], a: 1, w: 'People "retreated into headphones and chat windows".' },
    { q: 'Why does the writer say interruption and conversation are not symmetrical?', o: ['Interruptions last longer than conversations', 'A chosen conversation is a benefit while an unavoidable one is a cost', 'Only managers are interrupted', 'Conversations happen less often than interruptions'], a: 1, w: 'The asymmetry is between chosen and unavoidable.' },
    { q: 'What is the writer\'s view of open-plan critics?', o: ['They are entirely correct', 'They have overcorrected toward private offices', 'They ignore the cost argument', 'They rely on outdated research'], a: 1, w: 'The lesson is not that private offices are better.' },
    { q: 'What does the writer identify as the expensive part of the alternative?', o: ['Construction of enclosed booths', 'The management discipline to keep quiet areas quiet', 'Booking software', 'Additional floor space'], a: 1, w: 'Most organisations abandon it within a year.' }
  ],
  comment: {
    header: 'Reader comment — posted by D. Iqbal',
    text: `I have worked in three open-plan offices and I recognise almost everything here, particularly the observation that people stopped talking and started {{1}} instead.

What I appreciate is that the writer does not simply {{2}} the original reasoning. Knowing that proximity really did predict collaboration in the early research makes the failure more interesting than "designers were foolish".

My own employer built a quiet floor and abandoned the no-meeting rule within about {{3}}, which matches the article exactly. The space still exists; the discipline does not.

I am less {{4}} than the writer about remote work. For me the home genuinely is a better setting, though I accept that this depends heavily on what my home happens to be like.

Overall this is the first piece on the subject I have read that criticises open plan without {{5}} that closed offices were the answer all along.`
  },
  blanks: [
    { o: ['arguing', 'messaging', 'leaving', 'complaining'], a: 1 },
    { o: ['defend', 'dismiss', 'repeat', 'quote'], a: 1 },
    { o: ['a week', 'a year', 'a decade', 'a month'], a: 1 },
    { o: ['convinced', 'sceptical', 'informed', 'interested'], a: 1 },
    { o: ['proving', 'assuming', 'denying', 'explaining'], a: 1 }
  ]
});

BANK_READING.push({
  id: 'R4-03', part: 4, clb: 8, title: 'Later Start Times for High Schools',
  article: {
    title: 'The Bell Nobody Wants to Move',
    byline: 'Opinion — Provincial Education Review',
    body: `The biology here is not seriously disputed. Adolescent circadian rhythms shift later at puberty, which means a teenager told to sleep at ten is being asked to do something their physiology resists. Districts that have moved high school start times from around eight to around nine consistently report more sleep, better attendance, and in several careful studies, fewer collisions among teenage drivers. If this were only a question of evidence, the debate would be over.

It is not only a question of evidence, and I think supporters damage their own case by pretending otherwise. A start-time change is a transportation problem wearing the costume of a health problem. Most districts run each bus three times each morning — high school, then elementary, then middle — and the schedule is tightly interlocked. Moving one tier by an hour does not move one tier. It moves all of them, or it requires additional buses, and additional buses in a mid-sized district cost several million dollars a year that no one has offered to provide.

Then there are the consequences that fall on families rather than on budgets. If the high school starts later, the elementary school often starts earlier, which means eight-year-olds waiting for a bus in the dark in January. Parents who work early shifts lose the arrangement where an older sibling walks the younger one to school. I have watched districts dismiss these objections as resistance to change, and it is not resistance to change. It is a real cost landing on people who did not volunteer to pay it.

The districts that have made this work share one feature: they treated it as a multi-year logistics project rather than a policy announcement. They modelled the bus routes before promising the change, they moved elementary start times by fifteen minutes rather than an hour, and in at least two cases they found the savings by consolidating routes that had been inefficient for years and that nobody had examined because nobody had a reason to.

My position is that later start times are worth doing and that most districts announcing them are not doing the work required to make them survive. A change announced in March for September will fail, and its failure will be cited for the next fifteen years as evidence that the idea does not work.`
  },
  mc: [
    { q: 'What does the writer say about the scientific evidence?', o: ['It is contested among researchers', 'It is not seriously disputed', 'It applies only to older teenagers', 'It has been overstated by advocates'], a: 1, w: 'The opening states the biology is not seriously disputed.' },
    { q: 'How does the writer characterise the start-time debate?', o: ['A health problem being ignored', 'A transportation problem disguised as a health problem', 'A dispute about teaching quality', 'A conflict between parents and teachers'], a: 1, w: '"A transportation problem wearing the costume of a health problem."' },
    { q: 'What consequence for families does the writer highlight?', o: ['Higher school fees', 'Younger children waiting for buses in the dark', 'Longer school days', 'Loss of after-school activities'], a: 1, w: 'Also the loss of sibling walking arrangements.' },
    { q: 'How does the writer respond to districts calling objections "resistance to change"?', o: ['Agrees with the characterisation', 'Says the objections reflect real costs on people who did not choose them', 'Says the objections come mainly from teachers', 'Says the objections are exaggerated by media'], a: 1, w: 'The writer explicitly rejects the "resistance" framing.' },
    { q: 'What do successful districts have in common?', o: ['Larger transportation budgets', 'Treating it as a multi-year logistics project', 'Starting elementary school an hour earlier', 'Eliminating bus service entirely'], a: 1, w: 'Modelling routes first, moving elementary by fifteen minutes, finding efficiencies.' }
  ],
  comment: {
    header: 'Reader comment — posted by S. Whitecalf',
    text: `I am a transportation supervisor for a mid-sized district and this is the first opinion piece on the subject I have read that understands what I actually do.

The three-tier bus schedule is exactly the {{1}} the writer describes. When trustees ask me to move the high school bell, they hear a simple request; I hear a rebuild of ninety routes.

I would add one point the article {{2}}. Driver availability is now a harder constraint than money. Even if a district funded additional buses tomorrow, I could not staff them.

The suggestion to shift elementary times by fifteen minutes rather than an hour is {{3}} and it is what we modelled last spring. It absorbs most of the change without pushing anyone into darkness.

And the warning about announcing in March for September is one I would like to have {{4}} to our board two years ago. That is precisely what we did, and the plan {{5}} within one term.`
  },
  blanks: [
    { o: ['solution', 'constraint', 'advantage', 'exaggeration'], a: 1 },
    { o: ['emphasises', 'omits', 'repeats', 'proves'], a: 1 },
    { o: ['unrealistic', 'sensible', 'expensive', 'illegal'], a: 1 },
    { o: ['read', 'shown', 'hidden', 'denied'], a: 1 },
    { o: ['succeeded', 'collapsed', 'expanded', 'continued'], a: 1 }
  ]
});

BANK_READING.push({
  id: 'R4-04', part: 4, clb: 9, title: 'Does the Sharing Economy Share Anything?',
  article: {
    title: 'What the Buy Nothing Group Actually Does',
    byline: 'Opinion — Community Affairs Monthly',
    body: `I have been an administrator of a neighbourhood giving group for six years, which qualifies me to say two things that its supporters and its critics will both dislike.

The first is that the environmental claim is largely decorative. We move a great deal of material between households, and if you measure what we divert from landfill it looks impressive. But most of what circulates would not have gone to landfill; it would have gone to a thrift shop, and a substantial fraction is furniture and clothing that the recipient did not previously want and disposes of within a year. The honest environmental effect is positive but modest, and far smaller than the numbers we cheerfully post at our annual meeting.

The second is that the social effect is much larger than anyone measures, and it is the actual reason the thing works. What I have watched over six years is not primarily the redistribution of objects. It is the construction of a very thin, very wide net of weak acquaintance across a neighbourhood that previously had none. When a family on our street had a house fire in February, the response was organised within four hours, and it was organised because two hundred people already knew each other's names from a group about giving away bookshelves. Nothing in the group's stated purpose predicts that.

The critics have one argument I cannot answer well. Groups like ours are strongest in neighbourhoods that need them least. Ours has three hundred members in an area with high home ownership and time to spare. The equivalent group two neighbourhoods over folded twice, because moderating takes ten hours a week and nobody there has ten unpaid hours. Mutual aid distributed by volunteer capacity reproduces the inequality it appears to address, and I have no solution to offer beyond noticing it honestly.

So I would ask people to stop describing these groups as an alternative to public provision. They are not. A giving group cannot house anyone or feed a family reliably. What it can do is make a neighbourhood legible to itself, which turns out to matter in ways that are difficult to fund and easy to underestimate.`
  },
  mc: [
    { q: 'What does the writer say about the environmental claim?', o: ['It is entirely false', 'It is positive but much smaller than the group advertises', 'It is the group\'s strongest argument', 'It cannot be measured at all'], a: 1, w: 'Most items would have gone to a thrift shop, not landfill.' },
    { q: 'What does the writer identify as the group\'s real value?', o: ['Waste diversion', 'Financial savings for members', 'A wide network of weak acquaintance across the neighbourhood', 'Reducing pressure on thrift shops'], a: 2, w: 'The house-fire example illustrates it.' },
    { q: 'What is significant about the house fire example?', o: ['The group raised money quickly', 'The response drew on connections the group had incidentally created', 'It showed the group could replace insurance', 'It attracted new members'], a: 1, w: 'Nothing in the stated purpose predicts that response.' },
    { q: 'Which criticism does the writer say they cannot answer?', o: ['That items are of poor quality', 'That the groups thrive where they are least needed', 'That moderators are unaccountable', 'That members give away unsafe goods'], a: 1, w: 'Volunteer capacity reproduces existing inequality.' },
    { q: 'What does the writer ask people to stop doing?', o: ['Joining such groups', 'Measuring waste diversion', 'Describing the groups as an alternative to public provision', 'Donating furniture'], a: 2, w: 'A giving group cannot house or reliably feed anyone.' }
  ],
  comment: {
    header: 'Reader comment — posted by H. Trembley',
    text: `I moderated one of these groups for two years and stopped, so I read this with some {{1}}.

The observation about volunteer capacity is the one that ended it for me. Ten hours a week is not an exaggeration; in a bad month it was more, and the group in the lower-income area near me folded for exactly the reason described, {{2}} once and then again.

I think the writer is slightly too {{3}} on the environmental point. Even if most items would have reached a thrift shop, keeping them out of the shop's overflow does have some value.

Where I completely agree is the refusal to present these groups as a {{4}} for public services. Every time a politician praises us, I hear it as an argument for funding less.

Making a neighbourhood "legible to itself" is a phrase I will {{5}}, because it names something I could never explain to my own family.`
  },
  blanks: [
    { o: ['indifference', 'recognition', 'confusion', 'anger'], a: 1 },
    { o: ['growing', 'folding', 'expanding', 'moving'], a: 1 },
    { o: ['generous', 'harsh', 'vague', 'optimistic'], a: 1 },
    { o: ['substitute', 'supplement', 'model', 'critique'], a: 0 },
    { o: ['forget', 'borrow', 'dispute', 'ignore'], a: 1 }
  ]
});

BANK_READING.push({
  id: 'R4-05', part: 4, clb: 7, title: 'Should Libraries Lend Tools?',
  article: {
    title: 'More Than Books, Or Less?',
    byline: 'Opinion — City Life',
    body: `Our central library now lends power drills, sewing machines, pressure washers, ukuleles and a telescope. Circulation of these items has grown every year since the collection opened, and the library reports that roughly forty percent of tool borrowers had not used a library card in the previous three years. Those are good numbers, and I want to make a case for the programme that is stronger than the one the library itself makes.

The library's argument is about access, and it is correct as far as it goes: a person who needs a tile cutter for one afternoon should not have to buy a tile cutter. But that argument alone invites an obvious response, which is that a hardware rental counter already exists and charges thirty dollars. The library's version is free, but "free" is not by itself a reason for a public institution to enter a market that private business already serves.

The better argument is about who is excluded from the existing option. A rental counter requires a credit card and a deposit, is open when most people are at work, and prices a two-hour job at a full-day rate. Each of those is a filter, and each filters in the same direction. The tool collection is not competing with the rental counter; it is serving the people the rental counter has quietly declined to serve.

There are real costs, and library staff are candid about them. Tools come back damaged far more often than books, and the repair budget has been exceeded in each of the last two years. Some items — the pressure washer especially — require safety instruction that takes staff time nobody budgeted for. And there is a legitimate question, which I do not think has been answered, about whether a collection that appeals to homeowners should be funded ahead of expanded hours at branches in neighbourhoods with almost no homeowners at all.

I would keep the programme and I would stop defending it on the grounds of novelty. It is not interesting because a library lends a drill. It is interesting because it works for the people that the ordinary market politely ignores.`
  },
  mc: [
    { q: 'What statistic does the writer cite about tool borrowers?', o: ['Forty percent had not used a library card in three years', 'Forty percent are homeowners', 'Circulation has doubled every year', 'Most borrowers are under thirty'], a: 0, w: 'The figure is used to show the programme reaches lapsed users.' },
    { q: 'Why does the writer find the library\'s own "access" argument insufficient?', o: ['Access is not a public priority', 'A private rental counter already provides access for a fee', 'Tools are not in demand', 'Access cannot be measured'], a: 1, w: '"Free" alone is not a reason to enter an existing market.' },
    { q: 'What is the writer\'s stronger argument?', o: ['Tools are cheaper than books', 'The programme serves people the rental market filters out', 'Libraries need new revenue', 'Tool lending attracts government grants'], a: 1, w: 'Credit card, deposit, opening hours and pricing all filter the same way.' },
    { q: 'Which cost do library staff acknowledge?', o: ['Tools are stolen frequently', 'Repair budgets have been exceeded for two years', 'Insurance premiums have tripled', 'Staff have refused to handle tools'], a: 1, w: 'Tools return damaged far more often than books.' },
    { q: 'What question does the writer say remains unanswered?', o: ['Whether tools should require a deposit', 'Whether the collection should be funded ahead of expanded hours in low-ownership neighbourhoods', 'Whether the library should charge a fee', 'Whether tools belong in a library at all'], a: 1, w: 'The writer calls it a legitimate, unanswered question.' }
  ],
  comment: {
    header: 'Reader comment — posted by R. Delisle',
    text: `I borrowed the tile cutter the article mentions, and the writer's framing is {{1}} to my experience.

I do not have a credit card. The rental counter would not have served me at all, so for me it was not a choice between free and thirty dollars — it was a choice between the library and {{2}}.

The damage point is fair. I returned a sander with a torn belt and paid for it, which I think is {{3}}, and I would support a small refundable deposit for the higher-risk items.

The funding question is the one I would want the board to answer {{4}}. My branch closes at five, and I would trade the telescope for two extra evening hours without hesitating.

Still, I would {{5}} the programme continuing, provided it is defended on the grounds this article sets out rather than as a publicity exercise.`
  },
  blanks: [
    { o: ['irrelevant', 'close', 'opposed', 'unfamiliar'], a: 1 },
    { o: ['nothing', 'a neighbour', 'the internet', 'a store'], a: 0 },
    { o: ['unfair', 'reasonable', 'excessive', 'illegal'], a: 1 },
    { o: ['privately', 'publicly', 'eventually', 'never'], a: 1 },
    { o: ['oppose', 'support', 'question', 'delay'], a: 1 }
  ]
});
