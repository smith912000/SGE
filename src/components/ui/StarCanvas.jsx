import { useRef, useEffect } from 'react';

// A still star field. Drawn once per resize, never per frame, so it costs
// nothing while the page is open.
export default function StarCanvas() {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext("2d");
    const stars = Array.from({ length: 160 }, () => ({
      x: Math.random(), y: Math.random(),
      r: Math.random() * 1.1 + 0.2, a: Math.random() * 0.45 + 0.08,
    }));
    const draw = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      c.width = window.innerWidth * dpr; c.height = window.innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      stars.forEach(s => {
        ctx.beginPath();
        ctx.arc(s.x * window.innerWidth, s.y * window.innerHeight, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(185,169,240,${s.a})`;
        ctx.fill();
      });
    };
    draw();
    let t;
    const onResize = () => { clearTimeout(t); t = setTimeout(draw, 120); };
    window.addEventListener('resize', onResize);
    return () => { window.removeEventListener('resize', onResize); clearTimeout(t); };
  }, []);
  return <canvas ref={ref} aria-hidden="true" style={{ position: "fixed", inset: 0, width: '100%', height: '100%', pointerEvents: "none", zIndex: 0 }} />;
}
