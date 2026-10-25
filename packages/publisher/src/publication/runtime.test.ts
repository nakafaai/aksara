// @vitest-environment node
import { assert, describe, expect, it } from "@effect/vitest";
import {
  GitCommitShaSchema,
  ReleaseIdSchema,
} from "@nakafa/aksara-contracts/ids";
import { ContentReleaseManifestSchema } from "@nakafa/aksara-contracts/release";
import { replaceContentSnapshot } from "@nakafa/aksara-contracts/release/snapshot/spec";
import { generateEd25519KeyPem } from "@nakafa/aksara-contracts/signature/key";
import {
  ContentVerificationKeyResolver,
  SigningKeyNotFoundError,
} from "@nakafa/aksara-contracts/signature/spec";
import { canonicalizeTryoutRuntimeBundleSigningInput } from "@nakafa/aksara-contracts/tryout/runtime/canonical";
import { TRYOUT_RUNTIME_BUNDLE_FORMAT } from "@nakafa/aksara-contracts/tryout/runtime/spec";
import { makeTryoutSnapshot } from "@nakafa/aksara-contracts/tryout/snapshot/hash";
import { Array as Arr, Effect, MutableHashMap, Option } from "effect";

import { preparePublicationRuntimes } from "#publisher/publication/runtime";
import { makeEd25519PublicationSigner } from "#publisher/signing/service";
import { rendererManifest } from "#test/publication";
import { signingManifest, verifyWithPublicKeyPem } from "#test/signing";

const signingKeyId = "test-publication-runtime-key";
const sourceGitSha = GitCommitShaSchema.make("d".repeat(40));

/** Creates one fresh signing key and the runtime fixtures that every test shares. */
const fixtures = Effect.gen(function* () {
  const keys = yield* generateEd25519KeyPem();
  const snapshot = yield* makeTryoutSnapshot({
    activeAppLocales: signingManifest.activeAppLocales,
    catalogDigest: signingManifest.itemsDigest,
    counts: { country: 1, exam: 1, section: 1, set: 1, track: 1 },
    placementCount: 1,
    placementDigest: signingManifest.resultDigest,
    routeCount: 5,
  });
  const recoverySnapshot = yield* makeTryoutSnapshot({
    activeAppLocales: signingManifest.activeAppLocales,
    catalogDigest: signingManifest.itemsDigest,
    counts: { country: 0, exam: 0, section: 0, set: 0, track: 0 },
    placementCount: 0,
    placementDigest: signingManifest.resultDigest,
    routeCount: 0,
  });
  const runtimeManifest = ContentReleaseManifestSchema.make({
    ...signingManifest,
    baseActiveAppLocales: signingManifest.activeAppLocales,
    baseManifestHash: signingManifest.itemsDigest,
    baseReleaseId: ReleaseIdSchema.make("test-runtime-base"),
    scope: { ...signingManifest.scope, snapshots: ["tryout"] },
    snapshots: {
      ...signingManifest.snapshots,
      tryout: replaceContentSnapshot({
        baseSnapshotId: recoverySnapshot.snapshotId,
        resultSnapshotId: snapshot.snapshotId,
        rowCount: 1,
        rowDigest: signingManifest.itemsDigest,
      }),
    },
  });
  return { keys, recoverySnapshot, runtimeManifest, snapshot };
});

/** Resolves the one signing key of this file to the public key of one test run. */
const resolverFor = (publicKeyPem: string) =>
  ContentVerificationKeyResolver.of({
    resolve: (keyId) =>
      keyId === signingKeyId
        ? Effect.succeed(publicKeyPem)
        : Effect.fail(new SigningKeyNotFoundError({ keyId })),
  });

/** Creates one real signer for runtime bundle boundary tests. */
const makeSigner = (privateKeyPem: string) =>
  makeEd25519PublicationSigner({
    keyId: signingKeyId,
    privateKeyPem,
  });

/** Test-only Ed25519 public key that verifies the recorded candidate and recovery bundle signatures. */
const TEST_PUBLIC_KEY_PEM = `-----BEGIN PUBLIC KEY-----
MCowBQYDK2VwAyEAdnTaKCUj32UceFrFrvlW7sk8vLVTeM3j7F4KVHT1ixU=
-----END PUBLIC KEY-----
`;
// Record again: create a key, sign the same input, and replace the public key and signature literals below.
const TEST_RESULT_BUNDLE_SIGNATURE =
  "pEnrb7fF32pdCwJCJVeqXaGlgjXOWxr5avqAlm1VuKmz4SCyQfSxYAonmXeY4fT5VshpC_kGYJfiFjnGGGDyCw";
// Record again: create a key, sign the same input, and replace the public key and signature literals below.
const TEST_RECOVERY_BUNDLE_SIGNATURE =
  "9-ztASkkR2LxnID8WLjTPClqpKcb2MUM6Au4A_x4WrAPcYxXmTFmJ7YHLA9T2vxaQCHS4KyhviLYXvLAtf19CA";

