import type { LessonVoiceRule } from "#nakafa-content/voice/types";

/** Checks prose that assigns human reading or abstract visibility to concepts. */
export const VISIBILITY_VOICE_RULES = [
  {
    id: "abstract-reading-claim",
    patterns: {
      de: /\b(?:Diagramm|Formel|Gesetz|Modell|Regel|Satz|Theorem|Wert)\b(?:(?!\b(?:du|ihr|man|Sie|um|wir|zu)\b)[^,;:.!?|\n]){0,80}\bliest\b/iu,
      en: /\b(?:diagram|formula|graph|law|model|rule|speed|theorem|value)\b(?:(?!\b(?:readers?|students?|to|we|you)\b)[^,;:.!?|\n]){0,80}\breads?\b/iu,
      id: /\b(?:aturan|diagram|grafik|hukum|rumus|model|kelajuan|kecepatan|nilai|teorema)\b(?:(?!\b(?:kamu|kita|pembaca|siswa|untuk)\b)[^,;:.!?|\n]){0,80}\bmembaca\b/iu,
    },
  },
  {
    id: "formulaic-visible-claim",
    patterns: {
      de: /(?:\b(?:macht|machen|machte|machten)\b[^.!?\n]{0,100}\bsichtbar\b|\bsichtbar\b[^.!?\n]{0,100}\b(?:macht|machen|machte|machten)\b)/iu,
      en: /\b(?:make|makes|made|making)\b[^.!?\n]{0,100}\bvisible\b/iu,
      id: /\b(?:membuat|menjadikan)\b[^.!?\n]{0,100}\b(?:terlihat|tampak)\b/iu,
    },
  },
  {
    id: "abstract-visibility-purpose",
    patterns: {
      de: /\b(?:damit|sodass)\b[^.!?\n]{0,40}\b(?:Idee|Konzept)\b[^.!?\n]{0,20}\bsichtbar\b/iu,
      en: /\bso(?: that)?\b[^.!?\n]{0,40}\b(?:concept|idea)\b[^.!?\n]{0,20}\b(?:is|becomes?)\s+visible\b/iu,
      id: /\b(?:agar|supaya)\b[^.!?\n]{0,40}\b(?:ide|konsep)(?:nya)?\b[^.!?\n]{0,20}\b(?:terlihat|tampak)\b/iu,
    },
  },
  {
    id: "grouped-data-visibility-claim",
    patterns: {
      de: /\bursprüngliche(?:n|r|s)? (?:Einzelwerte|Werte)\b[^.!?\n]{0,40}\bnicht mehr sichtbar\b[^.!?\n]{0,50}\bgruppiert/iu,
      en: /\boriginal (?:observations|values)\b[^.!?\n]{0,40}\bno longer visible\b[^.!?\n]{0,50}\bgrouped/iu,
      id: /\bnilai asli\b[^.!?\n]{0,40}\b(?:sudah )?tidak (?:lagi )?terlihat\b[^.!?\n]{0,50}\b(?:dikelompokkan|data kelompok)\b/iu,
    },
  },
  {
    id: "abstract-visibility-claim",
    patterns: {
      de: /(?:\b(?:Geometrie|Grundform|Information(?:en)?|Kürzung|Muster|Streuung|Unterschied|Verhältnis|Verteilung|Zusammenhang)\b[^.!?\n]{0,25}\b(?:ist|sind|bleibt|bleiben|wird|werden)\b[^.!?\n]{0,20}\b(?:erkennbar|sichtbar|verborgen)\b|\b(?:ist|sind|bleibt|bleiben|wird|werden)\b[^.!?\n]{0,25}\b(?:Geometrie|Grundform|Information(?:en)?|Kürzung|Muster|Streuung|Unterschied|Verhältnis|Verteilung|Zusammenhang)\b[^.!?\n]{0,20}\b(?:erkennbar|sichtbar|verborgen)\b|\bmäßig(?:e[snrme]*)? sichtbar(?:e[snrme]*)?\b[^.!?\n]{0,25}\b(?:Muster|Unterschied|Verhältnis|Zusammenhang)\b|\b(?:verdeckt|verbirgt|verschleiert)\b[^.!?\n]{0,35}\b(?:Geometrie|Information(?:en)?|Muster|Streuung|Unterschied|Verhältnis|Verteilung|Zusammenhang)\b)/iu,
      en: /(?:(?<!until the )(?<!until this )(?<!until that )\b(?:cancellation|difference|distinction|distribution|form|geometry|information|observation|pattern|ratio|relationship|spread)\b[^.!?\n]{0,25}\b(?:is|are|became|becomes?|remains?)\b[^.!?\n]{0,20}\b(?:hidden|visible)\b|\b(?:moderately|partly) visible\b[^.!?\n]{0,30}\b(?:difference|distinction|pattern|ratio|relationship)\b|\b(?:hide|hides|hid|obscure|obscures|obscured)\b[^.!?\n]{0,35}\b(?:difference|distinction|distribution|geometry|information|pattern|ratio|relationship|spread)\b)/iu,
      id: /(?:\b(?:geometri|hubungan|informasi|pengamatan|perbedaan|pola|rasio|sebaran|distribusi)(?:nya)?\b[^.!?\n]{0,25}\b(?:(?:menjadi|jadi|cukup|sudah tidak|tidak lagi)\s+(?:tampak|terlihat)|tersembunyi)\b|\b(?:menutupi|menyamarkan)\b[^.!?\n]{0,35}\b(?:geometri|hubungan|informasi|pengamatan|perbedaan|pola|rasio|sebaran|distribusi)\b)/iu,
    },
  },
  {
    id: "formulaic-observation-filler",
    patterns: {
      de: /(?:\b(?:wir können sehen(?:, dass)?|du kannst sehen(?:, dass)?|wie wir sehen|es ist klar,? dass|klar zu sehen ist|man (?:sieht|erkennt),? dass)\b|^\s*Bei (?:genauerer|näherer) Betrachtung,)/iu,
      en: /(?:\b(?:we can see(?: that)?|you can see(?: that)?|as we can see|it can be seen that|it is clear that|clearly visible that)\b|^\s*When observed,)/iu,
      id: /(?:\b(?:(?:kita|kalian) (?:bisa|dapat) melihat(?: bahwa)?|seperti yang (?:kita|kalian) lihat|terlihat bahwa|terlihat jelas bahwa|(?:perbedaan(?:nya)?|hasil(?:nya)?|hal ini|hal itu) terlihat jelas(?=\s*[:.,]))\b|^\s*Jika diamati,)/iu,
    },
  },
  {
    id: "formulaic-visual-handoff",
    patterns: {
      de: /\b(?:wenn wir|falls wir)\b[^.!?\n]{0,50}\bvisualisier(?:en|t)\b[^.!?\n]{0,50}\bsieht\b[^.!?\n]{0,20}\bso aus\b/iu,
      en: /\bif we\b[^.!?\n]{0,50}\b(?:create|draw|visualize)\b[^.!?\n]{0,50}\b(?:look|looks|would look|will look) like\b/iu,
      id: /\bjika kita\b[^.!?\n]{0,50}\b(?:buat grafik|gambar|visualisasikan)\b[^.!?\n]{0,50}\b(?:akan )?(?:terlihat|tampak) seperti\b/iu,
    },
  },
] satisfies readonly LessonVoiceRule[];
