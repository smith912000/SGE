import { useState } from "react";
import { harmonic, calcAspects } from "../engines/astronomy.js";
import { SIGNS, SIGN_SYM, SIGN_COL, SIGN_INFO } from "../data/astrology/signs.js";
import { P_ROLE } from "../data/astrology/planets.js";
import { PAIR_INSIGHT } from "../data/deepAnalysis/pairInsights.js";
import PlanetTable from "../components/tables/PlanetTable.jsx";
import AspectTable from "../components/tables/AspectTable.jsx";

const grid2 = { display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)", gap: 16 };

export default function HarmonicsTab({ ctx }) {
  const { M3, res, P_COL, P_SYM, zodSign, zodDeg, Card, WheelWithTooltip } = ctx;
  const [n, setN] = useState(5);

  const HARM_DEFS = {
    2:  { col:"#ff8a50", label:"Opposition Family (180°)", desc:"The 2nd harmonic doubles every longitude, so bodies standing 180° apart in the natal figure fall on the same degree here. It is the layer of the axis — the two ends of one line. Ptolemaic doctrine counts the opposition among the aspects of disagreement; modern harmonic writing reads the 2-series simply as the polarising division of the circle, and leaves the valuation aside.", lookFor:"Conjunctions in this figure correspond to oppositions in the natal chart. Which axes of the natal figure do these gatherings name?" },
    3:  { col:"#a5d6a7", label:"Trine Family (120°)", desc:"The 3rd harmonic gathers the trine: bodies 120° apart in the natal figure become conjunct here. The Tetrabiblos counts the trine among the aspects of agreement, bodies sharing an element and a mode of relation. Later psychological writing recast the same angle as ease rather than concord — two different readings resting on one piece of arithmetic.", lookFor:"Conjunctions here correspond to trines in the natal chart. Sources differ over whether ease is the virtue of the trine or its limit." },
    4:  { col:"#ff5252", label:"Square Family (90°)", desc:"The 4th harmonic quadruples every longitude, so squares and oppositions alike collapse into conjunctions — 90° and 180° are both multiples of 90. Hellenistic sources class the square among the aspects of disagreement; Renaissance texts tie the fourfold division to the material cross and the four elements. Addey's harmonic work read the same division as the rhythm of manifestation.", lookFor:"Conjunctions here correspond to squares and oppositions in the natal chart, which is why this layer is usually the most crowded of the low harmonics." },
    5:  { col:"#64b5f6", label:"Quintile Family (72°)", desc:"The 5th harmonic gathers the 72° family — the quintile and the biquintile. Neither is part of the Ptolemaic set; both were added later, by Kepler, on harmonic grounds. The tradition since has attached the fivefold division to form-making and to the pentagram, an attribution that belongs to that later lineage rather than to classical doctrine.", lookFor:"Conjunctions here correspond to quintiles and biquintiles in the natal chart — angles classical aspect doctrine does not recognise at all." },
    6:  { col:"#81c784", label:"Sextile Family (60°)", desc:"The 6th harmonic is the 2-series and the 3-series taken together, and gathers the sextile at 60°. The Tetrabiblos counts the sextile a lesser aspect of agreement, weaker than the trine. Because six factors two ways, sources disagree over whether a figure found here belongs to the axis of the opposition or to the concord of the trine.", lookFor:"Conjunctions here correspond to sextiles in the natal chart. Which of the two factors — the 2 or the 3 — accounts for a given pairing is a judgement, not a computation." },
    7:  { col:"#ce93d8", label:"Septile Family (51.4°)", desc:"The 7th harmonic divides the circle into seven parts of 51 degrees 26 minutes, an angle that closes on no whole number of degrees. Seven carries a long lineage — the classical planets, the days of the week, the Hermetic heavens — and harmonic writers have attached the septile to it. Classical aspect doctrine names no septile; the aspect enters through the modern harmonic literature.", lookFor:"Conjunctions here correspond to septiles in the natal chart. Since the divisor closes on no whole degree, this layer is among the most sensitive to an inexact birth time." },
    8:  { col:"#ffb74d", label:"Semisquare Family (45°)", desc:"The 8th harmonic gathers the 45° family — the semisquare and the sesquiquadrate, the square divided a second time. Kepler and later writers treated these as subordinates of the square rather than aspects standing in their own right. Because eight is a multiple of four, everything the 4th harmonic gathers is gathered again here.", lookFor:"Conjunctions here correspond to semisquares, squares and oppositions in the natal chart. The 4th harmonic shows part of the same figure at a coarser division — the two are worth reading side by side." },
    9:  { col:"#f48fb1", label:"Novile Family (40°)", desc:"The 9th harmonic corresponds arithmetically to the navamsa of Vedic practice, where each sign is divided into nine parts of 3 degrees 20 minutes. Vedic sources treat the navamsa as the chart consulted after the birth figure itself, with its own assigned domain. Western harmonic practice reaches the same division by another route and calls the angle the novile; the two lineages are separate, and their readings are not interchangeable.", lookFor:"Conjunctions here correspond to noviles in the natal chart, and to shared navamsa placements under the Vedic scheme. A ninefold division multiplies positional error ninefold." },
    10: { col:"#4db6ac", label:"Decile Family (36°)", desc:"The 10th harmonic is the 2-series and the 5-series combined, and gathers the 36° family. The decile appears in the modern harmonic literature rather than in classical aspect doctrine, so what has been attributed to it is recent and contested. Everything the 5th harmonic gathers appears here as well.", lookFor:"Conjunctions here correspond to deciles in the natal chart. Where else does the fivefold division appear in this figure?" },
    11: { col:"#9fa8da", label:"Undecile Family (32.7°)", desc:"The 11th harmonic divides the circle into eleven parts of 32 degrees 44 minutes. Eleven is prime and shares no factor with the 2, 3 or 5 series, so this layer repeats nothing the lower harmonics have already shown. The angle is entirely a construction of twentieth-century harmonic work; no classical source names it.", lookFor:"Conjunctions here correspond to undeciles in the natal chart. Nothing gathered at this division is gathered by any harmonic below it." },
    12: { col:"#ffd54f", label:"Semisextile Family (30°)", desc:"The 12th harmonic gathers the 30° family — the semisextile at 30° and the quincunx at 150° among them — and, being 2×6 and 3×4, it repeats everything the 2nd, 3rd, 4th and 6th harmonics gather. Twelve is also the count of the signs, so a conjunction here marks two bodies standing at the same degree within their respective signs. Sources differ over whether the twelvefold division carries a reading of its own or is only the sum of its factors.", lookFor:"Conjunctions here mark bodies at the same degree within their signs. Which of the lower harmonics has already accounted for a given pairing?" },
  };
  const hd = HARM_DEFS[n];
  const hPos = harmonic(res.trop, n);
  const hAsp = calcAspects(hPos);
  const tight = hAsp.filter(a=>a.name==="Conjunction" && a.strength>0.5).slice(0,6);
  const anyAsp = hAsp.filter(a=>a.strength>0.6).slice(0,8);
  const clusterMap = {};
  Object.entries(hPos).forEach(([p,lon])=>{
    const s = zodSign(lon);
    if (!clusterMap[s]) clusterMap[s] = [];
    clusterMap[s].push(p);
  });
  const clusters = Object.entries(clusterMap).filter(([,ps])=>ps.length>=2).sort((a,b)=>b[1].length-a[1].length);
  const getPairInsight = (p1, p2) => {
    const r0=P_ROLE[p1]||p1, r1=P_ROLE[p2]||p2;
    return PAIR_INSIGHT[`${r0}+${r1}`] || PAIR_INSIGHT[`${r1}+${r0}`] || `these two forces work together at a level your surface chart doesn't show — they reinforce and shape each other in ways you may sense but not consciously recognise`;
  };

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
      <Card style={{ background:`linear-gradient(135deg,${M3.primaryContainer}88,${M3.surfaceContainer})`, borderColor:M3.outline }}>
        <div style={{ fontFamily:"Cinzel,serif", fontSize:"1rem", color:M3.primary, marginBottom:8 }}>What are Hidden Patterns?</div>
        <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.82rem", lineHeight:1.65, color:M3.onSurface, margin:0 }}>
          Your birth chart is like a musical note. Hidden patterns (harmonics) are the overtones — subtler frequencies that shape the timbre. They work by multiplying every planet's position by a number and wrapping it around the 360° circle. When planets that were far apart suddenly land near each other in a harmonic chart, it means they share a hidden resonance at that frequency.
        </p>
        <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.82rem", lineHeight:1.65, color:M3.onSurface, marginTop:8 }}>
          <strong>How to read this:</strong> Look for clusters — multiple planets grouped in the same sign or conjunct (☌). The more planets clustered, the stronger that pattern operates in your life. The wheel below shows where planets land after the harmonic transformation. The table shows their new positions.
        </p>
      </Card>

      <Card title="∞ Select a Pattern Layer">
        <div style={{ display:"flex", gap:7, flexWrap:"wrap", marginBottom:16 }}>
          {[2,3,4,5,7,9,12].map(num=>{
            const d = HARM_DEFS[num];
            return (
              <button key={num} onClick={()=>setN(num)}
                style={{ padding:"7px 14px", border:`1.5px solid ${d.col}${n===num?"":"44"}`,
                  borderRadius:20, cursor:"pointer",
                  background: n===num ? d.col+"33" : "transparent",
                  color: n===num ? d.col : M3.onSurfaceVariant,
                  fontFamily:"'Share Tech Mono',monospace", fontSize:"0.72rem", fontWeight:n===num?"700":"400",
                  transition:"all 0.2s" }}>
                #{num} {d.label.split("(")[0].trim()}
              </button>
            );
          })}
          <div style={{ display:"flex", alignItems:"center", gap:6 }}>
            <span style={{ color:M3.secondary, fontFamily:"'Share Tech Mono',monospace", fontSize:"0.68rem" }}>Other:</span>
            <input type="number" value={n} min={2} max={24} step={1}
              onChange={e=>setN(Math.max(2,Math.min(24,parseInt(e.target.value)||n)))}
              style={{ width:52, padding:"6px 8px", background:M3.surfaceDim,
                border:`1px solid ${M3.outline}`, borderRadius:8, color:M3.onSurface,
                fontFamily:"'Share Tech Mono',monospace", fontSize:"0.75rem", outline:"none" }}/>
          </div>
        </div>

        <div style={{ padding:"14px 16px", borderRadius:12, background:(hd?.col||M3.primary)+"0e", border:`1px solid ${(hd?.col||M3.primary)}28` }}>
          <div style={{ color:hd?.col||M3.primary, fontFamily:"'Share Tech Mono',monospace", fontSize:"0.82rem", fontWeight:"700", marginBottom:6 }}>
            Pattern #{n} — {hd?.label || `Harmonic ${n}`}
          </div>
          <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.8rem", lineHeight:1.65, color:M3.onSurface, margin:0 }}>
            {hd?.desc || `The ${n}th harmonic divides the circle into ${n} equal parts. Planets that form ${n}-based aspects (${(360/n).toFixed(1)}° apart) in your birth chart will appear conjunct here. Every harmonic reveals a different layer of hidden connection between your planets.`}
          </p>
          {(hd?.lookFor || !hd) && (
            <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.76rem", lineHeight:1.55, color:M3.secondary, margin:"8px 0 0", fontStyle:"italic" }}>
              {hd?.lookFor || `Look for clusters and conjunctions in the chart below — they reveal planets that resonate together at this ${n}-fold frequency.`}
            </p>
          )}
        </div>
      </Card>

      {(clusters.length > 0 || tight.length > 0) && (
        <Card title={`✦ Your Pattern #${n} — Personal Reading`}>
          {clusters.length > 0 && (
            <div style={{ marginBottom:14 }}>
              <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.65rem", color:M3.secondary, letterSpacing:"0.1em", marginBottom:8 }}>SIGN CLUSTERS — WHERE ENERGY CONCENTRATES</div>
              {clusters.map(([sign, planets])=>(
                <div key={sign} style={{ padding:"10px 14px", marginBottom:8, borderRadius:10,
                  background:SIGN_COL[sign]+"0c", border:`1px solid ${SIGN_COL[sign]}22` }}>
                  <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:6 }}>
                    <span style={{ color:SIGN_COL[sign], fontSize:"1.1rem" }}>{SIGN_SYM[SIGNS.indexOf(sign)]}</span>
                    <span style={{ color:SIGN_COL[sign], fontFamily:"'Share Tech Mono',monospace", fontSize:"0.78rem", fontWeight:"700" }}>{sign} — {planets.length} planets</span>
                  </div>
                  <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginBottom:6 }}>
                    {planets.map(p=>(
                      <span key={p} style={{ padding:"3px 10px", borderRadius:14, background:P_COL[p]+"18", border:`1px solid ${P_COL[p]}44`,
                        color:P_COL[p], fontFamily:"'Share Tech Mono',monospace", fontSize:"0.66rem" }}>
                        {P_SYM[p]} {p} <span style={{opacity:0.6}}>({P_ROLE[p]||""})</span>
                      </span>
                    ))}
                  </div>
                  <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.74rem", lineHeight:1.55, color:M3.onSurfaceVariant, margin:0 }}>
                    {(()=>{
                      const si = SIGN_INFO[sign]||{};
                      const el = si.element||"";
                      const signStyle = sign==="Aries"?"bold, direct action":sign==="Taurus"?"steady, grounded persistence":sign==="Gemini"?"mental agility and communication":sign==="Cancer"?"emotional depth and nurturing":sign==="Leo"?"confident self-expression and warmth":sign==="Virgo"?"careful refinement and service":sign==="Libra"?"balance, fairness, and partnership":sign==="Scorpio"?"intensity, transformation, and depth":sign==="Sagittarius"?"expansive vision and truth-seeking":sign==="Capricorn"?"disciplined structure and ambition":sign==="Aquarius"?"unconventional thinking and community":"intuitive sensitivity and imagination";
                      if (planets.length >= 3) {
                        return `A powerful concentration — ${planets.map(p=>P_ROLE[p]||p).join(", ")} all resonate together at this frequency in ${sign} (${signStyle}). This is a dominant theme in this layer of your chart, suggesting ${el} energy strongly shapes your ${hd?.label?.toLowerCase() || "pattern #"+n}. When this many planets cluster, the theme is unmistakable — it's a central part of who you are at this level.`;
                      }
                      const r0 = P_ROLE[planets[0]]||planets[0], r1 = P_ROLE[planets[1]]||planets[1];
                      const insight = getPairInsight(planets[0], planets[1]);
                      return `Your ${r0} and ${r1} are linked through ${sign} energy (${signStyle}) at this harmonic level. In practice, this means ${insight}. The ${sign} colouring adds a flavour of ${signStyle.split(" and ")[0]} to how this connection plays out in your life.`;
                    })()}
                  </p>
                </div>
              ))}
            </div>
          )}
          {tight.length > 0 && (
            <div>
              <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.65rem", color:M3.secondary, letterSpacing:"0.1em", marginBottom:8 }}>TIGHT CONJUNCTIONS — STRONGEST HIDDEN LINKS</div>
              {tight.map((a,i)=>(
                <div key={i} style={{ padding:"8px 12px", marginBottom:6, borderRadius:8,
                  background:(hd?.col||M3.primary)+"08", borderLeft:`3px solid ${hd?.col||a.col}` }}>
                  <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.72rem", color:M3.onSurface }}>
                    <span style={{color:P_COL[a.p1]}}>{P_SYM[a.p1]} {a.p1}</span>
                    <span style={{color:hd?.col||a.col, margin:"0 6px"}}>☌</span>
                    <span style={{color:P_COL[a.p2]}}>{P_SYM[a.p2]} {a.p2}</span>
                    <span style={{color:M3.onSurfaceVariant, marginLeft:8, fontSize:"0.65rem"}}>{(a.strength*100).toFixed(0)}% strength</span>
                  </div>
                  <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.72rem", lineHeight:1.5, color:M3.onSurfaceVariant, margin:"4px 0 0" }}>
                    {(()=>{
                      const r0=P_ROLE[a.p1]||a.p1, r1=P_ROLE[a.p2]||a.p2;
                      const insight = getPairInsight(a.p1, a.p2);
                      const hdContext = hd ? {
                        2:`This link is specifically about internal tension — your ${r0} and ${r1} are in a push-pull dynamic that asks you to find balance between them.`,
                        3:`This link is about natural ease — your ${r0} and ${r1} cooperate effortlessly here, producing a talent you may take for granted.`,
                        4:`This link is about productive friction — pressure between your ${r0} and ${r1} generates drive and accomplishment.`,
                        5:`This link is about creative expression — your ${r0} and ${r1} combine here to produce something original and inventive.`,
                        6:`This link is about practical service — your ${r0} and ${r1} work together toward craftsmanship and meaningful contribution.`,
                        7:`This link is about spiritual sensitivity — your ${r0} and ${r1} connect at an intuitive, almost mystical level here.`,
                        8:`This link is about transformation — your ${r0} and ${r1} are bound together through cycles of crisis and renewal.`,
                        9:`This link is about deep purpose — your ${r0} and ${r1} are connected at the soul level, shaping your dharma and your most meaningful bonds.`,
                        10:`This link is about public impact — the interplay of your ${r0} and ${r1} shapes what you project into the world and your lasting legacy.`,
                        11:`This link is about vision — your ${r0} and ${r1} unite around idealistic, forward-looking themes.`,
                        12:`This link is about hidden lessons — your ${r0} and ${r1} are bound by a karmic pattern that surfaces as recurring challenges carrying growth.`,
                      }[n] || "" : "";
                      const strLabel = a.strength>0.85 ? "This is an exceptionally tight bond — one of the strongest hidden links in your chart." : a.strength>0.75 ? "This is a strong bond." : "";
                      return `At this level, ${insight}. ${hdContext} ${strLabel}`;
                    })()}
                  </p>
                </div>
              ))}
            </div>
          )}
          {clusters.length === 0 && tight.length === 0 && (
            <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.8rem", lineHeight:1.6, color:M3.onSurfaceVariant, textAlign:"center", padding:20 }}>
              No strong clusters or tight conjunctions at this harmonic. This pattern layer is more evenly distributed in your chart — the energy is spread rather than concentrated.
            </p>
          )}
        </Card>
      )}

      <div style={grid2}>
        <Card title={`∞ Pattern #${n} — Remapped Positions`}>
          <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.72rem", lineHeight:1.5, color:M3.onSurfaceVariant, margin:"0 0 10px" }}>
            Each planet's birth position × {n}, wrapped to 360°. Planets in the same sign here share a hidden {n}-fold resonance.
          </p>
          <PlanetTable positions={hPos} jd={res.jd}/>
        </Card>
        <Card title={`∞ Pattern #${n} — Wheel`}>
          <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.72rem", lineHeight:1.5, color:M3.onSurfaceVariant, margin:"0 0 10px" }}>
            The harmonic wheel — planets near each other here are connected at this deeper frequency, even if they're far apart in your birth chart.
          </p>
          <div style={{ display:"flex", justifyContent:"center" }}>
              <WheelWithTooltip positions={hPos} size={300} id={`h${n}`} theme="vedic"/>
          </div>
        </Card>
      </div>

      {anyAsp.length > 0 && (
        <Card title={`∞ Pattern #${n} — All Strong Connections (${anyAsp.length})`}>
          <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.72rem", lineHeight:1.5, color:M3.onSurfaceVariant, margin:"0 0 10px" }}>
            These are the strongest aspects in your harmonic chart — they show which planet pairs resonate most powerfully at this frequency.
          </p>
          <AspectTable aspects={anyAsp}/>
        </Card>
      )}
    </div>
  );
}
