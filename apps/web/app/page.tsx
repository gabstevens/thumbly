import Link from "next/link";
import { ThumblyBinary } from "@thumbly/react";
import { CodeBlock } from "./components/CodeBlock";
import { ArrowRight, Box, BrainCircuit, Check, Copy, Server, Zap } from "lucide-react";

export default function HomePage() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY || "";
  const surveyId = process.env.NEXT_PUBLIC_DOGFOOD_SURVEY_ID || "5468756d-626c-7930-0000-000000000000";

  const isConfigured = supabaseUrl && supabaseKey;

  const installCode = `npm install @thumbly/react`;
  const usageCode = `
import { ThumblyBinary } from "@thumbly/react";

export default function App() {
  return (
    <ThumblyBinary
      surveyId="..."
    />
  );
}`;

  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.5rem 1rem",
              borderRadius: "999px",
              background: "var(--code-bg)",
              fontSize: "0.85rem",
              marginBottom: "1.5rem",
              color: "var(--foreground)",
              border: "1px solid var(--border)",
            }}
          >
            <span style={{ fontSize: "1.2em" }}>🚀</span> v1.0.0 is now available
          </div>
          <h1>
            The Modular Sentiment
            <br />
            <span style={{ color: "var(--primary)" }}>Feedback Toolkit.</span>
          </h1>
          <p>
            Collecting user feedback shouldn&apos;t be hard. Thumbly gives you headless logic, ready-made UI, and a free
            backend—so you can focus on building.
          </p>
          <div className="btn-group">
            <Link href="#how-it-works" className="btn">
              Get Started <ArrowRight size={18} style={{ marginLeft: "0.5rem" }} />
            </Link>
            <Link href="#demo" className="btn secondary">
              Live Demo
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section" style={{ background: "var(--muted)" }}>
        <div className="container">
          <h2 className="section-title">Why Thumbly?</h2>
          <p className="section-subtitle">
            Designed for the modern stack. Flexible, type-safe, and batteries-included.
          </p>
          <div className="features-grid">
            <div className="feature-card">
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "12px",
                  background: "var(--primary)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "1rem",
                  color: "white",
                }}
              >
                <Zap size={24} />
              </div>
              <h3>Plug & Play UI</h3>
              <p>
                Drop in ready-made React components like <code>&lt;ThumblyBinary /&gt;</code> and start collecting
                feedback instantly. Accessible and themable by default.
              </p>
            </div>
            <div className="feature-card">
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "12px",
                  background: "#10b981", // Emerald
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "1rem",
                  color: "white",
                }}
              >
                <Server size={24} />
              </div>
              <h3>Backend Agnostic</h3>
              <p>
                Use our &quot;Forever Free&quot; Supabase backend, your own API, or serverless functions. You own your
                data, always.
              </p>
            </div>
            <div className="feature-card">
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "12px",
                  background: "#8b5cf6", // Violet
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "1rem",
                  color: "white",
                }}
              >
                <BrainCircuit size={24} />
              </div>
              <h3>Headless Core</h3>
              <p>
                100% logic separation. Build your own unique UI on top of our robust state management, persistence, and
                retry logic.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="section">
        <div className="container">
          <h2 className="section-title">How it works</h2>
          <p className="section-subtitle">From zero to feedback in under 60 seconds.</p>

          <div
            style={{
              maxWidth: "800px",
              margin: "0 auto",
              textAlign: "left",
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "3rem",
            }}
          >
            <div style={{ display: "flex", gap: "1.5rem" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    background: "var(--primary)",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "bold",
                    fontSize: "0.9rem",
                  }}
                >
                  1
                </div>
                <div style={{ width: "2px", flex: 1, background: "var(--border)", margin: "0.5rem 0" }} />
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: "1.2rem", margin: "0 0 1rem" }}>Install the package</h3>
                <CodeBlock code={installCode} language="bash" />
              </div>
            </div>

            <div style={{ display: "flex", gap: "1.5rem" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    background: "var(--primary)",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "bold",
                    fontSize: "0.9rem",
                  }}
                >
                  2
                </div>
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: "1.2rem", margin: "0 0 1rem" }}>Drop it in your component</h3>
                <CodeBlock code={usageCode} language="tsx" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section id="demo" className="section" style={{ background: "var(--muted)" }}>
        <div className="container">
          <h2 className="section-title">Live Demo</h2>
          <p className="section-subtitle">
            Experience the interaction. This is a real component connected to our Supabase backend.
          </p>

          <div className="demo-container">
            <h3 style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}>
              <Box size={20} /> Is this toolkit useful to you?
            </h3>

            {isConfigured ? (
              <ThumblyBinary
                surveyId={surveyId}
                supabase={{ url: supabaseUrl, key: supabaseKey }}
                style={{
                  display: "flex",
                  gap: "1rem",
                  justifyContent: "center",
                  marginTop: "2rem",
                  fontSize: "2rem",
                }}
              />
            ) : (
              <div style={{ marginTop: "1rem", color: "var(--muted-foreground)" }}>
                Please configure .env.local to enable the demo.
              </div>
            )}
            <div
              style={{
                marginTop: "2rem",
                fontSize: "0.85rem",
                color: "var(--muted-foreground)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
              }}
            >
              <Check size={14} /> Data is persisted to Supabase
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
