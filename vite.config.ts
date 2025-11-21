/// <reference types="vitest" />
import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    server: {
      port: 3000,
      host: '0.0.0.0',
    },
    plugins: [react()],
    define: {
      'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      'process.env.JIOCX_ORGANIZATION_NAME': JSON.stringify(env.JIOCX_ORGANIZATION_NAME),
      'process.env.JIOCX_USERNAME': JSON.stringify(env.JIOCX_USERNAME),
      'process.env.JIOCX_PASSWORD': JSON.stringify(env.JIOCX_PASSWORD),
      'process.env.JIOCX_API_KEY': JSON.stringify(env.JIOCX_API_KEY),
      'process.env.JIOCX_SENDER_ID': JSON.stringify(env.JIOCX_SENDER_ID),
      'process.env.JIOCX_DLT_ENTITY_ID': JSON.stringify(env.JIOCX_DLT_ENTITY_ID),
      'process.env.JIOCX_API_BASE_URL': JSON.stringify(env.JIOCX_API_BASE_URL || 'https://api.jiocx.com/v1')
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      }
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './vitest.setup.ts',
    }
  };
});
