import { Effect, Schema } from "effect";

/** A fact that a workflow verifier requires does not hold, so the workflow is refused with its reason. */
export class WorkflowError extends Schema.TaggedError<WorkflowError>()(
  "WorkflowError",
  { message: Schema.String }
) {}

/** Succeeds when one required workflow fact holds, and fails with its reason otherwise. */
export function ensure(holds: boolean, reason: string) {
  return holds
    ? Effect.void
    : Effect.fail(new WorkflowError({ message: reason }));
}
