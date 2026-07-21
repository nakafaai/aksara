import { Buffer } from "node:buffer";
import { createPublicKey, verify as verifySignature } from "node:crypto";
import { Effect } from "effect";
import type { Ed25519Signature, SigningKeyId } from "#contracts/ids.js";
import {
  type ContentSignatureSubject,
  ContentVerificationKeyResolver,
  PublicKeyParseError,
  PublicKeyTypeError,
  SignatureCheckError,
  SignatureInvalidError,
} from "#contracts/signature/spec.js";

/** Parses and type-checks a reviewed PEM as an Ed25519 public key. */
function parseEd25519PublicKey(
  keyId: SigningKeyId,
  publicKeyPem: string,
  subject: ContentSignatureSubject
) {
  const normalizedPublicKeyPem = publicKeyPem.replaceAll("\r\n", "\n");
  if (!normalizedPublicKeyPem.startsWith("-----BEGIN PUBLIC KEY-----\n")) {
    return Effect.fail(new PublicKeyParseError({ keyId, subject }));
  }
  return Effect.try({
    catch: () => new PublicKeyParseError({ keyId, subject }),
    try: () => createPublicKey(normalizedPublicKeyPem),
  }).pipe(
    Effect.flatMap((publicKey) => {
      if (publicKey.asymmetricKeyType === "ed25519") {
        return Effect.succeed(publicKey);
      }
      return Effect.fail(new PublicKeyTypeError({ keyId, subject }));
    })
  );
}

/** Resolves trust and verifies domain-separated canonical bytes with Ed25519. */
export const verifyEd25519Signature = Effect.fn(
  "AksaraContracts.verifyEd25519Signature"
)(function* (input: {
  readonly keyId: SigningKeyId;
  readonly message: string;
  readonly signature: Ed25519Signature;
  readonly subject: ContentSignatureSubject;
}) {
  const resolver = yield* ContentVerificationKeyResolver;
  const publicKeyPem = yield* resolver.resolve(input.keyId);
  const publicKey = yield* parseEd25519PublicKey(
    input.keyId,
    publicKeyPem,
    input.subject
  );
  const valid = yield* Effect.try({
    catch: () =>
      new SignatureCheckError({
        keyId: input.keyId,
        subject: input.subject,
      }),
    try: () =>
      verifySignature(
        null,
        Buffer.from(input.message, "utf8"),
        publicKey,
        Buffer.from(input.signature, "base64url")
      ),
  });
  if (valid) {
    return;
  }
  return yield* new SignatureInvalidError({
    keyId: input.keyId,
    subject: input.subject,
  });
});
