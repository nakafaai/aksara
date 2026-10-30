// @vitest-environment node

import { describe, expect, it } from "@effect/vitest";
import { Effect } from "effect";
import { Ed25519SignatureSchema, SigningKeyIdSchema } from "#contracts/ids";
import {
  generateEd25519KeyPem,
  signEd25519Message,
} from "#contracts/signature/key";
import {
  ContentVerificationKeyResolver,
  SigningKeyNotFoundError,
} from "#contracts/signature/spec";
import { verifyEd25519Signature } from "#contracts/signature/verify";
import {
  generateRsaPublicKeyPem,
  verifyEd25519Pem,
} from "#contracts/test/signature";
import { encodeJsonText } from "#contracts/text/json";

const keyId = SigningKeyIdSchema.make("test-signing-key");
const message = "nakafa.aksara.signature.test";
const makeSigningFixture = Effect.gen(function* () {
  const keys = yield* generateEd25519KeyPem();
  const signature = yield* signEd25519Message(keys.privateKeyPem, message);

  return { keys, publicKey: keys.publicKeyPem, signature };
});

/** Builds signature verification with an injected key resolver. */
function verify(
  resolver: typeof ContentVerificationKeyResolver.Service,
  signature: typeof Ed25519SignatureSchema.Type,
  signedMessage = message
) {
  return verifyEd25519Signature({
    keyId,
    message: signedMessage,
    signature,
    subject: "artifact",
  }).pipe(Effect.provideService(ContentVerificationKeyResolver, resolver));
}

/** Builds signature verification and exposes its expected typed failure. */
function reject(
  resolver: typeof ContentVerificationKeyResolver.Service,
  signature: typeof Ed25519SignatureSchema.Type,
  signedMessage = message
) {
  return verify(resolver, signature, signedMessage).pipe(Effect.flip);
}

/** Installs one scoped Web Crypto rejection spy. */
function rejectCryptoCall<T extends "importKey" | "verify">(
  method: T,
  failure: DOMException
) {
  return Effect.acquireRelease(
    Effect.sync(() =>
      vi.spyOn(crypto.subtle, method).mockRejectedValueOnce(failure)
    ),
    (mock) => Effect.sync(() => mock.mockRestore())
  );
}

describe("verifyEd25519Signature", () => {
  it.effect("accepts an exact Ed25519 signature", () =>
    Effect.gen(function* () {
      const fixture = yield* makeSigningFixture;
      const resolver = ContentVerificationKeyResolver.of({
        resolve: () => Effect.succeed(fixture.publicKey),
      });

      expect(yield* verify(resolver, fixture.signature)).toBeUndefined();
    })
  );

  it.effect("accepts a CRLF-formatted Ed25519 public key", () =>
    Effect.gen(function* () {
      const fixture = yield* makeSigningFixture;
      const resolver = ContentVerificationKeyResolver.of({
        resolve: () =>
          Effect.succeed(fixture.publicKey.replaceAll("\n", "\r\n")),
      });

      expect(yield* verify(resolver, fixture.signature)).toBeUndefined();
    })
  );

  it.effect("rejects private key material at the public-key boundary", () =>
    Effect.gen(function* () {
      const fixture = yield* makeSigningFixture;
      const resolver = ContentVerificationKeyResolver.of({
        resolve: () => Effect.succeed(fixture.keys.privateKeyPem),
      });

      expect(yield* reject(resolver, fixture.signature)).toMatchObject({
        _tag: "PublicKeyParseError",
      });
    })
  );

  it.effect("maps malformed public-key PEM to a typed parse failure", () =>
    Effect.gen(function* () {
      const fixture = yield* makeSigningFixture;
      const resolver = ContentVerificationKeyResolver.of({
        resolve: () =>
          Effect.succeed(
            "-----BEGIN PUBLIC KEY-----\ninvalid\n-----END PUBLIC KEY-----\n"
          ),
      });

      expect(yield* reject(resolver, fixture.signature)).toMatchObject({
        _tag: "PublicKeyParseError",
      });
    })
  );

  it.effect(
    "maps Web Crypto key import failures to a typed parse failure",
    () =>
      Effect.gen(function* () {
        const fixture = yield* makeSigningFixture;
        const resolver = ContentVerificationKeyResolver.of({
          resolve: () => Effect.succeed(fixture.publicKey),
        });
        yield* rejectCryptoCall(
          "importKey",
          new DOMException("injected key import failure", "DataError")
        );

        const error = yield* reject(resolver, fixture.signature);

        expect(error).toMatchObject({ _tag: "PublicKeyParseError" });
      })
  );

  it.effect("rejects unknown keys without exposing key material", () =>
    Effect.gen(function* () {
      const fixture = yield* makeSigningFixture;
      const resolver = ContentVerificationKeyResolver.of({
        resolve: (requestedKeyId) =>
          Effect.fail(new SigningKeyNotFoundError({ keyId: requestedKeyId })),
      });
      const error = yield* reject(resolver, fixture.signature);

      expect(error._tag).toBe("SigningKeyNotFoundError");
      expect(encodeJsonText(error)).not.toContain("PUBLIC KEY");
    })
  );

  it.effect("rejects non-Ed25519 keys and altered messages", () =>
    Effect.gen(function* () {
      const fixture = yield* makeSigningFixture;
      const rsaKey = yield* generateRsaPublicKeyPem();
      const rsaResolver = ContentVerificationKeyResolver.of({
        resolve: () => Effect.succeed(rsaKey),
      });
      const trustedResolver = ContentVerificationKeyResolver.of({
        resolve: () => Effect.succeed(fixture.publicKey),
      });
      const [keyError, signatureError] = yield* Effect.all([
        reject(rsaResolver, fixture.signature),
        reject(trustedResolver, fixture.signature, `${message}-tampered`),
      ]);

      expect(keyError).toMatchObject({ _tag: "PublicKeyTypeError" });
      expect(signatureError).toMatchObject({ _tag: "SignatureInvalidError" });
    })
  );

  it.effect(
    "maps crypto verification failures without exposing key material",
    () =>
      Effect.gen(function* () {
        const fixture = yield* makeSigningFixture;
        const resolver = ContentVerificationKeyResolver.of({
          resolve: () => Effect.succeed(fixture.publicKey),
        });
        yield* rejectCryptoCall(
          "verify",
          new DOMException(
            "injected signature check failure",
            "NotSupportedError"
          )
        );
        const error = yield* reject(
          resolver,
          fixture.signature,
          "signature-check-failure"
        );

        expect(error).toMatchObject({
          _tag: "SignatureCheckError",
          keyId,
          subject: "artifact",
        });
      })
  );
});

