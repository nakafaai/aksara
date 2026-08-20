import { afterEach, describe, expect, it } from "@nakafa/testing/effect";
import { Effect } from "effect";
import { vi } from "vitest";
import {
  NakafaProcess,
  type NakafaProcessInput,
  NakafaProcessLive,
} from "#cli/child/process";

const NODE_ROOT = process.cwd();

const childProcessBehavior = vi.hoisted(() => ({
  enabled: false,
  pid: 0,
}));

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
      if (!childProcessBehavior.enabled) {
        return childProcess.spawn(command, args, options);
      }

      const child = new childProcess.ChildProcess();
      Object.defineProperty(child, "pid", { value: childProcessBehavior.pid });
      setImmediate(() => child.emit("spawn"));
      return child;
    },
  };
});

afterEach(() => {
  childProcessBehavior.enabled = false;
  childProcessBehavior.pid = 0;
  vi.restoreAllMocks();
  vi.unstubAllEnvs();
});

/** Builds one real scoped operating-system child through the production layer. */
function processProgram(input: NakafaProcessInput) {
  return Effect.scoped(
    NakafaProcess.pipe(
      Effect.flatMap((processes) => processes.start(input)),
      Effect.flatMap((child) => child.exitCode)
    )
  ).pipe(Effect.provide(NakafaProcessLive));
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

describe("Nakafa process infrastructure", () => {
  it("passes exactly the supplied environment to a real operating-system child", async () => {
    vi.stubEnv("AKSARA_TEST_PARENT_SECRET", "must-not-cross");
    const status = await Effect.runPromise(
      processProgram(
        nodeProcess(
          [
            "const isolated =",
            "  process.env.AKSARA_TEST_PARENT_SECRET === undefined;",
            'const allowed = process.env.AKSARA_TEST_ALLOWED === "visible";',
            "process.exit(isolated && allowed ? 0 : 23);",
          ].join("\n"),
          { AKSARA_TEST_ALLOWED: "visible" }
        )
      )
    );

    expect(status).toBe(0);
  });

  it("maps synchronous and asynchronous process startup failures", async () => {
    const invalidRoot = { ...nodeProcess("process.exit(0);"), root: "\0" };
    const synchronous = await Effect.runPromise(
      processProgram(invalidRoot).pipe(Effect.flip)
    );
    const asynchronous = await Effect.runPromise(
      processProgram({
        args: [],
        command: "/aksara/missing-command",
        environment: {},
        root: NODE_ROOT,
      }).pipe(Effect.flip)
    );

    expect(synchronous).toMatchObject({ reason: "start" });
    expect(asynchronous).toMatchObject({ reason: "start" });
  });

  it("rejects a spawned process without a valid operating-system identifier", async () => {
    childProcessBehavior.enabled = true;
    childProcessBehavior.pid = 0;

    const failure = await Effect.runPromise(
      processProgram(nodeProcess("process.exit(0);")).pipe(Effect.flip)
    );

    expect(failure).toMatchObject({ reason: "start" });
  });

  it("reports signal termination and closes a running child with its scope", async () => {
    const signal = await Effect.runPromise(
      processProgram(nodeProcess('process.kill(process.pid, "SIGTERM");')).pipe(
        Effect.flip
      )
    );
    const closed = await Effect.runPromise(
      Effect.scoped(
        NakafaProcess.pipe(
          Effect.flatMap((processes) =>
            processes.start(nodeProcess("setInterval(() => undefined, 1_000);"))
          ),
          Effect.as("closed")
        )
      ).pipe(Effect.provide(NakafaProcessLive))
    );

    expect(signal).toMatchObject({ reason: "exit" });
    expect(closed).toBe("closed");
  });
});
