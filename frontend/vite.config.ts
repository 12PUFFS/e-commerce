import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/react_router/',
  server: {
    port: 8000,
    open: true,
  },
});
