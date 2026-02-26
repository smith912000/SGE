import { useMemo } from "react";
import CalendarWheelWithTooltip from "../components/charts/CalendarWheelWithTooltip.jsx";
import { CALENDAR_WHEEL_IDS, buildCalendarWheelModel } from "../engines/calendarWheelEngine.js";

export default function WheelTab({ ctx }) {
  const {
    M3,
    A,
    res,
    Card,
    wheelMode,
    setWheelMode,
    WheelWithTooltip,
    ChineseWheelWithTooltip,
    ayanamsa,
    zodSign,
    P_COL,
    P_SYM,
    SIGN_COL,
  } = ctx;

  const calendarModes = [
    { id: "cal_sambraielic", datasetId: "sambraielic", label: "Cal Sambraielic", col: "#f48fb1" },
    { id: "cal_chinese", datasetId: "chinese", label: "Cal Chinese", col: "#ffd54f" },
    { id: "cal_panchanga", datasetId: "panchanga", label: "Cal Panchanga", col: "#ffcc80" },
    { id: "cal_islamic", datasetId: "islamic", label: "Cal Islamic", col: "#80cbc4" },
    { id: "cal_jewish", datasetId: "jewish", label: "Cal Jewish", col: "#b39ddb" },
    { id: "cal_buddhist", datasetId: "buddhist", label: "Cal Buddhist", col: "#ffe082" },
    { id: "cal_egyptian", datasetId: "egyptian_ancient_solar", label: "Cal Egyptian", col: "#ffab91" },
    { id: "cal_athenian", datasetId: "athenian_lunar", label: "Cal Athenian", col: "#90caf9" },
    { id: "cal_mayan", datasetId: "mayan", label: "Cal Mayan", col: "#a5d6a7" },
  ];

  const allModes = [
    { id: "western", label: "Western (Tropical)", col: M3.primary, tip: "Season-based zodiac used in Western astrology. Your main birth chart." },
    { id: "sidereal", label: "Lunar (Sidereal)", col: "#ce93d8", tip: "Star-based zodiac used in Vedic/Jyotish astrology. Accounts for Earth's wobble." },
    { id: "solar", label: "Solar Return", col: "#ffa726", tip: "Chart for when the Sun returns to its birth position each year - maps your year ahead." },
    { id: "chinese", label: "Chinese Astrology", col: "#ffd54f", tip: "Your Chinese zodiac wheel - animals, elements, trigrams, and Yin/Yang." },
    ...calendarModes.map((m) => ({
      id: m.id,
      label: m.label,
      col: m.col,
      tip: "Native cycle ring plus normalized overlay anchor for cross-calendar comparison.",
    })),
  ];

  const calendarModeMap = Object.fromEntries(calendarModes.map((m) => [m.id, m.datasetId]));
  const selectedCalendarDatasetId = calendarModeMap[wheelMode];
  const calendarModel = useMemo(() => {
    if (!selectedCalendarDatasetId) return null;
    return buildCalendarWheelModel(selectedCalendarDatasetId, {
      year: A.year,
      month: A.month,
      day: A.day,
      jd: res.jd,
      solarLongitude: res.trop?.Sun,
      cn: res.cn,
    });
  }, [selectedCalendarDatasetId, A.year, A.month, A.day, res.jd, res.trop, res.cn]);

  const isValidCalendarMode = CALENDAR_WHEEL_IDS.includes(selectedCalendarDatasetId);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <Card style={{ background: `linear-gradient(135deg,${M3.primaryContainer}88,${M3.surfaceContainer})`, borderColor: M3.outline, padding: "14px 18px" }}>
        <div style={{ fontFamily: "Cinzel,serif", fontSize: "1rem", color: M3.primary, marginBottom: 6 }}>Interactive Wheels - Visual Maps of Your Chart</div>
        <p style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.78rem", lineHeight: 1.55, color: M3.onSurface, margin: 0 }}>
          Each wheel is a circular sky-map. Astrology wheels plot planetary positions; calendar wheels plot native cycle segments. Calendar modes include a normalized overlay marker so you can compare systems without replacing each system's own math.
        </p>
      </Card>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", justifyContent: "center" }}>
        {allModes.map((m) => (
          <div key={m.id} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
            <button
              onClick={() => setWheelMode(m.id)}
              style={{
                padding: "7px 18px",
                borderRadius: 20,
                border: `1.5px solid ${wheelMode === m.id ? m.col : M3.outline + "66"}`,
                background: wheelMode === m.id ? m.col + "22" : "transparent",
                color: wheelMode === m.id ? m.col : M3.onSurfaceVariant,
                fontFamily: "'Share Tech Mono',monospace",
                fontSize: "0.72rem",
                fontWeight: wheelMode === m.id ? "700" : "400",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              {m.label}
            </button>
            {wheelMode === m.id && (
              <span style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.64rem", color: M3.onSurfaceVariant, textAlign: "center", maxWidth: 180 }}>{m.tip}</span>
            )}
          </div>
        ))}
      </div>

      {wheelMode === "western" && (
        <Card title="☉ Western Birth Chart - Tropical Zodiac">
          <p style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.78rem", lineHeight: 1.55, color: M3.onSurfaceVariant, margin: "0 0 14px" }}>
            The tropical zodiac is anchored to the seasons - 0° Aries begins at the spring equinox. This is the standard system in Western astrology. AC (Ascendant) sits at the <strong>left</strong> - this is your rising sign. MC (Midheaven) is near the <strong>top</strong> - your career/public point. Hover any symbol for details.
          </p>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <WheelWithTooltip positions={res.trop} houses={res.houses} size={Math.min(560, window.innerWidth - 64)} id="full" />
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: 16, marginTop: 12, flexWrap: "wrap" }}>
            {[{ l: "AC", c: M3.tertiary, d: "Ascendant (left) - your rising sign, first impressions" }, { l: "MC", c: M3.primary, d: "Midheaven (top) - career, public reputation" }, { l: "DC", c: M3.tertiary, d: "Descendant (right) - partnerships, what you attract" }, { l: "IC", c: M3.primary, d: "Imum Coeli (bottom) - home, roots, private self" }].map((a) => (
              <div key={a.l} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ color: a.c, fontFamily: "'Share Tech Mono',monospace", fontSize: "0.72rem", fontWeight: "700" }}>{a.l}</span>
                <span style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.62rem", color: M3.onSurfaceVariant }}>{a.d}</span>
              </div>
            ))}
          </div>
        </Card>
      )}

      {wheelMode === "sidereal" && (
        <Card title="☽ Sidereal Birth Chart - Vedic/Lunar Zodiac">
          <p style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.78rem", lineHeight: 1.55, color: M3.onSurfaceVariant, margin: "0 0 14px" }}>
            The sidereal zodiac is anchored to the fixed stars. Used in Vedic (Jyotish) astrology, it accounts for the precession of the equinoxes - currently about <strong>{ayanamsa(res.jd).toFixed(1)}°</strong> offset from the tropical system. Notice how all your planet positions have shifted compared to the Western wheel.
          </p>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <WheelWithTooltip positions={res.sid} houses={res.houses} size={Math.min(560, window.innerWidth - 64)} id="sidwheel" />
          </div>
          <div style={{ marginTop: 12, padding: "10px 14px", borderRadius: 10, background: M3.surfaceDim, textAlign: "center" }}>
            <span style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.68rem", color: "#ce93d8" }}>Ayanamsa offset: {ayanamsa(res.jd).toFixed(2)}°</span>
            <span style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.66rem", color: M3.onSurfaceVariant, marginLeft: 8 }}>- every planet shifts by this amount from the tropical chart</span>
          </div>
        </Card>
      )}

      {wheelMode === "solar" &&
        (res.srPos ? (
          <Card title="↩ Solar Return Chart - Your Year Ahead">
            <p style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.78rem", lineHeight: 1.55, color: M3.onSurfaceVariant, margin: "0 0 14px" }}>
              The Solar Return chart is cast for the exact moment the Sun returns to its birth position each year. It maps the themes and energies of your coming year. Compare planet positions here to your natal wheel to see what's shifted.
            </p>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <WheelWithTooltip positions={res.srPos} houses={res.houses} size={Math.min(560, window.innerWidth - 64)} id="srwheel" />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(130px,1fr))", gap: 6, marginTop: 12 }}>
              {["Sun", "Moon", "Venus", "Mars", "Jupiter", "Saturn"].map((p) => {
                const srLon = res.srPos?.[p];
                if (srLon == null) return null;
                const s = zodSign(srLon);
                return (
                  <div key={p} style={{ display: "flex", alignItems: "center", gap: 5, padding: "5px 10px", borderRadius: 8, background: P_COL[p] + "0c", border: `1px solid ${P_COL[p]}22` }}>
                    <span style={{ color: P_COL[p], fontSize: "0.9rem" }}>{P_SYM[p]}</span>
                    <span style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.62rem", color: SIGN_COL[s] }}>{s}</span>
                  </div>
                );
              })}
            </div>
          </Card>
        ) : (
          <Card title="↩ Solar Return Chart">
            <p style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.82rem", color: M3.onSurfaceVariant, textAlign: "center", padding: 40 }}>
              Solar Return data is not available for this birth date. Try adjusting the year.
            </p>
          </Card>
        ))}

      {wheelMode === "chinese" && (
        <Card title={`☯ Chinese Zodiac Wheel - ${res.cn.element} ${res.cn.animal}`}>
          <p style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.78rem", lineHeight: 1.55, color: M3.onSurfaceVariant, margin: "0 0 14px" }}>
            The Chinese zodiac is a 12-year cycle of animals, each paired with one of five elements and a Yin/Yang polarity. Your position is highlighted below.
          </p>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <ChineseWheelWithTooltip cn={res.cn} size={Math.min(500, window.innerWidth - 64)} />
          </div>
          {res.cn.lunar && (
            <div style={{ textAlign: "center", marginTop: 12, fontFamily: "'Share Tech Mono',monospace", fontSize: "0.72rem", color: M3.secondary }}>
              Lunar Date: Day {res.cn.lunar.day} of the {res.cn.lunar.monthName} Month
            </div>
          )}
        </Card>
      )}

      {selectedCalendarDatasetId && isValidCalendarMode && calendarModel && (
        <Card title={`Calendar Wheel - ${calendarModel.title}`}>
          <p style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.78rem", lineHeight: 1.55, color: M3.onSurfaceVariant, margin: "0 0 12px" }}>
            Native rings use each calendar's own cycle semantics. The golden overlay marker is a normalized 0-360 reference so cross-system comparisons remain visually aligned without replacing native rules.
          </p>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <CalendarWheelWithTooltip model={calendarModel} size={Math.min(560, window.innerWidth - 64)} showOverlay />
          </div>
          <div style={{ marginTop: 12, padding: "10px 12px", borderRadius: 10, background: M3.surfaceDim, border: `1px solid ${M3.outlineVariant}` }}>
            <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.66rem", color: M3.secondary, marginBottom: 6 }}>
              SOURCE: {calendarModel.metadata.source}
            </div>
            <div style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.72rem", color: M3.onSurfaceVariant }}>
              Status: <strong>{calendarModel.metadata.status}</strong> - Confidence: <strong>{calendarModel.confidence}</strong>
              {calendarModel.caveats.length > 0 ? ` - Caveats: ${calendarModel.caveats.join(" | ")}` : ""}
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
