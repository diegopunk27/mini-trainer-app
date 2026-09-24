# Hook Checklist & Common Mistakes

---

## Checklist Before Creating Hooks

Before creating a new hook:

- [ ] Does a similar hook exist in `/common/hooks/`?
- [ ] Is it used in 2+ components? (If not, keep inline)
- [ ] File name in camelCase (naming-checker.mjs)
- [ ] Hook function with `use` prefix
- [ ] JSDoc comment explaining purpose and parameters
- [ ] TypeScript generics if handling variable data
- [ ] Return object (not array), except useState-like
- [ ] useCallback/useMemo only when necessary
- [ ] Explain why you create this hook (teaching mode)
- [ ] Tests if it contains complex logic

---

## Common Mistakes to Avoid

1. ❌ Creating hook without checking `/common/hooks/` first
2. ❌ Using PascalCase for hook file name
3. ❌ Forgetting `use` prefix in function
4. ❌ Return array when object is clearer
5. ❌ Overuse of useCallback/useMemo (premature optimization)
6. ❌ Not typing with TypeScript generics when handling data
7. ❌ Duplicating functionality of existing hooks
8. ❌ Not explaining hook reason (teaching mode violation)

---

## Naming Conventions

### File Naming

**Convention:** camelCase (enforced by `naming-checker.mjs`)

```
 useFetch.ts
 usePagination.ts
 useFormValidation.ts

 UseFetch.ts        (PascalCase - pre-commit error)
 use-fetch.ts       (kebab-case - pre-commit error)
 use_fetch.ts       (snake_case - pre-commit error)
```

**Why camelCase:**

- Hooks are functions, not components
- Standard React convention
- Visual difference vs components (PascalCase)

### Function Naming

**Convention:** `use{Name}` (React requirement)

```typescript
export const useFetch = () => {};
export const usePagination = () => {};
export const useSupplierForm = () => {};

export const fetch = () => {}; // No "use" prefix
export const getSuppliers = () => {}; // No "use" prefix
export const UseModal = () => {}; // PascalCase (component, not hook)
```

**Why prefix "use":**

- React requires this prefix for hooks
- ESLint rules-of-hooks detects it
- Clear that it's a hook (not regular function)

---

## Decision Tree: Local vs Common Hook

```
Creating a hook?
│
├─ Is it used in 2+ components?
│  ├─ No → Keep logic inline in component
│  └─ Yes → Continue...
│
├─ Is the logic module-specific?
│  ├─ Yes → Create in /modules/{module}/hooks/
│  └─ No → Create in /common/hooks/
│
└─ Does a similar hook already exist?
   ├─ Yes → Use or extend existing hook
   └─ No → Create new hook
```

---

## Quick Reference: When to Use What

| Scenario               | Solution                             |
| ---------------------- | ------------------------------------ |
| Data fetching          | `useFetch`                           |
| Pagination state       | `usePagination`                      |
| Form validation        | `useFormValidation`                  |
| Confirmation dialog    | `useConfirmationDialog`              |
| HTTP mutations         | `useHTTPMutation`                    |
| Permission check       | `usePermissions`                     |
| Error handling         | `useErrorHandler`                    |
| Module-specific logic  | Create in `/modules/{module}/hooks/` |
| Generic reusable logic | Create in `/common/hooks/`           |
