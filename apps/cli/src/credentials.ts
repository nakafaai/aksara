import { createHash, generateKeyPairSync, randomBytes } from "node:crypto";
import { SigningKeyIdSchema } from "@nakafa/aksara-contracts/ids";
import { PreviewRendererSecretSchema } from "@nakafa/aksara-contracts/preview/auth";
import { makeEd25519PublicationSigner } from "@nakafa/aksara-publisher/signing/service";
import { Effect, Redacted, Schema } from "effect";

const RendererCredentialsSchema = Schema.Struct({
  secret: Schema.Redacted(PreviewRendererSecretSchema),
  token: Schema.Redacted(Schema.String),
});

/** Independent bearer and HMAC values for one local renderer process. */
export type RendererCredentials = typeof RendererCredentialsSchema.Type;

/** Local Ed25519 key or bearer-token generation failed before serving. */
export class PreviewCredentialError extends Schema.TaggedError<PreviewCredentialError>()(
  "PreviewCredentialError",
  { stage: Schema.Literals(["generate", "signer"]) }
) {}

/** Generates one process-local signer and independent preview credentials. */
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
      const renderer: RendererCredentials = {
        secret: Redacted.make(
          PreviewRendererSecretSchema.make(
            randomBytes(32).toString("base64url")
          )
        ),
        token: Redacted.make(randomBytes(32).toString("base64url")),
      };
      return {
        contentRuntimeToken: Redacted.make(
          randomBytes(32).toString("base64url")
        ),
        internalContentToken: Redacted.make(
          randomBytes(32).toString("base64url")
        ),
        keyId: SigningKeyIdSchema.make(`local-${digest.slice(0, 24)}`),
        privateKeyPem,
        providerToken: Redacted.make(randomBytes(32).toString("base64url")),
        publicKeyPem,
        renderer,
      };
    },
  });
  const signer = yield* makeEd25519PublicationSigner(generated).pipe(
    Effect.mapError(() => new PreviewCredentialError({ stage: "signer" }))
  );
  return {
    contentRuntimeToken: generated.contentRuntimeToken,
    internalContentToken: generated.internalContentToken,
    keyId: generated.keyId,
    providerToken: generated.providerToken,
    publicKeyPem: generated.publicKeyPem,
    renderer: generated.renderer,
    signer,
  };
});

/** Ephemeral authentication and signing values scoped to one preview process. */
export type PreviewCredentials = Readonly<
  Effect.Success<ReturnType<typeof makePreviewCredentials>>
>;
