"use client";

import { ThumblyBinary } from "@thumbly/react";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY || "";
  const surveyId = process.env.NEXT_PUBLIC_DOGFOOD_SURVEY_ID || "5468756d-626c-7930-0000-000000000000";

  const isConfigured = supabaseUrl && supabaseKey;

  return (
    <section className="hero">
      <h1>Thumbly</h1>
      <p>The Modular Sentiment Feedback Toolkit.</p>
      <div style={{ marginTop: "2rem" }}>
        <a href="#demo" className="btn">
          Try the Demo
        </a>
      </div>

      <div id="demo" style={{ marginTop: "6rem", maxWidth: "600px", margin: "6rem auto 0", textAlign: "left" }}>
        <h2>Live Demo</h2>
        <p style={{ marginBottom: "1rem" }}>
          This is a real <code>&lt;ThumblyBinary /&gt;</code> component connected to our backend.
        </p>

        <div
          style={{
            padding: "2rem",
            border: "1px solid #eee",
            borderRadius: "8px",
            background: "#fafafa",
            textAlign: "center",
          }}
        >
          <h3>Is this toolkit useful to you?</h3>

          {mounted && isConfigured ? (
            <ThumblyBinary
              surveyId={surveyId}
              supabaseUrl={supabaseUrl}
              supabaseKey={supabaseKey}
              style={{
                display: "flex",
                gap: "1rem",
                justifyContent: "center",
                marginTop: "1.5rem",
                fontSize: "2rem",
              }}
            />
          ) : (
            <div style={{ marginTop: "1rem", color: "#666" }}>
              {!mounted ? "Loading..." : "Please configure .env.local to enable the demo."}
            </div>
          )}
        </div>

        <div style={{ marginTop: "4rem" }}>
          <h2>Quick Start</h2>
          <pre style={{ background: "#f4f4f4", padding: "1rem", borderRadius: "4px", overflowX: "auto" }}>
            <code>npm install @thumbly/react</code>
          </pre>
          <p>
            Thumbly provides everything you need to collect feedback from your users, from ready-made UI components to a
            flexible backend-agnostic core.
          </p>
        </div>
      </div>
    </section>
  );
}
