import { NodeSocketServer } from "@effect/platform-node";
import { Config, Effect, Option, Redacted, Schema } from "effect";
import { isInetAddress, isLoopback } from "effect/net/NetAddress";
import { NakafaProcess } from "#cli/child/process";
import type { PreviewCredentials } from "#cli/credentials";
import { makeNakafaAppError, type NakafaAppError } from "#cli/error";
import { NAKAFA_LOOPBACK_HOST } from "#cli/origin";
import type { PreviewProvider } from "#cli/provider";

const ChildUrlSchema = Schema.String.pipe(
  Schema.check(Schema.isPattern(/^http:\/\/localhost:\d+(?:\/.*)?$/u))
);

const ChildEnvironmentSchema = Schema.Struct({
  AKSARA_PREVIEW_EVENTS_PATH: Schema.String.pipe(
    Schema.check(Schema.isStartingWith("/"))
  ),
  AKSARA_PREVIEW_KEY_ID: Schema.Trimmed.check(Schema.isNonEmpty()),
  AKSARA_PREVIEW_MANIFEST_PATH: Schema.String.pipe(
    Schema.check(Schema.isStartingWith("/"))
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
  AKSARA_PUBLICATION_TOKEN: Schema.Trimmed.check(Schema.isNonEmpty()),
  CONTENT_RUNTIME_TOKEN: Schema.Trimmed.check(Schema.isNonEmpty()),
  HOME: Schema.Trimmed.check(Schema.isNonEmpty()),
  PATH: Schema.Trimmed.check(Schema.isNonEmpty()),
  SITE_URL: ChildUrlSchema,
  VITE_AKSARA_PREVIEW_CHILD: Schema.Literal("true"),
  VITE_APP_URL: ChildUrlSchema,
  VITE_CONVEX_SITE_URL: ChildUrlSchema,
  VITE_CONVEX_URL: ChildUrlSchema,
  VITE_POSTHOG_KEY: Schema.String.pipe(
    Schema.check(Schema.isStartingWith("phc_"))
  ),
  VITE_POSTHOG_UI_HOST: ChildUrlSchema,
});

/** Running child whose exit always terminates the local preview session. */
export interface RunningNakafa {
  readonly awaitExit: Effect.Effect<never, NakafaAppError>;
  readonly origin: URL;
}

/** The app child could not start on a reserved loopback port. */
const startFailure = () => makeNakafaAppError("start", false);

/**
 * Allocates one currently free port on loopback for the actual app child. The
 * socket is closed when the reservation scope ends, so the port is free again.
 */
const reserveNakafaPort = Effect.fn("AksaraCli.reserveNakafaPort")(
  function* () {
    const { address } = yield* Effect.scoped(
      NodeSocketServer.make({ host: NAKAFA_LOOPBACK_HOST, port: 0 })
    );
    if (!(isInetAddress(address) && isLoopback(address.address))) {
      return yield* startFailure();
    }
    return address.port;
  },
  Effect.mapError(startFailure)
);

/** Reports every failure to build the child environment as one typed start failure. */
const childEnvironmentFailure = () => makeNakafaAppError("child-env", false);

/**
 * Reads one inherited variable, keeping an absent variable absent for the decode.
 * Effect's default ConfigProvider copies the process environment once, at its first use,
 * so a later change of process.env in the same process is not seen.
 */
const readInheritedVariable = (name: string) =>
  Config.option(Config.String(name)).pipe(
    Effect.map(Option.getOrUndefined),
    Effect.mapError(childEnvironmentFailure)
  );

/** Decodes every child environment value together before process creation. */
const makeChildEnvironment = Effect.fn("AksaraCli.makeChildEnvironment")(
  function* (
    input: {
      readonly credentials: PreviewCredentials;
      readonly provider: PreviewProvider;
    },
    origin: URL
  ) {
    const home = yield* readInheritedVariable("HOME");
    const path = yield* readInheritedVariable("PATH");
    return yield* Schema.decodeUnknownEffect(ChildEnvironmentSchema)({
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
      AKSARA_PUBLICATION_TOKEN: Redacted.value(
        input.credentials.internalContentToken
      ),
      CONTENT_RUNTIME_TOKEN: Redacted.value(
        input.credentials.contentRuntimeToken
      ),
      HOME: home,
      PATH: path,
      SITE_URL: origin.toString(),
      VITE_AKSARA_PREVIEW_CHILD: "true",
      VITE_APP_URL: origin.toString(),
      VITE_CONVEX_SITE_URL: new URL(
        "/__aksara-preview/convex-site",
        origin
      ).toString(),
      VITE_CONVEX_URL: new URL("/__aksara-preview/convex", origin).toString(),
      VITE_POSTHOG_KEY: "phc_aksara_preview",
      VITE_POSTHOG_UI_HOST: origin.toString(),
    }).pipe(Effect.mapError(childEnvironmentFailure));
  }
);

/** Starts the TanStack Start app with inherited stdio and explicit preview environment. */
export const startNakafa = Effect.fn("AksaraCli.startNakafa")(
  function* (input: {
    readonly credentials: PreviewCredentials;
    readonly provider: PreviewProvider;
    readonly root: string;
  }) {
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
          "vite",
          "dev",
          "--host",
          NAKAFA_LOOPBACK_HOST,
          "--port",
          String(port),
          "--strictPort",
        ],
        command: "pnpm",
        environment,
        root: input.root,
      })
      .pipe(Effect.mapError(startFailure));
    return {
      awaitExit: process.exitCode.pipe(
        Effect.mapError(() => makeNakafaAppError("exit", false)),
        Effect.flatMap((status) =>
          Effect.fail(makeNakafaAppError("exit", false, Number(status)))
        )
      ),
      origin,
    } satisfies RunningNakafa;
  }
);

/** Inputs passed to the actual Nakafa process without writing an env file. */
export type NakafaStartInput = Parameters<typeof startNakafa>[0];
