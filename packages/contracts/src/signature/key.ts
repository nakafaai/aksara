import { Effect, Layer, Schema } from "effect";
import { KeyFormat, SecureRandom, Signature } from "effect/crypto";
import { Base64Url } from "effect/encoding";
import { Ed25519SignatureSchema } from "#contracts/ids";

const PRIVATE_KEY_HEADER = "-----BEGIN PRIVATE KEY-----\n";
/** PKCS#8 PEM, the form a private signing key is stored and read in. */
const PRIVATE_KEY_PEM = KeyFormat.pem(KeyFormat.pkcs8);
/** SubjectPublicKeyInfo PEM, the form a trusted public key is published in. */
const PUBLIC_KEY_PEM = KeyFormat.pem(KeyFormat.spki);

/**
 * Ed25519 on Web Crypto, with Web Crypto's random source for new seeds. Every
 * runtime that Aksara contracts run in has `crypto.subtle`, so the layer is
 * provided here and callers need no runtime layer.
 */
const SignatureLayer = Signature.layerWebCrypto.pipe(
  Layer.provide(SecureRandom.layerWebCrypto)
);

/** An Ed25519 key could not be generated, imported from PEM, derived as a public key, or used to sign. */
export class Ed25519KeyError extends Schema.TaggedError<
  Ed25519KeyError,
  { readonly brand: unique symbol }
>()("Ed25519KeyError", {
  stage: Schema.Literals(["derive", "import", "sign"]),
}) {}

/**
 * Decodes one unencrypted Ed25519 PKCS#8 PEM private key. The text must start
 * at its BEGIN line, as the production key check requires.
 */
function decodePrivateKey(privateKeyPem: string) {
  if (!privateKeyPem.replaceAll("\r\n", "\n").startsWith(PRIVATE_KEY_HEADER)) {
    return Effect.fail(new Ed25519KeyError({ stage: "import" }));
  }
  return KeyFormat.decodePrivate(
    PRIVATE_KEY_PEM,
    Signature.ed25519,
    privateKeyPem
  ).pipe(Effect.mapError(() => new Ed25519KeyError({ stage: "import" })));
}

/** Derives the SPKI PEM public key of one Ed25519 PKCS#8 private key PEM. */
export const ed25519PublicKeyPem = Effect.fn(
  "AksaraContracts.ed25519PublicKeyPem"
)(function* (privateKeyPem: string) {
  const privateKey = yield* decodePrivateKey(privateKeyPem);
  const signature = yield* Signature.Signature;
  return yield* signature.publicKeyOf(privateKey).pipe(
    Effect.flatMap((publicKey) => KeyFormat.encode(PUBLIC_KEY_PEM, publicKey)),
    Effect.mapError(() => new Ed25519KeyError({ stage: "derive" }))
  );
}, Effect.provide(SignatureLayer));

/** Generates one Ed25519 key pair as PKCS#8 and SPKI PEM text, from a random seed. */
export const generateEd25519KeyPem = Effect.fn(
  "AksaraContracts.generateEd25519KeyPem"
)(function* () {
  const signature = yield* Signature.Signature;
  return yield* signature.generateKeyPair(Signature.ed25519).pipe(
    Effect.flatMap(({ privateKey, publicKey }) =>
      Effect.all({
        privateKeyPem: KeyFormat.encode(PRIVATE_KEY_PEM, privateKey),
        publicKeyPem: KeyFormat.encode(PUBLIC_KEY_PEM, publicKey),
      })
    ),
    Effect.mapError(() => new Ed25519KeyError({ stage: "derive" }))
  );
}, Effect.provide(SignatureLayer));

/** Signs the UTF-8 bytes of one canonical message with an unencrypted Ed25519 PKCS#8 PEM private key, returning the unpadded base64url signature. */
export const signEd25519Message = Effect.fn(
  "AksaraContracts.signEd25519Message"
)(function* (privateKeyPem: string, message: string) {
  const privateKey = yield* decodePrivateKey(privateKeyPem);
  const signature = yield* Signature.Signature;
  const bytes = yield* signature
    .sign(privateKey, new TextEncoder().encode(message))
    .pipe(Effect.mapError(() => new Ed25519KeyError({ stage: "sign" })));
  return Ed25519SignatureSchema.make(Base64Url.encode(bytes));
}, Effect.provide(SignatureLayer));
