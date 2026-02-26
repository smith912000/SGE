import { useRef, useEffect } from 'react';
import { useAnime } from '../../hooks/useAnime.js';

export default function TabContent({ children, id }) {
  const ref   = useRef(null);
  const anime = useAnime();
  useEffect(()=>{
    if (!anime||!ref.current) return;
    anime({ targets:ref.current, opacity:[0,1], translateY:[8,0], duration:320, easing:"easeOutQuad" });
  }, [id, anime]);
  return <div ref={ref} style={{ opacity:0 }}>{children}</div>;
}
