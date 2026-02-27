import { useRef, useEffect } from 'react';
import { useAnime } from '../../hooks/useAnime.js';
import { M3 } from '../../theme/m3.js';
import { norm } from '../../utils/helpers.js';
import { SIGNS, SIGN_COL } from '../../data/astrology/signs.js';
import { P_SYM, P_COL, P_ROLE } from '../../data/astrology/planets.js';
import { ayanamsa, planetSpeeds } from '../../engines/astronomy.js';
import { hermeticPlanetToLetter, planetToLetter, signToLetter } from '../../data/grammatology/yetzirah.js';

const zodSign = lon => SIGNS[Math.floor(((lon%360+360)%360)/30)];
const zodDeg = lon => (((lon%360+360)%360)%30).toFixed(1);

function Glyphs({ letter, title }) {
  if (!letter) return <span style={{ opacity: 0.35 }}>—</span>;
  return (
    <span title={title || `${letter.hebrewName} (${letter.acrophony})`}
      style={{ letterSpacing: 2 }}>
      {letter.hiero} {letter.hebrew} {letter.phoenician}
    </span>
  );
}

export default function PlanetTable({ positions, jd = null, siderealPositions = null }) {
  const speeds = jd ? planetSpeeds(jd) : null;
  const anime  = useAnime();
  const tRef   = useRef(null);
  const ay     = ayanamsa(jd ?? 2451545);
  useEffect(()=>{
    if (!anime||!tRef.current) return;
    anime({ targets:tRef.current.querySelectorAll("tbody tr"),
      opacity:[0,1], translateX:[-10,0], delay:anime.stagger(35), duration:380, easing:"easeOutQuad" });
  }, [positions, anime]);

  const TH = { padding:"4px 6px", textAlign:"left", color:M3.secondary,
    fontFamily:"'Share Tech Mono', monospace", fontSize:"0.58rem",
    letterSpacing:"0.06em", borderBottom:`1px solid ${M3.outlineVariant}`, whiteSpace:"nowrap" };
  const TD = { padding:"3px 6px", fontFamily:"'Share Tech Mono', monospace", fontSize:"0.7rem", color:M3.onSurface };
  const SC = { ...TD, fontSize:"0.78rem", letterSpacing:2 };

  return (
    <div ref={tRef} style={{ overflowX:"auto" }}>
      <table style={{ width:"100%", borderCollapse:"collapse" }}>
        <thead>
          <tr>
            <th colSpan={3} style={{ ...TH, textAlign:"center", borderRight:`1px solid ${M3.outlineVariant}33` }}>Planet</th>
            <th colSpan={2} style={{ ...TH, textAlign:"center", color:M3.tertiary, borderRight:`1px solid ${M3.outlineVariant}33` }}>
              Planet Script
            </th>
            <th colSpan={4} style={{ ...TH, textAlign:"center", borderRight:`1px solid ${M3.outlineVariant}33` }}>Western (Tropical)</th>
            <th colSpan={3} style={{ ...TH, textAlign:"center" }}>Vedic (Sidereal)</th>
          </tr>
          <tr>
            {[" ","Name","Governs"].map(h=><th key={h} style={{...TH, borderRight: h==="Governs" ? `1px solid ${M3.outlineVariant}33` : "none"}}>{h}</th>)}
            <th style={{...TH, color:"#ce93d8"}} title="Tradition 1: The Hermetic Tradition — primary Tarot correspondence">Hermetic</th>
            <th style={{...TH, color:"#80cbc4", borderRight:`1px solid ${M3.outlineVariant}33`}} title="Tradition 2: Sefer Yetzirah planetary attribution">Yetzirah</th>
            <th style={TH}>Sign</th>
            <th style={TH} title="Zodiac sign script correspondence">Sign Script</th>
            <th style={TH}>Pos.</th>
            <th style={{...TH, borderRight:`1px solid ${M3.outlineVariant}33`}}>℞</th>
            <th style={TH}>Sign</th>
            <th style={TH} title="Vedic zodiac sign script correspondence">Sign Script</th>
            <th style={TH}>Pos.</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(positions).map(([p, lon]) => {
            const sid = siderealPositions?.[p] ?? norm(lon - ay);
            const wSign = zodSign(lon);
            const vSign = zodSign(sid);
            const hermetic = hermeticPlanetToLetter(p);
            const yetz = planetToLetter(p);
            const wSignLetter = signToLetter(wSign);
            const vSignLetter = signToLetter(vSign);
            return (
              <tr key={p} style={{ borderBottom:`1px solid ${M3.outlineVariant}22` }}>
                <td style={{ ...TD, fontSize:"1.05rem", color:P_COL[p] }}>{P_SYM[p]}</td>
                <td style={TD}>{p}</td>
                <td style={{ ...TD, color:M3.onSurfaceVariant, fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.64rem", fontStyle:"italic", borderRight:`1px solid ${M3.outlineVariant}33` }}>{P_ROLE[p]||"—"}</td>
                <td style={{...SC, background:"#ce93d811"}}>
                  <Glyphs letter={hermetic} title={hermetic ? `Hermetic: ${hermetic.hebrewName} (${hermetic.hebrew}) → ${p}` : undefined} />
                </td>
                <td style={{...SC, background:"#80cbc411", borderRight:`1px solid ${M3.outlineVariant}33`}}>
                  <Glyphs letter={yetz} title={yetz ? `Yetzirah: ${yetz.hebrewName} (${yetz.hebrew}) → ${p}` : undefined} />
                </td>
                <td style={{ ...TD, color:SIGN_COL[wSign] }}>{wSign}</td>
                <td style={SC}>
                  <Glyphs letter={wSignLetter} title={wSignLetter ? `${wSign}: ${wSignLetter.hebrewName} (${wSignLetter.hebrew})` : undefined} />
                </td>
                <td style={{ ...TD, color:M3.onSurfaceVariant }}>{zodDeg(lon)}°</td>
                <td style={{ ...TD, textAlign:"center", fontSize:"0.8rem", color: speeds?.[p] < 0 ? "#f44336" : M3.outlineVariant, borderRight:`1px solid ${M3.outlineVariant}33` }}>{speeds?.[p] < 0 ? "℞" : ""}</td>
                <td style={{ ...TD, color:SIGN_COL[vSign] }}>{vSign}</td>
                <td style={SC}>
                  <Glyphs letter={vSignLetter} title={vSignLetter ? `${vSign}: ${vSignLetter.hebrewName} (${vSignLetter.hebrew})` : undefined} />
                </td>
                <td style={{ ...TD, color:M3.onSurfaceVariant }}>{zodDeg(sid)}°</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
