# Common Components Reference

Detailed documentation for reusable components in `/modules/common/components/`.

---

## 1. GenericTable

**Location:** `src/modules/common/components/GenericTable.tsx`

**Purpose:** AG Grid-based table with pagination, selection, and loading states.

**When to use:**

- Tabular data display
- Server-side pagination
- Row selection
- Filtering and sorting

**Pattern:**

```typescript
import GenericTable from '@common/components/GenericTable'
import { ColDef } from 'ag-grid-community'

const columns: ColDef[] = [
  { field: 'id', headerName: 'ID' },
  { field: 'name', headerName: 'Nombre' },
  { field: 'status', headerName: 'Estado' },
]

<GenericTable
  data={suppliers}
  columnDefs={columns}
  gridStyles="ag-theme-quartz"
  rowSelection="multiple"
  setSelectedRows={setSelectedSuppliers}
  pagination={paginationProps}
/>
```

**Why this pattern:**

- AG Grid provides virtualization for large datasets
- Generic with TypeScript generics: `GenericTable<Supplier>`
- Integrated with `react-promise-tracker` for loading states
- Configurable pagination via props

**Key Props:**

- `data` - Data to display (typed with generic)
- `columnDefs` - Column definitions (AG Grid)
- `gridStyles` - AG Grid theme
- `rowSelection` - 'single' | 'multiple'
- `setSelectedRows` - Callback for selected rows
- `pagination` - Server-side pagination object

---

## 2. NavBar

**Location:** `src/modules/common/components/navbar/NavBar.tsx`

**Purpose:** Responsive navigation bar with desktop/mobile menu.

**Composition pattern:**

```
NavBar
├── MobileMenu      (< sm breakpoint)
├── DesktopMenu     (>= sm breakpoint)
└── UserMenu        (always visible)
```

**Why this pattern:**

- **Composition** over monolithic component (Single Responsibility)
- **Responsive** using MUI `useMediaQuery`
- **Subcomponents** easier to maintain

**When to modify:**

- Add new routes in `PRIVATE_PAGES` constant
- Change menu permission logic
- Adjust responsive styles

---

## 3. ConfirmDialog

**Location:** `src/modules/common/components/ConfirmDialog.tsx`

**Purpose:** Reusable confirmation dialog.

**Pattern:**

```typescript
import ConfirmDialog from '@common/components/ConfirmDialog'

<ConfirmDialog
  open={isDialogOpen}
  onClose={() => setIsDialogOpen(false)}
  onConfirm={handleDelete}
  title="Confirmar eliminación"
  message="¿Estás seguro de eliminar este proveedor?"
/>
```

**Why this pattern:**

- Centralizes confirmation UI
- Consistency across application
- Prevents user errors with explicit confirmation

---

## 4. LoadingErrorDisplay

**Location:** `src/modules/common/components/LoadingErrorDisplay.tsx`

**Purpose:** Centralized loading and error state handling.

**Pattern:**

```typescript
import LoadingErrorDisplay from '@common/components/LoadingErrorDisplay'

if (isLoading || error) {
  return <LoadingErrorDisplay isLoading={isLoading} error={error} />
}

return <div>{/* Normal content */}</div>
```

**Why this pattern:**

- Consistent state handling
- Uniform UX (same spinner, same error messages)
- Reduces boilerplate

---

## 5. Attachments

**Location:** `src/modules/common/components/Attachments.tsx`

**Purpose:** File attachment management (upload, download, delete).

**When to use:**

- Forms with attachments
- Detail pages with files

**Pattern:**

- Integrated with file services in `/common/services/file/`
- Handles multiple file types
- Preview and download support

---

## AG Grid Column Definitions

```typescript
import { ColDef } from 'ag-grid-community';
import ActionRenderer from '@common/components/ActionRenderer';

const columnDefs: ColDef[] = [
  {
    field: 'id',
    headerName: 'ID',
    width: 100,
  },
  {
    field: 'name',
    headerName: 'Nombre',
    flex: 1, // Flexible width
  },
  {
    headerName: 'Acciones',
    cellRenderer: ActionRenderer, // Custom renderer
    cellRendererParams: {
      onEdit: handleEdit,
      onDelete: handleDelete,
    },
  },
];
```

**Why:**

- `cellRenderer` for custom columns (buttons, badges, etc.)
- `flex` for responsive columns
- `cellRendererParams` to pass callbacks
