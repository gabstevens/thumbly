# Thumbly

**The open-source modular toolkit for sentiment feedback.**

Thumbly is a comprehensive, "batteries-included" sentiment feedback system designed for maximum developer flexibility. Unlike traditional "headless" tools that force you to build your own UI, or "widget" tools that force a specific design, Thumbly provides both.

The system is **Backend Agnostic**, allowing data routing to the provided "Forever Free" Supabase stack, a custom API, or internal infrastructure.

## 🌟 Core Principles

- **Plug & Play:** Swap out the UI (`@thumbly/react`), Logic (`@thumbly/core`), or Data layer as needed.
- **Forever Free Default:** Optional managed backend using Supabase (PostgreSQL) with atomic increments.
- **Privacy Native:** No PII collection by default.

## 📦 Packages

### `@thumbly/core` (The Brain)
The framework-agnostic logic layer. Handles state management, persistence (`localStorage`), and retry logic. Use this if you are using Vanilla JS, Svelte, Vue, or building a custom wrapper.

### `@thumbly/react` (The Face)
The React-specific wrapper containing hooks and UI components. It offers three tiers of integration:
1.  **Hooks:** Headless logic (`useThumbly`).
2.  **Headless Components:** Unstyled wiring (`<Thumbly.Root>`, `<Thumbly.Option>`).
3.  **Preset Components:** Ready-to-use UI (`<ThumblyBinary />`, `<ThumblyStarRating />`, `<ThumblyNPS />`).

### `apps/web` (Platform)
The centralized developer dashboard (Static Next.js Site) for documentation and survey management.

## 🚀 Quick Start

```bash
npm install @thumbly/react
```

### Usage (React)

```tsx
import { ThumblyBinary } from '@thumbly/react';

function App() {
  return (
    <ThumblyBinary
      surveyId="your-survey-uuid"
      supabaseUrl="https://your-project.supabase.co"
      supabaseKey="your-anon-key"
    />
  );
}
```

## 🛠️ Development

This repository is a monorepo managed by [Turborepo](https://turborepo.dev/).

### Setup

```bash
pnpm install
pnpm infra:up  # Starts local Supabase instance
```

### Build

To build all packages:

```bash
pnpm build
```

### Develop

To start watch mode for all packages + web app:

```bash
pnpm dev
```

### Architecture

For a deep dive into the system design, see [docs/DESIGN.md](./docs/DESIGN.md).

## 📄 License

Thumbly is [MIT licensed](./LICENCE).