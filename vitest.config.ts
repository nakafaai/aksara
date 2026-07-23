import { existsSync } from "node:fs";
import { basename, resolve } from "node:path";
import { defineConfig } from "vitest/config";

const workspaceName = basename(process.cwd());
const isCorpus = workspaceName === "corpus";
const sourceRoot = resolve(process.cwd(), isCorpus ? "." : "src");
const isRoot = existsSync(resolve(process.cwd(), "turbo.json"));
const isContracts = workspaceName === "contracts";
const entrySources = workspaceName === "cli" ? ["main.ts"] : [];
const toolingSources = isRoot || isContracts ? ["scripts/**/*.ts"] : [];
const packageSources = isCorpus
  ? [
      "articles/**/*.ts",
      "curriculum/**/*.ts",
      "material/**/*.ts",
      "program/**/*.ts",
      "quran/**/*.ts",
      "question-bank/*.ts",
      "route/**/*.ts",
      "team/**/*.ts",
      "tryout/**/*.ts",
    ]
  : ["src/**/*.ts", "src/**/*.tsx", "src/**/*.mts", "src/**/*.cts"];

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
      exclude: ["**/*.test.ts", "test/**/*.ts"],
      include: [...entrySources, ...toolingSources, ...packageSources],
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
