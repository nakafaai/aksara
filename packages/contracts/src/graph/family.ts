import { Effect, Schema } from "effect";

import {
  type LearningGraphIdentity,
  LearningGraphIdentitySchema,
} from "#contracts/graph/spec";
import { AppLocaleCodeSchema } from "#contracts/locale";

/** Current semantic families addressable through learning-graph identities. */
export const LearningGraphFamilySchema = Schema.Literal(
  "article",
  "material",
  "quran",
  "tryout"
);
export type LearningGraphFamily = typeof LearningGraphFamilySchema.Type;

/** One graph identity does not coherently belong to a current semantic family. */
export class LearningGraphFamilyError extends Schema.TaggedError<LearningGraphFamilyError>()(
  "LearningGraphFamilyError",
  { identity: LearningGraphIdentitySchema }
) {}

/** Returns whether an identity body belongs to one exact domain token. */
function hasOwner(body: string, owner: string) {
  return body === owner || body.startsWith(`${owner}:`);
}

/** Returns the unprefixed body of one schema-validated graph identity. */
function identityBody(identity: string) {
  const separator = identity.indexOf(":");
  return identity.slice(separator + 1);
}

/** Returns whether a learning object uses its current family-owned identity. */
function hasLearningObjectOwner(
  identity: LearningGraphIdentity,
  family: LearningGraphFamily
) {
  const body = identityBody(identity.learningObjectId);
  if (family === "article") {
    return hasOwner(body, "article");
  }
  if (family === "material") {
    return hasOwner(body, "material-section");
  }
  if (family === "quran") {
    return hasOwner(body, "quran-surah");
  }
  return (
    body === "tryout" ||
    body.startsWith("tryout-") ||
    body.startsWith("tryout:")
  );
}

/** Verifies every graph identity field against one semantic family. */
function hasCoherentFamily(
  identity: LearningGraphIdentity,
  family: LearningGraphFamily
) {
  const [assetLocale, assetFamily] = identityBody(identity.assetId).split(":");
  if (!Schema.is(AppLocaleCodeSchema)(assetLocale) || assetFamily !== family) {
    return false;
  }

  return (
    hasOwner(identityBody(identity.alignmentId), family) &&
    hasOwner(identityBody(identity.conceptId), family) &&
    hasLearningObjectOwner(identity, family) &&
    hasOwner(identityBody(identity.lensId), family)
  );
}

/** Classifies one coherent current learning-graph identity for direct dispatch. */
export const classifyLearningGraphIdentity = Effect.fn(
  "AksaraContracts.classifyLearningGraphIdentity"
)(function* (identity: LearningGraphIdentity) {
  const [lensOwner] = identityBody(identity.lensId).split(":");
  const family = Schema.decodeUnknownEither(LearningGraphFamilySchema)(
    lensOwner
  );
  if (family._tag === "Left" || !hasCoherentFamily(identity, family.right)) {
    return yield* new LearningGraphFamilyError({ identity });
  }
  return family.right;
});
