import swc from "unplugin-swc";
import { defineConfig } from "vitest/config";
import tsConfigPaths from "vitest-tsconfig-paths";

export default defineConfig({
  test: {
    include: ["**/*.e2e-spec.ts"],
    globals: true,
    root: "./",
    setupFiles: ["./test/setup-e2e.ts"],
    hookTimeout: 50000, 
    testTimeout: 50000,
  },
  plugins: [
    tsConfigPaths(),
    // This is required to build the test files with SWC
    swc.vite({
      // Explicitly set the module type to avoid inheriting this value from a `.swcrc` config file
      module: { type: "es6" },
    }),
  ],
});
