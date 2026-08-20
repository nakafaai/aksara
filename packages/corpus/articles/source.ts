import { CorpusSourcePathSchema } from "@nakafa/aksara-contracts/ids";
import { Effect, FileSystem, Path, Schema } from "effect";

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
    return yield* Schema.decodeUnknownEffect(Schema.Array(ArticleSourceSchema))(
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
  { cause: Schema.Unknown, sourcePath: CorpusSourcePathSchema }
) {}

/** Complete authored article document passed to release preparation. */
export type ArticleDocumentSource = Omit<ArticleEntry, "sourceRoot"> & {
  readonly rawMdx: string;
};

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
  const { sourceRoot: _sourceRoot, ...document } = entry;
  return {
    ...document,
    rawMdx,
  } satisfies ArticleDocumentSource;
});
