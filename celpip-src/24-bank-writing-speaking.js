/* ============================================================
   PART 24 — OFFLINE ITEM BANK: WRITING + SPEAKING (+ SVG scenes)
   ============================================================ */

/* ---------------- SCENES for Speaking Tasks 3 & 4 ---------------- */
const SCENES = {
  s1: {
    name: 'Community centre parking lot, winter afternoon',
    svg: `<svg viewBox="0 0 640 380" width="100%" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Winter parking lot scene">
<rect width="640" height="380" fill="#dce7f3"/>
<rect y="150" width="640" height="230" fill="#f2f6fa"/>
<rect y="150" width="640" height="14" fill="#c9d6e4"/>
<!-- building -->
<rect x="18" y="58" width="212" height="98" fill="#a8bdd4"/><rect x="18" y="48" width="212" height="14" fill="#7f97b3"/>
<rect x="36" y="80" width="42" height="34" fill="#e9f1f8"/><rect x="90" y="80" width="42" height="34" fill="#e9f1f8"/>
<rect x="144" y="80" width="42" height="34" fill="#e9f1f8"/>
<rect x="98" y="118" width="46" height="38" fill="#5f7794"/>
<text x="42" y="40" font-size="13" fill="#37485e" font-family="sans-serif">RIVERBEND COMMUNITY CENTRE</text>
<!-- snowbanks -->
<path d="M0 300 Q80 268 170 300 T340 300 T520 296 T640 306 L640 380 L0 380Z" fill="#ffffff"/>
<path d="M240 168 Q286 150 330 168 Q300 176 240 168Z" fill="#ffffff"/>
<!-- car with flat tire -->
<rect x="252" y="206" width="132" height="34" rx="9" fill="#c8534c"/>
<path d="M276 206 L296 184 L346 184 L364 206 Z" fill="#8fa9c4"/>
<circle cx="282" cy="243" r="13" fill="#39404a"/><circle cx="282" cy="243" r="5" fill="#8b939c"/>
<ellipse cx="356" cy="246" rx="14" ry="9" fill="#39404a"/><circle cx="356" cy="246" r="4" fill="#8b939c"/>
<text x="330" y="268" font-size="11" fill="#8a3b36" font-family="sans-serif">flat tire</text>
<!-- person on phone next to car -->
<circle cx="410" cy="196" r="11" fill="#e8c39b"/><rect x="401" y="208" width="19" height="38" rx="7" fill="#2f6f5e"/>
<rect x="418" y="212" width="9" height="20" rx="4" fill="#e8c39b" transform="rotate(-28 418 212)"/>
<rect x="404" y="246" width="6" height="24" fill="#3b4654"/><rect x="413" y="246" width="6" height="24" fill="#3b4654"/>
<rect x="392" y="186" width="26" height="8" rx="4" fill="#b34a3f"/>
<!-- second adult carrying a box -->
<circle cx="476" cy="200" r="11" fill="#c8926a"/><rect x="467" y="212" width="20" height="36" rx="7" fill="#6a5aa8"/>
<rect x="462" y="220" width="30" height="18" rx="3" fill="#c9a267"/>
<rect x="470" y="248" width="6" height="22" fill="#3b4654"/><rect x="479" y="248" width="6" height="22" fill="#3b4654"/>
<!-- two children with a sled -->
<circle cx="150" cy="234" r="9" fill="#e8c39b"/><rect x="143" y="244" width="16" height="26" rx="6" fill="#d8734f"/>
<rect x="145" y="270" width="5" height="16" fill="#3b4654"/><rect x="152" y="270" width="5" height="16" fill="#3b4654"/>
<circle cx="182" cy="238" r="9" fill="#8d6748"/><rect x="175" y="248" width="16" height="24" rx="6" fill="#4b83c4"/>
<rect x="177" y="272" width="5" height="14" fill="#3b4654"/><rect x="184" y="272" width="5" height="14" fill="#3b4654"/>
<path d="M120 292 h72 l-6 10 h-60 Z" fill="#e0a13c"/><path d="M120 292 l-10 -8" stroke="#8a6a2c" stroke-width="3"/>
<!-- bus stop and bus -->
<rect x="546" y="150" width="6" height="86" fill="#66788c"/><rect x="528" y="140" width="42" height="16" rx="3" fill="#2f6f9e"/>
<text x="533" y="152" font-size="9" fill="#fff" font-family="sans-serif">BUS 12</text>
<rect x="560" y="196" width="80" height="46" rx="6" fill="#3f7fb5"/><rect x="568" y="204" width="24" height="18" fill="#dbe9f5"/>
<rect x="600" y="204" width="24" height="18" fill="#dbe9f5"/><circle cx="582" cy="244" r="9" fill="#39404a"/><circle cx="620" cy="244" r="9" fill="#39404a"/>
<!-- person waiting with dog -->
<circle cx="512" cy="206" r="10" fill="#e8c39b"/><rect x="504" y="217" width="17" height="32" rx="6" fill="#a83f5b"/>
<rect x="506" y="249" width="5" height="20" fill="#3b4654"/><rect x="514" y="249" width="5" height="20" fill="#3b4654"/>
<ellipse cx="536" cy="258" rx="15" ry="8" fill="#8b6b4a"/><circle cx="549" cy="252" r="6" fill="#8b6b4a"/><rect x="522" y="256" width="6" height="10" fill="#8b6b4a"/>
<!-- falling snow -->
<g fill="#ffffff" opacity="0.9"><circle cx="60" cy="40" r="3"/><circle cx="130" cy="24" r="2.5"/><circle cx="300" cy="46" r="3"/><circle cx="380" cy="20" r="2.5"/><circle cx="470" cy="52" r="3"/><circle cx="560" cy="30" r="2.5"/><circle cx="210" cy="66" r="2.5"/><circle cx="600" cy="80" r="3"/><circle cx="90" cy="110" r="2.5"/><circle cx="420" cy="118" r="2.5"/></g>
<!-- sign -->
<rect x="240" y="120" width="86" height="26" rx="4" fill="#ffffff" stroke="#8fa0b4"/><text x="248" y="137" font-size="10" fill="#42566d" font-family="sans-serif">LOT FULL 4–6 PM</text>
</svg>`
  },
  s2: {
    name: 'Outdoor farmers\' market, summer morning',
    svg: `<svg viewBox="0 0 640 380" width="100%" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Farmers market scene">
<rect width="640" height="380" fill="#cfe6f5"/><circle cx="560" cy="52" r="30" fill="#ffe08a"/>
<rect y="228" width="640" height="152" fill="#d9d2c4"/><rect y="228" width="640" height="10" fill="#bdb5a5"/>
<!-- trees -->
<rect x="40" y="150" width="12" height="82" fill="#7a5a3c"/><circle cx="46" cy="140" r="34" fill="#4f9b5e"/>
<rect x="596" y="160" width="12" height="72" fill="#7a5a3c"/><circle cx="602" cy="150" r="28" fill="#4f9b5e"/>
<!-- stall 1 : produce -->
<path d="M96 132 h150 l14 26 h-178 Z" fill="#d8564e"/><rect x="104" y="158" width="8" height="76" fill="#8d7a63"/><rect x="238" y="158" width="8" height="76" fill="#8d7a63"/>
<rect x="98" y="196" width="152" height="12" fill="#a98f6f"/><rect x="98" y="208" width="152" height="26" fill="#c4a882"/>
<circle cx="118" cy="188" r="8" fill="#e2603f"/><circle cx="136" cy="188" r="8" fill="#e2603f"/><circle cx="154" cy="188" r="8" fill="#e8a33c"/>
<circle cx="172" cy="188" r="8" fill="#e8a33c"/><circle cx="192" cy="188" r="8" fill="#7bb356"/><circle cx="212" cy="188" r="8" fill="#7bb356"/>
<text x="128" y="152" font-size="12" fill="#fff" font-family="sans-serif">FRESH PRODUCE</text>
<!-- vendor behind stall -->
<circle cx="170" cy="166" r="11" fill="#8d6748"/><rect x="161" y="178" width="19" height="20" rx="6" fill="#2f6f5e"/>
<!-- stall 2 : bakery -->
<path d="M330 140 h140 l13 24 h-166 Z" fill="#3f7fb5"/><rect x="336" y="164" width="8" height="70" fill="#8d7a63"/><rect x="464" y="164" width="8" height="70" fill="#8d7a63"/>
<rect x="330" y="198" width="146" height="12" fill="#a98f6f"/><rect x="330" y="210" width="146" height="24" fill="#c4a882"/>
<ellipse cx="358" cy="190" rx="13" ry="7" fill="#c58a4a"/><ellipse cx="392" cy="190" rx="13" ry="7" fill="#c58a4a"/><ellipse cx="426" cy="190" rx="13" ry="7" fill="#d9a862"/>
<text x="358" y="158" font-size="12" fill="#fff" font-family="sans-serif">BAKERY</text>
<!-- customers -->
<circle cx="272" cy="196" r="12" fill="#e8c39b"/><rect x="262" y="209" width="21" height="40" rx="7" fill="#6a5aa8"/>
<rect x="265" y="249" width="6" height="26" fill="#3b4654"/><rect x="275" y="249" width="6" height="26" fill="#3b4654"/>
<rect x="283" y="222" width="18" height="20" rx="3" fill="#8fbf76"/>
<circle cx="300" cy="204" r="9" fill="#c8926a"/><rect x="292" y="215" width="17" height="30" rx="6" fill="#d8734f"/>
<rect x="294" y="245" width="5" height="20" fill="#3b4654"/><rect x="302" y="245" width="5" height="20" fill="#3b4654"/>
<circle cx="508" cy="192" r="12" fill="#8d6748"/><rect x="498" y="205" width="21" height="40" rx="7" fill="#a83f5b"/>
<rect x="501" y="245" width="6" height="26" fill="#3b4654"/><rect x="511" y="245" width="6" height="26" fill="#3b4654"/>
<!-- stroller -->
<rect x="536" y="216" width="34" height="20" rx="6" fill="#4b6b8c"/><circle cx="542" cy="244" r="8" fill="#39404a"/><circle cx="566" cy="244" r="8" fill="#39404a"/>
<path d="M536 216 l-10 -18" stroke="#4b6b8c" stroke-width="4"/>
<!-- busker with guitar -->
<circle cx="80" cy="212" r="11" fill="#e8c39b"/><rect x="71" y="224" width="19" height="34" rx="6" fill="#e0a13c"/>
<rect x="73" y="258" width="5" height="18" fill="#3b4654"/><rect x="82" y="258" width="5" height="18" fill="#3b4654"/>
<ellipse cx="96" cy="240" rx="14" ry="10" fill="#a8703c" transform="rotate(-20 96 240)"/><rect x="104" y="216" width="4" height="22" fill="#7a5a3c" transform="rotate(-20 104 216)"/>
<rect x="62" y="268" width="30" height="10" rx="2" fill="#6b6257"/>
<!-- dog on leash -->
<ellipse cx="220" cy="256" rx="16" ry="9" fill="#3b3b3b"/><circle cx="234" cy="248" r="7" fill="#3b3b3b"/><rect x="206" y="254" width="6" height="12" fill="#3b3b3b"/>
<!-- sign -->
<rect x="240" y="96" width="140" height="26" rx="4" fill="#ffffff" stroke="#8fa0b4"/><text x="248" y="114" font-size="12" fill="#42566d" font-family="sans-serif">MARKET · SAT 8–1</text>
</svg>`
  },
  s3: {
    name: 'Apartment lobby on moving day',
    svg: `<svg viewBox="0 0 640 380" width="100%" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Apartment lobby scene">
<rect width="640" height="380" fill="#eae5dc"/><rect y="300" width="640" height="80" fill="#c9c0b2"/>
<rect y="296" width="640" height="8" fill="#a89e8e"/>
<!-- back wall + elevator -->
<rect x="360" y="70" width="150" height="230" fill="#b9b0a2"/>
<rect x="382" y="104" width="50" height="180" fill="#8e97a1"/><rect x="440" y="104" width="50" height="180" fill="#8e97a1"/>
<rect x="382" y="86" width="108" height="12" fill="#6e7885"/>
<rect x="396" y="150" width="76" height="34" rx="4" fill="#fff5cc" stroke="#c9a227" stroke-width="2"/>
<text x="404" y="164" font-size="10" fill="#8a6d0f" font-family="sans-serif">ELEVATOR B</text>
<text x="406" y="177" font-size="10" fill="#b02a22" font-family="sans-serif">OUT OF SERVICE</text>
<!-- glass doors left -->
<rect x="40" y="80" width="130" height="220" fill="#cfe3f0"/><rect x="40" y="80" width="130" height="220" fill="none" stroke="#8fa0b4" stroke-width="3"/>
<line x1="105" y1="80" x2="105" y2="300" stroke="#8fa0b4" stroke-width="3"/>
<!-- moving truck outside -->
<rect x="44" y="150" width="86" height="60" fill="#dfe7ec"/><rect x="120" y="170" width="44" height="40" fill="#c2ced6"/>
<circle cx="70" cy="214" r="9" fill="#6b7480"/><circle cx="140" cy="214" r="9" fill="#6b7480"/>
<!-- stacked boxes -->
<rect x="196" y="236" width="54" height="46" fill="#c9a267" stroke="#a8834a"/><rect x="196" y="196" width="54" height="40" fill="#d6b077" stroke="#a8834a"/>
<rect x="206" y="196" width="34" height="6" fill="#a8834a"/>
<rect x="256" y="248" width="46" height="34" fill="#c9a267" stroke="#a8834a"/>
<!-- mover with dolly -->
<circle cx="330" cy="196" r="12" fill="#c8926a"/><rect x="320" y="209" width="22" height="40" rx="7" fill="#2f6f5e"/>
<rect x="323" y="249" width="6" height="28" fill="#3b4654"/><rect x="334" y="249" width="6" height="28" fill="#3b4654"/>
<rect x="296" y="222" width="4" height="62" fill="#5c646e"/><rect x="290" y="282" width="26" height="5" fill="#5c646e"/>
<circle cx="296" cy="288" r="7" fill="#39404a"/>
<rect x="266" y="236" width="30" height="44" fill="#d6b077" stroke="#a8834a"/>
<!-- resident with grocery bags, frustrated -->
<circle cx="546" cy="188" r="12" fill="#e8c39b"/><rect x="536" y="201" width="22" height="42" rx="7" fill="#a83f5b"/>
<rect x="539" y="243" width="6" height="30" fill="#3b4654"/><rect x="550" y="243" width="6" height="30" fill="#3b4654"/>
<rect x="522" y="216" width="18" height="24" rx="2" fill="#8fbf76"/><rect x="556" y="216" width="18" height="24" rx="2" fill="#8fbf76"/>
<text x="512" y="170" font-size="22" fill="#b02a22" font-family="sans-serif">!</text>
<!-- concierge desk -->
<rect x="520" y="252" width="110" height="46" fill="#8d6a4a"/><rect x="520" y="244" width="110" height="10" fill="#a8834a"/>
<circle cx="600" cy="222" r="11" fill="#8d6748"/><rect x="591" y="234" width="19" height="16" rx="5" fill="#3f5f8f"/>
<!-- delivery parcels by door -->
<rect x="176" y="266" width="28" height="20" fill="#d6b077" stroke="#a8834a"/><rect x="150" y="272" width="24" height="14" fill="#c9a267" stroke="#a8834a"/>
<!-- notice board -->
<rect x="196" y="100" width="120" height="76" fill="#f3efe6" stroke="#a89e8e" stroke-width="2"/>
<rect x="206" y="112" width="44" height="26" fill="#dfe7ec"/><rect x="258" y="112" width="46" height="26" fill="#dfe7ec"/>
<rect x="206" y="146" width="98" height="8" fill="#dfe7ec"/><rect x="206" y="158" width="70" height="8" fill="#dfe7ec"/>
<text x="212" y="96" font-size="10" fill="#6b6257" font-family="sans-serif">NOTICES</text>
<!-- plant -->
<rect x="352" y="268" width="26" height="30" fill="#a86b4a"/><circle cx="365" cy="256" r="20" fill="#4f9b5e"/>
</svg>`
  },
  s4: {
    name: 'Neighbourhood park, rainy afternoon',
    svg: `<svg viewBox="0 0 640 380" width="100%" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Rainy park scene">
<rect width="640" height="380" fill="#9fb0bd"/><rect y="250" width="640" height="130" fill="#7f9a72"/>
<rect y="248" width="640" height="8" fill="#6b8460"/>
<!-- path + puddles -->
<path d="M0 320 Q160 300 320 322 T640 312 L640 340 Q320 350 0 344Z" fill="#b9ac96"/>
<ellipse cx="180" cy="332" rx="40" ry="9" fill="#8fa6b8" opacity=".85"/><ellipse cx="430" cy="326" rx="30" ry="7" fill="#8fa6b8" opacity=".85"/>
<!-- trees -->
<rect x="66" y="176" width="14" height="80" fill="#6b4f36"/><circle cx="73" cy="164" r="38" fill="#3f7a4c"/>
<rect x="566" y="188" width="14" height="68" fill="#6b4f36"/><circle cx="573" cy="176" r="32" fill="#3f7a4c"/>
<!-- play structure -->
<rect x="230" y="180" width="10" height="76" fill="#c0563f"/><rect x="352" y="180" width="10" height="76" fill="#c0563f"/>
<rect x="222" y="166" width="148" height="16" rx="4" fill="#d8734f"/>
<rect x="248" y="196" width="86" height="10" fill="#e0a13c"/>
<path d="M362 190 L410 252 L392 252 L348 196Z" fill="#4b83c4"/>
<rect x="196" y="200" width="34" height="8" fill="#e0a13c"/><rect x="196" y="200" width="8" height="56" fill="#8d7a63"/>
<!-- swings -->
<rect x="440" y="176" width="8" height="80" fill="#8d7a63"/><rect x="536" y="176" width="8" height="80" fill="#8d7a63"/>
<rect x="436" y="170" width="112" height="8" fill="#8d7a63"/>
<line x1="466" y1="178" x2="466" y2="222" stroke="#5c646e" stroke-width="2"/><line x1="486" y1="178" x2="486" y2="222" stroke="#5c646e" stroke-width="2"/>
<rect x="462" y="222" width="28" height="6" fill="#3b4654"/>
<line x1="508" y1="178" x2="508" y2="230" stroke="#5c646e" stroke-width="2"/><line x1="528" y1="178" x2="528" y2="230" stroke="#5c646e" stroke-width="2"/>
<rect x="504" y="230" width="28" height="6" fill="#3b4654"/>
<!-- adult with umbrella and child -->
<path d="M108 214 a34 34 0 0 1 68 0 Z" fill="#c0563f"/><rect x="140" y="214" width="3" height="46" fill="#5c646e"/>
<circle cx="142" cy="232" r="11" fill="#e8c39b"/><rect x="133" y="244" width="19" height="34" rx="6" fill="#3f5f8f"/>
<rect x="135" y="278" width="5" height="20" fill="#39404a"/><rect x="145" y="278" width="5" height="20" fill="#39404a"/>
<circle cx="168" cy="250" r="9" fill="#c8926a"/><rect x="161" y="260" width="16" height="26" rx="5" fill="#e0a13c"/>
<rect x="163" y="286" width="5" height="14" fill="#39404a"/><rect x="170" y="286" width="5" height="14" fill="#39404a"/>
<!-- person jogging -->
<circle cx="300" cy="272" r="10" fill="#8d6748"/><rect x="292" y="283" width="18" height="28" rx="6" fill="#4f9b8b"/>
<rect x="288" y="311" width="6" height="20" fill="#39404a" transform="rotate(18 288 311)"/><rect x="304" y="311" width="6" height="20" fill="#39404a" transform="rotate(-22 304 311)"/>
<!-- dog shaking off water -->
<ellipse cx="386" cy="300" rx="18" ry="10" fill="#8b6b4a"/><circle cx="402" cy="292" r="8" fill="#8b6b4a"/><rect x="370" y="298" width="6" height="14" fill="#8b6b4a"/>
<g stroke="#cfe0ec" stroke-width="2"><line x1="404" y1="282" x2="412" y2="274"/><line x1="368" y1="288" x2="360" y2="280"/></g>
<!-- bench with abandoned bag -->
<rect x="212" y="292" width="80" height="8" fill="#8d6a4a"/><rect x="216" y="300" width="6" height="20" fill="#6b5238"/><rect x="282" y="300" width="6" height="20" fill="#6b5238"/>
<rect x="248" y="278" width="24" height="16" rx="4" fill="#a83f5b"/>
<!-- rain -->
<g stroke="#dfeaf2" stroke-width="2" opacity=".8">
<line x1="40" y1="20" x2="30" y2="46"/><line x1="120" y1="10" x2="110" y2="36"/><line x1="200" y1="30" x2="190" y2="56"/>
<line x1="280" y1="12" x2="270" y2="38"/><line x1="360" y1="34" x2="350" y2="60"/><line x1="440" y1="16" x2="430" y2="42"/>
<line x1="520" y1="36" x2="510" y2="62"/><line x1="600" y1="18" x2="590" y2="44"/><line x1="80" y1="90" x2="70" y2="116"/>
<line x1="240" y1="96" x2="230" y2="122"/><line x1="420" y1="104" x2="410" y2="130"/><line x1="580" y1="98" x2="570" y2="124"/>
</g>
<!-- sign -->
<rect x="452" y="272" width="106" height="24" rx="4" fill="#ffffff" stroke="#8fa0b4"/><text x="458" y="288" font-size="10" fill="#42566d" font-family="sans-serif">FIELD CLOSED — WET</text>
<rect x="500" y="296" width="6" height="26" fill="#8d7a63"/>
</svg>`
  },
  s5: {
    name: 'Busy coffee shop at the morning rush',
    svg: `<svg viewBox="0 0 640 380" width="100%" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Coffee shop scene">
<rect width="640" height="380" fill="#f0e6d8"/><rect y="290" width="640" height="90" fill="#c4a882"/><rect y="286" width="640" height="8" fill="#a1855f"/>
<!-- back wall + menu -->
<rect x="0" y="40" width="640" height="250" fill="#e3d5c2"/>
<rect x="352" y="58" width="240" height="70" fill="#3b3129"/>
<text x="366" y="82" font-size="13" fill="#f0e6d8" font-family="sans-serif">DRIP  2.40   LATTE  4.60</text>
<text x="366" y="104" font-size="13" fill="#f0e6d8" font-family="sans-serif">TEA   2.10   MUFFIN 3.25</text>
<text x="366" y="122" font-size="11" fill="#e0a13c" font-family="sans-serif">CASH ONLY — CARD MACHINE DOWN</text>
<!-- counter -->
<rect x="330" y="200" width="290" height="20" fill="#8d6a4a"/><rect x="330" y="220" width="290" height="70" fill="#6f523a"/>
<rect x="344" y="176" width="46" height="26" fill="#9aa4ae"/><rect x="350" y="182" width="12" height="12" fill="#3b3129"/>
<rect x="400" y="180" width="34" height="22" fill="#b8c0c8"/>
<!-- barista -->
<circle cx="470" cy="168" r="12" fill="#8d6748"/><rect x="459" y="182" width="23" height="30" rx="7" fill="#f0e6d8"/>
<rect x="459" y="196" width="23" height="16" fill="#4f6b52"/>
<!-- second staff -->
<circle cx="546" cy="172" r="11" fill="#e8c39b"/><rect x="536" y="185" width="21" height="28" rx="6" fill="#f0e6d8"/>
<!-- queue -->
<circle cx="250" cy="176" r="12" fill="#c8926a"/><rect x="240" y="190" width="22" height="42" rx="7" fill="#3f5f8f"/>
<rect x="243" y="232" width="6" height="28" fill="#39404a"/><rect x="254" y="232" width="6" height="28" fill="#39404a"/>
<circle cx="204" cy="182" r="12" fill="#e8c39b"/><rect x="194" y="196" width="22" height="40" rx="7" fill="#a83f5b"/>
<rect x="197" y="236" width="6" height="26" fill="#39404a"/><rect x="208" y="236" width="6" height="26" fill="#39404a"/>
<rect x="216" y="206" width="16" height="20" rx="3" fill="#6b5238"/>
<circle cx="158" cy="178" r="12" fill="#8d6748"/><rect x="148" y="192" width="22" height="42" rx="7" fill="#e0a13c"/>
<rect x="151" y="234" width="6" height="28" fill="#39404a"/><rect x="162" y="234" width="6" height="28" fill="#39404a"/>
<!-- spilled drink on floor -->
<ellipse cx="300" cy="304" rx="34" ry="10" fill="#8d6a4a" opacity=".75"/>
<rect x="288" y="286" width="16" height="18" rx="3" fill="#f0e6d8" transform="rotate(70 288 286)"/>
<text x="316" y="320" font-size="10" fill="#7a5a3c" font-family="sans-serif">spilled drink</text>
<!-- person crouching to help -->
<circle cx="352" cy="268" r="11" fill="#e8c39b"/><rect x="343" y="280" width="19" height="24" rx="6" fill="#4f9b8b"/>
<rect x="340" y="300" width="26" height="8" rx="3" fill="#39404a"/>
<!-- table with laptop -->
<rect x="40" y="240" width="100" height="8" fill="#8d6a4a"/><rect x="84" y="248" width="8" height="46" fill="#6f523a"/><rect x="62" y="292" width="52" height="6" fill="#6f523a"/>
<rect x="70" y="216" width="42" height="26" fill="#9aa4ae"/><rect x="66" y="242" width="50" height="4" fill="#7b848d"/>
<circle cx="52" cy="206" r="11" fill="#c8926a"/><rect x="42" y="219" width="20" height="30" rx="6" fill="#6a5aa8"/>
<!-- stroller blocking aisle -->
<rect x="176" y="264" width="36" height="20" rx="6" fill="#4b6b8c"/><circle cx="182" cy="292" r="8" fill="#39404a"/><circle cx="208" cy="292" r="8" fill="#39404a"/>
<path d="M176 264 l-10 -18" stroke="#4b6b8c" stroke-width="4"/>
<!-- window light -->
<rect x="0" y="40" width="18" height="250" fill="#cfe3f0" opacity=".6"/>
</svg>`
  }
};

