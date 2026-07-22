import { Effect, Schema } from "effect";

const PreviewEnvironmentSchema = Schema.Struct({
  nakafaAppDir: Schema.optional(Schema.NonEmptyTrimmedString),
});
export type PreviewEnvironment = typeof PreviewEnvironmentSchema.Type;

/** The process environment does not satisfy the narrow preview contract. */
export class PreviewEnvironmentError extends Schema.TaggedError<PreviewEnvironmentError>()(
  "PreviewEnvironmentError",
  { variable: Schema.Literal("NAKAFA_APP_DIR") }
) {}

/** Decodes only the optional sibling-checkout override from unknown input. */
export const decodePreviewEnvironment = Effect.fn(
  "AksaraCli.decodeEnvironment"
)((input: Readonly<Record<string, string | undefined>>) =>
  Schema.decodeUnknown(PreviewEnvironmentSchema)(
    input.NAKAFA_APP_DIR === undefined
      ? {}
      : { nakafaAppDir: input.NAKAFA_APP_DIR }
  ).pipe(
    Effect.mapError(
      () => new PreviewEnvironmentError({ variable: "NAKAFA_APP_DIR" })
    )
  )
);

/** Reads process environment only at the dedicated typed CLI boundary. */
export const readPreviewEnvironment = Effect.fn("AksaraCli.readEnvironment")(
  () => decodePreviewEnvironment(process.env)
);
