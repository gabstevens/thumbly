# Thumbly Implementation Todo

## 1. Documentation & Architecture (Done)

- [x] Create `docs/DESIGN.md` (Updated v1.5.2).
- [x] Create `AGENT.md`.
- [x] Initialize Monorepo (`pnpm workspace`, `turbo`).

## 2. Core Packages (Done)

- [x] Create `@thumbly/core` package (Renamed from `client`).
  - [x] Implement `ThumblyDriver` interface.
  - [x] Implement `SupabaseDriver`, `FetchDriver`, `CustomDriver`.
  - [x] Implement `ThumblyClient` logic (State, Retry, Persistence).
- [x] Update `@thumbly/react` package.
  - [x] Refactor to depend on `@thumbly/core`.
  - [x] Update hooks (`useThumbly`) and context (`ThumblyRoot`).
  - [x] Ensure presets (`ThumblyBinary`, `StarRating`, `NPS`) use the new client.

## 3. Infrastructure (Supabase) (In Progress)

- [x] Rename `backend` to `infra`.
- [x] Create migration `20260126001321_init_thumbly_schema.sql`.
  - [x] `surveys` table with UUID `id`.
  - [x] Atomic counter columns (`option_1`...`option_5`).
  - [x] `submit_vote` RPC function with `SECURITY DEFINER`.
  - [x] RLS policies for owner access.
  - [x] Create `seed.sql` for "Dogfooding" survey (`5468756d...`).
- [ ] **Auth Configuration:**
  - [x] Configure local Auth (Email/GitHub) in `infra/config.toml` for development.
  - [ ] Configure production Auth Providers and Site URLs in Supabase Dashboard.
  - [ ] Verify RLS policies correctly utilize `auth.uid()`.

## 4. Web Platform (`apps/web`) (In Progress)

- [x] Create `.env.example` with Supabase config placeholders.
- [x] Initialize Next.js app (Static Export).
- [x] Basic Layout (Standard CSS).
- [x] **Landing Page Implementation:**
  - [x] Hero Section (Value Prop).
  - [x] Features Section (Modular, Free, Forever).
  - [x] "How it Works" (Code Snippet display).
- [x] **Demo Section (`/`):**
  - [x] Import `@thumbly/react` components.
  - [x] Create a live interaction demo.
  - [x] **Dogfooding:** Implement a real `<ThumblyBinary />` or `<ThumblyNPS />` asking "Is Thumbly useful?" connected to our own Supabase backend.
  - [x] Show resulting state (e.g., "Thanks for voting").
- [ ] **Dashboard Implementation (`/app`):**
  - [ ] Setup Supabase Auth UI (Login/Sign up).
  - [ ] Create "My Surveys" view (List/Create).
  - [ ] Implement Analytics Charts (using lightweight chart lib or CSS).
  - [ ] Implement Snippet Generator.
- [ ] **Documentation (`/docs`):**
  - [ ] Create `docs/` route layout.
  - [ ] Write "Getting Started" guide.
  - [ ] Write "Self-Hosting" guide (Supabase CLI focus).
  - [ ] Write API Reference (Manual MDX).

## 5. Test Infrastructure Setup (Pending)

- [ ] **Unit Testing (Vitest):** Setup and configuration for `@thumbly/core` and `@thumbly/react`.
- [ ] **E2E Testing (Playwright):** Setup and configuration for `apps/web`.
- [ ] **Linting & formatting:** Ensure `pnpm lint` passes root-wide.

## 6. Community & Maintenance (In Progress)

- [x] Create `CONTRIBUTING.md`.
- [x] Refactor `README.md` for better clarity and marketing.
- [ ] **CI/CD & Release:**
  - [x] Create `ci.yml` (Build & Test).
- [x] Create `deploy.yml` (GitHub Pages).
- [ ] **Release Strategy (Changesets):**
  - [ ] Initialize changesets in root: `pnpm changeset init`.
  - [ ] Configure fixed versioning in `.changeset/config.json`.
  - [ ] Create `release` script in root `package.json`.
