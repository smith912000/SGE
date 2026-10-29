import React from "react";
import { M3 } from "../../theme/m3.js";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          padding: 40,
          textAlign: "center",
          background: M3.surfaceContainer,
          borderRadius: 20,
          border: `1px dashed ${M3.error}`,
          margin: 20
        }}>
          <div style={{ fontSize: "3rem", marginBottom: 16 }}>⚠️</div>
          <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", color: M3.error, marginBottom: 12 }}>
            Something went wrong in this module.
          </h2>
          <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "1rem", color: M3.onSurfaceVariant, maxWidth: 500, margin: "0 auto 24px" }}>
            The SGE engine encountered a calculation or rendering anomaly. Reloading the page or moving to another tab may clear it.
          </p>
          <button
            onClick={() => this.setState({ hasError: false })}
            style={{
              padding: "10px 24px",
              borderRadius: 30,
              background: M3.primary,
              color: M3.onPrimary,
              border: "none",
              fontFamily: "'JetBrains Mono', monospace",
              cursor: "pointer",
              fontSize: "0.8rem",
              letterSpacing: "0.1em"
            }}
          >
            RETRY MODULE
          </button>
          {this.state.error && (
            <pre style={{
              marginTop: 24,
              padding: 12,
              background: "#00000044",
              color: M3.error,
              fontSize: "0.75rem",
              textAlign: "left",
              overflowX: "auto",
              borderRadius: 8
            }}>
              {this.state.error.toString()}
            </pre>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
