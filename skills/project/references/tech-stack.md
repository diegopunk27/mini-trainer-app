# Tech Stack Details

---

## Core Framework

| Technology | Version | Purpose                 |
| ---------- | ------- | ----------------------- |
| React      | 19.2.8  | UI library              |
| TypeScript | 6.0.3   | Type safety             |
| Vite       | 8.2.2   | Build tool & dev server |

---

## UI & Styling

| Technology        | Version | Purpose                    |
| ----------------- | ------- | -------------------------- |
| Material-UI (MUI) | 9.3.1   | Component library          |
| SCSS              | 1.103   | Global styles (`@use`)     |
| Emotion           | 11.x    | CSS-in-JS (MUI dependency) |

---

## State & Data

| Technology    | Version | Purpose                 |
| ------------- | ------- | ----------------------- |
| SWR           | 2.5.1   | Data fetching & caching |
| React Context | -       | Local / shared UI state |
| Axios         | 1.19    | HTTP client             |

---

## Tables

| Technology    | Version | Purpose                   |
| ------------- | ------- | ------------------------- |
| AG Grid       | 36.1.0  | Data tables (Theming API) |
| AG Grid React | 36.1.0  | React wrapper             |

---

## Routing

| Technology       | Version | Purpose             |
| ---------------- | ------- | ------------------- |
| React Router DOM | 7.18.2  | Client-side routing |

---

## Dev Tools

| Technology         | Version | Purpose                 |
| ------------------ | ------- | ----------------------- |
| ESLint             | 10.9    | Lint (flat config)      |
| Vitest             | 4.1     | Unit testing            |
| Husky              | 9.x     | Git hooks               |
| naming-checker.mjs | -       | File naming enforcement |

---

## Key Configuration Files

| File                   | Purpose                         |
| ---------------------- | ------------------------------- |
| `vite.config.ts`       | Vite + Vitest                   |
| `tsconfig.json`        | TypeScript + path aliases       |
| `eslint.config.js`     | ESLint 10 flat                  |
| `folderStructure.json` | eslint-plugin-project-structure |
| `naming-checker.mjs`   | File naming validation          |

---

## Architecture Decisions

### Why React 19?

- `ref` es prop normal (menos `forwardRef`)
- Concurrent rendering y automatic batching ya estables
- Compatibilidad con MUI 9 y React Router 7

### Why Vite 8?

- Dev server rapido (Rolldown)
- Requiere `nodeLinker: node-modules` (no PnP)

### Why SWR over Redux?

- Cubre server state con cache y revalidacion
- UI state queda en Context / `useState`

### Why AG Grid 36 Theming API?

- Theme en JS (`themeQuartz.withParams`) en vez de overrides CSS legacy
- Compatible con el `GenericTable` del template
