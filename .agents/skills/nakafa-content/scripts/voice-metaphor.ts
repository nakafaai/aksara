import type { LessonVoiceRule } from "#nakafa-content/voice-types";

/** Checks decorative metaphors and stock narrative framing in lesson prose. */
export const METAPHOR_VOICE_RULES = [
  {
    id: "formulaic-compass-metaphor",
    patterns: {
      de: /\bals\s+(?:(?:ein|eine|einen|der|die|das)\s+)?Kompass\b/iu,
      en: /\bas (?:a|the) compass for\b/iu,
      id: /\bsebagai kompas\b/iu,
    },
  },
  {
    id: "formulaic-bridge-metaphor",
    patterns: {
      de: /\b(?:Brücke\s+zwischen|Brücke\s+zu(?:m|r)?|als\s+(?:eine\s+)?Brücke|wie\s+eine\s+(?:kleine\s+)?Brücke)\b/iu,
      en: /\b(?:bridge\s+between|bridge\s+to|as\s+(?:a|the)\s+bridge|like\s+a\s+(?:tiny|small)\s+bridge)\b/iu,
      id: /\b(?:jembatan\s+antara|jembatan\s+menuju|sebagai\s+jembatan|seperti\s+jembatan\s+kecil)\b/iu,
    },
  },
  {
    id: "formulaic-building-block-metaphor",
    patterns: {
      de: /\bBausteine? (?:von|für|der)\b/iu,
      en: /\bbuilding blocks? (?:of|for)\b/iu,
      id: /\b(?:batu|blok) (?:pembangun|penyusun)\b/iu,
    },
  },
  {
    id: "decorative-recipe-metaphor",
    patterns: {
      de: /(?:(?:ähnelt|wie) (?:einem )?(?:Koch)?rezept\b|\bRezept (?:der|einer|für eine) Verbindung\b)/iu,
      en: /(?:\blike (?:the steps in )?a recipe\b|\bcompound recipe\b)/iu,
      id: /(?:\bseperti (?:langkah langkah dalam )?resep\b|\bresep senyawa\b)/iu,
    },
  },
  {
    id: "decorative-story-metaphor",
    patterns: {
      de: /\b(?:Strecke und Verschiebung|Komponenten?|Vektoren?)\b[^.!?\n]{0,80}\berzähl(?:t|en)\b/iu,
      en: /\b(?:distance and displacement|components?|vectors?)\b[^.!?\n]{0,80}\btell(?:s|ing)?\b[^.!?\n]{0,40}\bstor(?:y|ies)\b/iu,
      id: /(?:\bjarak dan perpindahan\b[^.!?\n]{0,80}\bmenceritakan\b|\bmenceritakan (?:gaya|hubungan|komponen|nilai|vektor)\b)/iu,
    },
  },
  {
    id: "decorative-integration-journey",
    patterns: {
      de: /\bWeg von Punkt\b[^.!?\n]{0,120}\bumgekehrt\b[^.!?\n]{0,120}\bAkkumulation\b/iu,
      en: /\breversing a journey\b[^.!?\n]{0,160}\baccumulat(?:ed|ion)\b/iu,
      id: /\b(?:membalik perjalanan|perjalanan pulang)\b[^.!?\n]{0,160}\bakumulasi(?:nya)?\b/iu,
    },
  },
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
