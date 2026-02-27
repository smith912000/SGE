import { useRef, useEffect } from 'react';
import { useAnime } from '../../hooks/useAnime.js';
import { M3 } from '../../theme/m3.js';
import { norm } from '../../utils/helpers.js';
import { SIGNS, SIGN_COL } from '../../data/astrology/signs.js';
import { P_SYM, P_COL, P_ROLE } from '../../data/astrology/planets.js';
import { ayanamsa, planetSpeeds } from '../../engines/astronomy.js';
import { planetToLetter } from '../../data/grammatology/yetzirah.js';

const zodSign = lon => SIGNS[Math.floor(((lon%360+360)%360)/30)];
const zodDeg = lon => (((lon%360+360)%360)%30).toFixed(1);

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
  const TH = { padding:"5px 10px", textAlign:"left", color:M3.secondary,
    fontFamily:"'Share Tech Mono', monospace", fontSize:"0.67rem",
    letterSpacing:"0.1em", borderBottom:`1px solid ${M3.outlineVariant}` };
  const TD = { padding:"4px 10px", fontFamily:"'Share Tech Mono', monospace", fontSize:"0.73rem", color:M3.onSurface };
  return (
    <div ref={tRef} style={{ overflowX:"auto" }}>
      <table style={{ width:"100%", borderCollapse:"collapse" }}>
        <thead><tr>
          {[" ","Planet","Governs","Script","Western Sign","Pos.","℞","Vedic Sign","Pos."].map(h=><th key={h} style={TH}>{h}</th>)}
        </tr></thead>
        <tbody>
          {Object.entries(positions).map(([p,lon])=>{
            const sid = siderealPositions?.[p] ?? norm(lon-ay);
            const pl=planetToLetter(p);
            return (
              <tr key={p} style={{ borderBottom:`1px solid ${M3.outlineVariant}22` }}>
                <td style={{ ...TD, fontSize:"1.05rem", color:P_COL[p] }}>{P_SYM[p]}</td>
                <td style={TD}>{p}</td>
                <td style={{ ...TD, color:M3.onSurfaceVariant, fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.68rem", fontStyle:"italic" }}>{P_ROLE[p]||"—"}</td>
                <td style={{ ...TD, fontSize:"0.85rem", letterSpacing:2 }}>{pl ? <span title={`${pl.hebrewName} (${pl.acrophony})`}>{pl.hiero} {pl.hebrew} {pl.phoenician}</span> : "—"}</td>
                <td style={{ ...TD, color:SIGN_COL[zodSign(lon)] }}>{zodSign(lon)}</td>
                <td style={{ ...TD, color:M3.onSurfaceVariant }}>{zodDeg(lon)}°</td>
                <td style={{ ...TD, textAlign:"center", fontSize:"0.8rem", color: speeds?.[p] < 0 ? "#f44336" : M3.outlineVariant }}>{speeds?.[p] < 0 ? "℞" : ""}</td>
                <td style={{ ...TD, color:SIGN_COL[zodSign(sid)] }}>{zodSign(sid)}</td>
                <td style={{ ...TD, color:M3.onSurfaceVariant }}>{zodDeg(sid)}°</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
