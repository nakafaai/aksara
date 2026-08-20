import { Schema } from "effect";

const ReplaySpoolOperationSchema = Schema.Literals([
  "create",
  "decode",
  "encode",
  "hash",
  "limit",
  "read",
  "write",
]);

/** A bounded temporary replay spool could not preserve an exact record. */
export class ReplaySpoolError extends Schema.TaggedError<ReplaySpoolError>()(
  "ReplaySpoolError",
  {
    cause: Schema.Unknown,
    index: Schema.optional(
      Schema.Finite.pipe(
        Schema.check(Schema.isInt()),
        Schema.check(Schema.isGreaterThanOrEqualTo(0))
      )
    ),
    operation: ReplaySpoolOperationSchema,
  }
) {}

/** Maps a replay failure without exposing temporary filesystem coordinates. */
export function replaySpoolFailure(
  operation: typeof ReplaySpoolOperationSchema.Type,
  cause: unknown,
  index?: number
) {
  return new ReplaySpoolError({
    cause,
    ...(index === undefined ? {} : { index }),
    operation,
  });
}
