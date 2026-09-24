# AG Grid Patterns - Detailed Examples

## Column Definitions

### Basic Column Types

```typescript
const columnDefs: ColDef<RowData>[] = [
  // Text column
  {
    field: 'name',
    headerName: 'Name',
    flex: 1,
    sortable: true,
    filter: 'agTextColumnFilter',
  },

  // Number column
  {
    field: 'price',
    headerName: 'Price',
    width: 120,
    type: 'numericColumn',
    filter: 'agNumberColumnFilter',
    valueFormatter: (params) => `$${params.value}`,
  },

  // Date column
  {
    field: 'createdAt',
    headerName: 'Created',
    filter: 'agDateColumnFilter',
    valueFormatter: (params) => new Date(params.value).toLocaleDateString(),
  },

  // Boolean column
  {
    field: 'isActive',
    headerName: 'Active',
    width: 100,
    cellRenderer: (params) => (params.value ? '✓' : '✗'),
  },
];
```

### Column Configuration Options

```typescript
interface ColDef {
  field: string; // Data property
  headerName?: string; // Display name
  width?: number; // Fixed width
  flex?: number; // Flexible width
  minWidth?: number; // Minimum width
  sortable?: boolean; // Enable sorting
  filter?: boolean | string; // Enable filtering
  resizable?: boolean; // Allow resize
  editable?: boolean; // Allow editing
  hide?: boolean; // Initially hidden
  pinned?: 'left' | 'right'; // Pin column
  cellRenderer?: any; // Custom renderer
  valueFormatter?: (params) => string;
  valueGetter?: (params) => any;
  comparator?: (a, b) => number;
}
```

---

## Cell Renderers

### Component Cell Renderer

```typescript
// StatusCellRenderer.tsx
export const StatusCellRenderer = (params: ICellRendererParams) => {
  const { value } = params

  return (
    <Box
      sx={{
        padding: '4px 8px',
        borderRadius: 1,
        backgroundColor: value === 'active' ? 'success.light' : 'error.light',
        color: value === 'active' ? 'success.dark' : 'error.dark',
        textAlign: 'center',
      }}
    >
      {value}
    </Box>
  )
}

// Usage
{
  field: 'status',
  headerName: 'Status',
  cellRenderer: StatusCellRenderer,
}
```

### Action Cell Renderer

```typescript
interface ActionsCellProps extends ICellRendererParams<Supplier> {
  onEdit: (id: number) => void
  onDelete: (id: number) => void
}

export const ActionsCellRenderer = (params: ActionsCellProps) => {
  const { data, onEdit, onDelete } = params

  if (!data) return null

  return (
    <Box sx={{ display: 'flex', gap: 1 }}>
      <IconButton size="small" onClick={() => onEdit(data.id)}>
        <Edit />
      </IconButton>
      <IconButton size="small" onClick={() => onDelete(data.id)}>
        <Delete />
      </IconButton>
    </Box>
  )
}

// Usage
{
  headerName: 'Actions',
  cellRenderer: ActionsCellRenderer,
  cellRendererParams: {
    onEdit: handleEdit,
    onDelete: handleDelete,
  },
  width: 120,
  sortable: false,
  filter: false,
}
```

---

## Grid API

### Accessing Grid API

```typescript
const SupplierGrid = () => {
  const gridRef = useRef<AgGridReact<Supplier>>(null)

  const onGridReady = (params: GridReadyEvent) => {
    params.api.sizeColumnsToFit()
  }

  const exportToCSV = () => {
    gridRef.current?.api.exportDataAsCsv()
  }

  const getSelectedRows = () => {
    const selectedRows = gridRef.current?.api.getSelectedRows()
    console.log(selectedRows)
  }

  return (
    <>
      <Button onClick={exportToCSV}>Export CSV</Button>
      <AgGridReact ref={gridRef} onGridReady={onGridReady} {...props} />
    </>
  )
}
```

### Common API Methods

```typescript
// Selection
gridRef.current?.api.getSelectedRows();
gridRef.current?.api.selectAll();
gridRef.current?.api.deselectAll();

// Filtering
gridRef.current?.api.setQuickFilter('search term');
gridRef.current?.api.getFilterModel();
gridRef.current?.api.setFilterModel(model);

// Data
gridRef.current?.api.setRowData(newData);
gridRef.current?.api.applyTransaction({ add: [newRow] });
gridRef.current?.api.applyTransaction({ remove: [rowToRemove] });
gridRef.current?.api.applyTransaction({ update: [updatedRow] });

// Column
gridRef.current?.api.sizeColumnsToFit();
gridRef.current?.api.autoSizeAllColumns();

// Export
gridRef.current?.api.exportDataAsCsv();
gridRef.current?.api.exportDataAsExcel();
```

---

## Filtering & Sorting

### Built-in Filters

```typescript
const columnDefs: ColDef[] = [
  {
    field: 'name',
    filter: 'agTextColumnFilter',
    filterParams: {
      buttons: ['reset', 'apply'],
      closeOnApply: true,
    },
  },
  {
    field: 'price',
    filter: 'agNumberColumnFilter',
    filterParams: {
      inRangeInclusive: true,
    },
  },
  {
    field: 'date',
    filter: 'agDateColumnFilter',
    filterParams: {
      comparator: (filterDate: Date, cellValue: string) => {
        const cellDate = new Date(cellValue);
        if (cellDate < filterDate) return -1;
        if (cellDate > filterDate) return 1;
        return 0;
      },
    },
  },
];
```

