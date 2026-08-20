import { Buffer } from "node:buffer";
import { createHmac, timingSafeEqual } from "node:crypto";
import { Effect, Schema } from "effect";
import type { Sha256HashSchema } from "#contracts/ids";
import { RendererManifestEnvelopeSchema } from "#contracts/renderer/contract";

const BASE64URL_SHA256_PATTERN = /^[A-Za-z0-9_-]{43}$/u;

/** Stable wire format for one authenticated local renderer response. */
export const PREVIEW_RENDERER_AUTH_FORMAT = "aksara-renderer-auth-v1";

/** Fresh parent-generated challenge bound to one renderer request. */
export const PreviewRendererNonceSchema = Schema.String.pipe(
  Schema.check(Schema.isPattern(BASE64URL_SHA256_PATTERN))
);
export type PreviewRendererNonce = typeof PreviewRendererNonceSchema.Type;

/** Process-local HMAC key available only to the spawned Nakafa child. */
export const PreviewRendererSecretSchema = Schema.String.pipe(
  Schema.check(Schema.isPattern(BASE64URL_SHA256_PATTERN))
);
export type PreviewRendererSecret = typeof PreviewRendererSecretSchema.Type;

/** HMAC-SHA256 proof returned by the exact spawned Nakafa child. */
export const PreviewRendererProofSchema = Schema.String.pipe(
  Schema.check(Schema.isPattern(BASE64URL_SHA256_PATTERN))
);
export type PreviewRendererProof = typeof PreviewRendererProofSchema.Type;

/** Authenticated response returned only by the local renderer endpoint. */
export const PreviewRendererResponseSchema = Schema.Struct({
  format: Schema.Literal(PREVIEW_RENDERER_AUTH_FORMAT),
  manifest: RendererManifestEnvelopeSchema,
  proof: PreviewRendererProofSchema,
});
export type PreviewRendererResponse = typeof PreviewRendererResponseSchema.Type;

/** Renderer authentication could not be computed or did not match. */
export class PreviewRendererAuthError extends Schema.TaggedError<PreviewRendererAuthError>()(
  "PreviewRendererAuthError",
  { reason: Schema.Literals(["compute", "invalid"]) }
) {}

/** Canonicalizes one challenge and exact validated renderer identity. */
export function canonicalizePreviewRendererAuth(input: {
  readonly manifestHash: typeof Sha256HashSchema.Type;
  readonly nonce: PreviewRendererNonce;
}) {
  return JSON.stringify([
    PREVIEW_RENDERER_AUTH_FORMAT,
    input.nonce,
    input.manifestHash,
  ]);
}

/** Computes one renderer response proof from a process-local secret. */
export const computePreviewRendererProof = Effect.fn(
  "AksaraContracts.computePreviewRendererProof"
)(function* (input: {
  readonly manifestHash: typeof Sha256HashSchema.Type;
  readonly nonce: PreviewRendererNonce;
  readonly secret: PreviewRendererSecret;
}) {
  return yield* Effect.try({
    catch: () => new PreviewRendererAuthError({ reason: "compute" }),
    try: () =>
      PreviewRendererProofSchema.make(
        createHmac("sha256", Buffer.from(input.secret, "base64url"))
          .update(canonicalizePreviewRendererAuth(input))
          .digest("base64url")
      ),
  });
});

/** Verifies one proof without exposing timing-sensitive string comparison. */
export const verifyPreviewRendererProof = Effect.fn(
  "AksaraContracts.verifyPreviewRendererProof"
)(function* (input: {
  readonly manifestHash: typeof Sha256HashSchema.Type;
  readonly nonce: PreviewRendererNonce;
  readonly proof: PreviewRendererProof;
  readonly secret: PreviewRendererSecret;
}) {
  const expected = yield* computePreviewRendererProof(input);
  const actualBytes = Buffer.from(input.proof, "base64url");
  const expectedBytes = Buffer.from(expected, "base64url");
  if (timingSafeEqual(actualBytes, expectedBytes)) {
    return;
  }
  return yield* new PreviewRendererAuthError({ reason: "invalid" });
});
