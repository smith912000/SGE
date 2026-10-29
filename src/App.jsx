import { useState, useEffect, useCallback, lazy, Suspense } from "react";

// Hooks

// Theme
import { M3 } from './theme/m3.js';

// Utils
import { norm } from './utils/helpers.js';

// Data - Astrology
import { SIGNS, SIGN_SYM, SIGN_COL, SIGN_INFO, EL_COL, MOD_COL } from './data/astrology/signs.js';
import { P_SYM, P_COL, P_ROLE } from "./data/astrology/planets.js";
import { HOUSE_INFO, HOUSE_AREA } from './data/astrology/houses.js';
import { ASPECTS, ASP_EXPLAIN } from "./data/astrology/aspects.js";
import { ANIMAL_INFO, CN_EL_INFO, POLARITY_INFO } from "./data/astrology/chinese.js";

// Data - Grammatology

// Data - Numerology

// Data - Deep Analysis
import { moonPhase } from './engines/astronomy.js';

// Engines
import { julianDay, allPlanets, calcHouses, calcAspects, ayanamsa, harmonic, progChart, findSolarReturn, elemMod, phiEngine } from "./engines/astronomy.js";
import { chineseCycle } from './engines/chinese.js';

// Components - UI
import Card from './components/ui/Card.jsx';
import TabBar, { TAB_IDS } from './components/ui/TabBar.jsx';
import TabContent from './components/ui/TabContent.jsx';
import EclipticRing from './components/ui/EclipticRing.jsx';
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
const DeepTab = lazy(() => import('./tabs/DeepTab.jsx'));
const VedicTab = lazy(() => import('./tabs/VedicTab.jsx'));
const SynthesisTab = lazy(() => import('./tabs/SynthesisTab.jsx'));

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

export default function App() {

  const _now = new Date();
  // Until a place is chosen, the form assumes the visitor's own time zone.
  const _localZone = (() => { try { return Intl.DateTimeFormat().resolvedOptions().timeZone || "Etc/UTC"; } catch { return "Etc/UTC"; } })();
  const [A, setA] = useState({ year: _now.getFullYear(), month: _now.getMonth() + 1, day: _now.getDate(), hour: ((_now.getHours() + 11) % 12) + 1, meridiem: _now.getHours() >= 12 ? "PM" : "AM", min: _now.getMinutes(), lat: 51.5, lon: -0.1, tz: -_now.getTimezoneOffset() / 60, tzName: _localZone, place: "", name: "" });
  const [B, setB] = useState({ year: 1988, month: 3, day: 22, hour: 9, meridiem: "AM", min: 30, lat: 40.7, lon: -74.0, tz: -5, tzName: "America/New_York", place: "" });
  const [age, setAge] = useState(0);
  const [n, setN] = useState(5);
  const [syn, setSyn] = useState(false);
  // The open view lives in the URL hash (#wheel, #vedic...) so a view can be
  // bookmarked or shared.
  const tabFromHash = () => {
    const h = typeof window !== "undefined" ? window.location.hash.slice(1) : "";
    return TAB_IDS.includes(h) ? h : "synthesis";
  };
  const [tab, setTabState] = useState(tabFromHash);
  const setTab = useCallback((id) => {
    setTabState(id);
    if (window.location.hash.slice(1) !== id) history.replaceState(null, "", `#${id}`);
  }, []);
  useEffect(() => {
    const onHash = () => setTabState(tabFromHash());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
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

  // On a phone the birth form sits above the chart, so bring the chart up once it exists.
  useEffect(() => {
    if (!res || window.innerWidth >= 960) return;
    document.querySelector('.sge-main')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [res]);

  const compute = useCallback(async () => {
    setLoading(true);
    try {
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

  // Two-column grid for desktop; auto-stacks to one column under 720px viewport.
  const grid2 = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))",
    gap: 16,
  };

  const [cwInput, setCwInput] = useState("");
  const [cwResult, setCwResult] = useState(null);

  return (
    <div style={{ minHeight: "100vh", color: M3.onSurface, position: "relative", overflowX: "hidden" }}>

      <StarCanvas />

      <div className="sge-shell">

        <Header />

        <div className="sge-body">

          <aside className="sge-side">
            <InputPanel A={A} setA={setA} B={B} setB={setB} syn={syn} setSyn={setSyn} compute={compute} loading={loading} />
          </aside>

          <div className="sge-main">
          {!res && (
            <div className="sge-empty">
              <EclipticRing size={220} className="sge-empty-ring" />
              <h2>Begin with a birth moment</h2>
              <p>Enter the date, time and place, then compute. The natal figure, its transits and progressions, and the Vedic, Chinese and numerological readings of the same moment all open from it.</p>
            </div>
          )}
          {res && (
            <>
              <div className="info-strip">
                <span>Rising sign <b style={{ color: SIGN_COL[zodSign(res.houses.ASC)] }}>{zodSign(res.houses.ASC)}</b> <span style={{ color: M3.outlineVariant }}>({norm(res.houses.ASC).toFixed(1)}°)</span></span>
                <span>Career point <b style={{ color: SIGN_COL[zodSign(res.houses.MC)] }}>{zodSign(res.houses.MC)}</b> <span style={{ color: M3.outlineVariant }}>({norm(res.houses.MC).toFixed(1)}°)</span></span>
                <span style={{ color: M3.outlineVariant }}>Vedic offset {ayanamsa(res.jd).toFixed(1)}°</span>
              </div>

              <TabBar active={tab} onChange={setTab} />

              <TabContent id={tab}>
                <Suspense fallback={<div style={{padding:"40px",textAlign:"center",color:M3.onSurfaceVariant,opacity:.7}}>Loading…</div>}>

                {tab === "synthesis" && (
                  <ErrorBoundary><SynthesisTab ctx={{ res, A }} /></ErrorBoundary>
                )}
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








                {tab === "harmonics" && (
                  <ErrorBoundary><HarmonicsTab ctx={{ M3, res, P_COL, P_SYM, zodSign, zodDeg, Card, WheelWithTooltip }} /></ErrorBoundary>
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
                    calcAspects, harmonic, moonPhase,
                    EL_COL, MOD_COL, ANIMAL_INFO, CN_EL_INFO, POLARITY_INFO, HOUSE_AREA
                  }} /></ErrorBoundary>
                )}

                </Suspense>
              </TabContent>
            </>
          )}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}