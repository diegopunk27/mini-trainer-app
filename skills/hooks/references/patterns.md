# Hook Patterns

Detailed patterns for hook creation, TypeScript, and performance.

---

## Hook Creation Template

```typescript
/**
 * useCustomHook - Brief hook description
 *
 * @param param1 - Parameter 1 description
 * @param param2 - Parameter 2 description
 * @returns Object with hook values and functions
 *
 * Reason: Why we create this hook
 * Pattern: What pattern it follows
 */

import { useState, useCallback, useEffect } from 'react';

// 1. Type Definitions
interface UseCustomHookOptions {
  option1?: string;
  option2?: number;
}

interface UseCustomHookReturn {
  value: string;
  setValue: (value: string) => void;
  isValid: boolean;
}

// 2. Hook Function
export const useCustomHook = (
  initialValue: string,
  options?: UseCustomHookOptions,
): UseCustomHookReturn => {
  // 3. State
  const [value, setValue] = useState(initialValue);
  const [isValid, setIsValid] = useState(false);

  // 4. Effects
  useEffect(() => {
    setIsValid(value.length > 0);
  }, [value]);

  // 5. Callbacks
  const handleSetValue = useCallback((newValue: string) => {
    setValue(newValue);
  }, []);

  // 6. Return Object (prefer objects over arrays)
  return {
    value,
    setValue: handleSetValue,
    isValid,
  };
};
```

**Why this pattern:**

- **JSDoc comments** - Clear documentation of parameters/return
- **Type definitions** - Separate types for options and return
- **Return object** - Clearer than arrays (vs useState pattern)
- **useCallback** - Only when callbacks are passed to children
- **Named export** - Project consistency

---

## When to Create a New Hook

### Create when:

1. **Reusable logic in 2+ components**

   ```typescript
   // Reusable validation logic
   const useFormValidation = (config) => {
     /* ... */
   };
   // Used in SupplierForm, PayrollForm, RoleForm, etc.
   ```

2. **Separating business logic from UI**

   ```typescript
   // Pagination logic separated
   const usePagination = () => {
     /* ... */
   };
   // Component only focuses on rendering
   ```

3. **Encapsulating complex side effects**

   ```typescript
   // Complex effects encapsulated
   const useWebSocket = (url) => {
     useEffect(() => {
       // Complex WebSocket setup
     }, [url]);
   };
   ```

4. **Composing primitive hooks**

   ```typescript
   // Composes useState + useEffect
   const useLocalStorage = (key, initialValue) => {
     const [value, setValue] = useState(() => {
       return localStorage.getItem(key) || initialValue;
     });

     useEffect(() => {
       localStorage.setItem(key, value);
     }, [key, value]);

     return [value, setValue];
   };
   ```

### DON'T create when:

1. **Logic used only in 1 component** - Keep it inline
2. **Simple useState without additional logic** - Unnecessary
3. **A hook that does the same thing already exists** - Use `useFetch` instead of creating custom fetch hooks

---

## TypeScript Patterns

### 1. Generic Hooks (Recommended for data hooks)

```typescript
export const useFetch = <T>(
  path: string,
  fetcher: () => Promise<T>
): { data: T | undefined, error: Error | undefined, isLoading: boolean } => {
  // Implementation
}

// Usage with inferred type
const { data } = useFetch<Supplier[]>('/api/suppliers', ...)
//     ^^^^  type: Supplier[] | undefined
```

### 2. Options Object Pattern

```typescript
interface UseFetchOptions {
  reload?: boolean;
  revalidateOnMount?: boolean;
  enabled?: boolean;
  revalidateInterval?: number;
}

export const useFetch = <T>(
  path: string,
  fetcher: () => Promise<T>,
  options?: UseFetchOptions, // Options object
) => {
  // Destructure with defaults
  const {
    reload = false,
    revalidateOnMount = false,
    enabled = true,
    revalidateInterval = 3,
  } = options || {};
};
```

**Why options object:**

- Easy to add new options without breaking changes
- Named parameters (clearer than positional order)
- Clear defaults

### 3. Return Object (not arrays)

```typescript
// Recommended - Return object
export const usePagination = () => {
  return {
    currentPage,
    totalPages,
    onPageChange,
    resetPagination,
  };
};

// Usage
const { currentPage, onPageChange } = usePagination();

// Avoid - Return array (except useState-like hooks)
export const usePagination = () => {
  return [currentPage, totalPages, onPageChange, resetPagination];
};
```

**Why objects:**

- Selective destructuring (only what you need)
- Order doesn't matter
- Easier to add values without breaking changes

**Exception:** useState-like hooks (2 values, established pattern)

---

## Performance Considerations

### When to Use useCallback

**Use when:**

1. Callback is passed to child component using `React.memo`
2. Callback is dependency in consumer's useEffect
3. Callback is returned from the hook

```typescript
export const usePagination = () => {
  // Passed to child components
  const onPageChange = useCallback((event, newPage) => {
    setCurrentPage(newPage);
  }, []);

  return { onPageChange };
};
```

**DON'T use when:**

- Callback only used internally in the hook
- No child components involved

### When to Use useMemo

**Use when:**

1. Expensive calculation (large loops, complex transformations)
2. Returned value is used as dependency in useEffect

```typescript
export const usePagination = () => {
  // Derived calculation
  const totalPages = useMemo(() => {
    return Math.ceil(totalRows / limit);
  }, [totalRows, limit]);

  return { totalPages };
};
```

**DON'T use when:**

- Simple calculation (one arithmetic operation)
- No problematic dependencies

---

## Common Project Patterns

### 1. SWR Wrapper Pattern (useFetch)

```typescript
export const useFetch = <T>(...) => {
  const handleError = useErrorHandler()  // Hook composition

  const { data, error, isLoading } = useSWR<T>(path, fetcher, {
    // SWR options
  })

  useEffect(() => {
    if (error) handleError(error)  // Automatic error handling
  }, [error, handleError])

  return { data, error, isLoading, mutate }
}
```

**Pattern:** External library wrapper (SWR) + project-specific logic

### 2. State + Callbacks Pattern (usePagination)

```typescript
export const usePagination = (...) => {
  const [state, setState] = useState(...)

  const callback1 = useCallback(() => { /* ... */ }, [deps])
  const callback2 = useCallback(() => { /* ... */ }, [deps])

  return { state, callback1, callback2 }
}
```

### 3. Validation/Utilities Pattern (useFormValidation)

```typescript
export const useFormValidation = (config) => {
  const generateErrorValidation = <T>(data: T) => {
    // Logic here (no state, pure function)
  };

  return { generateErrorValidation };
};
```

---

## Hook Composition

**Combining hooks to create more complex abstractions:**

```typescript
// Composed hook using other hooks
export const useSupplierList = () => {
  const { data, error, isLoading } = useFetch<Supplier[]>(...)
  const pagination = usePagination(data?.count, 10)
  const { hasPermission } = usePermissions()

  const canEdit = hasPermission('suppliers.edit')

  return {
    suppliers: data?.results,
    error,
    isLoading,
    pagination,
    canEdit
  }
}

// Usage in component
const SupplierList = () => {
  const { suppliers, pagination, canEdit } = useSupplierList()

  return <GenericTable data={suppliers} pagination={pagination} />
}
```

**Why composition:**

- Simpler components
- Encapsulated and testable logic
- Reuse of primitive hooks
