"use client";

import { useEffect, useState } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "../../lib/supabase";
import { Session } from "@supabase/supabase-js";
import { CodeBlock } from "../components/CodeBlock";
import { BarChart3, Copy, LogOut, Plus, Terminal } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";

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
    return <div className="container mx-auto py-16 text-center">Loading...</div>;
  }

  if (!session) {
    return (
      <div className="container mx-auto py-16 px-4">
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="text-center">Log in to Thumbly</CardTitle>
          </CardHeader>
          <CardContent>
            <Auth
              supabaseClient={supabase}
              appearance={{ theme: ThemeSupa }}
              providers={["github"]}
              theme={theme === "dark" ? "dark" : "default"}
            />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-4 md:px-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold tracking-tight">My Surveys</h1>
        <div className="flex gap-4">
          <Button onClick={createSurvey}>
            <Plus size={16} className="mr-2" /> New Survey
          </Button>
          <Button variant="outline" onClick={() => supabase.auth.signOut()}>
            <LogOut size={16} className="mr-2" /> Sign Out
          </Button>
        </div>
      </div>

      {surveys.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent className="flex flex-col items-center">
            <div className="mb-4 text-muted-foreground p-4 bg-muted rounded-full">
              <BarChart3 size={48} />
            </div>
            <p className="text-muted-foreground mb-6">You haven&apos;t created any surveys yet.</p>
            <Button onClick={createSurvey}>Create New Survey</Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6">
          {surveys.map((survey) => (
            <Card key={survey.id}>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row justify-between items-start gap-6">
                  <div className="w-full">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-mono text-lg font-medium">{survey.id}</h3>
                      <div className="text-sm text-muted-foreground">
                        Last Active: {new Date(survey.last_activity).toLocaleDateString()}
                      </div>
                    </div>

                    {/* Simple Analytics Bar */}
                    <div className="flex h-4 w-full rounded-sm overflow-hidden bg-muted mt-4">
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
                            }}
                          />
                        );
                      })}
                      {survey.option_1 + survey.option_2 + survey.option_3 + survey.option_4 + survey.option_5 ===
                        0 && (
                        <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground">
                          No votes yet
                        </div>
                      )}
                    </div>

                    {/* Code Snippet Toggle */}
                    <details className="mt-6 border-t border-border pt-4 group">
                      <summary className="cursor-pointer text-sm font-medium text-primary flex items-center gap-2 select-none group-open:mb-2">
                        <Terminal size={14} /> Get Integration Code
                      </summary>
                      <div>
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
                  <Button
                    variant="ghost"
                    size="sm"
                    className="ml-auto"
                    onClick={() => navigator.clipboard.writeText(survey.id)}
                    title="Copy ID"
                  >
                    <Copy size={16} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
