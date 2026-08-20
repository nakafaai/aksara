import { Effect, Schema } from "effect";

import {
  type LearningGraphIdentity,
  LearningGraphIdentitySchema,
  LearningGraphIdSchema,
} from "#contracts/graph/spec";
import { AppLocaleCodeSchema, AppLocaleSchema } from "#contracts/locale";

/** Current semantic families addressable through learning-graph identities. */
export const LearningGraphFamilySchema = Schema.Literals([
  "article",
  "material",
  "quran",
  "tryout",
]);
export type LearningGraphFamily = typeof LearningGraphFamilySchema.Type;

/** Checks one graph ID has the exact current asset dispatch prefix and shape. */
function hasAssetIdentityShape(assetId: string) {
  const [prefix, appLocale, family, ...identity] = assetId.split(":");
  return (
    prefix === "asset" &&
    Schema.is(AppLocaleCodeSchema)(appLocale) &&
    Schema.is(LearningGraphFamilySchema)(family) &&
    identity.length > 0
  );
}

/** Current asset identity accepted by route and graph read-model dispatch. */
export const LearningGraphAssetIdSchema = LearningGraphIdSchema.pipe(
  Schema.check(
    Schema.makeFilter(hasAssetIdentityShape, {
      message: "Expected asset:<appLocale>:<family>:<identity> graph identity.",
    })
  ),
  Schema.brand("@NakafaAI/AksaraLearningGraphAssetId")
);
export type LearningGraphAssetId = typeof LearningGraphAssetIdSchema.Type;

/** Semantic owner extracted from one exact current learning-graph asset ID. */
export const LearningGraphAssetOwnerSchema = Schema.Struct({
  appLocale: AppLocaleSchema,
  family: LearningGraphFamilySchema,
});
export type LearningGraphAssetOwner = typeof LearningGraphAssetOwnerSchema.Type;

/** One asset ID cannot address a supported current semantic content family. */
export class LearningGraphAssetFamilyError extends Schema.TaggedError<LearningGraphAssetFamilyError>()(
  "LearningGraphAssetFamilyError",
  { assetId: Schema.String }
) {}

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
  return (
    hasOwner(identityBody(identity.alignmentId), family) &&
    hasOwner(identityBody(identity.conceptId), family) &&
    hasLearningObjectOwner(identity, family) &&
    hasOwner(identityBody(identity.lensId), family)
  );
}

/** Classifies one assetId-only reference without fabricating a full identity. */
export const classifyLearningGraphAssetId = Effect.fn(
  "AksaraContracts.classifyLearningGraphAssetId"
)(function* (input: string) {
  const [, appLocale, family] = input.split(":");
  const owner = yield* Schema.decodeUnknownEffect(
    LearningGraphAssetOwnerSchema
  )({
    appLocale,
    family,
  }).pipe(
    Effect.mapError(() => new LearningGraphAssetFamilyError({ assetId: input }))
  );
  if (!Schema.is(LearningGraphAssetIdSchema)(input)) {
    return yield* new LearningGraphAssetFamilyError({ assetId: input });
  }
  return owner;
});

/** Classifies one coherent current learning-graph identity for direct dispatch. */
export const classifyLearningGraphIdentity = Effect.fn(
  "AksaraContracts.classifyLearningGraphIdentity"
)(function* (identity: LearningGraphIdentity) {
  const owner = yield* classifyLearningGraphAssetId(identity.assetId).pipe(
    Effect.mapError(() => new LearningGraphFamilyError({ identity }))
  );
  if (!hasCoherentFamily(identity, owner.family)) {
    return yield* new LearningGraphFamilyError({ identity });
  }
  return owner.family;
});
