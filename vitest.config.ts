import { basename, resolve } from "node:path";
import { defineConfig } from "vitest/config";

const workspaceName = basename(process.cwd());
const sourceRoot = resolve(process.cwd(), "src");
const entrySources = workspaceName === "cli" ? ["main.ts"] : [];

const config = defineConfig({
  resolve: {
    alias: [
      ...(workspaceName === "cli"
        ? [
            {
              find: "#cli/main",
              replacement: resolve(process.cwd(), "main.ts"),
            },
          ]
        : []),
      {
        find: new RegExp(`^#${workspaceName}/(.+)$`),
        replacement: `${sourceRoot}/$1.ts`,
      },
    ],
  },
  test: {
    coverage: {
      enabled: true,
      include: [
        ...entrySources,
        "src/**/*.ts",
        "src/**/*.tsx",
        "src/**/*.mts",
        "src/**/*.cts",
      ],
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
