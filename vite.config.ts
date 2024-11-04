import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // Adjust to your root folder
    },
  },
  // css: {
  //   preprocessorOptions: {
  //     scss: {
  //       additionalData: `@import "@/styles/breakpoints.scss";`
  //     }
  //   }
  // },
  test: {
    globals: true,                  // Enable Vitest global functions like describe, it, expect
    environment: 'jsdom',           // Use jsdom for DOM-related tests
    include: ['packages/**/tests/**/*.spec.ts'], // Specify the test files location
  },
});
