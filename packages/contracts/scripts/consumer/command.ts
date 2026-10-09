import { Effect, Stream } from "effect";
import { ChildProcess } from "effect/process";
import { consumerError, consumerFailure } from "#scripts/consumer/tools";

/** Resolves the platform-specific executable name without invoking a shell. */
export function executablePath(executable: string, platform: NodeJS.Platform) {
  return platform === "win32" ? `${executable}.cmd` : executable;
}

/** Runs one consumer command without a shell and fails unless it exits with code zero. */
export const runConsumerCommand = Effect.fn(
  "AksaraContracts.runConsumerCommand"
)(
  (
    executable: string,
    args: readonly string[],
    environment: NodeJS.ProcessEnv,
    platform: NodeJS.Platform,
    stage: string,
    cwd?: string
  ) =>
    Effect.gen(function* () {
      const exitCode = yield* ChildProcess.make(
        executablePath(executable, platform),
        args,
        {
          cwd,
          env: environment,
          extendEnv: false,
          stderr: "inherit",
          stdin: "inherit",
          stdout: "inherit",
        }
      ).pipe(
        Effect.flatMap((child) => child.exitCode),
        Effect.mapError(consumerFailure("process", `${stage} command failed`)),
        Effect.scoped
      );
      if (exitCode !== 0) {
        return yield* consumerError(
          "process",
          `${stage} exited unsuccessfully with code ${exitCode}`,
          { exitCode }
        );
      }
    })
);

/**
 * Runs one consumer command that reads standard input. It returns the standard
 * output when the command exits with code zero, and otherwise fails with the
 * exit code and the trimmed standard error.
 */
export const readConsumerCommand = Effect.fn(
  "AksaraContracts.readConsumerCommand"
)(function* (command: {
  readonly args: readonly string[];
  readonly cwd?: string | undefined;
  readonly environment: NodeJS.ProcessEnv;
  readonly executable: string;
  readonly input: string;
  readonly platform: NodeJS.Platform;
  readonly stage: string;
}) {
  const output = yield* ChildProcess.make(
    executablePath(command.executable, command.platform),
    command.args,
    {
      cwd: command.cwd,
      env: command.environment,
      extendEnv: false,
      stderr: "pipe",
      stdin: Stream.encodeText(Stream.make(command.input)),
      stdout: "pipe",
    }
  ).pipe(
    Effect.flatMap((child) =>
      Effect.all(
        {
          exitCode: child.exitCode,
          stderr: Stream.mkString(Stream.decodeText(child.stderr)),
          stdout: Stream.mkString(Stream.decodeText(child.stdout)),
        },
        { concurrency: "unbounded" }
      )
    ),
    Effect.mapError(
      consumerFailure("process", `${command.stage} command failed`)
    ),
    Effect.scoped
  );
  if (output.exitCode !== 0) {
    return yield* consumerError(
      "process",
      `${command.stage} exited unsuccessfully with code ${output.exitCode}: ${output.stderr.trim()}`,
      { exitCode: output.exitCode, stderr: output.stderr }
    );
  }
  return output.stdout;
});
