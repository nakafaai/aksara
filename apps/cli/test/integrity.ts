import { CorpusSourcePathSchema } from "@nakafa/aksara-contracts/ids";
import { PageEntrySchema } from "@nakafa/aksara-corpus/pages/registry";
import { Effect, Schema } from "effect";
import type { SelectedDocument, SelectedFileCandidate } from "#cli/integrity";

/** Restart-scoped files at fixed paths, so pinned hashes never read the live corpus. */
export const FIXED_FILES = [
  {
    absolutePath: "/test/aksara/packages/corpus/test/document.mdx",
    mode: "restart",
    sourcePath: CorpusSourcePathSchema.make(
      "packages/corpus/test/document.mdx"
    ),
  },
  {
    absolutePath: "/test/aksara/packages/corpus/test/item.ts",
    mode: "restart",
    sourcePath: CorpusSourcePathSchema.make("packages/corpus/test/item.ts"),
  },
  {
    absolutePath: "/test/aksara/packages/corpus/test/schema.ts",
    mode: "restart",
    sourcePath: CorpusSourcePathSchema.make("packages/corpus/test/schema.ts"),
  },
] satisfies readonly [SelectedFileCandidate, ...SelectedFileCandidate[]];

/** The exact text of every fixed file, so each pinned hash covers its own bytes. */
const FIXED_TEXTS = new Map([
  ["/test/aksara/packages/corpus/test/document.mdx", "Test document café ✓\n"],
  ["/test/aksara/packages/corpus/test/item.ts", "Test item ✓\n"],
  ["/test/aksara/packages/corpus/test/schema.ts", "Test schema é\n"],
  ["/test/aksara/packages/corpus/pages/test-page/en.mdx", "Test page café ✓\n"],
]);

/** Serves one fixed text and fails for any path outside the fixture. */
export function readFixedText(absolutePath: string) {
  const text = FIXED_TEXTS.get(absolutePath);
  return text === undefined
    ? Effect.die(`Unexpected read outside the fixed fixture: ${absolutePath}`)
    : Effect.succeed(text);
}

/** One fixed test page entry, so the selection never depends on the live registry. */
const TEST_PAGE = Schema.decodeSync(PageEntrySchema)({
  delivery: "public",
  rendererDomain: "site",
  route: {
    appLocale: "en",
    artifactLocale: "en",
    contentKey: "pages/test-page",
    pageKey: "test-page",
    publicPath: "test-page",
  },
  sourcePath: "packages/corpus/pages/test-page/en.mdx",
  sourceRoot: "pages/test-page",
});
const TEST_ITEM_PATH = CorpusSourcePathSchema.make(
  "packages/corpus/test/item.ts"
);

/** A fixed page selection whose closure is the page body followed by one dependency. */
export const FIXED_SELECTION: SelectedDocument = {
  directories: [],
  document: {
    delivery: "public",
    family: "page",
    rendererDomain: "site",
    route: TEST_PAGE.route,
    sourcePath: TEST_PAGE.sourcePath,
  },
  files: [
    {
      absolutePath: "/test/aksara/packages/corpus/pages/test-page/en.mdx",
      mode: "reload",
      sourcePath: TEST_PAGE.sourcePath,
    },
    {
      absolutePath: "/test/aksara/packages/corpus/test/item.ts",
      mode: "reload",
      sourcePath: TEST_ITEM_PATH,
    },
  ],
  sources: [
    {
      dependencies: [
        { mode: "reload", sourcePath: TEST_PAGE.sourcePath },
        { mode: "reload", sourcePath: TEST_ITEM_PATH },
      ],
      directories: [],
      entry: TEST_PAGE,
      family: "page",
    },
  ],
};
