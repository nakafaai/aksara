import { NodeHttpClient, NodeServices } from "@effect/platform-node";
import type { ContentReleaseManifest } from "@nakafa/aksara-contracts/release";
import type { ContentReleaseBundle } from "@nakafa/aksara-contracts/release/lifecycle";
import type { prepareContentRelease } from "@nakafa/aksara-publisher/preparation";
import { ExactProcess } from "@nakafa/aksara-utilities/process/exact";
import { Effect } from "effect";
import type { ReleaseArguments } from "#cli/production/arguments";
import { runProductionCommand } from "#cli/production/command";
import { unusedExactProcess } from "#test/process";
import type { ProductionCalls } from "#test/production/mock";
import { completedBundle, currentState, gitBundle } from "#test/target";

/** The active production state that each command test starts from, built once for the test process. */
export const ACTIVE_PRODUCTION_STATE = await Effect.runPromise(
  Effect.gen(function* () {
    const active = yield* gitBundle("release-active");
    return currentState({
      active: yield* completedBundle(active),
      candidate: null,
      recovery: null,
      tryoutRuntimeBundle: null,
    });
  })
);

type PrepareContentReleaseInput<E, R> = Parameters<
  typeof prepareContentRelease<E, R>
>[0];

const calls = vi.hoisted(() => {
  /** Creates pristine observable state for one production-command test. */
  const initial = (): ProductionCalls => ({
    baseManifestHash: undefined,
    baseReleaseId: undefined,
    baseResultCount: undefined,
    baseResultDigest: undefined,
    bundleVerifyCalls: 0,
    catalogCalls: 0,
    catalogRebuild: undefined,
    checkoutRoot: undefined,
    cleanReads: 0,
    current: {
      active: null,
      candidate: null,
      recovery: null,
      tryoutRuntimeBundle: null,
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
    publicationRetention: undefined,
    publishCalls: 0,
    publishKind: undefined,
    releaseId: undefined,
    rendererCalls: 0,
    rendererManifestOverride: undefined,
    resumeBundle: undefined,
    resumeCalls: 0,
    rootReads: 0,
    runtimeBundleRefreshes: 0,
    runtimeResultSnapshotId: undefined,
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

vi.mock("#cli/environment/read", async () =>
  (await import("#test/production/mock")).environmentMock(calls)
);
vi.mock("#cli/evidence", async () =>
  (await import("#test/production/mock")).evidenceMock(calls)
);
vi.mock("#cli/production/renderer", async (importOriginal) => ({
  ...(await importOriginal<typeof import("#cli/production/renderer")>()),
  ...(await import("#test/production/mock")).rendererMock(calls),
}));
vi.mock("#cli/checkout", async () =>
  (await import("#test/production/mock")).checkoutMock(calls)
);
vi.mock("@nakafa/aksara-publisher/heads", async () =>
  (await import("#test/production/mock")).headsMock(calls)
);
vi.mock("@nakafa/aksara-publisher/catalog/publication", async () =>
  (await import("#test/production/mock")).catalogMock(calls)
);
vi.mock("@nakafa/aksara-publisher/snapshot/release", async () =>
  (await import("#test/production/mock")).snapshotMock(calls)
);
vi.mock("@nakafa/aksara-publisher/target/http", async () =>
  (await import("#test/production/mock")).httpTargetMock(calls)
);
vi.mock("@nakafa/aksara-publisher/git/source", async () =>
  (await import("#test/production/mock")).sourceMock(calls)
);

vi.mock("@nakafa/aksara-publisher/preparation", async () => {
  const { Sha256HashSchema } = await import("@nakafa/aksara-contracts/ids");
  const { Effect: TestEffect, Stream: TestStream } = await import("effect");
  const target = await import("#test/target");
  return {
    prepareContentRelease: <E, R>(input: PrepareContentReleaseInput<E, R>) => {
      calls.baseReleaseId = input.baseReleaseId;
      calls.baseManifestHash = input.baseManifestHash;
      calls.baseResultCount = input.baseResultCount;
      calls.baseResultDigest = input.baseResultDigest;
      calls.releaseId = input.releaseId;
      calls.runtimeResultSnapshotId =
        input.tryoutRuntime?.result.snapshotId ?? null;
      calls.sha = input.aksaraSha;
      return TestEffect.gen(function* () {
        const gitRelease = yield* target.gitBundle(input.releaseId, {
          ...(input.baseManifestHash === null
            ? {}
            : { baseManifestHash: input.baseManifestHash }),
          baseReleaseId: target.releaseId(
            input.baseReleaseId ?? "release-placeholder"
          ),
          ...(input.baseReleaseId === null ? { baseReleaseId: null } : {}),
          ...(calls.manifestMismatch
            ? {
                projectionDigest: Sha256HashSchema.make(
                  `sha256:${"f".repeat(64)}`
                ),
              }
            : {}),
          scope: input.scope,
        });
        yield* input.snapshotManifests.pipe(TestStream.runDrain);
        yield* input.snapshotRows.pipe(TestStream.runDrain);
        return {
          kind: "git" as const,
          manifest: gitRelease.release.manifest,
          releaseId: input.releaseId,
          storedRelease: null,
        };
      });
    },
  };
});

vi.mock(
  import("@nakafa/aksara-contracts/release/verify"),
  async (importOriginal) => {
    const original = await importOriginal();
    const { ContentReleaseBundleSchema } = await import(
      "@nakafa/aksara-contracts/release/lifecycle"
    );
    const { SignedContentReleaseSchema } = await import(
      "@nakafa/aksara-contracts/release"
    );
    const { Effect: TestEffect, Schema: TestSchema } = await import("effect");
    return {
      ...original,
      verifyContentReleaseBundle: (input: unknown) => {
        calls.bundleVerifyCalls += 1;
        return TestSchema.decodeUnknownEffect(ContentReleaseBundleSchema)(
          input,
          {
            onExcessProperty: "error",
          }
        ).pipe(
          TestEffect.mapError(
            () =>
              new original.ReleaseBundleVerificationDecodeError({
                message:
                  "Release bundle verification input does not satisfy its exact wire contract.",
              })
          ),
          TestEffect.tap((bundle) =>
            TestEffect.sync(() => {
              if (calls.verifiedBundle === undefined) {
                calls.verifiedBundle = bundle;
              }
            })
          )
        );
      },
      verifySignedContentRelease: (input: unknown) =>
        TestSchema.decodeUnknownEffect(SignedContentReleaseSchema)(input, {
          onExcessProperty: "error",
        }).pipe(
          TestEffect.mapError(
            () =>
              new original.ReleaseVerificationDecodeError({
                message:
                  "Release verification input does not satisfy its exact wire contract.",
              })
          )
        ),
    };
  }
);

vi.mock(
  import("@nakafa/aksara-contracts/tryout/runtime/verify"),
  async (importOriginal) => {
    const original = await importOriginal();
    const { SignedTryoutRuntimeBundleSchema } = await import(
      "@nakafa/aksara-contracts/tryout/runtime/spec"
    );
    const { Effect: TestEffect, Schema: TestSchema } = await import("effect");
    return {
      ...original,
      verifySignedTryoutRuntimeBundle: (input: { readonly bundle: unknown }) =>
        TestSchema.decodeUnknownEffect(SignedTryoutRuntimeBundleSchema)(
          input.bundle,
          { onExcessProperty: "error" }
        ).pipe(TestEffect.orDie),
    };
  }
);

vi.mock("@nakafa/aksara-publisher/publication", async () => {
  const { Effect: TestEffect, Redacted: TestRedacted } = await import("effect");
  const { SigningKeyIdSchema } = await import("@nakafa/aksara-contracts/ids");
  const { ContentVerificationKeyResolver } = await import(
    "@nakafa/aksara-contracts/signature/spec"
  );
  const spec = await import("@nakafa/aksara-publisher/publication/spec");
  const { receiptFor } = await import("#test/target");
  /** Publishes one prepared Git release through injected boundary services. */
  const publish = (prepared: {
    readonly kind: "git";
    readonly manifest: ContentReleaseManifest;
    readonly storedRelease: ContentReleaseBundle["release"] | null;
  }) => {
    calls.publishCalls += 1;
    return TestEffect.gen(function* () {
      const signingKey = yield* spec.PublicationSigningKey;
      const resolver = yield* ContentVerificationKeyResolver;
      yield* spec.PublicationActivation;
      yield* spec.PublicationTarget;
      calls.targetServiceReads += 1;
      yield* resolver.resolve(SigningKeyIdSchema.make("content-2026-07-23"));
      calls.publicationRetention = yield* spec.PublicationRetention;
      calls.keyId = signingKey.keyId;
      calls.privateKeyMatches =
        TestRedacted.value(signingKey.privateKeyPem) === "test-private-key";
      calls.publishKind = prepared.kind;
      calls.storedRelease = prepared.storedRelease;
      return yield* receiptFor(prepared.manifest);
    });
  };
  return { publishGitRelease: publish };
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
        return yield* receiptFor(bundle.release.manifest);
      });
    },
  };
});

/** Builds one production Effect with the complete Node service boundary. */
export function productionProgram(args: ReleaseArguments) {
  return runProductionCommand({ args, cwd: "/code/aksara" }).pipe(
    Effect.provide(NodeHttpClient.layerNodeHttp),
    Effect.provideService(ExactProcess, unusedExactProcess),
    Effect.provide(NodeServices.layer)
  );
}
