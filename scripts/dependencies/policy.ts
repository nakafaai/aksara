import { Array as Arr, Order, pipe, Schema } from "effect";

const VERSION_PATTERN = /^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/u;

const DeclarationSourceSchema = Schema.Literals([
  "catalog",
  "node-runtime",
  "package-manager",
  "root-dev-dependency",
]);
export type DeclarationSource = typeof DeclarationSourceSchema.Type;

const DependencyHoldSchema = Schema.Struct({
  approvedCurrent: Schema.String,
  cohort: Schema.String,
  dependency: Schema.String,
  reason: Schema.String,
  registry: Schema.String,
  reviewedLatest: Schema.String,
  source: DeclarationSourceSchema,
});
export type DependencyHold = typeof DependencyHoldSchema.Type;

/** Explicit review decisions for dependency cohorts that cannot float safely. */
export const DEPENDENCY_HOLDS: readonly DependencyHold[] = [
  {
    approvedCurrent: "4.0.1",
    cohort: "Effect",
    dependency: "effect",
    reason:
      "The contracts and both consumers share one exact Effect v4 peer cohort.",
    registry: "effect@latest",
    reviewedLatest: "4.0.1",
    source: "catalog",
  },
  {
    approvedCurrent: "4.0.1",
    cohort: "Effect",
    dependency: "@effect/platform-node",
    reason: "All Effect ecosystem packages must use one exact cohort.",
    registry: "@effect/platform-node@latest",
    reviewedLatest: "4.0.1",
    source: "catalog",
  },
  {
    approvedCurrent: "4.0.1",
    cohort: "Effect",
    dependency: "@effect/vitest",
    reason: "The test adapter must match the installed Effect cohort.",
    registry: "@effect/vitest@latest",
    reviewedLatest: "4.0.1",
    source: "catalog",
  },
  {
    approvedCurrent: "5.0.3",
    cohort: "Effect testing",
    dependency: "vitest",
    reason: "The Effect 4 test adapter requires Vitest version 5.",
    registry: "vitest@latest",
    reviewedLatest: "5.0.3",
    source: "catalog",
  },
  {
    approvedCurrent: "5.0.3",
    cohort: "Effect testing",
    dependency: "@vitest/coverage-istanbul",
    reason: "Coverage instrumentation must match the supported Vitest runner.",
    registry: "@vitest/coverage-istanbul@latest",
    reviewedLatest: "5.0.3",
    source: "catalog",
  },
  {
    approvedCurrent: "0.48.1",
    cohort: "Effect tooling",
    dependency: "@effect/tsgo",
    reason:
      "Compiler patching is reviewed with native TypeScript and Effect; 0.48 ships the standard libraries beside the compiler and adds per-export allow lists for unstable APIs.",
    registry: "@effect/tsgo@latest",
    reviewedLatest: "0.48.1",
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
    approvedCurrent: "24.19.1",
    cohort: "Node 24",
    dependency: "@types/node",
    reason: "Node declarations must stay on the supported runtime major.",
    registry: "@types/node@24",
    reviewedLatest: "24.19.1",
    source: "root-dev-dependency",
  },
  {
    approvedCurrent: "2.5.15",
    cohort: "Biome and Ultracite",
    dependency: "@biomejs/biome",
    reason: "Formatter behavior is reviewed as one linting cohort.",
    registry: "@biomejs/biome@latest",
    reviewedLatest: "2.5.15",
    source: "root-dev-dependency",
  },
  {
    approvedCurrent: "7.12.4",
    cohort: "Biome and Ultracite",
    dependency: "ultracite",
    reason: "Formatter behavior is reviewed as one linting cohort.",
    registry: "ultracite@latest",
    reviewedLatest: "7.12.4",
    source: "root-dev-dependency",
  },
  {
    approvedCurrent: "11.28.4",
    cohort: "pnpm",
    dependency: "pnpm",
    reason:
      "pnpm 12 records its own packages in a second YAML document at the top of the lockfile. OSV Scanner 2.6.0 reads both documents and Turborepo hashes each workspace as before, but GitHub's dependency graph reads only the first (dependabot/dependabot-core#15904), so it would report no application dependencies and close this repository's Dependabot alerts. The one setting that keeps a single document, `pmOnFail: ignore`, also stops pnpm from enforcing the pinned version. pnpm 12 moves here and in nakafa.com once GitHub reads both documents.",
    registry: "pnpm@latest",
    reviewedLatest: "12.9.1",
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
  return pipe(
    DEPENDENCY_HOLDS,
    Arr.filter(({ source }) => source !== "package-manager"),
    Arr.map(({ dependency }) => dependency),
    Arr.sort(Order.String)
  );
}
