# Naming Examples

Detailed examples for each naming convention.

---

## Folder Examples

**Pattern:** `/^[a-z0-9]+(-[a-z0-9]+)*$/` (lowercase or kebab-case)

```bash
# ✅ Correct
suppliers/
exchange-rate/
credit-customer/
user-management/
api-config/

# ❌ Incorrect
supplierData/      # camelCase
Suppliers/         # PascalCase
supplier_data/     # snake_case
UserManagement/    # PascalCase
API-Config/        # Uppercase letters
```

---

## Hook File Examples

**Pattern:** `/^[a-z][a-zA-Z0-9]*$/` (camelCase)

```bash
# ✅ Correct
useFetch.ts
usePagination.ts
useFormValidation.ts
useLocalStorage.ts
useSupplierForm.ts

# ❌ Incorrect
UseFetch.ts        # PascalCase
use-fetch.ts       # kebab-case
use_fetch.ts       # snake_case
Usefetch.ts        # Wrong casing
```

---

## Component File Examples

**Pattern:** `/^[A-Z][a-zA-Z0-9]*$/` (PascalCase)

```bash
# ✅ Correct
GenericTable.tsx
NavBar.tsx
SupplierForm.tsx
ConfirmDialog.tsx
LoadingErrorDisplay.tsx

# ❌ Incorrect
genericTable.tsx   # camelCase
generic-table.tsx  # kebab-case
GENERIC_TABLE.tsx  # UPPER_SNAKE
supplier_form.tsx  # snake_case
```

**Exception:** Entry points can be lowercase (`app.tsx`, `main.tsx`)

---

## Service File Examples

**Pattern:** `/^[a-z0-9]+(-[a-z0-9]+)*.service.ts$/` (kebab-case + .service.ts)

```bash
# ✅ Correct
private-http.service.ts
supplier.service.ts
file-upload.service.ts
auth.service.ts
payment-gateway.service.ts

# ❌ Incorrect
privateHttp.service.ts    # camelCase
PrivateHttp.service.ts    # PascalCase
private_http.service.ts   # snake_case
privatehttp.service.ts    # No separator
```

---

## Interface File Examples

**Pattern:** kebab-case + `.interface.ts`

```bash
# ✅ Correct
supplier.interface.ts
supplier-form.interface.ts
api-response.interface.ts
user-profile.interface.ts

# ❌ Incorrect
Supplier.interface.ts     # PascalCase
supplier.ts               # Missing .interface suffix
SupplierForm.interface.ts # PascalCase
```

---

## Enum File Examples

**Pattern:** kebab-case + `.enum.ts`

```bash
# ✅ Correct
supplier-status.enum.ts
report-type.enum.ts
user-role.enum.ts
payment-method.enum.ts

# ❌ Incorrect
SupplierStatus.enum.ts    # PascalCase
supplierStatus.enum.ts    # camelCase
supplier_status.enum.ts   # snake_case
```

---

## Test File Examples

**Pattern:** original name + `.test.ts`

```bash
# ✅ Correct (in /tests/ directories)
useFetch.test.ts
validators.test.ts
GenericTable.test.tsx
supplier.service.test.ts

# ❌ Incorrect
useFetch.ts              # Missing .test
useFetch.spec.ts         # .spec not allowed
UseFetch.test.ts         # Wrong base name casing
```

---

## Complete Module Example

```
modules/exchange-rate/           # kebab-case folder
├── pages/
│   └── ExchangeRateList.tsx    # PascalCase component
├── components/
│   ├── RateCard.tsx            # PascalCase component
│   └── RateFilter.tsx          # PascalCase component
├── hooks/
│   ├── useExchangeRate.ts      # camelCase hook
│   └── tests/
│       └── useExchangeRate.test.ts  # camelCase + .test
├── services/
│   └── exchange-rate.service.ts     # kebab-case + .service
├── interfaces/
│   ├── exchange-rate.interface.ts   # kebab-case + .interface
│   └── rate-filter.interface.ts     # kebab-case + .interface
├── enums/
│   └── currency-type.enum.ts        # kebab-case + .enum
└── constants/
    └── rate-constants.ts            # kebab-case
```
