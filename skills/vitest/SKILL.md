# Vitest Testing - React Template Base

---

name: vitest
description: >
Vitest testing patterns, component testing, mocking, and best practices for React + TypeScript. Use when: Writing tests, fixing test failures, testing components, mocking dependencies, or setting up test utilities.
license: MIT
metadata:
author: template-team
version: "1.0.0"
scope: [root]
auto_invoke: - "Writing tests" - "Fixing test failures" - "Testing components" - "Mocking dependencies" - "Test coverage issues"
---

## Critical Rules

- **ALWAYS** write tests for new components and functions
- **ALWAYS** test happy path and error cases
- **ALWAYS** clean up after tests (unmount, clear mocks)
- **ALWAYS** use descriptive test names (what + expected behavior)
- **ALWAYS** mock external dependencies (API calls, external modules)
- **NEVER** test implementation details (internal state, private methods)
- **NEVER** write tests that depend on execution order
- **NEVER** use `any` in test type annotations

---

## Quick Reference

| Function       | Purpose                 | Example                              |
| -------------- | ----------------------- | ------------------------------------ |
| **describe**   | Group related tests     | `describe('Component', () => {...})` |
| **it/test**    | Individual test case    | `it('should render', () => {...})`   |
| **expect**     | Assertion               | `expect(result).toBe(expected)`      |
| **beforeEach** | Setup before each test  | `beforeEach(() => {...})`            |
| **afterEach**  | Cleanup after each test | `afterEach(() => {...})`             |
| **vi.fn()**    | Create mock function    | `const mock = vi.fn()`               |
| **vi.mock()**  | Mock module             | `vi.mock('./module')`                |
| **render**     | Render component (RTL)  | `render(<Component />)`              |
| **screen**     | Query rendered elements | `screen.getByText('text')`           |

---

## Basic Test Structure

```typescript
import { describe, it, expect, beforeEach, afterEach } from 'vitest';

describe('ComponentName', () => {
  beforeEach(() => {
    // Setup
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should do something when condition', () => {
    // Arrange
    const input = 'test';

    // Act
    const result = someFunction(input);

    // Assert
    expect(result).toBe('expected');
  });
});
```

---

## Test Naming Convention

```typescript
// Good - Descriptive, behavior-focused
it('should display error message when email is invalid', () => {});
it('should call onSubmit with form data when form is valid', () => {});

// Bad - Vague
it('works', () => {});
it('test validation', () => {});
```

---

## Mocking

```typescript
import { vi } from 'vitest';

// Mock function
const mockFn = vi.fn().mockReturnValue('result');

// Mock module
vi.mock('./api/client', () => ({
  fetchData: vi.fn().mockResolvedValue({ data: 'mocked' }),
}));

// Clear mocks between tests
afterEach(() => {
  vi.clearAllMocks();
});
```

---

## Common Assertions

```typescript
expect(value).toBe(expected); // Strict equality
expect(value).toEqual(expected); // Deep equality
expect(element).toBeInTheDocument(); // DOM presence
expect(element).toBeDisabled(); // Element state
expect(mockFn).toHaveBeenCalledWith('arg');
```

---

## Running Tests

```bash
npm test                    # Run all tests
npm test -- --watch        # Watch mode
npm test -- --coverage     # With coverage
npm test -- path/to/file   # Specific file
```

---

## Common Mistakes

1. Testing implementation details -> Test behavior
2. Not cleaning up mocks -> Use `afterEach` with `vi.clearAllMocks()`
3. Using `getBy` for async content -> Use `findBy` or `waitFor`

---

## Resources

- [Detailed Patterns](references/patterns.md) - Component testing, hooks, mocking
- [Vitest Documentation](https://vitest.dev/)
- [Testing Library](https://testing-library.com/react)

---

**Remember**: Test behavior not implementation, use descriptive test names, mock external dependencies, and keep tests fast and independent.
