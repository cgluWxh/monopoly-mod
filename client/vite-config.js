// import svgLoader from 'vite-svg-loader'
import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import path from 'path'
import postcss from 'postcss'

const brickPlugin = require('./scripts/brick-style')

export default defineConfig({
    base: '/',
    plugins: [
        // svgLoader({
        //   defaultImport: 'raw',
        // }),
        postcss({
            plugins: [require('autoprefixer')],
        }),
        reactRefresh(),
        brickPlugin(),
    ],
    build: {
        sourcemap: false,
        target: 'es2019',
        minify: 'esbuild',
        chunkSizeWarningLimit: 3000,
    },
    resolve: {
        alias: {
            //   '@': path.resolve(__dirname, './src'),
            //   '&': path.resolve(__dirname, './brickic'),
        },
    },
    optimizeDeps: {
        exclude: ['electron'],
    },
    server: {
        '/ws': {
            target: 'ws://localhost:8443',
            ws: true,
            rewriteWsOrigin: true,
        },
    }
})
