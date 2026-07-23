import { NodeContext, NodeHttpClient } from "@effect/platform-node";
import type { ContentReleaseManifest } from "@nakafa/aksara-contracts/release";
import type { ContentReleaseBundle } from "@nakafa/aksara-contracts/release/lifecycle";
import { Effect } from "effect";
import { vi } from "vitest";
import type { ReleaseArguments, RollbackArguments } from "#cli/args";
import { runProductionCommand } from "#cli/production";
import type { TargetCalls } from "#test/production-mock";

interface ProductionCalls extends TargetCalls {
  baseManifestHash: string | null | undefined;
  baseReleaseId: string | null | undefined;
  baseResultCount: number | undefined;
  baseResultDigest: string | undefined;
  bundleVerifyCalls: number;
  keyId: string | undefined;
  manifestMismatch: boolean;
  privateKeyMatches: boolean;
  publishCalls: number;
  publishKind: string | undefined;
  releaseId: string | undefined;
  resumeBundle: ContentReleaseBundle | undefined;
  resumeCalls: number;
  rollbackInput:
    | {
        readonly proofManifestHash: string;
        readonly releaseId: string;
        readonly rollbackOf: string;
      }
    | undefined;
  sha: string | undefined;
  storedRelease: ContentReleaseBundle["release"] | null | undefined;
  targetServiceReads: number;
  verifiedBundle: ContentReleaseBundle | undefined;
}

const calls = vi.hoisted(() => {
  /** Creates pristine observable state for one production-command test. */
  const initial = (): ProductionCalls => ({
    baseManifestHash: undefined,
    baseReleaseId: undefined,
    baseResultCount: undefined,
    baseResultDigest: undefined,
    bundleVerifyCalls: 0,
    catalogCalls: 0,
    checkoutRoot: undefined,
    cleanReads: 0,
    current: {
      active: null,
      candidate: null,
      recovery: null,
    },
    derivedPublicKeyPem:
      "-----BEGIN PUBLIC KEY-----\nMCowBQYDK2VwAyEADaLoLeK2jGt3Jav3xpfXU5BNWYOo086miCmkV8FCmsE=\n-----END PUBLIC KEY-----\n",
    environmentKeyId: "content-2026-07-23",
    finalSha: undefined,
    headManifestHash: undefined,
    headReleaseId: undefined,
    keyId: undefined,
    manifestMismatch: false,
    privateKeyMatches: false,
    publicationConfig: undefined,
    publishCalls: 0,
    publishKind: undefined,
    releaseId: undefined,
    rendererCalls: 0,
    resumeBundle: undefined,
    resumeCalls: 0,
    rollbackInput: undefined,
    rootReads: 0,
    sha: undefined,
    signingSecretReads: 0,
    snapshotCalls: 0,
    sourceLayers: 0,
    storedRelease: undefined,
    targetCalls: 0,
    targetServiceReads: 0,
    verifiedBundle: undefined,
  });
  const state = initial();
  return Object.assign(state, {
    /** Restores every observed call before the next isolated test. */
    reset() {
      Object.assign(state, initial());
    },
  });
});

/** Returns mutable call evidence owned by this isolated mock boundary. */
export function productionCalls() {
  return calls;
}

vi.mock("#cli/env", async () =>
  (await import("#test/production-mock")).environmentMock(calls)
);
vi.mock("#cli/evidence", async () =>
  (await import("#test/production-mock")).evidenceMock(calls)
);
vi.mock("#cli/production-renderer", async () =>
  (await import("#test/production-mock")).rendererMock(calls)
);
vi.mock("#cli/repository", async () =>
  (await import("#test/production-mock")).repositoryMock(calls)
);
vi.mock("@nakafa/aksara-publisher/heads", async () =>
  (await import("#test/production-mock")).headsMock(calls)
);
vi.mock("@nakafa/aksara-publisher/catalog/publication", async () =>
  (await import("#test/production-mock")).catalogMock(calls)
);
vi.mock("@nakafa/aksara-publisher/snapshot/release", async () =>
  (await import("#test/production-mock")).snapshotMock(calls)
);
vi.mock("@nakafa/aksara-publisher/target/http", async () =>
  (await import("#test/production-mock")).httpTargetMock(calls)
);
vi.mock("@nakafa/aksara-publisher/git/source", async () =>
  (await import("#test/production-mock")).sourceMock(calls)
);

vi.mock("@nakafa/aksara-publisher/preparation", async () => {
  const { Sha256HashSchema } = await import("@nakafa/aksara-contracts/ids");
  const { Effect: TestEffect } = await import("effect");
  const { gitBundle, releaseId } = await import("#test/target");
  return {
    prepareContentRelease: (input: {
      readonly aksaraSha: string;
      readonly baseManifestHash: ContentReleaseManifest["baseManifestHash"];
      readonly baseReleaseId: ContentReleaseManifest["baseReleaseId"];
      readonly baseResultCount: number;
      readonly baseResultDigest: ContentReleaseManifest["baseResultDigest"];
      readonly releaseId: string;
    }) => {
      calls.baseReleaseId = input.baseReleaseId;
      calls.baseManifestHash = input.baseManifestHash;
      calls.baseResultCount = input.baseResultCount;
      calls.baseResultDigest = input.baseResultDigest;
      calls.releaseId = input.releaseId;
      calls.sha = input.aksaraSha;
      const bundle = gitBundle(input.releaseId, {
        ...(input.baseManifestHash === null
          ? {}
          : { baseManifestHash: input.baseManifestHash }),
        baseReleaseId: releaseId(input.baseReleaseId ?? "release-placeholder"),
        ...(input.baseReleaseId === null ? { baseReleaseId: null } : {}),
        ...(calls.manifestMismatch
          ? {
              projectionDigest: Sha256HashSchema.make(
                `sha256:${"f".repeat(64)}`
              ),
            }
          : {}),
      });
      return TestEffect.succeed({
        kind: "git",
        manifest: bundle.release.manifest,
        releaseId: input.releaseId,
        storedRelease: null,
      });
    },
  };
});

