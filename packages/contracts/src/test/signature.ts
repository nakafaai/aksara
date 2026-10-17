import { Effect } from "effect";
import { Base64, Base64Url } from "effect/encoding";

/** Strips one PEM armor and its line breaks, leaving the base64 body of the DER bytes. */
function pemBody(pem: string) {
  return pem.replace(/-----[^-]+-----|\s/gu, "");
}

/** Imports one Ed25519 SPKI public key from its PEM text for Web Crypto verification. */
export const importEd25519PublicKeyPem = Effect.fn(
  "AksaraContractsTest.importEd25519PublicKeyPem"
)(function* (publicKeyPem: string) {
  const der = yield* Effect.fromResult(Base64.decode(pemBody(publicKeyPem)));
  return yield* Effect.promise(() =>
    globalThis.crypto.subtle.importKey(
      "spki",
      der,
      { name: "Ed25519" },
      false,
      ["verify"]
    )
  );
});

/** Verifies one unpadded base64url Ed25519 signature over the UTF-8 bytes of one exact message. */
export const verifyEd25519Pem = Effect.fn(
  "AksaraContractsTest.verifyEd25519Pem"
)(function* (publicKeyPem: string, message: string, signature: string) {
  const key = yield* importEd25519PublicKeyPem(publicKeyPem);
  const tag = yield* Effect.fromResult(Base64Url.decode(signature));
  return yield* Effect.promise(() =>
    globalThis.crypto.subtle.verify(
      "Ed25519",
      key,
      tag,
      new TextEncoder().encode(message)
    )
  );
});

/** Generates one RSA key pair and returns its SPKI public key as PEM, a key kind that Ed25519 checks must refuse. */
export const generateRsaPublicKeyPem = Effect.fn(
  "AksaraContractsTest.generateRsaPublicKeyPem"
)(function* () {
  const pair = yield* Effect.promise(() =>
    globalThis.crypto.subtle.generateKey(
      {
        hash: "SHA-256",
        modulusLength: 2048,
        name: "RSASSA-PKCS1-v1_5",
        publicExponent: Uint8Array.of(1, 0, 1),
      },
      true,
      ["sign", "verify"]
    )
  );
  const der = yield* Effect.promise(() =>
    globalThis.crypto.subtle.exportKey("spki", pair.publicKey)
  );
  return `-----BEGIN PUBLIC KEY-----\n${Base64.encode(new Uint8Array(der))}\n-----END PUBLIC KEY-----\n`;
});
