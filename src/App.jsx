import SymbolPanel from './components/ui/SymbolPanel.jsx';
import { getPlanetInSign } from './data/symbolism/planetInSign.js';
import { getSignSymbolism } from './data/symbolism/signSymbolism.js';
import { useState, useEffect, useRef, useCallback, lazy, Suspense } from "react";

// Hooks
import { useAnime } from './hooks/useAnime.js';

// Theme
import { M3 } from './theme/m3.js';

// Utils
import { norm } from './utils/helpers.js';

// Data - Astrology
import { SIGNS, SIGN_SYM, SIGN_COL, SIGN_INFO, EL_COL, MOD_COL } from './data/astrology/signs.js';
import { P_SYM, P_COL, P_ROLE, PL, PLANET_INFO } from './data/astrology/planets.js';
import { HOUSE_INFO, HOUSE_AREA } from './data/astrology/houses.js';
import { ASPECTS, ASP_EXPLAIN, ASP_SHORT, ASPECT_MEANINGS } from './data/astrology/aspects.js';
import { AXIS_INFO } from './data/astrology/axes.js';
import { STEMS, STEM_PINYIN, BRANCHES, BRANCH_PINYIN, ANIMALS, CN_EL, CN_MONTH_NAMES, CNY_DATES, ANIMAL_INFO, CN_EL_INFO, POLARITY_INFO, ANIMAL_TRIGRAM } from './data/astrology/chinese.js';
import {
  CHINESE_ASTRO_INTRO,
  WUXING_PROFILES,
  WUXING_GENERATING,
  WUXING_CONTROLLING,
  YEAR_END_STEM_POLARITY,
  CHINESE_ZODIAC_EXTENDED,
  CHINESE_TRANSLATION_NOTES,
  ZODIAC_TRINES,
  ZI_WEI_INFO,
  ZI_WEI_PALACES_SEQUENCES,
  ZI_WEI_MAJOR_STARS,
  TWELVE_HEAVENLY_GENERALS,
} from './data/astrology/chineseCorpus.js';

// Data - Grammatology
import { LETTER_DB } from './data/grammatology/letterDb.js';
import { WRITING_SYSTEM_TYPES } from './data/grammatology/writingSystems.js';
import { EGYPTIAN_UNILITERALS, ACROPHONY_SHIFTS } from './data/grammatology/egyptian.js';
import { OGHAM_FULL } from './data/grammatology/ogham.js';
import { IPA_QUICK } from './data/grammatology/ipa.js';
import { DIGRAPH_MAP } from './data/grammatology/digraphs.js';
import { signToLetter, planetToLetter, hermeticPlanetToLetter } from './data/grammatology/yetzirah.js';
import { ZODIAC_CHINESE_MAP, CHINESE_ZODIAC_HEBREW, MUSICAL_SCALE_OCCULT } from './data/grammatology/correspondences.js';
import { KANGXI_INFO, KANGXI_RADICALS, KANGXI_TOP_10_BY_FREQUENCY, KANGXI_MOST_USED, KANGXI_STANDALONE } from './data/grammatology/kangxiRadicals.js';
import { SCRIPT_ATLAS, TWENTY_TWO_NOTE } from './data/grammatology/scriptAtlas.js';

// Data - Numerology
import { LIFE_PATH_MEANING, EXPRESSION_MEANING, SOUL_URGE_MEANING, PERSONALITY_MEANING, BIRTHDAY_MEANING } from './data/numerology/meanings.js';
import { NUM_PLANET, MASTER_NUMBERS } from './data/numerology/tables.js';

// Data - Deep Analysis
import { SOLAR_DEEP, LUNAR_DEEP } from './data/deepAnalysis/solarLunar.js';
import { RISING_SHADOW, VENUS_SHADOW, MARS_SHADOW, MERCURY_SHADOW } from './data/deepAnalysis/shadows.js';
import { JUPITER_DEEP, SATURN_DEEP } from './data/deepAnalysis/outerPlanets.js';
import { URANUS_DEEP, NEPTUNE_DEEP, PLUTO_DEEP } from './data/deepAnalysis/transpersonals.js';
import { moonPhase } from './engines/astronomy.js';
import { PAIR_INSIGHT } from './data/deepAnalysis/pairInsights.js';

// Engines
import { julianDay, allPlanets, calcAsc, calcMC, calcHouses, calcAspects, ayanamsa, harmonic, progChart, findSolarReturn, elemMod, phiEngine } from './engines/astronomy.js';
import { chineseCycle } from './engines/chinese.js';
import { computeNumerology, reduceToRoot } from './engines/numerology.js';
import { calcGematria } from './engines/gematria.js';
import { generateProfile } from './engines/profile.js';
import { computeSambCalendar, SAMB_HOLIDAYS_MAP } from './engines/calendar.js';
import { MASTER_TEACHER_DAYS } from './data/calendar/festivals.js';
import { SAMB_SUBDIVISIONS } from './data/calendar/subdivisions.js';
import { analyzeWord } from './engines/wordCrosswalk.js';

// Components - UI
import Card from './components/ui/Card.jsx';
import Tooltip from './components/ui/Tooltip.jsx';
import TabBar from './components/ui/TabBar.jsx';
import Field from './components/ui/Field.jsx';
import ComputeButton from './components/ui/ComputeButton.jsx';
import TabContent from './components/ui/TabContent.jsx';
import DistBar from './components/ui/DistBar.jsx';
import StarCanvas from './components/ui/StarCanvas.jsx';
import ProfilePanel from './components/ui/ProfilePanel.jsx';

// Components - Layout
import Header from './components/layout/Header.jsx';
import InputPanel from './components/layout/InputPanel.jsx';
import Footer from './components/layout/Footer.jsx';

// Components - Charts
import WheelWithTooltip from './components/charts/WheelWithTooltip.jsx';
import ChineseWheelWithTooltip from './components/charts/ChineseWheelWithTooltip.jsx';

// Components - Tables
import PlanetTable from './components/tables/PlanetTable.jsx';
import AspectTable from './components/tables/AspectTable.jsx';

// Components - Tabs
const WheelTab = lazy(() => import('./tabs/WheelTab.jsx'));
const AspectsTab = lazy(() => import('./tabs/AspectsTab.jsx'));
const TodayTab = lazy(() => import('./tabs/TodayTab.jsx'));
const ProgressionsTab = lazy(() => import('./tabs/ProgressionsTab.jsx'));
const SynastryTab = lazy(() => import('./tabs/SynastryTab.jsx'));
const ChineseTab = lazy(() => import('./tabs/ChineseTab.jsx'));
const NatalTab = lazy(() => import('./tabs/NatalTab.jsx'));
const EducationTab = lazy(() => import('./tabs/EducationTab.jsx'));
const HarmonicsTab = lazy(() => import('./tabs/HarmonicsTab.jsx'));
const NumerologyTab = lazy(() => import('./tabs/NumerologyTab.jsx'));
const GrammatologyTab = lazy(() => import('./tabs/GrammatologyTab.jsx'));
const DeepTab = lazy(() => import('./tabs/DeepTab.jsx'));
const CalendarTab = lazy(() => import('./tabs/CalendarTab.jsx'));
const TarotTab = lazy(() => import('./tabs/TarotTab.jsx'));
const VedicTab = lazy(() => import('./tabs/VedicTab.jsx'));

import ErrorBoundary from './components/ui/ErrorBoundary.jsx';

// Utility constants and functions
const RAD = Math.PI / 180;
const zodSign = lon => SIGNS[Math.floor(((lon % 360 + 360) % 360) / 30)];
const zodDeg = lon => (((lon % 360 + 360) % 360) % 30).toFixed(1);
const to24Hour = (hour12, meridiem) => {
  const h = Number(hour12);
  if (!Number.isFinite(h)) return 0;
  const clamped = Math.min(12, Math.max(1, Math.trunc(h)));
  if (meridiem === "PM") return clamped === 12 ? 12 : clamped + 12;
  return clamped === 12 ? 0 : clamped;
};
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://127.0.0.1:8000";
const normalizePlanet = (k) => (k === "North Node" ? "Node" : k);
const flattenPlanetMap = (obj = {}) =>
  Object.fromEntries(Object.entries(obj).map(([k, v]) => [normalizePlanet(k), typeof v === "object" ? v.longitude : v]));
const toUtcBirthPayload = (input) => {
  const h24 = to24Hour(input.hour, input.meridiem);
  const utcMs = Date.UTC(input.year, input.month - 1, input.day, h24, input.min || 0, 0, 0) - (Number(input.tz) || 0) * 3600000;
  const d = new Date(utcMs);
  return {
    year: d.getUTCFullYear(),
    month: d.getUTCMonth() + 1,
    day: d.getUTCDate(),
    hour: d.getUTCHours(),
    minute: d.getUTCMinutes(),
    second: 0,
    timezone: "UTC",
    latitude: Number(input.lat),
    longitude: Number(input.lon),
  };
};
const mapBackendHouses = (housesData) => {
  const placidus = housesData?.placidus;
  const out = {};
  (placidus?.cusps || []).forEach((c) => { out[c.house] = c.longitude; });
  out.ASC = placidus?.ascendant ?? 0;
  out.MC = placidus?.mc ?? 0;
  out.IC = norm(out.MC + 180);
  out.DSC = norm(out.ASC + 180);
  return out;
};
const backendAspectToUi = (aspect) => {
  const name = String(aspect.aspect || "").split("-").map((s) => s ? (s[0].toUpperCase() + s.slice(1)) : "").join("-");
  const def = ASPECTS.find((a) => a.angle === aspect.angle) || ASPECTS.find((a) => a.name === name);
  return {
    p1: normalizePlanet(aspect.planet1),
    p2: normalizePlanet(aspect.planet2),
    name: def?.name || name || "Aspect",
    angle: aspect.angle,
    orb: Number(aspect.orb ?? 0).toFixed(2),
    strength: Number(aspect.strength ?? 0),
    col: def?.col || "#8ea7ff",
    sym: def?.sym || "•",
  };
};

