import { useRef } from 'react';
import { useAnime } from '../../hooks/useAnime.js';

export default function ComputeButton({ onClick, loading }) {
  const ref   = useRef(null);
  const anime = useAnime();
  return (
    <button ref={ref} type="button" className="btn-compute" aria-busy={loading || undefined}
      disabled={loading}
      onClick={() => {
        if (anime && ref.current) anime({ targets: ref.current, scale: [1, 0.95, 1], duration: 300, easing: "easeOutElastic(1,0.5)" });
        onClick();
      }}
      style={{ width: '100%', opacity: loading ? 0.7 : 1, cursor: loading ? 'wait' : 'pointer' }}>
      {loading ? "Computing…" : "Compute chart"}
    </button>
  );
}
