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
    "compiles MathContainer, ContentGrid, and fenced code blocks identically to lessons",
    () =>
      Effect.gen(function* () {
        const result = yield* blocks(
          Arr.join(
            [
              "<MathContainer>",
              '<BlockMath math="x + 2 = 5" />',
              '<BlockMath math="x = 3" />',
              "</MathContainer>",
              "",
              "<ContentGrid>",
              "Left.",
              "</ContentGrid>",
              "",
              "```python",
              "print(1)",
              "```",
              "",
              "```",
              "```",
            ],
            "\n"
          )
        );

        assert.deepStrictEqual(result, [
          {
            content: [
              { attrs: { latex: "x + 2 = 5" }, type: "mathBlock" },
              { attrs: { latex: "x = 3" }, type: "mathBlock" },
            ],
            type: "mathContainer",
          },
          {
            content: [
              { content: [{ text: "Left.", type: "text" }], type: "paragraph" },
            ],
            type: "contentGrid",
          },
          {
            attrs: { language: "python" },
            content: [{ text: "print(1)", type: "text" }],
            type: "codeBlock",
          },
          {
            attrs: { language: null },
            type: "codeBlock",
          },
        ]);
      })
  );

  it.effect(
    "refuses empty groups, invalid MathContainer children, highlight tones, and bare pre blocks",
    () =>
      Effect.gen(function* () {
        assert.strictEqual(
          yield* reason("<ContentStack></ContentStack>"),
          "document"
        );
        assert.strictEqual(
          yield* reason("<ContentGrid></ContentGrid>"),
          "document"
        );
        assert.strictEqual(
          yield* reason("<MathContainer></MathContainer>"),
          "document"
        );
        assert.strictEqual(
          yield* reason("<MathContainer>Not math</MathContainer>"),
          "placement"
        );
        assert.strictEqual(
          yield* reason("<MathContainer>\n\nNot math\n\n</MathContainer>"),
          "placement"
        );
        assert.strictEqual(yield* reason("<pre>plain text</pre>"), "placement");
        assert.deepStrictEqual(
          yield* blocks('<pre><code className="other">plain</code></pre>'),
          [
            {
              attrs: { language: null },
              content: [{ text: "plain", type: "text" }],
              type: "codeBlock",
            },
          ]
        );
        assert.deepStrictEqual(
          yield* blocks('<pre><code className="language-">x</code></pre>'),
          [
            {
              attrs: { language: null },
              content: [{ text: "x", type: "text" }],
              type: "codeBlock",
            },
          ]
        );
        for (const highlight of [
          '<Highlight variant="danger">risk</Highlight>',
          '<Highlight tone="warning">risk</Highlight>',
        ]) {
          assert.strictEqual(yield* reason(`A ${highlight}.`), "props");
        }
      })
  );
});
