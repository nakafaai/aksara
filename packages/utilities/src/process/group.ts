import { Deferred, Effect, Option, Schema } from "effect";
import type * as Duration from "effect/Duration";

const ProcessGroupSchema = Schema.Struct({
  pid: Schema.Finite,
});

/** Sends one signal to a detached process group without leaking OS races. */
function signalProcessGroup(pid: number, signal: NodeJS.Signals) {
  return Effect.try({
    catch: () => undefined,
    try: () => process.kill(-pid, signal),
  }).pipe(Effect.ignore);
}

/** Waits a bounded duration for either normal or signalled process exit. */
function waitForProcess<Exit, Failure>(
  exit: Deferred.Deferred<Exit, Failure>,
  duration: Duration.Input
) {
  return Deferred.await(exit).pipe(
    Effect.interruptible,
    Effect.ignore,
    Effect.timeoutOption(duration)
  );
}

/**
 * Stops one detached process group through bounded graceful and forced phases.
 * The caller owns the group's exit Deferred and its termination policy.
 */
export const terminateProcessGroup = Effect.fn(
  "AksaraUtilities.terminateProcessGroup"
)(function* <Exit, Failure>(
  group: typeof ProcessGroupSchema.Type & {
    readonly exit: Deferred.Deferred<Exit, Failure>;
    readonly grace: Duration.Input;
    readonly limit: Duration.Input;
  }
) {
  if (yield* Deferred.isDone(group.exit)) {
    return;
  }

  yield* signalProcessGroup(group.pid, "SIGTERM");
  const stopped = yield* waitForProcess(group.exit, group.grace);
  if (Option.isSome(stopped)) {
    return;
  }

  yield* signalProcessGroup(group.pid, "SIGKILL");
  yield* waitForProcess(group.exit, group.limit);
});
