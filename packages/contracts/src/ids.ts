import { Schema } from "effect";

const HEX_40_PATTERN = /^[a-f\d]{40}$/;
const SHA256_PATTERN = /^sha256:[a-f\d]{64}$/;
const ED25519_SIGNATURE_PATTERN = /^[A-Za-z0-9_-]{85}[AQgw]$/;
const SIGNING_KEY_ID_PATTERN = /^[a-z0-9][a-z0-9._-]{0,63}$/;
const CONTENT_KEY_PATTERN = /^[a-z0-9][a-z0-9._:/-]{0,511}$/;
const RELEASE_ID_PATTERN = /^[a-z0-9][a-z0-9._-]{0,127}$/;
const PUBLIC_PATH_PATTERN =
  /^\/[a-z0-9]+(?:-[a-z0-9]+)*(?:\/[a-z0-9]+(?:-[a-z0-9]+)*)*$/;

function isGitCommitSha(value: string): value is `${string}` {
  return HEX_40_PATTERN.test(value);
}

function isSha256Hash(value: string): value is `sha256:${string}` {
  return SHA256_PATTERN.test(value);
}

function isEd25519Signature(value: string) {
  return ED25519_SIGNATURE_PATTERN.test(value);
}

function isSigningKeyId(value: string) {
  return SIGNING_KEY_ID_PATTERN.test(value);
}

function isPublicPath(value: string) {
  return (
    value.length <= 2048 && (value === "/" || PUBLIC_PATH_PATTERN.test(value))
  );
}

/** Stable content identity shared across locales and immutable releases. */
export const ContentKeySchema = Schema.String.pipe(
  Schema.pattern(CONTENT_KEY_PATTERN),
  Schema.brand("@NakafaAI/AksaraContentKey")
);
export type ContentKey = typeof ContentKeySchema.Type;

/** Immutable publication generation identity. */
export const ReleaseIdSchema = Schema.String.pipe(
  Schema.pattern(RELEASE_ID_PATTERN),
  Schema.brand("@NakafaAI/AksaraReleaseId")
);
export type ReleaseId = typeof ReleaseIdSchema.Type;

/** Canonical absolute public route without queries, fragments, or traversal. */
export const PublicPathSchema = Schema.String.pipe(
  Schema.filter(isPublicPath, {
    message: () => "Expected a canonical absolute public path.",
  }),
  Schema.brand("@NakafaAI/AksaraPublicPath")
);
export type PublicPath = typeof PublicPathSchema.Type;

/** Full lowercase Git commit SHA recorded in a release manifest. */
export const GitCommitShaSchema = Schema.String.pipe(
  Schema.filter(isGitCommitSha, {
    message: () => "Expected a 40-character lowercase Git commit SHA.",
  }),
  Schema.brand("@NakafaAI/AksaraGitCommitSha")
);
export type GitCommitSha = typeof GitCommitShaSchema.Type;

/** Canonical SHA-256 value with an explicit algorithm prefix. */
export const Sha256HashSchema = Schema.String.pipe(
  Schema.filter(isSha256Hash, {
    message: () =>
      "Expected sha256 followed by 64 lowercase hexadecimal characters.",
  }),
  Schema.brand("@NakafaAI/AksaraSha256Hash")
);
export type Sha256Hash = typeof Sha256HashSchema.Type;

/** Stable identifier selecting one trusted Ed25519 verification key. */
export const SigningKeyIdSchema = Schema.String.pipe(
  Schema.filter(isSigningKeyId, {
    message: () =>
      "Expected a lowercase wire-safe signing key identifier up to 64 characters.",
  }),
  Schema.brand("@NakafaAI/AksaraSigningKeyId")
);
export type SigningKeyId = typeof SigningKeyIdSchema.Type;

/** Unpadded base64url encoding of one 64-byte Ed25519 signature. */
export const Ed25519SignatureSchema = Schema.String.pipe(
  Schema.filter(isEd25519Signature, {
    message: () =>
      "Expected a canonical unpadded base64url 64-byte Ed25519 signature.",
  }),
  Schema.brand("@NakafaAI/AksaraEd25519Signature")
);
export type Ed25519Signature = typeof Ed25519SignatureSchema.Type;
