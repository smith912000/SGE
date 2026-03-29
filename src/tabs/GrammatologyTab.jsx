import { useMemo, useState } from "react";
import ScriptSelector from "../components/ui/ScriptSelector";
import PhoneticCrosswalk from "../components/grammatology/PhoneticCrosswalk";

export default function GrammatologyTab({ ctx }) {
  const {
    M3, gramTab, setGramTab, LETTER_DB, WRITING_SYSTEM_TYPES, EGYPTIAN_UNILITERALS,
    OGHAM_FULL, IPA_QUICK, DIGRAPH_MAP, ACROPHONY_SHIFTS, ZODIAC_CHINESE_MAP,
    CHINESE_ZODIAC_HEBREW, MUSICAL_SCALE_OCCULT, planetToLetter,
    grid2, cwInput, setCwInput, cwResult, setCwResult, analyzeWord,
    res, P_COL, P_SYM, SIGN_COL, SIGN_SYM, SIGN_INFO, EL_COL,
    KANGXI_INFO, KANGXI_RADICALS, KANGXI_TOP_10_BY_FREQUENCY, KANGXI_MOST_USED, KANGXI_STANDALONE,
    SCRIPT_ATLAS, TWENTY_TWO_NOTE,
    gramScriptFilter, setGramScriptFilter, expandedLetter, setExpandedLetter,
    Card
  } = ctx;

  const [atlasSearch, setAtlasSearch] = useState("");
  const [atlasExpanded, setAtlasExpanded] = useState(null);

  const [selectedScript, setSelectedScript] = useState(null);

  const [kangxiQuery, setKangxiQuery] = useState("");
  const [kangxiStroke, setKangxiStroke] = useState("all");
  const [kangxiRange, setKangxiRange] = useState("all");
  const [kangxiTopOnly, setKangxiTopOnly] = useState(false);
  const filteredKangxi = useMemo(() => {
    const q = kangxiQuery.trim().toLowerCase();
    const topNums = new Set((KANGXI_TOP_10_BY_FREQUENCY || []).map(r => r.n));
    return (KANGXI_RADICALS || []).filter((r) => {
      if (kangxiTopOnly && !topNums.has(r.n)) return false;
      if (kangxiStroke !== "all" && Number(r.strokes) !== Number(kangxiStroke)) return false;
      if (kangxiRange === "1-60" && !(r.n >= 1 && r.n <= 60)) return false;
      if (kangxiRange === "61-140" && !(r.n >= 61 && r.n <= 140)) return false;
      if (kangxiRange === "141-214" && !(r.n >= 141 && r.n <= 214)) return false;
      if (!q) return true;
      const hay = [
        String(r.n), r.radical, r.variants, r.simplified, r.pinyin, r.meaning,
        r.examples, r.viet, r.jp, r.kr
      ].filter(Boolean).join(" ").toLowerCase();
      return hay.includes(q);
    });
  }, [KANGXI_RADICALS, KANGXI_TOP_10_BY_FREQUENCY, kangxiQuery, kangxiStroke, kangxiRange, kangxiTopOnly]);

  const SCRIPT_TO_FIELD = {
    Latin: "latin",
    Greek: "greek",
    Hebrew: "hebrew",
    Cyrillic: "cyrillic",
    Arabic: "arabic",
    Devanagari: "devanagari",
    Tamil: "tamil",
    Bopomofo: "bopomofo",
    Ogham: "ogham",
    Phoenician: "phoenician",
    Ethiopic: "geez",
    Ethiopian: "geez",
    Coptic: "coptic",
    Runic: "runic",
    Armenian: "armenian",
    Georgian: "georgian",
    Brahmi: "brahmi",
    Han: "tarotChinese",
    Egyptian_Hieroglyphs: "hieroEgyp",
    Imperial_Aramaic: "aramaic",
    Samaritan: "samaritan",
    Syriac: "syriac",
    Gothic: "gothic",
    Glagolitic: "glagolitic",
    Old_South_Arabian: "oldSouthArabian",
    Cuneiform: "cuneiform",
  };

  const selectedField = selectedScript ? SCRIPT_TO_FIELD[selectedScript] : null;

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
      <Card title="𐤀 Grammatology — The Semiotic Engine">
        <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.82rem", lineHeight:1.7, color:M3.onSurface, margin:"0 0 10px" }}>
          Every letter you read descends from a pictograph. The letter A was once the head of an ox (𓃾), rotated and stylised across millennia: from Kemetic hieroglyph to Phoenician 𐤀 to Greek Alpha to Hebrew Aleph (א) to the Latin A on your screen. This engine maps <strong>22 root letters</strong> across <strong>20+ writing systems</strong> — including Aramaic, Samaritan, Coptic, Gothic, Armenian, Georgian, Ge'ez, Ogham, Arabic, Syriac, Devanagari, Tamil, Brahmi, Old South Arabian, and Bopomofo — revealing the hidden thread that connects all human writing.
        </p>
        <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.76rem", lineHeight:1.6, color:M3.onSurfaceVariant, margin:"0 0 10px" }}>
          Writing systems are classified into four families: <strong>Alphabets</strong> (vowels and consonants are equal — Greek, Latin, Cyrillic, Georgian, Armenian), <strong>Abjads</strong> (consonant-only with optional vowel marks — Phoenician, Hebrew, Arabic, Aramaic), <strong>Abugidas</strong> (consonant-vowel units — Devanagari, Tamil, Brahmi, Ge'ez, Thai, Tibetan), and <strong>Logographic/Syllabary</strong> systems (symbols represent whole words or syllables — Egyptian Hieroglyphs, Chinese, Japanese Kana, Cherokee). Each system reflects a different philosophy of how sound, meaning, and symbol relate.
        </p>
        <div style={{ marginBottom: 8 }}>
          <ScriptSelector onSelect={setSelectedScript} />
          {selectedScript && <div style={{ marginTop:6, fontFamily:"'Share Tech Mono',monospace", fontSize:"0.72rem", color:M3.onSurfaceVariant }}>Selected script: <span style={{ color:M3.primary, fontWeight:700 }}>{selectedScript}</span></div>}
        </div>

        {res && (
          <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginBottom:8 }}>
            <span style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.62rem", color:M3.secondary, padding:"4px 0" }}>YOUR LETTERS:</span>
            {["Sun","Moon","Mercury","Venus","Mars","Jupiter","Saturn"].map(p=>{
              const lt = planetToLetter(p);
              if (!lt) return null;
              return <span key={p} style={{ padding:"3px 10px", borderRadius:14, background:P_COL[p]+"22", border:`1px solid ${P_COL[p]}55`, color:P_COL[p], fontFamily:"'Share Tech Mono',monospace", fontSize:"0.66rem" }}>{lt.hebrew} {lt.hebrewName} = {p}</span>;
            })}
          </div>
        )}
        <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
          {[{id:"phonetics",label:"🔊 Phonetic Crosswalk"},{id:"table",label:"Cross-Script Table"},{id:"atlas",label:`🌍 Script Atlas (${(SCRIPT_ATLAS||[]).reduce((n,f)=>n+f.scripts.length,0)})`},{id:"systems",label:"Writing Systems"},{id:"egyptian",label:"Egyptian Signs"},{id:"ogham",label:"Ogham Trees"},{id:"tarot",label:"Tarot · Chinese"},{id:"kangxi",label:"康熙 Kangxi Radicals"},{id:"digraphs",label:"Digraphs"},{id:"ipa",label:"IPA Reference"},{id:"yetzirah",label:"Sefer Yetzirah"}].map(t=>(
            <button key={t.id} onClick={()=>setGramTab(t.id)} style={{ padding:"5px 12px", borderRadius:14, border:`1px solid ${gramTab===t.id?M3.primary:M3.outlineVariant}`, background:gramTab===t.id?M3.primaryContainer:M3.surfaceContainer, color:gramTab===t.id?M3.onPrimaryContainer:M3.onSurfaceVariant, fontFamily:"'Share Tech Mono',monospace", fontSize:"0.66rem", cursor:"pointer", transition:"all 0.2s" }}>{t.label}</button>
          ))}
        </div>
      </Card>

      {gramTab==="phonetics" && (
        <PhoneticCrosswalk />
      )}

      {gramTab==="table" && (
      <Card title="𐤀 Cross-Script Evolution — 22 Root Letters Across 20+ Writing Systems">
        <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.72rem", lineHeight:1.55, color:M3.onSurfaceVariant, margin:"0 0 10px" }}>
          {TWENTY_TWO_NOTE || "The 22-letter Proto-Sinaitic abjad is the ancestral core mapped below. Many descendant scripts expanded beyond 22 to accommodate new phonemes."}
        </p>
        <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginBottom:10 }}>
          <span style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.6rem", color:M3.secondary, padding:"3px 0" }}>CULTURAL FAMILIES:</span>
          {[
            {id:"core",label:"Proto-Sinaitic Core",sub:"Egypt → Phoenicia → Greece → Rome"},
            {id:"semitic",label:"Semitic Branches",sub:"Levant, Arabia, Horn of Africa"},
            {id:"european",label:"Classical & European",sub:"Caucasus, Slavic, Celtic, Nordic"},
            {id:"indic",label:"Indic & East Asian",sub:"Brahmi, Devanagari, Tamil, Bopomofo"},
            {id:"all",label:"All Mapped Scripts",sub:"22 letters × 25+ writing systems"},
          ].map(f=>(
            <button key={f.id} onClick={()=>setGramScriptFilter(f.id)} title={f.sub} style={{ padding:"3px 10px", borderRadius:12, border:`1px solid ${gramScriptFilter===f.id?M3.tertiary:M3.outlineVariant}`, background:gramScriptFilter===f.id?M3.tertiaryContainer||M3.secondaryContainer:M3.surfaceContainer, color:gramScriptFilter===f.id?M3.tertiary:M3.onSurfaceVariant, fontFamily:"'Share Tech Mono',monospace", fontSize:"0.58rem", cursor:"pointer" }}>{f.label}</button>
          ))}
        </div>
        <div style={{ overflowX:"auto" }}>
          {(() => {
            /* ── unified column definitions ── */
            const f = gramScriptFilter;
            const showCore     = f === "core" || f === "all";
            const showSemitic  = f === "semitic" || f === "all";
            const showEuropean = f === "european" || f === "all";
            const showIndic    = f === "indic" || f === "all";

            /* each col: { key, label, get(l)=>content, fs, colFn? } */
            const cols = [
              /* ── identity / non-language columns first ── */
              { key:"#",       label:"#",          get: l => l.order,      fs:"0.66rem", colFn: l => { const s=l.yetzirah.sign,p=l.yetzirah.planet,e=l.yetzirah.element; return s?SIGN_COL[s]:p?P_COL[p]:e?EL_COL[e]:M3.onSurfaceVariant; } },
              { key:"hebrew",  label:"Hebrew",     get: l => l.hebrew,     fs:"1.1rem",  colFn: l => { const s=l.yetzirah.sign,p=l.yetzirah.planet,e=l.yetzirah.element; return s?SIGN_COL[s]:p?P_COL[p]:e?EL_COL[e]:M3.primary; } },
              { key:"name",    label:"Name",       get: l => l.hebrewName, fs:"0.64rem", colFn: l => { const s=l.yetzirah.sign,p=l.yetzirah.planet,e=l.yetzirah.element; return s?SIGN_COL[s]:p?P_COL[p]:e?EL_COL[e]:M3.onSurface; } },
              { key:"tarot",   label:"🃏 Tarot",   get: l => l.tarotName ? `${l.tarot} ${l.tarotName}` : "", fs:"0.6rem", highlight:true, colFn: () => M3.tertiary },
              { key:"gem",     label:"Gem.",       get: l => l.gematria,   fs:"0.68rem", colFn: () => M3.tertiary },
              { key:"elem",    label:"Element",    get: l => l.yetzirah?.element || l.yetzirah?.planet || l.yetzirah?.sign || "—", fs:"0.62rem", colFn: l => l.yetzirah?.element==="Fire"?"#f66":l.yetzirah?.element==="Water"?"#6af":l.yetzirah?.element==="Air"?"#af6":M3.onSurfaceVariant },
              { key:"ipa",     label:"IPA",        get: l => l.ipa,        fs:"0.62rem", colFn: () => M3.onSurfaceVariant },
              { key:"latin",   label:"Latin",      get: l => l.latin,      fs:"0.68rem" },

              /* ── always-visible ancestral scripts ── */
              { key:"kemet",   label:"Kemet",      get: l => l.hiero,      fs:"1.1rem" },
              { key:"egypt",   label:"Egypt.",      get: l => l.hieroEgyp,  fs:"1.1rem", isEgyp:true },
              { key:"phoen",   label:"Phoen.",     get: l => l.phoenician,  fs:"1.1rem" },
              { key:"greek",   label:"Greek",      get: l => l.greek,      fs:"0.74rem" },

              /* ── semitic branch ── */
              ...(showSemitic ? [
                { key:"aram",  label:"Aram.",     get: l => l.aramaic,         fs:"1.1rem" },
                { key:"samar", label:"Samar.",    get: l => l.samaritan,       fs:"1.1rem" },
                { key:"arabic",label:"Arabic",    get: l => l.arabic,          fs:"1.1rem" },
                { key:"syriac",label:"Syriac",    get: l => l.syriac,          fs:"1.1rem" },
                { key:"osa",   label:"OSA",       get: l => l.oldSouthArabian, fs:"1.1rem" },
                { key:"geez",  label:"Ge'ez",     get: l => l.geez,            fs:"1.1rem" },
                { key:"cunei", label:"Cunei.",    get: l => l.cuneiform,       fs:"1.1rem" },
              ] : []),

              /* ── european branch ── */
              ...(showEuropean ? [
                { key:"coptic", label:"Coptic",   get: l => l.coptic,      fs:"1.1rem" },
                { key:"gothic", label:"Gothic",   get: l => l.gothic,      fs:"1.1rem" },
                { key:"armen",  label:"Armen.",   get: l => l.armenian,    fs:"1.1rem" },
                { key:"georg",  label:"Georg.",   get: l => l.georgian,    fs:"1.1rem" },
                { key:"cyril",  label:"Cyril.",   get: l => l.cyrillic,    fs:"0.78rem" },
                { key:"glagol", label:"Glagol.",  get: l => l.glagolitic,  fs:"1.1rem" },
                { key:"runic",  label:"Runic",    get: l => l.runic,       fs:"1.1rem" },
                { key:"ogham",  label:"Ogham",    get: l => l.ogham,       fs:"1.1rem" },
              ] : [
                /* runic always visible outside european filter */
                { key:"runic",  label:"Runic",    get: l => l.runic,       fs:"1.1rem" },
              ]),

              /* ── indic branch ── */
              ...(showIndic ? [
                { key:"brahmi", label:"Brahmi",   get: l => l.brahmi,      fs:"1.1rem" },
                { key:"devan",  label:"Devan.",   get: l => l.devanagari,  fs:"1.1rem" },
                { key:"tamil",  label:"Tamil",    get: l => l.tamil,       fs:"1.1rem" },
                { key:"bopo",   label:"Bopo.",    get: l => l.bopomofo,    fs:"0.78rem" },
              ] : []),

              /* ── meaning (core only) ── */
              ...(showCore ? [
                { key:"meaning", label:"Meaning", get: l => l.acrophony,   fs:"0.62rem", colFn: () => M3.onSurfaceVariant, italic:true },
              ] : []),

              /* ── selected script from ScriptSelector ── */
              ...(selectedField ? [
                { key:"sel", label:selectedScript, get: l => l[selectedField] || "", fs:"1.1rem", colFn: () => M3.primary },
              ] : []),
            ];

            return (
              <table style={{ width:"100%", borderCollapse:"collapse" }}>
                <thead><tr>
                  {cols.map(c => (
                    <th key={c.key} style={{ padding:"4px 6px", textAlign:"left", color: c.highlight ? M3.tertiary : M3.secondary, fontFamily:"'Share Tech Mono',monospace", fontSize:"0.56rem", letterSpacing:"0.06em", borderBottom:`1px solid ${M3.outlineVariant}`, whiteSpace:"nowrap", background: c.highlight ? (M3.tertiaryContainer || M3.secondaryContainer) + "22" : "transparent" }}>{c.label}</th>
                  ))}
                </tr></thead>
                <tbody>
                  {LETTER_DB.map(l => {
                    const isSign = l.yetzirah.sign, isPlanet = l.yetzirah.planet, isElement = l.yetzirah.element;
                    const highlight = isSign ? SIGN_COL[isSign] : isPlanet ? P_COL[isPlanet] : isElement ? EL_COL[isElement] : null;
                    const expanded = expandedLetter === l.order;
                    return [
                      <tr key={l.order} onClick={()=>setExpandedLetter(expanded?null:l.order)} style={{ cursor:"pointer", borderBottom:`1px solid ${M3.outlineVariant}22`, background:expanded?M3.surfaceVariant:"transparent", transition:"background 0.2s" }}>
                        {cols.map(c => {
                          const val = c.get(l);
                          const color = c.colFn ? c.colFn(l) : M3.onSurface;
                          if (c.isEgyp) {
                            return <td key={c.key} style={{ padding:"4px 6px", fontSize:c.fs }}><span title={l.hieroEgypName} style={{ borderBottom:l.egyptColor?`2px solid ${({polychrome:"#c0a",red:"#d44",green:"#4a4",yellow:"#da0",blue:"#48d",black:"#444",multiple:"#a8a"})[l.egyptColor]||M3.outline}`:"none" }}>{val}</span></td>;
                          }
                          return <td key={c.key} style={{ padding:"4px 6px", fontSize:c.fs, color, fontFamily: parseFloat(c.fs) >= 1 ? "inherit" : "'Share Tech Mono',monospace", fontStyle: c.italic ? "italic" : "normal", background: c.highlight ? (M3.tertiaryContainer || M3.secondaryContainer) + "11" : "transparent" }}>{val}</td>;
                        })}
                      </tr>,
                      expanded && (
                        <tr key={l.order+"x"}>
                          <td colSpan={cols.length} style={{ padding:"12px 14px", background:M3.surfaceDim, borderBottom:`1px solid ${M3.outlineVariant}` }}>
                            <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                              <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.78rem", lineHeight:1.65, color:M3.onSurface, margin:0 }}>{l.pictographic}</p>
                              <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))", gap:"6px 12px", fontFamily:"'Share Tech Mono',monospace", fontSize:"0.62rem" }}>
                                <span style={{ color:M3.secondary }}>Semitic origin: <span style={{fontSize:"1.2rem"}}>{l.hiero}</span> {l.hieroName}</span>
                                <span style={{ color:M3.secondary }}>Egyptian sign: <span style={{fontSize:"1.2rem"}}>{l.hieroEgyp}</span> {l.hieroEgypName} <span style={{ color:({polychrome:"#c0a",red:"#d44",green:"#4a4",yellow:"#da0",blue:"#48d",black:"#666",multiple:"#a8a"})[l.egyptColor]||M3.outline }}>({l.egyptColor})</span></span>
                                <span style={{ color:M3.secondary }}>Hebrew: <span style={{fontSize:"0.9rem"}}>{l.hebrewSpelling}</span></span>
                                <span style={{ color:M3.secondary }}>Aramaic: <span style={{fontSize:"1.1rem"}}>{l.aramaic}</span> · Samaritan: <span style={{fontSize:"1.1rem"}}>{l.samaritan}</span></span>
                                <span style={{ color:M3.secondary }}>Coptic: <span style={{fontSize:"1rem"}}>{l.coptic}</span> · Gothic: <span style={{fontSize:"1rem"}}>{l.gothic}</span> ({l.gothicName})</span>
                                <span style={{ color:M3.secondary }}>Armenian: <span style={{fontSize:"1rem"}}>{l.armenian}</span> ({l.armenianName}) · Georgian: <span style={{fontSize:"1rem"}}>{l.georgian}</span> ({l.georgianName})</span>
                                <span style={{ color:M3.secondary }}>Ge'ez: <span style={{fontSize:"1rem"}}>{l.geez}</span> · Syriac: <span style={{fontSize:"1rem"}}>{l.syriac}</span> · Arabic: <span style={{fontSize:"1rem"}}>{l.arabic}</span> {l.cuneiform && <>· Cuneiform: <span style={{fontSize:"1rem"}}>{l.cuneiform}</span> ({l.cuneiformName})</>}</span>
                                <span style={{ color:M3.secondary }}>Brahmi: <span style={{fontSize:"1rem"}}>{l.brahmi}</span> · Devanagari: <span style={{fontSize:"1rem"}}>{l.devanagari}</span> · Tamil: <span style={{fontSize:"1rem"}}>{l.tamil}</span></span>
                                <span style={{ color:M3.secondary }}>Ogham: <span style={{fontSize:"1rem"}}>{l.ogham}</span> {l.oghamName} ({l.oghamTree})</span>
                                <span style={{ color:M3.secondary }}>Old South Arabian: <span style={{fontSize:"1rem"}}>{l.oldSouthArabian}</span> · Bopomofo: <span style={{fontSize:"0.9rem"}}>{l.bopomofo}</span></span>
                                {l.tarotName && <span style={{ color:M3.tertiary }}>Tarot: {l.tarot} — {l.tarotName} · Chinese: <span style={{fontSize:"1rem"}}>{l.tarotChinese}</span> ({l.tarotPinyin})</span>}
                              </div>
                              {(isSign||isPlanet||isElement) && (
                                <div style={{ padding:"8px 12px", borderRadius:8, background:(highlight||M3.primary)+"11", border:`1px solid ${highlight||M3.primary}33` }}>
                                  <span style={{ color:highlight||M3.primary, fontFamily:"'Share Tech Mono',monospace", fontSize:"0.68rem", fontWeight:"700" }}>
                                    {l.yetzirah.type==="mother" ? `Mother Letter — Element: ${isElement}` : l.yetzirah.type==="double" ? `Double Letter — Planet: ${isPlanet}` : `Simple Letter — Sign: ${isSign}`}
                                  </span>
                                  {isSign && SIGN_INFO[isSign] && <span style={{ color:M3.onSurfaceVariant, fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.68rem", marginLeft:8, fontStyle:"italic" }}>{SIGN_INFO[isSign].letterMeaning}</span>}
                                </div>
                              )}
                            </div>
                          </td>
                        </tr>
                      ),
                    ];
                  })}
                </tbody>
              </table>
            );
          })()}
        </div>
      </Card>
      )}

      {gramTab==="atlas" && (SCRIPT_ATLAS || []).length > 0 && (
      <Card title={`🌍 Script Atlas — ${SCRIPT_ATLAS.reduce((n,f)=>n+f.scripts.length,0)} Writing Systems by Cultural Family`}>
        <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.78rem", lineHeight:1.6, color:M3.onSurfaceVariant, margin:"0 0 12px" }}>
          Every writing system on Earth catalogued by Unicode, organized by cultural family and geographic origin. The <strong>22-letter Proto-Sinaitic abjad</strong> is the ancestral root — but many daughter scripts expanded far beyond 22: Arabic has 28, Greek 24, Cyrillic 33, Armenian 38, Devanagari 46+, Ge'ez 182+ fidels, and Chinese tens of thousands of characters. Scripts marked with <span style={{ color:M3.primary, fontWeight:700 }}>●</span> have full letter-level mappings in the Cross-Script Table.
        </p>
        <div style={{ display:"flex", gap:8, marginBottom:12 }}>
          <input value={atlasSearch} onChange={e=>setAtlasSearch(e.target.value)} placeholder="Search scripts, cultures, regions..." style={{ flex:1, padding:"8px 12px", borderRadius:8, border:`1px solid ${M3.outline}`, background:M3.surfaceContainer, color:M3.onSurface, fontFamily:"'Share Tech Mono',monospace", fontSize:"0.68rem", outline:"none" }} />
          <span style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.62rem", color:M3.tertiary, alignSelf:"center" }}>
            {SCRIPT_ATLAS.reduce((n,f) => n + f.scripts.length, 0)} scripts
          </span>
        </div>
        {SCRIPT_ATLAS.map(fam => {
          const q = atlasSearch.trim().toLowerCase();
          const scripts = q ? fam.scripts.filter(s => [s.name,s.letters,s.type,s.status,...(s.cultures||[])].join(" ").toLowerCase().includes(q)) : fam.scripts;
          if (scripts.length === 0) return null;
          const isOpen = atlasExpanded === fam.family;
          return (
            <div key={fam.family} style={{ marginBottom:12, borderRadius:10, border:`1px solid ${fam.color}33`, overflow:"hidden" }}>
              <div onClick={()=>setAtlasExpanded(isOpen?null:fam.family)} style={{ padding:"10px 14px", background:`${fam.color}11`, cursor:"pointer", display:"flex", alignItems:"center", gap:10 }}>
                <span style={{ width:8, height:8, borderRadius:4, background:fam.color, flexShrink:0 }} />
                <div style={{ flex:1 }}>
                  <div style={{ fontFamily:"Cinzel,serif", fontSize:"0.88rem", color:fam.color }}>{fam.family}</div>
                  <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.56rem", color:M3.onSurfaceVariant }}>{fam.region} · {fam.era} · {scripts.length} scripts</div>
                </div>
                <span style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.72rem", color:M3.onSurfaceVariant }}>{isOpen ? "▲" : "▼"}</span>
              </div>
              {isOpen && (
                <div style={{ padding:"10px 14px" }}>
                  <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.72rem", lineHeight:1.55, color:M3.onSurfaceVariant, margin:"0 0 10px" }}>{fam.desc}</p>
                  <div style={{ overflowX:"auto" }}>
                    <table style={{ width:"100%", borderCollapse:"collapse" }}>
                      <thead><tr>
                        {["Script","Letters","Type","Status","Cultures"].map(h => (
                          <th key={h} style={{ padding:"4px 8px", textAlign:"left", color:M3.secondary, fontFamily:"'Share Tech Mono',monospace", fontSize:"0.54rem", letterSpacing:"0.06em", borderBottom:`1px solid ${M3.outlineVariant}`, whiteSpace:"nowrap" }}>{h}</th>
                        ))}
                      </tr></thead>
                      <tbody>
                        {scripts.map(s => (
                          <tr key={s.name} style={{ borderBottom:`1px solid ${M3.outlineVariant}22` }}>
                            <td style={{ padding:"4px 8px", fontFamily:"'Share Tech Mono',monospace", fontSize:"0.66rem", color:M3.onSurface }}>
                              {s.mapped && <span style={{ color:M3.primary, marginRight:4 }}>●</span>}
                              {s.name.replace(/_/g," ")}
                            </td>
                            <td style={{ padding:"4px 8px", fontFamily:"'Share Tech Mono',monospace", fontSize:"0.62rem", color:M3.tertiary }}>{s.letters}</td>
                            <td style={{ padding:"4px 8px", fontFamily:"'Share Tech Mono',monospace", fontSize:"0.6rem", color:M3.onSurfaceVariant }}>{s.type}</td>
                            <td style={{ padding:"4px 8px", fontFamily:"'Share Tech Mono',monospace", fontSize:"0.6rem", color: s.status==="Living"?"#4caf50":s.status?.includes("Extinct")?"#999":s.status?.includes("Historical")?"#b39ddb":"#90a4ae" }}>{s.status}</td>
                            <td style={{ padding:"4px 8px", fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.64rem", color:M3.onSurfaceVariant }}>{(s.cultures||[]).join(", ")}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </Card>
      )}

      {gramTab==="systems" && (
      <Card title="📜 Writing System Classification">
        <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.78rem", lineHeight:1.6, color:M3.onSurfaceVariant, margin:"0 0 14px" }}>
          The world's writing systems fall into four fundamental categories based on how they encode sound and meaning. An <strong>alphabet</strong> gives vowels and consonants equal weight. An <strong>abjad</strong> writes only consonants (vowels are implied or optionally marked). An <strong>abugida</strong> writes consonant-vowel units where each symbol starts with a consonant and the vowel is a secondary modification. A <strong>logographic/syllabary</strong> system uses symbols for whole words, morphemes, or syllables.
        </p>
        {WRITING_SYSTEM_TYPES.map(ws=>(
          <div key={ws.type} style={{ marginBottom:16 }}>
            <div style={{ fontFamily:"Cinzel,serif", fontSize:"0.95rem", color:M3.primary, marginBottom:6 }}>{ws.type}</div>
            <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.74rem", lineHeight:1.55, color:M3.onSurfaceVariant, margin:"0 0 8px" }}>{ws.desc}</p>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))", gap:8 }}>
              {ws.examples.map(ex=>(
                <div key={ex.name} style={{ padding:"8px 12px", borderRadius:8, background:M3.surfaceVariant+"44", border:`1px solid ${M3.outlineVariant}` }}>
                  <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.68rem", color:M3.tertiary, fontWeight:"700", marginBottom:4 }}>{ex.name} <span style={{ color:M3.onSurfaceVariant, fontWeight:"400" }}>({ex.dir})</span></div>
                  <div style={{ fontSize:"0.9rem", lineHeight:1.8, wordBreak:"break-all", letterSpacing:"0.08em" }}>{ex.sample}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </Card>
      )}

      {gramTab==="egyptian" && (
      <Card title="𓄿 Egyptian Hieroglyphic Uniliterals">
        <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.78rem", lineHeight:1.6, color:M3.onSurfaceVariant, margin:"0 0 12px" }}>
          The Egyptian writing system used around 750 distinct signs, but only <strong>27 uniliteral signs</strong> (single-consonant) form the core "alphabet." Each sign has a traditional colour (used in painted reliefs) and a pictographic description. The vowel [ɛ] is conventionally inserted between consonants to make Egyptian words pronounceable — <em>transliteration is not the same as transcription</em>. Exact phonetics depend on Coptic reconstruction.
        </p>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(230px,1fr))", gap:8 }}>
          {EGYPTIAN_UNILITERALS.map((u,i)=>{
            const col = ({polychrome:"#c0a",red:"#d44",green:"#4a4",yellow:"#da0",blue:"#48d",black:"#555",multiple:"#a8a"})[u.color]||M3.outline;
            return (
              <div key={i} style={{ display:"flex", alignItems:"center", gap:10, padding:"8px 12px", borderRadius:8, background:M3.surfaceContainer, border:`1px solid ${col}33` }}>
                <span style={{ fontSize:"2rem", lineHeight:1 }}>{u.glyph}</span>
                <div>
                  <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.72rem", color:M3.onSurface, fontWeight:"700" }}>[{u.ipa}] <span style={{ color:M3.tertiary }}>{u.translit}</span> {u.gardiner && <span style={{ color:M3.outlineVariant, fontSize:"0.58rem" }}>{u.gardiner}</span>}</div>
                  <div style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.68rem", color:M3.onSurfaceVariant }}>{u.name}</div>
                  <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.58rem", color:col, fontWeight:"600" }}>{u.color}</div>
                </div>
              </div>
            );
          })}
        </div>
        <div style={{ marginTop:14, padding:"10px 14px", borderRadius:8, background:M3.surfaceVariant+"44", border:`1px solid ${M3.outlineVariant}` }}>
          <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.64rem", color:M3.secondary, marginBottom:6 }}>ACROPHONIC NAME SHIFTS (Nöldeke, 1904)</div>
          <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.72rem", lineHeight:1.5, color:M3.onSurfaceVariant, margin:"0 0 8px" }}>
            Phoenician used acrophony to name letters: each letter's name started with the sound it represented. Some names shifted when borrowed from Proto-Canaanite into Phoenician:
          </p>
          <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
            {ACROPHONY_SHIFTS.map((s,i)=>(
              <div key={i} style={{ padding:"4px 10px", borderRadius:8, background:M3.surfaceContainer, fontFamily:"'Share Tech Mono',monospace", fontSize:"0.64rem" }}>
                <span style={{ fontSize:"1rem" }}>{s.letter}</span> <span style={{ color:M3.onSurfaceVariant }}>{s.original}</span> <span style={{ color:M3.secondary }}>"{s.meaning}"</span> → <span style={{ color:M3.primary }}>{s.shifted}</span> <span style={{ color:M3.tertiary }}>"{s.shiftMeaning}"</span>
              </div>
            ))}
          </div>
        </div>
      </Card>
      )}

      {gramTab==="ogham" && (
      <Card title="᚛ᚑᚌᚐᚋ᚜ Ogham — The Celtic Tree Alphabet">
        <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.78rem", lineHeight:1.6, color:M3.onSurfaceVariant, margin:"0 0 12px" }}>
          Ogham is an Early Medieval alphabet primarily used to write Primitive and Old Irish. Letters are grouped into four <em>aicmí</em> (families) of five, plus the <em>forfeda</em> (additional letters). Each letter is named after a tree or plant, carrying symbolic meaning. Ogham is read <strong>bottom to top</strong> on stone inscriptions, with strokes cut along a central stem-line.
        </p>
        {["Beithe","hÚatha","Muine","Ailme","Forfeda"].map(aicme=>(
          <div key={aicme} style={{ marginBottom:14 }}>
            <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.72rem", color:M3.primary, fontWeight:"700", marginBottom:6 }}>Aicme {aicme}</div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))", gap:8 }}>
              {OGHAM_FULL.filter(o=>o.aicme===aicme).map(o=>(
                <div key={o.glyph} style={{ display:"flex", gap:10, padding:"8px 12px", borderRadius:8, background:M3.surfaceContainer, border:`1px solid ${M3.outlineVariant}` }}>
                  <span style={{ fontSize:"1.8rem", lineHeight:1, color:M3.primary }}>{o.glyph}</span>
                  <div style={{ flex:1 }}>
                    <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.72rem", color:M3.onSurface, fontWeight:"700" }}>{o.name} <span style={{ color:M3.tertiary, fontWeight:"400" }}>[{o.ipa}]</span> <span style={{ fontSize:"1rem" }}>{o.hebrew}</span></div>
                    <div style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.68rem", color:M3.secondary, fontStyle:"italic" }}>{o.tree} {o.color && <span style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.56rem", color:M3.outlineVariant }}>({o.color})</span>}</div>
                    {o.animal && <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.58rem", color:M3.tertiary }}>🐾 {o.animal} {o.crystal && <>· 💎 {o.crystal}</>}</div>}
                    <div style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.66rem", color:M3.onSurfaceVariant, lineHeight:1.45, marginTop:2 }}>{o.meaning}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </Card>
      )}

      {gramTab==="tarot" && (
      <Card title="🃏 Tarot · Hebrew · Chinese · Zodiac Correspondences">
        <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.78rem", lineHeight:1.6, color:M3.onSurfaceVariant, margin:"0 0 12px" }}>
          Each of the 22 Major Arcana maps to one of the 22 Hebrew letters, and through them to Chinese ideograms. The zodiac signs also carry cross-cultural correspondences with Chinese constellation animals.
        </p>
        <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.68rem", color:M3.secondary, marginBottom:8 }}>MAJOR ARCANA — HEBREW — CHINESE</div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))", gap:6 }}>
          {LETTER_DB.map(l=>l.tarotName?(
            <div key={l.order} style={{ display:"flex", alignItems:"center", gap:8, padding:"6px 10px", borderRadius:8, background:M3.surfaceContainer, border:`1px solid ${M3.outlineVariant}` }}>
              <span style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.62rem", color:M3.tertiary, minWidth:16 }}>{l.tarot}</span>
              <span style={{ fontSize:"1.2rem" }}>{l.hebrew}</span>
              <span style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.64rem", color:M3.onSurface, flex:1 }}>{l.tarotName}</span>
              <span style={{ fontSize:"1.1rem" }}>{l.tarotChinese}</span>
              <span style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.56rem", color:M3.onSurfaceVariant }}>{l.tarotPinyin}</span>
            </div>
          ):null)}
        </div>
        <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.68rem", color:M3.secondary, margin:"16px 0 8px" }}>WESTERN ZODIAC — CHINESE IDEOGRAM</div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(210px,1fr))", gap:6 }}>
          {ZODIAC_CHINESE_MAP.map(z=>(
            <div key={z.sign} style={{ display:"flex", alignItems:"center", gap:8, padding:"6px 10px", borderRadius:8, background:SIGN_COL[z.sign]+"11", border:`1px solid ${SIGN_COL[z.sign]||M3.outlineVariant}33` }}>
              <span style={{ fontSize:"1.1rem" }}>{SIGN_INFO[z.sign]?.emoji}</span>
              <span style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.64rem", color:SIGN_COL[z.sign]||M3.onSurface, flex:1 }}>{z.sign}</span>
              <span style={{ fontSize:"1.2rem" }}>{z.chinese}</span>
              <span style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.6rem", color:M3.onSurfaceVariant }}>{z.pinyin} "{z.meaning}"</span>
              <span style={{ fontSize:"0.9rem" }}>{z.hebrew}</span>
            </div>
          ))}
        </div>
        <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.68rem", color:M3.secondary, margin:"16px 0 8px" }}>CHINESE ZODIAC ANIMALS — HEBREW LETTER CORRESPONDENCES</div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))", gap:6 }}>
          {CHINESE_ZODIAC_HEBREW.map(z=>(
            <div key={z.animal} style={{ display:"flex", alignItems:"center", gap:8, padding:"6px 10px", borderRadius:8, background:M3.surfaceContainer, border:`1px solid ${M3.outlineVariant}` }}>
              <span style={{ fontSize:"1.2rem" }}>{z.animal}</span>
              <span style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.64rem", color:M3.onSurface }}>{z.english}</span>
              <span style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.56rem", color:M3.onSurfaceVariant }}>{z.pinyin}</span>
              <span style={{ marginLeft:"auto", fontSize:"1rem" }}>{z.hebrew}</span>
              <span style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.72rem", color:M3.tertiary }}>{z.bopomofo}</span>
            </div>
          ))}
        </div>
        <div style={{ marginTop:14, padding:"10px 14px", borderRadius:8, background:M3.surfaceVariant+"44", border:`1px solid ${M3.outlineVariant}` }}>
          <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.64rem", color:M3.secondary, marginBottom:4 }}>THE OCCULTIC MUSICAL SCALE</div>
          <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.72rem", lineHeight:1.5, color:M3.onSurfaceVariant, margin:0 }}>{MUSICAL_SCALE_OCCULT.desc}</p>
          <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.68rem", lineHeight:1.5, color:M3.onSurfaceVariant, margin:"6px 0 0", fontStyle:"italic" }}>{MUSICAL_SCALE_OCCULT.pentatonic}</p>
        </div>
      </Card>
      )}

      {gramTab==="kangxi" && (
      <Card title="康熙部首 Kangxi Radicals — Ideographic Index System">
        <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.78rem", lineHeight:1.6, color:M3.onSurfaceVariant, margin:"0 0 10px" }}>
          {KANGXI_INFO?.origin} This dataset integrates all <strong>214 radicals</strong> used for dictionary indexing by radical + stroke count.
        </p>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(170px,1fr))", gap:8, marginBottom:12 }}>
          <div style={{ padding:"10px 12px", borderRadius:10, background:M3.surfaceContainer, border:`1px solid ${M3.outlineVariant}` }}>
            <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.56rem", color:M3.secondary, letterSpacing:"0.08em" }}>TOTAL RADICALS</div>
            <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"1.2rem", color:M3.primary, fontWeight:"700" }}>{KANGXI_RADICALS?.length || 0}</div>
          </div>
          <div style={{ padding:"10px 12px", borderRadius:10, background:M3.surfaceContainer, border:`1px solid ${M3.outlineVariant}` }}>
            <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.56rem", color:M3.secondary, letterSpacing:"0.08em" }}>KANGXI CHARACTERS</div>
            <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"1.2rem", color:M3.primary, fontWeight:"700" }}>{KANGXI_INFO?.totalCharsInKangxi?.toLocaleString?.() || "47,035"}</div>
          </div>
          <div style={{ padding:"10px 12px", borderRadius:10, background:M3.surfaceContainer, border:`1px solid ${M3.outlineVariant}` }}>
            <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.56rem", color:M3.secondary, letterSpacing:"0.08em" }}>MOST PRODUCTIVE</div>
            <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"1.2rem", color:M3.primary, fontWeight:"700" }}>#{KANGXI_TOP_10_BY_FREQUENCY?.[0]?.n} {KANGXI_TOP_10_BY_FREQUENCY?.[0]?.radical}</div>
          </div>
        </div>

        <div style={grid2}>
          <div style={{ padding:"10px 12px", borderRadius:10, background:M3.surfaceContainer, border:`1px solid ${M3.outlineVariant}` }}>
            <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.6rem", color:M3.secondary, letterSpacing:"0.08em", marginBottom:8 }}>TOP 10 BY CHARACTER FREQUENCY</div>
            <div style={{ display:"flex", flexDirection:"column", gap:5 }}>
              {KANGXI_TOP_10_BY_FREQUENCY?.map((r)=>(
                <div key={r.n} style={{ display:"flex", alignItems:"center", gap:8 }}>
                  <span style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.62rem", color:M3.tertiary, width:18 }}>{r.n}</span>
                  <span style={{ fontSize:"1rem" }}>{r.radical}</span>
                  <span style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.62rem", color:M3.onSurface }}>{r.meaning}</span>
                  <span style={{ marginLeft:"auto", fontFamily:"'Share Tech Mono',monospace", fontSize:"0.62rem", color:M3.primary }}>{r.kangxiCount}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ padding:"10px 12px", borderRadius:10, background:M3.surfaceContainer, border:`1px solid ${M3.outlineVariant}` }}>
            <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.6rem", color:M3.secondary, letterSpacing:"0.08em", marginBottom:8 }}>MOST USED / STANDALONE SETS</div>
            <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.56rem", color:M3.outlineVariant, marginBottom:4 }}>MOST USED</div>
            <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginBottom:8 }}>
              {KANGXI_MOST_USED?.map((r)=>(
                <span key={r.radical} style={{ padding:"2px 8px", borderRadius:10, background:M3.primaryContainer, color:M3.onPrimaryContainer, fontFamily:"'Share Tech Mono',monospace", fontSize:"0.6rem" }}>
                  {r.radical} {r.pinyin}
                </span>
              ))}
            </div>
            <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.56rem", color:M3.outlineVariant, marginBottom:4 }}>STANDALONE</div>
            <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
              {KANGXI_STANDALONE?.map((r)=>(
                <span key={r.radical} style={{ padding:"2px 8px", borderRadius:10, background:M3.surfaceVariant, color:M3.onSurfaceVariant, fontFamily:"'Share Tech Mono',monospace", fontSize:"0.6rem" }}>
                  {r.radical} {r.pinyin}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.62rem", color:M3.secondary, letterSpacing:"0.08em", margin:"14px 0 8px" }}>
          FULL 214 RADICAL TABLE
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr auto", gap:8, marginBottom:8 }}>
          <input
            value={kangxiQuery}
            onChange={(e)=>setKangxiQuery(e.target.value)}
            placeholder="Search radical, pinyin, meaning, examples, multilingual..."
            style={{ width:"100%", padding:"8px 10px", borderRadius:8, border:`1px solid ${M3.outline}`, background:M3.surfaceContainer, color:M3.onSurface, fontFamily:"'Share Tech Mono',monospace", fontSize:"0.65rem", outline:"none", minWidth:200 }}
          />
          <select
            value={kangxiStroke}
            onChange={(e)=>setKangxiStroke(e.target.value)}
            style={{ padding:"8px 10px", borderRadius:8, border:`1px solid ${M3.outline}`, background:M3.surfaceContainer, color:M3.onSurface, fontFamily:"'Share Tech Mono',monospace", fontSize:"0.62rem" }}
          >
            <option value="all">All strokes</option>
            {[...new Set((KANGXI_RADICALS || []).map(r=>r.strokes))].sort((a,b)=>a-b).map(s=>(
              <option key={s} value={String(s)}>{s} strokes</option>
            ))}
          </select>
          <select
            value={kangxiRange}
            onChange={(e)=>setKangxiRange(e.target.value)}
            style={{ padding:"8px 10px", borderRadius:8, border:`1px solid ${M3.outline}`, background:M3.surfaceContainer, color:M3.onSurface, fontFamily:"'Share Tech Mono',monospace", fontSize:"0.62rem" }}
          >
            <option value="all">All # ranges</option>
            <option value="1-60">#1–60</option>
            <option value="61-140">#61–140</option>
            <option value="141-214">#141–214</option>
          </select>
          <button
            onClick={()=>{
              setKangxiQuery("");
              setKangxiStroke("all");
              setKangxiRange("all");
              setKangxiTopOnly(false);
            }}
            style={{ padding:"8px 10px", borderRadius:8, border:`1px solid ${M3.outlineVariant}`, background:M3.surfaceContainer, color:M3.onSurfaceVariant, fontFamily:"'Share Tech Mono',monospace", fontSize:"0.62rem", cursor:"pointer" }}
          >
            Reset
          </button>
        </div>
        <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginBottom:8, alignItems:"center" }}>
          <span style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.56rem", color:M3.secondary, letterSpacing:"0.08em" }}>QUICK FILTERS</span>
          <button onClick={()=>setKangxiTopOnly(v=>!v)} style={{ padding:"3px 8px", borderRadius:12, border:`1px solid ${kangxiTopOnly?M3.primary:M3.outlineVariant}`, background:kangxiTopOnly?M3.primaryContainer:M3.surfaceContainer, color:kangxiTopOnly?M3.onPrimaryContainer:M3.onSurfaceVariant, fontFamily:"'Share Tech Mono',monospace", fontSize:"0.58rem", cursor:"pointer" }}>
            Top 10 only
          </button>
          <button onClick={()=>setKangxiStroke("1")} style={{ padding:"3px 8px", borderRadius:12, border:`1px solid ${M3.outlineVariant}`, background:M3.surfaceContainer, color:M3.onSurfaceVariant, fontFamily:"'Share Tech Mono',monospace", fontSize:"0.58rem", cursor:"pointer" }}>1 stroke</button>
          <button onClick={()=>setKangxiStroke("17")} style={{ padding:"3px 8px", borderRadius:12, border:`1px solid ${M3.outlineVariant}`, background:M3.surfaceContainer, color:M3.onSurfaceVariant, fontFamily:"'Share Tech Mono',monospace", fontSize:"0.58rem", cursor:"pointer" }}>17 strokes</button>
          <span style={{ marginLeft:"auto", fontFamily:"'Share Tech Mono',monospace", fontSize:"0.6rem", color:M3.tertiary }}>
            Showing {filteredKangxi.length} / {KANGXI_RADICALS?.length || 0}
          </span>
        </div>
        <div style={{ overflowX:"auto", maxHeight:440, border:`1px solid ${M3.outlineVariant}`, borderRadius:10 }}>
          <table style={{ width:"100%", borderCollapse:"collapse", minWidth:900 }}>
            <thead style={{ position:"sticky", top:0, background:M3.surfaceContainer }}>
              <tr>
                {["#", "Radical", "Variants", "Pinyin", "Meaning", "Strokes", "Examples", "Hán-Việt", "JP", "KR", "Freq"].map((h)=>(
                  <th key={h} style={{ padding:"5px 8px", textAlign:"left", color:M3.secondary, fontFamily:"'Share Tech Mono',monospace", fontSize:"0.56rem", borderBottom:`1px solid ${M3.outlineVariant}`, whiteSpace:"nowrap" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredKangxi?.map((r)=>(
                <tr key={r.n} style={{ borderBottom:`1px solid ${M3.outlineVariant}22` }}>
                  <td style={{ padding:"4px 8px", fontFamily:"'Share Tech Mono',monospace", fontSize:"0.62rem", color:M3.tertiary }}>{r.n}</td>
                  <td style={{ padding:"4px 8px", fontSize:"1.1rem" }}>{r.radical}</td>
                  <td style={{ padding:"4px 8px", fontFamily:"'Share Tech Mono',monospace", fontSize:"0.62rem", color:M3.onSurfaceVariant }}>{r.variants || r.simplified || "—"}</td>
                  <td style={{ padding:"4px 8px", fontFamily:"'Share Tech Mono',monospace", fontSize:"0.62rem", color:M3.onSurface }}>{r.pinyin}</td>
                  <td style={{ padding:"4px 8px", fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.68rem", color:M3.onSurface }}>{r.meaning}</td>
                  <td style={{ padding:"4px 8px", fontFamily:"'Share Tech Mono',monospace", fontSize:"0.62rem", color:M3.onSurfaceVariant }}>{r.strokes}</td>
                  <td style={{ padding:"4px 8px", fontFamily:"'Share Tech Mono',monospace", fontSize:"0.62rem", color:M3.onSurfaceVariant }}>{r.examples || "—"}</td>
                  <td style={{ padding:"4px 8px", fontFamily:"'Share Tech Mono',monospace", fontSize:"0.62rem", color:M3.onSurfaceVariant }}>{r.viet || "—"}</td>
                  <td style={{ padding:"4px 8px", fontFamily:"'Share Tech Mono',monospace", fontSize:"0.62rem", color:M3.onSurfaceVariant }}>{r.jp || "—"}</td>
                  <td style={{ padding:"4px 8px", fontFamily:"'Share Tech Mono',monospace", fontSize:"0.62rem", color:M3.onSurfaceVariant }}>{r.kr || "—"}</td>
                  <td style={{ padding:"4px 8px", fontFamily:"'Share Tech Mono',monospace", fontSize:"0.62rem", color:M3.primary }}>{r.freq ?? "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      )}

      {gramTab==="digraphs" && (
      <Card title="TH → Θ — Digraph to Monogram Crosswalk">
        <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.78rem", lineHeight:1.6, color:M3.onSurfaceVariant, margin:"0 0 12px" }}>
          Many sounds that English writes with two letters (digraphs) were originally single letters in older scripts. When you write "TH" you are really writing the ancient Theta (Θ), which was the Phoenician Teth (𐤈), itself from the hieroglyph of a wheel or serpent (𓄤). Understanding these collapses reveals the hidden architecture of the modern alphabet.
        </p>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))", gap:8 }}>
          {DIGRAPH_MAP.map((d,i)=>(
            <div key={i} style={{ padding:"10px 14px", borderRadius:8, background:M3.surfaceContainer, border:`1px solid ${M3.outlineVariant}` }}>
              <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:6 }}>
                <span style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"1rem", color:M3.primary, fontWeight:"700" }}>{d.di}</span>
                <span style={{ color:M3.onSurfaceVariant }}>→</span>
                <span style={{ fontSize:"1rem" }}>{d.mono}</span>
                <span style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.66rem", color:M3.tertiary }}>[{d.ipa}]</span>
                <span style={{ fontSize:"1rem", marginLeft:"auto" }}>{d.hebrew}</span>
                {d.runic!=="—" && <span style={{ fontSize:"1rem" }}>{d.runic}</span>}
              </div>
              <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.68rem", lineHeight:1.45, color:M3.onSurfaceVariant, margin:0 }}>{d.note}</p>
            </div>
          ))}
        </div>
      </Card>
      )}

      {gramTab==="ipa" && (
      <Card title="[ipa] International Phonetic Alphabet — Quick Reference">
        <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.78rem", lineHeight:1.6, color:M3.onSurfaceVariant, margin:"0 0 12px" }}>
          The IPA is the universal system for representing the sounds of human speech. Many ancient letter values (like Hebrew Chet = [χ], or Ayin = [ʕ]) can only be precisely described using IPA symbols. This reference covers the key symbols you will encounter in this grammatological analysis.
        </p>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))", gap:8 }}>
          {IPA_QUICK.map((p,i)=>(
            <div key={i} style={{ display:"flex", gap:10, padding:"8px 12px", borderRadius:8, background:M3.surfaceContainer, border:`1px solid ${M3.outlineVariant}` }}>
              <span style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"1.2rem", color:M3.primary, minWidth:28, textAlign:"center" }}>{p.sym}</span>
              <div>
                <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.68rem", color:M3.onSurface, fontWeight:"600" }}>{p.name}</div>
                <div style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.66rem", color:M3.onSurfaceVariant }}>{p.example}</div>
                <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.72rem", color:M3.tertiary, letterSpacing:"0.12em", marginTop:2 }}>{p.scripts}</div>
              </div>
            </div>
          ))}
        </div>
      </Card>
      )}

      {gramTab==="yetzirah" && (
      <Card title="☯ The Three Mothers, Seven Doubles, Twelve Simples">
        <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.78rem", lineHeight:1.6, color:M3.onSurfaceVariant, margin:"0 0 12px" }}>
          The Sefer Yetzirah ("Book of Formation") divides the 22 Hebrew letters into three groups, mapping the entire cosmos onto the alphabet. Three Mother Letters govern the elements, seven Double Letters govern the planets, and twelve Simple Letters govern the zodiac signs.
        </p>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))", gap:14 }}>
          <div style={{ padding:"12px 14px", borderRadius:10, background:EL_COL.Fire+"0a", border:`1px solid ${EL_COL.Fire}22` }}>
            <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.68rem", color:M3.secondary, letterSpacing:"0.1em", marginBottom:8 }}>3 MOTHER LETTERS — THE ELEMENTS</div>
            {LETTER_DB.filter(l=>l.yetzirah.type==="mother").map(l=>(
              <div key={l.order} style={{ display:"flex", alignItems:"center", gap:10, padding:"4px 0" }}>
                <span style={{ fontSize:"1.3rem", color:EL_COL[l.yetzirah.element]||M3.primary }}>{l.hebrew}</span>
                <span style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.72rem", color:M3.onSurface, fontWeight:"600" }}>{l.hebrewName}</span>
                <span style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.66rem", color:EL_COL[l.yetzirah.element]||M3.tertiary }}>{l.yetzirah.element}</span>
                <span style={{ marginLeft:"auto", fontSize:"0.9rem" }}>{l.hiero} {l.phoenician} {l.aramaic} {l.coptic} {l.ogham}</span>
              </div>
            ))}
            <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.72rem", lineHeight:1.55, color:M3.onSurfaceVariant, margin:"8px 0 0", fontStyle:"italic" }}>
              Aleph (Air/Breath), Mem (Water/Womb), Shin (Fire/Spirit) — the three primordial forces from which all creation emerges.
            </p>
          </div>
          <div style={{ padding:"12px 14px", borderRadius:10, background:M3.primaryContainer+"22", border:`1px solid ${M3.primary}22` }}>
            <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.68rem", color:M3.secondary, letterSpacing:"0.1em", marginBottom:8 }}>7 DOUBLE LETTERS — THE PLANETS</div>
            {LETTER_DB.filter(l=>l.yetzirah.type==="double").map(l=>(
              <div key={l.order} style={{ display:"flex", alignItems:"center", gap:10, padding:"4px 0" }}>
                <span style={{ fontSize:"1.3rem", color:P_COL[l.yetzirah.planet]||M3.primary }}>{l.hebrew}</span>
                <span style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.72rem", color:M3.onSurface, fontWeight:"600" }}>{l.hebrewName}</span>
                <span style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.66rem", color:P_COL[l.yetzirah.planet]||M3.tertiary }}>{P_SYM[l.yetzirah.planet]||""} {l.yetzirah.planet}</span>
                <span style={{ marginLeft:"auto", fontSize:"0.9rem" }}>{l.hiero} {l.phoenician} {l.aramaic} {l.coptic} {l.ogham}</span>
              </div>
            ))}
            <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.72rem", lineHeight:1.55, color:M3.onSurfaceVariant, margin:"8px 0 0", fontStyle:"italic" }}>
              Called "double" because each has two sounds (hard/soft). They govern the seven classical planets visible to the ancients.
            </p>
          </div>
          <div style={{ padding:"12px 14px", borderRadius:10, background:M3.surfaceVariant+"44", border:`1px solid ${M3.outlineVariant}` }}>
            <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.68rem", color:M3.secondary, letterSpacing:"0.1em", marginBottom:8 }}>12 SIMPLE LETTERS — THE ZODIAC</div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"2px 10px" }}>
            {LETTER_DB.filter(l=>l.yetzirah.type==="simple").map(l=>(
              <div key={l.order} style={{ display:"flex", alignItems:"center", gap:6, padding:"3px 0" }}>
                <span style={{ fontSize:"1.1rem", color:SIGN_COL[l.yetzirah.sign]||M3.primary }}>{l.hebrew}</span>
                <span style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.66rem", color:M3.onSurface }}>{l.hebrewName}</span>
                <span style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.6rem", color:SIGN_COL[l.yetzirah.sign]||M3.tertiary, marginLeft:"auto" }}>{SIGN_INFO[l.yetzirah.sign]?.emoji} {l.yetzirah.sign}</span>
              </div>
            ))}
          </div>
          <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.72rem", lineHeight:1.55, color:M3.onSurfaceVariant, margin:"8px 0 0", fontStyle:"italic" }}>
            Twelve single-sound letters, each assigned to one of the twelve signs in the Sefer Yetzirah tradition.
          </p>
        </div>
      </div>
      </Card>
      )}
    </div>
  );
}
