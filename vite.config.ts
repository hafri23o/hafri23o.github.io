import path from 'node:path'
import { defineConfig } from 'vite'
import solidPlugin from 'vite-plugin-solid'
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin'
import { createHtmlPlugin } from 'vite-plugin-html'
import manifest from './package.json'
import { mangleClassNames } from './lib/vite-mangle-classnames'
import { injectScriptsToHtmlDuringBuild } from './lib/vite-inject-scripts-to-html'
import { serviceWorker } from './lib/vite-service-worker'

const createMScreenshot = (name: string, sizes: string) => ({
  sizes,
  src: `/screenshots/${name}.webp`,
  type: 'image/webp',
})

export default defineConfig({
  base: '/',

  resolve: {
    alias: {
      '~': path.resolve(__dirname, './src'),
    },
  },

  // -------------------------------------------------------------------
  // BUILD SETTINGS (Render Safe)
  // -------------------------------------------------------------------
  build: {
    target: 'esnext',
    cssCodeSplit: false,

    // ❗ REPLACED terser → esbuild (fixes vanilla-extract errors)
    minify: 'esbuild',

    rollupOptions: {
      output: {
        manualChunks: undefined,
        preferConst: true,
      },
    },
  },

  // -------------------------------------------------------------------
  // FIX vanilla-extract + Solid + Render behaviour
  // -------------------------------------------------------------------
  optimizeDeps: {
    exclude: ['@vanilla-extract/css'],
  },

  ssr: {
    noExternal: ['@vanilla-extract/css', '@vanilla-extract/vite-plugin'],
  },

  // -------------------------------------------------------------------
  // PLUGINS
  // -------------------------------------------------------------------
  plugins: [
    createHtmlPlugin({ minify: true }),

    injectScriptsToHtmlDuringBuild({
      input: ['./src/disable-app-if-not-supported.ts'],
    }),

    mangleClassNames(),

    vanillaExtractPlugin(),  // must be BEFORE solidPlugin()

    solidPlugin({
      hot: false,
    }),

    serviceWorker({
      manifest: {
        short_name: 'Osho',
        name: 'Osho Digital Library',
        start_url: './',
        scope: './',
        theme_color: '#1a1a1a',
        background_color: '#1a1a1a',
        display: 'standalone',
        orientation: 'portrait',
        description: manifest.description,
        icons: [
          {
            src: '/icons/icon_responsive.svg',
            type: 'image/svg+xml',
            sizes: 'any',
            purpose: 'any',
          },
          {
            src: '/icons/icon_maskable.svg',
            type: 'image/svg+xml',
            sizes: 'any',
            purpose: 'maskable',
          },
        ],
        screenshots: [
          createMScreenshot('small_1', '1079x1919'),
          createMScreenshot('small_2', '1079x1919'),
          createMScreenshot('small_3', '1079x1919'),
          createMScreenshot('medium_1', '1276x960'),
          createMScreenshot('medium_2', '1276x960'),
          createMScreenshot('medium_3', '1276x960'),
        ],
      },
    }),
  ],
})
