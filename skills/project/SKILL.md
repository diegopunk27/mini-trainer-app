# React Template Base

---

name: project
description: >
Project overview and navigation for React Template Base (React 19 + TypeScript + Vite). Use when: Answering general project questions, explaining tech stack, navigating modules, or understanding architecture.
license: MIT
metadata:
author: template-team
version: "2.0.0"
scope: [root]
auto_invoke: - "General project questions" - "Project overview" - "What is this project" - "Tech stack questions" - "Module navigation" - "Where is the code for"
---

## Overview

React Template Base is a modular React + TypeScript starter for generic web applications.

**Stack:** React 19, TypeScript 6, Vite 8, MUI 9, SWR, AG Grid 36

---

## Quick Commands

```bash
npm run dev                  # Vite dev server
npm run build                # TypeScript + build
npm run test                 # Vitest tests
npm run lint                 # ESLint checks
npm run check-naming-convention  # Validate file names
```

---

## Project Structure

```
src/
├── modules/
│   ├── common/              # Shared (components, hooks, services, theme)
│   └── global/              # App shell (login, AppContext)
├── routes/                  # React Router config
└── assets/                  # SCSS global y static assets
```

**Pattern:** Each module has `pages/`, `components/`, `contexts/`, `hooks/`, `services/`, `interfaces/`

For complete module list, see [references/modules.md](references/modules.md).

---

## Key Principles

- **Self-contained modules:** Don't import from other modules (only from `/common/`)
- **Context API:** No Redux, use contexts for shared state
- **SWR:** Data fetching with caching
- **Path aliases:** `@common`, `@assets`

---

## Common Patterns

### Data Fetching

```typescript
import { useFetch } from '@common/hooks/useFetch';

const { data, error } = useFetch<Item[]>(
  () => '/api/items',
  () => getData('/api/items'),
);
```

### State Management

- **Local:** `useState`
- **Shared (3+ components):** Context API
- **Server:** SWR (automatic caching)

### Styling

- **MUI components** + `sx` prop
- **SCSS modules** for complex styles
- **Theme:** `src/modules/common/theme/app-theme.ts`

---

## Path Aliases

```typescript
import { useFetch } from '@common/hooks/useFetch';
import logo from '@assets/images/logo.png';
```

For complete list, see [references/path-aliases.md](references/path-aliases.md).

---

## Related Skills

| Skill        | Purpose                                |
| ------------ | -------------------------------------- |
| `components` | Component patterns, MUI integration    |
| `hooks`      | Custom hooks (useFetch, usePagination) |
| `modules`    | Module structure, contexts             |
| `services`   | HTTP services, API calls               |
| `naming`     | File naming conventions                |

---

## Resources

- [Tech Stack Details](references/tech-stack.md) - Complete stack breakdown
- [Module Guide](references/modules.md) - All feature modules explained
- [Path Aliases](references/path-aliases.md) - Complete alias list

---

**Remember**: Modules are self-contained. Only import from `/common/` or within the same module.
