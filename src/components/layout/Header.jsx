import { useRef, useEffect } from 'react';
import { useAnime } from '../../hooks/useAnime.js';
import { M3 } from '../../theme/m3.js';

export default function Header() {
  const ref = useRef(null);
  const anime = useAnime();

  useEffect(() => {
    if (!anime || !ref.current) return;
    anime({
      targets: ref.current.querySelectorAll('.anim'),
      opacity: [0, 1], translateY: [-16, 0],
      delay: anime.stagger(70), duration: 650, easing: 'easeOutQuart',
    });
  }, [anime]);

  return (
    <header ref={ref} style={{
      textAlign: 'center', padding: '52px 20px 32px',
      borderBottom: `1px solid ${M3.glassBorder}`,
    }}>
      <div className="anim" style={{
        fontFamily: M3.fontMono, fontSize: '0.63rem',
        color: M3.secondary, letterSpacing: '0.55em', marginBottom: 10,
      }}>
        ASTRO-TEMPORAL SYSTEM  ·  VERSION 5.0
      </div>
      <h1 className="anim" style={{
        fontFamily: M3.fontDisplay, fontWeight: 900,
        fontSize: 'clamp(2rem,6vw,4rem)', color: M3.primary,
        textShadow: `0 0 60px ${M3.primary}44, 0 0 120px ${M3.primary}22`,
        letterSpacing: '0.07em', lineHeight: 1.1,
      }}>
        SGE <span style={{ color: M3.tertiary }}>v5.0</span>
      </h1>
      <div className="anim" style={{
        fontFamily: M3.fontMono, fontSize: '0.68rem',
        color: M3.outlineVariant, marginTop: 10, letterSpacing: '0.28em',
      }}>
        DETERMINISTIC · ASTRONOMICALLY RIGOROUS · NO ML · PROFESSIONAL
      </div>
    </header>
  );
}
