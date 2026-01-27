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

## 3. Infrastructure (Supabase) (Done)

- [x] Rename `backend` to `infra`.
- [x] Create migration `20260126001321_init_thumbly_schema.sql`.
  - [x] `surveys` table with UUID `id`.
  - [x] Atomic counter columns (`option_1`...`option_5`).
  - [x] `submit_vote` RPC function with `SECURITY DEFINER`.
  - [x] RLS policies for owner access.
  - [x] Create `seed.sql` for "Dogfooding" survey (`5468756d...`).

## 4. Web Platform (`apps/web`) (In Progress)

- [x] Create `.env.example` with Supabase config placeholders.
- [x] Initialize Next.js app (Static Export).
- [x] Basic Layout (Standard CSS).
- [ ] **Landing Page Implementation:**
  - [ ] Hero Section (Value Prop).
  - [ ] Features Section (Modular, Free, Forever).
  - [ ] "How it Works" (Code Snippet display).
- [ ] **Demo Section (`/`):**
  - [x] Import `@thumbly/react` components.
  - [x] Create a live interaction demo.
  - [x] **Dogfooding:** Implement a real `<ThumblyBinary />` or `<ThumblyNPS />` asking "Is Thumbly useful?" connected to our own Supabase backend.
  - [x] Show resulting state (e.g., "Thanks for voting").
- [ ] **Dashboard Implementation (`/app`):**
  - [ ] Setup Supabase Auth UI (Login/Signup).
  - [ ] Create "My Surveys" view (List/Create).
  - [ ] Implement Analytics Charts (using lightweight chart lib or CSS).
  - [ ] Implement Snippet Generator.
- [ ] **Documentation (`/docs`):**
  - [ ] Create `docs/` route layout.
  - [ ] Write "Getting Started" guide.
  - [ ] Write "Self-Hosting" guide (Supabase CLI focus).
  - [ ] Write API Reference (Manual MDX).

## 5. Quality Assurance (Pending)

- [ ] **Unit Testing (Vitest):**
  - [ ] `@thumbly/core`: Mock `fetch` to test retry logic and backoff.
  - [ ] `@thumbly/core`: Test persistence (`localStorage`).
  - [ ] `@thumbly/react`: Render tests for presets.
- [ ] **E2E Testing (Playwright):**
  - [ ] `apps/web`: Test Dashboard login and survey creation.
- [ ] **Linting & formatting:** Ensure `pnpm lint` passes root-wide.

## 6. CI/CD & Release (Pending)

- [x] Create `ci.yml` (Build & Test).
- [x] Create `deploy.yml` (GitHub Pages).
- [ ] **Release Strategy (Changesets):**
  - [ ] Initialize changesets in root: `pnpm changeset init`.
  - [ ] Configure fixed versioning in `.changeset/config.json`.
  - [ ] Create `release` script in root `package.json`.
