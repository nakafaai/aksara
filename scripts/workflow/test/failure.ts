import { expect } from "@effect/vitest";
import { Cause, Effect, Exit, Option, Schema } from "effect";
import { WorkflowError } from "#scripts/workflow/requirement";

/**
 * Runs one workflow verifier and returns the message of its typed refusal, or a
 * fixed sentence when it accepts. A defect or any other failure stops the test,
 * because a verifier must refuse with its WorkflowError and never throw.
 */
export const workflowFailure = Effect.fn("AksaraWorkflowTest.failure")(
  function* <A, E>(verification: Effect.Effect<A, E>) {
    const exit = yield* Effect.exit(verification);
    if (Exit.isSuccess(exit)) {
      return "The workflow verifier accepted the workflow.";
    }
    const refusal = Option.getOrUndefined(Cause.findErrorOption(exit.cause));
    if (!Schema.is(WorkflowError)(refusal)) {
      return yield* Effect.die(
        `The workflow verifier did not refuse with a WorkflowError: ${Cause.pretty(exit.cause)}`
      );
    }
    return refusal.message;
  }
);

/** Expects one workflow verifier to refuse with a message that contains the given text. */
export const expectRefusal = Effect.fn("AksaraWorkflowTest.expectRefusal")(
  function* <A, E>(verification: Effect.Effect<A, E>, message: string) {
    expect(yield* workflowFailure(verification)).toContain(message);
  }
);
