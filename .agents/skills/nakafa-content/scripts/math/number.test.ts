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

it("joins a point or tuple into one quantity unless it holds a year", () => {
  assert.deepEqual(
    quantities("titik (4, 1), (-1, 0, 2), (2,5; 3), (2019, 2020), P(1, 2)"),
    ["(4, 1)", "(-1, 0, 2)", "(2,5; 3)", "(1, 2)"]
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
  assert.deepEqual(
    quantities("since Python 3.6, Android 14, USB 3.0 and Node.js 26"),
    []
  );
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

it("keeps an item title with a qualifier between its label word and its number as text", () => {
  for (const title of [
    "Soal identifikasi 4",
    "Akar soal penjabaran 1",
    "Soalan pengelasan 2",
    "Punca bagi soalan pengembangan 3",
    "Classification problem 2",
    "Roots of expansion problem 3",
  ]) {
    assert.deepEqual(quantities(title), [], title);
  }
});

it("keeps a German compound label as text, alone and inside a sentence", () => {
  assert.deepEqual(
    quantities(
      "Einordnungsaufgabe 1, dann Übungsbeispiel 2 mit 3 Schritten und Textaufgaben 4 bis 6."
    ),
    ["3"]
  );
});

it("keeps a primed equation label as text", () => {
  assert.deepEqual(
    quantities(
      "Tolak persamaan (1) daripada persamaan (2'), lalu kalikan (3′) dengan 2."
    ),
    ["2"]
  );
});

it("keeps a clock time as text and a measurement that looks like one as a quantity", () => {
  assert.deepEqual(
    quantities(
      "Pukul 08.00 ada 10 orang, bus berangkat 12.30 dan 13:05 sampai 24.00, | 10.00-10.20 | lalu 12.30 kg dan 2.50."
    ),
    ["10", "12.30 kg", "2.50"]
  );
});

it("still reads a number as a quantity when a sentence only mentions a label word", () => {
  assert.deepEqual(
    quantities("Soal ini punya 4 pilihan dan kelas itu berisi 30 siswa."),
    ["4", "30"]
  );
  assert.deepEqual(quantities("Setiap soal bernilai 4 "), ["4"]);
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
