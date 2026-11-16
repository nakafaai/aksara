import { assert, it } from "@effect/vitest";

import {
  ANSWER_VOICE_RULES,
  ARTICLE_VOICE_RULES,
  LESSON_VOICE_RULES,
  PAGE_VOICE_RULES,
} from "#nakafa-content/voice/rules";
import { findLessonVoiceIssues } from "#nakafa-content/voice/scan";
import type { LessonVoiceRule } from "#nakafa-content/voice/types";

/**
 * Rules that check a feature of one language's grammar or spelling that
 * Malaysian Malay does not share, so they carry no Malay pattern: German
 * dependent clauses and `im Folgenden`, the Indonesian `mempengaruhi` and
 * `meng-k` spellings that Dewan Bahasa dan Pustaka accepts in Malay, and the
 * Indonesian address rules, whose Malay counterparts are their own rules.
 */
const SINGLE_LANGUAGE_RULES = new Set([
  "german-bare-im-folgenden",
  "german-formal-address",
  "german-heading-dependent-clause",
  "indonesian-formal-author-self-reference",
  "indonesian-formal-learner-address",
  "indonesian-formal-request",
  "indonesian-nonstandard-affix",
  "indonesian-nonstandard-mempengaruhi",
  "indonesian-plural-learner-address",
]);

/** One Malay sentence each rule refuses, for rules whose own suites are full. */
const MALAY_SAMPLES = {
  "abrupt-scenario-imperative":
    "Bayangkan sebidang tanah segi empat. Kira luas tanah itu.",
  "abstract-concept-asks-question": "Hukum bertanya tentang daya.",
  "abstract-concept-question-personification":
    "Kimia hijau bertanya berapa banyak sisa terhasil.",
  "decorative-code-metaphor": "Fungsi zip berfungsi seperti zip.",
  "empty-big-idea-label": "Idea utama bab ini ialah kadar.",
  "empty-evaluative-label": "Matriks mempunyai sifat-sifat penting.",
  "empty-example-preface":
    "Untuk lebih memahami konsep ini, lihat contoh berikut.",
  "empty-learning-invitation": "Mari kita lihat contohnya.",
  "empty-lesson-choreography": "Di sini kita akan melihat graf.",
  "empty-usefulness-question": "Kenapa ini berguna?",
  "evidence-carrying-metaphor": "Bukti ini menanggung kesimpulan kita.",
  "formulaic-direct-way-provider":
    "Formula ini memberikan satu cara langsung untuk mencari luas.",
  "formulaic-instructional-personification":
    "Jadual ini mengajar kita membaca data.",
  "formulaic-learning-benefit": "Jadual ini membolehkan kita mengira purata.",
  "formulaic-learning-payoff": "Dengan memahami konsep ini, kamu boleh terus.",
  "generic-analysis-utility": "Graf ini berguna untuk analisis.",
  "generic-attention-label": "**Penting:** semak tanda dahulu.",
  "generic-bare-utility-label": "Fakta ini berguna.",
  "generic-effective-choice": "Pemfaktoran menjadi pilihan yang berkesan.",
  "generic-effective-opener": "Pencegahan yang berkesan bermula di rumah.",
  "generic-metadata-learning-command":
    'export const metadata = {\n  title: "Matriks",\n  description: "Fahami matriks dan peraturannya.",\n};',
  "generic-more-direct-way":
    "Cara lain yang lebih langsung ialah dengan menggunakan rumus.",
  "generic-practical-method": "Jadual ini memberikan kaedah praktikal.",
  "generic-understanding-payoff":
    "Contoh ini memberikan kefahaman yang lebih mendalam.",
  "importance-before-cause": "Langkah ini penting kerana nilai berubah.",
  "indonesian-contextless-path-imperative": "Tuliskan urutan langkahnya.",
  "indonesian-detached-discussion-passive":
    "Semasa daya geseran turut dibincangkan, jisim tetap.",
  "indonesian-meta-discussion-classification":
    "Topik ini dibincangkan sebagai kes khas.",
  "indonesian-trailing-bare-range": "Tulis jawapan sebagai julat.",
  "indonesian-uncertainty-propagation-calque":
    "Ketakpastian dikira dengan peraturan rambatan.",
  "indonesian-unnamed-follow-up-reference": "Kemudian, bandingkan hasilnya.",
  "inflated-causative-utility": "Sifat ini menjadikan kaedah itu berguna.",
  "inflated-flexibility-claim":
    "Kaedah ini sangat fleksibel dalam banyak situasi.",
  "inflated-fundamental-label": "Ini hubungan yang paling fundamental.",
  "inflated-relationship-intro":
    "Ada hubungan yang sangat menarik antara kedua-dua bentuk.",
  "inflated-robust-label": "Kita perlukan kaedah yang mantap.",
  "inflated-utility-claim": "Enzim memainkan peranan penting dalam pencernaan.",
  "irrelevant-fiction-label": "Dalam latihan rekaan ini, harga naik.",
  "metawriting-disclaimer": "Jadual ini bukan senarai hafalan.",
  "rhetorical-not-only": "Hasilnya bukan sekadar nombor, tetapi model.",
  "source-navigation-filler": "Laporan itu boleh diakses melalui laman rasmi.",
  "stock-rhetorical-opener": "Pernahkah kamu nampak pelangi?",
  "stock-usefulness-transition": "Itulah sebabnya pemfaktoran berguna.",
  "unsupported-evaluative-preface": "Soalan menarik: kenapa langit biru?",
  "vague-demonstrative-conclusion": "Perkara ini menunjukkan sesuatu.",
  "vague-explanatory-help": "Graf ini membantu memahami corak.",
  "vague-heading-sensory":
    "## Kecerunan secara ringkas\n\nKecerunan ialah nisbah naik kepada larian.",
  "vague-interpretive-label": "Bacalah hubungannya dalam graf.",
  "vague-section-opening-reference": "Dua istilah ini selalu muncul.",
  "vague-surprising-result": "Hasilnya lebih mengejutkan.",
  "vague-uncertainty-transformation":
    "Taburan kebarangkalian mengubah ketakpastian menjadi kuantiti yang boleh dibandingkan dan digunakan.",
  "vague-visibility-endpoint": "Ulang sehingga coraknya kelihatan.",
};

