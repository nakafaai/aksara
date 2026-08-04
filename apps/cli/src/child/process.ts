import { spawn } from "node:child_process";
import { terminateProcessGroup } from "@nakafa/aksara-utilities/process/group";
import { Context, Deferred, Effect, Layer } from "effect";
import type * as Scope from "effect/Scope";
import { makeNakafaAppError, type NakafaAppError } from "#cli/app-error";

const TERMINATION_GRACE = "2 seconds";
const TERMINATION_LIMIT = "1 second";

/** Exact operating-system process request with no implicit environment. */
export interface NakafaProcessInput {
  readonly args: readonly string[];
  readonly command: string;
  readonly environment: Readonly<Record<string, string>>;
  readonly root: string;
}

/** Scoped child process whose exit can be observed exactly once. */
export interface RunningProcess {
  readonly exitCode: Effect.Effect<number, NakafaAppError>;
}

/** Infrastructure boundary that starts one environment-isolated Nakafa child. */
export class NakafaProcess extends Context.Tag("AksaraCliNakafaProcess")<
  NakafaProcess,
  {
    /** Starts one process using exactly the supplied environment entries. */
    readonly start: (
      input: NakafaProcessInput
    ) => Effect.Effect<RunningProcess, NakafaAppError, Scope.Scope>;
  }
>() {}

/** Opens one process and records exit before returning control to its caller. */
const openProcess = Effect.fn("AksaraCli.openNakafaProcess")(function* (
  input: NakafaProcessInput
) {
  const exit = yield* Deferred.make<number | null, NakafaAppError>();
  const child = yield* Effect.try({
    catch: () => makeNakafaAppError("start", false),
    try: () =>
      spawn(input.command, input.args, {
        cwd: input.root,
        detached: true,
        env: input.environment,
        shell: false,
        stdio: "inherit",
      }),
  });
  yield* Effect.async<void, NakafaAppError>((resume) => {
    child.once("error", () => {
      Deferred.unsafeDone(exit, Effect.fail(makeNakafaAppError("exit", false)));
      resume(Effect.fail(makeNakafaAppError("start", false)));
    });
    child.once("exit", (code) => {
      Deferred.unsafeDone(exit, Effect.succeed(code));
    });
    child.once("spawn", () => resume(Effect.void));
  });
  const pid = Number(child.pid);
  if (!(Number.isSafeInteger(pid) && pid > 0)) {
    return yield* makeNakafaAppError("start", false);
  }
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
    ).pipe(
      Effect.map(({ exit }) => ({
        exitCode: Deferred.await(exit).pipe(
          Effect.flatMap((code) =>
            code === null
              ? Effect.fail(makeNakafaAppError("exit", false))
              : Effect.succeed(code)
          )
        ),
      }))
    )
);

/** Node implementation that never merges the parent process environment. */
export const NakafaProcessLive = Layer.succeed(
  NakafaProcess,
  NakafaProcess.of({ start: startProcess })
);
