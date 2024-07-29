import {defineConfig} from 'vite';
import obfuscator from 'vite-plugin-javascript-obfuscator';
import wasmPack from 'vite-plugin-wasm-pack';

export default defineConfig({
    plugins: [
        wasmPack('./src/wasm/human-proof/'),
        obfuscator({
            options: {
                compact: true,
                controlFlowFlattening: true,
                deadCodeInjection: true,
                // debugProtection: true,
                // debugProtectionInterval: true, fixme
                // disableConsoleOutput: true,
            },
            exclude: [/workers/, /HumanProof.service.ts/, /wasm/]
        }),
    ],
    build: {
        emptyOutDir: true,
        minify: 'terser',
        terserOptions: {
            mangle:{
                keep_fnames: /^(HumanProofWorker|greet)$/,
            }
        },
        lib: {
            name: 'telegramAnalytics',
            formats: ['iife'],
            entry: 'src/index.ts',
            fileName(format) {
                return 'index.js';
            }
        },
    }
});
