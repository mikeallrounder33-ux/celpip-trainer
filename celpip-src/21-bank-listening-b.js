/* ============================================================
   PART 21 — OFFLINE ITEM BANK: LISTENING, Parts 4–6
   ============================================================ */

/* ---------------- PART 4 — Listening to a News Item (5 Q) ---------------- */
BANK_LISTENING.push({
  id: 'L4-01', part: 4, clb: 8, title: 'Green Bin Rollout',
  setting: 'Municipal news, Hamilton',
  blocks: [{
    segments: [
      { s: 'Narrator', t: 'You will hear a news item. Listen carefully. You will hear it only once.' },
      { s: 'Anchor', t: "Starting the first of next month, the city's green bin program expands to all multi-residential buildings with six or more units, adding roughly forty-one thousand households to the organics collection system. Buildings will receive shared bins for the loading area and one kitchen container per unit, delivered by building management rather than by the city. Property managers who miss the delivery deadline face no penalty in the first year, but the city says compliance inspections begin the following January. The waste department estimates the expansion will divert about nine thousand tonnes of food waste from landfill annually, which it values at two point one million dollars in avoided tipping fees. Not everyone is satisfied. The tenants' association has raised concerns about pest control in older buildings where the loading area is not enclosed, and asked the city to fund lockable bin enclosures. The city's response is that enclosure costs remain the building owner's responsibility, though a rebate covering half the cost, to a maximum of eight hundred dollars per building, will be available through the spring. Residents with questions are directed to the city's waste line, which the department warns will have longer than usual wait times through the first two weeks of the rollout." }
    ],
    questions: [
      { q: 'Which buildings are affected by the expansion?', o: ['All residential buildings in the city', 'Multi-residential buildings with six or more units', 'Buildings constructed after 2010', 'Buildings that requested the service'], a: 1, w: 'Six or more units is the stated threshold.' },
      { q: 'Who delivers the kitchen containers to residents?', o: ['City waste crews', 'The tenants\' association', 'Building management', 'A private contractor'], a: 2, w: 'Delivery is by building management, not the city.' },
      { q: 'What happens to property managers who miss the deadline in the first year?', o: ['They are fined per unit', 'They face no penalty', 'They lose the rebate', 'Their collection is suspended'], a: 1, w: 'No penalty in year one; inspections begin the following January.' },
      { q: 'What is the tenants\' association concerned about?', o: ['The cost of the kitchen containers', 'Pests in buildings with unenclosed loading areas', 'The reduction in garbage pickup days', 'The accuracy of the diversion estimate'], a: 1, w: 'Pest control in older buildings without enclosed loading areas.' },
      { q: 'What does the city offer regarding bin enclosures?', o: ['Full funding for all buildings', 'A rebate of half the cost up to $800 per building', 'A loan repayable over five years', 'Nothing at all'], a: 1, w: 'Half the cost, maximum eight hundred dollars, available through spring.' }
    ]
  }]
});

