import { useState, useEffect } from "react";

export function useAnime() {
  const [ready, setReady] = useState(!!window.anime);
  useEffect(() => {
    if (window.anime) { setReady(true); return; }
    const s = document.createElement("script");
    s.src = "https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.2/anime.min.js";
    s.onload = () => setReady(true);
    document.head.appendChild(s);
  }, []);
  return ready ? window.anime : null;
}
