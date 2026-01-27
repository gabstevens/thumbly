# Thumbly Agent Context

You are an expert software engineer working on **Thumbly**, a modular sentiment feedback toolkit. Your goal is to maintain the high quality, flexibility, and "batteries-included" nature of this project.

## 🧭 Navigation & Structure

This project is a Monorepo managed by `pnpm` and `turbo`.

- **Root:** Configuration (`turbo.json`, `pnpm-workspace.yaml`).
- **`packages/core`:** The **Brain**. Framework-agnostic logic (State, Retry, Persistence).
  - _Key Files:_ `src/client.ts`, `src/drivers.ts`.
- **`packages/react`:** The **Face**. UI components.
  - _Key Files:_ `src/hooks/useThumbly.ts`, `src/components/presets/*.tsx`.
- **`apps/web`:** The **Showcase**. Static Next.js site (Marketing/Docs).
  - _Key Files:_ `app/page.tsx`, `app/globals.css`.
- **`infra/supabase`:** The **Spine**. Database schema and RPCs.
  - _Key Files:_ `migrations/*.sql`.

## 📜 Commandments

1.  **Consult `docs/DESIGN.md` FIRST:** This is the Source of Truth. Architecture changes must be reflected here.
2.  **Follow `docs/TODO.md`:** Work sequentially through the plan. Update status as you go.
3.  **Keep it "Plug & Play":** Ensure all components work out-of-the-box but remain overridable.
4.  **Minimal Dependencies:** especially in `apps/web` (No Tailwind, just CSS) and `@thumbly/core`.
5.  **Driver Pattern:** Always respect the separation between Logic (`ThumblyClient`) and Transport (`ThumblyDriver`).

## 🛠️ Development Workflow

- **Build:** `pnpm build` (Runs Turbo).
- **Dev:** `pnpm dev` (Runs Turbo).
- **Lint:** `pnpm lint`.
- **Commit:** Follow the "Why" over "What" rule.

## 💡 Context

Thumbly exists because developers shouldn't have to choose between "Ugly Iframe Widget" and "Building from Scratch". We provide the middle ground: **Headless logic + Presetted UI + Free Backend**.
