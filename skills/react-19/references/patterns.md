# React 18 Patterns - Detailed Examples

## Component Structure

### Functional Component Template

```typescript
interface CardProps {
  title: string
  children: React.ReactNode
  onAction?: () => void
}

export const Card = ({ title, children, onAction }: CardProps) => {
  // 1. Hooks at the top
  const [isExpanded, setIsExpanded] = useState(false)

  // 2. Derived state
  const hasAction = Boolean(onAction)

  // 3. Callbacks
  const handleToggle = useCallback(() => {
    setIsExpanded(prev => !prev)
  }, [])

  // 4. Effects
  useEffect(() => {
    // Side effects
  }, [dependencies])

  // 5. Render
  return (
    <div>
      <h2>{title}</h2>
      {isExpanded && children}
    </div>
  )
}
```

---

## State Management Examples

### useState - Object State

```typescript
interface FormState {
  name: string;
  email: string;
}

const [form, setForm] = useState<FormState>({ name: '', email: '' });

// Good - Spread previous state
const updateName = (name: string) => {
  setForm((prev) => ({ ...prev, name }));
};

// Bad - Overwriting entire state
const updateName = (name: string) => {
  setForm({ name, email: '' }); // Lost email!
};
```

### Multiple State vs Single Object

```typescript
// Good - Related state in object
const [form, setForm] = useState({ name: '', email: '' });

// Good - Independent state separately
const [count, setCount] = useState(0);
const [isOpen, setIsOpen] = useState(false);

// Bad - Unrelated state in one object
const [state, setState] = useState({ count: 0, isOpen: false, userName: '' });
```

---

## useEffect Patterns

### Effect with Cleanup

```typescript
useEffect(() => {
  const subscription = api.subscribe((data) => {
    setData(data);
  });

  // Cleanup function
  return () => {
    subscription.unsubscribe();
  };
}, []);
```

### Common Mistakes

```typescript
// Error - Missing dependencies
useEffect(() => {
  console.log(userId); // userId should be in deps
}, []);

// Fix - Include all dependencies
useEffect(() => {
  console.log(userId);
}, [userId]);

// Error - Effect runs on every render
useEffect(() => {
  fetchData();
}); // Missing dependency array!

// Fix - Add dependency array
useEffect(() => {
  fetchData();
}, []); // Runs once on mount
```

---

## Performance Optimization

### useMemo - Expensive Computations

```typescript
const ExpensiveList = ({ items }: { items: Item[] }) => {
  const sortedItems = useMemo(() => {
    return items.sort((a, b) => a.name.localeCompare(b.name))
  }, [items])

  return <div>{sortedItems.map(item => ...)}</div>
}
```

**When to use:**

- Expensive operations (sorting, filtering large arrays)
- Complex calculations
- Data transformations that don't change frequently

### useCallback - Memoize Functions

```typescript
const ParentComponent = () => {
  // Bad - New function every render
  const handleClick = () => {
    console.log('clicked')
  }

  // Good - Memoized function
  const handleClick = useCallback(() => {
    console.log('clicked')
  }, [])

  return <ChildComponent onClick={handleClick} />
}

const ChildComponent = React.memo(({ onClick }: Props) => {
  return <button onClick={onClick}>Click</button>
})
```

### React.memo - Memoize Components

```typescript
interface CardProps {
  title: string
  content: string
}

export const Card = React.memo(({ title, content }: CardProps) => {
  return (
    <div>
      <h2>{title}</h2>
      <p>{content}</p>
    </div>
  )
})

// Custom comparison function (optional)
export const Card = React.memo(
  ({ title, content }: CardProps) => { ... },
  (prevProps, nextProps) => {
    return prevProps.title === nextProps.title &&
           prevProps.content === nextProps.content
  }
)
```

---

## React 18 Features

### useTransition - Non-blocking Updates

```typescript
const SearchComponent = () => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [isPending, startTransition] = useTransition()

  const handleSearch = (value: string) => {
    // Urgent: Update input immediately
    setQuery(value)

    // Non-urgent: Filter results without blocking input
    startTransition(() => {
      const filtered = largeDataset.filter(item =>
        item.name.includes(value)
      )
      setResults(filtered)
    })
  }

  return (
    <div>
      <input value={query} onChange={e => handleSearch(e.target.value)} />
      {isPending && <Spinner />}
      <ResultsList results={results} />
    </div>
  )
}
```

### useId - Unique IDs

```typescript
const FormField = ({ label }: { label: string }) => {
  const id = useId()

  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input id={id} />
    </div>
  )
}
```

### useDeferredValue - Defer Expensive Updates

```typescript
const SearchResults = () => {
  const [query, setQuery] = useState('')
  const deferredQuery = useDeferredValue(query)

  const results = useMemo(() => {
    return largeDataset.filter(item =>
      item.name.includes(deferredQuery)
    )
  }, [deferredQuery])

  return (
    <div>
      <input value={query} onChange={e => setQuery(e.target.value)} />
      <ResultsList results={results} />
    </div>
  )
}
```

---

## Custom Hooks

### Extracting Logic

```typescript
export const useToggle = (initialValue = false) => {
  const [value, setValue] = useState(initialValue)

  const toggle = useCallback(() => {
    setValue(prev => !prev)
  }, [])

  return [value, toggle] as const
}

// Usage
const Modal = () => {
  const [isOpen, toggleOpen] = useToggle(false)

  return (
    <div>
      <button onClick={toggleOpen}>Toggle</button>
      {isOpen && <ModalContent />}
    </div>
  )
}
```

---

## Common Mistakes

### 1. Infinite Loops

```typescript
// Error - Infinite loop
useEffect(() => {
  setCount(count + 1);
}, [count]);

// Fix - Use ref or functional update
useEffect(() => {
  const timer = setInterval(() => {
    setCount((c) => c + 1);
  }, 1000);
  return () => clearInterval(timer);
}, []);
```

### 2. Stale Closures

```typescript
// Error - Stale closure
const [count, setCount] = useState(0);

useEffect(() => {
  const timer = setInterval(() => {
    console.log(count); // Always logs 0
  }, 1000);
  return () => clearInterval(timer);
}, []); // Missing count

// Fix - Include in dependencies
useEffect(() => {
  const timer = setInterval(() => {
    console.log(count);
  }, 1000);
  return () => clearInterval(timer);
}, [count]);
```

### 3. Unnecessary Re-renders

```typescript
// Bad - Creates new object every render
const Component = () => {
  const style = { color: 'red' }
  return <div style={style}>Text</div>
}

// Good - Move outside component
const style = { color: 'red' }

const Component = () => {
  return <div style={style}>Text</div>
}
```
