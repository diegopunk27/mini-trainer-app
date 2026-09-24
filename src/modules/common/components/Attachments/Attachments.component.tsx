import { showErrorToast } from '@common/utils/show-toast';
import { Box, Button, Typography } from '@mui/material';
import { ChangeEvent } from 'react';

export interface AttachmentsProps {
  onFilesSelected: (files: Array<File>) => void;
  title?: string;
  fileExtensions?: Array<string>;
  max?: number;
  isDisabled?: boolean;
}

export const Attachments = ({
  onFilesSelected,
  title = 'Adjuntar archivos',
  fileExtensions,
  max,
  isDisabled,
}: AttachmentsProps) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []);
    if (max && files.length > max) {
      showErrorToast(`Podés adjuntar como máximo ${max} archivos`);
      return;
    }

    if (fileExtensions?.length) {
      const invalid = files.some(
        (file) => !fileExtensions.some((extension) => file.name.toLowerCase().endsWith(extension)),
      );
      if (invalid) {
        showErrorToast(`Solo se permiten: ${fileExtensions.join(', ')}`);
        return;
      }
    }

    onFilesSelected(files);
  };

  return (
    <Box>
      <Typography variant="subtitle2" sx={{ mb: 1 }}>
        {title}
      </Typography>
      <Button variant="outlined" component="label" disabled={isDisabled}>
        Seleccionar
        <input hidden type="file" multiple onChange={handleChange} />
      </Button>
    </Box>
  );
};
