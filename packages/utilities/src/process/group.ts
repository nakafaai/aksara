import { Deferred, Effect, Option } from "effect";
import type * as Duration from "effect/Duration";

/** Detached process group plus its caller-owned termination policy. */
export interface ProcessGroupTermination<Exit, Failure> {
  readonly exit: Deferred.Deferred<Exit, Failure>;
  readonly grace: Duration.Input;
  readonly limit: Duration.Input;
  readonly pid: number;
}

/** Sends one signal to a detached process group without leaking OS races. */
function signalProcessGroup(pid: number, signal: NodeJS.Signals) {
  return Effect.try({
    catch: () => undefined,
    try: () => process.kill(-pid, signal),
  }).pipe(Effect.ignore);
}

/** Waits a bounded duration for either normal or signalled process exit. */
function waitForProcess<Exit, Failure>(
  group: ProcessGroupTermination<Exit, Failure>,
  duration: Duration.Input
) {
  return Deferred.await(group.exit).pipe(
    Effect.interruptible,
    Effect.ignore,
    Effect.timeoutOption(duration)
  );
}

/** Stops one detached process group through bounded graceful and forced phases. */
export const terminateProcessGroup = Effect.fn(
  "AksaraUtilities.terminateProcessGroup"
)(function* <Exit, Failure>(group: ProcessGroupTermination<Exit, Failure>) {
  if (yield* Deferred.isDone(group.exit)) {
    return;
  }

  yield* signalProcessGroup(group.pid, "SIGTERM");
  const stopped = yield* waitForProcess(group, group.grace);
  if (Option.isSome(stopped)) {
    return;
  }

  yield* signalProcessGroup(group.pid, "SIGKILL");
  yield* waitForProcess(group, group.limit);
});
