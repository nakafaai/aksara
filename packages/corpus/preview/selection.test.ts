import { NodeServices } from "@effect/platform-node";
import { describe, expect, it } from "@effect/vitest";
import {
  type AppLocaleCode,
  AppLocaleSchema,
} from "@nakafa/aksara-contracts/locale";
import { Effect } from "effect";
import { selectPreviewDocument } from "#corpus/preview/selection";
import { corpusRoot } from "#corpus/test/root";

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
const questionPath =
  "packages/corpus/question-bank/tryout/indonesia/snbt/reading-comprehension-and-writing/set-1/question-1/question.id.mdx";

/** Selects one real-corpus preview document for native Effect tests. */
function selectDocument(sourcePath: string, appLocale?: AppLocaleCode) {
  return Effect.gen(function* () {
    const root = yield* corpusRoot;
    return yield* selectPreviewDocument(
      root,
      sourcePath,
      appLocale === undefined ? undefined : AppLocaleSchema.make(appLocale)
    );
  }).pipe(Effect.provide(NodeServices.layer));
}

describe("preview selection", () => {
  it.effect(
    "selects each public family with its exact ordered source closure",
    () =>
      Effect.gen(function* () {
        const [article, material, page, germanPage] = yield* Effect.all([
          selectDocument(articlePath, "en"),
          selectDocument(materialPath, "id"),
          selectDocument(pagePath, "en"),
          selectDocument(germanPagePath, "de"),
        ]);

        expect(article).toMatchObject({
          document: {
            delivery: "public",
            family: "article",
            sourcePath: articlePath,
          },
          source: {
            dependencies: [
              "packages/corpus/articles/source.ts",
              "packages/corpus/articles/politics/dynastic-politics/asian-values/source.ts",
              "packages/corpus/articles/politics/category.ts",
              "packages/corpus/articles/politics/dynastic-politics/asian-values/ref.ts",
              "packages/corpus/articles/schema.ts",
              "packages/corpus/locale/source.ts",
            ],
            family: "article",
          },
        });
        expect(material).toMatchObject({
          document: {
            delivery: "public",
            family: "material",
            sourcePath: materialPath,
          },
          source: {
            dependencies: [
              "packages/corpus/material/source.ts",
              "packages/corpus/material/lesson/mathematics/function-composition-inverse-function/source.ts",
              "packages/corpus/material/schema.ts",
              "packages/corpus/locale/source.ts",
              "packages/corpus/material/description.ts",
              "packages/corpus/route/schema.ts",
            ],
            family: "material",
          },
        });
        expect(page).toMatchObject({
          document: {
            delivery: "public",
            family: "page",
            sourcePath: pagePath,
          },
          source: { family: "page" },
        });
        expect(germanPage).toMatchObject({
          document: {
            delivery: "public",
            family: "page",
            sourcePath: germanPagePath,
          },
          source: { family: "page" },
        });
        expect(page.source.dependencies).toEqual(pageRestartSourcePaths);
        expect(germanPage.source.dependencies).toEqual(pageRestartSourcePaths);
      }),
    { timeout: 30_000 }
  );

  it.effect(
    "rejects an explicit shell locale that contradicts a public body",
    () =>
      Effect.gen(function* () {
        const [article, material, page] = yield* Effect.forEach(
          [articlePath, materialPath, pagePath],
          (sourcePath) => selectDocument(sourcePath, "de").pipe(Effect.flip)
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
        const failures = yield* Effect.forEach(
          [
            "../packages/corpus/articles/invalid.mdx",
            "packages/corpus/team/nabil.ts",
            "packages/corpus/articles/politics/missing/article/en.mdx",
            "packages/corpus/material/lesson/mathematics/missing/lesson/en.mdx",
            "packages/corpus/pages/missing/en.mdx",
            questionPath,
          ],
          (sourcePath) => selectDocument(sourcePath).pipe(Effect.flip)
        );

        expect(failures).toMatchObject([
          { _tag: "PreviewSelectionError", reason: "path" },
          { _tag: "PreviewSelectionError", reason: "missing" },
          { _tag: "PreviewSelectionError", reason: "missing" },
          { _tag: "PreviewSelectionError", reason: "missing" },
          { _tag: "PreviewSelectionError", reason: "missing" },
          { _tag: "PreviewSelectionError", reason: "missing" },
        ]);
      }),
    { timeout: 30_000 }
  );
});
