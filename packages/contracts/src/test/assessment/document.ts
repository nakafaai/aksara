import { Array as Arr, Exit, Schema } from "effect";

/** Strictly decodes one value, as every contract decoder does. */
export function decodeStrict<A, I>(schema: Schema.Codec<A, I>, input: unknown) {
  return Schema.decodeUnknownSync(schema)(input, { onExcessProperty: "error" });
}

/** Returns whether strict decoding of one value fails. */
export function failsStrict<A, I>(schema: Schema.Codec<A, I>, input: unknown) {
  return Exit.isFailure(
    Schema.decodeUnknownExit(schema)(input, { onExcessProperty: "error" })
  );
}

/** Builds one text node, with the marks in the order given. */
export function text(value: string, ...marks: readonly string[]) {
  return marks.length === 0
    ? { text: value, type: "text" }
    : {
        marks: Arr.map(marks, (type) =>
          type === "link"
            ? { attrs: { href: "https://nakafa.com" }, type }
            : { type }
        ),
        text: value,
        type: "text",
      };
}

/** Builds one inline math node. */
export function math(latex: string) {
  return { attrs: { latex }, type: "mathInline" };
}

/** Builds one paragraph of inline nodes. */
export function paragraph(...content: readonly unknown[]) {
  return { content, type: "paragraph" };
}

/** Builds one block math node. */
export function blockMath(latex: string) {
  return { attrs: { latex }, type: "mathBlock" };
}

/** Builds one block that places an interaction. */
export function place(interaction: string) {
  return { attrs: { interaction }, type: "interaction" };
}

/** Builds one inline node that places an interaction, or one gap of it. */
export function placeInline(interaction: string, gap: string | null = null) {
  return { attrs: { gap, interaction }, type: "inlineInteraction" };
}

/** Builds one document of blocks. */
export function doc(...content: readonly unknown[]) {
  return { content, type: "doc" };
}

/** Builds one document of a single paragraph of plain text. */
export function note(value: string) {
  return doc(paragraph(text(value)));
}

/** Wraps a paragraph of text in the given number of block quotes. */
function quoted(quotes: number): unknown {
  return quotes === 0
    ? paragraph(text("deep"))
    : { content: [quoted(quotes - 1)], type: "blockquote" };
}

/**
 * Nests a paragraph inside the given number of block quotes. The document is
 * the `doc` level, the quotes, the paragraph, and its text: `quotes + 3` levels.
 */
export function nested(quotes: number) {
  return doc(quoted(quotes));
}

/** The prompt of TKA compulsory mathematics set 1, question 15, in Indonesian. */
export const tkaPrompt = doc(
  paragraph(
    text("Transformasi "),
    math("T"),
    text(
      " mula-mula mendilatasi suatu bangun berpusat di titik asal dengan faktor "
    ),
    math("2"),
    text(", lalu merotasi hasilnya sebesar "),
    math("90^\\circ"),
    text(
      " berlawanan arah jarum jam terhadap titik asal. Pilih semua pernyataan yang benar."
    )
  ),
  place("statements")
);

/** A document with every block and inline node the contract knows. */
export const richDocument = doc(
  { attrs: { level: 2 }, content: [text("Langkah 1")], type: "heading" },
  paragraph(
    text("Kalikan "),
    text("kedua", "bold", "italic", "underline"),
    text(" sisi, lihat "),
    text("sumber", "link"),
    { type: "hardBreak" },
    text("x", "subscript"),
    text("2", "superscript"),
    text("kode", "code")
  ),
  blockMath("\\begin{aligned}\nV &= s^3 \\\\\n&= 64\n\\end{aligned}"),
  {
    content: [
      {
        content: [
          paragraph(text("satu")),
          {
            content: [
              { content: [paragraph(text("bersarang"))], type: "listItem" },
            ],
            type: "bulletList",
          },
        ],
        type: "listItem",
      },
    ],
    type: "bulletList",
  },
  {
    attrs: { start: 3 },
    content: [{ content: [paragraph(text("tiga"))], type: "listItem" }],
    type: "orderedList",
  },
  {
    content: [
      {
        content: [
          {
            attrs: { colspan: 1, rowspan: 1 },
            content: [paragraph(text("x"))],
            type: "tableHeader",
          },
          {
            attrs: { colspan: 2, rowspan: 1 },
            content: [paragraph(text("y"))],
            type: "tableCell",
          },
        ],
        type: "tableRow",
      },
    ],
    type: "table",
  },
  { content: [paragraph(text("kutipan"))], type: "blockquote" },
  {
    attrs: { language: null },
    content: [{ text: "let x = 1;", type: "text" }],
    type: "codeBlock",
  },
  {
    attrs: {
      alt: "Sebuah tangki kubus",
      asset: "asset-tank",
      height: 240,
      width: 320,
    },
    type: "image",
  },
  { type: "paragraph" }
);
