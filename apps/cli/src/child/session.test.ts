import { Server } from "node:net";
import { afterEach, assert, describe, expect, it } from "@effect/vitest";
import { Array as Arr, Effect, Order, Record as Rec, Redacted } from "effect";
import { NakafaProcess, type NakafaProcessInput } from "#cli/child/process";
import { startNakafa } from "#cli/child/session";
import { makeNakafaAppError } from "#cli/error";
import { inheritedEnvironment } from "#test/environment";
import {
  captureInheritedStart,
  failInheritedStart,
  makeProcess,
  makeStartInput,
} from "#test/process";

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllEnvs();
});

describe("Nakafa child process", () => {
  it.effect(
    "passes only the approved preview protocol and reports child exit",
    () =>
      Effect.gen(function* () {
        vi.stubEnv("AKSARA_TEST_PARENT_SECRET", "must-not-cross");
        const input = yield* makeStartInput();
        const onStart = vi.fn<(input: NakafaProcessInput) => void>();
        const processes = makeProcess(
          onStart,
          Effect.succeed({ exitCode: Effect.succeed(0) })
        );
        const result = yield* Effect.scoped(
          startNakafa(input).pipe(
            Effect.flatMap((child) =>
              child.awaitExit.pipe(
                Effect.flip,
                Effect.map((exit) => ({ child, exit }))
              )
            ),
            Effect.provideService(NakafaProcess, processes)
          )
        );
        const started = onStart.mock.lastCall?.[0];
        assert(started !== undefined, "Expected the child command to start.");
        const internalContentToken = Redacted.value(
          input.credentials.internalContentToken
        );

        expect(Arr.take(started.args, 7)).toEqual([
          "--filter",
          "www",
          "exec",
          "next",
          "dev",
          "--hostname",
          "localhost",
        ]);
        const { port } = result.child.origin;
        expect(Arr.takeRight(started.args, 2)).toEqual(["--port", port]);
        expect(result.child.origin.toString()).toBe(
          `http://localhost:${result.child.origin.port}/`
        );
        expect(started.root).toBe(input.root);
        expect(Arr.sort(Rec.keys(started.environment), Order.String)).toEqual([
          "AKSARA_PREVIEW_EVENTS_PATH",
          "AKSARA_PREVIEW_KEY_ID",
          "AKSARA_PREVIEW_MANIFEST_PATH",
          "AKSARA_PREVIEW_ORIGIN",
          "AKSARA_PREVIEW_PROVIDER_TOKEN",
          "AKSARA_PREVIEW_PUBLIC_KEY",
          "AKSARA_PREVIEW_RENDERER_SECRET",
          "AKSARA_PREVIEW_RENDERER_TOKEN",
          "AKSARA_PUBLICATION_TOKEN",
          "CONTENT_RUNTIME_TOKEN",
          "HOME",
          "INTERNAL_CONTENT_API_KEY",
          "NEXT_PUBLIC_APP_URL",
          "NEXT_PUBLIC_CONVEX_SITE_URL",
          "NEXT_PUBLIC_CONVEX_URL",
          "NEXT_PUBLIC_MCP_URL",
          "NEXT_PUBLIC_POSTHOG_KEY",
          "NEXT_PUBLIC_POSTHOG_UI_HOST",
          "NEXT_PUBLIC_VERSION",
          "PATH",
          "SITE_URL",
        ]);
        expect(started.environment).toMatchObject({
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
          AKSARA_PUBLICATION_TOKEN: internalContentToken,
          CONTENT_RUNTIME_TOKEN: Redacted.value(
            input.credentials.contentRuntimeToken
          ),
          HOME: "/home/aksara-test",
          INTERNAL_CONTENT_API_KEY: internalContentToken,
          NEXT_PUBLIC_APP_URL: result.child.origin.toString(),
          NEXT_PUBLIC_CONVEX_SITE_URL: new URL(
            "/__aksara-preview/convex-site",
            result.child.origin
          ).toString(),
          NEXT_PUBLIC_CONVEX_URL: new URL(
            "/__aksara-preview/convex",
            result.child.origin
          ).toString(),
          NEXT_PUBLIC_MCP_URL: new URL("/mcp", result.child.origin).toString(),
          NEXT_PUBLIC_POSTHOG_KEY: "phc_aksara_preview",
          NEXT_PUBLIC_POSTHOG_UI_HOST: result.child.origin.toString(),
          NEXT_PUBLIC_VERSION: "aksara-preview",
          PATH: "/usr/bin:/bin",
          SITE_URL: result.child.origin.toString(),
        });
        expect(started.environment).not.toHaveProperty(
          "AKSARA_TEST_PARENT_SECRET"
        );
        expect(result.exit).toMatchObject({ reason: "exit", status: 0 });
      }).pipe(Effect.provide(inheritedEnvironment("/usr/bin:/bin")))
  );

  it.effect("rejects invalid preview and operating-system environment", () =>
    Effect.gen(function* () {
      const input = yield* makeStartInput();
      const invalidInput = {
        ...input,
        provider: { ...input.provider, origin: new URL("https://127.0.0.1") },
      };
      const success = makeProcess(
        vi.fn(),
        Effect.succeed({ exitCode: Effect.succeed(0) })
      );
      const childEnvironment = yield* Effect.scoped(
        startNakafa(invalidInput).pipe(
          Effect.provideService(NakafaProcess, success)
        )
      ).pipe(Effect.flip);
      const operatingSystem = yield* Effect.scoped(
        startNakafa(input).pipe(Effect.provideService(NakafaProcess, success))
      ).pipe(Effect.flip, Effect.provide(inheritedEnvironment("")));

      expect(childEnvironment).toMatchObject({ reason: "child-env" });
      expect(operatingSystem).toMatchObject({ reason: "child-env" });
    }).pipe(Effect.provide(inheritedEnvironment("/usr/bin:/bin")))
  );

  it.effect(
    "reads the inherited HOME and PATH through the production environment provider",
    () =>
      Effect.gen(function* () {
        const started = yield* captureInheritedStart("/usr/bin");

        expect(started?.environment).toMatchObject({
          HOME: "/home/aksara-test",
          PATH: "/usr/bin",
        });
      })
  );

  it.effect(
    "rejects an empty or absent inherited PATH through the production environment provider",
    () =>
      Effect.gen(function* () {
        const emptyPath = yield* failInheritedStart("");
        const absentPath = yield* failInheritedStart(undefined);

        expect(emptyPath).toMatchObject({ reason: "child-env" });
        expect(absentPath).toMatchObject({ reason: "child-env" });
      })
  );

  it.effect("maps process start and exit observation failures", () =>
    Effect.gen(function* () {
      const input = yield* makeStartInput();
      const startFailure = makeNakafaAppError("start", false);
      const start = yield* Effect.scoped(
        startNakafa(input).pipe(
          Effect.provideService(
            NakafaProcess,
            makeProcess(vi.fn(), Effect.fail(startFailure))
          )
        )
      ).pipe(Effect.flip);
      const exitFailure = makeNakafaAppError("exit", false);
      const exitProcess = makeProcess(
        vi.fn(),
        Effect.succeed({ exitCode: Effect.fail(exitFailure) })
      );
      const exit = yield* Effect.scoped(
        startNakafa(input).pipe(
          Effect.provideService(NakafaProcess, exitProcess),
          Effect.flatMap((child) => child.awaitExit)
        )
      ).pipe(Effect.flip);

      expect(start).toMatchObject({ reason: "start" });
      expect(exit).toMatchObject({ reason: "exit" });
    }).pipe(Effect.provide(inheritedEnvironment("/usr/bin:/bin")))
  );

  it.effect(
    "fails when the operating system cannot bind or prove loopback",
    () =>
      Effect.gen(function* () {
        const input = yield* makeStartInput();
        const processes = makeProcess(
          vi.fn(),
          Effect.succeed({ exitCode: Effect.succeed(0) })
        );
        vi.spyOn(Server.prototype, "listen").mockImplementationOnce(function (
          this: Server
        ) {
          // The caller subscribes to "error" before it listens, so the failure arrives at once.
          this.emit("error", new Error("Test bind failure."));
          return this;
        });
        const bind = yield* Effect.scoped(
          startNakafa(input).pipe(
            Effect.provideService(NakafaProcess, processes)
          )
        ).pipe(Effect.flip);
        vi.restoreAllMocks();
        vi.spyOn(Server.prototype, "address").mockReturnValueOnce(null);
        const address = yield* Effect.scoped(
          startNakafa(input).pipe(
            Effect.provideService(NakafaProcess, processes)
          )
        ).pipe(Effect.flip);
        vi.restoreAllMocks();
        vi.spyOn(Server.prototype, "address").mockReturnValueOnce({
          address: "192.0.2.1",
          family: "IPv4",
          port: 31_234,
        });
        const external = yield* Effect.scoped(
          startNakafa(input).pipe(
            Effect.provideService(NakafaProcess, processes)
          )
        ).pipe(Effect.flip);

        expect(bind).toMatchObject({ reason: "start" });
        expect(address).toMatchObject({ reason: "start" });
        expect(external).toMatchObject({ reason: "start" });
      })
  );

  it.live(
    "fails a port close error and cancels an unfinished reservation",
    () =>
      Effect.gen(function* () {
        const input = yield* makeStartInput();
        const processes = makeProcess(
          vi.fn(),
          Effect.succeed({ exitCode: Effect.succeed(0) })
        );
        const originalClose = Server.prototype.close;
        vi.spyOn(Server.prototype, "close").mockImplementationOnce(function (
          this: Server,
          callback?: (error?: Error) => void
        ) {
          return originalClose.call(this, () =>
            callback?.(new Error("Test port close failure."))
          );
        });
        const close = yield* Effect.scoped(
          startNakafa(input).pipe(
            Effect.provideService(NakafaProcess, processes)
          )
        ).pipe(Effect.flip);
        vi.restoreAllMocks();
        vi.spyOn(Server.prototype, "listen").mockImplementationOnce(function (
          this: Server
        ) {
          return this;
        });
        const cancelled = yield* Effect.scoped(
          startNakafa(input).pipe(
            Effect.provideService(NakafaProcess, processes)
          )
        ).pipe(Effect.timeout("1 millis"), Effect.flip);

        expect(close).toMatchObject({ reason: "start" });
        expect(cancelled._tag).toBe("TimeoutError");
      })
  );
});
