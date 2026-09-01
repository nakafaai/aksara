import type { LessonVoiceRule } from "#nakafa-content/voice-types";

/** Checks technical prose where metaphor replaces a named mechanism. */
export const TECHNICAL_METAPHOR_RULES = [
  {
    id: "rank-exposure-metaphor",
    patterns: {
      de: /(?:\b(?:Werkzeuge|Faktorisierungen)\b[^.!?\n]{0,60}\b(?:legen|decken)\b[^.!?\n]{0,25}\bRang\b[^.!?\n]{0,20}\b(?:offen|auf)\b|\bnatürlicheren? rangoffenlegenden? Verfahren\b)/iu,
      en: /(?:\b(?:tools?|factorizations?)\b[^.!?\n]{0,60}\b(?:expose|reveal)\b[^.!?\n]{0,20}\brank\b|\b(?:more )?natural rank-revealing (?:choice|method)\b)/iu,
      id: /(?:\b(?:alat|faktorisasi)\b[^.!?\n]{0,60}\b(?:menyingkap|mengungkap)\b[^.!?\n]{0,20}\bperingkat\b|\bpilihan penyingkap peringkat yang lebih alami\b)/iu,
    },
  },
  {
    id: "decorative-bread-metaphor",
    patterns: {
      de: /\bwie (?:bei )?(?:einer )?(?:Brotscheibe|Scheibe (?:aus|von) (?:einem )?Brot)\b/iu,
      en: /\blike (?:choosing|taking) (?:a )?slice (?:from|of) (?:a )?(?:loaf of )?bread\b/iu,
      id: /\bseperti (?:menentukan|memilih|mengambil) (?:sebuah )?potongan (?:dari|pada) (?:sepotong )?roti\b/iu,
    },
  },
  {
    id: "decorative-raw-material-metaphor",
    patterns: {
      de: /\b(?:Ausgangsmaterial|Rohstoff)\s+(?:für|der)\s+(?:Anpassung|Evolution)\b/iu,
      en: /\braw material\s+(?:for|of)\s+(?:adaptation|evolution)\b/iu,
      id: /\bbahan mentah\s+(?:bagi|dari|untuk)?\s*(?:adaptasi|evolusi)\b/iu,
    },
  },
  {
    id: "stock-learning-journey",
    patterns: {
      de: /\b(?:(?:beginne|starte) (?:deine|die) Reise|lange[ns]? Weg(?:es)? (?:zu|zur|zum))\b/iu,
      en: /\b(?:start (?:your|the) [^.!?\n]{0,40} journey|long (?:path|journey) (?:to|toward))\b/iu,
      id: /\b(?:mulai(?:lah)? perjalanan|perjalanan panjang menuju)\b/iu,
    },
  },
  {
    id: "formulaic-world-of",
    patterns: {
      de: /\bin der Welt der\b/iu,
      en: /\bin the world of\b/iu,
      id: /\bdalam dunia\b/iu,
    },
  },
  {
    id: "formulaic-makes-sense-justification",
    patterns: {
      de: /\b(?:das|dies|dieses Ergebnis) ist sinnvoll(?:,|\s+(?:weil|denn))/iu,
      en: /\b(?:this|that|the result) makes sense(?:,|\s+because)/iu,
      id: /\b(?:ini|hal ini|hasil ini) masuk akal(?:,|\s+karena)/iu,
    },
  },
  {
    id: "abstract-value-captures-change",
    patterns: {
      de: /\bWert\b[^.!?\n]{0,50}\bbildet\b[^.!?\n]{0,30}(?:Änderung|Übergang|Verhältnis)[^.!?\n]{0,15}\bab\b/iu,
      en: /\bvalue\b[^.!?\n]{0,50}\bcaptures?\b[^.!?\n]{0,30}\b(?:change|relationship|transition)\b/iu,
      id: /\bnilai\b[^.!?\n]{0,50}\bmenangkap\b[^.!?\n]{0,30}\b(?:hubungan|perubahan|peralihan)\b/iu,
    },
  },
] satisfies readonly LessonVoiceRule[];
