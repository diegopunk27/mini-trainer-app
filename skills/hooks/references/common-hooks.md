# Common Hooks Reference

Detailed documentation for hooks in `/modules/common/hooks/`.

---

## 1. useFetch

**Location:** `src/modules/common/hooks/useFetch.ts`

**Purpose:** SWR wrapper for data fetching with automatic error handling.

**Pattern:**

```typescript
import { useFetch } from '@common/hooks/useFetch'
import { getData } from '@common/services/http/private-http.service'

const SupplierList = () => {
  const { data, error, isLoading, mutate } = useFetch<Supplier[]>(
    () => '/api/suppliers',           // Path (string or function)
    () => getData('/api/suppliers'),  // Fetcher function
    false,                            // reload (revalidate on focus/reconnect)
    false,                            // revalidateOnMount
    true,                             // enabled
    3                                 // revalidate interval (minutes)
  )

  if (isLoading) return <Spinner />
  if (error) return <Error message={error.message} />

  return <SupplierTable data={data} />
}
```

**Parameters:**

- `path`: String or function returning the path (can be null to disable)
- `fetcher`: Function returning a Promise<T>
- `reload`: Revalidate on focus/reconnect (default: false)
- `revalidateOnMount`: Revalidate on mount (default: undefined)
- `enabled`: Enable/disable fetch (default: true)
- `revalidateInterval`: Revalidation interval in MINUTES (default: 3)

**Returns:**

- `data`: Typed data with generic T
- `error`: Error if occurred
- `isLoading`: Loading state
- `mutate`: Function to manually revalidate
- `isValidating`: If revalidating

**Why use useFetch:**

- Integrates SWR with project error handling (`useErrorHandler`)
- Automatic caching and revalidation
- Type-safe with TypeScript generics
- Consistent loading/error state handling
- Granular revalidation control

**When NOT to use:**

- For mutations (POST, PUT, DELETE) → Use `useHTTPMutation` or `private-http.service` directly

---

## 2. usePagination

**Location:** `src/modules/common/hooks/usePagination.ts`

**Purpose:** Complete pagination state management.

**Pattern:**

```typescript
import { usePagination } from '@common/hooks/usePagination'

const SupplierList = () => {
  const pagination = usePagination(100, 10) // totalRows, limit

  return (
    <>
      <GenericTable
        data={suppliers}
        pagination={pagination}
      />
      <Pagination
        count={pagination.totalPages}
        page={pagination.currentPage}
        onChange={pagination.onPageChange}
      />
      <Select
        value={pagination.limit}
        onChange={pagination.handleLimitPerPageChange}
      >
        <MenuItem value={10}>10</MenuItem>
        <MenuItem value={25}>25</MenuItem>
        <MenuItem value={50}>50</MenuItem>
      </Select>
    </>
  )
}
```

**Parameters:**

- `initialTotalRows`: Total records (default: 1)
- `initialLimit`: Records per page (default: 10)

**Returns:**

```typescript
{
  totalRows: number
  setTotalRows: (rows: number) => void
  currentPage: number
  totalPages: number
  onPageChange: (event, newPage) => void
  resetPagination: (newLimit?) => void
  setLimit: (limit: number) => void
  limit: number
  handleLimitPerPageChange: (event: SelectChangeEvent) => void
}
```

**Why use usePagination:**

- Complete pagination state management
- Automatic page validation (doesn't allow invalid pages)
- Optimized callbacks with `useCallback`
- Direct integration with MUI Pagination and GenericTable

---

## 3. useFormValidation

**Location:** `src/modules/common/hooks/useFormValidation.ts`

**Purpose:** Configuration-based form validation.

**Pattern:**

```typescript
import { useFormValidation } from '@common/hooks/useFormValidation'
import { ValidationConfig } from '@common/interfaces/form-config.interface'

const SupplierForm = () => {
  const [formData, setFormData] = useState<SupplierFormData>({})

  const validationConfig: ValidationConfig = {
    name: {
      required: true,
      validators: [(value) => value.length < 3 ? 'Mínimo 3 caracteres' : null]
    },
    email: {
      required: true,
      regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      validators: [(value, regex) => !regex.test(value) ? 'Email inválido' : null]
    },
    phone: {
      required: false,
      validators: [(value) => value && value.length < 9 ? 'Teléfono inválido' : null]
    }
  }

  const { generateErrorValidation } = useFormValidation(validationConfig)

  const handleSubmit = () => {
    const { isValid, errors } = generateErrorValidation(formData)

    if (!isValid) {
      setErrors(errors)
      return
    }

    // Submit form
  }

  return <form>...</form>
}
```

**ValidationConfig structure:**

```typescript
{
  [fieldName]: {
    required: boolean
    regex?: RegExp
    validators?: Array<(value, regex?) => string | null>
  }
}
```

**Returns:**

```typescript
{
  generateErrorValidation: <T>(data: T) => { isValid: boolean, errors: Record<string, string> }
}
```

---

## 4. useConfirmationDialog

**Location:** `src/modules/common/hooks/useConfirmationDialog.ts`

**Purpose:** Confirmation dialog state management.

**Pattern:**

```typescript
import { useConfirmationDialog } from '@common/hooks/useConfirmationDialog'
import ConfirmDialog from '@common/components/ConfirmDialog'

const SupplierList = () => {
  const { isOpen, open, close, confirm } = useConfirmationDialog()

  const handleDelete = (id: string) => {
    confirm(async () => {
      await deleteSupplier(id)
      toast.success('Proveedor eliminado')
    })
  }

  return (
    <>
      <Button onClick={() => open('¿Eliminar proveedor?', handleDelete)}>
        Eliminar
      </Button>
      <ConfirmDialog
        open={isOpen}
        onClose={close}
        onConfirm={confirm}
        message="¿Está seguro?"
      />
    </>
  )
}
```

---

## 5. useHTTPMutation

**Location:** `src/modules/common/hooks/useHTTPMutation.ts`

**Purpose:** HTTP mutation handling (POST, PUT, DELETE).

**Pattern:**

```typescript
import { useHTTPMutation } from '@common/hooks/useHTTPMutation'
import { postData } from '@common/services/http/private-http.service'

const SupplierForm = () => {
  const { mutate, isLoading, error } = useHTTPMutation(
    (data: Supplier) => postData('/api/suppliers', data)
  )

  const handleSubmit = async () => {
    const result = await mutate(formData)
    if (result) {
      toast.success('Proveedor creado')
    }
  }

  return <form onSubmit={handleSubmit}>...</form>
}
```

---

## 6. usePermissions

**Location:** `src/modules/common/hooks/usePermissions.ts`

**Purpose:** User permission verification.

**Pattern:**

```typescript
import { usePermissions } from '@common/hooks/usePermissions'

const SupplierActions = () => {
  const { hasPermission } = usePermissions()

  if (!hasPermission('suppliers.edit')) {
    return null
  }

  return <Button>Editar</Button>
}
```

---

## 7. useHandleError

**Location:** `src/modules/common/hooks/useHandleError.ts`

**Purpose:** Centralized error handling with toasts.

**Pattern:**

```typescript
import { useErrorHandler } from '@common/hooks/useHandleError';

const Component = () => {
  const handleError = useErrorHandler();

  const fetchData = async () => {
    try {
      await getData('/api/endpoint');
    } catch (error) {
      handleError(error); // Shows toast automatically
    }
  };
};
```
