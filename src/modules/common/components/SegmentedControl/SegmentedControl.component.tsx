import { Box, Button } from '@mui/material';

export interface SegmentedOption<T extends string> {
  key: T;
  label: string;
  count?: number;
}

export const SegmentedControl = <T extends string>({
  options,
  value,
  onChange,
}: {
  options: Array<SegmentedOption<T>>;
  value: T;
  onChange: (value: T) => void;
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        border: 1,
        borderColor: 'divider',
        borderRadius: '9px',
        bgcolor: 'background.paper',
      }}
    >
      {options.map((option) => {
        const selected = option.key === value;
        return (
          <Button
            key={option.key}
            onClick={() => onChange(option.key)}
            sx={{
              borderRadius: 0,
              borderLeft: 1,
              borderColor: 'divider',
              px: 1.5,
              py: 0.75,
              minWidth: 0,
              fontSize: 12.5,
              fontWeight: selected ? 600 : 450,
              color: selected ? 'primary.main' : 'text.secondary',
              bgcolor: selected ? 'accentSoft' : 'background.paper',
              '&:first-of-type': { borderLeft: 0 },
            }}
          >
            {option.label}
            {option.count !== undefined ? (
              <Box component="span" sx={{ ml: 0.75, fontSize: 11, opacity: 0.6 }}>
                {option.count}
              </Box>
            ) : null}
          </Button>
        );
      })}
    </Box>
  );
};
