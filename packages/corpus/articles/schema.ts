import {
  ArticleCategorySchema,
  ArticleReferenceSchema,
  ArticleSlugSchema,
} from "@nakafa/aksara-contracts/projection/article";
import { Effect, Schema } from "effect";

const ARTICLE_ROOT_PATTERN =
  /^articles\/politics\/[a-z0-9]+(?:-[a-z0-9]+)*\/[a-z0-9]+(?:-[a-z0-9]+)*$/u;

/** Pair-grouped authored path containing one localized article pair. */
export const ArticleRootSchema = Schema.String.pipe(
  Schema.pattern(ARTICLE_ROOT_PATTERN, {
    description: "Pair-grouped politics article source path.",
    identifier: "ArticleRoot",
    message: () => "Invalid article source root.",
  })
);
export type ArticleRoot = typeof ArticleRootSchema.Type;

/** Checks one pair-grouped physical root flattens to its canonical route slug. */
function hasCoherentArticleIdentity(input: {
  readonly category: "politics";
  readonly slug: string;
  readonly sourceRoot: string;
}) {
  const [, category, group, name] = input.sourceRoot.split("/");
  return (
    category === input.category &&
    group !== undefined &&
    name !== undefined &&
    `${group}-${name}` === input.slug
  );
}

/** Complete reviewed source contract for one localized article pair. */
export const ArticleSourceSchema = Schema.Struct({
  category: ArticleCategorySchema,
  references: Schema.Array(ArticleReferenceSchema),
  slug: ArticleSlugSchema,
  sourceRoot: ArticleRootSchema,
}).pipe(
  Schema.filter(hasCoherentArticleIdentity, {
    message: () =>
      "Expected the pair-grouped article source root to flatten to its slug.",
  })
);
export type ArticleSource = typeof ArticleSourceSchema.Type;
export type ArticleSourceInput = typeof ArticleSourceSchema.Encoded;

/** One authored article source failed strict source decoding. */
export class ArticleSourceError extends Schema.TaggedError<ArticleSourceError>()(
  "ArticleSourceError",
  {
    cause: Schema.Unknown,
    sourceRoot: Schema.String,
  }
) {}

/** Lazily decodes one reviewed article pair at its source-module seam. */
export const defineArticleSource = Effect.fn(
  "AksaraCorpus.defineArticleSource"
)(function* (input: ArticleSourceInput) {
  return yield* Schema.decodeUnknown(ArticleSourceSchema)(input, {
    onExcessProperty: "error",
  }).pipe(
    Effect.mapError(
      (cause) =>
        new ArticleSourceError({
          cause,
          sourceRoot: input.sourceRoot,
        })
    )
  );
});
