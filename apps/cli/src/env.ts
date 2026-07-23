import { createPrivateKey, createPublicKey } from "node:crypto";
import { SigningKeyIdSchema } from "@nakafa/aksara-contracts/ids";
import { Config, Effect, Option, Redacted, Schema } from "effect";

const PreviewEnvironmentSchema = Schema.Struct({
  nakafaAppDir: Schema.optional(Schema.NonEmptyTrimmedString),
});
export type PreviewEnvironment = typeof PreviewEnvironmentSchema.Type;

const PublicationVariableSchema = Schema.Literal(
  "AKSARA_PUBLICATION_ENDPOINT",
  "AKSARA_PUBLICATION_TOKEN"
);

const ProductionVariableSchema = Schema.Literal(
  ...PublicationVariableSchema.literals,
  "AKSARA_RENDERER_ENDPOINT",
  "AKSARA_RENDERER_TOKEN",
  "AKSARA_SIGNING_KEY_ID",
  "AKSARA_SIGNING_PRIVATE_KEY"
);
type ProductionVariable = typeof ProductionVariableSchema.Type;
const TOKEN_WHITESPACE = /\s/u;

/** Narrow target configuration shared by publication lifecycle commands. */
interface PublicationEnvironment {
  readonly publicationEndpoint: URL;
  readonly publicationToken: Redacted.Redacted<string>;
}

/** Validated secrets and endpoints required by a production content command. */
interface RecoveryEnvironment extends PublicationEnvironment {
  readonly rendererEndpoint: URL;
  readonly rendererToken: Redacted.Redacted<string>;
}

/** Validated signer values added only for candidate publication commands. */
interface ProductionEnvironment extends RecoveryEnvironment {
  readonly derivedPublicKeyPem: string;
  readonly keyId: typeof SigningKeyIdSchema.Type;
  readonly privateKeyPem: Redacted.Redacted<string>;
}

/** The process environment does not satisfy the narrow preview contract. */
export class PreviewEnvironmentError extends Schema.TaggedError<PreviewEnvironmentError>()(
  "PreviewEnvironmentError",
  { variable: Schema.Literal("NAKAFA_APP_DIR") }
) {}

/** One required production variable is absent, malformed, or unsafe. */
export class ProductionEnvironmentError extends Schema.TaggedError<ProductionEnvironmentError>()(
  "ProductionEnvironmentError",
  { variable: ProductionVariableSchema }
) {}

/** Creates a sanitized configuration failure naming only its variable. */
function productionError(variable: ProductionVariable) {
  return new ProductionEnvironmentError({ variable });
}

/** Requires one non-empty bearer value without whitespace before redaction. */
function tokenConfig(variable: ProductionVariable) {
  const token = Config.string(variable).pipe(
    Config.validate({
      message: "Expected a non-empty bearer value without whitespace.",
      validation: (value) => value.length > 0 && !TOKEN_WHITESPACE.test(value),
    })
  );
  return Config.redacted(token);
}

/** Requires HTTPS without credentials, query parameters, or fragments. */
function validateEndpoint(variable: ProductionVariable, endpoint: URL) {
  if (
    endpoint.protocol === "https:" &&
    endpoint.username === "" &&
    endpoint.password === "" &&
    endpoint.search === "" &&
    endpoint.hash === ""
  ) {
    return Effect.succeed(new URL(endpoint.href));
  }
  return Effect.fail(productionError(variable));
}

/** Proves the redacted PEM contains one unencrypted Ed25519 private key. */
const validatePrivateKey = Effect.fn("AksaraCli.validatePrivateKey")(
  (privateKeyPem: Redacted.Redacted<string>) => {
    const pem = Redacted.value(privateKeyPem);
    if (
      !(
        pem.startsWith("-----BEGIN PRIVATE KEY-----\n") &&
        pem.trimEnd().endsWith("\n-----END PRIVATE KEY-----")
      )
    ) {
      return Effect.fail(productionError("AKSARA_SIGNING_PRIVATE_KEY"));
    }
    return Effect.try({
      catch: () => productionError("AKSARA_SIGNING_PRIVATE_KEY"),
      try: () => {
        const privateKey = createPrivateKey(pem);
        const derivedPublicKeyPem = createPublicKey(privateKey)
          .export({ format: "pem", type: "spki" })
          .toString();
        return { derivedPublicKeyPem, privateKey };
      },
    }).pipe(
      Effect.flatMap(({ derivedPublicKeyPem, privateKey }) =>
        privateKey.asymmetricKeyType === "ed25519"
          ? Effect.succeed({ derivedPublicKeyPem, privateKeyPem })
          : Effect.fail(productionError("AKSARA_SIGNING_PRIVATE_KEY"))
      )
    );
  }
);

