import { Effect, Layer } from "effect";
import { KeyFormat, SecureRandom, Signature } from "effect/crypto";
import { Base64, Base64Url, Hex } from "effect/encoding";
import type { Ed25519Signature, SigningKeyId } from "#contracts/ids";
import {
  type ContentSignatureSubject,
  ContentVerificationKeyResolver,
  PublicKeyParseError,
  PublicKeyTypeError,
  SignatureCheckError,
  SignatureInvalidError,
} from "#contracts/signature/spec";

const PUBLIC_KEY_HEADER = "-----BEGIN PUBLIC KEY-----\n";
const PUBLIC_KEY_FOOTER = "-----END PUBLIC KEY-----";
/** The DER header of one Ed25519 SubjectPublicKeyInfo, before its 32-byte key. */
const ED25519_SPKI_PREFIX = "302a300506032b6570032100";
const ED25519_SPKI_BYTES = 44;

/**
 * Ed25519 verification on Web Crypto. Every runtime that Aksara contracts run
 * in has `crypto.subtle`, so the layer is provided here and callers need no
 * runtime layer.
 */
const SignatureLayer = Signature.layerWebCrypto.pipe(
  Layer.provide(SecureRandom.layerWebCrypto)
);

/** Reads the reviewed SPKI bytes from one exact public-key PEM. */
function decodePublicKeyPem(
  keyId: SigningKeyId,
  publicKeyPem: string,
  subject: ContentSignatureSubject
) {
  const normalizedPublicKeyPem = publicKeyPem.replaceAll("\r\n", "\n");
  if (
    !(
      normalizedPublicKeyPem.startsWith(PUBLIC_KEY_HEADER) &&
      normalizedPublicKeyPem.trimEnd().endsWith(PUBLIC_KEY_FOOTER)
    )
  ) {
    return Effect.fail(new PublicKeyParseError({ keyId, subject }));
  }
  const body = normalizedPublicKeyPem
    .slice(PUBLIC_KEY_HEADER.length)
    .replace(PUBLIC_KEY_FOOTER, "")
    .replaceAll("\n", "")
    .trim();
  return Effect.fromResult(Base64.decode(body)).pipe(
    Effect.mapError(() => new PublicKeyParseError({ keyId, subject }))
  );
}

/** Imports one exact Ed25519 SPKI key, refusing a key of any other type before it reaches Web Crypto. */
const importEd25519PublicKey = Effect.fn(
  "AksaraContracts.importEd25519PublicKey"
)(function* (
  keyId: SigningKeyId,
  publicKeyPem: string,
  subject: ContentSignatureSubject
) {
  const der = yield* decodePublicKeyPem(keyId, publicKeyPem, subject);
  if (
    der.byteLength !== ED25519_SPKI_BYTES ||
    !Hex.encode(der).startsWith(ED25519_SPKI_PREFIX)
  ) {
    return yield* new PublicKeyTypeError({ keyId, subject });
  }
  return yield* KeyFormat.decodePublic(
    KeyFormat.spki,
    Signature.ed25519,
    der
  ).pipe(Effect.mapError(() => new PublicKeyParseError({ keyId, subject })));
});

/** Decodes one unpadded base64url Ed25519 signature, which its schema has already checked. */
function decodeSignature(signature: Ed25519Signature) {
  return Effect.fromResult(Base64Url.decode(signature)).pipe(Effect.orDie);
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
  const publicKey = yield* importEd25519PublicKey(
    input.keyId,
    publicKeyPem,
    input.subject
  );
  const signature = yield* Signature.Signature;
  const valid = yield* signature
    .verify(
      publicKey,
      yield* decodeSignature(input.signature),
      new TextEncoder().encode(input.message)
    )
    .pipe(
      Effect.mapError(
        () =>
          new SignatureCheckError({
            keyId: input.keyId,
            subject: input.subject,
          })
      )
    );
  if (valid) {
    return;
  }
  return yield* new SignatureInvalidError({
    keyId: input.keyId,
    subject: input.subject,
  });
}, Effect.provide(SignatureLayer));
