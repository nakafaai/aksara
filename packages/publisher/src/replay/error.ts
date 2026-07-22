import { Schema } from "effect";

const ReplaySpoolOperationSchema = Schema.Literal(
  "create",
  "decode",
  "encode",
  "hash",
  "limit",
  "read",
  "write"
);

/** A bounded temporary replay spool could not preserve an exact record. */
export class ReplaySpoolError extends Schema.TaggedError<ReplaySpoolError>()(
  "ReplaySpoolError",
  {
    cause: Schema.Unknown,
    index: Schema.optional(
      Schema.Number.pipe(Schema.int(), Schema.nonNegative())
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
