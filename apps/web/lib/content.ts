import { Shield, Zap, Database, Server, Layout, Box } from "lucide-react";

const VERSION = process.env.NEXT_PUBLIC_APP_VERSION || "0.0.0";

export const SiteConfig = {
  name: "Thumbly",
  version: `v${VERSION}`,
  github: "https://github.com/gabstevens/thumbly",
  metadata: {
    title: "Thumbly - Quick feedback surveys in minutes",
    description: "Add quick feedback surveys—like thumbs up/down, star ratings, or NPS—to your apps in minutes.",
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
      plain: "Instant User Feedback",
      italic: "Simple & Private",
    },
    description: "Add quick feedback surveys—like thumbs up/down, star ratings, or NPS—to your apps in minutes.",
    cta: {
      primary: { label: "Get Started", href: "/docs" },
      secondary: { label: "Live Demo", href: "#demo" },
    },
  },
  demo: {
    question: "Do you like the Thumbly approach?",
    footer: "Real-time Feedback Demo",
  },
  why: {
    title: "Why Thumbly?",
    description: "Instant, fast, and private. Everything you need to collect feedback.",
    features: [
      {
        icon: Shield,
        title: "100% Private",
        desc: "Your thoughts are yours alone. No tracking, no analytics, no data harvesting. Ever.",
      },
      {
        icon: Zap,
        title: "Blazing Fast",
        desc: "Capture ideas at the speed of thought. Optimized architecture means minimal latency.",
      },
      {
        icon: Database,
        title: "Future-Proof Data",
        desc: "We store aggregate counts. Want raw data? Plug in your own backend anytime.",
      },
      {
        icon: Server,
        title: "Backend Agnostic",
        desc: "Use our default managed service, or plug in your own API with a simple driver.",
      },
      {
        icon: Layout,
        title: "Truly Open Source",
        desc: "MIT licensed and transparent. Join our community on GitHub.",
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
    description: "Add Thumbly to your app in minutes. Keep your feedback private, organized, and always accessible.",
    buttons: [
      { label: "Install Now", href: "/docs", primary: true },
      { label: "View on GitHub", href: "https://github.com/gabstevens/thumbly", primary: false },
    ],
  },
};

export const FooterContent = {
  description: "Add quick feedback surveys—like thumbs up/down, star ratings, or NPS—to your apps in minutes.",
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
