# Module Context Patterns

Detailed patterns for creating and using contexts in modules.

---

## When to Create Module Contexts

**Create contexts when:**

1. State shared between 3+ components in the module
2. Multi-step forms
3. Complex list/table state (filters, sorting, selection)
4. Workflow with multiple steps

**DON'T create when:**

- State used only in 1-2 components (use props)
- Very simple state (a boolean) (use local useState)
- Data from server (use `useFetch`)

---

## Context Structure

### Context File

```typescript
// SupplierFormContext.tsx
import { createContext, useContext } from 'react';

interface SupplierFormContextType {
  formData: SupplierFormData;
  updateField: (field: string, value: any) => void;
  validateForm: () => boolean;
  resetForm: () => void;
}

export const SupplierFormContext = createContext<SupplierFormContextType | undefined>(undefined);

export const useSupplierForm = () => {
  const context = useContext(SupplierFormContext);
  if (!context) {
    throw new Error('useSupplierForm must be used within SupplierFormProvider');
  }
  return context;
};
```

### Provider File

```typescript
// SupplierFormProvider.tsx
import { useState } from 'react'
import { SupplierFormContext } from './SupplierFormContext'

export const SupplierFormProvider = ({ children }) => {
  const [formData, setFormData] = useState<SupplierFormData>({})

  const updateField = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const validateForm = () => {
    // Validation logic
    return true
  }

  const resetForm = () => {
    setFormData({})
  }

  const value = {
    formData,
    updateField,
    validateForm,
    resetForm
  }

  return (
    <SupplierFormContext.Provider value={value}>
      {children}
    </SupplierFormContext.Provider>
  )
}
```

---

## Usage in Pages

```typescript
// pages/SupplierForm.tsx
import { SupplierFormProvider } from '../contexts/supplier-form/SupplierFormProvider'
import { useSupplierForm } from '../contexts/supplier-form/SupplierFormContext'

const SupplierForm = () => {
  return (
    <SupplierFormProvider>
      <SupplierFormContent />
    </SupplierFormProvider>
  )
}

const SupplierFormContent = () => {
  const { formData, updateField } = useSupplierForm()

  return <form>...</form>
}
```

---

## Multiple Contexts per Module

**Real project example: Suppliers Module**

```
modules/suppliers/contexts/
├── supplier-state/          # Supplier list state
│   ├── SupplierStateContext.tsx
│   └── SupplierStateProvider.tsx
├── supplier-form/           # Multi-step form state
│   ├── SupplierFormContext.tsx
│   └── SupplierFormProvider.tsx
└── supplier-request/        # Request state
    ├── SupplierRequestContext.tsx
    └── SupplierRequestProvider.tsx
```

**Why multiple contexts:**

- **Separation of concerns**: Each context has a specific purpose
- **Performance**: Only re-render components using that context
- **Maintainability**: Easier to understand and modify

---

## Nesting Providers

**Pattern:**

```typescript
// App.tsx or module root
<SupplierStateProvider>
  <SupplierFormProvider>
    <SupplierRequestProvider>
      <YourComponent />
    </SupplierRequestProvider>
  </SupplierFormProvider>
</SupplierStateProvider>
```

**Why nesting:**

- Each provider manages its own state
- Internal providers can consume external contexts
- Composition pattern

---

## Context vs Other State Solutions

| Scenario                           | Solution         |
| ---------------------------------- | ---------------- |
| State in 1-2 components            | Props / useState |
| State in 3+ components same module | Context API      |
| Server data                        | SWR (useFetch)   |
| Global app state                   | AppContext       |
| Form with few fields               | Local useState   |
| Multi-step form                    | Module Context   |
