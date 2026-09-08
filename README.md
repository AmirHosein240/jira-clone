# Jira Clone

A lightweight Jira-style project & task management dashboard built with React, TypeScript, and Material UI. It includes login-protected routes, a dashboard overview, and CRUD screens for projects, tasks, and users.

## Features

- **Authentication** — simple email/password login with a default demo profile, session persisted in `localStorage`, and protected routes that redirect unauthenticated users to `/login`.
- **Dashboard** — at-a-glance stat cards, recent tasks, and project progress widgets.
- **Projects** — list, create, update, and delete projects, each with a status (`Planning` / `Active` / `Completed`) and task count.
- **Tasks** — list, create, update, and delete tasks with status (`Todo` / `Done`) and priority (`Low` / `Medium` / `High`).
- **Users** — searchable, filterable, paginated user table with role (`Admin` / `Manager` / `Member`) and status (`Active` / `Inactive`).
- **Theming** — light/dark mode support via a custom theme context.
- **Data fetching & caching** — powered by TanStack Query.

> **Note:** Projects, tasks, and users are currently backed by the public [JSONPlaceholder](https://jsonplaceholder.typicode.com/) API for demo purposes, with data reshaped to fit this app's domain models. Writes (create/update/delete) succeed against the mock API but aren't persisted server-side. A `mockProjects` fixture is also included for local/offline use.

## Tech Stack

- **React 19** + **TypeScript**
- **Vite** — dev server & build tooling
- **React Router 7** — routing & protected routes
- **Material UI (MUI) 9** + **Emotion** — component library & styling
- **TanStack Query 5** — server-state management
- **Zustand** — client-side state management
- **Axios** — HTTP client
- **ESLint** — linting

## Getting Started

### Prerequisites

- Node.js (LTS recommended)
- npm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

This starts the Vite dev server (default: `http://localhost:5173`).

### Build

```bash
npm run build
```

Type-checks the project and builds an optimized production bundle.

### Preview production build

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

## Demo Login

The app ships with a default demo profile (created on first login attempt and stored in `localStorage`):

- **Email:** `admin@example.com`
- **Password:** `123456`

You can update this profile from within the app; changes are saved to `localStorage` under the `task_manager_profile` key.

## Project Structure

```
src/
├── app/                 # Router and app-level providers
├── components/          # Shared/reusable components
├── features/            # Feature modules (auth, dashboard, projects, tasks, users)
│   └── <feature>/
│       ├── api/         # API/service functions
│       ├── components/  # Feature-specific components
│       ├── hooks/       # Feature-specific hooks (React Query, etc.)
│       └── types/       # TypeScript types
├── layouts/             # Page layouts (dashboard shell, header, sidebar)
├── pages/                # Route-level page components
├── theme/                # Theme configuration & light/dark mode context
├── index.css
└── main.tsx
```

## Routes

| Path         | Description                       | Protected |
| ------------ | --------------------------------- | --------- |
| `/login`     | Login page                        | No        |
| `/dashboard` | Overview stats & recent activity  | Yes       |
| `/projects`  | Project list & management         | Yes       |
| `/tasks`     | Task list & management            | Yes       |
| `/users`     | User directory with search/filter | Yes       |

Unauthenticated users are redirected to `/login`; the root path (`/`) redirects to `/dashboard`.

## Deployment

Includes a `vercel.json` with an SPA rewrite rule, so it can be deployed directly to [Vercel](https://vercel.com/) with no extra configuration.

## License

No license file is currently included. Add one (e.g., MIT) if you plan to distribute or open-source this project.
