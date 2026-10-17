import { Cause, Effect, Exit } from "effect";

/** Runs one workflow verifier and returns the text of its rejection, or a fixed sentence when it accepts. */
export const workflowFailure = Effect.fn("AksaraWorkflowTest.failure")(
  function* (verification: Effect.Effect<unknown>) {
    const exit = yield* Effect.exit(verification);
    if (Exit.isSuccess(exit)) {
      return "The workflow verifier accepted the workflow.";
    }
    return String(Cause.squash(exit.cause));
  }
);
