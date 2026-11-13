import { assert, it } from "@effect/vitest";
import { findNumbers, findPlainNumbers } from "#nakafa-content/math/number";
import { parseLessonMdx } from "#nakafa-content/mdx/parse";

/** The exact text of every quantity one text holds. */
function quantities(text: string): string[] {
  return findNumbers(text).map(({ end, start }) => text.slice(start, end));
}

/** The line and column of every plain-number finding in one MDX source. */
function findings(source: string): string[] {
  return findPlainNumbers(source, parseLessonMdx(source)).map(
    ({ column, line, rule }) => `${rule} ${line}:${column}`
  );
}

it("finds the owner's example: every number beside rendered math", () => {
  assert.deepEqual(
    quantities(
      "bersisa 2 jika dibagi 5 dan bersisa 4 jika dibagi 11. Sisa pembagian oleh 55 adalah ...."
    ),
    ["2", "5", "4", "11", "55"]
  );
});

it("takes a quantity's sign, currency, percent sign, and unit with it", () => {
  assert.deepEqual(
    quantities(
      "Suhu -5 °C, harga Rp5.000,00 dan Rp. 300, naik 12,5% lalu 25 %, sudut 30°, 9,8 m/s², 25 cm², 10 kΩ, 5 N·m, 72 km/jam, $1,250.50, US$4, €3, £2, ke (−3)."
    ),
    [
      "-5 °C",
      "Rp5.000,00",
      "Rp. 300",
      "12,5%",
      "25 %",
      "30°",
      "9,8 m/s²",
      "25 cm²",
      "10 kΩ",
      "5 N·m",
      "72 km/jam",
      "$1,250.50",
      "US$4",
      "€3",
      "£2",
      "−3",
    ]
  );
});

it("joins a dashed range into one quantity unless an operator makes it a subtraction", () => {
  assert.deepEqual(
    quantities("2-3 kali, 10–20%, 1,5-2,5 kg, 8-3=5, 4+2-3, 1998-2024"),
    ["2-3", "10–20%", "1,5-2,5 kg", "8", "3", "5", "4", "2", "3"]
  );
});

it("keeps a unit symbol that starts a word, and a word unit, as prose", () => {
  assert.deepEqual(quantities("5 menit, 3 meter, 2 jam, 4 mangga, 6 sisi"), [
    "5",
    "3",
    "2",
    "4",
    "6",
  ]);
});

it("treats the ordinal ke-3 as a number and names glued to a number as text", () => {
  assert.deepEqual(
    quantities(
      "suku ke-3, 5cm, COVID-19, SARS-CoV-2, B12, 3D, 1990s, 2nd, 1990-an, 34/PUU-XX/2022, x_2, v1.2, #4, @5, a.3, &#8212;"
    ),
    ["3", "5cm"]
  );
});

it("keeps dates, years, and law numbers as text", () => {
  assert.deepEqual(
    quantities(
      "Pada 13 November 2026, 13. November, 1–3 Mei 2026, November 13, 2026, Mei 2027, 13/11/2026, 13.11.2026, 2026-11-13, SNBT 2027, pada 2024, 1998-2024, tahun ajaran 2025/26, UU 12/2011, 1945 M, 300 SM, 44 BC, AD 79, abad ke-19, abad 20, 19. Jahrhundert."
    ),
    []
  );
});

it("keeps a year-like number that carries a unit, percent, or currency as a quantity", () => {
  assert.deepEqual(quantities("2000 m, 2024%, Rp2000, 1406 orang"), [
    "2000 m",
    "2024%",
    "Rp2000",
    "1406",
  ]);
});

it("keeps document, exam, and legal labels as text and counts as quantities", () => {
  assert.deepEqual(
    quantities(
      "Soal 3, Kelas 10, Kumpulan 2, Group 4, Langkah 1 dan 2, nomor 1, 2, dan 3, Bab 4.1, Step 2, Klasse 9, Aufgabe 2b, Gleichung (2), Pasal 1(2), Soal 1–5, soal 6 sampai 9, Law Number 39, Nr. 4, **Lösung 2**, Pembahasan 3, Tingkat 5%, 3 soal, Kelas 10, 25 siswa"
    ),
    ["5%", "3", "25"]
  );
});

it("keeps list, statement, and citation markers as text", () => {
  assert.deepEqual(
    quantities(
      "pernyataan (1) dan (2), lihat [3] dan [4, 5], (Smith, 2019), (2020a)"
    ),
    []
  );
  assert.deepEqual(quantities("2.1 Turunan"), []);
  assert.deepEqual(quantities("10.00 g of zinc"), ["10.00 g"]);
  assert.deepEqual(quantities("nilainya 1.2 di tengah"), ["1.2"]);
});

it("finds plain numbers in prose, headings, tables, emphasis, and visual text", () => {
  const source = [
    "## Ada 3 cara",
    "",
    "Hasilnya **31** dari 9, 20, dan 42.",
    "",
    "| Kota | Jumlah |",
    "| --- | --- |",
    "| Bandung | 65 |",
    "",
    '<MathVisual title="Luas 5 cm" description={<>Sisi 4 cm</>} />',
  ].join("\n");
  assert.deepEqual(findings(source), [
    "plain-number 1:8",
    "plain-number 3:12",
    "plain-number 3:22",
    "plain-number 3:25",
    "plain-number 3:33",
    "plain-number 7:13",
    "plain-number 9:25",
    "plain-number 9:51",
  ]);
});

it("keeps math, code, links, metadata, and labels out", () => {
  const source = [
    'export const metadata = { title: "Bab 2: 5 cara" };',
    "",
    'Nilai <InlineMath math="n = 5" /> dan <BlockMath math="2 + 3" />.',
    "",
    "Kode `x = 2`, <code>arr * 2</code>, <kbd>Ctrl 1</kbd> dan [3 contoh](https://example.com/3).",
    "",
    '<MathVisual description={<>Garis <code>x // 3</code> dan <InlineMath math="4" /></>} />',
    "",
    "Soal 3 dari SNBT 2027 pada 13 November 2026.",
    "",
    "```python\ny = 3 * x\n```",
  ].join("\n");
  assert.deepEqual(findings(source), []);
});
