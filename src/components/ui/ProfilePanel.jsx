import { useRef, useEffect } from 'react';
import { useAnime } from '../../hooks/useAnime.js';
import { M3 } from '../../theme/m3.js';
import { generateProfile } from '../../engines/profile.js';

export default function ProfilePanel({ trop, houses }) {
  const anime   = useAnime();
  const ref     = useRef(null);
  const sections = generateProfile(trop, houses);

  useEffect(()=>{
    if (!anime||!ref.current) return;
    anime({ targets:ref.current.querySelectorAll(".prof-item"),
      opacity:[0,1], translateY:[12,0],
      delay:anime.stagger(80), duration:500, easing:"easeOutQuad" });
  },[trop, anime]);

  return (
    <div ref={ref}>
      <div style={{ fontFamily:"'Share Tech Mono', monospace", fontSize:"0.67rem",
        letterSpacing:"0.2em", color:M3.secondary, marginBottom:16,
        textTransform:"uppercase" }}>✦ SUMMARY</div>
      <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
        {sections.map((s,i)=>(
          <div key={i} className="prof-item" style={{
            padding:"14px 16px",
            background: M3.surfaceVariant,
            border:`1px solid ${M3.outlineVariant}`,
            borderRadius:12, opacity:0,
          }}>
            <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:6 }}>
              <span style={{ fontSize:"1.1rem" }}>{s.icon}</span>
              <span style={{ color:M3.primary, fontFamily:"'Share Tech Mono', monospace",
                fontSize:"0.71rem", fontWeight:"700", letterSpacing:"0.05em" }}>{s.title}</span>
            </div>
            <p style={{ color:M3.onSurface, fontFamily:"'EB Garamond', Georgia, serif",
              fontSize:"0.83rem", lineHeight:1.65, margin:0 }}>{s.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
