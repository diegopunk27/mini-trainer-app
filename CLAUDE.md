# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

**IMPORTANT**: This is a supplementary guide. The authoritative development guidelines are in:

- **AGENTS.md** — Architecture, stack, commit/PR conventions
- **skills/** — Detailed patterns (components, hooks, services, ADO, etc.)

When performing tasks, check AGENTS.md first to auto-invoke relevant skills.

## Quick Commands

```bash
yarn dev                         # Vite dev server
yarn build                       # tsc + Vite build
yarn test --run                  # Vitest one-shot
yarn lint                        # ESLint flat (max 5 warnings)
yarn check-naming-convention     # naming-checker.mjs
yarn lint-check                  # naming + eslint
```

## Available Skills

Always check **AGENTS.md** for auto-invoke guidance. Key skills:

| Skill               | Use For                          |
| ------------------- | -------------------------------- |
| **project**         | Overview, stack, navigation      |
| **teaching**        | Explicar decisiones tecnicas     |
| **naming**          | Crear/renombrar archivos         |
| **components**      | UI, GenericTable, MUI            |
| **hooks**           | useFetch, usePagination          |
| **services**        | private-http.service             |
| **react-19**        | Hooks, ref-as-prop               |
| **material-ui**     | Theme, Grid size, sx             |
| **ag-grid**         | Theming API 36                   |
| **commit** / **pr** | Git conventions                  |
| **dev-***           | Flujos de tracker (ADO o Notion) |

## Architecture Overview

- Modular React 19 + TypeScript 6 + Vite 8
- UI: MUI 9 + Emotion + SASS
- Server state: SWR. UI state: Context / useState. Sin Redux.
- HTTP: Axios via `@common/services/http/private-http.service`
- Tables: AG Grid 36 Theming API (`src/modules/common/theme/ag-grid-theme.ts`)

## Code Conventions

- Folders kebab-case; components PascalCase; hooks camelCase; services `kebab-case.service.ts`
- Pre-commit: Husky + naming-checker + lint-staged
- ESLint: `eslint.config.js` (flat)

## Git

```
#NROTarea : TÍTULO DESCRIPTIVO EN MAYÚSCULAS
```

PRs against `development` with the Spanish template in skill `pr`.
