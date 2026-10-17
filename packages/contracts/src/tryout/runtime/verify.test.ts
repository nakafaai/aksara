// @vitest-environment node
import { describe, expect, it } from "@effect/vitest";
import { Array as Arr, Effect } from "effect";

import {
  Ed25519SignatureSchema,
  GitCommitShaSchema,
  ReleaseIdSchema,
  Sha256HashSchema,
  SigningKeyIdSchema,
} from "#contracts/ids";
import { signEd25519Message } from "#contracts/signature/key";
import {
  ContentVerificationKeyResolver,
  SigningKeyNotFoundError,
} from "#contracts/signature/spec";
import { rendererManifest } from "#contracts/test/request";
import {
  compatibleManifest,
  tamperSignature,
} from "#contracts/test/runtime/fixture";
import {
  tryoutRuntimeKeys,
  tryoutRuntimeSnapshot,
} from "#contracts/test/runtime/keys";
import { canonicalizeTryoutRuntimeBundleSigningInput } from "#contracts/tryout/runtime/canonical";
import { hashTryoutRuntimeBundlePayload } from "#contracts/tryout/runtime/hash";
import {
  SignedTryoutRuntimeBundleSchema,
  TRYOUT_RUNTIME_BUNDLE_FORMAT,
  type TryoutRuntimeBundlePayload,
} from "#contracts/tryout/runtime/spec";
import { verifySignedTryoutRuntimeBundle } from "#contracts/tryout/runtime/verify";

const keyId = SigningKeyIdSchema.make("test-runtime-bundle-key");
const { publicKeyPem } = tryoutRuntimeKeys;
const snapshot = tryoutRuntimeSnapshot;
const payload: TryoutRuntimeBundlePayload = {
  format: TRYOUT_RUNTIME_BUNDLE_FORMAT,
  rendererManifestHash: rendererManifest.hash,
  snapshot,
  sourceGitSha: GitCommitShaSchema.make("c".repeat(40)),
  sourceManifestHash: Sha256HashSchema.make(`sha256:${"d".repeat(64)}`),
  sourceReleaseId: ReleaseIdSchema.make("test-runtime-source"),
};
// Record again: generate a key, sign the same input, and replace the three literals below.
const fixedKeyId = SigningKeyIdSchema.make("test-runtime-fixed-key");
const fixedPublicKeyPem =
  "-----BEGIN PUBLIC KEY-----\nMCowBQYDK2VwAyEATj+1o38Blvhe0vWQPC5EyVxW+iyD+np1lHpDsXB9Bqo=\n-----END PUBLIC KEY-----\n";
const fixedBundleHash = Sha256HashSchema.make(
  "sha256:552142c2943be6109e359aff32112931f4ef3741031a7710d847a5ca54d6b303"
);
const fixedSignature = Ed25519SignatureSchema.make(
  "V3SKeeoDxnVUEL6C-Njjr82XQMvyJNC7AmHECdf8BHQbzNP7jlGXFl6ATFk4xpwT0jQhTPi1ntpcyoc6KoUMBw"
);
const resolver = ContentVerificationKeyResolver.of({
  resolve: (requestedKeyId) => {
    if (requestedKeyId === keyId) {
      return Effect.succeed(publicKeyPem);
    }
    if (requestedKeyId === fixedKeyId) {
      return Effect.succeed(fixedPublicKeyPem);
    }
    return Effect.fail(new SigningKeyNotFoundError({ keyId: requestedKeyId }));
  },
});

/** Produces one correctly hashed and signed bundle for exact test payload bytes. */
const makeBundle = Effect.fn("RuntimeVerificationTest.makeBundle")(function* (
  value: TryoutRuntimeBundlePayload
) {
  const bundleHash = yield* hashTryoutRuntimeBundlePayload(value);
  const signature = yield* signEd25519Message(
    tryoutRuntimeKeys.privateKeyPem,
    canonicalizeTryoutRuntimeBundleSigningInput(bundleHash, value)
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
        expect(Arr.map(failures, (failure) => failure._tag)).toEqual([
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

  it.effect(
    "accepts a bundle signed by a fixed test key and rejects one changed signature character",
    () =>
      Effect.gen(function* () {
        const bundle = SignedTryoutRuntimeBundleSchema.make({
          bundleHash: fixedBundleHash,
          keyId: fixedKeyId,
          payload,
          signature: fixedSignature,
        });
        const changed = Ed25519SignatureSchema.make(
          `W${fixedSignature.slice(1)}`
        );
        const failure = yield* verify({
          ...bundle,
          signature: changed,
        }).pipe(Effect.flip);

        expect(yield* verify(bundle)).toEqual(bundle);
        expect(failure._tag).toBe("SignatureInvalidError");
      })
  );
});