BANK_LISTENING.push({
  id: 'L4-02', part: 4, clb: 7, title: 'Ferry Service Disruption',
  setting: 'Coastal British Columbia',
  blocks: [{
    segments: [
      { s: 'Narrator', t: 'You will hear a news item. Listen carefully. You will hear it only once.' },
      { s: 'Anchor', t: "Passengers travelling between the mainland and the island should plan for a reduced schedule over the next three weeks. The vessel that normally handles the mid-day sailings has been pulled from service after an inspection found corrosion in a section of its exhaust system. The operator stresses that the vessel was not in danger and that the finding came from a routine annual inspection rather than an incident on the water. Two round trips per day are cancelled: the eleven-fifteen departure from the mainland terminal and the one-thirty return. Morning and evening sailings run as scheduled, and the operator has added an extra late sailing at nine-forty on Fridays and Sundays to absorb weekend demand. Reservations already booked on cancelled sailings are being rebooked automatically at no charge, with an email confirmation sent to the address on file. Passengers who prefer a refund must request one within fourteen days. Commercial traffic is affected more sharply, since the replacement vessel carries eighteen fewer commercial vehicles per trip. The trucking association has asked for priority loading, and the operator says it is considering the request but has not committed. Repairs are expected to be complete by the twenty-eighth, with normal service resuming the following morning." }
    ],
    questions: [
      { q: 'Why was the vessel taken out of service?', o: ['An incident during a sailing', 'Corrosion found in a routine annual inspection', 'A shortage of crew members', 'Low passenger numbers on mid-day sailings'], a: 1, w: 'The finding came from a routine inspection, not an incident.' },
      { q: 'Which sailings are cancelled?', o: ['All weekend sailings', 'The 11:15 departure and the 1:30 return', 'Evening sailings only', 'Every second sailing each day'], a: 1, w: 'Two round trips: 11:15 out and 1:30 back.' },
      { q: 'What has the operator added?', o: ['A second vessel on all routes', 'An extra late sailing on Fridays and Sundays', 'Free parking at the terminal', 'Additional morning departures'], a: 1, w: 'A 9:40 late sailing on Fridays and Sundays.' },
      { q: 'What must passengers do if they want a refund instead of rebooking?', o: ['Nothing; refunds are automatic', 'Request it within fourteen days', 'Apply at the terminal in person', 'Wait until service resumes'], a: 1, w: 'Rebooking is automatic; refunds must be requested within fourteen days.' },
      { q: 'How is commercial traffic affected?', o: ['It is suspended entirely', 'The replacement vessel carries eighteen fewer commercial vehicles per trip', 'Commercial vehicles must use a different terminal', 'Rates have increased'], a: 1, w: 'Capacity drops by eighteen commercial vehicles per trip.' }
    ]
  }]
});

BANK_LISTENING.push({
  id: 'L4-03', part: 4, clb: 9, title: 'Air Quality Advisory',
  setting: 'Prairie region wildfire smoke',
  blocks: [{
    segments: [
      { s: 'Narrator', t: 'You will hear a news item. Listen carefully. You will hear it only once.' },
      { s: 'Anchor', t: "Environment officials have extended the air quality advisory for the region through Thursday, as smoke from fires burning several hundred kilometres to the northwest continues to settle in the valley overnight. The air quality health index reached eight yesterday afternoon, in the high-risk band, and is forecast to hover between six and eight until a front arrives midweek. Health authorities advise that the general population reduce strenuous outdoor activity, while people with asthma, heart conditions, and children under six should avoid outdoor exertion entirely. What officials are emphasising this year, however, is indoor air. Closing windows helps only if a home is not already saturated with smoke, and running a portable filter in one room — typically the bedroom — is described as more effective than trying to clean the whole house. The province has opened four clean-air spaces with commercial-grade filtration: two at community centres, one at the central library, and one at the fairground pavilion, all open until nine in the evening. School boards have moved recess indoors but say classes will continue as scheduled. Employers are being asked, though not required, to allow outdoor workers to shift hours toward early morning, when smoke concentrations in the valley are typically at their lowest." }
    ],
    questions: [
      { q: 'How long has the advisory been extended?', o: ['Through Tuesday', 'Through Thursday', 'Through the weekend', 'Indefinitely'], a: 1, w: 'The advisory runs through Thursday, until a midweek front arrives.' },
      { q: 'Who is advised to avoid outdoor exertion entirely?', o: ['Everyone in the region', 'People with asthma or heart conditions and children under six', 'Only outdoor workers', 'Only people over sixty-five'], a: 1, w: 'That specific group is told to avoid exertion; the general population should merely reduce it.' },
      { q: 'What advice is emphasised about indoor air?', o: ['Closing windows is always sufficient', 'Filtering one room is more effective than the whole house', 'Air conditioning removes smoke particles', 'Indoor air is not a concern'], a: 1, w: 'A portable filter in the bedroom is described as more effective.' },
      { q: 'How many clean-air spaces has the province opened?', o: ['Two', 'Three', 'Four', 'Six'], a: 2, w: 'Two community centres, one library, one fairground pavilion.' },
      { q: 'What are employers asked to do?', o: ['Send outdoor workers home', 'Allow outdoor work to shift to early morning', 'Provide respirators to all staff', 'Close for the duration of the advisory'], a: 1, w: 'Asked but not required to shift hours to early morning.' }
    ]
  }]
});

