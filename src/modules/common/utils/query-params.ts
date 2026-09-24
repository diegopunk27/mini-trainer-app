export const toQueryParams = (
  params: Record<string, string | number | boolean | undefined | null>,
): Record<string, string | number | boolean> => {
  const result: Record<string, string | number | boolean> = {};
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      result[key] = value;
    }
  });
  return result;
};