it("gives every Indonesian and German voice rule a Malay pattern", () => {
  const rules: readonly LessonVoiceRule[] = [
    ...LESSON_VOICE_RULES,
    ...ARTICLE_VOICE_RULES,
    ...ANSWER_VOICE_RULES,
    ...PAGE_VOICE_RULES,
  ];
  const missing = rules
    .filter(({ patterns }) => patterns.id ?? patterns.de)
    .filter(
      ({ id, patterns }) => !(patterns.ms || SINGLE_LANGUAGE_RULES.has(id))
    )
    .map(({ id }) => id);

  assert.deepEqual([...new Set(missing)], []);
});

it("refuses each Malay sample with its own rule", () => {
  for (const [rule, source] of Object.entries(MALAY_SAMPLES)) {
    assert.include(
      findLessonVoiceIssues("ms", source).map((issue) => issue.rule),
      rule
    );
  }
});

it("talks to the Malay learner as kamu, never formally, on every surface", () => {
  const source = [
    "Sekarang anda cuba soalan kedua.",
    "Korang semak jawapan tadi.",
    "Aku tunjukkan langkah pertama.",
    "Sila jawab semua soalan.",
    "Kamu hendaklah menulis unit.",
  ].join("\n");
  const expected = [
    { line: 1, rule: "malay-learner-address" },
    { line: 2, rule: "malay-learner-address" },
    { line: 3, rule: "malay-author-self-reference" },
    { line: 4, rule: "malay-formal-request" },
    { line: 5, rule: "malay-formal-request" },
  ];

  for (const genre of ["lesson", "article", "page"] as const) {
    assert.deepEqual(
      findLessonVoiceIssues("ms", source, undefined, undefined, genre).map(
        ({ line, rule }) => ({ line, rule })
      ),
      expected
    );
  }
  assert.deepEqual(
    findLessonVoiceIssues(
      "ms",
      "Kamu cuba soalan kedua, dan kita semak jawapannya bersama."
    ),
    []
  );
});
