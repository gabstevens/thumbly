# Thumbly

<p align="center">
  <strong>The Modular Sentiment Feedback Toolkit.</strong>
</p>

<p align="center">
  <a href="https://gabstevens.github.io/thumbly/">Website</a> •
  <a href="#-features">Features</a> •
  <a href="#-installation">Installation</a> •
  <a href="#-usage">Usage</a> •
  <a href="#-architecture">Architecture</a> •
  <a href="#-contributing">Contributing</a>
</p>

---

**Thumbly** is a comprehensive, "batteries-included" sentiment feedback system designed for maximum developer flexibility.

Developers shouldn't have to choose between an ugly iframe widget and building a feedback system from scratch. Thumbly provides the middle ground: **Headless logic**, **Ready-made UI**, and a **Free Backend**.

## 🌟 Features

- **🔌 Plug & Play:** Swap out the UI, logic, or data layer as needed.
- **⚛️ React Ready:** Beautiful, accessible components out of the box (`@thumbly/react`).
- **🧠 Headless Core:** 100% logic separation in `@thumbly/core` for custom implementations.
- **🚀 Forever Free Default:** Optional managed backend using Supabase (PostgreSQL).
- **🛡️ Privacy Native:** No PII collection by default. Only aggregate counts are stored.
- **🔒 Backend Agnostic:** Use our backend, your own API, or any serverless function.

## 📦 Packages

| Package | Description | Use Case |
| :--- | :--- | :--- |
| **`@thumbly/react`** | The "Face". Hooks & UI Components. | You use React and want a drop-in solution. |
| **`@thumbly/core`** | The "Brain". Framework-agnostic logic. | You use Vue/Svelte/Vanilla or want total control. |
| **`apps/web`** | The Platform. Docs & Dashboard. | You want to manage your surveys visually. |

## 📦 Installation

```bash
npm install @thumbly/react
# or
pnpm add @thumbly/react
# or
yarn add @thumbly/react
```

## 💻 Usage

### 1. The "Plug & Play" Way (React)

Import a preset component and drop it into your app.

```tsx
import { ThumblyBinary } from "@thumbly/react";

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

### 2. The "Headless" Way (Custom UI)

Use the `useThumbly` hook to build your own UI while keeping the robust state management.

```tsx
import { useThumbly } from "@thumbly/react";

function CustomFeedback() {
  const { vote, isLoading, hasVoted } = useThumbly({
    surveyId: "your-survey-uuid",
    // options...
  });

  if (hasVoted) return <p>Thanks!</p>;

  return (
    <button disabled={isLoading} onClick={() => vote(1)}>
      I like this 👍
    </button>
  );
}
```

## 🏗️ Architecture

Thumbly is designed as a Monorepo to ensure modularity.

- **Frontend:** Next.js (Static Export)
- **Database:** Supabase (PostgreSQL + RLS)
- **Testing:** Vitest & Playwright

For a deep dive into the system design, see [docs/DESIGN.md](./docs/DESIGN.md).

## 🤝 Contributing

We love contributions! Please read our [Contributing Guide](./CONTRIBUTING.md) to get started with setting up the development environment and submitting Pull Requests.

## 📄 License

Thumbly is [MIT licensed](./LICENCE).
