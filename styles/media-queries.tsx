export const breakpoints = {
  sm: 321, // SE
  md: 768, // タブレット
  lg: 1024, // PC
} as const;

export const mqMin = (key: keyof typeof breakpoints) =>
  `@media (min-width: ${breakpoints[key]}px)`;

export const mqMax = (key: keyof typeof breakpoints) =>
  `@media (max-width: ${breakpoints[key] - 1}px)`;
