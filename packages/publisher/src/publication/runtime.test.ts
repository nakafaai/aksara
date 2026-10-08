// @vitest-environment node
import { Buffer } from "node:buffer";
import { generateKeyPairSync, verify } from "node:crypto";

import { assert, describe, expect, it } from "@effect/vitest";
import {
  GitCommitShaSchema,
  ReleaseIdSchema,
} from "@nakafa/aksara-contracts/ids";
import { ContentReleaseManifestSchema } from "@nakafa/aksara-contracts/release";
import { replaceContentSnapshot } from "@nakafa/aksara-contracts/release/snapshot/spec";
import {
  ContentVerificationKeyResolver,
  SigningKeyNotFoundError,
} from "@nakafa/aksara-contracts/signature/spec";
import { canonicalizeTryoutRuntimeBundleSigningInput } from "@nakafa/aksara-contracts/tryout/runtime/canonical";
import { TRYOUT_RUNTIME_BUNDLE_FORMAT } from "@nakafa/aksara-contracts/tryout/runtime/spec";
import { makeTryoutSnapshot } from "@nakafa/aksara-contracts/tryout/snapshot/hash";
import { Effect } from "effect";

import { preparePublicationRuntimes } from "#publisher/publication/runtime";
import { makeEd25519PublicationSigner } from "#publisher/signing/service";
import { rendererManifest } from "#test/publication";
import { signingManifest } from "#test/signing";

