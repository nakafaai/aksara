import { Array as Arr, Effect, Option, Stream } from "effect";
import { ChildProcess } from "effect/process";
import { decodeWorkflow } from "#scripts/workflow/decode";
import { WorkflowError } from "#scripts/workflow/requirement";

/** Reads the shell program of one named step of the contracts job, where the dispatch guards run. */
export const contractsStepProgram = Effect.fn(
  "WorkflowTestStep.contractsStepProgram"
)(function* (release: string, name: string) {
  const { jobs } = yield* decodeWorkflow(release);
  const job = jobs.contracts;
  if (job === undefined) {
    return yield* new WorkflowError({
      message: "The contracts job must exist",
    });
  }
  const step = Arr.findFirst(job.steps, (candidate) => candidate.name === name);
  if (Option.isNone(step) || step.value.run === undefined) {
    return yield* new WorkflowError({
      message: `The contracts step ${name} must run a shell program`,
    });
  }
  return step.value.run;
});

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
