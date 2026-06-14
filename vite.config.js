import { defineConfig } from 'vite';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { readFileSync, writeFileSync, rmSync, cpSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function docsPlugin() {
    return {
        name: 'docs-plugin',
        closeBundle() {
            // 1. 同步构建产物到 docs/dist
            const src = resolve(__dirname, 'dist');
            const dest = resolve(__dirname, 'docs/dist');
            rmSync(dest, { recursive: true, force: true });
            cpSync(src, dest, { recursive: true });

            // 2. 从根 index.html 生成 docs/index.html
            const pkg = JSON.parse(readFileSync(resolve(__dirname, 'package.json'), 'utf-8'));
            const version = pkg.version;
            const html = readFileSync(resolve(__dirname, 'index.html'), 'utf-8');

            const docsHtml = html.replace(
                /<script type="module">[\s\S]*?<\/script>/,
                `<!--inject:start-->\n    <script src="dist/fps-detector.js?v=${version}"></script>\n    <!--inject:end-->\n    <script>\n        const FPSDetector = window['fps-detector'].FPSDetector;\n        new FPSDetector('.fps-detector');\n    </script>`
            );

            writeFileSync(resolve(__dirname, 'docs/index.html'), docsHtml, 'utf-8');
            console.log('  ✓ docs/index.html generated');
        }
    };
}

export default defineConfig({
    server: {
        open: true
    },
    build: {
        lib: {
            entry: resolve(__dirname, 'src/index.js'),
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
    },
    plugins: [docsPlugin()]
});
