# Vitest Testing Patterns - Detailed Examples

## Component Testing

### Basic Component Test

```typescript
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Button } from './Button'

describe('Button', () => {
  it('should render with correct text', () => {
    render(<Button>Click me</Button>)

    const button = screen.getByRole('button', { name: /click me/i })
    expect(button).toBeInTheDocument()
  })

  it('should be disabled when disabled prop is true', () => {
    render(<Button disabled>Click me</Button>)

    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
  })
})
```

### Testing User Interactions

```typescript
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'

describe('LoginForm', () => {
  it('should call onSubmit when form is submitted', async () => {
    const handleSubmit = vi.fn()
    render(<LoginForm onSubmit={handleSubmit} />)

    const user = userEvent.setup()
    await user.type(screen.getByLabelText(/email/i), 'test@example.com')
    await user.type(screen.getByLabelText(/password/i), 'password123')
    await user.click(screen.getByRole('button', { name: /submit/i }))

    expect(handleSubmit).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123',
    })
  })

  it('should show validation error for invalid email', async () => {
    render(<LoginForm onSubmit={vi.fn()} />)

    const user = userEvent.setup()
    await user.type(screen.getByLabelText(/email/i), 'invalid')
    await user.click(screen.getByRole('button', { name: /submit/i }))

    expect(screen.getByText(/invalid email/i)).toBeInTheDocument()
  })
})
```

### Testing Async Components

```typescript
import { render, screen, waitFor } from '@testing-library/react'
import { vi } from 'vitest'

describe('DataComponent', () => {
  it('should display loading state initially', () => {
    render(<DataComponent />)
    expect(screen.getByText(/loading/i)).toBeInTheDocument()
  })

  it('should display data after loading', async () => {
    render(<DataComponent />)
    await waitFor(() => {
      expect(screen.getByText(/data loaded/i)).toBeInTheDocument()
    })
  })

  it('should display error message on fetch failure', async () => {
    vi.spyOn(global, 'fetch').mockRejectedValueOnce(new Error('API Error'))
    render(<DataComponent />)
    await waitFor(() => {
      expect(screen.getByText(/error loading data/i)).toBeInTheDocument()
    })
  })
})
```

---

## Mocking

### Mock Functions

```typescript
import { vi } from 'vitest';

// Create mock function
const mockFn = vi.fn();

// Mock implementation
const mockFn = vi.fn(() => 'mocked result');

// Mock return values
const mockFn = vi.fn().mockReturnValueOnce('first call').mockReturnValueOnce('second call');

// Mock resolved promise
const mockAsync = vi.fn().mockResolvedValue({ data: 'result' });

// Mock rejected promise
const mockAsync = vi.fn().mockRejectedValue(new Error('Failed'));

// Assertions
expect(mockFn).toHaveBeenCalled();
expect(mockFn).toHaveBeenCalledWith('arg1', 'arg2');
expect(mockFn).toHaveBeenCalledTimes(2);
```

### Mock Modules

```typescript
// Mock entire module
vi.mock('./api/client', () => ({
  fetchData: vi.fn().mockResolvedValue({ data: 'mocked' }),
  postData: vi.fn().mockResolvedValue({ success: true }),
}));

// Partial mock
vi.mock('./service', async () => {
  const actual = await vi.importActual('./service');
  return {
    ...actual,
    fetchUser: vi.fn().mockResolvedValue({ id: 1, name: 'Test' }),
  };
});
```

### Mock API Calls

```typescript
describe('UserService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should fetch user data', async () => {
    const mockResponse = { id: 1, name: 'John' };

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockResponse,
    });

    const result = await fetchUser(1);

    expect(global.fetch).toHaveBeenCalledWith('/api/users/1');
    expect(result).toEqual(mockResponse);
  });

  it('should handle fetch error', async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error('Network error'));
    await expect(fetchUser(1)).rejects.toThrow('Network error');
  });
});
```

---

## Common Assertions

### Basic Assertions

```typescript
// Equality
expect(value).toBe(expected); // Strict equality
expect(value).toEqual(expected); // Deep equality
expect(value).not.toBe(unexpected); // Negation

// Truthiness
expect(value).toBeTruthy();
expect(value).toBeFalsy();
expect(value).toBeNull();
expect(value).toBeUndefined();

// Numbers
expect(value).toBeGreaterThan(10);
expect(value).toBeLessThan(100);

// Strings
expect(string).toMatch(/pattern/);
expect(string).toContain('substring');

// Arrays
expect(array).toContain(item);
expect(array).toHaveLength(3);

// Objects
expect(object).toHaveProperty('key');
expect(object).toMatchObject({ key: 'value' });
```