BANK_LISTENING.push({
  id: 'L4-04', part: 4, clb: 7, title: 'Recreation Centre Funding Vote',
  setting: 'Small city council, New Brunswick',
  blocks: [{
    segments: [
      { s: 'Narrator', t: 'You will hear a news item. Listen carefully. You will hear it only once.' },
      { s: 'Anchor', t: "Council voted six to three last night to move ahead with the replacement of the Riverside recreation centre, a decision that ends four years of study but leaves the financing only partly settled. The approved plan carries a construction estimate of thirty-one million dollars. Of that, eleven million is confirmed from a federal-provincial infrastructure fund, and the city will borrow fourteen million over twenty years. The remaining six million is expected to come from a community fundraising campaign that has not yet begun. Councillors who voted against the plan objected specifically to that six million, arguing that if the campaign falls short, the shortfall lands on the tax base by default. Supporters countered that the existing building's mechanical systems are at end of life and that repair costs over the same twenty years would exceed nine million with no improvement in capacity. The new facility will include a twenty-five-metre pool, a double gymnasium, and, in a change from the original design, a licensed childcare space of forty spots, which was added after public consultation. Demolition is scheduled for next spring, with the centre closed for approximately twenty-six months. During construction, programs move to the high school and to the arena's upper hall." }
    ],
    questions: [
      { q: 'What was the vote?', o: ['Unanimous in favour', 'Six to three in favour', 'Five to four against', 'Deferred to next month'], a: 1, w: 'Council voted six to three to proceed.' },
      { q: 'Which portion of the funding is least certain?', o: ['The eleven million from senior governments', 'The fourteen million to be borrowed', 'The six million from fundraising', 'The nine million in repair savings'], a: 2, w: 'The fundraising campaign has not yet begun.' },
      { q: 'What was the main objection from opposing councillors?', o: ['The building design is too large', 'A fundraising shortfall would fall on taxpayers', 'The location is wrong', 'Construction will take too long'], a: 1, w: 'They argued the shortfall lands on the tax base by default.' },
      { q: 'What was added to the design after public consultation?', o: ['A twenty-five-metre pool', 'A double gymnasium', 'A licensed childcare space', 'An outdoor rink'], a: 2, w: 'Forty childcare spots were added in a change from the original design.' },
      { q: 'How long will the centre be closed?', o: ['About twelve months', 'About twenty months', 'About twenty-six months', 'Four years'], a: 2, w: 'Approximately twenty-six months.' }
    ]
  }]
});

