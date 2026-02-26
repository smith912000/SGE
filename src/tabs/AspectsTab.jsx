export default function AspectsTab({ ctx }) {
  const {
    M3,
    RAD,
    SIGNS,
    SIGN_COL,
    SIGN_SYM,
    ASPECTS,
    ASP_EXPLAIN,
    P_COL,
    P_SYM,
    res,
    Card,
    WheelWithTooltip,
    AspectTable,
  } = ctx;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <Card style={{ background: `linear-gradient(135deg,${M3.primaryContainer}88,${M3.surfaceContainer})`, borderColor: M3.outline }}>
        <div style={{ fontFamily: "Cinzel,serif", fontSize: "1rem", color: M3.primary, marginBottom: 8 }}>What are aspects?</div>
        <p style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.83rem", lineHeight: 1.65, color: M3.onSurface, margin: "0 0 16px" }}>
          Aspects are the angles between planets measured around the zodiac circle. When two planets are a precise number of degrees apart, they form a geometric relationship - and their energies blend in a specific way. Think of it like music: some intervals sound harmonious, some create tension, all create meaning.
        </p>
        {(() => {
          const gSz = Math.min(400, window.innerWidth - 80);
          const gCx = gSz / 2, gCy = gSz / 2, gR = gSz * 0.42;
          const aspectDefs = [
            { angle: 0, col: "#FFD700", sym: "☌", name: "Conjunction", tip: "Same place - energies fuse", count: 12 },
            { angle: 45, col: "#ce93d8", sym: "∠", name: "Semisquare", tip: "45° - minor irritant", count: 8 },
            { angle: 60, col: "#64b5f6", sym: "⚹", name: "Sextile", tip: "60° - gentle opportunity", count: 6 },
            { angle: 90, col: "#ff8a50", sym: "□", name: "Square", tip: "90° - creative friction", count: 4 },
            { angle: 120, col: "#69ff8e", sym: "△", name: "Trine", tip: "120° - natural flow", count: 3 },
            { angle: 135, col: "#ef9a9a", sym: "⚼", name: "Sesquiquadrate", tip: "135° - inner restlessness", count: 8 },
            { angle: 150, col: "#b39ddb", sym: "⚻", name: "Quincunx", tip: "150° - constant adjustment", count: 12 },
            { angle: 180, col: "#ff5252", sym: "☍", name: "Opposition", tip: "Across the chart - push-pull", count: 2 },
          ];
          return (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
              <svg width={gSz} height={gSz} viewBox={`0 0 ${gSz} ${gSz}`} style={{ display: "block" }}>
                <defs>
                  <filter id="aspGeo"><feGaussianBlur stdDeviation="1.5" /></filter>
                </defs>
                <circle cx={gCx} cy={gCy} r={gR + 4} fill="#0a0620" />
                <circle cx={gCx} cy={gCy} r={gR} fill="none" stroke="#bb86fc" strokeWidth="1" opacity="0.2" />
                {SIGNS.map((s, i) => {
                  const a = -Math.PI / 2 + (i * 30) * RAD;
                  const [tx, ty] = [gCx + (gR + 14) * Math.cos(a), gCy + (gR + 14) * Math.sin(a)];
                  const [lx1, ly1] = [gCx + gR * Math.cos(a), gCy + gR * Math.sin(a)];
                  const [lx2, ly2] = [gCx + (gR - 8) * Math.cos(a), gCy + (gR - 8) * Math.sin(a)];
                  return <g key={s}>
                    <line x1={lx1} y1={ly1} x2={lx2} y2={ly2} stroke="#bb86fc" strokeWidth="0.5" opacity="0.2" />
                    <text x={tx} y={ty} textAnchor="middle" dominantBaseline="middle"
                      fill={SIGN_COL[s]} fontSize={gR * 0.08} fontFamily="serif" opacity="0.55"
                      style={{ userSelect: "none" }}>{SIGN_SYM[i]}</text>
                  </g>;
                })}
                {aspectDefs.filter((a) => a.angle > 0).map((asp) => {
                  const n = Math.floor(360 / asp.angle);
                  const points = Array.from({ length: n }, (_, i) => {
                    const a = -Math.PI / 2 + (i * asp.angle) * RAD;
                    return [gCx + (gR - 16) * Math.cos(a), gCy + (gR - 16) * Math.sin(a)];
                  });
                  const lines = [];
                  for (let i = 0; i < n; i++) {
                    for (let j = i + 1; j < n; j++) {
                      const angDiff = Math.abs(i - j) * asp.angle;
                      if (angDiff === asp.angle || angDiff === 360 - asp.angle) {
                        lines.push([points[i], points[j]]);
                      }
                    }
                  }
                  return <g key={asp.name}>
                    {lines.map(([[x1, y1], [x2, y2]], li) => (
                      <g key={li}>
                        <line x1={x1} y1={y1} x2={x2} y2={y2}
                          stroke={asp.col} strokeWidth="2.5" opacity="0.08"
                          strokeLinecap="round" filter="url(#aspGeo)" />
                        <line x1={x1} y1={y1} x2={x2} y2={y2}
                          stroke={asp.col} strokeWidth="1.2" opacity="0.5"
                          strokeLinecap="round" />
                      </g>
                    ))}
                    {points.map(([px, py], pi) => (
                      <circle key={pi} cx={px} cy={py} r="3" fill={asp.col} opacity="0.5" />
                    ))}
                  </g>;
                })}
                <circle cx={gCx} cy={gCy} r="3" fill="#bb86fc" opacity="0.3" />
              </svg>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(155px,1fr))", gap: 8, width: "100%" }}>
                {aspectDefs.map((a) => (
                  <div key={a.name} style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 10px", borderRadius: 8, background: a.col + "11", border: `1px solid ${a.col}33` }}>
                    <span style={{ color: a.col, fontSize: "1rem", fontFamily: "serif" }}>{a.sym}</span>
                    <div>
                      <div style={{ color: a.col, fontFamily: "'Share Tech Mono',monospace", fontSize: "0.68rem", fontWeight: "700" }}>{a.name} {a.angle}°</div>
                      <div style={{ color: M3.onSurfaceVariant, fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.67rem", lineHeight: 1.4 }}>{a.tip}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })()}
      </Card>

      <Card title={`⚹ Your Aspect Web - ${res.aspects.length} connections visualised`}>
        <p style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.76rem", lineHeight: 1.55, color: M3.onSurfaceVariant, margin: "0 0 14px" }}>
          This wheel highlights the <strong>connections between your planets</strong>. Thicker, brighter lines mean stronger aspects. Aspect symbols appear on the strongest links. Hover any line for details.
        </p>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <WheelWithTooltip positions={res.trop} houses={res.houses} size={Math.min(520, window.innerWidth - 64)} id="aspw" mode="aspects" />
        </div>
      </Card>

      <Card title="⚹ Aspect Breakdown">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: 12 }}>
          {["Conjunction", "Trine", "Sextile", "Square", "Opposition", "Quincunx", "Semisquare", "Sesquiquadrate"].map((name) => {
            const matches = res.aspects.filter((a) => a.name === name).sort((a, b) => b.strength - a.strength);
            const def = ASPECTS.find((a) => a.name === name);
            const avgStr = matches.length ? matches.reduce((s, a) => s + a.strength, 0) / matches.length : 0;
            return (
              <div key={name} style={{ padding: "14px 16px", borderRadius: 12, background: def?.col + "0a", border: `1px solid ${def?.col}22` }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  <span style={{ color: def?.col, fontSize: "1.5rem", fontFamily: "serif" }}>{def?.sym}</span>
                  <div>
                    <div style={{ color: def?.col, fontFamily: "'Share Tech Mono',monospace", fontSize: "0.74rem", fontWeight: "700" }}>{name} {def?.angle}°</div>
                    <div style={{ color: M3.onSurfaceVariant, fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.58rem", fontStyle: "italic" }}>{ASP_EXPLAIN[name] || ""}</div>
                    <div style={{ color: M3.onSurfaceVariant, fontFamily: "'Share Tech Mono',monospace", fontSize: "0.58rem" }}>{matches.length} found{matches.length > 0 ? ` - avg ${(avgStr * 100).toFixed(0)}% strength` : ""}</div>
                  </div>
                </div>
                <div style={{ height: 5, background: M3.outlineVariant, borderRadius: 3, overflow: "hidden", marginBottom: 8 }}>
                  <div style={{ width: `${avgStr * 100}%`, height: "100%", background: def?.col, borderRadius: 3 }} />
                </div>
                {matches.length > 0 ? matches.slice(0, 4).map((a, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 6, padding: "4px 0", borderTop: i > 0 ? `1px solid ${M3.outlineVariant}22` : "none" }}>
                    <span style={{ color: P_COL[a.p1], fontSize: "0.9rem" }}>{P_SYM[a.p1]}</span>
                    <span style={{ color: def?.col, fontSize: "0.7rem" }}>{def?.sym}</span>
                    <span style={{ color: P_COL[a.p2], fontSize: "0.9rem" }}>{P_SYM[a.p2]}</span>
                    <span style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.62rem", color: M3.onSurfaceVariant, marginLeft: "auto" }}>{a.p1}-{a.p2}</span>
                    <span style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.58rem", color: def?.col }}>{(a.strength * 100).toFixed(0)}%</span>
                  </div>
                )) : <div style={{ color: M3.outlineVariant, fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.7rem", fontStyle: "italic" }}>None in your chart</div>}
              </div>
            );
          })}
        </div>
        <div style={{ marginTop: 16, padding: "12px 16px", background: M3.surfaceVariant, borderRadius: 12, fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.82rem", color: M3.onSurface, lineHeight: 1.7 }}>
          {(() => {
            const trines = res.aspects.filter((a) => a.name === "Trine").length;
            const squares = res.aspects.filter((a) => a.name === "Square").length;
            const conjs = res.aspects.filter((a) => a.name === "Conjunction").length;
            const sextiles = res.aspects.filter((a) => a.name === "Sextile").length;
            const opps = res.aspects.filter((a) => a.name === "Opposition").length;
            const quinc = res.aspects.filter((a) => a.name === "Quincunx").length;
            const semi = res.aspects.filter((a) => a.name === "Semisquare").length;
            const sesq = res.aspects.filter((a) => a.name === "Sesquiquadrate").length;
            const soft = trines + sextiles + conjs * 0.5, hard = squares + opps + semi + sesq, subtle = quinc;
            const parts = [];
            if (trines) parts.push(`${trines} trine${trines > 1 ? "s" : ""}`);
            if (sextiles) parts.push(`${sextiles} sextile${sextiles > 1 ? "s" : ""}`);
            if (conjs) parts.push(`${conjs} conjunction${conjs > 1 ? "s" : ""}`);
            if (squares) parts.push(`${squares} square${squares > 1 ? "s" : ""}`);
            if (opps) parts.push(`${opps} opposition${opps > 1 ? "s" : ""}`);
            if (quinc) parts.push(`${quinc} quincunx${quinc > 1 ? "es" : ""}`);
            if (semi) parts.push(`${semi} semisquare${semi > 1 ? "s" : ""}`);
            if (sesq) parts.push(`${sesq} sesquiquadrate${sesq > 1 ? "s" : ""}`);
            const summary = parts.join(", ");
            if (soft > hard * 1.5) return `Your chart is heavily harmonious (${summary}). Things tend to flow naturally - your challenge is to not coast on talent but push yourself beyond comfort.${subtle > 2 ? ` The ${quinc} quincunxes add a layer of subtle adjustment that keeps you from becoming complacent.` : ""}`;
            if (hard > soft * 1.5) return `Your chart is heavily dynamic (${summary}). Life pushes you hard - but this pattern produces people of extraordinary depth and resilience. Your strengths are earned, not given.${subtle > 2 ? ` The ${quinc} quincunxes add a layer of nuance that softens the edges of the friction.` : ""}`;
            return `Your chart balances ease and challenge (${summary}). You have natural gifts and real growth edges - the combination makes you both capable and continually evolving.${subtle > 2 ? ` With ${quinc} quincunxes, there's also a constant subtle re-calibration happening beneath the surface.` : ""}`;
          })()}
        </div>
      </Card>

      <Card title="⚹ Full Connection Table">
        <AspectTable aspects={res.aspects} />
      </Card>
    </div>
  );
}
