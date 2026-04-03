# Project: GoLedger Challenge - IMDB-like TV Shows Catalog

## Overview

Web interface for a blockchain application. An IMDB-like catalog for TV Shows with series, seasons, episodes, and watchlist management.

## Stack

- **Framework:** Next.js 16 (App Router) with TypeScript
- **Styling:** Tailwind CSS 4 + Tailwind Variants + Tailwind Merge
- **Data fetching:** Server Actions + TanStack React Query + Axios
- **Validation:** Zod 4 (server-side form validation in Server Actions)
- **Icons:** Lucide React
- **Testing:** Vitest (unit/integration) + Playwright (e2e) + MSW (API mocking)
- **Linting/Formatting:** Biome
- **Storybook:** Component documentation and visual testing
- **Package Manager:** Yarn
- **Node:** v24.14.1 (see `.nvmrc`)

## API

- **Base URL:** Configured via `API_URL` env var (server-only, never exposed to client)
- **Swagger:** See API docs for endpoint reference
- **Auth:** Basic Auth via `API_USERNAME`/`API_PASSWORD` env vars (server-only)
- **Proxy:** Client-side requests go through `/api/proxy` Route Handler — credentials and API URL are never exposed to the browser

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
├── api/proxy/[...path]/      → Route Handler: API proxy (hides credentials + base URL from client)
├── _components/              → Shared client components for root pages (DashboardContent)
├── page.tsx                  → Home / Dashboard (Server Component with prefetch)
├── layout.tsx                → Root layout (reads theme cookie, sets data-theme on <html>)
├── tv-shows/
│   ├── page.tsx              → List all TV shows (Server Component with prefetch)
│   ├── actions.ts            → Server Actions with Zod validation (create, update, delete)
│   ├── _components/          → Domain components (TvShowsContent, TvShowGrid, TvShowActions, ShowCard)
│   └── [id]/
│       ├── page.tsx          → TV show details (Server Component with prefetch)
│       └── _components/      → Detail components (TvShowDetailContent, SeasonSection, SeasonActions)
├── watchlist/
│   ├── page.tsx              → User watchlist (Server Component with prefetch)
│   ├── actions.ts            → Server Actions with Zod validation
│   ├── _components/          → Domain components (WatchlistContent, WatchlistList, WatchlistActions)
│   └── [id]/
│       ├── page.tsx          → Watchlist details (Server Component with prefetch)
│       └── _components/      → Detail components (WatchlistDetailContent, AddShowButton)
├── globals.css               → Tailwind imports + CSS variables (theme) + global scrollbar
├── not-found.tsx             → 404 page
components/
├── ui/                       → Reusable UI primitives (Button, Input, Card, Modal, Pagination, etc.)
├── layout/                   → Layout components (Header, Sidebar)
└── providers/                → App providers (AppProviders, ThemeProvider, QueryProvider)
hooks/
└── use-theme.ts              → Theme hook (syncs to cookie + localStorage + DOM)
lib/
├── api/                      → API client + CRUD functions per asset type
│   ├── client.ts             → Axios instance (server: direct API, client: /api/proxy)
│   ├── tv-shows.ts           → CRUD functions for tvShows
│   ├── seasons.ts            → CRUD functions for seasons
│   ├── episodes.ts           → CRUD functions for episodes
│   └── watchlist.ts          → CRUD functions for watchlist
├── queries/                  → TanStack Query hooks (reads: list, get by id)
│   ├── tv-shows.ts
│   ├── seasons.ts
│   ├── episodes.ts
│   └── watchlist.ts
├── schemas/                  → Zod validation schemas + ActionState type
│   ├── action-state.ts       → Shared ActionState type for form actions
│   ├── tv-shows.ts           → Create/Update TV show schemas
│   ├── seasons.ts            → Create/Update season schemas
│   ├── episodes.ts           → Create/Update episode schemas (includes RFC3339 date transform)
│   └── watchlist.ts          → Create/Update watchlist schemas
├── utils.ts                  → General utility functions (cn, formatters, etc.)
└── types.ts                  → Shared TypeScript types/interfaces
stories/                      → Storybook stories
tests/
├── helpers/                  → Test utilities (renderWithProviders with QueryClientProvider)
├── mocks/                    → MSW handlers and server setup (API mocking for integration tests)
├── unit/                     → Unit tests (Vitest) — includes api/, queries/ subdirectories
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

