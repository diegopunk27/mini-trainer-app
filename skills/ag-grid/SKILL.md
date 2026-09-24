# AG Grid - React Template Base

---

name: ag-grid
description: >
AG Grid patterns for enterprise data tables with React + TypeScript. Use when: Creating data tables, implementing grid features, customizing columns, handling large datasets, or fixing grid issues.
license: MIT
metadata:
author: template-team
version: "1.0.0"
scope: [root]
auto_invoke: - "Creating data tables" - "Grid configuration" - "Column definitions" - "Custom cell renderers" - "Grid performance issues"
---

## Critical Rules

- **ALWAYS** use TypeScript interfaces for row data
- **ALWAYS** memoize column definitions with useMemo
- **ALWAYS** use ag-grid-react wrapper for React integration
- **ALWAYS** handle grid API with useRef
- **ALWAYS** set a height for the grid container
- **NEVER** mutate row data directly (use immutable updates)
- **NEVER** create new column definitions on every render
- **NEVER** forget to import AG Grid styles

---

## Quick Reference

| Feature           | Use Case              | Example                                   |
| ----------------- | --------------------- | ----------------------------------------- |
| **AgGridReact**   | Main grid component   | `<AgGridReact rowData={data} />`          |
| **columnDefs**    | Define columns        | `[{ field: 'name', headerName: 'Name' }]` |
| **defaultColDef** | Default column config | `{ sortable: true, filter: true }`        |
| **rowData**       | Data to display       | `rowData={suppliers}`                     |
| **gridApi**       | Grid API reference    | `gridRef.current.api`                     |
| **cellRenderer**  | Custom cell content   | `cellRenderer: CustomCell`                |
| **getRowId**      | Unique row identifier | `getRowId={(params) => params.data.id}`   |

---

## Basic Setup

```typescript
import { useMemo, useRef } from 'react'
import { AgGridReact } from 'ag-grid-react'
import type { ColDef } from 'ag-grid-community'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'

interface Supplier {
  id: number
  name: string
  status: 'active' | 'inactive'
}

const SupplierGrid = () => {
  const gridRef = useRef<AgGridReact<Supplier>>(null)

  // Memoize column definitions
  const columnDefs = useMemo<ColDef<Supplier>[]>(() => [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'status', headerName: 'Status', width: 120 },
  ], [])

  const defaultColDef = useMemo<ColDef>(() => ({
    sortable: true,
    filter: true,
    resizable: true,
  }), [])

  return (
    <div className="ag-theme-alpine" style={{ height: 400, width: '100%' }}>
      <AgGridReact<Supplier>
        ref={gridRef}
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
      />
    </div>
  )
}
```

---

## Column Types

| Type       | Filter                 | Example                                           |
| ---------- | ---------------------- | ------------------------------------------------- |
| **Text**   | `agTextColumnFilter`   | `{ field: 'name', filter: 'agTextColumnFilter' }` |
| **Number** | `agNumberColumnFilter` | `{ field: 'price', type: 'numericColumn' }`       |
| **Date**   | `agDateColumnFilter`   | `{ field: 'date', filter: 'agDateColumnFilter' }` |

---

## Common API Methods

```typescript
// Selection
gridRef.current?.api.getSelectedRows();

// Filtering
gridRef.current?.api.setQuickFilter('search term');

// Data updates
gridRef.current?.api.applyTransaction({ add: [newRow] });

// Export
gridRef.current?.api.exportDataAsCsv();
```

---

## Common Mistakes

1. **Not memoizing columnDefs** -> Creates new array every render
2. **Forgetting grid height** -> Grid won't render without height
3. **Direct state mutation** -> Use immutable updates or `applyTransaction`

---

## Resources

- [Detailed Patterns](references/patterns.md) - Cell renderers, filtering, pagination
- [AG Grid React Docs](https://www.ag-grid.com/react-data-grid/)
- [Column Properties](https://www.ag-grid.com/react-data-grid/column-properties/)

---

**Remember**: Memoize column definitions, always set grid height, use TypeScript interfaces for row data, and leverage grid API for advanced features.