/* ---------------- PART 5 — Listening to a Discussion (8 Q, 3+ speakers) ---------------- */
BANK_LISTENING.push({
  id: 'L5-01', part: 5, clb: 8, title: 'Rebuilding the Volunteer Schedule',
  setting: 'Hospital volunteer services meeting',
  blocks: [{
    segments: [
      { s: 'Narrator', t: 'You will hear a discussion among three people. Listen carefully. You will hear it only once.' },
      { s: 'Farrah', t: "Thanks for coming in. The problem in one sentence: we have ninety-four active volunteers and we cannot fill the Tuesday and Wednesday afternoon shifts, which are the two busiest afternoons in the outpatient wing." },
      { s: 'Dev', t: "Is it that people won't take those shifts, or that they don't know they exist? Because the sign-up portal shows three weeks ahead, and by the time a retiree checks it on a Sunday, the pleasant shifts are gone." },
      { s: 'Farrah', t: "Both, honestly. But your point about the portal is the one we can act on." },
      { s: 'Louise', t: "I'd push back slightly. I've been volunteering here eleven years and the issue isn't the portal, it's parking. Tuesday and Wednesday afternoons overlap with the clinic block, the lot is full by one, and volunteers end up circling for twenty minutes and paying nine dollars." },
      { s: 'Dev', t: "We don't reimburse parking?" },
      { s: 'Louise', t: "Not for shifts under four hours. And the afternoon shifts are three and a half." },
      { s: 'Farrah', t: "That's a rule I can change today, and I should have heard about it sooner." },
      { s: 'Dev', t: "Then let's separate the two fixes. Parking is the immediate one. The scheduling piece I'd solve differently — open a standing assignment, where someone commits to the same shift every week for a term, instead of picking from the portal each time." },
      { s: 'Louise', t: "Standing assignments work beautifully for retirees and terribly for students, and students are half our new sign-ups." },
      { s: 'Dev', t: "Then offer both, and reserve, say, four of the twelve afternoon slots for standing assignments so students still have something to pick up." },
      { s: 'Farrah', t: "I like that. Louise, would you be willing to call the twenty volunteers who dropped out last year and ask why? I suspect we'll hear parking again, but I'd rather know than guess." },
      { s: 'Louise', t: "I'll do it, but I want to ask them a second question too: whether anyone actually told them they were missed." }
    ],
    questions: [
      { q: 'What specific problem opens the meeting?', o: ['Too few volunteers overall', 'Tuesday and Wednesday afternoon shifts go unfilled', 'Volunteers arrive late for shifts', 'The outpatient wing is closing'], a: 1, w: 'Ninety-four volunteers exist, but those two afternoons cannot be filled.' },
      { q: 'What is Dev\'s initial explanation?', o: ['Volunteers are not paid enough', 'The portal opens only three weeks ahead, so good shifts are gone', 'The shifts are too physically demanding', 'Training is insufficient'], a: 1, w: 'He argues visibility and timing on the portal.' },
      { q: 'What does Louise identify as the real cause?', o: ['Parking during the clinic block', 'Poor communication from management', 'The length of the shifts', 'Conflicts with student timetables'], a: 0, w: 'The lot fills by one and volunteers pay nine dollars.' },
      { q: 'Why is parking not reimbursed for these volunteers?', o: ['The hospital has no parking budget', 'Reimbursement applies only to shifts of four hours or more', 'Only paid staff are reimbursed', 'They park in the wrong lot'], a: 1, w: 'Afternoon shifts are three and a half hours, under the four-hour rule.' },
      { q: 'What is Farrah\'s reaction to the parking rule?', o: ['She defends it as necessary', 'She says she can change it today', 'She asks for a written proposal', 'She refers it to the board'], a: 1, w: 'She says it is a rule she can change today.' },
      { q: 'What is the drawback of standing assignments?', o: ['They are more expensive to administer', 'They suit retirees but not students', 'They require longer training', 'They cannot be scheduled in advance'], a: 1, w: 'Louise notes students are half of new sign-ups.' },
      { q: 'What compromise does Dev propose?', o: ['Abolishing the portal entirely', 'Reserving four of twelve afternoon slots for standing assignments', 'Recruiting only retirees', 'Extending shifts to four hours'], a: 1, w: 'Both systems run side by side with a four-slot reservation.' },
      { q: 'What does Louise want to add to the exit calls?', o: ['A request for a donation', 'A question about whether anyone told them they were missed', 'An offer of a new shift', 'A satisfaction rating out of ten'], a: 1, w: 'Her second question is about being missed.' }
    ]
  }]
});

