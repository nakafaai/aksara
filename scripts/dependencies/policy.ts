import { Array as Arr, Order, pipe, Schema } from "effect";

const VERSION_PATTERN = /^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/u;

const DeclarationSourceSchema = Schema.Literals([
  "catalog",
  "node-runtime",
  "override",
  "package-manager",
  "root-dev-dependency",
]);

/** One reviewed hold: the approved declaration, the reviewed upstream, and the reason for the hold. */
export const DependencyHoldSchema = Schema.Struct({
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
    approvedCurrent: "4.1.0",
    cohort: "Effect",
    dependency: "effect",
    reason:
      "The contracts and both consumers share one exact Effect v4 peer cohort. Effect 4.1.0 replaces effect/Crypto with the effect/crypto services, so a contracts build on 4.0.5 cannot run on 4.1. The contracts therefore lead the cohort (docs/adr/compiler.md): this release peers 4.1.0, and nakafa.com moves to 4.1.0 when it adopts it.",
    registry: "effect@latest",
    reviewedLatest: "4.1.0",
    source: "catalog",
  },
  {
    approvedCurrent: "4.1.0",
    cohort: "Effect",
    dependency: "@effect/platform-node",
    reason:
      "All Effect ecosystem packages must use one exact cohort. The cohort moves with the contracts as described on the effect entry.",
    registry: "@effect/platform-node@latest",
    reviewedLatest: "4.1.0",
    source: "catalog",
  },
  {
    approvedCurrent: "4.1.0",
    cohort: "Effect",
    dependency: "@effect/vitest",
    reason:
      "The test adapter must match the installed Effect cohort. The cohort moves with the contracts as described on the effect entry.",
    registry: "@effect/vitest@latest",
    reviewedLatest: "4.1.0",
    source: "catalog",
  },
  {
    approvedCurrent: "4.1.0",
    cohort: "Effect",
    dependency: "@effect/platform-node-shared",
    reason:
      "An override that pins the shared platform package to the Effect cohort. The cohort moves with the contracts as described on the effect entry.",
    registry: "@effect/platform-node-shared@latest",
    reviewedLatest: "4.1.0",
    source: "override",
  },
  {
    approvedCurrent: "5.0.5",
    cohort: "Effect testing",
    dependency: "vitest",
    reason: "The Effect 4 test adapter requires Vitest version 5.",
    registry: "vitest@latest",
    reviewedLatest: "5.0.5",
    source: "catalog",
  },
  {
    approvedCurrent: "5.0.5",
    cohort: "Effect testing",
    dependency: "@vitest/coverage-istanbul",
    reason: "Coverage instrumentation must match the supported Vitest runner.",
    registry: "@vitest/coverage-istanbul@latest",
    reviewedLatest: "5.0.5",
    source: "catalog",
  },
  {
    approvedCurrent: "0.63.0",
    cohort: "Effect tooling",
    dependency: "@effect/tsgo",
    reason:
      "Compiler patching is reviewed with native TypeScript and Effect. Every rule is decided in packages/typescript-config/base.json, and that rule block matches nakafa.com's (docs/adr/compiler.md), whose rule record, docs/adr/0021-rules.md, gives each reason. 0.52 added schemaClassMissingBrand, which base.json keeps off until the change that brands the last Schema error class, and 0.56 added preferEffectString (off) and schemaClassObjectLiteral (error). 0.57 adds the experimental tsrs build and 0.59 the effect-tsgo tsc, tsrs and oxlint proxy commands, which Aksara does not use: it patches the installed compiler. 0.61 adds flatMapIdentityToFlatten, 0.62 mapConstToAs, and 0.63 failCauseToConstructor and manualMetricTapToTrack, each a style suggestion by default that base.json sets to error, and the opt-in mapMapErrorToMapBoth, which base.json keeps off as upstream does. Every later version must decide its new rules in base.json in the same change.",
    registry: "@effect/tsgo@latest",
    reviewedLatest: "0.63.0",
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
    approvedCurrent: "24.22.2",
    cohort: "Node 24",
    dependency: "node",
    reason: "Aksara supports the current Node 24 runtime line only.",
    registry: "node@24",
    reviewedLatest: "24.22.2",
    source: "node-runtime",
  },
  {
    approvedCurrent: "24.19.2",
    cohort: "Node 24",
    dependency: "@types/node",
    reason: "Node declarations must stay on the supported runtime major.",
    registry: "@types/node@24",
    reviewedLatest: "24.19.2",
    source: "root-dev-dependency",
  },
  {
    approvedCurrent: "2.5.15",
    cohort: "Biome and Ultracite",
    dependency: "@biomejs/biome",
    reason:
      "Formatter behavior is reviewed as one linting cohort. Ultracite 8.1.0 peers Biome ^2.6.2 and renames useSortedClasses to useTailwindSortedClasses, so the 2.6 line loads now. It also turns on the rules that Biome 2.6 made stable and formats YAML: measured on 30 October 2026, Aksara then reports 60 findings (50 unnamed capture groups, 4 loop functions, 4 regular expressions without the unicode flag, 1 empty block, 1 import after code) and rewrites every workflow file, whose trusted publish jobs are pinned by digest. The cohort moves in its own change that fixes those findings and re-reviews the workflow digests.",
    registry: "@biomejs/biome@latest",
    reviewedLatest: "2.6.4",
    source: "root-dev-dependency",
  },
  {
    approvedCurrent: "8.0.2",
    cohort: "Biome and Ultracite",
    dependency: "ultracite",
    reason: "Formatter behavior is reviewed as one linting cohort. 8.1.0 moves with Biome 2.6, as the Biome entry describes.",
    registry: "ultracite@latest",
    reviewedLatest: "8.1.0",
    source: "root-dev-dependency",
  },
  {
    approvedCurrent: "1.4.4",
    cohort: "Bun",
    dependency: "bun",
    reason:
      "Bun is the package manager and writes bun.lock, which records every resolved version. 1.4.4 is the newest Bun release and the version installed on the maintainers' machine, so packageManager pins it exactly.",
    registry: "bun@latest",
    reviewedLatest: "1.4.4",
    source: "package-manager",
  },
];

/** Extracts the exact version from a direct, alias, or package-manager spec. */
export function declaredVersion(spec: string): string | undefined {
  return spec.match(
    new RegExp(`(${VERSION_PATTERN.source.slice(1, -1)})$`, "u")
  )?.[1];
}

/** Returns every dependency that routine updates must leave untouched. */
export function expectedIgnoredDependencies() {
  return pipe(
    DEPENDENCY_HOLDS,
    Arr.filter(({ source }) => source !== "package-manager"),
    Arr.map(({ dependency }) => dependency),
    Arr.sort(Order.String)
  );
}
