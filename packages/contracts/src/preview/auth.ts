import { Effect, Layer, Schema } from "effect";
import { Mac, SecureRandom } from "effect/crypto";
import { Base64Url } from "effect/encoding";
import type { Sha256HashSchema } from "#contracts/ids";
import { RendererManifestEnvelopeSchema } from "#contracts/renderer/contract";
import { encodeJsonText } from "#contracts/text/json";

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
export class PreviewRendererAuthError extends Schema.TaggedError<
  PreviewRendererAuthError,
  { readonly brand: unique symbol }
>()("PreviewRendererAuthError", {
  reason: Schema.Literals(["compute", "invalid"]),
}) {}

/** Canonicalizes one challenge and exact validated renderer identity. */
export function canonicalizePreviewRendererAuth(input: {
  readonly manifestHash: typeof Sha256HashSchema.Type;
  readonly nonce: PreviewRendererNonce;
}) {
  return encodeJsonText([
    PREVIEW_RENDERER_AUTH_FORMAT,
    input.nonce,
    input.manifestHash,
  ]);
}

/**
 * HMAC on Web Crypto. Every runtime that Aksara contracts run in has
 * `crypto.subtle`, so the layer is provided here and callers need no runtime
 * layer.
 */
const MacLayer = Mac.layerWebCrypto.pipe(
  Layer.provide(SecureRandom.layerWebCrypto)
);

/**
 * Reads the process-local secret as one HMAC-SHA256 key. Its schema admits
 * only the 43-character base64url text of 32 bytes, so it always decodes.
 */
function previewRendererKey(secret: PreviewRendererSecret) {
  return Effect.fromResult(Base64Url.decode(secret)).pipe(
    Effect.flatMap((raw) => Mac.key(Mac.hmacSha256, raw)),
    Effect.orDie
  );
}

/** Computes one renderer response proof from a process-local secret. */
export const computePreviewRendererProof = Effect.fn(
  "AksaraContracts.computePreviewRendererProof"
)(function* (input: {
  readonly manifestHash: typeof Sha256HashSchema.Type;
  readonly nonce: PreviewRendererNonce;
  readonly secret: PreviewRendererSecret;
}) {
  const key = yield* previewRendererKey(input.secret);
  const mac = yield* Mac.Mac;
  const tag = yield* mac
    .sign(key, new TextEncoder().encode(canonicalizePreviewRendererAuth(input)))
    .pipe(
      Effect.mapError(() => new PreviewRendererAuthError({ reason: "compute" }))
    );
  return PreviewRendererProofSchema.make(Base64Url.encode(tag));
}, Effect.provide(MacLayer));

/** Verifies one proof with Effect's HMAC verification, which compares in constant time. */
export const verifyPreviewRendererProof = Effect.fn(
  "AksaraContracts.verifyPreviewRendererProof"
)(function* (input: {
  readonly manifestHash: typeof Sha256HashSchema.Type;
  readonly nonce: PreviewRendererNonce;
  readonly proof: PreviewRendererProof;
  readonly secret: PreviewRendererSecret;
}) {
  const key = yield* previewRendererKey(input.secret);
  const tag = yield* Effect.fromResult(Base64Url.decode(input.proof)).pipe(
    Effect.orDie
  );
  const mac = yield* Mac.Mac;
  const valid = yield* mac
    .verify(
      key,
      tag,
      new TextEncoder().encode(canonicalizePreviewRendererAuth(input))
    )
    .pipe(
      Effect.mapError(() => new PreviewRendererAuthError({ reason: "compute" }))
    );
  if (valid) {
    return;
  }
  return yield* new PreviewRendererAuthError({ reason: "invalid" });
}, Effect.provide(MacLayer));
