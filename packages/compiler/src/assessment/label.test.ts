import { assert, describe, it } from "@effect/vitest";
import {
  ContentKeySchema,
  CorpusSourcePathSchema,
} from "@nakafa/aksara-contracts/ids";
import { Array as Arr, Effect } from "effect";
import { labelDocument } from "#compiler/assessment/label";

const site = {
  contentKey: ContentKeySchema.make("test-bank/test-set/question-1/item"),
  sourcePath: CorpusSourcePathSchema.make(
    "packages/corpus/test-bank/test-set/question-1/item.ts"
  ),
};

describe("labelDocument", () => {
  it.effect("writes a Markdown label with inline math as a document", () =>
    Effect.gen(function* () {
      const document = yield* labelDocument(
        "The **root** is $$x=4$$, see `x`.",
        site
      );

      assert.deepStrictEqual(document, {
        content: [
          {
            content: [
              { text: "The ", type: "text" },
              { marks: [{ type: "bold" }], text: "root", type: "text" },
              { text: " is ", type: "text" },
              { attrs: { latex: "x=4" }, type: "mathInline" },
              { text: ", see ", type: "text" },
              { marks: [{ type: "code" }], text: "x", type: "text" },
              { text: ".", type: "text" },
            ],
            type: "paragraph",
          },
        ],
        type: "doc",
      });
    })
  );

  it.effect(
    "keeps the lists, tables, quotes, links, and breaks a label may hold",
    () =>
      Effect.gen(function* () {
        const document = yield* labelDocument(
          Arr.join(
            [
              "1. *one*",
              "",
              "> [site](https://nakafa.com)  ",
              "> next",
              "",
              "| A |",
              "| - |",
              "| 1 |",
            ],
            "\n"
          ),
          site
        );

        assert.deepStrictEqual(
          Arr.map(document.content, ({ type }) => type),
          ["orderedList", "blockquote", "table"]
        );
      })
  );

  it.effect(
    "writes display math as a block and a dash list as a bullet list",
    () =>
      Effect.gen(function* () {
        const math = yield* labelDocument("$$\nx=1\n$$", site);
        const list = yield* labelDocument("- one\n- two", site);

        assert.deepStrictEqual(math, {
          content: [{ attrs: { latex: "x=1" }, type: "mathBlock" }],
          type: "doc",
        });
        assert.strictEqual(list.content[0]?.type, "bulletList");
      })
  );

  it.effect("refuses Markdown that a document has no node for", () =>
    Effect.gen(function* () {
      const html = yield* labelDocument("<b>bold</b>", site).pipe(Effect.flip);
      const heading = yield* labelDocument("# Title", site).pipe(Effect.flip);
      const empty = yield* labelDocument(" ", site).pipe(Effect.flip);

      assert.deepStrictEqual(
        [html.reason, heading.reason, empty.reason],
        ["placement", "element", "document"]
      );
    })
  );
});
