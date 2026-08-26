import { NodeServices } from "@effect/platform-node";
import { assert, describe, it } from "@effect/vitest";
import {
  Effect,
  Fiber,
  FileSystem,
  Option,
  Path,
  Schedule,
  Schema,
} from "effect";
import {
  ExactProcess,
  type ExactProcessInput,
  ExactProcessLive,
} from "#utilities/process/exact";

const OUTPUT_LIMIT = 512 * 1024;
const ProcessIdSchema = Schema.FiniteFromString.pipe(
  Schema.check(Schema.isInt(), Schema.isGreaterThan(0))
);

/** Creates one exact Node process request with independently overridable fields. */
function nodeInput(
  source: string,
  overrides: Partial<ExactProcessInput> = {}
): ExactProcessInput {
  return {
    args: ["-e", source],
    environment: {},
    executable: process.execPath,
    root: process.cwd(),
    stderrLimit: OUTPUT_LIMIT,
    stdoutLimit: OUTPUT_LIMIT,
    ...overrides,
  };
}

/** Runs one process through the live direct-Node service. */
const runLive = Effect.fn("ExactProcessTest.runLive")(
  (input: ExactProcessInput) =>
    ExactProcess.pipe(
      Effect.flatMap((exactProcess) => exactProcess.run(input)),
      Effect.provide(ExactProcessLive)
    )
);

/** Returns one typed failure from the live direct-Node service. */
const rejectLive = Effect.fn("ExactProcessTest.rejectLive")(
  (input: ExactProcessInput) => runLive(input).pipe(Effect.flip)
);

/** Waits until a spawned test process has written its own process identifier. */
const waitForPid = Effect.fn("ExactProcessTest.waitForPid")(function* (
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
  const source = yield* fileSystem.readFileString(file, "utf8");
  return yield* Schema.decodeEffect(ProcessIdSchema)(source);
});

describe("ExactProcess", () => {
  it.live(
    "uses only supplied environment values and drains both pipes concurrently",
    () =>
      Effect.gen(function* () {
        const output = yield* runLive(
          nodeInput(
            [
              'const chunk = "x".repeat(128 * 1024);',
              "process.stdout.write(chunk);",
              "process.stderr.write(chunk);",
              "process.stdout.write(JSON.stringify(process.env));",
            ].join(""),
            { environment: { AKSARA_SENTINEL: "exact" } }
          )
        );

        assert.strictEqual(output.exitCode, 0);
        assert.strictEqual(output.stderr.byteLength, 128 * 1024);
        const environment = new TextDecoder()
          .decode(output.stdout)
          .slice(128 * 1024);
        assert.ok(environment.includes('"AKSARA_SENTINEL":"exact"'));
        assert.ok(!environment.includes('"PATH"'));
      })
  );

  it.live("returns bounded stdout, stderr, and nonzero exit evidence", () =>
    Effect.gen(function* () {
      const output = yield* runLive(
        nodeInput(
          'process.stdout.write("out");process.stderr.write("err");process.exit(7);'
        )
      );

      assert.deepStrictEqual(output, {
        exitCode: 7,
        stderr: new TextEncoder().encode("err"),
        stdout: new TextEncoder().encode("out"),
      });
    })
  );

  it.live("writes exact bounded stdin bytes and closes the pipe", () =>
    Effect.gen(function* () {
      const stdin = new TextEncoder().encode("exact-input\0with-bytes");
      const output = yield* runLive(
        nodeInput(
          "const chunks=[];process.stdin.on('data',(chunk)=>chunks.push(chunk));process.stdin.on('end',()=>process.stdout.write(Buffer.concat(chunks)));",
          { stdin }
        )
      );

      assert.deepStrictEqual(output.stdout, stdin);
    })
  );

  it.effect.each([
    [nodeInput("", { executable: "node" }), "executable"],
    [nodeInput("", { root: "relative" }), "root"],
    [nodeInput("", { stdoutLimit: -1 }), "limit"],
    [nodeInput("", { stderrLimit: 1.5 }), "limit"],
  ] as const)("rejects invalid exact input %#", ([input, reason]) =>
    Effect.gen(function* () {
      const failure = yield* rejectLive(input);
      assert.strictEqual(failure.reason, reason);
    })
  );

  it.live("types spawn, stdin, stdout, stderr, and signal failures", () =>
    Effect.gen(function* () {
      const largeInput = new Uint8Array(8 * 1024 * 1024).fill(0x61);
      const failures = yield* Effect.all(
        [
          rejectLive(nodeInput("", { executable: "/aksara/\0invalid" })),
          rejectLive(
            nodeInput("", { executable: "/aksara/missing-executable" })
          ),
          rejectLive(
            nodeInput("process.stdin.destroy();setTimeout(()=>{},100);", {
              stdin: largeInput,
            })
          ),
          rejectLive(
            nodeInput('process.stdout.write("xx");', { stdoutLimit: 1 })
          ),
          rejectLive(
            nodeInput('process.stderr.write("xx");', { stderrLimit: 1 })
          ),
          rejectLive(nodeInput('process.kill(process.pid, "SIGTERM");')),
        ],
        { concurrency: "unbounded" }
      );

      assert.deepStrictEqual(
        failures.map(({ reason }) => reason),
        ["spawn", "spawn", "stdin", "stdout", "stderr", "signal"]
      );
    })
  );

  it.live(
    "terminates an interrupted detached process group within the bound",
    () =>
      Effect.gen(function* () {
        const fileSystem = yield* FileSystem.FileSystem;
        const path = yield* Path.Path;
        const directory = yield* fileSystem.makeTempDirectoryScoped({
          prefix: "aksara-exact-process-",
        });
        const pidFile = path.join(directory, "pid");
        const source = [
          'const fs = require("node:fs");',
          "fs.writeFileSync(process.argv[1], String(process.pid));",
          'process.on("SIGTERM", () => {});',
          "setInterval(() => {}, 1000);",
        ].join("");
        const fiber = yield* runLive(
          nodeInput(source, { args: ["-e", source, pidFile] })
        ).pipe(Effect.forkChild);
        const childPid = yield* waitForPid(pidFile);
        yield* Fiber.interrupt(fiber);

        const running = yield* Effect.try(() => process.kill(childPid, 0)).pipe(
          Effect.option
        );
        assert.ok(Option.isNone(running));
      }).pipe(Effect.provide(NodeServices.layer))
  );
});
