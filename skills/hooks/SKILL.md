# Custom Hooks - React Template Base

---

name: hooks
description: >
Custom React hooks patterns and conventions for React Template Base. Covers existing hooks (useFetch, usePagination, etc.) and guidelines for creating new ones.
license: MIT
metadata:
author: template-team
version: "2.0.0"
scope: [root]
auto_invoke: - "Creating a hook" - "Creating a custom hook" - "Adding a hook" - "Using useFetch" - "Using usePagination" - "Data fetching patterns" - "Form validation hooks"
---

## Critical Rules

### Hook Creation

- **ALWAYS** check if a hook exists in `/common/hooks/` before creating a new one
- **ALWAYS** name hook files in camelCase (enforced by `naming-checker.mjs`)
- **ALWAYS** prefix hook names with `use` (React convention)
- **ALWAYS** export as named export: `export const useHookName`
- **ALWAYS** add JSDoc comments explaining parameters and return value
- **ALWAYS** use TypeScript generics for data-handling hooks
- **ALWAYS** return objects (not arrays) from hooks for better API clarity
- **NEVER** use PascalCase for hook files
- **NEVER** create hooks that duplicate existing functionality
- **NEVER** forget to explain why you're creating a new hook (teaching mode)

---

## Quick Reference - Common Hooks

| Hook                    | Purpose                               | Location         |
| ----------------------- | ------------------------------------- | ---------------- |
| `useFetch`              | SWR data fetching with error handling | `/common/hooks/` |
| `usePagination`         | Pagination state management           | `/common/hooks/` |
| `useFormValidation`     | Config-based form validation          | `/common/hooks/` |
| `useConfirmationDialog` | Dialog state management               | `/common/hooks/` |
| `useHTTPMutation`       | HTTP mutations (POST, PUT, DELETE)    | `/common/hooks/` |
| `usePermissions`        | Permission verification               | `/common/hooks/` |
| `useHandleError`        | Centralized error handling            | `/common/hooks/` |

For detailed usage, see [references/common-hooks.md](references/common-hooks.md).

---

## useFetch (Quick Reference)

```typescript
import { useFetch } from '@common/hooks/useFetch';

const { data, error, isLoading, mutate } = useFetch<Supplier[]>(
  () => '/api/suppliers', // Path
  () => getData('/api/suppliers'), // Fetcher
  false, // reload
  false, // revalidateOnMount
  true, // enabled
  3, // revalidateInterval (minutes)
);
```

**Use for:** GET requests with caching
**DON'T use for:** Mutations (POST, PUT, DELETE) → Use `useHTTPMutation`

---

## usePagination (Quick Reference)

```typescript
import { usePagination } from '@common/hooks/usePagination';

const pagination = usePagination(100, 10); // totalRows, limit

// Returns: { totalRows, currentPage, totalPages, onPageChange, limit, ... }
```

**Use for:** Tables with server-side pagination

---

## When to Create a Hook

### Create when:

1. **Logic reused in 2+ components**
2. **Separating business logic from UI**
3. **Encapsulating complex side effects**
4. **Composing primitive hooks**

### DON'T create when:

1. Logic used only in 1 component → Keep inline
2. Simple useState without additional logic → Unnecessary
3. Similar hook already exists → Use existing

---

## Hook Structure (Quick)

```typescript
// 1. Types
interface UseCustomHookReturn {
  value: string;
  setValue: (v: string) => void;
}

// 2. Hook
export const useCustomHook = (initial: string): UseCustomHookReturn => {
  const [value, setValue] = useState(initial);

  const handleSet = useCallback((v: string) => {
    setValue(v);
  }, []);

  return { value, setValue: handleSet };
};
```

For detailed patterns, see [references/patterns.md](references/patterns.md).

---

## TypeScript Quick Patterns

### Generic Hooks

```typescript
export const useFetch = <T>(path: string): { data: T | undefined } => {...}
// Usage: const { data } = useFetch<Supplier[]>('/api/suppliers')
```

### Options Object

```typescript
interface Options { reload?: boolean; enabled?: boolean }
export const useFetch = <T>(path: string, options?: Options) => {...}
```

### Return Object (not array)

```typescript
return { value, setValue, isValid }; //  Object
return [value, setValue, isValid]; //  Array (confusing)
```

---

## Naming Conventions

| What      | Rule                | Example                     |
| --------- | ------------------- | --------------------------- |
| File      | camelCase           | `useFetch.ts`               |
| Function  | `use{Name}`         | `useFetch`, `usePagination` |
| Test file | camelCase + `.test` | `useFetch.test.ts`          |

---

## Performance Rules

**Use `useCallback` when:**

- Callback passed to `React.memo` child
- Callback is `useEffect` dependency
- Callback returned from hook

**Use `useMemo` when:**

- Expensive calculation
- Value used as `useEffect` dependency

**DON'T** over-memoize - React 18 + SWC handles most cases.

---

## Hook Location Decision

```
/common/hooks/      → Generic, reusable across modules
/modules/{x}/hooks/ → Module-specific logic
```

---

## Resources

- [Common Hooks](references/common-hooks.md) - Detailed hook documentation
- [Patterns](references/patterns.md) - Creation, TypeScript, performance patterns
- [Checklist](references/checklist.md) - Creation checklist and common mistakes
- **React Hooks Docs**: https://react.dev/reference/react/hooks
- **SWR Documentation**: https://swr.vercel.app/

---

**Remember**: Check `/common/hooks/` before creating new hooks. Compose existing hooks when possible, don't duplicate functionality.