### DOM Assertions

```typescript
// Presence
expect(element).toBeInTheDocument();
expect(element).not.toBeInTheDocument();

// Visibility
expect(element).toBeVisible();

// State
expect(element).toBeDisabled();
expect(element).toBeEnabled();
expect(element).toBeChecked();

// Content
expect(element).toHaveTextContent('text');
expect(element).toHaveValue('value');
expect(element).toHaveAttribute('data-testid', 'value');
```

---

## Testing Hooks

### Testing Custom Hooks

```typescript
import { renderHook, act } from '@testing-library/react';
import { useCounter } from './useCounter';

describe('useCounter', () => {
  it('should initialize with default value', () => {
    const { result } = renderHook(() => useCounter(0));
    expect(result.current.count).toBe(0);
  });

  it('should increment counter', () => {
    const { result } = renderHook(() => useCounter(0));

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });
});
```

### Testing Hooks with Context

```typescript
describe('useAuth', () => {
  it('should provide auth context', () => {
    const wrapper = ({ children }) => (
      <AuthProvider>{children}</AuthProvider>
    )

    const { result } = renderHook(() => useAuth(), { wrapper })

    expect(result.current.user).toBeNull()
    expect(typeof result.current.login).toBe('function')
  })
})
```

---

## Test Utilities

### Custom Render Function

```typescript
// test-utils.tsx
import { render, RenderOptions } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import theme from '@/theme'

export const customRender = (
  ui: ReactElement,
  { route = '/', ...options }: CustomRenderOptions = {}
) => {
  window.history.pushState({}, 'Test page', route)

  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </BrowserRouter>
  )

  return render(ui, { wrapper: Wrapper, ...options })
}

export * from '@testing-library/react'
export { customRender as render }
```

---

## Project Patterns

### Testing with useFetch Hook

```typescript
vi.mock('@common/hooks/useFetch', () => ({
  useFetch: vi.fn(),
}))

describe('DataList', () => {
  it('should display loading state', () => {
    useFetch.mockReturnValue({
      data: null,
      error: null,
      isLoading: true,
    })

    render(<DataList />)
    expect(screen.getByText(/loading/i)).toBeInTheDocument()
  })

  it('should display data when loaded', () => {
    useFetch.mockReturnValue({
      data: [{ id: 1, name: 'Item 1' }],
      error: null,
      isLoading: false,
    })

    render(<DataList />)
    expect(screen.getByText('Item 1')).toBeInTheDocument()
  })
})
```

### Testing Forms

```typescript
describe('SupplierForm', () => {
  it('should submit form with valid data', async () => {
    const handleSubmit = vi.fn()
    render(<SupplierForm onSubmit={handleSubmit} />)

    const user = userEvent.setup()
    await user.type(screen.getByLabelText(/name/i), 'Test Supplier')
    await user.type(screen.getByLabelText(/email/i), 'test@example.com')
    await user.click(screen.getByRole('button', { name: /submit/i }))

    expect(handleSubmit).toHaveBeenCalledWith({
      name: 'Test Supplier',
      email: 'test@example.com',
    })
  })
})
```

---

## Common Mistakes

### 1. Testing Implementation Details

```typescript
// Bad - Testing internal state
it('should update state', () => {
  const { result } = renderHook(() => useCounter())
  expect(result.current.state.count).toBe(0)
})

// Good - Testing behavior
it('should display initial count', () => {
  render(<Counter />)
  expect(screen.getByText(/count: 0/i)).toBeInTheDocument()
})
```

### 2. Not Cleaning Up Mocks

```typescript
// Good - Clean up after each test
describe('Tests', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  it('test 1', () => { ... })
  it('test 2', () => { ... })
})
```

### 3. Using getBy for Async Content

```typescript
// Bad - Fails immediately
it('should show data', () => {
  render(<AsyncComponent />)
  const element = screen.getByText(/data/i)
})

// Good - Wait for async content
it('should show data', async () => {
  render(<AsyncComponent />)
  const element = await screen.findByText(/data/i)
  expect(element).toBeInTheDocument()
})
```
