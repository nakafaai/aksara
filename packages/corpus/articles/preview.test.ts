import { NodeServices } from "@effect/platform-node";
import { CorpusSourcePathSchema } from "@nakafa/aksara-contracts/ids";
import { describe, expect, it } from "@nakafa/testing/effect";
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

describe("article preview projection", () => {
  it("projects every selected body through one source owner", async () => {
    const entries = await Effect.runPromise(
      decodeArticlePreviewEntries([englishPath, germanPath], [articleSource()])
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
      decodeArticlePreviewEntry(germanPath, [articleSource()])
    );
    const empty = await Effect.runPromise(
      decodeArticlePreviewEntries([], [articleSource()])
    );

    if (selected === undefined) {
      throw new Error("Expected the selected German article.");
    }
    const [selection, repeated] = await Effect.runPromise(
      selectArticleEntries(corpusRoot, [selected, selected]).pipe(
        Effect.provide(NodeServices.layer)
      )
    );
    if (!(selection && repeated)) {
      throw new Error("Expected both repeated article selections.");
    }

    expect(selected?.sourcePath).toBe(germanPath);
    expect(empty).toEqual([]);
    expect(selection.sources[0].dependencies).toContainEqual({
      mode: "restart",
      sourcePath:
        "packages/corpus/articles/politics/dynastic-politics/asian-values/source.ts",
    });
    expect(repeated.sources[0].dependencies).toEqual(
      selection.sources[0].dependencies
    );
  });
});
