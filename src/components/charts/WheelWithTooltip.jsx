import { useState, useRef, useCallback } from 'react';
import WheelChart, { exportWheelAsSvg } from './WheelChart.jsx';
import { M3 } from '../../theme/m3.js';
import Tooltip from '../ui/Tooltip.jsx';

export default function WheelWithTooltip(props) {
  const [tip, setTip] = useState({ visible:false, info:null, x:0, y:0 });
  const [aspMode, setAspMode] = useState(props.mode || "default");
  const [reading, setReading] = useState(null);
  const wrapRef = useRef(null);
  const wheelSize = props?.size ?? 480;
  
  const handleTip = useCallback(t => {
    if (!t.visible) { setTip(t); return; }
    setTip(t);
  },[]);

  const theme = props.theme || "western";
  const wheelId = props.id || "chart-main";

  return (
    <div ref={wrapRef} style={{ position:"relative", width:"100%" }}>
      {/* Side panel for the attribution on wide screens; on phones the wheel
          comes first at full width and the panel follows beneath it. */}
      <div className="sge-wheelwrap">
        <div className="sge-wheeltip" style={{ minHeight:tip.visible?180:0 }}>
          <Tooltip {...tip} pinLeft/>
        </div>
        <div className="sge-wheelcol">
          <WheelChart {...props} mode={aspMode} id={wheelId} onTooltip={handleTip} onReading={setReading} theme={theme}/>
          <WheelReading reading={reading} />
          
          <div style={{ display:"flex", gap:8, marginTop:12, alignItems:"center", flexWrap:"wrap", justifyContent:"center" }}>
            <button type="button" className="sge-chip" aria-pressed={aspMode === "aspects"}
              onClick={() => setAspMode(aspMode === "default" ? "aspects" : "default")}>
              {aspMode === "default" ? "Show all aspects" : "Show main aspects"}
            </button>
            <button type="button" className="sge-chip" onClick={() => exportWheelAsSvg(wheelId)}>
              Save as SVG
            </button>
          </div>

          <p style={{ textAlign:"center", margin:"10px 0 0", fontSize:"0.8125rem", color:M3.onSurfaceVariant }}>
            Hover, tap or tab to a body to light its sign, house and aspects.
          </p>
        </div>
      </div>
    </div>
  );
}

const ordinal = n => n + (["th","st","nd","rd"][((n % 100) - 20) % 10] || ["th","st","nd","rd"][n % 100] || "th");

const ASPECT_ADJ = { Conjunction: "conjunct", Opposition: "opposite" };

// One line that reads the body in focus the way a practitioner would say it:
// the body, its degree and sign, its house, then its aspects, tightest first.
function WheelReading({ reading }) {
  const asps = reading ? [...reading.aspects].sort((a, b) => a.orb - b.orb) : [];
  return (
    <p className="sge-reading" aria-live="polite">
      {reading ? (
        <>
          <b>{reading.planet}</b> at {reading.deg}° {reading.sign}
          {reading.house ? <>, {ordinal(reading.house)} house</> : null}
          {asps.length ? <>: {asps.slice(0, 4).map((a, i) => (
            <span key={i}>{i ? ", " : ""}<span style={{ color: a.col }}>{ASPECT_ADJ[a.name] || a.name.toLowerCase()}</span> {a.other} ({Number(a.orb).toFixed(1)}°)</span>
          ))}{asps.length > 4 ? `, and ${asps.length - 4} more` : ""}</> : <>, with no aspect inside the orbs in use</>}
        </>
      ) : <span className="sge-reading-idle">Select a body to read it in place.</span>}
    </p>
  );
}
