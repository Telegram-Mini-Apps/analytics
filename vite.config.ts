import { defineConfig } from 'vite';
import obfuscator from 'rollup-plugin-obfuscator';

export default defineConfig({
  plugins: [
    obfuscator(),
  ],
  build: {
    minify: 'terser',
    rollupOptions: {
      input: 'src/index.ts',
      output: {
        dir: 'dist',
        format: 'iife',
        name: 'telegramAnalytics',
      },
    }
  }
});
