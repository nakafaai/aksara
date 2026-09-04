import type { LessonVoiceRule } from "#nakafa-content/voice/types";

/** Checks stock transitions that interrupt a direct teaching explanation. */
export const FLOW_STYLE_RULES = [
  {
    id: "formulaic-attention-filler",
    patterns: {
      de: /\b(?:es ist wichtig(?:,\s*sich daran zu erinnern)?|es ist zu beachten|beachte,\s*dass|man sollte beachten|wichtiger,?\s+darauf zu achten)\b/iu,
      en: /\b(?:(?:it is|it's) important to|important to remember|more important to (?:consider|notice|watch)|note that|remember that)\b/iu,
      id: /(?:\b(?:meng)?ingat bahwa|\bperlu (?:dipahami|diketahui|diingat|dicatat)(?: bahwa)?|\blebih penting untuk diperhatikan\b|^\s*(?:(?:sebelum|untuk memahami)[^.!?\n]{0,100},?\s+)?penting untuk (?:memahami|membedakan|menentukan|mengetahui|dipahami|diketahui|diingat)\b)/iu,
    },
  },
  {
    id: "generic-tip-intro",
    patterns: {
      de: /^\s*(?:einige|mehrere)?\s*(?:hilfreiche|nützliche)\s+(?:Hinweise|Kontrollen|Tipps)\s*:/iu,
      en: /^\s*(?:a few|several|some)?\s*(?:helpful|useful)\s+(?:checks|tips)\s*:/iu,
      id: /^\s*beberapa\s+tips?\s+(?:berguna|untuk memudahkan pemahaman)\s*:/iu,
    },
  },
  {
    id: "formulaic-simplification-transition",
    patterns: {
      de: /^\s*(?:der Einfachheit halber|um es einfacher zu machen),?\s+(?:nutzen|verwenden|wählen)\s+wir\b/iu,
      en: /^\s*(?:for convenience|to simplify|to make (?:it|this) easier),?\s+we\s+(?:choose|use)\b/iu,
      id: /^\s*(?:demi kemudahan|untuk memudahkan),?\s+kita\s+(?:gunakan|memakai|pilih)\b/iu,
    },
  },
  {
    id: "vague-abstraction-relief",
    patterns: {
      de: /\b(?:macht|wirkt|werden|wird)\b[^.!?\n]{0,100}\bweniger abstrakt\b|\banschaulich(?:er)?\s+(?:macht|wirkt|werden|wird)\b/iu,
      en: /\b(?:feel|feels|make|makes)\b[^.!?\n]{0,100}\bless abstract\b/iu,
      id: /\b(?:membuat|menjadikan|terasa)\b[^.!?\n]{0,100}\b(?:kurang|tidak terlalu) abstrak\b/iu,
    },
  },
  {
    id: "formulaic-utility-transition",
    patterns: {
      de: /\bhier (?:wird|werden)\b[^.!?\n]{0,80}\b(?:nützlich|wichtig)\b/iu,
      en: /\bthis is where\b[^.!?\n]{0,80}\b(?:becomes? useful|plays? (?:a )?role|comes? in)\b/iu,
      id: /\bdi sinilah\b[^.!?\n]{0,80}\b(?:berguna|berperan|dibutuhkan|digunakan)\b/iu,
    },
  },
] satisfies readonly LessonVoiceRule[];
