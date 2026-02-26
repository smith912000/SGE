import { useRef, useEffect } from 'react';
import { useAnime } from '../../hooks/useAnime.js';
import { M3 } from '../../theme/m3.js';

function Tooltip({ info, x, y, visible, relative, pinLeft }) {
  const ref  = useRef(null);
  const anime = useAnime();
  useEffect(()=>{
    if (!anime||!ref.current) return;
    if (visible) {
      anime({ targets:ref.current, opacity:[0,1], scale:[0.92,1], translateY:[6,0],
        duration:200, easing:"easeOutQuad" });
    }
  },[visible, info, anime]);
  if (!visible || !info) return null;

  const TW  = 280;
  const estH = 160;
  let left, top;
  if (pinLeft) {
    left = 0;
    top = 8;
  } else if (relative) {
    const parentW = ref.current?.parentElement?.offsetWidth || 600;
    const parentH = ref.current?.parentElement?.offsetHeight || 600;
    left = Math.max(0, Math.min(x + 14, parentW - TW - 8));
    const fitsBelow = y + 16 + estH < parentH;
    top = fitsBelow ? y + 16 : Math.max(4, y - estH - 8);
  } else {
    const W = window.innerWidth;
    const H = window.innerHeight;
    left = Math.min(x + 14, W - TW - 16);
    const fitsBelow = y + 16 + estH < H;
    top = fitsBelow ? y + 16 : Math.max(8, y - estH - 8);
  }

  return (
    <div ref={ref} style={{
      position: (relative || pinLeft) ? "absolute" : "fixed", zIndex:9999,
      left, top,
      width: TW,
      background: M3.surfaceVariant,
      border:`1px solid ${M3.outline}`,
      borderRadius:14,
      padding:"14px 16px",
      boxShadow:`0 8px 32px rgba(0,0,0,0.6), 0 0 0 1px ${M3.primary}22`,
      pointerEvents:"none",
      opacity:0,
    }}>
      <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:8 }}>
        <span style={{ fontSize:"1.3rem" }}>{info.emoji||"✦"}</span>
        <span style={{ color:M3.primary, fontFamily:"'Share Tech Mono', monospace",
          fontSize:"0.75rem", fontWeight:"700", letterSpacing:"0.05em" }}>{info.title}</span>
      </div>
      {info.tags && (
        <div style={{ display:"flex", gap:5, marginBottom:8, flexWrap:"wrap" }}>
          {info.tags.map((t,i)=>(
            <span key={i} style={{ padding:"2px 8px", borderRadius:20,
              background:M3.primaryContainer, color:M3.onPrimaryContainer,
              fontFamily:"'Share Tech Mono', monospace", fontSize:"0.6rem", letterSpacing:"0.05em" }}>{t}</span>
          ))}
        </div>
      )}
      <p style={{ color:M3.onSurface, fontFamily:"'EB Garamond', Georgia, serif", fontSize:"0.78rem",
        lineHeight:1.55, margin:0 }}>{info.plain}</p>
      {info.detail && (
        <p style={{ color:M3.onSurfaceVariant, fontFamily:"'EB Garamond', Georgia, serif",
          fontSize:"0.65rem", lineHeight:1.5, marginTop:8, paddingTop:8,
          borderTop:`1px solid ${M3.outlineVariant}` }}>{info.detail}</p>
      )}
    </div>
  );
}

export default Tooltip;
