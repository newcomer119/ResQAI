import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      // You can keep this if you have specific external dependencies
      // external: ["react-leaflet"]
    }
  }
});
