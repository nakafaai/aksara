import type { LessonVoiceRule } from "#nakafa-content/voice/types";

/** Checks decorative metaphors and stock narrative framing in lesson prose. */
export const METAPHOR_VOICE_RULES = [
  {
    id: "known-decorative-science-heading",
    patterns: {
      de: /^#{2,6}[ \t]+(?:Ein Ausweis für das Atom|Wenn Nullen im Weg stehen|Ein Rechner kennt die Messgenauigkeit nicht)[ \t]*$/iu,
      en: /^#{2,6}[ \t]+(?:An Atom Identity Card|When Zeros Get in the Way|A Calculator Does Not Know the Tool Precision|Indefinite Integrals as Antiderivative Families)[ \t]*$/iu,
      id: /^#{2,6}[ \t]+(?:Kartu Identitas Atom|Dimensi sebagai Kode|Ketika Nol Mulai Mengganggu|Kalkulator Belum Tahu Ketelitian Alat|Integral Tak Tentu sebagai Keluarga Antiturunan)[ \t]*$/iu,
    },
  },
  {
    id: "indonesian-mathematical-family-calque",
    patterns: {
      id: /\b(?:keluarga (?:antiturunan|fungsi|polinomial|sudut koterminal)|anggota keluarga,?\s+(?:pilih|ambil|tentukan)|senyawa sekeluarga)\b/iu,
    },
  },
  {
    id: "redirected-cell-machinery-metaphor",
    patterns: {
      de: /(?:\b(?:lenkt|lenken)\b[^.!?\n]{0,45}\bMaschinerie\b[^.!?\n]{0,20}\bum\b|\bübernimmt\b[^.!?\n]{0,45}\bZellmaschinerie\b)/iu,
      en: /\b(?:redirects?|takes? over)\b[^.!?\n]{0,45}\b(?:cell(?:ular)?|host-cell)(?:'s)? (?:machinery|work)\b/iu,
      id: /\b(?:mengarahkan|mengambil alih)\b[^.!?\n]{0,45}\b(?:mesin|kerja) sel(?: inang)?\b/iu,
    },
  },
  {
    id: "chemical-formula-personification",
    patterns: {
      de: /^\s*(?:(?:trägt|tragen) (?:die doppelte|die vierfache) \S*masse\b|(?:benötigt|benötigen)\s*$)/iu,
      en: /^\s*(?:carries (?:twice|four times) the (?:\S+ )?mass\b|needs\s*$)/iu,
      id: /^\s*(?:membawa (?:dua|empat) kali massa\b|membutuhkan\s*$)/iu,
    },
  },
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
] satisfies readonly LessonVoiceRule[];
