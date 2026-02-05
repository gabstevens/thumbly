"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "../../lib/supabase";
import { Session } from "@supabase/supabase-js";
import { CodeBlock } from "../components/CodeBlock";
import {
  BarChart3,
  Copy,
  LogOut,
  Plus,
  Terminal,
  Loader2,
  ArrowUpRight,
  Trash2,
  RotateCcw,
  Download,
} from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export default function DashboardPage() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [surveys, setSurveys] = useState<any[]>([]);
  const [snippetTypes, setSnippetTypes] = useState<Record<string, string>>({});
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

  async function deleteSurvey(id: string) {
    if (!confirm("Are you sure you want to delete this survey? All data will be lost.")) return;
    const { error } = await supabase.from("surveys").delete().eq("id", id);
    if (!error) {
      setSurveys(surveys.filter((s) => s.id !== id));
    }
  }

  async function resetSurvey(id: string) {
    if (!confirm("Are you sure you want to reset this survey? All votes will be cleared.")) return;
    const { data, error } = await supabase
      .from("surveys")
      .update({ option_1: 0, option_2: 0, option_3: 0, option_4: 0, option_5: 0 })
      .eq("id", id)
      .select()
      .single();
    if (!error && data) {
      setSurveys(surveys.map((s) => (s.id === id ? data : s)));
    }
  }

  function exportSurvey(survey: any) {
    const data = JSON.stringify(survey, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `thumbly-survey-${survey.id}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  if (loading) {
    return (
      <div className="flex h-[50vh] w-full items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-sm">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold tracking-tight">Get Started</h1>
            <p className="text-muted-foreground mt-2 text-sm">Sign in or create an account to manage your feedback</p>
          </div>

          <div className="bg-card border border-border rounded-3xl p-6 shadow-sm">
            <Auth
              supabaseClient={supabase}
              appearance={{
                theme: ThemeSupa,
                variables: {
                  default: {
                    colors: {
                      brand: "hsl(var(--primary))",
                      brandAccent: "hsl(var(--primary) / 0.8)",
                    },
                    radii: {
                      borderRadiusButton: "0.75rem",
                      inputBorderRadius: "0.75rem",
                    },
                  },
                },
                className: {
                  button: "h-10 font-medium",
                  input: "h-10",
                },
              }}
              providers={["github"]}
              theme={theme === "dark" ? "dark" : "default"}
              showLinks={true}
            />
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">My Surveys</h1>
          <p className="text-muted-foreground text-sm mt-1">Overview of your feedback endpoints.</p>
        </div>
        <div className="flex gap-3">
          <Button onClick={createSurvey} className="rounded-xl h-10 px-5 shadow-sm">
            <Plus size={16} className="mr-2" /> New Survey
          </Button>
          <Button variant="outline" onClick={() => supabase.auth.signOut()} className="rounded-xl h-10 px-4">
            <LogOut size={16} />
          </Button>
        </div>
      </div>

      {surveys.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-3xl border border-dashed border-border bg-muted/50 p-12 text-center"
        >
          <div className="mx-auto w-12 h-12 rounded-2xl bg-muted flex items-center justify-center mb-4 text-muted-foreground">
            <BarChart3 size={20} />
          </div>
          <h3 className="text-lg font-medium text-foreground">No surveys created</h3>
          <p className="text-muted-foreground text-sm mt-2 mb-8 max-w-xs mx-auto">
            Get started by creating your first survey endpoint.
          </p>
          <Button onClick={createSurvey} variant="secondary" className="rounded-xl">
            Create Survey
          </Button>
        </motion.div>
      ) : (
        <div className="grid gap-6">
          {surveys.map((survey, index) => (
            <motion.div
              key={survey.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <div className="group rounded-3xl border border-border bg-card p-1 hover:shadow-md transition-all duration-300">
                <div className="p-6 md:p-8 flex flex-col gap-8">
                  {/* Header Row */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                        <BarChart3 size={18} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-sm font-medium text-foreground">{survey.id}</span>
                          <button
                            onClick={() => navigator.clipboard.writeText(survey.id)}
                            className="p-1 rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                            title="Copy ID"
                          >
                            <Copy size={12} />
                          </button>
                        </div>
                        <div className="text-xs text-muted-foreground mt-0.5">
                          Last active {new Date(survey.last_activity).toLocaleDateString()}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground bg-muted px-3 py-1.5 rounded-lg">
                      <Terminal size={12} />
                      Managed Endpoint
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => exportSurvey(survey)}
                        className="p-2 rounded-lg text-muted-foreground hover:bg-primary/10 hover:text-primary transition-all"
                        title="Export Data (JSON)"
                      >
                        <Download size={16} />
                      </button>
                      <button
                        onClick={() => resetSurvey(survey.id)}
                        className="p-2 rounded-lg text-muted-foreground hover:bg-amber-500/10 hover:text-amber-500 transition-all"
                        title="Reset Votes"
                      >
                        <RotateCcw size={16} />
                      </button>
                      <button
                        onClick={() => deleteSurvey(survey.id)}
                        className="p-2 rounded-lg text-muted-foreground hover:bg-rose-500/10 hover:text-rose-500 transition-all"
                        title="Delete Survey"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>

                  {/* Visualization Row */}
                  <div className="space-y-3">
                    <div className="flex h-10 w-full rounded-xl overflow-hidden bg-muted/60">
                      {[
                        { val: survey.option_1, color: "bg-emerald-500", label: "👍" },
                        { val: survey.option_2, color: "bg-rose-500", label: "👎" },
                        { val: survey.option_3, color: "bg-amber-400", label: "⭐" },
                        { val: survey.option_4, color: "bg-blue-500", label: "4" },
                        { val: survey.option_5, color: "bg-violet-500", label: "5" },
                      ].map((opt, idx) => {
                        const total =
                          survey.option_1 + survey.option_2 + survey.option_3 + survey.option_4 + survey.option_5;
                        const pct = total > 0 ? (opt.val / total) * 100 : 0;
                        if (pct === 0) return null;

                        return (
                          <div
                            key={idx}
                            className={cn(
                              opt.color,
                              "h-full border-r border-background/20 last:border-0 relative group/bar",
                            )}
                            style={{ width: `${pct}%` }}
                          >
                            <div className="opacity-0 group-hover/bar:opacity-100 absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-popover text-popover-foreground text-xs px-2 py-1 rounded-md shadow-sm whitespace-nowrap z-10 pointer-events-none transition-opacity">
                              {opt.label}: {opt.val} ({Math.round(pct)}%)
                            </div>
                          </div>
                        );
                      })}
                      {survey.option_1 + survey.option_2 + survey.option_3 + survey.option_4 + survey.option_5 ===
                        0 && (
                        <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground font-medium">
                          No feedback collected yet
                        </div>
                      )}
                    </div>
                    <div className="flex justify-between text-[10px] text-muted-foreground uppercase tracking-widest px-1">
                      <span>0%</span>
                      <span>100%</span>
                    </div>
                  </div>

                  {/* Code Snippet Row */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                          Integration
                        </span>
                        <div className="flex bg-muted rounded-lg p-0.5">
                          {["Binary", "StarRating", "NPS"].map((type) => (
                            <button
                              key={type}
                              onClick={() => setSnippetTypes({ ...snippetTypes, [survey.id]: type })}
                              className={cn(
                                "text-[10px] px-2 py-1 rounded-md font-bold transition-all",
                                (snippetTypes[survey.id] || "Binary") === type
                                  ? "bg-background text-foreground shadow-sm"
                                  : "text-muted-foreground hover:text-foreground",
                              )}
                            >
                              {type}
                            </button>
                          ))}
                        </div>
                      </div>
                      <Link href="/docs" className="text-xs flex items-center hover:underline text-primary font-bold">
                        View Docs <ArrowUpRight size={10} className="ml-1" />
                      </Link>
                    </div>
                    <div className="relative group/code">
                      <CodeBlock
                        code={`<Thumbly${snippetTypes[survey.id] || "Binary"} surveyId="${survey.id}" />`}
                        language="tsx"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
