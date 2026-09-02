import { useMemo } from "react";
import CalendarWheelWithTooltip from "../components/charts/CalendarWheelWithTooltip.jsx";
import { CALENDAR_WHEEL_IDS, buildCalendarWheelModel } from "../engines/calendarWheelEngine.js";
import { getAnimalSymbolism } from "../data/symbolism/chineseSymbolism.js";

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
    { id: "cal_vedic", datasetId: "vedic", label: "Cal Vedic", col: "#ffcc80" },
    { id: "cal_islamic", datasetId: "islamic", label: "Cal Islamic", col: "#80cbc4" },
    { id: "cal_jewish", datasetId: "jewish", label: "Cal Jewish", col: "#b39ddb" },
    { id: "cal_buddhist", datasetId: "buddhist", label: "Cal Buddhist", col: "#ffe082" },
    { id: "cal_egyptian", datasetId: "egyptian_ancient_solar", label: "Cal Egyptian", col: "#ffab91" },
    { id: "cal_athenian", datasetId: "athenian_lunar", label: "Cal Athenian", col: "#90caf9" },
    { id: "cal_mayan", datasetId: "mayan", label: "Cal Mayan", col: "#a5d6a7" },
    { id: "cal_ogham", datasetId: "ogham", label: "Cal Ogham", col: "#4db6ac" },
    { id: "cal_indigenous", datasetId: "indigenous", label: "Cal Native", col: "#d4e157" },
  ];

  const allModes = [
    { id: "western", label: "Western (Tropical)", col: M3.primary, tip: "Seasonal zodiac, measured from the March equinox. The standard frame in Western practice." },
    { id: "sidereal", label: "Lunar (Sidereal)", col: "#ce93d8", tip: "Stellar zodiac, measured from the fixed stars. Used in Vedic (Jyotish) practice; carries the precession offset." },
    { id: "solar", label: "Solar Return", col: "#ffa726", tip: "Chart cast for the moment the Sun regains its natal longitude, once each year." },
    { id: "transit_now", label: "⟳ Transit Sky", col: "#66bb6a", tip: "Positions of the bodies in the sky at the present moment (transits)." },
    { id: "chinese", label: "Chinese Astrology", col: "#ffd54f", tip: "The twelve-animal year cycle - earthly branches, five phases, trigrams and yin/yang." },
    ...calendarModes.map((m) => ({
      id: m.id,
      label: m.label,
      col: m.col,
      tip: "Native cycle ring plus a normalised overlay anchor for cross-calendar comparison.",
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

  const animalRecord = getAnimalSymbolism(res.cn?.animal);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <Card style={{ background: `linear-gradient(135deg,${M3.primaryContainer}88,${M3.surfaceContainer})`, borderColor: M3.outline, padding: "14px 18px" }}>
        <div style={{ fontFamily: "Cinzel,serif", fontSize: "1rem", color: M3.primary, marginBottom: 6 }}>Interactive Wheels - Circular Maps of This Chart</div>
        <p style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.78rem", lineHeight: 1.55, color: M3.onSurface, margin: 0 }}>
          Each wheel is a circular map of one frame. Astrology wheels plot the longitudes of the bodies; calendar wheels plot the segments of a native cycle. Calendar modes carry a normalised overlay marker so that systems can be laid alongside one another without replacing the reckoning each one uses. The frames do not agree, and the disagreement is the instrument, not a fault in it.
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
            The tropical zodiac is measured from the seasons - 0° Aries stands at the March equinox. It is the standard frame in Western practice. AC (Ascendant) sits at the <strong>left</strong>, the degree rising over the eastern horizon; MC (Midheaven) sits near the <strong>top</strong>, where the meridian crosses the ecliptic above. Both angles depend on the recorded birth time: four minutes of clock error moves the Ascendant by roughly one degree. Hovering a symbol names the position beneath it.
          </p>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <WheelWithTooltip positions={res.trop} houses={res.houses} size={Math.min(560, window.innerWidth - 64)} id="full" theme="western" />
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: 16, marginTop: 12, flexWrap: "wrap" }}>
            {[{ l: "AC", c: M3.tertiary, d: "Ascendant (left) - the degree rising on the eastern horizon" }, { l: "MC", c: M3.primary, d: "Midheaven (top) - the meridian above; attributed to office and repute" }, { l: "DC", c: M3.tertiary, d: "Descendant (right) - the setting degree; the ground of the one-to-one relation" }, { l: "IC", c: M3.primary, d: "Imum Coeli (bottom) - the meridian below; attributed to origin, land and foundation" }].map((a) => (
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
            The sidereal zodiac is measured from the fixed stars. Used in Vedic (Jyotish) practice, it carries the precession of the equinoxes - here about <strong>{ayanamsa(res.jd).toFixed(1)}°</strong> from the tropical frame. Every longitude in this wheel therefore sits that far back from its tropical counterpart, and a body may fall in the previous sign. Neither frame corrects the other; they answer different questions, one seasonal and one stellar.
          </p>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <WheelWithTooltip positions={res.sid} houses={res.sidHouses || res.houses} size={Math.min(560, window.innerWidth - 64)} id="sidwheel" theme="vedic" />
          </div>
          <div style={{ marginTop: 12, padding: "10px 14px", borderRadius: 10, background: M3.surfaceDim, textAlign: "center" }}>
            <span style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.68rem", color: "#ce93d8" }}>Ayanamsa offset: {ayanamsa(res.jd).toFixed(2)}°</span>
            <span style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.66rem", color: M3.onSurfaceVariant, marginLeft: 8 }}>- a chosen value, not an observed one; it subtracts from every tropical longitude</span>
          </div>
        </Card>
      )}

      {wheelMode === "solar" &&
        (res.srPos ? (
          <Card title="↩ Solar Return Chart - The Sun Back at Natal Longitude">
            <p style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.78rem", lineHeight: 1.55, color: M3.onSurfaceVariant, margin: "0 0 14px" }}>
              The solar return chart is cast for the exact moment the Sun regains the longitude it held at birth - near a birthday, though rarely on it to the hour. That the Sun returns is astronomy; that the chart drawn for the instant governs the year following is an interpretive convention, and the two claims are separate. The houses shift with the place the chart is cast for, and practitioners divide over birthplace against current location.
            </p>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <WheelWithTooltip positions={res.srPos} houses={res.houses} size={Math.min(560, window.innerWidth - 64)} id="srwheel" theme="solar" />
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

      {wheelMode === "transit_now" && (
        <Card title="⟳ Transit Sky Wheel - Planets Right Now">
          <p style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.78rem", lineHeight: 1.55, color: M3.onSurfaceVariant, margin: "0 0 14px" }}>
            This wheel plots the planetary positions for the current date. Concentration zones and conjunction clusters are visible directly; the natal wheel in the other modes uses the same projection, so the two can be compared by eye.
          </p>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <WheelWithTooltip positions={res.trPos} size={Math.min(560, window.innerWidth - 64)} id="transit_wheel_mode" theme="transit" />
          </div>
        </Card>
      )}

      {wheelMode === "chinese" && (
        <Card title={`☯ Chinese Zodiac Wheel - ${res.cn.element} ${res.cn.animal}`}>
          <p style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.78rem", lineHeight: 1.55, color: M3.onSurfaceVariant, margin: "0 0 14px" }}>
            The Chinese zodiac is a 12-year cycle of animals, each paired with one of five elements and a Yin/Yang polarity. The position for this chart is highlighted below. Note that the cycle year begins at the lunar new year, not on 1 January.
          </p>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <ChineseWheelWithTooltip cn={res.cn} size={Math.min(500, window.innerWidth - 64)} />
          </div>
          <div style={{ marginTop: 12, padding: "12px 14px", borderRadius: 10, background: M3.surfaceContainerHighest + "44", borderLeft: `4px solid ${M3.primary}` }}>
            <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.68rem", color: M3.primary, fontWeight: "700", marginBottom: 4 }}>
              ARCHETYPE: "{ctx.ANIMAL_INFO[res.cn.animal]?.archetype || "Explorer"}"
            </div>
            <p style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.82rem", lineHeight: 1.5, color: M3.onSurface, margin: 0 }}>
              {ctx.ANIMAL_INFO[res.cn.animal]?.desc.slice(0, 180)}...
            </p>
            <div style={{ marginTop: 8, display: "flex", gap: 6, flexWrap: "wrap" }}>
              {((ctx.ANIMAL_INFO && res.cn && ctx.ANIMAL_INFO[res.cn.animal]?.trait) || "").split(", ").filter(Boolean).map(t => (
                <span key={t} style={{ padding: "3px 10px", borderRadius: 12, background: M3.primaryContainer, color: M3.onPrimaryContainer, fontFamily: "'Share Tech Mono',monospace", fontSize: "0.6rem" }}>{t}</span>
              ))}
            </div>
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
            <CalendarWheelWithTooltip model={calendarModel} size={Math.min(560, window.innerWidth - 64)} showOverlay theme="vedic" />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {calendarModel.nativeRings.map((ring) => (
              <div key={ring.id} style={{ padding: "8px 12px", borderRadius: 8, background: M3.surfaceContainerHighest + "44", borderLeft: `4px solid ${M3.primary}` }}>
                <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.65rem", color: M3.primary, textTransform: "uppercase", marginBottom: 2 }}>{ring.label}</div>
                <div style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.82rem", lineHeight: 1.45, color: M3.onSurface }}>
                  {ring.plain}
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 12, padding: "10px 12px", borderRadius: 10, background: M3.surfaceDim, border: `1px solid ${M3.outlineVariant}`, opacity: 0.8 }}>
            <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.6rem", color: M3.secondary, marginBottom: 4 }}>
              SOURCE: {calendarModel.metadata.source}
            </div>
            <div style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.68rem", color: M3.onSurfaceVariant }}>
              Status: <strong>{calendarModel.metadata.status}</strong> - Confidence: <strong>{calendarModel.confidence}</strong>
              {calendarModel.caveats.length > 0 ? ` - Caveats: ${calendarModel.caveats.join(" | ")}` : ""}
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