vi.mock("@nakafa/aksara-publisher/rollback", async () => {
  const { Effect: TestEffect } = await import("effect");
  const { releaseId, rollbackBundle } = await import("#test/target");
  return {
    prepareRollback: (input: {
      readonly proofBundle: ContentReleaseBundle;
      readonly releaseId: string;
      readonly rollbackOf: string;
    }) => {
      calls.rollbackInput = {
        proofManifestHash: input.proofBundle.release.manifestHash,
        releaseId: input.releaseId,
        rollbackOf: input.rollbackOf,
      };
      const bundle =
        input.proofBundle.release.manifest.releaseId === input.releaseId
          ? input.proofBundle
          : rollbackBundle(input.releaseId, releaseId(input.rollbackOf));
      return TestEffect.succeed({
        kind: "rollback",
        manifest: bundle.release.manifest,
        releaseId: input.releaseId,
        storedRelease: null,
      });
    },
  };
});

vi.mock("@nakafa/aksara-contracts/release/verify", async () => {
  const { ContentReleaseBundleSchema } = await import(
    "@nakafa/aksara-contracts/release/lifecycle"
  );
  const { SignedContentReleaseSchema } = await import(
    "@nakafa/aksara-contracts/release"
  );
  const { Effect: TestEffect, Schema: TestSchema } = await import("effect");
  return {
    verifyContentReleaseBundle: (input: unknown) => {
      calls.bundleVerifyCalls += 1;
      return TestSchema.decodeUnknown(ContentReleaseBundleSchema)(input, {
        onExcessProperty: "error",
      }).pipe(
        TestEffect.tap((bundle) =>
          TestEffect.sync(() => {
            calls.verifiedBundle = bundle;
          })
        )
      );
    },
    verifySignedContentRelease: (input: unknown) =>
      TestSchema.decodeUnknown(SignedContentReleaseSchema)(input, {
        onExcessProperty: "error",
      }),
  };
});

vi.mock("@nakafa/aksara-publisher/publication", async () => {
  const { Effect: TestEffect, Redacted: TestRedacted } = await import("effect");
  const { SigningKeyIdSchema } = await import("@nakafa/aksara-contracts/ids");
  const { ContentVerificationKeyResolver } = await import(
    "@nakafa/aksara-contracts/signature/spec"
  );
  const { PublicationActivation, PublicationSigningKey, PublicationTarget } =
    await import("@nakafa/aksara-publisher/publication/spec");
  const { receiptFor } = await import("#test/target");
  /** Publishes one prepared mode through injected signer and target services. */
  const publish = (prepared: {
    readonly kind: string;
    readonly manifest: ContentReleaseManifest;
    readonly storedRelease: ContentReleaseBundle["release"] | null;
  }) => {
    calls.publishCalls += 1;
    return TestEffect.gen(function* () {
      const signingKey = yield* PublicationSigningKey;
      const resolver = yield* ContentVerificationKeyResolver;
      yield* PublicationActivation;
      yield* PublicationTarget;
      calls.targetServiceReads += 1;
      yield* resolver.resolve(SigningKeyIdSchema.make("content-2026-07-23"));
      calls.keyId = signingKey.keyId;
      calls.privateKeyMatches =
        TestRedacted.value(signingKey.privateKeyPem) === "test-private-key";
      calls.publishKind = prepared.kind;
      calls.storedRelease = prepared.storedRelease;
      return receiptFor(prepared.manifest);
    });
  };
  return { publishGitRelease: publish, publishRollbackRelease: publish };
});

vi.mock("@nakafa/aksara-publisher/resume", async () => {
  const { Effect: TestEffect } = await import("effect");
  const { SigningKeyIdSchema } = await import("@nakafa/aksara-contracts/ids");
  const { ContentVerificationKeyResolver } = await import(
    "@nakafa/aksara-contracts/signature/spec"
  );
  const { PublicationActivation, PublicationTarget } = await import(
    "@nakafa/aksara-publisher/publication/spec"
  );
  const { receiptFor } = await import("#test/target");
  return {
    resumeContentRelease: (bundle: ContentReleaseBundle) => {
      calls.resumeBundle = bundle;
      calls.resumeCalls += 1;
      return TestEffect.gen(function* () {
        const resolver = yield* ContentVerificationKeyResolver;
        yield* PublicationActivation;
        yield* PublicationTarget;
        calls.targetServiceReads += 1;
        yield* resolver.resolve(SigningKeyIdSchema.make("content-2026-07-23"));
        return receiptFor(bundle.release.manifest);
      });
    },
  };
});

/** Builds one production Effect with the complete Node service boundary. */
function productionProgram(args: ReleaseArguments | RollbackArguments) {
  return runProductionCommand({ args, cwd: "/code/aksara" }).pipe(
    Effect.provide(NodeHttpClient.layer),
    Effect.provide(NodeContext.layer)
  );
}

/** Runs one production command with the real Node boundary services. */
export function runProduction(args: ReleaseArguments | RollbackArguments) {
  return Effect.runPromise(productionProgram(args));
}

/** Returns the typed failure from one rejected production command. */
export function rejectProduction(args: ReleaseArguments | RollbackArguments) {
  return Effect.runPromise(productionProgram(args).pipe(Effect.flip));
}
