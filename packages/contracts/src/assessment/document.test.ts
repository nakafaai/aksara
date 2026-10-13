import { describe, expect, it } from "@effect/vitest";
import { Cause, Exit, Schema } from "effect";

import {
  AssessmentDocumentSchema,
  ContentDocumentSchema,
  documentPlacements,
  MAX_DOCUMENT_DEPTH,
} from "#contracts/assessment/document";
import { MAX_RECORD_BYTES } from "#contracts/assessment/record";
import {
  blockMath,
  decodeStrict,
  doc,
  failsStrict,
  math,
  nested,
  note,
  paragraph,
  place,
  placeInline,
  richDocument,
  text,
  tkaPrompt,
} from "#contracts/test/assessment/document";

/**
 * Decodes one value as a document and tells whether it failed, and whether the
 * failure was a defect, such as a stack overflow, instead of a typed failure.
 */
function failureOf(input: unknown) {
  const exit = Schema.decodeUnknownExit(AssessmentDocumentSchema)(input, {
    onExcessProperty: "error",
  });
  if (!Exit.isFailure(exit)) {
    return { defect: false, failed: false, message: "" };
  }
  return {
    defect: Cause.hasDies(exit.cause),
    failed: true,
    message: String(Cause.squash(exit.cause)),
  };
}

describe("assessment document nodes", () => {
  it("decodes a prompt and every node kind, and encodes them back unchanged", () => {
    for (const input of [tkaPrompt, richDocument]) {
      const decoded = decodeStrict(AssessmentDocumentSchema, input);

      expect(Schema.encodeSync(AssessmentDocumentSchema)(decoded)).toEqual(
        input
      );
    }
  });

  it("stores LaTeX once and never accepts MathML beside it", () => {
    const mathml = "<math><mi>x</mi></math>";

    // Each node sits where its kind belongs, and decodes without the MathML.
    for (const [alone, withMathml] of [
      [
        doc(paragraph(math("x"))),
        doc(paragraph({ attrs: { latex: "x", mathml }, type: "mathInline" })),
      ],
      [
        doc(blockMath("x")),
        doc({ attrs: { latex: "x", mathml }, type: "mathBlock" }),
      ],
    ]) {
      expect(failsStrict(AssessmentDocumentSchema, alone)).toBe(false);
      expect(failsStrict(AssessmentDocumentSchema, withMathml)).toBe(true);
    }
    expect(failsStrict(AssessmentDocumentSchema, doc(blockMath("")))).toBe(
      true
    );
    expect(
      failsStrict(AssessmentDocumentSchema, doc(paragraph(math(" x "))))
    ).toBe(true);
  });

  it("rejects what ProseMirror would not write", () => {
    for (const input of [
      doc(),
      doc({ content: [], type: "paragraph" }),
      doc(paragraph(text(""))),
      doc({ attrs: { level: 4 }, content: [text("x")], type: "heading" }),
      doc({ type: "video" }),
      doc({ attrs: { start: 0 }, content: [], type: "orderedList" }),
      doc({
        content: [{ content: [blockMath("x")], type: "listItem" }],
        type: "bulletList",
      }),
      doc({
        content: [
          {
            content: [
              {
                attrs: { colspan: 0, rowspan: 1 },
                content: [paragraph(text("x"))],
                type: "tableCell",
              },
            ],
            type: "tableRow",
          },
        ],
        type: "table",
      }),
      doc({
        attrs: { language: null },
        content: [
          {
            marks: [{ type: "bold" }],
            text: "let x = 1;",
            type: "text",
          },
        ],
        type: "codeBlock",
      }),
      doc(paragraph({ ...text("x"), color: "red" })),
      doc(
        paragraph({
          marks: [{ type: "italic" }, { type: "bold" }],
          text: "x",
          type: "text",
        })
      ),
      doc(paragraph(text("a"), text("b"))),
    ]) {
      expect(failsStrict(AssessmentDocumentSchema, input)).toBe(true);
    }
  });
});

describe("input that is not a document", () => {
  it("fails with a typed failure, whatever its shape, and never with a defect", () => {
    for (const input of [
      undefined,
      null,
      "doc",
      42,
      [],
      [doc()],
      {},
      { type: "doc" },
      { content: "x", type: "doc" },
      doc("x"),
      doc(null),
      doc(paragraph("x")),
    ]) {
      expect(failureOf(input)).toMatchObject({ defect: false, failed: true });
    }
  });
});

describe("assessment document bounds", () => {
  it("accepts the deepest document and rejects one level more", () => {
    expect(MAX_DOCUMENT_DEPTH).toBe(16);
    const deepest = nested(MAX_DOCUMENT_DEPTH - 3);

    expect(failsStrict(AssessmentDocumentSchema, deepest)).toBe(false);
    expect(
      failsStrict(AssessmentDocumentSchema, nested(MAX_DOCUMENT_DEPTH - 2))
    ).toBe(true);
  });

  it("fails a document of hundreds or thousands of levels with the depth error, never with a defect", () => {
    for (const quotes of [400, 3000, 100_000]) {
      expect(failureOf(nested(quotes))).toMatchObject({
        defect: false,
        failed: true,
        message: expect.stringContaining(
          `at most ${MAX_DOCUMENT_DEPTH} levels deep`
        ),
      });
    }
    expect(failureOf(nested(MAX_DOCUMENT_DEPTH - 3)).failed).toBe(false);
  });

  it("has no size limit of its own, because Convex limits the whole record that holds it", () => {
    // A document is only a part of a stored row, so the records measure the size.
    const large = note("a".repeat(MAX_RECORD_BYTES));

    expect(failsStrict(AssessmentDocumentSchema, large)).toBe(false);
    expect(failsStrict(ContentDocumentSchema, large)).toBe(false);
  });
});

describe("assessment document interaction places", () => {
  it("lists every place of an interaction in reading order", () => {
    const prompt = decodeStrict(
      AssessmentDocumentSchema,
      doc(
        paragraph(
          text("a "),
          placeInline("blank-1"),
          text(" b "),
          placeInline("gaps", "gap-1")
        ),
        place("choice-1")
      )
    );

    expect(documentPlacements(prompt)).toEqual([
      {
        attrs: { gap: null, interaction: "blank-1" },
        type: "inlineInteraction",
      },
      {
        attrs: { gap: "gap-1", interaction: "gaps" },
        type: "inlineInteraction",
      },
      { attrs: { interaction: "choice-1" }, type: "interaction" },
    ]);
  });

  it("lets only the prompt of an item place interactions", () => {
    expect(failsStrict(ContentDocumentSchema, richDocument)).toBe(false);
    expect(failsStrict(ContentDocumentSchema, tkaPrompt)).toBe(true);
    expect(
      failsStrict(ContentDocumentSchema, doc(paragraph(placeInline("blank-1"))))
    ).toBe(true);
    expect(failsStrict(AssessmentDocumentSchema, tkaPrompt)).toBe(false);
  });
});
