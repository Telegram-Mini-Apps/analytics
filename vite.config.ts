import { defineConfig } from 'vite';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';
import obfuscator from 'rollup-plugin-obfuscator';

export default defineConfig({
  plugins: [
    typescript(),
    obfuscator(),
    terser(),
  ],
  build: {
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