describe("publication runtime", () => {
  it.effect(
    "pins the bundle hash and signature of candidate and recovery pairs",
    () =>
      Effect.gen(function* () {
        const { keys, recoverySnapshot, runtimeManifest, snapshot } =
          yield* fixtures;
        const signer = yield* makeSigner(keys.privateKeyPem);
        const release = yield* signer.signRelease(runtimeManifest);
        const bundles = yield* preparePublicationRuntimes({
          release,
          rendererManifest,
          runtime: { recovery: recoverySnapshot, result: snapshot },
          signer,
          sourceGitSha,
        }).pipe(
          Effect.provideService(
            ContentVerificationKeyResolver,
            resolverFor(keys.publicKeyPem)
          )
        );
        const recordedSignatures = MutableHashMap.fromIterable([
          [
            "sha256:a134dc4a643dddafe250b5549d4a0a24c2578fdaa24ebf154c72695dc52bb4c9",
            TEST_RESULT_BUNDLE_SIGNATURE,
          ],
          [
            "sha256:4e5507ad00b69ac2c00ea2d59d5d590b6e612dda37701012a9b8aa815bac9aa8",
            TEST_RECOVERY_BUNDLE_SIGNATURE,
          ],
        ]);
        expect(Arr.map(bundles, (bundle) => bundle.bundleHash)).toEqual([
          ...MutableHashMap.keys(recordedSignatures),
        ]);
        /** Verifies each produced bundle over the transformed signing input with its recorded signature. */
        const verifies = (transform: (input: string) => string) =>
          Effect.forEach(bundles, (bundle) => {
            const signature = Option.getOrUndefined(
              MutableHashMap.get(recordedSignatures, bundle.bundleHash)
            );
            const input = canonicalizeTryoutRuntimeBundleSigningInput(
              bundle.bundleHash,
              bundle.payload
            );
            return signature === undefined
              ? Effect.succeed(false)
              : verifyWithPublicKeyPem(
                  TEST_PUBLIC_KEY_PEM,
                  transform(input),
                  signature
                );
          });
        expect(yield* verifies((input) => input)).toEqual([true, true]);
        expect(
          yield* verifies((input) => input.replace("aksara", "aksarb"))
        ).toEqual([false, false]);
      })
  );
  it.effect("skips an unrelated Git release", () =>
    Effect.gen(function* () {
      const { keys } = yield* fixtures;
      const signer = yield* makeSigner(keys.privateKeyPem);
      const release = yield* signer.signRelease(signingManifest);
      const bundles = yield* preparePublicationRuntimes({
        release,
        rendererManifest,
        runtime: null,
        signer,
        sourceGitSha,
      }).pipe(
        Effect.provideService(
          ContentVerificationKeyResolver,
          resolverFor(keys.publicKeyPem)
        )
      );

      assert.deepStrictEqual(bundles, []);
    })
  );

  it.effect("signs candidate and retained recovery runtime pairs", () =>
    Effect.gen(function* () {
      const { keys, recoverySnapshot, runtimeManifest, snapshot } =
        yield* fixtures;
      const signer = yield* makeSigner(keys.privateKeyPem);
      const release = yield* signer.signRelease(runtimeManifest);
      const bundles = yield* preparePublicationRuntimes({
        release,
        rendererManifest,
        runtime: { recovery: recoverySnapshot, result: snapshot },
        signer,
        sourceGitSha,
      }).pipe(
        Effect.provideService(
          ContentVerificationKeyResolver,
          resolverFor(keys.publicKeyPem)
        )
      );

      assert.deepStrictEqual(
        Arr.map(bundles, (bundle) => bundle.payload),
        Arr.map([snapshot, recoverySnapshot], (runtimeSnapshot) => ({
          format: TRYOUT_RUNTIME_BUNDLE_FORMAT,
          rendererManifestHash: rendererManifest.hash,
          snapshot: runtimeSnapshot,
          sourceGitSha,
          sourceManifestHash: release.manifestHash,
          sourceReleaseId: release.manifest.releaseId,
        }))
      );
      assert.deepStrictEqual(
        Arr.map(bundles, (bundle) => bundle.keyId),
        [signingKeyId, signingKeyId]
      );
    })
  );

  it.effect("signs one candidate when the retained pair already exists", () =>
    Effect.gen(function* () {
      const { keys, runtimeManifest, snapshot } = yield* fixtures;
      const signer = yield* makeSigner(keys.privateKeyPem);
      const release = yield* signer.signRelease(runtimeManifest);
      const bundles = yield* preparePublicationRuntimes({
        release,
        rendererManifest,
        runtime: { recovery: null, result: snapshot },
        signer,
        sourceGitSha,
      }).pipe(
        Effect.provideService(
          ContentVerificationKeyResolver,
          resolverFor(keys.publicKeyPem)
        )
      );

      assert.strictEqual(bundles.length, 1);
      assert.deepStrictEqual(bundles[0]?.payload.snapshot, snapshot);
    })
  );
});
