import {
  ContentKeySchema,
  CorpusSourcePathSchema,
  PublicPathSchema,
} from "@nakafa/aksara-contracts/ids";
import {
  AppLocaleSchema,
  ArtifactLocaleSchema,
} from "@nakafa/aksara-contracts/locale";
import { PageKeySchema } from "@nakafa/aksara-contracts/projection/page";
import { PublicationScopeSchema } from "@nakafa/aksara-contracts/release/snapshot/scope";
import { createRendererManifest } from "@nakafa/aksara-contracts/renderer/manifest";
import {
  decodePageRegistry,
  type PageEntry,
} from "@nakafa/aksara-corpus/pages/registry";
import { Context, Effect, HashMap, Layer, MutableHashMap, Path } from "effect";
import { testRendererDomains } from "#test/renderer";

export const pageFamilyScope = PublicationScopeSchema.make({
  families: ["page"],
  snapshots: [],
});
export const pageFixtureIdentities = [
  ["pages/developers", "de"],
  ["pages/developers", "en"],
  ["pages/developers", "id"],
  ["pages/imprint", "de"],
  ["pages/imprint", "en"],
  ["pages/imprint", "id"],
  ["pages/privacy-policy", "de"],
  ["pages/privacy-policy", "en"],
  ["pages/privacy-policy", "id"],
  ["pages/security-policy", "de"],
  ["pages/security-policy", "en"],
  ["pages/security-policy", "id"],
  ["pages/terms-of-service", "de"],
  ["pages/terms-of-service", "en"],
  ["pages/terms-of-service", "id"],
] as const;

/** Creates one exact test renderer while varying its compiler fingerprint. */
export const pageManifest = Effect.fn("PageTest.manifest")(
  (components: readonly string[] = ["InlineMath"]) =>
    createRendererManifest({
      base: components,
      domains: testRendererDomains({}),
      publishedDomains: ["site"],
    })
);

/** One fixed test page entry, written out so its digests never follow the live registry. */
export const fixedPageEntry: PageEntry = {
  delivery: "public",
  rendererDomain: "site",
  route: {
    appLocale: AppLocaleSchema.make("en"),
    artifactLocale: ArtifactLocaleSchema.make("en"),
    contentKey: ContentKeySchema.make("pages/test-page"),
    pageKey: PageKeySchema.make("test-page"),
    publicPath: PublicPathSchema.make("test-page"),
  },
  sourcePath: CorpusSourcePathSchema.make(
    "packages/corpus/pages/test-page/en.mdx"
  ),
  sourceRoot: "pages/test-page",
};

/** The authored MDX body of the fixed test page, with non-ASCII text. */
export const fixedPageSource = `export const metadata = {
  title: "Test page café ✓",
  description: "Test public page source.",
  datePublished: "2026-08-20",
};

# Test page café ✓
`;

/** Loads the real page registry and its complete in-memory source map. */
const makePageTestFixtures = Effect.fn("PageTest.makeFixtures")(() =>
  Effect.gen(function* () {
    const path = yield* Path.Path;
    const workingDirectory = yield* Effect.sync(() => process.cwd());
    const checkoutRoot = path.resolve(workingDirectory, "..", "..");
    const entries = yield* decodePageRegistry();
    const sourceRows = entries.map((entry) => {
      const absolutePath = path.resolve(checkoutRoot, entry.sourcePath);
      const source = `export const metadata = {
  title: "Test ${entry.route.pageKey}",
  description: "Reviewed public page fixture.",
  datePublished: "2026-08-20",
};

# Test ${entry.route.pageKey}
`;
      return [entry.sourcePath, absolutePath, source] as const;
    });
    const absolutePaths = HashMap.fromIterable(
      sourceRows.map(([sourcePath, absolutePath]) => [sourcePath, absolutePath])
    );
    const sources = MutableHashMap.fromIterable(
      sourceRows.map(([, absolutePath, source]) => [absolutePath, source])
    );
    const rendererManifest = yield* pageManifest();

    return {
      absolutePaths,
      checkoutRoot,
      entries,
      rendererManifest,
      sources,
    };
  })
);

/** Shared scoped page fixture for direct Effect Vitest suites. */
export class PageTestFixtures extends Context.Service<
  PageTestFixtures,
  Effect.Success<ReturnType<typeof makePageTestFixtures>>
>()("AksaraPublisherTestPageFixtures") {}

export const pageTestLayer: Layer.Layer<PageTestFixtures> = Layer.effect(
  PageTestFixtures,
  makePageTestFixtures()
).pipe(Layer.provide(Path.layer), Layer.orDie);
