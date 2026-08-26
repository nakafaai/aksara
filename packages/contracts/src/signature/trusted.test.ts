import { createPublicKey, generateKeyPairSync } from "node:crypto";
import { describe, expect, it } from "@effect/vitest";
import { Effect } from "effect";
import { SigningKeyIdSchema } from "#contracts/ids";
import {
  ACTIVE_SIGNING_KEY_ID,
  makeTrustedKeyResolver,
  TRUSTED_CONTENT_KEYS,
  TrustedKeySchema,
} from "#contracts/signature/trusted";

const oldKeyId = SigningKeyIdSchema.make("content-2026-01");
const currentPublicKey =
  "-----BEGIN PUBLIC KEY-----\nMCowBQYDK2VwAyEADaLoLeK2jGt3Jav3xpfXU5BNWYOo086miCmkV8FCmsE=\n-----END PUBLIC KEY-----\n";
const makeRetainedKey = Effect.sync(() => {
  const publicKeyPem = generateKeyPairSync("ed25519")
    .publicKey.export({ format: "pem", type: "spki" })
    .toString();

  return {
    entry: TrustedKeySchema.make({ keyId: oldKeyId, publicKeyPem }),
    publicKeyPem,
  };
});

describe("trusted content keys", () => {
  it("contains the exact first production public key", () => {
    expect(TRUSTED_CONTENT_KEYS).toEqual([
      {
        keyId: "content-2026-07-23",
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

  it.effect("resolves both current and retained rotation keys", () =>
    Effect.gen(function* () {
      const retained = yield* makeRetainedKey;
      const resolver = makeTrustedKeyResolver([
        ...TRUSTED_CONTENT_KEYS,
        retained.entry,
      ]);

      const resolved = yield* Effect.all([
        resolver.resolve(ACTIVE_SIGNING_KEY_ID),
        resolver.resolve(oldKeyId),
      ]);

      expect(resolved).toEqual([currentPublicKey, retained.publicKeyPem]);
    })
  );

  it.effect("fails closed for unknown and duplicate identities", () =>
    Effect.gen(function* () {
      const missingId = SigningKeyIdSchema.make("content-missing");
      const resolver = makeTrustedKeyResolver(TRUSTED_CONTENT_KEYS);
      const duplicate = makeTrustedKeyResolver([
        ...TRUSTED_CONTENT_KEYS,
        ...TRUSTED_CONTENT_KEYS,
      ]);

      const failures = yield* Effect.all([
        resolver.resolve(missingId).pipe(Effect.flip),
        duplicate.resolve(ACTIVE_SIGNING_KEY_ID).pipe(Effect.flip),
      ]);

      expect(failures).toMatchObject([
        { _tag: "SigningKeyNotFoundError", keyId: missingId },
        { _tag: "SigningKeyResolutionError", keyId: ACTIVE_SIGNING_KEY_ID },
      ]);
    })
  );

  it.effect("does not observe caller mutations after construction", () =>
    Effect.gen(function* () {
      const retained = yield* makeRetainedKey;
      const entries = [...TRUSTED_CONTENT_KEYS];
      const resolver = makeTrustedKeyResolver(entries);
      entries.push(retained.entry);

      const failure = yield* resolver.resolve(oldKeyId).pipe(Effect.flip);

      expect(failure).toMatchObject({ _tag: "SigningKeyNotFoundError" });
    })
  );
});
