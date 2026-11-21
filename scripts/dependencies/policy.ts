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
    approvedCurrent: "4.1.5",
    cohort: "Effect",
    dependency: "effect",
    reason:
      "The contracts and both consumers share one exact Effect v4 peer cohort, and the contracts lead it (docs/adr/compiler.md): a contracts release peers one exact Effect version, and nakafa.com moves to it when it adopts that release. Effect 4.1.0 replaced effect/Crypto with the effect/crypto services. 4.1.5 is a patch release: Arbitrary diagnostics and string shrinking, Cache expiry under a provided clock, Chunk.fromIterable copying its array, field discovery over own enumerable string and symbol fields (an interface field map is no longer accepted), cluster redelivery fixes, effect/crypto/Password, and a Node HTTP server that answers 503 while not serving; Alchemy 2.0.0-beta.87 peers effect ^4.1.4. Contracts 8.9.1 peers 4.1.5, the cohort nakafa.com moved to first.",
    registry: "effect@latest",
    reviewedLatest: "4.1.5",
    source: "catalog",
  },
  {
    approvedCurrent: "4.1.5",
    cohort: "Effect",
    dependency: "@effect/platform-node",
    reason:
      "All Effect ecosystem packages must use one exact cohort. The cohort moves with the contracts as described on the effect entry.",
    registry: "@effect/platform-node@latest",
    reviewedLatest: "4.1.5",
    source: "catalog",
  },
  {
    approvedCurrent: "4.1.5",
    cohort: "Effect",
    dependency: "@effect/vitest",
    reason:
      "The test adapter must match the installed Effect cohort. The cohort moves with the contracts as described on the effect entry.",
    registry: "@effect/vitest@latest",
    reviewedLatest: "4.1.5",
    source: "catalog",
  },
  {
    approvedCurrent: "4.1.5",
    cohort: "Effect",
    dependency: "@effect/platform-node-shared",
    reason:
      "An override that pins the shared platform package to the Effect cohort. The cohort moves with the contracts as described on the effect entry.",
    registry: "@effect/platform-node-shared@latest",
    reviewedLatest: "4.1.5",
    source: "override",
  },
  {
    approvedCurrent: "5.1.1",
    cohort: "Effect testing",
    dependency: "vitest",
    reason:
      "The Effect 4 test adapter requires Vitest version 5; @effect/vitest 4.1.5 admits >=5.0.0 <6.0.0, and nakafa.com runs the same 5.1.1.",
    registry: "vitest@latest",
    reviewedLatest: "5.1.1",
    source: "catalog",
  },
  {
    approvedCurrent: "5.1.1",
    cohort: "Effect testing",
    dependency: "@vitest/coverage-istanbul",
    reason:
      "Coverage instrumentation must match the supported Vitest runner; 5.1.1 peers vitest 5.1.1 exactly.",
    registry: "@vitest/coverage-istanbul@latest",
    reviewedLatest: "5.1.1",
    source: "catalog",
  },
  {
    approvedCurrent: "0.73.2",
    cohort: "Effect tooling",
    dependency: "@effect/tsgo",
    reason:
      "Compiler patching is reviewed with tsrs and Effect. Every rule is decided in packages/typescript-config/base.json, and that rule block matches nakafa.com's (docs/adr/compiler.md), whose rule record, docs/adr/0021-rules.md, gives each reason. 0.73.2 patches tsrs 7.1.0-beta.tsrs2 and 7.1.0-beta.tsrs3 (the version table of its README), which replaces the TypeScript package: prepare runs effect-tsgo patch --tsrs --no-typescript. base.json decides the five rules 0.70 to 0.73 add as nakafa.com does: flatMapMapToZipWith, flatMapProvideServiceToProvideServiceEffect, promiseAllInEffect and promiseRaceInEffect are errors, which no Aksara module reaches, and forLoopPushToForEach stays off, because the source check that forbids a native push owns it. Every later version must decide its new rules in base.json in the same change.",
    registry: "@effect/tsgo@latest",
    reviewedLatest: "0.73.2",
    source: "root-dev-dependency",
  },
  {
    approvedCurrent: "7.1.0-beta.tsrs3",
    cohort: "TypeScript",
    dependency: "tsrs",
    reason:
      "tsrs is the Rust port of the TypeScript 7.1 compiler: every typecheck, package build, language server, and AST reader runs it, pinned to 7.1.0-beta.tsrs3, the latest release and one of the two that @effect/tsgo 0.73.2 patches. Its version now names the TypeScript release it targets and a tsrs revision, so a newer revision of the same beta is one release channel (scripts/dependencies/release.ts), and its JavaScript API and tsdk are unchanged from 0.25.0-ts7.1.0-beta.",
    registry: "tsrs@latest",
    reviewedLatest: "7.1.0-beta.tsrs3",
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
    approvedCurrent: "1.4.5",
    cohort: "Bun",
    dependency: "bun",
    reason:
      "Bun is the package manager and writes bun.lock, which records every resolved version. 1.4.5 is the newest Bun release, a security release (lsquic, c-ares, SQLite, llhttp and BoringSSL) that changes no install, lockfile, or catalog behavior, so packageManager pins it exactly.",
    registry: "bun@latest",
    reviewedLatest: "1.4.5",
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