BANK_LISTENING.push({
  id: 'L5-02', part: 5, clb: 9, title: 'The School Lunch Proposal',
  setting: 'Elementary school council meeting',
  blocks: [{
    segments: [
      { s: 'Narrator', t: 'You will hear a discussion among four people. Listen carefully. You will hear it only once.' },
      { s: 'Chair', t: "Item three is the universal lunch proposal. Just to frame it: every student gets the same meal, no forms, no identification of who pays. Meera, you drafted it." },
      { s: 'Meera', t: "I did. The reason for universal rather than targeted is simple. We currently run a subsidy program and only about a third of eligible families use it, because a child has to hand a different card to the cashier. Universal removes the card." },
      { s: 'Tom', t: "I support the goal. My worry is the number. Forty thousand a year for a school of three hundred and ten, and the board's contribution caps at fifteen." },
      { s: 'Meera', t: "The gap is twenty-five, yes. Half of that we've already raised through the spring campaign." },
      { s: 'Tom', t: "Raised once. My concern is year two and year three, when the novelty is gone and we're still committed." },
      { s: 'Ana', t: "Can I bring in what the kitchen can actually do? Whatever the funding, we cook in a room with one convection oven and no walk-in cooler. Three hundred and ten hot meals a day is not physically possible in that space. Cold meals are." },
      { s: 'Chair', t: "That's a constraint we hadn't costed." },
      { s: 'Ana', t: "It's also an opportunity. A cold programme — sandwiches, a hot soup from a warmer twice a week — is about sixty percent of the cost, and it needs one staff member instead of three." },
      { s: 'Meera', t: "I'd accept cold if the alternative is nothing. What I won't accept is going back to the card." },
      { s: 'Tom', t: "Then let's put the sustainability question where it belongs. Rather than fundraising annually, we ask the board to fold the programme into the operating budget from year two, and we present year one as the pilot with the data." },
      { s: 'Chair', t: "So: cold programme, one year pilot, funded by the campaign, with an evidence submission to the board in April. Ana, can you cost that by our next meeting?" },
      { s: 'Ana', t: "I can, but I want a decision on one thing first — whether we're serving all three hundred and ten every day, or offering it and accepting that maybe two hundred take it. The equipment answer is different." }
    ],
    questions: [
      { q: 'Why does Meera prefer a universal programme to a targeted one?', o: ['It is cheaper to administer', 'It removes the card that identifies subsidised students', 'The board requires it', 'It offers better nutrition'], a: 1, w: 'Only a third of eligible families use the subsidy because of the card.' },
      { q: 'What is Tom\'s principal concern?', o: ['The quality of the food', 'Funding in years two and three', 'The lack of parental consent', 'The school\'s enrolment falling'], a: 1, w: 'He accepts the goal but questions ongoing sustainability.' },
      { q: 'How large is the funding gap after the board\'s contribution?', o: ['$15,000', '$25,000', '$40,000', '$60,000'], a: 1, w: 'Forty thousand total minus a fifteen-thousand cap.' },
      { q: 'What constraint does Ana introduce?', o: ['A shortage of volunteers', 'The kitchen cannot produce 310 hot meals daily', 'Allergy management rules', 'The lunch period is too short'], a: 1, w: 'One convection oven, no walk-in cooler.' },
      { q: 'What advantage does the cold programme offer?', o: ['It is more popular with students', 'It costs about sixty percent as much and needs one staff member', 'It can be prepared off-site', 'It requires no funding at all'], a: 1, w: 'Ana gives both the cost and staffing figures.' },
      { q: 'What is Meera unwilling to give up?', o: ['Hot meals', 'The spring campaign', 'Removing the identifying card', 'The board\'s contribution'], a: 2, w: '"What I won\'t accept is going back to the card."' },
      { q: 'What does Tom propose for long-term funding?', o: ['An annual fundraising campaign', 'Charging families who can afford it', 'Asking the board to fold it into the operating budget from year two', 'Applying for a provincial grant'], a: 2, w: 'Year one becomes a pilot that produces evidence for the board.' },
      { q: 'What does Ana need decided before she can cost the plan?', o: ['Which supplier to use', 'Whether all 310 students are served or only those who opt in', 'When the pilot starts', 'Who will supervise the lunch period'], a: 1, w: 'The equipment answer differs between 310 and about 200.' }
    ]
  }]
});