- **Server-side prefetch with HydrationBoundary** — Pages are Server Components that prefetch data with `QueryClient` + `dehydrate`, wrapped in `<HydrationBoundary>`. Client components use `useQuery` hooks and get instant data without loading flash.
- **API Proxy Route Handler** — `app/api/proxy/[...path]/route.ts` proxies all client-side API requests, hiding the external API URL and credentials from the browser. Server-side code (prefetch, actions) calls the API directly.
- **Axios client split** — `lib/api/client.ts` exports a single `api` instance that points to the external API on the server (`typeof window === "undefined"`) or `/api/proxy` on the client.
- **Form actions with `useActionState`** — All forms use native `<form action>` with React 19's `useActionState` for pending states, validation errors, and data persistence on error.
- **Zod validation in Server Actions** — Actions receive `FormData`, validate with Zod schemas, return `ActionState` with `fieldErrors` and `data` (submitted values preserved on error). Date transforms (e.g. `YYYY-MM-DD` → RFC3339) are handled in Zod schemas, not in components.
- **`.bind()` for passing context to actions** — Extra data (keys, IDs, references) is passed to server actions via `.bind(null, arg)` instead of hidden inputs. This is the official Next.js pattern.
- **`formKey` for form reset on success** — A `key` prop on `<form>` increments only on success, preventing React's native form reset from clearing fields on validation errors.
- **Theme via cookie** — Root layout reads a `theme` cookie server-side and sets `data-theme` on `<html>` to prevent flash. The `useTheme` hook syncs to cookie + localStorage + DOM on changes.
- **Private folders `_components`** — Domain components colocated with their route, won't become routes
- **`components/ui/`** — Design system primitives only, documented in Storybook
- **`lib/queries/`** — TanStack Query hooks for reads (list, get), handles caching, revalidation and loading states
- **`lib/types.ts`** — Single source of truth for shared types
- **`hooks/`** — Top-level, shared across all features

### Data flow

```
Read (SSR prefetch):
  Page (Server Component) → prefetchQuery → lib/api/ (Axios, direct) → External API
  → dehydrate → HydrationBoundary → Client component → useQuery (cache hit, instant)

Read (client refetch after mutation):
  Client component → useQuery refetch → lib/api/ (Axios) → /api/proxy → Route Handler → External API

Write (form submission):
  <form action> → useActionState → Server Action → Zod validation → lib/api/ (Axios, direct) → External API
  → ActionState { success, fieldErrors, data } → useEffect (invalidateQueries on success)
```

## Environment Variables

```env
# Server-only (never exposed to client)
API_URL=http://ec2-50-19-36-138.compute-1.amazonaws.com
API_USERNAME=<username>
API_PASSWORD=<password>
```

## Scripts

- `yarn dev` — Start dev server
- `yarn build` — Production build
- `yarn test` — Vitest in watch mode
- `yarn test:run` — Vitest single run
- `yarn test:run --coverage` — Vitest with coverage (minimum 85% lines)
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
- **Forms:** Native `<form action>` + `useActionState` + Zod validation. No hidden inputs — use `.bind()` for context. No HTML validation attributes (`min`, `max`) — Zod handles all validation.
- **No inline scripts:** Never use `dangerouslySetInnerHTML` or inline `<script>` tags
- **Docker:** Multi-stage Dockerfile with standalone output, `docker compose up --build` to run
