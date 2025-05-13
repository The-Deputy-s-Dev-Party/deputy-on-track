import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, resolve(__dirname, '..'), '');

  return {
    plugins: [react()],
    server: {
      port: Number(env.VITE_FRONTEND_PORT)||5173,
    }
  };
});