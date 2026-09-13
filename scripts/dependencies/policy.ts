const VERSION_PATTERN = /^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/u;

export type DeclarationSource =
  | "catalog"
  | "node-runtime"
  | "package-manager"
  | "root-dev-dependency";

export interface DependencyHold {
  readonly approvedCurrent: string;
  readonly cohort: string;
  readonly dependency: string;
  readonly reason: string;
  readonly registry: string;
  readonly reviewedLatest: string;
  readonly source: DeclarationSource;
}

/** Explicit review decisions for dependency cohorts that cannot float safely. */
export const DEPENDENCY_HOLDS: readonly DependencyHold[] = [
  {
    approvedCurrent: "4.0.0-rc.115",
    cohort: "Effect",
    dependency: "effect",
    reason:
      "The contracts and both consumers share one exact Effect v4 peer cohort.",
    registry: "effect@rc",
    reviewedLatest: "4.0.0-rc.115",
    source: "catalog",
  },
  {
    approvedCurrent: "4.0.0-rc.115",
    cohort: "Effect",
    dependency: "@effect/platform-node",
    reason: "All Effect ecosystem packages must use one exact cohort.",
    registry: "@effect/platform-node@rc",
    reviewedLatest: "4.0.0-rc.115",
    source: "catalog",
  },
  {
    approvedCurrent: "4.0.0-rc.115",
    cohort: "Effect",
    dependency: "@effect/vitest",
    reason: "The test adapter must match the installed Effect cohort.",
    registry: "@effect/vitest@rc",
    reviewedLatest: "4.0.0-rc.115",
    source: "catalog",
  },
  {
    approvedCurrent: "5.0.0",
    cohort: "Effect testing",
    dependency: "vitest",
    reason: "The Effect RC115 test adapter requires Vitest version 5.",
    registry: "vitest@latest",
    reviewedLatest: "5.0.0",
    source: "catalog",
  },
  {
    approvedCurrent: "5.0.0",
    cohort: "Effect testing",
    dependency: "@vitest/coverage-istanbul",
    reason: "Coverage instrumentation must match the supported Vitest runner.",
    registry: "@vitest/coverage-istanbul@latest",
    reviewedLatest: "5.0.0",
    source: "catalog",
  },
  {
    approvedCurrent: "0.45.0",
    cohort: "Effect tooling",
    dependency: "@effect/tsgo",
    reason: "Compiler patching is reviewed with native TypeScript.",
    registry: "@effect/tsgo@latest",
    reviewedLatest: "0.45.0",
    source: "root-dev-dependency",
  },
  {
    approvedCurrent: "7.0.2",
    cohort: "TypeScript",
    dependency: "typescript",
    reason: "The native compiler, AST API, and Effect patch move together.",
    registry: "typescript@latest",
    reviewedLatest: "7.0.2",
    source: "catalog",
  },
  {
    approvedCurrent: "24.21.0",
    cohort: "Node 24",
    dependency: "node",
    reason: "Aksara supports the current Node 24 runtime line only.",
    registry: "node@24",
    reviewedLatest: "24.21.0",
    source: "node-runtime",
  },
  {
    approvedCurrent: "24.13.4",
    cohort: "Node 24",
    dependency: "@types/node",
    reason: "Node declarations must stay on the supported runtime major.",
    registry: "@types/node@24",
    reviewedLatest: "24.13.4",
    source: "root-dev-dependency",
  },
  {
    approvedCurrent: "2.5.13",
    cohort: "Biome and Ultracite",
    dependency: "@biomejs/biome",
    reason: "Formatter behavior is reviewed as one linting cohort.",
    registry: "@biomejs/biome@latest",
    reviewedLatest: "2.5.13",
    source: "root-dev-dependency",
  },
  {
    approvedCurrent: "7.11.1",
    cohort: "Biome and Ultracite",
    dependency: "ultracite",
    reason: "Formatter behavior is reviewed as one linting cohort.",
    registry: "ultracite@latest",
    reviewedLatest: "7.11.1",
    source: "root-dev-dependency",
  },
  {
    approvedCurrent: "11.27.0",
    cohort: "pnpm",
    dependency: "pnpm",
    reason:
      "OSV Scanner 2.5.1 skips the application graph after pnpm 12 adds a package-manager YAML document.",
    registry: "pnpm@latest",
    reviewedLatest: "12.4.1",
    source: "package-manager",
  },
];

/** Extracts the exact version from a direct, alias, or package-manager spec. */
export function declaredVersion(spec: string): string | undefined {
  return spec.match(
    new RegExp(`(${VERSION_PATTERN.source.slice(1, -1)})$`, "u")
  )?.[1];
}

/** Returns every dependency that routine pnpm updates must leave untouched. */
export function expectedIgnoredDependencies() {
  return DEPENDENCY_HOLDS.filter(({ source }) => source !== "package-manager")
    .map(({ dependency }) => dependency)
    .sort();
}
