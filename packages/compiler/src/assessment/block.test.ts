import { assert, describe, it } from "@effect/vitest";
import { Array as Arr, Effect } from "effect";
import { blocks, reason } from "#compiler/test/assessment";

describe("blockChildren", () => {
  it.effect(
    "reads tight list items, fragments, and a mark set twice as one",
    () =>
      Effect.gen(function* () {
        const [list] = yield* blocks("- **a** and b\n- c");
        const [fragment] = yield* blocks("<>\n\nIn a fragment.\n\n</>");
        const [nested] = yield* blocks("<strong>a <strong>b</strong></strong>");
        const [empty, heading] = yield* blocks("- <strong></strong>\n\n#");
        const [counted] = yield* blocks("1. a\n2. b");

        assert.deepStrictEqual(
          list?.type === "bulletList" && list.content[0]?.content[0],
          {
            content: [
              { marks: [{ type: "bold" }], text: "a", type: "text" },
              { text: " and b", type: "text" },
            ],
            type: "paragraph",
          }
        );
        assert.deepStrictEqual(fragment, {
          content: [{ text: "In a fragment.", type: "text" }],
          type: "paragraph",
        });
        assert.deepStrictEqual(
          empty?.type === "bulletList" && empty.content[0]?.content,
          [{ type: "paragraph" }]
        );
        assert.deepStrictEqual(heading, {
          attrs: { level: 1 },
          type: "heading",
        });
        assert.deepStrictEqual(
          counted?.type === "orderedList" && counted.attrs,
          { start: 1 }
        );
        assert.deepStrictEqual(nested, {
          content: [{ marks: [{ type: "bold" }], text: "a b", type: "text" }],
          type: "paragraph",
        });
      })
  );
});

describe("lesson layout and emphasis", () => {
  it.effect(
    "writes a highlight as a mark and groups blocks as a lesson does",
    () =>
      Effect.gen(function* () {
        const result = yield* blocks(
          Arr.join(
            [
              'Keep <Highlight>the same distance</Highlight> and <Highlight variant="success">done</Highlight>.',
              "",
              "<ContentStack>",
              '<BlockMath math="x = 2" />',
              "<ContentBlock>",
              "Inside.",
              "</ContentBlock>",
              "</ContentStack>",
            ],
            "\n"
          )
        );

        assert.deepStrictEqual(result, [
          {
            content: [
              { text: "Keep ", type: "text" },
              {
                marks: [{ attrs: { variant: null }, type: "highlight" }],
                text: "the same distance",
                type: "text",
              },
              { text: " and ", type: "text" },
              {
                marks: [{ attrs: { variant: "success" }, type: "highlight" }],
                text: "done",
                type: "text",
              },
              { text: ".", type: "text" },
            ],
            type: "paragraph",
          },
          {
            content: [
              { attrs: { latex: "x = 2" }, type: "mathBlock" },
              {
                content: [
                  {
                    content: [{ text: "Inside.", type: "text" }],
                    type: "paragraph",
                  },
                ],
                type: "contentBlock",
              },
            ],
            type: "contentStack",
          },
        ]);
      })
  );

  it.effect(
    "refuses an empty group, a highlight tone outside the catalog, and a grid",
    () =>
      Effect.gen(function* () {
        assert.strictEqual(
          yield* reason("<ContentStack></ContentStack>"),
          "document"
        );
        for (const highlight of [
          '<Highlight variant="danger">risk</Highlight>',
          '<Highlight tone="warning">risk</Highlight>',
        ]) {
          assert.strictEqual(yield* reason(`A ${highlight}.`), "props");
        }
        assert.strictEqual(
          yield* reason("<ContentGrid>x</ContentGrid>"),
          "ContentTreeEvaluationError"
        );
      })
  );
});
