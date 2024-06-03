import {defineConfig} from 'vite';
import obfuscator from 'vite-plugin-javascript-obfuscator';

export default defineConfig({
    plugins: [
        obfuscator({
            options: {
                compact: true,
                controlFlowFlattening: true,
                deadCodeInjection: true,
                debugProtection: true,
                // debugProtectionInterval: true, fixme
                disableConsoleOutput: true,
            },
        }),
    ],
    build: {
        emptyOutDir: true,
        minify: 'terser',
        lib: {
            name: 'telegramAnalytics',
            formats: ['iife'],
            entry: 'src/index.ts',
            fileName(format) {
                return 'index.js';
            }
        }
    }
});
