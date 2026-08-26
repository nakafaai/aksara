import { NodeServices } from "@effect/platform-node";
import { expect, layer } from "@effect/vitest";
import { CorpusSourcePathSchema } from "@nakafa/aksara-contracts/ids";
import { Effect } from "effect";

import {
  decodeArticlePreviewEntries,
  decodeArticlePreviewEntry,
} from "#corpus/articles/preview";
import { selectArticleEntries } from "#corpus/preview/public";
import { articleSource } from "#corpus/test/article";
import { corpusRoot } from "#corpus/test/question-layer";

const englishPath = CorpusSourcePathSchema.make(
  "packages/corpus/articles/politics/dynastic-politics/asian-values/en.mdx"
);
const germanPath = CorpusSourcePathSchema.make(
  "packages/corpus/articles/politics/dynastic-politics/asian-values/de.mdx"
);

layer(NodeServices.layer)("article preview projection", (it) => {
  it.effect("projects every selected body through one source owner", () =>
    Effect.gen(function* () {
      const entries = yield* decodeArticlePreviewEntries(
        [englishPath, germanPath],
        [articleSource()]
      );

      expect(entries.map(({ route }) => route.appLocale)).toEqual(["en", "de"]);
      expect(
        entries.find(({ route }) => route.appLocale === "de")
      ).toMatchObject({
        categoryTitle: "Politik",
        route: {
          contentKey: "articles/politics/dynastic-politics-asian-values",
          publicPath:
            "articles/politik/dynastische-politik-und-asiatische-werte",
        },
      });
    })
  );

  it.effect(
    "returns one exact selected entry and no invented unselected body",
    () =>
      Effect.gen(function* () {
        const selected = yield* decodeArticlePreviewEntry(germanPath, [
          articleSource(),
        ]);
        const empty = yield* decodeArticlePreviewEntries([], [articleSource()]);

        expect(selected).toBeDefined();
        if (selected === undefined) {
          return;
        }

        const [selection, repeated] = yield* selectArticleEntries(corpusRoot, [
          selected,
          selected,
        ]);
        expect(selection).toBeDefined();
        expect(repeated).toBeDefined();
        if (!(selection && repeated)) {
          return;
        }

        expect(selected.sourcePath).toBe(germanPath);
        expect(empty).toEqual([]);
        expect(selection.sources[0].dependencies).toContainEqual({
          mode: "restart",
          sourcePath:
            "packages/corpus/articles/politics/dynastic-politics/asian-values/source.ts",
        });
        expect(repeated.sources[0].dependencies).toEqual(
          selection.sources[0].dependencies
        );
      })
  );
});
