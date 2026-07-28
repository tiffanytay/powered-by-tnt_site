import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // Relative asset paths: works unmodified whether this deploys to a
  // GitHub Pages project subpath (/powered-by-tnt_site/) or a custom
  // domain root (poweredbytnt.com/), no base-path config needed either way.
  base: './',
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