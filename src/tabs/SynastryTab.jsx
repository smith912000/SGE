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

  // What the pairing of two significators has been taken to set against what.
  // No verdict about the people is offered, and none should be inferred.
  const SYN_CONTACT = {
    "Sun+Sun":"Two solar significators in contact. The tradition reads the pairing as the two chart-rulers of identity meeting directly.",
    "Sun+Moon":"The two lights across charts. Classical texts weight this contact heavily, as the Sun-Moon relation is the primary pair in a single chart too.",
    "Sun+Mercury":"The light and the messenger. Mercury never departs far from the Sun in longitude, so this contact recurs frequently between any two charts.",
    "Sun+Venus":"The light and the lesser benefic. Venus, like Mercury, stays within a bounded elongation of the Sun.",
    "Moon+Moon":"The two lunar significators in contact. The Moon is the fastest body, so lunar contacts are the most sensitive to birth-time accuracy.",
    "Moon+Venus":"The Moon and the lesser benefic, both traditionally nocturnal and both assigned to the moist and cold in the classical scheme.",
    "Moon+Saturn":"The Moon and the greater malefic. The classical reading is restriction placed on the lunar significator; the modern psychological reading softens this to structure, and the two readings are not the same claim.",
    "Jupiter+Saturn":"The two social bodies, and the slowest of the classical seven. Their mutual cycle of roughly twenty years is the great conjunction of mundane astrology.",
  };

  const getKey = (a) => {
    const p1 = a.p1.replace(/^[AB]_/,""), p2 = a.p2.replace(/^[AB]_/,"");
    return SYN_CONTACT[`${p1}+${p2}`]||SYN_CONTACT[`${p2}+${p1}`]||`A contact between the ${(P_ROLE[p1]||p1).toLowerCase()} significator of one chart and the ${(P_ROLE[p2]||p2).toLowerCase()} significator of the other.`;
  };

  const frictionAsp = [...squares, ...opps].sort((a,b)=>b.strength-a.strength).slice(0,3);

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
      <Card style={{ background:`linear-gradient(135deg,${M3.primaryContainer}88,${M3.surfaceContainer})`, borderColor:M3.outline }}>
        <div style={{ fontFamily:"Cinzel,serif", fontSize:"1rem", color:M3.primary, marginBottom:8 }}>Synastry — Contacts Between Two Charts</div>
        <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.82rem", lineHeight:1.65, color:M3.onSurface, margin:0 }}>
          Synastry lays one chart over the other and reports the contacts between them: which body of one chart stands at a named angle to which body of the other, and at what orb. <strong>Trines and sextiles</strong> are the soft contacts, <strong>squares and oppositions</strong> the hard ones. The counts below are counts, weighted by the orb policy in use — a wider orb produces more contacts. They are not a verdict about the two people, and no verdict is offered here.
        </p>
      </Card>

      <Card title="◈ Contact Summary">
        <div style={{ display:"flex", gap:16, flexWrap:"wrap", marginBottom:14 }}>
          <div style={{ flex:1, minWidth:140, textAlign:"center", padding:"14px 12px", borderRadius:12, background:"#69ff8e0c", border:"1px solid #69ff8e22" }}>
            <div style={{ fontFamily:"Cinzel,serif", fontSize:"1.5rem", color:"#69ff8e" }}>{ratio}%</div>
            <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.66rem", color:M3.secondary, marginTop:4 }}>SOFT / TOTAL</div>
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
          {`${harmony.toFixed(1)} soft against ${friction} hard contacts. The ratio is a property of the orb policy as much as of the two charts, and the classical benefic/malefic scheme that underwrites the soft/hard split has largely been abandoned in modern practice.`}
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
            The tightest hard contacts between the two charts, listed with their orbs.
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
              const roleDesc = `The ${(P_ROLE[p1]||p1).toLowerCase()} significator of one chart stands ${a.name.toLowerCase()} the ${(P_ROLE[p2]||p2).toLowerCase()} significator of the other.`;
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

      {res.synR?.composite && (
        <>
          <Card title="★ The Composite Chart — Midpoints of the Two">
            <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.78rem", lineHeight:1.6, color:M3.onSurfaceVariant, margin:"0 0 16px" }}>
              The composite takes the <strong>midpoint</strong> of each paired body and builds a third chart from the results. It belongs to neither party and corresponds to no moment in the sky. Midpoints can be taken in more than one way, and the methods do not agree; the Davison chart is a different approach again, cast for the midpoint in time and space between the two births, which unlike the composite is an actual moment with a real sky.
            </p>
            <div style={grid2}>
              <div style={{ display:"flex", justifyContent:"center", alignItems:"center" }}>
                <WheelWithTooltip 
                  positions={res.synR.composite.positions} 
                  houses={res.synR.composite.houses} 
                  size={320} 
                  id="composite" 
                  theme="solar"
                />
              </div>
              <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                <div style={{ padding:"14px 16px", borderRadius:12, background:M3.primaryContainer+"22", border:`1px solid ${M3.primary}22` }}>
                  <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.68rem", color:M3.primary, marginBottom:6 }}>COMPOSITE VITALITY</div>
                  <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.76rem", lineHeight:1.55, color:M3.onSurface, margin:0 }}>
                    The Composite Sun is in <strong>{ctx.zodSign(res.synR.composite.positions.Sun.longitude)}</strong>. The composite Sun is the midpoint of the two natal Suns.</p>
                </div>
                <div style={{ padding:"14px 16px", borderRadius:12, background:M3.tertiaryContainer+"22", border:`1px solid ${M3.tertiary}22` }}>
                  <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.68rem", color:M3.tertiary, marginBottom:6 }}>EMOTIONAL NAVIGATION</div>
                  <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.76rem", lineHeight:1.55, color:M3.onSurface, margin:0 }}>
                    The Composite Moon is in <strong>{ctx.zodSign(res.synR.composite.positions.Moon.longitude)}</strong>. The composite Moon is the midpoint of the two natal Moons.</p>
                </div>
                {res.synR.composite.aspects?.length > 0 && (
                  <div style={{ padding:"14px 16px", borderRadius:12, background:M3.surfaceContainer, border:`1px solid ${M3.outlineVariant}` }}>
                    <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.65rem", color:M3.secondary, marginBottom:6 }}>KEY INTERNAL THEMES</div>
                    {res.synR.composite.aspects.slice(0, 3).map((a, i) => (
                      <div key={i} style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.72rem", color:M3.onSurfaceVariant, marginBottom:4 }}>
                        {a.sym} {a.p1} {a.name} {a.p2} — {a.strength > 0.7 ? "Strong theme" : "Subtle undertone"}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </Card>

          <Card title="★ All Composite Connections">
            <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.74rem", lineHeight:1.5, color:M3.onSurfaceVariant, margin:"0 0 10px" }}>
              These aspects exist within the relationship entity itself, showing its internal geometry and dynamics.
            </p>
            <AspectTable aspects={res.synR.composite.aspects}/>
          </Card>
        </>
      )}

      {!res.synR?.composite && (
        <Card title="★ Composite Chart (Midpoint Map)">
          <div style={{ display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center", height:200, background:M3.surfaceDim, borderRadius: 12, border:`1px dashed ${M3.outlineVariant}` }}>
            <span style={{ fontSize: "2rem", marginBottom: 8, opacity: 0.5 }}>⚮</span>
            <p style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.72rem", color:M3.secondary, letterSpacing:"0.1em" }}>GENERATING COMPOSITE DATA...</p>
            <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.74rem", color:M3.onSurfaceVariant, marginTop: 6 }}>
              The midpoint map. Each point is the arithmetic midpoint of the two corresponding natal positions.
            </p>
          </div>
        </Card>
      )}

      <Card title={`♡ All Cross-Chart Connections (${res.synR.aspects.length} links)`}>
        <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.74rem", lineHeight:1.5, color:M3.onSurfaceVariant, margin:"0 0 10px" }}>
          Each row shows a connection between one of Person A's planets and one of Person B's.
        </p>
        <AspectTable aspects={res.synR.aspects}/>
      </Card>
    </div>
  );
}
