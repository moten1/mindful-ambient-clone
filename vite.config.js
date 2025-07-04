import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// Use environment variable to switch base for GitHub Pages or Lovable.dev
const isGitHubPages = process.env.VITE_PLATFORM === 'github';

export default defineConfig({
  plugins: [react()],
  base: isGitHubPages ? '/mindful-ambient-clone/' : '/', // Dynamic base
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: false,
  },
  server: {
    port: 3000,
    open: true,
  },
});
