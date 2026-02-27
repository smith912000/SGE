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
    2:  { col:"#ff8a50", label:"Inner Duality (Opposition)", desc:"The 2nd harmonic reveals your internal oppositions — the parts of yourself that pull in different directions. When planets cluster together here, those areas of life are in a tug-of-war. This is the source of your deepest inner tensions but also your capacity for balance. Integration of these poles is a lifetime's work.", lookFor:"Conjunctions in this chart correspond to oppositions in your birth chart. Clusters show where your inner contradictions are strongest." },
    3:  { col:"#a5d6a7", label:"Natural Gifts (Trine)", desc:"The 3rd harmonic highlights your effortless talents — things that come so naturally you may not even recognize them as gifts. This is the chart of flow, ease, and innate ability. Where planets group together here, life hands you opportunities without you needing to force them.", lookFor:"Conjunctions here correspond to trines in your birth chart. The more planets clustered, the more natural talent is concentrated in that area." },
    4:  { col:"#ff5252", label:"Friction & Drive (Square)", desc:"The 4th harmonic reveals your internal friction points — where tension, pressure, and challenge build up. These aren't punishments; they're catalysts. This chart shows where life pushes you hardest, and therefore where you develop the most strength, ambition, and achievement.", lookFor:"Conjunctions here correspond to squares in your birth chart. Tight clusters indicate powerful drive and where you'll face your biggest growth edges." },
    5:  { col:"#64b5f6", label:"Creativity & Art", desc:"The 5th harmonic is your creative DNA — how you play, invent, and express originality. It reveals talents for art, music, performance, design, and any form of creative self-expression. This is the chart astrologers look at to understand someone's unique artistic voice.", lookFor:"Clusters show where your creative power is concentrated. Planets in conjunction here work together to produce original, inventive expression in those life areas." },
    6:  { col:"#81c784", label:"Service & Duty", desc:"The 6th harmonic combines the themes of opposition (2) and trine (3) — it reveals where duty, responsibility, and productive service intersect with natural ability. This is the chart of craftsmanship, health, and meaningful work.", lookFor:"Conjunctions here indicate where you can turn natural skill into practical contribution. Strong patterns suggest a calling toward healing, teaching, or skilled trades." },
    7:  { col:"#ce93d8", label:"Intuition & Spiritual Gifts", desc:"The 7th harmonic is the most mystical — it reveals spiritual sensitivity, intuitive perception, and connection to the numinous. This number is sacred across traditions (7 days, 7 chakras, 7 planets of antiquity). Patterns here suggest where you access inspiration that feels channeled or prophetic.", lookFor:"Clusters show where your intuitive antenna is strongest. Tight conjunctions indicate psychic sensitivity, spiritual gifts, or artistic inspiration that transcends the rational." },
    8:  { col:"#ffb74d", label:"Transformation & Power", desc:"The 8th harmonic combines double-squares — it reveals where transformative power, crisis, and rebirth operate in your chart. This is associated with Scorpionic themes: death/renewal cycles, inheritance, shared resources, and deep psychological change.", lookFor:"Conjunctions indicate life areas where you undergo the most profound transformations. Strong patterns suggest power, resilience, and the ability to rebuild from ashes." },
    9:  { col:"#f48fb1", label:"Purpose & Soul Bonds", desc:"The 9th harmonic is called the Navamsa in Vedic astrology and is considered the chart of your soul's deeper purpose. It reveals what you are truly here to do and who resonates with you at a dharmic level. This is where astrologers look for information about marriage, spiritual calling, and life mission.", lookFor:"Tight conjunctions reveal your soul's strongest themes. Planets grouped here show what draws your deepest commitment and where your most meaningful relationships form." },
    10: { col:"#4db6ac", label:"Public Impact & Legacy", desc:"The 10th harmonic combines duality (2) and creativity (5) — it reveals how your internal tensions fuel your public impact. This chart shows what you project into the world, your reputation potential, and the mark you leave.", lookFor:"Clusters indicate where your creative tensions become publicly visible achievements. Strong patterns suggest fame, public recognition, or lasting cultural contribution." },
    11: { col:"#9fa8da", label:"Vision & Idealism", desc:"The 11th harmonic reveals your relationship with collective ideals, reform, and visionary thinking. This is the Aquarian harmonic — concerned with humanity's future, social change, and idealistic aspiration.", lookFor:"Conjunctions show where you connect with collective movements and ideals. Strong patterns suggest gifts for innovation, social reform, or humanitarian vision." },
    12: { col:"#ffd54f", label:"Hidden Lessons & Karma", desc:"The 12th harmonic combines all the basic patterns (2×6, 3×4) — it reveals the deepest karmic undertones in your chart. This is associated with the 12th house, Pisces, and themes of endings, sacrifice, hidden enemies, and transcendence. Patterns here often indicate where repeated challenges carry hidden spiritual growth.", lookFor:"Clusters reveal karmic concentrations — life areas where you face recurring patterns that are trying to teach you something. Strong patterns suggest past-life themes or deeply embedded behavioral loops." },
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
            <WheelWithTooltip positions={hPos} size={300} id={`h${n}`}/>
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
