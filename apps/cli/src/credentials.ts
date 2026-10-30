import { hashText } from "@nakafa/aksara-contracts/hash/text";
import { SigningKeyIdSchema } from "@nakafa/aksara-contracts/ids";
import { PreviewRendererSecretSchema } from "@nakafa/aksara-contracts/preview/auth";
import { generateEd25519KeyPem } from "@nakafa/aksara-contracts/signature/key";
import { makeEd25519PublicationSigner } from "@nakafa/aksara-publisher/signing/service";
import { Effect, Redacted, Schema } from "effect";
import { SecureRandom } from "effect/crypto";
import { Base64Url } from "effect/encoding";

const RendererCredentialsSchema = Schema.Struct({
  secret: Schema.Redacted(PreviewRendererSecretSchema),
  token: Schema.Redacted(Schema.String),
});

/** Independent bearer and HMAC values for one local renderer process. */
export type RendererCredentials = typeof RendererCredentialsSchema.Type;

/** Local Ed25519 key or bearer-token generation failed before serving. */
export class PreviewCredentialError extends Schema.TaggedError<
  PreviewCredentialError,
  { readonly brand: unique symbol }
>()("PreviewCredentialError", {
  stage: Schema.Literals(["generate", "signer"]),
}) {}

/** Creates one unpredictable 32-byte token in unpadded base64url form. */
const randomToken = Effect.fn("AksaraCli.randomToken")(function* () {
  const random = yield* SecureRandom.SecureRandom;
  return Base64Url.encode(yield* random.randomBytes(32));
}, Effect.provide(SecureRandom.layerWebCrypto));

/** Generates one process-local signer and independent preview credentials. */
export const makePreviewCredentials = Effect.fn(
  "AksaraCli.makePreviewCredentials"
)(function* () {
  const { privateKeyPem, publicKeyPem } = yield* generateEd25519KeyPem().pipe(
    Effect.mapError(() => new PreviewCredentialError({ stage: "generate" }))
  );
  const digest = yield* hashText(publicKeyPem);
  const renderer: RendererCredentials = {
    secret: Redacted.make(
      PreviewRendererSecretSchema.make(yield* randomToken())
    ),
    token: Redacted.make(yield* randomToken()),
  };
  const generated = {
    contentReadToken: Redacted.make(yield* randomToken()),
    internalContentToken: Redacted.make(yield* randomToken()),
    keyId: SigningKeyIdSchema.make(
      `local-${digest.slice("sha256:".length, "sha256:".length + 24)}`
    ),
    privateKeyPem,
    providerToken: Redacted.make(yield* randomToken()),
    publicKeyPem,
    renderer,
  };
  const signer = yield* makeEd25519PublicationSigner(generated).pipe(
    Effect.mapError(() => new PreviewCredentialError({ stage: "signer" }))
  );
  return {
    contentReadToken: generated.contentReadToken,
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