BANK_LISTENING.push({
  id: 'L5-03', part: 5, clb: 8, title: 'Charging Stations in the Parkade',
  setting: 'Condominium board meeting',
  blocks: [{
    segments: [
      { s: 'Narrator', t: 'You will hear a discussion among three people. Listen carefully. You will hear it only once.' },
      { s: 'Ben', t: "Four owners have now asked to install charging stations at their parking stalls, and we've said no three times without a policy. That's the part I'm uncomfortable with — we're deciding case by case." },
      { s: 'Sylvia', t: "The engineering report is the reason we said no. Our building's electrical service has about ninety amps of spare capacity. One level-two charger draws forty. So two chargers, and we're done — permanently, for the whole building." },
      { s: 'Colin', t: "Unless we load-share. The report priced that too: a load management system lets twelve stalls share the same ninety amps, because nobody charges at full draw all night. It's a hundred and forty thousand installed." },
      { s: 'Sylvia', t: "A hundred and forty thousand from a reserve fund that's already short for the roof in 2031." },
      { s: 'Ben', t: "Which is why I'd rather not fund it from the reserve at all. The owners who want chargers pay for the system, through a user levy, and they get exclusive use until the cost is recovered." },
      { s: 'Colin', t: "That's clean, but it caps us at whoever can write a cheque this year. In eight years, when half the building is electric, we'll be renegotiating with the four people who paid." },
      { s: 'Sylvia', t: "Then build the recovery into the agreement now. After the cost is recovered, the system becomes common property and any owner can buy in at the depreciated rate." },
      { s: 'Ben', t: "I could support that. What I still don't know is whether we're legally able to grant exclusive use of common-property electrical capacity to four owners without a special resolution." },
      { s: 'Colin', t: "We aren't. I checked with the property manager. Anything that assigns common property to individual owners needs a seventy-five percent vote at a general meeting." },
      { s: 'Sylvia', t: "Then the sequence is: draft the policy, get the legal opinion in writing, put it to the AGM in March, and tell the four owners honestly that nothing happens before then." }
    ],
    questions: [
      { q: 'What makes Ben uncomfortable about the current situation?', o: ['The cost of the engineering report', 'Decisions are being made case by case with no policy', 'Too many owners want chargers', 'The property manager was not consulted'], a: 1, w: 'Three refusals without a policy is his stated concern.' },
      { q: 'Why can the building support only two chargers directly?', o: ['Only two stalls are near an electrical panel', 'Spare capacity is 90 amps and each charger draws 40', 'The city permits only two per building', 'The reserve fund covers only two'], a: 1, w: 'Ninety amps spare, forty amps per level-two charger.' },
      { q: 'What does a load management system do?', o: ['Reduces the building\'s total electricity bill', 'Lets twelve stalls share the same 90 amps', 'Doubles the building\'s electrical service', 'Charges vehicles faster'], a: 1, w: 'It works because nobody draws full power all night.' },
      { q: 'What is Sylvia\'s objection to the $140,000 cost?', o: ['It is more than the chargers are worth', 'The reserve fund is already short for the 2031 roof', 'Owners would not approve any spending', 'The price will fall in a few years'], a: 1, w: 'She raises the competing reserve obligation.' },
      { q: 'What does Ben propose instead of reserve funding?', o: ['A bank loan repaid by all owners', 'A user levy paid by owners who want chargers', 'Delaying until the roof is done', 'Renting the stalls to an outside company'], a: 1, w: 'Those owners fund it and get exclusive use until recovery.' },
      { q: 'What long-term problem does Colin see with that?', o: ['The equipment will be obsolete', 'Future owners will have to negotiate with the four who paid', 'The levy would be illegal', 'It would raise everyone\'s condo fees'], a: 1, w: 'He projects the position eight years out.' },
      { q: 'What is Sylvia\'s solution to Colin\'s objection?', o: ['Abandon the project', 'After cost recovery, the system becomes common property with buy-in at a depreciated rate', 'Limit chargers to two owners', 'Charge future owners double'], a: 1, w: 'Recovery terms are built into the agreement from the start.' },
      { q: 'What legal requirement does Colin confirm?', o: ['A building permit from the city', 'A 75% vote at a general meeting', 'Written consent from every owner', 'Approval from the electrical utility'], a: 1, w: 'Assigning common property needs a seventy-five percent vote.' }
    ]
  }]
});

