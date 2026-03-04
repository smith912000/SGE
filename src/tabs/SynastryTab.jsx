export default function SynastryTab({ ctx }) {
  const { M3, res, grid2, P_COL, P_SYM, P_ROLE, Card, WheelWithTooltip, AspectTable } = ctx;

  if (!res.synR) {
    return (
      <Card style={{ background:`linear-gradient(135deg,${M3.primaryContainer}88,${M3.surfaceContainer})`, borderColor:M3.outline }}>
        <div style={{ fontFamily:"Cinzel,serif", fontSize:"1rem", color:M3.primary, marginBottom:8 }}>Synastry — Relationship Chart Comparison</div>
        <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.82rem", lineHeight:1.65, color:M3.onSurface, margin:"0 0 16px" }}>
          Synastry compares two people's birth charts to reveal the chemistry, harmony, and friction between them.
        </p>
        <div style={{ textAlign:"center", color:M3.secondary, fontFamily:"'Share Tech Mono', monospace", padding:"30px 0", borderTop:`1px solid ${M3.outlineVariant}` }}>
          To use: check "Synastry" in the birth data form above, enter Person B's birth details, and click Compute.
        </div>
      </Card>
    );
  }

  const conj = res.synR.aspects.filter(a=>a.name==="Conjunction");
  const trines = res.synR.aspects.filter(a=>a.name==="Trine");
  const squares = res.synR.aspects.filter(a=>a.name==="Square");
  const opps = res.synR.aspects.filter(a=>a.name==="Opposition");
  const harmony = trines.length + conj.length*0.5;
  const friction = squares.length + opps.length;
  const ratio = harmony > 0 ? (harmony/(harmony+friction)*100).toFixed(0) : 50;

  const SYN_GROWTH = {
    "Sun+Sun":"Your core identities clash — each of you challenges the other's sense of self. The growth: learning that two strong identities can coexist without one diminishing the other.",
    "Sun+Moon":"One person's identity presses against the other's emotional needs. The growth: learning to honour what your partner feels even when it differs from who you are.",
    "Sun+Mercury":"Identity meets communication friction. The growth: learning that being understood requires patience, not just clarity.",
    "Sun+Venus":"Identity conflicts with the other person's love language. The growth: discovering that love can look different from what you expect and still be real.",
    "Sun+Mars":"One person's sense of self triggers the other's aggression or drive. The growth: channelling competition into mutual motivation rather than power struggles.",
    "Sun+Saturn":"Identity meets restriction — one person feels limited by the other. The growth: real commitment means accepting the weight of responsibility along with the warmth of love.",
    "Sun+Jupiter":"Overexpansion meets identity — one person's optimism overwhelms the other. The growth: calibrating enthusiasm so it inspires rather than overshadows.",
    "Moon+Moon":"Emotional needs clash directly. The growth: learning that your partner's emotional reality is as valid as yours, even when they need the opposite.",
    "Moon+Mercury":"Feelings meet logic, and they don't speak the same language. The growth: building a bridge between emotional truth and rational understanding.",
    "Moon+Venus":"Emotional needs conflict with love expressions. The growth: discovering that caring for someone means learning their emotional language, not just speaking your own.",
    "Moon+Mars":"Emotional vulnerability meets aggression. The growth: learning to be tender and direct at the same time — anger doesn't have to mean rejection.",
    "Moon+Saturn":"Emotions meet coldness or control. The growth: this is often the deepest bond once matured — learning to feel safe with someone who won't let you hide from reality.",
    "Venus+Mars":"Attraction meets friction — desire and affection pull in different directions. The growth: learning that passion and tenderness are not opposites but partners.",
    "Venus+Saturn":"Love meets restriction — one person's affection feels blocked by the other's walls. The growth: love that survives Saturn contact becomes unbreakable.",
    "Mars+Saturn":"Drive meets discipline — one person's energy feels controlled by the other. The growth: learning to focus ambition rather than fight it.",
    "Mars+Mars":"Two sets of drives competing. The growth: channelling mutual intensity into shared goals rather than opposing battles.",
    "Mercury+Mercury":"Two different thinking styles colliding. The growth: intellectual diversity strengthens decisions when both people learn to listen.",
    "Jupiter+Saturn":"Expansion meets contraction. The growth: one person dreams big, the other builds real — together you become unstoppable when you stop fighting over pace.",
  };

  const getKey = (a) => {
    const p1 = a.p1.replace(/^[AB]_/,""), p2 = a.p2.replace(/^[AB]_/,"");
    return SYN_GROWTH[`${p1}+${p2}`]||SYN_GROWTH[`${p2}+${p1}`]||`Your ${(P_ROLE[p1]||p1).toLowerCase()} and their ${(P_ROLE[p2]||p2).toLowerCase()} create friction. The growth: learning to meet difference with curiosity rather than defence.`;
  };

  const frictionAsp = [...squares, ...opps].sort((a,b)=>b.strength-a.strength).slice(0,3);

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
      <Card style={{ background:`linear-gradient(135deg,${M3.primaryContainer}88,${M3.surfaceContainer})`, borderColor:M3.outline }}>
        <div style={{ fontFamily:"Cinzel,serif", fontSize:"1rem", color:M3.primary, marginBottom:8 }}>Synastry — How Two Charts Interact</div>
        <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.82rem", lineHeight:1.65, color:M3.onSurface, margin:0 }}>
          Synastry compares two birth charts to reveal the chemistry between two people. <strong>Trines and sextiles</strong> show where you naturally harmonize. <strong>Squares and oppositions</strong> show friction — where you challenge and push each other to grow. <strong>Conjunctions</strong> amplify shared energy.
        </p>
      </Card>

      <Card title="♡ Compatibility Summary">
        <div style={{ display:"flex", gap:16, flexWrap:"wrap", marginBottom:14 }}>
          <div style={{ flex:1, minWidth:140, textAlign:"center", padding:"14px 12px", borderRadius:12, background:"#69ff8e0c", border:"1px solid #69ff8e22" }}>
            <div style={{ fontFamily:"Cinzel,serif", fontSize:"1.5rem", color:"#69ff8e" }}>{ratio}%</div>
            <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.66rem", color:M3.secondary, marginTop:4 }}>HARMONY RATIO</div>
          </div>
          {[
            { n:"Conjunctions", c:conj.length, col:"#FFD700", tip:"Fused energy — amplifies shared themes" },
            { n:"Trines", c:trines.length, col:"#69ff8e", tip:"Natural ease and flow" },
            { n:"Squares", c:squares.length, col:"#ff8a50", tip:"Creative friction and growth" },
            { n:"Oppositions", c:opps.length, col:"#ff5252", tip:"Push-pull tension and awareness" },
          ].map(x=>(
            <div key={x.n} style={{ flex:1, minWidth:110, textAlign:"center", padding:"12px 8px", borderRadius:12, background:x.col+"0a", border:`1px solid ${x.col}22` }}>
              <div style={{ fontFamily:"Cinzel,serif", fontSize:"1.3rem", color:x.col }}>{x.c}</div>
              <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.62rem", color:x.col, marginTop:2 }}>{x.n}</div>
              <div style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.62rem", color:M3.outlineVariant, marginTop:2 }}>{x.tip}</div>
            </div>
          ))}
        </div>
        <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.78rem", lineHeight:1.6, color:M3.onSurfaceVariant, margin:"0 0 16px", textAlign:"center" }}>
          {ratio>=65 ? "This pairing has strong natural harmony — the ease between you is palpable, though growth edges keep things dynamic." : ratio>=45 ? "A balanced mix of harmony and friction — this combination keeps both people growing while maintaining connection." : "This pairing has significant friction — it's growth-oriented rather than comfort-oriented. Challenges build depth if both people are willing."}
        </p>

        {/* Sub-scores */}
        {(() => {
          const EMO_PLANETS = ["Moon","Venus","Neptune"];
          const COM_PLANETS = ["Mercury","Sun","Uranus"];
          const LT_PLANETS  = ["Saturn","Jupiter","Pluto"];
          const INT_PLANETS = ["Venus","Mars","Pluto"];
          const subScore = (planets) => {
            const relevant = res.synR.aspects.filter(a => {
              const p1 = a.p1.replace(/^[AB]_/,""), p2 = a.p2.replace(/^[AB]_/,"");
              return planets.includes(p1) || planets.includes(p2);
            });
            const h = relevant.filter(a=>["Trine","Sextile","Conjunction"].includes(a.name)).length;
            const f = relevant.filter(a=>["Square","Opposition"].includes(a.name)).length;
            const total = h + f;
            return total > 0 ? Math.round((h/total)*100) : 50;
          };
          const subs = [
            { label:"Emotional Bond", score:subScore(EMO_PLANETS), desc:"Moon, Venus, Neptune" },
            { label:"Communication", score:subScore(COM_PLANETS), desc:"Mercury, Sun, Uranus" },
            { label:"Long-term Fit",  score:subScore(LT_PLANETS),  desc:"Saturn, Jupiter, Pluto" },
            { label:"Chemistry",      score:subScore(INT_PLANETS),  desc:"Venus, Mars, Pluto" },
          ];
          return (
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))", gap:10 }}>
              {subs.map(s=>{
                const col = s.score >= 65 ? "#69ff8e" : s.score >= 45 ? "#FFB347" : "#ff6b6b";
                return (
                  <div key={s.label} style={{ padding:"10px 12px", borderRadius:10, background:col+"0a", border:`1px solid ${col}22` }}>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:6 }}>
                      <span style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.62rem", color:M3.onSurfaceVariant }}>{s.label.toUpperCase()}</span>
                      <span style={{ fontFamily:"Cinzel,serif", fontSize:"0.9rem", color:col }}>{s.score}%</span>
                    </div>
                    <div style={{ height:4, borderRadius:2, background:M3.surfaceDim, overflow:"hidden" }}>
                      <div style={{ width:`${s.score}%`, height:"100%", background:col, borderRadius:2, transition:"width 0.5s" }}/>
                    </div>
                    <div style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.62rem", color:M3.outlineVariant, marginTop:4 }}>{s.desc}</div>
                  </div>
                );
              })}
            </div>
          );
        })()}
      </Card>

      {frictionAsp.length > 0 && (
        <Card title="💪 Relationship Growth Areas — Where Friction Builds Depth">
          <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.76rem", lineHeight:1.55, color:M3.onSurfaceVariant, margin:"0 0 12px" }}>
            These are the most intense friction points between your charts.
          </p>
          {frictionAsp.map((a,i)=>{
            const p1=a.p1.replace(/^[AB]_/,""), p2=a.p2.replace(/^[AB]_/,"");
            return (
              <div key={i} style={{ padding:"12px 16px", marginBottom:8, borderRadius:10, background:a.col+"0e", borderLeft:`3px solid ${a.col}` }}>
                <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.72rem", color:M3.onSurface, marginBottom:4 }}>
                  <span style={{color:P_COL[p1]||M3.primary}}>{P_SYM[p1]||""} A's {p1}</span>
                  <span style={{color:a.col, margin:"0 6px"}}>{a.sym} {a.name}</span>
                  <span style={{color:P_COL[p2]||M3.primary}}>{P_SYM[p2]||""} B's {p2}</span>
                  <span style={{color:M3.outlineVariant, marginLeft:8, fontSize:"0.62rem"}}>{(a.strength*100).toFixed(0)}%</span>
                </div>
                <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.76rem", lineHeight:1.6, color:M3.onSurface, margin:0 }}>{getKey(a)}</p>
              </div>
            );
          })}
        </Card>
      )}

      {/* Top supportive aspects */}
      {(() => {
        const supportive = [...trines, ...conj].sort((a,b)=>b.strength-a.strength).slice(0,3);
        if (!supportive.length) return null;
        return (
          <Card title="✨ Strongest Supportive Connections">
            <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.76rem", lineHeight:1.55, color:M3.onSurfaceVariant, margin:"0 0 12px" }}>
              These connections flow naturally — they're the glue of this relationship.
            </p>
            {supportive.map((a,i)=>{
              const p1=a.p1.replace(/^[AB]_/,""), p2=a.p2.replace(/^[AB]_/,"");
              const roleDesc = `Your ${(P_ROLE[p1]||p1).toLowerCase()} and their ${(P_ROLE[p2]||p2).toLowerCase()} resonate through a ${a.name.toLowerCase()} — this creates ${a.name==="Conjunction" ? "a fused, amplified energy between you in this area" : "natural ease and mutual support in how you approach this part of life"}.`;
              return (
                <div key={i} style={{ padding:"12px 16px", marginBottom:8, borderRadius:10, background:a.col+"0a", borderLeft:`3px solid ${a.col}` }}>
                  <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.72rem", color:M3.onSurface, marginBottom:4 }}>
                    <span style={{color:P_COL[p1]||M3.primary}}>{P_SYM[p1]||""} A's {p1}</span>
                    <span style={{color:a.col, margin:"0 6px"}}>{a.sym} {a.name}</span>
                    <span style={{color:P_COL[p2]||M3.primary}}>{P_SYM[p2]||""} B's {p2}</span>
                    <span style={{color:M3.outlineVariant, marginLeft:8, fontSize:"0.62rem"}}>{(a.strength*100).toFixed(0)}%</span>
                  </div>
                  <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.76rem", lineHeight:1.6, color:M3.onSurface, margin:0 }}>{roleDesc}</p>
                </div>
              );
            })}
          </Card>
        );
      })()}

      <div style={grid2}>
        <Card title="♡ Person A — Birth Chart">
          <div style={{ display:"flex", justifyContent:"center" }}>
            <WheelWithTooltip positions={res.trop} houses={res.houses} size={280} id="synA" theme="western"/>
          </div>
        </Card>
        <Card title="♡ Person B — Birth Chart">
          <div style={{ display:"flex", justifyContent:"center" }}>
            <WheelWithTooltip positions={res.synR.positions} houses={res.synR.houses} size={280} id="synB" theme="lunar"/>
          </div>
        </Card>
      </div>

      <Card title={`♡ All Cross-Chart Connections (${res.synR.aspects.length} links)`}>
        <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.74rem", lineHeight:1.5, color:M3.onSurfaceVariant, margin:"0 0 10px" }}>
          Each row shows a connection between one of Person A's planets and one of Person B's.
        </p>
        <AspectTable aspects={res.synR.aspects}/>
      </Card>
    </div>
  );
}
