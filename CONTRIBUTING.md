# Contributing to Thumbly

First off, thanks for taking the time to contribute! ❤️

All types of contributions are encouraged and valued. See the [Table of Contents](#table-of-contents) for different ways to help and details about how this project handles them.

## Table of Contents

- [Development Setup](#development-setup)
- [Project Structure](#project-structure)
- [Styleguides](#styleguides)

## Development Setup

This project is a **Monorepo** managed by [pnpm](https://pnpm.io/) and [Turbo](https://turborepo.dev/).

### Prerequisites

- [Node.js](https://nodejs.org/) (Latest LTS)
- [pnpm](https://pnpm.io/installation) (`corepack enable` or `npm i -g pnpm`)
- [Supabase CLI](https://supabase.com/docs/guides/cli) (Optional, for backend development)

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/gabstevens/thumbly.git
    cd thumbly
    ```

2.  **Install dependencies:**

    ```bash
    pnpm install
    ```

3.  **Start the development environment:**

    ```bash
    pnpm dev
    ```

    This will start the Next.js docs site (`apps/web`) and any package watchers in parallel.

4.  **(Optional) Start Local Backend:**
    If you are working on the infrastructure or need a full local stack:
    ```bash
    pnpm infra:up
    ```

### Building

To build all packages and apps:

```bash
pnpm build
```

## Project Structure

We use a standard Monorepo structure:

- **`apps/web`**: The documentation and dashboard site (Next.js).
- **`packages/core`**: Framework-agnostic client logic.
- **`packages/react`**: React hooks and components (depends on `@thumbly/core`).
- **`infra/supabase`**: Database migrations and configuration.

## Styleguides

### Commit Messages

We follow the **Conventional Commits** specification.

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that do not affect the meaning of the code (white-space, formatting, etc)
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `perf`: A code change that improves performance
- `test`: Adding missing tests or correcting existing tests
- `chore`: Changes to the build process or auxiliary tools

**Example:** `feat(react): add new ThumblyNPS component`

### Formatting

We use **Prettier**. Please ensure your code is formatted before committing:

```bash
pnpm format
```

## Release Process

We use [Changesets](https://github.com/changesets/changesets) to manage versioning.

1.  Run `pnpm changeset` to generate a changelog entry.
2.  Select the packages you modified.
3.  Select the bump type (major/minor/patch).
4.  Write a summary of changes.
5.  Commit the generated changeset file.
