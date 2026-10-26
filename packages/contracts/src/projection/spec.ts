import { Match, Schema } from "effect";
import {
  ArticleProjectionSchema,
  canonicalizeArticleProjection,
} from "#contracts/projection/article";
import {
  canonicalizeMaterialProjection,
  MaterialLessonProjectionSchema,
} from "#contracts/projection/material";
import {
  canonicalizePublicPageProjection,
  PublicPageProjectionSchema,
} from "#contracts/projection/page";

/**
 * Complete projection vocabulary backed by implemented content families. Every
 * projection owns a public route, which Nakafa's path-based runtime serves.
 */
export const ContentProjectionSchema = Schema.Union([
  ArticleProjectionSchema,
  MaterialLessonProjectionSchema,
  PublicPageProjectionSchema,
]);
export type ContentProjection = typeof ContentProjectionSchema.Type;

const matchProjectionFamily = Match.type<ContentProjection>().pipe(
  Match.discriminatorsExhaustive("kind")({
    article: () => "article" as const,
    "public-page": () => "page" as const,
    "subject-lesson": () => "material" as const,
  })
);

/** Returns the release family that owns one discriminated projection. */
export function familyForProjection(projection: ContentProjection) {
  return matchProjectionFamily(projection);
}

/** Returns the exact compiled artifact locale owned by one projection. */
export function projectionArtifactLocale(projection: ContentProjection) {
  return projection.artifactLocale;
}

const matchCanonicalProjection = Match.type<ContentProjection>().pipe(
  Match.discriminatorsExhaustive("kind")({
    article: canonicalizeArticleProjection,
    "public-page": canonicalizePublicPageProjection,
    "subject-lesson": canonicalizeMaterialProjection,
  })
);

/** Serializes one projection through its exhaustive family-owned canonicalizer. */
export function canonicalizeContentProjection(projection: ContentProjection) {
  return matchCanonicalProjection(projection);
}
