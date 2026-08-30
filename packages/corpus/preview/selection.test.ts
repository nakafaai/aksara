import { describe, expect, it } from "@effect/vitest";
import {
  type AppLocaleCode,
  AppLocaleSchema,
} from "@nakafa/aksara-contracts/locale";
import { Effect, Layer, Path } from "effect";
import { selectPreviewDocument } from "#corpus/preview/selection";
import { corpusRoot, makeQuestionLayer } from "#corpus/test/question-layer";

const articlePath =
  "packages/corpus/articles/politics/dynastic-politics/asian-values/en.mdx";
const materialPath =
  "packages/corpus/material/lesson/mathematics/function-composition-inverse-function/function-concept/id.mdx";
const pagePath = "packages/corpus/pages/privacy-policy/en.mdx";
const germanPagePath = "packages/corpus/pages/privacy-policy/de.mdx";
const pageRestartSourcePaths = [
  "packages/corpus/pages/source.ts",
  "packages/corpus/pages/registry.ts",
  "packages/corpus/pages/schema.ts",
  "packages/corpus/locale/source.ts",
];
const questionRoot =
  "packages/corpus/question-bank/tryout/indonesia/snbt/reading-and-writing-skills/set-1/question-1";
const promptPath = `${questionRoot}/question.en.mdx`;
const answerPath = `${questionRoot}/answer.en.mdx`;

/** Selects one real-corpus preview document for native Effect tests. */
function selectDocument(sourcePath: string, appLocale?: AppLocaleCode) {
  return selectPreviewDocument(
    corpusRoot,
    sourcePath,
    appLocale === undefined ? undefined : AppLocaleSchema.make(appLocale)
  ).pipe(Effect.provide(Layer.merge(makeQuestionLayer(), Path.layer)));
}

describe("preview selection", () => {
  it.effect(
    "selects each real family with its exact ordered source closure",
    () =>
      Effect.gen(function* () {
        const [article, material, page, germanPage, prompt, answer] =
          yield* Effect.all([
            selectDocument(articlePath, "en"),
            selectDocument(materialPath, "id"),
            selectDocument(pagePath, "en"),
            selectDocument(germanPagePath, "de"),
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
                  sourcePath: "packages/corpus/articles/politics/category.ts",
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
                {
                  mode: "restart",
                  sourcePath: "packages/corpus/locale/source.ts",
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
                  sourcePath: "packages/corpus/locale/source.ts",
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
        expect(page).toMatchObject({
          document: {
            delivery: "public",
            family: "page",
            sourcePath: pagePath,
          },
          sources: [{ family: "page" }],
        });
        expect(germanPage).toMatchObject({
          document: {
            delivery: "public",
            family: "page",
            sourcePath: germanPagePath,
          },
          sources: [{ family: "page" }],
        });
        expect(
          page.sources[0].dependencies.map(({ sourcePath }) => sourcePath)
        ).toEqual(pageRestartSourcePaths);
        expect(
          germanPage.sources[0].dependencies.map(({ sourcePath }) => sourcePath)
        ).toEqual(pageRestartSourcePaths);
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
                  sourcePath: "packages/corpus/tryout/indonesia/country.ts",
                },
                {
                  mode: "restart",
                  sourcePath:
                    "packages/corpus/tryout/indonesia/snbt/official-schedule.ts",
                },
                {
                  mode: "restart",
                  sourcePath: "packages/corpus/tryout/schema.ts",
                },
                {
                  mode: "restart",
                  sourcePath: "packages/corpus/tryout/specification.ts",
                },
                {
                  mode: "restart",
                  sourcePath: "packages/corpus/locale/source.ts",
                },
                {
                  mode: "restart",
                  sourcePath: "packages/corpus/route/schema.ts",
                },
              ],
              directories: [
                {
                  files: [
                    "answer.de.mdx",
                    "answer.en.mdx",
                    "answer.id.mdx",
                    "choices.ts",
                    "question.de.mdx",
                    "question.en.mdx",
                    "question.id.mdx",
                  ],
                  sourcePath: questionRoot,
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
      }),
    { timeout: 30_000 }
  );

  it.effect(
    "rejects an explicit shell locale that contradicts a public body",
    () =>
      Effect.gen(function* () {
        const [article, material, page] = yield* Effect.all(
          [articlePath, materialPath, pagePath].map((sourcePath) =>
            selectPreviewDocument(
              corpusRoot,
              sourcePath,
              AppLocaleSchema.make("de")
            ).pipe(
              Effect.provide(Layer.merge(makeQuestionLayer(), Path.layer)),
              Effect.flip
            )
          )
        );

        expect(article).toMatchObject({
          reason: "locale",
          sourcePath: articlePath,
        });
        expect(material).toMatchObject({
          reason: "locale",
          sourcePath: materialPath,
        });
        expect(page).toMatchObject({ reason: "locale", sourcePath: pagePath });
      })
  );

  it.effect(
    "rejects invalid, unsupported, and unregistered source paths",
    () =>
      Effect.gen(function* () {
        const failures = yield* Effect.all(
          [
            "../packages/corpus/articles/invalid.mdx",
            "packages/corpus/team/nabil.ts",
            "packages/corpus/articles/politics/missing/article/en.mdx",
            "packages/corpus/material/lesson/mathematics/missing/lesson/en.mdx",
            "packages/corpus/pages/missing/en.mdx",
            `${questionRoot}/missing.en.mdx`,
          ].map((sourcePath) =>
            selectPreviewDocument(corpusRoot, sourcePath).pipe(
              Effect.provide(Layer.merge(makeQuestionLayer(), Path.layer)),
              Effect.flip
            )
          )
        );

        expect(failures).toMatchObject([
          { _tag: "PreviewSelectionError", reason: "path" },
          { _tag: "PreviewSelectionError", reason: "missing" },
          { _tag: "PreviewSelectionError", reason: "missing" },
          { _tag: "PreviewSelectionError", reason: "missing" },
          { _tag: "PreviewSelectionError", reason: "missing" },
          { _tag: "QuestionPathError", reason: "grammar" },
        ]);
      }),
    { timeout: 30_000 }
  );
});
