import SymbolPanel from '../components/ui/SymbolPanel.jsx';
import DepthControl from '../components/ui/DepthControl.jsx';
import { useDepth } from '../store/depthStore.js';
import { getPlanetInSign } from '../data/symbolism/planetInSign.js';
import { getSignSymbolism } from '../data/symbolism/signSymbolism.js';
import { terse } from '../data/symbolism/terse.js';
export default function DeepTab({ ctx }) {
  const {
    M3,
    res,
    zodSign,
    SIGN_INFO,
    SIGN_COL,
    P_COL,
    P_SYM,
    P_ROLE,
    Card,
    grid2,
    calcAspects,
    harmonic,
    SOLAR_DEEP,
    LUNAR_DEEP,
    RISING_SHADOW,
    VENUS_SHADOW,
    MARS_SHADOW,
    MERCURY_SHADOW,
    JUPITER_DEEP,
    SATURN_DEEP,
    PAIR_INSIGHT,
    EL_COL,
    MOD_COL,
    ANIMAL_INFO,
    CN_EL_INFO,
    POLARITY_INFO,
    HOUSE_AREA,
  } = ctx;

  const sunSign  = zodSign(res.trop.Sun);
  const moonSign = zodSign(res.trop.Moon);
  const ascSign  = zodSign(res.houses.ASC);
  const venSign  = zodSign(res.trop.Venus);
  const marSign  = zodSign(res.trop.Mars);
  const merSign  = zodSign(res.trop.Mercury);
  const jupSign  = zodSign(res.trop.Jupiter);
  const satSign  = zodSign(res.trop.Saturn);
  const [deepDepth, setDeepDepth] = useDepth();
  const SI = SIGN_INFO;

  const domEl = Object.entries(res.el).sort(([,a],[,b])=>b-a)[0];
  const domMod = Object.entries(res.mod).sort(([,a],[,b])=>b-a)[0];
  const modLabel = {Cardinal:"Cardinal — the opening term of a season",Fixed:"Fixed — the sustaining term of a season",Mutable:"Mutable — the dissolving term of a season"};

  const aspects = res.aspects;
  const hardAsp = aspects.filter(a=>["Square","Opposition"].includes(a.name));
  const softAsp = aspects.filter(a=>["Trine","Sextile","Conjunction"].includes(a.name));

  return (
  <div style={{ display:"flex", flexDirection:"column", gap:16 }}>

    <Card style={{ background:`linear-gradient(135deg,${M3.primaryContainer}88,${M3.surfaceContainer})`, borderColor:M3.outline }}>
      <div style={{ fontFamily:"Cinzel,serif", fontSize:"1rem", color:M3.primary, marginBottom:8 }}>Deep Reading — the chart taken factor by factor</div>
      <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.82rem", lineHeight:1.65, color:M3.onSurface, margin:0 }}>
        Core symbolism. The depth control adds the tradition behind it.
      </p>
    </Card>

    <Card title="☀ The Sun by Sign">
      <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:14 }}>
        <div style={{ width:52, height:52, borderRadius:"50%", background:SIGN_COL[sunSign]+"22", border:`2px solid ${SIGN_COL[sunSign]}`, display:"flex", alignItems:"center", justifyContent:"center" }}>
          <span style={{ fontSize:"1.6rem" }}>{SI[sunSign].emoji}</span>
        </div>
        <div>
          <div style={{ color:SIGN_COL[sunSign], fontFamily:"'Share Tech Mono',monospace", fontSize:"0.82rem", fontWeight:"700" }}>Sun in {sunSign}</div>
          <div style={{ color:M3.onSurfaceVariant, fontFamily:"'Share Tech Mono',monospace", fontSize:"0.65rem" }}>{SI[sunSign].element} · {SI[sunSign].mode} · ruled by {SI[sunSign].ruler}</div>
          {SI[sunSign].hebrew && <div style={{ color:M3.outlineVariant, fontFamily:"'Share Tech Mono',monospace", fontSize:"0.6rem", marginTop:2 }}>{SI[sunSign].emoji} ← {SI[sunSign].letterName} ({SI[sunSign].hebrew}) ← {SI[sunSign].phoenician} ← {SI[sunSign].hiero} — {SI[sunSign].letterMeaning.split("—")[1]?.trim()||""}</div>}
        </div>
      </div>
      <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.82rem", lineHeight:1.75, color:M3.onSurface, margin:0 }}>{SOLAR_DEEP[sunSign].plain}</p>
      
    </Card>

    <Card title="🌙 The Moon by Sign">
      <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:14 }}>
        <div style={{ width:52, height:52, borderRadius:"50%", background:SIGN_COL[moonSign]+"22", border:`2px solid ${SIGN_COL[moonSign]}`, display:"flex", alignItems:"center", justifyContent:"center" }}>
          <span style={{ fontSize:"1.6rem" }}>{SI[moonSign].emoji}</span>
        </div>
        <div>
          <div style={{ color:SIGN_COL[moonSign], fontFamily:"'Share Tech Mono',monospace", fontSize:"0.82rem", fontWeight:"700" }}>Moon in {moonSign}</div>
          <div style={{ color:M3.onSurfaceVariant, fontFamily:"'Share Tech Mono',monospace", fontSize:"0.65rem" }}>{SI[moonSign].element} · {SI[moonSign].mode} · ruled by {SI[moonSign].ruler}</div>
          {SI[moonSign].hebrew && <div style={{ color:M3.outlineVariant, fontFamily:"'Share Tech Mono',monospace", fontSize:"0.6rem", marginTop:2 }}>{SI[moonSign].emoji} ← {SI[moonSign].letterName} ({SI[moonSign].hebrew}) ← {SI[moonSign].phoenician} ← {SI[moonSign].hiero} — {SI[moonSign].letterMeaning.split("—")[1]?.trim()||""}</div>}
        </div>
      </div>
      <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.82rem", lineHeight:1.75, color:M3.onSurface, margin:0 }}>{LUNAR_DEEP[moonSign].plain}</p>
      
    </Card>

    <Card title="🌅 The Ascendant — the sign rising at the horizon">
      <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:14 }}>
        <div style={{ width:52, height:52, borderRadius:"50%", background:SIGN_COL[ascSign]+"22", border:`2px solid ${SIGN_COL[ascSign]}`, display:"flex", alignItems:"center", justifyContent:"center" }}>
          <span style={{ fontSize:"1.6rem" }}>{SI[ascSign].emoji}</span>
        </div>
        <div>
          <div style={{ color:SIGN_COL[ascSign], fontFamily:"'Share Tech Mono',monospace", fontSize:"0.82rem", fontWeight:"700" }}>{ascSign} Rising</div>
          <div style={{ color:M3.onSurfaceVariant, fontFamily:"'Share Tech Mono',monospace", fontSize:"0.65rem" }}>The ascendant — the degree of the ecliptic rising at the eastern horizon for this time and place</div>
          {SI[ascSign].hebrew && <div style={{ color:M3.outlineVariant, fontFamily:"'Share Tech Mono',monospace", fontSize:"0.6rem", marginTop:2 }}>{SI[ascSign].emoji} ← {SI[ascSign].letterName} ({SI[ascSign].hebrew}) ← {SI[ascSign].phoenician} ← {SI[ascSign].hiero} — {SI[ascSign].letterMeaning.split("—")[1]?.trim()||""}</div>}
        </div>
      </div>
      <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.82rem", lineHeight:1.75, color:M3.onSurface, margin:0 }}>
        The degree rising at the eastern horizon. Its sign rules the figure.
      </p>
      {RISING_SHADOW[ascSign] && (
        <div style={{ marginTop:14, padding:"12px 16px", borderRadius:10, background:"#ff525208", border:"1px solid #ff525218" }}>
          <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.64rem", color:"#ff8a50", letterSpacing:"0.1em", marginBottom:6 }}>ATTRIBUTED</div>
          <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.78rem", lineHeight:1.65, color:M3.onSurface, margin:0 }}>{RISING_SHADOW[ascSign].shadow}</p>
          <div style={{ marginTop:10, padding:"10px 14px", borderRadius:8, background:"#69ff8e08", border:"1px solid #69ff8e18" }}>
          </div>
        </div>
      )}
    </Card>

    {(()=>{
      const loveStyle = {Fire:"bold gestures and enthusiasm",Earth:"practical devotion and reliability",Air:"words, ideas and intellectual connection",Water:"emotional depth and intuitive care"};
      const angerStyle = {Fire:"direct confrontation, quick to ignite and quick to subside",Earth:"slow-burning persistence rather than sudden discharge",Air:"argument and strategic detachment",Water:"indirect expression, withdrawal and long memory"};
      return (
      <div style={grid2}>
        <Card title="💖 Venus — The Lesser Benefic">
          <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:10 }}>
            <span style={{ color:P_COL.Venus, fontSize:"1.4rem" }}>♀</span>
            <span style={{ color:SIGN_COL[venSign], fontFamily:"'Share Tech Mono',monospace", fontWeight:"700" }}>Venus in {venSign}</span>
          </div>
          <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.78rem", lineHeight:1.65, color:M3.onSurface, margin:0 }}>
            {terse(getPlanetInSign("Venus", venSign)) || terse(getSignSymbolism(venSign))}
          </p>
          {VENUS_SHADOW[venSign] && (
            <div style={{ marginTop:10, padding:"10px 14px", borderRadius:8, background:"#ff525208", border:"1px solid #ff525218" }}>
              <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.6rem", color:"#ff8a50", letterSpacing:"0.1em", marginBottom:4 }}>ATTRIBUTED</div>
              <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.74rem", lineHeight:1.55, color:M3.onSurface, margin:0 }}>{VENUS_SHADOW[venSign].shadow}</p>
            </div>
          )}
          {VENUS_SHADOW[venSign] && (
            <div style={{ marginTop:6, padding:"8px 14px", borderRadius:8, background:"#69ff8e08", border:"1px solid #69ff8e18" }}>
            </div>
          )}
        </Card>
        <Card title="🔥 Mars — The Lesser Malefic">
          <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:10 }}>
            <span style={{ color:P_COL.Mars, fontSize:"1.4rem" }}>♂</span>
            <span style={{ color:SIGN_COL[marSign], fontFamily:"'Share Tech Mono',monospace", fontWeight:"700" }}>Mars in {marSign}</span>
          </div>
          <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.78rem", lineHeight:1.65, color:M3.onSurface, margin:0 }}>
            {terse(getPlanetInSign("Mars", marSign)) || terse(getSignSymbolism(marSign))}
          </p>
          {MARS_SHADOW[marSign] && (
            <div style={{ marginTop:10, padding:"10px 14px", borderRadius:8, background:"#ff525208", border:"1px solid #ff525218" }}>
              <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.6rem", color:"#ff8a50", letterSpacing:"0.1em", marginBottom:4 }}>ATTRIBUTED</div>
              <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.74rem", lineHeight:1.55, color:M3.onSurface, margin:0 }}>{MARS_SHADOW[marSign].shadow}</p>
            </div>
          )}
          {MARS_SHADOW[marSign] && (
            <div style={{ marginTop:6, padding:"8px 14px", borderRadius:8, background:"#69ff8e08", border:"1px solid #69ff8e18" }}>
            </div>
          )}
        </Card>
      </div>
      );
    })()}

    {(()=>{
      const learnStyle = {Fire:"doing and experimenting, by intuitive leaps",Earth:"practical application, step by step and evidence-led",Air:"discussion and abstraction, by pattern and analogy",Water:"immersion and association, by feel rather than sequence"};
      const commStyle = {Cardinal:"initiating, coming directly to the point",Fixed:"thorough and persistent, developing an idea fully before releasing it",Mutable:"adaptive, revising in the act of speaking"};
      return (
      <Card title="🧠 Mercury — The Messenger">
        <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:10 }}>
          <span style={{ color:P_COL.Mercury, fontSize:"1.3rem" }}>☿</span>
          <span style={{ color:SIGN_COL[merSign], fontFamily:"'Share Tech Mono',monospace", fontWeight:"700" }}>Mercury in {merSign}</span>
        </div>
        <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.8rem", lineHeight:1.7, color:M3.onSurface, margin:0 }}>
          {terse(getPlanetInSign("Mercury", merSign)) || terse(getSignSymbolism(merSign))}
        </p>
        {MERCURY_SHADOW[merSign] && (
          <div style={{ marginTop:12, padding:"10px 14px", borderRadius:8, background:"#ff525208", border:"1px solid #ff525218" }}>
            <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.62rem", color:"#ff8a50", letterSpacing:"0.1em", marginBottom:4 }}>THE MERCURIAL TRAP</div>
            <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.76rem", lineHeight:1.6, color:M3.onSurface, margin:0 }}>{MERCURY_SHADOW[merSign].shadow}</p>
          </div>
        )}
        {MERCURY_SHADOW[merSign] && (
          <div style={{ marginTop:6, padding:"8px 14px", borderRadius:8, background:"#69ff8e08", border:"1px solid #69ff8e18" }}>
          </div>
        )}
      </Card>
      );
    })()}

    <div style={grid2}>
      <Card title="♃ Jupiter — The Greater Benefic">
        <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:10 }}>
          <span style={{ color:P_COL.Jupiter, fontSize:"1.4rem" }}>♃</span>
          <span style={{ color:SIGN_COL[jupSign], fontFamily:"'Share Tech Mono',monospace", fontWeight:"700" }}>Jupiter in {jupSign}</span>
        </div>
        <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.78rem", lineHeight:1.65, color:M3.onSurface, margin:0 }}>
          {JUPITER_DEEP[jupSign]?.plain}
        </p>
      </Card>
      <Card title="♄ Saturn — The Greater Malefic">
        <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:10 }}>
          <span style={{ color:P_COL.Saturn, fontSize:"1.4rem" }}>♄</span>
          <span style={{ color:SIGN_COL[satSign], fontFamily:"'Share Tech Mono',monospace", fontWeight:"700" }}>Saturn in {satSign}</span>
        </div>
        <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.78rem", lineHeight:1.65, color:M3.onSurface, margin:0 }}>
          {SATURN_DEEP[satSign]?.plain}
        </p>
      </Card>
    </div>

    <Card title="⚖ Soft and Hard Contacts">
      <div style={{ marginBottom:16 }}>
        <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.66rem", color:"#69ff8e", letterSpacing:"0.1em", marginBottom:10 }}>SOFT CONTACTS ({softAsp.length})</div>
        {softAsp.slice(0,5).map((a,i)=>{
          const r0=(P_ROLE[a.p1]||a.p1).toLowerCase(), r1=(P_ROLE[a.p2]||a.p2).toLowerCase();
          const k1=`${P_ROLE[a.p1]}+${P_ROLE[a.p2]}`, k2=`${P_ROLE[a.p2]}+${P_ROLE[a.p1]}`;
          const pi = PAIR_INSIGHT[k1]||PAIR_INSIGHT[k2]||"";
          const giftAdvice = a.name==="Conjunction"?`Because these two forces are fused, they amplify each other powerfully. The self-development opportunity: consciously direct this combined energy rather than letting it run on autopilot.`
            :a.name==="Trine"?`The trine is 120°, a third of the circle, and both signs share an element. Classical practice reads it as the most concordant of the Ptolemaic aspects.`
            :`The sextile is 60°, a sixth of the circle. It is read as concordant but weaker than the trine, and it carries the narrowest orb of the soft aspects here.`;
          return (
          <div key={i} style={{ padding:"10px 14px", marginBottom:8, borderRadius:10, background:a.col+"0e", borderLeft:`3px solid ${a.col}` }}>
            <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.72rem", color:M3.onSurface }}>
              <span style={{color:P_COL[a.p1]}}>{P_SYM[a.p1]} {a.p1}</span>
              <span style={{color:a.col, margin:"0 6px"}}>{a.sym} {a.name}</span>
              <span style={{color:P_COL[a.p2]}}>{P_SYM[a.p2]} {a.p2}</span>
            </div>
            <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.76rem", lineHeight:1.6, color:M3.onSurface, margin:"6px 0 0" }}>
              {pi ? `${r0} and ${r1}: ${pi}` : `A soft contact between the ${r0.toLowerCase()} and ${r1.toLowerCase()} significators.`}
            </p>
            <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.72rem", lineHeight:1.55, color:"#69ff8e", margin:"6px 0 0", fontStyle:"italic" }}>
              {giftAdvice}
            </p>
          </div>
          );
        })}
      </div>
      <div>
        <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.66rem", color:"#ff8a50", letterSpacing:"0.1em", marginBottom:10 }}>HARD CONTACTS ({hardAsp.length})</div>
        {hardAsp.slice(0,5).map((a,i)=>{
          const r0=(P_ROLE[a.p1]||a.p1).toLowerCase(), r1=(P_ROLE[a.p2]||a.p2).toLowerCase();
          const k1=`${P_ROLE[a.p1]}+${P_ROLE[a.p2]}`, k2=`${P_ROLE[a.p2]}+${P_ROLE[a.p1]}`;
          const pi = PAIR_INSIGHT[k1]||PAIR_INSIGHT[k2]||"";
          const growthAdvice = a.name==="Square"
            ?`The square is 90°, a quarter of the circle, and the two signs share a mode but not an element. The classical reading is friction between the two significators.`
            :a.name==="Opposition"
            ?`The opposition is 180°, the greatest possible separation. The two signs share a mode and stand in complementary elements; the classical reading is polarity rather than fusion.`
            :`A minor hard aspect. Its orb here is narrow, so whether it registers at all depends on the orb policy in use.`;
          return (
          <div key={i} style={{ padding:"10px 14px", marginBottom:8, borderRadius:10, background:a.col+"0e", borderLeft:`3px solid ${a.col}` }}>
            <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.72rem", color:M3.onSurface }}>
              <span style={{color:P_COL[a.p1]}}>{P_SYM[a.p1]} {a.p1}</span>
              <span style={{color:a.col, margin:"0 6px"}}>{a.sym} {a.name}</span>
              <span style={{color:P_COL[a.p2]}}>{P_SYM[a.p2]} {a.p2}</span>
            </div>
            <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.76rem", lineHeight:1.6, color:M3.onSurface, margin:"6px 0 0" }}>
              {pi ? `${r0} and ${r1}: ${pi}` : `A hard contact between the ${r0.toLowerCase()} and ${r1.toLowerCase()} significators.`}
            </p>
            <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.72rem", lineHeight:1.55, color:"#ff8a50", margin:"6px 0 0", fontStyle:"italic" }}>
              {growthAdvice}
            </p>
          </div>
          );
        })}
      </div>
    </Card>

    <Card title="△ Elemental and Modal Distribution">
      <div style={{ display:"flex", gap:10, flexWrap:"wrap", marginBottom:14 }}>
        {Object.entries(res.el).sort(([,a],[,b])=>b-a).map(([el,v])=>(
          <div key={el} style={{ flex:1, minWidth:120, padding:"12px 14px", borderRadius:12, background:EL_COL[el]+"11", border:`1px solid ${EL_COL[el]}33`, textAlign:"center" }}>
            <div style={{ color:EL_COL[el], fontFamily:"'Share Tech Mono',monospace", fontSize:"1.4rem", fontWeight:"700" }}>{v}</div>
            <div style={{ color:EL_COL[el], fontFamily:"'Share Tech Mono',monospace", fontSize:"0.72rem", fontWeight:"700" }}>{el}</div>
          </div>
        ))}
      </div>
      <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.8rem", lineHeight:1.7, color:M3.onSurface, margin:0 }}>
        The most represented element in this chart is <strong style={{color:EL_COL[domEl[0]]}}>{domEl[0]} ({domEl[1]} bodies)</strong>. The elemental scheme is Empedoclean in origin and was carried into astrology through the Hellenistic tradition; which bodies are counted, and whether the angles count, varies between schools, so a dominance figure is partly an artefact of the counting rule.
      </p>
      <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.8rem", lineHeight:1.7, color:M3.onSurface, marginTop:10 }}>
        The most represented mode is <strong style={{color:MOD_COL[domMod[0]]}}>{domMod[0]} ({domMod[1]} bodies)</strong>: {modLabel[domMod[0]]||domMod[0]}. The three modes divide the twelve signs into cardinal, fixed and mutable by their position within each season.
      </p>
    </Card>

    <Card title="∞ Harmonic Layers">
      <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.78rem", lineHeight:1.6, color:M3.onSurfaceVariant, margin:"0 0 14px" }}>
        The nth harmonic multiplies every longitude by n and reduces the result modulo 360, so bodies separated by 360/n degrees land together.
      </p>
      {[
        { n:5, title:"Creativity & Art (5th Harmonic)", col:"#64b5f6", desc:"The quintile family, 72°. Kepler argued for these divisions on harmonic grounds; they are not part of the Ptolemaic set." },
        { n:7, title:"Intuition & Spiritual Gifts (7th Harmonic)", col:"#ce93d8", desc:"The septile family, 51.4°. The division does not resolve into whole degrees, and classical practice made little use of it." },
        { n:9, title:"Purpose & Soul Bonds (9th Harmonic)", col:"#f48fb1", desc:"The novile family, 40°. This division corresponds to the navamsa of Vedic practice, where each sign is divided into nine parts of 3°20′." },
      ].map(h=>{
        const hPos = harmonic(res.trop, h.n);
        const hAsp = calcAspects(hPos);
        const tight = hAsp.filter(a=>a.strength>0.7).slice(0,3);
        return (
          <div key={h.n} style={{ padding:"14px 16px", marginBottom:12, borderRadius:12, background:h.col+"0a", border:`1px solid ${h.col}22` }}>
            <div style={{ color:h.col, fontFamily:"'Share Tech Mono',monospace", fontSize:"0.76rem", fontWeight:"700", marginBottom:6 }}>{h.title}</div>
            <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.76rem", lineHeight:1.6, color:M3.onSurface, margin:"0 0 8px" }}>{h.desc}</p>
            {tight.length>0 && (
              <div style={{ borderTop:`1px solid ${h.col}22`, paddingTop:8 }}>
                <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.62rem", color:M3.secondary, marginBottom:4 }}>TIGHTEST GROUPINGS IN THIS CHART:</div>
                {tight.map((a,i)=>(
                  <div key={i} style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.72rem", color:M3.onSurfaceVariant, padding:"2px 0" }}>
                    {P_SYM[a.p1]} {a.p1} ({P_ROLE[a.p1]||""}) {a.sym} {P_SYM[a.p2]} {a.p2} ({P_ROLE[a.p2]||""}) — <span style={{color:h.col}}>{a.name}</span> at {(a.strength*100).toFixed(0)}% strength
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </Card>

    {(()=>{
      const sunEl = SI[sunSign].element, moonEl = SI[moonSign].element, ascEl = SI[ascSign].element;
      const sunPlain = SI[sunSign].plain.split(". ").slice(0,2).join(". ")+".";
      const moonPlain = SI[moonSign].plain.split(". ").slice(0,2).join(". ")+".";
      const ascPlain = SI[ascSign].plain.split(". ").slice(0,2).join(". ")+".";

      const EL_DESC = {
        Fire:"the element of action and self-expression in the classical scheme, hot and dry",
        Earth:"the element of the tangible and enduring, cold and dry",
        Air:"the element of relation and abstraction, hot and moist",
        Water:"the element of feeling and dissolution, cold and moist",
      };
      const MOD_DESC = {
        Cardinal:"the mode that opens each season, associated with initiation",
        Fixed:"the mode at the height of each season, associated with persistence",
        Mutable:"the mode that closes each season, associated with transition",
      };

      const moonAsEmotional =
        moonEl==="Fire" ? "The Moon in a fire sign. The tradition reads the lunar significator in fire as quick to register and quick to discharge." :
        moonEl==="Earth" ? "The Moon in an earth sign. The tradition reads the lunar significator in earth as slow to register and slow to release." :
        moonEl==="Air"  ? "The Moon in an air sign. The tradition reads the lunar significator in air as mediated through language and relation." :
        "The Moon in a water sign. The tradition reads the lunar significator in water as the most permeable of the four placements.";

      const ascAsFilter =
        ascEl==="Fire" ? "A fire sign on the ascendant. The rising sign is the chart’s outward-facing angle, and its ruler becomes ruler of the whole figure." :
        ascEl==="Earth" ? "An earth sign on the ascendant. The rising sign is the chart’s outward-facing angle, and its ruler becomes ruler of the whole figure." :
        ascEl==="Air"  ? "An air sign on the ascendant. The rising sign is the chart’s outward-facing angle, and its ruler becomes ruler of the whole figure." :
        "A water sign on the ascendant. The rising sign is the chart’s outward-facing angle, and its ruler becomes ruler of the whole figure.";

      const softCount = softAsp.length, hardCount = hardAsp.length;
      const totalAsp = softCount + hardCount;
      const flowDesc = `${softCount} of the ${totalAsp} contacts in this chart are soft (trine and sextile). The count is a function of the orb policy in use.`;
      const growthDesc = `${hardCount} of the ${totalAsp} contacts are hard (square and opposition). Widening the orbs would add more; narrowing them would remove some of these.`;

      const balanceParagraph = softCount > hardCount
        ? `Soft contacts outnumber hard ones at the orbs in use. The soft/hard split rests on the classical benefic/malefic scheme, which modern practice has largely abandoned.`
        : hardCount > softCount
        ? `Hard contacts outnumber soft ones at the orbs in use. The soft/hard split rests on the classical benefic/malefic scheme, which modern practice has largely abandoned.`
        : `Soft and hard contacts are evenly matched at the orbs in use.`;

      const cnAnimal = res.cn ? (ANIMAL_INFO[res.cn.animal]||{}) : {};
      const cnEl = res.cn ? (CN_EL_INFO[res.cn.element]||{}) : {};
      const cnPol = res.cn ? (POLARITY_INFO[res.cn.polarity]||{}) : {};

      const cnBridge = res.cn ? (() => {
        const sameEl = SI[sunSign].element.toLowerCase() === res.cn.element.toLowerCase();
        const westernEl = SI[sunSign].element;
        const chineseEl = res.cn.element;
        const animalDesc = cnAnimal.desc || "";
        const animalTrait = (cnAnimal.trait||"").toLowerCase();
        const animalShadow = (cnAnimal.shadow||"").toLowerCase();
        const polLabel = res.cn.polarity === "Yang" ? "outward-moving and assertive" : "inward-moving and reflective";

        let bridgeText = `In the Chinese system this date falls in a ${chineseEl} ${res.cn.animal} year of ${res.cn.polarity} polarity. Note that the cycle year begins at the lunar new year rather than on 1 January. `;
        bridgeText += `The ${res.cn.animal} is known for being ${animalTrait}. ${animalDesc.split(". ").slice(0,2).join(". ")}. `;
        bridgeText += `The ${chineseEl} phase is paired with the ${res.cn.animal}; the tradition attributes ${(cnEl.trait||"").toLowerCase()} to that phase. `;
        if (sameEl) {
          bridgeText += `The Western and Chinese schemes name the same element here (${westernEl}/${chineseEl}). The two systems divide the sky differently and the agreement is a coincidence of labels, not a shared measurement. `;
        } else {
          bridgeText += `The Western scheme gives ${westernEl} here and the Chinese gives ${chineseEl}. The two use different elemental sets — four against five — so they are not directly comparable. `;
        }
        if (cnAnimal.shadow) bridgeText += ` The tradition also attributes ${animalShadow} to the ${res.cn.animal}.`;
        return bridgeText;
      })() : "";

      return (<>
      <Card title="📖 Understanding the Building Blocks">
        <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.78rem", lineHeight:1.6, color:M3.onSurfaceVariant, margin:"0 0 16px" }}>
          What the tradition attributes to each of the principal placements in this figure.
        </p>

        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))", gap:12, marginBottom:16 }}>
          <div style={{ padding:"14px 16px", borderRadius:12, background:SIGN_COL[sunSign]+"0a", border:`1px solid ${SIGN_COL[sunSign]}22` }}>
            <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.66rem", color:M3.secondary, letterSpacing:"0.1em", marginBottom:6 }}>SUN SIGN — THE SOLAR SIGNIFICATOR</div>
            <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:8 }}>
              <span style={{ fontSize:"1.3rem" }}>{SI[sunSign].emoji}</span>
              <span style={{ color:SIGN_COL[sunSign], fontFamily:"'Share Tech Mono',monospace", fontSize:"0.82rem", fontWeight:"700" }}>{sunSign}</span>
            </div>
            <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.78rem", lineHeight:1.6, color:M3.onSurface, margin:0 }}>
              {sunPlain}
            </p>
          </div>

          <div style={{ padding:"14px 16px", borderRadius:12, background:SIGN_COL[moonSign]+"0a", border:`1px solid ${SIGN_COL[moonSign]}22` }}>
            <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.66rem", color:M3.secondary, letterSpacing:"0.1em", marginBottom:6 }}>MOON SIGN — THE LUNAR SIGNIFICATOR</div>
            <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:8 }}>
              <span style={{ fontSize:"1.3rem" }}>{SI[moonSign].emoji}</span>
              <span style={{ color:SIGN_COL[moonSign], fontFamily:"'Share Tech Mono',monospace", fontSize:"0.82rem", fontWeight:"700" }}>{moonSign}</span>
            </div>
            <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.78rem", lineHeight:1.6, color:M3.onSurface, margin:0 }}>
              {moonPlain} {moonAsEmotional}
            </p>
          </div>

          <div style={{ padding:"14px 16px", borderRadius:12, background:SIGN_COL[ascSign]+"0a", border:`1px solid ${SIGN_COL[ascSign]}22` }}>
            <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.66rem", color:M3.secondary, letterSpacing:"0.1em", marginBottom:6 }}>RISING SIGN — THE ASCENDING DEGREE</div>
            <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:8 }}>
              <span style={{ fontSize:"1.3rem" }}>{SI[ascSign].emoji}</span>
              <span style={{ color:SIGN_COL[ascSign], fontFamily:"'Share Tech Mono',monospace", fontSize:"0.82rem", fontWeight:"700" }}>{ascSign}</span>
            </div>
            <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.78rem", lineHeight:1.6, color:M3.onSurface, margin:0 }}>
              {ascPlain} {ascAsFilter}
            </p>
          </div>
        </div>

        <div style={{ padding:"14px 16px", borderRadius:12, background:EL_COL[domEl[0]]+"0a", border:`1px solid ${EL_COL[domEl[0]]}22`, marginBottom:12 }}>
          <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.66rem", color:M3.secondary, letterSpacing:"0.1em", marginBottom:6 }}>MOST REPRESENTED ELEMENT — {domEl[0].toUpperCase()} ({domEl[1]} BODIES)</div>
          <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.78rem", lineHeight:1.6, color:M3.onSurface, margin:0 }}>
            The most represented element here is <strong style={{color:EL_COL[domEl[0]]}}>{domEl[0]}</strong> — {EL_DESC[domEl[0]]}.
          </p>
        </div>

        <div style={{ padding:"14px 16px", borderRadius:12, background:MOD_COL[domMod[0]]+"0a", border:`1px solid ${MOD_COL[domMod[0]]}22`, marginBottom:12 }}>
          <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.66rem", color:M3.secondary, letterSpacing:"0.1em", marginBottom:6 }}>MOST REPRESENTED MODE — {domMod[0].toUpperCase()} ({domMod[1]} BODIES)</div>
          <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.78rem", lineHeight:1.6, color:M3.onSurface, margin:0 }}>
            The most represented mode is <strong style={{color:MOD_COL[domMod[0]]}}>{domMod[0]}</strong> — {MOD_DESC[domMod[0]]}.
          </p>
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:12 }}>
          <div style={{ padding:"14px 16px", borderRadius:12, background:"#69ff8e0a", border:"1px solid #69ff8e22" }}>
            <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.66rem", color:"#69ff8e", letterSpacing:"0.1em", marginBottom:6 }}>FLOWING CONNECTIONS — {softCount}</div>
            <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.76rem", lineHeight:1.55, color:M3.onSurface, margin:0 }}>{flowDesc}</p>
          </div>
          <div style={{ padding:"14px 16px", borderRadius:12, background:"#ff8a500a", border:"1px solid #ff8a5022" }}>
            <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.66rem", color:"#ff8a50", letterSpacing:"0.1em", marginBottom:6 }}>HARD CONTACTS — {hardCount}</div>
            <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.76rem", lineHeight:1.55, color:M3.onSurface, margin:0 }}>{growthDesc}</p>
          </div>
        </div>

        <div style={{ padding:"14px 16px", borderRadius:12, background:M3.surfaceDim, border:`1px solid ${M3.outlineVariant}` }}>
          <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.66rem", color:M3.secondary, letterSpacing:"0.1em", marginBottom:6 }}>THE BALANCE BETWEEN THEM</div>
          <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.78rem", lineHeight:1.6, color:M3.onSurface, margin:0 }}>{balanceParagraph}</p>
        </div>
      </Card>

      {res.cn && (
        <Card title={`${cnAnimal.emoji||"☯"} The ${res.cn.animal} — Two Systems Side by Side`}>
          <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.84rem", lineHeight:1.8, color:M3.onSurface, margin:0 }}>{cnBridge}</p>
        </Card>
      )}

      <Card title="🔮 Portrait — The Principal Placements in Plain Language">
        {(()=>{
          const rows = [
            { heading: `Sun in ${sunSign}`,   glyph: P_SYM.Sun,    rec: getPlanetInSign("Sun", sunSign)   || getSignSymbolism(sunSign) },
            { heading: `Moon in ${moonSign}`, glyph: P_SYM.Moon,   rec: getPlanetInSign("Moon", moonSign) || getSignSymbolism(moonSign) },
            { heading: `${ascSign} rising`,   glyph: "↑",        rec: getSignSymbolism(ascSign) },
            { heading: `Mercury in ${merSign}`, glyph: P_SYM.Mercury, rec: getPlanetInSign("Mercury", merSign) },
            { heading: `Venus in ${venSign}`, glyph: P_SYM.Venus,  rec: getPlanetInSign("Venus", venSign) },
            { heading: `Mars in ${marSign}`,  glyph: P_SYM.Mars,   rec: getPlanetInSign("Mars", marSign) },
          ].filter(r => r.rec);
          return (
            <div>
              <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.79rem", lineHeight:1.68, color:M3.onSurfaceVariant, margin:"0 0 16px" }}>
                Each placement below is named with what the tradition has attributed to it. The depth control adds the lineage and the points on which sources disagree.
              </p>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))", gap:18 }}>
                {rows.map((r,i)=>(<SymbolPanel key={i} record={r.rec} depth={deepDepth} heading={r.heading} glyph={r.glyph} />))}
              </div>
              <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.78rem", lineHeight:1.62, color:M3.onSurfaceVariant, fontStyle:"italic", margin:"16px 0 0" }}>
                Which of these placements share a ruler, an element, or a mode &mdash; and where do they meet by aspect?
              </p>
            </div>
          );
        })()}
      </Card>

      <Card title="🧭 Summary — The Principal Placements">
        {(()=>{
          const rows = [
            { heading: `Sun in ${sunSign}`,  glyph: P_SYM.Sun,  rec: getPlanetInSign("Sun", sunSign)   || getSignSymbolism(sunSign) },
            { heading: `Moon in ${moonSign}`, glyph: P_SYM.Moon, rec: getPlanetInSign("Moon", moonSign) || getSignSymbolism(moonSign) },
            { heading: `${ascSign} rising`,   glyph: "↑",      rec: getSignSymbolism(ascSign) },
            { heading: `Saturn in ${satSign}`, glyph: P_SYM.Saturn, rec: getPlanetInSign("Saturn", satSign) || getSignSymbolism(satSign) },
          ].filter(r => r.rec);
          const hard = hardAsp[0];
          return (
            <div>
              <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.79rem", lineHeight:1.68, color:M3.onSurfaceVariant, margin:"0 0 16px" }}>
                The placements the tradition weights most heavily in a natal figure, gathered in one place.
              </p>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))", gap:18 }}>
                {rows.map((r,i)=>(
                  <SymbolPanel key={i} record={r.rec} depth={deepDepth} heading={r.heading} glyph={r.glyph} />
                ))}
              </div>
              {hard && (
                <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.79rem", lineHeight:1.68, color:M3.onSurface, margin:"18px 0 0" }}>
                  The tightest hard contact in this chart is {(P_ROLE[hard.p1]||hard.p1)} {hard.name.toLowerCase()} {(P_ROLE[hard.p2]||hard.p2)}, at an orb of {typeof hard.orb === "number" ? hard.orb.toFixed(2) : hard.orb}&deg;. Whether it appears at all depends on the orb policy in use.
                </p>
              )}
              <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.78rem", lineHeight:1.62, color:M3.onSurfaceVariant, fontStyle:"italic", margin:"14px 0 0" }}>
                Where else in this figure do these four placements meet — by rulership, by aspect, or by house?
              </p>
            </div>
          );
        })()}
      </Card>

      </>);
    })()}
  </div>
  );
}
