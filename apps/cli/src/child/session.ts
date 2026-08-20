import { createServer } from "node:net";
import { Effect, Redacted, Schema } from "effect";
import { isAddressInfo } from "#cli/address";
import { makeNakafaAppError, type NakafaAppError } from "#cli/app-error";
import { NakafaProcess } from "#cli/child/process";
import type { PreviewCredentials } from "#cli/credentials";
import { NAKAFA_LOOPBACK_HOST } from "#cli/origin";
import type { PreviewProvider } from "#cli/provider";

const LOOPBACK_ADDRESSES = new Set(["127.0.0.1", "::1"]);
const ChildUrlSchema = Schema.String.pipe(
  Schema.check(Schema.isPattern(/^http:\/\/localhost:\d+(?:\/.*)?$/u))
);

const ChildEnvironmentSchema = Schema.Struct({
  AKSARA_PREVIEW_EVENTS_PATH: Schema.String.pipe(
    Schema.check(Schema.isStartsWith("/"))
  ),
  AKSARA_PREVIEW_KEY_ID: Schema.Trimmed.check(Schema.isNonEmpty()),
  AKSARA_PREVIEW_MANIFEST_PATH: Schema.String.pipe(
    Schema.check(Schema.isStartsWith("/"))
  ),
  AKSARA_PREVIEW_ORIGIN: Schema.String.pipe(
    Schema.check(Schema.isPattern(/^http:\/\/127\.0\.0\.1:\d+\/$/u))
  ),
  AKSARA_PREVIEW_PROVIDER_TOKEN: Schema.Trimmed.check(Schema.isNonEmpty()),
  AKSARA_PREVIEW_PUBLIC_KEY: Schema.String.pipe(
    Schema.check(Schema.isMinLength(1)),
    Schema.check(Schema.isMaxLength(4096))
  ),
  AKSARA_PREVIEW_RENDERER_SECRET: Schema.Trimmed.check(Schema.isNonEmpty()),
  AKSARA_PREVIEW_RENDERER_TOKEN: Schema.Trimmed.check(Schema.isNonEmpty()),
  CONTENT_RUNTIME_TOKEN: Schema.Trimmed.check(Schema.isNonEmpty()),
  HOME: Schema.Trimmed.check(Schema.isNonEmpty()),
  INTERNAL_CONTENT_API_KEY: Schema.Trimmed.check(Schema.isNonEmpty()),
  NEXT_PUBLIC_APP_URL: ChildUrlSchema,
  NEXT_PUBLIC_CONVEX_SITE_URL: ChildUrlSchema,
  NEXT_PUBLIC_CONVEX_URL: ChildUrlSchema,
  NEXT_PUBLIC_MCP_URL: ChildUrlSchema,
  NEXT_PUBLIC_POSTHOG_KEY: Schema.String.pipe(
    Schema.check(Schema.isStartsWith("phc_"))
  ),
  NEXT_PUBLIC_POSTHOG_UI_HOST: ChildUrlSchema,
  NEXT_PUBLIC_VERSION: Schema.Literal("aksara-preview"),
  PATH: Schema.Trimmed.check(Schema.isNonEmpty()),
  SITE_URL: ChildUrlSchema,
});

/** Running child whose exit always terminates the local preview session. */
export interface RunningNakafa {
  readonly awaitExit: Effect.Effect<never, NakafaAppError>;
  readonly origin: URL;
}

/** Inputs passed to the actual Nakafa process without writing an env file. */
export interface NakafaStartInput {
  readonly credentials: PreviewCredentials;
  readonly provider: PreviewProvider;
  readonly root: string;
}