/* ---------------- WRITING BANK ---------------- */
const BANK_WRITING = [
  /* --- Task 1: Writing an Email (10) --- */
  {
    id: 'W1-01', task: 1, clb: 7, formality: 'formal', recipient: 'the building manager', recipientRole: 'Building Manager', recipientGenderKnown: false,
    scenario: 'The elevator in your apartment building has been out of service for eleven days. You live on the seventh floor with a family member who uses a walker. The building has not posted any update since the second day.',
    instruction: 'Write an email to the building manager. Your email should be about 150–200 words.',
    bullets: [
      'Describe how the outage has affected your household specifically',
      'Ask for a firm repair date and an explanation for the lack of updates',
      'Propose one temporary measure the building could take in the meantime'
    ]
  },
  {
    id: 'W1-02', task: 1, clb: 8, formality: 'formal', recipient: 'the course coordinator', recipientRole: 'Course Coordinator', recipientGenderKnown: false,
    scenario: 'You are enrolled in a part-time college certificate. Your employer has changed your shift pattern, and you can no longer attend the Wednesday evening class, which is mandatory. You want to complete the certificate this year.',
    instruction: 'Write an email to the course coordinator. Your email should be about 150–200 words.',
    bullets: [
      'Explain the change to your work schedule and when it takes effect',
      'Ask what options exist for completing the Wednesday component',
      'Confirm what you are willing to do to stay on track this year'
    ]
  },
  {
    id: 'W1-03', task: 1, clb: 6, formality: 'informal', recipient: 'your neighbour Sam', recipientRole: 'neighbour', recipientGenderKnown: true,
    scenario: 'Your neighbour Sam looked after your apartment and your cat for two weeks while you were away. You have just returned and found everything in good order, but you also noticed that Sam repaired a leaking tap without being asked.',
    instruction: 'Write an email to Sam. Your email should be about 150–200 words.',
    bullets: [
      'Thank Sam and mention something specific you noticed',
      'Ask about the tap repair and offer to cover the cost',
      'Invite Sam to something as a way of returning the favour'
    ]
  },
  {
    id: 'W1-04', task: 1, clb: 9, formality: 'formal', recipient: 'the customer service department of an airline', recipientRole: 'Customer Relations Manager', recipientGenderKnown: false,
    scenario: 'Your flight was cancelled with two hours\' notice. You were rebooked onto a flight nineteen hours later and were not offered accommodation. You missed a family event and paid $240 for a hotel room yourself.',
    instruction: 'Write an email to the airline. Your email should be about 150–200 words.',
    bullets: [
      'State the flight details and what happened, factually',
      'Explain the cost and inconvenience you incurred',
      'State clearly what resolution you are asking for and by when'
    ]
  },
  {
    id: 'W1-05', task: 1, clb: 7, formality: 'semi-formal', recipient: 'the volunteer coordinator at a food bank', recipientRole: 'Volunteer Coordinator', recipientGenderKnown: false,
    scenario: 'You have volunteered at a local food bank every Saturday for a year. You are starting a new job and can no longer come on Saturdays, but you would like to continue volunteering on a different day.',
    instruction: 'Write an email to the volunteer coordinator. Your email should be about 150–200 words.',
    bullets: [
      'Explain why you can no longer volunteer on Saturdays',
      'Describe what days and hours you could offer instead',
      'Ask about handing over any duties you currently hold'
    ]
  },
  {
    id: 'W1-06', task: 1, clb: 8, formality: 'formal', recipient: 'your child\'s school principal', recipientRole: 'Principal', recipientGenderKnown: false,
    scenario: 'Your child\'s school has announced that the after-school program will end in six weeks because of staffing costs. You and several other parents depend on it. You want to request a meeting and suggest alternatives.',
    instruction: 'Write an email to the principal. Your email should be about 150–200 words.',
    bullets: [
      'Explain how the closure will affect your family',
      'Ask for the specific reasons and whether any options were considered',
      'Suggest one alternative and offer to help organise parent support'
    ]
  },
  {
    id: 'W1-07', task: 1, clb: 6, formality: 'semi-formal', recipient: 'a former coworker, Renée', recipientRole: 'former coworker', recipientGenderKnown: true,
    scenario: 'A former coworker, Renée, has told you about a job opening at her company and offered to pass your name to the hiring manager. You are interested but have two concerns: the shift pattern and the start date.',
    instruction: 'Write an email to Renée. Your email should be about 150–200 words.',
    bullets: [
      'Thank her and say clearly whether you are interested',
      'Raise your two concerns and ask what she knows about them',
      'Suggest a specific time to talk before she passes on your name'
    ]
  },
  {
    id: 'W1-08', task: 1, clb: 9, formality: 'formal', recipient: 'the city\'s transportation department', recipientRole: 'Transportation Services Manager', recipientGenderKnown: false,
    scenario: 'The city removed a bus stop near your street and moved it 600 metres away. Several residents in your area have mobility difficulties. There was no consultation before the change.',
    instruction: 'Write an email to the transportation department. Your email should be about 150–200 words.',
    bullets: [
      'Describe the change and who in your area it affects',
      'Ask what consultation took place and what data supported the decision',
      'Request a specific action and say how residents can be contacted'
    ]
  },
  {
    id: 'W1-09', task: 1, clb: 7, formality: 'formal', recipient: 'the manager of a fitness centre', recipientRole: 'Centre Manager', recipientGenderKnown: false,
    scenario: 'You bought a twelve-month gym membership four months ago. The pool, which was the main reason you joined, has been closed for repairs for seven weeks with no reopening date. Your monthly fee has not changed.',
    instruction: 'Write an email to the centre manager. Your email should be about 150–200 words.',
    bullets: [
      'State when you joined and why the pool mattered to your decision',
      'Explain what you consider unreasonable about the current situation',
      'Propose two acceptable resolutions and ask for a reply by a set date'
    ]
  },
  {
    id: 'W1-10', task: 1, clb: 8, formality: 'informal', recipient: 'your cousin Dalia', recipientRole: 'cousin', recipientGenderKnown: true,
    scenario: 'Your cousin Dalia is moving to your city next month for a new job. She has asked for your honest advice about which neighbourhood to live in and what to expect in the first few months.',
    instruction: 'Write an email to Dalia. Your email should be about 150–200 words.',
    bullets: [
      'Recommend a neighbourhood and give two concrete reasons',
      'Warn her about one thing that surprised you when you arrived',
      'Offer specific practical help for her first week'
    ]
  },

  /* --- Task 2: Responding to Survey Questions (10) --- */
  {
    id: 'W2-01', task: 2, clb: 7,
    scenario: 'Your municipality is surveying residents about the use of a vacant lot in the centre of your neighbourhood.',
    question: 'Which option do you support, and why?',
    optionA: { label: 'Option A: A public park with a playground and open lawn', desc: 'Free to use, open all hours, maintained by the city.' },
    optionB: { label: 'Option B: A paid community sports facility with courts and change rooms', desc: 'Requires a membership or drop-in fee, staffed and heated, open year round.' }
  },
  {
    id: 'W2-02', task: 2, clb: 8,
    scenario: 'Your employer is surveying staff about the work schedule for next year.',
    question: 'Which schedule do you prefer, and why?',
    optionA: { label: 'Option A: Four 10-hour days with a fixed day off each week', desc: 'Longer days, three-day weekends, less flexibility to leave early.' },
    optionB: { label: 'Option B: Five 8-hour days with two flexible hours each day', desc: 'Shorter days, start any time between 7 and 10, but no extra day off.' }
  },
  {
    id: 'W2-03', task: 2, clb: 6,
    scenario: 'Your local library is surveying members about how to spend a one-time grant.',
    question: 'Which option should the library choose, and why?',
    optionA: { label: 'Option A: Extend opening hours to 9 p.m. on weekdays', desc: 'The building stays open later; no new materials are purchased.' },
    optionB: { label: 'Option B: Expand the collection and add more computers', desc: 'More books, devices and equipment, but the current hours stay the same.' }
  },
  {
    id: 'W2-04', task: 2, clb: 9,
    scenario: 'Your city is consulting residents about a proposed change to residential streets.',
    question: 'Which approach do you support, and why?',
    optionA: { label: 'Option A: Reduce the speed limit to 30 km/h on all residential streets', desc: 'Applies everywhere immediately; enforcement is limited and relies on drivers complying.' },
    optionB: { label: 'Option B: Install physical traffic-calming measures on selected streets', desc: 'Speed bumps and narrowed corners on a smaller number of streets; costs more and takes three years.' }
  },
  {
    id: 'W2-05', task: 2, clb: 7,
    scenario: 'Your child\'s school is surveying parents about an addition to the timetable.',
    question: 'Which option do you prefer, and why?',
    optionA: { label: 'Option A: Add 30 minutes of daily physical activity', desc: 'Every student takes part; 30 minutes are taken from other subject time.' },
    optionB: { label: 'Option B: Add a weekly two-hour period for arts and music', desc: 'One longer block each week; students choose between visual art and music.' }
  },
  {
    id: 'W2-06', task: 2, clb: 8,
    scenario: 'Your condominium board is surveying owners about the annual budget.',
    question: 'Which option should the board adopt, and why?',
    optionA: { label: 'Option A: Raise monthly fees by $45 to rebuild the reserve fund', desc: 'Higher monthly cost now; the building is prepared for major repairs.' },
    optionB: { label: 'Option B: Keep fees the same and use a special assessment when repairs are needed', desc: 'No increase now; owners may face a large one-time bill later.' }
  },
  {
    id: 'W2-07', task: 2, clb: 6,
    scenario: 'A community centre is surveying members about a new program for teenagers.',
    question: 'Which program do you support, and why?',
    optionA: { label: 'Option A: A drop-in homework and tutoring room', desc: 'Open every weekday after school; staffed by two tutors.' },
    optionB: { label: 'Option B: A weekend job-skills and volunteering program', desc: 'Runs Saturdays; includes resume help and placements with local businesses.' }
  },
  {
    id: 'W2-08', task: 2, clb: 9,
    scenario: 'Your workplace is surveying employees about professional development funding.',
    question: 'Which option do you prefer, and why?',
    optionA: { label: 'Option A: $1,500 per employee to spend on any approved course', desc: 'Individual choice; employees arrange their own training on their own time.' },
    optionB: { label: 'Option B: Company-wide training days four times a year', desc: 'Everyone attends the same sessions during paid work hours; no individual budget.' }
  },
  {
    id: 'W2-09', task: 2, clb: 7,
    scenario: 'Your neighbourhood association is surveying residents about winter maintenance.',
    question: 'Which option do you support, and why?',
    optionA: { label: 'Option A: Hire a contractor to clear all sidewalks, funded by a $120 annual levy', desc: 'Reliable clearing within 12 hours; every household pays whether they use it or not.' },
    optionB: { label: 'Option B: Keep the current system where each household clears its own frontage', desc: 'No cost; clearing quality varies and some stretches are never done.' }
  },
  {
    id: 'W2-10', task: 2, clb: 8,
    scenario: 'A regional health authority is surveying the public about how to use a new clinic space.',
    question: 'Which use should be chosen, and why?',
    optionA: { label: 'Option A: A walk-in clinic open evenings and weekends', desc: 'No appointment needed; serves urgent but non-emergency problems; long waits possible.' },
    optionB: { label: 'Option B: A booked-appointment clinic for chronic condition management', desc: 'Scheduled longer appointments for ongoing conditions; weekday hours only.' }
  }
];

