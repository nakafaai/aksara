import { Server } from "node:net";
import { Effect, Redacted } from "effect";
import { afterEach, describe, expect, it, vi } from "vitest";
import { makeNakafaAppError, type NakafaAppError } from "#cli/app-error";
import { type NakafaStartInput, startNakafa } from "#cli/child";
import {
  NakafaProcess,
  type NakafaProcessInput,
  type RunningProcess,
} from "#cli/child-process";
import { makePreviewCredentials } from "#cli/credentials";
import type { PreviewProvider } from "#cli/provider";

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllEnvs();
});

/** Creates one minimal provider input for the real child-process seam. */
async function makeStartInput(): Promise<NakafaStartInput> {
  const credentials = await Effect.runPromise(makePreviewCredentials());
  const provider: PreviewProvider = {
    eventsPath: "/v1/events",
    failed: () => Effect.succeed(true),
    manifestPath: "/v1/manifest",
    origin: new URL("http://127.0.0.1:32123"),
    pending: () => Effect.succeed(1),
    ready: () => Effect.succeed(true),
  };
  return { credentials, provider, root: "/code/nakafa.com" };
}

/** Captures one process request while returning a deterministic child result. */
function makeProcess(
  capture: { input?: NakafaProcessInput },
  result: Effect.Effect<RunningProcess, NakafaAppError>
) {
  return NakafaProcess.of({
    start: (input) => {
      capture.input = input;
      return result;
    },
  });
}

