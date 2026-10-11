import assert from "node:assert/strict";
import { Array as Arr, Effect, Option, Stream } from "effect";
import { ChildProcess } from "effect/process";
import { decodeWorkflow } from "#scripts/workflow/decode";

/** Reads the shell program of one named step of the publication job. */
export function operateStepProgram(release: string, name: string): string {
  const job = decodeWorkflow(release).jobs.operate;
  assert.ok(job, "The publication job must exist");
  const step = Arr.findFirst(job.steps, (candidate) => candidate.name === name);
  assert.ok(
    Option.isSome(step) && step.value.run !== undefined,
    `The publication step ${name} must run a shell program`
  );
  return step.value.run;
}

/** Runs one shell program the way the runner does and reports how it ended. */
export const runProgram = Effect.fn("WorkflowTestStep.run")(function* (
  program: string,
  env: Readonly<Record<string, string>>
) {
  return yield* Effect.scoped(
    Effect.gen(function* () {
      const command = yield* ChildProcess.make(
        "bash",
        ["--noprofile", "--norc", "-e", "-c", program],
        { env, extendEnv: true }
      );
      const [exitCode, stderr] = yield* Effect.all(
        [
          command.exitCode,
          command.stderr.pipe(Stream.decodeText(), Stream.mkString),
          Stream.runDrain(command.stdout),
        ],
        { concurrency: 3 }
      );
      return { exitCode, stderr };
    })
  );
});
