import { Schema } from "effect";
import {
  type ArticleProjection,
  ArticleProjectionSchema,
  canonicalizeArticleProjection,
} from "#contracts/projection/article";
import {
  canonicalizeMaterialProjection,
  type MaterialLessonProjection,
  MaterialLessonProjectionSchema,
} from "#contracts/projection/material";
import {
  canonicalizeQuestionProjection,
  type QuestionBodyProjection,
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

/** Narrows one generic projection to the article family contract. */
export function isArticleProjection(
  projection: ContentProjection
): projection is ArticleProjection {
  return projection.kind === "article";
}

/** Narrows one generic projection to the material family contract. */
export function isMaterialProjection(
  projection: ContentProjection
): projection is MaterialLessonProjection {
  return projection.kind === "subject-lesson";
}

/** Narrows one generic projection to the question-body family contract. */
export function isQuestionProjection(
  projection: ContentProjection
): projection is QuestionBodyProjection {
  return projection.kind === "question-body";
}
