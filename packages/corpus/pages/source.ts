import {
  CorpusSourcePathSchema,
  GitCommitShaSchema,
} from "@nakafa/aksara-contracts/ids";
import { Effect, FileSystem, Path, Schema } from "effect";
import type { PageEntry } from "#corpus/pages/registry";
import {
  definePageSource,
  type PageSourceInput,
  PageSourceSchema,
} from "#corpus/pages/schema";

/** Reviewed Nakafa implementation that must be live before developer publication. */
export const NAKAFA_AGENT_IMPLEMENTATION_SHA = GitCommitShaSchema.make(
  "2fae54fec31b7cd630a56933b613fa5b9504695a"
);

/** Stable source-owned identity of Nakafa's public developer page. */
export const DEVELOPER_PAGE_KEY = "developers";

const pageSourceInputs: readonly PageSourceInput[] = [
  {
    pageKey: DEVELOPER_PAGE_KEY,
    publicPaths: {
      de: "developers",
      en: "developers",
      id: "developers",
    },
    sourceRoot: "pages/developers",
  },
  {
    pageKey: "imprint",
    publicPaths: {
      de: "impressum",
      en: "legal-notice",
      id: "informasi-perusahaan",
    },
    sourceRoot: "pages/imprint",
  },
  {
    pageKey: "privacy-policy",
    publicPaths: {
      de: "privacy-policy",
      en: "privacy-policy",
      id: "privacy-policy",
    },
    sourceRoot: "pages/privacy-policy",
  },
  {
    pageKey: "security-policy",
    publicPaths: {
      de: "security-policy",
      en: "security-policy",
      id: "security-policy",
    },
    sourceRoot: "pages/security-policy",
  },
  {
    pageKey: "terms-of-service",
    publicPaths: {
      de: "terms-of-service",
      en: "terms-of-service",
      id: "terms-of-service",
    },
    sourceRoot: "pages/terms",
  },
];

/** An injected public page source catalog failed strict decoding. */
export class PageCatalogError extends Schema.TaggedError<PageCatalogError>()(
  "PageCatalogError",
  { cause: Schema.Unknown }
) {}

/** Composes every reviewed source program into one public page catalog. */
export const decodePageSources = Effect.fn("AksaraCorpus.decodePageSources")(
  function* (input?: unknown) {
    if (input !== undefined) {
      return yield* Schema.decodeUnknownEffect(Schema.Array(PageSourceSchema))(
        input,
        { onExcessProperty: "error" }
      ).pipe(Effect.mapError((cause) => new PageCatalogError({ cause })));
    }

    return yield* Effect.all(pageSourceInputs.map(definePageSource));
  }
);

/** Reading one reviewed public page body failed through Effect Platform. */
export class PageReadError extends Schema.TaggedError<PageReadError>()(
  "PageReadError",
  { cause: Schema.Unknown, sourcePath: CorpusSourcePathSchema }
) {}

/** Complete authored public page document passed to release preparation. */
export type PageDocumentSource = Omit<PageEntry, "sourceRoot"> & {
  readonly rawMdx: string;
};

/** Reads one registry-owned public page without escaping the checkout root. */
export const readPageDocument = Effect.fn("AksaraCorpus.readPageDocument")(
  function* (corpusRoot: string, entry: PageEntry) {
    const fileSystem = yield* FileSystem.FileSystem;
    const path = yield* Path.Path;
    const absolutePath = path.join(corpusRoot, entry.sourcePath);
    const rawMdx = yield* fileSystem
      .readFileString(absolutePath, "utf8")
      .pipe(
        Effect.mapError(
          (cause) => new PageReadError({ cause, sourcePath: entry.sourcePath })
        )
      );
    const { sourceRoot: _sourceRoot, ...document } = entry;
    return {
      ...document,
      rawMdx,
    } satisfies PageDocumentSource;
  }
);
