import type { LessonVoiceRule } from "#nakafa-content/voice-types";

/** Checks repeated words and vague claims that replace a concrete explanation. */
export const CORE_VOICE_RULES = [
  {
    id: "duplicate-adjacent-word",
    patterns: {
      de: /\b(?!(?:acht|alle|das|dem|den|der|des|die|ein|eine|einem|einen|einer|eines|mit|und|von|zwischen)\b)([\p{L}]{3,})[ \t]+\1\b/iu,
      en: /\b(?!(?:and|between|eight|from|had|that|the|with)\b)([\p{L}]{3,})[ \t]+\1\b/iu,
      id: /\b(?!(?:antara|dan|dari|delapan|dengan|jari|rata)\b)([\p{L}]{3,})[ \t]+\1\b/iu,
    },
  },
  {
    id: "corrective-decoration-metaphor",
    patterns: {
      de: /\b(?:ist|sind|war|waren)\b[^.!?\n]{0,60}\bkein(?:e|en|er|es)?\s+(?:bloße[rsnm]?\s+)?(?:Dekoration|Formalität|Schmuck|Schreibweise|Zusatz)\b/iu,
      en: /\b(?:is|are|was|were)\b[^.!?\n]{0,30}\b(?:not|no)\s+(?:merely\s+|just\s+)?(?:a\s+|an\s+)?(?:decoration|decorations|decorative(?:\s+notation)?|formality|ornament|ornaments)\b/iu,
      id: /\b(?:bukan|tidak sekadar)\s+(?:sekadar\s+)?(?:hiasan|dekorasi|formalitas|notasi kosong)(?:\s+visual)?\b/iu,
    },
  },
  {
    id: "vague-concretizing-claim",
    patterns: {
      de: /\b(?:macht|machen|machte|machten)\b[^.!?\n]{0,120}\b(?:anschaulich|greifbar|konkret|lebendig)\b/iu,
      en: /\b(?:make|makes|made)\b[^.!?\n]{0,120}\b(?:concrete|tangible|feel(?:s)? (?:more )?(?:real|close|practical)|sound too simple)\b/iu,
      id: /\b(?:membuat|menjadikan)\b[^.!?\n]{0,120}\b(?:lebih konkret|lebih nyata|terasa (?:lebih |terlalu )?(?:nyata|praktis|dekat|sederhana))\b/iu,
    },
  },
  {
    id: "vague-model-fidelity",
    patterns: {
      de: /\brealistischer\b/iu,
      en: /\bmore realistic\b/iu,
      id: /\blebih nyata\b/iu,
    },
  },
  {
    id: "vague-sensory-claim",
    patterns: {
      en: /\b(?:give|gives|gave)\b[^.!?\n]{0,100}\b(?:a )?physical feel\b/iu,
      id: /\bmemberi(?:kan)?\b[^.!?\n]{0,100}\brasa gerak(?:nya)?\b/iu,
    },
  },
  {
    id: "vague-picture-claim",
    patterns: {
      de: /\b(?:gibt|geben|liefert|liefern|vermittelt|vermitteln)\s+(?:uns\s+)?(?:dafür\s+)?(?:ein(?:e[snrme]*)?\s+)?(?:(?:anschauliche[snrme]*|erste[snrme]*|einfache[snrme]*|ähnliche[snrme]*|verzerrte[snrme]*)\s+){0,3}(?:Bild|Eindruck|Vorstellung)\b/iu,
      en: /\b(?:give|gives|gave|provide|provides|provided)\s+(?:us\s+)?(?:a|an|the)?\s*(?:(?:first|initial|simple|useful|visual|clear|similar|better|misleading)\s+){0,3}(?:picture|impression|sense)\b/iu,
      id: /(?<!tanpa )\bmemberi(?:kan)?\s+(?:sebuah\s+|suatu\s+)?(?:gambaran|kesan)\b/iu,
    },
  },
  {
    id: "decorative-picture-to-calculation",
    patterns: {
      de: /\b(?:verwandelt\s+(?:dieses|das)\s+Bild\s+in\s+(?:eine\s+)?(?:exakte|genaue|zuverlässige)\s+Rechnung|wird\s+aus\s+(?:diesem|dem)\s+Bild\s+(?:eine\s+)?(?:physikalische\s+)?Untersuchung)\b/iu,
      en: /\b(?:turns?\s+(?:this|that|the)\s+picture\s+into\s+(?:a\s+)?(?:exact|precise|reliable)\s+calculation|(?:this|that|the)\s+picture\s+becomes?\s+(?:a\s+)?(?:physical\s+)?investigation)\b/iu,
      id: /\b(?:mengubah\s+gambaran\s+(?:ini|itu|tersebut)\s+menjadi\s+perhitungan\s+(?:yang\s+)?(?:andal|pasti|tepat)|(?:gambar|gambaran)\s+(?:ini|itu|tersebut)\s+menjadi\s+penyelidikan\s+(?:fisika|fisis))\b/iu,
    },
  },
  {
    id: "vague-observation-claim",
    patterns: {
      en: /\bmakes?\s+(?:the\s+|this\s+)?(?:claim|observation|signal)\s+(?:clearer|stronger|sharper)\b/iu,
      id: /\bmembuat\s+(?:klaim|pengamatan|observasi|sinyal)\s+(?:lebih\s+)?(?:jelas|kuat|tajam|rapi)\b/iu,
    },
  },
  {
    id: "vague-observation-ease",
    patterns: {
      de: /\b(?:leicht|leichter|einfach|einfacher) zu (?:erkennen|sehen)\b/iu,
      en: /\b(?:easy|easier) to see\b/iu,
      id: /\b(?:mudah|lebih mudah) (?:dilihat|terlihat)\b/iu,
    },
  },
  {
    id: "vague-concrete-transition",
    patterns: {
      en: /\b(?:understand|explain|see)\b[^.!?\n]{0,80}\bmore concretely\b/iu,
      id: /\bsecara lebih konkret\b/iu,
    },
  },
] satisfies readonly LessonVoiceRule[];
