"use client";

import { useEffect, useState } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "../../lib/supabase";
import { Session } from "@supabase/supabase-js";

export default function DashboardPage() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

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
        <button className="btn secondary" onClick={() => supabase.auth.signOut()}>
          Sign Out
        </button>
      </div>

      <div className="feature-card" style={{ padding: "2rem", textAlign: "center", background: "white" }}>
        <p style={{ color: "#666", marginBottom: "1.5rem" }}>You haven't created any surveys yet.</p>
        <button className="btn">Create New Survey</button>
      </div>
    </div>
  );
}
