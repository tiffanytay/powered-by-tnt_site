import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      // CRITICAL: Tells Vite's file watcher to completely ignore the library folders
      ignored: ['**/node_modules/**', '**/.git/**']
    }
  },
  optimizeDeps: {
    // Limits dependency scanning strictly to what your code explicitly requests
    include: ['react', 'react-dom', 'framer-motion', 'lucide-react']
  }
});