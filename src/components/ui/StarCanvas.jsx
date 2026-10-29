import { useRef, useEffect } from 'react';

// A still star field with the ecliptic drawn faintly across it: the one path
// every tradition in SGE measures along. Drawn once per resize, never per
// frame, so it costs nothing while the page is open.
function seeded(seed) {
  let s = seed >>> 0;
  return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
}

export default function StarCanvas() {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext("2d");
    const rnd = seeded(20261029);
    const stars = Array.from({ length: 170 }, () => ({
      x: rnd(), y: rnd(),
      r: rnd() * 1.1 + 0.2, a: rnd() * 0.45 + 0.08,
      warm: rnd() < 0.18,
    }));
    const draw = () => {
      const W = window.innerWidth, H = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      c.width = W * dpr; c.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);
      stars.forEach(s => {
        ctx.beginPath();
        ctx.arc(s.x * W, s.y * H, s.r, 0, Math.PI * 2);
        ctx.fillStyle = s.warm ? `rgba(233,199,102,${s.a})` : `rgba(214,206,240,${s.a})`;
        ctx.fill();
      });
      // The ecliptic: a shallow sine across the sky, with a tick every 30°.
      const y0 = H * 0.62, amp = H * 0.16;
      const ey = x => y0 - amp * Math.sin((x / W) * Math.PI * 2 - Math.PI / 2.6);
      ctx.beginPath();
      for (let x = 0; x <= W; x += 8) (x ? ctx.lineTo : ctx.moveTo).call(ctx, x, ey(x));
      ctx.strokeStyle = 'rgba(201,168,76,.10)'; ctx.lineWidth = 1; ctx.stroke();
      for (let i = 0; i <= 12; i++) {
        const x = (i / 12) * W, y = ey(x);
        ctx.beginPath(); ctx.moveTo(x, y - 5); ctx.lineTo(x, y + 5);
        ctx.strokeStyle = 'rgba(201,168,76,.16)'; ctx.stroke();
      }
    };
    draw();
    let t;
    const onResize = () => { clearTimeout(t); t = setTimeout(draw, 120); };
    window.addEventListener('resize', onResize);
    return () => { window.removeEventListener('resize', onResize); clearTimeout(t); };
  }, []);
  return <canvas ref={ref} aria-hidden="true" style={{ position: "fixed", inset: 0, width: '100%', height: '100%', pointerEvents: "none", zIndex: 0 }} />;
}
