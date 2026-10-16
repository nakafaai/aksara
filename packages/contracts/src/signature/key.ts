import { Effect, Schema } from "effect";
import { Base64, Base64Url } from "effect/encoding";

const PRIVATE_KEY_HEADER = "-----BEGIN PRIVATE KEY-----\n";
const PRIVATE_KEY_FOOTER = "-----END PRIVATE KEY-----";
const PUBLIC_KEY_HEADER = "-----BEGIN PUBLIC KEY-----\n";
const PUBLIC_KEY_FOOTER = "-----END PUBLIC KEY-----";
/** The DER header that wraps one 32-byte Ed25519 public key as SubjectPublicKeyInfo. */
const ED25519_SPKI_HEADER = Uint8Array.of(
  0x30,
  0x2a,
  0x30,
  0x05,
  0x06,
  0x03,
  0x2b,
  0x65,
  0x70,
  0x03,
  0x21,
  0x00
);
const ED25519_PUBLIC_KEY_BYTES = 32;
/** PEM bodies wrap base64 text at this many characters per line. */
const PEM_LINE_LENGTH = 64;

/** An Ed25519 key could not be imported from PEM, derived as a public key, or used to sign. */
export class Ed25519KeyError extends Schema.TaggedError<Ed25519KeyError>()(
  "Ed25519KeyError",
  { stage: Schema.Literals(["derive", "import", "sign"]) }
) {}

/** Decodes the DER bytes of one unencrypted PKCS#8 private key PEM. */
function decodePrivateKeyPem(privateKeyPem: string) {
  const pem = privateKeyPem.replaceAll("\r\n", "\n");
  const end = pem.trimEnd();
  if (
    !(pem.startsWith(PRIVATE_KEY_HEADER) && end.endsWith(PRIVATE_KEY_FOOTER))
  ) {
    return Effect.fail(new Ed25519KeyError({ stage: "import" }));
  }
  const body = end
    .slice(PRIVATE_KEY_HEADER.length, end.length - PRIVATE_KEY_FOOTER.length)
    .replaceAll("\n", "");
  return Effect.fromResult(Base64.decode(body)).pipe(
    Effect.mapError(() => new Ed25519KeyError({ stage: "import" }))
  );
}

/** Imports one Ed25519 PKCS#8 key through Web Crypto, extractable only when asked. */
function importPkcs8(der: Uint8Array, extractable: boolean) {
  return Effect.tryPromise({
    catch: () => new Ed25519KeyError({ stage: "import" }),
    try: () =>
      globalThis.crypto.subtle.importKey(
        "pkcs8",
        new Uint8Array(der),
        { name: "Ed25519" },
        extractable,
        ["sign"]
      ),
  });
}

/** Encodes DER bytes as PEM text with 64-character lines, the layout that Node writes. */
function encodePem(der: Uint8Array, header: string, footer: string) {
  const base64 = Base64.encode(der);
  let body = "";
  for (let offset = 0; offset < base64.length; offset += PEM_LINE_LENGTH) {
    body += `${base64.slice(offset, offset + PEM_LINE_LENGTH)}\n`;
  }
  return `${header}${body}${footer}\n`;
}

/** Imports one unencrypted Ed25519 PKCS#8 PEM private key as a non-extractable signing key. */
export const importEd25519PrivateKey = Effect.fn(
  "AksaraContracts.importEd25519PrivateKey"
)(function* (privateKeyPem: string) {
  const der = yield* decodePrivateKeyPem(privateKeyPem);
  return yield* importPkcs8(der, false);
});

/** A non-extractable Ed25519 key that Web Crypto signs with. */
export type Ed25519PrivateKey = Effect.Success<
  ReturnType<typeof importEd25519PrivateKey>
>;

/** Reads the 32 raw public-key bytes from the `x` member of an exported Ed25519 JSON Web Key. */
export const ed25519PublicKeyBytes = Effect.fn(
  "AksaraContracts.ed25519PublicKeyBytes"
)(function* (x: string | undefined) {
  const bytes = yield* Effect.fromResult(Base64Url.decode(x ?? "")).pipe(
    Effect.mapError(() => new Ed25519KeyError({ stage: "derive" }))
  );
  if (bytes.byteLength !== ED25519_PUBLIC_KEY_BYTES) {
    return yield* new Ed25519KeyError({ stage: "derive" });
  }
  return bytes;
});

/** Derives the SPKI PEM public key of one Ed25519 PKCS#8 private key PEM. */
export const ed25519PublicKeyPem = Effect.fn(
  "AksaraContracts.ed25519PublicKeyPem"
)(function* (privateKeyPem: string) {
  const der = yield* decodePrivateKeyPem(privateKeyPem);
  const key = yield* importPkcs8(der, true);
  const jwk = yield* Effect.tryPromise({
    catch: () => new Ed25519KeyError({ stage: "derive" }),
    try: () => globalThis.crypto.subtle.exportKey("jwk", key),
  });
  const publicKey = yield* ed25519PublicKeyBytes(jwk.x);
  const spki = new Uint8Array(
    ED25519_SPKI_HEADER.byteLength + ED25519_PUBLIC_KEY_BYTES
  );
  spki.set(ED25519_SPKI_HEADER);
  spki.set(publicKey, ED25519_SPKI_HEADER.byteLength);
  return encodePem(spki, PUBLIC_KEY_HEADER, PUBLIC_KEY_FOOTER);
});

/** Signs one exact message with an imported Ed25519 key, returning the raw 64-byte signature. */
export const signEd25519 = Effect.fn("AksaraContracts.signEd25519")(function* (
  privateKey: Ed25519PrivateKey,
  message: Uint8Array
) {
  const signature = yield* Effect.tryPromise({
    catch: () => new Ed25519KeyError({ stage: "sign" }),
    try: () =>
      globalThis.crypto.subtle.sign(
        "Ed25519",
        privateKey,
        new Uint8Array(message)
      ),
  });
  return new Uint8Array(signature);
});
