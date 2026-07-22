import { generateKeyPairSync } from "node:crypto";
import { SigningKeyIdSchema } from "@nakafa/aksara-contracts/ids";
import { ContentVerificationKeyResolver } from "@nakafa/aksara-contracts/signature/spec";
import {
  ACTIVE_SIGNING_KEY_ID,
  makeTrustedKeyResolver,
  TRUSTED_CONTENT_KEYS,
  TrustedKeySchema,
} from "@nakafa/aksara-contracts/signature/trusted";
import { Effect } from "effect";
import { describe, expect, it } from "vitest";
import { verifySigningKey } from "#cli/keys";

const rotatedKeyId = SigningKeyIdSchema.make("content-2027-01");
const rotatedPublicKey = generateKeyPairSync("ed25519")
  .publicKey.export({ format: "pem", type: "spki" })
  .toString();
const rotatedEntry = TrustedKeySchema.make({
  keyId: rotatedKeyId,
  publicKeyPem: rotatedPublicKey,
});

/** Runs signer verification with one explicit code-owned registry. */
function verify(
  input: Parameters<typeof verifySigningKey>[0],
  entries = TRUSTED_CONTENT_KEYS
) {
  return Effect.runPromise(
    verifySigningKey(input).pipe(
      Effect.provideService(
        ContentVerificationKeyResolver,
        makeTrustedKeyResolver(entries)
      )
    )
  );
}

/** Returns the expected typed signer verification failure. */
function reject(
  input: Parameters<typeof verifySigningKey>[0],
  entries = TRUSTED_CONTENT_KEYS
) {
  return Effect.runPromise(
    verifySigningKey(input).pipe(
      Effect.provideService(
        ContentVerificationKeyResolver,
        makeTrustedKeyResolver(entries)
      ),
      Effect.flip
    )
  );
}

describe("production signing key", () => {
  it("accepts the exact active key and derived public SPKI", async () => {
    const resolver = makeTrustedKeyResolver(TRUSTED_CONTENT_KEYS);
    const derivedPublicKeyPem = await Effect.runPromise(
      resolver.resolve(ACTIVE_SIGNING_KEY_ID)
    );

    await expect(
      verify({
        activeKeyId: ACTIVE_SIGNING_KEY_ID,
        derivedPublicKeyPem,
        keyId: ACTIVE_SIGNING_KEY_ID,
      })
    ).resolves.toBeUndefined();
  });

  it("rejects an exact key ID with a different derived SPKI", async () => {
    await expect(
      reject({
        activeKeyId: ACTIVE_SIGNING_KEY_ID,
        derivedPublicKeyPem: rotatedPublicKey,
        keyId: ACTIVE_SIGNING_KEY_ID,
      })
    ).resolves.toMatchObject({ _tag: "SigningKeyMismatchError" });
  });

  it("keeps a retained rotation key available only for verification", async () => {
    await expect(
      reject(
        {
          activeKeyId: ACTIVE_SIGNING_KEY_ID,
          derivedPublicKeyPem: rotatedPublicKey,
          keyId: rotatedKeyId,
        },
        [...TRUSTED_CONTENT_KEYS, rotatedEntry]
      )
    ).resolves.toMatchObject({ _tag: "SigningKeyInactiveError" });
  });

  it("rejects an active identity missing from the trusted registry", async () => {
    await expect(
      reject(
        {
          activeKeyId: ACTIVE_SIGNING_KEY_ID,
          derivedPublicKeyPem: rotatedPublicKey,
          keyId: ACTIVE_SIGNING_KEY_ID,
        },
        []
      )
    ).resolves.toMatchObject({ _tag: "SigningKeyNotFoundError" });
  });
});
