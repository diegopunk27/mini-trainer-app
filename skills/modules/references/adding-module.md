# Adding a New Module

Step-by-step guide for creating new feature modules.

---

## Step 1: Create Module Folder Structure

```bash
mkdir -p src/modules/{module-name}/{pages,components,contexts,hooks,services,interfaces,enums,constants,utils,styles}
```

**Real example:**

```bash
mkdir -p src/modules/vendors/{pages,components,contexts,hooks,services,interfaces,constants,styles}
```

---

## Step 2: Add Path Alias in `tsconfig.json`

```json
{
  "compilerOptions": {
    "paths": {
      "@vendors/*": ["./src/modules/vendors/*"]
      // ... other aliases
    }
  }
}
```

**Why:** Enables clean imports: `import { X } from '@vendors/components/X'`

---

## Step 3: Create Initial Page Component

```typescript
// src/modules/vendors/pages/VendorList.tsx
const VendorList = () => {
  return <div>Vendor List</div>
}

export default VendorList
```

---

## Step 4: Add Route in `routes/App.route.tsx`

```typescript
import VendorList from '@vendors/pages/VendorList'

// Inside routes array
{
  path: '/vendors',
  element: <VendorList />
}
```

---

## Step 5: Add Navigation in `constants/navbar.constants.ts`

```typescript
export const PRIVATE_PAGES = [
  // ... existing pages
  {
    name: 'Vendors',
    path: '/vendors',
    icon: <VendorsIcon />
  }
]
```

---

## Step 6: Create Initial Types

```typescript
// src/modules/vendors/interfaces/vendor.interface.ts
export interface Vendor {
  id: string;
  name: string;
  // ... fields
}
```

---

## Step 7: Create Service

```typescript
// src/modules/vendors/services/vendor.service.ts
import { getData } from '@common/services/http/private-http.service';
import { Vendor } from '../interfaces/vendor.interface';

export const getVendors = () => {
  return getData<Vendor[]>('/api/vendors');
};
```

---

## Route Structure Pattern

```typescript
// routes/App.route.tsx
<Route path="/app" element={<PrivateContainer />}>
  {/* Suppliers module */}
  <Route path="suppliers">
    <Route index element={<SupplierList />} />
    <Route path="create" element={<SupplierForm />} />
    <Route path="edit/:id" element={<SupplierForm />} />
    <Route path="state" element={<SupplierState />} />
    <Route path="request" element={<SupplierRequest />} />
  </Route>

  {/* Other modules */}
  <Route path="payroll">
    <Route index element={<PayrollList />} />
    {/* ... */}
  </Route>
</Route>
```

**Pattern:** Nested routes per module

---

## Module Creation Checklist

- [ ] Module name in lowercase or kebab-case
- [ ] Create complete folder structure
- [ ] Add path alias in `tsconfig.json`
- [ ] Create initial page in `/pages/`
- [ ] Add route in `routes/App.route.tsx`
- [ ] Add navigation in `navbar.constants.ts` (if applicable)
- [ ] Create interfaces in `/interfaces/`
- [ ] Create service in `/services/`
- [ ] Document contexts if created
- [ ] Explain module architecture (teaching mode)
