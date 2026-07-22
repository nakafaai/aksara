import { createPublicKey, generateKeyPairSync } from "node:crypto";
import { Effect } from "effect";
import { describe, expect, it } from "vitest";
import { SigningKeyIdSchema } from "#contracts/ids";
import {
  ACTIVE_SIGNING_KEY_ID,
  makeTrustedKeyResolver,
  TRUSTED_CONTENT_KEYS,
  TrustedKeySchema,
} from "#contracts/signature/trusted";

const oldKeyId = SigningKeyIdSchema.make("content-2026-01");
const currentPublicKey =
  "-----BEGIN PUBLIC KEY-----\nMCowBQYDK2VwAyEAfCo8fdr8VK1t3LoimeUpsXAYnjgRZwYQV761+jRPidQ=\n-----END PUBLIC KEY-----\n";
const oldPublicKey = generateKeyPairSync("ed25519")
  .publicKey.export({ format: "pem", type: "spki" })
  .toString();
const oldEntry = TrustedKeySchema.make({
  keyId: oldKeyId,
  publicKeyPem: oldPublicKey,
});

describe("trusted content keys", () => {
  it("contains the exact first production public key", () => {
    expect(TRUSTED_CONTENT_KEYS).toEqual([
      {
        keyId: "content-2026-07",
        publicKeyPem: currentPublicKey,
      },
    ]);
    expect(
      TRUSTED_CONTENT_KEYS.every(
        ({ publicKeyPem }) =>
          createPublicKey(publicKeyPem).asymmetricKeyType === "ed25519"
      )
    ).toBe(true);
    expect(Object.isFrozen(TRUSTED_CONTENT_KEYS)).toBe(true);
    expect(Object.isFrozen(TRUSTED_CONTENT_KEYS[0])).toBe(true);
  });

  it("resolves both current and retained rotation keys", async () => {
    const resolver = makeTrustedKeyResolver([
      ...TRUSTED_CONTENT_KEYS,
      oldEntry,
    ]);

    await expect(
      Promise.all([
        Effect.runPromise(resolver.resolve(ACTIVE_SIGNING_KEY_ID)),
        Effect.runPromise(resolver.resolve(oldKeyId)),
      ])
    ).resolves.toEqual([currentPublicKey, oldPublicKey]);
  });

  it("fails closed for unknown and duplicate identities", async () => {
    const missingId = SigningKeyIdSchema.make("content-missing");
    const resolver = makeTrustedKeyResolver(TRUSTED_CONTENT_KEYS);
    const duplicate = makeTrustedKeyResolver([
      ...TRUSTED_CONTENT_KEYS,
      ...TRUSTED_CONTENT_KEYS,
    ]);

    await expect(
      Promise.all([
        Effect.runPromise(resolver.resolve(missingId).pipe(Effect.flip)),
        Effect.runPromise(
          duplicate.resolve(ACTIVE_SIGNING_KEY_ID).pipe(Effect.flip)
        ),
      ])
    ).resolves.toMatchObject([
      { _tag: "SigningKeyNotFoundError", keyId: missingId },
      { _tag: "SigningKeyResolutionError", keyId: ACTIVE_SIGNING_KEY_ID },
    ]);
  });

  it("does not observe caller mutations after construction", async () => {
    const entries = [...TRUSTED_CONTENT_KEYS];
    const resolver = makeTrustedKeyResolver(entries);
    entries.push(oldEntry);

    await expect(
      Effect.runPromise(resolver.resolve(oldKeyId).pipe(Effect.flip))
    ).resolves.toMatchObject({ _tag: "SigningKeyNotFoundError" });
  });
});
