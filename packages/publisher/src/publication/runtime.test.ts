// @vitest-environment node
import { generateKeyPairSync } from "node:crypto";

import { assert, describe, it } from "@effect/vitest";
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

describe("publication runtime", () => {
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