/* ---------------- SPEAKING BANK (8 tasks x 3 = 24) ---------------- */
const BANK_SPEAKING = [
  /* Task 1 — Giving Advice (30s prep, 90s response) */
  { id: 'S1-01', task: 1, clb: 7, prompt: 'Your friend has been offered a promotion that requires relocating to another province. Their partner has a good job here and their child starts school in the fall. Give your friend advice about how to make this decision.' },
  { id: 'S1-02', task: 1, clb: 8, prompt: 'Your cousin wants to buy a used car from a private seller because it is $3,000 cheaper than a dealership. They have never bought a car before. Give them advice about how to go about it safely.' },
  { id: 'S1-03', task: 1, clb: 9, prompt: 'A coworker has been asked to lead a project team that includes someone who applied for the same role and did not get it. Give your coworker advice about how to handle the first few weeks.' },

  /* Task 2 — Talking about a Personal Experience (30s prep, 60s response) */
  { id: 'S2-01', task: 2, clb: 7, prompt: 'Talk about a time when you had to ask a stranger for help. Describe what happened, what you said, and how you felt about it afterwards.' },
  { id: 'S2-02', task: 2, clb: 8, prompt: 'Talk about a time when something you had planned carefully did not work out. Describe the plan, what went wrong, and what you did next.' },
  { id: 'S2-03', task: 2, clb: 9, prompt: 'Talk about a time when you changed your mind about something important. Describe what you originally believed, what caused you to reconsider, and what you think now.' },

  /* Task 3 — Describing a Scene (30s prep, 60s response) */
  { id: 'S3-01', task: 3, clb: 7, scene: 's1', prompt: 'Describe what you see in this picture to someone who cannot see it. Include as much detail as you can about the people, the objects, and the setting.' },
  { id: 'S3-02', task: 3, clb: 7, scene: 's2', prompt: 'Describe this scene to a friend on the telephone. Include the setting, what people are doing, and anything that stands out.' },
  { id: 'S3-03', task: 3, clb: 8, scene: 's3', prompt: 'Describe what is happening in this picture. Talk about where it is, who is there, and what each person appears to be doing.' },
  { id: 'S3-04', task: 3, clb: 8, scene: 's4', prompt: 'Describe this scene in detail to someone who cannot see it. Mention the weather, the location, and what the people and animals are doing.' },
  { id: 'S3-05', task: 3, clb: 7, scene: 's5', prompt: 'Describe this picture to someone over the phone. Include the setting, the people, and anything unusual you notice.' },

  /* Task 4 — Making Predictions (30s prep, 60s response) */
  { id: 'S4-01', task: 4, clb: 7, scene: 's1', prompt: 'Look at the same picture again. Predict what will happen next. What will the people do, and how will the situation develop over the next few minutes?' },
  { id: 'S4-02', task: 4, clb: 7, scene: 's2', prompt: 'Look at the same scene again. Predict what is likely to happen in the next half hour.' },
  { id: 'S4-03', task: 4, clb: 8, scene: 's3', prompt: 'Look at the same picture again. Predict what will happen next for the people in this lobby.' },
  { id: 'S4-04', task: 4, clb: 8, scene: 's4', prompt: 'Look at the same scene again. Predict what the people and the dog will do next, and how the afternoon will end.' },
  { id: 'S4-05', task: 4, clb: 7, scene: 's5', prompt: 'Look at the same picture again. Predict what will happen over the next ten minutes in this coffee shop.' },

  /* Task 5 — Comparing and Persuading (60s to choose, 60s prep, 60s response) */
  {
    id: 'S5-01', task: 5, clb: 8,
    context: 'You and your family are choosing a used vehicle. Compare the two options, choose one, and persuade your family member that it is the better choice.',
    optionA: { label: 'A 2016 minivan — $14,500', desc: 'Seven seats, 140,000 km, one owner, new brakes, higher fuel use, no accident history.' },
    optionB: { label: 'A 2019 compact SUV — $19,800', desc: 'Five seats, 62,000 km, two owners, excellent fuel economy, minor accident repaired.' }
  },
  {
    id: 'S5-02', task: 5, clb: 7,
    context: 'Your family is deciding where to spend a one-week vacation. Compare the two options, choose one, and persuade the person you are speaking to.',
    optionA: { label: 'A cabin by a lake — 3 hours away by car', desc: 'Quiet, cheap, cooking your own meals, no internet, rainy forecast possible.' },
    optionB: { label: 'A city trip with a hotel — 2 hours away by train', desc: 'Museums and restaurants, more expensive, indoor options if it rains, busier.' }
  },
  {
    id: 'S5-03', task: 5, clb: 9,
    context: 'Your team must choose how to spend a limited training budget. Compare the two options, choose one, and persuade your manager.',
    optionA: { label: 'Send two people to an intensive week-long conference', desc: 'Deep expertise for two staff, strong networking, the rest of the team gains nothing directly.' },
    optionB: { label: 'Run a one-day in-house workshop for the whole team', desc: 'Everyone gains a shared baseline, less depth, an external trainer comes to your office.' }
  },

  /* Task 6 — Dealing with a Difficult Situation (60s prep, 60s response) */
  { id: 'S6-01', task: 6, clb: 8, prompt: 'You agreed to drive your neighbour to an important medical appointment tomorrow morning. Your manager has just told you that you must attend a mandatory meeting at the same time, and your job could be affected if you miss it. Call your neighbour and explain the situation.' },
  { id: 'S6-02', task: 6, clb: 9, prompt: 'You borrowed a friend\'s camera for a trip and the lens was damaged while it was in your care. Your friend uses the camera for paid work. Speak to your friend about what happened and what you intend to do.' },
  { id: 'S6-03', task: 6, clb: 7, prompt: 'A family member has organised a large birthday celebration for you, but you have been unwell for a week and do not feel able to attend. They have already paid a deposit. Speak to them about the situation.' },

  /* Task 7 — Expressing Opinions (30s prep, 90s response) */
  { id: 'S7-01', task: 7, clb: 8, prompt: 'Some people believe that employers should be required to allow staff to work from home whenever the job permits it. Do you agree or disagree? Explain your opinion with reasons and examples.' },
  { id: 'S7-02', task: 7, clb: 9, prompt: 'Some cities are converting street parking into wider sidewalks and patios. Others argue this harms local businesses and drivers. What is your opinion? Explain with reasons and examples.' },
  { id: 'S7-03', task: 7, clb: 7, prompt: 'Some people think that children should not have their own smartphone before high school. Do you agree or disagree? Explain your opinion with reasons and examples.' },

  /* Task 8 — Describing an Unusual Situation (30s prep, 60s response) */
  { id: 'S8-01', task: 8, clb: 8, prompt: 'You saw an unusual object in a shop window and want to describe it to a friend who may want to buy it. It is about the size of a bread box, made of dark wood, with a glass dome on top, three brass dials on the front, a small crank on the right side, and a paper scroll visible inside the dome. Describe it and say what you think it might be used for.' },
  { id: 'S8-02', task: 8, clb: 9, prompt: 'You found an unfamiliar device left in your building\'s shared laundry room. It is roughly the size of a shoebox, bright orange plastic, with a curved metal handle, four rubber feet, a mesh panel on one side, and a rotating dial marked only with symbols. Describe it to the building manager and explain what you think it may be.' },
  { id: 'S8-03', task: 8, clb: 7, prompt: 'A relative sent you a gift you do not recognise. It is a flat wooden board about 40 cm across, with twelve shallow cups carved in two rows, a small drawstring bag of smooth stones, and a hinged lid that folds the board in half. Describe it to a friend and say how you think it is meant to be used.' }
];

