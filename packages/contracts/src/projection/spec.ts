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
import {
  canonicalizeQuestionProjection,
  QuestionBodyProjectionSchema,
  ReadableQuestionBodyProjectionSchema,
} from "#contracts/projection/question";

/** Complete projection vocabulary backed by implemented content families. */
export const ContentProjectionSchema = Schema.Union([
  ArticleProjectionSchema,
  MaterialLessonProjectionSchema,
  PublicPageProjectionSchema,
  ReadableQuestionBodyProjectionSchema,
]);
export type ContentProjection = typeof ContentProjectionSchema.Type;

/** Current projection vocabulary accepted for newly staged content. */
export const CurrentContentProjectionSchema = Schema.Union([
  ArticleProjectionSchema,
  MaterialLessonProjectionSchema,
  PublicPageProjectionSchema,
  QuestionBodyProjectionSchema,
]);
export type CurrentContentProjection =
  typeof CurrentContentProjectionSchema.Type;

/** Public-route projections accepted by Nakafa's path-based runtime seam. */
export const RoutedContentProjectionSchema = Schema.Union([
  ArticleProjectionSchema,
  MaterialLessonProjectionSchema,
  PublicPageProjectionSchema,
]);
export type RoutedContentProjection = typeof RoutedContentProjectionSchema.Type;

const matchProjectionFamily = Match.type<ContentProjection>().pipe(
  Match.discriminatorsExhaustive("kind")({
    article: () => "article" as const,
    "public-page": () => "page" as const,
    "question-body": () => "question" as const,
    "subject-lesson": () => "material" as const,
  })
);

/** Returns the release family that owns one discriminated projection. */
export function familyForProjection(projection: ContentProjection) {
  return matchProjectionFamily(projection);
}

/** Returns public route ownership only for route-bearing projections. */
export function projectionPublicPath(projection: ContentProjection) {
  if (projection.kind === "question-body") {
    return;
  }
  return projection.publicPath;
}

/** Returns the exact compiled artifact locale owned by one projection. */
export function projectionArtifactLocale(projection: ContentProjection) {
  return projection.artifactLocale;
}

const matchCanonicalProjection = Match.type<ContentProjection>().pipe(
  Match.discriminatorsExhaustive("kind")({
    article: canonicalizeArticleProjection,
    "public-page": canonicalizePublicPageProjection,
    "question-body": canonicalizeQuestionProjection,
    "subject-lesson": canonicalizeMaterialProjection,
  })
);

/** Serializes one projection through its exhaustive family-owned canonicalizer. */
export function canonicalizeContentProjection(projection: ContentProjection) {
  return matchCanonicalProjection(projection);
}
