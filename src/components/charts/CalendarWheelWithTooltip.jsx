import { useState, useRef, useCallback, useEffect } from "react";
import { M3 } from "../../theme/m3.js";
import { useAnime } from "../../hooks/useAnime.js";
import CalendarWheel from "./CalendarWheel.jsx";

const TOOLTIP_OFFSET_X = 10;
const TOOLTIP_OFFSET_Y = 10;
const TOOLTIP_MAX_WIDTH = 320;
const TOOLTIP_EST_HEIGHT = 200;

function CalendarTooltip({ info, x, y, visible }) {
  const ref = useRef(null);
  const anime = useAnime();

  useEffect(() => {
    if (!anime || !ref.current) return;
    if (visible) {
      anime({
        targets: ref.current,
        opacity: [0, 1],
        scale: [0.92, 1],
        translateY: [6, 0],
        duration: 200,
        easing: "easeOutQuad",
      });
    }
  }, [visible, info, anime]);

  if (!visible || !info) return null;

  const W = typeof window !== "undefined" ? window.innerWidth : 600;
  const H = typeof window !== "undefined" ? window.innerHeight : 600;

  let left = x + TOOLTIP_OFFSET_X;
  let top = y + TOOLTIP_OFFSET_Y;

  left = Math.max(16, Math.min(left, W - TOOLTIP_MAX_WIDTH - 16));
  const fitsBelow = top + TOOLTIP_EST_HEIGHT < H - 16;
  top = fitsBelow ? Math.min(top, H - TOOLTIP_EST_HEIGHT - 16) : Math.max(16, y - TOOLTIP_EST_HEIGHT - 8);

  return (
    <div
      ref={ref}
      style={{
        position: "fixed",
        zIndex: 9999,
        left,
        top,
        width: TOOLTIP_MAX_WIDTH,
        maxWidth: "calc(100vw - 32px)",
        background: "rgba(12,10,30,0.92)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        border: "1px solid rgba(155,135,200,0.2)",
        borderRadius: 14,
        boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
        padding: 0,
        pointerEvents: "none",
        opacity: 0,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "12px 16px",
          background: "rgba(155,135,200,0.08)",
          borderBottom: "1px solid rgba(155,135,200,0.15)",
        }}
      >
        <span style={{ fontSize: "1.2rem" }}>{info.emoji || "✦"}</span>
        <span
          style={{
            color: M3.primary,
            fontFamily: "'Cinzel', serif",
            fontSize: "0.78rem",
            fontWeight: 600,
            letterSpacing: "0.04em",
          }}
        >
          {info.title}
        </span>
      </div>
      <div style={{ padding: "14px 16px" }}>
        {info.tags && info.tags.length > 0 && (
          <div
            style={{
              display: "flex",
              gap: 6,
              marginBottom: 10,
              flexWrap: "wrap",
            }}
          >
            {info.tags.map((t, i) => (
              <span
                key={i}
                style={{
                  padding: "4px 10px",
                  borderRadius: 20,
                  background: "rgba(155,135,200,0.18)",
                  color: M3.onPrimaryContainer,
                  fontFamily: "'Share Tech Mono', monospace",
                  fontSize: "0.62rem",
                  letterSpacing: "0.05em",
                  border: "1px solid rgba(155,135,200,0.25)",
                }}
              >
                {t}
              </span>
            ))}
          </div>
        )}
        <p
          style={{
            color: M3.onSurface,
            fontFamily: "'EB Garamond', Georgia, serif",
            fontSize: "0.74rem",
            lineHeight: 1.55,
            margin: 0,
          }}
        >
          {info.plain}
        </p>
        {info.detail && (
          <p
            style={{
              color: M3.onSurfaceVariant,
              fontFamily: "'EB Garamond', Georgia, serif",
              fontStyle: "italic",
              fontSize: "0.68rem",
              lineHeight: 1.55,
              marginTop: 10,
              paddingTop: 10,
              borderTop: "1px solid rgba(155,135,200,0.15)",
              opacity: 0.9,
            }}
          >
            {info.detail}
          </p>
        )}
      </div>
    </div>
  );
}

export default function CalendarWheelWithTooltip({ model, size = 500, showOverlay = true }) {
  const [tip, setTip] = useState({ visible: false, info: null, x: 0, y: 0 });
  const wrapRef = useRef(null);
  const handleTip = useCallback((t) => {
    setTip(t);
  }, []);

  return (
    <div ref={wrapRef} style={{ position: "relative", width: "100%", overflowX: "auto" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          minWidth: Math.max(320, Math.min(640, size)),
        }}
      >
        <CalendarWheel model={model} size={size} showOverlay={showOverlay} onTooltip={handleTip} />
        <CalendarTooltip info={tip.info} x={tip.x} y={tip.y} visible={tip.visible} />
        <div
          style={{
            textAlign: "center",
            marginTop: 8,
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: "0.6rem",
            color: M3.outlineVariant,
            letterSpacing: "0.1em",
          }}
        >
          HOVER SEGMENTS FOR SOURCE · CYCLE · CONFIDENCE
        </div>
      </div>
    </div>
  );
}
