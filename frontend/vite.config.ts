import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, resolve(__dirname, '..'), '');

  return {
    plugins: [react()],
    server: {
      port: Number(env.VITE_FRONTEND_PORT)||5173,
    },
    define: {
      'import.meta.env.VITE_FRONTEND_PORT': JSON.stringify(env.VITE_FRONTEND_PORT),
      'import.meta.env.VITE_BACKEND_SERVER_PORT': JSON.stringify(env.VITE_BACKEND_SERVER_PORT)
    },
  };
});
