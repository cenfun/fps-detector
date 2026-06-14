import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig(({ mode }) => {
    const isDocs = mode === 'docs';

    const buildConfig = isDocs ? {
        outDir: 'docs',
        emptyOutDir: true
    } : {
        lib: {
            entry: resolve(import.meta.dirname, 'src/index.js'),
            name: 'fps-detector',
            formats: ['umd', 'es'],
            fileName: (format) => `fps-detector${format === 'es' ? '.esm' : ''}.js`
        },
        sourcemap: false,
        emptyOutDir: true,
        rollupOptions: {
            output: {
                exports: 'named'
            }
        }
    };

    return {
        server: {
            open: true
        },
        build: buildConfig
    };
});
