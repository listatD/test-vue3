import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import Pages from 'vite-plugin-pages'
import { fileURLToPath, URL } from 'node:url'
import { imagetools } from 'vite-imagetools'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [
    vue(),
    imagetools(),
    Pages({
      dirs: 'src/pages',
      exclude: ['**/*.spec.ts']
    }),
    AutoImport({
      imports: ['vue', 'vue-router', 'pinia', '@vueuse/core', 'vue-i18n'],
      dirs: ['src/composables', 'src/stores', 'src/utils'],
      vueTemplate: true,
      dts: true
    }),
    Components({
      dirs: ['src/components', 'src/layouts'],
      directoryAsNamespace: true,
      dts: true
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  test: {
    environment: 'happy-dom',
    globals: true
  }
})
