import { Context, type Effect, Schema } from "effect";
import { type SigningKeyId, SigningKeyIdSchema } from "#contracts/ids.js";

/** Authenticated object whose Ed25519 signature is being checked. */
export const ContentSignatureSubjectSchema = Schema.Literal(
  "artifact",
  "release"
);
export type ContentSignatureSubject = typeof ContentSignatureSubjectSchema.Type;

/** No trusted public key exists for the requested key identifier. */
export class SigningKeyNotFoundError extends Schema.TaggedError<SigningKeyNotFoundError>()(
  "SigningKeyNotFoundError",
  { keyId: SigningKeyIdSchema }
) {}

/** The trusted key source could not resolve the requested public key. */
export class SigningKeyResolutionError extends Schema.TaggedError<SigningKeyResolutionError>()(
  "SigningKeyResolutionError",
  { keyId: SigningKeyIdSchema }
) {}

/** A resolved public key could not be parsed without exposing its contents. */
export class PublicKeyParseError extends Schema.TaggedError<PublicKeyParseError>()(
  "PublicKeyParseError",
  { keyId: SigningKeyIdSchema, subject: ContentSignatureSubjectSchema }
) {}

/** A resolved public key is not an Ed25519 verification key. */
export class PublicKeyTypeError extends Schema.TaggedError<PublicKeyTypeError>()(
  "PublicKeyTypeError",
  { keyId: SigningKeyIdSchema, subject: ContentSignatureSubjectSchema }
) {}

/** Node crypto could not complete an Ed25519 verification operation. */
export class SignatureCheckError extends Schema.TaggedError<SignatureCheckError>()(
  "SignatureCheckError",
  { keyId: SigningKeyIdSchema, subject: ContentSignatureSubjectSchema }
) {}

/** The signature does not authenticate the supplied canonical bytes. */
export class SignatureInvalidError extends Schema.TaggedError<SignatureInvalidError>()(
  "SignatureInvalidError",
  { keyId: SigningKeyIdSchema, subject: ContentSignatureSubjectSchema }
) {}

/** Server-side trust seam for resolving reviewed Ed25519 public keys. */
export class ContentVerificationKeyResolver extends Context.Tag(
  "AksaraContentVerificationKeyResolver"
)<
  ContentVerificationKeyResolver,
  {
    readonly resolve: (
      keyId: SigningKeyId
    ) => Effect.Effect<
      string,
      SigningKeyNotFoundError | SigningKeyResolutionError
    >;
  }
>() {}
