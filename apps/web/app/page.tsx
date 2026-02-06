"use client";

import Link from "next/link";
import { ThumblyBinary } from "@thumbly/react";
import { CodeBlock } from "./components/CodeBlock";
import { ArrowRight, Settings } from "lucide-react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { LandingContent } from "@/lib/content";

export default function HomePage() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY || "";
  const surveyId = process.env.NEXT_PUBLIC_DOGFOOD_SURVEY_ID || "5468756d-626c-7930-0000-000000000000";

  const isConfigured = supabaseUrl && supabaseKey;

  return (
    <div className="flex flex-col gap-32">
      {/* Hero Section */}
      <section className="relative pt-10 text-center max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-[13px] font-medium text-primary mb-10"
        >
          <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
          {LandingContent.hero.badge}
          <ArrowRight size={14} className="ml-1" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="text-5xl md:text-7xl font-extrabold tracking-tight text-foreground mb-8"
        >
          {LandingContent.hero.title.plain} <br />
          <span className="text-primary italic">{LandingContent.hero.title.italic}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          {LandingContent.hero.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link
            href={LandingContent.hero.cta.primary.href}
            className="inline-flex h-12 items-center justify-center rounded-2xl bg-primary px-10 text-[15px] font-bold text-primary-foreground shadow-xl shadow-primary/20 transition-all hover:opacity-90 hover:scale-[1.02] active:scale-95"
          >
            {LandingContent.hero.cta.primary.label}
          </Link>
          <Link
            href={LandingContent.hero.cta.secondary.href}
            className="inline-flex h-12 items-center justify-center rounded-2xl border border-input bg-card px-10 text-[15px] font-bold text-foreground transition-all hover:bg-accent active:scale-95 shadow-sm"
          >
            {LandingContent.hero.cta.secondary.label} <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </motion.div>
      </section>

      {/* Browser Window Demo */}
      <motion.section
        id="demo"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-5xl mx-auto w-full px-4"
      >
        <div className="rounded-2xl border border-border bg-card shadow-xl overflow-hidden ring-1 ring-border">
          {/* Browser Toolbar */}
          <div className="flex items-center gap-4 px-4 py-3 bg-muted border-b border-border">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
              <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
              <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
            </div>
            <div className="flex-1 flex justify-center">
              <div className="bg-background rounded-lg px-4 py-1.5 text-[11px] text-muted-foreground flex items-center gap-2 w-full max-w-md justify-center border border-border font-mono uppercase tracking-wider">
                {LandingContent.demo.browserUrl}
              </div>
            </div>
            <div className="w-12" />
          </div>

          {/* Browser Content */}
          <div className="p-16 md:p-24 flex flex-col items-center justify-center bg-card relative">
            <h3 className="text-2xl font-bold mb-14 text-foreground text-center">{LandingContent.demo.question}</h3>

            <div className="relative group">
              <div className="absolute -inset-4 bg-primary/10 rounded-3xl blur-2xl group-hover:bg-primary/20 transition-all opacity-0 group-hover:opacity-100" />
              {isConfigured ? (
                <div className="relative scale-[1.3]">
                  <ThumblyBinary
                    surveyId={surveyId}
                    supabase={{ url: supabaseUrl, key: supabaseKey }}
                    style={{ gap: "2.5rem" }}
                  />
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-amber-500/10 text-amber-500 border border-amber-500/20 text-sm font-medium">
                  Demo requires .env configuration
                </div>
              )}
            </div>

            <div className="mt-20 flex items-center gap-3 text-[11px] text-muted-foreground font-bold uppercase tracking-widest bg-secondary px-5 py-2 rounded-full border border-border">
              <span className="flex h-2 w-2 rounded-full bg-primary" />
              {LandingContent.demo.footer}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Why Thumbly Section */}
      <section className="max-w-6xl mx-auto w-full px-4">
        <div className="text-center mb-20">
          <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary mx-auto flex items-center justify-center mb-8 border border-primary/20">
            <Settings size={28} />
          </div>
          <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight text-foreground">
            {LandingContent.why.title}
          </h2>
          <p className="text-muted-foreground text-xl max-w-2xl mx-auto font-medium">
            {LandingContent.why.description}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {LandingContent.why.features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="p-10 rounded-3xl border border-border bg-card hover:border-primary/20 transition-all group hover:-translate-y-1 shadow-sm"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-8 group-hover:scale-110 transition-transform border border-primary/20">
                <feature.icon size={22} strokeWidth={2.5} />
              </div>
              <h3 className="text-xl font-bold mb-4 text-foreground tracking-tight">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed text-[15px] font-medium">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="text-center py-32 bg-gradient-to-t from-primary/5 to-transparent border-t border-border/50 mt-20">
        <div className="max-w-3xl mx-auto px-4 flex flex-col items-center">
          <div className="w-20 h-20 rounded-[2rem] bg-gradient-to-br from-teal-400 to-emerald-600 flex items-center justify-center shadow-[0_0_40px_-5px_rgba(16,185,129,0.3)] mb-12">
            <img src="/logo.svg" alt="Thumbly" className="w-12 h-12 invert brightness-0" />
          </div>
          <h2 className="text-4xl md:text-6xl font-black mb-8 text-foreground tracking-tighter">
            {LandingContent.cta.title}
          </h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-xl font-medium">{LandingContent.cta.description}</p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center w-full max-w-md">
            {LandingContent.cta.buttons.map((btn, i) => (
              <Link
                key={i}
                href={btn.href}
                className={cn(
                  "flex-1 inline-flex h-14 items-center justify-center rounded-2xl text-lg font-bold transition-all",
                  btn.primary
                    ? "bg-primary text-primary-foreground font-black shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95"
                    : "border border-input bg-card text-foreground hover:bg-accent active:scale-95 shadow-sm",
                )}
              >
                {btn.label}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
