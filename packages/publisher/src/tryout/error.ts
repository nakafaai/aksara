import { ContentLocaleSchema } from "@nakafa/aksara-contracts/content";
import { ContentKeySchema } from "@nakafa/aksara-contracts/ids";
import { Schema } from "effect";

export const TryoutHeadBodySchema = Schema.Literal("answer", "question");
const TryoutHeadFieldSchema = Schema.Literal(
  "bodyPair",
  "compilerConfigHash",
  "contentKey",
  "delivery",
  "projectionHash",
  "rendererDomain",
  "sourceHash",
  "sourcePath"
);

/** A complete desired head stream repeated one locale-specific identity. */
export class TryoutHeadDuplicateError extends Schema.TaggedError<TryoutHeadDuplicateError>()(
  "TryoutHeadDuplicateError",
  { contentKey: ContentKeySchema, locale: ContentLocaleSchema }
) {}

/** A complete desired head stream is outside canonical content-head order. */
export class TryoutHeadOrderError extends Schema.TaggedError<TryoutHeadOrderError>()(
  "TryoutHeadOrderError",
  { contentKey: ContentKeySchema, locale: ContentLocaleSchema }
) {}

/** One active placement has no desired question or answer artifact head. */
export class TryoutHeadMissingError extends Schema.TaggedError<TryoutHeadMissingError>()(
  "TryoutHeadMissingError",
  {
    bodyKind: TryoutHeadBodySchema,
    contentKey: ContentKeySchema,
    locale: ContentLocaleSchema,
  }
) {}

/** An active desired head does not own its exact placement or source contract. */
export class TryoutHeadMismatchError extends Schema.TaggedError<TryoutHeadMismatchError>()(
  "TryoutHeadMismatchError",
  {
    contentKey: ContentKeySchema,
    field: TryoutHeadFieldSchema,
    locale: ContentLocaleSchema,
  }
) {}

/** All typed binding failures plus the supplied desired-head source failure. */
export type TryoutHeadBindingError<E> =
  | E
  | TryoutHeadDuplicateError
  | TryoutHeadMismatchError
  | TryoutHeadMissingError
  | TryoutHeadOrderError;

/** An active placement has no exact question source for its authored title. */
export class TryoutTitleMissingError extends Schema.TaggedError<TryoutTitleMissingError>()(
  "TryoutTitleMissingError",
  {
    contentKey: ContentKeySchema,
    locale: ContentLocaleSchema,
  }
) {}
