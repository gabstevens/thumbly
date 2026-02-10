# @thumbly/core

> The "Brain" of the Thumbly ecosystem. Framework-agnostic logic for sentiment feedback.

<p align="center">
  <a href="https://thumbly.dev">Website</a> •
  <a href="https://thumbly.dev/docs">Documentation</a> •
  <a href="https://github.com/gabstevens/thumbly">Repository</a>
</p>

**@thumbly/core** handles the complex parts of building a feedback widget—state management, persistence (preventing duplicate votes), and network retries—without enforcing any specific UI or backend.

## 🌟 Features

- **🧠 Framework Agnostic:** Works with React, Vue, Svelte, Angular, or Vanilla JS.
- **💾 Smart Persistence:** Automatically checks `localStorage` to prevent duplicate votes (configurable).
- **🔄 Robust Retry Logic:** Implements exponential backoff for transient network errors.
- **🔌 Driver Pattern:** Use the built-in Supabase driver, a generic Fetch driver, or write your own.

## 📦 Installation

```bash
npm install @thumbly/core
# or
pnpm add @thumbly/core
# or
yarn add @thumbly/core
```

## 💻 Usage

### Basic Usage (with Supabase)

If you are using the Thumbly managed service (or your own Supabase instance), it works out of the box.

```typescript
import { ThumblyClient } from "@thumbly/core";

const client = new ThumblyClient({
  surveyId: "your-survey-uuid",
  supabase: {
    url: "https://your-project.supabase.co",
    key: "your-anon-key",
  },
});

// Check if user already voted
if (client.hasVoted()) {
  console.log("Already voted!");
} else {
  // Submit a vote (Option 1)
  await client.vote(1);
}
```

### Custom Backend

If you have your own API, use the `FetchDriver`.

```typescript
import { ThumblyClient, FetchDriver } from "@thumbly/core";

const client = new ThumblyClient({
  surveyId: "your-survey-uuid",
  driver: new FetchDriver("https://api.example.com/votes"),
});

await client.vote(1);
```

## License

MIT
