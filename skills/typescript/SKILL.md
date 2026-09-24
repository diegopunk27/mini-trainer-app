# TypeScript Conventions - React Template Base

---

name: typescript
description: >
TypeScript conventions and patterns for React Template Base (strict mode, interfaces, generics, utility types). Use when: Defining types, creating interfaces, working with generics, or handling type errors.
license: MIT
metadata:
author: template-team
version: "1.0.0"
scope: [root]
auto_invoke: - "TypeScript error" - "Type definition" - "Creating an interface" - "Creating a type" - "Using generics" - "Type safety"
---

## Critical Rules

- **ALWAYS** use strict mode (no implicit `any`)
- **ALWAYS** prefer `interface` over `type` for object shapes
- **ALWAYS** use generics for reusable components/hooks/services
- **ALWAYS** name interface files with `.interface.ts` suffix
- **ALWAYS** name enum files with `.enum.ts` suffix
- **NEVER** use `any` (use `unknown` if necessary)
- **NEVER** use `@ts-ignore` without explanation

---

## Quick Reference

| Use Case              | Pattern                 | Example                                 |
| --------------------- | ----------------------- | --------------------------------------- |
| **Object shape**      | `interface`             | `interface User { name: string }`       |
| **Union types**       | `type`                  | `type Status = 'pending' \| 'approved'` |
| **Generic component** | `<T extends object>`    | `GenericTable<Supplier>`                |
| **Props**             | `interface {Name}Props` | `interface CardProps { ... }`           |
| **Partial update**    | `Partial<T>`            | `Partial<Supplier>`                     |
| **Pick fields**       | `Pick<T, K>`            | `Pick<Supplier, 'name' \| 'email'>`     |
| **Omit fields**       | `Omit<T, K>`            | `Omit<Supplier, 'id'>`                  |

---

## Interfaces vs Types

### Use `interface` for Objects (Preferred)

```typescript
interface Supplier {
  id: string;
  name: string;
  email: string;
  status: SupplierStatus;
}

interface SupplierCardProps {
  supplier: Supplier;
  onEdit: (id: string) => void;
}
```

**Razón:** Interfaces tienen mejor error messages, soportan declaration merging, y son la convención React/TS.

### Use `type` for Unions, Tuples, Aliases

```typescript
type Status = 'pending' | 'approved' | 'rejected';
type Coordinates = [number, number];
type EventHandler = (event: Event) => void;
```

---

## File Naming

**Interfaces:** `kebab-case.interface.ts`

```
supplier.interface.ts
supplier-form.interface.ts
```

**Enums:** `kebab-case.enum.ts`

```
supplier-status.enum.ts
```

---

## Common Mistakes

1. Using `any` -> Use specific types or `unknown`
2. Using `type` for objects -> Use `interface`
3. Not typing props -> Always define `{Component}Props`
4. Not using generics -> Use for reusable code
5. Missing `.interface.ts` suffix -> Follow naming convention

---

## Resources

- [Detailed Patterns](references/patterns.md) - Generics, utility types, context patterns
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)

---

**Remember**: Strict mode is enabled. Use `interface` for objects, generics for reusable code, and never use `any`.
