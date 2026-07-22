import {
  type SigningKeyId,
  SigningKeyIdSchema,
} from "@nakafa/aksara-contracts/ids";
import { ContentVerificationKeyResolver } from "@nakafa/aksara-contracts/signature/spec";
import { Effect, Schema } from "effect";

/** A retained verification key is not authorized to sign a new release. */
export class SigningKeyInactiveError extends Schema.TaggedError<SigningKeyInactiveError>()(
  "SigningKeyInactiveError",
  { keyId: SigningKeyIdSchema }
) {}

/** The configured private key does not match its code-owned public SPKI. */
export class SigningKeyMismatchError extends Schema.TaggedError<SigningKeyMismatchError>()(
  "SigningKeyMismatchError",
  { keyId: SigningKeyIdSchema }
) {}

/**
 * Proves the configured signer is active and matches its retained public key.
 * This check must complete before the CLI creates a publication target.
 */
export const verifySigningKey = Effect.fn("AksaraCli.verifySigningKey")(
  function* (input: {
    readonly activeKeyId: SigningKeyId;
    readonly derivedPublicKeyPem: string;
    readonly keyId: SigningKeyId;
  }) {
    if (input.keyId !== input.activeKeyId) {
      return yield* new SigningKeyInactiveError({ keyId: input.keyId });
    }
    const resolver = yield* ContentVerificationKeyResolver;
    const registeredPublicKeyPem = yield* resolver.resolve(input.keyId);
    if (registeredPublicKeyPem !== input.derivedPublicKeyPem) {
      return yield* new SigningKeyMismatchError({ keyId: input.keyId });
    }
  }
);
