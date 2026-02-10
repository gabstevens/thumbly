# @thumbly/react

> The "Face" of the Thumbly ecosystem. Beautiful, accessible React components for sentiment feedback.

<p align="center">
  <a href="https://thumbly.dev">Website</a> •
  <a href="https://thumbly.dev/docs">Documentation</a> •
  <a href="https://github.com/gabstevens/thumbly">Repository</a>
</p>

**@thumbly/react** provides a collection of ready-made, customizable UI components and hooks to add sentiment feedback to your React applications in seconds.

## 🌟 Features

- **⚛️ High-Quality Presets:** Beautiful Binary (Up/Down), Star Rating, and NPS components out of the box.
- **🎨 Highly Customizable:** Style components using Tailwind CSS, standard CSS classes, or inline styles.
- **🎣 Robust Hooks:** Build your own UI from scratch using the `useThumbly` hook while keeping all the state logic.
- **♿ Accessible:** Fully accessible components following WAI-ARIA patterns.
- **🌙 Theme Aware:** Supports light and dark modes with minimal configuration.

## 📦 Installation

```bash
npm install @thumbly/react @thumbly/core
# or
pnpm add @thumbly/react @thumbly/core
# or
yarn add @thumbly/react @thumbly/core
```

## 💻 Usage

### 1. Using Presets (The "Plug & Play" Way)

Drop in a preset component. All state management and API calls are handled automatically.

```tsx
import { ThumblyBinary } from "@thumbly/react";

function App() {
  return (
    <ThumblyBinary
      surveyId="your-survey-uuid"
      // Optional: if using Bring Your Own Backend (BYOB)
      supabase={{
        url: "https://your-project.supabase.co",
        key: "your-anon-key",
      }}
    />
  );
}
```

### 2. Using the Hook (The "Headless" Way)

Build your own UI while leveraging Thumbly's core logic (persistence, retries, loading states).

```tsx
import { useThumbly } from "@thumbly/react";

function CustomWidget() {
  const { vote, isLoading, hasVoted, error } = useThumbly({
    surveyId: "your-survey-uuid",
  });

  if (hasVoted) return <p>Thanks for your feedback!</p>;

  return (
    <div className="flex gap-4">
      <button disabled={isLoading} onClick={() => vote(1)}>
        Love it! 😍
      </button>
      <button disabled={isLoading} onClick={() => vote(2)}>
        Needs work 🛠️
      </button>
      {error && <p>Something went wrong...</p>}
    </div>
  );
}
```

## 📦 Packages

| Component               | Description                        |
| :---------------------- | :--------------------------------- |
| `<ThumblyBinary />`     | Simple Up/Down (👍/👎) voting.     |
| `<ThumblyStarRating />` | Standard 5-star rating system.     |
| `<ThumblyNPS />`        | Net Promoter Score style feedback. |

## License

MIT
