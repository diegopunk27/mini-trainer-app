export interface ValidationRule {
  validate: (value: unknown) => boolean;
  message: string;
}

export type ValidationConfig = Record<string, Array<ValidationRule>>;

export const useFormValidation = (validationConfig: ValidationConfig) => {
  const generateErrorValidation = (
    values: Record<string, unknown>,
  ): Record<string, string | undefined> => {
    const errors: Record<string, string | undefined> = {};

    Object.entries(validationConfig).forEach(([field, rules]) => {
      const failedRule = rules.find((rule) => !rule.validate(values[field]));
      errors[field] = failedRule?.message;
    });

    return errors;
  };

  return { generateErrorValidation };
};
