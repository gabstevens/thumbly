"use client";

import Link from "next/link";
import { ThumblyBinary } from "@thumbly/react";
import { CodeBlock } from "./components/CodeBlock";
import { ArrowRight, BrainCircuit, Check, Server, Zap } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "./components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";

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
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="container px-4 md:px-6 relative z-10 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 mb-6"
          >
            🚀 v1.0.0 is now available
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl font-extrabold tracking-tight lg:text-6xl mb-6"
          >
            The Modular Sentiment
            <br />
            <span className="text-primary">Feedback Toolkit.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-muted-foreground max-w-[600px] mb-10"
          >
            Collecting user feedback shouldn&apos;t be hard. Thumbly gives you headless logic, ready-made UI, and a free
            backend—so you can focus on building.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button size="lg" asChild>
              <Link href="#how-it-works">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="#demo">Live Demo</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Why Thumbly?</h2>
            <p className="mt-4 text-muted-foreground text-lg max-w-[700px] mx-auto">
              Designed for the modern stack. Flexible, type-safe, and batteries-included.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <Card>
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 text-primary">
                  <Zap size={24} />
                </div>
                <CardTitle>Plug & Play UI</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                Drop in ready-made React components like <code>&lt;ThumblyBinary /&gt;</code> and start collecting
                feedback instantly. Accessible and themable by default.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-emerald-500/10 flex items-center justify-center mb-4 text-emerald-500">
                  <Server size={24} />
                </div>
                <CardTitle>Backend Agnostic</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                Use our &quot;Forever Free&quot; Supabase backend, your own API, or serverless functions. You own your
                data, always.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-violet-500/10 flex items-center justify-center mb-4 text-violet-500">
                  <BrainCircuit size={24} />
                </div>
                <CardTitle>Headless Core</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                100% logic separation. Build your own unique UI on top of our robust state management, persistence, and
                retry logic.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">How it works</h2>
            <p className="mt-4 text-muted-foreground text-lg">From zero to feedback in under 60 seconds.</p>
          </div>

          <div className="max-w-3xl mx-auto space-y-12">
            <div className="flex gap-6">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm z-10">
                  1
                </div>
                <div className="w-px h-full bg-border -my-2" />
              </div>
              <div className="flex-1 pb-8">
                <h3 className="text-xl font-semibold mb-4">Install the package</h3>
                <CodeBlock code={installCode} language="bash" />
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm z-10">
                  2
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-4">Drop it in your component</h3>
                <CodeBlock code={usageCode} language="tsx" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section id="demo" className="py-24 bg-muted/50">
        <div className="container px-4 md:px-6 text-center">
          <div className="mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Live Demo</h2>
            <p className="mt-4 text-muted-foreground text-lg">
              Experience the interaction. This is a real component connected to our Supabase backend.
            </p>
          </div>

          <div className="max-w-xl mx-auto">
            <Card className="bg-background">
              <CardContent className="pt-12 pb-8">
                <h3 className="text-xl font-semibold mb-8">Is this toolkit useful to you?</h3>

                {isConfigured ? (
                  <div className="flex justify-center scale-125 mb-8">
                    <ThumblyBinary
                      surveyId={surveyId}
                      supabase={{ url: supabaseUrl, key: supabaseKey }}
                      style={{ gap: "1.5rem" }}
                    />
                  </div>
                ) : (
                  <div className="text-muted-foreground mb-8">Please configure .env.local to enable the demo.</div>
                )}

                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <Check size={14} className="text-green-500" />
                  Data is persisted to Supabase
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
