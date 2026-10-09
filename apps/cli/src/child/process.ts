import { terminateProcessGroup } from "@nakafa/aksara-utilities/process/group";
import { Context, Deferred, Effect, Layer, Schema } from "effect";
import { ChildProcess, ChildProcessSpawner } from "effect/process";
import type * as Scope from "effect/Scope";
import { makeNakafaAppError, type NakafaAppError } from "#cli/error";

const TERMINATION_GRACE = "2 seconds";
const TERMINATION_LIMIT = "1 second";

const NakafaProcessInputSchema = Schema.Struct({
  args: Schema.Array(Schema.String),
  command: Schema.String,
  environment: Schema.Record(Schema.String, Schema.String),
  root: Schema.String,
});

/** Exact operating-system process request with no implicit environment. */
export type NakafaProcessInput = typeof NakafaProcessInputSchema.Type;

/** Scoped child process whose exit can be observed exactly once. */
export interface RunningProcess {
  readonly exitCode: Effect.Effect<number, NakafaAppError>;
}

/** Infrastructure boundary that starts one environment-isolated Nakafa child. */
export class NakafaProcess extends Context.Service<
  NakafaProcess,
  {
    /** Starts one process using exactly the supplied environment entries. */
    readonly start: (
      input: NakafaProcessInput
    ) => Effect.Effect<RunningProcess, NakafaAppError, Scope.Scope>;
  }
>()("AksaraCliNakafaProcess") {}

/** Opens one process in its own group and records its exit before returning control. */
const openProcess = Effect.fn("AksaraCli.openNakafaProcess")(function* (
  input: NakafaProcessInput
) {
  const child = yield* ChildProcess.make(input.command, input.args, {
    cwd: input.root,
    detached: true,
    env: input.environment,
    extendEnv: false,
    shell: false,
    stderr: "inherit",
    stdin: "inherit",
    stdout: "inherit",
  }).pipe(Effect.mapError(() => makeNakafaAppError("start", false)));
  const { pid } = child;
  if (!(Number.isSafeInteger(pid) && pid > 0)) {
    return yield* makeNakafaAppError("start", false);
  }
  const exit = yield* Deferred.make<number, NakafaAppError>();
  // A signal fails exitCode, which is the signal exit of this process.
  yield* Deferred.complete(
    exit,
    child.exitCode.pipe(
      Effect.mapError(() => makeNakafaAppError("exit", false))
    )
  ).pipe(Effect.forkScoped);
  return { exit, pid };
});

/** Starts one scoped child and converts signal termination into a typed error. */
const startProcess = Effect.fn("AksaraCli.startNakafaProcess")(
  (input: NakafaProcessInput) =>
    Effect.acquireRelease(openProcess(input), (opened) =>
      terminateProcessGroup({
        ...opened,
        grace: TERMINATION_GRACE,
        limit: TERMINATION_LIMIT,
      })
    ).pipe(Effect.map(({ exit }) => ({ exitCode: Deferred.await(exit) })))
);

/** Node implementation that never merges the parent process environment. */
export const NakafaProcessLive = Layer.effect(
  NakafaProcess,
  Effect.gen(function* () {
    const spawner = yield* ChildProcessSpawner.ChildProcessSpawner;
    return NakafaProcess.of({
      start: (input) =>
        startProcess(input).pipe(
          Effect.provideService(
            ChildProcessSpawner.ChildProcessSpawner,
            spawner
          )
        ),
    });
  })
);
