"use client";

import { useEffect, useState } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "../../lib/supabase";
import { Session } from "@supabase/supabase-js";
import { CodeBlock } from "../components/CodeBlock";
import { BarChart3, Copy, LogOut, Plus, Terminal } from "lucide-react";
import { useTheme } from "next-themes";

export default function DashboardPage() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [surveys, setSurveys] = useState<any[]>([]);
  const { theme } = useTheme();

  async function fetchSurveys() {
    setLoading(true);
    const { data, error } = await supabase.from("surveys").select("*").order("last_activity", { ascending: false });

    if (!error && data) {
      setSurveys(data);
    }
    setLoading(false);
  }

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) fetchSurveys();
      else setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) fetchSurveys();
    });

    return () => subscription.unsubscribe();
  }, []);

  async function createSurvey() {
    const { data } = await supabase.from("surveys").insert({}).select().single();
    if (data) {
      setSurveys([data, ...surveys]);
    }
  }

  if (loading) {
    return (
      <div className="container" style={{ padding: "4rem 0", textAlign: "center" }}>
        Loading...
      </div>
    );
  }

  if (!session) {
    return (
      <div className="container" style={{ padding: "4rem 0" }}>
        <div style={{ maxWidth: "400px", margin: "0 auto" }}>
          <h1 style={{ textAlign: "center", marginBottom: "2rem" }}>Log in to Thumbly</h1>
          <Auth
            supabaseClient={supabase}
            appearance={{ theme: ThemeSupa }}
            providers={["github"]}
            theme={theme === "dark" ? "dark" : "default"}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: "4rem 0" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <h1>My Surveys</h1>
        <div style={{ display: "flex", gap: "1rem" }}>
          <button className="btn" onClick={createSurvey}>
            <Plus size={16} style={{ marginRight: "0.5rem" }} /> New Survey
          </button>
          <button className="btn secondary" onClick={() => supabase.auth.signOut()}>
            <LogOut size={16} style={{ marginRight: "0.5rem" }} /> Sign Out
          </button>
        </div>
      </div>

      {surveys.length === 0 ? (
        <div className="feature-card" style={{ padding: "2rem", textAlign: "center" }}>
          <div style={{ marginBottom: "1rem", color: "var(--muted-foreground)" }}>
            <BarChart3 size={48} />
          </div>
          <p style={{ color: "var(--muted-foreground)", marginBottom: "1.5rem" }}>
            You haven&apos;t created any surveys yet.
          </p>
          <button className="btn" onClick={createSurvey}>
            Create New Survey
          </button>
        </div>
      ) : (
        <div style={{ display: "grid", gap: "1rem" }}>
          {surveys.map((survey) => (
            <div key={survey.id} className="feature-card" style={{ padding: "1.5rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div style={{ width: "100%" }}>
                  <h3 style={{ fontSize: "1.1rem", fontFamily: "monospace", marginBottom: "0.5rem" }}>{survey.id}</h3>
                  <div style={{ display: "flex", gap: "1.5rem", fontSize: "0.9rem", color: "var(--muted-foreground)" }}>
                    <span>Last Active: {new Date(survey.last_activity).toLocaleDateString()}</span>
                  </div>

                  {/* Simple Analytics Bar */}
                  <div
                    style={{
                      marginTop: "1rem",
                      display: "flex",
                      gap: "4px",
                      height: "20px",
                      width: "100%",
                      maxWidth: "400px",
                    }}
                  >
                    {[
                      { val: survey.option_1, color: "#22c55e", label: "👍" },
                      { val: survey.option_2, color: "#ef4444", label: "👎" },
                      { val: survey.option_3, color: "#eab308", label: "⭐" },
                      { val: survey.option_4, color: "#3b82f6", label: "4" },
                      { val: survey.option_5, color: "#a855f7", label: "5" },
                    ].map((opt, idx) => {
                      const total =
                        survey.option_1 + survey.option_2 + survey.option_3 + survey.option_4 + survey.option_5;
                      const pct = total > 0 ? (opt.val / total) * 100 : 0;

                      if (pct === 0) return null;

                      return (
                        <div
                          key={idx}
                          title={`${opt.label}: ${opt.val} votes (${Math.round(pct)}%)`}
                          style={{
                            width: `${pct}%`,
                            background: opt.color,
                            opacity: 0.8,
                            borderRadius: "2px",
                          }}
                        />
                      );
                    })}
                    {survey.option_1 + survey.option_2 + survey.option_3 + survey.option_4 + survey.option_5 === 0 && (
                      <div
                        style={{
                          width: "100%",
                          background: "#e5e7eb",
                          borderRadius: "2px",
                          fontSize: "0.7rem",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#888",
                        }}
                      >
                        No votes yet
                      </div>
                    )}
                  </div>

                  {/* Code Snippet Toggle */}
                  <details style={{ marginTop: "1rem", borderTop: "1px solid var(--border)", paddingTop: "1rem" }}>
                    <summary
                      style={{
                        cursor: "pointer",
                        fontSize: "0.85rem",
                        color: "var(--primary)",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                      }}
                    >
                      <Terminal size={14} /> Get Integration Code
                    </summary>
                    <div style={{ marginTop: "0.5rem" }}>
                      <CodeBlock
                        code={`
import { ThumblyBinary } from "@thumbly/react";

<ThumblyBinary
  surveyId="${survey.id}"
/>`}
                        language="tsx"
                      />
                    </div>
                  </details>
                </div>
                <button
                  className="btn secondary"
                  style={{ fontSize: "0.8rem", padding: "0.4rem 0.8rem", marginLeft: "1rem" }}
                  onClick={() => navigator.clipboard.writeText(survey.id)}
                  title="Copy ID"
                >
                  <Copy size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
