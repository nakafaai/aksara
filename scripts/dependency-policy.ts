const VERSION_PATTERN = /^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/u;

export const DEPENDENCY_RELEASE_AGE_MINUTES = 1440;
export const DEPENDENCY_RELEASE_AGE_EXCLUSIONS = ["nanoid@3.3.18"] as const;

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
    approvedCurrent: "4.0.0-rc.110",
    cohort: "Effect",
    dependency: "effect",
    reason:
      "Published contracts 0.15.0 and its active Nakafa consumer require the exact RC110 peer cohort.",
    registry: "effect@rc",
    reviewedLatest: "4.0.0-rc.111",
    source: "catalog",
  },
  {
    approvedCurrent: "4.0.0-rc.110",
    cohort: "Effect",
    dependency: "@effect/platform-node",
    reason: "All Effect ecosystem packages must use one exact cohort.",
    registry: "@effect/platform-node@rc",
    reviewedLatest: "4.0.0-rc.111",
    source: "catalog",
  },
  {
    approvedCurrent: "4.0.0-rc.110",
    cohort: "Effect",
    dependency: "@effect/vitest",
    reason: "The test adapter must match the installed Effect cohort.",
    registry: "@effect/vitest@rc",
    reviewedLatest: "4.0.0-rc.111",
    source: "catalog",
  },
  {
    approvedCurrent: "0.36.5",
    cohort: "Effect tooling",
    dependency: "@effect/tsgo",
    reason: "Compiler patching is reviewed with native TypeScript.",
    registry: "@effect/tsgo@latest",
    reviewedLatest: "0.36.5",
    source: "root-dev-dependency",
  },
  {
    approvedCurrent: "7.0.2",
    cohort: "TypeScript",
    dependency: "@typescript/native",
    reason: "The native compiler and Effect patch must move together.",
    registry: "typescript@latest",
    reviewedLatest: "7.0.2",
    source: "root-dev-dependency",
  },
  {
    approvedCurrent: "6.0.2",
    cohort: "TypeScript",
    dependency: "typescript",
    reason: "Programmatic consumers still require the TypeScript 6 API.",
    registry: "@typescript/typescript6@latest",
    reviewedLatest: "6.0.2",
    source: "catalog",
  },
  {
    approvedCurrent: "24.19.0",
    cohort: "Node 24",
    dependency: "node",
    reason: "Aksara supports the current Node 24 runtime line only.",
    registry: "node@24",
    reviewedLatest: "24.19.0",
    source: "node-runtime",
  },
  {
    approvedCurrent: "24.13.3",
    cohort: "Node 24",
    dependency: "@types/node",
    reason: "Node declarations must stay on the supported runtime major.",
    registry: "@types/node@24",
    reviewedLatest: "24.13.3",
    source: "root-dev-dependency",
  },
  {
    approvedCurrent: "2.5.9",
    cohort: "Biome and Ultracite",
    dependency: "@biomejs/biome",
    reason: "Formatter behavior is reviewed as one linting cohort.",
    registry: "@biomejs/biome@latest",
    reviewedLatest: "2.5.9",
    source: "root-dev-dependency",
  },
  {
    approvedCurrent: "7.10.5",
    cohort: "Biome and Ultracite",
    dependency: "ultracite",
    reason:
      "The latest release must clear the workspace minimumReleaseAge gate before adoption.",
    registry: "ultracite@latest",
    reviewedLatest: "7.10.6",
    source: "root-dev-dependency",
  },
  {
    approvedCurrent: "11.22.0",
    cohort: "pnpm",
    dependency: "pnpm",
    reason: "The package manager owns lockfile and workspace semantics.",
    registry: "pnpm@latest",
    reviewedLatest: "11.22.0",
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
