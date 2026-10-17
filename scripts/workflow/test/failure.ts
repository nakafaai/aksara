import { expect } from "@effect/vitest";
import { Cause, Effect, Exit, Predicate } from "effect";

/**
 * Runs one workflow verifier and returns the message of its rejection, or a
 * fixed sentence when it accepts. A typed rejection carries its message, and a
 * thrown defect reports its own text.
 */
export const workflowFailure = Effect.fn("AksaraWorkflowTest.failure")(
  function* <A, E>(verification: Effect.Effect<A, E>) {
    const exit = yield* Effect.exit(verification);
    if (Exit.isSuccess(exit)) {
      return "The workflow verifier accepted the workflow.";
    }
    const error = Cause.squash(exit.cause);
    return Predicate.hasProperty(error, "message")
      ? String(error.message)
      : String(error);
  }
);

/** Expects one workflow verifier to refuse with a message that contains the given text. */
export const expectRefusal = Effect.fn("AksaraWorkflowTest.expectRefusal")(
  function* <A, E>(verification: Effect.Effect<A, E>, message: string) {
    expect(yield* workflowFailure(verification)).toContain(message);
  }
);
