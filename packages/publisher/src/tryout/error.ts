import { ContentHeadIdentitySchema } from "@nakafa/aksara-contracts/content";
import { ContentKeySchema } from "@nakafa/aksara-contracts/ids";
import { ArtifactLocaleSchema } from "@nakafa/aksara-contracts/locale";
import { QuestionBodyKindSchema } from "@nakafa/aksara-contracts/question/identity";
import { Schema } from "effect";

const TryoutHeadFieldSchema = Schema.Literals([
  "bodyPair",
  "compilerConfigHash",
  "contentKey",
  "delivery",
  "projectionHash",
  "rendererDomain",
  "sourceHash",
  "sourcePath",
]);

/** A complete desired head stream repeated one artifactLocale-specific identity. */
export class TryoutHeadDuplicateError extends Schema.TaggedError<
  TryoutHeadDuplicateError,
  { readonly brand: unique symbol }
>()("TryoutHeadDuplicateError", ContentHeadIdentitySchema.fields) {}

/** A complete desired head stream is outside canonical content-head order. */
export class TryoutHeadOrderError extends Schema.TaggedError<
  TryoutHeadOrderError,
  { readonly brand: unique symbol }
>()("TryoutHeadOrderError", ContentHeadIdentitySchema.fields) {}

/** One active placement has no desired question or answer artifact head. */
export class TryoutHeadMissingError extends Schema.TaggedError<
  TryoutHeadMissingError,
  { readonly brand: unique symbol }
>()("TryoutHeadMissingError", {
  artifactLocale: ArtifactLocaleSchema,
  bodyKind: QuestionBodyKindSchema,
  contentKey: ContentKeySchema,
}) {}

/** An active desired head does not own its exact placement or source contract. */
export class TryoutHeadMismatchError extends Schema.TaggedError<
  TryoutHeadMismatchError,
  { readonly brand: unique symbol }
>()("TryoutHeadMismatchError", {
  ...ContentHeadIdentitySchema.fields,
  field: TryoutHeadFieldSchema,
}) {}

/** All typed binding failures plus the supplied desired-head source failure. */
export type TryoutHeadBindingError<E> =
  | E
  | TryoutHeadDuplicateError
  | TryoutHeadMismatchError
  | TryoutHeadMissingError
  | TryoutHeadOrderError;

/** An active placement has no exact question or answer source. */
export class TryoutContentMissingError extends Schema.TaggedError<
  TryoutContentMissingError,
  { readonly brand: unique symbol }
>()("TryoutContentMissingError", {
  artifactLocale: ArtifactLocaleSchema,
  contentKey: ContentKeySchema,
}) {}
