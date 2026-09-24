/// <reference types="vitest/config" />
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@assets': path.resolve(import.meta.dirname, './src/assets/'),
      '@theme': path.resolve(import.meta.dirname, './src/modules/common/theme/'),
      '@common': path.resolve(import.meta.dirname, './src/modules/common/'),
      '@common-assets': path.resolve(import.meta.dirname, './src/modules/common/assets/'),
      '@common-components': path.resolve(import.meta.dirname, './src/modules/common/components/'),
      '@common-constants': path.resolve(import.meta.dirname, './src/modules/common/constants/'),
      '@common-contexts': path.resolve(import.meta.dirname, './src/modules/common/contexts/'),
      '@common-hooks': path.resolve(import.meta.dirname, './src/modules/common/hooks/'),
      '@common-interfaces': path.resolve(
        import.meta.dirname,
        './src/modules/common/interfaces/local/',
      ),
      '@common-pages': path.resolve(import.meta.dirname, './src/modules/common/pages/'),
      '@common-requests': path.resolve(
        import.meta.dirname,
        './src/modules/common/interfaces/api/requests/',
      ),
      '@common-responses': path.resolve(
        import.meta.dirname,
        './src/modules/common/interfaces/api/responses/',
      ),
      '@common-services': path.resolve(import.meta.dirname, './src/modules/common/services/'),
      '@global-constants': path.resolve(import.meta.dirname, './src/modules/global/constants/'),
      '@global-contexts': path.resolve(import.meta.dirname, './src/modules/global/contexts/'),
      '@global-pages': path.resolve(import.meta.dirname, './src/modules/global/pages/'),
      '@routes': path.resolve(import.meta.dirname, './src/routes/'),
      '@test-utils': path.resolve(import.meta.dirname, './src/test-utils/'),
      '@utils': path.resolve(import.meta.dirname, './src/utils/'),
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: './vitest.setup.ts',
    exclude: ['**/node_modules/**', '**/dist/**'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov'],
      thresholds: {
        lines: 40,
        branches: 20,
        functions: 25,
        statements: 40,
      },
    },
  },
});
