import { assert, describe, it } from "@effect/vitest";
import { Effect } from "effect";
import { blocks } from "#compiler/test/assessment";

describe("inlineContent marks on mathInline", () => {
  it.effect(
    "preserves active bold, highlight, italic, code, and link marks on inline math while omitting marks when unmarked",
    () =>
      Effect.gen(function* () {
        const result = yield* blocks(
          'Lihat **koefisien di depan <InlineMath math="x" />**, <Highlight variant="success">nilai <InlineMath math="y" /></Highlight>, <Highlight>batas <InlineMath math="b" /></Highlight>, *[akar <InlineMath math="r" />](https://nakafa.com)*, dan <InlineMath math="z" />.'
        );

        assert.deepStrictEqual(result, [
          {
            content: [
              { text: "Lihat ", type: "text" },
              {
                marks: [{ type: "bold" }],
                text: "koefisien di depan ",
                type: "text",
              },
              {
                attrs: { latex: "x" },
                marks: [{ type: "bold" }],
                type: "mathInline",
              },
              { text: ", ", type: "text" },
              {
                marks: [{ attrs: { variant: "success" }, type: "highlight" }],
                text: "nilai ",
                type: "text",
              },
              {
                attrs: { latex: "y" },
                marks: [{ attrs: { variant: "success" }, type: "highlight" }],
                type: "mathInline",
              },
              { text: ", ", type: "text" },
              {
                marks: [{ attrs: { variant: null }, type: "highlight" }],
                text: "batas ",
                type: "text",
              },
              {
                attrs: { latex: "b" },
                marks: [{ attrs: { variant: null }, type: "highlight" }],
                type: "mathInline",
              },
              { text: ", ", type: "text" },
              {
                marks: [
                  { type: "italic" },
                  { attrs: { href: "https://nakafa.com" }, type: "link" },
                ],
                text: "akar ",
                type: "text",
              },
              {
                attrs: { latex: "r" },
                marks: [
                  { type: "italic" },
                  { attrs: { href: "https://nakafa.com" }, type: "link" },
                ],
                type: "mathInline",
              },
              { text: ", dan ", type: "text" },
              { attrs: { latex: "z" }, type: "mathInline" },
              { text: ".", type: "text" },
            ],
            type: "paragraph",
          },
        ]);
      })
  );
});
