import { NodeServices } from "@effect/platform-node";
import { inspectContentSource } from "@nakafa/aksara-compiler/inspect";
import { CorpusSourcePathSchema } from "@nakafa/aksara-contracts/ids";
import { selectPreviewDocument } from "@nakafa/aksara-corpus/preview/selection";
import type { PreviewSource } from "@nakafa/aksara-corpus/preview/source";
import { describe, expect, it } from "@nakafa/testing/effect";
import { Effect } from "effect";
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
  throw new Error(
    "Expected real article, material, page, prompt, and answer entries."
  );
}

const [
  articleSelection,
  materialSelection,
  pageSelection,
  promptSelection,
  answerSelection,
] = await Effect.runPromise(
  Effect.all(
    [
      selectPreviewDocument(checkoutRoot, articleEntry.sourcePath),
      selectPreviewDocument(checkoutRoot, englishPath),
      selectPreviewDocument(checkoutRoot, pageEntry.sourcePath),
      selectPreviewDocument(checkoutRoot, promptEntry.sourcePath),
      selectPreviewDocument(checkoutRoot, answerEntry.sourcePath),
    ],
    { concurrency: 5 }
  ).pipe(Effect.provide(NodeServices.layer))
);
const [articleSource] = articleSelection.sources;
const [materialSource] = materialSelection.sources;
const [pageSource] = pageSelection.sources;
const [promptSource] = promptSelection.sources;
const [answerPromptSource, answerSource] = answerSelection.sources;
if (answerSource === undefined) {
  throw new Error("Expected the real answer preview closure.");
}
const choicesPath = CorpusSourcePathSchema.make(
  `${promptEntry.sourceRoot}/choices.ts`
);

/** Loads and projects one real source with its exact renderer manifest. */
function projectSource(
  source: PreviewSource,
  rendererManifest:
    | typeof articleRenderer
    | typeof materialRenderer
    | typeof pageRenderer
    | typeof questionRendererManifest
) {
  return Effect.runPromise(
    Effect.gen(function* () {
      const [loaded] = yield* loadPreviewSources(checkoutRoot, [source]);
      const inspection = yield* inspectContentSource({
        ...loaded.body,
        rendererManifest,
      });
      return yield* projectPreviewSource(loaded, inspection.metadata);
    }).pipe(Effect.provide(NodeServices.layer))
  );
}

describe("preview source", () => {
  it("loads and projects every supported real content family", async () => {
    const [article, material, page, question] = await Promise.all([
      projectSource(articleSource, articleRenderer),
      projectSource(materialSource, materialRenderer),
      projectSource(pageSource, pageRenderer),
      projectSource(promptSource, questionRendererManifest),
    ]);

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
  });

  it("parses one shared choices source for an ordered answer closure", async () => {
    const loaded = await Effect.runPromise(
      loadPreviewSources(checkoutRoot, [answerPromptSource, answerSource]).pipe(
        Effect.provide(NodeServices.layer)
      )
    );
    const [prompt, answer] = loaded;
    if (!(prompt.family === "question" && answer?.family === "question")) {
      throw new Error("Expected the real prompt and answer closure.");
    }

    expect(loaded).toHaveLength(2);
    expect(loaded.map(({ source }) => source.sourcePath)).toEqual([
      answerPromptSource.entry.sourcePath,
      answerSource.entry.sourcePath,
    ]);
    expect(prompt.source.choices).toEqual(answer.source.choices);
  });

  it("maps a missing choices dependency to the preview source boundary", async () => {
    const error = await Effect.runPromise(
      loadPreviewSources("/missing", [promptSource]).pipe(
        Effect.provide(NodeServices.layer),
        Effect.flip
      )
    );

    expect(error).toMatchObject({
      _tag: "PreviewChoiceSourceError",
      checkoutRoot: "/missing",
      sourcePath: choicesPath,
    });
  });
});
