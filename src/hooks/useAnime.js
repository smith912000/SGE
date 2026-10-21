import { useState, useEffect } from "react";

export function useAnime() {
  const [ready, setReady] = useState(!!window.anime);
  useEffect(() => {
    if (window.anime) { setReady(true); return; }
    const s = document.createElement("script");
    // Vendored copy (anime.js 3.2.2, MIT): no third-party requests on page load.
    s.src = import.meta.env.BASE_URL + "vendor/anime.min.js";
    s.onload = () => setReady(true);
    document.head.appendChild(s);
  }, []);
  return ready ? window.anime : null;
}