describe("pinned Ed25519 signature bytes", () => {
  const pinnedKeyId = SigningKeyIdSchema.make("pinned-signature-key");
  /** Public SPKI of the test-only key that signed the pinned message below. */
  const pinnedPublicKeyPem =
    "-----BEGIN PUBLIC KEY-----\nMCowBQYDK2VwAyEA+phFviMBGKDmxNNkaxtYDEJvBjGhft40kPYJ2qiN9ew=\n-----END PUBLIC KEY-----\n";
  // Record again: create a key, sign the same input, and replace the public key and signature literals.
  const pinnedSignature =
    "U1p-A8M6WUnT1Pfa_H4fjiPI3lhRQJXldtUys2S3Ll0HPHRUfNfWihSx3xttfN4TOYcwVPWCtiseL2G6CHj6Ag";
  const pinnedResolver = ContentVerificationKeyResolver.of({
    /** Resolves only the fixed public key that signed the pinned message. */
    resolve: (requestedKeyId) =>
      requestedKeyId === pinnedKeyId
        ? Effect.succeed(pinnedPublicKeyPem)
        : Effect.fail(new SigningKeyNotFoundError({ keyId: requestedKeyId })),
  });

  /** Verifies one pinned signature over the exact supplied bytes. */
  function verifyPinned(signedMessage: string, signature: string) {
    return verifyEd25519Signature({
      keyId: pinnedKeyId,
      message: signedMessage,
      signature: Ed25519SignatureSchema.make(signature),
      subject: "artifact",
    }).pipe(
      Effect.provideService(ContentVerificationKeyResolver, pinnedResolver)
    );
  }

  it.effect("accepts the pinned signature over exact non-ASCII bytes", () =>
    Effect.gen(function* () {
      expect(
        yield* verifyPinned(
          "nakafa.aksara.signature.pinned\nPecahan Ñandú café 😀",
          pinnedSignature
        )
      ).toBeUndefined();
    })
  );

  it.effect(
    "rejects the pinned signature over one changed message character",
    () =>
      Effect.gen(function* () {
        const error = yield* verifyPinned(
          "nakafa.aksara.signature.pinned\nPecahan Ñandú café 😁",
          pinnedSignature
        ).pipe(Effect.flip);

        expect(error._tag).toBe("SignatureInvalidError");
      })
  );

  it.effect("rejects a changed pinned signature character", () =>
    Effect.gen(function* () {
      const error = yield* verifyPinned(
        "nakafa.aksara.signature.pinned\nPecahan Ñandú café 😀",
        "A1p-A8M6WUnT1Pfa_H4fjiPI3lhRQJXldtUys2S3Ll0HPHRUfNfWihSx3xttfN4TOYcwVPWCtiseL2G6CHj6Ag"
      ).pipe(Effect.flip);

      expect(error._tag).toBe("SignatureInvalidError");
    })
  );

  it.effect(
    "verifies the pinned signature over exact bytes and rejects one changed byte",
    () =>
      Effect.gen(function* () {
        const pinnedMessage =
          "nakafa.aksara.signature.pinned\nPecahan Ñandú café 😀";
        expect(
          yield* verifyEd25519Pem(
            pinnedPublicKeyPem,
            pinnedMessage,
            pinnedSignature
          )
        ).toBe(true);
        expect(
          yield* verifyEd25519Pem(
            pinnedPublicKeyPem,
            pinnedMessage.replace("nakafa", "makafa"),
            pinnedSignature
          )
        ).toBe(false);
      })
  );
});
