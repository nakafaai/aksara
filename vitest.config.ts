import { basename, resolve } from "node:path";
import { defineConfig } from "vitest/config";

const workspaceName = basename(process.cwd());
const sourceRoot = resolve(process.cwd(), "src");

const config = defineConfig({
  resolve: {
    alias: [
      {
        find: new RegExp(`^#${workspaceName}/(.+)\\.js$`),
        replacement: `${sourceRoot}/$1.ts`,
      },
    ],
  },
  test: {
    coverage: {
      enabled: true,
      include: ["src/**/*.ts", "src/**/*.tsx", "src/**/*.mts", "src/**/*.cts"],
      provider: "istanbul",
      thresholds: {
        100: true,
        perFile: true,
      },
    },
    environment: "node",
  },
});

export default config;