export default function App() {
  const anime = useAnime();
  const headerRef = useRef(null);

  const _now = new Date();
  const [A, setA] = useState({ year: _now.getFullYear(), month: _now.getMonth() + 1, day: _now.getDate(), hour: ((_now.getHours() + 11) % 12) + 1, meridiem: _now.getHours() >= 12 ? "PM" : "AM", min: _now.getMinutes(), lat: 51.5, lon: -0.1, tz: 0, tzName: "Etc/UTC", place: "", name: "" });
  const [B, setB] = useState({ year: 1988, month: 3, day: 22, hour: 9, meridiem: "AM", min: 30, lat: 40.7, lon: -74.0, tz: -5, tzName: "America/New_York", place: "" });
  const [age, setAge] = useState(0);
  const [n, setN] = useState(5);
  const [syn, setSyn] = useState(false);
  const [tab, setTab] = useState("natal");
  const [res, setRes] = useState(null);
  const [loading, setLoading] = useState(false);
  const [gemaName, setGemaName] = useState("");
  const [expandedLetter, setExpandedLetter] = useState(null);
  const [gramTab, setGramTab] = useState("phonetics");
  const [gramScriptFilter, setGramScriptFilter] = useState("core");
  const [wheelMode, setWheelMode] = useState("western");
  const [calDate, setCalDate] = useState({ y: new Date().getFullYear(), m: new Date().getMonth() + 1, d: new Date().getDate() });
  const [calHolFilter, setCalHolFilter] = useState("all");
  const [calShowMonth, setCalShowMonth] = useState(false);

  useEffect(() => {
    const now = new Date();
    const birthDate = new Date(A.year, A.month - 1, A.day);
    let a = now.getFullYear() - A.year;
    if (now < new Date(now.getFullYear(), A.month - 1, A.day)) a--;
    setAge(Math.max(0, a));
  }, [A.year, A.month, A.day]);

  useEffect(() => {
    if (!anime || !headerRef.current) return;
    anime({
      targets: headerRef.current.querySelectorAll(".anim"),
      opacity: [0, 1], translateY: [-16, 0],
      delay: anime.stagger(70), duration: 650, easing: "easeOutQuart"
    });
  }, [anime]);

  const compute = useCallback(async () => {
    setLoading(true);
    try {
      const birthPayload = toUtcBirthPayload(A);
      const comparisonBirth = syn ? toUtcBirthPayload(B) : null;
      const req = { 
        birth: birthPayload, 
        age, 
        harmonic_n: n, 
        phi_cycle_length: 30,
        comparison_birth: comparisonBirth
      };
      const r = await fetch(`${BACKEND_URL}/full-analysis`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(req),
      });
      if (!r.ok) throw new Error(`Backend /full-analysis ${r.status}`);
      const data = await r.json();

      const jd = data.jd;
      const trop = flattenPlanetMap(data.tropical);
      const sid = flattenPlanetMap(data.sidereal);
      const houses = mapBackendHouses(data.houses);
      const ay = ayanamsa(jd);
      const sidHouses = Object.fromEntries(Object.entries(houses).map(([k, v]) => [k, norm(v - ay)]));
      const aspects = (data.aspects || []).map(backendAspectToUi);
      const prog = data.progressions?.tropical ? flattenPlanetMap(data.progressions.tropical) : progChart(jd, age);
      const srJD = data.solar_return?.jd ?? findSolarReturn(trop.Sun, A.year + 1);
      const srPos = data.solar_return?.tropical ? flattenPlanetMap(data.solar_return.tropical) : (srJD ? allPlanets(srJD) : null);
      const harm = data.harmonic?.positions ? flattenPlanetMap(data.harmonic.positions) : harmonic(trop, n);
      const cn = chineseCycle(A.year, A.month, A.day);
      const phi = data.phi ? { state: data.phi.phi_state, mult: Number(data.phi.multiplier || 1).toFixed(4), phase: Number(data.phi.cycle_position || 0).toFixed(4) } : phiEngine(A.day, 30);
      const el = data.element_modality?.elements || elemMod(trop).el;
      const mod = data.element_modality?.modalities || elemMod(trop).mod;
      const tJD = julianDay(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate(), 12);
      const trPos = allPlanets(tJD);
      const trAsp = calcAspects({ ...trop, ...Object.fromEntries(Object.entries(trPos).map(([k, v]) => [`T_${k}`, v])) });

      let synR = null;
      if (syn && data.synastry) {
        const synData = data.synastry;
        const tB = flattenPlanetMap(synData.composite?.positions ? {} : (data.input?.comparison_birth ? {} : {})); // Placeholder check
        // Actually, the backend synastry result in data.synastry contains:
        // aspects (cross-chart), score, composite {positions, houses, aspects}
        synR = {
          aspects: (synData.aspects || []).map(backendAspectToUi),
          score: synData.score || { harmony: 0, tension: 0 },
          composite: synData.composite ? {
            positions: flattenPlanetMap(synData.composite.positions),
            houses: mapBackendHouses(synData.composite.houses),
            aspects: (synData.composite.aspects || []).map(backendAspectToUi)
          } : null
        };
      }
      
      // Local fallback for Synastry if B is needed but backend failed or didn't return it
      if (syn && !synR) {
        const hourB24 = to24Hour(B.hour, B.meridiem);
        const jd2 = julianDay(B.year, B.month, B.day, hourB24 - B.tz + B.min / 60);
        const tB = allPlanets(jd2);
        const hB = calcHouses(jd2, B.lat, B.lon);
        synR = {
          positions: tB,
          houses: hB,
          aspects: calcAspects({ ...trop, ...Object.fromEntries(Object.entries(tB).map(([k, v]) => [`B_${k}`, v])) }),
        };
      }

      setRes({ jd, trop, sid, houses, sidHouses, aspects, prog, srJD, srPos, harm, cn, phi, el, mod, trPos, trAsp, synR });
    } catch (err) {
      console.warn("Backend compute failed, using frontend fallback:", err);
      const hourA24 = to24Hour(A.hour, A.meridiem);
      const jd = julianDay(A.year, A.month, A.day, hourA24 - A.tz + A.min / 60);
      const trop = allPlanets(jd);
      const ay = ayanamsa(jd);
      const sid = Object.fromEntries(Object.entries(trop).map(([k, v]) => [k, norm(v - ay)]));
      const houses = calcHouses(jd, A.lat, A.lon);
      const sidHouses = Object.fromEntries(Object.entries(houses).map(([k, v]) => [k, norm(v - ay)]));
      const aspects = calcAspects(trop);
      const prog = progChart(jd, age);
      const srJD = findSolarReturn(trop.Sun, A.year + 1);
      const srPos = srJD ? allPlanets(srJD) : null;
      const harm = harmonic(trop, n);
      const cn = chineseCycle(A.year, A.month, A.day);
      const phi = phiEngine(A.day, 30);
      const { el, mod } = elemMod(trop);
      const tJD = julianDay(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate(), 12);
      const trPos = allPlanets(tJD);
      const trAsp = calcAspects({ ...trop, ...Object.fromEntries(Object.entries(trPos).map(([k, v]) => [`T_${k}`, v])) });
      let synR = null;
      if (syn) {
        const hourB24 = to24Hour(B.hour, B.meridiem);
        const jd2 = julianDay(B.year, B.month, B.day, hourB24 - B.tz + B.min / 60);
        const tB = allPlanets(jd2);
        const hB = calcHouses(jd2, B.lat, B.lon);
        synR = {
          positions: tB, houses: hB,
          aspects: calcAspects({ ...trop, ...Object.fromEntries(Object.entries(tB).map(([k, v]) => [`B_${k}`, v])) })
        };
      }
      setRes({ jd, trop, sid, houses, sidHouses, aspects, prog, srJD, srPos, harm, cn, phi, el, mod, trPos, trAsp, synR });
    } finally {
      setLoading(false);
    }
  }, [A, B, age, n, syn]);

  const TABS = [
    { id: "natal", label: "☉ Summary" },
    { id: "today", label: "☀ Today" },
    { id: "deep", label: "✦ Deep Analysis" },
    { id: "wheel", label: "⊙ Wheel" },
    { id: "aspects", label: "⚹ Connections" },
    { id: "progressions", label: "→ Timing" },
    { id: "harmonics", label: "∞ Hidden Patterns" },
    { id: "synastry", label: "◈ Contacts" },
    { id: "chinese", label: "☯ Chinese Year" },
    { id: "vedic", label: "🪔 Vedic" },
    { id: "numerology", label: "🔢 Numerology" },
    { id: "grammatology", label: "𐤀 Grammatology" },
    { id: "tarot", label: "🎴 Tarot Pull" },
    { id: "calendar", label: "📅 Sacred Calendar" },
    { id: "education", label: "📖 How It Works" },
  ];

  // Two-column grid for desktop; auto-stacks to one column under 720px viewport.
  const grid2 = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))",
    gap: 16,
  };

  const [cwInput, setCwInput] = useState("");
  const [cwResult, setCwResult] = useState(null);

  return (
    <div style={{ minHeight: "100vh", background: M3.surfaceDim, color: M3.onSurface, position: "relative", overflowX: "hidden" }}>

      <StarCanvas />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 1440, margin: "0 auto", padding: "0 16px 56px" }}>

        <Header />

        <div style={{ paddingTop: 28, display: "flex", flexDirection: "column", gap: 20 }}>

          <InputPanel A={A} setA={setA} B={B} setB={setB} syn={syn} setSyn={setSyn} compute={compute} loading={loading} />

          {res && (
            <>
              <div style={{
                fontFamily: "'Share Tech Mono', monospace", fontSize: "0.66rem",
                color: M3.secondary, padding: "10px 16px",
                background: M3.surfaceContainer, borderRadius: 10,
                border: `1px solid ${M3.outlineVariant}`, letterSpacing: "0.06em",
                display: "flex", flexWrap: "wrap", gap: "4px 16px"
              }}>
                <span>Rising Sign <span style={{ color: SIGN_COL[zodSign(res.houses.ASC)] }}>{zodSign(res.houses.ASC)}</span> <span style={{ color: M3.outlineVariant }}>({norm(res.houses.ASC).toFixed(1)}°)</span></span>
                <span>Career Point <span style={{ color: SIGN_COL[zodSign(res.houses.MC)] }}>{zodSign(res.houses.MC)}</span> <span style={{ color: M3.outlineVariant }}>({norm(res.houses.MC).toFixed(1)}°)</span></span>
                <span style={{ color: M3.outlineVariant }}>Vedic offset {ayanamsa(res.jd).toFixed(1)}°</span>
              </div>

              <TabBar tabs={TABS} active={tab} onChange={setTab} />

              <TabContent id={tab}>
                <Suspense fallback={<div style={{padding:"40px",textAlign:"center",color:M3.onSurfaceVariant,opacity:.7}}>Loading…</div>}>

                {tab === "wheel" && (
                  <ErrorBoundary><WheelTab ctx={{ M3, A, res, Card, wheelMode, setWheelMode, WheelWithTooltip, ChineseWheelWithTooltip, ayanamsa, zodSign, P_COL, P_SYM, SIGN_COL, ANIMAL_INFO }} /></ErrorBoundary>
                )}
                {tab === "aspects" && (
                  <ErrorBoundary><AspectsTab ctx={{ M3, RAD, SIGNS, SIGN_COL, SIGN_SYM, ASPECTS, ASP_EXPLAIN, P_COL, P_SYM, res, Card, WheelWithTooltip, AspectTable }} /></ErrorBoundary>
                )}
                {tab === "progressions" && (
                  <ErrorBoundary><ProgressionsTab ctx={{ M3, age, res, zodSign, SIGN_COL, SIGN_INFO, P_COL, P_SYM, grid2, calcAspects, Card, PlanetTable, WheelWithTooltip, AspectTable }} /></ErrorBoundary>
                )}
                {tab === "today" && (
                  <ErrorBoundary><TodayTab ctx={{ M3, res, norm, ASPECTS, ASP_EXPLAIN, P_COL, P_SYM, zodSign, zodDeg, Card }} /></ErrorBoundary>
                )}
                {tab === "synastry" && (
                  <ErrorBoundary><SynastryTab ctx={{ M3, res, grid2, P_COL, P_SYM, P_ROLE, Card, WheelWithTooltip, AspectTable }} /></ErrorBoundary>
                )}
                {tab === "chinese" && (
                  <ErrorBoundary>
                    <ChineseTab
                      ctx={{
                        M3, A, res, grid2, ANIMAL_INFO, CN_EL_INFO, POLARITY_INFO, chineseCycle, Card, ChineseWheelWithTooltip,
                        CHINESE_ASTRO_INTRO, WUXING_PROFILES, WUXING_GENERATING, WUXING_CONTROLLING,
                        YEAR_END_STEM_POLARITY, CHINESE_ZODIAC_EXTENDED, CHINESE_TRANSLATION_NOTES,
                        ZODIAC_TRINES, ZI_WEI_INFO, ZI_WEI_PALACES_SEQUENCES,
                        ZI_WEI_MAJOR_STARS, TWELVE_HEAVENLY_GENERALS,
                      }}
                    />
                  </ErrorBoundary>
                )}

                {tab === "natal" && (
                  <ErrorBoundary><NatalTab ctx={{ M3, res, grid2, zodSign, SIGN_COL, SIGN_SYM, HOUSE_AREA, HOUSE_INFO, P_COL, P_SYM, Card, PlanetTable, WheelWithTooltip, ProfilePanel, moonPhase }} /></ErrorBoundary>
                )}
                {tab === "vedic" && (
                  <ErrorBoundary><VedicTab ctx={{ M3, res, Card }} /></ErrorBoundary>
                )}
                {tab === "tarot" && (
                  <ErrorBoundary><TarotTab ctx={{ M3, res, zodSign }} /></ErrorBoundary>
                )}

                {false && tab === "natal-old" && (
                  <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    <Card style={{ background: `linear-gradient(135deg,${M3.primaryContainer}88,${M3.surfaceContainer})`, borderColor: M3.outline }}>
                      <div style={{ fontFamily: "Cinzel,serif", fontSize: "1rem", color: M3.primary, marginBottom: 8 }}>The Natal Figure — The Sky at the Recorded Moment</div>
                      <p style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.82rem", lineHeight: 1.65, color: M3.onSurface, margin: 0 }}>
                        At the moment entered, every body held a specific longitude in the zodiac. This page states that figure. The <strong>planet table</strong> lists each position in both the tropical frame (measured from the equinox) and the sidereal frame (measured from the fixed stars). The <strong>wheel</strong> plots the same numbers — the outer ring carries the signs, the inner lines cut the twelve houses, and each glyph sits at its computed longitude.
                      </p>
                      <p style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.82rem", lineHeight: 1.65, color: M3.onSurface, marginTop: 8 }}>
                        <strong>What the tradition attributes:</strong> each body carries a domain — ☉ the Sun is the light and the centre, ☽ the Moon the receptive and the changing, ☿ Mercury the exchange of signs, ♀ Venus the attractive principle, ♂ Mars the cutting and initiating force. The sign inflects the mode in which that principle operates; the house names the field in which it is read.
                      </p>
                    </Card>
                    <div style={grid2}>
                      <Card title="☉ Computed Positions — Tropical & Sidereal">
                        <PlanetTable positions={res.trop} jd={res.jd} siderealPositions={res.sid} />
                      </Card>
                      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                        <Card title="⊙ The Natal Wheel">
                          <div style={{ display: "flex", justifyContent: "center" }}>
                            <WheelWithTooltip positions={res.trop} houses={res.houses} size={340} id="natal" />
                          </div>
                        </Card>
                        <Card title="⌂ The Twelve Houses — Fields of the Figure">
                          <p style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.74rem", lineHeight: 1.55, color: M3.onSurfaceVariant, margin: "0 0 12px" }}>
                            The houses are twelve fields cut from the horizon and meridian. The sign on the cusp inflects the field; bodies falling inside it are read as tenanting that field. These cusps are Porphyry.
                          </p>
                          {(() => {
                            const HOUSE_DESC = [
                              "The 1st house is the ground of the body and the visible person. Hellenistic sources name it the Helm.",
                              "The 2nd house is the ground of substance and movable goods. The Hellenistic tradition calls it the Gate of Hades.",
                              "The 3rd house is the ground of the near journey, the sibling, and the message. The tradition names it the Goddess.",
                              "The 4th house is the ground of the root, the household, and the end of the matter. Ptolemaic sources treat it as the foundation.",
                              "The 5th house is the ground of issue, play, and made things. The tradition names it Good Fortune.",
                              "The 6th house is the ground of labour, illness, and the servant. The tradition names it Bad Fortune.",
                              "The 7th house is the ground of the one-to-one relation, and of the open adversary.",
                              "The 8th house is the ground of the shared substance, of death, and of what is inherited.",
                              "The 9th house is the ground of the far journey, of doctrine, and of the divine. The tradition names it God.",
                              "The 10th house is the ground of the culminating point, of office, and of the public name.",
                              "The 11th house is the ground of the company, the alliance, and the benefactor. The tradition names it Good Spirit.",
                              "The 12th house is the ground of confinement, of the hidden, and of what works unseen. The tradition names it Bad Spirit.",
                            ];
                            const PLANET_IN_HOUSE = {
                              Sun: "the light is placed in this field; the tradition reads the centre of the figure as sitting here",
                              Moon: "the receptive body is placed in this field; the tradition reads nourishment and change through it",
                              Mercury: "the messenger is placed in this field; the tradition reads exchange, speech and learning through it",
                              Venus: "the attractive principle is placed in this field; the tradition reads value and concord through it",
                              Mars: "the cutting force is placed in this field; the tradition reads action and severance through it",
                              Jupiter: "the greater benefic is placed in this field; the tradition reads increase and scope through it",
                              Saturn: "the greater malefic is placed in this field; the tradition reads limit, weight and duration through it",
                              Uranus: "a modern body is placed in this field; twentieth-century practice reads rupture and sudden reversal through it",
                              Neptune: "a modern body is placed in this field; twentieth-century practice reads dissolution and image through it",
                              Pluto: "a modern body is placed in this field; twentieth-century practice reads compulsion and reduction through it",
                              Node: "the lunar node falls in this field; sources disagree sharply on what a node signifies, and the disagreement is old",
                              Lilith: "the mean lunar apogee falls in this field; the point is a modern construction with no classical warrant",
                              Chiron: "Chiron falls in this field; the body was discovered in 1977 and its attributions are recent and contested",
                            };
                            const housePlanets = Array.from({ length: 12 }, () => []);
                            const allPlanets = ["Sun", "Moon", "Mercury", "Venus", "Mars", "Jupiter", "Saturn", "Uranus", "Neptune", "Pluto", "Node", "Lilith", "Chiron"];
                            allPlanets.forEach(p => {
                              if (res.trop[p] == null) return;
                              const lon = res.trop[p];
                              for (let h = 0; h < 12; h++) {
                                const cusp = res.houses[h + 1];
                                const next = res.houses[((h + 1) % 12) + 1];
                                const inHouse = next > cusp ? (lon >= cusp && lon < next) : (lon >= cusp || lon < next);
                                if (inHouse) { housePlanets[h].push(p); break; }
                              }
                            });
                            return Array.from({ length: 12 }, (_, i) => {
                              const h = res.houses[i + 1]; const sign = zodSign(h); const pls = housePlanets[i];
                              return (
                                <div key={i} style={{ padding: "10px 14px", marginBottom: 6, borderRadius: 10, background: SIGN_COL[sign] + "08", borderLeft: `3px solid ${SIGN_COL[sign]}33` }}>
                                  <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: pls.length ? 4 : 0 }}>
                                    <span style={{ color: M3.secondary, fontFamily: "'Share Tech Mono',monospace", fontSize: "0.72rem", fontWeight: "700", minWidth: 22 }}>{i + 1}.</span>
                                    <span style={{ color: SIGN_COL[sign], fontFamily: "'Share Tech Mono',monospace", fontSize: "0.72rem", fontWeight: "700" }}>{sign}</span>
                                    <span style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.68rem", fontStyle: "italic", color: M3.onSurfaceVariant }}>{HOUSE_AREA[i]}</span>
                                    {pls.length > 0 && <span style={{ marginLeft: "auto", fontFamily: "'Share Tech Mono',monospace", fontSize: "0.62rem", color: M3.primary }}>{pls.map(p => P_SYM[p] || p).join(" ")}</span>}
                                  </div>
                                  <p style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.68rem", lineHeight: 1.5, color: M3.onSurfaceVariant, margin: 0 }}>{HOUSE_DESC[i]}</p>
                                  {pls.length > 0 && pls.map(p => (
                                    <p key={p} style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.66rem", lineHeight: 1.45, color: M3.onSurface, margin: "4px 0 0", paddingLeft: 8, borderLeft: `2px solid ${P_COL[p] || M3.primary}44` }}>
                                      <strong style={{ color: P_COL[p] || M3.primary }}>{P_SYM[p]} {p}</strong> — {PLANET_IN_HOUSE[p] || "tenanting this field"}.
                                    </p>
                                  ))}
                                  {pls.length === 0 && <p style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.64rem", lineHeight: 1.4, color: M3.outlineVariant, margin: "4px 0 0", fontStyle: "italic" }}>No body falls in this field. The tradition then reads it through the sign on the cusp and through the ruler of that sign, wherever it stands.</p>}
                                </div>
                              );
                            });
                          })()}
                        </Card>
                      </div>
                    </div>
                    <Card>
                      <ProfilePanel trop={res.trop} houses={res.houses} />
                    </Card>
                  </div>
                )}

                {false && tab === "deep-old" && (() => {
                  const sunSign = zodSign(res.trop.Sun);
                  const moonSign = zodSign(res.trop.Moon);
                  const ascSign = zodSign(res.houses.ASC);
                  const venSign = zodSign(res.trop.Venus);
                  const marSign = zodSign(res.trop.Mars);
                  const merSign = zodSign(res.trop.Mercury);
                  const jupSign = zodSign(res.trop.Jupiter);
                  const satSign = zodSign(res.trop.Saturn);
                  const SI = SIGN_INFO;

                  const domEl = Object.entries(res.el).sort(([, a], [, b]) => b - a)[0];
                  const domMod = Object.entries(res.mod).sort(([, a], [, b]) => b - a)[0];
                  const modLabel = { Cardinal: "Cardinal — the initiating mode", Fixed: "Fixed — the sustaining mode", Mutable: "Mutable — the adapting mode" };

                  const aspects = res.aspects;
                  const hardAsp = aspects.filter(a => ["Square", "Opposition"].includes(a.name));
                  const softAsp = aspects.filter(a => ["Trine", "Sextile", "Conjunction"].includes(a.name));

                  return (
                    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

                      <Card style={{ background: `linear-gradient(135deg,${M3.primaryContainer}88,${M3.surfaceContainer})`, borderColor: M3.outline }}>
                        <div style={{ fontFamily: "Cinzel,serif", fontSize: "1rem", color: M3.primary, marginBottom: 8 }}>Deep Reading — What the Traditions Attribute to This Figure</div>
                        <p style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.82rem", lineHeight: 1.65, color: M3.onSurface, margin: 0 }}>
                          This page takes each major factor of the figure and states what has been attributed to it. It covers the <strong>solar placement</strong> (the light and its sign), the <strong>lunar placement</strong> (the receptive body and its sign), the <strong>rising sign</strong> (the degree on the eastern horizon), and each of the remaining bodies. Below that stand the element and modality counts, the harmonic layers, and a summary of the whole figure. Attributions are named, not resolved; where sources disagree, the disagreement is left standing.
                        </p>
                      </Card>

                      <Card title="☀ The Solar Placement — The Light and Its Sign">
                        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                          <div style={{ width: 52, height: 52, borderRadius: "50%", background: SIGN_COL[sunSign] + "22", border: `2px solid ${SIGN_COL[sunSign]}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <span style={{ fontSize: "1.6rem" }}>{SI[sunSign].emoji}</span>
                          </div>
                          <div>
                            <div style={{ color: SIGN_COL[sunSign], fontFamily: "'Share Tech Mono',monospace", fontSize: "0.82rem", fontWeight: "700" }}>Sun in {sunSign}</div>
                            <div style={{ color: M3.onSurfaceVariant, fontFamily: "'Share Tech Mono',monospace", fontSize: "0.65rem" }}>{SI[sunSign].element} · {SI[sunSign].mode} · ruled by {SI[sunSign].ruler}</div>
                            {SI[sunSign].hebrew && <div style={{ color: M3.outlineVariant, fontFamily: "'Share Tech Mono',monospace", fontSize: "0.6rem", marginTop: 2 }}>{SI[sunSign].emoji} ← {SI[sunSign].letterName} ({SI[sunSign].hebrew}) ← {SI[sunSign].phoenician} ← {SI[sunSign].hiero} — {SI[sunSign].letterMeaning.split("—")[1]?.trim() || ""}</div>}
                          </div>
                        </div>
                        <p style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.82rem", lineHeight: 1.75, color: M3.onSurface, margin: 0 }}>{SOLAR_DEEP[sunSign]?.plain}</p>
                      </Card>

                      <Card title="🌙 The Lunar Placement — The Receptive Body and Its Sign">
                        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                          <div style={{ width: 52, height: 52, borderRadius: "50%", background: SIGN_COL[moonSign] + "22", border: `2px solid ${SIGN_COL[moonSign]}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <span style={{ fontSize: "1.6rem" }}>{SI[moonSign].emoji}</span>
                          </div>
                          <div>
                            <div style={{ color: SIGN_COL[moonSign], fontFamily: "'Share Tech Mono',monospace", fontSize: "0.82rem", fontWeight: "700" }}>Moon in {moonSign}</div>
                            <div style={{ color: M3.onSurfaceVariant, fontFamily: "'Share Tech Mono',monospace", fontSize: "0.65rem" }}>{SI[moonSign].element} · {SI[moonSign].mode} · ruled by {SI[moonSign].ruler}</div>
                            {SI[moonSign].hebrew && <div style={{ color: M3.outlineVariant, fontFamily: "'Share Tech Mono',monospace", fontSize: "0.6rem", marginTop: 2 }}>{SI[moonSign].emoji} ← {SI[moonSign].letterName} ({SI[moonSign].hebrew}) ← {SI[moonSign].phoenician} ← {SI[moonSign].hiero} — {SI[moonSign].letterMeaning.split("—")[1]?.trim() || ""}</div>}
                          </div>
                        </div>
                        <p style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.82rem", lineHeight: 1.75, color: M3.onSurface, margin: 0 }}>{LUNAR_DEEP[moonSign]?.plain}</p>
                      </Card>

                      <Card title="🌅 The Ascendant — The Degree on the Eastern Horizon">
                        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                          <div style={{ width: 52, height: 52, borderRadius: "50%", background: SIGN_COL[ascSign] + "22", border: `2px solid ${SIGN_COL[ascSign]}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <span style={{ fontSize: "1.6rem" }}>{SI[ascSign].emoji}</span>
                          </div>
                          <div>
                            <div style={{ color: SIGN_COL[ascSign], fontFamily: "'Share Tech Mono',monospace", fontSize: "0.82rem", fontWeight: "700" }}>{ascSign} Rising</div>
                            <div style={{ color: M3.onSurfaceVariant, fontFamily: "'Share Tech Mono',monospace", fontSize: "0.65rem" }}>The ascendant — the sign rising on the eastern horizon at the recorded moment</div>
                            {SI[ascSign].hebrew && <div style={{ color: M3.outlineVariant, fontFamily: "'Share Tech Mono',monospace", fontSize: "0.6rem", marginTop: 2 }}>{SI[ascSign].emoji} ← {SI[ascSign].letterName} ({SI[ascSign].hebrew}) ← {SI[ascSign].phoenician} ← {SI[ascSign].hiero} — {SI[ascSign].letterMeaning.split("—")[1]?.trim() || ""}</div>}
                          </div>
                        </div>
                        <p style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.82rem", lineHeight: 1.75, color: M3.onSurface, margin: 0 }}>
                          The ascendant is the point of the ecliptic rising at the eastern horizon at the recorded instant. With <strong style={{ color: SIGN_COL[ascSign] }}>{ascSign}</strong> on that point, the tradition reads the figure through {SI[ascSign].plain.split(".")[0].toLowerCase()}. Hellenistic practice makes the ascendant the first house and the ruler of its sign the lord of the whole figure. Note that the ascendant depends on the birth time more sharply than any longitude does: four minutes of clock error moves it about one degree.
                        </p>
                        {RISING_SHADOW[ascSign] && (
                          <div style={{ marginTop: 14, padding: "12px 16px", borderRadius: 10, background: "#ff525208", border: "1px solid #ff525218" }}>
                            <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.64rem", color: "#ff8a50", letterSpacing: "0.1em", marginBottom: 6 }}>ATTRIBUTED</div>
                            <p style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.78rem", lineHeight: 1.65, color: M3.onSurface, margin: 0 }}>{RISING_SHADOW[ascSign].shadow}</p>
                            <div style={{ marginTop: 10, padding: "10px 14px", borderRadius: 8, background: "#69ff8e08", border: "1px solid #69ff8e18" }}>
                              <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.62rem", color: "#69ff8e", letterSpacing: "0.1em", marginBottom: 4 }}>STRUCTURE</div>
                              <p style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.76rem", lineHeight: 1.6, color: M3.onSurface, margin: 0 }}>{RISING_SHADOW[ascSign].growth}</p>
                            </div>
                          </div>
                        )}
                      </Card>

                      {(() => {
                        const loveStyle = {Fire:"bold gestures and enthusiasm",Earth:"practical devotion and reliability",Air:"words, ideas and intellectual connection",Water:"emotional depth and intuitive care"};
                        const angerStyle = {Fire:"direct confrontation, quick to ignite and quick to subside",Earth:"slow-burning persistence rather than sudden discharge",Air:"argument and strategic detachment",Water:"indirect expression, withdrawal and long memory"};
                        return (
                          <div style={grid2}>
                            <Card title="💖 Venus — The Attractive Principle">
                              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                                <span style={{ color: P_COL.Venus, fontSize: "1.4rem" }}>♀</span>
                                <span style={{ color: SIGN_COL[venSign], fontFamily: "'Share Tech Mono',monospace", fontWeight: "700" }}>Venus in {venSign}</span>
                              </div>
                              <p style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.78rem", lineHeight: 1.65, color: M3.onSurface, margin: 0 }}>
                                Venus is the lesser benefic and the principle of attraction — beauty, value, concord, and what is held desirable. In <strong style={{ color: SIGN_COL[venSign] }}>{venSign}</strong>, the tradition inflects that principle as {SI[venSign].plain.split(".")[0].toLowerCase()}. The sign is {SI[venSign].element.toLowerCase()} and {SI[venSign].mode.toLowerCase()}, and Venus placed here is read as expressing concord through {loveStyle[SI[venSign].element]}.
                              </p>
                              {VENUS_SHADOW[venSign] && (
                                <div style={{ marginTop: 10, padding: "10px 14px", borderRadius: 8, background: "#ff525208", border: "1px solid #ff525218" }}>
                                  <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.6rem", color: "#ff8a50", letterSpacing: "0.1em", marginBottom: 4 }}>ATTRIBUTED</div>
                                  <p style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.74rem", lineHeight: 1.55, color: M3.onSurface, margin: 0 }}>{VENUS_SHADOW[venSign].shadow}</p>
                                </div>
                              )}
                              {VENUS_SHADOW[venSign] && (
                                <div style={{ marginTop: 6, padding: "8px 14px", borderRadius: 8, background: "#69ff8e08", border: "1px solid #69ff8e18" }}>
                                  <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.6rem", color: "#69ff8e", letterSpacing: "0.1em", marginBottom: 4 }}>STRUCTURE</div>
                                  <p style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.72rem", lineHeight: 1.5, color: M3.onSurface, margin: 0 }}>{VENUS_SHADOW[venSign].growth}</p>
                                </div>
                              )}
                            </Card>
                            <Card title="🔥 Mars — The Cutting Force">
                              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                                <span style={{ color: P_COL.Mars, fontSize: "1.4rem" }}>♂</span>
                                <span style={{ color: SIGN_COL[marSign], fontFamily: "'Share Tech Mono',monospace", fontWeight: "700" }}>Mars in {marSign}</span>
                              </div>
                              <p style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.78rem", lineHeight: 1.65, color: M3.onSurface, margin: 0 }}>
                                Mars is the lesser malefic and the principle of severance — pursuit, conflict, appetite, and the cut. In <strong style={{ color: SIGN_COL[marSign] }}>{marSign}</strong>, the tradition inflects that force as {SI[marSign].plain.split(".")[0].toLowerCase()}. Under provocation, Mars in a {SI[marSign].element.toLowerCase()} sign is read as acting through {angerStyle[SI[marSign].element]}.
                              </p>
                              {MARS_SHADOW[marSign] && (
                                <div style={{ marginTop: 10, padding: "10px 14px", borderRadius: 8, background: "#ff525208", border: "1px solid #ff525218" }}>
                                  <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.6rem", color: "#ff8a50", letterSpacing: "0.1em", marginBottom: 4 }}>ATTRIBUTED</div>
                                  <p style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.74rem", lineHeight: 1.55, color: M3.onSurface, margin: 0 }}>{MARS_SHADOW[marSign].shadow}</p>
                                </div>
                              )}
                              {MARS_SHADOW[marSign] && (
                                <div style={{ marginTop: 6, padding: "8px 14px", borderRadius: 8, background: "#69ff8e08", border: "1px solid #69ff8e18" }}>
                                  <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.6rem", color: "#69ff8e", letterSpacing: "0.1em", marginBottom: 4 }}>STRUCTURE</div>
                                  <p style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.72rem", lineHeight: 1.5, color: M3.onSurface, margin: 0 }}>{MARS_SHADOW[marSign].growth}</p>
                                </div>
                              )}
                            </Card>
                          </div>
                        );
                      })()}

                      {(() => {
                        const learnStyle = {Fire:"doing and experimenting, by intuitive leaps",Earth:"practical application, step by step and evidence-led",Air:"discussion and abstraction, by pattern and analogy",Water:"immersion and association, by feel rather than sequence"};
                        const commStyle = {Cardinal:"initiating, coming directly to the point",Fixed:"thorough and persistent, developing an idea fully before releasing it",Mutable:"adaptive, revising in the act of speaking"};
                        return (
                          <Card title="🧠 Mercury — The Messenger">
                            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                              <span style={{ color: P_COL.Mercury, fontSize: "1.3rem" }}>☿</span>
                              <span style={{ color: SIGN_COL[merSign], fontFamily: "'Share Tech Mono',monospace", fontWeight: "700" }}>Mercury in {merSign}</span>
                            </div>
                            <p style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.8rem", lineHeight: 1.7, color: M3.onSurface, margin: 0 }}>
                              Mercury is the neutral body and the principle of exchange — sign, speech, reckoning, and the crossing between. In <strong style={{ color: SIGN_COL[merSign] }}>{merSign}</strong>, the tradition inflects that principle as {SI[merSign].plain.split(".")[0].toLowerCase()}. A {SI[merSign].element.toLowerCase()} sign is read as taking knowledge through {learnStyle[SI[merSign].element]}; a {SI[merSign].mode.toLowerCase()} sign as delivering it {commStyle[SI[merSign].mode]}.
                            </p>
                            {MERCURY_SHADOW[merSign] && (
                              <div style={{ marginTop: 12, padding: "10px 14px", borderRadius: 8, background: "#ff525208", border: "1px solid #ff525218" }}>
                                <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.62rem", color: "#ff8a50", letterSpacing: "0.1em", marginBottom: 4 }}>ATTRIBUTED</div>
                                <p style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.76rem", lineHeight: 1.6, color: M3.onSurface, margin: 0 }}>{MERCURY_SHADOW[merSign].shadow}</p>
                              </div>
                            )}
                            {MERCURY_SHADOW[merSign] && (
                              <div style={{ marginTop: 6, padding: "8px 14px", borderRadius: 8, background: "#69ff8e08", border: "1px solid #69ff8e18" }}>
                                <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.62rem", color: "#69ff8e", letterSpacing: "0.1em", marginBottom: 4 }}>STRUCTURE</div>
                                <p style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.74rem", lineHeight: 1.55, color: M3.onSurface, margin: 0 }}>{MERCURY_SHADOW[merSign].growth}</p>
                              </div>
                            )}
                          </Card>
                        );
                      })()}

                      <div style={grid2}>
                        <Card title="♃ Jupiter — The Greater Benefic">
                          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                            <span style={{ color: P_COL.Jupiter, fontSize: "1.4rem" }}>♃</span>
                            <span style={{ color: SIGN_COL[jupSign], fontFamily: "'Share Tech Mono',monospace", fontWeight: "700" }}>Jupiter in {jupSign}</span>
                          </div>
                          <p style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.78rem", lineHeight: 1.65, color: M3.onSurface, margin: 0 }}>
                            {JUPITER_DEEP[jupSign]?.plain}
                          </p>
                        </Card>
                        <Card title="♄ Saturn — The Greater Malefic">
                          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                            <span style={{ color: P_COL.Saturn, fontSize: "1.4rem" }}>♄</span>
                            <span style={{ color: SIGN_COL[satSign], fontFamily: "'Share Tech Mono',monospace", fontWeight: "700" }}>Saturn in {satSign}</span>
                          </div>
                          <p style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.78rem", lineHeight: 1.65, color: M3.onSurface, margin: 0 }}>
                            {SATURN_DEEP[satSign]?.plain}
                          </p>
                        </Card>
                      </div>

                      <Card title="⚖ Soft and Hard Contacts">
                        <div style={{ marginBottom: 16 }}>
                          <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.66rem", color: "#69ff8e", letterSpacing: "0.1em", marginBottom: 10 }}>SOFT CONTACTS ({softAsp.length})</div>
                          {softAsp.slice(0, 5).map((a, i) => {
                            const r0 = (P_ROLE[a.p1] || a.p1).toLowerCase(), r1 = (P_ROLE[a.p2] || a.p2).toLowerCase();
                            const k1 = `${P_ROLE[a.p1]}+${P_ROLE[a.p2]}`, k2 = `${P_ROLE[a.p2]}+${P_ROLE[a.p1]}`;
                            const pi = PAIR_INSIGHT[k1] || PAIR_INSIGHT[k2] || "";
                            const giftAdvice = a.name === "Conjunction" ? `Because these two forces are fused, they amplify each other powerfully. The self-development opportunity: consciously direct this combined energy rather than letting it run on autopilot.`
                              : a.name === "Trine" ? `The trine is 120°, a third of the circle, and both signs share an element.`
                                : `The sextile is 60°, a sixth of the circle, and carries the narrowest orb of the soft aspects here.`;
                            return (
                              <div key={i} style={{ padding: "10px 14px", marginBottom: 8, borderRadius: 10, background: a.col + "0e", borderLeft: `3px solid ${a.col}` }}>
                                <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.72rem", color: M3.onSurface }}>
                                  <span style={{ color: P_COL[a.p1] }}>{P_SYM[a.p1]} {a.p1}</span>
                                  <span style={{ color: a.col, margin: "0 6px" }}>{a.sym} {a.name}</span>
                                  <span style={{ color: P_COL[a.p2] }}>{P_SYM[a.p2]} {a.p2}</span>
                                </div>
                                <p style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.76rem", lineHeight: 1.6, color: M3.onSurface, margin: "6px 0 0" }}>
                                  {pi ? `${r0} and ${r1}: ${pi}` : `A soft contact between the ${r0.toLowerCase()} and ${r1.toLowerCase()} significators.`}
                                </p>
                                <p style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.72rem", lineHeight: 1.55, color: "#69ff8e", margin: "6px 0 0", fontStyle: "italic" }}>
                                  {giftAdvice}
                                </p>
                              </div>
                            );
                          })}
                        </div>
                        <div>
                          <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.66rem", color: "#ff8a50", letterSpacing: "0.1em", marginBottom: 10 }}>HARD CONTACTS ({hardAsp.length})</div>
                          {hardAsp.slice(0, 5).map((a, i) => {
                            const r0 = (P_ROLE[a.p1] || a.p1).toLowerCase(), r1 = (P_ROLE[a.p2] || a.p2).toLowerCase();
                            const k1 = `${P_ROLE[a.p1]}+${P_ROLE[a.p2]}`, k2 = `${P_ROLE[a.p2]}+${P_ROLE[a.p1]}`;
                            const pi = PAIR_INSIGHT[k1] || PAIR_INSIGHT[k2] || "";
                            const growthAdvice = a.name === "Square"
                              ? `The square is 90°; the two signs share a mode but not an element. The classical reading is friction.`
                              : a.name === "Opposition"
                                ? `The opposition is 180°, the greatest possible separation; the two signs share a mode and stand in complementary elements.`
                                : `A minor hard aspect. Its orb is narrow, so whether it registers depends on the orb policy in use.`;
                            return (
                              <div key={i} style={{ padding: "10px 14px", marginBottom: 8, borderRadius: 10, background: a.col + "0e", borderLeft: `3px solid ${a.col}` }}>
                                <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.72rem", color: M3.onSurface }}>
                                  <span style={{ color: P_COL[a.p1] }}>{P_SYM[a.p1]} {a.p1}</span>
                                  <span style={{ color: a.col, margin: "0 6px" }}>{a.sym} {a.name}</span>
                                  <span style={{ color: P_COL[a.p2] }}>{P_SYM[a.p2]} {a.p2}</span>
                                </div>
                                <p style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.76rem", lineHeight: 1.6, color: M3.onSurface, margin: "6px 0 0" }}>
                                  {pi ? `${r0} and ${r1}: ${pi}` : `A hard contact between the ${r0.toLowerCase()} and ${r1.toLowerCase()} significators.`}
                                </p>
                                <p style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.72rem", lineHeight: 1.55, color: "#ff8a50", margin: "6px 0 0", fontStyle: "italic" }}>
                                  {growthAdvice}
                                </p>
                              </div>
                            );
                          })}
                        </div>
                      </Card>

                      <Card title="△ Elemental and Modal Distribution">
                        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 14 }}>
                          {Object.entries(res.el).sort(([, a], [, b]) => b - a).map(([el, v]) => (
                            <div key={el} style={{ flex: 1, minWidth: 120, padding: "12px 14px", borderRadius: 12, background: EL_COL[el] + "11", border: `1px solid ${EL_COL[el]}33`, textAlign: "center" }}>
                              <div style={{ color: EL_COL[el], fontFamily: "'Share Tech Mono',monospace", fontSize: "1.4rem", fontWeight: "700" }}>{v}</div>
                              <div style={{ color: EL_COL[el], fontFamily: "'Share Tech Mono',monospace", fontSize: "0.72rem", fontWeight: "700" }}>{el}</div>
                            </div>
                          ))}
                        </div>
                        <p style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.8rem", lineHeight: 1.7, color: M3.onSurface, margin: 0 }}>
                        The most represented element in this figure is <strong style={{color:EL_COL[domEl[0]]}}>{domEl[0]} ({domEl[1]} bodies)</strong>. Which bodies are counted, and whether the angles count, varies between schools, so a dominance figure is partly an artefact of the counting rule.
                        </p>
                        <p style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.8rem", lineHeight: 1.7, color: M3.onSurface, marginTop: 10 }}>
                        The most represented mode is <strong style={{color:MOD_COL[domMod[0]]}}>{domMod[0]} ({domMod[1]} bodies)</strong>. The three modes divide the twelve signs by position within each season.
                        </p>
                      </Card>

                      <Card title="∞ Harmonic Layers">
                        <p style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.78rem", lineHeight: 1.6, color: M3.onSurfaceVariant, margin: "0 0 14px" }}>
                        The nth harmonic multiplies every longitude by n and reduces modulo 360, so bodies separated by 360/n degrees land together. The transform multiplies positional error along with position.
                        </p>
                        {[
                          { n: 5, title: "Creativity & Art (5th Harmonic)", col: "#64b5f6", desc: "The quintile family, 72°. Kepler argued for these divisions on harmonic grounds; they are not part of the Ptolemaic set." },
                          { n: 7, title: "Intuition & Spiritual Gifts (7th Harmonic)", col: "#ce93d8", desc: "The septile family, 51.4°. The division does not resolve into whole degrees." },
                          { n: 9, title: "Purpose & Soul Bonds (9th Harmonic)", col: "#f48fb1", desc: "The novile family, 40°, corresponding to the navamsa of Vedic practice." },
                        ].map(h => {
                          const hPos = harmonic(res.trop, h.n);
                          const hAsp = calcAspects(hPos);
                          const tight = hAsp.filter(a => a.strength > 0.7).slice(0, 3);
                          return (
                            <div key={h.n} style={{ padding: "14px 16px", marginBottom: 12, borderRadius: 12, background: h.col + "0a", border: `1px solid ${h.col}22` }}>
                              <div style={{ color: h.col, fontFamily: "'Share Tech Mono',monospace", fontSize: "0.76rem", fontWeight: "700", marginBottom: 6 }}>{h.title}</div>
                              <p style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.76rem", lineHeight: 1.6, color: M3.onSurface, margin: "0 0 8px" }}>{h.desc}</p>
                              {tight.length > 0 && (
                                <div style={{ borderTop: `1px solid ${h.col}22`, paddingTop: 8 }}>
                                  <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.62rem", color: M3.secondary, marginBottom: 4 }}>TIGHTEST GROUPINGS IN THIS CHART:</div>
                                  {tight.map((a, i) => (
                                    <div key={i} style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.72rem", color: M3.onSurfaceVariant, padding: "2px 0" }}>
                                      {P_SYM[a.p1]} {a.p1} ({P_ROLE[a.p1] || ""}) {a.sym} {P_SYM[a.p2]} {a.p2} ({P_ROLE[a.p2] || ""}) — <span style={{ color: h.col }}>{a.name}</span> at {(a.strength * 100).toFixed(0)}% strength
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </Card>

                      {(() => {
                        const sunEl = SI[sunSign].element, moonEl = SI[moonSign].element, ascEl = SI[ascSign].element;
                        const sunPlain = SI[sunSign].plain.split(". ").slice(0, 2).join(". ") + ".";
                        const moonPlain = SI[moonSign].plain.split(". ").slice(0, 2).join(". ") + ".";
                        const ascPlain = SI[ascSign].plain.split(". ").slice(0, 2).join(". ") + ".";

                        const EL_DESC = {
                          Fire: "the element of action and self-expression in the classical scheme, hot and dry",
                          Earth: "the element of the tangible and enduring, cold and dry",
                          Air: "the element of relation and abstraction, hot and moist",
                          Water: "the element of feeling and dissolution, cold and moist",
                        };
                        const MOD_DESC = {
                          Cardinal: "the mode that opens each season, associated with initiation",
                          Fixed: "the mode at the height of each season, associated with persistence",
                          Mutable: "the mode that closes each season, associated with transition",
                        };

                        const moonAsEmotional =
                          moonEl === "Fire" ? "The Moon in a fire sign: quick to register and quick to discharge in the tradition." :
                            moonEl === "Earth" ? "The Moon in an earth sign: slow to register and slow to release in the tradition." :
                              moonEl === "Air" ? "The Moon in an air sign: mediated through language and relation in the tradition." :
                                "The Moon in a water sign: the most permeable of the four placements in the tradition.";

                        const ascAsFilter =
                          ascEl === "Fire" ? "A fire sign on the ascendant; its ruler becomes ruler of the whole figure." :
                            ascEl === "Earth" ? "An earth sign on the ascendant; its ruler becomes ruler of the whole figure." :
                              ascEl === "Air" ? "An air sign on the ascendant; its ruler becomes ruler of the whole figure." :
                                "A water sign on the ascendant; its ruler becomes ruler of the whole figure.";

                        const softCount = softAsp.length, hardCount = hardAsp.length;
                        const totalAsp = softCount + hardCount;
                        const flowDesc = `${softCount} of the ${totalAsp} contacts are soft. The count is a function of the orb policy in use.`;
                        const growthDesc = `${hardCount} of the ${totalAsp} contacts are hard. Widening the orbs would add more; narrowing them would remove some.`;

                        const balanceParagraph = softCount > hardCount
                          ? `Soft contacts outnumber hard ones at the orbs in use. The split rests on the classical benefic/malefic scheme, largely abandoned in modern practice.`
                          : hardCount > softCount
                            ? `Hard contacts outnumber soft ones at the orbs in use. The split rests on the classical benefic/malefic scheme, largely abandoned in modern practice.`
                            : `Soft and hard contacts are evenly matched at the orbs in use.`;

                        const cnAnimal = res.cn ? (ANIMAL_INFO[res.cn.animal] || {}) : {};
                        const cnEl = res.cn ? (CN_EL_INFO[res.cn.element] || {}) : {};
                        const cnPol = res.cn ? (POLARITY_INFO[res.cn.polarity] || {}) : {};

                        const cnBridge = res.cn ? (() => {
                          const sameEl = SI[sunSign].element.toLowerCase() === res.cn.element.toLowerCase();
                          const westernEl = SI[sunSign].element;
                          const chineseEl = res.cn.element;
                          const animalDesc = cnAnimal.desc || "";
                          const animalTrait = (cnAnimal.trait || "").toLowerCase();
                          const animalShadow = (cnAnimal.shadow || "").toLowerCase();
                          const polLabel = res.cn.polarity === "Yang" ? "outward-moving and assertive" : "inward-moving and reflective";

                          let bridgeText = `In the Chinese system this date falls in a ${chineseEl} ${res.cn.animal} year of ${res.cn.polarity} polarity. The cycle year begins at the lunar new year, not on 1 January. `;
                          bridgeText += `The ${res.cn.animal} is known for being ${animalTrait}. ${animalDesc.split(". ").slice(0, 2).join(". ")}. `;
                          bridgeText += `The ${chineseEl} phase is paired with the ${res.cn.animal}; the tradition attributes ${(cnEl.trait || "").toLowerCase()} to that phase. `;
                          if (sameEl) {
                            bridgeText += `The Western and Chinese schemes name the same element here. They divide the sky differently, so the agreement is a coincidence of labels. `;
                          } else {
                            bridgeText += `The Western scheme gives ${westernEl} and the Chinese gives ${chineseEl}. The two use different elemental sets, four against five. `;
                          }
                          if (cnAnimal.shadow) bridgeText += ` The tradition also attributes ${animalShadow} to the ${res.cn.animal}.`;
                          return bridgeText;
                        })() : "";

                        return (<>
                          <Card title="📖 Understanding the Building Blocks">
                            <p style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.78rem", lineHeight: 1.6, color: M3.onSurfaceVariant, margin: "0 0 16px" }}>
                              What the tradition attributes to each of the principal placements in this figure.
                            </p>

                            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 12, marginBottom: 16 }}>
                              <div style={{ padding: "14px 16px", borderRadius: 12, background: SIGN_COL[sunSign] + "0a", border: `1px solid ${SIGN_COL[sunSign]}22` }}>
                                <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.66rem", color: M3.secondary, letterSpacing: "0.1em", marginBottom: 6 }}>SUN SIGN — THE SOLAR SIGNIFICATOR</div>
                                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                                  <span style={{ fontSize: "1.3rem" }}>{SI[sunSign].emoji}</span>
                                  <span style={{ color: SIGN_COL[sunSign], fontFamily: "'Share Tech Mono',monospace", fontSize: "0.82rem", fontWeight: "700" }}>{sunSign}</span>
                                </div>
                                <p style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.78rem", lineHeight: 1.6, color: M3.onSurface, margin: 0 }}>
                                  {sunPlain}
                                </p>
                              </div>

                              <div style={{ padding: "14px 16px", borderRadius: 12, background: SIGN_COL[moonSign] + "0a", border: `1px solid ${SIGN_COL[moonSign]}22` }}>
                                <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.66rem", color: M3.secondary, letterSpacing: "0.1em", marginBottom: 6 }}>MOON SIGN — THE LUNAR SIGNIFICATOR</div>
                                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                                  <span style={{ fontSize: "1.3rem" }}>{SI[moonSign].emoji}</span>
                                  <span style={{ color: SIGN_COL[moonSign], fontFamily: "'Share Tech Mono',monospace", fontSize: "0.82rem", fontWeight: "700" }}>{moonSign}</span>
                                </div>
                                <p style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.78rem", lineHeight: 1.6, color: M3.onSurface, margin: 0 }}>
                                  {moonPlain} {moonAsEmotional}
                                </p>
                              </div>

                              <div style={{ padding: "14px 16px", borderRadius: 12, background: SIGN_COL[ascSign] + "0a", border: `1px solid ${SIGN_COL[ascSign]}22` }}>
                                <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.66rem", color: M3.secondary, letterSpacing: "0.1em", marginBottom: 6 }}>RISING SIGN — THE ASCENDING DEGREE</div>
                                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                                  <span style={{ fontSize: "1.3rem" }}>{SI[ascSign].emoji}</span>
                                  <span style={{ color: SIGN_COL[ascSign], fontFamily: "'Share Tech Mono',monospace", fontSize: "0.82rem", fontWeight: "700" }}>{ascSign}</span>
                                </div>
                                <p style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.78rem", lineHeight: 1.6, color: M3.onSurface, margin: 0 }}>
                                  {ascPlain} {ascAsFilter}
                                </p>
                              </div>
                            </div>

                            <div style={{ padding: "14px 16px", borderRadius: 12, background: EL_COL[domEl[0]] + "0a", border: `1px solid ${EL_COL[domEl[0]]}22`, marginBottom: 12 }}>
                              <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.66rem", color: M3.secondary, letterSpacing: "0.1em", marginBottom: 6 }}>YOUR DOMINANT ELEMENT — {domEl[0].toUpperCase()} ({domEl[1]} OF YOUR PLANETS)</div>
                              <p style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.78rem", lineHeight: 1.6, color: M3.onSurface, margin: 0 }}>
                                The most represented element here is <strong style={{ color: EL_COL[domEl[0]] }}>{domEl[0]}</strong> — {EL_DESC[domEl[0]]}.
                              </p>
                            </div>

                            <div style={{ padding: "14px 16px", borderRadius: 12, background: MOD_COL[domMod[0]] + "0a", border: `1px solid ${MOD_COL[domMod[0]]}22`, marginBottom: 12 }}>
                              <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.66rem", color: M3.secondary, letterSpacing: "0.1em", marginBottom: 6 }}>YOUR DOMINANT ACTION STYLE — {domMod[0].toUpperCase()} ({domMod[1]} PLANETS)</div>
                              <p style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.78rem", lineHeight: 1.6, color: M3.onSurface, margin: 0 }}>
                                The most represented mode is <strong style={{ color: MOD_COL[domMod[0]] }}>{domMod[0]}</strong> — {MOD_DESC[domMod[0]]}.
                              </p>
                            </div>

                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
                              <div style={{ padding: "14px 16px", borderRadius: 12, background: "#69ff8e0a", border: "1px solid #69ff8e22" }}>
                                <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.66rem", color: "#69ff8e", letterSpacing: "0.1em", marginBottom: 6 }}>FLOWING CONNECTIONS — {softCount}</div>
                                <p style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.76rem", lineHeight: 1.55, color: M3.onSurface, margin: 0 }}>{flowDesc}</p>
                              </div>
                              <div style={{ padding: "14px 16px", borderRadius: 12, background: "#ff8a500a", border: "1px solid #ff8a5022" }}>
                                <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.66rem", color: "#ff8a50", letterSpacing: "0.1em", marginBottom: 6 }}>HARD CONTACTS — {hardCount}</div>
                                <p style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.76rem", lineHeight: 1.55, color: M3.onSurface, margin: 0 }}>{growthDesc}</p>
                              </div>
                            </div>

                            <div style={{ padding: "14px 16px", borderRadius: 12, background: M3.surfaceDim, border: `1px solid ${M3.outlineVariant}` }}>
                              <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.66rem", color: M3.secondary, letterSpacing: "0.1em", marginBottom: 6 }}>THE BALANCE BETWEEN THEM</div>
                              <p style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.78rem", lineHeight: 1.6, color: M3.onSurface, margin: 0 }}>{balanceParagraph}</p>
                            </div>
                          </Card>

                          {res.cn && (
                            <Card title={`${cnAnimal.emoji || "☯"} The ${res.cn.animal} — Two Systems Side by Side`}>
                              <p style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.84rem", lineHeight: 1.8, color: M3.onSurface, margin: 0 }}>{cnBridge}</p>
                            </Card>
                          )}

                          <Card title="🔮 Portrait — The Principal Placements">
                          {(()=>{
                            const rows = [
                              { heading: `Sun in ${sunSign}`, glyph: P_SYM.Sun, rec: getPlanetInSign("Sun", sunSign) || getSignSymbolism(sunSign) },
                              { heading: `Moon in ${moonSign}`, glyph: P_SYM.Moon, rec: getPlanetInSign("Moon", moonSign) || getSignSymbolism(moonSign) },
                              { heading: `${ascSign} rising`, glyph: "↑", rec: getSignSymbolism(ascSign) },
                              { heading: `Mercury in ${merSign}`, glyph: P_SYM.Mercury, rec: getPlanetInSign("Mercury", merSign) },
                              { heading: `Venus in ${venSign}`, glyph: P_SYM.Venus, rec: getPlanetInSign("Venus", venSign) },
                              { heading: `Mars in ${marSign}`, glyph: P_SYM.Mars, rec: getPlanetInSign("Mars", marSign) },
                            ].filter(r => r.rec);
                            return (
                              <div>
                                <p style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.79rem", lineHeight: 1.68, color: M3.onSurfaceVariant, margin: "0 0 16px" }}>
                                  Each placement below is named with what the tradition has attributed to it.
                                </p>
                                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 18 }}>
                                  {rows.map((r, i) => (<SymbolPanel key={i} record={r.rec} depth={0} heading={r.heading} glyph={r.glyph} />))}
                                </div>
                              </div>
                            );
                          })()}
                        </Card>

                          <Card title="🧭 Summary — The Principal Placements">
                          {(()=>{
                            const rows = [
                              { heading: `Sun in ${sunSign}`, glyph: P_SYM.Sun, rec: getPlanetInSign("Sun", sunSign) || getSignSymbolism(sunSign) },
                              { heading: `Moon in ${moonSign}`, glyph: P_SYM.Moon, rec: getPlanetInSign("Moon", moonSign) || getSignSymbolism(moonSign) },
                              { heading: `${ascSign} rising`, glyph: "↑", rec: getSignSymbolism(ascSign) },
                              { heading: `Mercury in ${merSign}`, glyph: P_SYM.Mercury, rec: getPlanetInSign("Mercury", merSign) },
                              { heading: `Venus in ${venSign}`, glyph: P_SYM.Venus, rec: getPlanetInSign("Venus", venSign) },
                              { heading: `Mars in ${marSign}`, glyph: P_SYM.Mars, rec: getPlanetInSign("Mars", marSign) },
                            ].filter(r => r.rec);
                            return (
                              <div>
                                <p style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.79rem", lineHeight: 1.68, color: M3.onSurfaceVariant, margin: "0 0 16px" }}>
                                  The placements the tradition weights most heavily in a natal figure, gathered in one place.
                                </p>
                                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 18 }}>
                                  {rows.map((r, i) => (<SymbolPanel key={i} record={r.rec} depth={0} heading={r.heading} glyph={r.glyph} />))}
                                </div>
                              </div>
                            );
                          })()}
                        </Card>

                        </>);
                      })()}
                    </div>
                  );
                })()}

                {false && tab === "struggles-old" && (() => {
                  const sunSign = zodSign(res.trop.Sun);
                  const moonSign = zodSign(res.trop.Moon);
                  const ascSign = zodSign(res.houses.ASC);
                  const venSign = zodSign(res.trop.Venus);
                  const marSign = zodSign(res.trop.Mars);
                  const merSign = zodSign(res.trop.Mercury);
                  const jupSign = zodSign(res.trop.Jupiter);
                  const satSign = zodSign(res.trop.Saturn);
                  const allAsp = calcAspects(res.trop);
                  const hardAsp = allAsp.filter(a => a.name === "Square" || a.name === "Opposition").sort((a, b) => b.strength - a.strength);
                  const domEl = Object.entries(res.el).sort(([, a], [, b]) => b - a);
                  const weakEl = domEl.filter(([, v]) => v === 0).map(([e]) => e);
                  const lowEl = domEl.filter(([, v]) => v === 1).map(([e]) => e);

                  const MISSING_ELEMENT = {
                    Fire: "No body of the counted set falls in a fire sign. The classical scheme reads fire as the hot and dry element of action; its absence here is an absence in the count, and which bodies are counted varies between schools.",
                    Earth: "No body of the counted set falls in an earth sign. Earth is the cold and dry element of the tangible in the classical scheme.",
                    Air: "No body of the counted set falls in an air sign. Air is the hot and moist element of relation and abstraction in the classical scheme.",
                    Water: "No body of the counted set falls in a water sign. Water is the cold and moist element of feeling in the classical scheme.",
                  };
                  const LOW_ELEMENT = {
                    Fire: "One body of the counted set falls in a fire sign. Whether this reads as scarcity depends entirely on the counting rule, which is not standard between schools.",
                    Earth: "One body of the counted set falls in an earth sign. Whether this reads as scarcity depends entirely on the counting rule.",
                    Air: "One body of the counted set falls in an air sign. Whether this reads as scarcity depends entirely on the counting rule.",
                    Water: "One body of the counted set falls in a water sign. Whether this reads as scarcity depends entirely on the counting rule.",
                  };

                  const CHIRON_HOUSE_WOUND = {
                    0: "Chiron falls in the 1st house, the ground of the body and the outward-facing angle. Chiron was discovered in 1977 and every attribution made to it is modern; the wound-and-healer reading is a late twentieth-century construction and is contested.",
                    1: "Chiron falls in the 2nd house, the ground of resources held. Chiron was discovered in 1977 and every attribution made to it is modern; the wound-and-healer reading is a late twentieth-century construction and is contested.",
                    2: "Chiron falls in the 3rd house, the ground of the near environment and of speech. Chiron was discovered in 1977 and every attribution made to it is modern; the wound-and-healer reading is a late twentieth-century construction and is contested.",
                    3: "Chiron falls in the 4th house, the ground of origin and the foundations. Chiron was discovered in 1977 and every attribution made to it is modern; the wound-and-healer reading is a late twentieth-century construction and is contested.",
                    4: "Chiron falls in the 5th house, the ground of offspring and of play. Chiron was discovered in 1977 and every attribution made to it is modern; the wound-and-healer reading is a late twentieth-century construction and is contested.",
                    5: "Chiron falls in the 6th house, the ground of labour, illness and service. Chiron was discovered in 1977 and every attribution made to it is modern; the wound-and-healer reading is a late twentieth-century construction and is contested.",
                    6: "Chiron falls in the 7th house, the ground of the one-to-one relation. Chiron was discovered in 1977 and every attribution made to it is modern; the wound-and-healer reading is a late twentieth-century construction and is contested.",
                    7: "Chiron falls in the 8th house, the ground of what is shared and what is inherited. Chiron was discovered in 1977 and every attribution made to it is modern; the wound-and-healer reading is a late twentieth-century construction and is contested.",
                    8: "Chiron falls in the 9th house, the ground of the far journey and of doctrine. Chiron was discovered in 1977 and every attribution made to it is modern; the wound-and-healer reading is a late twentieth-century construction and is contested.",
                    9: "Chiron falls in the 10th house, the ground of office and of public standing. Chiron was discovered in 1977 and every attribution made to it is modern; the wound-and-healer reading is a late twentieth-century construction and is contested.",
                    10: "Chiron falls in the 11th house, the ground of allies and of what is hoped for. Chiron was discovered in 1977 and every attribution made to it is modern; the wound-and-healer reading is a late twentieth-century construction and is contested.",
                    11: "Chiron falls in the 12th house, the ground of what is hidden or set apart. Chiron was discovered in 1977 and every attribution made to it is modern; the wound-and-healer reading is a late twentieth-century construction and is contested.",
                  };

                  const chironLon = res.trop.Chiron;
                  let chironHouse = null;
                  if (chironLon != null) {
                    for (let h = 0; h < 12; h++) {
                      const cusp = res.houses[h + 1];
                      const next = res.houses[((h + 1) % 12) + 1];
                      const inH = next > cusp ? (chironLon >= cusp && chironLon < next) : (chironLon >= cusp || chironLon < next);
                      if (inH) { chironHouse = h; break; }
                    }
                  }

                  const twelfthCusp = res.houses[12];
                  const firstCusp = res.houses[1];
                  const in12th = [];
                  ["Sun", "Moon", "Mercury", "Venus", "Mars", "Saturn", "Neptune", "Pluto"].forEach(p => {
                    if (res.trop[p] == null) return;
                    const lon = res.trop[p];
                    const inH = firstCusp > twelfthCusp ? (lon >= twelfthCusp && lon < firstCusp) : (lon >= twelfthCusp || lon < firstCusp);
                    if (inH) in12th.push(p);
                  });

                  const TH_PLANET = {
                    Sun: "The Sun in the 12th. Traditional texts treat the 12th as a place of concealment and of what works against the native; modern practice reads it as the unconscious. The two readings are not the same claim.",
                    Moon: "The Moon in the 12th. The lunar significator placed in the house classical texts associate with confinement and things hidden.",
                    Mercury: "Mercury in the 12th. The messenger placed in the house of what is not brought into the open.",
                    Venus: "Venus in the 12th. The lesser benefic placed in a house classical practice counted among the difficult ones.",
                    Mars: "Mars in the 12th. The lesser malefic in the house of concealment; classical sources read the combination as unfavourably placed.",
                    Saturn: "Saturn in the 12th. The greater malefic in a house the older texts associate with confinement and with hidden adversaries.",
                    Neptune: "Neptune in the 12th. Neptune is a post-1846 addition with no classical attribution; the association with the 12th is modern and rests on the shared modern rulership of Pisces.",
                    Pluto: "Pluto in the 12th. Pluto is a post-1930 addition; every attribution made to it is modern.",
                  };

                  return (
                    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                      <Card style={{ background: `linear-gradient(135deg,#ff525222,${M3.surfaceContainer})`, borderColor: "#ff525244" }}>
                        <div style={{ fontFamily: "Cinzel,serif", fontSize: "1rem", color: "#ff8a50", marginBottom: 8 }}>Where the Tradition Locates Difficulty — Where Life Challenges You</div>
                        <p style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.82rem", lineHeight: 1.65, color: M3.onSurface, margin: 0 }}>
                          This page gathers the placements and contacts to which the tradition has attached difficulty. It is a gathering of attributions, but because <strong>knowing your struggles is the first step to working with them</strong>. The patterns here aren't flaws to fix; they're areas where life has asked more of you than average, and where your deepest growth happens.
                        </p>
                        <p style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.82rem", lineHeight: 1.65, color: M3.onSurface, marginTop: 8 }}>
                          Sources differ on how much weight to give any of these, and the classical benefic/malefic scheme that underwrites much of it has largely been abandoned in modern practice.
                        </p>
                      </Card>

                      <Card title="♄ Saturn — Where the Tradition Locates Limit">
                        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                          <div style={{ width: 48, height: 48, borderRadius: "50%", background: P_COL.Saturn + "22", border: `2px solid ${P_COL.Saturn}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <span style={{ fontSize: "1.5rem", color: P_COL.Saturn }}>♄</span>
                          </div>
                          <div>
                            <div style={{ color: SIGN_COL[satSign], fontFamily: "'Share Tech Mono',monospace", fontSize: "0.76rem", fontWeight: "700" }}>Saturn in {satSign}</div>
                            <div style={{ color: M3.outlineVariant, fontFamily: "'Share Tech Mono',monospace", fontSize: "0.6rem" }}>The place the tradition assigns to life demands the most from you</div>
                          </div>
                        </div>
                        <p style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.82rem", lineHeight: 1.75, color: M3.onSurface, margin: 0 }}>
                          {SATURN_DEEP[satSign]?.plain}
                        </p>
                      </Card>

                      {chironHouse != null && (
                        <Card title="🩹 Chiron — A Modern and Contested Attribution">
                          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                            <div style={{ width: 48, height: 48, borderRadius: "50%", background: "#b388ff22", border: "2px solid #b388ff", display: "flex", alignItems: "center", justifyContent: "center" }}>
                              <span style={{ fontSize: "1.2rem", color: "#b388ff" }}>⚷</span>
                            </div>
                            <div>
                              <div style={{ color: "#b388ff", fontFamily: "'Share Tech Mono',monospace", fontSize: "0.76rem", fontWeight: "700" }}>Chiron in House {chironHouse + 1} — {HOUSE_AREA[chironHouse]}</div>
                              <div style={{ color: M3.outlineVariant, fontFamily: "'Share Tech Mono',monospace", fontSize: "0.6rem" }}>The place the modern attribution calls the "wounded healer" — where pain becomes your greatest gift</div>
                            </div>
                          </div>
                          <p style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.82rem", lineHeight: 1.75, color: M3.onSurface, margin: 0 }}>
                            {CHIRON_HOUSE_WOUND[chironHouse]}
                          </p>
                        </Card>
                      )}

                      <Card title="⚡ The Tightest Hard Contacts">
                        <p style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.76rem", lineHeight: 1.55, color: M3.onSurfaceVariant, margin: "0 0 14px" }}>
                          The tightest squares (□ — 90°) and oppositions (☍ — 180°) in this figure, listed with their orbs.
                        </p>
                        {hardAsp.length === 0 ? (
                          <p style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.78rem", color: M3.onSurfaceVariant, fontStyle: "italic" }}>No major hard aspects found — your chart has relatively little internal friction, which means growth comes more through external circumstances than internal tension.</p>
                        ) : hardAsp.slice(0, 6).map((a, i) => {
                          const r0 = (P_ROLE[a.p1] || a.p1), r1 = (P_ROLE[a.p2] || a.p2);
                          const k1 = `${r0}+${r1}`, k2 = `${r1}+${r0}`;
                          const pi = PAIR_INSIGHT[k1] || PAIR_INSIGHT[k2] || "";
                          const struggleNarrative = a.name === "Square"
                            ? `The square is 90°; the ${r0.toLowerCase()} and ${r1.toLowerCase()} significators stand in signs sharing a mode but not an element.`
                            : `The opposition is 180°, the greatest possible separation; the two signs share a mode and stand in complementary elements.`;
                          return (
                            <div key={i} style={{ padding: "12px 16px", marginBottom: 10, borderRadius: 12, background: a.col + "0c", borderLeft: `4px solid ${a.col}` }}>
                              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                                <span style={{ color: P_COL[a.p1], fontSize: "1rem" }}>{P_SYM[a.p1]}</span>
                                <span style={{ color: P_COL[a.p1], fontFamily: "'Share Tech Mono',monospace", fontSize: "0.72rem", fontWeight: "700" }}>{a.p1}</span>
                                <span style={{ color: a.col, fontFamily: "'Share Tech Mono',monospace", fontSize: "0.72rem" }}>{a.sym} {a.name}</span>
                                <span style={{ color: P_COL[a.p2], fontSize: "1rem" }}>{P_SYM[a.p2]}</span>
                                <span style={{ color: P_COL[a.p2], fontFamily: "'Share Tech Mono',monospace", fontSize: "0.72rem", fontWeight: "700" }}>{a.p2}</span>
                                <span style={{ color: M3.outlineVariant, marginLeft: "auto", fontSize: "0.62rem", fontFamily: "'Share Tech Mono',monospace" }}>{(a.strength * 100).toFixed(0)}% strength</span>
                              </div>
                              {pi && <p style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.76rem", lineHeight: 1.55, color: M3.onSurface, margin: "0 0 6px" }}>At its core: {pi}.</p>}
                              <p style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.76rem", lineHeight: 1.6, color: M3.onSurface, margin: 0 }}>{struggleNarrative}</p>
                            </div>
                          );
                        })}
                      </Card>

                      <Card title="🎭 Attributions of Difficulty">
                        <p style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.76rem", lineHeight: 1.55, color: M3.onSurfaceVariant, margin: "0 0 14px" }}>
                          These are the attributions the tradition attaches to the placements below. They are readings of the symbol — they're defence mechanisms. Recognising them is the first step to choosing differently.
                        </p>
                        {[
                          { label: `Rising Shadow (${ascSign})`, icon: "🌅", data: RISING_SHADOW[ascSign], area: "social mask & first impressions" },
                          { label: `Venus Shadow (${venSign})`, icon: "💖", data: VENUS_SHADOW[venSign], area: "love & relationships" },
                          { label: `Mars Shadow (${marSign})`, icon: "🔥", data: MARS_SHADOW[marSign], area: "conflict & assertion" },
                          { label: `Mercury Shadow (${merSign})`, icon: "🧠", data: MERCURY_SHADOW[merSign], area: "thinking & communication" },
                        ].filter(x => x.data).map((x, i) => (
                          <div key={i} style={{ padding: "12px 16px", marginBottom: 10, borderRadius: 12, background: "#ff525208", borderLeft: "3px solid #ff525233" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
                              <span style={{ fontSize: "1rem" }}>{x.icon}</span>
                              <span style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.7rem", fontWeight: "700", color: "#ff8a50" }}>{x.label}</span>
                              <span style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.58rem", color: M3.outlineVariant, marginLeft: 4 }}>({x.area})</span>
                            </div>
                            <p style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.76rem", lineHeight: 1.6, color: M3.onSurface, margin: "0 0 8px" }}>{x.data.shadow}</p>
                            <div style={{ padding: "8px 12px", borderRadius: 8, background: "#69ff8e08", borderLeft: "3px solid #69ff8e44" }}>
                              <span style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.58rem", color: "#69ff8e", letterSpacing: "0.08em" }}>THE SHIFT: </span>
                              <span style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.74rem", lineHeight: 1.5, color: M3.onSurface }}>{x.data.growth}</span>
                            </div>
                          </div>
                        ))}
                      </Card>

                      {(weakEl.length > 0 || lowEl.length > 0) && (
                        <Card title="△ Elements Not Represented">
                          <p style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.76rem", lineHeight: 1.55, color: M3.onSurfaceVariant, margin: "0 0 14px" }}>
                            An element counted as absent or thinly represented is a property of the counting rule as much as of the figure: which bodies are counted, and whether the angles count, varies between schools.
                          </p>
                          {weakEl.map(el => (
                            <div key={el} style={{ padding: "14px 18px", marginBottom: 10, borderRadius: 12, background: EL_COL[el] + "0a", border: `1px solid ${EL_COL[el]}22` }}>
                              <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.7rem", fontWeight: "700", color: EL_COL[el], marginBottom: 6 }}>NO {el.toUpperCase()} — COMPLETELY ABSENT</div>
                              <p style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.78rem", lineHeight: 1.65, color: M3.onSurface, margin: 0 }}>{MISSING_ELEMENT[el]}</p>
                            </div>
                          ))}
                          {lowEl.map(el => (
                            <div key={el} style={{ padding: "12px 16px", marginBottom: 8, borderRadius: 10, background: EL_COL[el] + "08", border: `1px solid ${EL_COL[el]}18` }}>
                              <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.68rem", fontWeight: "700", color: EL_COL[el], marginBottom: 4 }}>LOW {el.toUpperCase()} — UNDERREPRESENTED</div>
                              <p style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.76rem", lineHeight: 1.6, color: M3.onSurface, margin: 0 }}>{LOW_ELEMENT[el]}</p>
                            </div>
                          ))}
                        </Card>
                      )}

                      {in12th.length > 0 && (
                        <Card title="🌙 Bodies in the 12th House">
                          <p style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.76rem", lineHeight: 1.55, color: M3.onSurfaceVariant, margin: "0 0 14px" }}>
                            Classical texts place confinement, hidden adversaries and things set apart in the 12th; modern practice reads it as the unconscious. Bodies here are read against whichever of those two frames is in use.
                          </p>
                          {in12th.map(p => (
                            <div key={p} style={{ padding: "12px 16px", marginBottom: 8, borderRadius: 10, background: P_COL[p] + "0c", borderLeft: `3px solid ${P_COL[p]}44` }}>
                              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
                                <span style={{ color: P_COL[p], fontSize: "1.1rem" }}>{P_SYM[p]}</span>
                                <span style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.72rem", fontWeight: "700", color: P_COL[p] }}>{p} in the 12th House</span>
                              </div>
                              <p style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.78rem", lineHeight: 1.65, color: M3.onSurface, margin: 0 }}>{TH_PLANET[p] || `Your ${(P_ROLE[p] || p).toLowerCase()} operates in the hidden 12th house — this part of your life is deeply internalised and may require deliberate effort to bring into awareness.`}</p>
                            </div>
                          ))}
                        </Card>
                      )}

                      {res.cn && (ANIMAL_INFO[res.cn.animal] || {}).shadow && (
                        <Card title={`☯ ${res.cn.animal} Shadow — Chinese Tradition`}>
                          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                            <span style={{ fontSize: "2.4rem" }}>{(ANIMAL_INFO[res.cn.animal] || {}).emoji || "☯"}</span>
                            <div>
                              <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.76rem", fontWeight: "700", color: M3.primary }}>The Shadow of the {res.cn.animal}</div>
                              <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.6rem", color: M3.outlineVariant }}>What the {res.cn.animal} looks like at its worst</div>
                            </div>
                          </div>
                          <p style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.82rem", lineHeight: 1.75, color: M3.onSurface, margin: 0 }}>
                            {(ANIMAL_INFO[res.cn.animal] || {}).shadow}
                          </p>
                        </Card>
                      )}

                      <Card style={{ background: `linear-gradient(135deg,#69ff8e11,${M3.surfaceContainer})`, borderColor: "#69ff8e33" }}>
                        <div style={{ fontFamily: "Cinzel,serif", fontSize: "1rem", color: "#69ff8e", marginBottom: 10 }}>A Note on Struggles</div>
                        <p style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.84rem", lineHeight: 1.8, color: M3.onSurface, margin: 0 }}>
                          None of the above is a prediction, and none of it is a statement about a person. Each is an attribution a tradition has made to a position.
                        </p>
                      </Card>
                    </div>
                  );
                })()}

                {false && tab === "wheel" && (
                  <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    <Card style={{ background: `linear-gradient(135deg,${M3.primaryContainer}88,${M3.surfaceContainer})`, borderColor: M3.outline, padding: "14px 18px" }}>
                      <div style={{ fontFamily: "Cinzel,serif", fontSize: "1rem", color: M3.primary, marginBottom: 6 }}>Interactive Wheels</div>
                      <p style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.78rem", lineHeight: 1.55, color: M3.onSurface, margin: 0 }}>
                        Each wheel is a circular sky-map. The outer ring shows the zodiac signs. Planet symbols sit at the computed positions for this chart — hover or tap any symbol for detailed info. Lines between planets show aspects (angles of connection).
                      </p>
                    </Card>
                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap", justifyContent: "center" }}>
                      {[
                        { id: "western", label: "☉ Western (Tropical)", col: M3.primary, tip: "Season-based zodiac used in Western astrology. The main birth chart." },
                        { id: "sidereal", label: "☽ Lunar (Sidereal)", col: "#ce93d8", tip: "Star-based zodiac used in Vedic/Jyotish astrology. Accounts for Earth's wobble." },
                        { id: "solar", label: "↩ Solar Return", col: "#ffa726", tip: "Chart cast for the moment the Sun regains its natal longitude each year — maps your year ahead." },
                        { id: "chinese", label: "☯ Chinese", col: "#ffd54f", tip: "The Chinese zodiac wheel — animals, elements, trigrams, and Yin/Yang." },
                      ].map(m => (
                        <div key={m.id} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
                          <button onClick={() => setWheelMode(m.id)}
                            style={{
                              padding: "7px 18px", borderRadius: 20, border: `1.5px solid ${wheelMode === m.id ? m.col : M3.outline + "66"}`,
                              background: wheelMode === m.id ? m.col + "22" : "transparent", color: wheelMode === m.id ? m.col : M3.onSurfaceVariant,
                              fontFamily: "'Share Tech Mono',monospace", fontSize: "0.72rem", fontWeight: wheelMode === m.id ? "700" : "400",
                              cursor: "pointer", transition: "all 0.2s"
                            }}>
                            {m.label}
                          </button>
                          {wheelMode === m.id && (
                            <span style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.64rem", color: M3.onSurfaceVariant, textAlign: "center", maxWidth: 180 }}>{m.tip}</span>
                          )}
                        </div>
                      ))}
                    </div>

                    {wheelMode === "western" && (
                      <Card title="☉ Western Birth Chart — Tropical Zodiac">
                        <p style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.78rem", lineHeight: 1.55, color: M3.onSurfaceVariant, margin: "0 0 14px" }}>
                          The tropical zodiac is anchored to the seasons: 0° Aries begins at the March equinox. It is the standard frame in Western practice, and it separates from the sidereal frame by the precession of the equinoxes.
                        </p>
                        <div style={{ display: "flex", justifyContent: "center" }}>
                          <WheelWithTooltip positions={res.trop} houses={res.houses} size={Math.min(560, window.innerWidth - 64)} id="full" />
                        </div>
                        <div style={{ display: "flex", justifyContent: "center", gap: 16, marginTop: 12, flexWrap: "wrap" }}>
                          {[{ l: "AC", c: M3.tertiary, d: "Ascendant (left) — the degree rising at the eastern horizon" }, { l: "MC", c: M3.primary, d: "Midheaven (top) — career, public reputation" }, { l: "DC", c: M3.tertiary, d: "Descendant (right) — partnerships, what you attract" }, { l: "IC", c: M3.primary, d: "Imum Coeli (bottom) — home, roots, private self" }].map(a => (
                            <div key={a.l} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                              <span style={{ color: a.c, fontFamily: "'Share Tech Mono',monospace", fontSize: "0.72rem", fontWeight: "700" }}>{a.l}</span>
                              <span style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.62rem", color: M3.onSurfaceVariant }}>{a.d}</span>
                            </div>
                          ))}
                        </div>
                      </Card>
                    )}

                    {wheelMode === "sidereal" && (
                      <Card title="☽ Sidereal Birth Chart — Vedic/Lunar Zodiac">
                        <p style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.78rem", lineHeight: 1.55, color: M3.onSurfaceVariant, margin: "0 0 14px" }}>
                          The sidereal zodiac is anchored to the fixed stars and is the frame used in Jyotish. The offset from the tropical frame is the ayanamsa, a chosen value rather than an observed one; SGE uses a linear approximation of Lahiri.
                        </p>
                        <div style={{ display: "flex", justifyContent: "center" }}>
                          <WheelWithTooltip positions={res.sid} houses={res.houses} size={Math.min(560, window.innerWidth - 64)} id="sidwheel" />
                        </div>
                        <div style={{ marginTop: 12, padding: "10px 14px", borderRadius: 10, background: M3.surfaceDim, textAlign: "center" }}>
                          <span style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.68rem", color: "#ce93d8" }}>Ayanamsa offset: {ayanamsa(res.jd).toFixed(2)}°</span>
                          <span style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.66rem", color: M3.onSurfaceVariant, marginLeft: 8 }}>— every planet shifts by this amount from the tropical chart</span>
                        </div>
                      </Card>
                    )}

                    {wheelMode === "solar" && (
                      res.srPos ? (
                        <Card title="↩ Solar Return Chart">
                          <p style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.78rem", lineHeight: 1.55, color: M3.onSurfaceVariant, margin: "0 0 14px" }}>
                            The solar return chart is cast for the moment the Sun regains its natal longitude. That moment is a real astronomical event; reading the resulting chart as governing the year is an interpretive convention.
                          </p>
                          <div style={{ display: "flex", justifyContent: "center" }}>
                            <WheelWithTooltip positions={res.srPos} houses={res.houses} size={Math.min(560, window.innerWidth - 64)} id="srwheel" />
                          </div>
                          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(130px,1fr))", gap: 6, marginTop: 12 }}>
                            {["Sun", "Moon", "Venus", "Mars", "Jupiter", "Saturn"].map(p => {
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
                      )
                    )}

                    {wheelMode === "chinese" && (
                      <Card title={`☯ Chinese Zodiac Wheel — ${res.cn.element} ${res.cn.animal}`}>
                        <p style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.78rem", lineHeight: 1.55, color: M3.onSurfaceVariant, margin: "0 0 14px" }}>
                          The Chinese zodiac is a 12-year cycle of animals, each paired with one of five elements and a Yin/Yang polarity. The cycle year begins at the lunar new year. The position is highlighted below.
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
                  </div>
                )}

                {false && tab === "aspects" && (
                  <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    <Card style={{ background: `linear-gradient(135deg,${M3.primaryContainer}88,${M3.surfaceContainer})`, borderColor: M3.outline }}>
                      <div style={{ fontFamily: "Cinzel,serif", fontSize: "1rem", color: M3.primary, marginBottom: 8 }}>What are aspects?</div>
                      <p style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.83rem", lineHeight: 1.65, color: M3.onSurface, margin: "0 0 16px" }}>
                        Aspects are the angles between planets measured around the zodiac circle. When two planets are a precise number of degrees apart, they form a geometric relationship — and their energies blend in a specific way. Think of it like music: some intervals sound harmonious, some create tension, all create meaning.
                      </p>
                      {/* ── Sacred Geometry Aspect Wheel ── */}
                      {(() => {
                        const gSz = Math.min(400, window.innerWidth - 80);
                        const gCx = gSz / 2, gCy = gSz / 2, gR = gSz * 0.42;
                        const aspectDefs = [
                          { angle: 0, col: "#FFD700", sym: "☌", name: "Conjunction", tip: "Same place — energies fuse", count: 12 },
                          { angle: 45, col: "#ce93d8", sym: "∠", name: "Semisquare", tip: "45° — minor irritant", count: 8 },
                          { angle: 60, col: "#64b5f6", sym: "⚹", name: "Sextile", tip: "60° — gentle opportunity", count: 6 },
                          { angle: 90, col: "#ff8a50", sym: "□", name: "Square", tip: "90° — creative friction", count: 4 },
                          { angle: 120, col: "#69ff8e", sym: "△", name: "Trine", tip: "120° — natural flow", count: 3 },
                          { angle: 135, col: "#ef9a9a", sym: "⚼", name: "Sesquiquadrate", tip: "135° — inner restlessness", count: 8 },
                          { angle: 150, col: "#b39ddb", sym: "⚻", name: "Quincunx", tip: "150° — constant adjustment", count: 12 },
                          { angle: 180, col: "#ff5252", sym: "☍", name: "Opposition", tip: "Across the chart — push-pull", count: 2 },
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
                              {aspectDefs.filter(a => a.angle > 0).map(asp => {
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
                              {aspectDefs.map(a => (
                                <div key={a.name} style={{
                                  display: "flex", alignItems: "center", gap: 8,
                                  padding: "7px 10px", borderRadius: 8,
                                  background: a.col + "11", border: `1px solid ${a.col}33`
                                }}>
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

                    <Card title={`⚹ Aspect Web — ${res.aspects.length} connections visualised`}>
                      <p style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.76rem", lineHeight: 1.55, color: M3.onSurfaceVariant, margin: "0 0 14px" }}>
                        This wheel draws the <strong>contacts between the bodies</strong>. Thicker, brighter lines mean tighter aspects. Aspect symbols appear on the strongest links. Hover any line for details.
                      </p>
                      <div style={{ display: "flex", justifyContent: "center" }}>
                        <WheelWithTooltip positions={res.trop} houses={res.houses} size={Math.min(520, window.innerWidth - 64)} id="aspw" mode="aspects" />
                      </div>
                    </Card>

                    <Card title="⚹ Aspect Breakdown">
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: 12 }}>
                        {["Conjunction", "Trine", "Sextile", "Square", "Opposition", "Quincunx", "Semisquare", "Sesquiquadrate"].map(name => {
                          const matches = res.aspects.filter(a => a.name === name).sort((a, b) => b.strength - a.strength);
                          const def = ASPECTS.find(a => a.name === name);
                          const avgStr = matches.length ? matches.reduce((s, a) => s + a.strength, 0) / matches.length : 0;
                          return (
                            <div key={name} style={{ padding: "14px 16px", borderRadius: 12, background: def?.col + "0a", border: `1px solid ${def?.col}22` }}>
                              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                                <span style={{ color: def?.col, fontSize: "1.5rem", fontFamily: "serif" }}>{def?.sym}</span>
                                <div>
                                  <div style={{ color: def?.col, fontFamily: "'Share Tech Mono',monospace", fontSize: "0.74rem", fontWeight: "700" }}>{name} {def?.angle}°</div>
                                  <div style={{ color: M3.onSurfaceVariant, fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.58rem", fontStyle: "italic" }}>{ASP_EXPLAIN[name] || ""}</div>
                                  <div style={{ color: M3.onSurfaceVariant, fontFamily: "'Share Tech Mono',monospace", fontSize: "0.58rem" }}>{matches.length} found{matches.length > 0 ? ` · avg ${(avgStr * 100).toFixed(0)}% strength` : ""}</div>
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
                                  <span style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.62rem", color: M3.onSurfaceVariant, marginLeft: "auto" }}>{a.p1}–{a.p2}</span>
                                  <span style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.58rem", color: def?.col }}>{(a.strength * 100).toFixed(0)}%</span>
                                </div>
                              )) : <div style={{ color: M3.outlineVariant, fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.7rem", fontStyle: "italic" }}>None in your chart</div>}
                            </div>
                          );
                        })}
                      </div>
                      <div style={{ marginTop: 16, padding: "12px 16px", background: M3.surfaceVariant, borderRadius: 12, fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.82rem", color: M3.onSurface, lineHeight: 1.7 }}>
                        {(() => {
                          const trines = res.aspects.filter(a => a.name === "Trine").length;
                          const squares = res.aspects.filter(a => a.name === "Square").length;
                          const conjs = res.aspects.filter(a => a.name === "Conjunction").length;
                          const sextiles = res.aspects.filter(a => a.name === "Sextile").length;
                          const opps = res.aspects.filter(a => a.name === "Opposition").length;
                          const quinc = res.aspects.filter(a => a.name === "Quincunx").length;
                          const semi = res.aspects.filter(a => a.name === "Semisquare").length;
                          const sesq = res.aspects.filter(a => a.name === "Sesquiquadrate").length;
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
                          if (soft > hard * 1.5) return `Soft contacts outnumber hard ones (${summary}). The split rests on the classical benefic/malefic scheme, which modern practice has largely abandoned.${quinc ? ` ${quinc} quincunx contacts are also present; the quincunx carries the narrowest orb of the aspects in use.` : ""}`;
                          if (hard > soft * 1.5) return `Hard contacts outnumber soft ones (${summary}). The counts depend on the orb policy in use.${quinc ? ` ${quinc} quincunx contacts are also present.` : ""}`;
                          return `Soft and hard contacts are evenly matched (${summary}).${quinc ? ` ${quinc} quincunx contacts are also present.` : ""}`;
                        })()}
                      </div>
                    </Card>

                    <Card title="⚹ Full Connection Table">
                      <AspectTable aspects={res.aspects} />
                    </Card>
                  </div>
                )}

                {false && tab === "progressions" && (
                  <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    <Card style={{ background: `linear-gradient(135deg,${M3.secondaryContainer}88,${M3.surfaceContainer})`, borderColor: M3.outline }}>
                      <div style={{ display: "flex", gap: 20, flexWrap: "wrap", alignItems: "flex-start" }}>
                        <div style={{ flex: 1, minWidth: 220 }}>
                          <div style={{ fontFamily: "Cinzel,serif", fontSize: "1rem", color: M3.secondary, marginBottom: 8 }}>Secondary Progressions — who you're becoming</div>
                          <p style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.83rem", lineHeight: 1.65, color: M3.onSurface, margin: "0 0 10px" }}>
                            Secondary progressions read one day of ephemeris time after birth as standing for one year of life. It is a convention of correspondence, not a claim about where the bodies physically stand.
                          </p>
                          <p style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.83rem", lineHeight: 1.65, color: M3.onSurface, margin: 0 }}>
                            The Progressed Moon changes sign every ~2.5 years and is the most felt. The Progressed Sun shifts sign roughly every 30 years — a complete identity rebirth.
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
                                {isNow && <text x="92" y={y} dominantBaseline="middle" fill={M3.tertiary} fontSize="8" fontFamily="'Share Tech Mono',monospace">← NOW</text>}
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
                      const PROG_SIGN_ARC = {
                        Aries: "initiation and self-assertion, the cardinal opening of the fire triplicity",
                        Taurus: "stability and sensory value, the fixed earth of the spring quarter",
                        Gemini: "exchange and multiplicity, the mutable air that closes spring",
                        Cancer: "shelter and origin, the cardinal water that opens summer",
                        Leo: "display and singular authority, the fixed fire of high summer",
                        Virgo: "discrimination and service, the mutable earth that closes summer",
                        Libra: "relation and proportion, the cardinal air that opens autumn",
                        Scorpio: "depth and irreversibility, the fixed water of mid-autumn",
                        Sagittarius: "extension and doctrine, the mutable fire that closes autumn",
                        Capricorn: "structure and office, the cardinal earth that opens winter",
                        Aquarius: "abstraction and the collective, the fixed air of deep winter",
                        Pisces: "dissolution and the unbounded, the mutable water that closes the year",
                      };
                      return (
                        <Card title="📖 Progressed Positions">
                          <p style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.82rem", lineHeight: 1.7, color: M3.onSurface, margin: "0 0 14px" }}>
                            Progressed positions are generated by the day-for-a-year convention. They are a mapping laid over the ephemeris, not a record of events.
                          </p>
                          {sunChanged ? (
                            <div style={{ padding: "14px 16px", borderRadius: 12, background: P_COL.Sun + "12", border: `1px solid ${P_COL.Sun}33`, marginBottom: 12 }}>
                              <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.68rem", color: P_COL.Sun, letterSpacing: "0.1em", marginBottom: 6 }}>☉ IDENTITY SHIFT — {nSun} → {pSun}</div>
                              <p style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.8rem", lineHeight: 1.7, color: M3.onSurface, margin: 0 }}>
                                The natal Sun stands in <strong style={{ color: SIGN_COL[nSun] }}>{nSun}</strong>. {PLANET_IN_SIGN.Sun?.[nSun] || SI[nSun].plain}
                              </p>
                            </div>
                          ) : (
                            <div style={{ padding: "12px 16px", borderRadius: 10, background: M3.surfaceDim, marginBottom: 12 }}>
                              <p style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.78rem", lineHeight: 1.6, color: M3.onSurfaceVariant, margin: 0 }}>
                                The progressed Sun remains in <strong style={{ color: SIGN_COL[nSun] }}>{nSun}</strong>. The progressed Sun advances about one degree a year, so it crosses a sign roughly every thirty years.
                              </p>
                            </div>
                          )}
                          {moonChanged ? (
                            <div style={{ padding: "14px 16px", borderRadius: 12, background: P_COL.Moon + "12", border: `1px solid ${P_COL.Moon}33`, marginBottom: 12 }}>
                              <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.68rem", color: P_COL.Moon, letterSpacing: "0.1em", marginBottom: 6 }}>☽ EMOTIONAL SHIFT — {nMoon} → {pMoon}</div>
                              <p style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.8rem", lineHeight: 1.7, color: M3.onSurface, margin: 0 }}>
                                The natal Moon stands in <strong style={{ color: SIGN_COL[nMoon] }}>{nMoon}</strong>, and the progressed Moon has since changed sign. The progressed Moon crosses a sign about every two and a half years.
                              </p>
                            </div>
                          ) : (
                            <div style={{ padding: "12px 16px", borderRadius: 10, background: M3.surfaceDim, marginBottom: 12 }}>
                              <p style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.78rem", lineHeight: 1.6, color: M3.onSurfaceVariant, margin: 0 }}>
                                The progressed Moon remains in <strong style={{ color: SIGN_COL[nMoon] }}>{nMoon}</strong>.
                              </p>
                            </div>
                          )}
                          <p style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.76rem", lineHeight: 1.6, color: M3.onSurfaceVariant, margin: 0, fontStyle: "italic" }}>
                            {sunChanged && moonChanged ? "Both progressed lights have changed sign since birth."
                              : sunChanged ? "The progressed Sun has changed sign; the progressed Moon has not."
                                : moonChanged ? "The progressed Moon has changed sign; the progressed Sun has not."
                                  : "Neither progressed light has changed sign since birth. The progressed Sun crosses a sign roughly every thirty years and the progressed Moon roughly every two and a half."}
                          </p>
                        </Card>
                      );
                    })()}

                    <Card title={`→ Progressed Positions at Age ${age}`}>
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: 10 }}>
                        {["Sun", "Moon", "Mercury", "Venus", "Mars"].map(planet => {
                          const natalSign = zodSign(res.trop[planet]);
                          const progSign = zodSign(res.prog[planet]);
                          const changed = natalSign !== progSign;
                          return (
                            <div key={planet} style={{
                              padding: "10px 14px", borderRadius: 10,
                              background: changed ? P_COL[planet] + "18" : M3.surfaceDim,
                              border: `1px solid ${changed ? P_COL[planet] + "55" : M3.outlineVariant}`
                            }}>
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
                                  {`The progressed ${planet} has crossed into ${progSign}. `}
                                  {PLANET_IN_SIGN[planet]?.[progSign] || SI[progSign]?.plain || ""}
                                </p>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </Card>

                    <div style={grid2}>
                      <Card title={`→ Evolved Positions — Age ${age}`}>
                        <PlanetTable positions={res.prog} jd={res.jd} />
                      </Card>
                      <Card title="→ Evolved Chart Wheel">
                        <div style={{ display: "flex", justifyContent: "center" }}>
                          <WheelWithTooltip positions={res.prog} houses={res.houses} size={300} id="prog" />
                        </div>
                      </Card>
                    </div>

                    <Card title="→ Evolved Connections">
                      <AspectTable aspects={calcAspects(res.prog)} />
                    </Card>
                  </div>
                )}

                {false && tab === "solar" && (
                  <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    <Card style={{ background: `linear-gradient(135deg,${M3.tertiaryContainer}88,${M3.surfaceContainer})`, borderColor: `${M3.tertiary}44` }}>
                      <div style={{ display: "flex", gap: 20, flexWrap: "wrap", alignItems: "flex-start" }}>
                        <div style={{ flex: 1, minWidth: 220 }}>
                          <div style={{ fontFamily: "Cinzel,serif", fontSize: "1rem", color: M3.tertiary, marginBottom: 8 }}>Solar Return — the moment the Sun regains its natal longitude</div>
                          <p style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.83rem", lineHeight: 1.65, color: M3.onSurface, margin: "0 0 10px" }}>
                            Once a year the Sun returns to the <em>exact degree and minute</em> of its natal longitude. That instant is computable; the convention of reading a chart cast for it as governing the year is interpretive, not astronomical.
                          </p>
                          <p style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.83rem", lineHeight: 1.65, color: M3.onSurface, margin: 0 }}>
                            The Solar Return chart is read like a natal chart, but its influence lasts only one year.
                          </p>
                        </div>
                        <svg width="160" height="160" viewBox="0 0 160 160" style={{ flexShrink: 0 }}>
                          <circle cx="80" cy="80" r="12" fill={M3.tertiary} opacity="0.9" />
                          <text x="80" y="80" textAnchor="middle" dominantBaseline="middle" fontSize="14" fontFamily="serif">☉</text>
                          <circle cx="80" cy="80" r="55" fill="none" stroke={M3.outline} strokeWidth="1" strokeDasharray="4 3" />
                          {[0, 90, 180, 270].map((a, i) => {
                            const x = 80 + 55 * Math.cos((a - 90) * RAD), y = 80 + 55 * Math.sin((a - 90) * RAD);
                            return <circle key={i} cx={x} cy={y} r="4" fill={i === 0 ? M3.tertiary : M3.outlineVariant} stroke={M3.primary} strokeWidth="0.5" />;
                          })}
                          <text x="80" y="16" textAnchor="middle" fill={M3.tertiary} fontSize="8" fontFamily="'Share Tech Mono',monospace">SR MOMENT</text>
                          <path d={`M80,25 A55,55 0 0,1 ${80 + 55} 80`} fill="none" stroke={M3.tertiary} strokeWidth="1.5" strokeDasharray="3 2" />
                        </svg>
                      </div>
                    </Card>

                    {res.srJD ? (
                      <>
                        {res.srPos && (() => {
                          const SI = SIGN_INFO;
                          const srSun = zodSign(res.srPos.Sun);
                          const srMoon = zodSign(res.srPos.Moon);
                          const srMars = zodSign(res.srPos.Mars);
                          const srVenus = zodSign(res.srPos.Venus);
                          const srJup = zodSign(res.srPos.Jupiter);
                          const srSat = zodSign(res.srPos.Saturn);
                          const srMerc = zodSign(res.srPos.Mercury);

                          const signFeel = s => (SI[s]?.plain || "").split(".").slice(0, 2).join(".").trim();
                          const signShort = s => s === "Aries" ? "bold, direct, and action-oriented" : s === "Taurus" ? "steady, grounded, and comfort-seeking" : s === "Gemini" ? "curious, sociable, and mentally restless" : s === "Cancer" ? "nurturing, protective, and emotionally sensitive" : s === "Leo" ? "warm, expressive, and creativity-driven" : s === "Virgo" ? "precise, helpful, and improvement-focused" : s === "Libra" ? "diplomatic, harmonious, and partnership-oriented" : s === "Scorpio" ? "intense, transformative, and deeply probing" : s === "Sagittarius" ? "expansive, freedom-loving, and truth-seeking" : s === "Capricorn" ? "disciplined, ambitious, and structure-building" : s === "Aquarius" ? "unconventional, community-minded, and future-focused" : "intuitive, empathic, and boundary-dissolving";

                          const yearCards = [
                            {
                              icon: "☉", title: "Solar Return Sun", sign: srSun, col: P_COL.Sun,
                              body: `The Sun stands in ${srSun} in the return chart — by definition at the same longitude it held at birth, so its sign is fixed and carries no new information. ${PLANET_IN_SIGN.Sun?.[srSun] || ""}`
                            },
                            {
                              icon: "☽", title: "Solar Return Moon", sign: srMoon, col: P_COL.Moon,
                              body: `The Moon stands in ${srMoon} in the return chart. The Moon is the fastest body, so its return position is the most sensitive of all to the accuracy of the return moment. ${PLANET_IN_SIGN.Moon?.[srMoon] || ""}`
                            },
                            {
                              icon: "♀", title: "Solar Return Venus", sign: srVenus, col: P_COL.Venus,
                              body: `Venus stands in ${srVenus} in the return chart. ${PLANET_IN_SIGN.Venus?.[srVenus] || ""}`
                            },
                            {
                              icon: "♂", title: "Solar Return Mars", sign: srMars, col: P_COL.Mars,
                              body: `Mars stands in ${srMars} in the return chart. ${PLANET_IN_SIGN.Mars?.[srMars] || ""}`
                            },
                            {
                              icon: "♃", title: "Solar Return Jupiter", sign: srJup, col: P_COL.Jupiter,
                              body: `Jupiter stands in ${srJup} in the return chart. Jupiter takes about 11.9 years to circle the zodiac, so this placement changes slowly between returns. ${PLANET_IN_SIGN.Jupiter?.[srJup] || ""}`
                            },
                            {
                              icon: "♄", title: "Solar Return Saturn", sign: srSat, col: P_COL.Saturn,
                              body: `Saturn stands in ${srSat} in the return chart. Saturn takes about 29.4 years to circle the zodiac. ${PLANET_IN_SIGN.Saturn?.[srSat] || ""}`
                            },
                          ];
                          return (<>
                            <Card title="↩ Solar Return — Positions">
                              <p style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.78rem", lineHeight: 1.55, color: M3.onSurfaceVariant, margin: "0 0 16px" }}>
                                The return chart is cast for the moment the Sun regains its natal longitude. That moment is a real astronomical event; the practice of reading the resulting chart as governing the following year is an interpretive convention with no astronomical warrant. The houses depend on where the chart is cast, and practitioners differ between birthplace and current location.
                              </p>
                              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                                {yearCards.map(yc => (
                                  <div key={yc.title} style={{ padding: "14px 16px", borderRadius: 12, background: yc.col + "08", border: `1px solid ${yc.col}22` }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                                      <span style={{ fontSize: "1.2rem", color: yc.col }}>{yc.icon}</span>
                                      <span style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.76rem", fontWeight: "700", color: yc.col }}>{yc.title}</span>
                                      <span style={{ marginLeft: "auto", fontFamily: "'Share Tech Mono',monospace", fontSize: "0.72rem", color: SIGN_COL[yc.sign], fontWeight: "600" }}>{yc.sign}</span>
                                    </div>
                                    <p style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.8rem", lineHeight: 1.65, color: M3.onSurface, margin: 0 }}>{yc.body}</p>
                                  </div>
                                ))}
                              </div>
                            </Card>

                            <Card title="↩ Year Ahead — Summary">
                              <div style={{ padding: "14px 16px", background: M3.surfaceVariant, borderRadius: 12, fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.84rem", color: M3.onSurface, lineHeight: 1.8 }}>
                                <p style={{ margin: 0 }}>
                                  The return positions are listed above. Nothing in the astronomy makes them govern the year; that is a convention of the technique.
                                </p>
                                <p style={{ margin: "10px 0 0" }}>
                                  Jupiter stands in {srJup} in the return chart.
                                </p>
                              </div>
                            </Card>
                          </>);
                        })()}

                        <div style={grid2}>
                          <Card title="↩ Year-Ahead Planet Positions">
                            <p style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.72rem", lineHeight: 1.5, color: M3.onSurfaceVariant, margin: "0 0 10px" }}>
                              The computed positions for the return moment.</p>
                            {res.srPos && <PlanetTable positions={res.srPos} jd={res.srJD} />}
                          </Card>
                          <Card title="↩ Year-Ahead Wheel">
                            <p style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.72rem", lineHeight: 1.5, color: M3.onSurfaceVariant, margin: "0 0 10px" }}>
                              The wheel plots the return positions. Hover or tap any body for details.
                            </p>
                            <div style={{ display: "flex", justifyContent: "center" }}>
                              <WheelWithTooltip positions={res.srPos} size={300} id="sr" />
                            </div>
                          </Card>
                        </div>
                      </>
                    ) : (
                      <Card><div style={{ textAlign: "center", color: M3.secondary, fontFamily: "'Share Tech Mono',monospace", padding: 40 }}>Solar return not found in search range.</div></Card>
                    )}
                  </div>
                )}

                {tab === "harmonics" && (
                  <ErrorBoundary><HarmonicsTab ctx={{ M3, res, P_COL, P_SYM, zodSign, zodDeg, Card, WheelWithTooltip }} /></ErrorBoundary>
                )}

                {false && tab === "harmonics-old" && (() => {
                  const HARM_DEFS = {
                    2: { col: "#ff8a50", label: "Inner Duality (Opposition)", desc: "The 2nd harmonic, the opposition family, 180°.", lookFor: "Conjunctions here correspond to oppositions in the natal figure." },
                    3: { col: "#a5d6a7", label: "Natural Gifts (Trine)", desc: "The 3rd harmonic, the trine family, 120°.", lookFor: "Conjunctions here correspond to trines in the natal figure." },
                    4: { col: "#ff5252", label: "Friction & Drive (Square)", desc: "The 4th harmonic, the square and opposition family, 90°.", lookFor: "Conjunctions here correspond to squares and oppositions in the natal figure." },
                    5: { col: "#64b5f6", label: "Creativity & Art", desc: "The 5th harmonic, the quintile family, 72°, argued for by Kepler on harmonic grounds.", lookFor: "Conjunctions here correspond to quintiles, the 72° family, in the natal figure." },
                    6: { col: "#81c784", label: "Service & Duty", desc: "The 6th harmonic, the sextile family, 60°.", lookFor: "Conjunctions here correspond to sextiles in the natal figure." },
                    7: { col: "#ce93d8", label: "Intuition & Spiritual Gifts", desc: "The 7th harmonic, the septile family, 51.4°, a division that does not resolve into whole degrees.", lookFor: "Conjunctions here correspond to septiles, the 51.4° family, in the natal figure." },
                    8: { col: "#ffb74d", label: "Transformation & Power", desc: "The 8th harmonic, the semisquare family, 45°.", lookFor: "Conjunctions here correspond to semisquares in the natal figure." },
                    9: { col: "#f48fb1", label: "Purpose & Soul Bonds", desc: "The 9th harmonic, the novile family, 40°, corresponding to the navamsa of Vedic practice.", lookFor: "Conjunctions here correspond to noviles, the 40° family, in the natal figure." },
                    10: { col: "#4db6ac", label: "Public Impact & Legacy", desc: "The 10th harmonic, the decile family, 36°.", lookFor: "Conjunctions here correspond to deciles, the 36° family, in the natal figure." },
                    11: { col: "#9fa8da", label: "Vision & Idealism", desc: "The 11th harmonic, the undecile family, 32.7°, little used in classical practice.", lookFor: "Conjunctions here correspond to undeciles, the 32.7° family, in the natal figure." },
                    12: { col: "#ffd54f", label: "Hidden Lessons & Karma", desc: "The 12th harmonic, the semisextile family, 30°.", lookFor: "Conjunctions here correspond to semisextiles in the natal figure." },
                  };
                  const hd = HARM_DEFS[n];
                  const hPos = harmonic(res.trop, n);
                  const hAsp = calcAspects(hPos);
                  const tight = hAsp.filter(a => a.name === "Conjunction" && a.strength > 0.5).slice(0, 6);
                  const anyAsp = hAsp.filter(a => a.strength > 0.6).slice(0, 8);
                  const clusterMap = {};
                  Object.entries(hPos).forEach(([p, lon]) => {
                    const s = zodSign(lon);
                    if (!clusterMap[s]) clusterMap[s] = [];
                    clusterMap[s].push(p);
                  });
                  const clusters = Object.entries(clusterMap).filter(([, ps]) => ps.length >= 2).sort((a, b) => b[1].length - a[1].length);
                  const getPairInsight = (p1, p2) => {
                    const r0 = P_ROLE[p1] || p1, r1 = P_ROLE[p2] || p2;
                    return PAIR_INSIGHT[`${r0}+${r1}`] || PAIR_INSIGHT[`${r1}+${r0}`] || `No pair record is held for these two bodies.`;
                  };

                  return (
                    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                      <Card style={{ background: `linear-gradient(135deg,${M3.primaryContainer}88,${M3.surfaceContainer})`, borderColor: M3.outline }}>
                        <div style={{ fontFamily: "Cinzel,serif", fontSize: "1rem", color: M3.primary, marginBottom: 8 }}>What are Hidden Patterns?</div>
                        <p style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.82rem", lineHeight: 1.65, color: M3.onSurface, margin: 0 }}>
                          The nth harmonic multiplies every longitude by n and reduces modulo 360, so bodies separated by 360/n degrees land together. The 4th harmonic turns every square and opposition into a conjunction; the 5th shows the 72-degree family; the 7th the 51.4-degree family. The method comes from the harmonic work of John Addey.
                        </p>
                        <p style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.82rem", lineHeight: 1.65, color: M3.onSurface, marginTop: 8 }}>
                          <strong>Reading the result:</strong> clusters are bodies grouped in the same sign after the transform. The transform multiplies positional error along with position, so at high n a conjunction may be an artefact of the arithmetic rather than a feature of the figure.
                        </p>
                      </Card>

                      <Card title="∞ Select a Pattern Layer">
                        <div style={{ display: "flex", gap: 7, flexWrap: "wrap", marginBottom: 16 }}>
                          {[2, 3, 4, 5, 7, 9, 12].map(num => {
                            const d = HARM_DEFS[num];
                            return (
                              <button key={num} onClick={() => setN(num)}
                                style={{
                                  padding: "7px 14px", border: `1.5px solid ${d.col}${n === num ? "" : "44"}`,
                                  borderRadius: 20, cursor: "pointer",
                                  background: n === num ? d.col + "33" : "transparent",
                                  color: n === num ? d.col : M3.onSurfaceVariant,
                                  fontFamily: "'Share Tech Mono',monospace", fontSize: "0.72rem", fontWeight: n === num ? "700" : "400",
                                  transition: "all 0.2s"
                                }}>
                                #{num} {d.label.split("(")[0].trim()}
                              </button>
                            );
                          })}
                          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                            <span style={{ color: M3.secondary, fontFamily: "'Share Tech Mono',monospace", fontSize: "0.68rem" }}>Other:</span>
                            <input type="number" value={n} min={2} max={24} step={1}
                              onChange={e => setN(Math.max(2, Math.min(24, parseInt(e.target.value) || n)))}
                              style={{
                                width: 52, padding: "6px 8px", background: M3.surfaceDim,
                                border: `1px solid ${M3.outline}`, borderRadius: 8, color: M3.onSurface,
                                fontFamily: "'Share Tech Mono',monospace", fontSize: "0.75rem", outline: "none"
                              }} />
                          </div>
                        </div>

                        <div style={{ padding: "14px 16px", borderRadius: 12, background: (hd?.col || M3.primary) + "0e", border: `1px solid ${(hd?.col || M3.primary)}28` }}>
                          <div style={{ color: hd?.col || M3.primary, fontFamily: "'Share Tech Mono',monospace", fontSize: "0.82rem", fontWeight: "700", marginBottom: 6 }}>
                            Pattern #{n} — {hd?.label || `Harmonic ${n}`}
                          </div>
                          <p style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.8rem", lineHeight: 1.65, color: M3.onSurface, margin: 0 }}>
                            {hd?.desc || `The ${n}th harmonic divides the circle into ${n} equal parts. Bodies ${(360 / n).toFixed(1)}° apart in the natal figure appear conjunct here.`}
                          </p>
                          {(hd?.lookFor || !hd) && (
                            <p style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.76rem", lineHeight: 1.55, color: M3.secondary, margin: "8px 0 0", fontStyle: "italic" }}>
                              {hd?.lookFor || `Look for clusters and conjunctions in the chart below — they reveal planets that resonate together at this ${n}-fold frequency.`}
                            </p>
                          )}
                        </div>
                      </Card>

                      {(clusters.length > 0 || tight.length > 0) && (
                        <Card title={`✦ Harmonic #${n} — Groupings`}>
                          {clusters.length > 0 && (
                            <div style={{ marginBottom: 14 }}>
                              <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.65rem", color: M3.secondary, letterSpacing: "0.1em", marginBottom: 8 }}>SIGN CLUSTERS — WHERE ENERGY CONCENTRATES</div>
                              {clusters.map(([sign, planets]) => (
                                <div key={sign} style={{
                                  padding: "10px 14px", marginBottom: 8, borderRadius: 10,
                                  background: SIGN_COL[sign] + "0c", border: `1px solid ${SIGN_COL[sign]}22`
                                }}>
                                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                                    <span style={{ color: SIGN_COL[sign], fontSize: "1.1rem" }}>{SIGN_SYM[SIGNS.indexOf(sign)]}</span>
                                    <span style={{ color: SIGN_COL[sign], fontFamily: "'Share Tech Mono',monospace", fontSize: "0.78rem", fontWeight: "700" }}>{sign} — {planets.length} planets</span>
                                  </div>
                                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 6 }}>
                                    {planets.map(p => (
                                      <span key={p} style={{
                                        padding: "3px 10px", borderRadius: 14, background: P_COL[p] + "18", border: `1px solid ${P_COL[p]}44`,
                                        color: P_COL[p], fontFamily: "'Share Tech Mono',monospace", fontSize: "0.66rem"
                                      }}>
                                        {P_SYM[p]} {p} <span style={{ opacity: 0.6 }}>({P_ROLE[p] || ""})</span>
                                      </span>
                                    ))}
                                  </div>
                                  <p style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.74rem", lineHeight: 1.55, color: M3.onSurfaceVariant, margin: 0 }}>
                                    {(() => {
                                      const si = SIGN_INFO[sign] || {};
                                      const el = si.element || "";
                                      const signStyle = sign === "Aries" ? "bold, direct action" : sign === "Taurus" ? "steady, grounded persistence" : sign === "Gemini" ? "mental agility and communication" : sign === "Cancer" ? "emotional depth and nurturing" : sign === "Leo" ? "confident self-expression and warmth" : sign === "Virgo" ? "careful refinement and service" : sign === "Libra" ? "balance, fairness, and partnership" : sign === "Scorpio" ? "intensity, transformation, and depth" : sign === "Sagittarius" ? "expansive vision and truth-seeking" : sign === "Capricorn" ? "disciplined structure and ambition" : sign === "Aquarius" ? "unconventional thinking and community" : "intuitive sensitivity and imagination";
                                      if (planets.length >= 3) {
                                        return `${planets.map(p => P_ROLE[p] || p).join(", ")} fall together in ${sign} at this harmonic, a grouping of ${planets.length}. In the natal figure these bodies stand at or near the ${(360 / n).toFixed(1)}° family of separations.`;
                                      }
                                      const r0 = P_ROLE[planets[0]] || planets[0], r1 = P_ROLE[planets[1]] || planets[1];
                                      const insight = getPairInsight(planets[0], planets[1]);
                                      return `${r0} and ${r1} fall together in ${sign} at this harmonic. ${insight}`;
                                    })()}
                                  </p>
                                </div>
                              ))}
                            </div>
                          )}
                          {tight.length > 0 && (
                            <div>
                              <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.65rem", color: M3.secondary, letterSpacing: "0.1em", marginBottom: 8 }}>TIGHT CONJUNCTIONS — STRONGEST HIDDEN LINKS</div>
                              {tight.map((a, i) => (
                                <div key={i} style={{
                                  padding: "8px 12px", marginBottom: 6, borderRadius: 8,
                                  background: (hd?.col || M3.primary) + "08", borderLeft: `3px solid ${hd?.col || a.col}`
                                }}>
                                  <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.72rem", color: M3.onSurface }}>
                                    <span style={{ color: P_COL[a.p1] }}>{P_SYM[a.p1]} {a.p1}</span>
                                    <span style={{ color: hd?.col || a.col, margin: "0 6px" }}>☌</span>
                                    <span style={{ color: P_COL[a.p2] }}>{P_SYM[a.p2]} {a.p2}</span>
                                    <span style={{ color: M3.onSurfaceVariant, marginLeft: 8, fontSize: "0.65rem" }}>{(a.strength * 100).toFixed(0)}% strength</span>
                                  </div>
                                  <p style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.72rem", lineHeight: 1.5, color: M3.onSurfaceVariant, margin: "4px 0 0" }}>
                                    {(() => {
                                      const r0 = P_ROLE[a.p1] || a.p1, r1 = P_ROLE[a.p2] || a.p2;
                                      const insight = getPairInsight(a.p1, a.p2);
                                      const hdContext = hd ? {
                                        2: `The 2th harmonic is the opposition family, 180°.`,
                                        3: `The 3th harmonic is the trine family, 120°.`,
                                        4: `The 4th harmonic is the square and opposition family, 90°.`,
                                        5: `The 5th harmonic is the quintile family, 72°.`,
                                        6: `The 6th harmonic is the sextile family, 60°.`,
                                        7: `The 7th harmonic is the septile family, 51.4°.`,
                                        8: `The 8th harmonic is the semisquare family, 45°.`,
                                        9: `The 9th harmonic is the novile family, 40°, corresponding to the navamsa.`,
                                        10: `The 10th harmonic is the decile family, 36°.`,
                                        11: `The 11th harmonic is the undecile family, 32.7°.`,
                                        12: `The 12th harmonic is the semisextile family, 30°.`,
                                      }[n] || "" : "";
                                      const strLabel = a.strength > 0.85 ? "The separation here is unusually tight for this harmonic." : a.strength > 0.75 ? "This is a strong bond." : "";
                                      return `At this level, ${insight}. ${hdContext} ${strLabel}`;
                                    })()}
                                  </p>
                                </div>
                              ))}
                            </div>
                          )}
                          {clusters.length === 0 && tight.length === 0 && (
                            <p style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.8rem", lineHeight: 1.6, color: M3.onSurfaceVariant, textAlign: "center", padding: 20 }}>
                              No clusters or tight conjunctions at this harmonic. The transformed positions are evenly distributed rather than grouped.</p>
                          )}
                        </Card>
                      )}

                      <div style={grid2}>
                        <Card title={`∞ Pattern #${n} — Remapped Positions`}>
                          <p style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.72rem", lineHeight: 1.5, color: M3.onSurfaceVariant, margin: "0 0 10px" }}>
                            Each planet's birth position × {n}, wrapped to 360°. Planets in the same sign here share a hidden {n}-fold resonance.
                          </p>
                          <PlanetTable positions={hPos} jd={res.jd} resonance={res.mathematical_resonance} />
                        </Card>
                        <Card title={`∞ Pattern #${n} — Wheel`}>
                          <p style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.72rem", lineHeight: 1.5, color: M3.onSurfaceVariant, margin: "0 0 10px" }}>
                            The harmonic wheel. Bodies close together here stand at or near the corresponding family of separations in the natal figure.</p>
                          <div style={{ display: "flex", justifyContent: "center" }}>
                            <WheelWithTooltip positions={hPos} size={300} id={`h${n}`} />
                          </div>
                        </Card>
                      </div>

                      {anyAsp.length > 0 && (
                        <Card title={`∞ Pattern #${n} — All Strong Connections (${anyAsp.length})`}>
                          <p style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.72rem", lineHeight: 1.5, color: M3.onSurfaceVariant, margin: "0 0 10px" }}>
                            The tightest separations in the transformed chart, listed with their orbs.</p>
                          <AspectTable aspects={anyAsp} />
                        </Card>
                      )}
                    </div>
                  );
                })()}

                {false && tab === "transits" && (() => {
                  const TRANSIT_MEANING = {
                    Sun: { slow: false, flavor: "spotlight, vitality, conscious focus" },
                    Moon: { slow: false, flavor: "mood shifts, emotional triggers, daily rhythms" },
                    Mercury: { slow: false, flavor: "communication shifts, mental focus, travel patterns" },
                    Venus: { slow: false, flavor: "relationships, pleasure, financial flow, aesthetic sense" },
                    Mars: { slow: false, flavor: "energy levels, motivation, conflict triggers, physical drive" },
                    Jupiter: { slow: true, flavor: "expansion, opportunity, optimism, where life opens up" },
                    Saturn: { slow: true, flavor: "discipline, restriction, maturing, where life gets serious" },
                    Uranus: { slow: true, flavor: "sudden change, liberation, breakthroughs, disruption" },
                    Neptune: { slow: true, flavor: "dreams, confusion, spiritual openings, dissolving boundaries" },
                    Pluto: { slow: true, flavor: "deep transformation, power shifts, endings and rebirths" },
                  };
                  const activeTransits = Object.entries(res.trPos).map(([p, lon]) => {
                    const natalLon = res.trop[p];
                    const diff = Math.abs(norm(lon - natalLon));
                    const angle = diff > 180 ? 360 - diff : diff;
                    const aspMatch = ASPECTS.find(a => Math.abs(angle - a.angle) <= a.orb);
                    return { p, lon, aspMatch };
                  });
                  const hits = activeTransits.filter(t => t.aspMatch);
                  return (
                    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                      <Card style={{ background: `linear-gradient(135deg,${M3.primaryContainer}88,${M3.surfaceContainer})`, borderColor: M3.outline }}>
                        <div style={{ fontFamily: "Cinzel,serif", fontSize: "1rem", color: M3.primary, marginBottom: 8 }}>Transits — Where the Planets Are Right Now vs Your Birth</div>
                        <p style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.82rem", lineHeight: 1.65, color: M3.onSurface, margin: 0 }}>
                          Transits are the current computed positions set against the natal positions. A contact is reported when the angular separation falls within the orb in use.
                        </p>
                        <p style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.82rem", lineHeight: 1.65, color: M3.onSurface, marginTop: 8 }}>
                          <strong>Fast planets</strong> (Sun, Moon, Mercury, Venus, Mars) move quickly and create brief, passing influences — moods, events, conversations.
                          <strong> Slow planets</strong> (Jupiter, Saturn, Uranus, Neptune, Pluto) move gradually and create major life chapters lasting months or years.
                        </p>
                      </Card>

                      <Card title="⟳ Transiting Positions Against the Natal Figure">
                        <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.65rem", color: M3.secondary, marginBottom: 10, letterSpacing: "0.1em" }}>
                          {new Date().toDateString().toUpperCase()} — {hits.length} of {activeTransits.length} bodies form a contact within the orbs in use</div>
                        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                          {activeTransits.map(({ p, lon, aspMatch }) => {
                            const tm = TRANSIT_MEANING[p] || {};
                            return (
                              <div key={p} style={{
                                padding: "8px 12px", borderRadius: 8,
                                background: aspMatch ? aspMatch.col + "0e" : "transparent",
                                border: aspMatch ? `1px solid ${aspMatch.col}18` : `1px solid transparent`
                              }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                  <span style={{ color: P_COL[p], width: 18, textAlign: "center", fontSize: "1rem" }}>{P_SYM[p]}</span>
                                  <span style={{ color: M3.onSurface, fontFamily: "'Share Tech Mono',monospace", fontSize: "0.72rem", fontWeight: "600", minWidth: 70 }}>{p}</span>
                                  <span style={{ color: M3.onSurfaceVariant, fontFamily: "'Share Tech Mono',monospace", fontSize: "0.68rem", flex: 1 }}>
                                    currently in {zodSign(lon)} at {zodDeg(lon)}°
                                  </span>
                                  {aspMatch && (
                                    <span style={{ color: aspMatch.col, fontFamily: "'Share Tech Mono',monospace", fontSize: "0.68rem", fontWeight: "700" }}>
                                      {aspMatch.sym} {aspMatch.name}
                                    </span>
                                  )}
                                </div>
                                {aspMatch && (
                                  <div style={{ marginTop: 5, marginLeft: 26 }}>
                                    <p style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.74rem", lineHeight: 1.5, color: M3.onSurfaceVariant, margin: 0 }}>
                                      Transiting {p} ({tm.flavor || ""}) is forming a <strong style={{ color: aspMatch.col }}>{aspMatch.name}</strong> ({ASP_EXPLAIN[aspMatch.name] || aspMatch.name}) to your birth {p}.
                                      {tm.slow ? " This is a slow-moving transit — its influence unfolds over weeks or months and marks a significant chapter." : " This is a fast-moving transit — its influence is felt today and passes within days."}
                                    </p>
                                  </div>
                                )}
                                {!aspMatch && (
                                  <div style={{ marginTop: 3, marginLeft: 26 }}>
                                    <span style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.68rem", color: M3.outlineVariant, fontStyle: "italic" }}>
                                      No contact to natal {p} within the orbs in use.
                                    </span>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </Card>

                      {res.trAsp.length > 0 && (
                        <Card title={`⟳ All Cross-Chart Connections (${res.trAsp.length})`}>
                          <p style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.74rem", lineHeight: 1.5, color: M3.onSurfaceVariant, margin: "0 0 10px" }}>
                            Every contact between the current positions and the natal figure, at the orbs in use. A count is not a significance.
                          </p>
                          <AspectTable aspects={res.trAsp.slice(0, 30)} />
                        </Card>
                      )}
                    </div>
                  );
                })()}

                {false && tab === "synastry" && (
                  res.synR ? (() => {
                    const conj = res.synR.aspects.filter(a => a.name === "Conjunction");
                    const trines = res.synR.aspects.filter(a => a.name === "Trine");
                    const squares = res.synR.aspects.filter(a => a.name === "Square");
                    const opps = res.synR.aspects.filter(a => a.name === "Opposition");
                    const harmony = trines.length + conj.length * 0.5;
                    const friction = squares.length + opps.length;
                    const ratio = harmony > 0 ? (harmony / (harmony + friction) * 100).toFixed(0) : 50;
                    return (
                      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                        <Card style={{ background: `linear-gradient(135deg,${M3.primaryContainer}88,${M3.surfaceContainer})`, borderColor: M3.outline }}>
                          <div style={{ fontFamily: "Cinzel,serif", fontSize: "1rem", color: M3.primary, marginBottom: 8 }}>Synastry — How Two Charts Interact</div>
                          <p style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.82rem", lineHeight: 1.65, color: M3.onSurface, margin: 0 }}>
                            Synastry lays one chart over the other and reports the contacts between them, with their orbs. The counts depend on the orb policy in use and are not a verdict about the two people.
                          </p>
                          <p style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.82rem", lineHeight: 1.65, color: M3.onSurface, marginTop: 8 }}>
                            <strong>How to read it:</strong> Look at which planets connect between the two charts. Sun-Moon links suggest emotional resonance, Venus-Mars links suggest attraction, Mercury connections shape communication, and Saturn contacts indicate where things get serious or tested.
                          </p>
                        </Card>

                        <Card title="◈ Contact Summary">
                          <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 14 }}>
                            <div style={{ flex: 1, minWidth: 140, textAlign: "center", padding: "14px 12px", borderRadius: 12, background: "#69ff8e0c", border: "1px solid #69ff8e22" }}>
                              <div style={{ fontFamily: "Cinzel,serif", fontSize: "1.5rem", color: "#69ff8e" }}>{ratio}%</div>
                              <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.66rem", color: M3.secondary, marginTop: 4 }}>SOFT / TOTAL</div>
                            </div>
                            {[
                              { n: "Conjunctions", c: conj.length, col: "#FFD700", tip: "Fused energy — amplifies shared themes" },
                              { n: "Trines", c: trines.length, col: "#69ff8e", tip: "Natural ease and flow" },
                              { n: "Squares", c: squares.length, col: "#ff8a50", tip: "Creative friction and growth" },
                              { n: "Oppositions", c: opps.length, col: "#ff5252", tip: "Push-pull tension and awareness" },
                            ].map(x => (
                              <div key={x.n} style={{ flex: 1, minWidth: 110, textAlign: "center", padding: "12px 8px", borderRadius: 12, background: x.col + "0a", border: `1px solid ${x.col}22` }}>
                                <div style={{ fontFamily: "Cinzel,serif", fontSize: "1.3rem", color: x.col }}>{x.c}</div>
                                <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.62rem", color: x.col, marginTop: 2 }}>{x.n}</div>
                                <div style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.62rem", color: M3.outlineVariant, marginTop: 2 }}>{x.tip}</div>
                              </div>
                            ))}
                          </div>
                          <p style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.78rem", lineHeight: 1.6, color: M3.onSurfaceVariant, margin: 0, textAlign: "center" }}>
                            {`${harmony.toFixed(1)} soft against ${friction} hard contacts, at the orbs in use.`}
                          </p>
                        </Card>

                        {(() => {
                          const frictionAsp = [...squares, ...opps].sort((a, b) => b.strength - a.strength).slice(0, 3);
                          if (frictionAsp.length === 0) return null;
                          const SYN_CONTACT = {
                            "Sun+Sun": "Two solar significators in contact: the chart-rulers of identity meeting directly.",
                            "Sun+Moon": "The two lights across charts. Classical texts weight this contact heavily.",
                            "Sun+Mercury": "The light and the messenger. Mercury never departs far from the Sun, so this contact recurs frequently.",
                            "Sun+Venus": "The light and the lesser benefic. Venus stays within a bounded elongation of the Sun.",
                            "Sun+Mars": "One person's sense of self triggers the other's aggression or drive. The growth: channelling competition into mutual motivation rather than power struggles.",
                            "Sun+Saturn": "Identity meets restriction — one person feels limited by the other. The growth: real commitment means accepting the weight of responsibility along with the warmth of love.",
                            "Sun+Jupiter": "Overexpansion meets identity — one person's optimism overwhelms the other. The growth: calibrating enthusiasm so it inspires rather than overshadows.",
                            "Moon+Moon": "The two lunar significators. The Moon is the fastest body, so these contacts are the most sensitive to birth-time accuracy.",
                            "Moon+Mercury": "Feelings meet logic, and they don't speak the same language. The growth: building a bridge between emotional truth and rational understanding.",
                            "Moon+Venus": "The Moon and the lesser benefic, both nocturnal in the classical scheme.",
                            "Moon+Mars": "Emotional vulnerability meets aggression. The growth: learning to be tender and direct at the same time — anger doesn't have to mean rejection.",
                            "Moon+Saturn": "The Moon and the greater malefic. The classical reading is restriction on the lunar significator; the modern psychological reading softens this to structure, and the two are not the same claim.",
                            "Venus+Mars": "Attraction meets friction — desire and affection pull in different directions. The growth: learning that passion and tenderness are not opposites but partners.",
                            "Venus+Saturn": "Love meets restriction — one person's affection feels blocked by the other's walls. The growth: love that survives Saturn contact becomes unbreakable.",
                            "Mars+Saturn": "Drive meets discipline — one person's energy feels controlled by the other. The growth: learning to focus ambition rather than fight it. This aspect builds incredible joint productivity once the power struggle resolves.",
                            "Mars+Mars": "Two sets of drives competing. The growth: channelling mutual intensity into shared goals rather than opposing battles.",
                            "Mercury+Mercury": "Two different thinking styles colliding. The growth: intellectual diversity strengthens decisions when both people learn to listen.",
                            "Jupiter+Saturn": "The two social bodies and the slowest of the classical seven; their mutual cycle of about twenty years is the great conjunction of mundane astrology.",
                          };
                          const getKey = (a) => {
                            const p1 = a.p1.replace(/^[AB]_/, ""), p2 = a.p2.replace(/^[AB]_/, "");
                            return SYN_CONTACT[`${p1}+${p2}`] || SYN_CONTACT[`${p2}+${p1}`] || `A contact between the ${(P_ROLE[p1] || p1).toLowerCase()} significator of one chart and the ${(P_ROLE[p2] || p2).toLowerCase()} significator of the other.`;
                          };
                          return (
                            <Card title="◈ Hard Contacts Between the Two Charts">
                              <p style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.76rem", lineHeight: 1.55, color: M3.onSurfaceVariant, margin: "0 0 12px" }}>
                                The tightest hard contacts between the two charts, listed with their orbs.</p>
                              {frictionAsp.map((a, i) => {
                                const p1 = a.p1.replace(/^[AB]_/, ""), p2 = a.p2.replace(/^[AB]_/, "");
                                return (
                                  <div key={i} style={{ padding: "12px 16px", marginBottom: 8, borderRadius: 10, background: a.col + "0e", borderLeft: `3px solid ${a.col}` }}>
                                    <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.72rem", color: M3.onSurface, marginBottom: 4 }}>
                                      <span style={{ color: P_COL[p1] || M3.primary }}>{P_SYM[p1] || ""} A's {p1}</span>
                                      <span style={{ color: a.col, margin: "0 6px" }}>{a.sym} {a.name}</span>
                                      <span style={{ color: P_COL[p2] || M3.primary }}>{P_SYM[p2] || ""} B's {p2}</span>
                                      <span style={{ color: M3.outlineVariant, marginLeft: 8, fontSize: "0.62rem" }}>{(a.strength * 100).toFixed(0)}%</span>
                                    </div>
                                    <p style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.76rem", lineHeight: 1.6, color: M3.onSurface, margin: 0 }}>{getKey(a)}</p>
                                  </div>
                                );
                              })}
                            </Card>
                          );
                        })()}

                        <div style={grid2}>
                          <Card title="♡ Person A — Birth Chart">
                            <div style={{ display: "flex", justifyContent: "center" }}>
                              <WheelWithTooltip positions={res.trop} houses={res.houses} size={280} id="synA" />
                            </div>
                          </Card>
                          <Card title="♡ Person B — Birth Chart">
                            <div style={{ display: "flex", justifyContent: "center" }}>
                              <WheelWithTooltip positions={res.synR.positions} houses={res.synR.houses} size={280} id="synB" />
                            </div>
                          </Card>
                        </div>

                        <Card title={`♡ All Cross-Chart Connections (${res.synR.aspects.length} links)`}>
                          <p style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.74rem", lineHeight: 1.5, color: M3.onSurfaceVariant, margin: "0 0 10px" }}>
                            Each row shows a connection between one of Person A's planets and one of Person B's. The "strength" percentage indicates how tight the aspect is — higher means more strongly felt by both people.
                          </p>
                          <AspectTable aspects={res.synR.aspects} />
                        </Card>
                      </div>
                    );
                  })() : (
                    <Card style={{ background: `linear-gradient(135deg,${M3.primaryContainer}88,${M3.surfaceContainer})`, borderColor: M3.outline }}>
                      <div style={{ fontFamily: "Cinzel,serif", fontSize: "1rem", color: M3.primary, marginBottom: 8 }}>Synastry — Relationship Chart Comparison</div>
                      <p style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.82rem", lineHeight: 1.65, color: M3.onSurface, margin: "0 0 16px" }}>
                        Synastry reports the contacts between two charts with their orbs. It offers no verdict about the two people.
                      </p>
                      <div style={{ textAlign: "center", color: M3.secondary, fontFamily: "'Share Tech Mono', monospace", padding: "30px 0", borderTop: `1px solid ${M3.outlineVariant}` }}>
                        To use: check "Synastry" in the birth data form above, enter Person B's birth details, and click Compute.
                      </div>
                    </Card>
                  )
                )}

                {false && tab === "chinese" && (() => {
                  const ai = ANIMAL_INFO[res.cn.animal] || {};
                  const ei = CN_EL_INFO[res.cn.element] || {};
                  const pi = POLARITY_INFO[res.cn.polarity] || {};
                  return (
                    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                      <Card style={{ background: `linear-gradient(135deg,${M3.primaryContainer}88,${M3.surfaceContainer})`, borderColor: M3.outline }}>
                        <div style={{ fontFamily: "Cinzel,serif", fontSize: "1rem", color: M3.primary, marginBottom: 8 }}>Chinese Astrology — The Sexagenary Cycle</div>
                        <p style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.82rem", lineHeight: 1.65, color: M3.onSurface, margin: 0 }}>
                          Chinese astrology is based on a 60-year cycle (sexagenary cycle) combining 12 animals, 5 elements (Wood, Fire, Earth, Metal, Water), and Yin/Yang polarity. Unlike Western astrology which maps the sky at birth, the Chinese system uses the lunar calendar year, making your animal and element fixed by the year you were born (adjusted for the Chinese New Year date). Each combination creates a unique character archetype that repeats every 60 years.
                        </p>
                        <p style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.82rem", lineHeight: 1.65, color: M3.onSurface, marginTop: 8 }}>
                          <strong>How to read it:</strong> the <strong>animal</strong> names the earthly branch of the year, and the <strong>element</strong> names the phase paired with it. The cycle year begins at the lunar new year, not on 1 January.
                        </p>
                      </Card>
                      <Card title={`☯ Year of the ${res.cn.animal} — ${res.cn.element} ${res.cn.polarity}`}>
                        <div style={{ textAlign: "center", marginBottom: 16 }}>
                          <div style={{ fontSize: "4rem", lineHeight: 1 }}>{ai.emoji || "☯"}</div>
                          <div style={{ fontSize: "2.4rem", color: M3.primary, marginTop: 4 }}>{res.cn.stem}{res.cn.branch}</div>
                          <div style={{ fontSize: "1rem", color: M3.secondary, marginTop: 2, fontFamily: "'EB Garamond',Georgia,serif", fontStyle: "italic" }}>
                            {res.cn.stemPinyin}-{res.cn.branchPinyin}
                          </div>
                          {res.cn.lunar && (
                            <div style={{ marginTop: 8, padding: "6px 18px", borderRadius: 20, background: M3.surfaceVariant + "66", display: "inline-block" }}>
                              <span style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.76rem", color: M3.primary, fontWeight: "700" }}>
                                Day {res.cn.lunar.day}, {res.cn.lunar.monthName} Month
                              </span>
                              <span style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.68rem", color: M3.onSurfaceVariant, marginLeft: 8 }}>
                                (Chinese lunar calendar)
                              </span>
                            </div>
                          )}
                          <div style={{ marginTop: 8, display: "flex", justifyContent: "center", gap: 8, flexWrap: "wrap" }}>
                            <span style={{ padding: "4px 14px", borderRadius: 20, background: ei.color + "22", border: `1px solid ${ei.color}66`, color: ei.color, fontFamily: "'Share Tech Mono',monospace", fontSize: "0.72rem", fontWeight: "700" }}>{res.cn.element}</span>
                            <span style={{ padding: "4px 14px", borderRadius: 20, background: M3.primaryContainer, color: M3.onPrimaryContainer, fontFamily: "'Share Tech Mono',monospace", fontSize: "0.72rem" }}>{pi.label}</span>
                          </div>
                          <div style={{ color: M3.onSurfaceVariant, fontFamily: "'Share Tech Mono',monospace", fontSize: "0.65rem", marginTop: 6 }}>
                            Position {res.cn.cycle60} of 60 in the Sexagenary Cycle (a 60-year grand cycle that combines the 12 animals with the 5 elements)
                          </div>
                          {res.cn.effectiveYear && res.cn.effectiveYear !== A.year && (
                            <div style={{ color: M3.tertiary, fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.7rem", fontStyle: "italic", marginTop: 6 }}>
                              Note: this date, {A.month}/{A.day}/{A.year}, falls before the Chinese New Year for that year, so the branch is taken from the preceding cycle year.</div>
                          )}
                        </div>
                      </Card>

                      <Card title="☯ Position on the Wheel">
                        <div style={{ display: "flex", justifyContent: "center" }}>
                          <ChineseWheelWithTooltip cn={res.cn} size={Math.min(420, window.innerWidth - 80)} />
                        </div>
                      </Card>

                      <Card title={`${ai.emoji} The ${res.cn.animal} — "${ai.archetype}"`}>
                        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 12 }}>
                          {(ai.trait || "").split(", ").map(t => (
                            <span key={t} style={{ padding: "3px 12px", borderRadius: 16, background: M3.primaryContainer, color: M3.onPrimaryContainer, fontFamily: "'Share Tech Mono',monospace", fontSize: "0.66rem" }}>{t}</span>
                          ))}
                        </div>
                        <p style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.82rem", lineHeight: 1.7, color: M3.onSurface, margin: 0 }}>{ai.desc}</p>
                        {ai.shadow && (
                          <div style={{ marginTop: 12, padding: "10px 14px", borderRadius: 10, background: "#ff525211", border: "1px solid #ff525233" }}>
                            <span style={{ color: "#ff8a80", fontFamily: "'Share Tech Mono',monospace", fontSize: "0.66rem", fontWeight: "700" }}>SHADOW SIDE: </span>
                            <span style={{ color: M3.onSurfaceVariant, fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.76rem" }}>{ai.shadow}</span>
                          </div>
                        )}
                      </Card>

                      <div style={grid2}>
                        <Card title={`☯ Element: ${res.cn.element}`}>
                          <div style={{ textAlign: "center", marginBottom: 10 }}>
                            <div style={{ width: 56, height: 56, borderRadius: "50%", background: ei.color + "22", border: `2px solid ${ei.color}`, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                              <span style={{ color: ei.color, fontFamily: "'Share Tech Mono',monospace", fontSize: "1.4rem", fontWeight: "700" }}>{res.cn.element[0]}</span>
                            </div>
                          </div>
                          <div style={{ textAlign: "center", color: ei.color, fontFamily: "'Share Tech Mono',monospace", fontSize: "0.72rem", fontWeight: "700", marginBottom: 8 }}>{ei.trait}</div>
                          <p style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.78rem", lineHeight: 1.65, color: M3.onSurface, margin: 0 }}>{ei.desc}</p>
                          {(() => {
                            const elBal = {
                              Wood: { balanced: "Wood is the phase of growth and expansion in the five-phase scheme, associated with spring and with the liver in Chinese medicine.", imbalanced: "When Wood is out of balance, you may become rigid, controlling, or chronically frustrated. Stagnant Wood energy shows as resentment, indecision, or an inability to start things.", cultivate: "Spend time in nature. Begin new creative projects. Practice forgiveness. Physical movement — especially stretching, yoga, or martial arts — unblocks Wood energy." },
                              Fire: { balanced: "Fire is the phase of maximum yang, associated with summer and with the heart.", imbalanced: "When Fire is out of balance, you may become anxious, scattered, or burn out from overcommitting. Excess Fire shows as mania, restlessness, or attention-seeking; depleted Fire shows as depression, apathy, or inability to feel joy.", cultivate: "Practice presence and mindfulness. Laugh freely. Nurture close relationships. When depleted, seek community and creative expression. When excessive, practice stillness and listening." },
                              Earth: { balanced: "Earth is the pivot phase, associated with late summer and with the spleen.", imbalanced: "When Earth is out of balance, you may become a chronic worrier, overly self-sacrificing, or stuck in cycles of overthinking. You might nurture everyone else while neglecting yourself, or become possessive and clingy.", cultivate: "Eat mindfully. Spend time cooking, gardening, or working with your hands. Practice receiving as much as giving. Set boundaries around caretaking." },
                              Metal: { balanced: "Metal is the phase of contraction and separation, associated with autumn and with the lungs.", imbalanced: "When Metal is out of balance, you may become perfectionistic, grief-stricken, or emotionally cold. You might hold onto things — possessions, grudges, the past — long after they've served their purpose.", cultivate: "Practice decluttering — physical spaces and emotional baggage. Breathe deeply. Engage with art, music, or ritual. Allow yourself to grieve fully and then release." },
                              Water: { balanced: "Water is the phase of maximum yin, associated with winter and with the kidneys.", imbalanced: "When Water is out of balance, you may become paralysed by fear, isolated, or emotionally frozen. You might hide your true self, hoard resources, or lose your willpower entirely.", cultivate: "Rest more — Water needs stillness to replenish. Meditate near water. Journal your fears honestly. Build trust slowly through consistent small actions. Listen to your body's need for quiet." },
                            };
                            const eb = elBal[res.cn.element];
                            return eb ? (
                              <div style={{ marginTop: 14 }}>
                                <div style={{ padding: "10px 14px", borderRadius: 10, background: "#69ff8e08", border: "1px solid #69ff8e18", marginBottom: 8 }}>
                                  <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.6rem", color: "#69ff8e", letterSpacing: "0.1em", marginBottom: 4 }}>WHEN BALANCED</div>
                                  <p style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.74rem", lineHeight: 1.55, color: M3.onSurface, margin: 0 }}>{eb.balanced}</p>
                                </div>
                                <div style={{ padding: "10px 14px", borderRadius: 10, background: "#ff525208", border: "1px solid #ff525218", marginBottom: 8 }}>
                                  <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.6rem", color: "#ff8a50", letterSpacing: "0.1em", marginBottom: 4 }}>WHEN OUT OF BALANCE</div>
                                  <p style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.74rem", lineHeight: 1.55, color: M3.onSurface, margin: 0 }}>{eb.imbalanced}</p>
                                </div>
                                <div style={{ padding: "10px 14px", borderRadius: 10, background: ei.color + "08", border: `1px solid ${ei.color}18` }}>
                                  <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.6rem", color: ei.color, letterSpacing: "0.1em", marginBottom: 4 }}>HOW TO CULTIVATE HEALTHY {res.cn.element.toUpperCase()}</div>
                                  <p style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.74rem", lineHeight: 1.55, color: M3.onSurface, margin: 0 }}>{eb.cultivate}</p>
                                </div>
                              </div>
                            ) : null;
                          })()}
                        </Card>

                        <Card title={`${pi.symbol} Energy: ${pi.label}`}>
                          <p style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.78rem", lineHeight: 1.65, color: M3.onSurface, margin: 0 }}>{pi.desc}</p>
                          <div style={{ marginTop: 14, padding: "10px 14px", borderRadius: 10, background: M3.surfaceDim }}>
                            <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.66rem", color: M3.secondary, marginBottom: 4 }}>COMBINED READING</div>
                            <p style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.76rem", lineHeight: 1.6, color: M3.onSurface, margin: 0 }}>
                              As a <strong style={{ color: ei.color }}>{res.cn.element}</strong> <strong style={{ color: M3.primary }}>{res.cn.animal}</strong> in a <strong>{res.cn.polarity}</strong> year, your {res.cn.element.toLowerCase()} nature expresses through the {res.cn.animal.toLowerCase()}'s {(ai.trait || "").split(", ")[0]?.toLowerCase()} quality with {res.cn.polarity === "Yang" ? "an outward, assertive energy — you act on your instincts and lead with confidence" : "an inward, reflective energy — you build power through patience and observation"}.
                            </p>
                          </div>
                          <div style={{ marginTop: 14, padding: "12px 16px", borderRadius: 12, background: M3.primaryContainer + "44", border: `1px solid ${M3.outline}33` }}>
                            <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.64rem", color: M3.primary, letterSpacing: "0.1em", marginBottom: 6 }}>YIN/YANG INTEGRATION — WHAT TO CULTIVATE</div>
                            {res.cn.polarity === "Yang" ? (
                              <p style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.76rem", lineHeight: 1.6, color: M3.onSurface, margin: 0 }}>
                                Yang polarity is read in the tradition as outward-moving and assertive.<strong>Your growth edge is cultivating Yin qualities</strong>: patience, receptivity, listening, and stillness. The strongest Yang people are those who can also be deeply still — who act from calm center rather than restless impulse. Practice: before making decisions, pause. Before speaking, listen. Before doing, feel. Your Yang power becomes unstoppable when it's rooted in Yin wisdom.
                              </p>
                            ) : (
                              <p style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.76rem", lineHeight: 1.6, color: M3.onSurface, margin: 0 }}>
                                Yin polarity is read in the tradition as inward-moving and receptive.<strong>Your growth edge is cultivating Yang qualities</strong>: decisive action, visible self-expression, and the willingness to be seen. The strongest Yin people are those who can also act boldly — who move from deep knowing into clear action. Practice: share your insights before they're perfect. Take the first step before you feel ready. Let your depth be visible. Your Yin wisdom becomes transformative when it's paired with Yang courage.
                              </p>
                            )}
                          </div>
                        </Card>
                      </div>

                      <Card title="◈ Contacts">
                        <div style={grid2}>
                          <div>
                            <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.66rem", color: "#69ff8e", letterSpacing: "0.1em", marginBottom: 8 }}>BEST ALLIES</div>
                            {(ai.compat || []).map(a => {
                              const inf = ANIMAL_INFO[a] || {};
                              return (
                                <div key={a} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 0", borderBottom: `1px solid ${M3.outlineVariant}22` }}>
                                  <span style={{ fontSize: "1.2rem" }}>{inf.emoji}</span>
                                  <div>
                                    <div style={{ color: M3.onSurface, fontFamily: "'Share Tech Mono',monospace", fontSize: "0.72rem", fontWeight: "700" }}>{a}</div>
                                    <div style={{ color: M3.onSurfaceVariant, fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.66rem", fontStyle: "italic" }}>{inf.trait}</div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                          <div>
                            <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.66rem", color: "#ff5252", letterSpacing: "0.1em", marginBottom: 8 }}>CHALLENGING MATCHES</div>
                            {(ai.clash || []).map(a => {
                              const inf = ANIMAL_INFO[a] || {};
                              return (
                                <div key={a} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 0", borderBottom: `1px solid ${M3.outlineVariant}22` }}>
                                  <span style={{ fontSize: "1.2rem" }}>{inf.emoji}</span>
                                  <div>
                                    <div style={{ color: M3.onSurface, fontFamily: "'Share Tech Mono',monospace", fontSize: "0.72rem", fontWeight: "700" }}>{a}</div>
                                    <div style={{ color: M3.onSurfaceVariant, fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.66rem", fontStyle: "italic" }}>{inf.trait}</div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </Card>

                      <Card title="☯ Five Elements (Wu Xing) — The Cycle of Creation & Control">
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center", marginBottom: 14 }}>
                          {Object.entries(CN_EL_INFO).map(([el, inf]) => {
                            const active = res.cn.element === el;
                            return (
                              <div key={el} style={{
                                padding: "7px 16px", borderRadius: 20,
                                background: active ? inf.color + "33" : "transparent",
                                border: `1px solid ${inf.color}${active ? "bb" : "33"}`,
                                color: active ? inf.color : M3.onSurfaceVariant,
                                fontFamily: "'Share Tech Mono', monospace", fontSize: "0.73rem",
                                fontWeight: active ? "700" : "400"
                              }}>{el}</div>
                            );
                          })}
                        </div>
                        <div style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.76rem", lineHeight: 1.6, color: M3.onSurfaceVariant, textAlign: "center" }}>
                          Wood feeds Fire · Fire creates Earth (ash) · Earth yields Metal (ore) · Metal carries Water (condensation) · Water nourishes Wood
                        </div>
                        <div style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.72rem", lineHeight: 1.6, color: M3.outlineVariant, textAlign: "center", marginTop: 4, fontStyle: "italic" }}>
                          Wood parts Earth · Earth dams Water · Water quenches Fire · Fire melts Metal · Metal cuts Wood
                        </div>
                      </Card>

                      <Card title="☯ The 12 Animals — Full Cycle">
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2px 14px" }}>
                          {Array.from({ length: 12 }, (_, i) => {
                            const yr = A.year - ((A.year - 1924) % 12) + i;
                            const cc = chineseCycle(yr);
                            const inf = ANIMAL_INFO[cc.animal] || {};
                            const isYou = cc.animal === res.cn.animal;
                            return (
                              <div key={i} style={{
                                padding: "5px 8px", borderRadius: 8,
                                background: isYou ? M3.primaryContainer + "44" : "transparent",
                                display: "flex", alignItems: "center", gap: 6,
                                fontFamily: "'Share Tech Mono', monospace", fontSize: "0.68rem",
                                color: isYou ? M3.tertiary : M3.onSurfaceVariant
                              }}>
                                <span style={{ fontSize: "0.9rem" }}>{inf.emoji}</span>
                                <span style={{ minWidth: 24 }}>{yr}</span>
                                <span style={{ fontWeight: isYou ? "700" : "400" }}>{cc.animal}</span>
                                <span style={{ marginLeft: "auto", fontSize: "0.6rem", color: M3.outlineVariant }}>{inf.archetype}</span>
                              </div>
                            );
                          })}
                        </div>
                      </Card>
                    </div>
                  );
                })()}

                {false && tab === "phi" && (
                  <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    <Card style={{ background: `linear-gradient(135deg,${M3.primaryContainer}88,${M3.surfaceContainer})`, borderColor: M3.outline }}>
                      <div style={{ fontFamily: "Cinzel,serif", fontSize: "1rem", color: M3.primary, marginBottom: 8 }}>Elements, Modality & Phi Rhythm</div>
                      <p style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.82rem", lineHeight: 1.65, color: M3.onSurface, margin: 0 }}>
                        The bodies of this figure are distributed across four <strong>elements</strong> (Fire = passion, Earth = practicality, Air = intellect, Water = emotion) and three <strong>modalities</strong> (Cardinal = initiator, Fixed = sustainer, Mutable = adapter). The balance between these shapes your temperament. The <strong>Phi rhythm</strong> (φ = 1.618, the golden ratio) maps your birth day to a natural energy cycle — showing whether you're in a rest, building, or peak phase.
                      </p>
                    </Card>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: 16 }}>
                      <Card title="φ Golden Ratio Rhythm — Position in the Cycle">
                        {(() => {
                          const cs = { "φ·Low": "#ff5252", "φ·Mid": M3.tertiary, "φ·High": "#69ff8e" };
                          const stateLabel = { "φ·Low": "Rest & Recharge", "φ·Mid": "Steady Progress", "φ·High": "Peak Energy" };
                          const c = cs[res.phi.state] || M3.primary;
                          return (
                            <div style={{ textAlign: "center" }}>
                              <div style={{ fontSize: "2.6rem", color: c, lineHeight: 1 }}>φ</div>
                              <div style={{ color: c, fontFamily: "'Share Tech Mono', monospace", fontWeight: "700", marginTop: 6 }}>{stateLabel[res.phi.state] || res.phi.state}</div>
                              <div style={{ color: M3.onSurfaceVariant, fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.71rem", fontStyle: "italic", marginTop: 4 }}>
                                {res.phi.phase < 0.38 ? "Energy is low — good for reflection and planning." :
                                  res.phi.phase < 0.62 ? "Momentum is building — act on steady goals." :
                                    "The index stands at its high point in this cycle."}
                              </div>
                              <div style={{ color: M3.onSurfaceVariant, fontFamily: "'Share Tech Mono', monospace", fontSize: "0.68rem", marginTop: 4 }}>cycle position {(res.phi.phase * 100).toFixed(0)}% · multiplier ×{res.phi.mult}</div>
                              <div style={{ marginTop: 12, height: 4, background: M3.outlineVariant, borderRadius: 2, overflow: "hidden" }}>
                                <div style={{ width: `${res.phi.phase * 100}%`, height: "100%", background: c }} />
                              </div>
                            </div>
                          );
                        })()}
                      </Card>
                      <Card title="△ Element Balance — Fire, Earth, Air, Water">
                        <DistBar data={res.el} colors={EL_COL} />
                      </Card>
                      <Card title="⊞ Action Style — Starter, Sustainer, Adapter">
                        <DistBar data={res.mod} colors={MOD_COL} />
                      </Card>
                      <Card title="◈ The Figure at a Glance">
                        <div style={{
                          display: "flex", flexDirection: "column", gap: 6,
                          fontFamily: "'Share Tech Mono', monospace", fontSize: "0.72rem"
                        }}>
                          {Object.entries(res.el).sort(([, a], [, b]) => b - a).map(([el, v]) => (
                            <div key={el} style={{ display: "flex", justifyContent: "space-between" }}>
                              <span style={{ color: EL_COL[el] }}>▸ {el}</span>
                              <span style={{ color: M3.onSurfaceVariant }}>{v}</span>
                            </div>
                          ))}
                          <div style={{ borderTop: `1px solid ${M3.outlineVariant}`, paddingTop: 8, marginTop: 4 }}>
                            {[
                              ["Dominant", Object.entries(res.el).sort(([, a], [, b]) => b - a)[0][0]],
                              ["Mode", Object.entries(res.mod).sort(([, a], [, b]) => b - a)[0][0]],
                              ["Phi", `${res.phi.state} ×${res.phi.mult}`],
                            ].map(([k, v]) => (
                              <div key={k} style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                                <span style={{ color: M3.secondary }}>{k}</span>
                                <span style={{ color: M3.tertiary }}>{v}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </Card>
                    </div>
                  </div>
                )}

                {tab === "grammatology" && (
                  <ErrorBoundary>
                    <GrammatologyTab
                      ctx={{
                        M3, gramTab, setGramTab, LETTER_DB, WRITING_SYSTEM_TYPES, EGYPTIAN_UNILITERALS,
                        OGHAM_FULL, IPA_QUICK, DIGRAPH_MAP, ACROPHONY_SHIFTS, ZODIAC_CHINESE_MAP,
                        CHINESE_ZODIAC_HEBREW, MUSICAL_SCALE_OCCULT, planetToLetter,
                        grid2, cwInput, setCwInput, cwResult, setCwResult, analyzeWord,
                        res, P_COL, P_SYM, SIGN_COL, SIGN_SYM, SIGN_INFO, EL_COL,
                        gramScriptFilter, setGramScriptFilter, expandedLetter, setExpandedLetter,
                        KANGXI_INFO, KANGXI_RADICALS, KANGXI_TOP_10_BY_FREQUENCY, KANGXI_MOST_USED, KANGXI_STANDALONE,
                        SCRIPT_ATLAS, TWENTY_TWO_NOTE,
                        Card,
                      }}
                    />
                  </ErrorBoundary>
                )}

                {false && tab === "numerology-old" && (() => {
                  const nuData = computeNumerology(A.year, A.month, A.day, A.name || "");
                  const hasName = nuData.letterBreakdown.length > 0;
                  const lp = LIFE_PATH_MEANING[nuData.lifePath] || LIFE_PATH_MEANING[reduceToRoot(nuData.lifePath)] || {};
                  return (
                    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                      <Card style={{ background: `linear-gradient(135deg,${M3.primaryContainer}88,${M3.surfaceContainer})`, borderColor: M3.outline }}>
                        <div style={{ fontFamily: "Cinzel,serif", fontSize: "1.1rem", color: M3.primary, marginBottom: 8 }}>Numerology — The Mathematics of Identity</div>
                        <p style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.82rem", lineHeight: 1.7, color: M3.onSurface, margin: 0 }}>
                          Numerology is the ancient study of numbers as carriers of meaning. Every date, every name, every letter has a numerical vibration. This section calculates your core numerological profile from your birth date and name, maps your name through Hebrew gematria, and identifies which mathematical sequences resonate with your birth day. Two systems are shown: <strong>Pythagorean</strong> (the Western standard, 1-9 cycle) and <strong>Chaldean</strong> (the older Babylonian system with irregular mappings considered more mystically accurate by some traditions).
                        </p>
                      </Card>

                      {/* ── Core Numbers ── */}
                      <Card title="Core Numbers">
                        <p style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.76rem", lineHeight: 1.6, color: M3.onSurfaceVariant, margin: "0 0 14px" }}>
                          Five numbers are derived from the birth date and name. Pythagorean and Chaldean assign letters different values, so the same name yields different totals under the two; the method has to be named for any of these to mean anything.
                        </p>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(140px,1fr))", gap: 10 }}>
                          {[
                            { label: "Life Path", val: nuData.lifePath, color: M3.primary, tip: "Derived from the full birth date by reduction.", needsName: false },
                            { label: "Birthday", val: nuData.birthday, color: "#ffa726", tip: "The day of the month, reduced.", needsName: false },
                            { label: "Personal Year", val: nuData.personalYear, color: "#69ff8e", tip: "The annual cycle number for the current year.", needsName: false },
                            { label: "Expression", val: nuData.expression, color: M3.tertiary, tip: "Derived from all letters of your full name. How you naturally express yourself and what talents you carry.", needsName: true },
                            { label: "Soul Urge", val: nuData.soulUrge, color: "#ce93d8", tip: "Derived from the vowels in your name. Your deepest inner desire — what your heart truly wants.", needsName: true },
                            { label: "Personality", val: nuData.personality, color: "#4fc3f7", tip: "Derived from the consonants in your name. How the outside world perceives you — your social mask.", needsName: true },
                            { label: "Maturity", val: nuData.maturity, color: M3.secondary, tip: "Life Path + Expression. The person you are becoming in the second half of life.", needsName: true },
                            { label: "Chaldean Expr.", val: nuData.chaldeanExpr, color: "#ff5252", tip: "Babylonian system — older and considered by some to be more vibrationally accurate.", needsName: true },
                          ].map(c => (
                            <div key={c.label} style={{ padding: "14px", borderRadius: 12, background: c.color + "11", border: `1px solid ${c.color}33`, textAlign: "center", opacity: c.needsName && !hasName ? 0.4 : 1 }}>
                              <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.58rem", color: c.color, letterSpacing: "0.1em", marginBottom: 6 }}>{c.label.toUpperCase()}</div>
                              <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "2.2rem", color: c.color, fontWeight: "700", lineHeight: 1 }}>
                                {c.needsName && !hasName ? "—" : <>{c.val}{MASTER_NUMBERS.has(c.val) ? <span style={{ fontSize: "0.6rem", verticalAlign: "super", color: "#ffd54f" }}> M</span> : ""}</>}
                              </div>
                              <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.6rem", color: M3.onSurfaceVariant, marginTop: 4 }}>
                                {c.needsName && !hasName ? "enter name above" : NUM_PLANET[c.val] ? `${P_SYM[NUM_PLANET[c.val]] || ""} ${NUM_PLANET[c.val]}` : ""}
                              </div>
                              <div style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.58rem", color: M3.onSurfaceVariant, marginTop: 6, fontStyle: "italic", lineHeight: 1.4 }}>{c.tip}</div>
                            </div>
                          ))}
                        </div>
                      </Card>

                      {/* ── Life Path Deep Dive ── */}
                      <Card title={`Life Path ${nuData.lifePath} — ${lp.title || "Your Path"}`}>
                        {lp.archetype && <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.68rem", color: M3.tertiary, letterSpacing: "0.08em", marginBottom: 8 }}>{lp.archetype}</div>}
                        <p style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.82rem", lineHeight: 1.7, color: M3.onSurface, margin: "0 0 12px" }}>{lp.desc || "Your life path carries a unique vibration and purpose."}</p>
                        {lp.shadow && (
                          <div style={{ padding: "10px 14px", borderRadius: 10, background: "#ff525211", border: "1px solid #ff525222", marginBottom: 10 }}>
                            <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.62rem", color: "#ff5252", letterSpacing: "0.08em", marginBottom: 4 }}>SHADOW SIDE</div>
                            <div style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.76rem", color: M3.onSurface, lineHeight: 1.5 }}>{lp.shadow}</div>
                          </div>
                        )}
                        {lp.growth && (
                          <div style={{ padding: "10px 14px", borderRadius: 10, background: "#69ff8e11", border: "1px solid #69ff8e22" }}>
                            <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.62rem", color: "#69ff8e", letterSpacing: "0.08em", marginBottom: 4 }}>GROWTH PATH</div>
                            <div style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.76rem", color: M3.onSurface, lineHeight: 1.5 }}>{lp.growth}</div>
                          </div>
                        )}
                      </Card>

                      {/* ── Core Number Meanings ── */}
                      <Card title="What Each Number Means for You">
                        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                          {[
                            ...(hasName ? [
                              { label: "Expression", num: nuData.expression, meaning: EXPRESSION_MEANING[nuData.expression] || "" },
                              { label: "Soul Urge", num: nuData.soulUrge, meaning: SOUL_URGE_MEANING[nuData.soulUrge] || "" },
                              { label: "Personality", num: nuData.personality, meaning: PERSONALITY_MEANING[nuData.personality] || "" },
                            ] : []),
                            { label: "Birthday", num: nuData.birthday, meaning: BIRTHDAY_MEANING[nuData.birthday] || "" },
                          ].map(r => (
                            <div key={r.label} style={{ padding: "10px 14px", borderRadius: 10, background: M3.surfaceVariant + "44", border: `1px solid ${M3.outlineVariant}` }}>
                              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                                <span style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.62rem", color: M3.secondary, letterSpacing: "0.08em" }}>{r.label.toUpperCase()}</span>
                                <span style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "1rem", color: M3.tertiary, fontWeight: "700" }}>{r.num}</span>
                              </div>
                              <div style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.78rem", color: M3.onSurface, lineHeight: 1.55 }}>You are a {r.meaning}</div>
                            </div>
                          ))}
                        </div>
                      </Card>

                      {/* ── Name Letter Breakdown ── */}
                      {hasName && (
                        <Card title="Name Letter Breakdown — Pythagorean & Chaldean Values">
                          <p style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.76rem", lineHeight: 1.6, color: M3.onSurfaceVariant, margin: "0 0 10px" }}>
                            Each letter of your name carries a number. Vowels (highlighted) drive your Soul Urge; consonants shape your Personality. Together they form your Expression number.
                          </p>
                          <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 12 }}>
                            {nuData.letterBreakdown.map((l, i) => (
                              <div key={i} style={{
                                padding: "5px 8px", borderRadius: 8, minWidth: 36, textAlign: "center",
                                background: l.isVowel ? M3.primaryContainer + "44" : M3.surfaceVariant,
                                border: `1px solid ${l.isVowel ? M3.primary + "44" : M3.outlineVariant}`
                              }}>
                                <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "1rem", color: l.isVowel ? M3.primary : M3.onSurface, fontWeight: "700" }}>{l.ch}</div>
                                <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.58rem", color: M3.tertiary }}>P:{l.pythagorean}</div>
                                <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.58rem", color: "#ff8a50" }}>C:{l.chaldean}</div>
                                <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.48rem", color: l.isVowel ? M3.primary : M3.onSurfaceVariant, marginTop: 2 }}>{l.isVowel ? "vowel" : "cons."}</div>
                              </div>
                            ))}
                          </div>
                          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", fontFamily: "'Share Tech Mono',monospace", fontSize: "0.68rem" }}>
                            <span style={{ color: M3.onSurface }}>Expression sum: <strong>{nuData.exprSum}</strong> → <strong>{nuData.expression}</strong></span>
                            <span style={{ color: "#ce93d8" }}>Soul (vowels): <strong>{nuData.soulSum}</strong> → <strong>{nuData.soulUrge}</strong></span>
                            <span style={{ color: "#4fc3f7" }}>Personality (cons.): <strong>{nuData.persSum}</strong> → <strong>{nuData.personality}</strong></span>
                            <span style={{ color: "#ff8a50" }}>Chaldean: <strong>{nuData.chaldExprSum}</strong> → <strong>{nuData.chaldeanExpr}</strong></span>
                          </div>
                        </Card>
                      )}

                      {/* ── Missing Numbers ── */}
                      {hasName && nuData.missingNums.length > 0 && (
                        <Card title="Karmic Lessons — Missing Numbers in Your Name">
                          <p style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.76rem", lineHeight: 1.6, color: M3.onSurfaceVariant, margin: "0 0 10px" }}>
                            Numbers absent from your name's letter values indicate lessons your soul chose to learn through experience rather than innate talent. These aren't weaknesses — they're growth edges.
                          </p>
                          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                            {nuData.missingNums.map(n => (
                              <div key={n} style={{ padding: "8px 14px", borderRadius: 10, background: "#ff525211", border: "1px solid #ff525222", textAlign: "center" }}>
                                <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "1.4rem", color: "#ff5252", fontWeight: "700" }}>{n}</div>
                                <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.58rem", color: M3.onSurfaceVariant }}>{NUM_PLANET[n] || ""}</div>
                              </div>
                            ))}
                          </div>
                        </Card>
                      )}

                      {/* ── Pinnacles & Challenges ── */}
                      <Card title="Life Pinnacles & Challenges — Your Four Seasons">
                        <p style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.76rem", lineHeight: 1.6, color: M3.onSurfaceVariant, margin: "0 0 12px" }}>
                          Your life unfolds in four major phases, each with a <strong>pinnacle</strong> (opportunity/theme) and a <strong>challenge</strong> (lesson/obstacle). Together they map the arc of your growth across decades.
                        </p>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                          {["First (youth)", "Second (early adult)", "Third (maturity)", "Fourth (wisdom)"].map((phase, i) => (
                            <div key={i} style={{ padding: "10px 12px", borderRadius: 10, background: M3.surfaceVariant + "44", border: `1px solid ${M3.outlineVariant}` }}>
                              <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.58rem", color: M3.secondary, letterSpacing: "0.08em", marginBottom: 6 }}>{phase.toUpperCase()}</div>
                              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <div style={{ textAlign: "center" }}>
                                  <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.52rem", color: "#69ff8e" }}>PINNACLE</div>
                                  <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "1.4rem", color: "#69ff8e", fontWeight: "700" }}>{nuData.pinnacles[i]}</div>
                                </div>
                                <div style={{ textAlign: "center" }}>
                                  <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.52rem", color: "#ff5252" }}>CHALLENGE</div>
                                  <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "1.4rem", color: "#ff5252", fontWeight: "700" }}>{nuData.challenges[i]}</div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </Card>

                      {/* ── Hebrew Gematria Calculator ── */}
                      <Card title="Hebrew Gematria Calculator — The Number in a Name">
                        <p style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.76rem", lineHeight: 1.6, color: M3.onSurfaceVariant, margin: "0 0 14px" }}>
                          Each Hebrew letter carries a numerical value. Type any name or word in English and it will be phonetically transliterated to Hebrew — digraphs like SH, CH, TH are handled as single Hebrew letters. You can also type Hebrew directly. Medial vowels are dimmed since Hebrew is primarily consonantal.
                        </p>
                        <input type="text" value={gemaName} onChange={e => setGemaName(e.target.value)}
                          placeholder="English name, Hebrew (אברהם), or phrase..."
                          style={{
                            width: "100%", padding: "10px 14px", background: M3.surfaceDim, border: `1px solid ${M3.outline}`, borderRadius: 10,
                            color: M3.onSurface, fontFamily: "'Share Tech Mono',monospace", fontSize: "0.82rem", outline: "none", boxSizing: "border-box"
                          }} />
                        {gemaName.trim() && (() => {
                          const g = calcGematria(gemaName);
                          return (
                            <div style={{ marginTop: 14 }}>
                              <div style={{ marginBottom: 14, padding: "10px 16px", borderRadius: 10, background: M3.primaryContainer + "33", border: `1px solid ${M3.primary}22` }}>
                                {g.isHebrew ? (
                                  <>
                                    <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.6rem", color: M3.secondary, letterSpacing: "0.1em", marginBottom: 6 }}>HEBREW INPUT</div>
                                    <div style={{ fontSize: "1.8rem", color: M3.primary, fontFamily: "serif", letterSpacing: "0.05em", direction: "rtl", textAlign: "center" }}>{g.hebrewStr}</div>
                                  </>
                                ) : g.hasKnown && g.knownStr ? (
                                  <>
                                    <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.6rem", color: "#69ff8e", letterSpacing: "0.1em", marginBottom: 6 }}>ESTABLISHED HEBREW SPELLING</div>
                                    <div style={{ fontSize: "1.8rem", color: M3.primary, fontFamily: "serif", letterSpacing: "0.05em", direction: "rtl", textAlign: "center" }}>{g.knownStr}</div>
                                    {g.knownTotal !== null && (
                                      <div style={{ textAlign: "center", marginTop: 4 }}>
                                        <span style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.65rem", color: "#69ff8e" }}>Traditional gematria: {g.knownTotal}</span>
                                      </div>
                                    )}
                                    <div style={{ marginTop: 8, padding: "8px 12px", borderRadius: 8, background: M3.surfaceDim }}>
                                      <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.55rem", color: M3.onSurfaceVariant, letterSpacing: "0.1em", marginBottom: 4 }}>PHONETIC TRANSLITERATION (for comparison)</div>
                                      <div style={{ fontSize: "1.1rem", color: M3.onSurfaceVariant, fontFamily: "serif", direction: "rtl", textAlign: "center", opacity: 0.6 }}>
                                        {g.transHebrewStr}
                                        <span style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.6rem", marginLeft: 8 }}>= {g.transTotal}</span>
                                      </div>
                                    </div>
                                  </>
                                ) : (
                                  <>
                                    <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.6rem", color: M3.secondary, letterSpacing: "0.1em", marginBottom: 6 }}>PHONETIC TRANSLITERATION (CONSONANTAL)</div>
                                    <div style={{ fontSize: "1.8rem", color: M3.primary, fontFamily: "serif", letterSpacing: "0.05em", direction: "rtl", textAlign: "center" }}>{g.hebrewStr}</div>
                                    {g.fullHebrewStr !== g.hebrewStr && (
                                      <div style={{ marginTop: 4, textAlign: "center" }}>
                                        <span style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.55rem", color: M3.onSurfaceVariant }}>with vowels: </span>
                                        <span style={{ fontSize: "1rem", color: M3.onSurfaceVariant, fontFamily: "serif", direction: "rtl", opacity: 0.5 }}>{g.fullHebrewStr}</span>
                                        {g.fullTotal !== g.total && <span style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.6rem", color: M3.onSurfaceVariant, marginLeft: 8 }}>= {g.fullTotal}</span>}
                                      </div>
                                    )}
                                  </>
                                )}
                                {!g.isHebrew && g.hasAlt && g.altHebrewStr && !g.hasKnown && (
                                  <div style={{ marginTop: 6 }}>
                                    <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.58rem", color: M3.outlineVariant }}>
                                      Alternate transliteration available.
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          );
                        })()}
                      </Card>
                    </div>
                  );
                })()}

                {tab === "calendar" && (
                  <ErrorBoundary><CalendarTab ctx={{ M3, calDate, setCalDate, calHolFilter, setCalHolFilter, calShowMonth, setCalShowMonth, Card }} /></ErrorBoundary>
                )}
                {tab === "numerology" && (
                  <ErrorBoundary><NumerologyTab ctx={{ M3, birthParts: A, res, Card }} /></ErrorBoundary>
                )}
                {tab === "education" && (
                  <ErrorBoundary><EducationTab ctx={{ M3, EL_COL, MOD_COL, Card }} /></ErrorBoundary>
                )}
                {tab === "deep" && (
                  <ErrorBoundary><DeepTab ctx={{
                    M3, res, zodSign, SIGN_INFO, SIGN_COL, P_COL, P_SYM, P_ROLE, Card, grid2,
                    calcAspects, harmonic, SOLAR_DEEP, LUNAR_DEEP, RISING_SHADOW, VENUS_SHADOW,
                    MARS_SHADOW, MERCURY_SHADOW, JUPITER_DEEP, SATURN_DEEP, PAIR_INSIGHT,
                    URANUS_DEEP, NEPTUNE_DEEP, PLUTO_DEEP, moonPhase,
                    EL_COL, MOD_COL, ANIMAL_INFO, CN_EL_INFO, POLARITY_INFO, HOUSE_AREA
                  }} /></ErrorBoundary>
                )}

                </Suspense>
              </TabContent>
            </>
          )}
        </div>
        <Footer />
      </div>
    </div>
  );
}