export const promiseDelay = (ms: number): Promise<void> =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

export const sanitizeTextInput = (value: string): string => value.trim();

export const formatDate = (value: Date | string, locale = 'es-AR'): string => {
  const date = value instanceof Date ? value : new Date(value);
  return date.toLocaleDateString(locale);
};
