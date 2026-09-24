# Component Patterns - React Template Base

---

name: components
description: >
Component patterns and conventions for React Template Base. Covers common components, composition, MUI integration, and styling.
license: MIT
metadata:
author: template-team
version: "2.0.0"
scope: [root]
auto_invoke: - "Creating a component" - "Creating a new component" - "Adding a component" - "Refactoring components" - "Working with GenericTable" - "Working with NavBar" - "Using common components" - "Component composition"
---

## Critical Rules

### Component Creation

- **ALWAYS** check if a common component exists before creating new ones
- **ALWAYS** use PascalCase for component file names (enforced by `naming-checker.mjs`)
- **ALWAYS** define props interface with descriptive name: `{ComponentName}Props`
- **ALWAYS** use TypeScript generics for reusable data components
- **ALWAYS** use MUI components as base (Button, TextField, Box, etc.)
- **ALWAYS** import from path aliases (`@common`, `@assets`, etc.)
- **NEVER** use inline styles - Use MUI `sx` prop or SCSS modules
- **NEVER** duplicate functionality that exists in `/common/components/`
- **NEVER** create components without explaining why (teaching mode)

---

## Component Location Strategy

### `/common/components/` - When to use

**Criteria:**

1. Reusable in 2+ modules
2. No module-specific business logic
3. Generic and configurable via props

**Examples:** `GenericTable.tsx`, `ConfirmDialog.tsx`, `LoadingErrorDisplay.tsx`

### `/modules/{module}/components/` - When to use

**Criteria:**

1. Module-specific business logic
2. Only used in that module
3. Depends on module-specific contexts

**Examples:** `SupplierFormStep1.tsx`, `PayrollUploadZone.tsx`

---

## Quick Reference - Common Components

| Component             | Location                     | Purpose                       |
| --------------------- | ---------------------------- | ----------------------------- |
| `GenericTable`        | `/common/components/`        | AG Grid table with pagination |
| `NavBar`              | `/common/components/navbar/` | Responsive navigation         |
| `ConfirmDialog`       | `/common/components/`        | Confirmation dialogs          |
| `LoadingErrorDisplay` | `/common/components/`        | Loading/error states          |
| `Attachments`         | `/common/components/`        | File management               |

For detailed usage, see [references/common-components.md](references/common-components.md).

---

## Component Structure (Quick)

```typescript
// 1. Props Interface
interface ComponentNameProps {
  prop1: string
  onAction: () => void
}

// 2. Component Function
const ComponentName = ({ prop1, onAction }: ComponentNameProps) => {
  // 3. Hooks (context, state, effects, refs)
  const [state, setState] = useState('')

  // 4. Handlers
  const handleClick = () => onAction()

  // 5. Render
  return (
    <Box>
      <Button onClick={handleClick}>{prop1}</Button>
    </Box>
  )
}

export default ComponentName
```

For detailed patterns, see [references/patterns.md](references/patterns.md).

---

## Styling Quick Reference

### MUI `sx` Prop (dynamic/simple styles)

```typescript
<Box sx={{ display: 'flex', gap: 2, p: 3 }}>
```

### SCSS Modules (complex styles)

```typescript
import styles from './Component.module.scss'
<div className={styles.container}>
```

**Rule:** Prefer MUI `sx` for simple styles, SCSS modules for complex CSS.

---

## TypeScript Quick Patterns

### Generic Components

```typescript
const Table = <T extends object>({ data }: { data: T[] }) => {...}
// Usage: <Table<Supplier> data={suppliers} />
```

### Props Naming

- Interface: `{ComponentName}Props`
- Callbacks in props: `on{Event}` (e.g., `onClick`, `onSubmit`)
- Internal handlers: `handle{Event}` (e.g., `handleClick`)

---

## MUI Integration

- **ALWAYS** prefer MUI components over native HTML
- **USE** `useTheme()` for theme access
- **USE** `useMediaQuery()` for responsive logic

```typescript
const theme = useTheme();
const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
```

---

## Composition Patterns

### Container/Presentational

- **Container:** Handles logic, data fetching
- **Presentational:** Pure UI, receives props

### Compound Components

- Parent orchestrates, children are focused
- Example: `NavBar` with `MobileMenu`, `DesktopMenu`, `UserMenu`

---

## Performance Rules

**Use `useMemo`/`useCallback` ONLY when:**

1. Expensive calculations (large loops)
2. Preventing re-renders of `React.memo` children
3. As `useEffect` dependencies

**DON'T** memoize simple calculations - React 18 + SWC handles most cases.

---

## Resources

- [Common Components](references/common-components.md) - Detailed component docs
- [Patterns](references/patterns.md) - Structure, styling, TypeScript, MUI patterns
- [Checklist](references/checklist.md) - Creation checklist and common mistakes
- **MUI Docs**: https://mui.com/material-ui/getting-started/
- **AG Grid React**: https://www.ag-grid.com/react-data-grid/

---

**Remember**: Always check existing common components before creating new ones. Reuse and compose, don't duplicate.
