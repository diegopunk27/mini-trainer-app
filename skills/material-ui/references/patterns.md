# Material-UI Patterns - Detailed Examples

## Styling Methods

### sx Prop Examples

```typescript
<Box
  sx={{
    // Spacing (1 unit = 8px by default)
    padding: 2,        // 16px
    margin: { xs: 1, md: 2 },  // Responsive

    // Colors
    backgroundColor: 'primary.main',
    color: 'text.primary',
    borderColor: 'divider',

    // Typography
    typography: 'h6',
    fontWeight: 'bold',

    // Breakpoints
    display: { xs: 'none', md: 'block' },

    // Pseudo-selectors
    '&:hover': {
      backgroundColor: 'primary.dark',
    },
  }}
>
  Content
</Box>
```

### styled() API

```typescript
import { styled } from '@mui/material/styles'
import { Button } from '@mui/material'

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  padding: theme.spacing(2),
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}))

// Usage
const Component = () => {
  return <StyledButton>Click</StyledButton>
}
```

---

## Layout Components

### Grid System

```typescript
<Grid container spacing={2}>
  <Grid item xs={12} md={6}>
    <div>Left column</div>
  </Grid>
  <Grid item xs={12} md={6}>
    <div>Right column</div>
  </Grid>
</Grid>
```

**Grid Props:**

- `container`: Makes the element a grid container
- `item`: Makes the element a grid item
- `spacing`: Gap between items (1 = 8px)
- `xs`, `sm`, `md`, `lg`, `xl`: Column widths (1-12)

### Stack Component

```typescript
<Stack direction="row" spacing={2} alignItems="center">
  <Button>Action 1</Button>
  <Button>Action 2</Button>
  <Button>Action 3</Button>
</Stack>
```

---

## Common Components

### Typography

```typescript
<>
  <Typography variant="h1" component="h1">
    Main Title
  </Typography>

  <Typography variant="h6" component="h2">
    Subtitle
  </Typography>

  <Typography variant="body1" color="text.secondary">
    Description text
  </Typography>

  <Typography variant="caption" sx={{ fontStyle: 'italic' }}>
    Small text
  </Typography>
</>
```

### Button Variants

```typescript
<>
  <Button variant="contained" color="primary">
    Primary Action
  </Button>

  <Button variant="outlined" color="secondary">
    Secondary Action
  </Button>

  <Button variant="text">
    Tertiary Action
  </Button>

  <Button variant="contained" disabled sx={{ marginLeft: 2 }}>
    Disabled
  </Button>
</>
```

### TextField

```typescript
<TextField
  label="Email"
  type="email"
  value={value}
  onChange={(e) => setValue(e.target.value)}
  fullWidth
  required
  error={!value}
  helperText={!value ? 'Email is required' : ''}
  sx={{ marginBottom: 2 }}
/>
```

### Paper & Card

```typescript
// Elevated surface
<Paper elevation={3} sx={{ padding: 2 }}>
  <Typography>Content in elevated surface</Typography>
</Paper>

// Card with actions
<Card>
  <CardContent>
    <Typography variant="h5">Card Title</Typography>
    <Typography variant="body2">Card description</Typography>
  </CardContent>
  <CardActions>
    <Button size="small">Action</Button>
  </CardActions>
</Card>
```

---

## Responsive Design

### Responsive sx Prop

```typescript
<Box
  sx={{
    padding: {
      xs: 1,  // 8px on mobile
      sm: 2,  // 16px on tablet
      md: 3,  // 24px on desktop
    },

    display: {
      xs: 'none',   // Hidden on mobile
      md: 'block',  // Visible on desktop
    },

    fontSize: {
      xs: '0.875rem',
      md: '1rem',
    },
  }}
>
  Content
</Box>
```

### Responsive Grid

```typescript
<Grid container spacing={2}>
  <Grid item xs={12} sm={6} md={4}>
    {/* Full on mobile, half on tablet, third on desktop */}
  </Grid>
  <Grid item xs={12} sm={6} md={4}>
    {/* Same */}
  </Grid>
  <Grid item xs={12} sm={6} md={4}>
    {/* Same */}
  </Grid>
</Grid>
```

---

## Theme Usage

### Using Theme Values

```typescript
const Component = () => {
  const theme = useTheme()

  return (
    <Box
      sx={{
        padding: theme.spacing(2),
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.text.primary,

        [theme.breakpoints.up('md')]: {
          padding: theme.spacing(3),
        },

        transition: theme.transitions.create(['background-color'], {
          duration: theme.transitions.duration.standard,
        }),
      }}
    >
      Content
    </Box>
  )
}
```

### Common Theme Values

```typescript
// Palette
theme.palette.primary.main;
theme.palette.secondary.main;
theme.palette.error.main;
theme.palette.text.primary;
theme.palette.text.secondary;
theme.palette.background.default;
theme.palette.divider;

// Spacing
theme.spacing(1); // 8px
theme.spacing(2); // 16px

// Shape
theme.shape.borderRadius; // 4px
```

---

## Icons

```typescript
import { Add, Delete, Edit, Search } from '@mui/icons-material'

// Icon in button
<Button startIcon={<Add />} variant="contained">
  Add Item
</Button>

// Icon button
<IconButton color="primary" onClick={handleEdit}>
  <Edit />
</IconButton>

// Icon with custom size
<Search sx={{ fontSize: 32, color: 'primary.main' }} />
```

---

## Common Patterns

### Page Layout

```typescript
const PageLayout = () => {
  return (
    <Box sx={{ padding: 3 }}>
      {/* Header */}
      <Box sx={{ marginBottom: 3, display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h4">Page Title</Typography>
        <Button variant="contained" startIcon={<Add />}>
          Add New
        </Button>
      </Box>

      {/* Content */}
      <Grid container spacing={3}>
        <Grid item xs={12}>
          {/* Main content */}
        </Grid>
      </Grid>
    </Box>
  )
}
```

### Form Layout

```typescript
const FormLayout = () => {
  return (
    <Box component="form" sx={{ maxWidth: 600 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField label="Name" fullWidth required />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="Email" type="email" fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="Phone" fullWidth />
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
            <Button variant="outlined">Cancel</Button>
            <Button variant="contained" type="submit">Submit</Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}
```

### Modal/Dialog

```typescript
const ModalComponent = ({ open, onClose }: Props) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Modal Title</DialogTitle>
      <DialogContent>
        {/* Modal content */}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  )
}
```

---

## Performance Tips

1. **Import only what you need:**

   ```typescript
   import { Button, Box } from '@mui/material';
   // Not: import * as MUI from '@mui/material'
   ```

2. **Memoize or move sx objects outside:**

   ```typescript
   const boxSx = { padding: 2 }
   const Component = () => {
     return <Box sx={boxSx}>Content</Box>
   }
   ```

3. **Use Stack instead of Box with flexbox when possible**
