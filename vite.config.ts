import {defineConfig} from 'vite';
import obfuscator from 'vite-plugin-javascript-obfuscator';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import vitePluginWasmPack from "vite-plugin-wasm-pack";

export default defineConfig({
    plugins: [
        vitePluginWasmPack('src/wasm/human-proof'),
        obfuscator({
            options: {
                compact: true,
                controlFlowFlattening: true,
                deadCodeInjection: true,
                // debugProtection: true,
                // debugProtectionInterval: true, fixme
                // disableConsoleOutput: true,
            },
        }),
        viteStaticCopy({
            targets: [{
                src: 'src/workers',
                dest: 'assets',
            },
            {
                src: 'src/wasm/initWasmModule.js',
                dest: 'assets/wasm',
            }],
        })
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
            },
        },
    },
    publicDir: false,
});
