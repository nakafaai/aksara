import type { LessonVoiceRule } from "#nakafa-content/voice/types";

/**
 * Checks lead-ins that only announce the block below them.
 *
 * The reported regression was `Dua rumus berikut menghitung luas juring:`,
 * where the sentence repeats what the two displayed formulas already show and
 * never says which formula applies when. A second regression is the bare look
 * pointer, where the whole paragraph tells the learner to look at the next
 * block without naming a property, condition, or result to notice.
 */
export const POINTER_VOICE_RULES = [
  {
    id: "bare-look-pointer",
    patterns: {
      de: /^(?:Betrachte|Sieh dir|Beachte|Studiere)\b(?:\s+[\p{L}]+){0,5}\s+(?:folgend\w*|unten)\b(?:\s+[\p{L}]+){0,2}[.:!?]?$/iu,
      en: /^(?:Look at|Notice|Observe|Study|See|Consider|Examine)\b(?:\s+[\p{L},-]+){0,5}\s+(?:below|following)\b(?:\s+[\p{L}]+){0,2}[.:!?]?$/iu,
      id: /^(?:Perhatikan|Amati|Simak|Lihat|Cermati|Tinjau)\b[^.!?\n]{0,45}\b(?:berikut|di bawah ini)[.:!?]?$/u,
    },
  },
  {
    id: "counted-pointer-caption",
    patterns: {
      de: /^(?:Zwei|Drei|Vier|Fünf|Mehrere|Beide|\d+)\s+(?:Formeln?|Tabellen?|Graphen?|Listen?|Diagramme?)\b(?![^.!?\n]*\b(?:wenn|falls|sobald|weil|da|damit|indem|je)\b)[^.!?\n]{0,60}\b(?:folgend\w*|unten)\b[^.!?\n]{0,15}[.:]$/iu,
      en: /^(?:Two|Three|Four|Five|Several|Both|\d+)\s+(?:formulas?|formulae|tables?|graphs?|lists?|diagrams?)\b(?![^.!?\n]*\b(?:if|when|whenever|because|since|whereas|depending)\b)[^.!?\n]{0,60}\b(?:following|below)\b[^.!?\n]{0,15}[.:]$/iu,
      id: /^(?:Dua|Tiga|Empat|Lima|Beberapa|Kedua|Ketiga|\d+)\s+(?:rumus|tabel|grafik|daftar|diagram)\s+berikut\b(?![^.!?\n]*\b(?:bila|jika|ketika|karena|sehingga|saat|dengan|untuk|yang)\b)[^.!?\n]{0,60}[.:]$/u,
    },
  },
] satisfies readonly LessonVoiceRule[];
