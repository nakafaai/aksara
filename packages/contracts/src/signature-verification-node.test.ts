// @vitest-environment node

import { Buffer } from "node:buffer";
import { generateKeyPairSync, sign } from "node:crypto";
import { Effect } from "effect";
import { describe, expect, it } from "vitest";
import { Ed25519SignatureSchema, SigningKeyIdSchema } from "./ids.js";
import {
  ContentVerificationKeyResolver,
  SigningKeyNotFoundError,
} from "./signature-verification.js";
import { verifyEd25519Signature } from "./signature-verification-node.js";

const keyId = SigningKeyIdSchema.make("content-2026-01");
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
});
