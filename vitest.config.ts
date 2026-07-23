import { existsSync } from "node:fs";
import { basename, resolve } from "node:path";
import { defineConfig } from "vitest/config";

const workspaceName = basename(process.cwd());
const sourceRoot = resolve(process.cwd(), "src");
const isRoot = existsSync(resolve(process.cwd(), "turbo.json"));
const isContracts = workspaceName === "contracts";
const entrySources = workspaceName === "cli" ? ["main.ts"] : [];
const toolingSources = isRoot || isContracts ? ["scripts/**/*.ts"] : [];

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
    ...(isRoot ? { include: ["scripts/**/*.test.ts"] } : {}),
    coverage: {
      enabled: true,
      include: [
        ...entrySources,
        ...toolingSources,
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
