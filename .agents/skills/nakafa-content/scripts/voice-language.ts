import type { LessonVoiceRule } from "#nakafa-content/voice-types";

/** Checks Indonesian grammar, calques, vague modifiers, and energy claims. */
export const LANGUAGE_VOICE_RULES = [
  {
    id: "indonesian-attached-dimana",
    patterns: { id: /\bdimana\b/iu },
  },
  {
    id: "indonesian-relative-di-mana",
    patterns: {
      id: /(?:,\s*di mana\b(?![^?\n]*\?)|^\s*di mana(?=\s*(?::|<InlineMath)|\s+(?:adalah|merupakan|menyatakan|menunjukkan)))/iu,
    },
  },
  {
    id: "indonesian-nonstandard-mempengaruhi",
    patterns: { id: /\bmempengaruhi\b/iu },
  },
  {
    id: "indonesian-nonstandard-apapun",
    patterns: { id: /\bapapun\b/iu },
  },
  {
    id: "indonesian-nonstandard-affix",
    patterns: {
      id: /\b(?:mengkonversi|mengkomposisikan|mengkomunikasikan|mengkombinasikan|mengkonsumsi|mengkalkulasi|mengkategorikan|mengkondisikan|mensubstitusi(?:kan)?(?:nya)?|mentranspose)\b/iu,
    },
  },
  {
    id: "indonesian-nonstandard-compound",
    patterns: { id: /\bseringkali\b/iu },
  },
  {
    id: "indonesian-informal-slang",
    patterns: { id: /\b(?:enggak|gak|nggak|barengan|kayak)\b/iu },
  },
  {
    id: "indonesian-formal-filler",
    patterns: { id: /\bsecara fundamental\b/iu },
  },
  {
    id: "indonesian-stiff-serampangan",
    patterns: { id: /\bserampangan\b/iu },
  },
  {
    id: "indonesian-stiff-interpret-instruction",
    patterns: {
      id: /(?:\b(?:tafsirkan|interpretasikan|menginterpretasi(?:kan)?)\b|^\s*(?:#{2,5}\s+|\*{2})(?:interpretasi|tafsiran)(?:\s+hasil)?\b|\|\s*(?:interpretasi|tafsiran)(?:\s+hasil)?\s*\|)/iu,
    },
  },
  {
    id: "indonesian-bare-visibility-adverb",
    patterns: {
      id: /\btanpa\s+(?:terlihat|tampak)(?=\s*(?:[,.;:]|$)|\s+(?:dan|lalu|sehingga|tetapi)\b)/iu,
    },
  },
  {
    id: "indonesian-ambiguous-calculation-reference",
    patterns: {
      id: /\b(?:lanjutkan|melanjutkan|menulis(?:\s+sendiri)?|periksa|selesaikan|ulangi|mengulang)\s+perhitungannya\b/iu,
    },
  },
  {
    id: "indonesian-unnamed-effect-purpose-reference",
    patterns: {
      id: /(?:\bDampaknya dapat terasa pada\b|\bNilai dampaknya melalui\b|\bmendapatkan angka sekaligus memahami artinya\b)/u,
    },
  },
  {
    id: "empty-important-term-label",
    patterns: {
      id: /\b(?:Istilah|Kata)\s+(?:"[^"\n]+"|\*\*[^*\n]+\*\*|[\p{L}-]+)\s+penting(?:[.!?]|$)/iu,
    },
  },
  {
    id: "indonesian-bare-modal-adjective",
    patterns: { id: /\bdapat\s+(?:tinggi|rendah|mudah|sulit)\b/iu },
  },
  {
    id: "unqualified-energy-density-claim",
    patterns: {
      de: /\bEnergiedichte (?:kann|könnte) hoch sein(?:[,.!?]|$)/iu,
      en: /\b(?:energy density can be high|can have (?:a )?high energy density)(?:[,.!?]|$)/iu,
    },
  },
  {
    id: "unqualified-fuel-storage-claim",
    patterns: {
      de: /\b(?:der )?Brennstoff kann gelagert werden(?:[,.!?]|$)/iu,
      en: /\b(?:the )?fuel can be stored(?:[,.!?]|$)/iu,
      id: /\bbahan bakar(?:nya)? (?:dapat|bisa) disimpan(?:[,.!?]|$)/iu,
    },
  },
  {
    id: "indonesian-causative-modal",
    patterns: {
      id: /\bmembuat\b(?=[^,;:.!?\n]{0,100}\b(?:dapat|bisa)\b)(?![^,;:.!?\n]{0,100}\b(?:dan|tetapi|lalu|yang)\b)[^,;:.!?\n]{0,100}\b(?:dapat|bisa)\b/iu,
    },
  },
  {
    id: "unexplained-output-scheduling",
    patterns: {
      de: /\bplanbare Leistung vieler Kraftwerke\b/iu,
      en: /\b(?:schedule|schedules|scheduled|scheduling)\s+(?:their|the|its)?\s*output\b/iu,
      id: /\b(?:menjadwalkan|mengatur jadwal)\s+keluaran(?:nya)?\b/iu,
    },
  },
  {
    id: "vague-benefit-risk-reference",
    patterns: {
      de: /\bdiese Vorteile beseitigen (?:die|ihre) Risiken nicht\b/iu,
      en: /\b(?:these|those) (?:benefits|advantages) do not (?:remove|erase) (?:the|their) (?:risks|impacts)\b/iu,
      id: /\b(?:manfaat|kelebihan) (?:tersebut|itu) tidak (?:menghapus|menghilangkan) (?:risiko|dampak)(?:nya)?\b/iu,
    },
  },
] satisfies readonly LessonVoiceRule[];
