import {defineConfig, UserConfig} from 'vite';
import obfuscator from 'vite-plugin-javascript-obfuscator';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import { minify } from 'terser';
import JavaScriptObfuscator from 'javascript-obfuscator'
import dts from 'vite-plugin-dts'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig(({ mode }): UserConfig => {
    if (mode === 'script') {
        return {
            plugins: [
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
                        src: 'src/workers/HumanProof.worker.js',
                        dest: 'assets/workers',
                        transform: async (content: string, filename: string) =>
                            JavaScriptObfuscator.obfuscate(
                                (await minify(content)).code,
                                {
                                    compact: true,
                                    controlFlowFlattening: true,
                                    deadCodeInjection: true,
                                }
                            ).getObfuscatedCode(),
                        rename: fileName => 'c3e068ebf11840ed3fc311a6f2df80b20fa05d25.js'
                    },
                        {
                            src: 'src/wasm/initWasmModule.js',
                            dest: 'assets/wasm',
                            transform: async (content: string, filename: string) =>
                                JavaScriptObfuscator.obfuscate(
                                    (await minify(content)).code,
                                    {
                                        compact: true,
                                        controlFlowFlattening: true,
                                        deadCodeInjection: true,
                                    }
                                ).getObfuscatedCode(),
                            rename: fileName => 'd2601c1d81d312e2edcccde782150cce47a66c30.js'
                        }, {
                            src: 'src/wasm/human-proof/pkg/human_proof_bg.wasm',
                            dest: 'assets/wasm',
                            rename: fileName => '89a2cb86e39babdfd9f59de57866041038c910be.wasm'
                        },],
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
        }
    } else if (mode === 'package') {
        return {
            plugins: [
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
                tsconfigPaths(),
                dts({
                    include: ['src/index.ts', 'src/declarations'],
                    outDir: 'lib/types',
                    insertTypesEntry: true,
                }),
            ],
            build: {
                outDir: 'lib',
                emptyOutDir: true,
                minify: 'terser',
                lib: {
                    name: 'telegramAnalytics',
                    formats: ['es', 'cjs'],
                    entry: 'src/index.ts',
                    fileName(format) {
                        if (format === 'es') {
                            return 'es/index.js'
                        } else if (format === 'cjs') {
                            return 'cjs/index.cjs';
                        }
                    },
                },
            },
            publicDir: false,
        }
    }
});