### Quick Filter (Global Search)

```typescript
const SupplierGrid = () => {
  const [searchText, setSearchText] = useState('')
  const gridRef = useRef<AgGridReact>(null)

  useEffect(() => {
    gridRef.current?.api.setQuickFilter(searchText)
  }, [searchText])

  return (
    <>
      <TextField
        placeholder="Search..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <AgGridReact ref={gridRef} {...gridProps} />
    </>
  )
}
```

### Custom Sort Comparator

```typescript
{
  field: 'status',
  sortable: true,
  comparator: (valueA: string, valueB: string) => {
    const order = { active: 1, pending: 2, inactive: 3 }
    return order[valueA] - order[valueB]
  },
}
```

---

## Pagination

### Client-Side Pagination

```typescript
<AgGridReact
  rowData={rowData}
  pagination={true}
  paginationPageSize={20}
  paginationPageSizeSelector={[10, 20, 50, 100]}
/>
```

### Server-Side Pagination

```typescript
const SupplierGrid = () => {
  const gridRef = useRef<AgGridReact>(null)

  const onGridReady = (params: GridReadyEvent) => {
    const datasource: IServerSideDatasource = {
      getRows: async (params) => {
        const { startRow, endRow, filterModel, sortModel } = params.request

        try {
          const response = await fetchSuppliers({
            offset: startRow,
            limit: endRow - startRow,
            filters: filterModel,
            sort: sortModel,
          })

          params.success({
            rowData: response.data,
            rowCount: response.total,
          })
        } catch (error) {
          params.fail()
        }
      },
    }

    params.api.setGridOption('serverSideDatasource', datasource)
  }

  return (
    <AgGridReact
      ref={gridRef}
      onGridReady={onGridReady}
      rowModelType="serverSide"
      serverSideInfiniteScroll={true}
      cacheBlockSize={20}
    />
  )
}
```

---

## Row Selection

### Selection with Checkboxes

```typescript
const columnDefs: ColDef[] = [
  {
    checkboxSelection: true,
    headerCheckboxSelection: true,
    width: 50,
  },
  // ... other columns
]

<AgGridReact
  columnDefs={columnDefs}
  rowSelection="multiple"
  suppressRowClickSelection={true}
  onSelectionChanged={onSelectionChanged}
/>
```

---

## Styling & Theming

### Theme Classes

```typescript
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'

<div className="ag-theme-alpine" style={{ height: 500 }}>
  <AgGridReact {...props} />
</div>
```

### Custom Row Styles

```typescript
<AgGridReact
  getRowClass={(params) => {
    return params.data.status === 'inactive' ? 'row-inactive' : ''
  }}
  getRowStyle={(params) => {
    if (params.data.priority === 'high') {
      return { backgroundColor: '#ffe6e6' }
    }
  }}
/>
```

### Custom Cell Styles

```typescript
{
  field: 'amount',
  cellStyle: (params) => {
    if (params.value < 0) {
      return { color: 'red', fontWeight: 'bold' }
    }
    return { color: 'green' }
  },
}
```

---

## Project Patterns

### Grid with Data Fetching

```typescript
import { useFetch } from '@common/hooks/useFetch'

const SupplierGrid = () => {
  const { data: suppliers, isLoading } = useFetch<Supplier[]>(
    () => '/api/suppliers',
    () => getData('/api/suppliers')
  )

  const columnDefs = useMemo<ColDef<Supplier>[]>(() => [
    { field: 'id', headerName: 'ID' },
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 1 },
  ], [])

  if (isLoading) return <CircularProgress />

  return (
    <div className="ag-theme-alpine" style={{ height: 400 }}>
      <AgGridReact rowData={suppliers || []} columnDefs={columnDefs} />
    </div>
  )
}
```

### Grid with MUI Integration

```typescript
const SupplierGrid = () => {
  return (
    <Box sx={{ padding: 3 }}>
      <Stack direction="row" spacing={2} sx={{ marginBottom: 2 }}>
        <Button variant="contained" onClick={handleAdd}>
          Add Supplier
        </Button>
        <Button variant="outlined" onClick={handleExport}>
          Export CSV
        </Button>
      </Stack>

      <Box sx={{ height: 600, width: '100%' }}>
        <div className="ag-theme-alpine" style={{ height: '100%' }}>
          <AgGridReact {...gridProps} />
        </div>
      </Box>
    </Box>
  )
}
```

---

## Common Mistakes

### 1. Not Memoizing Column Defs

```typescript
// Bad
const Component = () => {
  const columnDefs = [{ field: 'name' }]
  return <AgGridReact columnDefs={columnDefs} />
}

// Good
const Component = () => {
  const columnDefs = useMemo(() => [{ field: 'name' }], [])
  return <AgGridReact columnDefs={columnDefs} />
}
```

### 2. Forgetting Grid Height

```typescript
// Bad - Grid won't render
<AgGridReact rowData={data} />

// Good
<div style={{ height: 400 }}>
  <AgGridReact rowData={data} />
</div>
```

### 3. Direct State Mutation

```typescript
// Bad
const handleUpdate = () => {
  rowData[0].name = 'New Name';
  setRowData(rowData);
};

// Good
const handleUpdate = () => {
  const updatedData = rowData.map((row, i) => (i === 0 ? { ...row, name: 'New Name' } : row));
  setRowData(updatedData);
};
```
