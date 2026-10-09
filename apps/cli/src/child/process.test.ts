import { afterEach, describe, expect, it } from "@effect/vitest";
import { Effect, Fiber, Schema } from "effect";
import { NakafaProcess, NakafaProcessLive } from "#cli/child/process";
import {
  childHandleReferenced,
  ISOLATION_CHILD,
  nodeProcess,
  processProgram,
  REPORTING_CHILD,
  readChildReport,
  signalReaches,
  TERMINATION_IGNORING_CHILD,
  tempFile,
  WAITING_CHILD,
  waitForChildHandleRelease,
  withNodeFiles,
  withoutSystemVariables,
  withProcess,
  withPublishingProcess,
} from "#test/process";

/** Signals to this identifier are always mocked, so no operating-system process can be reached. */
const FAKE_PID = 424_242;

const ChildProcessBehaviorSchema = Schema.Struct({
  enabled: Schema.mutableKey(Schema.Boolean),
  pid: Schema.mutableKey(Schema.Finite),
  stdio: Schema.mutableKey(Schema.UndefinedOr(Schema.Unknown)),
  throwOnSpawn: Schema.mutableKey(Schema.Boolean),
});
type ChildProcessBehavior = typeof ChildProcessBehaviorSchema.Type;
const childProcessBehavior = vi.hoisted(
  (): ChildProcessBehavior => ({
    enabled: false,
    pid: 0,
    stdio: undefined,
    throwOnSpawn: false,
  })
);

vi.mock("node:child_process", async (importOriginal) => {
  const childProcess =
    await importOriginal<typeof import("node:child_process")>();

  return {
    ...childProcess,
    /** Substitutes a controllable child only for process lifecycle edge cases. */
    spawn(
      command: string,
      args: readonly string[],
      options: import("node:child_process").SpawnOptions
    ) {
      childProcessBehavior.stdio = options.stdio;
      if (childProcessBehavior.throwOnSpawn) {
        throw new Error("Synchronous spawn failure.");
      }
      if (!childProcessBehavior.enabled) {
        return childProcess.spawn(command, args, options);
      }

      const child = new childProcess.ChildProcess();
      Object.defineProperty(child, "pid", { value: childProcessBehavior.pid });
      /** A real child reports "spawn" after the caller subscribes; this one answers the subscription. */
      child.on("newListener", (event, listener) =>
        event === "spawn" ? listener() : undefined
      );
      return child;
    },
  };
});

afterEach(() => {
  childProcessBehavior.enabled = false;
  childProcessBehavior.pid = 0;
  childProcessBehavior.stdio = undefined;
  childProcessBehavior.throwOnSpawn = false;
  vi.restoreAllMocks();
  vi.unstubAllEnvs();
});

describe("Nakafa process infrastructure", () => {
  it.effect(
    "passes exactly the supplied environment to a real operating-system child",
    () =>
      Effect.gen(function* () {
        vi.stubEnv("AKSARA_TEST_PARENT_SECRET", "must-not-cross");
        const status = yield* processProgram(
          nodeProcess(ISOLATION_CHILD, { AKSARA_TEST_ALLOWED: "visible" })
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
        root: process.cwd(),
      }).pipe(Effect.flip);

      expect(synchronous).toMatchObject({ reason: "start" });
      expect(asynchronous).toMatchObject({ reason: "start" });
    })
  );

  it.effect(
    "rejects a spawned process without a valid operating-system identifier",
    () =>
      Effect.gen(function* () {
        childProcessBehavior.enabled = true;
        childProcessBehavior.pid = 0;

        const failure = yield* processProgram(
          nodeProcess("process.exit(0);")
        ).pipe(Effect.flip);

        expect(failure).toMatchObject({ reason: "start" });
      })
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
        ).pipe(Effect.provide(NakafaProcessLive));

        expect(signal).toMatchObject({ reason: "exit" });
        expect(closed).toBe("closed");
      })
  );
});

