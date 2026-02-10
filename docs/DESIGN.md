# System Design Document: Thumbly

## Project Name: Thumbly

**Type:** Toolkit for Quick Sentiment Surveys (Votes, Star Ratings, NPS)

**Version:** 0.1.0

**Status:** Beta / Implementation

## 1. Executive Summary

Thumbly is a toolkit for adding quick feedback surveys—like thumbs up/down, star ratings, or NPS—to your apps in minutes. It provides a "batteries-included" system that balances ready-made UI with complete developer flexibility.

The architecture adopts a Modular Toolkit model within a Monorepo. Unlike traditional "headless" tools that force you to build your own UI, or "widget" tools that force a specific design, Thumbly provides both. Developers can use `@thumbly/react` for instant, customizable UI components, or use the core logic in `@thumbly/core` to build something entirely unique. The system remains Backend Agnostic, allowing data routing to the provided "Forever Free" managed service, a custom API, or internal infrastructure.

Complementing the toolkit is a static Web Platform hosted on GitHub Pages, which serves as the marketing, documentation, and management hub.

## 2. Core Architecture Principles

### 2.1 Monorepo Structure

We utilize `pnpm` workspaces and `turbo` repo for efficient build and dependency management.

- `apps/web`: A static Next.js site (Marketing, Docs & Dashboard).
- `packages/core`: Framework-agnostic core logic (The "Brain").
- `packages/react`: React UI components and hooks (The "Face").
- `infra/supabase`: Supabase configuration, migrations, and seed data.

### 2.2 The "Plug & Play" Philosophy

Thumbly provides the entire stack but allows any layer to be swapped out:

- **UI Layer:** Use `@thumbly/react` for ready-made components or build your own.
- **Logic Layer:** Use `@thumbly/core` to handle state, retries, and storage.
- **Data Layer:** Use the default managed service or "Bring Your Own Backend" (BYOB).

### 2.3 Backend Deployment Models

Thumbly supports two distinct deployment models for the backend data layer:

- **Managed Service (SaaS):**
  - Developers use the Thumbly API (hosted on a shared Supabase instance).
  - **Pros:** Zero setup, instant API keys, handled upgrades.
  - **Cons:** Rate limits apply, shared infrastructure.
- **Bring Your Own Backend (BYOB):**
  - Developers plug in their own backend (whether Supabase or a custom API) by providing their own credentials or driver.
  - **Pros:** Full control, no rate limits, data ownership.
  - **Cons:** Requires managing your own infrastructure.
  - _Note:_ While Thumbly is open source, we do not officially distribute a "self-hosted" version of the platform. The `infra/supabase` code in this repo is the source for our managed service.

## 3. Database Schema & Logic (Default Backend)

Note: This section applies only if using the default Supabase driver (Managed Service) or if you choose to replicate our schema in your own Supabase project.

### 3.1 Schema: `surveys` (Aggregate Only Strategy)

For the MVP, we utilize a **Single-Row High-Density** strategy. This ensures $O(1)$ storage cost per survey, maximizing the utility of the Supabase Free Tier.

- **Trade-off:** We store _totals_, not individual vote timestamps. Historical trends (e.g., "Votes per day") are not available in this schema version.
- **Extensibility:** The `ThumblyDriver` interface is agnostic to this schema. Future "Pro" versions can swap this backend for a time-series log without changing client code.

| Column Name     | Type        | Description                                    |
| :-------------- | :---------- | :--------------------------------------------- |
| `id`            | UUID        | Primary Key (Default: `gen_random_uuid()`).    |
| `option_1`      | INT4        | Atomic counter.                                |
| `option_2`      | INT4        | Atomic counter.                                |
| `option_3`      | INT4        | Atomic counter.                                |
| `option_4`      | INT4        | Atomic counter.                                |
| `option_5`      | INT4        | Atomic counter.                                |
| `last_activity` | TIMESTAMPTZ | Simple "liveness" tracking (Default: `now()`). |
| `owner_id`      | UUID        | Foreign Key to `auth.users`.                   |

### 3.2 Logic Abstraction: The RPC Layer

The Interface Contract (RPC): `submit_vote`

- **Input:** `survey_id` (UUID), `option_index` (int: 1-5)
- **Output:** `void` (Success) or `Error` (e.g., "Transient error" for retry).
- **Security:** `SECURITY DEFINER` allows public execution without direct table write access, bypassing RLS for the atomic update while maintaining integrity.

## 4. Client-Side Engineering (The SDK Ecosystem)

The client architecture uses the **Driver Pattern** to decouple logic from network transport.

### 4.1 `@thumbly/core` (The Brain)

A framework-agnostic library that handles the "difficult" parts of a feedback widget (state, debounce, persistence) without enforcing a specific backend.

**Core Responsibilities:**

- **State Management:** Tracks loading, success, error.
- **Persistence:** Checks `localStorage` using the namespaced key `thumbly:voted:{surveyId}` to see if the user has already voted (can be disabled).
- **Retry Logic:** Implements Exponential Backoff for transient errors (429, 5xx).
- **Driver Execution:** Delegates the actual network request to the configured Driver.

**The Driver Interface:**
To support any backend, the _core_ defines a strict contract:

```typescript
type VotePayload = {
  surveyId: string;
  optionIndex: number;
  metadata?: Record<string, any>; // Optional context
};

interface ThumblyDriver {
  submitVote(payload: VotePayload): Promise<void>;
}
```

**Built-in Drivers:**

- **SupabaseDriver (Default):**
  - Connects to the default managed service.
  - Uses `rpc('submit_vote')`.
