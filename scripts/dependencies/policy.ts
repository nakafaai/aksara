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
    approvedCurrent: "4.1.4",
    cohort: "Effect",
    dependency: "effect",
    reason:
      "The contracts and both consumers share one exact Effect v4 peer cohort, and the contracts lead it (docs/adr/compiler.md): a contracts release peers one exact Effect version, and nakafa.com moves to it when it adopts that release. Effect 4.1.0 replaced effect/Crypto with the effect/crypto services. 4.1.3 and 4.1.4 are patch releases: Rational, CLI completion and validation fixes, cluster workflow retries, and a TestClock finalizer fix; Alchemy 2.0.0-beta.87 peers effect ^4.1.4. Contracts 6.6.0 peers 4.1.4.",
    registry: "effect@latest",
    reviewedLatest: "4.1.4",
    source: "catalog",
  },
  {
    approvedCurrent: "4.1.4",
    cohort: "Effect",
    dependency: "@effect/platform-node",
    reason:
      "All Effect ecosystem packages must use one exact cohort. The cohort moves with the contracts as described on the effect entry.",
    registry: "@effect/platform-node@latest",
    reviewedLatest: "4.1.4",
    source: "catalog",
  },
  {
    approvedCurrent: "4.1.4",
    cohort: "Effect",
    dependency: "@effect/vitest",
    reason:
      "The test adapter must match the installed Effect cohort. The cohort moves with the contracts as described on the effect entry.",
    registry: "@effect/vitest@latest",
    reviewedLatest: "4.1.4",
    source: "catalog",
  },
  {
    approvedCurrent: "4.1.4",
    cohort: "Effect",
    dependency: "@effect/platform-node-shared",
    reason:
      "An override that pins the shared platform package to the Effect cohort. The cohort moves with the contracts as described on the effect entry.",
    registry: "@effect/platform-node-shared@latest",
    reviewedLatest: "4.1.4",
    source: "override",
  },
  {
    approvedCurrent: "5.1.0",
    cohort: "Effect testing",
    dependency: "vitest",
    reason:
      "The Effect 4 test adapter requires Vitest version 5; @effect/vitest 4.1.2 admits >=5.0.0 <6.0.0, and nakafa.com runs the same 5.1.0.",
    registry: "vitest@latest",
    reviewedLatest: "5.1.0",
    source: "catalog",
  },
  {
    approvedCurrent: "5.1.0",
    cohort: "Effect testing",
    dependency: "@vitest/coverage-istanbul",
    reason: "Coverage instrumentation must match the supported Vitest runner.",
    registry: "@vitest/coverage-istanbul@latest",
    reviewedLatest: "5.1.0",
    source: "catalog",
  },
  {
    approvedCurrent: "0.69.0",
    cohort: "Effect tooling",
    dependency: "@effect/tsgo",
    reason:
      "Compiler patching is reviewed with tsrs and Effect. Every rule is decided in packages/typescript-config/base.json, and that rule block matches nakafa.com's (docs/adr/compiler.md), whose rule record, docs/adr/0021-rules.md, gives each reason. 0.69.0 patches tsrs 0.25.0-ts7.1.0-beta (the version table of its README), which replaces the TypeScript package: prepare runs effect-tsgo patch --tsrs --no-typescript. base.json decides onExitFailureToOnError, the one rule 0.68 added, which no Aksara module reaches; 0.69 adds none. Every later version must decide its new rules in base.json in the same change.",
    registry: "@effect/tsgo@latest",
    reviewedLatest: "0.69.0",
    source: "root-dev-dependency",
  },
  {
    approvedCurrent: "0.25.0-ts7.1.0-beta",
    cohort: "TypeScript",
    dependency: "tsrs",
    reason:
      "tsrs is the Rust port of the TypeScript 7.1 compiler: every typecheck, package build, language server, and AST reader runs it, pinned to 0.25.0-ts7.1.0-beta, the latest release and the one @effect/tsgo 0.69.0 patches. 0.25.0 adds concurrent headless lint and a Windows ARM64 package with the same checker.",
    registry: "tsrs@latest",
    reviewedLatest: "0.25.0-ts7.1.0-beta",
    source: "catalog",
  },
  {
    approvedCurrent: "26.13.1",
    cohort: "Node 26",
    dependency: "node",
    reason:
      "Aksara runs on the current Node 26 LTS line, which nakafa.com also runs. The published contracts and CLI admit Node 24 and 26, so a Node 24 consumer, such as a Convex Node action, still loads them. 26.13.1 is the security release of 10 November 2026 (nine high CVEs in HTTP/2, TLS and HTTP).",
    registry: "node@26",
    reviewedLatest: "26.13.1",
    source: "node-runtime",
  },
  {
    approvedCurrent: "26.6.6",
    cohort: "Node 26",
    dependency: "@types/node",
    reason: "Node declarations must stay on the supported runtime major.",
    registry: "@types/node@26",
    reviewedLatest: "26.6.6",
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
  {
    approvedCurrent: "12.3.0",
    cohort: "Mermaid",
    dependency: "mermaid",
    reason:
      "The compiler parses every authored Mermaid diagram with the Mermaid that nakafa.com draws it with, the exact pin in nakafa.com's packages/design-system/package.json, so a diagram that passes here draws there. Both repositories move to a new release in one step: nakafa.com first, then this hold.",
    registry: "mermaid@latest",
    reviewedLatest: "12.3.0",
    source: "catalog",
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
