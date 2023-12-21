// vite.config.ts
/// <reference types="vitest" />
import {defineConfig} from "vite";

export default defineConfig({
    build: {
        rollupOptions: {
            output: {
                preserveModules: true,
            },
            preserveEntrySignatures: "strict",
        },
    },
    test: {
        includeSource: ["src/**/*.{js,ts}"],
        globals: true
    },
    define: {
        "import.meta.vitest": "undefined",
    },
});
