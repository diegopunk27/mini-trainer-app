# Component Patterns

Detailed patterns for component creation, styling, and composition.

---

## Component Structure Template

```typescript
/**
 * ComponentName - Brief description (1 line)
 *
 * Reason: Why this component exists
 * Pattern: What pattern it follows (composition, render props, HOC, etc.)
 */

import { useState } from 'react'
import { Box, Button } from '@mui/material'
import styles from './ComponentName.module.scss'

// 1. Props Interface
interface ComponentNameProps {
  prop1: string
  prop2?: number          // Optional props with ?
  onAction: () => void    // Callbacks with on* naming
  children?: ReactNode    // If accepts children
}

// 2. Component Function (Arrow function preferred)
const ComponentName = ({
  prop1,
  prop2 = 10,           // Default values in destructuring
  onAction,
  children
}: ComponentNameProps) => {

  // 3. Hooks (order: context, state, effects, refs)
  const { user } = useContext(AppContext)
  const [localState, setLocalState] = useState('')
  const ref = useRef(null)

  // 4. Handlers
  const handleClick = () => {
    onAction()
  }

  // 5. Render
  return (
    <Box className={styles.container}>
      <Button onClick={handleClick}>
        {prop1}
      </Button>
      {children}
    </Box>
  )
}

// 6. Export
export default ComponentName
```

**Why this order:**

- **Props interface first** - Component API documentation
- **Hooks in standard order** - Consistency and readability
- **Separate handlers** - Avoids inline functions (better performance)
- **Default export** - Project convention

---

## Styling Patterns

### 1. MUI `sx` Prop (For dynamic or simple styles)

**When to use:** Styles that depend on theme, props, or are very simple.

```typescript
<Box
  sx={{
    display: 'flex',
    gap: 2,                          // Theme spacing (2 * 8px)
    backgroundColor: 'primary.main', // Theme colors
    p: 3,                            // Padding shorthand
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',       // Responsive
    }
  }}
>
```

**Why:**

- Direct access to MUI theme
- Responsive via breakpoints
- Type-safe with TypeScript

### 2. SCSS Modules (For complex or static styles)

**When to use:** Components with many styles, animations, or complex CSS.

**Naming:** `ComponentName.module.scss` (PascalCase + .module suffix)

```scss
// GenericTable.module.scss
.container {
  width: 100%;
  height: 600px;

  &__header {
    display: flex;
    justify-content: space-between;
  }

  &__cell {
    padding: 8px;

    &--highlighted {
      background-color: yellow;
    }
  }
}
```

```typescript
import styles from './GenericTable.module.scss'

<div className={styles.container}>
  <div className={styles.container__header}>...</div>
</div>
```

**Why:**

- **Scoped styles** - No name conflicts
- **BEM naming** - Clear organization
- **Better for complex CSS** - Animations, pseudo-selectors, etc.

### 3. Global SCSS (Only for resets and utilities)

**Location:** `src/assets/scss/index.scss`

**When to use:** Global styles, resets, reusable utilities.

**Avoid:** Specific component styles (use modules).

---

## TypeScript Patterns

### 1. Generic Components

**For components that work with different data types:**

```typescript
interface GenericTableProps<T> {
  data: T[]
  renderRow: (item: T) => ReactNode
}

const GenericTable = <T extends object>({
  data,
  renderRow
}: GenericTableProps<T>) => {
  return (
    <div>
      {data.map((item, index) => (
        <div key={index}>{renderRow(item)}</div>
      ))}
    </div>
  )
}

// Usage
<GenericTable<Supplier>
  data={suppliers}
  renderRow={(supplier) => <div>{supplier.name}</div>}
/>
```

**Why:**

- Compile-time type safety
- Reuse without losing types
- Intellisense in callbacks

### 2. Props Interface Naming

**Convention:** `{ComponentName}Props`

```typescript
interface SupplierCardProps {
  supplier: Supplier;
  onEdit: (id: string) => void;
  isEditable?: boolean;
}
```

### 3. Event Handlers

**Naming:** `handle{Event}` or `on{Event}` (in props)

```typescript
interface ButtonProps {
  onClick: () => void      // Received prop
}

const Button = ({ onClick }: ButtonProps) => {
  const handleClick = () => {  // Internal handler
    // Additional logic
    onClick()
  }

  return <button onClick={handleClick}>Click</button>
}
```

---

## MUI Integration Patterns

### 1. Prefer MUI over native HTML

```typescript
// ✅ Good
import { Box, Button, TextField } from '@mui/material'

<Box sx={{ display: 'flex' }}>
  <TextField label="Nombre" />
  <Button variant="contained">Guardar</Button>
</Box>

// ❌ Avoid (unless necessary)
<div style={{ display: 'flex' }}>
  <input type="text" placeholder="Nombre" />
  <button>Guardar</button>
</div>
```

**Why:**

- Visual consistency with theme
- Built-in accessibility
- Rich, type-safe props

### 2. Theme Access

```typescript
import { useTheme } from '@mui/material'

const Component = () => {
  const theme = useTheme()

  return (
    <Box sx={{
      color: theme.palette.primary.main,
      [theme.breakpoints.down('md')]: {
        fontSize: '14px'
      }
    }}>
      Content
    </Box>
  )
}
```

### 3. Responsive Design

```typescript
import { useMediaQuery, useTheme } from '@mui/material'

const Component = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <Box>
      {isMobile ? <MobileView /> : <DesktopView />}
    </Box>
  )
}
```

---

## Composition Patterns

### 1. Container/Presentational Pattern

**Container (logic):**

```typescript
const SupplierListContainer = () => {
  const { data, error } = useFetch<Supplier[]>('/api/suppliers')
  const [selected, setSelected] = useState([])

  return (
    <SupplierList
      suppliers={data}
      error={error}
      onSelect={setSelected}
    />
  )
}
```

**Presentational (UI):**

```typescript
interface SupplierListProps {
  suppliers: Supplier[]
  error?: Error
  onSelect: (suppliers: Supplier[]) => void
}

const SupplierList = ({ suppliers, error, onSelect }: SupplierListProps) => {
  return <GenericTable ... />
}
```

**Why:**

- Separation of concerns (logic vs UI)
- Presentational components more reusable
- Easier to test

### 2. Compound Components

**Example: NavBar with subcomponents**

```typescript
// NavBar.tsx (parent)
const NavBar = () => {
  return (
    <AppBar>
      <MobileMenu />
      <DesktopMenu />
      <UserMenu />
    </AppBar>
  )
}

// Subcomponents in /navbar/ folder
// - MobileMenu.tsx
// - DesktopMenu.tsx
// - UserMenu.tsx
```

**Why:**

- Simple, readable main component
- Focused, reusable subcomponents
- Easy to extend without touching main component

---

## Performance Patterns

### When to Use `useMemo` / `useCallback`

**⚠️ Important:** React 18+ with SWC doesn't need as much memoization.

**Use only when:**

1. Expensive calculations (large loops, complex transformations)
2. Prevent re-renders of child components using `React.memo`
3. Dependencies in `useEffect` (avoid infinite loops)

```typescript
// ✅ Valid - Expensive calculation
const sortedData = useMemo(() => {
  return data.sort((a, b) => /* complex sort */)
}, [data])

// ✅ Valid - Prevent re-render
const handleClick = useCallback(() => {
  doSomething(id)
}, [id])

// ❌ Unnecessary - Simple calculation
const fullName = useMemo(() => `${firstName} ${lastName}`, [firstName, lastName])
```

**Why:**

- SWC automatically optimizes most cases
- Premature optimization adds unnecessary complexity
- Only optimize when there's a measurable problem
