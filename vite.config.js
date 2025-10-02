// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    clearScreen: false, // So errors don’t disappear from terminal
    proxy: {
      "/api": {
        target: "https://propertyapi.slemtest.com.ng",
        changeOrigin: true,
        secure: false, // allow self-signed certs if needed
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  build: {
    sourcemap: true, // Optional: makes stack trace readable
  },
});
