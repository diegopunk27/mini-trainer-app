import { useDebouncedEffect } from '@common-hooks/useDebouncedEffect';
import { sanitizeTextInput } from '@common/utils/helpers';
import { TextField } from '@mui/material';
import { useState } from 'react';

export interface SearchFiltersProps {
  onFilterChange: (value: string) => void;
  resetPagination?: () => void;
  placeholder?: string;
}

export const SearchFilters = ({
  onFilterChange,
  resetPagination,
  placeholder = 'Buscar',
}: SearchFiltersProps) => {
  const [value, setValue] = useState('');

  useDebouncedEffect(
    () => {
      onFilterChange(sanitizeTextInput(value));
      resetPagination?.();
    },
    () => undefined,
    [value],
    400,
  );

  return (
    <TextField
      size="small"
      value={value}
      placeholder={placeholder}
      onChange={(event) => setValue(event.target.value)}
    />
  );
};
