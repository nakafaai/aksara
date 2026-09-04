import type { LessonVoiceRule } from "#nakafa-content/voice/types";

/** Checks unsupported method praise and vague procedural comparisons. */
export const METHOD_VOICE_RULES = [
  {
    id: "generic-safety-superlative",
    patterns: {
      de: /\b(?:der|die|das) sicherste[nrsm]? (?:Formel|Methode|Möglichkeit|Verfahren|Weg)\b/iu,
      en: /\b(?:the )?safest (?:formula|method|procedure|way)\b/iu,
      id: /\b(?:cara|metode|prosedur|rumus) (?:yang )?paling aman\b/iu,
    },
  },
  {
    id: "stacked-comparative-praise",
    patterns: {
      de: /\b(?:effizienter|praktischer) und (?:einfacher|klarer|kompakter|übersichtlicher)\b/iu,
      en: /\bmore (?:efficient|practical) and (?:clear|clearer|concise|simple|simpler)\b/iu,
      id: /\blebih (?:efisien|praktis) dan (?:jelas|rapi|ringkas|sederhana)\b/iu,
    },
  },
  {
    id: "generic-most-common-method",
    patterns: {
      de: /\b(?:am häufigsten verwendete|gebräuchlichste) (?:direkte )?Methode\b/iu,
      en: /\b(?:most common|most commonly used) (?:direct )?method\b/iu,
      id: /\bmetode (?:langsung )?(?:yang )?paling umum(?: digunakan)?\b/iu,
    },
  },
  {
    id: "stiff-process-nominalization",
    patterns: {
      de: /\bdiese Methode (?:beinhaltet|umfasst) den Prozess\b/iu,
      en: /\bthis method involves (?:the process of )?\w+ing\b/iu,
      id: /\b(?:cara|metode) ini melibatkan (?:proses )?(?:me|pe)[\p{L}-]+\b/iu,
    },
  },
  {
    id: "vague-information-preservation",
    patterns: {
      de: /\bmehr Informationen in\b[^.!?\n]{0,80}\bRichtungen\b[^.!?\n]{0,40}\berhalten\b/iu,
      en: /\bpreserve(?:s|d)? more information in\b[^.!?\n]{0,80}\bdirections?\b/iu,
      id: /\bmempertahankan lebih banyak informasi pada\b[^.!?\n]{0,80}\barah\b/iu,
    },
  },
] satisfies readonly LessonVoiceRule[];
