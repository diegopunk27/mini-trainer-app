import type { ITextFilterParams } from 'ag-grid-community';

export const genericTextFilterParams: ITextFilterParams = {
  filterOptions: ['contains', 'equals', 'startsWith'],
  debounceMs: 200,
  maxNumConditions: 1,
};
