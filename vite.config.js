import { defineConfig } from 'vite';
import { resolve } from 'path';
import { copyFileSync } from 'fs';

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
        base: './',
        server: {
            open: true
        },
        build: buildConfig,
        plugins: isDocs ? [] : [{
            name: 'copy-dts',
            closeBundle() {
                copyFileSync(
                    resolve(import.meta.dirname, 'src/fps-detector.d.ts'),
                    resolve(import.meta.dirname, 'dist/fps-detector.d.ts')
                );
                console.log('  ✓ dist/fps-detector.d.ts copied');
            }
        }]
    };
});
