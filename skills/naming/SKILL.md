# Naming Conventions - React Template Base

---

name: naming
description: >
File and folder naming conventions enforced by naming-checker.mjs pre-commit hook. Use when: Creating files, folders, components, hooks, services, or renaming existing code.
license: MIT
metadata:
author: template-team
version: "2.0.0"
scope: [root]
auto_invoke: - "Creating new files" - "Creating new folders" - "Creating components" - "Creating hooks" - "Creating services" - "Renaming files or folders" - "Refactoring file structure"
---

## Critical Warning

**THESE RULES ARE ENFORCED BY `naming-checker.mjs` IN PRE-COMMIT HOOKS.**

Violating these rules will **fail your commit**. Follow them exactly.

---

## Quick Reference

| Type            | Rule                      | Example                        |
| --------------- | ------------------------- | ------------------------------ |
| **Folder**      | lowercase or kebab-case   | `suppliers/`, `exchange-rate/` |
| **Hook**        | camelCase                 | `useFetch.ts`                  |
| **Hook Test**   | camelCase + `.test`       | `useFetch.test.ts`             |
| **Component**   | PascalCase                | `GenericTable.tsx`             |
| **Entry Point** | lowercase                 | `app.tsx`, `main.tsx`          |
| **Service**     | kebab-case + `.service`   | `private-http.service.ts`      |
| **Interface**   | kebab-case + `.interface` | `supplier.interface.ts`        |
| **Enum**        | kebab-case + `.enum`      | `report-type.enum.ts`          |
| **Util**        | kebab-case                | `validators.ts`                |

---

## Decision Tree

```
Creating a file?
│
├─ Is it in /hooks/?
│  ├─ Yes, in /tests/? → camelCase.test.ts
│  └─ Yes, not in /tests/ → camelCase.ts
│
├─ Is it a component (.tsx)?
│  ├─ Yes → PascalCase.tsx
│  └─ Entry point? → lowercase.tsx
│
└─ Is it a .ts file?
   ├─ Service → kebab-case.service.ts
   ├─ Interface → kebab-case.interface.ts
   ├─ Enum → kebab-case.enum.ts
   └─ Other → kebab-case.ts
```

---

## Core Rules

### Folders

**Pattern:** lowercase or kebab-case

```bash
✅ suppliers/
✅ exchange-rate/
❌ Suppliers/      # PascalCase
❌ supplierData/   # camelCase
```

### Hooks

**Pattern:** camelCase

```bash
✅ useFetch.ts
✅ usePagination.ts
❌ UseFetch.ts     # PascalCase
❌ use-fetch.ts    # kebab-case
```

### Components

**Pattern:** PascalCase

```bash
✅ GenericTable.tsx
✅ SupplierForm.tsx
❌ genericTable.tsx  # camelCase
```

### Services

**Pattern:** kebab-case + `.service.ts`

```bash
✅ private-http.service.ts
✅ supplier.service.ts
❌ privateHttp.service.ts  # camelCase
```

For more examples, see [references/examples.md](references/examples.md).

---

## Pre-commit Validation

When you run `git commit`, the hook executes:

```bash
npm run check-naming-convention
```

**If violations found:**

```
Se encontraron problemas de convención de nombres:
Archivo .tsx no sigue convención PascalCase: genericTable.tsx
```

**To fix:**

1. Rename files according to rules
2. Stage renamed files: `git add .`
3. Commit again

---

## Common Mistakes

1. ❌ camelCase for components → ✅ PascalCase
2. ❌ PascalCase for hooks → ✅ camelCase
3. ❌ snake_case anywhere → ✅ kebab-case or camelCase
4. ❌ Missing `.test` in test files → ✅ Add `.test` suffix
5. ❌ PascalCase for folders → ✅ lowercase/kebab-case

---

## Resources

- [Detailed Examples](references/examples.md) - More naming examples
- [Special Cases](references/special-cases.md) - Edge cases and exceptions
- [naming-checker.mjs](../../naming-checker.mjs) - Validation script

---

**Remember**: naming-checker.mjs is non-negotiable. Follow rules exactly or your commit will fail.
