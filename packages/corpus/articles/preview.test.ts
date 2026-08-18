import { NodeContext } from "@effect/platform-node";
import { CorpusSourcePathSchema } from "@nakafa/aksara-contracts/ids";
import { Effect } from "effect";
import { describe, expect, it } from "vitest";

import {
  decodeArticlePreviewEntries,
  decodeArticlePreviewEntry,
} from "#corpus/articles/preview";
import { selectArticleEntries } from "#corpus/preview/public";
import { articleSource, germanArticleCatalog } from "#corpus/test/article";
import { corpusRoot } from "#corpus/test/question-layer";

const englishPath = CorpusSourcePathSchema.make(
  "packages/corpus/articles/politics/dynastic-politics/asian-values/en.mdx"
);
const germanPath = CorpusSourcePathSchema.make(
  "packages/corpus/articles/politics/dynastic-politics/asian-values/de.mdx"
);

describe("article preview projection", () => {
  it("projects active and candidate bodies through their distinct owners", async () => {
    const entries = await Effect.runPromise(
      decodeArticlePreviewEntries(
        [englishPath, germanPath],
        [articleSource()],
        germanArticleCatalog()
      )
    );

    expect(entries.map(({ route }) => route.appLocale)).toEqual(["en", "de"]);
    expect(entries.find(({ route }) => route.appLocale === "de")).toMatchObject(
      {
        categoryTitle: "Politik",
        route: {
          contentKey: "articles/politics/dynastic-politics-asian-values",
          publicPath:
            "articles/politik/dynastische-politik-und-asiatische-werte",
        },
      }
    );
  });

  it("returns one exact selected entry and no invented unselected body", async () => {
    const selected = await Effect.runPromise(
      decodeArticlePreviewEntry(
        germanPath,
        [articleSource()],
        germanArticleCatalog()
      )
    );
    const empty = await Effect.runPromise(
      decodeArticlePreviewEntries([], [articleSource()], germanArticleCatalog())
    );

    if (selected === undefined) {
      throw new Error("Expected the selected German article.");
    }
    const [selection, repeated] = await Effect.runPromise(
      selectArticleEntries(corpusRoot, [selected, selected]).pipe(
        Effect.provide(NodeContext.layer)
      )
    );
    if (!(selection && repeated)) {
      throw new Error("Expected both repeated article selections.");
    }

    expect(selected?.sourcePath).toBe(germanPath);
    expect(empty).toEqual([]);
    expect(selection.sources[0].dependencies.slice(-4)).toEqual([
      {
        mode: "restart",
        sourcePath: "packages/corpus/articles/locale.ts",
      },
      {
        mode: "restart",
        sourcePath: "packages/corpus/articles/locale-registry.ts",
      },
      {
        mode: "restart",
        sourcePath: "packages/corpus/articles/politics/locale/de.ts",
      },
      {
        mode: "restart",
        sourcePath:
          "packages/corpus/articles/politics/dynastic-politics/asian-values/locale/de.ts",
      },
    ]);
    expect(repeated.sources[0].dependencies).toEqual(
      selection.sources[0].dependencies
    );
  });
});
