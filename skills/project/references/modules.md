# Feature Modules Guide

Overview of the modules in this template.

---

## Module List

| Module   | Path               | Purpose                                      |
| -------- | ------------------ | -------------------------------------------- |
| `common` | `/modules/common/` | Shared components, hooks, services and theme |
| `global` | `/modules/global/` | App shell: login and `AppContext`            |

---

## Common Module

**Location:** `src/modules/common/`

**Purpose:** Shared code reused by feature modules.

```
common/
├── components/     # GenericTable, ConfirmDialog, LoadingErrorDisplay, ...
├── hooks/          # useFetch, usePagination, useHTTPMutation, ...
├── services/       # HTTP (private-http) y file
├── interfaces/     # Shared TypeScript interfaces
├── enums/          # Stubs de rol/permiso
├── theme/          # MUI theme + AG Grid theme
└── utils/          # helpers, validators, toast
```

**Key components:** `GenericTable`, `ConfirmDialog`, `LoadingErrorDisplay`, `SearchFilters`, `Attachments`

**Key hooks:** `useFetch`, `usePagination`, `useFormValidation`, `useHTTPMutation`

---

## Global Module

**Location:** `src/modules/global/`

**Purpose:** Cross-cutting app state and public pages (login).

---

## Module Structure Pattern

```
modules/{name}/
├── pages/
├── components/
├── contexts/
├── hooks/
├── services/
├── interfaces/
├── enums/
├── constants/
└── styles/
```

---

## Adding New Modules

See the `modules` skill. Add a path alias in `tsconfig.json` and `vite.config.ts`.
