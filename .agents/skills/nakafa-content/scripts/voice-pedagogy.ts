import type { LessonVoiceRule } from "#nakafa-content/voice-types";

/** Checks metawriting that replaces a direct pedagogical explanation. */
export const PEDAGOGY_VOICE_RULES = [
  {
    id: "formulaic-complete-flow",
    patterns: {
      de: /\b(?:bildet|ergibt)\s+(?:einen|eine)?\s*vollständige[nr]?\s+(?:Ablauf|Kette)\b/iu,
      en: /\b(?:follows?|forms?|creates?)\s+(?:a\s+)?complete\s+(?:chain|flow|sequence)\b/iu,
      id: /\b(?:membentuk|menghasilkan)\s+(?:satu\s+)?alur\s+lengkap\b/iu,
    },
  },
  {
    id: "vague-tool-for-reading",
    patterns: {
      de: /\bals\s+(?:ein\s+)?Werkzeug,?\s+um\b[^.!?\n]{0,80}\bzu lesen\b/iu,
      en: /\bas\s+(?:a\s+)?tool\s+(?:for reading|to read)\b/iu,
      id: /\bsebagai\s+alat\s+untuk\s+membaca\b/iu,
    },
  },
  {
    id: "abstract-information-provider",
    patterns: {
      de: /\b(?:Diskriminante|Formel|Gleichung|Graph|Modell)\s+(?:gibt|liefert)\s+Informationen\s+(?:über|zu)\b/iu,
      en: /\b(?:discriminant|formula|graph|model|equation)\s+(?:gives?|provides?)\s+information\s+(?:about|on)\b/iu,
      id: /\b(?:diskriminan|grafik|model|persamaan|rumus)\s+(?:memberi|memberikan)\s+informasi\s+tentang\b/iu,
    },
  },
  {
    id: "abstract-motion-reading",
    patterns: {
      de: /\bBewegung\b[^.!?\n]{0,100}\b(?:gelesen|liest)\b|\bSitz (?:des|eines) Beobachters\b|\bMesswert\b[^.!?\n]{0,50}\bSitz\b/iu,
      en: /\bmotion\b[^.!?\n]{0,100}\b(?:is read|reads?)\b|\bobserver(?:'s)? seat\b|\breading\b[^.!?\n]{0,50}\bseat\b/iu,
      id: /\bgerak\b[^.!?\n]{0,100}\b(?:dibaca|membaca)\b|\bkursi pengamat\b|\bbacaan\b[^.!?\n]{0,50}\bkursi\b/iu,
    },
  },
] satisfies readonly LessonVoiceRule[];

/** Limits mechanical conclusion and explanation openers within one lesson. */
export const REPETITIVE_OPENER_RULES = [
  {
    id: "repeated-conclusion-opener",
    patterns: {
      de: /^\s*(?:Daher|Deshalb)\b/iu,
      en: /^\s*(?:Therefore|Thus|The calculation gives)\b/iu,
      id: /^\s*(?:Dengan demikian|Oleh karena itu)\b/iu,
    },
  },
  {
    id: "repeated-explanatory-opener",
    patterns: {
      de: /^\s*(?:Das|Dies) bedeutet\b/iu,
      en: /^\s*This means\b/iu,
      id: /^\s*Ini berarti\b/iu,
    },
  },
] satisfies readonly LessonVoiceRule[];
