export const BREAKPOINTS = {
  compact: 640,
  tablet: 900,
} as const;

export const BREAKPOINT_MQ = {
  compact: `(max-width: ${BREAKPOINTS.compact}px)`,
  tablet: `(max-width: ${BREAKPOINTS.tablet}px)`,
  touch: '(hover: none)',
} as const;

export const mqDown = (px: number): string => `@media (max-width: ${px}px)`;
