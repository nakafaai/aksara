import { assert, it } from "@effect/vitest";
import type { AppLocaleCode } from "@nakafa/aksara-contracts/locale";
import { wrapNumbers } from "#nakafa-content/math/wrap";
import { parseLessonMdx } from "#nakafa-content/mdx/parse";

/** Wraps one source, Indonesian by default, and returns what it left. */
function wrap(source: string, locale: AppLocaleCode = "id") {
  const result = wrapNumbers(source, parseLessonMdx(source), locale);
  return {
    left: result.left.map((offset) => source.slice(offset, offset + 4)),
    source: result.source,
    wrapped: result.wrapped,
  };
}

it("wraps the owner's example and leaves its labels alone", () => {
  assert.deepEqual(
    wrap(
      'Soal 1 SNBT 2027: Bilangan <InlineMath math="n" /> bersisa 2 jika dibagi 5. Sisa <InlineMath math="n^2+n" /> oleh 55 adalah ....'
    ),
    {
      left: [],
      source:
        'Soal 1 SNBT 2027: Bilangan <InlineMath math="n" /> bersisa <InlineMath math="2" /> jika dibagi <InlineMath math="5" />. Sisa <InlineMath math="n^2+n" /> oleh <InlineMath math="55" /> adalah ....',
      wrapped: 3,
    }
  );
});

it("wraps units, headings, tables, emphasis, and JSX text in props", () => {
  const source = [
    "## Ada 3 cara",
    "",
    "Panjangnya **2,5 m** dan luasnya 4 cm².",
    "",
    "| Kota | Jumlah |",
    "| --- | --- |",
    "| Bandung | 65 |",
    "",
    "<MathVisual description={<>Sisi 4 cm</>} />",
  ].join("\n");
  assert.equal(
    wrap(source).source,
    [
      '## Ada <InlineMath math="3" /> cara',
      "",
      'Panjangnya **<InlineMath math="2{,}5\\text{ m}" />** dan luasnya <InlineMath math="4\\text{ cm}^2" />.',
      "",
      "| Kota | Jumlah |",
      "| --- | --- |",
      '| Bandung | <InlineMath math="65" /> |',
      "",
      '<MathVisual description={<>Sisi <InlineMath math="4\\text{ cm}" /></>} />',
    ].join("\n")
  );
});

it("keeps the space a JSX line break carries between a number and a word", () => {
  const source =
    "<MathVisual description={<>\n  Sisi 5\n  cm dan\n  7 m\n</>} />";
  assert.equal(
    wrap(source).source,
    '<MathVisual description={<>\n  Sisi <InlineMath math="5" />{" "}\n  cm dan\n  {" "}<InlineMath math="7\\text{ m}" />\n</>} />'
  );
});

it("leaves ambiguous separators, string props, and lone numbers for a person", () => {
  const source = [
    "Nilainya 3.5 kali.",
    "",
    '<MathVisual title="Luas 5 cm" labels={["6 m"]} />',
    "",
    "- 7",
    "- 8 bola",
    "",
    "31",
  ].join("\n");
  assert.deepEqual(wrap(source), {
    left: ["3.5 ", "5 cm", '6 m"', "7\n- ", "31"],
    source: source.replace("- 8 bola", '- <InlineMath math="8" /> bola'),
    wrapped: 1,
  });
});

it("leaves every operand of a plain-text expression for a person", () => {
  const source =
    "Bagian real dari 3 + 2i, lalu 10 - 4, 2×3, x = 5, 7 −1 dan 8/ 2, tetapi suku ke-3 dan 6 bola.";
  assert.deepEqual(wrap(source), {
    left: [
      "3 + ",
      "10 -",
      "4, 2",
      "2×3,",
      "3, x",
      "5, 7",
      "7 −1",
      "−1 d",
      "8/ 2",
      "2, t",
    ],
    source: source.replace(
      "suku ke-3 dan 6 bola",
      'suku ke-<InlineMath math="3" /> dan <InlineMath math="6" /> bola'
    ),
    wrapped: 2,
  });
});

it("reads separators in the locale of the file", () => {
  assert.equal(
    wrap("It costs $1,250.50 for 3,5 units.", "en").source,
    'It costs <InlineMath math="\\$1{,}250.50" /> for 3,5 units.'
  );
});
