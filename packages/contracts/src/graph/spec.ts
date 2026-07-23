import { Schema } from "effect";

const GRAPH_ID_PATTERN =
  /^(?:alignment|asset|concept|lens|lo):[a-z0-9]+(?:-[a-z0-9]+)*(?::[a-z0-9]+(?:-[a-z0-9]+)*)*$/u;

/** Canonical colon-separated identity in Nakafa's learning graph. */
export const LearningGraphIdSchema = Schema.String.pipe(
  Schema.pattern(GRAPH_ID_PATTERN)
);

/** Stable graph identities persisted with every route-bearing projection. */
export const LearningGraphIdentitySchema = Schema.Struct({
  alignmentId: LearningGraphIdSchema,
  assetId: LearningGraphIdSchema,
  conceptId: LearningGraphIdSchema,
  learningObjectId: LearningGraphIdSchema,
  lensId: LearningGraphIdSchema,
}).pipe(
  Schema.filter(
    ({ alignmentId, assetId, conceptId, learningObjectId, lensId }) =>
      alignmentId.startsWith("alignment:") &&
      assetId.startsWith("asset:") &&
      conceptId.startsWith("concept:") &&
      learningObjectId.startsWith("lo:") &&
      lensId.startsWith("lens:"),
    { message: () => "Expected each graph identity to use its owned prefix." }
  )
);
export type LearningGraphIdentity = typeof LearningGraphIdentitySchema.Type;

/** Serializes graph identity fields in stable signed order. */
export function canonicalizeLearningGraphIdentity(
  identity: LearningGraphIdentity
) {
  return {
    alignmentId: identity.alignmentId,
    assetId: identity.assetId,
    conceptId: identity.conceptId,
    learningObjectId: identity.learningObjectId,
    lensId: identity.lensId,
  };
}
