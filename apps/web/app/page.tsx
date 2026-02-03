"use client";

import Link from "next/link";
import { ThumblyBinary } from "@thumbly/react";
import { CodeBlock } from "./components/CodeBlock";

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
          <h1>
            The Modular Sentiment
            <br />
            Feedback Toolkit.
          </h1>
          <p>Everything you need to collect user feedback. Headless logic, ready-made UI, and a free backend.</p>
          <div className="btn-group">
            <Link href="#how-it-works" className="btn">
              Get Started
            </Link>
            <Link href="#demo" className="btn secondary">
              Live Demo
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section" style={{ background: "var(--secondary-bg)" }}>
        <div className="container">
          <h2 className="section-title">Why Thumbly?</h2>
          <p className="section-subtitle">
            Designed for developers who want flexibility without reinventing the wheel.
          </p>
          <div className="features-grid">
            <div className="feature-card" style={{ background: "white" }}>
              <h3>🔌 Plug & Play UI</h3>
              <p>
                Drop in ready-made React components like <code>&lt;ThumblyBinary /&gt;</code> or{" "}
                <code>&lt;ThumblyNPS /&gt;</code> and start collecting feedback instantly.
              </p>
            </div>
            <div className="feature-card" style={{ background: "white" }}>
              <h3>🚀 Backend Agnostic</h3>
              <p>
                Use our &quot;Forever Free&quot; Supabase backend, your own API, or any serverless function. You are in
                control of your data.
              </p>
            </div>
            <div className="feature-card" style={{ background: "white" }}>
              <h3>🧠 Headless Core</h3>
              <p>
                100% logic separation. Build your own unique UI on top of our robust state management and retry logic.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="section">
        <div className="container">
          <h2 className="section-title">How it works</h2>
          <p className="section-subtitle">It&apos;s as simple as installing a package.</p>

          <div style={{ maxWidth: "600px", margin: "0 auto", textAlign: "left" }}>
            <h3 style={{ fontSize: "1.1rem", marginBottom: "0.5rem" }}>1. Install the package</h3>
            <CodeBlock code={installCode} language="bash" />

            <h3 style={{ fontSize: "1.1rem", marginTop: "2rem", marginBottom: "0.5rem" }}>
              2. Drop it in your component
            </h3>
            <CodeBlock code={usageCode} language="tsx" />
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section id="demo" className="section" style={{ background: "white" }}>
        <div className="container">
          <h2 className="section-title">Live Demo</h2>
          <p className="section-subtitle">
            This is a real component connected to our backend. <br />
            Go ahead, vote!
          </p>

          <div className="demo-container">
            <h3>Is this toolkit useful to you?</h3>

            {isConfigured ? (
              <ThumblyBinary
                surveyId={surveyId}
                supabase={{ url: supabaseUrl, key: supabaseKey }}
                style={{
                  display: "flex",
                  gap: "1rem",
                  justifyContent: "center",
                  marginTop: "1.5rem",
                  fontSize: "2rem",
                }}
              />
            ) : (
              <div style={{ marginTop: "1rem", color: "#666" }}>Please configure .env.local to enable the demo.</div>
            )}
            <p style={{ marginTop: "2rem", fontSize: "0.9rem", color: "#888" }}>
              (This data is actually saved to our Supabase database)
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
