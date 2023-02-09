import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  esbuild: {
    // development
    pure: true ? ['console.log', 'debugger'] : []
  },
  css: {
    preprocessorOptions: {
      scss: {
        // 此处修改为要被预处理的scss文件地址
        additionalData: '@import "@/styles/variable.scss"; @import "@/styles/mixin.scss";'
      }
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'), // 设置 `@` 指向 `src` 目录
      '@api': resolve(__dirname, 'src/api'),
      '@comp': resolve(__dirname, 'src/components'),
      '@util': resolve(__dirname, 'src/utils'),
      '@mixins': resolve(__dirname, 'src/mixins'),
      '@styles': resolve(__dirname, 'src/mixins')
    }
  },
  build: {
    target: 'es2015',
    cssTarget: 'chrome80',
    outDir: 'dist',
    chunkSizeWarningLimit: 2000
  }
})
