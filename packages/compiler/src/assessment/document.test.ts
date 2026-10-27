import { assert, describe, it } from "@effect/vitest";
import { Array as Arr, Effect } from "effect";
import { compileContentDocument } from "#compiler/assessment/document";
import { blocks, reason, site } from "#compiler/test/assessment";

describe("compileAssessmentBlocks", () => {
  it.effect(
    "writes paragraphs with marks, links, breaks, and inline math",
    () =>
      Effect.gen(function* () {
        const result = yield* blocks(
          'A **bold** and *slanted* `code` run with <InlineMath math=" x^2 " /> and [a link](https://nakafa.com).\nNext line<br />after a break.'
        );

        assert.deepStrictEqual(result, [
          {
            content: [
              { text: "A ", type: "text" },
              { marks: [{ type: "bold" }], text: "bold", type: "text" },
              { text: " and ", type: "text" },
              { marks: [{ type: "italic" }], text: "slanted", type: "text" },
              { text: " ", type: "text" },
              { marks: [{ type: "code" }], text: "code", type: "text" },
              { text: " run with ", type: "text" },
              { attrs: { latex: "x^2" }, type: "mathInline" },
              { text: " and ", type: "text" },
              {
                marks: [
                  { attrs: { href: "https://nakafa.com" }, type: "link" },
                ],
                text: "a link",
                type: "text",
              },
              { text: ". Next line", type: "text" },
              { type: "hardBreak" },
              { text: "after a break.", type: "text" },
            ],
            type: "paragraph",
          },
        ]);
      })
  );

  it.effect("writes headings, block math, lists, quotes, and tables", () =>
    Effect.gen(function* () {
      const result = yield* blocks(
        Arr.join(
          [
            "# First",
            "",
            "## Second",
            "",
            '<BlockMath math="a=b" />',
            "",
            "- one",
            "- two",
            "",
            "3. three",
            "4. four",
            "",
            "> quoted",
            "",
            "| A | B |",
            "| --- | --- |",
            "| 1 | |",
          ],
          "\n"
        )
      );

      assert.deepStrictEqual(result, [
        {
          attrs: { level: 1 },
          content: [{ text: "First", type: "text" }],
          type: "heading",
        },
        {
          attrs: { level: 2 },
          content: [{ text: "Second", type: "text" }],
          type: "heading",
        },
        { attrs: { latex: "a=b" }, type: "mathBlock" },
        {
          content: [
            {
              content: [
                { content: [{ text: "one", type: "text" }], type: "paragraph" },
              ],
              type: "listItem",
            },
            {
              content: [
                { content: [{ text: "two", type: "text" }], type: "paragraph" },
              ],
              type: "listItem",
            },
          ],
          type: "bulletList",
        },
        {
          attrs: { start: 3 },
          content: [
            {
              content: [
                {
                  content: [{ text: "three", type: "text" }],
                  type: "paragraph",
                },
              ],
              type: "listItem",
            },
            {
              content: [
                {
                  content: [{ text: "four", type: "text" }],
                  type: "paragraph",
                },
              ],
              type: "listItem",
            },
          ],
          type: "orderedList",
        },
        {
          content: [
            { content: [{ text: "quoted", type: "text" }], type: "paragraph" },
          ],
          type: "blockquote",
        },
        {
          content: [
            {
              content: [
                {
                  attrs: { colspan: 1, rowspan: 1 },
                  content: [
                    {
                      content: [{ text: "A", type: "text" }],
                      type: "paragraph",
                    },
                  ],
                  type: "tableHeader",
                },
                {
                  attrs: { colspan: 1, rowspan: 1 },
                  content: [
                    {
                      content: [{ text: "B", type: "text" }],
                      type: "paragraph",
                    },
                  ],
                  type: "tableHeader",
                },
              ],
              type: "tableRow",
            },
            {
              content: [
                {
                  attrs: { colspan: 1, rowspan: 1 },
                  content: [
                    {
                      content: [{ text: "1", type: "text" }],
                      type: "paragraph",
                    },
                  ],
                  type: "tableCell",
                },
                {
                  attrs: { colspan: 1, rowspan: 1 },
                  content: [{ type: "paragraph" }],
                  type: "tableCell",
                },
              ],
              type: "tableRow",
            },
          ],
          type: "table",
        },
      ]);
    })
  );

  it.effect(
    "opens a list item that starts with a list with an empty paragraph",
    () =>
      Effect.gen(function* () {
        const [list] = yield* blocks("- - nested");

        assert.deepStrictEqual(list, {
          content: [
            {
              content: [
                { type: "paragraph" },
                {
                  content: [
                    {
                      content: [
                        {
                          content: [{ text: "nested", type: "text" }],
                          type: "paragraph",
                        },
                      ],
                      type: "listItem",
                    },
                  ],
                  type: "bulletList",
                },
              ],
              type: "listItem",
            },
          ],
          type: "bulletList",
        });
      })
  );

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

  it.effect("refuses what a document cannot hold", () =>
    Effect.gen(function* () {
      assert.strictEqual(yield* reason("<ul></ul>"), "document");
      assert.strictEqual(
        yield* reason("<blockquote></blockquote>"),
        "document"
      );
      assert.strictEqual(yield* reason("<p></p>"), "document");
      assert.strictEqual(yield* reason("<ul><p>x</p></ul>"), "placement");
      assert.strictEqual(yield* reason("<Unclosed"), "MdxCompilationError");
      assert.strictEqual(yield* reason("#### Deep"), "heading");
      assert.strictEqual(yield* reason('<BlockMath math=" " />'), "math");
      assert.strictEqual(yield* reason('Text <InlineMath math="" />'), "math");
      assert.strictEqual(yield* reason("[plain](http://nakafa.com)"), "link");
      assert.strictEqual(yield* reason("~~gone~~"), "placement");
      assert.strictEqual(yield* reason("---"), "element");
      assert.strictEqual(yield* reason(""), "document");
    })
  );
});

describe("compileContentDocument", () => {
  it.effect("checks a document without interaction places", () =>
    Effect.gen(function* () {
      const document = yield* compileContentDocument({
        ...site,
        rawMdx: "Read.",
      });

      assert.deepStrictEqual(document, {
        content: [
          { content: [{ text: "Read.", type: "text" }], type: "paragraph" },
        ],
        type: "doc",
      });
    })
  );

  it.effect("refuses a document deeper than its contract allows", () =>
    Effect.gen(function* () {
      const error = yield* compileContentDocument({
        ...site,
        rawMdx: `${"> ".repeat(15)}deep`,
      }).pipe(Effect.flip);

      assert.strictEqual(
        "reason" in error ? error.reason : error._tag,
        "document"
      );
    })
  );
});