const keys = generateKeyPairSync("ed25519");
const signingKeyId = "test-publication-runtime-key";
const resolver = ContentVerificationKeyResolver.of({
  resolve: (keyId) =>
    keyId === signingKeyId
      ? Effect.succeed(
          keys.publicKey.export({ format: "pem", type: "spki" }).toString()
        )
      : Effect.fail(new SigningKeyNotFoundError({ keyId })),
});
const sourceGitSha = GitCommitShaSchema.make("d".repeat(40));
const snapshot = makeTryoutSnapshot({
  activeAppLocales: signingManifest.activeAppLocales,
  catalogDigest: signingManifest.itemsDigest,
  counts: { country: 1, exam: 1, section: 1, set: 1, track: 1 },
  placementCount: 1,
  placementDigest: signingManifest.resultDigest,
  routeCount: 5,
});
const recoverySnapshot = makeTryoutSnapshot({
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

/** Creates one real signer for runtime bundle boundary tests. */
const makeSigner = () =>
  makeEd25519PublicationSigner({
    keyId: signingKeyId,
    privateKeyPem: keys.privateKey
      .export({ format: "pem", type: "pkcs8" })
      .toString(),
  });

/** Test-only Ed25519 public key that verifies the recorded candidate and recovery bundle signatures. */
const TEST_PUBLIC_KEY_PEM = `-----BEGIN PUBLIC KEY-----
MCowBQYDK2VwAyEARmu03+ghzMgowRI4IVL/IYJx08mZ7XO6OmMiz556+tg=
-----END PUBLIC KEY-----
`;
// Record again: create a key, sign the same input, and replace the public key and signature literals below.
const TEST_RESULT_BUNDLE_SIGNATURE =
  "yLNxwS8jAsjfYnDnX0uRPSCyoawDbqxAj_Qy65NqUvO1uPo8puir8ahOSR2zGGxenknWDmKVnQ33XAXosYQVCw";
// Record again: create a key, sign the same input, and replace the public key and signature literals below.
const TEST_RECOVERY_BUNDLE_SIGNATURE =
  "fXTJBJt7beDx9DWzKbysaF5rTw5lCsOZ5JDdlxt8hx_jeoHyuIKcdTZPARJ6bN1bEugfiOEz9OUZmEBIpukXAg";

describe("publication runtime", () => {
  it.effect(
    "pins the bundle hash and signature of candidate and recovery pairs",
    () =>
      Effect.gen(function* () {
        const signer = yield* makeSigner();
        const release = yield* signer.signRelease(runtimeManifest);
        const bundles = yield* preparePublicationRuntimes({
          release,
          rendererManifest,
          runtime: { recovery: recoverySnapshot, result: snapshot },
          signer,
          sourceGitSha,
        }).pipe(
          Effect.provideService(ContentVerificationKeyResolver, resolver)
        );
        const recordedSignatures = new Map([
          [
            "sha256:436ab25a3c201eff2f15b393b4d748e0f6e31a6387d5166dfeff342612c9d33b",
            TEST_RESULT_BUNDLE_SIGNATURE,
          ],
          [
            "sha256:3bdbbd2addcabafc44929817b8f5bdbbe104ca38253f97d981dab9edef971e03",
            TEST_RECOVERY_BUNDLE_SIGNATURE,
          ],
        ]);
        expect(bundles.map((bundle) => bundle.bundleHash)).toEqual([
          ...recordedSignatures.keys(),
        ]);
        /** Verifies each produced bundle over the transformed signing input with its recorded signature. */
        const verifies = (transform: (input: string) => string) =>
          bundles.map((bundle) => {
            const signature = recordedSignatures.get(bundle.bundleHash);
            const input = canonicalizeTryoutRuntimeBundleSigningInput(
              bundle.bundleHash,
              bundle.payload
            );
            return (
              signature !== undefined &&
              verify(
                null,
                Buffer.from(transform(input), "utf8"),
                TEST_PUBLIC_KEY_PEM,
                Buffer.from(signature, "base64url")
              )
            );
          });
        expect(verifies((input) => input)).toEqual([true, true]);
        expect(verifies((input) => input.replace("aksara", "aksarb"))).toEqual([
          false,
          false,
        ]);
      })
  );
  it.effect("skips an unrelated Git release", () =>
    Effect.gen(function* () {
      const signer = yield* makeSigner();
      const release = yield* signer.signRelease(signingManifest);
      const bundles = yield* preparePublicationRuntimes({
        release,
        rendererManifest,
        runtime: null,
        signer,
        sourceGitSha,
      }).pipe(Effect.provideService(ContentVerificationKeyResolver, resolver));

      assert.deepStrictEqual(bundles, []);
    })
  );

  it.effect("signs candidate and retained recovery runtime pairs", () =>
    Effect.gen(function* () {
      const signer = yield* makeSigner();
      const release = yield* signer.signRelease(runtimeManifest);
      const bundles = yield* preparePublicationRuntimes({
        release,
        rendererManifest,
        runtime: { recovery: recoverySnapshot, result: snapshot },
        signer,
        sourceGitSha,
      }).pipe(Effect.provideService(ContentVerificationKeyResolver, resolver));

      assert.deepStrictEqual(
        bundles.map((bundle) => bundle.payload),
        [snapshot, recoverySnapshot].map((runtimeSnapshot) => ({
          format: TRYOUT_RUNTIME_BUNDLE_FORMAT,
          rendererManifestHash: rendererManifest.hash,
          snapshot: runtimeSnapshot,
          sourceGitSha,
          sourceManifestHash: release.manifestHash,
          sourceReleaseId: release.manifest.releaseId,
        }))
      );
      assert.deepStrictEqual(
        bundles.map((bundle) => bundle.keyId),
        [signingKeyId, signingKeyId]
      );
    })
  );

  it.effect("signs one candidate when the retained pair already exists", () =>
    Effect.gen(function* () {
      const signer = yield* makeSigner();
      const release = yield* signer.signRelease(runtimeManifest);
      const bundles = yield* preparePublicationRuntimes({
        release,
        rendererManifest,
        runtime: { recovery: null, result: snapshot },
        signer,
        sourceGitSha,
      }).pipe(Effect.provideService(ContentVerificationKeyResolver, resolver));

      assert.strictEqual(bundles.length, 1);
      assert.deepStrictEqual(bundles[0]?.payload.snapshot, snapshot);
    })
  );
});
