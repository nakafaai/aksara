import { defineConfig } from "vitest/config";

const config = defineConfig({
  ssr: {
    resolve: {
      conditions: [
        "aksara-source",
        "module",
        "node",
        "import",
        "default",
        "development|production",
      ],
    },
  },
  test: {
    coverage: {
      enabled: true,
      exclude: ["**/*.test.ts", "**/*.test.tsx", "**/test/**/*.ts"],
      provider: "istanbul",
      thresholds: {
        100: true,
        perFile: true,
      },
    },
    environment: "node",
    globals: true,
    testTimeout: 10_000,
  },
});

export default config;
