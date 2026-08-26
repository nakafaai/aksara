// @vitest-environment node

import { Buffer } from "node:buffer";
import { generateKeyPairSync, sign } from "node:crypto";
import { describe, expect, it } from "@nakafa/testing/effect";
import { Effect } from "effect";
import { vi } from "vitest";
import { Ed25519SignatureSchema, SigningKeyIdSchema } from "#contracts/ids";
import {
  ContentVerificationKeyResolver,
  SigningKeyNotFoundError,
} from "#contracts/signature/spec";
import { verifyEd25519Signature } from "#contracts/signature/verify";

const keyId = SigningKeyIdSchema.make("test-signing-key");
const message = "nakafa.aksara.signature.test";
const makeSigningFixture = Effect.sync(() => {
  const keys = generateKeyPairSync("ed25519");
  const publicKey = keys.publicKey
    .export({ format: "pem", type: "spki" })
    .toString();
  const signature = Ed25519SignatureSchema.make(
    sign(null, Buffer.from(message, "utf8"), keys.privateKey).toString(
      "base64url"
    )
  );

  return { keys, publicKey, signature };
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
  failure: TypeError
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
      const privateKey = fixture.keys.privateKey
        .export({ format: "pem", type: "pkcs8" })
        .toString();
      const resolver = ContentVerificationKeyResolver.of({
        resolve: () => Effect.succeed(privateKey),
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
          new TypeError("injected key import failure")
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
      expect(JSON.stringify(error)).not.toContain("PUBLIC KEY");
    })
  );

  it.effect("rejects non-Ed25519 keys and altered messages", () =>
    Effect.gen(function* () {
      const fixture = yield* makeSigningFixture;
      const rsaKey = yield* Effect.sync(() =>
        generateKeyPairSync("rsa", { modulusLength: 2048 })
          .publicKey.export({ format: "pem", type: "spki" })
          .toString()
      );
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
          new TypeError("injected signature check failure")
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
