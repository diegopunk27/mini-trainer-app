import { appGridTheme } from '@theme/ag-grid-theme';
import {
  Box,
  FormControl,
  MenuItem,
  Pagination,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material';
import { ColDef, IRowNode, IsRowSelectable, RowSelectionOptions } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import { usePromiseTracker } from 'react-promise-tracker';

export interface PaginatedTableData<T> {
  results: Array<T>;
  count?: number;
}

export interface GenericTablePaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (event: React.ChangeEvent<unknown>, page: number) => void;
}

export interface GenericTableProps<T> {
  data: PaginatedTableData<T> | undefined;
  columnDefs: Array<ColDef<T>>;
  error?: { message: string };
  setSelectedRows?: (rows: Array<T>) => void;
  isRowSelectable?: IsRowSelectable;
  rowSelection?: RowSelectionOptions<T>['mode'];
  pagination?: GenericTablePaginationProps;
  limit?: number;
  handleLimitPerPageChange?: (event: SelectChangeEvent<number>) => void;
  id?: string;
}

export const GenericTable = <T,>({
  data,
  columnDefs,
  error,
  setSelectedRows,
  isRowSelectable,
  rowSelection,
  pagination,
  limit = 10,
  handleLimitPerPageChange,
  id,
}: GenericTableProps<T>) => {
  const { promiseInProgress } = usePromiseTracker();
  const rows = data?.results ?? [];

  return (
    <Box id={id}>
      <Box sx={{ width: '100%', height: 420 }}>
        <AgGridReact<T>
          theme={appGridTheme}
          rowData={rows}
          columnDefs={columnDefs}
          defaultColDef={{ sortable: true, resizable: true, flex: 1 }}
          rowSelection={rowSelection ? { mode: rowSelection, checkboxes: true } : undefined}
          isRowSelectable={isRowSelectable}
          onSelectionChanged={(event) => {
            const selected = event.api.getSelectedNodes().map((node: IRowNode<T>) => node.data);
            setSelectedRows?.(selected.filter((row): row is T => row !== undefined));
          }}
          overlayLoadingTemplate={promiseInProgress ? 'Cargando...' : undefined}
          overlayNoRowsTemplate={error?.message || 'No hay datos para mostrar'}
        />
      </Box>
      {pagination ? (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="body2">Filas por página</Typography>
            <FormControl size="small">
              <Select value={limit} onChange={handleLimitPerPageChange}>
                {[10, 20, 50].map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Pagination
            page={pagination.currentPage}
            count={pagination.totalPages}
            onChange={pagination.onPageChange}
            color="primary"
          />
        </Box>
      ) : null}
    </Box>
  );
};
