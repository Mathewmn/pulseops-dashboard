import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  test: { environment: 'jsdom', setupFiles: ['./src/tests/setup.ts'], include: ['src/**/*.test.{ts,tsx}'] },
  plugins: [react()],
  worker: {
    format: 'es',
  },
  server: {
    port: 3000,
  },
});
