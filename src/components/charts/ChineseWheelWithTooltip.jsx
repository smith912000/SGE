import { useState, useRef, useCallback } from 'react';
import ChineseWheel from './ChineseWheel.jsx';
import { M3 } from '../../theme/m3.js';
import Tooltip from '../ui/Tooltip.jsx';

export default function ChineseWheelWithTooltip(props) {
  const [tip, setTip] = useState({ visible:false, info:null, x:0, y:0 });
  const wrapRef = useRef(null);
  const wheelSize = props?.size ?? 460;
  const handleTip = useCallback(t => {
    if (!t.visible) { setTip(t); return; }
    setTip(t);
  },[]);
  return (
    <div ref={wrapRef} style={{ position:"relative", width:"100%", overflowX:"auto" }}>
      <div style={{
        display:"grid",
        gridTemplateColumns:"290px minmax(320px, 1fr)",
        alignItems:"flex-start",
        gap:16,
        minWidth:290 + 16 + Math.max(320, Math.min(620, wheelSize)),
      }}>
        <div style={{ width:290, minWidth:220, flexShrink:0, position:"relative", minHeight:tip.visible?180:0, transition:"min-height 0.2s" }}>
          <Tooltip {...tip} pinLeft/>
        </div>
        <div style={{ display:"flex", flexDirection:"column", alignItems:"center", minWidth:320 }}>
          <ChineseWheel {...props} onTooltip={handleTip}/>
          <div style={{ textAlign:"center", marginTop:8, fontFamily:"'Share Tech Mono', monospace",
            fontSize:"0.6rem", color:M3.outlineVariant, letterSpacing:"0.1em" }}>
            HOVER ANIMALS · ELEMENTS · TRIGRAMS · YIN-YANG FOR INFO
          </div>
        </div>
      </div>
    </div>
  );
}
