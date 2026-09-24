import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@mui/material';
import { useState } from 'react';

export interface ConfirmDialogProps {
  open: boolean;
  title: string;
  content: string;
  onClose: () => void;
  onConfirm: (comment?: string) => void;
  confirmLabel?: string;
  cancelLabel?: string;
  withComment?: boolean;
}

export const ConfirmDialog = ({
  open,
  title,
  content,
  onClose,
  onConfirm,
  confirmLabel = 'Confirmar',
  cancelLabel = 'Cancelar',
  withComment = false,
}: ConfirmDialogProps) => {
  const [comment, setComment] = useState('');

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ mb: withComment ? 2 : 0 }}>{content}</DialogContentText>
        {withComment ? (
          <TextField
            fullWidth
            multiline
            minRows={3}
            label="Comentario"
            value={comment}
            onChange={(event) => setComment(event.target.value)}
          />
        ) : null}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{cancelLabel}</Button>
        <Button variant="contained" onClick={() => onConfirm(comment)}>
          {confirmLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
