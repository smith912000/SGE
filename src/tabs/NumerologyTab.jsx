import { useState } from "react";
import { P_SYM, P_COL, PLANET_INFO } from '../data/astrology/planets.js';
import { getNumerologySymbolism } from '../data/symbolism/numerologySymbolism.js';
import { NUM_PLANET, MASTER_NUMBERS } from '../data/numerology/tables.js';
import { EXPRESSION_MEANING, SOUL_URGE_MEANING, PERSONALITY_MEANING, BIRTHDAY_MEANING } from '../data/numerology/meanings.js';
import { computeNumerology, reduceToRoot } from '../engines/numerology.js';
import { calcGematria } from '../engines/gematria.js';
import SymbolPanel from '../components/ui/SymbolPanel.jsx';
import DepthControl from '../components/ui/DepthControl.jsx';
import { useDepth } from '../store/depthStore.js';
export default function NumerologyTab({ ctx }) {
  const { M3, birthParts, res, Card } = ctx;
  const [gemaName, setGemaName] = useState("");
  const [depth, setDepth] = useDepth();

  const A = birthParts || {};
  const nuData = computeNumerology(A.year, A.month, A.day, A.name || "");
  const hasName = nuData.letterBreakdown.length > 0;
  const lp = getNumerologySymbolism(nuData.lifePath) || getNumerologySymbolism(reduceToRoot(nuData.lifePath));

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
      <Card style={{ background:`linear-gradient(135deg,${M3.primaryContainer}88,${M3.surfaceContainer})`, borderColor:M3.outline }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", gap:12, flexWrap:"wrap", marginBottom:8 }}>
          <div style={{ fontFamily:"Cinzel,serif", fontSize:"1.1rem", color:M3.primary }}>Numerology — Figures and the Maps That Produce Them</div>
          <DepthControl depth={depth} onChange={setDepth} compact />
        </div>
        <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.82rem", lineHeight:1.7, color:M3.onSurface, margin:0 }}>
          Numerology assigns numbers to a date and to the letters of a name, sums them, and reduces the total to a single figure.
        </p>
      </Card>

      {/* ── Core Numbers ── */}
      <Card title="Core Numbers — Each Figure and Its Derivation">
        <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.76rem", lineHeight:1.6, color:M3.onSurfaceVariant, margin:"0 0 14px" }}>
          Eight figures stand below.
        </p>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(140px,1fr))", gap:10 }}>
          {[
            { label:"Life Path", val:nuData.lifePath, color:M3.primary, tip:"Month, day and year each reduced, then summed and reduced again. The modern literature treats it as the governing figure of the set.", needsName:false },
            { label:"Birthday", val:nuData.birthday, color:"#ffa726", tip:"The day of the month, reduced. Held as a subsidiary figure said to colour the life path.", needsName:false },
            { label:"Personal Year", val:nuData.personalYear, color:"#69ff8e", tip:"Birth month and day summed with the reduced current year. A position in the nine-year count, not a forecast.", needsName:false },
            { label:"Expression", val:nuData.expression, color:M3.tertiary, tip:"Every letter of the full name under the Pythagorean map. Attributed to outward capacity and manner.", needsName:true },
            { label:"Soul Urge", val:nuData.soulUrge, color:"#ce93d8", tip:"The vowels alone. Also called the Heart's Desire; attributed to inward motive.", needsName:true },
            { label:"Personality", val:nuData.personality, color:"#4fc3f7", tip:"The consonants alone. Attributed to the outward impression rather than the inward motive.", needsName:true },
            { label:"Maturity", val:nuData.maturity, color:M3.secondary, tip:"Life Path plus Expression, reduced. Attributed to the later arc of a life.", needsName:true },
            { label:"Chaldean Expr.", val:nuData.chaldeanExpr, color:"#ff5252", tip:"The same name under the Chaldean map, which assigns letters differently and gives no letter 9. Held by some traditions to be the older and more exact reckoning.", needsName:true },
          ].map(c=>(
            <div key={c.label} style={{ padding:"14px", borderRadius:12, background:c.color+"11", border:`1px solid ${c.color}33`, textAlign:"center", opacity: c.needsName && !hasName ? 0.4 : 1 }}>
              <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.58rem", color:c.color, letterSpacing:"0.1em", marginBottom:6 }}>{c.label.toUpperCase()}</div>
              <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"2.2rem", color:c.color, fontWeight:"700", lineHeight:1 }}>
                {c.needsName && !hasName ? "—" : <>{c.val}{MASTER_NUMBERS.has(c.val) ? <span style={{fontSize:"0.6rem",verticalAlign:"super",color:"#ffd54f"}}> M</span> : ""}</>}
              </div>
              <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.6rem", color:M3.onSurfaceVariant, marginTop:4 }}>
                {c.needsName && !hasName ? "enter name above" : NUM_PLANET[c.val] ? `${P_SYM[NUM_PLANET[c.val]]||""} ${NUM_PLANET[c.val]}` : ""}
              </div>
              <div style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.58rem", color:M3.onSurfaceVariant, marginTop:6, fontStyle:"italic", lineHeight:1.4 }}>{c.tip}</div>
            </div>
          ))}
        </div>
      </Card>

      {/* ── Life Path Deep Dive ── */}
      <Card title={`Life Path ${nuData.lifePath} — ${lp.title||"Unnamed"}`}>
        {lp.archetype && <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.68rem", color:M3.tertiary, letterSpacing:"0.08em", marginBottom:8 }}>{lp.archetype}</div>}
        <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.82rem", lineHeight:1.7, color:M3.onSurface, margin:"0 0 12px" }}>{lp.desc||"No record is held for this number."}</p>
        {lp.shadow && (
          <div style={{ padding:"10px 14px", borderRadius:10, background:"#ff525211", border:"1px solid #ff525222", marginBottom:10 }}>
            <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.62rem", color:"#ff5252", letterSpacing:"0.08em", marginBottom:4 }}>SHADOW SIDE</div>
            <div style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.76rem", color:M3.onSurface, lineHeight:1.5 }}>{lp.shadow}</div>
          </div>
        )}
        {lp.growth && (
          <div style={{ padding:"10px 14px", borderRadius:10, background:"#69ff8e11", border:"1px solid #69ff8e22" }}>
            <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.62rem", color:"#69ff8e", letterSpacing:"0.08em", marginBottom:4 }}>GROWTH PATH</div>
            <div style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.76rem", color:M3.onSurface, lineHeight:1.5 }}>{lp.growth}</div>
          </div>
        )}
      </Card>

      {/* ── Core Number Meanings ── */}
      <Card title="What Each Number Has Been Taken to Mean">
        <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
          {[
            ...(hasName ? [
              { label:"Expression", num:nuData.expression, meaning:EXPRESSION_MEANING[nuData.expression]||"" },
              { label:"Soul Urge", num:nuData.soulUrge, meaning:SOUL_URGE_MEANING[nuData.soulUrge]||"" },
              { label:"Personality", num:nuData.personality, meaning:PERSONALITY_MEANING[nuData.personality]||"" },
            ] : []),
            { label:"Birthday", num:nuData.birthday, meaning:BIRTHDAY_MEANING[nuData.birthday]||"" },
          ].map(r=>(
            <div key={r.label} style={{ padding:"10px 14px", borderRadius:10, background:M3.surfaceVariant+"44", border:`1px solid ${M3.outlineVariant}` }}>
              <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:4 }}>
                <span style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.62rem", color:M3.secondary, letterSpacing:"0.08em" }}>{r.label.toUpperCase()}</span>
                <span style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"1rem", color:M3.tertiary, fontWeight:"700" }}>{r.num}</span>
              </div>
              <div style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.78rem", color:M3.onSurface, lineHeight:1.55 }}>{r.meaning}</div>
            </div>
          ))}
        </div>
      </Card>

      {/* ── Name Letter Breakdown ── */}
      {hasName && (
      <Card title="Name Letter Breakdown — Pythagorean & Chaldean Values">
        <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.76rem", lineHeight:1.6, color:M3.onSurfaceVariant, margin:"0 0 10px" }}>
          Each letter is assigned a number.
        </p>
        <div style={{ display:"flex", flexWrap:"wrap", gap:4, marginBottom:12 }}>
          {nuData.letterBreakdown.map((l,i)=>(
            <div key={i} style={{ padding:"5px 8px", borderRadius:8, minWidth:36, textAlign:"center",
              background:l.isVowel ? M3.primaryContainer+"44" : M3.surfaceVariant,
              border:`1px solid ${l.isVowel ? M3.primary+"44" : M3.outlineVariant}` }}>
              <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"1rem", color:l.isVowel ? M3.primary : M3.onSurface, fontWeight:"700" }}>{l.ch}</div>
              <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.58rem", color:M3.tertiary }}>P:{l.pythagorean}</div>
              <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.58rem", color:"#ff8a50" }}>C:{l.chaldean}</div>
              <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.48rem", color:l.isVowel ? M3.primary : M3.onSurfaceVariant, marginTop:2 }}>{l.isVowel ? "vowel" : "cons."}</div>
            </div>
          ))}
        </div>
        <div style={{ display:"flex", gap:10, flexWrap:"wrap", fontFamily:"'Share Tech Mono',monospace", fontSize:"0.68rem" }}>
          <span style={{ color:M3.onSurface }}>Expression sum: <strong>{nuData.exprSum}</strong> → <strong>{nuData.expression}</strong></span>
          <span style={{ color:"#ce93d8" }}>Soul (vowels): <strong>{nuData.soulSum}</strong> → <strong>{nuData.soulUrge}</strong></span>
          <span style={{ color:"#4fc3f7" }}>Personality (cons.): <strong>{nuData.persSum}</strong> → <strong>{nuData.personality}</strong></span>
          <span style={{ color:"#ff8a50" }}>Chaldean: <strong>{nuData.chaldExprSum}</strong> → <strong>{nuData.chaldeanExpr}</strong></span>
        </div>
      </Card>
      )}

      {/* ── Missing Numbers ── */}
      {hasName && nuData.missingNums.length > 0 && (
      <Card title="Karmic Lessons — Numbers Absent From the Name">
        <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.76rem", lineHeight:1.6, color:M3.onSurfaceVariant, margin:"0 0 10px" }}>
          Numbers that do not appear among the letter values of the name.
        </p>
        <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
          {nuData.missingNums.map(n=>(
            <div key={n} style={{ padding:"8px 14px", borderRadius:10, background:"#ff525211", border:"1px solid #ff525222", textAlign:"center" }}>
              <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"1.4rem", color:"#ff5252", fontWeight:"700" }}>{n}</div>
              <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.58rem", color:M3.onSurfaceVariant }}>{NUM_PLANET[n]||""}</div>
            </div>
          ))}
        </div>
      </Card>
      )}

      {/* ── Pinnacles & Challenges ── */}
      <Card title="Life Pinnacles & Challenges — The Four Periods">
        <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.76rem", lineHeight:1.6, color:M3.onSurfaceVariant, margin:"0 0 12px" }}>
          The scheme divides a life into four periods, each carrying a <strong>pinnacle</strong> number and a <strong>challenge</strong> number derived arithmetically from the birth date.
        </p>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
          {["First (youth)","Second (early adult)","Third (maturity)","Fourth (wisdom)"].map((phase,i)=>(
            <div key={i} style={{ padding:"10px 12px", borderRadius:10, background:M3.surfaceVariant+"44", border:`1px solid ${M3.outlineVariant}` }}>
              <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.58rem", color:M3.secondary, letterSpacing:"0.08em", marginBottom:6 }}>{phase.toUpperCase()}</div>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                <div style={{ textAlign:"center" }}>
                  <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.52rem", color:"#69ff8e" }}>PINNACLE</div>
                  <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"1.4rem", color:"#69ff8e", fontWeight:"700" }}>{nuData.pinnacles[i]}</div>
                </div>
                <div style={{ textAlign:"center" }}>
                  <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.52rem", color:"#ff5252" }}>CHALLENGE</div>
                  <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"1.4rem", color:"#ff5252", fontWeight:"700" }}>{nuData.challenges[i]}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* ── Hebrew Gematria Calculator ── */}
      <Card title="Hebrew Gematria Calculator — The Number in a Name">
        <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.76rem", lineHeight:1.6, color:M3.onSurfaceVariant, margin:"0 0 14px" }}>
          Each Hebrew letter carries a numerical value.
        </p>
        <input type="text" value={gemaName} onChange={e=>setGemaName(e.target.value)}
          placeholder="English name, Hebrew (אברהם), or phrase..."
          style={{ width:"100%", padding:"10px 14px", background:M3.surfaceDim, border:`1px solid ${M3.outline}`, borderRadius:10,
            color:M3.onSurface, fontFamily:"'Share Tech Mono',monospace", fontSize:"0.82rem", outline:"none", boxSizing:"border-box" }}/>
        {gemaName.trim() && (()=>{
          const g = calcGematria(gemaName);
          return (
            <div style={{ marginTop:14 }}>
              <div style={{ marginBottom:14, padding:"10px 16px", borderRadius:10, background:M3.primaryContainer+"33", border:`1px solid ${M3.primary}22` }}>
                {g.isHebrew ? (
                  <>
                    <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.6rem", color:M3.secondary, letterSpacing:"0.1em", marginBottom:6 }}>HEBREW INPUT</div>
                    <div style={{ fontSize:"1.8rem", color:M3.primary, fontFamily:"serif", letterSpacing:"0.05em", direction:"rtl", textAlign:"center" }}>{g.hebrewStr}</div>
                  </>
                ) : g.hasKnown && g.knownStr ? (
                  <>
                    <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.6rem", color:"#69ff8e", letterSpacing:"0.1em", marginBottom:6 }}>ESTABLISHED HEBREW SPELLING</div>
                    <div style={{ fontSize:"1.8rem", color:M3.primary, fontFamily:"serif", letterSpacing:"0.05em", direction:"rtl", textAlign:"center" }}>{g.knownStr}</div>
                    {g.knownTotal !== null && (
                      <div style={{ textAlign:"center", marginTop:4 }}>
                        <span style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.65rem", color:"#69ff8e" }}>Traditional gematria: {g.knownTotal}</span>
                      </div>
                    )}
                    <div style={{ marginTop:8, padding:"8px 12px", borderRadius:8, background:M3.surfaceDim }}>
                      <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.55rem", color:M3.onSurfaceVariant, letterSpacing:"0.1em", marginBottom:4 }}>PHONETIC TRANSLITERATION (for comparison)</div>
                      <div style={{ fontSize:"1.1rem", color:M3.onSurfaceVariant, fontFamily:"serif", direction:"rtl", textAlign:"center", opacity:0.6 }}>
                        {g.transHebrewStr}
                        <span style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.6rem", marginLeft:8 }}>= {g.transTotal}</span>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.6rem", color:M3.secondary, letterSpacing:"0.1em", marginBottom:6 }}>PHONETIC TRANSLITERATION (CONSONANTAL)</div>
                    <div style={{ fontSize:"1.8rem", color:M3.primary, fontFamily:"serif", letterSpacing:"0.05em", direction:"rtl", textAlign:"center" }}>{g.hebrewStr}</div>
                    {g.fullHebrewStr !== g.hebrewStr && (
                      <div style={{ marginTop:4, textAlign:"center" }}>
                        <span style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.55rem", color:M3.onSurfaceVariant }}>with vowels: </span>
                        <span style={{ fontSize:"1rem", color:M3.onSurfaceVariant, fontFamily:"serif", direction:"rtl", opacity:0.5 }}>{g.fullHebrewStr}</span>
                        {g.fullTotal !== g.total && <span style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.6rem", color:M3.onSurfaceVariant, marginLeft:8 }}>= {g.fullTotal}</span>}
                      </div>
                    )}
                  </>
                )}
                {!g.isHebrew && g.hasAlt && g.altHebrewStr && !g.hasKnown && (
                  <div style={{ marginTop:6 }}>
                    <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.55rem", color:M3.tertiary, letterSpacing:"0.1em", marginBottom:4 }}>ALTERNATIVE READING</div>
                    <div style={{ fontSize:"1.3rem", color:M3.tertiary, fontFamily:"serif", letterSpacing:"0.05em", direction:"rtl", textAlign:"center", opacity:0.7 }}>
                      {g.altHebrewStr}
                      {g.altTotal !== null && g.altTotal !== g.total && <span style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.7rem", marginLeft:10 }}>= {g.altTotal}</span>}
                    </div>
                  </div>
                )}
                {!g.isHebrew && !g.hasKnown && (
                  <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.68rem", lineHeight:1.5, color:M3.onSurfaceVariant, margin:"8px 0 0", fontStyle:"italic", textAlign:"center" }}>
                    Phonetic approximation — Hebrew is consonantal, so medial vowels are omitted from the primary value.
                  </p>
                )}
              </div>
              <div style={{ display:"flex", flexWrap:"wrap", gap:5, marginBottom:14 }}>
                {g.letters.map((l,i)=>(
                  <div key={i} style={{ padding:"5px 8px", borderRadius:8,
                    background:l.isDigraph ? M3.tertiary+"18" : l.isVowelDrop ? M3.surfaceVariant+"66" : M3.surfaceVariant,
                    border:`1px solid ${l.isDigraph ? M3.tertiary+"44" : l.isVowelDrop ? M3.outlineVariant+"44" : M3.outlineVariant}`,
                    textAlign:"center", minWidth:36, opacity:l.isVowelDrop ? 0.55 : 1 }}>
                    <div style={{ fontSize:"1rem", color:l.isDigraph ? M3.tertiary : M3.primary }}>{l.heb}</div>
                    <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.55rem", color:M3.onSurfaceVariant }}>{l.chars}{l.isDigraph ? " ²" : ""}</div>
                    <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.6rem", color:M3.tertiary, fontWeight:"700" }}>{l.val}</div>
                    <div style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.48rem", color:M3.onSurfaceVariant, fontStyle:"italic" }}>{l.name}</div>
                    {l.alt && (
                      <div style={{ marginTop:2, borderTop:`1px dashed ${M3.outlineVariant}`, paddingTop:2 }}>
                        <div style={{ fontSize:"0.65rem", color:M3.tertiary+"88" }}>{l.alt.heb} {l.alt.val}</div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div style={{ display:"flex", gap:12, flexWrap:"wrap", alignItems:"center", marginBottom:14 }}>
                <div style={{ padding:"12px 20px", borderRadius:12, background:M3.primaryContainer, textAlign:"center" }}>
                  <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.58rem", color:M3.secondary, letterSpacing:"0.1em" }}>TOTAL</div>
                  <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"1.6rem", color:M3.onPrimaryContainer, fontWeight:"700" }}>{g.total}</div>
                </div>
                {g.hasAlt && g.altTotal !== null && g.altTotal !== g.total && (
                  <div style={{ padding:"12px 20px", borderRadius:12, background:M3.surfaceVariant, textAlign:"center", borderLeft:`3px solid ${M3.tertiary}44` }}>
                    <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.58rem", color:M3.tertiary, letterSpacing:"0.1em" }}>ALT TOTAL</div>
                    <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"1.6rem", color:M3.tertiary, fontWeight:"700" }}>{g.altTotal}</div>
                  </div>
                )}
                <div style={{ padding:"12px 20px", borderRadius:12, background:M3.surfaceVariant, textAlign:"center" }}>
                  <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.58rem", color:M3.secondary, letterSpacing:"0.1em" }}>REDUCED</div>
                  <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"1.6rem", color:M3.tertiary, fontWeight:"700" }}>{g.reduced}</div>
                </div>
                {g.planetRes && (
                  <div style={{ padding:"12px 20px", borderRadius:12, background:(P_COL[g.planetRes]||M3.primary)+"18", border:`1px solid ${P_COL[g.planetRes]||M3.primary}44`, textAlign:"center" }}>
                    <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.58rem", color:M3.secondary, letterSpacing:"0.1em" }}>RESONANCE</div>
                    <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.9rem", color:P_COL[g.planetRes]||M3.tertiary, fontWeight:"700" }}>{P_SYM[g.planetRes]} {g.planetRes}</div>
                  </div>
                )}
              </div>
              {g.notes && g.notes.length > 0 && (
                <div style={{ padding:"10px 14px", borderRadius:10, background:M3.surfaceDim, border:`1px solid ${M3.outlineVariant}33` }}>
                  <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.58rem", color:M3.secondary, letterSpacing:"0.1em", marginBottom:6 }}>TRANSLITERATION NOTES</div>
                  {g.notes.map((n,i)=>(
                    <div key={i} style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.68rem", color:M3.onSurfaceVariant, lineHeight:1.5, padding:"2px 0" }}>• {n}</div>
                  ))}
                </div>
              )}
            </div>
          );
        })()}
      </Card>

      {/* ── Planetary Gematria ── */}
      {res && (
      <Card title="Planetary Gematria — Double-Letter Values">
        <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.76rem", lineHeight:1.6, color:M3.onSurfaceVariant, margin:"0 0 10px" }}>
          In the Sefer Yetzirah tradition, each planet is assigned a Hebrew "double letter" with its own gematria value. This table lists those values. The Sepher Yetzirah assignment and the Golden Dawn path attributions are not the same scheme, and sources differ on which letter belongs to which body.
        </p>
        <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
          {["Sun","Moon","Mercury","Venus","Mars","Jupiter","Saturn"].map(p=>{
            const pi = PLANET_INFO[p];
            if (!pi) return null;
            return (
              <div key={p} style={{ padding:"8px 14px", borderRadius:10, background:(P_COL[p]||M3.primary)+"11", border:`1px solid ${P_COL[p]||M3.primary}33`, textAlign:"center", minWidth:80 }}>
                <div style={{ fontSize:"1.2rem" }}>{P_SYM[p]}</div>
                <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.66rem", color:P_COL[p]||M3.primary, fontWeight:"700" }}>{p}</div>
                <div style={{ fontSize:"1.1rem", color:M3.primary, marginTop:4 }}>{pi.hebrew}</div>
                <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.58rem", color:M3.onSurfaceVariant }}>{pi.letterName}</div>
                <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.9rem", color:M3.tertiary, fontWeight:"700", marginTop:2 }}>{pi.gematriaVal}</div>
              </div>
            );
          })}
        </div>
        {(()=>{
          const total = ["Sun","Moon","Mercury","Venus","Mars","Jupiter","Saturn"].reduce((s,p)=>(PLANET_INFO[p]?.gematriaVal||0)+s,0);
          const reduced = reduceToRoot(total);
          return (
            <div style={{ marginTop:12, display:"flex", gap:12, flexWrap:"wrap", alignItems:"center" }}>
              <div style={{ padding:"10px 16px", borderRadius:10, background:M3.primaryContainer+"33", border:`1px solid ${M3.primary}22`, textAlign:"center" }}>
                <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.58rem", color:M3.secondary, letterSpacing:"0.08em" }}>TOTAL</div>
                <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"1.3rem", color:M3.primary, fontWeight:"700" }}>{total}</div>
              </div>
              <div style={{ padding:"10px 16px", borderRadius:10, background:M3.surfaceVariant, textAlign:"center" }}>
                <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.58rem", color:M3.secondary, letterSpacing:"0.08em" }}>REDUCED</div>
                <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"1.3rem", color:M3.tertiary, fontWeight:"700" }}>{reduced}</div>
              </div>
              {NUM_PLANET[reduced] && (
                <div style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.76rem", color:M3.onSurface }}>
                  Planetary signature resonates with <strong>{NUM_PLANET[reduced]}</strong> energy
                </div>
              )}
            </div>
          );
        })()}
      </Card>
      )}

      {/* ── Birth Day Number Sequences ── */}
      <Card title="Birth Day Number Sequences — Mathematical Resonance">
        <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.76rem", lineHeight:1.6, color:M3.onSurfaceVariant, margin:"0 0 12px" }}>
          The birth day-of-year is checked against a set of mathematical sequences.
        </p>
        <div style={{ display:"flex", flexWrap:"wrap", gap:6, justifyContent:"center" }}>
          {nuData.daySeqs.map(s=>(
            <div key={s.key} style={{ padding:"5px 10px", borderRadius:8, background:s.active ? M3.primaryContainer+"66" : M3.surfaceVariant+"33", border:`1px solid ${s.active ? M3.tertiary+"66" : M3.outlineVariant}`, opacity:s.active ? 1 : 0.5, textAlign:"center" }}>
              <div style={{ fontSize:"1rem" }}>{s.sym}</div>
              <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.6rem", color:s.active ? M3.onSurface : M3.onSurfaceVariant }}>{s.name}</div>
            </div>
          ))}
        </div>
        {(()=>{
          const active = nuData.daySeqs.filter(s=>s.active);
          if (active.length === 0) return (
            <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.76rem", color:M3.onSurfaceVariant, textAlign:"center", marginTop:10 }}>
              The birth day-of-year falls on none of the tracked sequences.
            </p>
          );
          return (
            <div style={{ marginTop:10, padding:"8px 12px", borderRadius:8, background:M3.primaryContainer+"22", border:`1px solid ${M3.primary}22` }}>
              <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.68rem", color:M3.tertiary, marginBottom:4 }}>THE BIRTH DAY-OF-YEAR BELONGS TO:</div>
              {active.map(s=>(
                <div key={s.key} style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.72rem", color:M3.onSurface, padding:"2px 0" }}>
                  {s.sym} <strong>{s.name}</strong> — the day-of-year is a {s.name.toLowerCase()} number
                </div>
              ))}
            </div>
          );
        })()}
      </Card>

      {/* ── Pythagorean Grid ── */}
      {hasName && (
      <Card title="The Pythagorean Grid — Number Frequency in the Name">
        <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.76rem", lineHeight:1.6, color:M3.onSurfaceVariant, margin:"0 0 10px" }}>
          This 3×3 grid counts how often each root number (1-9) appears among the letters of the name. The tradition reads heavy cells as emphasis and empty cells as absence.
        </p>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:6, maxWidth:320, margin:"0 auto" }}>
          {[3,6,9,2,5,8,1,4,7].map(n=>{
            const g = nuData.pythagoreanGrid?.[n] || { count:0, letters:[] };
            const count = g.count;
            const isMissing = nuData.missingNums.includes(n);
            return (
              <div key={n} style={{ padding:"10px", borderRadius:10, textAlign:"center",
                background:isMissing ? "#ff525211" : count > 2 ? M3.primaryContainer+"44" : M3.surfaceVariant+"44",
                border:`1px solid ${isMissing ? "#ff525233" : count > 2 ? M3.primary+"44" : M3.outlineVariant}` }}>
                <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"1.2rem", color:isMissing ? "#ff5252" : M3.primary, fontWeight:"700" }}>{n}</div>
                <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.72rem", color:M3.onSurface }}>{count > 0 ? "●".repeat(Math.min(count,5)) : "—"}</div>
                <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.55rem", color:M3.onSurfaceVariant }}>{count}× {g.letters.length>0 ? g.letters.join(" ") : ""}</div>
              </div>
            );
          })}
        </div>
      </Card>
      )}
    </div>
  );
}
