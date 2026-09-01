import type { LessonVoiceRule } from "#nakafa-content/voice-types";

/** Checks narration that invents a learning setting or discusses curriculum. */
export const FLOW_CONTEXT_RULES = [
  {
    id: "invented-learning-setting",
    patterns: {
      de: /\b(?:Unterrichtsszenario|Unterrichtsrechnung|Näherung für den Unterricht|aus dem Chemieunterricht|im Unterricht der Klassenstufe|in diesem (?:Kurs|Kapitel)|in dieser Lektion|Zusammensetzungsmodell auf Schulniveau|schulische(?:n)? (?:Kurzregel|Rechenregeln)|diese Lektion (?:beginnt|behandelt|nutzt|vergleicht|verwendet)|dieses Kapitel (?:behandelt|nutzt|vergleicht|verwendet))\b/iu,
      en: /\b(?:classroom (?:approximation|calculations?|composition model|operation rules?|scenario|significant-figure rule)|school-level (?:composition model|order)|(?:in|throughout) this (?:course|chapter|lesson)|examples in this lesson|rest of this lesson|this lesson (?:compares|concerns|connects|develops|focuses|rounds|starts|uses))\b/iu,
      id: /\b(?:skenario pembelajaran fiktif|perhitungan kelas|pendekatan untuk belajar di kelas|dalam pembahasan kelas ini|(?:dalam|pada) (?:kursus|materi|pelajaran) ini|contoh pada halaman ini|(?:materi|pelajaran) ini (?:dimulai|fokus|membahas|membandingkan|memakai|menggunakan))\b/iu,
    },
  },
  {
    id: "curriculum-narrator",
    patterns: {
      de: /^\s*(?:[-*]\s+)?(?:Diese?\s+)?(?:Begriffe?|Namen?|Matrizen?)\b[^.!?\n]{0,120}\bin (?:manchen|einigen) Lehrplänen\b/iu,
      en: /^\s*(?:[-*]\s+)?(?:The\s+|These?\s+)?(?:terms?|names?|matrices?)\b[^.!?\n]{0,120}\b(?:used|taught|named) in some curricula\b/iu,
      id: /^\s*(?:[-*]\s+)?(?:Istilah|Nama|Sebutan|Matriks)\b[^.!?\n]{0,120}\b(?:digunakan|dipakai|diajarkan) dalam (?:sebagian|beberapa) kurikulum\b/iu,
    },
  },
] satisfies readonly LessonVoiceRule[];
