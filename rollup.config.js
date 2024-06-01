import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';
import obfuscator from 'rollup-plugin-obfuscator';

export default {
    input: 'src/index.ts',
    output: {
        dir: 'dist',
        format: 'iife',
        name: 'telegramAnalytics',
    },
    plugins: [
        typescript(),
        terser(),
        obfuscator({
            compact: true,
            controlFlowFlattening: true,
            deadCodeInjection: true,
            debugProtection: true,
            debugProtectionInterval: true,
            disableConsoleOutput: true,
        }),
    ],
};
