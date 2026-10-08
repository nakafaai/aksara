import { Cause, Console, Effect } from "effect";

/** Writes the cause of a failed check to standard error, and stays silent for an interruption alone. */
export const reportFailure = Effect.fn("WorkflowFailure.report")(function* (
  cause: Cause.Cause<unknown>
) {
  if (Cause.hasInterruptsOnly(cause)) {
    return;
  }
  yield* Console.error(Cause.pretty(cause));
});
