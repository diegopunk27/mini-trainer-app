# Material-UI (MUI) - React Template Base

---

name: material-ui
description: >
Material-UI v5 patterns, theming, component customization, and styling best practices. Use when: Creating UI components, styling with MUI, using MUI components, customizing theme, or fixing layout issues.
license: MIT
metadata:
author: template-team
version: "1.0.0"
scope: [root]
auto_invoke: - "Creating UI components" - "Styling components" - "Using MUI components" - "Theme customization" - "Layout issues with Grid/Box"
---

## Critical Rules

- **ALWAYS** use `sx` prop for simple styling (preferred in project)
- **ALWAYS** use MUI Grid for layouts (not CSS Grid directly)
- **ALWAYS** use theme values (spacing, palette, breakpoints)
- **ALWAYS** use TypeScript with MUI component props
- **NEVER** use inline styles (use `sx` prop instead)
- **NEVER** import from `@mui/material` subpaths directly
- **NEVER** override MUI styles with `!important` (use correct specificity)

---

## Quick Reference

| Component      | Use Case                  | Import                                       |
| -------------- | ------------------------- | -------------------------------------------- |
| **Box**        | Generic container with sx | `import { Box } from '@mui/material'`        |
| **Grid**       | Layout system             | `import { Grid } from '@mui/material'`       |
| **Typography** | Text elements             | `import { Typography } from '@mui/material'` |
| **Button**     | Actions                   | `import { Button } from '@mui/material'`     |
| **TextField**  | Form inputs               | `import { TextField } from '@mui/material'`  |
| **Paper**      | Elevated surfaces         | `import { Paper } from '@mui/material'`      |
| **Stack**      | One-dimensional layouts   | `import { Stack } from '@mui/material'`      |

---

## sx Prop (Preferred)

```typescript
<Box
  sx={{
    padding: 2,                    // 16px (theme.spacing)
    backgroundColor: 'primary.main', // theme color
    borderRadius: 1,
    '&:hover': {
      backgroundColor: 'primary.dark',
    },
    // Responsive
    display: { xs: 'none', md: 'block' },
  }}
>
  Content
</Box>
```

---

## Layout with Grid

```typescript
<Grid container spacing={2}>
  <Grid item xs={12} md={6}>
    Left column
  </Grid>
  <Grid item xs={12} md={6}>
    Right column
  </Grid>
</Grid>
```

---

## Theme Values

| Type            | Example                              |
| --------------- | ------------------------------------ |
| **Spacing**     | `padding: 2` (16px)                  |
| **Colors**      | `'primary.main'`, `'text.secondary'` |
| **Breakpoints** | `{ xs: 'none', md: 'block' }`        |
| **Typography**  | `variant="h4"`, `variant="body1"`    |

---

## Common Mistakes

1. Using inline styles -> Use `sx` prop
2. Hardcoded values -> Use theme values
3. CSS Grid directly -> Use MUI Grid
4. Using `!important` -> Fix specificity properly

---

## Resources

- [Detailed Patterns](references/patterns.md) - Components, layouts, theming
- [MUI v5 Documentation](https://mui.com/material-ui/)
- [sx Prop Documentation](https://mui.com/system/getting-started/the-sx-prop/)

---

**Remember**: Use sx prop for styling, leverage theme values, use Grid for layouts, and follow MUI patterns for consistency.
