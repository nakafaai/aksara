import { createHash, generateKeyPairSync, randomBytes } from "node:crypto";
import { SigningKeyIdSchema } from "@nakafa/aksara-contracts/ids";
import {
  makeEd25519PublicationSigner,
  type PublicationSigner,
} from "@nakafa/aksara-publisher/signing";
import { Effect, Redacted, Schema } from "effect";

/** Ephemeral authentication and signing values scoped to one preview process. */
export interface PreviewCredentials {
  readonly keyId: typeof SigningKeyIdSchema.Type;
  readonly publicKeyPem: string;
  readonly signer: PublicationSigner;
  readonly token: Redacted.Redacted<string>;
}

/** Local Ed25519 key or bearer-token generation failed before serving. */
export class PreviewCredentialError extends Schema.TaggedError<PreviewCredentialError>()(
  "PreviewCredentialError",
  { stage: Schema.Literal("generate", "signer") }
) {}

/** Generates one process-local Ed25519 signer and unpredictable bearer token. */
export const makePreviewCredentials = Effect.fn(
  "AksaraCli.makePreviewCredentials"
)(function* () {
  const generated = yield* Effect.try({
    catch: () => new PreviewCredentialError({ stage: "generate" }),
    try: () => {
      const { privateKey, publicKey } = generateKeyPairSync("ed25519");
      const privateKeyPem = privateKey
        .export({
          format: "pem",
          type: "pkcs8",
        })
        .toString();
      const publicKeyPem = publicKey
        .export({ format: "pem", type: "spki" })
        .toString();
      const digest = createHash("sha256").update(publicKeyPem).digest("hex");
      return {
        keyId: SigningKeyIdSchema.make(`local-${digest.slice(0, 24)}`),
        privateKeyPem,
        publicKeyPem,
        token: Redacted.make(randomBytes(32).toString("base64url")),
      };
    },
  });
  const signer = yield* makeEd25519PublicationSigner(generated).pipe(
    Effect.mapError(() => new PreviewCredentialError({ stage: "signer" }))
  );
  return {
    keyId: generated.keyId,
    publicKeyPem: generated.publicKeyPem,
    signer,
    token: generated.token,
  } satisfies PreviewCredentials;
});
