import { Effect, Schema } from "effect";
import { ContentLocaleSchema } from "#contracts/content";
import {
  type LearningGraphIdentity,
  LearningGraphIdentitySchema,
} from "#contracts/graph/spec";

const LearningGraphSegmentSchema = Schema.String.pipe(
  Schema.pattern(/^[a-z0-9]+(?:-[a-z0-9]+)*$/u)
);

/** Validated hierarchy segments required to derive one graph identity. */
export const LearningGraphSegmentsSchema = Schema.Struct({
  concept: Schema.NonEmptyArray(LearningGraphSegmentSchema),
  learningObject: Schema.NonEmptyArray(LearningGraphSegmentSchema),
  lens: Schema.NonEmptyArray(LearningGraphSegmentSchema),
  locale: ContentLocaleSchema,
});
export type LearningGraphSegments = typeof LearningGraphSegmentsSchema.Type;

/** Builds one graph ID from already validated source-owned segments. */
function graphId(prefix: string, segments: readonly string[]) {
  return `${prefix}:${segments.join(":")}`;
}

/** Source segments could not produce valid stable graph identities. */
export class LearningGraphIdentityError extends Schema.TaggedError<LearningGraphIdentityError>()(
  "LearningGraphIdentityError",
  { cause: Schema.Unknown }
) {}

/** Derives all product identities from one signed route projection source. */
export const makeLearningGraphIdentity: (
  source: LearningGraphSegments
) => Effect.Effect<LearningGraphIdentity, LearningGraphIdentityError> =
  Effect.fn("AksaraContracts.makeLearningGraphIdentity")(function* (source) {
    const segments = yield* Schema.decodeUnknown(LearningGraphSegmentsSchema)(
      source,
      { onExcessProperty: "error" }
    ).pipe(
      Effect.mapError(
        (cause) =>
          new LearningGraphIdentityError({
            cause,
          })
      )
    );
    return LearningGraphIdentitySchema.make({
      alignmentId: graphId("alignment", [
        ...segments.lens,
        ...segments.learningObject,
      ]),
      assetId: graphId("asset", [
        segments.locale,
        ...segments.lens,
        ...segments.learningObject,
      ]),
      conceptId: graphId("concept", segments.concept),
      learningObjectId: graphId("lo", segments.learningObject),
      lensId: graphId("lens", segments.lens),
    });
  });
