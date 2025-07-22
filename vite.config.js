// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    clearScreen: false, // So errors don’t disappear from terminal
  },
  build: {
    sourcemap: true, // Optional: makes stack trace readable
  },
});
