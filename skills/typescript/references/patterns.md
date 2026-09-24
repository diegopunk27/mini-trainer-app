# TypeScript Patterns - Detailed Examples

## Generics Patterns

### Generic Components

```typescript
interface GenericTableProps<T> {
  data: T[]
  onRowClick?: (row: T) => void
}

const GenericTable = <T extends object>({
  data,
  onRowClick
}: GenericTableProps<T>) => {
  return <div>...</div>
}

// Usage
<GenericTable<Supplier>
  data={suppliers}
  onRowClick={(supplier) => console.log(supplier.name)}
/>
```

### Generic Hooks

```typescript
export const useFetch = <T>(
  path: string,
  fetcher: () => Promise<T>
): { data: T | undefined, error: Error | undefined } => {
  // Implementation
}

// Usage with type inference
const { data } = useFetch<Supplier[]>('/api/suppliers', ...)
```

### Generic Services

```typescript
export const getData = async <T>(url: string): Promise<T> => {
  const response = await client.get<T>(url);
  return response.data;
};

// Usage
const suppliers = await getData<Supplier[]>('/api/suppliers');
```

---

## Utility Types Examples

### Partial - Optional fields

```typescript
interface Supplier {
  id: string;
  name: string;
  email: string;
}

const updateSupplier = (id: string, updates: Partial<Supplier>) => {
  // updates can have only some fields
};
```

### Pick - Select specific fields

```typescript
type SupplierPreview = Pick<Supplier, 'name' | 'email'>;

const preview: SupplierPreview = {
  name: 'Acme',
  email: 'acme@example.com',
};
```

### Omit - Exclude fields

```typescript
type SupplierCreateData = Omit<Supplier, 'id'>;

const createSupplier = (data: SupplierCreateData) => {
  // data doesn't have id
};
```

### Record - Object with typed keys/values

```typescript
const statusColors: Record<SupplierStatus, string> = {
  PENDING: 'yellow',
  APPROVED: 'green',
  REJECTED: 'red',
};
```

---

## Props Patterns

### Component Props

```typescript
interface CardProps {
  title: string
  children: React.ReactNode
  onAction?: () => void  // Optional with ?
}

const Card = ({ title, children, onAction }: CardProps) => (
  <div>
    <h2>{title}</h2>
    {children}
  </div>
)
```

### Props with Generics

```typescript
interface SelectProps<T> {
  options: T[];
  value: T;
  onChange: (value: T) => void;
  getLabel: (option: T) => string;
}

const Select = <T>({ options, value, onChange, getLabel }: SelectProps<T>) => {
  // Implementation
};
```

---

## Context Patterns

### Typed Context

```typescript
interface AppContextType {
  user: User | null;
  permissions: string[];
  isLoading: boolean;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context; // Type-safe, no undefined
};
```

---

## Discriminated Unions

**For mutually exclusive states:**

```typescript
type LoadingState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: Error }

const Component = () => {
  const [state, setState] = useState<LoadingState<Supplier[]>>({ status: 'idle' })

  if (state.status === 'loading') {
    return <Spinner />
  }

  if (state.status === 'error') {
    return <Error message={state.error.message} />  // TS knows error exists
  }

  if (state.status === 'success') {
    return <Table data={state.data} />  // TS knows data exists
  }

  return null
}
```

**Razón:** Impossible states are impossible.

---

## Common Type Errors & Fixes

### 1. Object is possibly 'undefined'

```typescript
// Error
const name = supplier.name;

// Fix: Optional chaining
const name = supplier?.name;

// Fix: Nullish coalescing
const name = supplier?.name ?? 'Unknown';
```

### 2. Type 'X' is not assignable to type 'Y'

```typescript
// Error
interface Person {
  name: string;
  age: number;
}

const person: Person = {
  name: 'John',
  // Missing age
};

// Fix: Add missing field or use Partial
const person: Partial<Person> = {
  name: 'John',
};
```

### 3. Argument of type 'string' is not assignable to parameter of type 'never'

```typescript
// Error: Wrong inference
const [value, setValue] = useState([]); // Inferred as never[]

// Fix: Specify type
const [value, setValue] = useState<string[]>([]);
```