describe("Nakafa child process", () => {
  it("passes only the approved preview protocol and reports child exit", async () => {
    vi.stubEnv("AKSARA_TEST_PARENT_SECRET", "must-not-cross");
    const input = await makeStartInput();
    const capture: { input?: NakafaProcessInput } = {};
    const processes = makeProcess(
      capture,
      Effect.succeed({ exitCode: Effect.succeed(0) })
    );
    const result = await Effect.runPromise(
      Effect.scoped(
        startNakafa(input).pipe(
          Effect.flatMap((child) =>
            child.awaitExit.pipe(
              Effect.flip,
              Effect.map((exit) => ({ child, exit }))
            )
          ),
          Effect.provideService(NakafaProcess, processes)
        )
      )
    );
    const started = capture.input;
    if (!started) {
      throw new Error("Expected the Nakafa child command to start.");
    }

    expect(started.args.slice(0, 7)).toEqual([
      "--filter",
      "www",
      "exec",
      "next",
      "dev",
      "--hostname",
      "localhost",
    ]);
    expect(started.args.at(-2)).toBe("--port");
    expect(started.args.at(-1)).toBe(result.child.origin.port);
    expect(result.child.origin.toString()).toBe(
      `http://localhost:${result.child.origin.port}/`
    );
    expect(started.root).toBe(input.root);
    expect(Object.keys(started.environment).sort()).toEqual([
      "AKSARA_PREVIEW_EVENTS_PATH",
      "AKSARA_PREVIEW_KEY_ID",
      "AKSARA_PREVIEW_MANIFEST_PATH",
      "AKSARA_PREVIEW_ORIGIN",
      "AKSARA_PREVIEW_PROVIDER_TOKEN",
      "AKSARA_PREVIEW_PUBLIC_KEY",
      "AKSARA_PREVIEW_RENDERER_SECRET",
      "AKSARA_PREVIEW_RENDERER_TOKEN",
      "HOME",
      "PATH",
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
      HOME: process.env.HOME,
      PATH: process.env.PATH,
    });
    expect(started.environment).not.toHaveProperty("AKSARA_TEST_PARENT_SECRET");
    expect(result.exit).toMatchObject({ reason: "exit", status: 0 });
  });

  it("rejects invalid preview and operating-system environment", async () => {
    const input = await makeStartInput();
    const invalidInput = {
      ...input,
      provider: { ...input.provider, origin: new URL("https://127.0.0.1") },
    };
    const capture: { input?: NakafaProcessInput } = {};
    const success = makeProcess(
      capture,
      Effect.succeed({ exitCode: Effect.succeed(0) })
    );
    const childEnvironment = await Effect.runPromise(
      Effect.scoped(
        startNakafa(invalidInput).pipe(
          Effect.provideService(NakafaProcess, success)
        )
      ).pipe(Effect.flip)
    );
    vi.stubEnv("PATH", "");
    const operatingSystem = await Effect.runPromise(
      Effect.scoped(
        startNakafa(input).pipe(Effect.provideService(NakafaProcess, success))
      ).pipe(Effect.flip)
    );

    expect(childEnvironment).toMatchObject({ reason: "child-env" });
    expect(operatingSystem).toMatchObject({ reason: "child-env" });
  });

  it("maps process start and exit observation failures", async () => {
    const input = await makeStartInput();
    const capture: { input?: NakafaProcessInput } = {};
    const startFailure = makeNakafaAppError("start", false);
    const start = await Effect.runPromise(
      Effect.scoped(
        startNakafa(input).pipe(
          Effect.provideService(
            NakafaProcess,
            makeProcess(capture, Effect.fail(startFailure))
          )
        )
      ).pipe(Effect.flip)
    );
    const exitFailure = makeNakafaAppError("exit", false);
    const exitProcess = makeProcess(
      capture,
      Effect.succeed({ exitCode: Effect.fail(exitFailure) })
    );
    const exit = await Effect.runPromise(
      Effect.scoped(
        startNakafa(input).pipe(
          Effect.provideService(NakafaProcess, exitProcess),
          Effect.flatMap((child) => child.awaitExit)
        )
      ).pipe(Effect.flip)
    );

    expect(start).toMatchObject({ reason: "start" });
    expect(exit).toMatchObject({ reason: "exit" });
  });

  it("fails when the operating system cannot bind or prove loopback", async () => {
    const input = await makeStartInput();
    const capture: { input?: NakafaProcessInput } = {};
    const processes = makeProcess(
      capture,
      Effect.succeed({ exitCode: Effect.succeed(0) })
    );
    vi.spyOn(Server.prototype, "listen").mockImplementationOnce(function (
      this: Server
    ) {
      queueMicrotask(() => this.emit("error", new Error("Test bind failure.")));
      return this;
    });
    const bind = await Effect.runPromise(
      Effect.scoped(
        startNakafa(input).pipe(Effect.provideService(NakafaProcess, processes))
      ).pipe(Effect.flip)
    );
    vi.restoreAllMocks();
    vi.spyOn(Server.prototype, "address").mockReturnValueOnce(null);
    const address = await Effect.runPromise(
      Effect.scoped(
        startNakafa(input).pipe(Effect.provideService(NakafaProcess, processes))
      ).pipe(Effect.flip)
    );
    vi.restoreAllMocks();
    vi.spyOn(Server.prototype, "address").mockReturnValueOnce({
      address: "192.0.2.1",
      family: "IPv4",
      port: 31_234,
    });
    const external = await Effect.runPromise(
      Effect.scoped(
        startNakafa(input).pipe(Effect.provideService(NakafaProcess, processes))
      ).pipe(Effect.flip)
    );

    expect(bind).toMatchObject({ reason: "start" });
    expect(address).toMatchObject({ reason: "start" });
    expect(external).toMatchObject({ reason: "start" });
  });

  it("fails a port close error and cancels an unfinished reservation", async () => {
    const input = await makeStartInput();
    const capture: { input?: NakafaProcessInput } = {};
    const processes = makeProcess(
      capture,
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
    const close = await Effect.runPromise(
      Effect.scoped(
        startNakafa(input).pipe(Effect.provideService(NakafaProcess, processes))
      ).pipe(Effect.flip)
    );
    vi.restoreAllMocks();
    vi.spyOn(Server.prototype, "listen").mockImplementationOnce(function (
      this: Server
    ) {
      return this;
    });
    const cancelled = await Effect.runPromise(
      Effect.scoped(
        startNakafa(input).pipe(Effect.provideService(NakafaProcess, processes))
      ).pipe(Effect.timeout("1 millis"), Effect.flip)
    );

    expect(close).toMatchObject({ reason: "start" });
    expect(cancelled._tag).toBe("TimeoutException");
  });
});
