import { ContentKeySchema } from "@nakafa/aksara-contracts/ids";
import { ArtifactLocaleSchema } from "@nakafa/aksara-contracts/locale";
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

/** A complete desired head stream repeated one artifactLocale-specific identity. */
export class TryoutHeadDuplicateError extends Schema.TaggedError<TryoutHeadDuplicateError>()(
  "TryoutHeadDuplicateError",
  { artifactLocale: ArtifactLocaleSchema, contentKey: ContentKeySchema }
) {}

/** A complete desired head stream is outside canonical content-head order. */
export class TryoutHeadOrderError extends Schema.TaggedError<TryoutHeadOrderError>()(
  "TryoutHeadOrderError",
  { artifactLocale: ArtifactLocaleSchema, contentKey: ContentKeySchema }
) {}

/** One active placement has no desired question or answer artifact head. */
export class TryoutHeadMissingError extends Schema.TaggedError<TryoutHeadMissingError>()(
  "TryoutHeadMissingError",
  {
    artifactLocale: ArtifactLocaleSchema,
    bodyKind: TryoutHeadBodySchema,
    contentKey: ContentKeySchema,
  }
) {}

/** An active desired head does not own its exact placement or source contract. */
export class TryoutHeadMismatchError extends Schema.TaggedError<TryoutHeadMismatchError>()(
  "TryoutHeadMismatchError",
  {
    artifactLocale: ArtifactLocaleSchema,
    contentKey: ContentKeySchema,
    field: TryoutHeadFieldSchema,
  }
) {}

/** All typed binding failures plus the supplied desired-head source failure. */
export type TryoutHeadBindingError<E> =
  | E
  | TryoutHeadDuplicateError
  | TryoutHeadMismatchError
  | TryoutHeadMissingError
  | TryoutHeadOrderError;

/** An active placement has no exact question or answer source. */
export class TryoutContentMissingError extends Schema.TaggedError<TryoutContentMissingError>()(
  "TryoutContentMissingError",
  {
    artifactLocale: ArtifactLocaleSchema,
    contentKey: ContentKeySchema,
  }
) {}
