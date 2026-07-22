import { Server } from "node:net";
import type { Command } from "@effect/platform/Command";
import { SystemError } from "@effect/platform/Error";
import { Effect } from "effect";
import { afterEach, describe, expect, it, vi } from "vitest";
import { type NakafaStartInput, startNakafa } from "#cli/child";
import { makePreviewCredentials } from "#cli/credentials";
import type { PreviewProvider } from "#cli/provider";
import { inspectTestCommand, makeTestExecutor } from "#test/command";

const COMMAND_ERROR = new SystemError({
  method: "spawn",
  module: "Command",
  reason: "Unknown",
});

afterEach(() => {
  vi.restoreAllMocks();
});

/** Creates one minimal provider input for the real child-process seam. */
async function makeStartInput(): Promise<NakafaStartInput> {
  const credentials = await Effect.runPromise(makePreviewCredentials());
  const provider: PreviewProvider = {
    eventsPath: "/v1/events",
    failed: () => Effect.void,
    manifestPath: "/v1/manifest",
    origin: new URL("http://127.0.0.1:32123"),
    pending: () => Effect.void,
    ready: () => Effect.void,
  };
  return { credentials, provider, root: "/code/nakafa.com" };
}

describe("Nakafa child process", () => {
  it("passes only the approved preview protocol and reports child exit", async () => {
    const commands: Command[] = [];
    const input = await makeStartInput();
    const executor = makeTestExecutor((started) => {
      commands.push(started);
      return Effect.succeed({ stdout: "" });
    });
    const result = await Effect.runPromise(
      Effect.scoped(
        startNakafa(executor, input).pipe(
          Effect.flatMap((child) =>
            child.awaitExit.pipe(
              Effect.flip,
              Effect.map((exit) => ({ child, exit }))
            )
          )
        )
      )
    );
    const [startedCommand] = commands;
    if (!startedCommand) {
      throw new Error("Expected the Nakafa child command to start.");
    }
    const inspected = inspectTestCommand(startedCommand);

    expect(inspected.args.slice(0, 7)).toEqual([
      "--filter",
      "www",
      "exec",
      "next",
      "dev",
      "--hostname",
      "127.0.0.1",
    ]);
    expect(inspected.args.at(-2)).toBe("--port");
    expect(inspected.args.at(-1)).toBe(result.child.origin.port);
    expect(inspected.cwd).toBe(input.root);
    expect(Object.keys(inspected.environment).sort()).toEqual([
      "AKSARA_PREVIEW_EVENTS_PATH",
      "AKSARA_PREVIEW_KEY_ID",
      "AKSARA_PREVIEW_MANIFEST_PATH",
      "AKSARA_PREVIEW_ORIGIN",
      "AKSARA_PREVIEW_PUBLIC_KEY",
      "AKSARA_PREVIEW_TOKEN",
    ]);
    expect(inspected.environment).toMatchObject({
      AKSARA_PREVIEW_EVENTS_PATH: input.provider.eventsPath,
      AKSARA_PREVIEW_KEY_ID: input.credentials.keyId,
      AKSARA_PREVIEW_MANIFEST_PATH: input.provider.manifestPath,
      AKSARA_PREVIEW_ORIGIN: input.provider.origin.toString(),
      AKSARA_PREVIEW_PUBLIC_KEY: input.credentials.publicKeyPem,
    });
    expect(result.exit).toMatchObject({ reason: "exit", status: 0 });
  });

  it("maps invalid environment, process start, and exit observation", async () => {
    const input = await makeStartInput();
    const invalidInput = {
      ...input,
      provider: { ...input.provider, origin: new URL("https://127.0.0.1") },
    };
    const success = makeTestExecutor(() => Effect.succeed({ stdout: "" }));
    const childEnvironment = await Effect.runPromise(
      Effect.scoped(startNakafa(success, invalidInput)).pipe(Effect.flip)
    );
    const start = await Effect.runPromise(
      Effect.scoped(
        startNakafa(
          makeTestExecutor(() => Effect.fail(COMMAND_ERROR)),
          input
        )
      ).pipe(Effect.flip)
    );
    const exitExecutor = makeTestExecutor(() =>
      Effect.succeed({ exitError: COMMAND_ERROR, stdout: "" })
    );
    const exit = await Effect.runPromise(
      Effect.scoped(
        startNakafa(exitExecutor, input).pipe(
          Effect.flatMap((child) => child.awaitExit),
          Effect.flip
        )
      )
    );

    expect(childEnvironment).toMatchObject({ reason: "child-env" });
    expect(start).toMatchObject({ reason: "start" });
    expect(exit).toMatchObject({ reason: "exit" });
  });

  it("fails when the operating system cannot bind or prove loopback", async () => {
    const input = await makeStartInput();
    const executor = makeTestExecutor(() => Effect.succeed({ stdout: "" }));
    vi.spyOn(Server.prototype, "listen").mockImplementationOnce(function (
      this: Server
    ) {
      queueMicrotask(() => this.emit("error", new Error("Test bind failure.")));
      return this;
    });
    const bind = await Effect.runPromise(
      Effect.scoped(startNakafa(executor, input)).pipe(Effect.flip)
    );
    vi.restoreAllMocks();
    vi.spyOn(Server.prototype, "address").mockReturnValueOnce(null);
    const address = await Effect.runPromise(
      Effect.scoped(startNakafa(executor, input)).pipe(Effect.flip)
    );

    expect(bind).toMatchObject({ reason: "start" });
    expect(address).toMatchObject({ reason: "start" });
  });

  it("fails a port close error and cancels an unfinished reservation", async () => {
    const input = await makeStartInput();
    const executor = makeTestExecutor(() => Effect.succeed({ stdout: "" }));
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
      Effect.scoped(startNakafa(executor, input)).pipe(Effect.flip)
    );
    vi.restoreAllMocks();
    vi.spyOn(Server.prototype, "listen").mockImplementationOnce(function (
      this: Server
    ) {
      return this;
    });
    const cancelled = await Effect.runPromise(
      Effect.scoped(startNakafa(executor, input)).pipe(
        Effect.timeout("1 millis"),
        Effect.flip
      )
    );

    expect(close).toMatchObject({ reason: "start" });
    expect(cancelled._tag).toBe("TimeoutException");
  });
});
