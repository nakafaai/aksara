import { createServer } from "node:net";
import {
  env,
  make,
  stderr,
  stdin,
  stdout,
  workingDirectory,
} from "@effect/platform/Command";
import type { CommandExecutor } from "@effect/platform/CommandExecutor";
import { Effect, Redacted, Schema } from "effect";
import type * as Scope from "effect/Scope";
import { makeNakafaAppError, type NakafaAppError } from "#cli/app-error";
import type { PreviewCredentials } from "#cli/credentials";
import type { PreviewProvider } from "#cli/provider";

const LOOPBACK_HOST = "127.0.0.1";

const ChildEnvironmentSchema = Schema.Struct({
  AKSARA_PREVIEW_EVENTS_PATH: Schema.String.pipe(Schema.startsWith("/")),
  AKSARA_PREVIEW_KEY_ID: Schema.NonEmptyTrimmedString,
  AKSARA_PREVIEW_MANIFEST_PATH: Schema.String.pipe(Schema.startsWith("/")),
  AKSARA_PREVIEW_ORIGIN: Schema.String.pipe(
    Schema.pattern(/^http:\/\/127\.0\.0\.1:\d+\/$/u)
  ),
  AKSARA_PREVIEW_PUBLIC_KEY: Schema.String.pipe(
    Schema.minLength(1),
    Schema.maxLength(4096)
  ),
  AKSARA_PREVIEW_TOKEN: Schema.NonEmptyTrimmedString,
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

/** Actual child-process capability consumed by the Nakafa service layer. */
export type StartNakafa = (
  executor: CommandExecutor,
  input: NakafaStartInput
) => Effect.Effect<RunningNakafa, NakafaAppError, Scope.Scope>;

/** Allocates one currently free IPv4 loopback port for the actual app child. */
const reserveNakafaPort = Effect.fn("AksaraCli.reserveNakafaPort")(() =>
  Effect.async<number, NakafaAppError>((resume) => {
    const server = createServer();
    server.once("error", () =>
      resume(Effect.fail(makeNakafaAppError("start", false)))
    );
    server.listen({ host: LOOPBACK_HOST, port: 0 }, () => {
      const address = server.address();
      if (
        typeof address !== "object" ||
        address?.address !== LOOPBACK_HOST ||
        address.family !== "IPv4"
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
      AKSARA_PREVIEW_PUBLIC_KEY: input.credentials.publicKeyPem,
      AKSARA_PREVIEW_TOKEN: Redacted.value(input.credentials.token),
    }).pipe(Effect.mapError(() => makeNakafaAppError("child-env", false)))
);

/** Starts the Next app with inherited stdio and explicit preview environment. */
export const startNakafa: StartNakafa = Effect.fn("AksaraCli.startNakafa")(
  function* (executor, input) {
    const environment = yield* makeChildEnvironment(input);
    const port = yield* reserveNakafaPort();
    const command = make(
      "pnpm",
      "--filter",
      "www",
      "exec",
      "next",
      "dev",
      "--hostname",
      LOOPBACK_HOST,
      "--port",
      String(port)
    ).pipe(
      env(environment),
      stdin("inherit"),
      stdout("inherit"),
      stderr("inherit"),
      workingDirectory(input.root)
    );
    const process = yield* executor
      .start(command)
      .pipe(Effect.mapError(() => makeNakafaAppError("start", false)));
    return {
      awaitExit: process.exitCode.pipe(
        Effect.mapError(() => makeNakafaAppError("exit", false)),
        Effect.flatMap((status) =>
          Effect.fail(makeNakafaAppError("exit", false, Number(status)))
        )
      ),
      origin: new URL(`http://${LOOPBACK_HOST}:${port}`),
    } satisfies RunningNakafa;
  }
);
