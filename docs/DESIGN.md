# System Design Document: Thumbly

## Project Name: Thumbly

**Type:** Modular Sentiment Feedback Toolkit

**Version:** 1.5.2

**Status:** Draft / Specification

## 1. Executive Summary

Thumbly is a comprehensive, "batteries-included" sentiment feedback system designed for maximum developer flexibility.

The architecture adopts a Modular Toolkit model within a Monorepo. Unlike traditional "headless" tools that force you to build your own UI, or "widget" tools that force a specific design, Thumbly provides both. Developers can use `@thumbly/react` for instant, customizable UI components, or use the core logic in `@thumbly/core` to build something entirely unique. The system remains Backend Agnostic, allowing data routing to the provided "Forever Free" Supabase stack, a custom API, or internal infrastructure.

Complementing the toolkit is a static Web Platform hosted on GitHub Pages, which serves as the marketing and documentation hub.

## 2. Core Architecture Principles

### 2.1 Monorepo Structure

We utilize `pnpm` workspaces and `turbo` repo for efficient build and dependency management.

- `apps/web`: A static Next.js site (Marketing & Docs).
- `packages/core`: Framework-agnostic core logic.
- `packages/react`: React UI components (depends on `client`).
- `infra/supabase`: Supabase configuration and migrations.

### 2.2 The "Plug & Play" Philosophy

Thumbly provides the entire stack but allows any layer to be swapped out:

- **UI Layer:** Use `@thumbly/react` for ready-made components or build your own.
- **Logic Layer:** Use `@thumbly/core` to handle state, retries, and storage.
- **Data Layer:** Use the provided Supabase backend (default) or "Bring Your Own Backend" (BYOB).

### 2.3 Backend Deployment Models

Thumbly supports two distinct deployment models for the backend data layer:

- **Managed Service (SaaS):**
  - Developers use the official Thumbly API (hosted on a shared Supabase instance).
  - **Pros:** Zero setup, instant API keys, handled upgrades.
  - **Cons:** Rate limits apply, shared infrastructure.
- **Self-Hosted (BYOB):**
  - Developers spin up their own Supabase project using the provided `backend/supabase` migrations.
  - **Pros:** Full control, RLS customization, direct database access.
  - **Cons:** Requires managing a Supabase project.

## 3. Database Schema & Logic (Default Backend)

Note: This section applies only if using the default Supabase driver. Custom backends can implement any schema they desire.

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
- **Security:** `SECURITY DEFINER` allows public execution without direct table write access.

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
  - Connects to the "Forever Free" Supabase backend.
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
  - Automatically manages React state based on the core events.
- **Headless Components (`<Thumbly.Root>`, `<Thumbly.Option>`):**
  - Unstyled components that handle the wiring via React Context.
  - `Thumbly.Option` accepts an `index` prop (1-5) and handles the click event.
- **Presetted Components:**
  - `<ThumblyBinary />`: Configured to use Option 1 (Up) and Option 2 (Down).
  - `<ThumblyStarRating />`: Configured to use Options 1-5.
  - `<ThumblyNPS />`: Configured to use Options 1-3.
  - **Styling Strategy (Presets):** Built-in presets utilize **Inline Styles** for zero-config "Plug & Play" usage. All presets accept a `style` and `className` prop for developer customization.
  - **Styling Strategy (Headless):** Root and Option components are unstyled and purely structural.

## 5. Security & Privacy Model

### 5.1 No PII (GDPR/CCPA)

Thumbly remains privacy-native by default. It only tracks aggregate counts.

### 5.2 Row Level Security (RLS)

Applies to Default Backend Only

- **Public Role:** Can EXECUTE `submit_vote` (via `SECURITY DEFINER` logic).
- **Developer Role:** Full CRUD on their own surveys via RLS policy: `auth.uid() = owner_id`.

## 6. Throughput & Scalability Strategy

### 6.1 Backend Agnostic Scaling

By decoupling the client, scaling becomes a choice for the developer:

- **Default Stack:** Relies on Supabase RPC performance (High throughput).
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
- **Styling:** Standard CSS (No Tailwind dependency to keep it lightweight).
- **Auth:** Client-side only Supabase Auth (active only on `/app` routes).

### 7.2 Core Sections

- **Landing Page:**
  - Value Proposition ("Batteries Included", "Modular").
  - "Quick Start" code snippets (npm install...).
  - **Live Demo:** Interactive playground of UI components.
  - **Dogfooding:** A real Thumbly widget asking "Do you like this tool?" to collect actual feedback on the project.
- **Documentation:**
  - **Format:** Standard Markdown + Next.js MDX.
  - **API Reference:** Manually maintained Markdown derived from source TSDoc.
  - **Guides:** Step-by-step tutorials for React, Core, and Custom Backends.
  - **Self-Hosting:** Instructions using **Supabase CLI** (IaC) rather than manual SQL execution.
  - **Dogfooding:** A real Thumbly widget asking "Do you like this tool?" to collect actual feedback on the project.

### 7.3 Infrastructure as Code (IaC)

We treat the Supabase backend as code, managed via the **Supabase CLI**.

- **Folder:** `infra/supabase` (renamed from `backend`).
- **Source of Truth:** `migrations/*.sql` and `config.toml`.
- **Scope:**
  - **Schema (Tables, RPCs, RLS):** Managed fully via Migrations.
  - **Auth/Project Config:** Managed via Dashboard (One-time setup), documented in the "Self-Hosting" guide.
- **Deployment:** `supabase db push`.
  - _Target:_ Users of the **Managed Service**.
  - **Auth:** Supabase Auth (GitHub/Email) against the official Thumbly instance.
  - **Survey Manager:**
    - **Create:** Generate a new UUID and initialize counters to 0.
    - **Delete:** Permanently remove a survey and its data.
    - **Reset:** Set all `option_x` counters back to 0 (preserving the ID).
    - **Export:** Download current aggregate data as JSON or CSV.
  - **Analytics:** Visual graphs (Bar/Pie) of `option_1`...`option_5` counts.
  - **Snippet Generator:** Dynamic code blocks pre-filled with the user's `surveyId`.

## 8. Testing Strategy

To ensure reliability across the toolkit, we employ a multi-tiered testing approach.

- **Unit Testing (Vitest):**
  - Used in `@thumbly/core` to verify state transitions, retry logic (via mocked timers/fetch), and persistence.
  - Used in `@thumbly/react` to verify hook behavior and component rendering.
- **End-to-End Testing (Playwright):**
  - Used in `apps/web` to verify the Dashboard authentication flow and critical user journeys (e.g., creating a survey).
- **Manual Verification:**
  - Performed via the "Dogfooding" widget on the Landing Page.

## 9. Release Process

We use **Changesets** for automated versioning and package publishing.

- **Versioning Strategy:** **Fixed Versioning**. All packages (`@thumbly/core`, `@thumbly/react`) share the same version number to ensure compatibility and simplify documentation.
- **Workflow:**
  1.  Feature/Fix development.
  2.  Run `pnpm changeset` to document the change.
  3.  Merge to `main`.
  4.  CI/CD bumps versions and publishes to NPM.

## 10. Future Roadmap

- **High-Concurrency Locking:** Implementing the "10ms Guard" logic inside the Supabase RPC function.
- **Optimistic Updates:** Updating the React hook to assume success immediately for better UX.
- **Advanced Time-Series Analytics:** Adding a separate log table for developers who need historical data charts.
- **Public Results API:** Optional `is_public` flag on surveys to allow the SDK to fetch and display live results to users.
