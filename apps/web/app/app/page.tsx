"use client";

import { useEffect, useState } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "../../lib/supabase";
import { Session } from "@supabase/supabase-js";

export default function DashboardPage() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [surveys, setSurveys] = useState<any[]>([]);

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

  async function fetchSurveys() {
    setLoading(true);
    const { data, error } = await supabase
      .from("surveys")
      .select("*")
      .order("last_activity", { ascending: false });

    if (!error && data) {
      setSurveys(data);
    }
    setLoading(false);
  }

  async function createSurvey() {
    const { data, error } = await supabase.from("surveys").insert({}).select().single();
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
            theme="light"
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
            New Survey
          </button>
          <button className="btn secondary" onClick={() => supabase.auth.signOut()}>
            Sign Out
          </button>
        </div>
      </div>

      {surveys.length === 0 ? (
        <div className="feature-card" style={{ padding: "2rem", textAlign: "center", background: "white" }}>
          <p style={{ color: "#666", marginBottom: "1.5rem" }}>You haven't created any surveys yet.</p>
          <button className="btn" onClick={createSurvey}>
            Create New Survey
          </button>
        </div>
      ) : (
        <div style={{ display: "grid", gap: "1rem" }}>
          {surveys.map((survey) => (
            <div key={survey.id} className="feature-card" style={{ background: "white", padding: "1.5rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <h3 style={{ fontSize: "1.1rem", fontFamily: "monospace", marginBottom: "0.5rem" }}>
                    {survey.id}
                  </h3>
                  <div style={{ display: "flex", gap: "1.5rem", fontSize: "0.9rem", color: "#666" }}>
                    <span>👍 {survey.option_1}</span>
                    <span>👎 {survey.option_2}</span>
                    <span>Last Active: {new Date(survey.last_activity).toLocaleDateString()}</span>
                  </div>
                </div>
                <button
                  className="btn secondary"
                  style={{ fontSize: "0.8rem", padding: "0.3rem 0.8rem" }}
                  onClick={() => navigator.clipboard.writeText(survey.id)}
                >
                  Copy ID
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