/* ---------------- PART 6 — Listening to Viewpoints (6 Q, single speaker) ---------------- */
BANK_LISTENING.push({
  id: 'L6-01', part: 6, clb: 9, title: 'A View on the Four-Day School Week',
  setting: 'Radio commentary',
  blocks: [{
    segments: [
      { s: 'Narrator', t: 'You will hear a person expressing an opinion. Listen carefully. You will hear it only once.' },
      { s: 'Speaker', t: "I taught for nineteen years in a district that moved to a four-day week, and I want to be careful about how I describe what happened, because the honest answer is more complicated than either side usually admits. The district did not do it for pedagogy. It did it because it could not hire enough teachers, and a four-day week was the only lever it had that cost nothing. That's worth saying plainly. Once we were in it, the effects surprised me. My Monday-to-Thursday classes were noticeably better than my old five-day classes had been, because the periods were longer and I stopped losing fifteen minutes a day to transitions. Attendance improved. Teacher sick days dropped by nearly a third, which the superintendent liked to quote and which I think was mostly people scheduling appointments on Fridays instead of taking a whole day. But the costs landed unevenly, and that's my real objection. Families with a parent at home absorbed the fifth day easily. Families working two jobs did not. The district offered a Friday programme at four schools, and it filled instantly, which tells you the demand was there and the supply wasn't. So when someone asks whether I support the four-day week, my answer is that I support it only where the fifth day is funded, staffed and open to everyone — and that in most districts I've seen, it isn't. Without that, we haven't shortened the school week. We've quietly moved a day of childcare onto the families least able to carry it." }
    ],
    questions: [
      { q: 'Why did the speaker\'s district adopt the four-day week?', o: ['Research showed it improved learning', 'Parents voted for it', 'It could not hire enough teachers', 'It reduced the district\'s heating costs'], a: 2, w: 'The speaker says plainly it was a hiring problem, not pedagogy.' },
      { q: 'What classroom improvement did the speaker observe?', o: ['Smaller class sizes', 'Longer periods with less time lost to transitions', 'More teaching assistants', 'Better classroom technology'], a: 1, w: 'He stopped losing fifteen minutes a day to transitions.' },
      { q: 'How does the speaker explain the drop in teacher sick days?', o: ['Teachers were healthier overall', 'Teachers scheduled appointments on Fridays instead of taking full days', 'The district changed its leave policy', 'Fewer teachers remained on staff'], a: 1, w: 'He attributes it to appointment scheduling, not health.' },
      { q: 'What is the speaker\'s main objection?', o: ['Test scores declined', 'The costs fell unevenly on families', 'Teachers were paid less', 'The school year became too long'], a: 1, w: 'Families working two jobs could not absorb the fifth day.' },
      { q: 'What does the speaker conclude from the Friday programme filling instantly?', o: ['That parents disliked the four-day week', 'That demand existed but supply did not', 'That the programme was too cheap', 'That four schools were enough'], a: 1, w: 'Instant filling shows demand exceeding supply.' },
      { q: 'Under what condition would the speaker support the four-day week?', o: ['If teacher salaries increased', 'If the fifth day is funded, staffed and open to everyone', 'If it were adopted province-wide', 'If class sizes were reduced first'], a: 1, w: 'That is his explicit condition.' }
    ]
  }]
});

BANK_LISTENING.push({
  id: 'L6-02', part: 6, clb: 8, title: 'A View on Remote Work and the Downtown',
  setting: 'Panel remarks',
  blocks: [{
    segments: [
      { s: 'Narrator', t: 'You will hear a person expressing an opinion. Listen carefully. You will hear it only once.' },
      { s: 'Speaker', t: "I run a sandwich shop two blocks from the tower district, so people expect me to be angry about remote work. I'm not, and I want to explain why, because I think the debate is stuck in the wrong frame. Yes, my weekday lunch revenue is down about thirty percent from what it was, and Mondays and Fridays are nearly dead. That's real and I won't minimise it. But the thing nobody mentions is that my costs changed too. I run three staff instead of six, my hours are shorter, and I stopped opening at six-thirty for a commuter rush that isn't coming back. My margin per customer is actually better than it was. What I'd genuinely like to see is the city stop trying to rebuild the nine-to-five and start noticing who's actually downtown now. On Saturdays my street is busier than it was five years ago. The people walking past me are residents, not commuters — they live in the converted buildings up the block. They buy differently, they come at different hours, and they're more loyal, because it's their neighbourhood, not their office. So when the business association lobbies for return-to-office mandates, I don't sign the letter. I think that's fighting the last war. What I want is more residential conversion, a grocery store within walking distance, and someone to fix the fact that half the ground-floor units on my block have been empty for three years because the landlords are still asking office-era rents."
      }
    ],
    questions: [
      { q: 'What has happened to the speaker\'s weekday lunch revenue?', o: ['It has grown slightly', 'It is down about thirty percent', 'It is unchanged', 'It has halved'], a: 1, w: 'Down about thirty percent, with Mondays and Fridays nearly dead.' },
      { q: 'Why is the speaker not angry about remote work?', o: ['Business has fully recovered', 'Costs fell as well, and margin per customer improved', 'The city compensated affected businesses', 'The shop moved to a new location'], a: 1, w: 'Three staff instead of six, shorter hours, better margin per customer.' },
      { q: 'Who does the speaker say is downtown now?', o: ['Tourists', 'Commuters at different hours', 'Residents from converted buildings', 'Students from a nearby campus'], a: 2, w: 'They live in the converted buildings up the block.' },
      { q: 'How does the speaker describe these customers?', o: ['They spend more per visit', 'They come at different hours and are more loyal', 'They come only on weekdays', 'They prefer delivery'], a: 1, w: 'Different hours, more loyal, because it is their neighbourhood.' },
      { q: 'What is the speaker\'s position on return-to-office mandates?', o: ['Strongly in favour', 'Refuses to support them; calls it fighting the last war', 'Neutral', 'Supports them only for large employers'], a: 1, w: 'He does not sign the business association\'s letter.' },
      { q: 'What does the speaker blame for empty ground-floor units?', o: ['Lack of foot traffic', 'Landlords still asking office-era rents', 'City zoning restrictions', 'High property taxes'], a: 1, w: 'He names the rents landlords are still asking.' }
    ]
  }]
});

