import { NodeServices } from "@effect/platform-node";
import { expect, layer } from "@effect/vitest";
import { inspectContentSource } from "@nakafa/aksara-compiler/inspect";
import { selectPreviewDocument } from "@nakafa/aksara-corpus/preview/selection";
import type { PreviewSource } from "@nakafa/aksara-corpus/preview/source";
import { Array as Arr, Effect, Layer, Option } from "effect";
import {
  loadPreviewSource,
  projectPreviewSource,
} from "#publisher/preview/source";
import { ArticleTestFixtures, articleTestLayer } from "#test/article";
import {
  englishPath,
  MaterialTestFixtures,
  materialTestLayer,
} from "#test/material/spec";
import { PageTestFixtures, pageTestLayer } from "#test/page/spec";

/** Selects complete real preview closures through platform and family layers. */
const previewSources = Effect.fn("PreviewSourceTest.sources")(() =>
  Effect.gen(function* () {
    const article = yield* ArticleTestFixtures;
    const material = yield* MaterialTestFixtures;
    const page = yield* PageTestFixtures;
    const articleEntry = Option.getOrUndefined(
      Arr.findFirst(
        article.entries,
        ({ route }) => route.artifactLocale === "en"
      )
    );
    const pageEntry = Option.getOrUndefined(
      Arr.findFirst(
        page.entries,
        ({ route }) =>
          route.pageKey === "privacy-policy" && route.artifactLocale === "en"
      )
    );
    if (!(articleEntry && pageEntry)) {
      return yield* Effect.die("Expected real article and page entries.");
    }
    const [articleSelection, materialSelection, pageSelection] =
      yield* Effect.all(
        [
          selectPreviewDocument(article.checkoutRoot, articleEntry.sourcePath),
          selectPreviewDocument(material.checkoutRoot, englishPath),
          selectPreviewDocument(article.checkoutRoot, pageEntry.sourcePath),
        ],
        { concurrency: 3 }
      );
    return {
      articleRenderer: article.rendererManifest,
      articleSource: articleSelection.source,
      checkoutRoot: article.checkoutRoot,
      materialRenderer: material.rendererManifest,
      materialSource: materialSelection.source,
      pageRenderer: page.rendererManifest,
      pageSource: pageSelection.source,
    };
  })
);

/** Loads and projects one real source with its exact renderer manifest. */
function projectSource(
  checkoutRoot: string,
  source: PreviewSource,
  rendererManifest: unknown
) {
  return Effect.gen(function* () {
    const loaded = yield* loadPreviewSource(checkoutRoot, source);
    const inspection = yield* inspectContentSource({
      ...loaded.body,
      rendererManifest,
    });
    return yield* projectPreviewSource(loaded, inspection.metadata);
  });
}

const previewTestLayer = Layer.mergeAll(
  NodeServices.layer,
  articleTestLayer,
  materialTestLayer,
  pageTestLayer
);

layer(previewTestLayer)("preview source", (it) => {
  it.effect("loads and projects every supported real content family", () =>
    Effect.gen(function* () {
      const fixture = yield* previewSources();
      const [article, material, page] = yield* Effect.all(
        [
          projectSource(
            fixture.checkoutRoot,
            fixture.articleSource,
            fixture.articleRenderer
          ),
          projectSource(
            fixture.checkoutRoot,
            fixture.materialSource,
            fixture.materialRenderer
          ),
          projectSource(
            fixture.checkoutRoot,
            fixture.pageSource,
            fixture.pageRenderer
          ),
        ],
        { concurrency: 3 }
      );

      expect(article).toMatchObject({ artifactLocale: "en", kind: "article" });
      expect(material).toMatchObject({
        artifactLocale: "en",
        kind: "subject-lesson",
      });
      expect(page).toMatchObject({
        artifactLocale: "en",
        kind: "public-page",
      });
    })
  );
});
