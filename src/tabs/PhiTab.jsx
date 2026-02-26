export default function PhiTab({ ctx }) {
  const { M3, res, EL_COL, MOD_COL, Card, DistBar } = ctx;

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
      <Card style={{ background:`linear-gradient(135deg,${M3.primaryContainer}88,${M3.surfaceContainer})`, borderColor:M3.outline }}>
        <div style={{ fontFamily:"Cinzel,serif", fontSize:"1rem", color:M3.primary, marginBottom:8 }}>Elements, Modality &amp; Phi Rhythm</div>
        <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.82rem", lineHeight:1.65, color:M3.onSurface, margin:0 }}>
          Your chart's planets are distributed across four <strong>elements</strong> (Fire = passion, Earth = practicality, Air = intellect, Water = emotion) and three <strong>modalities</strong> (Cardinal = initiator, Fixed = sustainer, Mutable = adapter). The balance between these shapes your temperament. The <strong>Phi rhythm</strong> (φ = 1.618, the golden ratio) maps your birth day to a natural energy cycle — showing whether you're in a rest, building, or peak phase.
        </p>
      </Card>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))", gap:16 }}>
        <Card title="φ Golden Ratio Rhythm — Where You Are in the Cycle">
          {(()=>{
            const cs={ "φ·Low":"#ff5252","φ·Mid":M3.tertiary,"φ·High":"#69ff8e" };
            const stateLabel={"φ·Low":"Rest & Recharge","φ·Mid":"Steady Progress","φ·High":"Peak Energy"};
            const c=cs[res.phi.state]||M3.primary;
            return (
              <div style={{ textAlign:"center" }}>
                <div style={{ fontSize:"2.6rem", color:c, lineHeight:1 }}>φ</div>
                <div style={{ color:c, fontFamily:"'Share Tech Mono', monospace", fontWeight:"700", marginTop:6 }}>{stateLabel[res.phi.state]||res.phi.state}</div>
                <div style={{ color:M3.onSurfaceVariant, fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.71rem", fontStyle:"italic", marginTop:4 }}>
                  {res.phi.phase<0.38?"Energy is low — good for reflection and planning.":
                   res.phi.phase<0.62?"Momentum is building — act on steady goals.":
                   "You're in a high-energy window — ideal for bold moves."}
                </div>
                <div style={{ color:M3.onSurfaceVariant, fontFamily:"'Share Tech Mono', monospace", fontSize:"0.68rem", marginTop:4 }}>cycle position {(res.phi.phase*100).toFixed(0)}% · multiplier ×{res.phi.mult}</div>
                <div style={{ marginTop:12, height:4, background:M3.outlineVariant, borderRadius:2, overflow:"hidden" }}>
                  <div style={{ width:`${res.phi.phase*100}%`, height:"100%", background:c }}/>
                </div>
              </div>
            );
          })()}
        </Card>
        <Card title="△ Element Balance — Fire, Earth, Air, Water">
          <DistBar data={res.el} colors={EL_COL}/>
        </Card>
        <Card title="⊞ Action Style — Starter, Sustainer, Adapter">
          <DistBar data={res.mod} colors={MOD_COL}/>
        </Card>
        <Card title="◈ Your Chart at a Glance">
          <div style={{ display:"flex", flexDirection:"column", gap:6, fontFamily:"'Share Tech Mono', monospace", fontSize:"0.72rem" }}>
            {Object.entries(res.el).sort(([,a],[,b])=>b-a).map(([el,v])=>(
              <div key={el} style={{ display:"flex", justifyContent:"space-between" }}>
                <span style={{ color:EL_COL[el] }}>▸ {el}</span>
                <span style={{ color:M3.onSurfaceVariant }}>{v}</span>
              </div>
            ))}
            <div style={{ borderTop:`1px solid ${M3.outlineVariant}`, paddingTop:8, marginTop:4 }}>
              {[
                ["Dominant",Object.entries(res.el).sort(([,a],[,b])=>b-a)[0][0]],
                ["Mode",Object.entries(res.mod).sort(([,a],[,b])=>b-a)[0][0]],
                ["Phi",`${res.phi.state} ×${res.phi.mult}`],
              ].map(([k,v])=>(
                <div key={k} style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
                  <span style={{ color:M3.secondary }}>{k}</span>
                  <span style={{ color:M3.tertiary }}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
