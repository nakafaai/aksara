import { assert, it } from "@effect/vitest";

import { findLessonVoiceIssues } from "#nakafa-content/voice/scan";
import type { LessonVoiceLocale } from "#nakafa-content/voice/types";

/** Returns rule ids from one authored source line or passage. */
function rules(
  locale: LessonVoiceLocale,
  source: string,
  article = false
): string[] {
  return findLessonVoiceIssues(
    locale,
    source,
    undefined,
    undefined,
    article ? "article" : "lesson"
  ).map(({ rule }) => rule);
}

it("blocks assistant artifacts but protects real quotations", () => {
  const failures = [
    ["de", "Ich hoffe, das hilft."],
    ["en", "Great question! I hope this helps."],
    ["id", "Tentu saja! Semoga ini membantu."],
    ["en", "Certainly!"],
    ["en", "Great question!"],
    ["id", "Tentu saja!"],
    ["id", "Pertanyaan bagus!"],
  ] as const;
  for (const [locale, source] of failures) {
    assert.deepEqual(rules(locale, source), ["chatbot-artifact"], source);
  }
  assert.deepEqual(rules("en", 'The interview says, "I hope this helps."'), []);
  assert.deepEqual(rules("en", "The answer is certainly correct."), []);
  assert.deepEqual(rules("id", "Pertanyaan bagus ini memerlukan bukti."), []);
  assert.deepEqual(rules("de", "Wir wiederholen die Messung."), []);
});

it("blocks knowledge-cutoff disclaimers without flagging a data cutoff", () => {
  const failures = [
    ["de", "Mein letztes Wissensupdate war im Juni."],
    ["en", "As of my last update, the value was stable."],
    ["id", "Pembaruan terakhir pengetahuanku adalah Juni."],
  ] as const;
  for (const [locale, source] of failures) {
    assert.deepEqual(
      rules(locale, source),
      ["knowledge-cutoff-disclaimer"],
      source
    );
  }
  assert.deepEqual(rules("en", "The data cutoff was June 2025."), []);
  assert.deepEqual(rules("id", "Data berakhir pada Juni 2025."), []);
  assert.deepEqual(rules("de", "Der Datenstand ist der 30. Juni 2025."), []);
  assert.deepEqual(
    rules(
      "id",
      "Hingga pembaruan terakhir pada 1 Januari 2026, laporan itu mencatat 20 kasus.",
      true
    ),
    []
  );
  assert.deepEqual(
    rules(
      "en",
      "As of our last update on 1 January 2026, the registry contained 20 cases.",
      true
    ),
    []
  );
  assert.deepEqual(
    rules("de", "Meines Wissens nach enthält das Register 20 Fälle.", true),
    []
  );
});

it("flags only redundant hedge stacks", () => {
  const failures = [
    ["de", "Der Wert könnte möglicherweise abweichen."],
    ["en", "The result may potentially change."],
    ["id", "Hasil mungkin barangkali berubah."],
  ] as const;
  for (const [locale, source] of failures) {
    assert.deepEqual(rules(locale, source), ["stacked-hedge"], source);
  }
});

it("keeps ability and scientific frequency separate from hedge stacks", () => {
  const valid = [
    ["de", "Das Verfahren kann häufig reproduziert werden."],
    ["en", "Cells can generally reproduce."],
    ["en", "The method can often be found in the corpus."],
    ["id", "Nilai mungkin dapat dihitung."],
    ["id", "Persamaan mungkin dapat diselesaikan."],
  ] as const;
  for (const [locale, source] of valid) {
    assert.deepEqual(rules(locale, source), [], source);
  }
});

it("flags vague significance tails but keeps measured results", () => {
  const failures = [
    ["de", "Die Werte steigen, unterstreichend ihre Bedeutung."],
    ["en", "The values rise, highlighting their significance."],
    ["id", "Nilainya naik, menegaskan pentingnya."],
  ] as const;
  for (const [locale, source] of failures) {
    assert.deepEqual(
      rules(locale, source),
      ["vague-significance-tail"],
      source
    );
  }
  assert.deepEqual(
    rules("en", "The values rise, showing the measured 4 percent change."),
    []
  );
  assert.deepEqual(
    rules("id", "Nilai naik dan menunjukkan kenaikan 4 persen."),
    []
  );
});

it("flags significance inflation without banning technical claims", () => {
  const failures = [
    ["de", "Das Bauwerk bleibt ein dauerhaftes Vermächtnis."],
    ["en", "The bridge stands as a testament."],
    ["id", "Perubahan ini menandai perubahan signifikan."],
  ] as const;
  for (const [locale, source] of failures) {
    assert.deepEqual(rules(locale, source), ["significance-inflation"], source);
  }
  assert.deepEqual(rules("de", "Das Gesetz spielt eine zentrale Rolle."), [
    "inflated-utility-claim",
  ]);
  assert.deepEqual(rules("en", "The bridge carries 40,000 cars each day."), []);
  assert.deepEqual(
    rules("id", "Model ini mengurangi kesalahan pembulatan."),
    []
  );
});

it("flags formulaic conclusions only in their recorded shape", () => {
  const failures = [
    ["de", "Trotz dieser Herausforderungen blüht die Stadt weiter."],
    ["en", "Despite these challenges, the town continues to thrive."],
    ["id", "Meskipun berbagai tantangan, kota tetap berkembang."],
    ["en", "Ultimately, it depends; there is no one-size-fits-all answer."],
  ] as const;
  for (const [locale, source] of failures) {
    assert.ok(rules(locale, source).length > 0, source);
  }
  assert.deepEqual(
    rules(
      "en",
      "Despite these challenges, the team documented three failures."
    ),
    []
  );
  assert.deepEqual(
    rules("id", "Metode ini bergantung pada apakah matriks dapat dibalik."),
    []
  );
  assert.deepEqual(rules("en", "The next release is due in March."), []);
});
