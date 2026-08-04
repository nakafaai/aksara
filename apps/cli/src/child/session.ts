import { createServer } from "node:net";
import { Effect, Redacted, Schema } from "effect";
import { isAddressInfo } from "#cli/address";
import { makeNakafaAppError, type NakafaAppError } from "#cli/app-error";
import { NakafaProcess } from "#cli/child/process";
import type { PreviewCredentials } from "#cli/credentials";
import { NAKAFA_LOOPBACK_HOST } from "#cli/origin";
import type { PreviewProvider } from "#cli/provider";

const LOOPBACK_ADDRESSES = new Set(["127.0.0.1", "::1"]);

const ChildEnvironmentSchema = Schema.Struct({
  AKSARA_PREVIEW_EVENTS_PATH: Schema.String.pipe(Schema.startsWith("/")),
  AKSARA_PREVIEW_KEY_ID: Schema.NonEmptyTrimmedString,
  AKSARA_PREVIEW_MANIFEST_PATH: Schema.String.pipe(Schema.startsWith("/")),
  AKSARA_PREVIEW_ORIGIN: Schema.String.pipe(
    Schema.pattern(/^http:\/\/127\.0\.0\.1:\d+\/$/u)
  ),
  AKSARA_PREVIEW_PROVIDER_TOKEN: Schema.NonEmptyTrimmedString,
  AKSARA_PREVIEW_PUBLIC_KEY: Schema.String.pipe(
    Schema.minLength(1),
    Schema.maxLength(4096)
  ),
  AKSARA_PREVIEW_RENDERER_SECRET: Schema.NonEmptyTrimmedString,
  AKSARA_PREVIEW_RENDERER_TOKEN: Schema.NonEmptyTrimmedString,
  HOME: Schema.NonEmptyTrimmedString,
  PATH: Schema.NonEmptyTrimmedString,
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
  Effect.async<number, NakafaAppError>((resume) => {
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
  (input: NakafaStartInput) =>
    Schema.decodeUnknown(ChildEnvironmentSchema)({
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
      HOME: process.env.HOME,
      PATH: process.env.PATH,
    }).pipe(Effect.mapError(() => makeNakafaAppError("child-env", false)))
);

/** Starts the Next app with inherited stdio and explicit preview environment. */
export const startNakafa = Effect.fn("AksaraCli.startNakafa")(function* (
  input: NakafaStartInput
) {
  const processes = yield* NakafaProcess;
  const environment = yield* makeChildEnvironment(input);
  const port = yield* reserveNakafaPort();
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
    origin: new URL(`http://${NAKAFA_LOOPBACK_HOST}:${port}`),
  } satisfies RunningNakafa;
});
