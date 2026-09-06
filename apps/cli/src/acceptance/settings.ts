import { createPublicKey } from "node:crypto";
import {
  GitCommitShaSchema,
  ReleaseIdSchema,
} from "@nakafa/aksara-contracts/ids";
import { validateRendererManifestHash } from "@nakafa/aksara-contracts/renderer/manifest";
import { TrustedKeySchema } from "@nakafa/aksara-contracts/signature/trusted";
import { Config, Effect, FileSystem, Redacted, Schema } from "effect";

/** Acceptance publication cannot escape its exact isolated source and target. */
export class AcceptanceEnvironmentError extends Schema.TaggedError<AcceptanceEnvironmentError>()(
  "AcceptanceEnvironmentError",
  {
    reason: Schema.Literals([
      "endpoint",
      "signer",
      "renderer",
      "revision",
      "target",
    ]),
  }
) {}

/** Rejects every remote, credential-bearing, redirected, or ambiguous ingress URL. */
export const decodeAcceptanceEndpoint = Effect.fn(
  "AksaraCli.decodeAcceptanceEndpoint"
)(function* (value: string) {
  const endpoint = yield* Effect.try({
    catch: () => new AcceptanceEnvironmentError({ reason: "endpoint" }),
    try: () => new URL(value),
  });
  if (
    endpoint.protocol !== "http:" ||
    endpoint.hostname !== "127.0.0.1" ||
    endpoint.port.length === 0 ||
    endpoint.pathname !== "/internal/content/releases" ||
    endpoint.username.length > 0 ||
    endpoint.password.length > 0 ||
    endpoint.search.length > 0 ||
    endpoint.hash.length > 0
  ) {
    return yield* new AcceptanceEnvironmentError({ reason: "endpoint" });
  }
  return endpoint;
});

/** Reads the actual Nakafa renderer contract exported by the acceptance build. */
export const readAcceptanceRenderer = Effect.fn(
  "AksaraCli.readAcceptanceRenderer"
)(function* (path: string) {
  const fs = yield* FileSystem.FileSystem;
  return yield* fs.readFileString(path).pipe(
    Effect.flatMap(Schema.decodeEffect(Schema.fromJsonString(Schema.Unknown))),
    Effect.flatMap(validateRendererManifestHash),
    Effect.mapError(
      () => new AcceptanceEnvironmentError({ reason: "renderer" })
    )
  );
});

/** Loads an ephemeral signer and an exact pinned source without production secrets. */
export const readAcceptanceSettings = Effect.fn(
  "AksaraCli.readAcceptanceSettings"
)(function* () {
  const fs = yield* FileSystem.FileSystem;
  const checkoutRoot = yield* Config.nonEmptyString("AKSARA_ACCEPTANCE_SOURCE");
  const revision = yield* Config.schema(
    GitCommitShaSchema,
    "AKSARA_ACCEPTANCE_REVISION"
  );
  const endpoint = yield* decodeAcceptanceEndpoint(
    yield* Config.nonEmptyString("AKSARA_ACCEPTANCE_ENDPOINT")
  );
  const rendererPath = yield* Config.nonEmptyString(
    "AKSARA_ACCEPTANCE_RENDERER"
  );
  const privateKeyPath = yield* Config.nonEmptyString(
    "AKSARA_ACCEPTANCE_PRIVATE_KEY"
  );
  const privateKeyPem = yield* fs
    .readFileString(privateKeyPath)
    .pipe(Effect.map(Redacted.make));
  const publicKeyPem = yield* Effect.try({
    catch: () => new AcceptanceEnvironmentError({ reason: "signer" }),
    try: () =>
      createPublicKey(Redacted.value(privateKeyPem))
        .export({ format: "pem", type: "spki" })
        .toString(),
  });
  const key = yield* Schema.decodeUnknownEffect(TrustedKeySchema)({
    keyId: yield* Config.nonEmptyString("AKSARA_AGENT_SIGNING_KEY_ID"),
    publicKeyPem,
  }).pipe(
    Effect.mapError(() => new AcceptanceEnvironmentError({ reason: "signer" }))
  );
  const token = yield* Config.redacted("AKSARA_PUBLICATION_TOKEN");
  return {
    checkoutRoot,
    endpoint,
    key,
    privateKeyPem,
    recoveryId: ReleaseIdSchema.make(
      `acceptance-inverse-${revision.slice(0, 12)}`
    ),
    releaseId: ReleaseIdSchema.make(`acceptance-${revision.slice(0, 12)}`),
    rendererPath,
    revision,
    token,
  };
});