/** Reads one Effect Config value while sanitizing its variable-specific error. */
function readConfig<A>(config: Config.Config<A>, variable: ProductionVariable) {
  return config.pipe(Effect.mapError(() => productionError(variable)));
}

/** Decodes only the optional sibling-checkout override from unknown input. */
export const decodePreviewEnvironment = Effect.fn(
  "AksaraCli.decodeEnvironment"
)((input: Readonly<Record<string, string | undefined>>) =>
  Schema.decodeUnknown(PreviewEnvironmentSchema)(
    input.NAKAFA_APP_DIR === undefined
      ? {}
      : { nakafaAppDir: input.NAKAFA_APP_DIR }
  ).pipe(
    Effect.mapError(
      () => new PreviewEnvironmentError({ variable: "NAKAFA_APP_DIR" })
    )
  )
);

/** Reads the optional preview checkout override through Effect Config. */
export const readPreviewEnvironment = Effect.fn("AksaraCli.readEnvironment")(
  () =>
    Config.option(Config.string("NAKAFA_APP_DIR")).pipe(
      Effect.mapError(
        () => new PreviewEnvironmentError({ variable: "NAKAFA_APP_DIR" })
      ),
      Effect.flatMap((override) =>
        decodePreviewEnvironment(
          Option.match(override, {
            onNone: () => ({}),
            onSome: (nakafaAppDir) => ({ NAKAFA_APP_DIR: nakafaAppDir }),
          })
        )
      )
    )
);

/** Loads only the authenticated target shared by publication commands. */
export const readPublicationEnvironment = Effect.fn(
  "AksaraCli.readPublicationEnvironment"
)(function* () {
  const publicationEndpoint = yield* readConfig(
    Config.url("AKSARA_PUBLICATION_ENDPOINT"),
    "AKSARA_PUBLICATION_ENDPOINT"
  ).pipe(
    Effect.flatMap((endpoint) =>
      validateEndpoint("AKSARA_PUBLICATION_ENDPOINT", endpoint)
    )
  );
  const publicationToken = yield* readConfig(
    tokenConfig("AKSARA_PUBLICATION_TOKEN"),
    "AKSARA_PUBLICATION_TOKEN"
  );
  return {
    publicationEndpoint,
    publicationToken,
  } satisfies PublicationEnvironment;
});

/** Loads the publication and live-renderer values required for recovery. */
export const readRecoveryEnvironment = Effect.fn(
  "AksaraCli.readRecoveryEnvironment"
)(function* () {
  const publication = yield* readPublicationEnvironment();
  const rendererEndpoint = yield* readConfig(
    Config.url("AKSARA_RENDERER_ENDPOINT"),
    "AKSARA_RENDERER_ENDPOINT"
  ).pipe(
    Effect.flatMap((endpoint) =>
      validateEndpoint("AKSARA_RENDERER_ENDPOINT", endpoint)
    )
  );
  const rendererToken = yield* readConfig(
    tokenConfig("AKSARA_RENDERER_TOKEN"),
    "AKSARA_RENDERER_TOKEN"
  );
  return {
    ...publication,
    rendererEndpoint,
    rendererToken,
  } satisfies RecoveryEnvironment;
});

/** Loads and validates every required production value through Effect Config. */
export const readProductionEnvironment = Effect.fn(
  "AksaraCli.readProductionEnvironment"
)(function* () {
  const recovery = yield* readRecoveryEnvironment();
  const keyIdInput = yield* readConfig(
    Config.string("AKSARA_SIGNING_KEY_ID"),
    "AKSARA_SIGNING_KEY_ID"
  );
  const keyId = yield* Schema.decodeUnknown(SigningKeyIdSchema)(
    keyIdInput
  ).pipe(Effect.mapError(() => productionError("AKSARA_SIGNING_KEY_ID")));
  const privateKeyInput = yield* readConfig(
    Config.redacted(Config.string("AKSARA_SIGNING_PRIVATE_KEY")),
    "AKSARA_SIGNING_PRIVATE_KEY"
  );
  const signingKey = yield* validatePrivateKey(privateKeyInput);

  return {
    ...recovery,
    derivedPublicKeyPem: signingKey.derivedPublicKeyPem,
    keyId,
    privateKeyPem: signingKey.privateKeyPem,
  } satisfies ProductionEnvironment;
});
