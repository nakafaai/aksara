import {
  type ArticleCategory,
  ArticleCategorySchema,
  ArticleReferenceSchema,
  ArticleSlugSchema,
} from "@nakafa/aksara-contracts/projection/article";
import { RendererDomainSchema } from "@nakafa/aksara-contracts/renderer/domain";
import { isLowerKebab } from "@nakafa/aksara-contracts/text/syntax";
import { Effect, Schema } from "effect";

/** Checks the stable four-segment grammar of one article source root. */
function isArticleRoot(sourceRoot: string) {
  const segments = sourceRoot.split("/");
  return (
    segments.length === 4 &&
    segments[0] === "articles" &&
    segments.slice(1).every(isLowerKebab)
  );
}

/** Pair-grouped authored path containing one localized article pair. */
export const ArticleRootSchema = Schema.String.pipe(
  Schema.filter(isArticleRoot, {
    description: "Pair-grouped article source path.",
    identifier: "ArticleRoot",
    message: () => "Invalid article source root.",
  })
);

/** Checks one pair-grouped physical root flattens to its canonical route slug. */
function hasCoherentArticleIdentity(input: {
  readonly category: ArticleCategory;
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
  rendererDomain: RendererDomainSchema,
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
