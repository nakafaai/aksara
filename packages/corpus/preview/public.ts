import {
  type CorpusSourcePath,
  CorpusSourcePathSchema,
} from "@nakafa/aksara-contracts/ids";
import type {
  ArticlePreviewDocument,
  MaterialPreviewDocument,
} from "@nakafa/aksara-contracts/preview/document";
import { Effect } from "effect";
import { decodeArticleRegistry } from "#corpus/articles/registry";
import { decodeMaterialRegistry } from "#corpus/material/registry";
import type { PreviewSelection } from "#corpus/preview/source";
import { PreviewSelectionError } from "#corpus/preview/source";
import { restartDependencies } from "#corpus/preview/topology";

const ARTICLE_OWNER = CorpusSourcePathSchema.make(
  "packages/corpus/articles/source.ts"
);
const MATERIAL_OWNER = CorpusSourcePathSchema.make(
  "packages/corpus/material/source.ts"
);

/** Requires one source already made unique by its canonical registry. */
const selectOne = Effect.fn("AksaraCorpus.selectPublicPreviewSource")(
  function* <Value>(value: Value | undefined, sourcePath: CorpusSourcePath) {
    if (value === undefined) {
      return yield* new PreviewSelectionError({
        reason: "missing",
        sourcePath,
      });
    }
    return value;
  }
);

/** Selects one public article directly from its canonical source registry. */
export const selectArticle = Effect.fn("AksaraCorpus.selectPreviewArticle")(
  function* (corpusRoot: string, sourcePath: CorpusSourcePath) {
    const entries = yield* decodeArticleRegistry();
    const entry = yield* selectOne(
      entries.find((candidate) => candidate.sourcePath === sourcePath),
      sourcePath
    );
    const document = {
      delivery: entry.delivery,
      family: "article",
      rendererDomain: entry.rendererDomain,
      route: entry.route,
      sourcePath: entry.sourcePath,
    } satisfies ArticlePreviewDocument;
    const sourceModule = CorpusSourcePathSchema.make(
      `packages/corpus/${entry.sourceRoot}/source.ts`
    );
    return {
      document,
      sources: [
        {
          dependencies: [
            { mode: "restart", sourcePath: ARTICLE_OWNER },
            ...(yield* restartDependencies(corpusRoot, sourceModule)),
          ],
          directories: [],
          entry,
          family: "article",
        },
      ],
    } satisfies PreviewSelection;
  }
);

/** Selects one public lesson directly from its canonical material registry. */
export const selectMaterial = Effect.fn("AksaraCorpus.selectPreviewMaterial")(
  function* (corpusRoot: string, sourcePath: CorpusSourcePath) {
    const entries = yield* decodeMaterialRegistry();
    const entry = yield* selectOne(
      entries.find((candidate) => candidate.sourcePath === sourcePath),
      sourcePath
    );
    const document = {
      delivery: entry.delivery,
      family: "material",
      rendererDomain: entry.rendererDomain,
      route: entry.route,
      sourcePath: entry.sourcePath,
    } satisfies MaterialPreviewDocument;
    const sourceModule = CorpusSourcePathSchema.make(
      `packages/corpus/${entry.assetRoot}/source.ts`
    );
    return {
      document,
      sources: [
        {
          dependencies: [
            { mode: "restart", sourcePath: MATERIAL_OWNER },
            ...(yield* restartDependencies(corpusRoot, sourceModule)),
          ],
          directories: [],
          entry,
          family: "material",
        },
      ],
    } satisfies PreviewSelection;
  }
);
