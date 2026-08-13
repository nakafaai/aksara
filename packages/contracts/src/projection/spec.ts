import { Schema } from "effect";
import {
  ArticleProjectionSchema,
  canonicalizeArticleProjection,
} from "#contracts/projection/article";
import {
  canonicalizeMaterialProjection,
  MaterialLessonProjectionSchema,
} from "#contracts/projection/material";
import {
  canonicalizeQuestionProjection,
  QuestionBodyProjectionSchema,
} from "#contracts/projection/question";

/** Complete projection vocabulary backed by implemented content families. */
export const ContentProjectionSchema = Schema.Union(
  ArticleProjectionSchema,
  MaterialLessonProjectionSchema,
  QuestionBodyProjectionSchema
);
export type ContentProjection = typeof ContentProjectionSchema.Type;

/** Public-route projections accepted by Nakafa's path-based runtime seam. */
export const RoutedContentProjectionSchema = Schema.Union(
  ArticleProjectionSchema,
  MaterialLessonProjectionSchema
);
export type RoutedContentProjection = typeof RoutedContentProjectionSchema.Type;

/** Returns the release family that owns one discriminated projection. */
export function familyForProjection(projection: ContentProjection) {
  if (projection.kind === "article") {
    return "article" as const;
  }
  if (projection.kind === "question-body") {
    return "question" as const;
  }

  return "material" as const;
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

/** Serializes one projection through its exhaustive family-owned canonicalizer. */
export function canonicalizeContentProjection(projection: ContentProjection) {
  if (projection.kind === "article") {
    return canonicalizeArticleProjection(projection);
  }
  if (projection.kind === "question-body") {
    return canonicalizeQuestionProjection(projection);
  }

  return canonicalizeMaterialProjection(projection);
}
