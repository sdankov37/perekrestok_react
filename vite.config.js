import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ command }) => ({
  // На GitHub Pages сайт живёт в /perekrestok_react/, локально — в корне.
  base: command === 'build' ? '/perekrestok_react/' : '/',
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:8080',
    },
  },
}));
