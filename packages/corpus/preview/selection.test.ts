import { Path } from "@effect/platform";
import { Effect, Layer } from "effect";
import { describe, expect, it } from "vitest";
import { selectPreviewDocument } from "#corpus/preview/selection";
import {
  corpusRoot,
  makeQuestionLayer,
  type QuestionDirectoryRead,
} from "#corpus/test/question-layer";

const articlePath =
  "packages/corpus/articles/politics/dynastic-politics/asian-values/en.mdx";
const materialPath =
  "packages/corpus/material/lesson/mathematics/function-composition-inverse-function/function-concept/id.mdx";
const questionRoot =
  "packages/corpus/question-bank/tryout/indonesia/snbt/reading-and-writing-skills/set-1/question-1";
const promptPath = `${questionRoot}/question.en.mdx`;
const answerPath = `${questionRoot}/answer.en.mdx`;

/** Runs one real-corpus preview selection at the Vitest boundary. */
function selectDocument(
  sourcePath: string,
  directoryReads: QuestionDirectoryRead[] = []
) {
  return Effect.runPromise(
    selectPreviewDocument(corpusRoot, sourcePath).pipe(
      Effect.provide(Layer.merge(makeQuestionLayer(directoryReads), Path.layer))
    )
  );
}

describe("preview selection", () => {
  it("selects each real family with its exact ordered source closure", {
    timeout: 30_000,
  }, async () => {
    const [article, material, prompt, answer] = await Promise.all([
      selectDocument(articlePath),
      selectDocument(materialPath),
      selectDocument(promptPath),
      selectDocument(answerPath),
    ]);

    expect(article).toMatchObject({
      document: {
        delivery: "public",
        family: "article",
        sourcePath: articlePath,
      },
      sources: [
        {
          dependencies: [
            {
              mode: "restart",
              sourcePath: "packages/corpus/articles/source.ts",
            },
            {
              mode: "restart",
              sourcePath:
                "packages/corpus/articles/politics/dynastic-politics/asian-values/source.ts",
            },
            {
              mode: "restart",
              sourcePath:
                "packages/corpus/articles/politics/dynastic-politics/asian-values/ref.ts",
            },
            {
              mode: "restart",
              sourcePath: "packages/corpus/articles/schema.ts",
            },
          ],
          family: "article",
        },
      ],
    });
    expect(material).toMatchObject({
      document: {
        delivery: "public",
        family: "material",
        sourcePath: materialPath,
      },
      sources: [
        {
          dependencies: [
            {
              mode: "restart",
              sourcePath: "packages/corpus/material/source.ts",
            },
            {
              mode: "restart",
              sourcePath:
                "packages/corpus/material/lesson/mathematics/function-composition-inverse-function/source.ts",
            },
            {
              mode: "restart",
              sourcePath: "packages/corpus/material/schema.ts",
            },
            {
              mode: "restart",
              sourcePath: "packages/corpus/material/description.ts",
            },
            {
              mode: "restart",
              sourcePath: "packages/corpus/route/schema.ts",
            },
          ],
          family: "material",
        },
      ],
    });
    expect(prompt).toMatchObject({
      document: {
        delivery: "authenticated",
        family: "question",
        identity: { bodyKind: "question" },
        sourcePath: promptPath,
      },
      sources: [
        {
          dependencies: [
            {
              mode: "reload",
              sourcePath: `${questionRoot}/choices.ts`,
            },
            {
              mode: "restart",
              sourcePath: "packages/corpus/tryout/registry.ts",
            },
            {
              mode: "restart",
              sourcePath: "packages/corpus/tryout/indonesia/snbt/source.ts",
            },
            {
              mode: "restart",
              sourcePath: "packages/corpus/tryout/schema.ts",
            },
            {
              mode: "restart",
              sourcePath: "packages/corpus/route/schema.ts",
            },
          ],
          entry: { sourcePath: promptPath },
          family: "question",
        },
      ],
    });
    expect(answer).toMatchObject({
      document: {
        delivery: "entitled",
        family: "question",
        identity: { bodyKind: "answer" },
        sourcePath: answerPath,
      },
    });
    expect(answer.sources.map(({ entry }) => entry.sourcePath)).toEqual([
      promptPath,
      answerPath,
    ]);
  });

  it("reads only the selected question directory without a recursive bank scan", async () => {
    const directoryReads: QuestionDirectoryRead[] = [];

    await selectDocument(promptPath, directoryReads);

    expect(directoryReads).toEqual([
      {
        path: `${corpusRoot}/${questionRoot}`,
        recursive: false,
      },
    ]);
  });

  it("rejects invalid, unsupported, and unregistered source paths", {
    timeout: 30_000,
  }, async () => {
    const failures = await Promise.all(
      [
        "../packages/corpus/articles/invalid.mdx",
        "packages/corpus/team/nabil.ts",
        "packages/corpus/articles/politics/missing/article/en.mdx",
        "packages/corpus/material/lesson/mathematics/missing/lesson/en.mdx",
        `${questionRoot}/missing.en.mdx`,
      ].map((sourcePath) =>
        Effect.runPromise(
          selectPreviewDocument(corpusRoot, sourcePath).pipe(
            Effect.provide(Layer.merge(makeQuestionLayer(), Path.layer)),
            Effect.flip
          )
        )
      )
    );

    expect(failures.map(({ _tag }) => _tag)).toEqual([
      "PreviewSelectionError",
      "PreviewSelectionError",
      "PreviewSelectionError",
      "PreviewSelectionError",
      "QuestionPathError",
    ]);
    expect(failures.slice(0, 4)).toMatchObject([
      { reason: "path" },
      { reason: "missing" },
      { reason: "missing" },
      { reason: "missing" },
    ]);
    expect(failures[4]).toMatchObject({ reason: "grammar" });
  });
});
