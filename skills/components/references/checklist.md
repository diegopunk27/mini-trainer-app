# Component Checklist & Common Mistakes

---

## Checklist Before Creating Components

Before creating a new component:

- [ ] Does a similar component exist in `/common/components/`?
- [ ] Will it be reused in 2+ modules? → `/common/components/`
- [ ] Is it module-specific? → `/modules/{module}/components/`
- [ ] File name in PascalCase (naming-checker.mjs)
- [ ] Props interface defined: `{ComponentName}Props`
- [ ] Use MUI components as base
- [ ] Import from path aliases (`@common`, `@assets`)
- [ ] Explain why you create this component (teaching mode)
- [ ] SCSS module if you need complex styles
- [ ] TypeScript generics if working with variable data

---

## Common Mistakes to Avoid

1. ❌ Creating component without checking `/common/components/` first
2. ❌ Duplicating existing functionality
3. ❌ Using `div` instead of MUI `Box`
4. ❌ Inline styles instead of `sx` prop or SCSS modules
5. ❌ Props not properly typed
6. ❌ Not using path aliases (long relative imports)
7. ❌ Using camelCase for component file name
8. ❌ Not explaining component reason (teaching mode violation)

---

## Component Location Decision

### `/common/components/` - Shared

**Criteria:**

1. Reusable in multiple modules
2. No module-specific business logic
3. Generic and configurable via props

**Examples:**

- `GenericTable.tsx` - Used in suppliers, payroll, reports, etc.
- `ConfirmDialog.tsx` - Used everywhere for confirmations
- `LoadingErrorDisplay.tsx` - Universal loading/error states

### `/modules/{module}/components/` - Local

**Criteria:**

1. Module-specific business logic
2. Only used in that module
3. Depends on module-specific contexts

**Examples:**

- `modules/suppliers/components/SupplierFormStep1.tsx` - Suppliers only
- `modules/payroll/components/PayrollUploadZone.tsx` - Payroll only

---

## Common Patterns in the Project

### Data Fetching in Components

```typescript
import { useFetch } from '@common/hooks/useFetch'

const SupplierList = () => {
  const { data, error, isLoading } = useFetch<Supplier[]>('/api/suppliers')

  if (isLoading || error) {
    return <LoadingErrorDisplay isLoading={isLoading} error={error} />
  }

  return <GenericTable data={data} ... />
}
```

**Why:**

- `useFetch` hook uses SWR (caching, revalidation)
- `LoadingErrorDisplay` handles states consistently
- Early return pattern for clarity

### Form Components with Context

```typescript
import { useContext } from 'react'
import { SupplierFormContext } from '@suppliers/contexts/supplier-form'

const SupplierFormStep1 = () => {
  const { formData, updateField } = useContext(SupplierFormContext)

  return (
    <TextField
      value={formData.name}
      onChange={(e) => updateField('name', e.target.value)}
    />
  )
}
```

**Why:**

- Module contexts for multi-step form state
- Avoids prop drilling
- Centralizes validation logic
