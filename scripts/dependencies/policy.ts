import { Array as Arr, Order, pipe, Schema } from "effect";

const VERSION_PATTERN = /^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/u;

const DeclarationSourceSchema = Schema.Literals([
  "catalog",
  "node-runtime",
  "override",
  "package-manager",
  "root-dev-dependency",
]);

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
    approvedCurrent: "4.0.5",
    cohort: "Effect",
    dependency: "effect",
    reason:
      "The contracts and both consumers share one exact Effect v4 peer cohort. Effect 4.0.6 is reviewed here, but nakafa.com still pins 4.0.5, and docs/adr/compiler.md requires the nakafa.com cohort to move before this one, so the cohort stays on 4.0.5 until nakafa.com moves.",
    registry: "effect@latest",
    reviewedLatest: "4.0.6",
    source: "catalog",
  },
  {
    approvedCurrent: "4.0.5",
    cohort: "Effect",
    dependency: "@effect/platform-node",
    reason:
      "All Effect ecosystem packages must use one exact cohort. The cohort moves with nakafa.com as described on the effect entry.",
    registry: "@effect/platform-node@latest",
    reviewedLatest: "4.0.6",
    source: "catalog",
  },
  {
    approvedCurrent: "4.0.5",
    cohort: "Effect",
    dependency: "@effect/vitest",
    reason:
      "The test adapter must match the installed Effect cohort. The cohort moves with nakafa.com as described on the effect entry.",
    registry: "@effect/vitest@latest",
    reviewedLatest: "4.0.6",
    source: "catalog",
  },
  {
    approvedCurrent: "4.0.5",
    cohort: "Effect",
    dependency: "@effect/platform-node-shared",
    reason:
      "An override that pins the shared platform package to the Effect cohort. The cohort moves with nakafa.com as described on the effect entry.",
    registry: "@effect/platform-node-shared@latest",
    reviewedLatest: "4.0.6",
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
    approvedCurrent: "0.56.0",
    cohort: "Effect tooling",
    dependency: "@effect/tsgo",
    reason:
      "Compiler patching is reviewed with native TypeScript and Effect; 0.49 keeps TypeScript 7.0.2 supported through adapters for the legacy provider, 0.50 adds the apiStabilityLeak diagnostic, which is off by default, 0.52 adds schemaClassMissingBrand, whose default severity is suggestion and which base.json keeps off until the change that brands the last Schema error class (docs/adr/compiler.md), with effectSleepZeroToYieldNow, flatMapToTap, and three opt-in rules, and 0.53 adds errorPayloadShadowsName and two opt-in import-style rules. 0.53.3 makes effect-tsgo diagnostics report related locations. 0.53.4 only moves the TypeScript next tag, which Aksara does not use, and the one-day minimum release age admits it on 18 October 2026. Every rule is decided in packages/typescript-config/base.json. @effect/tsgo 0.56.0 adds preferEffectString (off by default) and schemaClassObjectLiteral (warning by default) and changes no existing rule. base.json decides both as nakafa.com's rule record does: preferEffectString stays off, and schemaClassObjectLiteral is error. The compiler moves to 0.56.0 with nakafa.com's upgrade lane. 0.56.1, the reviewed upstream release, moves in its own change once the one-day minimum release age admits it. Every later version must decide its new rules in base.json in the same change, and that rule block must match nakafa.com (docs/adr/compiler.md).",
    registry: "@effect/tsgo@latest",
    reviewedLatest: "0.56.1",
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
    approvedCurrent: "24.22.1",
    cohort: "Node 24",
    dependency: "node",
    reason: "Aksara supports the current Node 24 runtime line only.",
    registry: "node@24",
    reviewedLatest: "24.22.1",
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
      "Formatter behavior is reviewed as one linting cohort. Ultracite 8.0.2 still configures the useSortedClasses rule, which Biome 2.6 no longer knows, so Biome 2.6.x fails the lint configuration with an unknown key. The hold lifts when Ultracite's configuration supports the 2.6 line.",
    registry: "@biomejs/biome@latest",
    reviewedLatest: "2.6.3",
    source: "root-dev-dependency",
  },
  {
    approvedCurrent: "8.0.2",
    cohort: "Biome and Ultracite",
    dependency: "ultracite",
    reason: "Formatter behavior is reviewed as one linting cohort.",
    registry: "ultracite@latest",
    reviewedLatest: "8.0.2",
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
