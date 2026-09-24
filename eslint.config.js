import js from '@eslint/js';
import prettier from 'eslint-config-prettier';
import projectStructure from 'eslint-plugin-project-structure';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: [
      'dist/**',
      'node_modules/**',
      'mcp-servers/**',
      'skills/**',
      'eslint.config.js',
      'naming-checker.mjs',
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  prettier,
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
      globals: {
        ...globals.browser,
        ...globals.es2021,
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'project-structure': projectStructure,
    },
    settings: {
      'project-structure/folder-structure-config-path': 'folderStructure.json',
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'variable',
          format: ['UPPER_CASE', 'camelCase', 'PascalCase'],
        },
        {
          selector: ['function'],
          format: ['camelCase', 'PascalCase'],
        },
        {
          selector: ['classMethod', 'classProperty', 'parameter'],
          format: ['camelCase'],
          leadingUnderscore: 'allow',
        },
        {
          selector: ['class', 'interface'],
          format: ['PascalCase'],
        },
      ],
      '@typescript-eslint/array-type': ['error', { default: 'generic' }],
      'project-structure/folder-structure': 'error',
    },
  },
);
