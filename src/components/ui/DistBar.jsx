import { useRef, useEffect } from 'react';
import { useAnime } from '../../hooks/useAnime.js';
import { M3 } from '../../theme/m3.js';

export default function DistBar({ data, colors }) {
  const anime  = useAnime();
  const refs   = useRef({});
  const total  = Object.values(data).reduce((a,b)=>a+b,0)||1;
  useEffect(()=>{
    if (!anime) return;
    Object.entries(data).forEach(([k,v])=>{
      const el=refs.current[k];
      if (el) anime({ targets:el, width:`${(v/total)*100}%`, duration:900, easing:"easeOutQuart" });
    });
  }, [data, anime]);
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
      {Object.entries(data).map(([k,v])=>(
        <div key={k} style={{ display:"flex", alignItems:"center", gap:10 }}>
          <span style={{ width:72, color:M3.onSurfaceVariant, fontFamily:"'Share Tech Mono', monospace", fontSize:"0.7rem" }}>{k}</span>
          <div style={{ flex:1, height:5, background:M3.outlineVariant, borderRadius:3, overflow:"hidden" }}>
            <div ref={el=>refs.current[k]=el}
              style={{ width:0, height:"100%", background:colors[k]||M3.primary, borderRadius:3 }}/>
          </div>
          <span style={{ width:18, textAlign:"right", color:colors[k]||M3.primary, fontFamily:"'Share Tech Mono', monospace", fontSize:"0.7rem" }}>{v}</span>
        </div>
      ))}
    </div>
  );
}
