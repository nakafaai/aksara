import { Effect } from "effect";
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
const ED25519_SPKI_PREFIX = "302a300506032b6570032100";
const PUBLIC_KEY_BASE64_PATTERN = /^[A-Za-z0-9+/]+={0,2}$/u;

/** Decodes canonical base64 text without a Node Buffer dependency. */
function decodeBase64(value: string) {
  const decoded = atob(value);
  return Uint8Array.from(decoded, (character) => character.charCodeAt(0));
}

/** Encodes bytes as lowercase hexadecimal for one exact key-type check. */
function encodeHex(value: Uint8Array) {
  let hex = "";
  for (const byte of value) {
    hex += byte.toString(16).padStart(2, "0");
  }
  return hex;
}

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
  return Effect.try({
    catch: () => new PublicKeyParseError({ keyId, subject }),
    try: () => {
      const body = normalizedPublicKeyPem
        .slice(PUBLIC_KEY_HEADER.length)
        .replace(PUBLIC_KEY_FOOTER, "")
        .replaceAll("\n", "")
        .trim();
      if (!PUBLIC_KEY_BASE64_PATTERN.test(body) || body.length % 4 !== 0) {
        throw new TypeError("Invalid public-key base64");
      }
      return decodeBase64(body);
    },
  });
}

/** Imports one exact Ed25519 SPKI key through Web Crypto. */
function importEd25519PublicKey(
  keyId: SigningKeyId,
  publicKeyPem: string,
  subject: ContentSignatureSubject
) {
  return Effect.gen(function* () {
    const bytes = yield* decodePublicKeyPem(keyId, publicKeyPem, subject);
    if (
      bytes.byteLength !== 44 ||
      !encodeHex(bytes.slice(0, 12)).startsWith(ED25519_SPKI_PREFIX)
    ) {
      return yield* new PublicKeyTypeError({ keyId, subject });
    }
    return yield* Effect.tryPromise({
      catch: () => new PublicKeyParseError({ keyId, subject }),
      try: () =>
        crypto.subtle.importKey("spki", bytes, { name: "Ed25519" }, false, [
          "verify",
        ]),
    });
  });
}

/** Decodes one unpadded base64url Ed25519 signature. */
function decodeSignature(signature: Ed25519Signature) {
  const base64 = signature.replaceAll("-", "+").replaceAll("_", "/");
  return decodeBase64(base64.padEnd(Math.ceil(base64.length / 4) * 4, "="));
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
  const valid = yield* Effect.tryPromise({
    catch: () =>
      new SignatureCheckError({
        keyId: input.keyId,
        subject: input.subject,
      }),
    try: () =>
      crypto.subtle.verify(
        "Ed25519",
        publicKey,
        decodeSignature(input.signature),
        new TextEncoder().encode(input.message)
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
