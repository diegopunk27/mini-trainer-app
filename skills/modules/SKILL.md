# Module Structure - React Template Base

---

name: modules
description: >
Module architecture and organization patterns for React Template Base. Covers module structure, contexts, routing, and feature organization.
license: MIT
metadata:
author: template-team
version: "2.0.0"
scope: [root]
auto_invoke: - "Creating a module" - "Creating a new module" - "Adding a feature module" - "Module structure" - "Working with contexts" - "Module organization" - "Feature architecture"
---

## Critical Rules

### Module Organization

- **ALWAYS** follow the established module structure (`pages/`, `components/`, `contexts/`, etc.)
- **ALWAYS** use lowercase or kebab-case for module folder names (enforced by `naming-checker.mjs`)
- **ALWAYS** create module-specific contexts in `/contexts/` subdirectory
- **ALWAYS** use path aliases for imports (`@module-name/*`)
- **ALWAYS** keep modules self-contained (avoid cross-module dependencies)
- **ALWAYS** add new modules to `tsconfig.json` path aliases
- **NEVER** import from other feature modules (only from `/common/`)
- **NEVER** use PascalCase or camelCase for module folder names
- **NEVER** create modules without explaining the architecture (teaching mode)

---

## Module Architecture Pattern

**Pattern:** Monorepo-style modular organization where each feature is self-contained.

```
src/modules/
├── common/              # Shared code (components, hooks, services)
└── {feature-module}/    # Feature-specific module
    ├── pages/           # Page components (routed)
    ├── components/      # Local components
    ├── contexts/        # Module contexts (state management)
    ├── hooks/           # Module-specific hooks
    ├── services/        # API services for this module
    ├── interfaces/      # TypeScript interfaces
    ├── enums/           # Enums
    ├── constants/       # Module constants
    ├── utils/           # Utility functions
    ├── mappers/         # Data transformation functions
    ├── config/          # Configuration files
    └── styles/          # SCSS modules
```

**Why this structure:**

- **Self-contained**: Each module has everything it needs
- **Scalable**: Easy to add new modules without affecting existing ones
- **Maintainable**: Changes in one module don't affect others
- **Discoverable**: Easy to find related code

For detailed directory breakdown, see [references/directory-structure.md](references/directory-structure.md).

---

## Quick Reference - Directory Purpose

| Directory     | Purpose                    | Naming                              |
| ------------- | -------------------------- | ----------------------------------- |
| `pages/`      | Routed components          | PascalCase                          |
| `components/` | Local components           | PascalCase                          |
| `contexts/`   | Module state (Context API) | kebab-case folder, PascalCase files |
| `hooks/`      | Custom hooks               | camelCase                           |
| `services/`   | API calls                  | kebab-case + `.service.ts`          |
| `interfaces/` | TypeScript types           | kebab-case + `.interface.ts`        |
| `enums/`      | Enumerations               | kebab-case + `.enum.ts`             |
| `constants/`  | Module constants           | kebab-case file, UPPER_CASE values  |

---

## Module Independence Rules

### Allowed Dependencies

```typescript
// ✅ Imports from /common/
import { GenericTable } from '@common/components/GenericTable';
import { useFetch } from '@common/hooks/useFetch';

// ✅ Imports within same module
import { SupplierCard } from '../components/SupplierCard';
import { Supplier } from '../interfaces/supplier.interface';
```

### Forbidden Dependencies

```typescript
// ❌ NO imports from other feature modules
import { PayrollTable } from '@payroll/components/PayrollTable'; // FORBIDDEN
import { useRolePermissions } from '@roles/hooks/useRolePermissions'; // FORBIDDEN
```

**If you need to share code:**

1. Move to `/common/` if reusable
2. Duplicate if very specific (DRY is not absolute)
3. Create a "shared" module if multiple modules need it

---

## Context Quick Pattern

**When to create:** State shared between 3+ components in module

```typescript
// Context file
export const MyContext = createContext<MyContextType | undefined>(undefined)

export const useMyContext = () => {
  const context = useContext(MyContext)
  if (!context) throw new Error('useMyContext must be used within Provider')
  return context
}

// Provider file
export const MyProvider = ({ children }) => {
  const [state, setState] = useState({})
  return (
    <MyContext.Provider value={{ state, setState }}>
      {children}
    </MyContext.Provider>
  )
}
```

For detailed context patterns, see [references/contexts.md](references/contexts.md).

---

## Adding a New Module (Quick)

1. Create folder structure:

   ```bash
   mkdir -p src/modules/{name}/{pages,components,contexts,hooks,services,interfaces}
   ```

2. Add path alias in `tsconfig.json`:

   ```json
   "@{name}/*": ["./src/modules/{name}/*"]
   ```

3. Create initial page in `/pages/`

4. Add route in `routes/App.route.tsx`

5. Add navigation in `navbar.constants.ts` (if applicable)

For step-by-step guide, see [references/adding-module.md](references/adding-module.md).

---

## Routing Pattern

```typescript
<Route path="/app" element={<PrivateContainer />}>
  <Route path="suppliers">
    <Route index element={<SupplierList />} />
    <Route path="create" element={<SupplierForm />} />
    <Route path="edit/:id" element={<SupplierForm />} />
  </Route>
</Route>
```

**Pattern:** Nested routes per module

---

## Common Mistakes to Avoid

1. ❌ Importing from other feature modules
2. ❌ Using PascalCase/camelCase for module folder name
3. ❌ Not adding path alias in `tsconfig.json`
4. ❌ Mixing local components with common ones
5. ❌ Creating unnecessary contexts (when useState would suffice)
6. ❌ Duplicating code that should be in `/common/`
7. ❌ Not following standard directory structure
8. ❌ Not explaining architectural decisions (teaching mode)

---

## Resources

- [Directory Structure](references/directory-structure.md) - Detailed directory breakdown
- [Context Patterns](references/contexts.md) - How to create and use contexts
- [Adding Modules](references/adding-module.md) - Step-by-step module creation
- **Module Examples**: `src/modules/suppliers/`, `src/modules/payroll/`
- **Common Code**: `src/modules/common/`

---

**Remember**: Modules should be self-contained. Only import from `/common/` or within the same module. Keep modules independent for scalability.
