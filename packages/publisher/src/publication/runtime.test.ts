// @vitest-environment node
import { generateKeyPairSync } from "node:crypto";

import { assert, describe, it } from "@effect/vitest";
import { GitCommitShaSchema } from "@nakafa/aksara-contracts/ids";
import {
  ContentVerificationKeyResolver,
  SigningKeyNotFoundError,
} from "@nakafa/aksara-contracts/signature/spec";
import { TRYOUT_RUNTIME_BUNDLE_FORMAT } from "@nakafa/aksara-contracts/tryout/runtime/spec";
import { makeTryoutSnapshot } from "@nakafa/aksara-contracts/tryout/snapshot/hash";
import { Effect } from "effect";

import { preparePublicationRuntime } from "#publisher/publication/runtime";
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
      const bundle = yield* preparePublicationRuntime({
        release,
        rendererManifest,
        signer,
        snapshot: null,
        sourceGitSha,
      }).pipe(Effect.provideService(ContentVerificationKeyResolver, resolver));

      assert.isNull(bundle);
    })
  );

  it.effect("signs and verifies the exact runtime pair", () =>
    Effect.gen(function* () {
      const signer = yield* makeSigner();
      const release = yield* signer.signRelease(signingManifest);
      const bundle = yield* preparePublicationRuntime({
        release,
        rendererManifest,
        signer,
        snapshot,
        sourceGitSha,
      }).pipe(Effect.provideService(ContentVerificationKeyResolver, resolver));

      assert.deepStrictEqual(bundle?.payload, {
        format: TRYOUT_RUNTIME_BUNDLE_FORMAT,
        rendererManifestHash: rendererManifest.hash,
        snapshot,
        sourceGitSha,
        sourceManifestHash: release.manifestHash,
        sourceReleaseId: release.manifest.releaseId,
      });
      assert.strictEqual(bundle?.keyId, signingKeyId);
    })
  );
});
