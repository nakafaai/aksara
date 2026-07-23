import { FileSystem, Path } from "@effect/platform";
import type { ContentDeliveryClass } from "@nakafa/aksara-contracts/delivery";
import type { CorpusSourcePath } from "@nakafa/aksara-contracts/ids";
import type {
  ArticleReference,
  ArticleRoute,
} from "@nakafa/aksara-contracts/projection/article";
import type { RendererDomain } from "@nakafa/aksara-contracts/renderer/domain";
import { Effect, Schema } from "effect";

import { dynasticPoliticsAsianValuesArticle } from "#corpus/articles/politics/dynastic-politics/asian-values/source";
import { flawedLegalGeopoliticsArticle } from "#corpus/articles/politics/flawed-legal/geopolitics/source";
import { kimPlusEmptyBoxArticle } from "#corpus/articles/politics/kim-plus/empty-box/source";
import { merahPutihCabinetAnalysisArticle } from "#corpus/articles/politics/merah-putih/cabinet-analysis/source";
import { nepotismPoliticalGovernanceArticle } from "#corpus/articles/politics/nepotism-in/political-governance/source";
import { porkBarrelPoliticsPowerArticle } from "#corpus/articles/politics/pork-barrel/politics-power/source";
import { regionalElectionsTurmoilArticle } from "#corpus/articles/politics/regional-elections/turmoil/source";
import type { ArticleEntry } from "#corpus/articles/registry";
import { ArticleSourceSchema } from "#corpus/articles/schema";

const articleSourcePrograms = [
  dynasticPoliticsAsianValuesArticle,
  flawedLegalGeopoliticsArticle,
  kimPlusEmptyBoxArticle,
  merahPutihCabinetAnalysisArticle,
  nepotismPoliticalGovernanceArticle,
  porkBarrelPoliticsPowerArticle,
  regionalElectionsTurmoilArticle,
];

/** An injected article source catalog failed strict decoding. */
export class ArticleCatalogError extends Schema.TaggedError<ArticleCatalogError>()(
  "ArticleCatalogError",
  { cause: Schema.Unknown }
) {}

/** Composes every reviewed source program into one article catalog. */
export const decodeArticleSources = Effect.fn(
  "AksaraCorpus.decodeArticleSources"
)(function* (input?: unknown) {
  if (input !== undefined) {
    return yield* Schema.decodeUnknown(Schema.Array(ArticleSourceSchema))(
      input,
      { onExcessProperty: "error" }
    ).pipe(
      Effect.mapError(
        (cause) =>
          new ArticleCatalogError({
            cause,
          })
      )
    );
  }

  return yield* Effect.all(articleSourcePrograms);
});

/** Reading one reviewed article body failed through Effect Platform. */
export class ArticleReadError extends Schema.TaggedError<ArticleReadError>()(
  "ArticleReadError",
  { cause: Schema.Unknown, sourcePath: Schema.String }
) {}

/** Complete authored article document passed to release preparation. */
export interface ArticleDocumentSource {
  readonly delivery: ContentDeliveryClass;
  readonly rawMdx: string;
  readonly references: readonly ArticleReference[];
  readonly rendererDomain: RendererDomain;
  readonly route: ArticleRoute;
  readonly sourcePath: CorpusSourcePath;
}

/** Reads one registry-owned article without escaping the checkout root. */
export const readArticleDocument = Effect.fn(
  "AksaraCorpus.readArticleDocument"
)(function* (corpusRoot: string, entry: ArticleEntry) {
  const fileSystem = yield* FileSystem.FileSystem;
  const path = yield* Path.Path;
  const absolutePath = path.join(corpusRoot, entry.sourcePath);
  const rawMdx = yield* fileSystem
    .readFileString(absolutePath, "utf8")
    .pipe(
      Effect.mapError(
        (cause) => new ArticleReadError({ cause, sourcePath: entry.sourcePath })
      )
    );
  return {
    delivery: entry.delivery,
    rawMdx,
    references: entry.references,
    rendererDomain: entry.rendererDomain,
    route: entry.route,
    sourcePath: entry.sourcePath,
  } satisfies ArticleDocumentSource;
});
