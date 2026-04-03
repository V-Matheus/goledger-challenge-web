# Project: GoLedger Challenge - IMDB-like TV Shows Catalog

## Overview

Web interface for a blockchain application. An IMDB-like catalog for TV Shows with series, seasons, episodes, and watchlist management.

## Stack

- **Framework:** Next.js 16 (App Router) with TypeScript
- **Styling:** Tailwind CSS 4 + Tailwind Variants + Tailwind Merge
- **Data fetching:** Server Actions + TanStack React Query + Axios
- **Icons:** Lucide React
- **Testing:** Vitest (unit/integration) + Playwright (e2e) + MSW (API mocking)
- **Linting/Formatting:** Biome
- **Storybook:** Component documentation and visual testing
- **Package Manager:** Yarn
- **Node:** v24.14.1 (see `.nvmrc`)

## API

- **Base URL:** `http://ec2-50-19-36-138.compute-1.amazonaws.com`
- **Swagger:** `http://ec2-50-19-36-138.compute-1.amazonaws.com/api-docs/index.html`
- **Auth:** Basic Auth (credentials provided separately)

### Asset Types

- `tvShows` — TV series
- `seasons` — Seasons of a TV show
- `episodes` — Episodes of a season
- `watchlist` — User watchlist entries

### Key Endpoints

- `POST /api/query/getSchema` — Get schema info (optionally pass `{ "assetType": "<type>" }`)
- `POST /api/query/search` — Search assets (payload: `{ "query": { "selector": { "@assetType": "<type>" } } }`)
- `POST /api/query/readAsset` — Read a specific asset
- CRUD operations available via the API for Create, Update, Delete, and Search

## Requirements

- Add, remove, edit, and list all: TV Shows, Seasons, Episodes, and Watchlists
- Clean and polished UI

## Architecture

```
app/
├── (app)/                    → Route group: main app layout (header, sidebar, etc.)
│   ├── layout.tsx
│   ├── _components/          → Shared components for (app) layout (Header, Sidebar, etc.)
│   ├── page.tsx              → Home / Dashboard
│   ├── tv-shows/
│   │   ├── page.tsx          → List all TV shows
│   │   ├── actions.ts        → Server Actions for tv-shows (create, update, delete)
│   │   ├── _components/      → Domain components (TvShowCard, SeasonList, EpisodeRow, etc.)
│   │   └── [id]/
│   │       └── page.tsx      → TV show details (seasons, episodes)
│   └── watchlist/
│       ├── page.tsx          → User watchlist
│       ├── actions.ts        → Server Actions for watchlist
│       └── _components/      → Domain components (WatchlistItem, etc.)
├── globals.css               → Tailwind imports + CSS variables (theme)
├── layout.tsx                → Root layout (html, body, fonts)
└── not-found.tsx             → 404 page
components/
└── ui/                       → Reusable UI primitives (Button, Input, Card, Modal, etc.)
hooks/                        → Custom React hooks (useDebounce, useMediaQuery, etc.)
lib/
├── api/                      → API client, endpoints, request helpers
│   ├── client.ts             → Axios instance with base URL + Basic Auth
│   ├── tv-shows.ts           → CRUD functions for tvShows
│   ├── seasons.ts            → CRUD functions for seasons
│   ├── episodes.ts           → CRUD functions for episodes
│   └── watchlist.ts          → CRUD functions for watchlist
├── queries/                  → TanStack Query hooks (reads: list, get by id)
│   ├── tv-shows.ts
│   ├── seasons.ts
│   ├── episodes.ts
│   └── watchlist.ts
├── utils.ts                  → General utility functions (cn, formatters, etc.)
└── types.ts                  → Shared TypeScript types/interfaces
stories/                      → Storybook stories
tests/
├── mocks/                    → MSW handlers and server setup (API mocking for integration tests)
├── unit/                     → Unit tests (Vitest)
├── integration/              → Integration tests (Vitest + MSW)
├── e2e/                      → End-to-end tests (Playwright)
└── results/                  → Generated test results and coverage (gitignored)
public/                       → Static assets (images, favicon)
.claude/
├── agents/                   → Claude Code agents (design-to-react)
├── commands/                 → Slash commands (/design-to-react)
└── hooks/                    → Post-tool-use hook (biome + typecheck)
.github/
└── workflows/                → CI pipeline (lint, typecheck, test, e2e, build)
.husky/                       → Git hooks (pre-commit: lint-staged + tsc, commit-msg: commitlint)
```

### Key decisions

- **Route group `(app)`** — wraps all authenticated pages with shared layout (header/sidebar), keeps root layout clean
- **Private folders `_components`** — domain components colocated with their route, won't become routes
- **`components/ui/`** — design system primitives only, documented in Storybook
- **`lib/api/`** — Axios client + CRUD functions per asset type, used by both Server Actions and queries
- **Server Actions colocated** — `actions.ts` files live inside their route folder (e.g. `app/(app)/tv-shows/actions.ts`), with `'use server'` directive, following Next.js conventions
- **`lib/queries/`** — TanStack Query hooks for reads (list, get), handles caching, revalidation and loading states
- **`lib/types.ts`** — single source of truth for shared types
- **`hooks/`** — top-level, shared across all features

### Data flow

```
Read (client-side):
  Client component → useQuery hook (lib/queries/) → lib/api/ (Axios) → External API

Write (server-side):
  Client component → Server Action (app/.../actions.ts) → lib/api/ (Axios) → External API
```

- **Queries** are called directly in client components via TanStack Query hooks — handles cache, loading, refetch, and error states
- **Mutations** go through Server Actions colocated in the route folder — run on the server, can use `revalidatePath`/`revalidateTag` and redirect
- **`lib/api/`** is the shared layer — both queries and actions use the same Axios CRUD functions

## Scripts

- `yarn dev` — Start dev server
- `yarn build` — Production build
- `yarn test` — Vitest in watch mode
- `yarn test:run` — Vitest single run
- `yarn test:run --coverage` — Vitest with coverage
- `yarn test:e2e` — Playwright e2e tests
- `yarn lint` — Biome (lint + format check)
- `yarn lint:fix` — Biome with auto-fix
- `yarn format` — Biome format
- `yarn storybook` — Start Storybook on port 6006
- `yarn build-storybook` — Build static Storybook

## Conventions

- **Commits:** Conventional Commits enforced via commitlint (`feat:`, `fix:`, `chore:`, etc.)
- **File naming:** PascalCase for components (`Button.tsx`), lowercase with hyphens for non-components
- **Exports:** Always named exports, never default export
- **Components:** Use `tailwind-variants` for variants, `tailwind-merge` for class merging, `data-slot` for identification
- **Docker:** Multi-stage Dockerfile with standalone output, `docker compose up --build` to run
