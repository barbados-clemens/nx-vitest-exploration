///<reference types="vitest"/>
import {defineConfig} from "vite";

export default defineConfig({
  test: {
    /* for example, use global to avoid globals imports (describe, test, expect): */
    global: true,
    include: [
      '**/*.spec.ts', '**/*.test.ts',
    ],
  },
})
