import { NodeServices } from "@effect/platform-node";
import { assert, describe, it } from "@effect/vitest";
import { Effect, FileSystem, Layer, Result } from "effect";
import { ProvenanceBundleVerifier } from "#scripts/provenance/bundle";
import { runProvenanceMain } from "#scripts/provenance/main";

const PACKAGE_SHA512 =
  "0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef";
const SOURCE_SHA = "0123456789abcdef0123456789abcdef01234567";

/** Creates the exact argument contract for one audit file. */
function argumentsFor(auditPath: string) {
  return [
    auditPath,
    "@nakafa/aksara-contracts",
    "0.29.0",
    PACKAGE_SHA512,
    "https://github.com/nakafaai/aksara",
    ".github/workflows/contracts.yml",
    "refs/heads/main",
    SOURCE_SHA,
    "npm-production",
  ] as const;
}

/** Creates one exact npm audit fixture for the boundary program. */
function audit() {
  return JSON.stringify({
    invalid: [],
    missing: [],
    verified: [
      {
        attestationBundles: [
          {
            bundle: { evidence: "signed" },
            predicateType: "https://slsa.dev/provenance/v1",
          },
        ],
        attestations: {
          provenance: { predicateType: "https://slsa.dev/provenance/v1" },
          url: "https://registry.npmjs.org/-/npm/v1/attestations/@nakafa%2faksara-contracts@0.29.0",
        },
        name: "@nakafa/aksara-contracts",
        version: "0.29.0",
      },
    ],
  });
}

/** Creates one authenticated SLSA statement for the boundary program. */
function statement() {
  return JSON.stringify({
    _type: "https://in-toto.io/Statement/v1",
    predicate: {
      buildDefinition: {
        buildType:
          "https://slsa-framework.github.io/github-actions-buildtypes/workflow/v1",
        externalParameters: {
          workflow: {
            path: ".github/workflows/contracts.yml",
            ref: "refs/heads/main",
            repository: "https://github.com/nakafaai/aksara",
          },
        },
        resolvedDependencies: [
          {
            digest: { gitCommit: SOURCE_SHA },
            uri: "git+https://github.com/nakafaai/aksara@refs/heads/main",
          },
        ],
      },
      runDetails: {
        builder: { id: "https://github.com/actions/runner/github-hosted" },
      },
    },
    predicateType: "https://slsa.dev/provenance/v1",
    subject: [
      {
        digest: { sha512: PACKAGE_SHA512 },
        name: "pkg:npm/%40nakafa/aksara-contracts@0.29.0",
      },
    ],
  });
}

const TestVerifier = Layer.succeed(ProvenanceBundleVerifier, {
  verify: () => Effect.succeed(statement()),
});
const TestLayer = Layer.mergeAll(NodeServices.layer, TestVerifier);

describe("provenance boundary", () => {
  it.effect("reads and verifies one exact audit", () =>
    Effect.gen(function* () {
      const fileSystem = yield* FileSystem.FileSystem;
      const root = yield* fileSystem.makeTempDirectoryScoped();
      const path = `${root}/audit.json`;
      yield* fileSystem.writeFileString(path, audit());
      yield* runProvenanceMain(argumentsFor(path));
    }).pipe(Effect.provide(TestLayer))
  );

  it.effect("rejects invalid arguments before reading", () =>
    Effect.gen(function* () {
      const result = yield* runProvenanceMain([]).pipe(Effect.result);
      assert(Result.isFailure(result));
      assert.strictEqual(
        result.failure.message,
        "Provenance verification arguments are invalid."
      );
    }).pipe(Effect.provide(TestLayer))
  );

  it.effect("reports an unreadable audit", () =>
    Effect.gen(function* () {
      const result = yield* runProvenanceMain(
        argumentsFor("/missing/audit.json")
      ).pipe(Effect.result);
      assert(Result.isFailure(result));
      assert.strictEqual(
        result.failure.message,
        "Unable to read the npm signature audit."
      );
    }).pipe(Effect.provide(TestLayer))
  );
});
