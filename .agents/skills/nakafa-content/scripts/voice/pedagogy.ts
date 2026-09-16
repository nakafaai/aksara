import type { LessonVoiceRule } from "#nakafa-content/voice/types";

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
  {
    id: "lesson-structure-narration",
    patterns: {
      de: /\b(?:unter)?abschnitt(?:e|en)? (?:unten|oben)\b|\babschnitt (?:darüber|daruber|darunter)\b|\bfolgende(?:n)? abschnitte?\b|\bunterabschnitt\w*\b|\bin diesem abschnitt\b|\b(?:der|die|das) (?:nächste|naechste|vorige) abschnitt\b|\b(?:der|dieser) abschnitt\b(?!\s+(?:dieser|einer|der|des|eines))|\bin der folgenden reihenfolge\b|(?<![\p{L}\p{N}_])über die ganze lektion\b/iu,
      en: /\b(?:the|these|those|following|next)?\s*sections? (?:below|above)\b|\bthe (?:next|following|later|previous) sections?\b|\bin (?:this|that|the next|later|the previous|the following) (?:sub)?section\b|\bthis section\b|\bsub-?sections?\b|\b(?:this|the|that) (?:sub)?section (?:teaches|shows|explains|describes|compares|introduces|covers)\b|\bin the following order\s*[.!?]|\bacross the whole lesson\b/iu,
      id: /\bsubbagian\b|\bbagian (?:di bawah ini|berikutnya|berikut|selanjutnya|di atas)\b|\bsetiap pembahasan\b|\bpembahasan (?:berikut|berikutnya|di bawah ini|selanjutnya)\b|\bdengan urutan berikut\s*[.!?]|\bdi sepanjang pelajaran ini\b/iu,
    },
  },
  {
    id: "german-bare-im-folgenden",
    patterns: {
      // The nominalized adverb capitalizes `Folgenden`; the adjective in
      // `im folgenden Beispiel` stays lowercase and remains valid.
      de: /\b(?:im|Im) Folgenden\b/u,
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
