export default function PhiTab({ ctx }) {
  const { M3, res, EL_COL, MOD_COL, Card, DistBar } = ctx;

  const resonance = res.mathematical_resonance || { profiles: {}, average_correlation_index: 0, systemic_harmony: "Low" };
  const highRes = Object.values(resonance.profiles).filter(p => p.correlation_index > 0.75).sort((a,b) => b.correlation_index - a.correlation_index);

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
      <Card style={{ background:`linear-gradient(135deg,${M3.primaryContainer}88,${M3.surfaceContainer})`, borderColor:M3.outline }}>
        <div style={{ fontFamily:"Cinzel,serif", fontSize:"1rem", color:M3.primary, marginBottom:8 }}>Sacred Geometry &amp; Mathematical Resonance</div>
        <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.82rem", lineHeight:1.65, color:M3.onSurface, margin:0 }}>
          This engine analyzes your chart through the lens of <strong>Vortex Mathematics</strong> (3-6-9), the <strong>Golden Ratio</strong> (φ), and the <strong>Fibonacci Sequence</strong>. It reveals where your birth positions align with the fundamental proportions of the universe.
        </p>
      </Card>

      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))", gap:16 }}>
        
        <Card title="✧ Systemic Harmony Dashboard">
          <div style={{ textAlign:"center", padding:"10px 0" }}>
            <div style={{ fontSize:"0.65rem", fontFamily:"'Share Tech Mono',monospace", color:M3.secondary, letterSpacing:"0.1em", marginBottom:4 }}>AVERAGE CORRELATION INDEX</div>
            <div style={{ fontSize:"2.2rem", fontFamily:"Cinzel,serif", color:M3.primary, lineHeight:1 }}>{(resonance.average_correlation_index * 100).toFixed(1)}%</div>
            <div style={{ 
              display:"inline-block", marginTop:10, padding:"4px 16px", borderRadius:20, 
              background:resonance.systemic_harmony === "High" ? "#69ff8e22" : (resonance.systemic_harmony === "Moderate" ? "#ffb34722" : "#ff525222"),
              color:resonance.systemic_harmony === "High" ? "#69ff8e" : (resonance.systemic_harmony === "Moderate" ? "#ffb347" : "#ff5252"),
              fontFamily:"'Share Tech Mono',monospace", fontSize:"0.72rem", fontWeight:"700"
            }}>
              {resonance.systemic_harmony.toUpperCase()} RESONANCE
            </div>
            <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.72rem", color:M3.onSurfaceVariant, marginTop:12, fontStyle:"italic" }}>
              How strongly your chart's structure aligns with universal mathematical constants.
            </p>
          </div>
        </Card>

        <Card title="φ The Phi Rhythm (Current Cycle)">
          {(()=>{
            const cs={ "φ·Low":"#ff5252","φ·Mid":M3.tertiary,"φ·High":"#69ff8e" };
            const stateLabel={"φ·Low":"Rest & Recharge","φ·Mid":"Steady Progress","φ·High":"Peak Energy"};
            const c=cs[res.phi.state]||M3.primary;
            return (
              <div style={{ textAlign:"center" }}>
                <div style={{ fontSize:"2.6rem", color:c, lineHeight:1, fontFamily:"Cinzel,serif" }}>φ</div>
                <div style={{ color:c, fontFamily:"'Share Tech Mono', monospace", fontWeight:"700", marginTop:6 }}>{stateLabel[res.phi.state]||res.phi.state}</div>
                <div style={{ color:M3.onSurfaceVariant, fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.74rem", lineHeight:1.55, marginTop:6 }}>
                  {res.phi.phase<0.38?"Your individual frequency is in a trough. Focus on internal work, health, and preparation. Avoid big launches.":
                   res.phi.phase<0.62?"Your frequency is increasing toward a peak. Build momentum and execute stable plans.":
                   "You are in a resonant peak. This is your 'Golden Window' for maximum impact and visibility."}
                </div>
                <div style={{ marginTop:14, height:4, background:M3.outlineVariant, borderRadius:2, overflow:"hidden" }}>
                  <div style={{ width:`${res.phi.phase*100}%`, height:"100%", background:c }}/>
                </div>
                <div style={{ display:"flex", justifyContent:"space-between", marginTop:8, fontFamily:"'Share Tech Mono',monospace", fontSize:"0.6rem", color:M3.outlineVariant }}>
                  <span>0% (Rest)</span>
                  <span>100% (Peak)</span>
                </div>
              </div>
            );
          })()}
        </Card>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(320px,1fr))", gap:16 }}>
        <Card title="△ Element & Action Temperament">
          <div style={{ marginBottom:16 }}>
            <div style={{ fontSize:"0.62rem", fontFamily:"'Share Tech Mono',monospace", color:M3.secondary, marginBottom:8, letterSpacing:"0.05em" }}>ELEMENTAL DISTRIBUTION</div>
            <DistBar data={res.el} colors={EL_COL}/>
          </div>
          <div>
            <div style={{ fontSize:"0.62rem", fontFamily:"'Share Tech Mono',monospace", color:M3.secondary, marginBottom:8, letterSpacing:"0.05em" }}>MODALITY (ACTION STYLE)</div>
            <DistBar data={res.mod} colors={MOD_COL}/>
          </div>
        </Card>

        <Card title="◈ Mathematical Peaks (High Resonance)">
          <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
            {highRes.length > 0 ? highRes.map(p => (
              <div key={p.label} style={{ padding:"10px 14px", borderRadius:10, background:M3.surfaceDim, border:`1px solid ${M3.outlineVariant}` }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:4 }}>
                  <span style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.75rem", color:M3.primary, fontWeight:"700" }}>{p.label.toUpperCase()}</span>
                  <span style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.65rem", color:M3.onSurfaceVariant }}>{p.value.toFixed(1)}°</span>
                </div>
                <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
                  {p.phi_score > 0.5 && <span style={{ fontSize:"0.62rem", color:"#ffd700", fontFamily:"'Share Tech Mono',monospace" }}>φ-Proportion</span>}
                  {p.fibonacci?.resonance > 0.5 && <span style={{ fontSize:"0.62rem", color:"#64b5f6", fontFamily:"'Share Tech Mono',monospace" }}>Fibonacci Hit</span>}
                  {p.vortex?.is_369 && <span style={{ fontSize:"0.62rem", color:"#ff5252", fontFamily:"'Share Tech Mono',monospace" }}>Vortex 3-6-9</span>}
                </div>
                <div style={{ marginTop:6, height:3, background:M3.outlineVariant + "44", borderRadius:2 }}>
                  <div style={{ width:`${p.correlation_index * 100}%`, height:"100%", background:M3.primary, borderRadius:2 }}/>
                </div>
              </div>
            )) : (
              <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.74rem", color:M3.onSurfaceVariant, textAlign:"center", padding:20 }}>
                No single planet has exceptionally high resonance in this current chart. Harmony is distributed across the system.
              </p>
            )}
          </div>
        </Card>
      </div>

      <Card title="⚙ Proportional Analysis Details">
        <div style={{ overflowX:"auto" }}>
          <table style={{ width:"100%", borderCollapse:"collapse", fontFamily:"'Share Tech Mono',monospace", fontSize:"0.68rem" }}>
            <thead>
              <tr style={{ textAlign:"left", borderBottom:`1px solid ${M3.outlineVariant}` }}>
                <th style={{ padding:8, color:M3.secondary }}>METRIC</th>
                <th style={{ padding:8, color:M3.secondary }}>ROOT (369)</th>
                <th style={{ padding:8, color:M3.secondary }}>φ SCORE</th>
                <th style={{ padding:8, color:M3.secondary }}>FIBONACCI</th>
                <th style={{ padding:8, color:M3.secondary }}>INDEX</th>
              </tr>
            </thead>
            <tbody>
              {Object.values(resonance.profiles).map(p => (
                <tr key={p.label} style={{ borderBottom:`1px solid ${M3.outlineVariant}33`, opacity: p.correlation_index > 0 ? 1 : 0.5 }}>
                  <td style={{ padding:"8px 10px", color:M3.onSurface }}>{p.label}</td>
                  <td style={{ padding:"8px 10px", color:p.vortex?.is_369 ? "#ff5252" : M3.onSurfaceVariant }}>{p.vortex?.digital_root} {p.vortex?.is_369 ? "•" : ""}</td>
                  <td style={{ padding:"8px 10px", color:p.phi_score > 0.4 ? "#ffd700" : M3.onSurfaceVariant }}>{p.phi_score.toFixed(3)}</td>
                  <td style={{ padding:"8px 10px", color:p.fibonacci?.resonance > 0.4 ? "#64b5f6" : M3.onSurfaceVariant }}>{p.fibonacci?.resonance.toFixed(3)}</td>
                  <td style={{ padding:"8px 10px", color:M3.primary, fontWeight:"700" }}>{(p.correlation_index * 100).toFixed(0)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
