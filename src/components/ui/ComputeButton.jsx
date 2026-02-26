import { useState, useRef } from 'react';
import { useAnime } from '../../hooks/useAnime.js';
import { M3 } from '../../theme/m3.js';

export default function ComputeButton({ onClick, loading }) {
  const ref   = useRef(null);
  const anime = useAnime();
  const [hov, setHov] = useState(false);
  return (
    <button ref={ref}
      onClick={() => {
        if (anime && ref.current) anime({ targets: ref.current, scale: [1, 0.93, 1], duration: 300, easing: "easeOutElastic(1,0.5)" });
        onClick();
      }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        padding: "11px 32px",
        background: loading ? M3.primaryContainer : hov ? M3.onPrimaryContainer : M3.primary,
        border: "none", borderRadius: M3.radius.xl, cursor: loading ? "not-allowed" : "pointer",
        color: loading ? M3.primary : M3.onPrimary,
        fontFamily: M3.fontMono, fontSize: "0.83rem",
        letterSpacing: "0.18em", fontWeight: "700",
        boxShadow: hov && !loading ? `0 4px 20px ${M3.primary}55` : `0 2px 8px ${M3.primary}33`,
        transition: "background 0.25s, box-shadow 0.25s, color 0.25s",
      }}>
      {loading ? "COMPUTING…" : "✦  COMPUTE CHART"}
    </button>
  );
}
