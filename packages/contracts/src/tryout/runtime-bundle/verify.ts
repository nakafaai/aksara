import { Effect, Schema } from "effect";

import { Sha256HashSchema } from "#contracts/ids";
import { validateRendererManifestHash } from "#contracts/renderer/manifest";
import { verifyEd25519Signature } from "#contracts/signature/verify";
import { canonicalizeTryoutRuntimeBundleSigningInput } from "#contracts/tryout/runtime-bundle/canonical";
import { hashTryoutRuntimeBundlePayload } from "#contracts/tryout/runtime-bundle/hash";
import {
  type SignedTryoutRuntimeBundle,
  SignedTryoutRuntimeBundleSchema,
} from "#contracts/tryout/runtime-bundle/spec";
import { makeTryoutSnapshot } from "#contracts/tryout/snapshot/hash";

/** Unknown input did not exactly satisfy the signed runtime-bundle contract. */
export class TryoutRuntimeBundleVerificationDecodeError extends Schema.TaggedError<TryoutRuntimeBundleVerificationDecodeError>()(
  "TryoutRuntimeBundleVerificationDecodeError",
  {
    message: Schema.Literal(
      "Try-out runtime bundle verification input does not satisfy its exact wire contract."
    ),
  }
) {}

/** The envelope hash does not identify its complete canonical payload. */
export class TryoutRuntimeBundleHashMismatchError extends Schema.TaggedError<TryoutRuntimeBundleHashMismatchError>()(
  "TryoutRuntimeBundleHashMismatchError",
  {
    actualHash: Sha256HashSchema,
    expectedHash: Sha256HashSchema,
  }
) {}

/** The embedded snapshot identity does not match its semantic facts. */
export class TryoutRuntimeBundleSnapshotMismatchError extends Schema.TaggedError<TryoutRuntimeBundleSnapshotMismatchError>()(
  "TryoutRuntimeBundleSnapshotMismatchError",
  {
    actualSnapshotId: Sha256HashSchema,
    expectedSnapshotId: Sha256HashSchema,
  }
) {}

/** The supplied renderer is not the renderer authenticated by the bundle. */
export class TryoutRuntimeBundleRendererMismatchError extends Schema.TaggedError<TryoutRuntimeBundleRendererMismatchError>()(
  "TryoutRuntimeBundleRendererMismatchError",
  {
    actualRendererManifestHash: Sha256HashSchema,
    expectedRendererManifestHash: Sha256HashSchema,
  }
) {}

/** Authenticates one already decoded permanent try-out runtime bundle. */
const authenticateTryoutRuntimeBundle = Effect.fn(
  "AksaraContracts.authenticateTryoutRuntimeBundle"
)(function* (bundle: SignedTryoutRuntimeBundle, rendererManifest: unknown) {
  const renderer = yield* validateRendererManifestHash(rendererManifest);
  const actualHash = yield* hashTryoutRuntimeBundlePayload(bundle.payload);
  if (actualHash !== bundle.bundleHash) {
    return yield* new TryoutRuntimeBundleHashMismatchError({
      actualHash,
      expectedHash: bundle.bundleHash,
    });
  }
  const expectedSnapshotId = makeTryoutSnapshot(
    bundle.payload.snapshot
  ).snapshotId;
  if (expectedSnapshotId !== bundle.payload.snapshot.snapshotId) {
    return yield* new TryoutRuntimeBundleSnapshotMismatchError({
      actualSnapshotId: bundle.payload.snapshot.snapshotId,
      expectedSnapshotId,
    });
  }
  if (renderer.hash !== bundle.payload.rendererManifestHash) {
    return yield* new TryoutRuntimeBundleRendererMismatchError({
      actualRendererManifestHash: renderer.hash,
      expectedRendererManifestHash: bundle.payload.rendererManifestHash,
    });
  }
  yield* verifyEd25519Signature({
    keyId: bundle.keyId,
    message: canonicalizeTryoutRuntimeBundleSigningInput(
      bundle.bundleHash,
      bundle.payload
    ),
    signature: bundle.signature,
    subject: "tryout-runtime-bundle",
  });
  return bundle;
});

/** Strictly decodes and authenticates a renderer-bound runtime bundle. */
export const verifySignedTryoutRuntimeBundle = Effect.fn(
  "AksaraContracts.verifySignedTryoutRuntimeBundle"
)(function* (input: {
  readonly bundle: unknown;
  readonly rendererManifest: unknown;
}) {
  const bundle = yield* Schema.decodeUnknownEffect(
    SignedTryoutRuntimeBundleSchema
  )(input.bundle, { onExcessProperty: "error" }).pipe(
    Effect.mapError(
      () =>
        new TryoutRuntimeBundleVerificationDecodeError({
          message:
            "Try-out runtime bundle verification input does not satisfy its exact wire contract.",
        })
    )
  );
  return yield* authenticateTryoutRuntimeBundle(bundle, input.rendererManifest);
});
