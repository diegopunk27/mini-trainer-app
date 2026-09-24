# React 19 Patterns - React Template Base

---

name: react-19
description: >
React 19 patterns and best practices for functional components, hooks, and performance optimization. Use when: Creating components, using hooks, optimizing renders, implementing React 19 features, or fixing React-related issues.
license: MIT
metadata:
author: template-team
version: "1.0.0"
scope: [root]
auto_invoke: - "Creating React components" - "Using React hooks" - "Performance optimization" - "React render issues" - "useEffect problems" - "State management with hooks"
---

## Critical Rules

- **ALWAYS** use functional components (no class components)
- **ALWAYS** use hooks for state and side effects
- **ALWAYS** memoize expensive computations with `useMemo`
- **ALWAYS** memoize callbacks passed to children with `useCallback`
- **ALWAYS** clean up effects that subscribe to external data
- **NEVER** mutate state directly (use setState functions)
- **NEVER** call hooks conditionally or in loops
- **NEVER** forget dependency arrays in useEffect/useMemo/useCallback
- **React 19:** `ref` es una prop normal. Evitar `forwardRef` en componentes nuevos.

---

## Quick Reference

| Hook              | Use Case                            | Example                                                |
| ----------------- | ----------------------------------- | ------------------------------------------------------ |
| **useState**      | Local component state               | `const [count, setCount] = useState(0)`                |
| **useEffect**     | Side effects (fetch, subscriptions) | `useEffect(() => { ... }, [deps])`                     |
| **useMemo**       | Expensive computations              | `const sorted = useMemo(() => sort(items), [items])`   |
| **useCallback**   | Memoize functions                   | `const handler = useCallback(() => { ... }, [deps])`   |
| **useContext**    | Consume context                     | `const value = useContext(MyContext)`                  |
| **useRef**        | DOM references, mutable values      | `const ref = useRef<HTMLDivElement>(null)`             |
| **useId**         | Unique IDs (React 18)               | `const id = useId()`                                   |
| **useTransition** | Non-blocking updates (React 18)     | `const [isPending, startTransition] = useTransition()` |

---

## Component Structure

```typescript
interface CardProps {
  title: string
  children: React.ReactNode
}

export const Card = ({ title, children }: CardProps) => {
  // 1. Hooks at the top
  const [isExpanded, setIsExpanded] = useState(false)

  // 2. Callbacks
  const handleToggle = useCallback(() => {
    setIsExpanded(prev => !prev)
  }, [])

  // 3. Effects
  useEffect(() => {
    // Side effects with cleanup
    return () => { /* cleanup */ }
  }, [dependencies])

  // 4. Render
  return (
    <div>
      <h2>{title}</h2>
      {isExpanded && children}
    </div>
  )
}
```

---

## State Updates

```typescript
// Good - Functional update
const increment = () => setCount((prev) => prev + 1);

// Good - Spread for objects
const updateName = (name: string) => {
  setForm((prev) => ({ ...prev, name }));
};
```

---

## Common Mistakes

1. **Missing dependencies** in useEffect/useMemo/useCallback
2. **Infinite loops** - setState in useEffect without proper deps
3. **Stale closures** - referencing old state in callbacks
4. **New object/function every render** - use useMemo/useCallback

---

## Resources

- [Detailed Patterns](references/patterns.md) - Hooks, performance, React 18 features
- [React 18 Docs](https://react.dev/)
- [Hooks API Reference](https://react.dev/reference/react)

---

**Remember**: Use functional components, follow hooks rules, memoize when needed, and leverage React 18 features for better UX.
