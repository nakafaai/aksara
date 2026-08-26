import { generateKeyPairSync } from "node:crypto";
import { describe, expect, it } from "@effect/vitest";
import { SigningKeyIdSchema } from "@nakafa/aksara-contracts/ids";
import { ContentVerificationKeyResolver } from "@nakafa/aksara-contracts/signature/spec";
import {
  ACTIVE_SIGNING_KEY_ID,
  makeTrustedKeyResolver,
  TRUSTED_CONTENT_KEYS,
  TrustedKeySchema,
} from "@nakafa/aksara-contracts/signature/trusted";
import { Effect } from "effect";
import { verifySigningKey } from "#cli/keys";

/** Generates one lazy rotation fixture inside the Effect runtime. */
const makeRotatedKey = Effect.fn("test.keys.makeRotatedKey")(() =>
  Effect.sync(() => {
    const keyId = SigningKeyIdSchema.make("content-2027-01");
    const publicKeyPem = generateKeyPairSync("ed25519")
      .publicKey.export({ format: "pem", type: "spki" })
      .toString();

    return {
      entry: TrustedKeySchema.make({ keyId, publicKeyPem }),
      keyId,
      publicKeyPem,
    };
  })
);

/** Composes signer verification with one explicit code-owned registry. */
const verify = Effect.fn("test.keys.verify")(
  (
    input: Parameters<typeof verifySigningKey>[0],
    entries = TRUSTED_CONTENT_KEYS
  ) =>
    verifySigningKey(input).pipe(
      Effect.provideService(
        ContentVerificationKeyResolver,
        makeTrustedKeyResolver(entries)
      )
    )
);

/** Returns the expected typed signer verification failure. */
const reject = Effect.fn("test.keys.reject")(
  (
    input: Parameters<typeof verifySigningKey>[0],
    entries = TRUSTED_CONTENT_KEYS
  ) => verify(input, entries).pipe(Effect.flip)
);

describe("production signing key", () => {
  it.effect("accepts the exact active key and derived public SPKI", () =>
    Effect.gen(function* () {
      const resolver = makeTrustedKeyResolver(TRUSTED_CONTENT_KEYS);
      const derivedPublicKeyPem = yield* resolver.resolve(
        ACTIVE_SIGNING_KEY_ID
      );

      yield* verify({
        activeKeyId: ACTIVE_SIGNING_KEY_ID,
        derivedPublicKeyPem,
        keyId: ACTIVE_SIGNING_KEY_ID,
      });
    })
  );

  it.effect("rejects an exact key ID with a different derived SPKI", () =>
    Effect.gen(function* () {
      const rotatedKey = yield* makeRotatedKey();
      const error = yield* reject({
        activeKeyId: ACTIVE_SIGNING_KEY_ID,
        derivedPublicKeyPem: rotatedKey.publicKeyPem,
        keyId: ACTIVE_SIGNING_KEY_ID,
      });

      expect(error).toMatchObject({ _tag: "SigningKeyMismatchError" });
    })
  );

  it.effect(
    "keeps a retained rotation key available only for verification",
    () =>
      Effect.gen(function* () {
        const rotatedKey = yield* makeRotatedKey();
        const error = yield* reject(
          {
            activeKeyId: ACTIVE_SIGNING_KEY_ID,
            derivedPublicKeyPem: rotatedKey.publicKeyPem,
            keyId: rotatedKey.keyId,
          },
          [...TRUSTED_CONTENT_KEYS, rotatedKey.entry]
        );

        expect(error).toMatchObject({ _tag: "SigningKeyInactiveError" });
      })
  );

  it.effect(
    "rejects an active identity missing from the trusted registry",
    () =>
      Effect.gen(function* () {
        const rotatedKey = yield* makeRotatedKey();
        const error = yield* reject(
          {
            activeKeyId: ACTIVE_SIGNING_KEY_ID,
            derivedPublicKeyPem: rotatedKey.publicKeyPem,
            keyId: ACTIVE_SIGNING_KEY_ID,
          },
          []
        );

        expect(error).toMatchObject({ _tag: "SigningKeyNotFoundError" });
      })
  );
});
