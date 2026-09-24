# Mini-Trainer App - AI Agent Guidelines

## How to Use This Guide

This file provides AI agents with project-specific guidelines and skills for working on **Mini-Trainer PWA del alumno**.

**Start here** for cross-cutting norms and navigation. For specific patterns, invoke the skills listed below.

---

## Available Skills

Use these skills for detailed patterns on-demand:

### Project Skills

| Skill        | Description                                             | URL                                    |
| ------------ | ------------------------------------------------------- | -------------------------------------- |
| `project`    | Project overview, tech stack, module navigation         | [SKILL.md](skills/project/SKILL.md)    |
| `teaching`   | Teaching mode - explains decisions and reasoning        | [SKILL.md](skills/teaching/SKILL.md)   |
| `naming`     | File/folder naming conventions (enforced by pre-commit) | [SKILL.md](skills/naming/SKILL.md)     |
| `components` | Component patterns, MUI integration, styling            | [SKILL.md](skills/components/SKILL.md) |
| `hooks`      | Custom hooks patterns (useFetch, usePagination, etc.)   | [SKILL.md](skills/hooks/SKILL.md)      |
| `modules`    | Module structure, contexts, feature organization        | [SKILL.md](skills/modules/SKILL.md)    |
| `services`   | HTTP services, API calls, private-http.service          | [SKILL.md](skills/services/SKILL.md)   |
| `commit`     | Git commit conventions with task number extraction      | [SKILL.md](skills/commit/SKILL.md)     |
| `pr`         | Pull request creation and template guidelines           | [SKILL.md](skills/pr/SKILL.md)         |
| `docs`       | Documentation standards                                 | [SKILL.md](skills/docs/SKILL.md)       |
| `pwa-offline` | Registro offline de la PWA                            | [SKILL.md](skills/pwa-offline/SKILL.md) |
| `skill-sync` | Sync skill metadata to AGENTS.md                        | [SKILL.md](skills/skill-sync/SKILL.md) |

### Technical Stack Skills

| Skill         | Description                               | URL                                     |
| ------------- | ----------------------------------------- | --------------------------------------- |
| `typescript`  | TypeScript patterns, interfaces, generics | [SKILL.md](skills/typescript/SKILL.md)  |
| `react-19`    | React 19 patterns, hooks, performance     | [SKILL.md](skills/react-19/SKILL.md)    |
| `material-ui` | Material-UI v9 patterns, theming          | [SKILL.md](skills/material-ui/SKILL.md) |
| `vitest`      | Vitest testing patterns                   | [SKILL.md](skills/vitest/SKILL.md)      |
| `ag-grid`     | AG Grid 36 Theming API                    | [SKILL.md](skills/ag-grid/SKILL.md)     |

### Azure DevOps Skills

| Skill                  | Description                   | URL                                              |
| ---------------------- | ----------------------------- | ------------------------------------------------ |
| `dev-common`           | Config ADO, MCP contracts     | [SKILL.md](skills/dev-common/SKILL.md)           |
| `dev-tasks`            | Descomponer US en Tasks       | [SKILL.md](skills/dev-tasks/SKILL.md)            |
| `dev-plan-execution`   | Ejecutar plan de una Task     | [SKILL.md](skills/dev-plan-execution/SKILL.md)   |
| `dev-estimation`       | Estimacion por arquetipos     | [SKILL.md](skills/dev-estimation/SKILL.md)       |
| `dev-code-review`      | Code review Task / Diff       | [SKILL.md](skills/dev-code-review/SKILL.md)      |
| `dev-bug-fix-tasks`    | Diagnosticar Bug y crear Task | [SKILL.md](skills/dev-bug-fix-tasks/SKILL.md)    |
| `dev-testing-strategy` | Diseno de tests               | [SKILL.md](skills/dev-testing-strategy/SKILL.md) |
| `dev-sprint-review`    | Metricas de sprint            | [SKILL.md](skills/dev-sprint-review/SKILL.md)    |

### Auto-invoke Skills

When performing these actions, ALWAYS invoke the corresponding skill FIRST:

