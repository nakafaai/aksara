import type { LessonVoiceRule } from "#nakafa-content/voice/types";

/** Checks objective Indonesian spelling and grammar across prose genres. */
export const LANGUAGE_COPY_RULES = [
  {
    id: "indonesian-attached-dimana",
    patterns: { id: /\bdimana\b/iu, ms: /\bdimana\b/iu },
  },
  {
    id: "indonesian-relative-di-mana",
    patterns: {
      id: /(?:,\s*di mana\b(?![^?\n]*\?)|^\s*di mana(?=\s*(?::|<InlineMath)|\s+(?:adalah|merupakan|menyatakan|menunjukkan)))/iu,
      ms: /(?:,\s*di mana\b(?![^?\n]*\?)|^\s*di mana(?=\s*(?::|<InlineMath)|\s+(?:adalah|ialah|merupakan|mewakili|menunjukkan)))/iu,
    },
  },
  {
    id: "indonesian-nonstandard-mempengaruhi",
    patterns: { id: /\bmempengaruhi\b/iu },
  },
  {
    id: "indonesian-nonstandard-apapun",
    patterns: { id: /\bapapun\b/iu, ms: /\bapapun\b/iu },
  },
  {
    id: "indonesian-nonstandard-affix",
    patterns: {
      id: /\b(?:mengkonversi|mengkomposisikan|mengkomunikasikan|mengkombinasikan|mengkonsumsi|mengkalkulasi|mengkategorikan|mengkondisikan|mensubstitusi(?:kan)?(?:nya)?|mentranspose)\b/iu,
    },
  },
  {
    id: "indonesian-nonstandard-compound",
    patterns: { id: /\bseringkali\b/iu, ms: /\bseringkali\b/iu },
  },
  {
    id: "indonesian-informal-slang",
    patterns: {
      id: /\b(?:enggak|gak|nggak|barengan|kayak)\b/iu,
      ms: /\b(?:takde|xde|camni|camtu|camne|giler|kitorang|diorang)\b/iu,
    },
  },
] satisfies readonly LessonVoiceRule[];

/** Checks lesson wording, calques, vague modifiers, and energy claims. */
export const LANGUAGE_VOICE_RULES = [
  ...LANGUAGE_COPY_RULES,
  {
    id: "indonesian-formal-filler",
    patterns: {
      id: /\bsecara fundamental\b/iu,
      ms: /\b(?:secara fundamental|pada asasnya)\b/iu,
    },
  },
  {
    id: "indonesian-stiff-serampangan",
    patterns: {
      id: /\bserampangan\b/iu,
      ms: /\b(?:serampangan|sembarangan)\b/iu,
    },
  },
  {
    id: "indonesian-bare-visibility-adverb",
    patterns: {
      id: /\btanpa\s+(?:terlihat|tampak)(?=\s*(?:[,.;:]|$)|\s+(?:dan|lalu|sehingga|tetapi)\b)/iu,
      ms: /\btanpa\s+(?:kelihatan|nampak)(?=\s*(?:[,.;:]|$)|\s+(?:dan|lalu|sehingga|tetapi)\b)/iu,
    },
  },
  {
    id: "indonesian-ambiguous-calculation-reference",
    patterns: {
      id: /\b(?:lanjutkan|melanjutkan|menulis(?:\s+sendiri)?|periksa|selesaikan|ulangi|mengulang)\s+perhitungannya\b/iu,
      ms: /\b(?:teruskan|meneruskan|menulis(?:\s+sendiri)?|semak|selesaikan|ulangi|mengulang)\s+pengiraannya\b/iu,
    },
  },
  {
    id: "indonesian-unnamed-effect-purpose-reference",
    patterns: {
      id: /(?:\bDampaknya dapat terasa pada\b|\bNilai dampaknya melalui\b|\bmendapatkan angka sekaligus memahami artinya\b)/u,
      ms: /(?:\bKesannya boleh dirasai pada\b|\bNilai kesannya melalui\b|\bmendapatkan nombor sekali gus memahami maknanya\b)/u,
    },
  },
  {
    id: "empty-important-term-label",
    patterns: {
      id: /\b(?:Istilah|Kata)\s+(?:"[^"\n]+"|\*\*[^*\n]+\*\*|[\p{L}-]+)\s+penting(?:[.!?]|$)/iu,
      ms: /\b(?:Istilah|Perkataan|Kata)\s+(?:"[^"\n]+"|\*\*[^*\n]+\*\*|[\p{L}-]+)\s+penting(?:[.!?]|$)/iu,
    },
  },
  {
    id: "unqualified-energy-density-claim",
    patterns: {
      de: /\bEnergiedichte (?:kann|könnte) hoch sein(?:[,.!?]|$)/iu,
      en: /\b(?:energy density can be high|can have (?:a )?high energy density)(?:[,.!?]|$)/iu,
      ms: /\b(?:ketumpatan tenaga(?:nya)? boleh tinggi|boleh mempunyai ketumpatan tenaga (?:yang )?tinggi)(?:[,.!?]|$)/iu,
    },
  },
  {
    id: "unqualified-fuel-storage-claim",
    patterns: {
      de: /\b(?:der )?Brennstoff kann gelagert werden(?:[,.!?]|$)/iu,
      en: /\b(?:the )?fuel can be stored(?:[,.!?]|$)/iu,
      id: /\bbahan bakar(?:nya)? (?:dapat|bisa) disimpan(?:[,.!?]|$)/iu,
      ms: /\bbahan api(?:nya)? boleh disimpan(?:[,.!?]|$)/iu,
    },
  },
  {
    id: "indonesian-causative-modal",
    patterns: {
      id: /\bmembuat\b(?=[^,;:.!?\n]{0,100}\b(?:dapat|bisa)\b)(?![^,;:.!?\n]{0,100}\b(?:dan|tetapi|lalu|yang)\b)[^,;:.!?\n]{0,100}\b(?:dapat|bisa)\b/iu,
      ms: /\b(?:membuat|menjadikan)\b(?=[^,;:.!?\n]{0,100}\bboleh\b)(?![^,;:.!?\n]{0,100}\b(?:dan|tetapi|lalu|yang)\b)[^,;:.!?\n]{0,100}(?<!\b(?:lebih|tidak) )\bboleh\b/iu,
    },
    protectInlineQuotations: true,
  },
  {
    id: "unexplained-output-scheduling",
    patterns: {
      de: /\bplanbare Leistung vieler Kraftwerke\b/iu,
      en: /\b(?:schedule|schedules|scheduled|scheduling)\s+(?:their|the|its)?\s*output\b/iu,
      id: /\b(?:menjadwalkan|mengatur jadwal)\s+keluaran(?:nya)?\b/iu,
      ms: /\b(?:menjadualkan|mengatur jadual)\s+output(?:nya)?\b/iu,
    },
  },
  {
    id: "vague-benefit-risk-reference",
    patterns: {
      de: /\bdiese Vorteile beseitigen (?:die|ihre) Risiken nicht\b/iu,
      en: /\b(?:these|those) (?:benefits|advantages) do not (?:remove|erase) (?:the|their) (?:risks|impacts)\b/iu,
      id: /\b(?:manfaat|kelebihan) (?:tersebut|itu) tidak (?:menghapus|menghilangkan) (?:risiko|dampak)(?:nya)?\b/iu,
      ms: /\b(?:manfaat|kelebihan) (?:tersebut|itu) tidak (?:menghapuskan|menghilangkan) (?:risiko|kesan)(?:nya)?\b/iu,
    },
  },
] satisfies readonly LessonVoiceRule[];
