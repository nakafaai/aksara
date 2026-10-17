import { Effect, Schema } from "effect";
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
export class PreviewRendererAuthError extends Schema.TaggedError<PreviewRendererAuthError>()(
  "PreviewRendererAuthError",
  { reason: Schema.Literals(["compute", "invalid"]) }
) {}

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

/** Imports the process-local secret as one HMAC-SHA256 key through Web Crypto. */
const importPreviewRendererKey = Effect.fn(
  "AksaraContracts.importPreviewRendererKey"
)(function* (secret: PreviewRendererSecret) {
  const raw = yield* Effect.fromResult(Base64Url.decode(secret)).pipe(
    Effect.orDie
  );
  return yield* Effect.tryPromise({
    catch: () => new PreviewRendererAuthError({ reason: "compute" }),
    try: () =>
      globalThis.crypto.subtle.importKey(
        "raw",
        raw,
        { hash: "SHA-256", name: "HMAC" },
        false,
        ["sign", "verify"]
      ),
  });
});

/** Computes one renderer response proof from a process-local secret. */
export const computePreviewRendererProof = Effect.fn(
  "AksaraContracts.computePreviewRendererProof"
)(function* (input: {
  readonly manifestHash: typeof Sha256HashSchema.Type;
  readonly nonce: PreviewRendererNonce;
  readonly secret: PreviewRendererSecret;
}) {
  const key = yield* importPreviewRendererKey(input.secret);
  const message = new TextEncoder().encode(
    canonicalizePreviewRendererAuth(input)
  );
  const tag = yield* Effect.tryPromise({
    catch: () => new PreviewRendererAuthError({ reason: "compute" }),
    try: () => globalThis.crypto.subtle.sign("HMAC", key, message),
  });
  return PreviewRendererProofSchema.make(Base64Url.encode(new Uint8Array(tag)));
});

/** Verifies one proof with the HMAC verification of Web Crypto, which compares in constant time. */
export const verifyPreviewRendererProof = Effect.fn(
  "AksaraContracts.verifyPreviewRendererProof"
)(function* (input: {
  readonly manifestHash: typeof Sha256HashSchema.Type;
  readonly nonce: PreviewRendererNonce;
  readonly proof: PreviewRendererProof;
  readonly secret: PreviewRendererSecret;
}) {
  const key = yield* importPreviewRendererKey(input.secret);
  const message = new TextEncoder().encode(
    canonicalizePreviewRendererAuth(input)
  );
  const tag = yield* Effect.fromResult(Base64Url.decode(input.proof)).pipe(
    Effect.orDie
  );
  const valid = yield* Effect.tryPromise({
    catch: () => new PreviewRendererAuthError({ reason: "compute" }),
    try: () => globalThis.crypto.subtle.verify("HMAC", key, tag, message),
  });
  if (valid) {
    return;
  }
  return yield* new PreviewRendererAuthError({ reason: "invalid" });
});
