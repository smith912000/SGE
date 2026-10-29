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
    <div ref={wrapRef} style={{ position:"relative", width:"100%" }}>
      <div className="sge-wheelwrap">
        <div className="sge-wheeltip" style={{ minHeight:tip.visible?180:0 }}>
          <Tooltip {...tip} pinLeft/>
        </div>
        <div className="sge-wheelcol">
          <ChineseWheel {...props} onTooltip={handleTip}/>
          <div style={{ textAlign:"center", marginTop:8, fontSize:"0.8125rem", color:M3.onSurfaceVariant }}>
            Hover or tap an animal, phase, trigram or the yin-yang for its attribution.
          </div>
        </div>
      </div>
    </div>
  );
}
