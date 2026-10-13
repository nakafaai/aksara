import { describe, expect, it } from "@effect/vitest";
import { Schema } from "effect";

import {
  AssessmentDocumentSchema,
  ContentDocumentSchema,
  documentPlacements,
  MAX_DOCUMENT_BYTES,
  MAX_DOCUMENT_DEPTH,
} from "#contracts/assessment/document";
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
import { encodeJsonText } from "#contracts/text/json";

/** Counts the UTF-8 bytes of the JSON text of one value. */
function encodedBytes(value: unknown) {
  return new TextEncoder().encode(encodeJsonText(value)).byteLength;
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

    for (const node of [
      { attrs: { latex: "x", mathml }, type: "mathInline" },
      { attrs: { latex: "x", mathml }, type: "mathBlock" },
    ]) {
      expect(failsStrict(AssessmentDocumentSchema, doc(paragraph(node)))).toBe(
        true
      );
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

describe("assessment document bounds", () => {
  it("accepts the deepest document and rejects one level more", () => {
    expect(MAX_DOCUMENT_DEPTH).toBe(16);
    const deepest = nested(MAX_DOCUMENT_DEPTH - 3);

    expect(failsStrict(AssessmentDocumentSchema, deepest)).toBe(false);
    expect(
      failsStrict(AssessmentDocumentSchema, nested(MAX_DOCUMENT_DEPTH - 2))
    ).toBe(true);
  });

  it("accepts a document of exactly 1 MiB of encoded JSON and rejects one byte more", () => {
    const overhead = encodedBytes(note("a")) - 1;
    const largest = note("a".repeat(MAX_DOCUMENT_BYTES - overhead));

    expect(MAX_DOCUMENT_BYTES).toBe(1_048_576);
    expect(encodedBytes(largest)).toBe(MAX_DOCUMENT_BYTES);
    expect(failsStrict(AssessmentDocumentSchema, largest)).toBe(false);
    expect(
      failsStrict(
        AssessmentDocumentSchema,
        note("a".repeat(MAX_DOCUMENT_BYTES - overhead + 1))
      )
    ).toBe(true);
  });

  it("counts bytes, not characters", () => {
    const overhead = encodedBytes(note("a")) - 1;

    expect(
      failsStrict(
        AssessmentDocumentSchema,
        note("é".repeat((MAX_DOCUMENT_BYTES - overhead) / 2 + 1))
      )
    ).toBe(true);
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
