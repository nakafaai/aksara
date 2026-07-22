// @vitest-environment node

import { Buffer } from "node:buffer";
import { generateKeyPairSync, type KeyLike, sign } from "node:crypto";
import { Effect } from "effect";
import { describe, expect, it, vi } from "vitest";
import { Ed25519SignatureSchema, SigningKeyIdSchema } from "#contracts/ids";
import {
  ContentVerificationKeyResolver,
  SigningKeyNotFoundError,
} from "#contracts/signature/spec";
import { verifyEd25519Signature } from "#contracts/signature/verify";

vi.mock("node:crypto", async (importOriginal) => {
  const crypto = await importOriginal<typeof import("node:crypto")>();
  return {
    ...crypto,
    /** Injects one deterministic Ed25519 verification failure. */
    verify(
      algorithm: null,
      data: NodeJS.ArrayBufferView,
      key: KeyLike,
      signatureBytes: NodeJS.ArrayBufferView
    ) {
      if (String(data) === "signature-check-failure") {
        throw new TypeError("injected signature check failure");
      }
      return crypto.verify(algorithm, data, key, signatureBytes);
    },
  };
});

const keyId = SigningKeyIdSchema.make("test-signing-key");
const keys = generateKeyPairSync("ed25519");
const publicKey = keys.publicKey
  .export({ format: "pem", type: "spki" })
  .toString();
const message = "nakafa.aksara.signature.test.v1";
const signature = Ed25519SignatureSchema.make(
  sign(null, Buffer.from(message, "utf8"), keys.privateKey).toString(
    "base64url"
  )
);

/** Runs signature verification with an injected key resolver. */
function verify(
  resolver: typeof ContentVerificationKeyResolver.Service,
  signedMessage = message,
  signedValue = signature
) {
  return Effect.runPromise(
    verifyEd25519Signature({
      keyId,
      message: signedMessage,
      signature: signedValue,
      subject: "artifact",
    }).pipe(Effect.provideService(ContentVerificationKeyResolver, resolver))
  );
}

/** Runs signature verification and returns its expected typed failure. */
function reject(
  resolver: typeof ContentVerificationKeyResolver.Service,
  signedMessage = message
) {
  return Effect.runPromise(
    verifyEd25519Signature({
      keyId,
      message: signedMessage,
      signature,
      subject: "artifact",
    }).pipe(
      Effect.provideService(ContentVerificationKeyResolver, resolver),
      Effect.flip
    )
  );
}

describe("verifyEd25519Signature", () => {
  it("accepts an exact Ed25519 signature", async () => {
    const resolver = ContentVerificationKeyResolver.of({
      resolve: () => Effect.succeed(publicKey),
    });

    await expect(verify(resolver)).resolves.toBeUndefined();
  });

  it("accepts a CRLF-formatted Ed25519 public key", async () => {
    const resolver = ContentVerificationKeyResolver.of({
      resolve: () => Effect.succeed(publicKey.replaceAll("\n", "\r\n")),
    });

    await expect(verify(resolver)).resolves.toBeUndefined();
  });

  it("rejects private key material at the public-key boundary", async () => {
    const privateKey = keys.privateKey
      .export({ format: "pem", type: "pkcs8" })
      .toString();
    const resolver = ContentVerificationKeyResolver.of({
      resolve: () => Effect.succeed(privateKey),
    });

    await expect(reject(resolver)).resolves.toMatchObject({
      _tag: "PublicKeyParseError",
    });
  });

  it("maps malformed public-key PEM to a typed parse failure", async () => {
    const resolver = ContentVerificationKeyResolver.of({
      resolve: () =>
        Effect.succeed(
          "-----BEGIN PUBLIC KEY-----\ninvalid\n-----END PUBLIC KEY-----\n"
        ),
    });

    await expect(reject(resolver)).resolves.toMatchObject({
      _tag: "PublicKeyParseError",
    });
  });

  it("rejects unknown keys without exposing key material", async () => {
    const resolver = ContentVerificationKeyResolver.of({
      resolve: (requestedKeyId) =>
        Effect.fail(new SigningKeyNotFoundError({ keyId: requestedKeyId })),
    });
    const error = await Effect.runPromise(
      verifyEd25519Signature({
        keyId,
        message,
        signature,
        subject: "artifact",
      }).pipe(
        Effect.provideService(ContentVerificationKeyResolver, resolver),
        Effect.flip
      )
    );

    expect(error._tag).toBe("SigningKeyNotFoundError");
    expect(JSON.stringify(error)).not.toContain("PUBLIC KEY");
  });

  it("rejects non-Ed25519 keys and altered messages", async () => {
    const rsaKey = generateKeyPairSync("rsa", { modulusLength: 2048 })
      .publicKey.export({ format: "pem", type: "spki" })
      .toString();
    const rsaResolver = ContentVerificationKeyResolver.of({
      resolve: () => Effect.succeed(rsaKey),
    });
    const trustedResolver = ContentVerificationKeyResolver.of({
      resolve: () => Effect.succeed(publicKey),
    });
    const [keyError, signatureError] = await Promise.all([
      reject(rsaResolver),
      reject(trustedResolver, `${message}-tampered`),
    ]);

    expect(keyError).toMatchObject({ _tag: "PublicKeyTypeError" });
    expect(signatureError).toMatchObject({ _tag: "SignatureInvalidError" });
  });

  it("maps crypto verification failures without exposing key material", async () => {
    const resolver = ContentVerificationKeyResolver.of({
      resolve: () => Effect.succeed(publicKey),
    });
    const error = await reject(resolver, "signature-check-failure");

    expect(error).toMatchObject({
      _tag: "SignatureCheckError",
      keyId,
      subject: "artifact",
    });
  });
});
