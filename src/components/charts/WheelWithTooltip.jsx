import { useState, useRef, useCallback } from 'react';
import WheelChart, { exportWheelAsSvg } from './WheelChart.jsx';
import { M3 } from '../../theme/m3.js';
import Tooltip from '../ui/Tooltip.jsx';

export default function WheelWithTooltip(props) {
  const [tip, setTip] = useState({ visible:false, info:null, x:0, y:0 });
  const [aspMode, setAspMode] = useState(props.mode || "default");
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
          <WheelChart {...props} mode={aspMode} id={wheelId} onTooltip={handleTip} theme={theme}/>
          
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
            Hover or tap a body, sign, house or aspect for its attribution.
          </p>
        </div>
      </div>
    </div>
  );
}