- **FetchDriver (Generic):**
  - Sends a standard POST request to any URL provided by the developer.
  - Ideal for users with existing Next.js API routes or Express servers.
- **CustomDriver (Functional):**
  - Allows the developer to pass an async function directly.

### 4.2 `@thumbly/react` (The Face)

A React-specific wrapper offering three tiers of integration. Because it depends on `@thumbly/core`, it works seamlessly with any backend.

- **Hooks (`useThumbly`):**
  - Exposes `vote(index)`, `isLoading`, `error`, `hasVoted`.
  - Automatically manages React state based on the core logic.
- **Headless Components (`<Thumbly.Root>`, `<Thumbly.Option>`):**
  - Unstyled components that handle the wiring via React Context.
  - `Thumbly.Option` accepts an `index` prop (1-5) and handles the click event.
- **Presetted Components:**
  - `<ThumblyBinary />`: Configured to use Option 1 (Up) and Option 2 (Down).
  - `<ThumblyStarRating />`: Configured to use Options 1-5.
  - `<ThumblyNPS />`: Configured to use Options 1-3.
  - **Styling Strategy (Presets):** Built-in presets utilize a mix of **Tailwind CSS** (for layout/responsive) and **Inline Styles** (for default themes). All presets accept a `style` and `className` prop for developer customization.
  - **Styling Strategy (Headless):** Root and Option components are unstyled and purely structural.

## 5. Security & Privacy Model

### 5.1 No PII (GDPR/CCPA)

Thumbly remains privacy-native by default. It only tracks aggregate counts. No IP addresses, user agents, or PII are stored in the default schema.

### 5.2 Row Level Security (RLS)

Applies to Default Backend Only

- **Public Role:** Can EXECUTE `submit_vote` (via `SECURITY DEFINER` logic).
- **Developer Role:** Full CRUD on their own surveys via RLS policy: `auth.uid() = owner_id`.

## 6. Throughput & Scalability Strategy

### 6.1 Backend Agnostic Scaling

By decoupling the client, scaling becomes a choice for the developer:

- **Default Stack:** Relies on Supabase RPC performance (High throughput, atomic updates).
- **Custom Stack:** Relies on the developer's infrastructure (Unlimited flexibility).

## 7. The Thumbly Platform (Web Interface)

A static Next.js application hosted on GitHub Pages.

### 7.1 Architecture

- **Framework:** Next.js (Static Export).
- **Deployment:** Unified Static Site on GitHub Pages.
- **Routing Strategy:**
  - `thumbly.dev/` → Landing Page & Demo.
  - `thumbly.dev/docs/*` → Documentation.
  - `thumbly.dev/app/*` → Dashboard (Client-side SPA).
- **Styling:** Standard CSS + Tailwind CSS (using `lucide-react` for icons).
- **Auth:** Client-side only Supabase Auth (active only on `/app` routes).

### 7.2 Core Sections

- **Landing Page:**
  - Value Proposition ("A toolkit for adding quick surveys...").
  - "Quick Start" code snippets.
  - **Live Demo:** Interactive playground of UI components.
  - **Dogfooding:** A real Thumbly widget connected to the default managed service.
- **Documentation:**
  - **Format:** Next.js pages with Markdown content.
  - **API Reference:** Detailed guide for `@thumbly/core` and `@thumbly/react`.
  - **Guides:** Step-by-step tutorials for React, Core, and Custom Backends.
- **Dashboard (`/app`):**
  - **Auth:** GitHub/Email authentication via Supabase Auth.
  - **Survey Manager:**
    - **Create:** Initialize a new survey endpoint.
    - **Delete:** Remove a survey and its associated data.
    - **Reset:** Zero out all counters (preserving the ID).
    - **Export:** Download raw aggregate data as JSON.
  - **Analytics:** Integrated bar visualizations showing vote distribution across options.
  - **Snippet Generator:** Dynamic code snippets for Binary, StarRating, and NPS variants.

### 7.3 Infrastructure as Code (IaC)

We treat the Thumbly backend as code, managed via the **Supabase CLI**.

- **Folder:** `infra/supabase`.
- **Purpose:** Source code for the official Thumbly managed service.
- **Note:** These migrations are provided for transparency and development of the platform itself. While they can be used as a reference for building a compatible backend, they are not packaged as a self-hosting product.

## 8. Testing Strategy

To ensure reliability across the toolkit, we employ a multi-tiered testing approach.

- **Unit Testing (Vitest):**
  - Used in `@thumbly/core` to verify state transitions, retry logic, and persistence.
  - Used in `@thumbly/react` to verify hook behavior and component rendering.
- **End-to-End Testing (Playwright):**
  - Used in `apps/web` to verify the Dashboard authentication flow and critical user journeys.
- **Manual Verification:**
  - Continuous dogfooding on the official website.

## 9. Release Process

We use **Changesets** for automated versioning and package publishing.

- **Versioning Strategy:** **Fixed Versioning** across all packages.
- **Workflow:** `pnpm changeset` → `pnpm version-packages` → `pnpm release`.

## 10. Future Roadmap

- **Supabase Realtime:** Implementing live vote counter updates in the dashboard using Supabase Realtime.
- **Optimistic Updates:** Updating the React hook to assume success immediately for better UX.
- **Advanced Time-Series Analytics:** Optional logging table for historical data charts.
- **Custom Themes API:** A more robust way to define and apply themes to preset components.
- **Additional Presets:** Support for more feedback types (e.g., Sliders, Emoji pickers).
