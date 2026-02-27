import { useState, useEffect, useRef, useCallback } from "react";

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
import { signToLetter, planetToLetter } from './data/grammatology/yetzirah.js';
import { ZODIAC_CHINESE_MAP, CHINESE_ZODIAC_HEBREW, MUSICAL_SCALE_OCCULT } from './data/grammatology/correspondences.js';
import { KANGXI_INFO, KANGXI_RADICALS, KANGXI_TOP_10_BY_FREQUENCY, KANGXI_MOST_USED, KANGXI_STANDALONE } from './data/grammatology/kangxiRadicals.js';

// Data - Numerology
import { LIFE_PATH_MEANING, EXPRESSION_MEANING, SOUL_URGE_MEANING, PERSONALITY_MEANING, BIRTHDAY_MEANING } from './data/numerology/meanings.js';
import { NUM_PLANET, MASTER_NUMBERS } from './data/numerology/tables.js';

// Data - Deep Analysis
import { SOLAR_DEEP, LUNAR_DEEP } from './data/deepAnalysis/solarLunar.js';
import { RISING_SHADOW, VENUS_SHADOW, MARS_SHADOW, MERCURY_SHADOW } from './data/deepAnalysis/shadows.js';
import { JUPITER_DEEP, SATURN_DEEP } from './data/deepAnalysis/outerPlanets.js';
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
import WheelTab from './tabs/WheelTab.jsx';
import AspectsTab from './tabs/AspectsTab.jsx';
import ProgressionsTab from './tabs/ProgressionsTab.jsx';
import SolarTab from './tabs/SolarTab.jsx';
import TransitsTab from './tabs/TransitsTab.jsx';
import SynastryTab from './tabs/SynastryTab.jsx';
import ChineseTab from './tabs/ChineseTab.jsx';
import PhiTab from './tabs/PhiTab.jsx';
import NatalTab from './tabs/NatalTab.jsx';
import EducationTab from './tabs/EducationTab.jsx';
import HarmonicsTab from './tabs/HarmonicsTab.jsx';
import StrugglesTab from './tabs/StrugglesTab.jsx';
import NumerologyTab from './tabs/NumerologyTab.jsx';
import GrammatologyTab from './tabs/GrammatologyTab.jsx';
import DeepTab from './tabs/DeepTab.jsx';
import CalendarTab from './tabs/CalendarTab.jsx';

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
  const anime     = useAnime();
  const headerRef = useRef(null);

  const _now = new Date();
  const [A, setA]     = useState({ year:_now.getFullYear(),month:_now.getMonth()+1,day:_now.getDate(),hour:((_now.getHours()+11)%12)+1,meridiem:_now.getHours()>=12?"PM":"AM",min:_now.getMinutes(),lat:51.5,lon:-0.1,tz:0,tzName:"Etc/UTC",place:"",name:"" });
  const [B, setB]     = useState({ year:1988,month:3,day:22,hour:9,meridiem:"AM",min:30,lat:40.7,lon:-74.0,tz:-5,tzName:"America/New_York",place:"" });
  const [age, setAge] = useState(0);
  const [n,   setN]   = useState(5);
  const [syn, setSyn] = useState(false);
  const [tab, setTab] = useState("natal");
  const [res, setRes] = useState(null);
  const [loading, setLoading] = useState(false);
  const [gemaName, setGemaName] = useState("");
  const [expandedLetter, setExpandedLetter] = useState(null);
  const [gramTab, setGramTab] = useState("crosswalk");
  const [gramScriptFilter, setGramScriptFilter] = useState("core");
  const [wheelMode, setWheelMode] = useState("western");
  const [calDate, setCalDate] = useState({y: new Date().getFullYear(), m: new Date().getMonth()+1, d: new Date().getDate()});
  const [calHolFilter, setCalHolFilter] = useState("all");
  const [calShowMonth, setCalShowMonth] = useState(false);

  useEffect(()=>{
    const now = new Date();
    const birthDate = new Date(A.year, A.month - 1, A.day);
    let a = now.getFullYear() - A.year;
    if (now < new Date(now.getFullYear(), A.month - 1, A.day)) a--;
    setAge(Math.max(0, a));
  }, [A.year, A.month, A.day]);

  useEffect(()=>{
    if (!anime||!headerRef.current) return;
    anime({ targets:headerRef.current.querySelectorAll(".anim"),
      opacity:[0,1], translateY:[-16,0],
      delay:anime.stagger(70), duration:650, easing:"easeOutQuart" });
  }, [anime]);

  const compute = useCallback(async ()=>{
    setLoading(true);
    try {
      const birthPayload = toUtcBirthPayload(A);
      const req = { birth: birthPayload, age, harmonic_n: n, phi_cycle_length: 30 };
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
      const tJD = julianDay(new Date().getFullYear(),new Date().getMonth()+1,new Date().getDate(),12);
      const trPos = allPlanets(tJD);
      const trAsp = calcAspects({ ...trop, ...Object.fromEntries(Object.entries(trPos).map(([k,v])=>[`T_${k}`,v])) });

      let synR = null;
      if (syn) {
        try {
          const birthBPayload = toUtcBirthPayload(B);
          const rb = await fetch(`${BACKEND_URL}/natal`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ birth: birthBPayload }),
          });
          if (rb.ok) {
            const dB = await rb.json();
            const tB = flattenPlanetMap(dB.tropical);
            const hB = mapBackendHouses(dB.houses);
            synR = {
              positions: tB,
              houses: hB,
              aspects: calcAspects({ ...trop, ...Object.fromEntries(Object.entries(tB).map(([k,v])=>[`B_${k}`,v])) }),
            };
          }
        } catch (_e) {
          // fall through to local synastry fallback below
        }
        if (!synR) {
          const hourB24 = to24Hour(B.hour, B.meridiem);
          const jd2 = julianDay(B.year, B.month, B.day, hourB24 - B.tz + B.min / 60);
          const tB = allPlanets(jd2);
          const hB = calcHouses(jd2, B.lat, B.lon);
          synR = {
            positions: tB,
            houses: hB,
            aspects: calcAspects({ ...trop, ...Object.fromEntries(Object.entries(tB).map(([k,v])=>[`B_${k}`,v])) }),
          };
        }
      }

      setRes({ jd,trop,sid,houses,sidHouses,aspects,prog,srJD,srPos,harm,cn,phi,el,mod,trPos,trAsp,synR });
    } catch (err) {
      console.warn("Backend compute failed, using frontend fallback:", err);
      const hourA24 = to24Hour(A.hour, A.meridiem);
      const jd      = julianDay(A.year,A.month,A.day, hourA24-A.tz+A.min/60);
      const trop    = allPlanets(jd);
      const ay      = ayanamsa(jd);
      const sid     = Object.fromEntries(Object.entries(trop).map(([k,v])=>[k,norm(v-ay)]));
      const houses  = calcHouses(jd,A.lat,A.lon);
      const sidHouses = Object.fromEntries(Object.entries(houses).map(([k,v])=>[k,norm(v-ay)]));
      const aspects = calcAspects(trop);
      const prog    = progChart(jd,age);
      const srJD    = findSolarReturn(trop.Sun, A.year+1);
      const srPos   = srJD ? allPlanets(srJD) : null;
      const harm    = harmonic(trop, n);
      const cn      = chineseCycle(A.year, A.month, A.day);
      const phi     = phiEngine(A.day,30);
      const {el,mod}= elemMod(trop);
      const tJD     = julianDay(new Date().getFullYear(),new Date().getMonth()+1,new Date().getDate(),12);
      const trPos   = allPlanets(tJD);
      const trAsp   = calcAspects({ ...trop, ...Object.fromEntries(Object.entries(trPos).map(([k,v])=>[`T_${k}`,v])) });
      let synR=null;
      if (syn) {
        const hourB24 = to24Hour(B.hour, B.meridiem);
        const jd2=julianDay(B.year,B.month,B.day,hourB24-B.tz+B.min/60);
        const tB=allPlanets(jd2);
        const hB=calcHouses(jd2,B.lat,B.lon);
        synR={ positions:tB, houses:hB,
          aspects:calcAspects({ ...trop, ...Object.fromEntries(Object.entries(tB).map(([k,v])=>[`B_${k}`,v])) }) };
      }
      setRes({ jd,trop,sid,houses,sidHouses,aspects,prog,srJD,srPos,harm,cn,phi,el,mod,trPos,trAsp,synR });
    } finally {
      setLoading(false);
    }
  },[A,B,age,n,syn]);

  const TABS=[
    { id:"natal",        label:"☉ Summary"         },
    { id:"deep",         label:"✦ Deep Analysis"   },
    { id:"struggles",    label:"⚡ Struggles"       },
    { id:"wheel",        label:"⊙ Wheel"            },
    { id:"aspects",      label:"⚹ Connections"      },
    { id:"progressions", label:"→ Growth"            },
    { id:"solar",        label:"↩ Year Ahead"       },
    { id:"harmonics",    label:"∞ Hidden Patterns"  },
    { id:"transits",     label:"⟳ Right Now"        },
    { id:"synastry",     label:"♡ Compatibility"    },
    { id:"chinese",      label:"☯ Chinese Year"     },
    { id:"phi",          label:"φ Elements"         },
    { id:"numerology",   label:"🔢 Numerology"      },
    { id:"grammatology", label:"𐤀 Grammatology"    },
    { id:"calendar",     label:"📅 Sacred Calendar"  },
    { id:"education",    label:"📖 How It Works"     },
  ];

  const grid2 = { display:"grid", gridTemplateColumns:"minmax(0,1fr) minmax(0,1fr)", gap:16 };

  const [cwInput, setCwInput] = useState("");
  const [cwResult, setCwResult] = useState(null);

  return (
    <div style={{ minHeight:"100vh", background:M3.surfaceDim, color:M3.onSurface, position:"relative", overflowX:"hidden" }}>

      <StarCanvas />

      <div style={{ position:"relative", zIndex:1, maxWidth:1440, margin:"0 auto", padding:"0 16px 56px" }}>

        <Header />

        <div style={{ paddingTop:28, display:"flex", flexDirection:"column", gap:20 }}>

          <InputPanel A={A} setA={setA} B={B} setB={setB} syn={syn} setSyn={setSyn} compute={compute} loading={loading} />

          {res && (
            <>
              <div style={{ fontFamily:"'Share Tech Mono', monospace", fontSize:"0.66rem",
                color:M3.secondary, padding:"10px 16px",
                background:M3.surfaceContainer, borderRadius:10,
                border:`1px solid ${M3.outlineVariant}`, letterSpacing:"0.06em",
                display:"flex", flexWrap:"wrap", gap:"4px 16px" }}>
                <span>Rising Sign <span style={{color:SIGN_COL[zodSign(res.houses.ASC)]}}>{zodSign(res.houses.ASC)}</span> <span style={{color:M3.outlineVariant}}>({norm(res.houses.ASC).toFixed(1)}°)</span></span>
                <span>Career Point <span style={{color:SIGN_COL[zodSign(res.houses.MC)]}}>{zodSign(res.houses.MC)}</span> <span style={{color:M3.outlineVariant}}>({norm(res.houses.MC).toFixed(1)}°)</span></span>
                <span style={{color:M3.outlineVariant}}>Vedic offset {ayanamsa(res.jd).toFixed(1)}°</span>
              </div>

              <TabBar tabs={TABS} active={tab} onChange={setTab}/>

              <TabContent id={tab}>

                {tab==="wheel" && (
                  <WheelTab ctx={{ M3, A, res, Card, wheelMode, setWheelMode, WheelWithTooltip, ChineseWheelWithTooltip, ayanamsa, zodSign, P_COL, P_SYM, SIGN_COL }} />
                )}
                {tab==="aspects" && (
                  <AspectsTab ctx={{ M3, RAD, SIGNS, SIGN_COL, SIGN_SYM, ASPECTS, ASP_EXPLAIN, P_COL, P_SYM, res, Card, WheelWithTooltip, AspectTable }} />
                )}
                {tab==="progressions" && (
                  <ProgressionsTab ctx={{ M3, age, res, zodSign, SIGN_COL, SIGN_INFO, P_COL, P_SYM, grid2, calcAspects, Card, PlanetTable, WheelWithTooltip, AspectTable }} />
                )}
                {tab==="solar" && (
                  <SolarTab ctx={{ M3, RAD, grid2, res, SIGN_INFO, SIGN_COL, P_COL, zodSign, Card, PlanetTable, WheelWithTooltip }} />
                )}
                {tab==="transits" && (
                  <TransitsTab ctx={{ M3, res, norm, ASPECTS, ASP_EXPLAIN, P_COL, P_SYM, zodSign, zodDeg, Card, AspectTable }} />
                )}
                {tab==="synastry" && (
                  <SynastryTab ctx={{ M3, res, grid2, P_COL, P_SYM, P_ROLE, Card, WheelWithTooltip, AspectTable }} />
                )}
                {tab==="chinese" && (
                  <ChineseTab
                    ctx={{
                      M3, A, res, grid2, ANIMAL_INFO, CN_EL_INFO, POLARITY_INFO, chineseCycle, Card, ChineseWheelWithTooltip,
                      CHINESE_ASTRO_INTRO, WUXING_PROFILES, WUXING_GENERATING, WUXING_CONTROLLING,
                      YEAR_END_STEM_POLARITY, CHINESE_ZODIAC_EXTENDED, CHINESE_TRANSLATION_NOTES,
                      ZODIAC_TRINES, ZI_WEI_INFO, ZI_WEI_PALACES_SEQUENCES,
                      ZI_WEI_MAJOR_STARS, TWELVE_HEAVENLY_GENERALS,
                    }}
                  />
                )}
                {tab==="phi" && (
                  <PhiTab ctx={{ M3, res, EL_COL, MOD_COL, Card, DistBar }} />
                )}

                {tab==="natal" && (
                  <NatalTab ctx={{ M3, res, grid2, zodSign, SIGN_COL, HOUSE_AREA, P_COL, P_SYM, Card, PlanetTable, WheelWithTooltip, ProfilePanel }} />
                )}

                {false && tab==="natal-old" && (
                  <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
                    <Card style={{ background:`linear-gradient(135deg,${M3.primaryContainer}88,${M3.surfaceContainer})`, borderColor:M3.outline }}>
                      <div style={{ fontFamily:"Cinzel,serif", fontSize:"1rem", color:M3.primary, marginBottom:8 }}>Your Natal Chart — A Snapshot of the Sky at Your Birth</div>
                      <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.82rem", lineHeight:1.65, color:M3.onSurface, margin:0 }}>
                        At the moment you were born, every planet occupied a specific position in the zodiac. This page shows that snapshot. The <strong>planet table</strong> lists where each planet was, in both Western (Tropical, season-based) and Vedic (Sidereal, star-based) systems. The <strong>wheel</strong> is a visual map — the outer ring shows zodiac signs, inner lines divide 12 life areas called "houses," and planet symbols sit where they actually were.
                      </p>
                      <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.82rem", lineHeight:1.65, color:M3.onSurface, marginTop:8 }}>
                        <strong>How to read it:</strong> Each planet represents a part of your psyche — ☉ Sun is your core identity, ☽ Moon is your emotions, ☿ Mercury is how you think, ♀ Venus is how you love, ♂ Mars is your drive. The sign a planet is in colors how that part of you expresses. The house it falls in shows which life area it activates.
                      </p>
                    </Card>
                    <div style={grid2}>
                      <Card title="☉ Where Each Planet Was — Western & Vedic">
                        <PlanetTable positions={res.trop} jd={res.jd} siderealPositions={res.sid}/>
                      </Card>
                      <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
                        <Card title="⊙ Your Birth Chart">
                          <div style={{ display:"flex", justifyContent:"center" }}>
                            <WheelWithTooltip positions={res.trop} houses={res.houses} size={340} id="natal"/>
                          </div>
                        </Card>
                        <Card title="⌂ Life Areas (Houses) — Where Things Happen For You">
                          <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.74rem", lineHeight:1.55, color:M3.onSurfaceVariant, margin:"0 0 12px" }}>
                            Houses are life domains — each one governs a specific area. The sign on the house sets the style; planets inside bring activity and focus to that area.
                          </p>
                          {(()=>{
                            const HOUSE_DESC = [
                              "Your identity, body, and how you present yourself to the world. Planets here strongly shape your personality.",
                              "Your money, possessions, and self-worth. Planets here affect how you earn and what you value.",
                              "Communication, siblings, short trips, and daily learning. Planets here shape how you speak and think.",
                              "Home, family, roots, and emotional foundation. Planets here influence your private life and sense of belonging.",
                              "Creativity, romance, children, and pleasure. Planets here amplify your joy and self-expression.",
                              "Daily routines, health, and service. Planets here affect your work habits and physical wellbeing.",
                              "Partnerships, marriage, and one-on-one relationships. Planets here shape who you attract and how you relate.",
                              "Shared resources, deep bonds, transformation, and endings. Planets here bring intensity to intimacy and change.",
                              "Higher education, philosophy, travel, and beliefs. Planets here expand your worldview and sense of meaning.",
                              "Career, reputation, authority, and public life. Planets here drive your ambitions and legacy.",
                              "Friends, groups, hopes, and humanitarian causes. Planets here shape your social life and vision for the future.",
                              "Solitude, spirituality, hidden strengths, and the unconscious. Planets here deepen your inner life and intuition.",
                            ];
                            const PLANET_IN_HOUSE = {
                              Sun:"your core identity is strongly expressed here — this area of life feels central to who you are",
                              Moon:"your emotional needs are centred here — you seek comfort and security through this domain",
                              Mercury:"your mind is active here — you think, talk, and learn most through this area",
                              Venus:"you find beauty and pleasure here — relationships and values are drawn to this domain",
                              Mars:"your drive and energy are focused here — you take action and sometimes create friction in this area",
                              Jupiter:"life expands and opportunities flow here — this is where luck tends to find you",
                              Saturn:"you face your hardest lessons here — discipline and patience in this area lead to lasting mastery",
                              Uranus:"you experience disruption and innovation here — expect the unexpected in this domain",
                              Neptune:"imagination and idealism colour this area — it can be both inspiring and confusing",
                              Pluto:"deep transformation happens here — power dynamics and rebirth are recurring themes",
                              Node:"your soul's growth direction points through this area — leaning into it feels unfamiliar but right",
                              Lilith:"your untamed shadow power sits here — this area exposes what you refuse to suppress or domesticate",
                              Chiron:"your deepest wound lives here — healing it becomes your greatest gift to others",
                            };
                            const housePlanets = Array.from({length:12},()=>[]);
                            const allPlanets = ["Sun","Moon","Mercury","Venus","Mars","Jupiter","Saturn","Uranus","Neptune","Pluto","Node","Lilith","Chiron"];
                            allPlanets.forEach(p => {
                              if (res.trop[p]==null) return;
                              const lon = res.trop[p];
                              for (let h=0;h<12;h++){
                                const cusp = res.houses[h+1];
                                const next = res.houses[((h+1)%12)+1];
                                const inHouse = next > cusp ? (lon >= cusp && lon < next) : (lon >= cusp || lon < next);
                                if (inHouse) { housePlanets[h].push(p); break; }
                              }
                            });
                            return Array.from({length:12},(_,i)=>{
                              const h=res.houses[i+1]; const sign=zodSign(h); const pls=housePlanets[i];
                              return (
                                <div key={i} style={{ padding:"10px 14px", marginBottom:6, borderRadius:10, background:SIGN_COL[sign]+"08", borderLeft:`3px solid ${SIGN_COL[sign]}33` }}>
                                  <div style={{ display:"flex", alignItems:"baseline", gap:6, marginBottom:pls.length?4:0 }}>
                                    <span style={{ color:M3.secondary, fontFamily:"'Share Tech Mono',monospace", fontSize:"0.72rem", fontWeight:"700", minWidth:22 }}>{i+1}.</span>
                                    <span style={{ color:SIGN_COL[sign], fontFamily:"'Share Tech Mono',monospace", fontSize:"0.72rem", fontWeight:"700" }}>{sign}</span>
                                    <span style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.68rem", fontStyle:"italic", color:M3.onSurfaceVariant }}>{HOUSE_AREA[i]}</span>
                                    {pls.length>0 && <span style={{ marginLeft:"auto", fontFamily:"'Share Tech Mono',monospace", fontSize:"0.62rem", color:M3.primary }}>{pls.map(p=>P_SYM[p]||p).join(" ")}</span>}
                                  </div>
                                  <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.68rem", lineHeight:1.5, color:M3.onSurfaceVariant, margin:0 }}>{HOUSE_DESC[i]}</p>
                                  {pls.length>0 && pls.map(p => (
                                    <p key={p} style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.66rem", lineHeight:1.45, color:M3.onSurface, margin:"4px 0 0", paddingLeft:8, borderLeft:`2px solid ${P_COL[p]||M3.primary}44` }}>
                                      <strong style={{color:P_COL[p]||M3.primary}}>{P_SYM[p]} {p}</strong> — {PLANET_IN_HOUSE[p]||"active in this area of your life"}.
                                    </p>
                                  ))}
                                  {pls.length===0 && <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.64rem", lineHeight:1.4, color:M3.outlineVariant, margin:"4px 0 0", fontStyle:"italic" }}>No planets here — this area runs on {sign} autopilot, governed by the sign on the cusp rather than a planet's direct attention.</p>}
                                </div>
                              );
                            });
                          })()}
                        </Card>
                      </div>
                    </div>
                    <Card>
                      <ProfilePanel trop={res.trop} houses={res.houses}/>
                    </Card>
                  </div>
                )}

                {tab==="deep" && (
                  <DeepTab ctx={{
                    M3, res, zodSign, SIGN_INFO, SIGN_COL, P_COL, P_SYM, P_ROLE, Card, grid2,
                    calcAspects, harmonic, SOLAR_DEEP, LUNAR_DEEP, RISING_SHADOW, VENUS_SHADOW,
                    MARS_SHADOW, MERCURY_SHADOW, JUPITER_DEEP, SATURN_DEEP, PAIR_INSIGHT,
                    EL_COL, MOD_COL, ANIMAL_INFO, CN_EL_INFO, POLARITY_INFO, HOUSE_AREA
                  }} />
                )}

                {false && tab==="deep-old" && (()=>{
                  const sunSign  = zodSign(res.trop.Sun);
                  const moonSign = zodSign(res.trop.Moon);
                  const ascSign  = zodSign(res.houses.ASC);
                  const venSign  = zodSign(res.trop.Venus);
                  const marSign  = zodSign(res.trop.Mars);
                  const merSign  = zodSign(res.trop.Mercury);
                  const jupSign  = zodSign(res.trop.Jupiter);
                  const satSign  = zodSign(res.trop.Saturn);
                  const SI = SIGN_INFO;

                  const domEl = Object.entries(res.el).sort(([,a],[,b])=>b-a)[0];
                  const domMod = Object.entries(res.mod).sort(([,a],[,b])=>b-a)[0];
                  const modLabel = {Cardinal:"Starter — you initiate",Fixed:"Sustainer — you persist",Mutable:"Adapter — you flow"};

                  const aspects = res.aspects;
                  const hardAsp = aspects.filter(a=>["Square","Opposition"].includes(a.name));
                  const softAsp = aspects.filter(a=>["Trine","Sextile","Conjunction"].includes(a.name));

                  return (
                  <div style={{ display:"flex", flexDirection:"column", gap:16 }}>

                    <Card style={{ background:`linear-gradient(135deg,${M3.primaryContainer}88,${M3.surfaceContainer})`, borderColor:M3.outline }}>
                      <div style={{ fontFamily:"Cinzel,serif", fontSize:"1rem", color:M3.primary, marginBottom:8 }}>Deep Analysis — Your Chart Decoded in Plain English</div>
                      <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.82rem", lineHeight:1.65, color:M3.onSurface, margin:0 }}>
                        This page breaks down every major piece of your birth chart into detailed, personalized descriptions. It covers your <strong>Solar character</strong> (who you are at your core, based on your Sun sign), <strong>Lunar character</strong> (your emotional inner world, based on your Moon sign), <strong>Rising sign</strong> (how others perceive you), and the influence of every significant planet in your chart. Below that, you'll find your element and modality distribution, harmonic layers, and a full spiritual summary that ties everything together.
                      </p>
                    </Card>

                    <Card title="☀ Solar Character — Who You Are at Your Core">
                      <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:14 }}>
                        <div style={{ width:52, height:52, borderRadius:"50%", background:SIGN_COL[sunSign]+"22", border:`2px solid ${SIGN_COL[sunSign]}`, display:"flex", alignItems:"center", justifyContent:"center" }}>
                          <span style={{ fontSize:"1.6rem" }}>{SI[sunSign].emoji}</span>
                        </div>
                        <div>
                          <div style={{ color:SIGN_COL[sunSign], fontFamily:"'Share Tech Mono',monospace", fontSize:"0.82rem", fontWeight:"700" }}>Sun in {sunSign}</div>
                          <div style={{ color:M3.onSurfaceVariant, fontFamily:"'Share Tech Mono',monospace", fontSize:"0.65rem" }}>{SI[sunSign].element} · {SI[sunSign].mode} · ruled by {SI[sunSign].ruler}</div>
                          {SI[sunSign].hebrew && <div style={{ color:M3.outlineVariant, fontFamily:"'Share Tech Mono',monospace", fontSize:"0.6rem", marginTop:2 }}>{SI[sunSign].emoji} ← {SI[sunSign].letterName} ({SI[sunSign].hebrew}) ← {SI[sunSign].phoenician} ← {SI[sunSign].hiero} — {SI[sunSign].letterMeaning.split("—")[1]?.trim()||""}</div>}
                        </div>
                      </div>
                      <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.82rem", lineHeight:1.75, color:M3.onSurface, margin:0 }}>{SOLAR_DEEP[sunSign]}</p>
                    </Card>

                    <Card title="🌙 Lunar Character — Your Emotional Landscape">
                      <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:14 }}>
                        <div style={{ width:52, height:52, borderRadius:"50%", background:SIGN_COL[moonSign]+"22", border:`2px solid ${SIGN_COL[moonSign]}`, display:"flex", alignItems:"center", justifyContent:"center" }}>
                          <span style={{ fontSize:"1.6rem" }}>{SI[moonSign].emoji}</span>
                        </div>
                        <div>
                          <div style={{ color:SIGN_COL[moonSign], fontFamily:"'Share Tech Mono',monospace", fontSize:"0.82rem", fontWeight:"700" }}>Moon in {moonSign}</div>
                          <div style={{ color:M3.onSurfaceVariant, fontFamily:"'Share Tech Mono',monospace", fontSize:"0.65rem" }}>{SI[moonSign].element} · {SI[moonSign].mode} · ruled by {SI[moonSign].ruler}</div>
                          {SI[moonSign].hebrew && <div style={{ color:M3.outlineVariant, fontFamily:"'Share Tech Mono',monospace", fontSize:"0.6rem", marginTop:2 }}>{SI[moonSign].emoji} ← {SI[moonSign].letterName} ({SI[moonSign].hebrew}) ← {SI[moonSign].phoenician} ← {SI[moonSign].hiero} — {SI[moonSign].letterMeaning.split("—")[1]?.trim()||""}</div>}
                        </div>
                      </div>
                      <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.82rem", lineHeight:1.75, color:M3.onSurface, margin:0 }}>{LUNAR_DEEP[moonSign]}</p>
                    </Card>

                    <Card title="🌅 Your Mask — How the World Meets You">
                      <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:14 }}>
                        <div style={{ width:52, height:52, borderRadius:"50%", background:SIGN_COL[ascSign]+"22", border:`2px solid ${SIGN_COL[ascSign]}`, display:"flex", alignItems:"center", justifyContent:"center" }}>
                          <span style={{ fontSize:"1.6rem" }}>{SI[ascSign].emoji}</span>
                        </div>
                        <div>
                          <div style={{ color:SIGN_COL[ascSign], fontFamily:"'Share Tech Mono',monospace", fontSize:"0.82rem", fontWeight:"700" }}>{ascSign} Rising</div>
                          <div style={{ color:M3.onSurfaceVariant, fontFamily:"'Share Tech Mono',monospace", fontSize:"0.65rem" }}>Your ascendant — the sign that was rising on the eastern horizon at your birth</div>
                          {SI[ascSign].hebrew && <div style={{ color:M3.outlineVariant, fontFamily:"'Share Tech Mono',monospace", fontSize:"0.6rem", marginTop:2 }}>{SI[ascSign].emoji} ← {SI[ascSign].letterName} ({SI[ascSign].hebrew}) ← {SI[ascSign].phoenician} ← {SI[ascSign].hiero} — {SI[ascSign].letterMeaning.split("—")[1]?.trim()||""}</div>}
                        </div>
                      </div>
                      <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.82rem", lineHeight:1.75, color:M3.onSurface, margin:0 }}>
                        Your Rising Sign is your social front — the energy people encounter before they know your Sun or Moon. With <strong style={{color:SIGN_COL[ascSign]}}>{ascSign}</strong> rising, you come across as {SI[ascSign].plain.split(".")[0].toLowerCase()}. This is the lens through which all your other energies are filtered. People often identify more with their rising sign than their Sun sign in social settings, because it governs first impressions, body language, and instinctive reactions to new environments.
                      </p>
                      {RISING_SHADOW[ascSign] && (
                        <div style={{ marginTop:14, padding:"12px 16px", borderRadius:10, background:"#ff525208", border:"1px solid #ff525218" }}>
                          <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.64rem", color:"#ff8a50", letterSpacing:"0.1em", marginBottom:6 }}>SHADOW SIDE — WHEN THIS MASK GOES WRONG</div>
                          <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.78rem", lineHeight:1.65, color:M3.onSurface, margin:0 }}>{RISING_SHADOW[ascSign].shadow}</p>
                          <div style={{ marginTop:10, padding:"10px 14px", borderRadius:8, background:"#69ff8e08", border:"1px solid #69ff8e18" }}>
                            <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.62rem", color:"#69ff8e", letterSpacing:"0.1em", marginBottom:4 }}>GROWTH SIGNAL</div>
                            <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.76rem", lineHeight:1.6, color:M3.onSurface, margin:0 }}>{RISING_SHADOW[ascSign].growth}</p>
                          </div>
                        </div>
                      )}
                    </Card>

                    {(()=>{
                      const loveStyle = {Fire:"bold gestures and enthusiasm",Earth:"practical devotion and reliability",Air:"words, ideas, and intellectual connection",Water:"emotional depth and intuitive care"};
                      const angerStyle = {Fire:"direct, fiery confrontation — quick to ignite and quick to forgive",Earth:"slow-burning determination — you rarely explode but never forget",Air:"sharp words and strategic detachment — you fight with your mind",Water:"emotional intensity — your feelings fuel your actions"};
                      return (
                      <div style={grid2}>
                        <Card title="💖 How You Love — Venus in Your Chart">
                          <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:10 }}>
                            <span style={{ color:P_COL.Venus, fontSize:"1.4rem" }}>♀</span>
                            <span style={{ color:SIGN_COL[venSign], fontFamily:"'Share Tech Mono',monospace", fontWeight:"700" }}>Venus in {venSign}</span>
                          </div>
                          <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.78rem", lineHeight:1.65, color:M3.onSurface, margin:0 }}>
                            Venus governs what you find beautiful, how you attract love, and what you value in relationships. In <strong style={{color:SIGN_COL[venSign]}}>{venSign}</strong>, your romantic style is {SI[venSign].plain.split(".")[0].toLowerCase()}. You are drawn to partners who embody {venSign} qualities — {SI[venSign].element.toLowerCase()} energy, {SI[venSign].mode.toLowerCase()} nature. You show love through {loveStyle[SI[venSign].element]}.
                          </p>
                          {VENUS_SHADOW[venSign] && (
                            <div style={{ marginTop:10, padding:"10px 14px", borderRadius:8, background:"#ff525208", border:"1px solid #ff525218" }}>
                              <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.6rem", color:"#ff8a50", letterSpacing:"0.1em", marginBottom:4 }}>SHADOW IN LOVE</div>
                              <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.74rem", lineHeight:1.55, color:M3.onSurface, margin:0 }}>{VENUS_SHADOW[venSign].shadow}</p>
                            </div>
                          )}
                          {VENUS_SHADOW[venSign] && (
                            <div style={{ marginTop:6, padding:"8px 14px", borderRadius:8, background:"#69ff8e08", border:"1px solid #69ff8e18" }}>
                              <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.6rem", color:"#69ff8e", letterSpacing:"0.1em", marginBottom:4 }}>GROWTH SIGNAL</div>
                              <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.72rem", lineHeight:1.5, color:M3.onSurface, margin:0 }}>{VENUS_SHADOW[venSign].growth}</p>
                            </div>
                          )}
                        </Card>
                        <Card title="🔥 How You Act — Mars in Your Chart">
                          <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:10 }}>
                            <span style={{ color:P_COL.Mars, fontSize:"1.4rem" }}>♂</span>
                            <span style={{ color:SIGN_COL[marSign], fontFamily:"'Share Tech Mono',monospace", fontWeight:"700" }}>Mars in {marSign}</span>
                          </div>
                          <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.78rem", lineHeight:1.65, color:M3.onSurface, margin:0 }}>
                            Mars is your engine — how you pursue goals, handle conflict, and express desire. In <strong style={{color:SIGN_COL[marSign]}}>{marSign}</strong>, your drive is {SI[marSign].plain.split(".")[0].toLowerCase()}. When angered, you respond with {angerStyle[SI[marSign].element]}.
                          </p>
                          {MARS_SHADOW[marSign] && (
                            <div style={{ marginTop:10, padding:"10px 14px", borderRadius:8, background:"#ff525208", border:"1px solid #ff525218" }}>
                              <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.6rem", color:"#ff8a50", letterSpacing:"0.1em", marginBottom:4 }}>SHADOW IN CONFLICT</div>
                              <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.74rem", lineHeight:1.55, color:M3.onSurface, margin:0 }}>{MARS_SHADOW[marSign].shadow}</p>
                            </div>
                          )}
                          {MARS_SHADOW[marSign] && (
                            <div style={{ marginTop:6, padding:"8px 14px", borderRadius:8, background:"#69ff8e08", border:"1px solid #69ff8e18" }}>
                              <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.6rem", color:"#69ff8e", letterSpacing:"0.1em", marginBottom:4 }}>GROWTH SIGNAL</div>
                              <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.72rem", lineHeight:1.5, color:M3.onSurface, margin:0 }}>{MARS_SHADOW[marSign].growth}</p>
                            </div>
                          )}
                        </Card>
                      </div>
                      );
                    })()}

                    {(()=>{
                      const learnStyle = {Fire:"doing and experimenting — hands-on, fast-paced, intuitive leaps",Earth:"practical application — step-by-step, methodical, evidence-based",Air:"reading, discussion, and debate — abstract thinking comes naturally",Water:"feeling and absorption — you understand things emotionally before intellectually"};
                      const commStyle = {Cardinal:"direct and initiating — you get to the point",Fixed:"thorough and persistent — you develop ideas fully before sharing",Mutable:"adaptable and wide-ranging — you can talk to anyone about anything"};
                      return (
                      <Card title="🧠 How You Think — Mercury in Your Chart">
                        <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:10 }}>
                          <span style={{ color:P_COL.Mercury, fontSize:"1.3rem" }}>☿</span>
                          <span style={{ color:SIGN_COL[merSign], fontFamily:"'Share Tech Mono',monospace", fontWeight:"700" }}>Mercury in {merSign}</span>
                        </div>
                        <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.8rem", lineHeight:1.7, color:M3.onSurface, margin:0 }}>
                          Mercury shapes how you process information, communicate, and learn. In <strong style={{color:SIGN_COL[merSign]}}>{merSign}</strong>, your mind is {SI[merSign].plain.split(".")[0].toLowerCase()}. You learn best through {learnStyle[SI[merSign].element]}. Your communication style is {commStyle[SI[merSign].mode]}.
                        </p>
                        {MERCURY_SHADOW[merSign] && (
                          <div style={{ marginTop:12, padding:"10px 14px", borderRadius:8, background:"#ff525208", border:"1px solid #ff525218" }}>
                            <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.62rem", color:"#ff8a50", letterSpacing:"0.1em", marginBottom:4 }}>YOUR MIND'S TRAP</div>
                            <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.76rem", lineHeight:1.6, color:M3.onSurface, margin:0 }}>{MERCURY_SHADOW[merSign].shadow}</p>
                          </div>
                        )}
                        {MERCURY_SHADOW[merSign] && (
                          <div style={{ marginTop:6, padding:"8px 14px", borderRadius:8, background:"#69ff8e08", border:"1px solid #69ff8e18" }}>
                            <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.62rem", color:"#69ff8e", letterSpacing:"0.1em", marginBottom:4 }}>GROWTH SIGNAL</div>
                            <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.74rem", lineHeight:1.55, color:M3.onSurface, margin:0 }}>{MERCURY_SHADOW[merSign].growth}</p>
                          </div>
                        )}
                      </Card>
                      );
                    })()}

                    <div style={grid2}>
                      <Card title="♃ Where Life Expands — Jupiter in Your Chart">
                        <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:10 }}>
                          <span style={{ color:P_COL.Jupiter, fontSize:"1.4rem" }}>♃</span>
                          <span style={{ color:SIGN_COL[jupSign], fontFamily:"'Share Tech Mono',monospace", fontWeight:"700" }}>Jupiter in {jupSign}</span>
                        </div>
                        <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.78rem", lineHeight:1.65, color:M3.onSurface, margin:0 }}>
                          {JUPITER_DEEP[jupSign]}
                        </p>
                      </Card>
                      <Card title="♄ Where Life Tests You — Saturn in Your Chart">
                        <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:10 }}>
                          <span style={{ color:P_COL.Saturn, fontSize:"1.4rem" }}>♄</span>
                          <span style={{ color:SIGN_COL[satSign], fontFamily:"'Share Tech Mono',monospace", fontWeight:"700" }}>Saturn in {satSign}</span>
                        </div>
                        <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.78rem", lineHeight:1.65, color:M3.onSurface, margin:0 }}>
                          {SATURN_DEEP[satSign]}
                        </p>
                      </Card>
                    </div>

                    <Card title="⚖ Your Inner Tensions & Gifts — Key Connections">
                      <div style={{ marginBottom:16 }}>
                        <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.66rem", color:"#69ff8e", letterSpacing:"0.1em", marginBottom:10 }}>NATURAL GIFTS ({softAsp.length}) — talents and ease built into your chart</div>
                        {softAsp.slice(0,5).map((a,i)=>{
                          const r0=(P_ROLE[a.p1]||a.p1).toLowerCase(), r1=(P_ROLE[a.p2]||a.p2).toLowerCase();
                          const k1=`${P_ROLE[a.p1]}+${P_ROLE[a.p2]}`, k2=`${P_ROLE[a.p2]}+${P_ROLE[a.p1]}`;
                          const pi = PAIR_INSIGHT[k1]||PAIR_INSIGHT[k2]||"";
                          const giftAdvice = a.name==="Conjunction"?`Because these two forces are fused, they amplify each other powerfully. The self-development opportunity: consciously direct this combined energy rather than letting it run on autopilot.`
                            :a.name==="Trine"?`This is a natural talent — it comes so easily you may not recognise it as a gift. The self-development opportunity: deliberately invest in this area, because ease here means you can reach mastery faster than most.`
                            :`This is a gentle opportunity that activates when you consciously choose to use it. The self-development opportunity: look for situations that let these two parts of you collaborate — that's where you'll find effortless progress.`;
                          return (
                          <div key={i} style={{ padding:"10px 14px", marginBottom:8, borderRadius:10, background:a.col+"0e", borderLeft:`3px solid ${a.col}` }}>
                            <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.72rem", color:M3.onSurface }}>
                              <span style={{color:P_COL[a.p1]}}>{P_SYM[a.p1]} {a.p1}</span>
                              <span style={{color:a.col, margin:"0 6px"}}>{a.sym} {a.name}</span>
                              <span style={{color:P_COL[a.p2]}}>{P_SYM[a.p2]} {a.p2}</span>
                            </div>
                            <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.76rem", lineHeight:1.6, color:M3.onSurface, margin:"6px 0 0" }}>
                              {pi ? `Your ${r0} and ${r1}: ${pi}.` : `Your ${r0} and ${r1} work together naturally.`}
                            </p>
                            <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.72rem", lineHeight:1.55, color:"#69ff8e", margin:"6px 0 0", fontStyle:"italic" }}>
                              {giftAdvice}
                            </p>
                          </div>
                          );
                        })}
                      </div>
                      <div>
                        <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.66rem", color:"#ff8a50", letterSpacing:"0.1em", marginBottom:10 }}>GROWTH EDGES ({hardAsp.length}) — where challenge builds your deepest strengths</div>
                        {hardAsp.slice(0,5).map((a,i)=>{
                          const r0=(P_ROLE[a.p1]||a.p1).toLowerCase(), r1=(P_ROLE[a.p2]||a.p2).toLowerCase();
                          const k1=`${P_ROLE[a.p1]}+${P_ROLE[a.p2]}`, k2=`${P_ROLE[a.p2]}+${P_ROLE[a.p1]}`;
                          const pi = PAIR_INSIGHT[k1]||PAIR_INSIGHT[k2]||"";
                          const growthAdvice = a.name==="Square"
                            ?`This square creates internal friction that never fully resolves — and that's the point. It's a lifelong engine of growth. The self-development work: instead of trying to eliminate the tension between your ${r0} and ${r1}, learn to use it as fuel. The moments when these two parts of you clash are exactly the moments that forge your character.`
                            :a.name==="Opposition"
                            ?`This opposition means your ${r0} and ${r1} pull in opposite directions — you may feel like you have to choose one over the other. The self-development work: you don't. Integration means holding both, learning to swing between the poles consciously rather than being yanked by whichever one is louder. The people who master their oppositions become remarkably balanced.`
                            :`This creates a persistent challenge that pushes you to develop where you're weakest. The self-development work: notice when your ${r0} and ${r1} feel at odds, and instead of suppressing one, ask what each is trying to tell you.`;
                          return (
                          <div key={i} style={{ padding:"10px 14px", marginBottom:8, borderRadius:10, background:a.col+"0e", borderLeft:`3px solid ${a.col}` }}>
                            <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.72rem", color:M3.onSurface }}>
                              <span style={{color:P_COL[a.p1]}}>{P_SYM[a.p1]} {a.p1}</span>
                              <span style={{color:a.col, margin:"0 6px"}}>{a.sym} {a.name}</span>
                              <span style={{color:P_COL[a.p2]}}>{P_SYM[a.p2]} {a.p2}</span>
                            </div>
                            <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.76rem", lineHeight:1.6, color:M3.onSurface, margin:"6px 0 0" }}>
                              {pi ? `Your ${r0} and ${r1}: ${pi}.` : `Your ${r0} and ${r1} are in tension.`}
                            </p>
                            <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.72rem", lineHeight:1.55, color:"#ff8a50", margin:"6px 0 0", fontStyle:"italic" }}>
                              {growthAdvice}
                            </p>
                          </div>
                          );
                        })}
                      </div>
                    </Card>

                    <Card title="△ Elemental Makeup — Your Energetic DNA">
                      <div style={{ display:"flex", gap:10, flexWrap:"wrap", marginBottom:14 }}>
                        {Object.entries(res.el).sort(([,a],[,b])=>b-a).map(([el,v])=>(
                          <div key={el} style={{ flex:1, minWidth:120, padding:"12px 14px", borderRadius:12, background:EL_COL[el]+"11", border:`1px solid ${EL_COL[el]}33`, textAlign:"center" }}>
                            <div style={{ color:EL_COL[el], fontFamily:"'Share Tech Mono',monospace", fontSize:"1.4rem", fontWeight:"700" }}>{v}</div>
                            <div style={{ color:EL_COL[el], fontFamily:"'Share Tech Mono',monospace", fontSize:"0.72rem", fontWeight:"700" }}>{el}</div>
                          </div>
                        ))}
                      </div>
                      <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.8rem", lineHeight:1.7, color:M3.onSurface, margin:0 }}>
                        Your dominant element is <strong style={{color:EL_COL[domEl[0]]}}>{domEl[0]} ({domEl[1]} planets)</strong>. {domEl[0]==="Fire"?"Fire-dominant people are energetic, inspiring, and action-oriented. You lead with passion and instinct. Your challenge is patience and listening.":domEl[0]==="Earth"?"Earth-dominant people are practical, reliable, and grounded. You build real things in the real world. Your challenge is flexibility and letting go of control.":domEl[0]==="Air"?"Air-dominant people are intellectual, social, and communicative. You live in the world of ideas and connection. Your challenge is grounding your thoughts in action and emotion.":"Water-dominant people are intuitive, emotional, and deeply perceptive. You feel the undercurrents others miss. Your challenge is boundaries and not absorbing everyone else's pain."}
                      </p>
                      <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.8rem", lineHeight:1.7, color:M3.onSurface, marginTop:10 }}>
                        Your dominant action style is <strong style={{color:MOD_COL[domMod[0]]}}>{domMod[0]} ({domMod[1]} planets)</strong>: {modLabel[domMod[0]]||domMod[0]}. {domMod[0]==="Cardinal"?"Cardinal-dominant charts produce leaders and initiators — people who start things, launch projects, and set direction. The risk is starting too many things without finishing.":domMod[0]==="Fixed"?"Fixed-dominant charts produce people of incredible persistence and focus. Once committed, you don't waver. The risk is stubbornness and resistance to necessary change.":"Mutable-dominant charts produce versatile, adaptable people who thrive in changing environments. You can shape-shift to meet any challenge. The risk is losing your center and becoming scattered."}
                      </p>
                    </Card>

                    <Card title="∞ Your Harmonic Layers — Hidden Patterns Explained">
                      <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.78rem", lineHeight:1.6, color:M3.onSurfaceVariant, margin:"0 0 14px" }}>
                        Harmonics are like musical overtones in your chart. Your birth chart is the fundamental note; each harmonic reveals a subtler frequency of who you are. They are calculated by multiplying every planet's position by a number and wrapping it around the circle. Here are the key layers in your chart:
                      </p>
                      {[
                        { n:5, title:"Creativity & Art (5th Harmonic)", col:"#64b5f6", desc:"This pattern reveals your creative DNA — how you play, what you make, and where your originality lives. Clusters here show concentrated artistic or inventive talent." },
                        { n:7, title:"Intuition & Spiritual Gifts (7th Harmonic)", col:"#ce93d8", desc:"This pattern reveals mystical leanings — where you sense things beyond the rational. Strong patterns here indicate spiritual sensitivity, prophetic dreams, or artistic inspiration that feels channeled." },
                        { n:9, title:"Purpose & Soul Bonds (9th Harmonic)", col:"#f48fb1", desc:"Called the Navamsa in Vedic astrology, this is considered the chart of your soul's deeper purpose and your most meaningful partnerships. It shows what you are truly here to do." },
                      ].map(h=>{
                        const hPos = harmonic(res.trop, h.n);
                        const hAsp = calcAspects(hPos);
                        const tight = hAsp.filter(a=>a.strength>0.7).slice(0,3);
                        return (
                          <div key={h.n} style={{ padding:"14px 16px", marginBottom:12, borderRadius:12, background:h.col+"0a", border:`1px solid ${h.col}22` }}>
                            <div style={{ color:h.col, fontFamily:"'Share Tech Mono',monospace", fontSize:"0.76rem", fontWeight:"700", marginBottom:6 }}>{h.title}</div>
                            <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.76rem", lineHeight:1.6, color:M3.onSurface, margin:"0 0 8px" }}>{h.desc}</p>
                            {tight.length>0 && (
                              <div style={{ borderTop:`1px solid ${h.col}22`, paddingTop:8 }}>
                                <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.62rem", color:M3.secondary, marginBottom:4 }}>STRONGEST PATTERNS IN YOUR CHART:</div>
                                {tight.map((a,i)=>(
                                  <div key={i} style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.72rem", color:M3.onSurfaceVariant, padding:"2px 0" }}>
                                    {P_SYM[a.p1]} {a.p1} ({P_ROLE[a.p1]||""}) {a.sym} {P_SYM[a.p2]} {a.p2} ({P_ROLE[a.p2]||""}) — <span style={{color:h.col}}>{a.name}</span> at {(a.strength*100).toFixed(0)}% strength
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </Card>

                    {(()=>{
                      const sunEl = SI[sunSign].element, moonEl = SI[moonSign].element, ascEl = SI[ascSign].element;
                      const sunPlain = SI[sunSign].plain.split(". ").slice(0,2).join(". ")+".";
                      const moonPlain = SI[moonSign].plain.split(". ").slice(0,2).join(". ")+".";
                      const ascPlain = SI[ascSign].plain.split(". ").slice(0,2).join(". ")+".";

                      const EL_DESC = {
                        Fire:"a drive toward action, passion, and self-expression — you lead with enthusiasm and instinct",
                        Earth:"a pull toward the practical, the tangible, and the real — you trust what you can see and build",
                        Air:"a need to think, communicate, and connect — you process life through ideas and conversation",
                        Water:"a depth of feeling, intuition, and empathy — you process life through emotion and imagination",
                      };
                      const MOD_DESC = {
                        Cardinal:"starting things — you naturally initiate, set direction, and take the first step even when no one else will",
                        Fixed:"sustaining things — you naturally persist, commit, and hold steady when others give up",
                        Mutable:"adapting to things — you naturally adjust, improvise, and find a way through changing circumstances",
                      };

                      const moonAsEmotional =
                        moonEl==="Fire" ? "Your emotional world runs hot and quick — you feel in bursts of intensity, need excitement to feel alive, and process feelings by acting on them. You recover fast from emotional blows but can be impatient with slower emotional processes." :
                        moonEl==="Earth" ? "Your emotional world is steady and grounded — you feel deeply but process slowly, need physical comfort and routine to feel safe, and express care through practical acts rather than grand declarations. Change unsettles you, and you need time to adjust." :
                        moonEl==="Air"  ? "Your emotional world runs through your mind — you process feelings by talking about them, analyzing them, and finding words for them. You need intellectual connection to feel emotionally close to someone. You can seem detached but you feel more than you show." :
                        "Your emotional world is vast and permeable — you absorb the moods of people and places around you. You feel everything deeply, sometimes overwhelmingly. You need creative or spiritual outlets to process the sheer volume of what you take in. Solitude recharges you.";

                      const ascAsFilter =
                        ascEl==="Fire" ? "People first see you as confident, warm, and energetic. You come across as someone who takes charge and lights up a room — even if internally you feel very different." :
                        ascEl==="Earth" ? "People first see you as calm, reliable, and put-together. You come across as someone grounded and competent — even if internally there is much more going on." :
                        ascEl==="Air"  ? "People first see you as approachable, articulate, and socially graceful. You come across as someone who can talk to anyone and make them feel at ease — even if your inner world is far more complex." :
                        "People first see you as sensitive, gentle, and somewhat mysterious. You come across as someone with hidden depths — which, in your case, is true.";

                      const softCount = softAsp.length, hardCount = hardAsp.length;
                      const totalAsp = softCount + hardCount;
                      const flowDesc = `${softCount} of the ${totalAsp} connections between your planets are harmonious — these are areas where life cooperates with you. Things come naturally here: talents you didn't have to work for, relationships that click, situations that resolve themselves. They represent your built-in advantages.`;
                      const growthDesc = `${hardCount} of the ${totalAsp} connections carry tension — these are areas where life pushes back. They create friction, challenges, and the feeling that you have to earn every inch. But this friction is what develops strength, depth, and resilience. People with many of these grow the most over a lifetime.`;

                      const balanceParagraph = softCount > hardCount
                        ? `With more ease than friction in your chart, life has given you many natural gifts. The challenge for you is not hardship — it's making sure you don't coast. Your talents are real, but they reach their full potential only when you voluntarily seek challenge. Comfort is your trap; growth happens when you leave it.`
                        : hardCount > softCount
                        ? `With more friction than ease in your chart, life has pushed you harder than most. You've likely felt that nothing comes easily — and that is accurate. But this pattern builds something rare: resilience, depth, and wisdom that come only from earned experience. People with charts like yours often accomplish things that surprise those who had an easier start.`
                        : `Your chart is evenly balanced between ease and friction. You have genuine natural talent and enough challenge to develop it. This is the pattern of someone who can both receive gifts gracefully and fight for what matters. The key is knowing which situations call for which response.`;

                      const cnAnimal = res.cn ? (ANIMAL_INFO[res.cn.animal]||{}) : {};
                      const cnEl = res.cn ? (CN_EL_INFO[res.cn.element]||{}) : {};
                      const cnPol = res.cn ? (POLARITY_INFO[res.cn.polarity]||{}) : {};

                      const cnBridge = res.cn ? (() => {
                        const sameEl = SI[sunSign].element.toLowerCase() === res.cn.element.toLowerCase();
                        const westernEl = SI[sunSign].element;
                        const chineseEl = res.cn.element;
                        const animalDesc = cnAnimal.desc || "";
                        const animalTrait = (cnAnimal.trait||"").toLowerCase();
                        const animalShadow = (cnAnimal.shadow||"").toLowerCase();
                        const polLabel = res.cn.polarity === "Yang" ? "outward-moving and assertive" : "inward-moving and reflective";

                        let bridgeText = `In the Chinese system, you were born in a ${chineseEl} ${res.cn.animal} year with ${res.cn.polarity} polarity — meaning your Chinese energy is ${polLabel}. `;
                        bridgeText += `The ${res.cn.animal} is known for being ${animalTrait}. ${animalDesc.split(". ").slice(0,2).join(". ")}. `;
                        bridgeText += `${chineseEl} energy (${(cnEl.trait||"").toLowerCase()}) shapes how your ${res.cn.animal} nature expresses — ${cnEl.desc?.split(". ").slice(0,2).join(". ")||""}. `;
                        if (sameEl) {
                          bridgeText += `Both your Western and Chinese charts emphasise the same element (${westernEl}/${chineseEl}), reinforcing these qualities as a central theme of who you are. This is a strong, consistent signature.`;
                        } else {
                          bridgeText += `Your Western chart is rooted in ${westernEl} (${EL_DESC[westernEl]?.split("—")[0]?.trim()||westernEl.toLowerCase()}) while your Chinese chart is rooted in ${chineseEl} (${(cnEl.trait||"").toLowerCase()}). This means you carry two distinct energetic registers — one more ${westernEl==="Fire"||westernEl==="Air"?"outward and expressive":"inward and reflective"}, the other more ${chineseEl==="Fire"||chineseEl==="Air"?"outward and expressive":"inward and reflective"}. People who know you in different contexts may see genuinely different sides of you — and both are real.`;
                        }
                        if (cnAnimal.shadow) bridgeText += ` The ${res.cn.animal}'s shadow side (${animalShadow}) is something to be aware of — it often surfaces under stress, and understanding it helps you catch it early.`;
                        return bridgeText;
                      })() : "";

                      return (<>
                      <Card title="📖 Understanding the Building Blocks">
                        <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.78rem", lineHeight:1.6, color:M3.onSurfaceVariant, margin:"0 0 16px" }}>
                          Before reading your full portrait, here is what the key pieces mean in your specific case.
                        </p>

                        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))", gap:12, marginBottom:16 }}>
                          <div style={{ padding:"14px 16px", borderRadius:12, background:SIGN_COL[sunSign]+"0a", border:`1px solid ${SIGN_COL[sunSign]}22` }}>
                            <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.66rem", color:M3.secondary, letterSpacing:"0.1em", marginBottom:6 }}>YOUR SUN SIGN — YOUR CORE SELF</div>
                            <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:8 }}>
                              <span style={{ fontSize:"1.3rem" }}>{SI[sunSign].emoji}</span>
                              <span style={{ color:SIGN_COL[sunSign], fontFamily:"'Share Tech Mono',monospace", fontSize:"0.82rem", fontWeight:"700" }}>{sunSign}</span>
                            </div>
                            <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.78rem", lineHeight:1.6, color:M3.onSurface, margin:0 }}>
                              {sunPlain} This is who you are at your most authentic — the identity you grow into over your lifetime.
                            </p>
                          </div>

                          <div style={{ padding:"14px 16px", borderRadius:12, background:SIGN_COL[moonSign]+"0a", border:`1px solid ${SIGN_COL[moonSign]}22` }}>
                            <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.66rem", color:M3.secondary, letterSpacing:"0.1em", marginBottom:6 }}>YOUR MOON SIGN — YOUR EMOTIONAL INNER WORLD</div>
                            <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:8 }}>
                              <span style={{ fontSize:"1.3rem" }}>{SI[moonSign].emoji}</span>
                              <span style={{ color:SIGN_COL[moonSign], fontFamily:"'Share Tech Mono',monospace", fontSize:"0.82rem", fontWeight:"700" }}>{moonSign}</span>
                            </div>
                            <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.78rem", lineHeight:1.6, color:M3.onSurface, margin:0 }}>
                              {moonPlain} {moonAsEmotional}
                            </p>
                          </div>

                          <div style={{ padding:"14px 16px", borderRadius:12, background:SIGN_COL[ascSign]+"0a", border:`1px solid ${SIGN_COL[ascSign]}22` }}>
                            <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.66rem", color:M3.secondary, letterSpacing:"0.1em", marginBottom:6 }}>YOUR RISING SIGN — HOW OTHERS SEE YOU</div>
                            <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:8 }}>
                              <span style={{ fontSize:"1.3rem" }}>{SI[ascSign].emoji}</span>
                              <span style={{ color:SIGN_COL[ascSign], fontFamily:"'Share Tech Mono',monospace", fontSize:"0.82rem", fontWeight:"700" }}>{ascSign}</span>
                            </div>
                            <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.78rem", lineHeight:1.6, color:M3.onSurface, margin:0 }}>
                              {ascPlain} {ascAsFilter}
                            </p>
                          </div>
                        </div>

                        <div style={{ padding:"14px 16px", borderRadius:12, background:EL_COL[domEl[0]]+"0a", border:`1px solid ${EL_COL[domEl[0]]}22`, marginBottom:12 }}>
                          <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.66rem", color:M3.secondary, letterSpacing:"0.1em", marginBottom:6 }}>YOUR DOMINANT ELEMENT — {domEl[0].toUpperCase()} ({domEl[1]} OF YOUR PLANETS)</div>
                          <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.78rem", lineHeight:1.6, color:M3.onSurface, margin:0 }}>
                            The element that dominates your chart is <strong style={{color:EL_COL[domEl[0]]}}>{domEl[0]}</strong> — this means {EL_DESC[domEl[0]]}. This colours everything: how you make decisions, what environments energise you, and what kind of people you naturally attract.
                          </p>
                        </div>

                        <div style={{ padding:"14px 16px", borderRadius:12, background:MOD_COL[domMod[0]]+"0a", border:`1px solid ${MOD_COL[domMod[0]]}22`, marginBottom:12 }}>
                          <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.66rem", color:M3.secondary, letterSpacing:"0.1em", marginBottom:6 }}>YOUR DOMINANT ACTION STYLE — {domMod[0].toUpperCase()} ({domMod[1]} PLANETS)</div>
                          <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.78rem", lineHeight:1.6, color:M3.onSurface, margin:0 }}>
                            Your dominant mode is <strong style={{color:MOD_COL[domMod[0]]}}>{domMod[0]}</strong> — your natural approach to life is {MOD_DESC[domMod[0]]}. This is how you instinctively respond when life presents you with a choice or a challenge.
                          </p>
                        </div>

                        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:12 }}>
                          <div style={{ padding:"14px 16px", borderRadius:12, background:"#69ff8e0a", border:"1px solid #69ff8e22" }}>
                            <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.66rem", color:"#69ff8e", letterSpacing:"0.1em", marginBottom:6 }}>FLOWING CONNECTIONS — {softCount}</div>
                            <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.76rem", lineHeight:1.55, color:M3.onSurface, margin:0 }}>{flowDesc}</p>
                          </div>
                          <div style={{ padding:"14px 16px", borderRadius:12, background:"#ff8a500a", border:"1px solid #ff8a5022" }}>
                            <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.66rem", color:"#ff8a50", letterSpacing:"0.1em", marginBottom:6 }}>GROWTH EDGES — {hardCount}</div>
                            <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.76rem", lineHeight:1.55, color:M3.onSurface, margin:0 }}>{growthDesc}</p>
                          </div>
                        </div>

                        <div style={{ padding:"14px 16px", borderRadius:12, background:M3.surfaceDim, border:`1px solid ${M3.outlineVariant}` }}>
                          <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.66rem", color:M3.secondary, letterSpacing:"0.1em", marginBottom:6 }}>THE BALANCE BETWEEN THEM</div>
                          <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.78rem", lineHeight:1.6, color:M3.onSurface, margin:0 }}>{balanceParagraph}</p>
                        </div>
                      </Card>

                      {res.cn && (
                        <Card title={`${cnAnimal.emoji||"☯"} The ${res.cn.animal} in Your Story — East Meets West`}>
                          <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.84rem", lineHeight:1.8, color:M3.onSurface, margin:0 }}>{cnBridge}</p>
                        </Card>
                      )}

                      <Card title="🔮 Your Portrait — In Plain Language">
                        <div style={{ padding:"16px 18px", borderRadius:12, background:M3.surfaceDim, border:`1px solid ${M3.outlineVariant}` }}>
                          <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.88rem", lineHeight:1.85, color:M3.onSurface, margin:0 }}>
                            {(()=>{
                              const sunDesc = sunSign==="Aries"?"someone who leads with instinct and courage":sunSign==="Taurus"?"someone who builds steadily and values what's real and lasting":sunSign==="Gemini"?"someone who connects, communicates, and adapts":sunSign==="Cancer"?"someone who nurtures, protects, and feels deeply":sunSign==="Leo"?"someone who radiates warmth and creative self-expression":sunSign==="Virgo"?"someone who refines, improves, and serves with precision":sunSign==="Libra"?"someone who seeks harmony, beauty, and genuine partnership":sunSign==="Scorpio"?"someone who transforms, probes, and operates with intensity":sunSign==="Sagittarius"?"someone who explores, questions, and reaches for meaning":sunSign==="Capricorn"?"someone who builds, endures, and earns lasting achievement":sunSign==="Aquarius"?"someone who innovates, reforms, and thinks ahead of the crowd":"someone who feels everything, imagines deeply, and dissolves ordinary boundaries";
                              const moonDesc = moonSign==="Aries"?"quick, fiery emotions — you feel in bursts and recover fast":moonSign==="Taurus"?"steady, grounded emotions — you take your time to process but once you feel something, it lasts":moonSign==="Gemini"?"restless, curious emotions — you talk through your feelings and need mental stimulation to feel secure":moonSign==="Cancer"?"deep, protective emotions — you feel everything around you and need a safe emotional home base":moonSign==="Leo"?"warm, generous emotions — you need to feel appreciated and express your feelings with drama and heart":moonSign==="Virgo"?"careful, analytical emotions — you worry as a form of caring and show love through practical help":moonSign==="Libra"?"measured, diplomatic emotions — you seek equilibrium in relationships and are unsettled by conflict":moonSign==="Scorpio"?"intense, all-or-nothing emotions — you feel the full depth of everything and never forget":moonSign==="Sagittarius"?"optimistic, freedom-loving emotions — you need space to breathe and humour to cope":moonSign==="Capricorn"?"reserved, disciplined emotions — you feel more than you show and take emotional responsibility seriously":moonSign==="Aquarius"?"independent, unconventional emotions — you process feelings intellectually and need space to be yourself":"oceanic, boundless emotions — you absorb everything around you and need solitude to find your own centre";
                              const ascDesc = ascSign==="Aries"?"bold and direct — people see you as confident and action-oriented":ascSign==="Taurus"?"calm and grounded — people see you as stable and reassuring":ascSign==="Gemini"?"witty and versatile — people see you as clever and easy to talk to":ascSign==="Cancer"?"gentle and approachable — people see you as caring and emotionally present":ascSign==="Leo"?"charismatic and warm — people see you as someone who commands attention naturally":ascSign==="Virgo"?"composed and detail-oriented — people see you as competent and put-together":ascSign==="Libra"?"graceful and diplomatic — people see you as charming and socially skilled":ascSign==="Scorpio"?"intense and magnetic — people see you as powerful and a little mysterious":ascSign==="Sagittarius"?"open and enthusiastic — people see you as adventurous and optimistic":ascSign==="Capricorn"?"serious and capable — people see you as mature and authoritative":ascSign==="Aquarius"?"unique and forward-thinking — people see you as original and independent":"dreamy and gentle — people see you as sensitive and slightly otherworldly";
                              const domElDesc = domEl[0]==="Fire"?"action-oriented, passionate, and instinct-driven":domEl[0]==="Earth"?"practical, grounded, and focused on tangible results":domEl[0]==="Air"?"idea-driven, communicative, and socially attuned":"emotionally deep, intuitive, and relationship-focused";
                              const domModDesc = domMod[0]==="Cardinal"?"initiate, set direction, and take the first step":domMod[0]==="Fixed"?"commit deeply, persevere, and see things through":"adapt, improvise, and find creative solutions to whatever comes";
                              const balDesc = softCount > hardCount ? "Life has given you more natural ease than friction — your talents come naturally, and your path often opens without force. The invitation is to push yourself beyond comfort, because that's where your real potential lives." : hardCount > softCount ? "Life has asked more of you than most — you've earned your strengths through difficulty rather than luck. This builds a kind of depth and resilience that cannot be taught, only lived." : "You carry a balanced mix of natural ease and earned strength — some things come naturally, others you've had to fight for. This combination makes you both gifted and tested.";
                              let portrait = `At your core, you are ${sunDesc}. `;
                              portrait += `Beneath the surface, your inner emotional life is shaped by ${moonDesc}. `;
                              portrait += `When people first meet you, the impression you give off is ${ascDesc}. `;
                              portrait += `The overall texture of your personality is ${domElDesc}, and your instinct when facing decisions is to ${domModDesc}. `;
                              portrait += balDesc;
                              return portrait;
                            })()}
                          </p>
                          {res.cn && (
                            <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.88rem", lineHeight:1.85, color:M3.onSurface, marginTop:14 }}>
                              {(()=>{
                                const anTrait = (cnAnimal.trait||"").toLowerCase();
                                const cnElTrait = (cnEl.trait||"").toLowerCase();
                                const pol = res.cn.polarity==="Yang"?"outward-facing and assertive":"inward-facing and reflective";
                                const sameEl = SI[sunSign].element===res.cn.element;
                                let p = `The Chinese tradition sees you as a ${res.cn.element} ${res.cn.animal} — ${anTrait}, coloured by ${cnElTrait}, and ${pol} in nature. `;
                                p += sameEl
                                  ? `This echoes and reinforces your Western chart — both traditions point to the same core qualities, making them a defining signature of who you are.`
                                  : `This adds a dimension your Western chart doesn't emphasise. Where your Western side is more ${SI[sunSign].element==="Fire"||SI[sunSign].element==="Air"?"outwardly expressive":"inwardly processing"}, your Chinese side brings ${res.cn.element==="Fire"||res.cn.element==="Air"?"outward energy and spontaneity":"depth and grounding"}. People who know you in different settings often see genuinely different versions of you — and both are authentic.`;
                                return p;
                              })()}
                            </p>
                          )}
                        </div>
                      </Card>

                      <Card title="🧭 Your Self-Development Summary — An Actionable Guide">
                        {(()=>{
                          const solarPower = SOLAR_DEEP[sunSign]?.match(/Your.*superpower[^.]*\./)?.at(0) || SOLAR_DEEP[sunSign]?.split(". ").slice(-2).join(". ") || `${sunSign} core strength`;
                          const lunarPower = LUNAR_DEEP[moonSign]?.match(/Your emotional superpower[^.]*\./)?.at(0) || `${moonSign} emotional resilience`;
                          const elPower = domEl[0]==="Fire"?"inspiring others through your energy and courage — you ignite action wherever you go"
                            :domEl[0]==="Earth"?"building real, lasting things in the real world — your reliability is rare and deeply valued"
                            :domEl[0]==="Air"?"connecting ideas and people — your mind sees patterns others miss and translates complexity into clarity"
                            :"feeling the invisible currents that others walk past — your emotional intelligence is a genuine superpower";

                          const satGrowth = SATURN_DEEP[satSign]?.split(". ").slice(0,2).join(". ") || `Saturn in ${satSign} tests your discipline`;
                          const hardTop = hardAsp[0] ? `Your strongest internal friction: ${(P_ROLE[hardAsp[0].p1]||hardAsp[0].p1)} ${hardAsp[0].name} ${(P_ROLE[hardAsp[0].p2]||hardAsp[0].p2)} — this is where life keeps asking you to grow, and where your deepest breakthroughs live.` : "";
                          const cnShadow = (ANIMAL_INFO[res.cn?.animal]||{}).shadow || "";

                          const pSun=zodSign(res.prog.Sun), pMoon=zodSign(res.prog.Moon);
                          const sunShift = pSun!==sunSign ? `Your progressed Sun has moved into ${pSun} — you're evolving from ${sunSign} themes toward ${pSun}: ${SI[pSun]?.plain?.split(".")[0]?.toLowerCase()}.` : `Your progressed Sun is still in ${sunSign} — you're deepening your core identity rather than shifting it.`;
                          const moonShift = pMoon!==zodSign(res.trop.Moon) ? `Your progressed Moon is in ${pMoon}, meaning your emotional needs are currently shaped by ${pMoon} energy.` : `Your progressed Moon remains in ${pMoon}, consolidating your emotional foundation.`;

                          const srSatSign = res.sr?.Saturn ? zodSign(res.sr.Saturn) : null;
                          const srChapter = srSatSign ? `This year, Saturn in your Solar Return is in ${srSatSign} — ${SATURN_DEEP[srSatSign]?.split(". ")[0]?.toLowerCase() || "challenging you to grow through discipline"}.` : "";

                          const prompt1 = RISING_SHADOW[ascSign]?.shadow ? `"When I'm stressed, I notice myself ${RISING_SHADOW[ascSign].shadow.split("—")[1]?.trim()?.split(".")[0]?.toLowerCase() || "falling into old patterns"}. What is this behaviour protecting me from?"` : `"What mask do I put on when I feel unsafe, and what would happen if I let it drop?"`;
                          const prompt2 = SATURN_DEEP[satSign] ? `"The area of life where I feel the most pressure or inadequacy is ${HOUSE_AREA ? satSign : satSign} — what would it look like to meet that challenge with compassion instead of just grit?"` : `"Where do I feel life is hardest on me, and what would it look like to meet that challenge with compassion?"`;
                          const prompt3 = hardAsp[0] ? `"My ${(P_ROLE[hardAsp[0].p1]||hardAsp[0].p1).toLowerCase()} and ${(P_ROLE[hardAsp[0].p2]||hardAsp[0].p2).toLowerCase()} seem to pull in different directions. Instead of choosing one, how might I honour both?"` : `"What two parts of myself seem to be in conflict, and what would it look like to integrate them?"`;

                          return (
                          <div>
                            <div style={{ padding:"16px 18px", borderRadius:12, background:"#7c4dff08", border:`1px solid #7c4dff22`, marginBottom:16 }}>
                              <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.68rem", color:"#b388ff", letterSpacing:"0.12em", marginBottom:10 }}>YOUR 3 SUPERPOWERS</div>
                              <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                                <div style={{ padding:"8px 14px", borderRadius:8, background:"#69ff8e08", borderLeft:"3px solid #69ff8e" }}>
                                  <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.58rem", color:"#69ff8e", letterSpacing:"0.08em", marginBottom:2 }}>FROM YOUR SUN ({sunSign})</div>
                                  <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.76rem", lineHeight:1.55, color:M3.onSurface, margin:0 }}>{solarPower}</p>
                                </div>
                                <div style={{ padding:"8px 14px", borderRadius:8, background:"#69ff8e08", borderLeft:"3px solid #69ff8e" }}>
                                  <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.58rem", color:"#69ff8e", letterSpacing:"0.08em", marginBottom:2 }}>FROM YOUR MOON ({moonSign})</div>
                                  <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.76rem", lineHeight:1.55, color:M3.onSurface, margin:0 }}>{lunarPower}</p>
                                </div>
                                <div style={{ padding:"8px 14px", borderRadius:8, background:"#69ff8e08", borderLeft:"3px solid #69ff8e" }}>
                                  <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.58rem", color:"#69ff8e", letterSpacing:"0.08em", marginBottom:2 }}>FROM YOUR DOMINANT ELEMENT ({domEl[0]})</div>
                                  <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.76rem", lineHeight:1.55, color:M3.onSurface, margin:0 }}>{elPower}</p>
                                </div>
                              </div>
                            </div>

                            <div style={{ padding:"16px 18px", borderRadius:12, background:"#ff525208", border:"1px solid #ff525218", marginBottom:16 }}>
                              <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.68rem", color:"#ff8a50", letterSpacing:"0.12em", marginBottom:10 }}>YOUR 3 GROWTH EDGES</div>
                              <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                                <div style={{ padding:"8px 14px", borderRadius:8, background:"#ff8a5008", borderLeft:"3px solid #ff8a50" }}>
                                  <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.58rem", color:"#ff8a50", letterSpacing:"0.08em", marginBottom:2 }}>FROM SATURN IN {satSign.toUpperCase()}</div>
                                  <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.76rem", lineHeight:1.55, color:M3.onSurface, margin:0 }}>{satGrowth}</p>
                                </div>
                                {hardTop && (
                                  <div style={{ padding:"8px 14px", borderRadius:8, background:"#ff8a5008", borderLeft:"3px solid #ff8a50" }}>
                                    <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.58rem", color:"#ff8a50", letterSpacing:"0.08em", marginBottom:2 }}>FROM YOUR HARDEST ASPECT</div>
                                    <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.76rem", lineHeight:1.55, color:M3.onSurface, margin:0 }}>{hardTop}</p>
                                  </div>
                                )}
                                {cnShadow && (
                                  <div style={{ padding:"8px 14px", borderRadius:8, background:"#ff8a5008", borderLeft:"3px solid #ff8a50" }}>
                                    <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.58rem", color:"#ff8a50", letterSpacing:"0.08em", marginBottom:2 }}>FROM YOUR CHINESE SHADOW ({res.cn?.animal})</div>
                                    <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.76rem", lineHeight:1.55, color:M3.onSurface, margin:0 }}>{cnShadow}</p>
                                  </div>
                                )}
                              </div>
                            </div>

                            <div style={{ padding:"16px 18px", borderRadius:12, background:M3.primaryContainer+"44", border:`1px solid ${M3.outline}33`, marginBottom:16 }}>
                              <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.68rem", color:M3.primary, letterSpacing:"0.12em", marginBottom:10 }}>YOUR CURRENT CHAPTER</div>
                              <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.8rem", lineHeight:1.7, color:M3.onSurface, margin:"0 0 8px" }}>{sunShift}</p>
                              <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.8rem", lineHeight:1.7, color:M3.onSurface, margin:"0 0 8px" }}>{moonShift}</p>
                              {srChapter && <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.8rem", lineHeight:1.7, color:M3.onSurface, margin:0 }}>{srChapter}</p>}
                            </div>

                            <div style={{ padding:"16px 18px", borderRadius:12, background:"#ffab4008", border:"1px solid #ffab4022", marginBottom:16 }}>
                              <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.68rem", color:"#ffab40", letterSpacing:"0.12em", marginBottom:10 }}>3 JOURNAL PROMPTS — FOR DEEPER SELF-INQUIRY</div>
                              <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                                <div style={{ padding:"10px 14px", borderRadius:8, background:M3.surfaceDim }}>
                                  <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.78rem", lineHeight:1.6, color:M3.onSurface, margin:0, fontStyle:"italic" }}>1. {prompt1}</p>
                                </div>
                                <div style={{ padding:"10px 14px", borderRadius:8, background:M3.surfaceDim }}>
                                  <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.78rem", lineHeight:1.6, color:M3.onSurface, margin:0, fontStyle:"italic" }}>2. {prompt2}</p>
                                </div>
                                <div style={{ padding:"10px 14px", borderRadius:8, background:M3.surfaceDim }}>
                                  <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.78rem", lineHeight:1.6, color:M3.onSurface, margin:0, fontStyle:"italic" }}>3. {prompt3}</p>
                                </div>
                              </div>
                            </div>

                            <div style={{ padding:"16px 18px", borderRadius:12, background:`linear-gradient(135deg,${M3.primaryContainer}66,${M3.secondaryContainer}66)`, border:`1px solid ${M3.outline}44` }}>
                              <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.68rem", color:M3.tertiary, letterSpacing:"0.12em", marginBottom:10 }}>WHAT INTEGRATION LOOKS LIKE FOR YOU</div>
                              <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.84rem", lineHeight:1.8, color:M3.onSurface, margin:0 }}>
                                Integration means bringing all parts of your chart — even the parts that seem to contradict each other — into conscious awareness. For you, that means honouring your {sunSign} need to {sunSign==="Aries"?"lead and initiate":sunSign==="Taurus"?"build and stabilise":sunSign==="Gemini"?"explore and communicate":sunSign==="Cancer"?"nurture and protect":sunSign==="Leo"?"create and shine":sunSign==="Virgo"?"refine and serve":sunSign==="Libra"?"harmonise and connect":sunSign==="Scorpio"?"transform and probe":sunSign==="Sagittarius"?"explore and philosophise":sunSign==="Capricorn"?"build and achieve":sunSign==="Aquarius"?"innovate and liberate":"imagine and feel"} while giving your {moonSign} Moon the {SI[moonSign]?.element==="Fire"?"excitement and freedom":SI[moonSign]?.element==="Earth"?"stability and comfort":SI[moonSign]?.element==="Air"?"mental stimulation and social connection":"emotional depth and creative space"} it craves — and presenting all of this through your {ascSign} Rising's natural style of {SI[ascSign]?.plain?.split(".")[0]?.toLowerCase() || ascSign.toLowerCase() + " energy"}. You don't have to choose between these parts. The goal is to let each one take the lead when it's needed, and step back when it's not. That's wholeness.
                              </p>
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

                {tab==="struggles" && (
                  <StrugglesTab ctx={{
                    M3, res, SIGN_INFO, SIGN_COL, P_COL, P_SYM, zodSign, Card,
                    calcAspects, SATURN_DEEP, HOUSE_AREA, P_ROLE, PAIR_INSIGHT,
                    RISING_SHADOW, VENUS_SHADOW, MARS_SHADOW, MERCURY_SHADOW,
                    EL_COL, ANIMAL_INFO
                  }} />
                )}

                {false && tab==="struggles-old" && (()=>{
                  const sunSign  = zodSign(res.trop.Sun);
                  const moonSign = zodSign(res.trop.Moon);
                  const ascSign  = zodSign(res.houses.ASC);
                  const venSign  = zodSign(res.trop.Venus);
                  const marSign  = zodSign(res.trop.Mars);
                  const merSign  = zodSign(res.trop.Mercury);
                  const jupSign  = zodSign(res.trop.Jupiter);
                  const satSign  = zodSign(res.trop.Saturn);
                  const allAsp   = calcAspects(res.trop);
                  const hardAsp  = allAsp.filter(a=>a.name==="Square"||a.name==="Opposition").sort((a,b)=>b.strength-a.strength);
                  const domEl    = Object.entries(res.el).sort(([,a],[,b])=>b-a);
                  const weakEl   = domEl.filter(([,v])=>v===0).map(([e])=>e);
                  const lowEl    = domEl.filter(([,v])=>v===1).map(([e])=>e);

                  const MISSING_ELEMENT = {
                    Fire:"With no Fire in your chart, you may struggle with initiative, self-assertion, and trusting your own instincts. Taking the first step can feel paralysing — not because you lack courage, but because the natural fuel for spontaneous action isn't built into your wiring. You may wait for permission, overthink risks, or let others take the lead when you should be out front. The growth: you can develop Fire consciously — through physical activity, deliberate risk-taking, and practising acting before you feel ready.",
                    Earth:"With no Earth in your chart, you may struggle with practical follow-through, financial stability, and staying grounded. Ideas come easily, but turning them into real, tangible outcomes feels like pushing through mud. Your body may feel like an afterthought. The growth: you can develop Earth consciously — through routine, physical work, cooking, budgeting, and committing to the boring-but-necessary structures that keep life functioning.",
                    Air:"With no Air in your chart, you may struggle with objectivity, intellectual detachment, and social communication. You may feel things deeply but have difficulty articulating them clearly, or you might avoid uncomfortable conversations because you can't find the words. The growth: you can develop Air consciously — through journaling, reading widely, engaging in debate, and practising the art of saying difficult things with clarity.",
                    Water:"With no Water in your chart, you may struggle with emotional awareness, empathy, and vulnerability. You may intellectualise feelings, avoid situations that require emotional depth, or feel disconnected from your own inner life. Others may perceive you as cold when you're actually just unequipped to access what you feel. The growth: you can develop Water consciously — through therapy, creative expression, sitting with uncomfortable feelings without fixing them, and learning to say 'I don't know what I feel' as a starting point rather than an ending.",
                  };
                  const LOW_ELEMENT = {
                    Fire:"With only 1 planet in Fire, your assertive, spontaneous energy is limited. You can access it, but it doesn't come naturally — you have to reach for it consciously, especially when life demands quick action or visible confidence.",
                    Earth:"With only 1 planet in Earth, staying grounded and practical takes deliberate effort. You may find that structure, routine, and material concerns don't hold your attention well — but they're exactly what you need more of.",
                    Air:"With only 1 planet in Air, intellectual detachment and social fluency require extra work. You feel more than you think, and translating deep experiences into clear words is an ongoing challenge worth developing.",
                    Water:"With only 1 planet in Water, emotional depth and intuition are areas you have to cultivate. You may default to thinking or doing when the situation actually calls for feeling.",
                  };

                  const CHIRON_HOUSE_WOUND = {
                    0:"Your deepest wound lives in the area of identity and self-image. You may feel fundamentally flawed or 'wrong' in some way that others don't seem to struggle with. Early experiences made you question whether you had a right to exist as you are. The healing: learning that your sensitivity about who you are is exactly what makes you able to help others feel accepted.",
                    1:"Your deepest wound lives in the area of self-worth and money. You may struggle to feel valuable unless you're earning, producing, or providing something tangible. The healing: learning that your worth is inherent, not earned.",
                    2:"Your deepest wound lives in communication and being understood. You may have been silenced, misunderstood, or told your voice didn't matter early on. The healing: learning to speak your truth even when it shakes — your words carry more weight than you know.",
                    3:"Your deepest wound lives in family, home, and belonging. You may feel like you never quite had a safe emotional home base, or that the family you came from didn't fully see you. The healing: creating the sense of belonging you didn't receive — first within yourself, then in chosen family.",
                    4:"Your deepest wound lives in creativity, self-expression, and joy. You may have been shamed for being too much, too visible, or too playful. The healing: learning to create and express without needing approval — joy is not something you need permission for.",
                    5:"Your deepest wound lives in daily routine, health, and service. You may push your body past its limits, neglect self-care, or feel that rest is laziness. The healing: learning that taking care of yourself is not selfish — it's the foundation everything else rests on.",
                    6:"Your deepest wound lives in relationships and partnership. You may attract partners who trigger your deepest insecurities, or avoid intimacy to protect yourself from rejection. The healing: learning that vulnerability in relationship is not weakness but the only path to genuine connection.",
                    7:"Your deepest wound lives in trust, power, and deep intimacy. You may have experienced betrayal, loss, or situations where others had power over you. The healing: learning to be vulnerable without being consumed — to share power rather than surrender or seize it.",
                    8:"Your deepest wound lives in belief, meaning, and truth. You may struggle with faith — in a higher power, in life's fairness, or in your own ability to find answers. The healing: learning that not-knowing is a valid spiritual stance, and that wisdom comes from questions, not just answers.",
                    9:"Your deepest wound lives in career and public reputation. You may feel that no achievement is ever enough, or that success brings exposure you're not ready for. The healing: learning to define success by your own standards rather than by what the world validates.",
                    10:"Your deepest wound lives in community, belonging, and hope for the future. You may feel like an outsider in groups, or that your hopes and visions for the world won't be taken seriously. The healing: learning that your unique perspective is exactly what the group needs — even when it feels alienating.",
                    11:"Your deepest wound lives in the unconscious, solitude, and spiritual life. You may carry hidden pain, unexplained anxieties, or a sense of being haunted by something you can't name. The healing: learning to face the shadows within — therapy, meditation, creative expression, and the willingness to look at what you'd rather avoid.",
                  };

                  const chironLon = res.trop.Chiron;
                  let chironHouse = null;
                  if (chironLon != null) {
                    for (let h=0;h<12;h++){
                      const cusp = res.houses[h+1];
                      const next = res.houses[((h+1)%12)+1];
                      const inH = next > cusp ? (chironLon >= cusp && chironLon < next) : (chironLon >= cusp || chironLon < next);
                      if (inH) { chironHouse = h; break; }
                    }
                  }

                  const twelfthCusp = res.houses[12];
                  const firstCusp   = res.houses[1];
                  const in12th = [];
                  ["Sun","Moon","Mercury","Venus","Mars","Saturn","Neptune","Pluto"].forEach(p=>{
                    if (res.trop[p]==null) return;
                    const lon=res.trop[p];
                    const inH = firstCusp > twelfthCusp ? (lon >= twelfthCusp && lon < firstCusp) : (lon >= twelfthCusp || lon < firstCusp);
                    if (inH) in12th.push(p);
                  });

                  const TH_PLANET = {
                    Sun:"Your core identity operates partly in the shadows — you may feel unseen, as if who you really are is hidden from the world. Self-expression can feel risky, and you may downplay your own needs.",
                    Moon:"Your emotional life is deeply private and may feel overwhelming when exposed. You absorb others' emotions unconsciously and need significant solitude to stay centred.",
                    Mercury:"Your thinking happens in the background — you process slowly and deeply, often understanding things intuitively before you can explain them logically. Others may underestimate your intelligence.",
                    Venus:"Your relationship with love, beauty, and pleasure has a hidden quality. You may love secretly, feel unworthy of affection, or find that your deepest connections happen away from public view.",
                    Mars:"Your drive and anger operate beneath the surface. You may struggle to assert yourself directly, channelling aggression inward or expressing it only when pushed to extremes.",
                    Saturn:"Your relationship with authority and discipline is deeply internalised. You carry responsibilities others don't see and may punish yourself with standards no one else would impose.",
                    Neptune:"Your spiritual and imaginative life is immensely rich but can blur into confusion, escapism, or a sense of being lost in the world. Boundaries between self and other dissolve easily here.",
                    Pluto:"Your relationship with power is unconscious and intense. Transformative experiences happen in private, and you may carry trauma or intensity that others never witness.",
                  };

                  return (
                  <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
                    <Card style={{ background:`linear-gradient(135deg,#ff525222,${M3.surfaceContainer})`, borderColor:"#ff525244" }}>
                      <div style={{ fontFamily:"Cinzel,serif", fontSize:"1rem", color:"#ff8a50", marginBottom:8 }}>Struggles & Growth Edges — Where Life Challenges You</div>
                      <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.82rem", lineHeight:1.65, color:M3.onSurface, margin:0 }}>
                        Every chart contains both gifts and difficulties. This page gathers all the hard parts in one place — not to discourage you, but because <strong>knowing your struggles is the first step to working with them</strong>. The patterns here aren't flaws to fix; they're areas where life has asked more of you than average, and where your deepest growth happens.
                      </p>
                      <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.82rem", lineHeight:1.65, color:M3.onSurface, marginTop:8 }}>
                        Think of these as the curriculum your life keeps returning to — the lessons you can't skip. The reward for engaging with them is genuine wisdom, resilience, and depth that no amount of natural talent can provide.
                      </p>
                    </Card>

                    <Card title="♄ Saturn's Test — Your Hardest Life Lesson">
                      <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:12 }}>
                        <div style={{ width:48, height:48, borderRadius:"50%", background:P_COL.Saturn+"22", border:`2px solid ${P_COL.Saturn}`, display:"flex", alignItems:"center", justifyContent:"center" }}>
                          <span style={{ fontSize:"1.5rem", color:P_COL.Saturn }}>♄</span>
                        </div>
                        <div>
                          <div style={{ color:SIGN_COL[satSign], fontFamily:"'Share Tech Mono',monospace", fontSize:"0.76rem", fontWeight:"700" }}>Saturn in {satSign}</div>
                          <div style={{ color:M3.outlineVariant, fontFamily:"'Share Tech Mono',monospace", fontSize:"0.6rem" }}>The area where life demands the most from you</div>
                        </div>
                      </div>
                      <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.82rem", lineHeight:1.75, color:M3.onSurface, margin:0 }}>
                        {SATURN_DEEP[satSign]}
                      </p>
                    </Card>

                    {chironHouse != null && (
                      <Card title="🩹 Chiron's Wound — Your Deepest Vulnerability">
                        <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:12 }}>
                          <div style={{ width:48, height:48, borderRadius:"50%", background:"#b388ff22", border:"2px solid #b388ff", display:"flex", alignItems:"center", justifyContent:"center" }}>
                            <span style={{ fontSize:"1.2rem", color:"#b388ff" }}>⚷</span>
                          </div>
                          <div>
                            <div style={{ color:"#b388ff", fontFamily:"'Share Tech Mono',monospace", fontSize:"0.76rem", fontWeight:"700" }}>Chiron in House {chironHouse+1} — {HOUSE_AREA[chironHouse]}</div>
                            <div style={{ color:M3.outlineVariant, fontFamily:"'Share Tech Mono',monospace", fontSize:"0.6rem" }}>The "wounded healer" — where pain becomes your greatest gift</div>
                          </div>
                        </div>
                        <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.82rem", lineHeight:1.75, color:M3.onSurface, margin:0 }}>
                          {CHIRON_HOUSE_WOUND[chironHouse]}
                        </p>
                      </Card>
                    )}

                    <Card title="⚡ Internal Friction — Your Hardest Aspects">
                      <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.76rem", lineHeight:1.55, color:M3.onSurfaceVariant, margin:"0 0 14px" }}>
                        These are the strongest squares (□ — 90° angles creating friction) and oppositions (☍ — 180° angles creating polarisation) in your chart. They represent internal contradictions that can't be resolved — only integrated.
                      </p>
                      {hardAsp.length===0 ? (
                        <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.78rem", color:M3.onSurfaceVariant, fontStyle:"italic" }}>No major hard aspects found — your chart has relatively little internal friction, which means growth comes more through external circumstances than internal tension.</p>
                      ) : hardAsp.slice(0,6).map((a,i)=>{
                        const r0=(P_ROLE[a.p1]||a.p1), r1=(P_ROLE[a.p2]||a.p2);
                        const k1=`${r0}+${r1}`, k2=`${r1}+${r0}`;
                        const pi = PAIR_INSIGHT[k1]||PAIR_INSIGHT[k2]||"";
                        const struggleNarrative = a.name==="Square"
                          ? `This square means your ${r0.toLowerCase()} and ${r1.toLowerCase()} are in constant creative tension. Neither will yield to the other. In daily life, this shows up as an internal tug-of-war: you want two things that seem incompatible. The frustration is real, but it's also what drives you to develop more than people without this tension ever need to. Every time you navigate this conflict, you build muscle that others simply don't have.`
                          : `This opposition means your ${r0.toLowerCase()} and ${r1.toLowerCase()} sit on opposite ends of your psyche, like two people pulling a rope in opposite directions. You may swing between them — fully identified with one, then overcorrecting to the other. The work is learning to stand in the middle and hold both. People who master their oppositions develop a rare kind of wholeness — the ability to see from multiple perspectives simultaneously.`;
                        return (
                        <div key={i} style={{ padding:"12px 16px", marginBottom:10, borderRadius:12, background:a.col+"0c", borderLeft:`4px solid ${a.col}` }}>
                          <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:6 }}>
                            <span style={{color:P_COL[a.p1], fontSize:"1rem"}}>{P_SYM[a.p1]}</span>
                            <span style={{color:P_COL[a.p1], fontFamily:"'Share Tech Mono',monospace", fontSize:"0.72rem", fontWeight:"700"}}>{a.p1}</span>
                            <span style={{color:a.col, fontFamily:"'Share Tech Mono',monospace", fontSize:"0.72rem"}}>{a.sym} {a.name}</span>
                            <span style={{color:P_COL[a.p2], fontSize:"1rem"}}>{P_SYM[a.p2]}</span>
                            <span style={{color:P_COL[a.p2], fontFamily:"'Share Tech Mono',monospace", fontSize:"0.72rem", fontWeight:"700"}}>{a.p2}</span>
                            <span style={{color:M3.outlineVariant, marginLeft:"auto", fontSize:"0.62rem", fontFamily:"'Share Tech Mono',monospace"}}>{(a.strength*100).toFixed(0)}% strength</span>
                          </div>
                          {pi && <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.76rem", lineHeight:1.55, color:M3.onSurface, margin:"0 0 6px" }}>At its core: {pi}.</p>}
                          <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.76rem", lineHeight:1.6, color:M3.onSurface, margin:0 }}>{struggleNarrative}</p>
                        </div>
                        );
                      })}
                    </Card>

                    <Card title="🎭 Shadow Patterns — Your Unconscious Defaults Under Stress">
                      <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.76rem", lineHeight:1.55, color:M3.onSurfaceVariant, margin:"0 0 14px" }}>
                        These are the behaviours that emerge when you're stressed, threatened, or operating on autopilot. They're not who you are — they're defence mechanisms. Recognising them is the first step to choosing differently.
                      </p>
                      {[
                        { label:`Rising Shadow (${ascSign})`, icon:"🌅", data:RISING_SHADOW[ascSign], area:"social mask & first impressions" },
                        { label:`Venus Shadow (${venSign})`, icon:"💖", data:VENUS_SHADOW[venSign], area:"love & relationships" },
                        { label:`Mars Shadow (${marSign})`, icon:"🔥", data:MARS_SHADOW[marSign], area:"conflict & assertion" },
                        { label:`Mercury Shadow (${merSign})`, icon:"🧠", data:MERCURY_SHADOW[merSign], area:"thinking & communication" },
                      ].filter(x=>x.data).map((x,i)=>(
                        <div key={i} style={{ padding:"12px 16px", marginBottom:10, borderRadius:12, background:"#ff525208", borderLeft:"3px solid #ff525233" }}>
                          <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:6 }}>
                            <span style={{ fontSize:"1rem" }}>{x.icon}</span>
                            <span style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.7rem", fontWeight:"700", color:"#ff8a50" }}>{x.label}</span>
                            <span style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.58rem", color:M3.outlineVariant, marginLeft:4 }}>({x.area})</span>
                          </div>
                          <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.76rem", lineHeight:1.6, color:M3.onSurface, margin:"0 0 8px" }}>{x.data.shadow}</p>
                          <div style={{ padding:"8px 12px", borderRadius:8, background:"#69ff8e08", borderLeft:"3px solid #69ff8e44" }}>
                            <span style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.58rem", color:"#69ff8e", letterSpacing:"0.08em" }}>THE SHIFT: </span>
                            <span style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.74rem", lineHeight:1.5, color:M3.onSurface }}>{x.data.growth}</span>
                          </div>
                        </div>
                      ))}
                    </Card>

                    {(weakEl.length > 0 || lowEl.length > 0) && (
                      <Card title="△ Elemental Gaps — What's Missing From Your Chart">
                        <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.76rem", lineHeight:1.55, color:M3.onSurfaceVariant, margin:"0 0 14px" }}>
                          When an element is absent or underrepresented in your chart, it doesn't mean you can't access that energy — it means you weren't born with it built in. You have to develop it deliberately, which is harder but ultimately more conscious than running on natural wiring.
                        </p>
                        {weakEl.map(el=>(
                          <div key={el} style={{ padding:"14px 18px", marginBottom:10, borderRadius:12, background:EL_COL[el]+"0a", border:`1px solid ${EL_COL[el]}22` }}>
                            <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.7rem", fontWeight:"700", color:EL_COL[el], marginBottom:6 }}>NO {el.toUpperCase()} — COMPLETELY ABSENT</div>
                            <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.78rem", lineHeight:1.65, color:M3.onSurface, margin:0 }}>{MISSING_ELEMENT[el]}</p>
                          </div>
                        ))}
                        {lowEl.map(el=>(
                          <div key={el} style={{ padding:"12px 16px", marginBottom:8, borderRadius:10, background:EL_COL[el]+"08", border:`1px solid ${EL_COL[el]}18` }}>
                            <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.68rem", fontWeight:"700", color:EL_COL[el], marginBottom:4 }}>LOW {el.toUpperCase()} — UNDERREPRESENTED</div>
                            <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.76rem", lineHeight:1.6, color:M3.onSurface, margin:0 }}>{LOW_ELEMENT[el]}</p>
                          </div>
                        ))}
                      </Card>
                    )}

                    {in12th.length > 0 && (
                      <Card title="🌙 12th House Planets — Your Hidden Struggles">
                        <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.76rem", lineHeight:1.55, color:M3.onSurfaceVariant, margin:"0 0 14px" }}>
                          The 12th house governs the unconscious, solitude, hidden strengths, and self-undoing. Planets here operate beneath your conscious awareness — they're powerful but hard to access directly. They often manifest as vague anxieties, recurring dreams, or patterns you can't quite explain.
                        </p>
                        {in12th.map(p=>(
                          <div key={p} style={{ padding:"12px 16px", marginBottom:8, borderRadius:10, background:P_COL[p]+"0c", borderLeft:`3px solid ${P_COL[p]}44` }}>
                            <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:6 }}>
                              <span style={{ color:P_COL[p], fontSize:"1.1rem" }}>{P_SYM[p]}</span>
                              <span style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.72rem", fontWeight:"700", color:P_COL[p] }}>{p} in the 12th House</span>
                            </div>
                            <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.78rem", lineHeight:1.65, color:M3.onSurface, margin:0 }}>{TH_PLANET[p]||`Your ${(P_ROLE[p]||p).toLowerCase()} operates in the hidden 12th house — this part of your life is deeply internalised and may require deliberate effort to bring into awareness.`}</p>
                          </div>
                        ))}
                      </Card>
                    )}

                    {res.cn && (ANIMAL_INFO[res.cn.animal]||{}).shadow && (
                      <Card title={`☯ ${res.cn.animal} Shadow — Chinese Tradition`}>
                        <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:12 }}>
                          <span style={{ fontSize:"2.4rem" }}>{(ANIMAL_INFO[res.cn.animal]||{}).emoji||"☯"}</span>
                          <div>
                            <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.76rem", fontWeight:"700", color:M3.primary }}>The Shadow of the {res.cn.animal}</div>
                            <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.6rem", color:M3.outlineVariant }}>What the {res.cn.animal} looks like at its worst</div>
                          </div>
                        </div>
                        <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.82rem", lineHeight:1.75, color:M3.onSurface, margin:0 }}>
                          {(ANIMAL_INFO[res.cn.animal]||{}).shadow}
                        </p>
                      </Card>
                    )}

                    <Card style={{ background:`linear-gradient(135deg,#69ff8e11,${M3.surfaceContainer})`, borderColor:"#69ff8e33" }}>
                      <div style={{ fontFamily:"Cinzel,serif", fontSize:"1rem", color:"#69ff8e", marginBottom:10 }}>A Note on Struggles</div>
                      <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.84rem", lineHeight:1.8, color:M3.onSurface, margin:0 }}>
                        The patterns above are not sentences — they're invitations. Every struggle in a chart is also a doorway to the kind of growth that people with easier charts never develop. Saturn's tests build mastery. Chiron's wounds become your greatest gifts to others. Hard aspects forge resilience. Shadow patterns, once seen, become choices rather than compulsions. The people who do the deepest self-development work are almost always the ones with the hardest charts. If this page feels heavy, that's because it's honest — and honesty is where real change begins.
                      </p>
                    </Card>
                  </div>
                  );
                })()}

                {false && tab==="wheel" && (
                  <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
                    <Card style={{ background:`linear-gradient(135deg,${M3.primaryContainer}88,${M3.surfaceContainer})`, borderColor:M3.outline, padding:"14px 18px" }}>
                      <div style={{ fontFamily:"Cinzel,serif", fontSize:"1rem", color:M3.primary, marginBottom:6 }}>Interactive Wheels — Visual Maps of Your Chart</div>
                      <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.78rem", lineHeight:1.55, color:M3.onSurface, margin:0 }}>
                        Each wheel is a circular sky-map. The outer ring shows zodiac signs. Planet symbols sit where they were at your birth — hover or tap any symbol for detailed info. Lines between planets show aspects (angles of connection).
                      </p>
                    </Card>
                    <div style={{ display:"flex", gap:6, flexWrap:"wrap", justifyContent:"center" }}>
                      {[
                        { id:"western", label:"☉ Western (Tropical)", col:M3.primary, tip:"Season-based zodiac used in Western astrology. Your main birth chart." },
                        { id:"sidereal", label:"☽ Lunar (Sidereal)", col:"#ce93d8", tip:"Star-based zodiac used in Vedic/Jyotish astrology. Accounts for Earth's wobble." },
                        { id:"solar", label:"↩ Solar Return", col:"#ffa726", tip:"Chart for when the Sun returns to its birth position each year — maps your year ahead." },
                        { id:"chinese", label:"☯ Chinese", col:"#ffd54f", tip:"Your Chinese zodiac wheel — animals, elements, trigrams, and Yin/Yang." },
                      ].map(m=>(
                        <div key={m.id} style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:3 }}>
                          <button onClick={()=>setWheelMode(m.id)}
                            style={{ padding:"7px 18px", borderRadius:20, border:`1.5px solid ${wheelMode===m.id ? m.col : M3.outline+"66"}`,
                              background:wheelMode===m.id ? m.col+"22" : "transparent", color:wheelMode===m.id ? m.col : M3.onSurfaceVariant,
                              fontFamily:"'Share Tech Mono',monospace", fontSize:"0.72rem", fontWeight:wheelMode===m.id?"700":"400",
                              cursor:"pointer", transition:"all 0.2s" }}>
                            {m.label}
                          </button>
                          {wheelMode===m.id && (
                            <span style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.64rem", color:M3.onSurfaceVariant, textAlign:"center", maxWidth:180 }}>{m.tip}</span>
                          )}
                        </div>
                      ))}
                    </div>

                    {wheelMode==="western" && (
                      <Card title="☉ Western Birth Chart — Tropical Zodiac">
                        <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.78rem", lineHeight:1.55, color:M3.onSurfaceVariant, margin:"0 0 14px" }}>
                          The tropical zodiac is anchored to the seasons — 0° Aries begins at the spring equinox. This is the standard system in Western astrology. AC (Ascendant) sits at the <strong>left</strong> — this is your rising sign. MC (Midheaven) is near the <strong>top</strong> — your career/public point. Hover any symbol for details.
                        </p>
                        <div style={{ display:"flex", justifyContent:"center" }}>
                          <WheelWithTooltip positions={res.trop} houses={res.houses} size={Math.min(560, window.innerWidth-64)} id="full"/>
                        </div>
                        <div style={{ display:"flex", justifyContent:"center", gap:16, marginTop:12, flexWrap:"wrap" }}>
                          {[{l:"AC",c:M3.tertiary,d:"Ascendant (left) — your rising sign, first impressions"},{l:"MC",c:M3.primary,d:"Midheaven (top) — career, public reputation"},{l:"DC",c:M3.tertiary,d:"Descendant (right) — partnerships, what you attract"},{l:"IC",c:M3.primary,d:"Imum Coeli (bottom) — home, roots, private self"}].map(a=>(
                            <div key={a.l} style={{ display:"flex", alignItems:"center", gap:6 }}>
                              <span style={{ color:a.c, fontFamily:"'Share Tech Mono',monospace", fontSize:"0.72rem", fontWeight:"700" }}>{a.l}</span>
                              <span style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.62rem", color:M3.onSurfaceVariant }}>{a.d}</span>
                            </div>
                          ))}
                        </div>
                      </Card>
                    )}

                    {wheelMode==="sidereal" && (
                      <Card title="☽ Sidereal Birth Chart — Vedic/Lunar Zodiac">
                        <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.78rem", lineHeight:1.55, color:M3.onSurfaceVariant, margin:"0 0 14px" }}>
                          The sidereal zodiac is anchored to the fixed stars. Used in Vedic (Jyotish) astrology, it accounts for the precession of the equinoxes — currently about <strong>{ayanamsa(res.jd).toFixed(1)}°</strong> offset from the tropical system. Notice how all your planet positions have shifted compared to the Western wheel.
                        </p>
                        <div style={{ display:"flex", justifyContent:"center" }}>
                          <WheelWithTooltip positions={res.sid} houses={res.houses} size={Math.min(560, window.innerWidth-64)} id="sidwheel"/>
                        </div>
                        <div style={{ marginTop:12, padding:"10px 14px", borderRadius:10, background:M3.surfaceDim, textAlign:"center" }}>
                          <span style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.68rem", color:"#ce93d8" }}>Ayanamsa offset: {ayanamsa(res.jd).toFixed(2)}°</span>
                          <span style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.66rem", color:M3.onSurfaceVariant, marginLeft:8 }}>— every planet shifts by this amount from the tropical chart</span>
                        </div>
                      </Card>
                    )}

                    {wheelMode==="solar" && (
                      res.srPos ? (
                        <Card title="↩ Solar Return Chart — Your Year Ahead">
                          <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.78rem", lineHeight:1.55, color:M3.onSurfaceVariant, margin:"0 0 14px" }}>
                            The Solar Return chart is cast for the exact moment the Sun returns to its birth position each year. It maps the themes and energies of your coming year. Compare planet positions here to your natal wheel to see what's shifted.
                          </p>
                          <div style={{ display:"flex", justifyContent:"center" }}>
                            <WheelWithTooltip positions={res.srPos} houses={res.houses} size={Math.min(560, window.innerWidth-64)} id="srwheel"/>
                          </div>
                          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(130px,1fr))", gap:6, marginTop:12 }}>
                            {["Sun","Moon","Venus","Mars","Jupiter","Saturn"].map(p=>{
                              const srLon = res.srPos?.[p];
                              if (srLon==null) return null;
                              const s = zodSign(srLon);
                              return (
                                <div key={p} style={{ display:"flex", alignItems:"center", gap:5, padding:"5px 10px", borderRadius:8, background:P_COL[p]+"0c", border:`1px solid ${P_COL[p]}22` }}>
                                  <span style={{ color:P_COL[p], fontSize:"0.9rem" }}>{P_SYM[p]}</span>
                                  <span style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.62rem", color:SIGN_COL[s] }}>{s}</span>
                                </div>
                              );
                            })}
                          </div>
                        </Card>
                      ) : (
                        <Card title="↩ Solar Return Chart">
                          <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.82rem", color:M3.onSurfaceVariant, textAlign:"center", padding:40 }}>
                            Solar Return data is not available for this birth date. Try adjusting the year.
                          </p>
                        </Card>
                      )
                    )}

                    {wheelMode==="chinese" && (
                      <Card title={`☯ Chinese Zodiac Wheel — ${res.cn.element} ${res.cn.animal}`}>
                        <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.78rem", lineHeight:1.55, color:M3.onSurfaceVariant, margin:"0 0 14px" }}>
                          The Chinese zodiac is a 12-year cycle of animals, each paired with one of five elements and a Yin/Yang polarity. Your position is highlighted below.
                        </p>
                        <div style={{ display:"flex", justifyContent:"center" }}>
                          <ChineseWheelWithTooltip cn={res.cn} size={Math.min(500, window.innerWidth-64)}/>
                        </div>
                        {res.cn.lunar && (
                          <div style={{ textAlign:"center", marginTop:12, fontFamily:"'Share Tech Mono',monospace", fontSize:"0.72rem", color:M3.secondary }}>
                            Lunar Date: Day {res.cn.lunar.day} of the {res.cn.lunar.monthName} Month
                          </div>
                        )}
                      </Card>
                    )}
                  </div>
                )}

                {false && tab==="aspects" && (
                  <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
                    <Card style={{ background:`linear-gradient(135deg,${M3.primaryContainer}88,${M3.surfaceContainer})`, borderColor:M3.outline }}>
                      <div style={{ fontFamily:"Cinzel,serif", fontSize:"1rem", color:M3.primary, marginBottom:8 }}>What are aspects?</div>
                      <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.83rem", lineHeight:1.65, color:M3.onSurface, margin:"0 0 16px" }}>
                        Aspects are the angles between planets measured around the zodiac circle. When two planets are a precise number of degrees apart, they form a geometric relationship — and their energies blend in a specific way. Think of it like music: some intervals sound harmonious, some create tension, all create meaning.
                      </p>
                      {/* ── Sacred Geometry Aspect Wheel ── */}
                      {(()=>{
                        const gSz = Math.min(400, window.innerWidth - 80);
                        const gCx = gSz/2, gCy = gSz/2, gR = gSz * 0.42;
                        const aspectDefs = [
                          { angle:0,   col:"#FFD700", sym:"☌", name:"Conjunction", tip:"Same place — energies fuse", count:12 },
                          { angle:45,  col:"#ce93d8", sym:"∠", name:"Semisquare", tip:"45° — minor irritant", count:8 },
                          { angle:60,  col:"#64b5f6", sym:"⚹", name:"Sextile",    tip:"60° — gentle opportunity", count:6 },
                          { angle:90,  col:"#ff8a50", sym:"□", name:"Square",      tip:"90° — creative friction", count:4 },
                          { angle:120, col:"#69ff8e", sym:"△", name:"Trine",       tip:"120° — natural flow", count:3 },
                          { angle:135, col:"#ef9a9a", sym:"⚼", name:"Sesquiquadrate", tip:"135° — inner restlessness", count:8 },
                          { angle:150, col:"#b39ddb", sym:"⚻", name:"Quincunx",   tip:"150° — constant adjustment", count:12 },
                          { angle:180, col:"#ff5252", sym:"☍", name:"Opposition",  tip:"Across the chart — push-pull", count:2 },
                        ];
                        return (
                          <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:14 }}>
                            <svg width={gSz} height={gSz} viewBox={`0 0 ${gSz} ${gSz}`} style={{ display:"block" }}>
                              <defs>
                                <filter id="aspGeo"><feGaussianBlur stdDeviation="1.5"/></filter>
                              </defs>
                              <circle cx={gCx} cy={gCy} r={gR+4} fill="#0a0620"/>
                              <circle cx={gCx} cy={gCy} r={gR} fill="none" stroke="#bb86fc" strokeWidth="1" opacity="0.2"/>
                              {SIGNS.map((s,i) => {
                                const a = -Math.PI/2 + (i * 30) * RAD;
                                const [tx,ty] = [gCx + (gR+14)*Math.cos(a), gCy + (gR+14)*Math.sin(a)];
                                const [lx1,ly1] = [gCx + gR*Math.cos(a), gCy + gR*Math.sin(a)];
                                const [lx2,ly2] = [gCx + (gR-8)*Math.cos(a), gCy + (gR-8)*Math.sin(a)];
                                return <g key={s}>
                                  <line x1={lx1} y1={ly1} x2={lx2} y2={ly2} stroke="#bb86fc" strokeWidth="0.5" opacity="0.2"/>
                                  <text x={tx} y={ty} textAnchor="middle" dominantBaseline="middle"
                                    fill={SIGN_COL[s]} fontSize={gR*0.08} fontFamily="serif" opacity="0.55"
                                    style={{userSelect:"none"}}>{SIGN_SYM[i]}</text>
                                </g>;
                              })}
                              {aspectDefs.filter(a=>a.angle > 0).map(asp => {
                                const n = Math.floor(360 / asp.angle);
                                const points = Array.from({length:n}, (_,i) => {
                                  const a = -Math.PI/2 + (i * asp.angle) * RAD;
                                  return [gCx + (gR - 16) * Math.cos(a), gCy + (gR - 16) * Math.sin(a)];
                                });
                                const lines = [];
                                for (let i = 0; i < n; i++) {
                                  for (let j = i+1; j < n; j++) {
                                    const angDiff = Math.abs(i - j) * asp.angle;
                                    if (angDiff === asp.angle || angDiff === 360 - asp.angle) {
                                      lines.push([points[i], points[j]]);
                                    }
                                  }
                                }
                                return <g key={asp.name}>
                                  {lines.map(([[x1,y1],[x2,y2]],li) => (
                                    <g key={li}>
                                      <line x1={x1} y1={y1} x2={x2} y2={y2}
                                        stroke={asp.col} strokeWidth="2.5" opacity="0.08"
                                        strokeLinecap="round" filter="url(#aspGeo)"/>
                                      <line x1={x1} y1={y1} x2={x2} y2={y2}
                                        stroke={asp.col} strokeWidth="1.2" opacity="0.5"
                                        strokeLinecap="round"/>
                                    </g>
                                  ))}
                                  {points.map(([px,py],pi) => (
                                    <circle key={pi} cx={px} cy={py} r="3" fill={asp.col} opacity="0.5"/>
                                  ))}
                                </g>;
                              })}
                              <circle cx={gCx} cy={gCy} r="3" fill="#bb86fc" opacity="0.3"/>
                            </svg>
                            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(155px,1fr))", gap:8, width:"100%" }}>
                              {aspectDefs.map(a=>(
                                <div key={a.name} style={{ display:"flex", alignItems:"center", gap:8,
                                  padding:"7px 10px", borderRadius:8,
                                  background:a.col+"11", border:`1px solid ${a.col}33` }}>
                                  <span style={{ color:a.col, fontSize:"1rem", fontFamily:"serif" }}>{a.sym}</span>
                                  <div>
                                    <div style={{ color:a.col, fontFamily:"'Share Tech Mono',monospace", fontSize:"0.68rem", fontWeight:"700" }}>{a.name} {a.angle}°</div>
                                    <div style={{ color:M3.onSurfaceVariant, fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.67rem", lineHeight:1.4 }}>{a.tip}</div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      })()}
                    </Card>

                    <Card title={`⚹ Your Aspect Web — ${res.aspects.length} connections visualised`}>
                      <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.76rem", lineHeight:1.55, color:M3.onSurfaceVariant, margin:"0 0 14px" }}>
                        This wheel highlights the <strong>connections between your planets</strong>. Thicker, brighter lines mean stronger aspects. Aspect symbols appear on the strongest links. Hover any line for details.
                      </p>
                      <div style={{ display:"flex", justifyContent:"center" }}>
                        <WheelWithTooltip positions={res.trop} houses={res.houses} size={Math.min(520, window.innerWidth-64)} id="aspw" mode="aspects"/>
                      </div>
                    </Card>

                    <Card title="⚹ Aspect Breakdown">
                      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))", gap:12 }}>
                        {["Conjunction","Trine","Sextile","Square","Opposition","Quincunx","Semisquare","Sesquiquadrate"].map(name=>{
                          const matches=res.aspects.filter(a=>a.name===name).sort((a,b)=>b.strength-a.strength);
                          const def=ASPECTS.find(a=>a.name===name);
                          const avgStr=matches.length?matches.reduce((s,a)=>s+a.strength,0)/matches.length:0;
                          return (
                            <div key={name} style={{ padding:"14px 16px", borderRadius:12, background:def?.col+"0a", border:`1px solid ${def?.col}22` }}>
                              <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:8 }}>
                                <span style={{ color:def?.col, fontSize:"1.5rem", fontFamily:"serif" }}>{def?.sym}</span>
                                <div>
                                  <div style={{ color:def?.col, fontFamily:"'Share Tech Mono',monospace", fontSize:"0.74rem", fontWeight:"700" }}>{name} {def?.angle}°</div>
                                  <div style={{ color:M3.onSurfaceVariant, fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.58rem", fontStyle:"italic" }}>{ASP_EXPLAIN[name]||""}</div>
                                  <div style={{ color:M3.onSurfaceVariant, fontFamily:"'Share Tech Mono',monospace", fontSize:"0.58rem" }}>{matches.length} found{matches.length>0?` · avg ${(avgStr*100).toFixed(0)}% strength`:""}</div>
                                </div>
                              </div>
                              <div style={{ height:5, background:M3.outlineVariant, borderRadius:3, overflow:"hidden", marginBottom:8 }}>
                                <div style={{ width:`${avgStr*100}%`, height:"100%", background:def?.col, borderRadius:3 }}/>
                              </div>
                              {matches.length>0 ? matches.slice(0,4).map((a,i)=>(
                                <div key={i} style={{ display:"flex", alignItems:"center", gap:6, padding:"4px 0", borderTop:i>0?`1px solid ${M3.outlineVariant}22`:"none" }}>
                                  <span style={{ color:P_COL[a.p1], fontSize:"0.9rem" }}>{P_SYM[a.p1]}</span>
                                  <span style={{ color:def?.col, fontSize:"0.7rem" }}>{def?.sym}</span>
                                  <span style={{ color:P_COL[a.p2], fontSize:"0.9rem" }}>{P_SYM[a.p2]}</span>
                                  <span style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.62rem", color:M3.onSurfaceVariant, marginLeft:"auto" }}>{a.p1}–{a.p2}</span>
                                  <span style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.58rem", color:def?.col }}>{(a.strength*100).toFixed(0)}%</span>
                                </div>
                              )) : <div style={{ color:M3.outlineVariant, fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.7rem", fontStyle:"italic" }}>None in your chart</div>}
                            </div>
                          );
                        })}
                      </div>
                      <div style={{ marginTop:16, padding:"12px 16px", background:M3.surfaceVariant, borderRadius:12, fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.82rem", color:M3.onSurface, lineHeight:1.7 }}>
                        {(()=>{
                          const trines=res.aspects.filter(a=>a.name==="Trine").length;
                          const squares=res.aspects.filter(a=>a.name==="Square").length;
                          const conjs=res.aspects.filter(a=>a.name==="Conjunction").length;
                          const sextiles=res.aspects.filter(a=>a.name==="Sextile").length;
                          const opps=res.aspects.filter(a=>a.name==="Opposition").length;
                          const quinc=res.aspects.filter(a=>a.name==="Quincunx").length;
                          const semi=res.aspects.filter(a=>a.name==="Semisquare").length;
                          const sesq=res.aspects.filter(a=>a.name==="Sesquiquadrate").length;
                          const soft=trines+sextiles+conjs*0.5, hard=squares+opps+semi+sesq, subtle=quinc;
                          const parts = [];
                          if (trines) parts.push(`${trines} trine${trines>1?"s":""}`);
                          if (sextiles) parts.push(`${sextiles} sextile${sextiles>1?"s":""}`);
                          if (conjs) parts.push(`${conjs} conjunction${conjs>1?"s":""}`);
                          if (squares) parts.push(`${squares} square${squares>1?"s":""}`);
                          if (opps) parts.push(`${opps} opposition${opps>1?"s":""}`);
                          if (quinc) parts.push(`${quinc} quincunx${quinc>1?"es":""}`);
                          if (semi) parts.push(`${semi} semisquare${semi>1?"s":""}`);
                          if (sesq) parts.push(`${sesq} sesquiquadrate${sesq>1?"s":""}`);
                          const summary = parts.join(", ");
                          if (soft > hard*1.5) return `Your chart is heavily harmonious (${summary}). Things tend to flow naturally — your challenge is to not coast on talent but push yourself beyond comfort.${subtle>2?` The ${quinc} quincunxes add a layer of subtle adjustment that keeps you from becoming complacent.`:""}`;
                          if (hard > soft*1.5) return `Your chart is heavily dynamic (${summary}). Life pushes you hard — but this pattern produces people of extraordinary depth and resilience. Your strengths are earned, not given.${subtle>2?` The ${quinc} quincunxes add a layer of nuance that softens the edges of the friction.`:""}`;
                          return `Your chart balances ease and challenge (${summary}). You have natural gifts and real growth edges — the combination makes you both capable and continually evolving.${subtle>2?` With ${quinc} quincunxes, there's also a constant subtle re-calibration happening beneath the surface.`:""}`;
                        })()}
                      </div>
                    </Card>

                    <Card title="⚹ Full Connection Table">
                      <AspectTable aspects={res.aspects}/>
                    </Card>
                  </div>
                )}

                {false && tab==="progressions" && (
                  <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
                    <Card style={{ background:`linear-gradient(135deg,${M3.secondaryContainer}88,${M3.surfaceContainer})`, borderColor:M3.outline }}>
                      <div style={{ display:"flex", gap:20, flexWrap:"wrap", alignItems:"flex-start" }}>
                        <div style={{ flex:1, minWidth:220 }}>
                          <div style={{ fontFamily:"Cinzel,serif", fontSize:"1rem", color:M3.secondary, marginBottom:8 }}>Secondary Progressions — who you're becoming</div>
                          <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.83rem", lineHeight:1.65, color:M3.onSurface, margin:"0 0 10px" }}>
                            Imagine your birth chart is a seed. Secondary progressions show how that seed has grown. The method is simple but profound: <strong style={{color:M3.primary}}>one day after birth = one year of life</strong>. So at age {age}, the planets are read from the sky {age} days after you were born.
                          </p>
                          <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.83rem", lineHeight:1.65, color:M3.onSurface, margin:0 }}>
                            The Progressed Moon changes sign every ~2.5 years and is the most felt. The Progressed Sun shifts sign roughly every 30 years — a complete identity rebirth.
                          </p>
                        </div>
                        <svg width="160" height="160" viewBox="0 0 160 160" style={{ flexShrink:0 }}>
                          <line x1="80" y1="10" x2="80" y2="150" stroke={M3.outline} strokeWidth="2"/>
                          {[0,10,20,30,40,age].map((a,i)=>{
                            const y=10+a*3.5;
                            const isNow=a===age;
                            return (
                              <g key={i}>
                                <line x1="72" y1={y} x2="88" y2={y} stroke={isNow?M3.tertiary:M3.outlineVariant} strokeWidth={isNow?2:1}/>
                                <text x="65" y={y} textAnchor="end" dominantBaseline="middle" fill={isNow?M3.tertiary:M3.onSurfaceVariant} fontSize="9" fontFamily="'Share Tech Mono',monospace">{a}y</text>
                                {isNow && <text x="92" y={y} dominantBaseline="middle" fill={M3.tertiary} fontSize="8" fontFamily="'Share Tech Mono',monospace">← NOW</text>}
                              </g>
                            );
                          })}
                          <text x="80" y="6" textAnchor="middle" fill={M3.secondary} fontSize="8" fontFamily="'Share Tech Mono',monospace">BIRTH</text>
                        </svg>
                      </div>
                    </Card>

                    {(()=>{
                      const nSun=zodSign(res.trop.Sun), pSun=zodSign(res.prog.Sun), nMoon=zodSign(res.trop.Moon), pMoon=zodSign(res.prog.Moon);
                      const sunChanged=nSun!==pSun, moonChanged=nMoon!==pMoon;
                      const PROG_SIGN_ARC = {
                        Aries:"assertiveness, independence, and a pioneering spirit — you're learning to put yourself first",
                        Taurus:"patience, sensory pleasure, and building real value — you're learning what truly lasts",
                        Gemini:"curiosity, communication, and intellectual exploration — you're learning to ask better questions",
                        Cancer:"emotional depth, nurturing, and creating home — you're learning what it means to belong",
                        Leo:"creative self-expression, courage, and visibility — you're learning to let yourself be seen",
                        Virgo:"precision, service, and practical mastery — you're learning that excellence is a form of love",
                        Libra:"partnership, balance, and aesthetic refinement — you're learning that you don't have to do it alone",
                        Scorpio:"depth, transformation, and radical honesty — you're learning to let go of what no longer serves you",
                        Sagittarius:"expansion, adventure, and philosophical inquiry — you're learning that the truth is bigger than you thought",
                        Capricorn:"ambition, structure, and earned authority — you're learning that real power comes with real responsibility",
                        Aquarius:"individuality, innovation, and community vision — you're learning to be yourself in service to something larger",
                        Pisces:"compassion, imagination, and spiritual surrender — you're learning that letting go is the deepest form of strength",
                      };
                      return (
                      <Card title="📖 Your Growth Arc — Where Life Has Taken You">
                        <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.82rem", lineHeight:1.7, color:M3.onSurface, margin:"0 0 14px" }}>
                          Your progressions tell the story of your inner evolution — not events that happened to you, but the way your character has deepened and shifted over time.
                        </p>
                        {sunChanged ? (
                          <div style={{ padding:"14px 16px", borderRadius:12, background:P_COL.Sun+"12", border:`1px solid ${P_COL.Sun}33`, marginBottom:12 }}>
                            <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.68rem", color:P_COL.Sun, letterSpacing:"0.1em", marginBottom:6 }}>☉ IDENTITY SHIFT — {nSun} → {pSun}</div>
                            <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.8rem", lineHeight:1.7, color:M3.onSurface, margin:0 }}>
                              You were born with a <strong style={{color:SIGN_COL[nSun]}}>{nSun}</strong> identity — {SI[nSun].plain.split(".")[0].toLowerCase()}. Over the course of your life, your progressed Sun has moved into <strong style={{color:SIGN_COL[pSun]}}>{pSun}</strong>. This is a profound chapter change: your core self is now developing through {PROG_SIGN_ARC[pSun]}. This doesn't erase your birth Sun — it layers a new dimension of growth on top of it. You may notice that the concerns and interests that drive you now are different from what drove you as a young person.
                            </p>
                          </div>
                        ) : (
                          <div style={{ padding:"12px 16px", borderRadius:10, background:M3.surfaceDim, marginBottom:12 }}>
                            <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.78rem", lineHeight:1.6, color:M3.onSurfaceVariant, margin:0 }}>
                              Your progressed Sun is still in <strong style={{color:SIGN_COL[nSun]}}>{nSun}</strong> — you're still deepening the core identity you were born with. This is a period of mastery rather than reinvention.
                            </p>
                          </div>
                        )}
                        {moonChanged ? (
                          <div style={{ padding:"14px 16px", borderRadius:12, background:P_COL.Moon+"12", border:`1px solid ${P_COL.Moon}33`, marginBottom:12 }}>
                            <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.68rem", color:P_COL.Moon, letterSpacing:"0.1em", marginBottom:6 }}>☽ EMOTIONAL SHIFT — {nMoon} → {pMoon}</div>
                            <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.8rem", lineHeight:1.7, color:M3.onSurface, margin:0 }}>
                              Your emotional landscape has shifted. Born with a <strong style={{color:SIGN_COL[nMoon]}}>{nMoon}</strong> Moon, your instinctive emotional style was {SI[nMoon].plain.split(".")[0].toLowerCase()}. Now, with the progressed Moon in <strong style={{color:SIGN_COL[pMoon]}}>{pMoon}</strong>, you're processing feelings through a new lens: {PROG_SIGN_ARC[pMoon]}. The progressed Moon changes sign every ~2.5 years, so this is a shorter chapter — but deeply felt. Pay attention to what you crave emotionally right now. It's different from what you craved a few years ago, and that shift is purposeful growth.
                            </p>
                          </div>
                        ) : (
                          <div style={{ padding:"12px 16px", borderRadius:10, background:M3.surfaceDim, marginBottom:12 }}>
                            <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.78rem", lineHeight:1.6, color:M3.onSurfaceVariant, margin:0 }}>
                              Your progressed Moon is still in <strong style={{color:SIGN_COL[nMoon]}}>{nMoon}</strong> — your emotional needs are currently being refined within the same sign you were born with, deepening rather than shifting.
                            </p>
                          </div>
                        )}
                        <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.76rem", lineHeight:1.6, color:M3.onSurfaceVariant, margin:0, fontStyle:"italic" }}>
                          {sunChanged && moonChanged ? "Both your identity and emotional life are in active transition — this is an intense period of personal evolution. Be gentle with yourself; you're changing at every level."
                           : sunChanged ? "Your identity is shifting while your emotional base holds steady — you have an anchor even as your sense of self evolves."
                           : moonChanged ? "Your emotional world is in transition while your core identity stays rooted — you're learning new ways to feel without losing who you are."
                           : "Neither your Sun nor Moon have changed signs yet — you're in a period of deepening and consolidation, building strength in the foundations you were born with."}
                        </p>
                      </Card>
                      );
                    })()}

                    <Card title={`→ How You've Evolved by Age ${age}`}>
                      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))", gap:10 }}>
                        {["Sun","Moon","Mercury","Venus","Mars"].map(planet=>{
                          const natalSign=zodSign(res.trop[planet]);
                          const progSign=zodSign(res.prog[planet]);
                          const changed=natalSign!==progSign;
                          return (
                            <div key={planet} style={{ padding:"10px 14px", borderRadius:10,
                              background: changed ? P_COL[planet]+"18" : M3.surfaceDim,
                              border:`1px solid ${changed?P_COL[planet]+"55":M3.outlineVariant}` }}>
                              <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:5 }}>
                                <span style={{ color:P_COL[planet], fontSize:"1rem" }}>{P_SYM[planet]}</span>
                                <span style={{ color:P_COL[planet], fontFamily:"'Share Tech Mono',monospace", fontSize:"0.72rem", fontWeight:"700" }}>{planet}</span>
                                {changed && <span style={{ marginLeft:"auto", background:M3.tertiary, color:M3.onPrimary, fontSize:"0.58rem", padding:"1px 6px", borderRadius:10, fontFamily:"'Share Tech Mono',monospace" }}>SHIFTED</span>}
                              </div>
                              <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.68rem", color:M3.onSurfaceVariant }}>
                                <span style={{ color:SIGN_COL[natalSign] }}>Born: {natalSign}</span>
                                {changed && <span style={{ color:M3.secondary }}> → </span>}
                                {changed && <span style={{ color:SIGN_COL[progSign] }}>Now: {progSign}</span>}
                              </div>
                              {changed && (
                                <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.71rem", color:M3.onSurface, lineHeight:1.5, margin:"6px 0 0" }}>
                                  {planet==="Sun"?`Your core identity is now expressing through ${progSign} — a different register than birth.`:
                                   planet==="Moon"?`Your emotional needs have shifted toward ${progSign} themes.`:
                                   planet==="Venus"?`What you find beautiful and how you love carries ${progSign} flavour now.`:
                                   planet==="Mars"?`Your drive and action style now operates through ${progSign} energy.`:
                                   `Your thinking and communication has evolved to ${progSign} mode.`}
                                </p>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </Card>

                    <div style={grid2}>
                      <Card title={`→ Evolved Positions — Age ${age}`}>
                        <PlanetTable positions={res.prog} jd={res.jd}/>
                      </Card>
                      <Card title="→ Evolved Chart Wheel">
                        <div style={{ display:"flex", justifyContent:"center" }}>
                          <WheelWithTooltip positions={res.prog} houses={res.houses} size={300} id="prog"/>
                        </div>
                      </Card>
                    </div>

                    <Card title="→ Evolved Connections">
                      <AspectTable aspects={calcAspects(res.prog)}/>
                    </Card>
                  </div>
                )}

                {false && tab==="solar" && (
                  <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
                    <Card style={{ background:`linear-gradient(135deg,${M3.tertiaryContainer}88,${M3.surfaceContainer})`, borderColor:`${M3.tertiary}44` }}>
                      <div style={{ display:"flex", gap:20, flexWrap:"wrap", alignItems:"flex-start" }}>
                        <div style={{ flex:1, minWidth:220 }}>
                          <div style={{ fontFamily:"Cinzel,serif", fontSize:"1rem", color:M3.tertiary, marginBottom:8 }}>Solar Return — your annual reset</div>
                          <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.83rem", lineHeight:1.65, color:M3.onSurface, margin:"0 0 10px" }}>
                            Once a year, the Sun returns to the <em>exact degree and minute</em> it occupied when you were born. That precise moment — the Solar Return — acts as a cosmic reset.
                          </p>
                          <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.83rem", lineHeight:1.65, color:M3.onSurface, margin:0 }}>
                            The Solar Return chart is read like a natal chart, but its influence lasts only one year.
                          </p>
                        </div>
                        <svg width="160" height="160" viewBox="0 0 160 160" style={{ flexShrink:0 }}>
                          <circle cx="80" cy="80" r="12" fill={M3.tertiary} opacity="0.9"/>
                          <text x="80" y="80" textAnchor="middle" dominantBaseline="middle" fontSize="14" fontFamily="serif">☉</text>
                          <circle cx="80" cy="80" r="55" fill="none" stroke={M3.outline} strokeWidth="1" strokeDasharray="4 3"/>
                          {[0,90,180,270].map((a,i)=>{
                            const x=80+55*Math.cos((a-90)*RAD), y=80+55*Math.sin((a-90)*RAD);
                            return <circle key={i} cx={x} cy={y} r="4" fill={i===0?M3.tertiary:M3.outlineVariant} stroke={M3.primary} strokeWidth="0.5"/>;
                          })}
                          <text x="80" y="16" textAnchor="middle" fill={M3.tertiary} fontSize="8" fontFamily="'Share Tech Mono',monospace">SR MOMENT</text>
                          <path d={`M80,25 A55,55 0 0,1 ${80+55} 80`} fill="none" stroke={M3.tertiary} strokeWidth="1.5" strokeDasharray="3 2"/>
                        </svg>
                      </div>
                    </Card>

                    {res.srJD ? (
                      <>
                        {res.srPos && (()=>{
                          const SI=SIGN_INFO;
                          const srSun=zodSign(res.srPos.Sun);
                          const srMoon=zodSign(res.srPos.Moon);
                          const srMars=zodSign(res.srPos.Mars);
                          const srVenus=zodSign(res.srPos.Venus);
                          const srJup=zodSign(res.srPos.Jupiter);
                          const srSat=zodSign(res.srPos.Saturn);
                          const srMerc=zodSign(res.srPos.Mercury);

                          const signFeel = s => (SI[s]?.plain||"").split(".").slice(0,2).join(".").trim();
                          const signShort = s => s==="Aries"?"bold, direct, and action-oriented":s==="Taurus"?"steady, grounded, and comfort-seeking":s==="Gemini"?"curious, sociable, and mentally restless":s==="Cancer"?"nurturing, protective, and emotionally sensitive":s==="Leo"?"warm, expressive, and creativity-driven":s==="Virgo"?"precise, helpful, and improvement-focused":s==="Libra"?"diplomatic, harmonious, and partnership-oriented":s==="Scorpio"?"intense, transformative, and deeply probing":s==="Sagittarius"?"expansive, freedom-loving, and truth-seeking":s==="Capricorn"?"disciplined, ambitious, and structure-building":s==="Aquarius"?"unconventional, community-minded, and future-focused":"intuitive, empathic, and boundary-dissolving";

                          const yearCards = [
                            { icon:"☉", title:"The Overall Tone of Your Year", sign:srSun, col:P_COL.Sun,
                              body:`Your year is set in a ${srSun} key — ${signShort(srSun)}. This colours everything: your sense of identity this year, what feels important, and the general atmosphere of your daily life. Think of this as the background music that plays all year.` },
                            { icon:"☽", title:"Your Emotional Landscape This Year", sign:srMoon, col:P_COL.Moon,
                              body:`Emotionally, this year runs on ${srMoon} energy — ${signShort(srMoon)}. This is how you'll process your feelings, what kind of comfort you'll seek, and what will make you feel safe or unsettled. ${srMoon==="Aries"?"Expect quick emotional reactions and a need for independence.":srMoon==="Taurus"?"Expect a craving for stability and physical comfort.":srMoon==="Gemini"?"Expect emotional restlessness and a need to talk things through.":srMoon==="Cancer"?"Expect heightened sensitivity and a pull toward home and family.":srMoon==="Leo"?"Expect a need to be appreciated and a more dramatic emotional range.":srMoon==="Virgo"?"Expect a tendency to worry and show love through practical help.":srMoon==="Libra"?"Expect a deep need for harmony and discomfort with conflict.":srMoon==="Scorpio"?"Expect intense, all-or-nothing feelings and a desire for emotional truth.":srMoon==="Sagittarius"?"Expect optimism, restlessness, and a need for emotional space.":srMoon==="Capricorn"?"Expect emotional self-discipline and a focus on responsibilities.":srMoon==="Aquarius"?"Expect unconventional emotional needs and a desire for independence.":"Expect heightened empathy, vivid dreams, and a need for solitude to recharge."}` },
                            { icon:"♀", title:"Love and Relationships This Year", sign:srVenus, col:P_COL.Venus,
                              body:`Venus in ${srVenus} shapes how you connect with others this year — ${signShort(srVenus)}. This affects romantic relationships, friendships, your aesthetic tastes, and how you spend money on pleasure. ${srVenus==="Aries"?"You'll be more direct in love — attracted to boldness and turned off by passivity.":srVenus==="Taurus"?"You'll crave physical affection, loyalty, and sensual experiences.":srVenus==="Gemini"?"You'll value witty conversation and variety in your social life.":srVenus==="Cancer"?"You'll want emotional depth, nurturing, and domestic cosiness.":srVenus==="Leo"?"You'll want romance, grand gestures, and to feel truly special.":srVenus==="Virgo"?"You'll show and receive love through acts of service and thoughtful details.":srVenus==="Libra"?"You'll seek elegance, fairness, and genuine partnership.":srVenus==="Scorpio"?"You'll want intense, transformative connections — nothing shallow will satisfy.":srVenus==="Sagittarius"?"You'll be drawn to adventure, honesty, and philosophical connection.":srVenus==="Capricorn"?"You'll value commitment, reliability, and relationships that build toward something lasting.":srVenus==="Aquarius"?"You'll value freedom within relationships and be attracted to originality.":"You'll seek soulful, compassionate connections and be moved by beauty and art."}` },
                            { icon:"♂", title:"How You'll Take Action This Year", sign:srMars, col:P_COL.Mars,
                              body:`Mars in ${srMars} drives your energy and initiative — ${signShort(srMars)}. This determines how you'll fight for what you want, what motivates you to get up in the morning, and how you handle conflict. ${srMars==="Aries"?"Your energy is high and your patience is low — you'll charge directly at goals.":srMars==="Taurus"?"You'll be slow to start but unstoppable once moving — persistence is your weapon.":srMars==="Gemini"?"You'll pursue multiple things at once and use words as your primary tool of action.":srMars==="Cancer"?"You'll be motivated by protecting what you love and may be passive-aggressive when crossed.":srMars==="Leo"?"You'll act with confidence and flair — you want to be seen doing impressive things.":srMars==="Virgo"?"You'll be methodical and precise — success comes through careful, well-organised effort.":srMars==="Libra"?"You'll prefer to negotiate rather than fight, but when pushed, you fight for fairness.":srMars==="Scorpio"?"You'll act with intensity and strategic depth — you play the long game.":srMars==="Sagittarius"?"You'll be bold, spontaneous, and willing to take big risks for big rewards.":srMars==="Capricorn"?"You'll be disciplined and strategic — every action serves a long-term plan.":srMars==="Aquarius"?"You'll act unconventionally and be motivated by causes bigger than yourself.":"You'll act on intuition, sometimes passive, but capable of surprising force when inspired."}` },
                            { icon:"♃", title:"Where Life Opens Up for You", sign:srJup, col:P_COL.Jupiter,
                              body:`Jupiter in ${srJup} shows where opportunity, growth, and good fortune flow this year — ${signShort(srJup)}. This is where doors open, where saying "yes" tends to pay off, and where you can expand beyond your current limits. ${srJup==="Aries"?"Opportunities come through bold action and personal initiative.":srJup==="Taurus"?"Growth comes through financial stability, investments, and enjoying life's pleasures.":srJup==="Gemini"?"Opportunities come through learning, writing, networking, and being curious.":srJup==="Cancer"?"Growth comes through home, family, and deepening your emotional roots.":srJup==="Leo"?"Opportunities come through creative expression, leadership, and putting yourself centre stage.":srJup==="Virgo"?"Growth comes through improving your skills, health habits, and being of service.":srJup==="Libra"?"Opportunities come through partnerships, collaboration, and social connections.":srJup==="Scorpio"?"Growth comes through deep transformation, shared resources, and facing what you've avoided.":srJup==="Sagittarius"?"Opportunities come through travel, education, philosophy, and expanding your worldview.":srJup==="Capricorn"?"Growth comes through career advancement, taking on responsibility, and building lasting structures.":srJup==="Aquarius"?"Opportunities come through innovation, community involvement, and unconventional paths.":"Growth comes through spiritual practice, creative imagination, and letting go of what no longer serves you."}` },
                            { icon:"♄", title:"Where Life Tests You This Year", sign:srSat, col:P_COL.Saturn,
                              body:`Saturn in ${srSat} shows where you'll face the hardest lessons — ${signShort(srSat)}. This is not punishment; it's where life asks you to grow up, get serious, and do the work. The rewards here are earned, not given. ${srSat==="Aries"?"You're being tested on your ability to act with discipline rather than impulse — courage must be paired with patience.":srSat==="Taurus"?"You're being tested on your relationship with money, security, and material attachment — real stability comes from within.":srSat==="Gemini"?"You're being tested on your ability to focus and commit to one idea rather than scattering your attention.":srSat==="Cancer"?"You're being tested on emotional maturity — learning to nurture without smothering and to be vulnerable without collapsing.":srSat==="Leo"?"You're being tested on ego and self-expression — learning to lead with humility and create for meaning, not applause.":srSat==="Virgo"?"You're being tested on perfectionism and self-criticism — learning that 'good enough' is sometimes the wisest path.":srSat==="Libra"?"You're being tested on relationships and fairness — learning to set boundaries even when it feels unharmonious.":srSat==="Scorpio"?"You're being tested on control and trust — learning to let go of what you cannot change and trust the process.":srSat==="Sagittarius"?"You're being tested on beliefs and overcommitment — learning that freedom requires structure and that truth requires nuance.":srSat==="Capricorn"?"You're being tested on ambition and work-life balance — learning that achievement without rest is hollow.":srSat==="Aquarius"?"You're being tested on individuality and belonging — learning to be yourself within community, not apart from it.":"You're being tested on boundaries and escapism — learning to stay present with discomfort rather than retreating into fantasy."}` },
                          ];
                          return (<>
                          <Card title="↩ Your Year Ahead — What Each Planet Brings">
                            <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.78rem", lineHeight:1.55, color:M3.onSurfaceVariant, margin:"0 0 16px" }}>
                              Each section below describes a different area of your life over the coming year. This is based on where the planets were at the exact moment the Sun returned to its birth position — your annual "reset point."
                            </p>
                            <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
                              {yearCards.map(yc=>(
                                <div key={yc.title} style={{ padding:"14px 16px", borderRadius:12, background:yc.col+"08", border:`1px solid ${yc.col}22` }}>
                                  <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:8 }}>
                                    <span style={{ fontSize:"1.2rem", color:yc.col }}>{yc.icon}</span>
                                    <span style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.76rem", fontWeight:"700", color:yc.col }}>{yc.title}</span>
                                    <span style={{ marginLeft:"auto", fontFamily:"'Share Tech Mono',monospace", fontSize:"0.72rem", color:SIGN_COL[yc.sign], fontWeight:"600" }}>{yc.sign}</span>
                                  </div>
                                  <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.8rem", lineHeight:1.65, color:M3.onSurface, margin:0 }}>{yc.body}</p>
                                </div>
                              ))}
                            </div>
                          </Card>

                          <Card title="↩ Year Ahead — Summary">
                            <div style={{ padding:"14px 16px", background:M3.surfaceVariant, borderRadius:12, fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.84rem", color:M3.onSurface, lineHeight:1.8 }}>
                              <p style={{ margin:0 }}>
                                This year's overall atmosphere is {signShort(srSun)}. Your emotional life will feel {signShort(srMoon)} — {signFeel(srMoon).toLowerCase()}. In relationships, you'll be drawn to {signShort(srVenus).split(",")[0].toLowerCase()} dynamics. Your drive and energy will be {signShort(srMars).split(",")[0].toLowerCase()}.
                              </p>
                              <p style={{ margin:"10px 0 0" }}>
                                The biggest opportunities this year come through {signShort(srJup).split(",").slice(0,2).join(" and").toLowerCase()} — lean into these areas when doors open. The hardest lessons involve {signShort(srSat).split(",").slice(0,2).join(" and").toLowerCase()} — these areas will ask for patience, discipline, and maturity, but the growth you earn here will last.
                              </p>
                            </div>
                          </Card>
                          </>);
                        })()}

                        <div style={grid2}>
                          <Card title="↩ Year-Ahead Planet Positions">
                            <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.72rem", lineHeight:1.5, color:M3.onSurfaceVariant, margin:"0 0 10px" }}>
                              These are the exact positions of each planet at your Solar Return moment — the raw data behind the descriptions above.
                            </p>
                            {res.srPos && <PlanetTable positions={res.srPos} jd={res.srJD}/>}
                          </Card>
                          <Card title="↩ Year-Ahead Wheel">
                            <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.72rem", lineHeight:1.5, color:M3.onSurfaceVariant, margin:"0 0 10px" }}>
                              The wheel shows where each planet sits in the zodiac for your year ahead. Hover or tap any planet for details.
                            </p>
                            <div style={{ display:"flex", justifyContent:"center" }}>
                              <WheelWithTooltip positions={res.srPos} size={300} id="sr"/>
                            </div>
                          </Card>
                        </div>
                      </>
                    ) : (
                      <Card><div style={{ textAlign:"center", color:M3.secondary, fontFamily:"'Share Tech Mono',monospace", padding:40 }}>Solar return not found in search range.</div></Card>
                    )}
                  </div>
                )}

                {tab==="harmonics" && (
                  <HarmonicsTab ctx={{ M3, res, P_COL, P_SYM, zodSign, zodDeg, Card, WheelWithTooltip }} />
                )}

                {false && tab==="harmonics-old" && (()=>{
                  const HARM_DEFS = {
                    2:  { col:"#ff8a50", label:"Inner Duality (Opposition)", desc:"The 2nd harmonic reveals your internal oppositions — the parts of yourself that pull in different directions. When planets cluster together here, those areas of life are in a tug-of-war. This is the source of your deepest inner tensions but also your capacity for balance. Integration of these poles is a lifetime's work.", lookFor:"Conjunctions in this chart correspond to oppositions in your birth chart. Clusters show where your inner contradictions are strongest." },
                    3:  { col:"#a5d6a7", label:"Natural Gifts (Trine)", desc:"The 3rd harmonic highlights your effortless talents — things that come so naturally you may not even recognize them as gifts. This is the chart of flow, ease, and innate ability. Where planets group together here, life hands you opportunities without you needing to force them.", lookFor:"Conjunctions here correspond to trines in your birth chart. The more planets clustered, the more natural talent is concentrated in that area." },
                    4:  { col:"#ff5252", label:"Friction & Drive (Square)", desc:"The 4th harmonic reveals your internal friction points — where tension, pressure, and challenge build up. These aren't punishments; they're catalysts. This chart shows where life pushes you hardest, and therefore where you develop the most strength, ambition, and achievement.", lookFor:"Conjunctions here correspond to squares in your birth chart. Tight clusters indicate powerful drive and where you'll face your biggest growth edges." },
                    5:  { col:"#64b5f6", label:"Creativity & Art", desc:"The 5th harmonic is your creative DNA — how you play, invent, and express originality. It reveals talents for art, music, performance, design, and any form of creative self-expression. This is the chart astrologers look at to understand someone's unique artistic voice.", lookFor:"Clusters show where your creative power is concentrated. Planets in conjunction here work together to produce original, inventive expression in those life areas." },
                    6:  { col:"#81c784", label:"Service & Duty", desc:"The 6th harmonic combines the themes of opposition (2) and trine (3) — it reveals where duty, responsibility, and productive service intersect with natural ability. This is the chart of craftsmanship, health, and meaningful work.", lookFor:"Conjunctions here indicate where you can turn natural skill into practical contribution. Strong patterns suggest a calling toward healing, teaching, or skilled trades." },
                    7:  { col:"#ce93d8", label:"Intuition & Spiritual Gifts", desc:"The 7th harmonic is the most mystical — it reveals spiritual sensitivity, intuitive perception, and connection to the numinous. This number is sacred across traditions (7 days, 7 chakras, 7 planets of antiquity). Patterns here suggest where you access inspiration that feels channeled or prophetic.", lookFor:"Clusters show where your intuitive antenna is strongest. Tight conjunctions indicate psychic sensitivity, spiritual gifts, or artistic inspiration that transcends the rational." },
                    8:  { col:"#ffb74d", label:"Transformation & Power", desc:"The 8th harmonic combines double-squares — it reveals where transformative power, crisis, and rebirth operate in your chart. This is associated with Scorpionic themes: death/renewal cycles, inheritance, shared resources, and deep psychological change.", lookFor:"Conjunctions indicate life areas where you undergo the most profound transformations. Strong patterns suggest power, resilience, and the ability to rebuild from ashes." },
                    9:  { col:"#f48fb1", label:"Purpose & Soul Bonds", desc:"The 9th harmonic is called the Navamsa in Vedic astrology and is considered the chart of your soul's deeper purpose. It reveals what you are truly here to do and who resonates with you at a dharmic level. This is where astrologers look for information about marriage, spiritual calling, and life mission.", lookFor:"Tight conjunctions reveal your soul's strongest themes. Planets grouped here show what draws your deepest commitment and where your most meaningful relationships form." },
                    10: { col:"#4db6ac", label:"Public Impact & Legacy", desc:"The 10th harmonic combines duality (2) and creativity (5) — it reveals how your internal tensions fuel your public impact. This chart shows what you project into the world, your reputation potential, and the mark you leave.", lookFor:"Clusters indicate where your creative tensions become publicly visible achievements. Strong patterns suggest fame, public recognition, or lasting cultural contribution." },
                    11: { col:"#9fa8da", label:"Vision & Idealism", desc:"The 11th harmonic reveals your relationship with collective ideals, reform, and visionary thinking. This is the Aquarian harmonic — concerned with humanity's future, social change, and idealistic aspiration.", lookFor:"Conjunctions show where you connect with collective movements and ideals. Strong patterns suggest gifts for innovation, social reform, or humanitarian vision." },
                    12: { col:"#ffd54f", label:"Hidden Lessons & Karma", desc:"The 12th harmonic combines all the basic patterns (2×6, 3×4) — it reveals the deepest karmic undertones in your chart. This is associated with the 12th house, Pisces, and themes of endings, sacrifice, hidden enemies, and transcendence. Patterns here often indicate where repeated challenges carry hidden spiritual growth.", lookFor:"Clusters reveal karmic concentrations — life areas where you face recurring patterns that are trying to teach you something. Strong patterns suggest past-life themes or deeply embedded behavioral loops." },
                  };
                  const hd = HARM_DEFS[n];
                  const hPos = harmonic(res.trop, n);
                  const hAsp = calcAspects(hPos);
                  const tight = hAsp.filter(a=>a.name==="Conjunction" && a.strength>0.5).slice(0,6);
                  const anyAsp = hAsp.filter(a=>a.strength>0.6).slice(0,8);
                  const clusterMap = {};
                  Object.entries(hPos).forEach(([p,lon])=>{
                    const s = zodSign(lon);
                    if (!clusterMap[s]) clusterMap[s] = [];
                    clusterMap[s].push(p);
                  });
                  const clusters = Object.entries(clusterMap).filter(([,ps])=>ps.length>=2).sort((a,b)=>b[1].length-a[1].length);
                  const getPairInsight = (p1, p2) => {
                    const r0=P_ROLE[p1]||p1, r1=P_ROLE[p2]||p2;
                    return PAIR_INSIGHT[`${r0}+${r1}`] || PAIR_INSIGHT[`${r1}+${r0}`] || `these two forces work together at a level your surface chart doesn't show — they reinforce and shape each other in ways you may sense but not consciously recognise`;
                  };

                  return (
                    <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
                      <Card style={{ background:`linear-gradient(135deg,${M3.primaryContainer}88,${M3.surfaceContainer})`, borderColor:M3.outline }}>
                        <div style={{ fontFamily:"Cinzel,serif", fontSize:"1rem", color:M3.primary, marginBottom:8 }}>What are Hidden Patterns?</div>
                        <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.82rem", lineHeight:1.65, color:M3.onSurface, margin:0 }}>
                          Your birth chart is like a musical note. Hidden patterns (harmonics) are the overtones — subtler frequencies that shape the timbre. They work by multiplying every planet's position by a number and wrapping it around the 360° circle. When planets that were far apart suddenly land near each other in a harmonic chart, it means they share a hidden resonance at that frequency.
                        </p>
                        <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.82rem", lineHeight:1.65, color:M3.onSurface, marginTop:8 }}>
                          <strong>How to read this:</strong> Look for clusters — multiple planets grouped in the same sign or conjunct (☌). The more planets clustered, the stronger that pattern operates in your life. The wheel below shows where planets land after the harmonic transformation. The table shows their new positions.
                        </p>
                      </Card>

                      <Card title="∞ Select a Pattern Layer">
                        <div style={{ display:"flex", gap:7, flexWrap:"wrap", marginBottom:16 }}>
                          {[2,3,4,5,7,9,12].map(num=>{
                            const d = HARM_DEFS[num];
                            return (
                              <button key={num} onClick={()=>setN(num)}
                                style={{ padding:"7px 14px", border:`1.5px solid ${d.col}${n===num?"":"44"}`,
                                  borderRadius:20, cursor:"pointer",
                                  background: n===num ? d.col+"33" : "transparent",
                                  color: n===num ? d.col : M3.onSurfaceVariant,
                                  fontFamily:"'Share Tech Mono',monospace", fontSize:"0.72rem", fontWeight:n===num?"700":"400",
                                  transition:"all 0.2s" }}>
                                #{num} {d.label.split("(")[0].trim()}
                              </button>
                            );
                          })}
                          <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                            <span style={{ color:M3.secondary, fontFamily:"'Share Tech Mono',monospace", fontSize:"0.68rem" }}>Other:</span>
                            <input type="number" value={n} min={2} max={24} step={1}
                              onChange={e=>setN(Math.max(2,Math.min(24,parseInt(e.target.value)||n)))}
                              style={{ width:52, padding:"6px 8px", background:M3.surfaceDim,
                                border:`1px solid ${M3.outline}`, borderRadius:8, color:M3.onSurface,
                                fontFamily:"'Share Tech Mono',monospace", fontSize:"0.75rem", outline:"none" }}/>
                          </div>
                        </div>

                        <div style={{ padding:"14px 16px", borderRadius:12, background:(hd?.col||M3.primary)+"0e", border:`1px solid ${(hd?.col||M3.primary)}28` }}>
                          <div style={{ color:hd?.col||M3.primary, fontFamily:"'Share Tech Mono',monospace", fontSize:"0.82rem", fontWeight:"700", marginBottom:6 }}>
                            Pattern #{n} — {hd?.label || `Harmonic ${n}`}
                          </div>
                          <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.8rem", lineHeight:1.65, color:M3.onSurface, margin:0 }}>
                            {hd?.desc || `The ${n}th harmonic divides the circle into ${n} equal parts. Planets that form ${n}-based aspects (${(360/n).toFixed(1)}° apart) in your birth chart will appear conjunct here. Every harmonic reveals a different layer of hidden connection between your planets.`}
                          </p>
                          {(hd?.lookFor || !hd) && (
                            <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.76rem", lineHeight:1.55, color:M3.secondary, margin:"8px 0 0", fontStyle:"italic" }}>
                              {hd?.lookFor || `Look for clusters and conjunctions in the chart below — they reveal planets that resonate together at this ${n}-fold frequency.`}
                            </p>
                          )}
                        </div>
                      </Card>

                      {(clusters.length > 0 || tight.length > 0) && (
                        <Card title={`✦ Your Pattern #${n} — Personal Reading`}>
                          {clusters.length > 0 && (
                            <div style={{ marginBottom:14 }}>
                              <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.65rem", color:M3.secondary, letterSpacing:"0.1em", marginBottom:8 }}>SIGN CLUSTERS — WHERE ENERGY CONCENTRATES</div>
                              {clusters.map(([sign, planets])=>(
                                <div key={sign} style={{ padding:"10px 14px", marginBottom:8, borderRadius:10,
                                  background:SIGN_COL[sign]+"0c", border:`1px solid ${SIGN_COL[sign]}22` }}>
                                  <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:6 }}>
                                    <span style={{ color:SIGN_COL[sign], fontSize:"1.1rem" }}>{SIGN_SYM[SIGNS.indexOf(sign)]}</span>
                                    <span style={{ color:SIGN_COL[sign], fontFamily:"'Share Tech Mono',monospace", fontSize:"0.78rem", fontWeight:"700" }}>{sign} — {planets.length} planets</span>
                                  </div>
                                  <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginBottom:6 }}>
                                    {planets.map(p=>(
                                      <span key={p} style={{ padding:"3px 10px", borderRadius:14, background:P_COL[p]+"18", border:`1px solid ${P_COL[p]}44`,
                                        color:P_COL[p], fontFamily:"'Share Tech Mono',monospace", fontSize:"0.66rem" }}>
                                        {P_SYM[p]} {p} <span style={{opacity:0.6}}>({P_ROLE[p]||""})</span>
                                      </span>
                                    ))}
                                  </div>
                                  <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.74rem", lineHeight:1.55, color:M3.onSurfaceVariant, margin:0 }}>
                                    {(()=>{
                                      const si = SIGN_INFO[sign]||{};
                                      const el = si.element||"";
                                      const signStyle = sign==="Aries"?"bold, direct action":sign==="Taurus"?"steady, grounded persistence":sign==="Gemini"?"mental agility and communication":sign==="Cancer"?"emotional depth and nurturing":sign==="Leo"?"confident self-expression and warmth":sign==="Virgo"?"careful refinement and service":sign==="Libra"?"balance, fairness, and partnership":sign==="Scorpio"?"intensity, transformation, and depth":sign==="Sagittarius"?"expansive vision and truth-seeking":sign==="Capricorn"?"disciplined structure and ambition":sign==="Aquarius"?"unconventional thinking and community":"intuitive sensitivity and imagination";
                                      if (planets.length >= 3) {
                                        return `A powerful concentration — ${planets.map(p=>P_ROLE[p]||p).join(", ")} all resonate together at this frequency in ${sign} (${signStyle}). This is a dominant theme in this layer of your chart, suggesting ${el} energy strongly shapes your ${hd?.label?.toLowerCase() || "pattern #"+n}. When this many planets cluster, the theme is unmistakable — it's a central part of who you are at this level.`;
                                      }
                                      const r0 = P_ROLE[planets[0]]||planets[0], r1 = P_ROLE[planets[1]]||planets[1];
                                      const insight = getPairInsight(planets[0], planets[1]);
                                      return `Your ${r0} and ${r1} are linked through ${sign} energy (${signStyle}) at this harmonic level. In practice, this means ${insight}. The ${sign} colouring adds a flavour of ${signStyle.split(" and ")[0]} to how this connection plays out in your life.`;
                                    })()}
                                  </p>
                                </div>
                              ))}
                            </div>
                          )}
                          {tight.length > 0 && (
                            <div>
                              <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.65rem", color:M3.secondary, letterSpacing:"0.1em", marginBottom:8 }}>TIGHT CONJUNCTIONS — STRONGEST HIDDEN LINKS</div>
                              {tight.map((a,i)=>(
                                <div key={i} style={{ padding:"8px 12px", marginBottom:6, borderRadius:8,
                                  background:(hd?.col||M3.primary)+"08", borderLeft:`3px solid ${hd?.col||a.col}` }}>
                                  <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.72rem", color:M3.onSurface }}>
                                    <span style={{color:P_COL[a.p1]}}>{P_SYM[a.p1]} {a.p1}</span>
                                    <span style={{color:hd?.col||a.col, margin:"0 6px"}}>☌</span>
                                    <span style={{color:P_COL[a.p2]}}>{P_SYM[a.p2]} {a.p2}</span>
                                    <span style={{color:M3.onSurfaceVariant, marginLeft:8, fontSize:"0.65rem"}}>{(a.strength*100).toFixed(0)}% strength</span>
                                  </div>
                                  <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.72rem", lineHeight:1.5, color:M3.onSurfaceVariant, margin:"4px 0 0" }}>
                                    {(()=>{
                                      const r0=P_ROLE[a.p1]||a.p1, r1=P_ROLE[a.p2]||a.p2;
                                      const insight = getPairInsight(a.p1, a.p2);
                                      const hdContext = hd ? {
                                        2:`This link is specifically about internal tension — your ${r0} and ${r1} are in a push-pull dynamic that asks you to find balance between them.`,
                                        3:`This link is about natural ease — your ${r0} and ${r1} cooperate effortlessly here, producing a talent you may take for granted.`,
                                        4:`This link is about productive friction — pressure between your ${r0} and ${r1} generates drive and accomplishment.`,
                                        5:`This link is about creative expression — your ${r0} and ${r1} combine here to produce something original and inventive.`,
                                        6:`This link is about practical service — your ${r0} and ${r1} work together toward craftsmanship and meaningful contribution.`,
                                        7:`This link is about spiritual sensitivity — your ${r0} and ${r1} connect at an intuitive, almost mystical level here.`,
                                        8:`This link is about transformation — your ${r0} and ${r1} are bound together through cycles of crisis and renewal.`,
                                        9:`This link is about deep purpose — your ${r0} and ${r1} are connected at the soul level, shaping your dharma and your most meaningful bonds.`,
                                        10:`This link is about public impact — the interplay of your ${r0} and ${r1} shapes what you project into the world and your lasting legacy.`,
                                        11:`This link is about vision — your ${r0} and ${r1} unite around idealistic, forward-looking themes.`,
                                        12:`This link is about hidden lessons — your ${r0} and ${r1} are bound by a karmic pattern that surfaces as recurring challenges carrying growth.`,
                                      }[n] || "" : "";
                                      const strLabel = a.strength>0.85 ? "This is an exceptionally tight bond — one of the strongest hidden links in your chart." : a.strength>0.75 ? "This is a strong bond." : "";
                                      return `At this level, ${insight}. ${hdContext} ${strLabel}`;
                                    })()}
                                  </p>
                                </div>
                              ))}
                            </div>
                          )}
                          {clusters.length === 0 && tight.length === 0 && (
                            <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.8rem", lineHeight:1.6, color:M3.onSurfaceVariant, textAlign:"center", padding:20 }}>
                              No strong clusters or tight conjunctions at this harmonic. This pattern layer is more evenly distributed in your chart — the energy is spread rather than concentrated.
                            </p>
                          )}
                        </Card>
                      )}

                      <div style={grid2}>
                        <Card title={`∞ Pattern #${n} — Remapped Positions`}>
                          <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.72rem", lineHeight:1.5, color:M3.onSurfaceVariant, margin:"0 0 10px" }}>
                            Each planet's birth position × {n}, wrapped to 360°. Planets in the same sign here share a hidden {n}-fold resonance.
                          </p>
                          <PlanetTable positions={hPos} jd={res.jd}/>
                        </Card>
                        <Card title={`∞ Pattern #${n} — Wheel`}>
                          <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.72rem", lineHeight:1.5, color:M3.onSurfaceVariant, margin:"0 0 10px" }}>
                            The harmonic wheel — planets near each other here are connected at this deeper frequency, even if they're far apart in your birth chart.
                          </p>
                          <div style={{ display:"flex", justifyContent:"center" }}>
                            <WheelWithTooltip positions={hPos} size={300} id={`h${n}`}/>
                          </div>
                        </Card>
                      </div>

                      {anyAsp.length > 0 && (
                        <Card title={`∞ Pattern #${n} — All Strong Connections (${anyAsp.length})`}>
                          <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.72rem", lineHeight:1.5, color:M3.onSurfaceVariant, margin:"0 0 10px" }}>
                            These are the strongest aspects in your harmonic chart — they show which planet pairs resonate most powerfully at this frequency.
                          </p>
                          <AspectTable aspects={anyAsp}/>
                        </Card>
                      )}
                    </div>
                  );
                })()}

                {false && tab==="transits" && (()=>{
                  const TRANSIT_MEANING = {
                    Sun:{ slow:false, flavor:"spotlight, vitality, conscious focus" },
                    Moon:{ slow:false, flavor:"mood shifts, emotional triggers, daily rhythms" },
                    Mercury:{ slow:false, flavor:"communication shifts, mental focus, travel patterns" },
                    Venus:{ slow:false, flavor:"relationships, pleasure, financial flow, aesthetic sense" },
                    Mars:{ slow:false, flavor:"energy levels, motivation, conflict triggers, physical drive" },
                    Jupiter:{ slow:true, flavor:"expansion, opportunity, optimism, where life opens up" },
                    Saturn:{ slow:true, flavor:"discipline, restriction, maturing, where life gets serious" },
                    Uranus:{ slow:true, flavor:"sudden change, liberation, breakthroughs, disruption" },
                    Neptune:{ slow:true, flavor:"dreams, confusion, spiritual openings, dissolving boundaries" },
                    Pluto:{ slow:true, flavor:"deep transformation, power shifts, endings and rebirths" },
                  };
                  const activeTransits = Object.entries(res.trPos).map(([p,lon])=>{
                    const natalLon=res.trop[p];
                    const diff=Math.abs(norm(lon-natalLon));
                    const angle=diff>180?360-diff:diff;
                    const aspMatch=ASPECTS.find(a=>Math.abs(angle-a.angle)<=a.orb);
                    return { p, lon, aspMatch };
                  });
                  const hits = activeTransits.filter(t=>t.aspMatch);
                  return (
                  <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
                    <Card style={{ background:`linear-gradient(135deg,${M3.primaryContainer}88,${M3.surfaceContainer})`, borderColor:M3.outline }}>
                      <div style={{ fontFamily:"Cinzel,serif", fontSize:"1rem", color:M3.primary, marginBottom:8 }}>Transits — Where the Planets Are Right Now vs Your Birth</div>
                      <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.82rem", lineHeight:1.65, color:M3.onSurface, margin:0 }}>
                        Transits are the current positions of the planets compared to where they were when you were born. When a planet in the sky today forms an angle (aspect) to one of your birth planets, its energy "activates" that part of your chart. This is the foundation of astrological timing — it shows what themes are live for you <em>right now</em>.
                      </p>
                      <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.82rem", lineHeight:1.65, color:M3.onSurface, marginTop:8 }}>
                        <strong>Fast planets</strong> (Sun, Moon, Mercury, Venus, Mars) move quickly and create brief, passing influences — moods, events, conversations.
                        <strong> Slow planets</strong> (Jupiter, Saturn, Uranus, Neptune, Pluto) move gradually and create major life chapters lasting months or years.
                      </p>
                    </Card>

                    <Card title="⟳ Today's Sky vs Your Birth — What's Active Now">
                      <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.65rem", color:M3.secondary, marginBottom:10, letterSpacing:"0.1em" }}>
                        {new Date().toDateString().toUpperCase()} — {hits.length} of {activeTransits.length} planets are actively aspecting your chart
                      </div>
                      <div style={{ display:"flex", flexDirection:"column", gap:4 }}>
                        {activeTransits.map(({ p, lon, aspMatch })=>{
                          const tm = TRANSIT_MEANING[p]||{};
                          return (
                            <div key={p} style={{ padding:"8px 12px", borderRadius:8,
                              background: aspMatch ? aspMatch.col+"0e" : "transparent",
                              border: aspMatch ? `1px solid ${aspMatch.col}18` : `1px solid transparent` }}>
                              <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                                <span style={{ color:P_COL[p], width:18, textAlign:"center", fontSize:"1rem" }}>{P_SYM[p]}</span>
                                <span style={{ color:M3.onSurface, fontFamily:"'Share Tech Mono',monospace", fontSize:"0.72rem", fontWeight:"600", minWidth:70 }}>{p}</span>
                                <span style={{ color:M3.onSurfaceVariant, fontFamily:"'Share Tech Mono',monospace", fontSize:"0.68rem", flex:1 }}>
                                  currently in {zodSign(lon)} at {zodDeg(lon)}°
                                </span>
                                {aspMatch && (
                                  <span style={{ color:aspMatch.col, fontFamily:"'Share Tech Mono',monospace", fontSize:"0.68rem", fontWeight:"700" }}>
                                    {aspMatch.sym} {aspMatch.name}
                                  </span>
                                )}
                              </div>
                              {aspMatch && (
                                <div style={{ marginTop:5, marginLeft:26 }}>
                                  <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.74rem", lineHeight:1.5, color:M3.onSurfaceVariant, margin:0 }}>
                                    Transiting {p} ({tm.flavor||""}) is forming a <strong style={{color:aspMatch.col}}>{aspMatch.name}</strong> ({ASP_EXPLAIN[aspMatch.name]||aspMatch.name}) to your birth {p}.
                                    {tm.slow ? " This is a slow-moving transit — its influence unfolds over weeks or months and marks a significant chapter." : " This is a fast-moving transit — its influence is felt today and passes within days."}
                                  </p>
                                </div>
                              )}
                              {!aspMatch && (
                                <div style={{ marginTop:3, marginLeft:26 }}>
                                  <span style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.68rem", color:M3.outlineVariant, fontStyle:"italic" }}>
                                    No direct aspect to your birth {p} today — this area is quiet.
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
                        <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.74rem", lineHeight:1.5, color:M3.onSurfaceVariant, margin:"0 0 10px" }}>
                          This table shows every connection between the sky today and your birth chart. Stronger connections (higher %) are felt more powerfully. Look for slow-planet aspects — those shape the major themes of this period.
                        </p>
                        <AspectTable aspects={res.trAsp.slice(0,30)}/>
                      </Card>
                    )}
                  </div>
                  );
                })()}

                {false && tab==="synastry" && (
                  res.synR ? (()=>{
                    const conj = res.synR.aspects.filter(a=>a.name==="Conjunction");
                    const trines = res.synR.aspects.filter(a=>a.name==="Trine");
                    const squares = res.synR.aspects.filter(a=>a.name==="Square");
                    const opps = res.synR.aspects.filter(a=>a.name==="Opposition");
                    const harmony = trines.length + conj.length*0.5;
                    const friction = squares.length + opps.length;
                    const ratio = harmony > 0 ? (harmony/(harmony+friction)*100).toFixed(0) : 50;
                    return (
                    <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
                      <Card style={{ background:`linear-gradient(135deg,${M3.primaryContainer}88,${M3.surfaceContainer})`, borderColor:M3.outline }}>
                        <div style={{ fontFamily:"Cinzel,serif", fontSize:"1rem", color:M3.primary, marginBottom:8 }}>Synastry — How Two Charts Interact</div>
                        <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.82rem", lineHeight:1.65, color:M3.onSurface, margin:0 }}>
                          Synastry compares two birth charts to reveal the chemistry between two people. When a planet in one chart forms an aspect (angle) to a planet in the other, those parts of each person's psyche interact. <strong>Trines (△) and sextiles (⚹)</strong> show where you naturally harmonize — things feel easy. <strong>Squares (□) and oppositions (☍)</strong> show friction — where you challenge and push each other to grow. <strong>Conjunctions (☌)</strong> amplify shared energy.
                        </p>
                        <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.82rem", lineHeight:1.65, color:M3.onSurface, marginTop:8 }}>
                          <strong>How to read it:</strong> Look at which planets connect between the two charts. Sun-Moon links suggest emotional resonance, Venus-Mars links suggest attraction, Mercury connections shape communication, and Saturn contacts indicate where things get serious or tested.
                        </p>
                      </Card>

                      <Card title="♡ Compatibility Summary">
                        <div style={{ display:"flex", gap:16, flexWrap:"wrap", marginBottom:14 }}>
                          <div style={{ flex:1, minWidth:140, textAlign:"center", padding:"14px 12px", borderRadius:12, background:"#69ff8e0c", border:"1px solid #69ff8e22" }}>
                            <div style={{ fontFamily:"Cinzel,serif", fontSize:"1.5rem", color:"#69ff8e" }}>{ratio}%</div>
                            <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.66rem", color:M3.secondary, marginTop:4 }}>HARMONY RATIO</div>
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
                        <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.78rem", lineHeight:1.6, color:M3.onSurfaceVariant, margin:0, textAlign:"center" }}>
                          {ratio>=65 ? "This pairing has strong natural harmony — the ease between you is palpable, though growth edges keep things dynamic." : ratio>=45 ? "A balanced mix of harmony and friction — this combination keeps both people growing while maintaining connection." : "This pairing has significant friction — it's growth-oriented rather than comfort-oriented. Challenges build depth if both people are willing."}
                        </p>
                      </Card>

                      {(()=>{
                        const frictionAsp = [...squares, ...opps].sort((a,b)=>b.strength-a.strength).slice(0,3);
                        if (frictionAsp.length===0) return null;
                        const SYN_GROWTH = {
                          "Sun+Sun":"Your core identities clash — each of you challenges the other's sense of self. The growth: learning that two strong identities can coexist without one diminishing the other.",
                          "Sun+Moon":"One person's identity presses against the other's emotional needs. The growth: learning to honour what your partner feels even when it differs from who you are.",
                          "Sun+Mercury":"Identity meets communication friction. The growth: learning that being understood requires patience, not just clarity.",
                          "Sun+Venus":"Identity conflicts with the other person's love language. The growth: discovering that love can look different from what you expect and still be real.",
                          "Sun+Mars":"One person's sense of self triggers the other's aggression or drive. The growth: channelling competition into mutual motivation rather than power struggles.",
                          "Sun+Saturn":"Identity meets restriction — one person feels limited by the other. The growth: real commitment means accepting the weight of responsibility along with the warmth of love.",
                          "Sun+Jupiter":"Overexpansion meets identity — one person's optimism overwhelms the other. The growth: calibrating enthusiasm so it inspires rather than overshadows.",
                          "Moon+Moon":"Emotional needs clash directly. The growth: learning that your partner's emotional reality is as valid as yours, even when they need the opposite.",
                          "Moon+Mercury":"Feelings meet logic, and they don't speak the same language. The growth: building a bridge between emotional truth and rational understanding.",
                          "Moon+Venus":"Emotional needs conflict with love expressions. The growth: discovering that caring for someone means learning their emotional language, not just speaking your own.",
                          "Moon+Mars":"Emotional vulnerability meets aggression. The growth: learning to be tender and direct at the same time — anger doesn't have to mean rejection.",
                          "Moon+Saturn":"Emotions meet coldness or control. The growth: this is often the deepest bond once matured — learning to feel safe with someone who won't let you hide from reality.",
                          "Venus+Mars":"Attraction meets friction — desire and affection pull in different directions. The growth: learning that passion and tenderness are not opposites but partners.",
                          "Venus+Saturn":"Love meets restriction — one person's affection feels blocked by the other's walls. The growth: love that survives Saturn contact becomes unbreakable.",
                          "Mars+Saturn":"Drive meets discipline — one person's energy feels controlled by the other. The growth: learning to focus ambition rather than fight it. This aspect builds incredible joint productivity once the power struggle resolves.",
                          "Mars+Mars":"Two sets of drives competing. The growth: channelling mutual intensity into shared goals rather than opposing battles.",
                          "Mercury+Mercury":"Two different thinking styles colliding. The growth: intellectual diversity strengthens decisions when both people learn to listen.",
                          "Jupiter+Saturn":"Expansion meets contraction. The growth: one person dreams big, the other builds real — together you become unstoppable when you stop fighting over pace.",
                        };
                        const getKey = (a) => {
                          const p1 = a.p1.replace(/^[AB]_/,""), p2 = a.p2.replace(/^[AB]_/,"");
                          return SYN_GROWTH[`${p1}+${p2}`]||SYN_GROWTH[`${p2}+${p1}`]||`Your ${(P_ROLE[p1]||p1).toLowerCase()} and their ${(P_ROLE[p2]||p2).toLowerCase()} create friction. The growth: learning to meet difference with curiosity rather than defence.`;
                        };
                        return (
                        <Card title="💪 Relationship Growth Areas — Where Friction Builds Depth">
                          <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.76rem", lineHeight:1.55, color:M3.onSurfaceVariant, margin:"0 0 12px" }}>
                            These are the most intense friction points between your charts. They represent the areas where this relationship will be most challenging — and most transformative if both people are willing to grow.
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
                        );
                      })()}

                      <div style={grid2}>
                        <Card title="♡ Person A — Birth Chart">
                          <div style={{ display:"flex", justifyContent:"center" }}>
                            <WheelWithTooltip positions={res.trop} houses={res.houses} size={280} id="synA"/>
                          </div>
                        </Card>
                        <Card title="♡ Person B — Birth Chart">
                          <div style={{ display:"flex", justifyContent:"center" }}>
                            <WheelWithTooltip positions={res.synR.positions} houses={res.synR.houses} size={280} id="synB"/>
                          </div>
                        </Card>
                      </div>

                      <Card title={`♡ All Cross-Chart Connections (${res.synR.aspects.length} links)`}>
                        <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.74rem", lineHeight:1.5, color:M3.onSurfaceVariant, margin:"0 0 10px" }}>
                          Each row shows a connection between one of Person A's planets and one of Person B's. The "strength" percentage indicates how tight the aspect is — higher means more strongly felt by both people.
                        </p>
                        <AspectTable aspects={res.synR.aspects}/>
                      </Card>
                    </div>
                    );
                  })() : (
                    <Card style={{ background:`linear-gradient(135deg,${M3.primaryContainer}88,${M3.surfaceContainer})`, borderColor:M3.outline }}>
                      <div style={{ fontFamily:"Cinzel,serif", fontSize:"1rem", color:M3.primary, marginBottom:8 }}>Synastry — Relationship Chart Comparison</div>
                      <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.82rem", lineHeight:1.65, color:M3.onSurface, margin:"0 0 16px" }}>
                        Synastry compares two people's birth charts to reveal the chemistry, harmony, and friction between them. It shows how your planets interact with another person's — where you connect easily and where you push each other to grow.
                      </p>
                      <div style={{ textAlign:"center", color:M3.secondary, fontFamily:"'Share Tech Mono', monospace", padding:"30px 0", borderTop:`1px solid ${M3.outlineVariant}` }}>
                        To use: check "Synastry" in the birth data form above, enter Person B's birth details, and click Compute.
                      </div>
                    </Card>
                  )
                )}

                {false && tab==="chinese" && (()=>{
                  const ai=ANIMAL_INFO[res.cn.animal]||{};
                  const ei=CN_EL_INFO[res.cn.element]||{};
                  const pi=POLARITY_INFO[res.cn.polarity]||{};
                  return (
                  <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
                    <Card style={{ background:`linear-gradient(135deg,${M3.primaryContainer}88,${M3.surfaceContainer})`, borderColor:M3.outline }}>
                      <div style={{ fontFamily:"Cinzel,serif", fontSize:"1rem", color:M3.primary, marginBottom:8 }}>Chinese Astrology — The Sexagenary Cycle</div>
                      <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.82rem", lineHeight:1.65, color:M3.onSurface, margin:0 }}>
                        Chinese astrology is based on a 60-year cycle (sexagenary cycle) combining 12 animals, 5 elements (Wood, Fire, Earth, Metal, Water), and Yin/Yang polarity. Unlike Western astrology which maps the sky at birth, the Chinese system uses the lunar calendar year, making your animal and element fixed by the year you were born (adjusted for the Chinese New Year date). Each combination creates a unique character archetype that repeats every 60 years.
                      </p>
                      <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.82rem", lineHeight:1.65, color:M3.onSurface, marginTop:8 }}>
                        <strong>How to read it:</strong> Your <strong>animal</strong> defines your core personality style. Your <strong>element</strong> colors how that animal expresses — a Water Dragon is very different from a Fire Dragon. <strong>Yin/Yang</strong> indicates whether your energy is more receptive or assertive. The <strong>trigram</strong> associated with your animal connects you to the I Ching (Book of Changes) and its archetypal wisdom.
                      </p>
                    </Card>
                    <Card title={`☯ Year of the ${res.cn.animal} — ${res.cn.element} ${res.cn.polarity}`}>
                      <div style={{ textAlign:"center", marginBottom:16 }}>
                        <div style={{ fontSize:"4rem", lineHeight:1 }}>{ai.emoji||"☯"}</div>
                        <div style={{ fontSize:"2.4rem", color:M3.primary, marginTop:4 }}>{res.cn.stem}{res.cn.branch}</div>
                        <div style={{ fontSize:"1rem", color:M3.secondary, marginTop:2, fontFamily:"'EB Garamond',Georgia,serif", fontStyle:"italic" }}>
                          {res.cn.stemPinyin}-{res.cn.branchPinyin}
                        </div>
                        {res.cn.lunar && (
                          <div style={{ marginTop:8, padding:"6px 18px", borderRadius:20, background:M3.surfaceVariant+"66", display:"inline-block" }}>
                            <span style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.76rem", color:M3.primary, fontWeight:"700" }}>
                              Day {res.cn.lunar.day}, {res.cn.lunar.monthName} Month
                            </span>
                            <span style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.68rem", color:M3.onSurfaceVariant, marginLeft:8 }}>
                              (Chinese lunar calendar)
                            </span>
                          </div>
                        )}
                        <div style={{ marginTop:8, display:"flex", justifyContent:"center", gap:8, flexWrap:"wrap" }}>
                          <span style={{ padding:"4px 14px", borderRadius:20, background:ei.color+"22", border:`1px solid ${ei.color}66`, color:ei.color, fontFamily:"'Share Tech Mono',monospace", fontSize:"0.72rem", fontWeight:"700" }}>{res.cn.element}</span>
                          <span style={{ padding:"4px 14px", borderRadius:20, background:M3.primaryContainer, color:M3.onPrimaryContainer, fontFamily:"'Share Tech Mono',monospace", fontSize:"0.72rem" }}>{pi.label}</span>
                        </div>
                        <div style={{ color:M3.onSurfaceVariant, fontFamily:"'Share Tech Mono',monospace", fontSize:"0.65rem", marginTop:6 }}>
                          Position {res.cn.cycle60} of 60 in the Sexagenary Cycle (a 60-year grand cycle that combines the 12 animals with the 5 elements)
                        </div>
                        {res.cn.effectiveYear && res.cn.effectiveYear !== A.year && (
                          <div style={{ color:M3.tertiary, fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.7rem", fontStyle:"italic", marginTop:6 }}>
                            Note: You were born on {A.month}/{A.day}/{A.year}, before Chinese New Year began that year, so your Chinese year is {res.cn.effectiveYear} rather than {A.year}.
                          </div>
                        )}
                      </div>
                    </Card>

                    <Card title="☯ Your Position on the Wheel">
                      <div style={{ display:"flex", justifyContent:"center" }}>
                        <ChineseWheelWithTooltip cn={res.cn} size={Math.min(420, window.innerWidth-80)}/>
                      </div>
                    </Card>

                    <Card title={`${ai.emoji} The ${res.cn.animal} — "${ai.archetype}"`}>
                      <div style={{ display:"flex", gap:10, flexWrap:"wrap", marginBottom:12 }}>
                        {(ai.trait||"").split(", ").map(t=>(
                          <span key={t} style={{ padding:"3px 12px", borderRadius:16, background:M3.primaryContainer, color:M3.onPrimaryContainer, fontFamily:"'Share Tech Mono',monospace", fontSize:"0.66rem" }}>{t}</span>
                        ))}
                      </div>
                      <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.82rem", lineHeight:1.7, color:M3.onSurface, margin:0 }}>{ai.desc}</p>
                      {ai.shadow && (
                        <div style={{ marginTop:12, padding:"10px 14px", borderRadius:10, background:"#ff525211", border:"1px solid #ff525233" }}>
                          <span style={{ color:"#ff8a80", fontFamily:"'Share Tech Mono',monospace", fontSize:"0.66rem", fontWeight:"700" }}>SHADOW SIDE: </span>
                          <span style={{ color:M3.onSurfaceVariant, fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.76rem" }}>{ai.shadow}</span>
                        </div>
                      )}
                    </Card>

                    <div style={grid2}>
                      <Card title={`☯ Your Element: ${res.cn.element}`}>
                        <div style={{ textAlign:"center", marginBottom:10 }}>
                          <div style={{ width:56, height:56, borderRadius:"50%", background:ei.color+"22", border:`2px solid ${ei.color}`, display:"inline-flex", alignItems:"center", justifyContent:"center" }}>
                            <span style={{ color:ei.color, fontFamily:"'Share Tech Mono',monospace", fontSize:"1.4rem", fontWeight:"700" }}>{res.cn.element[0]}</span>
                          </div>
                        </div>
                        <div style={{ textAlign:"center", color:ei.color, fontFamily:"'Share Tech Mono',monospace", fontSize:"0.72rem", fontWeight:"700", marginBottom:8 }}>{ei.trait}</div>
                        <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.78rem", lineHeight:1.65, color:M3.onSurface, margin:0 }}>{ei.desc}</p>
                        {(()=>{
                          const elBal = {
                            Wood: { balanced:"When Wood is balanced, you grow steadily, set healthy boundaries, and channel anger into constructive change. You're flexible but rooted — bending without breaking.", imbalanced:"When Wood is out of balance, you may become rigid, controlling, or chronically frustrated. Stagnant Wood energy shows as resentment, indecision, or an inability to start things.", cultivate:"Spend time in nature. Begin new creative projects. Practice forgiveness. Physical movement — especially stretching, yoga, or martial arts — unblocks Wood energy." },
                            Fire:  { balanced:"When Fire is balanced, you radiate warmth, joy, and inspiration. You connect easily with others and your enthusiasm is contagious without being overwhelming.", imbalanced:"When Fire is out of balance, you may become anxious, scattered, or burn out from overcommitting. Excess Fire shows as mania, restlessness, or attention-seeking; depleted Fire shows as depression, apathy, or inability to feel joy.", cultivate:"Practice presence and mindfulness. Laugh freely. Nurture close relationships. When depleted, seek community and creative expression. When excessive, practice stillness and listening." },
                            Earth: { balanced:"When Earth is balanced, you feel grounded, generous, and nourishing — both to yourself and others. You digest experiences well and know what you need.", imbalanced:"When Earth is out of balance, you may become a chronic worrier, overly self-sacrificing, or stuck in cycles of overthinking. You might nurture everyone else while neglecting yourself, or become possessive and clingy.", cultivate:"Eat mindfully. Spend time cooking, gardening, or working with your hands. Practice receiving as much as giving. Set boundaries around caretaking." },
                            Metal: { balanced:"When Metal is balanced, you have clarity, integrity, and the ability to let go of what no longer serves you. You appreciate beauty and hold high standards without being rigid.", imbalanced:"When Metal is out of balance, you may become perfectionistic, grief-stricken, or emotionally cold. You might hold onto things — possessions, grudges, the past — long after they've served their purpose.", cultivate:"Practice decluttering — physical spaces and emotional baggage. Breathe deeply. Engage with art, music, or ritual. Allow yourself to grieve fully and then release." },
                            Water: { balanced:"When Water is balanced, you possess deep wisdom, adaptability, and courage that comes from understanding rather than force. You trust your intuition and move through life with flow.", imbalanced:"When Water is out of balance, you may become paralysed by fear, isolated, or emotionally frozen. You might hide your true self, hoard resources, or lose your willpower entirely.", cultivate:"Rest more — Water needs stillness to replenish. Meditate near water. Journal your fears honestly. Build trust slowly through consistent small actions. Listen to your body's need for quiet." },
                          };
                          const eb = elBal[res.cn.element];
                          return eb ? (
                            <div style={{ marginTop:14 }}>
                              <div style={{ padding:"10px 14px", borderRadius:10, background:"#69ff8e08", border:"1px solid #69ff8e18", marginBottom:8 }}>
                                <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.6rem", color:"#69ff8e", letterSpacing:"0.1em", marginBottom:4 }}>WHEN BALANCED</div>
                                <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.74rem", lineHeight:1.55, color:M3.onSurface, margin:0 }}>{eb.balanced}</p>
                              </div>
                              <div style={{ padding:"10px 14px", borderRadius:10, background:"#ff525208", border:"1px solid #ff525218", marginBottom:8 }}>
                                <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.6rem", color:"#ff8a50", letterSpacing:"0.1em", marginBottom:4 }}>WHEN OUT OF BALANCE</div>
                                <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.74rem", lineHeight:1.55, color:M3.onSurface, margin:0 }}>{eb.imbalanced}</p>
                              </div>
                              <div style={{ padding:"10px 14px", borderRadius:10, background:ei.color+"08", border:`1px solid ${ei.color}18` }}>
                                <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.6rem", color:ei.color, letterSpacing:"0.1em", marginBottom:4 }}>HOW TO CULTIVATE HEALTHY {res.cn.element.toUpperCase()}</div>
                                <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.74rem", lineHeight:1.55, color:M3.onSurface, margin:0 }}>{eb.cultivate}</p>
                              </div>
                            </div>
                          ) : null;
                        })()}
                      </Card>

                      <Card title={`${pi.symbol} Energy: ${pi.label}`}>
                        <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.78rem", lineHeight:1.65, color:M3.onSurface, margin:0 }}>{pi.desc}</p>
                        <div style={{ marginTop:14, padding:"10px 14px", borderRadius:10, background:M3.surfaceDim }}>
                          <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.66rem", color:M3.secondary, marginBottom:4 }}>COMBINED READING</div>
                          <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.76rem", lineHeight:1.6, color:M3.onSurface, margin:0 }}>
                            As a <strong style={{color:ei.color}}>{res.cn.element}</strong> <strong style={{color:M3.primary}}>{res.cn.animal}</strong> in a <strong>{res.cn.polarity}</strong> year, your {res.cn.element.toLowerCase()} nature expresses through the {res.cn.animal.toLowerCase()}'s {(ai.trait||"").split(", ")[0]?.toLowerCase()} quality with {res.cn.polarity==="Yang"?"an outward, assertive energy — you act on your instincts and lead with confidence":"an inward, reflective energy — you build power through patience and observation"}.
                          </p>
                        </div>
                        <div style={{ marginTop:14, padding:"12px 16px", borderRadius:12, background:M3.primaryContainer+"44", border:`1px solid ${M3.outline}33` }}>
                          <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.64rem", color:M3.primary, letterSpacing:"0.1em", marginBottom:6 }}>YIN/YANG INTEGRATION — WHAT TO CULTIVATE</div>
                          {res.cn.polarity==="Yang" ? (
                            <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.76rem", lineHeight:1.6, color:M3.onSurface, margin:0 }}>
                              As a Yang-natured person, your default is action, assertion, and outward expression. You lead with confidence and initiative. <strong>Your growth edge is cultivating Yin qualities</strong>: patience, receptivity, listening, and stillness. The strongest Yang people are those who can also be deeply still — who act from calm center rather than restless impulse. Practice: before making decisions, pause. Before speaking, listen. Before doing, feel. Your Yang power becomes unstoppable when it's rooted in Yin wisdom.
                            </p>
                          ) : (
                            <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.76rem", lineHeight:1.6, color:M3.onSurface, margin:0 }}>
                              As a Yin-natured person, your default is reflection, receptivity, and inner processing. You build power quietly and perceive what others miss. <strong>Your growth edge is cultivating Yang qualities</strong>: decisive action, visible self-expression, and the willingness to be seen. The strongest Yin people are those who can also act boldly — who move from deep knowing into clear action. Practice: share your insights before they're perfect. Take the first step before you feel ready. Let your depth be visible. Your Yin wisdom becomes transformative when it's paired with Yang courage.
                            </p>
                          )}
                        </div>
                      </Card>
                    </div>

                    <Card title="♡ Compatibility">
                      <div style={grid2}>
                        <div>
                          <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.66rem", color:"#69ff8e", letterSpacing:"0.1em", marginBottom:8 }}>BEST ALLIES</div>
                          {(ai.compat||[]).map(a=>{
                            const inf=ANIMAL_INFO[a]||{};
                            return (
                              <div key={a} style={{ display:"flex", alignItems:"center", gap:8, padding:"6px 0", borderBottom:`1px solid ${M3.outlineVariant}22` }}>
                                <span style={{ fontSize:"1.2rem" }}>{inf.emoji}</span>
                                <div>
                                  <div style={{ color:M3.onSurface, fontFamily:"'Share Tech Mono',monospace", fontSize:"0.72rem", fontWeight:"700" }}>{a}</div>
                                  <div style={{ color:M3.onSurfaceVariant, fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.66rem", fontStyle:"italic" }}>{inf.trait}</div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                        <div>
                          <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.66rem", color:"#ff5252", letterSpacing:"0.1em", marginBottom:8 }}>CHALLENGING MATCHES</div>
                          {(ai.clash||[]).map(a=>{
                            const inf=ANIMAL_INFO[a]||{};
                            return (
                              <div key={a} style={{ display:"flex", alignItems:"center", gap:8, padding:"6px 0", borderBottom:`1px solid ${M3.outlineVariant}22` }}>
                                <span style={{ fontSize:"1.2rem" }}>{inf.emoji}</span>
                                <div>
                                  <div style={{ color:M3.onSurface, fontFamily:"'Share Tech Mono',monospace", fontSize:"0.72rem", fontWeight:"700" }}>{a}</div>
                                  <div style={{ color:M3.onSurfaceVariant, fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.66rem", fontStyle:"italic" }}>{inf.trait}</div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </Card>

                    <Card title="☯ Five Elements (Wu Xing) — The Cycle of Creation & Control">
                      <div style={{ display:"flex", flexWrap:"wrap", gap:8, justifyContent:"center", marginBottom:14 }}>
                        {Object.entries(CN_EL_INFO).map(([el,inf])=>{
                          const active=res.cn.element===el;
                          return (
                            <div key={el} style={{ padding:"7px 16px", borderRadius:20,
                              background:active?inf.color+"33":"transparent",
                              border:`1px solid ${inf.color}${active?"bb":"33"}`,
                              color:active?inf.color:M3.onSurfaceVariant,
                              fontFamily:"'Share Tech Mono', monospace", fontSize:"0.73rem",
                              fontWeight:active?"700":"400" }}>{el}</div>
                          );
                        })}
                      </div>
                      <div style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.76rem", lineHeight:1.6, color:M3.onSurfaceVariant, textAlign:"center" }}>
                        Wood feeds Fire · Fire creates Earth (ash) · Earth yields Metal (ore) · Metal carries Water (condensation) · Water nourishes Wood
                      </div>
                      <div style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.72rem", lineHeight:1.6, color:M3.outlineVariant, textAlign:"center", marginTop:4, fontStyle:"italic" }}>
                        Wood parts Earth · Earth dams Water · Water quenches Fire · Fire melts Metal · Metal cuts Wood
                      </div>
                    </Card>

                    <Card title="☯ The 12 Animals — Full Cycle">
                      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"2px 14px" }}>
                        {Array.from({length:12},(_,i)=>{
                          const yr=A.year - ((A.year-1924)%12) + i;
                          const cc=chineseCycle(yr);
                          const inf=ANIMAL_INFO[cc.animal]||{};
                          const isYou=cc.animal===res.cn.animal;
                          return (
                            <div key={i} style={{ padding:"5px 8px", borderRadius:8,
                              background:isYou?M3.primaryContainer+"44":"transparent",
                              display:"flex", alignItems:"center", gap:6,
                              fontFamily:"'Share Tech Mono', monospace", fontSize:"0.68rem",
                              color:isYou?M3.tertiary:M3.onSurfaceVariant }}>
                              <span style={{ fontSize:"0.9rem" }}>{inf.emoji}</span>
                              <span style={{ minWidth:24 }}>{yr}</span>
                              <span style={{ fontWeight:isYou?"700":"400" }}>{cc.animal}</span>
                              <span style={{ marginLeft:"auto", fontSize:"0.6rem", color:M3.outlineVariant }}>{inf.archetype}</span>
                            </div>
                          );
                        })}
                      </div>
                    </Card>
                  </div>
                  );
                })()}

                {false && tab==="phi" && (
                  <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
                    <Card style={{ background:`linear-gradient(135deg,${M3.primaryContainer}88,${M3.surfaceContainer})`, borderColor:M3.outline }}>
                      <div style={{ fontFamily:"Cinzel,serif", fontSize:"1rem", color:M3.primary, marginBottom:8 }}>Elements, Modality & Phi Rhythm</div>
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
                      <div style={{ display:"flex", flexDirection:"column", gap:6,
                        fontFamily:"'Share Tech Mono', monospace", fontSize:"0.72rem" }}>
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
                )}

                {tab==="numerology" && (
                  <NumerologyTab ctx={{ M3, birthParts: A, res, Card }} />
                )}
                {tab==="grammatology" && (
                  <GrammatologyTab
                    ctx={{
                      M3, gramTab, setGramTab, LETTER_DB, WRITING_SYSTEM_TYPES, EGYPTIAN_UNILITERALS,
                      OGHAM_FULL, IPA_QUICK, DIGRAPH_MAP, ACROPHONY_SHIFTS, ZODIAC_CHINESE_MAP,
                      CHINESE_ZODIAC_HEBREW, MUSICAL_SCALE_OCCULT, planetToLetter,
                      grid2, cwInput, setCwInput, cwResult, setCwResult, analyzeWord,
                      res, P_COL, P_SYM, SIGN_COL, SIGN_SYM, SIGN_INFO, EL_COL,
                      gramScriptFilter, setGramScriptFilter, expandedLetter, setExpandedLetter,
                      KANGXI_INFO, KANGXI_RADICALS, KANGXI_TOP_10_BY_FREQUENCY, KANGXI_MOST_USED, KANGXI_STANDALONE,
                      Card,
                    }}
                  />
                )}

                {false && tab==="numerology-old" && (()=>{
                  const nuData = computeNumerology(A.year, A.month, A.day, A.name||"");
                  const hasName = nuData.letterBreakdown.length > 0;
                  const lp = LIFE_PATH_MEANING[nuData.lifePath] || LIFE_PATH_MEANING[reduceToRoot(nuData.lifePath)] || {};
                  return (
                  <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
                    <Card style={{ background:`linear-gradient(135deg,${M3.primaryContainer}88,${M3.surfaceContainer})`, borderColor:M3.outline }}>
                      <div style={{ fontFamily:"Cinzel,serif", fontSize:"1.1rem", color:M3.primary, marginBottom:8 }}>Numerology — The Mathematics of Identity</div>
                      <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.82rem", lineHeight:1.7, color:M3.onSurface, margin:0 }}>
                        Numerology is the ancient study of numbers as carriers of meaning. Every date, every name, every letter has a numerical vibration. This section calculates your core numerological profile from your birth date and name, maps your name through Hebrew gematria, and identifies which mathematical sequences resonate with your birth day. Two systems are shown: <strong>Pythagorean</strong> (the Western standard, 1-9 cycle) and <strong>Chaldean</strong> (the older Babylonian system with irregular mappings considered more mystically accurate by some traditions).
                      </p>
                    </Card>

                    {/* ── Core Numbers ── */}
                    <Card title="Your Core Numbers — The Numerological Blueprint">
                      <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.76rem", lineHeight:1.6, color:M3.onSurfaceVariant, margin:"0 0 14px" }}>
                        Five core numbers form the foundation of your numerological identity. Each is derived differently and reveals a different dimension of who you are.
                      </p>
                      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(140px,1fr))", gap:10 }}>
                        {[
                          { label:"Life Path", val:nuData.lifePath, color:M3.primary, tip:"Derived from your full birth date. The most important number — your life's purpose and the lessons you're here to learn.", needsName:false },
                          { label:"Birthday", val:nuData.birthday, color:"#ffa726", tip:"Simply your birth day reduced. A special talent or gift you carry that colours everything else.", needsName:false },
                          { label:"Personal Year", val:nuData.personalYear, color:"#69ff8e", tip:"Your current annual cycle theme — what this year is asking of you.", needsName:false },
                          { label:"Expression", val:nuData.expression, color:M3.tertiary, tip:"Derived from all letters of your full name. How you naturally express yourself and what talents you carry.", needsName:true },
                          { label:"Soul Urge", val:nuData.soulUrge, color:"#ce93d8", tip:"Derived from the vowels in your name. Your deepest inner desire — what your heart truly wants.", needsName:true },
                          { label:"Personality", val:nuData.personality, color:"#4fc3f7", tip:"Derived from the consonants in your name. How the outside world perceives you — your social mask.", needsName:true },
                          { label:"Maturity", val:nuData.maturity, color:M3.secondary, tip:"Life Path + Expression. The person you are becoming in the second half of life.", needsName:true },
                          { label:"Chaldean Expr.", val:nuData.chaldeanExpr, color:"#ff5252", tip:"Babylonian system — older and considered by some to be more vibrationally accurate.", needsName:true },
                        ].map(c=>(
                          <div key={c.label} style={{ padding:"14px", borderRadius:12, background:c.color+"11", border:`1px solid ${c.color}33`, textAlign:"center", opacity: c.needsName && !hasName ? 0.4 : 1 }}>
                            <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.58rem", color:c.color, letterSpacing:"0.1em", marginBottom:6 }}>{c.label.toUpperCase()}</div>
                            <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"2.2rem", color:c.color, fontWeight:"700", lineHeight:1 }}>
                              {c.needsName && !hasName ? "—" : <>{c.val}{MASTER_NUMBERS.has(c.val) ? <span style={{fontSize:"0.6rem",verticalAlign:"super",color:"#ffd54f"}}> M</span> : ""}</>}
                            </div>
                            <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.6rem", color:M3.onSurfaceVariant, marginTop:4 }}>
                              {c.needsName && !hasName ? "enter name above" : NUM_PLANET[c.val] ? `${P_SYM[NUM_PLANET[c.val]]||""} ${NUM_PLANET[c.val]}` : ""}
                            </div>
                            <div style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.58rem", color:M3.onSurfaceVariant, marginTop:6, fontStyle:"italic", lineHeight:1.4 }}>{c.tip}</div>
                          </div>
                        ))}
                      </div>
                    </Card>

                    {/* ── Life Path Deep Dive ── */}
                    <Card title={`Life Path ${nuData.lifePath} — ${lp.title||"Your Path"}`}>
                      {lp.archetype && <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.68rem", color:M3.tertiary, letterSpacing:"0.08em", marginBottom:8 }}>{lp.archetype}</div>}
                      <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.82rem", lineHeight:1.7, color:M3.onSurface, margin:"0 0 12px" }}>{lp.desc||"Your life path carries a unique vibration and purpose."}</p>
                      {lp.shadow && (
                        <div style={{ padding:"10px 14px", borderRadius:10, background:"#ff525211", border:"1px solid #ff525222", marginBottom:10 }}>
                          <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.62rem", color:"#ff5252", letterSpacing:"0.08em", marginBottom:4 }}>SHADOW SIDE</div>
                          <div style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.76rem", color:M3.onSurface, lineHeight:1.5 }}>{lp.shadow}</div>
                        </div>
                      )}
                      {lp.growth && (
                        <div style={{ padding:"10px 14px", borderRadius:10, background:"#69ff8e11", border:"1px solid #69ff8e22" }}>
                          <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.62rem", color:"#69ff8e", letterSpacing:"0.08em", marginBottom:4 }}>GROWTH PATH</div>
                          <div style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.76rem", color:M3.onSurface, lineHeight:1.5 }}>{lp.growth}</div>
                        </div>
                      )}
                    </Card>

                    {/* ── Core Number Meanings ── */}
                    <Card title="What Each Number Means for You">
                      <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                        {[
                          ...(hasName ? [
                            { label:"Expression", num:nuData.expression, meaning:EXPRESSION_MEANING[nuData.expression]||"" },
                            { label:"Soul Urge", num:nuData.soulUrge, meaning:SOUL_URGE_MEANING[nuData.soulUrge]||"" },
                            { label:"Personality", num:nuData.personality, meaning:PERSONALITY_MEANING[nuData.personality]||"" },
                          ] : []),
                          { label:"Birthday", num:nuData.birthday, meaning:BIRTHDAY_MEANING[nuData.birthday]||"" },
                        ].map(r=>(
                          <div key={r.label} style={{ padding:"10px 14px", borderRadius:10, background:M3.surfaceVariant+"44", border:`1px solid ${M3.outlineVariant}` }}>
                            <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:4 }}>
                              <span style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.62rem", color:M3.secondary, letterSpacing:"0.08em" }}>{r.label.toUpperCase()}</span>
                              <span style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"1rem", color:M3.tertiary, fontWeight:"700" }}>{r.num}</span>
                            </div>
                            <div style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.78rem", color:M3.onSurface, lineHeight:1.55 }}>You are a {r.meaning}</div>
                          </div>
                        ))}
                      </div>
                    </Card>

                    {/* ── Name Letter Breakdown ── */}
                    {hasName && (
                    <Card title="Name Letter Breakdown — Pythagorean & Chaldean Values">
                      <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.76rem", lineHeight:1.6, color:M3.onSurfaceVariant, margin:"0 0 10px" }}>
                        Each letter of your name carries a number. Vowels (highlighted) drive your Soul Urge; consonants shape your Personality. Together they form your Expression number.
                      </p>
                      <div style={{ display:"flex", flexWrap:"wrap", gap:4, marginBottom:12 }}>
                        {nuData.letterBreakdown.map((l,i)=>(
                          <div key={i} style={{ padding:"5px 8px", borderRadius:8, minWidth:36, textAlign:"center",
                            background:l.isVowel ? M3.primaryContainer+"44" : M3.surfaceVariant,
                            border:`1px solid ${l.isVowel ? M3.primary+"44" : M3.outlineVariant}` }}>
                            <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"1rem", color:l.isVowel ? M3.primary : M3.onSurface, fontWeight:"700" }}>{l.ch}</div>
                            <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.58rem", color:M3.tertiary }}>P:{l.pythagorean}</div>
                            <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.58rem", color:"#ff8a50" }}>C:{l.chaldean}</div>
                            <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.48rem", color:l.isVowel ? M3.primary : M3.onSurfaceVariant, marginTop:2 }}>{l.isVowel ? "vowel" : "cons."}</div>
                          </div>
                        ))}
                      </div>
                      <div style={{ display:"flex", gap:10, flexWrap:"wrap", fontFamily:"'Share Tech Mono',monospace", fontSize:"0.68rem" }}>
                        <span style={{ color:M3.onSurface }}>Expression sum: <strong>{nuData.exprSum}</strong> → <strong>{nuData.expression}</strong></span>
                        <span style={{ color:"#ce93d8" }}>Soul (vowels): <strong>{nuData.soulSum}</strong> → <strong>{nuData.soulUrge}</strong></span>
                        <span style={{ color:"#4fc3f7" }}>Personality (cons.): <strong>{nuData.persSum}</strong> → <strong>{nuData.personality}</strong></span>
                        <span style={{ color:"#ff8a50" }}>Chaldean: <strong>{nuData.chaldExprSum}</strong> → <strong>{nuData.chaldeanExpr}</strong></span>
                      </div>
                    </Card>
                    )}

                    {/* ── Missing Numbers ── */}
                    {hasName && nuData.missingNums.length > 0 && (
                    <Card title="Karmic Lessons — Missing Numbers in Your Name">
                      <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.76rem", lineHeight:1.6, color:M3.onSurfaceVariant, margin:"0 0 10px" }}>
                        Numbers absent from your name's letter values indicate lessons your soul chose to learn through experience rather than innate talent. These aren't weaknesses — they're growth edges.
                      </p>
                      <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
                        {nuData.missingNums.map(n=>(
                          <div key={n} style={{ padding:"8px 14px", borderRadius:10, background:"#ff525211", border:"1px solid #ff525222", textAlign:"center" }}>
                            <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"1.4rem", color:"#ff5252", fontWeight:"700" }}>{n}</div>
                            <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.58rem", color:M3.onSurfaceVariant }}>{NUM_PLANET[n]||""}</div>
                          </div>
                        ))}
                      </div>
                    </Card>
                    )}

                    {/* ── Pinnacles & Challenges ── */}
                    <Card title="Life Pinnacles & Challenges — Your Four Seasons">
                      <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.76rem", lineHeight:1.6, color:M3.onSurfaceVariant, margin:"0 0 12px" }}>
                        Your life unfolds in four major phases, each with a <strong>pinnacle</strong> (opportunity/theme) and a <strong>challenge</strong> (lesson/obstacle). Together they map the arc of your growth across decades.
                      </p>
                      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
                        {["First (youth)","Second (early adult)","Third (maturity)","Fourth (wisdom)"].map((phase,i)=>(
                          <div key={i} style={{ padding:"10px 12px", borderRadius:10, background:M3.surfaceVariant+"44", border:`1px solid ${M3.outlineVariant}` }}>
                            <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.58rem", color:M3.secondary, letterSpacing:"0.08em", marginBottom:6 }}>{phase.toUpperCase()}</div>
                            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                              <div style={{ textAlign:"center" }}>
                                <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.52rem", color:"#69ff8e" }}>PINNACLE</div>
                                <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"1.4rem", color:"#69ff8e", fontWeight:"700" }}>{nuData.pinnacles[i]}</div>
                              </div>
                              <div style={{ textAlign:"center" }}>
                                <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.52rem", color:"#ff5252" }}>CHALLENGE</div>
                                <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"1.4rem", color:"#ff5252", fontWeight:"700" }}>{nuData.challenges[i]}</div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </Card>

                    {/* ── Hebrew Gematria Calculator ── */}
                    <Card title="Hebrew Gematria Calculator — The Number in a Name">
                      <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.76rem", lineHeight:1.6, color:M3.onSurfaceVariant, margin:"0 0 14px" }}>
                        Each Hebrew letter carries a numerical value. Type any name or word in English and it will be phonetically transliterated to Hebrew — digraphs like SH, CH, TH are handled as single Hebrew letters. You can also type Hebrew directly. Medial vowels are dimmed since Hebrew is primarily consonantal.
                      </p>
                      <input type="text" value={gemaName} onChange={e=>setGemaName(e.target.value)}
                        placeholder="English name, Hebrew (אברהם), or phrase..."
                        style={{ width:"100%", padding:"10px 14px", background:M3.surfaceDim, border:`1px solid ${M3.outline}`, borderRadius:10,
                          color:M3.onSurface, fontFamily:"'Share Tech Mono',monospace", fontSize:"0.82rem", outline:"none", boxSizing:"border-box" }}/>
                      {gemaName.trim() && (()=>{
                        const g = calcGematria(gemaName);
                        return (
                          <div style={{ marginTop:14 }}>
                            <div style={{ marginBottom:14, padding:"10px 16px", borderRadius:10, background:M3.primaryContainer+"33", border:`1px solid ${M3.primary}22` }}>
                              {g.isHebrew ? (
                                <>
                                  <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.6rem", color:M3.secondary, letterSpacing:"0.1em", marginBottom:6 }}>HEBREW INPUT</div>
                                  <div style={{ fontSize:"1.8rem", color:M3.primary, fontFamily:"serif", letterSpacing:"0.05em", direction:"rtl", textAlign:"center" }}>{g.hebrewStr}</div>
                                </>
                              ) : g.hasKnown && g.knownStr ? (
                                <>
                                  <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.6rem", color:"#69ff8e", letterSpacing:"0.1em", marginBottom:6 }}>ESTABLISHED HEBREW SPELLING</div>
                                  <div style={{ fontSize:"1.8rem", color:M3.primary, fontFamily:"serif", letterSpacing:"0.05em", direction:"rtl", textAlign:"center" }}>{g.knownStr}</div>
                                  {g.knownTotal !== null && (
                                    <div style={{ textAlign:"center", marginTop:4 }}>
                                      <span style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.65rem", color:"#69ff8e" }}>Traditional gematria: {g.knownTotal}</span>
                                    </div>
                                  )}
                                  <div style={{ marginTop:8, padding:"8px 12px", borderRadius:8, background:M3.surfaceDim }}>
                                    <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.55rem", color:M3.onSurfaceVariant, letterSpacing:"0.1em", marginBottom:4 }}>PHONETIC TRANSLITERATION (for comparison)</div>
                                    <div style={{ fontSize:"1.1rem", color:M3.onSurfaceVariant, fontFamily:"serif", direction:"rtl", textAlign:"center", opacity:0.6 }}>
                                      {g.transHebrewStr}
                                      <span style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.6rem", marginLeft:8 }}>= {g.transTotal}</span>
                                    </div>
                                  </div>
                                </>
                              ) : (
                                <>
                                  <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.6rem", color:M3.secondary, letterSpacing:"0.1em", marginBottom:6 }}>PHONETIC TRANSLITERATION (CONSONANTAL)</div>
                                  <div style={{ fontSize:"1.8rem", color:M3.primary, fontFamily:"serif", letterSpacing:"0.05em", direction:"rtl", textAlign:"center" }}>{g.hebrewStr}</div>
                                  {g.fullHebrewStr !== g.hebrewStr && (
                                    <div style={{ marginTop:4, textAlign:"center" }}>
                                      <span style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.55rem", color:M3.onSurfaceVariant }}>with vowels: </span>
                                      <span style={{ fontSize:"1rem", color:M3.onSurfaceVariant, fontFamily:"serif", direction:"rtl", opacity:0.5 }}>{g.fullHebrewStr}</span>
                                      {g.fullTotal !== g.total && <span style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.6rem", color:M3.onSurfaceVariant, marginLeft:8 }}>= {g.fullTotal}</span>}
                                    </div>
                                  )}
                                </>
                              )}
                              {!g.isHebrew && g.hasAlt && g.altHebrewStr && !g.hasKnown && (
                                <div style={{ marginTop:6 }}>
                                  <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.58rem", color:M3.outlineVariant }}>
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

                {tab==="calendar" && (
                  <CalendarTab ctx={{ M3, calDate, setCalDate, calHolFilter, setCalHolFilter, calShowMonth, setCalShowMonth, Card }} />
                )}
                {tab==="education" && (
                  <EducationTab ctx={{ M3, EL_COL, MOD_COL, Card }} />
                )}

              </TabContent>
            </>
          )}
        </div>
        <Footer />
      </div>
    </div>
  );
}