BANK_LISTENING.push({
  id: 'L6-03', part: 6, clb: 10, title: 'A View on Laneway Housing',
  setting: 'Community meeting remarks',
  blocks: [{
    segments: [
      { s: 'Narrator', t: 'You will hear a person expressing an opinion. Listen carefully. You will hear it only once.' },
      { s: 'Speaker', t: "I've lived on this block for thirty-one years and I've been on both sides of this argument, which is why I'm going to disappoint everyone tonight. When laneway houses were first proposed, I opposed them, and my reasons were the ordinary ones: shadowing, parking, the character of the street. Two of those three turned out to be wrong. Shadowing is regulated and the regulation works — I can stand in my garden in June and tell you it works. Character, I'll concede, is a word people use when they mean something they can't say out loud. Parking, though, was a legitimate concern and it was handled badly. The city removed the parking requirement without doing anything about permit allocation, so we now have a street where the same number of spaces serves forty percent more households, and the people who lose that competition are the ones who work shifts and come home at eleven at night. That's not an argument against laneway houses. It's an argument against the specific way we did it. Where I've genuinely changed my mind is on who lives in them. I assumed short-term rentals. What I've watched instead is my neighbour's mother move in behind their house, and a young couple who both work at the hospital rent the one at number twelve, and a widower downsize into his own backyard and rent out the main house. Those are not strangers passing through. They're the same street, at different stages of life. If I could go back and change one thing, it wouldn't be to stop the laneway houses. It would be to fight just as hard for the parking permit system as I did against the buildings themselves — and to have noticed sooner that I was arguing about shadows when the real question was who gets to stay in a neighbourhood as it changes." }
    ],
    questions: [
      { q: 'What was the speaker\'s original position on laneway houses?', o: ['Strong support', 'Opposition, on grounds of shadowing, parking and character', 'Indifference', 'Support with conditions'], a: 1, w: 'Those are the three reasons given for the original opposition.' },
      { q: 'What does the speaker now say about shadowing?', o: ['It remains the worst problem', 'The regulation works, verified from personal experience', 'It was never studied', 'It affects only some properties'], a: 1, w: 'He can stand in his garden in June and confirm it works.' },
      { q: 'What does the speaker suggest about the word "character"?', o: ['It is the strongest argument against density', 'It is a word people use for something they cannot say aloud', 'It should be defined in the bylaw', 'It matters more than parking'], a: 1, w: 'He concedes this pointedly.' },
      { q: 'What specific failure does the speaker identify?', o: ['Removing the parking requirement without fixing permit allocation', 'Building the houses too close together', 'Allowing short-term rentals', 'Approving too many units at once'], a: 0, w: 'Same spaces, forty percent more households, no permit reform.' },
      { q: 'Who does the speaker say loses the parking competition?', o: ['Elderly residents', 'People who work shifts and come home late', 'New arrivals to the neighbourhood', 'Families with two cars'], a: 1, w: 'Shift workers arriving at eleven at night.' },
      { q: 'What changed the speaker\'s mind most?', o: ['New shadowing studies', 'A drop in property taxes', 'Seeing who actually lives in the units', 'Pressure from the city'], a: 2, w: 'A mother, a hospital couple, a widower downsizing — not strangers passing through.' }
    ]
  }]
});
