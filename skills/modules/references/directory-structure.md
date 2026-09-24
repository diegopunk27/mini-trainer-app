# Module Directory Structure

Detailed breakdown of each directory in a module.

---

## 1. `/pages/` - Page Components

**Purpose:** Components that correspond to routes (URL paths).

**Naming:** PascalCase (they are React components)

**Example:**

```
modules/suppliers/pages/
├── SupplierForm.tsx          # /suppliers/create or /suppliers/edit/:id
├── SupplierState.tsx         # /suppliers/state
├── SupplierRequest.tsx       # /suppliers/request
└── SupplierList.tsx          # /suppliers (optional if it's index)
```

**Characteristics:**

- Connected to routes in `routes/App.route.tsx`
- Orchestrate layout and subcomponents
- Use module contexts
- Can use module hooks

**Why separate pages:**

- Clear route → component correspondence
- Facilitates lazy loading (code splitting)
- Layout and business logic separated

---

## 2. `/components/` - Local Components

**Purpose:** Components used ONLY in this module.

**Naming:** PascalCase

**Example:**

```
modules/suppliers/components/
├── SupplierFormStep1.tsx
├── SupplierFormStep2.tsx
├── SupplierCard.tsx
└── SupplierStatusBadge.tsx
```

**Criteria for local vs common:**

- **Local** (`/modules/{module}/components/`): Module-specific logic, only used here
- **Common** (`/modules/common/components/`): Reusable in 2+ modules, generic

**Why local components:**

- Encapsulate module-specific logic
- Don't pollute `/common/` with non-reusable code
- Easier to refactor module without affecting others

---

## 3. `/contexts/` - Module Contexts

**Purpose:** Module-specific state management using Context API.

**Naming:** kebab-case for folders, PascalCase for context files

**Pattern:**

```
modules/suppliers/contexts/
├── supplier-state/
│   ├── SupplierStateContext.tsx
│   └── SupplierStateProvider.tsx
├── supplier-form/
│   ├── SupplierFormContext.tsx
│   └── SupplierFormProvider.tsx
└── supplier-request/
    ├── SupplierRequestContext.tsx
    └── SupplierRequestProvider.tsx
```

For detailed context patterns, see [contexts.md](contexts.md).

---

## 4. `/hooks/` - Module Hooks

**Purpose:** Custom hooks specific to the module.

**Naming:** camelCase (enforced by `naming-checker.mjs`)

**Example:**

```
modules/suppliers/hooks/
├── useSupplierForm.ts
├── useSupplierValidation.ts
└── useSupplierFilters.ts
```

**Criteria local vs common:**

- **Local**: Supplier-specific logic (e.g., `useSupplierValidation`)
- **Common**: Generic logic (e.g., `useFormValidation`, `usePagination`)

---

## 5. `/services/` - API Services

**Purpose:** Functions that make API calls for this module.

**Naming:** kebab-case + `.service.ts` suffix

**Example:**

```
modules/suppliers/services/
└── supplier.service.ts
```

```typescript
// supplier.service.ts
import { getData, postData, putData, deleteData } from '@common/services/http/private-http.service';
import { Supplier } from '../interfaces/supplier.interface';

export const getSuppliers = (params?: any) => {
  return getData<Supplier[]>('/api/suppliers', params);
};

export const getSupplierById = (id: string) => {
  return getData<Supplier>(`/api/suppliers/${id}`);
};

export const createSupplier = (data: Supplier) => {
  return postData<Supplier>('/api/suppliers', data);
};

export const updateSupplier = (id: string, data: Partial<Supplier>) => {
  return putData<Supplier>(`/api/suppliers/${id}`, data);
};

export const deleteSupplier = (id: string) => {
  return deleteData(`/api/suppliers/${id}`);
};
```

**Pattern:** Use functions from `private-http.service` (already has auth, error handling)

---

## 6. `/interfaces/` - TypeScript Interfaces

**Purpose:** Module-specific type definitions.

**Naming:** kebab-case + `.interface.ts` suffix

**Example:**

```
modules/suppliers/interfaces/
├── supplier.interface.ts
├── supplier-form.interface.ts
└── supplier-request.interface.ts
```

```typescript
// supplier.interface.ts
export interface Supplier {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: SupplierStatus;
  createdAt: Date;
  updatedAt: Date;
}
```

---

## 7. `/enums/` - Enumerations

**Purpose:** Enumerated constant values.

**Naming:** kebab-case + `.enum.ts` suffix

**Example:**

```typescript
// supplier-status.enum.ts
export enum SupplierStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}
```

---

## 8. `/constants/` - Module Constants

**Purpose:** Module constant values.

**Naming:** kebab-case for file, UPPER_CASE for constants

**Example:**

```typescript
// supplier-constants.ts
export const SUPPLIER_FORM_STEPS = 3;
export const MAX_ATTACHMENTS = 5;
export const ALLOWED_FILE_TYPES = ['pdf', 'xlsx', 'docx'];
```

**Important:** Constants in `/constants/` MUST use UPPER_CASE (validated by ESLint)

---

## 9. `/utils/` - Utility Functions

**Purpose:** Module utility functions.

**Naming:** kebab-case

**Example:**

```typescript
// supplier-validators.ts
export const validateRUT = (rut: string): boolean => {
  // Validation logic
  return true;
};

export const validateEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};
```

---

## 10. `/mappers/` - Data Transformers

**Purpose:** Transformation between DTOs (API) and frontend models.

**Naming:** kebab-case + `.mapper.ts` suffix (optional)

**Example:**

```typescript
// supplier-mapper.ts
import { SupplierDTO } from '../interfaces/supplier-dto.interface';
import { Supplier } from '../interfaces/supplier.interface';

export const mapDTOToSupplier = (dto: SupplierDTO): Supplier => {
  return {
    id: dto.supplier_id,
    name: dto.supplier_name,
    email: dto.email_address,
    // Transform snake_case API to camelCase frontend
  };
};

export const mapSupplierToDTO = (supplier: Supplier): SupplierDTO => {
  return {
    supplier_id: supplier.id,
    supplier_name: supplier.name,
    email_address: supplier.email,
    // Transform camelCase frontend to snake_case API
  };
};
```

**Why mappers:**

- API uses snake_case, frontend uses camelCase
- Centralized complex transformations
- Easy to change API structure without affecting frontend

---

## 11. `/config/` - Configuration

**Purpose:** Module-specific configuration.

**Example:**

```typescript
// supplier-table-columns.config.ts
import { ColDef } from 'ag-grid-community';

export const SUPPLIER_COLUMNS: ColDef[] = [
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'name', headerName: 'Nombre', flex: 1 },
  { field: 'status', headerName: 'Estado', width: 150 },
];
```

---

## 12. `/styles/` - SCSS Modules

**Purpose:** Module-specific styles.

**Naming:** PascalCase + `.module.scss` suffix

**Example:**

```
modules/suppliers/styles/
├── SupplierForm.module.scss
└── SupplierCard.module.scss
```