| Action                                                           | Skill                  |
| ---------------------------------------------------------------- | ---------------------- |
| Adding a component                                               | `components`           |
| Implementing offline workout logging                             | `pwa-offline`          |
| Syncing the outbox after reconnect                               | `pwa-offline`          |
| Adding a feature module                                          | `modules`              |
| Adding a hook                                                    | `hooks`                |
| After creating/modifying a skill                                 | `skill-sync`           |
| Aligning test coverage with a Task development plan              | `dev-testing-strategy` |
| Analyzing sprint metrics from an ADO CSV export                  | `dev-sprint-review`    |
| Breaking down a user story into Azure DevOps tasks               | `dev-tasks`            |
| Building an executable development plan per task                 | `dev-tasks`            |
| Calibrating estimation archetypes from sprint data               | `dev-sprint-review`    |
| Calling the API                                                  | `services`             |
| Column definitions                                               | `ag-grid`              |
| Committing changes                                               | `commit`               |
| Component composition                                            | `components`           |
| Create a PR with gh pr create                                    | `pr`                   |
| Creating API documentation                                       | `docs`                 |
| Creating React components                                        | `react-19`             |
| Creating UI components                                           | `material-ui`          |
| Creating a component                                             | `components`           |
| Creating a custom hook                                           | `hooks`                |
| Creating a fix Task linked to a Bug and its parent US            | `dev-bug-fix-tasks`    |
| Creating a git commit                                            | `commit`               |
| Creating a hook                                                  | `hooks`                |
| Creating a module                                                | `modules`              |
| Creating a new component                                         | `components`           |
| Creating a new module                                            | `modules`              |
| Creating a pull request                                          | `pr`                   |
| Creating a service                                               | `services`             |
| Creating a type                                                  | `typescript`           |
| Creating an interface                                            | `typescript`           |
| Creating and linking ADO tasks to a user story                   | `dev-tasks`            |
| Creating components                                              | `naming`               |
| Creating data tables                                             | `ag-grid`              |
| Creating hooks                                                   | `naming`               |
| Creating new files                                               | `naming`               |
| Creating new folders                                             | `naming`               |
| Creating services                                                | `naming`               |
| Custom cell renderers                                            | `ag-grid`              |
| Data fetching patterns                                           | `hooks`                |
| Deciding test layer and omit-list before implementing            | `dev-testing-strategy` |
| Designing a test strategy from acceptance criteria               | `dev-testing-strategy` |
| Diagnosing the root cause of a Bug before fixing it              | `dev-bug-fix-tasks`    |
| Estimating agentic development work in hours                     | `dev-estimation`       |
| Estimating an Azure DevOps task                                  | `dev-estimation`       |
| Evaluating a diff against architecture rules and stack decisions | `dev-code-review`      |
| Executing an Azure DevOps task development plan                  | `dev-plan-execution`   |
| Explaining code patterns                                         | `teaching`             |
| Feature architecture                                             | `modules`              |
| Filling pull request template                                    | `pr`                   |
| Fixing test failures                                             | `vitest`               |
| Form validation hooks                                            | `hooks`                |
| GET request                                                      | `services`             |
| General project questions                                        | `project`              |
| Generating PR description                                        | `pr`                   |
| Generating tasks with development plans from a US                | `dev-tasks`            |
| Grid configuration                                               | `ag-grid`              |
| Grid performance issues                                          | `ag-grid`              |
| HTTP requests                                                    | `services`             |
| Implementing a task from its ADO plan                            | `dev-plan-execution`   |
| Implementing new features                                        | `teaching`             |
| Layout issues with Grid/Box                                      | `material-ui`          |
| Loading RemainingWork estimate for a task                        | `dev-estimation`       |
| Loading project config for ADO flows                             | `dev-common`           |
| Making API calls                                                 | `services`             |
| Making technical decisions                                       | `teaching`             |
| Matching a task to an archetype for estimation                   | `dev-estimation`       |
| Mocking dependencies                                             | `vitest`               |
| Module navigation                                                | `project`              |
| Module organization                                              | `modules`              |
| Module structure                                                 | `modules`              |
| POST request                                                     | `services`             |
| Performance optimization                                         | `react-19`             |
| Planning a bug fix Task from an Azure DevOps Bug                 | `dev-bug-fix-tasks`    |
| Project overview                                                 | `project`              |
| React render issues                                              | `react-19`             |
| Reading Azure DevOps work items                                  | `dev-common`           |
| Refactoring code                                                 | `teaching`             |
| Refactoring components                                           | `components`           |
| Refactoring file structure                                       | `naming`               |
| Regenerate AGENTS.md Auto-invoke tables                          | `skill-sync`           |
| Renaming files or folders                                        | `naming`               |
| Resolving Azure DevOps project or repository IDs                 | `dev-common`           |
| Reviewing an Azure DevOps Task before closing it                 | `dev-code-review`      |
| Reviewing code                                                   | `teaching`             |
| Reviewing estimation accuracy at sprint close                    | `dev-sprint-review`    |
| Running a Task mode or Diff mode code review                     | `dev-code-review`      |
| Running a sprint retrospective report                            | `dev-sprint-review`    |
| Running step-by-step development of a planned task               | `dev-plan-execution`   |
| State management with hooks                                      | `react-19`             |
| Styling components                                               | `material-ui`          |
| Suggesting architectural changes                                 | `teaching`             |
| Tech stack questions                                             | `project`              |
| Test coverage issues                                             | `vitest`               |
| Testing components                                               | `vitest`               |
| Theme customization                                              | `material-ui`          |
| Troubleshoot why a skill is missing from AGENTS.md               | `skill-sync`           |
| Type definition                                                  | `typescript`           |
| Type safety                                                      | `typescript`           |
| TypeScript error                                                 | `typescript`           |
| Updating README files                                            | `docs`                 |
| Using MUI components                                             | `material-ui`          |
| Using React hooks                                                | `react-19`             |
| Using common components                                          | `components`           |
| Using generics                                                   | `typescript`           |
| Using useFetch                                                   | `hooks`                |
| Using usePagination                                              | `hooks`                |
| What is this project                                             | `project`              |
| Where is the code for                                            | `project`              |
| Working with GenericTable                                        | `components`           |
| Working with NavBar                                              | `components`           |
| Working with contexts                                            | `modules`              |
| Working with private-http.service                                | `services`             |
| Writing documentation                                            | `docs`                 |
| Writing technical guides                                         | `docs`                 |
| Writing tests                                                    | `vitest`               |
| Writing to Azure DevOps via MCP                                  | `dev-common`           |
| gh pr create                                                     | `pr`                   |
| git commit                                                       | `commit`               |
| useEffect problems                                               | `react-19`             |

