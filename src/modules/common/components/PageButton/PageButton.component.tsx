import { Box, Button, CircularProgress } from '@mui/material';
import { MouseEventHandler } from 'react';

export interface PageButtonProps {
  title: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: 'button' | 'submit';
  disabled?: boolean;
  loading?: boolean;
  loadingText?: string;
}

export const PageButton = ({
  title,
  onClick,
  type = 'button',
  disabled,
  loading,
  loadingText = 'Cargando...',
}: PageButtonProps) => (
  <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
    <Button variant="contained" type={type} onClick={onClick} disabled={disabled || loading}>
      {loading ? (
        <>
          <CircularProgress size={16} sx={{ mr: 1 }} />
          {loadingText}
        </>
      ) : (
        title
      )}
    </Button>
  </Box>
);
