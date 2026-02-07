import { Shield, Zap, Database, Server, Layout, Box } from "lucide-react";

const VERSION = process.env.NEXT_PUBLIC_APP_VERSION || "0.0.0";

export const SiteConfig = {
  name: "Thumbly",
  version: `v${VERSION}`,
  github: "https://github.com/gabstevens/thumbly",
  metadata: {
    title: "Thumbly - Modular Sentiment Feedback Toolkit",
    description: "A comprehensive, batteries-included sentiment feedback system.",
  },
  navigation: [
    { label: "Docs", href: "/docs" },
    { label: "Dashboard", href: "/app" },
    { label: "API", href: "/docs/api" },
  ],
};

export const LandingContent = {
  hero: {
    badge: `Released v${VERSION}`,
    title: {
      plain: "Self-Hosted Feedback",
      italic: "Simple & Private",
    },
    description:
      "A lightweight, modular sentiment feedback toolkit for effortlessly capturing user thoughts. Open source, no tracking, free forever.",
    cta: {
      primary: { label: "Get Started", href: "/docs" },
      secondary: { label: "Live Demo", href: "#demo" },
    },
  },
  demo: {
    question: "How are you liking this redesign?",
    footer: "Connected to Supabase",
  },
  why: {
    title: "Why Thumbly?",
    description: "Self-hosted, fast, and private. Everything you need, nothing you don't.",
    features: [
      {
        icon: Shield,
        title: "100% Private",
        desc: "Your thoughts are yours alone. No tracking, no analytics, no data harvesting. Ever.",
      },
      {
        icon: Zap,
        title: "Blazing Fast",
        desc: "Capture ideas at the speed of thought. Local-first architecture means zero lag, even with thousands of notes.",
      },
      {
        icon: Database,
        title: "Future-Proof Format",
        desc: "Write in Markdown. Own your content forever. No proprietary formats or vendor lock-in, just plain text that lasts.",
      },
      {
        icon: Server,
        title: "Deploy Anywhere",
        desc: "From a Raspberry Pi to enterprise clusters. Thumbly runs everywhere you can run a container.",
      },
      {
        icon: Layout,
        title: "Truly Open Source",
        desc: "MIT licensed and transparent. Join over 1,000 contributors on GitHub.",
      },
      {
        icon: Box,
        title: "Free Forever",
        desc: "Every feature. Every update. No subscriptions, no tiers. Just free software for everyone.",
      },
    ],
  },
  cta: {
    title: "Ready to Get Started?",
    description:
      "Deploy your own Thumbly instance in minutes. Keep your feedback private, organized, and always accessible.",
    buttons: [
      { label: "Install Now", href: "/docs", primary: true },
      { label: "View on GitHub", href: "https://github.com/gabstevens/thumbly", primary: false },
    ],
  },
};

export const FooterContent = {
  description: "A lightweight, modular sentiment feedback toolkit. Open source, private, and free.",
  sections: [
    {
      title: "Product",
      links: [
        { label: "Docs", href: "/docs" },
        { label: "Dashboard", href: "/app" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Guide", href: "/docs/getting-started" },
        { label: "API", href: "/docs/api" },
      ],
    },
    {
      title: "Social",
      links: [{ label: "GitHub", href: "https://github.com/gabstevens/thumbly" }],
    },
  ],
  legal: {
    copyright: "© 2026 Thumbly Project. MIT Licensed.",
    links: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
    ],
  },
};