---

## Project Overview

**React Template Base** is a modular React + TypeScript starter for generic web applications.

| Category          | Technology       | Version |
| ----------------- | ---------------- | ------- |
| **Framework**     | React            | 19.2.8  |
| **Language**      | TypeScript       | 6.0.3   |
| **Build Tool**    | Vite             | 8.2.2   |
| **Routing**       | React Router DOM | 7.18.2  |
| **UI Library**    | Material-UI      | 9.3.1   |
| **Styling**       | SASS + Emotion   | -       |
| **HTTP Client**   | Axios            | 1.19.0  |
| **Data Fetching** | SWR              | 2.5.1   |
| **Tables**        | AG Grid React    | 36.1.0  |
| **Testing**       | Vitest           | 4.1.11  |
| **Linting**       | ESLint (flat)    | 10.9.0  |

---

## Project Structure

```
src/
├── main.tsx
├── App.tsx
├── routes/
├── assets/
└── modules/
    ├── common/     # Shared components, hooks, services, theme
    └── global/     # Login + AppContext
```

**Module Pattern**: Each module is self-contained with `pages/`, `components/`, `contexts/`, `hooks/`, `services/`, `interfaces/`.

---

## Critical Rules

### 1. Teaching Mode (ALWAYS ACTIVE)

Explain WHY you make technical decisions. Reference project conventions. Be concise (1-3 sentences per decision).

### 2. Naming Conventions (ENFORCED BY PRE-COMMIT)

| Type           | Rule                    | Example                     |
| -------------- | ----------------------- | --------------------------- |
| **Folders**    | lowercase or kebab-case | `common/`, `exchange-rate/` |
| **Hooks**      | camelCase               | `useFetch.ts`               |
| **Components** | PascalCase              | `GenericTable.tsx`          |
| **Services**   | kebab-case + suffix     | `private-http.service.ts`   |
| **Interfaces** | kebab-case + suffix     | `item.interface.ts`         |
| **Enums**      | kebab-case + suffix     | `role.enum.ts`              |
| **Tests**      | name + `.test`          | `useFetch.test.ts`          |

### 3. Commit Conventions

```
#NROTarea : TÍTULO DESCRIPTIVO EN MAYÚSCULAS
```

Task number from branch name. Title in UPPERCASE Spanish.

### 4. Pull Request Conventions

Spanish template: Motivo de cambio, Cambios realizados, Impacto, Archivos clave, Tareas relacionadas. Target: `development`.

---

## Development Workflow

```bash
yarn dev                  # Vite dev server
yarn lint                 # ESLint (max 5 warnings)
yarn check-naming-convention
yarn build                # tsc + Vite 8
yarn test --run           # Vitest 4
```

### Git Workflow

1. Branch: `feature/{task-number}-description` or `bugfix/{task-number}-description`
2. Commit: skill `commit`
3. PR: skill `pr` against `development`

---

## Code Patterns

### State Management

No Redux. Use Context API for shared UI state, SWR for server state, `useState` for local state.

### Data Fetching

```typescript
import { useFetch } from '@common/hooks/useFetch';
import { getData, postData } from '@common/services/http/private-http.service';

const { data, error, isLoading } = useFetch<Item[]>('/api/items');
await postData<Item>('/api/items', payload);
```

### Common Components

Reusable under `/modules/common/components/`: `GenericTable`, `ConfirmDialog`, `LoadingErrorDisplay`, `SearchFilters`, `Attachments`, `PageTitleContainer`.

Check if a common component exists before creating a new one.

---

## Path Aliases

| Alias       | Path                           |
| ----------- | ------------------------------ |
| `@common/*` | `./src/modules/common/*`       |
| `@assets/*` | `./src/assets/*`               |
| `@theme/*`  | `./src/modules/common/theme/*` |
| `@routes/*` | `./src/routes/*`               |

---

## Pre-commit Hooks

Husky runs `naming-checker.mjs` and lint-staged (ESLint + Prettier).

---

## TypeScript Guidelines

- Strict mode. Interfaces over types for object shapes. Generics for reusable hooks/components.
- Interface files: `*.interface.ts`. Enum files: `*.enum.ts`.

---

## Testing Guidelines

- Vitest + React Testing Library
- Tests in `/tests/` subdirectories as `*.test.ts(x)`
- Focus on user interactions, not implementation details

---

## When in Doubt

1. Check if a skill exists for the task
2. Look for similar code in `src/modules/common/`
3. Explain the reasoning (teaching mode)
4. Run `yarn check-naming-convention` before committing