/* Speaking task specification: prep and response seconds, per the official format. */
const SPEAKING_SPEC = {
  0: { name: 'Practice Task (not scored)', prep: 30, resp: 60, scored: false },
  1: { name: 'Giving Advice', prep: 30, resp: 90, scored: true },
  2: { name: 'Talking about a Personal Experience', prep: 30, resp: 60, scored: true },
  3: { name: 'Describing a Scene', prep: 30, resp: 60, scored: true },
  4: { name: 'Making Predictions', prep: 30, resp: 60, scored: true },
  5: { name: 'Comparing and Persuading', prep: 60, resp: 60, scored: true, choose: 60 },
  6: { name: 'Dealing with a Difficult Situation', prep: 60, resp: 60, scored: true },
  7: { name: 'Expressing Opinions', prep: 30, resp: 90, scored: true },
  8: { name: 'Describing an Unusual Situation', prep: 30, resp: 60, scored: true }
};

/* Unscored practice task shown before Task 1 in a full Speaking section. */
const SPEAKING_PRACTICE = {
  id: 'S0-00', task: 0, clb: 6,
  prompt: 'Practice Task (not scored): Talk about a place in your neighbourhood that you visit often. Describe what it is like and why you go there. This response is not marked — it is here so you can test your microphone and settle your nerves.'
};

/* Listening / Reading part specifications. */
const LISTENING_SPEC = {
  1: { name: 'Listening to Problem Solving', q: 8 },
  2: { name: 'Listening to a Daily Life Conversation', q: 5 },
  3: { name: 'Listening for Information', q: 6 },
  4: { name: 'Listening to a News Item', q: 5 },
  5: { name: 'Listening to a Discussion', q: 8 },
  6: { name: 'Listening to Viewpoints', q: 6 }
};
const READING_SPEC = {
  1: { name: 'Reading Correspondence', q: 11 },
  2: { name: 'Reading to Apply a Diagram', q: 8 },
  3: { name: 'Reading for Information', q: 9 },
  4: { name: 'Reading for Viewpoints', q: 10 }
};
