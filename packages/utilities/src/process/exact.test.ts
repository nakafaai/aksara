import { existsSync, readFileSync, unlinkSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { Effect, Fiber } from "effect";
import { describe, expect, it, vi } from "vitest";
import {
  ExactProcess,
  type ExactProcessInput,
  ExactProcessLive,
} from "#utilities/process/exact";

const OUTPUT_LIMIT = 512 * 1024;

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
function runLive(input: ExactProcessInput) {
  return Effect.runPromise(
    ExactProcess.pipe(
      Effect.flatMap((exactProcess) => exactProcess.run(input)),
      Effect.provide(ExactProcessLive)
    )
  );
}

/** Returns one typed failure from the live direct-Node service. */
function rejectLive(input: ExactProcessInput) {
  return Effect.runPromise(
    ExactProcess.pipe(
      Effect.flatMap((exactProcess) => exactProcess.run(input)),
      Effect.provide(ExactProcessLive),
      Effect.flip
    )
  );
}

/** Waits until a spawned test process has written its own process identifier. */
async function waitForPid(file: string) {
  await vi.waitFor(() => expect(existsSync(file)).toBe(true), {
    interval: 10,
    timeout: 1000,
  });
  return Number(readFileSync(file, "utf8"));
}

describe("ExactProcess", () => {
  it("uses only supplied environment values and drains both pipes concurrently", async () => {
    const output = await runLive(
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

    expect(output.exitCode).toBe(0);
    expect(output.stderr.byteLength).toBe(128 * 1024);
    const environment = new TextDecoder()
      .decode(output.stdout)
      .slice(128 * 1024);
    expect(environment).toContain('"AKSARA_SENTINEL":"exact"');
    expect(environment).not.toContain('"PATH"');
  });

  it("returns bounded stdout, stderr, and nonzero exit evidence", async () => {
    const output = await runLive(
      nodeInput(
        'process.stdout.write("out");process.stderr.write("err");process.exit(7);'
      )
    );

    expect(output).toEqual({
      exitCode: 7,
      stderr: new TextEncoder().encode("err"),
      stdout: new TextEncoder().encode("out"),
    });
  });

  it("writes exact bounded stdin bytes and closes the pipe", async () => {
    const stdin = new TextEncoder().encode("exact-input\0with-bytes");
    const output = await runLive(
      nodeInput(
        "const chunks=[];process.stdin.on('data',(chunk)=>chunks.push(chunk));process.stdin.on('end',()=>process.stdout.write(Buffer.concat(chunks)));",
        { stdin }
      )
    );

    expect(output.stdout).toEqual(stdin);
  });

  it.each([
    [nodeInput("", { executable: "node" }), "executable"],
    [nodeInput("", { root: "relative" }), "root"],
    [nodeInput("", { stdoutLimit: -1 }), "limit"],
    [nodeInput("", { stderrLimit: 1.5 }), "limit"],
  ] as const)("rejects invalid exact input %#", async (input, reason) => {
    await expect(rejectLive(input)).resolves.toMatchObject({ reason });
  });

  it("types spawn, stdin, stdout, stderr, and signal failures", async () => {
    const largeInput = new Uint8Array(8 * 1024 * 1024).fill(0x61);
    const failures = await Promise.all([
      rejectLive(nodeInput("", { executable: "/aksara/\0invalid" })),
      rejectLive(nodeInput("", { executable: "/aksara/missing-executable" })),
      rejectLive(
        nodeInput("process.stdin.destroy();setTimeout(()=>{},100);", {
          stdin: largeInput,
        })
      ),
      rejectLive(nodeInput('process.stdout.write("xx");', { stdoutLimit: 1 })),
      rejectLive(nodeInput('process.stderr.write("xx");', { stderrLimit: 1 })),
      rejectLive(nodeInput('process.kill(process.pid, "SIGTERM");')),
    ]);

    expect(failures.map(({ reason }) => reason)).toEqual([
      "spawn",
      "spawn",
      "stdin",
      "stdout",
      "stderr",
      "signal",
    ]);
  });

  it("terminates an interrupted detached process group within the bound", async () => {
    const pidFile = join(
      tmpdir(),
      `aksara-exact-process-${process.pid}-${Date.now()}.pid`
    );
    const source = [
      'const fs = require("node:fs");',
      "fs.writeFileSync(process.argv[1], String(process.pid));",
      'process.on("SIGTERM", () => {});',
      "setInterval(() => {}, 1000);",
    ].join("");
    const fiber = Effect.runFork(
      ExactProcess.pipe(
        Effect.flatMap((exactProcess) =>
          exactProcess.run(nodeInput(source, { args: ["-e", source, pidFile] }))
        ),
        Effect.provide(ExactProcessLive)
      )
    );
    const childPid = await waitForPid(pidFile);
    await Effect.runPromise(Fiber.interrupt(fiber));

    expect(() => process.kill(childPid, 0)).toThrow();
    unlinkSync(pidFile);
  });
});
