import { useRef, useEffect } from 'react';

export default function StarCanvas() {
  const ref = useRef(null);
  useEffect(()=>{
    const c=ref.current; if (!c) return;
    const ctx=c.getContext("2d");
    const stars=Array.from({length:200},()=>({
      x:Math.random(), y:Math.random(),
      r:Math.random()*1.1+0.2, a:Math.random()*0.5+0.08,
      sp:Math.random()*0.003+0.001, ph:Math.random()*Math.PI*2,
    }));
    let raf;
    const draw=t=>{
      c.width=window.innerWidth; c.height=window.innerHeight;
      ctx.clearRect(0,0,c.width,c.height);
      stars.forEach(s=>{
        const al=s.a*(0.4+0.6*Math.sin(t*s.sp+s.ph));
        ctx.beginPath();
        ctx.arc(s.x*c.width, s.y*c.height, s.r, 0, Math.PI*2);
        ctx.fillStyle=`rgba(210,195,255,${al})`;
        ctx.fill();
      });
      raf=requestAnimationFrame(draw);
    };
    raf=requestAnimationFrame(draw);
    return ()=>cancelAnimationFrame(raf);
  },[]);
  return <canvas ref={ref} style={{ position:"fixed", inset:0, pointerEvents:"none", zIndex:0 }}/>;
}
