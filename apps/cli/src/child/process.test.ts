import { NodeServices } from "@effect/platform-node";
import { afterEach, describe, expect, it } from "@effect/vitest";
import { Effect, FileSystem, Layer, Option, Path, Schedule } from "effect";
import { ChildProcessSpawner } from "effect/process";
import {
  NakafaProcess,
  type NakafaProcessInput,
  NakafaProcessLive,
} from "#cli/child/process";

const NODE_ROOT = process.cwd();

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllEnvs();
});

/** The live process layer with the Node services it requires. */
const LiveNakafaProcess = NakafaProcessLive.pipe(
  Layer.provide(NodeServices.layer)
);

/** Builds one real scoped operating-system child through the production layer. */
function processProgram(input: NakafaProcessInput) {
  return Effect.scoped(
    NakafaProcess.pipe(
      Effect.flatMap((processes) => processes.start(input)),
      Effect.flatMap((child) => child.exitCode)
    )
  ).pipe(Effect.provide(LiveNakafaProcess));
}

/** Creates one exact Node child request without inheriting test-process state. */
function nodeProcess(
  source: string,
  environment: Readonly<Record<string, string>> = {}
): NakafaProcessInput {
  return {
    args: ["--input-type=module", "--eval", source],
    command: process.execPath,
    environment,
    root: NODE_ROOT,
  };
}

/** Wraps the real spawner so that every child reports the invalid identifier zero. */
const zeroIdentifierSpawner = Effect.gen(function* () {
  const spawner = yield* ChildProcessSpawner.ChildProcessSpawner;
  return ChildProcessSpawner.make((command) =>
    spawner.spawn(command).pipe(
      Effect.map((handle) => ({
        ...handle,
        pid: ChildProcessSpawner.ProcessId(0),
      }))
    )
  );
});

/** Waits until the spawned child has written its own process identifier. */
const waitForPid = Effect.fn("NakafaProcessTest.waitForPid")(function* (
  file: string
) {
  const fileSystem = yield* FileSystem.FileSystem;
  yield* fileSystem.exists(file).pipe(
    Effect.repeat({
      schedule: Schedule.spaced("10 millis"),
      while: (exists) => !exists,
    }),
    Effect.timeout("1 second")
  );
  return Number(yield* fileSystem.readFileString(file, "utf8"));
});

describe("Nakafa process infrastructure", () => {
  it.effect(
    "passes exactly the supplied environment to a real operating-system child",
    () =>
      Effect.gen(function* () {
        vi.stubEnv("AKSARA_TEST_PARENT_SECRET", "must-not-cross");
        const status = yield* processProgram(
          nodeProcess(
            [
              "const isolated =",
              "  process.env.AKSARA_TEST_PARENT_SECRET === undefined;",
              'const allowed = process.env.AKSARA_TEST_ALLOWED === "visible";',
              "process.exit(isolated && allowed ? 0 : 23);",
            ].join("\n"),
            { AKSARA_TEST_ALLOWED: "visible" }
          )
        );

        expect(status).toBe(0);
      })
  );

  it.effect("maps synchronous and asynchronous process startup failures", () =>
    Effect.gen(function* () {
      const invalidRoot = { ...nodeProcess("process.exit(0);"), root: "\0" };
      const synchronous = yield* processProgram(invalidRoot).pipe(Effect.flip);
      const asynchronous = yield* processProgram({
        args: [],
        command: "/aksara/missing-command",
        environment: {},
        root: NODE_ROOT,
      }).pipe(Effect.flip);

      expect(synchronous).toMatchObject({ reason: "start" });
      expect(asynchronous).toMatchObject({ reason: "start" });
    })
  );

  it.effect(
    "rejects a spawned process without a valid operating-system identifier",
    () =>
      Effect.gen(function* () {
        const zeroIdentifier = yield* zeroIdentifierSpawner;
        const failure = yield* Effect.scoped(
          NakafaProcess.pipe(
            Effect.flatMap((processes) =>
              processes.start(nodeProcess("process.exit(0);"))
            )
          )
        ).pipe(
          Effect.provide(
            NakafaProcessLive.pipe(
              Layer.provide(
                Layer.succeed(
                  ChildProcessSpawner.ChildProcessSpawner,
                  zeroIdentifier
                )
              )
            )
          ),
          Effect.flip
        );

        expect(failure).toMatchObject({ reason: "start" });
      }).pipe(Effect.provide(NodeServices.layer))
  );

  it.effect(
    "reports signal termination and closes a running child with its scope",
    () =>
      Effect.gen(function* () {
        const signal = yield* processProgram(
          nodeProcess('process.kill(process.pid, "SIGTERM");')
        ).pipe(Effect.flip);
        const closed = yield* Effect.scoped(
          NakafaProcess.pipe(
            Effect.flatMap((processes) =>
              processes.start(
                nodeProcess("setInterval(() => undefined, 1_000);")
              )
            ),
            Effect.as("closed")
          )
        ).pipe(Effect.provide(LiveNakafaProcess));

        expect(signal).toMatchObject({ reason: "exit" });
        expect(closed).toBe("closed");
      })
  );

  it.live("terminates the child process when its scope closes", () =>
    Effect.gen(function* () {
      const fileSystem = yield* FileSystem.FileSystem;
      const path = yield* Path.Path;
      const directory = yield* fileSystem.makeTempDirectoryScoped({
        prefix: "aksara-child-process-",
      });
      const pidFile = path.join(directory, "pid");
      const source = [
        'import { writeFileSync } from "node:fs";',
        "writeFileSync(process.argv[1], String(process.pid));",
        "setInterval(() => undefined, 1_000);",
      ].join("\n");
      const childPid = yield* Effect.scoped(
        Effect.gen(function* () {
          const processes = yield* NakafaProcess;
          yield* processes.start({
            ...nodeProcess(source),
            args: ["--input-type=module", "--eval", source, pidFile],
          });
          return yield* waitForPid(pidFile);
        })
      ).pipe(Effect.provide(LiveNakafaProcess));

      const running = yield* Effect.try(() => process.kill(childPid, 0)).pipe(
        Effect.option
      );
      expect(Option.isNone(running)).toBe(true);
    }).pipe(Effect.provide(NodeServices.layer))
  );
});