describe("Nakafa child lifetime", () => {
  it.live("sends no signal after a child exits normally", () =>
    Effect.gen(function* () {
      const kill = vi.spyOn(process, "kill").mockImplementation(() => true);

      const status = yield* processProgram(nodeProcess("process.exit(0);"));

      expect(status).toBe(0);
      expect(kill).not.toHaveBeenCalled();
    })
  );

  it.live("sends no signal to the group on a non-zero exit", () =>
    Effect.gen(function* () {
      const kill = vi.spyOn(process, "kill").mockImplementation(() => true);

      const observed = yield* withProcess(
        nodeProcess("process.exit(3);"),
        (child) =>
          child.exitCode.pipe(
            Effect.map((status) => ({
              signalsWhileOpen: kill.mock.calls.length,
              status,
            }))
          )
      );

      expect(observed).toEqual({ signalsWhileOpen: 0, status: 3 });
      expect(kill).not.toHaveBeenCalled();
    })
  );

  it.live("closes a child that ignores SIGTERM within the bounded limits", () =>
    Effect.gen(function* () {
      const pid = yield* withPublishingProcess(
        TERMINATION_IGNORING_CHILD,
        (_child, published) => Effect.succeed(published)
      ).pipe(Effect.timeout("8 seconds"));

      expect(yield* signalReaches(pid)).toBe(false);
      expect(yield* signalReaches(-pid)).toBe(false);
    })
  );

  it.live("returns from scope close when the leader never exits", () =>
    Effect.gen(function* () {
      childProcessBehavior.enabled = true;
      childProcessBehavior.pid = FAKE_PID;
      const kill = vi.spyOn(process, "kill").mockImplementation(() => true);

      yield* withProcess(nodeProcess("process.exit(0);"), () => Effect.void);

      expect(kill.mock.calls).toEqual([
        [-FAKE_PID, "SIGTERM"],
        [-FAKE_PID, "SIGKILL"],
      ]);
    })
  );

  it.effect("maps a synchronous spawn failure to the start error", () =>
    Effect.gen(function* () {
      childProcessBehavior.throwOnSpawn = true;

      const failure = yield* processProgram(
        nodeProcess("process.exit(0);")
      ).pipe(Effect.flip);

      expect(failure).toMatchObject({ reason: "start" });
    })
  );

  it.live("starts the child as the leader of its own process group", () =>
    Effect.gen(function* () {
      const observed = yield* withPublishingProcess(
        WAITING_CHILD,
        (_child, pid) =>
          signalReaches(-pid).pipe(
            Effect.map((leadsGroup) => ({ leadsGroup, pid }))
          )
      );

      expect(observed.leadsGroup).toBe(true);
      expect(yield* signalReaches(observed.pid)).toBe(false);
    })
  );

  it.live(
    "gives the child exactly its environment and inherits its streams",
    () =>
      withNodeFiles(
        Effect.gen(function* () {
          const reportFile = yield* tempFile("report");
          vi.stubEnv("AKSARA_TEST_PARENT_ONLY", "parent-only");

          const status = yield* processProgram(
            nodeProcess(REPORTING_CHILD, { AKSARA_TEST_ALLOWED: "visible" }, [
              reportFile,
            ])
          );
          const report = yield* readChildReport(reportFile);

          expect(status).toBe(0);
          expect(withoutSystemVariables(report.environment)).toEqual({
            AKSARA_TEST_ALLOWED: "visible",
          });
          expect(childProcessBehavior.stdio).toBe("inherit");
        })
      )
  );

  it.live("keeps the parent referenced while it waits for a child", () =>
    Effect.gen(function* () {
      const observed = yield* withProcess(
        nodeProcess("setTimeout(() => process.exit(0), 300);"),
        (child) =>
          Effect.gen(function* () {
            const referencedWhileRunning = childHandleReferenced();
            return { referencedWhileRunning, status: yield* child.exitCode };
          })
      );

      expect(observed).toEqual({ referencedWhileRunning: true, status: 0 });
      expect(yield* waitForChildHandleRelease).toBe(true);
    })
  );

  it.live("gives every exit awaiter the real exit, also after release", () =>
    Effect.gen(function* () {
      const awaiting = yield* withPublishingProcess(
        TERMINATION_IGNORING_CHILD,
        (child, pid) =>
          Effect.gen(function* () {
            const concurrent = yield* child.exitCode.pipe(
              Effect.flip,
              Effect.forkChild
            );
            return { child, concurrent, pid };
          })
      );

      const concurrent = yield* Fiber.join(awaiting.concurrent).pipe(
        Effect.timeout("5 seconds")
      );
      const late = yield* awaiting.child.exitCode.pipe(
        Effect.flip,
        Effect.timeout("5 seconds")
      );

      expect(concurrent).toMatchObject({ reason: "exit" });
      expect(late).toMatchObject({ reason: "exit" });
      expect(yield* signalReaches(awaiting.pid)).toBe(false);
    })
  );
});
