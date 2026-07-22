import { Effect, Schema } from "effect";
import { SigningKeyIdSchema } from "#contracts/ids";
import {
  ContentVerificationKeyResolver,
  SigningKeyNotFoundError,
  SigningKeyResolutionError,
} from "#contracts/signature/spec";

/** One code-reviewed Ed25519 public key retained for release verification. */
export const TrustedKeySchema = Schema.Struct({
  keyId: SigningKeyIdSchema,
  publicKeyPem: Schema.NonEmptyString,
});
export type TrustedKey = typeof TrustedKeySchema.Type;

const ACTIVE_CONTENT_KEY = Object.freeze(
  TrustedKeySchema.make({
    keyId: SigningKeyIdSchema.make("content-2026-07"),
    publicKeyPem:
      "-----BEGIN PUBLIC KEY-----\nMCowBQYDK2VwAyEAfCo8fdr8VK1t3LoimeUpsXAYnjgRZwYQV761+jRPidQ=\n-----END PUBLIC KEY-----\n",
  })
);

/** Only this reviewed identity may sign newly published content. */
export const ACTIVE_SIGNING_KEY_ID = ACTIVE_CONTENT_KEY.keyId;

/** Production keys retained while signed content may still reference them. */
export const TRUSTED_CONTENT_KEYS = Object.freeze([ACTIVE_CONTENT_KEY]);

/** Builds an immutable exact-ID resolver from code-owned retained entries. */
export function makeTrustedKeyResolver(entries: readonly TrustedKey[]) {
  const retained = entries.map((entry) => ({ ...entry }));
  return ContentVerificationKeyResolver.of({
    resolve: (keyId) => {
      const [match, ...duplicates] = retained.filter(
        (entry) => entry.keyId === keyId
      );
      if (match === undefined) {
        return Effect.fail(new SigningKeyNotFoundError({ keyId }));
      }
      if (duplicates.length > 0) {
        return Effect.fail(new SigningKeyResolutionError({ keyId }));
      }
      return Effect.succeed(match.publicKeyPem);
    },
  });
}
