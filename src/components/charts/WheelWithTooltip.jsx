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
    <div ref={wrapRef} style={{ position:"relative", width:"100%", overflowX:"auto" }}>
      <div style={{
        display:"grid",
        gridTemplateColumns:"290px minmax(320px, 1fr)",
        alignItems:"flex-start",
        gap:16,
        minWidth:290 + 16 + Math.max(320, Math.min(640, wheelSize)),
      }}>
        <div style={{ width:290, minWidth:220, flexShrink:0, position:"relative", minHeight:tip.visible?180:0, transition:"min-height 0.2s" }}>
          <Tooltip {...tip} pinLeft/>
        </div>
        <div style={{ display:"flex", flexDirection:"column", alignItems:"center", minWidth:320 }}>
          <WheelChart {...props} mode={aspMode} id={wheelId} onTooltip={handleTip} theme={theme}/>
          
          <div style={{ display:"flex", gap:20, marginTop:12, alignItems:"center" }}>
            <button 
              onClick={() => exportWheelAsSvg(wheelId)}
              style={{
                background:"transparent", border:`1px solid ${M3.primary}44`, borderRadius:6, padding:"4px 12px",
                color:M3.primary, fontFamily:"'Share Tech Mono', monospace", fontSize:"0.65rem", cursor:"pointer",
                transition:"all 0.2s", letterSpacing:"0.05em"
              }}>
              ⎙ SAVE CHART (.SVG)
            </button>

            <button 
              onClick={() => setAspMode(aspMode === "default" ? "aspects" : "default")}
              style={{
                background:"transparent", border:`1px solid ${M3.secondary}44`, borderRadius:6, padding:"4px 12px",
                color:M3.secondary, fontFamily:"'Share Tech Mono', monospace", fontSize:"0.65rem", cursor:"pointer",
                transition:"all 0.2s", letterSpacing:"0.05em"
              }}>
              ⌥ {aspMode === "default" ? "VIEW ALL ASPECTS" : "SIMPLIFIED VIEW"}
            </button>
          </div>

          <div style={{ textAlign:"center", marginTop:10, fontFamily:"'Share Tech Mono', monospace",
            fontSize:"0.6rem", color:M3.outlineVariant, letterSpacing:"0.1em", opacity: 0.6 }}>
            HOVER PLANETS · SIGNS · HOUSES · ASPECTS FOR INFO
          </div>
        </div>
      </div>
    </div>
  );
}
