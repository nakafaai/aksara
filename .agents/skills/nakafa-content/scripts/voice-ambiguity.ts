import type { LessonVoiceRule } from "#nakafa-content/voice-types";

/** Checks ambiguous references and empty conclusions. */
export const AMBIGUITY_VOICE_RULES = [
  {
    id: "vague-uncertainty-transformation",
    patterns: {
      de: /\bWahrscheinlichkeitsverteilungen?\s+mach(?:t|en)\s+unsichere Ergebnisse vergleichbar und nutzbar\b/iu,
      en: /\bProbability distributions?\s+turn(?:s)?\s+uncertain outcomes into quantities that can be compared and used\b/iu,
      id: /\bDistribusi peluang\s+mengubah ketidakpastian menjadi besaran yang dapat dibandingkan dan digunakan\b/iu,
    },
  },
  {
    id: "evidence-carrying-metaphor",
    patterns: {
      de: /\b(?:Hinweis|Beleg|Beweis)\b[^.!?\n]{0,80}\bträgt\b[^.!?\n]{0,60}\b(?:Schlussfolgerung|Urteil)\b/iu,
      en: /\b(?:clue|evidence|observation)\b[^.!?\n]{0,80}\bcarries?\b[^.!?\n]{0,60}\b(?:conclusion|judgment)\b/iu,
      id: /\b(?:petunjuk|bukti|pengamatan)\b[^.!?\n]{0,80}\bmenanggung\b[^.!?\n]{0,60}\b(?:kesimpulan|penilaian)\b/iu,
    },
  },
  {
    id: "formulaic-learning-benefit",
    patterns: {
      de: /\b(?:hilft (?:uns|dir)(?: dabei)?|ermöglicht (?:uns|dir|es uns|es dir)|gibt uns (?:eine\s+)?(?:Möglichkeit|einen Weg))\b/iu,
      en: /\b(?:helps? (?:us|you) (?:to )?|(?:allows?|enables?) (?:us|you) to|lets? (?:us|you)|gives? us (?:a\s+)?(?:direct\s+|precise\s+)?way|we need to remember that)\b/iu,
      id: /\b(?:membantu (?:kita|kamu) (?:untuk )?|memungkinkan (?:kita|kamu)|memberi(?:kan)? kita cara|kita perlu mengingat bahwa)\b/iu,
    },
  },
  {
    id: "vague-explanatory-help",
    patterns: {
      de: /(?:\b(?:hilft|helfen)(?: uns| dir| euch| Schülern| Lesern| dem Leser| der Leserin| dabei)?(?:,)? (?:zu erklären|zu erkennen|zu sehen|zu verstehen|zu visualisieren)\b|\b(?:hilft|helfen)(?: uns| dir| euch| Schülern| Lesern| dem Leser| der Leserin| dabei)?(?:,)?[^.!?\n]{0,60}\bzu visualisieren\b)/iu,
      en: /\bhelps? (?:us |you |students |readers? )?(?:explain|recognize|see|show|understand|visualize)\b/iu,
      id: /\bmembantu (?:kita |kamu |kalian |siswa |pembaca )?(?:melihat|memahami|menjelaskan|mengenali|menunjukkan|memvisualisasikan|visualisasi)\b/iu,
    },
  },
  {
    id: "generic-understanding-payoff",
    patterns: {
      de: /\b(?:vermittelt|liefert|gibt) (?:ein )?(?:tieferes|besseres|klareres) Verständnis\b/iu,
      en: /\b(?:provides?|gives?) (?:us |you )?(?:a )?(?:deeper|better|clearer) understanding\b/iu,
      id: /\bmemberikan pemahaman (?:yang )?(?:lebih )?(?:mendalam|baik|jelas)\b/iu,
    },
  },
  {
    id: "formulaic-learning-payoff",
    patterns: {
      de: /\bnachdem wir\b[^.!?\n]{0,160}\b(?:kennengelernt|verstanden|gelernt) haben\b/iu,
      en: /\bby understanding\b/iu,
      id: /\b(?:dengan|setelah) memahami\b/iu,
    },
  },
  {
    id: "vague-demonstrative-conclusion",
    patterns: {
      de: /(?:^|[.!?]\s+)(?:Dies|Das) zeigt\b/iu,
      en: /(?:^|[.!?]\s+)(?:This|That) shows\b/iu,
      id: /(?:^|[.!?]\s+)(?:Ini|Itu|Hal ini|Hal itu) menunjukkan\b/iu,
    },
  },
  {
    id: "vague-section-opening-reference",
    patterns: {
      de: /^\s*(?:Diese beiden|Die beiden) Begriffe\b/iu,
      en: /^\s*These two terms\b/iu,
      id: /^\s*Dua istilah ini\b/iu,
    },
  },
  {
    id: "abstract-concept-asks-question",
    patterns: {
      de: /\b(?:Anpassung|Formel|Gesetz|Konzept|Methode|Minderung|Modell|Position)\s+fragt\b/iu,
      en: /\b(?:adaptation|concept|formula|law|method|mitigation|model|position)\s+asks?\b/iu,
      id: /\b(?:adaptasi|hukum|konsep|metode|mitigasi|model|posisi|rumus)\s+bertanya\b/iu,
    },
  },
  {
    id: "indonesian-unnamed-follow-up-reference",
    patterns: {
      id: /^\s*(?:\d+[.)]\s*)?(?:\*\*)?(?:(?:kemudian|lalu|setelah itu),?\s+)?(?:bandingkan|gunakan|periksa|tafsirkan)\s+(?:cara|hasil|nilai|rumus)(?:nya| tersebut)\b/iu,
    },
  },
  {
    id: "indonesian-contextless-path-imperative",
    patterns: {
      id: /^\s*Tuliskan\s+(?:jalur|urutan)\s+\p{L}+nya\b/iu,
    },
  },
] satisfies readonly LessonVoiceRule[];
