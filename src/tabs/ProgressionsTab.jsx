import { PLANET_IN_SIGN } from '../data/astrology/planetInSign.js';

export default function ProgressionsTab({ ctx }) {
  const {
    M3,
    age,
    res,
    zodSign,
    SIGN_COL,
    SIGN_INFO,
    P_COL,
    P_SYM,
    grid2,
    calcAspects,
    Card,
    PlanetTable,
    WheelWithTooltip,
    AspectTable,
  } = ctx;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <Card style={{ background: `linear-gradient(135deg,${M3.secondaryContainer}88,${M3.surfaceContainer})`, borderColor: M3.outline }}>
        <div style={{ display: "flex", gap: 20, flexWrap: "wrap", alignItems: "flex-start" }}>
          <div style={{ flex: 1, minWidth: 220 }}>
            <div style={{ fontFamily: "Cinzel,serif", fontSize: "1rem", color: M3.secondary, marginBottom: 8 }}>Secondary Progressions - the day-for-a-year convention</div>
            <p style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.83rem", lineHeight: 1.65, color: M3.onSurface, margin: "0 0 10px" }}>
              A symbolic timing method rather than an observation. One day of ephemeris time after a birth is read as standing for one year of life: <strong style={{ color: M3.primary }}>one day after birth = one year of life</strong>. The positions below are therefore those of the sky {age} days after the birth moment, read for the {age}th year. Nothing in the present sky corresponds to them.
            </p>
            <p style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.83rem", lineHeight: 1.65, color: M3.onSurface, margin: 0 }}>
              The progressed Moon crosses a sign about every two and a half years and completes the circle in roughly twenty-seven, which supplies most of the movement in the technique.
            </p>
          </div>
          <svg width="160" height="160" viewBox="0 0 160 160" style={{ flexShrink: 0 }}>
            <line x1="80" y1="10" x2="80" y2="150" stroke={M3.outline} strokeWidth="2" />
            {[0, 10, 20, 30, 40, age].map((a, i) => {
              const y = 10 + a * 3.5;
              const isNow = a === age;
              return (
                <g key={i}>
                  <line x1="72" y1={y} x2="88" y2={y} stroke={isNow ? M3.tertiary : M3.outlineVariant} strokeWidth={isNow ? 2 : 1} />
                  <text x="65" y={y} textAnchor="end" dominantBaseline="middle" fill={isNow ? M3.tertiary : M3.onSurfaceVariant} fontSize="9" fontFamily="'Share Tech Mono',monospace">{a}y</text>
                  {isNow && <text x="92" y={y} dominantBaseline="middle" fill={M3.tertiary} fontSize="8" fontFamily="'Share Tech Mono',monospace">{"<- NOW"}</text>}
                </g>
              );
            })}
            <text x="80" y="6" textAnchor="middle" fill={M3.secondary} fontSize="8" fontFamily="'Share Tech Mono',monospace">BIRTH</text>
          </svg>
        </div>
      </Card>

      {(() => {
        const nSun = zodSign(res.trop.Sun), pSun = zodSign(res.prog.Sun), nMoon = zodSign(res.trop.Moon), pMoon = zodSign(res.prog.Moon);
        const sunChanged = nSun !== pSun, moonChanged = nMoon !== pMoon;
        return (
          <Card title="📖 The Progressed Lights - Sun and Moon Against Their Natal Signs">
            <p style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.82rem", lineHeight: 1.7, color: M3.onSurface, margin: "0 0 14px" }}>
              What follows names where the progressed Sun and Moon stand, whether either has crossed out of its natal sign under the day-for-a-year convention, and what the tradition has attributed to the signs involved.
            </p>
            {sunChanged ? (
              <div style={{ padding: "14px 16px", borderRadius: 12, background: P_COL.Sun + "12", border: `1px solid ${P_COL.Sun}33`, marginBottom: 12 }}>
                <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.68rem", color: P_COL.Sun, letterSpacing: "0.1em", marginBottom: 6 }}>☉ SOLAR SIGN CROSSING - {nSun} {"->"} {pSun}</div>
                <p style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.8rem", lineHeight: 1.7, color: M3.onSurface, margin: 0 }}>
                  The natal Sun stands in <strong style={{ color: SIGN_COL[nSun] }}>{nSun}</strong>: {PLANET_IN_SIGN.Sun?.[nSun] || SIGN_INFO[nSun].plain} The progressed Sun has since crossed into <strong style={{ color: SIGN_COL[pSun] }}>{pSun}</strong>. {PLANET_IN_SIGN.Sun?.[pSun] || SIGN_INFO[pSun].plain} The progressed placement does not displace the natal one - both stand in the record, and most schools read the natal sign as the ground and the progressed sign as a second register laid over it. Sources differ on how much weight the progressed sign should carry against the natal, and the disagreement is unresolved. Where else in this chart does {pSun} appear?
                </p>
              </div>
            ) : (
              <div style={{ padding: "12px 16px", borderRadius: 10, background: M3.surfaceDim, marginBottom: 12 }}>
                <p style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.78rem", lineHeight: 1.6, color: M3.onSurfaceVariant, margin: 0 }}>
                  The progressed Sun remains in <strong style={{ color: SIGN_COL[nSun] }}>{nSun}</strong>, the natal sign. Advancing close to a degree a year, it crosses a sign roughly once in thirty; within a sign the progression registers as degree movement and as changing aspects, not as a change of sign.
                </p>
              </div>
            )}
            {moonChanged ? (
              <div style={{ padding: "14px 16px", borderRadius: 12, background: P_COL.Moon + "12", border: `1px solid ${P_COL.Moon}33`, marginBottom: 12 }}>
                <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.68rem", color: P_COL.Moon, letterSpacing: "0.1em", marginBottom: 6 }}>☽ LUNAR SIGN CROSSING - {nMoon} {"->"} {pMoon}</div>
                <p style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.8rem", lineHeight: 1.7, color: M3.onSurface, margin: 0 }}>
                  The natal Moon stands in <strong style={{ color: SIGN_COL[nMoon] }}>{nMoon}</strong>: {PLANET_IN_SIGN.Moon?.[nMoon] || SIGN_INFO[nMoon].plain} The progressed Moon now stands in <strong style={{ color: SIGN_COL[pMoon] }}>{pMoon}</strong>. {PLANET_IN_SIGN.Moon?.[pMoon] || SIGN_INFO[pMoon].plain} The progressed Moon crosses a sign about every two and a half years, so this placement is the shortest-lived of the progressed factors and the one most often consulted for timing. Which natal degrees does it approach next, and at what orb?
                </p>
              </div>
            ) : (
              <div style={{ padding: "12px 16px", borderRadius: 10, background: M3.surfaceDim, marginBottom: 12 }}>
                <p style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.78rem", lineHeight: 1.6, color: M3.onSurfaceVariant, margin: 0 }}>
                  The progressed Moon remains in <strong style={{ color: SIGN_COL[nMoon] }}>{nMoon}</strong>, the natal sign, moving by degree within it. A crossing falls due roughly every two and a half years.
                </p>
              </div>
            )}
            <p style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.76rem", lineHeight: 1.6, color: M3.onSurfaceVariant, margin: 0, fontStyle: "italic" }}>
              {sunChanged && moonChanged ? "Both progressed lights have changed sign since birth. The tradition reads a double ingress as the most marked of the progressed configurations, because the two significators it weights most heavily have both moved."
                : sunChanged ? "The progressed Sun has changed sign; the progressed Moon has not. One light has moved register while the other holds the natal sign."
                  : moonChanged ? "The progressed Moon has changed sign; the progressed Sun has not. The faster light has moved while the slower holds its natal ground."
                    : "Neither progressed light has changed sign since birth. The progressed Sun crosses a sign roughly every thirty years and the progressed Moon roughly every two and a half, so an unchanged pair is common in the early decades."}
            </p>
          </Card>
        );
      })()}

      <Card title={`→ Progressed Positions at Age ${age}`}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: 10 }}>
          {["Sun", "Moon", "Mercury", "Venus", "Mars"].map((planet) => {
            const natalSign = zodSign(res.trop[planet]);
            const progSign = zodSign(res.prog[planet]);
            const changed = natalSign !== progSign;
            return (
              <div key={planet} style={{ padding: "10px 14px", borderRadius: 10, background: changed ? P_COL[planet] + "18" : M3.surfaceDim, border: `1px solid ${changed ? P_COL[planet] + "55" : M3.outlineVariant}` }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 5 }}>
                  <span style={{ color: P_COL[planet], fontSize: "1rem" }}>{P_SYM[planet]}</span>
                  <span style={{ color: P_COL[planet], fontFamily: "'Share Tech Mono',monospace", fontSize: "0.72rem", fontWeight: "700" }}>{planet}</span>
                  {changed && <span style={{ marginLeft: "auto", background: M3.tertiary, color: M3.onPrimary, fontSize: "0.58rem", padding: "1px 6px", borderRadius: 10, fontFamily: "'Share Tech Mono',monospace" }}>SHIFTED</span>}
                </div>
                <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.68rem", color: M3.onSurfaceVariant }}>
                  <span style={{ color: SIGN_COL[natalSign] }}>Born: {natalSign}</span>
                  {changed && <span style={{ color: M3.secondary }}> → </span>}
                  {changed && <span style={{ color: SIGN_COL[progSign] }}>Now: {progSign}</span>}
                </div>
                {changed && (
                  <p style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.71rem", color: M3.onSurface, lineHeight: 1.5, margin: "6px 0 0" }}>
                    {`The progressed ${planet} has crossed from ${natalSign} into ${progSign}. `}
                    {PLANET_IN_SIGN[planet]?.[progSign] || SIGN_INFO[progSign]?.plain || ""}
                    {" Under the day-for-a-year convention this is a symbolic ingress, not a change in where the body physically stands."}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </Card>

      <div style={grid2}>
        <Card title={`→ Evolved Positions - Age ${age}`}>
          <PlanetTable positions={res.prog} jd={res.jd} />
        </Card>
        <Card title="→ Evolved Chart Wheel">
          <div style={{ display: "flex", justifyContent: "center" }}>
            <WheelWithTooltip positions={res.prog} houses={res.houses} size={300} id="prog" theme="lunar" />
          </div>
        </Card>
      </div>

      <Card title="→ Evolved Connections">
        <AspectTable aspects={calcAspects(res.prog)} />
      </Card>
    </div>
  );
}
