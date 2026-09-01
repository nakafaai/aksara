// @vitest-environment node
import { Buffer } from "node:buffer";
import { generateKeyPairSync, sign as signBytes } from "node:crypto";
import { describe, expect, it } from "@effect/vitest";
import { Effect } from "effect";

import {
  Ed25519SignatureSchema,
  GitCommitShaSchema,
  ReleaseIdSchema,
  Sha256HashSchema,
  SigningKeyIdSchema,
} from "#contracts/ids";
import { ACTIVE_APP_LOCALES } from "#contracts/locale";
import {
  ContentVerificationKeyResolver,
  SigningKeyNotFoundError,
} from "#contracts/signature/spec";
import { rendererManifest } from "#contracts/test/request";
import {
  compatibleManifest,
  tamperSignature,
} from "#contracts/test/runtime/fixture";
import { canonicalizeTryoutRuntimeBundleSigningInput } from "#contracts/tryout/runtime/canonical";
import { hashTryoutRuntimeBundlePayload } from "#contracts/tryout/runtime/hash";
import {
  SignedTryoutRuntimeBundleSchema,
  TRYOUT_RUNTIME_BUNDLE_FORMAT,
  type TryoutRuntimeBundlePayload,
} from "#contracts/tryout/runtime/spec";
import { verifySignedTryoutRuntimeBundle } from "#contracts/tryout/runtime/verify";
import { makeTryoutSnapshot } from "#contracts/tryout/snapshot/hash";

const keys = generateKeyPairSync("ed25519");
const keyId = SigningKeyIdSchema.make("test-runtime-bundle-key");
const publicKeyPem = keys.publicKey
  .export({ format: "pem", type: "spki" })
  .toString();
const hash = Sha256HashSchema.make(`sha256:${"a".repeat(64)}`);
const snapshot = makeTryoutSnapshot({
  activeAppLocales: ACTIVE_APP_LOCALES,
  catalogDigest: hash,
  counts: { country: 1, exam: 1, section: 1, set: 1, track: 1 },
  placementCount: 2,
  placementDigest: Sha256HashSchema.make(`sha256:${"b".repeat(64)}`),
  routeCount: 5,
});
const payload: TryoutRuntimeBundlePayload = {
  format: TRYOUT_RUNTIME_BUNDLE_FORMAT,
  rendererManifestHash: rendererManifest.hash,
  snapshot,
  sourceGitSha: GitCommitShaSchema.make("c".repeat(40)),
  sourceManifestHash: Sha256HashSchema.make(`sha256:${"d".repeat(64)}`),
  sourceReleaseId: ReleaseIdSchema.make("test-runtime-source"),
};
const resolver = ContentVerificationKeyResolver.of({
  resolve: (requestedKeyId) =>
    requestedKeyId === keyId
      ? Effect.succeed(publicKeyPem)
      : Effect.fail(new SigningKeyNotFoundError({ keyId: requestedKeyId })),
});

/** Produces one correctly hashed and signed bundle for exact test payload bytes. */
const makeBundle = Effect.fn("RuntimeVerificationTest.makeBundle")(function* (
  value: TryoutRuntimeBundlePayload
) {
  const bundleHash = yield* hashTryoutRuntimeBundlePayload(value);
  const signature = Ed25519SignatureSchema.make(
    signBytes(
      null,
      Buffer.from(
        canonicalizeTryoutRuntimeBundleSigningInput(bundleHash, value),
        "utf8"
      ),
      keys.privateKey
    ).toString("base64url")
  );
  return SignedTryoutRuntimeBundleSchema.make({
    bundleHash,
    keyId,
    payload: value,
    signature,
  });
});

/** Runs bundle verification with the fixture trust resolver. */
function verify(bundle: unknown, renderer: unknown = rendererManifest) {
  return verifySignedTryoutRuntimeBundle({
    bundle,
    rendererManifest: renderer,
  }).pipe(Effect.provideService(ContentVerificationKeyResolver, resolver));
}

describe("signed try-out runtime bundle verification", () => {
  it.effect("authenticates permanent snapshot and renderer evidence", () =>
    Effect.gen(function* () {
      const bundle = yield* makeBundle(payload);
      expect(yield* verify(bundle)).toEqual(bundle);
    })
  );

  it.effect(
    "rejects mutated hash, snapshot, renderer, and signature bytes",
    () =>
      Effect.gen(function* () {
        const bundle = yield* makeBundle(payload);
        const invalidSnapshot = yield* makeBundle({
          ...payload,
          snapshot: { ...payload.snapshot, routeCount: 6 },
        });
        const failures = yield* Effect.all([
          verify({
            ...bundle,
            bundleHash: Sha256HashSchema.make(`sha256:${"e".repeat(64)}`),
          }).pipe(Effect.flip),
          verify(invalidSnapshot).pipe(Effect.flip),
          verify(bundle, compatibleManifest).pipe(Effect.flip),
          verify({
            ...bundle,
            signature: tamperSignature(bundle.signature),
          }).pipe(Effect.flip),
        ]);
        expect(failures.map((failure) => failure._tag)).toEqual([
          "TryoutRuntimeBundleHashMismatchError",
          "TryoutRuntimeBundleSnapshotMismatchError",
          "TryoutRuntimeBundleRendererMismatchError",
          "SignatureInvalidError",
        ]);
      })
  );

  it.effect("strictly rejects excess envelope fields", () =>
    Effect.gen(function* () {
      const bundle = yield* makeBundle(payload);
      const failure = yield* verify({ ...bundle, unexpected: true }).pipe(
        Effect.flip
      );
      expect(failure._tag).toBe("TryoutRuntimeBundleVerificationDecodeError");
    })
  );

  it.effect("maps Web Crypto hash failures to the bundle source", () =>
    Effect.gen(function* () {
      yield* Effect.acquireRelease(
        Effect.sync(() =>
          vi
            .spyOn(crypto.subtle, "digest")
            .mockRejectedValueOnce(new TypeError("injected digest failure"))
        ),
        (mock) => Effect.sync(() => mock.mockRestore())
      );
      const failure = yield* hashTryoutRuntimeBundlePayload(payload).pipe(
        Effect.flip
      );
      expect(failure).toMatchObject({
        _tag: "TryoutRuntimeBundleHashComputationError",
        sourceReleaseId: payload.sourceReleaseId,
      });
    })
  );
});