/** Allocates one currently free localhost port for the actual app child. */
const reserveNakafaPort = Effect.fn("AksaraCli.reserveNakafaPort")(() =>
  Effect.callback<number, NakafaAppError>((resume) => {
    const server = createServer();
    server.once("error", () =>
      resume(Effect.fail(makeNakafaAppError("start", false)))
    );
    server.listen({ host: NAKAFA_LOOPBACK_HOST, port: 0 }, () => {
      const address = server.address();
      if (
        !(isAddressInfo(address) && LOOPBACK_ADDRESSES.has(address.address))
      ) {
        server.close(() =>
          resume(Effect.fail(makeNakafaAppError("start", false)))
        );
        return;
      }
      server.close((error) =>
        resume(
          error
            ? Effect.fail(makeNakafaAppError("start", false))
            : Effect.succeed(address.port)
        )
      );
    });
    return Effect.sync(() => server.close());
  })
);

/** Decodes every child environment value together before process creation. */
const makeChildEnvironment = Effect.fn("AksaraCli.makeChildEnvironment")(
  (input: NakafaStartInput, origin: URL) =>
    Schema.decodeUnknownEffect(ChildEnvironmentSchema)({
      AKSARA_PREVIEW_EVENTS_PATH: input.provider.eventsPath,
      AKSARA_PREVIEW_KEY_ID: input.credentials.keyId,
      AKSARA_PREVIEW_MANIFEST_PATH: input.provider.manifestPath,
      AKSARA_PREVIEW_ORIGIN: input.provider.origin.toString(),
      AKSARA_PREVIEW_PROVIDER_TOKEN: Redacted.value(
        input.credentials.providerToken
      ),
      AKSARA_PREVIEW_PUBLIC_KEY: input.credentials.publicKeyPem,
      AKSARA_PREVIEW_RENDERER_SECRET: Redacted.value(
        input.credentials.renderer.secret
      ),
      AKSARA_PREVIEW_RENDERER_TOKEN: Redacted.value(
        input.credentials.renderer.token
      ),
      CONTENT_RUNTIME_TOKEN: Redacted.value(
        input.credentials.contentRuntimeToken
      ),
      HOME: process.env.HOME,
      INTERNAL_CONTENT_API_KEY: Redacted.value(
        input.credentials.internalContentToken
      ),
      NEXT_PUBLIC_APP_URL: origin.toString(),
      NEXT_PUBLIC_CONVEX_SITE_URL: new URL(
        "/__aksara-preview/convex-site",
        origin
      ).toString(),
      NEXT_PUBLIC_CONVEX_URL: new URL(
        "/__aksara-preview/convex",
        origin
      ).toString(),
      NEXT_PUBLIC_MCP_URL: new URL("/mcp", origin).toString(),
      NEXT_PUBLIC_POSTHOG_KEY: "phc_aksara_preview",
      NEXT_PUBLIC_POSTHOG_UI_HOST: origin.toString(),
      NEXT_PUBLIC_VERSION: "aksara-preview",
      PATH: process.env.PATH,
      SITE_URL: origin.toString(),
    }).pipe(Effect.mapError(() => makeNakafaAppError("child-env", false)))
);

/** Starts the Next app with inherited stdio and explicit preview environment. */
export const startNakafa = Effect.fn("AksaraCli.startNakafa")(function* (
  input: NakafaStartInput
) {
  const processes = yield* NakafaProcess;
  const port = yield* reserveNakafaPort();
  const origin = new URL(`http://${NAKAFA_LOOPBACK_HOST}:${port}`);
  const environment = yield* makeChildEnvironment(input, origin);
  const process = yield* processes
    .start({
      args: [
        "--filter",
        "www",
        "exec",
        "next",
        "dev",
        "--hostname",
        NAKAFA_LOOPBACK_HOST,
        "--port",
        String(port),
      ],
      command: "pnpm",
      environment,
      root: input.root,
    })
    .pipe(Effect.mapError(() => makeNakafaAppError("start", false)));
  return {
    awaitExit: process.exitCode.pipe(
      Effect.mapError(() => makeNakafaAppError("exit", false)),
      Effect.flatMap((status) =>
        Effect.fail(makeNakafaAppError("exit", false, Number(status)))
      )
    ),
    origin,
  } satisfies RunningNakafa;
});
