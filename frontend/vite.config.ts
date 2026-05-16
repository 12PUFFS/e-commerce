import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],

  // 👇 ВАЖНО: Для локальной разработки оставь пустым или '/'
  base: '/',

  server: {
    port: 5173, // 👇 Явно укажи порт 5173
    strictPort: true, // Если порт занят, Vite упадет с ошибкой, а не займет другой
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8000', // Перенаправляем API-запросы на Django
        changeOrigin: true,
      },
    },
    // open: true,
  },
});
