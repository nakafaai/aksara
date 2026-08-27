import { NodeServices } from "@effect/platform-node";
import { layer } from "@effect/vitest";
import { inspectContentSource } from "@nakafa/aksara-compiler/inspect";
import { CorpusSourcePathSchema } from "@nakafa/aksara-contracts/ids";
import { selectPreviewDocument } from "@nakafa/aksara-corpus/preview/selection";
import type { PreviewSource } from "@nakafa/aksara-corpus/preview/source";
import { Effect } from "effect";
import { expect } from "vitest";
import {
  loadPreviewSources,
  projectPreviewSource,
} from "#publisher/preview/source";
import {
  articleEntries,
  rendererManifest as articleRenderer,
  checkoutRoot,
} from "#test/article";
import {
  englishPath,
  rendererManifest as materialRenderer,
} from "#test/material/spec";
import { pageEntries, rendererManifest as pageRenderer } from "#test/page";
import { questionRendererManifest } from "#test/question/renderer";
import { questionEntries } from "#test/question/spec";

const previewSources = Effect.gen(function* () {
  const articleEntry = articleEntries.find(
    ({ route }) => route.artifactLocale === "en"
  );
  const promptEntry = questionEntries.find(
    ({ bodyKind, artifactLocale }) =>
      bodyKind === "question" && artifactLocale === "en"
  );
  const answerEntry = questionEntries.find(
    ({ bodyKind, artifactLocale }) =>
      bodyKind === "answer" && artifactLocale === "en"
  );
  const pageEntry = pageEntries.find(
    ({ route }) =>
      route.pageKey === "privacy-policy" && route.artifactLocale === "en"
  );
  if (!(articleEntry && pageEntry && promptEntry && answerEntry)) {
    return yield* Effect.die(
      "Expected real article, material, page, prompt, and answer entries."
    );
  }

  const [
    articleSelection,
    materialSelection,
    pageSelection,
    promptSelection,
    answerSelection,
  ] = yield* Effect.all(
    [
      selectPreviewDocument(checkoutRoot, articleEntry.sourcePath),
      selectPreviewDocument(checkoutRoot, englishPath),
      selectPreviewDocument(checkoutRoot, pageEntry.sourcePath),
      selectPreviewDocument(checkoutRoot, promptEntry.sourcePath),
      selectPreviewDocument(checkoutRoot, answerEntry.sourcePath),
    ],
    { concurrency: 5 }
  );
  const [articleSource] = articleSelection.sources;
  const [materialSource] = materialSelection.sources;
  const [pageSource] = pageSelection.sources;
  const [promptSource] = promptSelection.sources;
  const [answerPromptSource, answerSource] = answerSelection.sources;
  if (
    !(
      articleSource &&
      materialSource &&
      pageSource &&
      promptSource &&
      answerPromptSource &&
      answerSource
    )
  ) {
    return yield* Effect.die("Expected complete real preview source closures.");
  }

  return {
    answerPromptSource,
    answerSource,
    articleSource,
    choicesPath: CorpusSourcePathSchema.make(
      `${promptEntry.sourceRoot}/choices.ts`
    ),
    materialSource,
    pageSource,
    promptSource,
  };
});

/** Loads and projects one real source with its exact renderer manifest. */
function projectSource(
  source: PreviewSource,
  rendererManifest:
    | typeof articleRenderer
    | typeof materialRenderer
    | typeof pageRenderer
    | typeof questionRendererManifest
) {
  return Effect.gen(function* () {
    const [loaded] = yield* loadPreviewSources(checkoutRoot, [source]);
    const inspection = yield* inspectContentSource({
      ...loaded.body,
      rendererManifest,
    });
    return yield* projectPreviewSource(loaded, inspection.metadata);
  });
}

layer(NodeServices.layer)("preview source", (it) => {
  it.effect("loads and projects every supported real content family", () =>
    Effect.gen(function* () {
      const { articleSource, materialSource, pageSource, promptSource } =
        yield* previewSources;
      const [article, material, page, question] = yield* Effect.all(
        [
          projectSource(articleSource, articleRenderer),
          projectSource(materialSource, materialRenderer),
          projectSource(pageSource, pageRenderer),
          projectSource(promptSource, questionRendererManifest),
        ],
        { concurrency: 4 }
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
      expect(question).toMatchObject({
        artifactLocale: "en",
        bodyKind: "question",
        kind: "question-body",
      });
    })
  );

  it.effect(
    "parses one shared choices source for an ordered answer closure",
    () =>
      Effect.gen(function* () {
        const { answerPromptSource, answerSource } = yield* previewSources;
        const loaded = yield* loadPreviewSources(checkoutRoot, [
          answerPromptSource,
          answerSource,
        ]);
        const [prompt, answer] = loaded;
        if (!(prompt.family === "question" && answer?.family === "question")) {
          return yield* Effect.die(
            "Expected the real prompt and answer closure."
          );
        }

        expect(loaded).toHaveLength(2);
        expect(loaded.map(({ source }) => source.sourcePath)).toEqual([
          answerPromptSource.entry.sourcePath,
          answerSource.entry.sourcePath,
        ]);
        expect(prompt.source.choices).toEqual(answer.source.choices);
      })
  );

  it.effect(
    "maps a missing choices dependency to the preview source boundary",
    () =>
      Effect.gen(function* () {
        const { choicesPath, promptSource } = yield* previewSources;
        const error = yield* loadPreviewSources("/missing", [
          promptSource,
        ]).pipe(Effect.flip);

        expect(error).toMatchObject({
          _tag: "PreviewChoiceSourceError",
          checkoutRoot: "/missing",
          sourcePath: choicesPath,
        });
      })
  );
});
