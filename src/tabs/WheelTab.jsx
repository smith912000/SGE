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
    { id: "cal_sambraielic", datasetId: "sambraielic", label: "Šambraielic", col: "#D7A6A0" },
    { id: "cal_vedic", datasetId: "vedic", label: "Vedic (Pañcāṅga)", col: "#E2B48A" },
    { id: "cal_islamic", datasetId: "islamic", label: "Islamic", col: "#8FC1C9" },
    { id: "cal_jewish", datasetId: "jewish", label: "Hebrew", col: "#B9A9F0" },
    { id: "cal_buddhist", datasetId: "buddhist", label: "Buddhist", col: "#E9C766" },
    { id: "cal_egyptian", datasetId: "egyptian_ancient_solar", label: "Egyptian", col: "#DDA095" },
    { id: "cal_athenian", datasetId: "athenian_lunar", label: "Athenian", col: "#A9C3DA" },
    { id: "cal_mayan", datasetId: "mayan", label: "Maya", col: "#B5CDB8" },
    { id: "cal_ogham", datasetId: "ogham", label: "Ogham", col: "#8FC1C9" },
    { id: "cal_indigenous", datasetId: "indigenous", label: "Indigenous", col: "#A9B27E" },
  ];

  const allModes = [
    { id: "western", label: "Tropical", col: M3.primary, tip: "Seasonal zodiac, measured from the March equinox. The standard frame in Western practice." },
    { id: "sidereal", label: "Sidereal", col: "#B9A9F0", tip: "Stellar zodiac, measured from the fixed stars. Used in Vedic (Jyotish) practice; carries the precession offset." },
    { id: "solar", label: "Solar Return", col: "#D98E5F", tip: "Chart cast for the moment the Sun regains its natal longitude, once each year." },
    { id: "transit_now", label: "Transits now", col: "#93B89A", tip: "Positions of the bodies in the sky at the present moment (transits)." },
    { id: "chinese", label: "Chinese", col: "#E9C766", tip: "The twelve-animal year cycle: earthly branches, five phases, trigrams and yin/yang." },
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
      <div className="sge-wheel-picker">
        {[
          { label: "Zodiac frames", modes: allModes.filter((m) => !m.id.startsWith("cal_")) },
          { label: "Calendars", modes: allModes.filter((m) => m.id.startsWith("cal_")) },
        ].map((g) => (
          <div key={g.label} role="group" aria-label={g.label} className="sge-wheel-group">
            <span className="sge-wheel-group-label">{g.label}</span>
            <div className="sge-wheel-group-row">
              {g.modes.map((m) => (
                <button key={m.id} type="button" aria-pressed={wheelMode === m.id}
                  onClick={() => setWheelMode(m.id)} className="sge-chip"
                  style={{ "--chip": m.col }}>
                  {m.label}
                </button>
              ))}
            </div>
          </div>
        ))}
        <p className="sge-wheel-tip">{allModes.find((m) => m.id === wheelMode)?.tip}</p>
      </div>

      {wheelMode === "western" && (
        <Card title="☉ Western Birth Chart - Tropical Zodiac">
          <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.78rem", lineHeight: 1.55, color: M3.onSurfaceVariant, margin: "0 0 14px" }}>
            The tropical zodiac is measured from the seasons - 0° Aries stands at the March equinox.
          </p>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <WheelWithTooltip positions={res.trop} houses={res.houses} size={Math.min(560, window.innerWidth - 64)} id="full" theme="western" />
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: 16, marginTop: 12, flexWrap: "wrap" }}>
            {[{ l: "AC", c: M3.tertiary, d: "Ascendant (left) - the degree rising on the eastern horizon" }, { l: "MC", c: M3.primary, d: "Midheaven (top) - the meridian above; attributed to office and repute" }, { l: "DC", c: M3.tertiary, d: "Descendant (right) - the setting degree; the ground of the one-to-one relation" }, { l: "IC", c: M3.primary, d: "Imum Coeli (bottom) - the meridian below; attributed to origin, land and foundation" }].map((a) => (
              <div key={a.l} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ color: a.c, fontFamily: M3.fontBody, fontSize: "0.75rem", fontWeight: "700" }}>{a.l}</span>
                <span style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.75rem", color: M3.onSurfaceVariant }}>{a.d}</span>
              </div>
            ))}
          </div>
        </Card>
      )}

      {wheelMode === "sidereal" && (
        <Card title="☽ Sidereal Birth Chart - Vedic/Lunar Zodiac">
          <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.78rem", lineHeight: 1.55, color: M3.onSurfaceVariant, margin: "0 0 14px" }}>
            The sidereal zodiac is measured from the fixed stars. Used in Vedic (Jyotish) practice, it carries the precession of the equinoxes - here about <strong>{ayanamsa(res.jd).toFixed(1)}°</strong> from the tropical frame. Every longitude in this wheel therefore sits that far back from its tropical counterpart, and a body may fall in the previous sign. Neither frame corrects the other; they answer different questions, one seasonal and one stellar.
          </p>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <WheelWithTooltip positions={res.sid} houses={res.sidHouses || res.houses} size={Math.min(560, window.innerWidth - 64)} id="sidwheel" theme="vedic" />
          </div>
          <div style={{ marginTop: 12, padding: "10px 14px", borderRadius: 10, background: M3.surfaceDim, textAlign: "center" }}>
            <span style={{ fontFamily: M3.fontBody, fontSize: "0.75rem", color: "#B9A9F0" }}>Ayanamsa offset: {ayanamsa(res.jd).toFixed(2)}°</span>
            <span style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.75rem", color: M3.onSurfaceVariant, marginLeft: 8 }}>- a chosen value, not an observed one; it subtracts from every tropical longitude</span>
          </div>
        </Card>
      )}

      {wheelMode === "solar" &&
        (res.srPos ? (
          <Card title="↩ Solar Return Chart - The Sun Back at Natal Longitude">
            <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.78rem", lineHeight: 1.55, color: M3.onSurfaceVariant, margin: "0 0 14px" }}>
              The solar return chart is cast for the exact moment the Sun regains the longitude it held at birth - near a birthday, though rarely on it to the hour.
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
                    <span style={{ fontFamily: M3.fontBody, fontSize: "0.75rem", color: SIGN_COL[s] }}>{s}</span>
                  </div>
                );
              })}
            </div>
          </Card>
        ) : (
          <Card title="↩ Solar Return Chart">
            <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.82rem", color: M3.onSurfaceVariant, textAlign: "center", padding: 40 }}>
              Solar Return data is not available for this birth date. Try adjusting the year.
            </p>
          </Card>
        ))}

      {wheelMode === "transit_now" && (
        <Card title="⟳ Transit Sky Wheel - Planets Right Now">
          <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.78rem", lineHeight: 1.55, color: M3.onSurfaceVariant, margin: "0 0 14px" }}>
            This wheel plots the planetary positions for the current date.
          </p>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <WheelWithTooltip positions={res.trPos} size={Math.min(560, window.innerWidth - 64)} id="transit_wheel_mode" theme="transit" />
          </div>
        </Card>
      )}

      {wheelMode === "chinese" && (
        <Card title={`☯ Chinese Zodiac Wheel - ${res.cn.element} ${res.cn.animal}`}>
          <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.78rem", lineHeight: 1.55, color: M3.onSurfaceVariant, margin: "0 0 14px" }}>
            The Chinese zodiac is a 12-year cycle of animals, each paired with one of five elements and a Yin/Yang polarity.
          </p>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <ChineseWheelWithTooltip cn={res.cn} size={Math.min(500, window.innerWidth - 64)} />
          </div>
          <div style={{ marginTop: 12, padding: "12px 14px", borderRadius: 10, background: M3.surfaceContainerHighest + "44", borderLeft: `4px solid ${M3.primary}` }}>
            <div style={{ fontFamily: M3.fontBody, fontSize: "0.75rem", color: M3.primary, fontWeight: "700", marginBottom: 4 }}>
              ARCHETYPE: "{ctx.ANIMAL_INFO[res.cn.animal]?.archetype || "Explorer"}"
            </div>
            <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.82rem", lineHeight: 1.5, color: M3.onSurface, margin: 0 }}>
              {ctx.ANIMAL_INFO[res.cn.animal]?.desc.slice(0, 180)}...
            </p>
            <div style={{ marginTop: 8, display: "flex", gap: 6, flexWrap: "wrap" }}>
              {((ctx.ANIMAL_INFO && res.cn && ctx.ANIMAL_INFO[res.cn.animal]?.trait) || "").split(", ").filter(Boolean).map(t => (
                <span key={t} style={{ padding: "3px 10px", borderRadius: 12, background: M3.primaryContainer, color: M3.onPrimaryContainer, fontFamily: M3.fontBody, fontSize: "0.75rem" }}>{t}</span>
              ))}
            </div>
          </div>
          {res.cn.lunar && (
            <div style={{ textAlign: "center", marginTop: 12, fontFamily: M3.fontBody, fontSize: "0.75rem", color: M3.secondary }}>
              Lunar Date: Day {res.cn.lunar.day} of the {res.cn.lunar.monthName} Month
            </div>
          )}
        </Card>
      )}

      {selectedCalendarDatasetId && isValidCalendarMode && calendarModel && (
        <Card title={`Calendar Wheel - ${calendarModel.title}`}>
          <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.78rem", lineHeight: 1.55, color: M3.onSurfaceVariant, margin: "0 0 12px" }}>
            Native rings use each calendar's own cycle semantics. The golden overlay marker is a normalized 0-360 reference so cross-system comparisons remain visually aligned without replacing native rules.
          </p>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <CalendarWheelWithTooltip model={calendarModel} size={Math.min(560, window.innerWidth - 64)} showOverlay theme="vedic" />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {calendarModel.nativeRings.map((ring) => (
              <div key={ring.id} style={{ padding: "8px 12px", borderRadius: 8, background: M3.surfaceContainerHighest + "44", borderLeft: `4px solid ${M3.primary}` }}>
                <div style={{ fontFamily: M3.fontBody, fontSize: "0.75rem", color: M3.primary, textTransform: "uppercase", marginBottom: 2 }}>{ring.label}</div>
                <div style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.82rem", lineHeight: 1.45, color: M3.onSurface }}>
                  {ring.plain}
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 12, padding: "10px 12px", borderRadius: 10, background: M3.surfaceDim, border: `1px solid ${M3.outlineVariant}`, opacity: 0.8 }}>
            <div style={{ fontFamily: M3.fontBody, fontSize: "0.75rem", color: M3.secondary, marginBottom: 4 }}>
              SOURCE: {calendarModel.metadata.source}
            </div>
            <div style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.75rem", color: M3.onSurfaceVariant }}>
              Status: <strong>{calendarModel.metadata.status}</strong> - Confidence: <strong>{calendarModel.confidence}</strong>
              {calendarModel.caveats.length > 0 ? ` - Caveats: ${calendarModel.caveats.join(" | ")}` : ""}
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
