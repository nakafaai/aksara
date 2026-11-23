import { assert, it } from "@effect/vitest";
import { findLessonVoiceIssues } from "#nakafa-content/voice/scan";

it("starts blockquotes with their teaching message", () => {
  const samples = {
    de: "> Kurzer Check: Verfolge den Energiefluss.",
    en: "> Quick check: trace the energy flow.",
    id: "> Cek cepat: telusuri aliran energi.",
  } as const;

  for (const [locale, source] of Object.entries(samples)) {
    assert.deepEqual(
      findLessonVoiceIssues(locale, source).map(({ rule }) => rule),
      ["blockquote-editorial-label"]
    );
  }
});

it("rejects editorial labels split across inline Markdown formatting", () => {
  const samples = {
    de: {
      label: "Kurzer",
      source: "> **Kurzer Check:** Verfolge den Energiefluss.",
    },
    en: {
      label: "Quick",
      source: "> *Quick check:* trace the energy flow.",
    },
    id: {
      label: "Cek",
      source: "> **Cek** *cepat:* telusuri aliran energi.",
    },
  } as const;

  for (const [locale, { label, source }] of Object.entries(samples)) {
    assert.deepEqual(
      findLessonVoiceIssues(locale, source).map(({ column, rule }) => ({
        column,
        rule,
      })),
      [
        {
          column: source.indexOf(label) + 1,
          rule: "blockquote-editorial-label",
        },
      ]
    );
  }
});

it("maps an encoded label through a lazy blockquote continuation", () => {
  const source = "> Cek &#99;epat: mulai\nlanjutkan perhitungan.";

  assert.deepEqual(findLessonVoiceIssues("id", source), [
    {
      column: source.indexOf("Cek") + 1,
      excerpt: "> Cek &#99;epat: mulai",
      line: 1,
      rule: "blockquote-editorial-label",
    },
  ]);
});

it("allows a blockquote to state its message directly, including mathematical ratios", () => {
  const samples = {
    de: "> Verfolge den Energiefluss von der Quelle zum Verbraucher. Das Verhältnis 3:2 bleibt konstant.",
    en: "> Trace the energy flow from the source to the consumer. A 3:2 ratio stays constant.",
    id: "> Telusuri aliran energi dari sumber menuju konsumen. Perbandingan 3:2 tetap konstan.",
    ms: "> Telusuri aliran tenaga dari sumber ke pengguna. Nisbah 3:2 kekal malar.",
  } as const;

  for (const [locale, source] of Object.entries(samples)) {
    assert.deepEqual(findLessonVoiceIssues(locale, source), []);
  }
});

it("blocks common editorial prefix labels with colons across all four locales", () => {
  const samples = [
    ["id", "> Ingat bahwa: pembagi tidak boleh nol."],
    ["id", "> Konsep kunci: luas selalu bernilai tak negatif."],
    ["id", "> **Catatan:** periksa satuan sebelum menjumlahkan."],
    ["id", "> Tips: faktorkan dulu sebelum menyederhanakan."],
    ["id", "> Perhatian: tanda negatif berubah saat dikali negatif."],
    ["en", "> Key concept: the denominator can never be zero."],
    ["en", "> Note: check the domain before squaring both sides."],
    ["en", "> Remember: slope measures rise over run."],
    ["en", "> Tip: isolate the variable first."],
    ["ms", "> Nota: semak unit sebelum mengira."],
    ["ms", "> Ingat: penyebut tidak boleh sifar."],
    ["ms", "> Konsep kunci: arah vektor menentukan tanda."],
    ["de", "> Merke: Der Nenner darf nie null sein."],
    ["de", "> Hinweis: Prüfe zuerst den Definitionsbereich."],
    ["de", "> Wichtig: Vorzeichenwechsel bei negativer Multiplikation."],
    ["de", "> Tipp: Klammere zuerst aus."],
  ] as const;

  for (const [locale, source] of samples) {
    assert.include(
      findLessonVoiceIssues(locale, source).map(({ rule }) => rule),
      "blockquote-editorial-label",
      `${locale}: ${source}`
    );
  }
});

it("holds Malaysian Malay prose to the same rules", () => {
  const samples = {
    "blockquote-editorial-label": "> Semak pantas: berapakah x?",
  };

  for (const [rule, source] of Object.entries(samples)) {
    assert.include(
      findLessonVoiceIssues("ms", source).map((issue) => issue.rule),
      rule
    );
  }
});
