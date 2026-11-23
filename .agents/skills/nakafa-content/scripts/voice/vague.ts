import type { LessonVoiceRule } from "#nakafa-content/voice/types";

/** Checks claims that describe an impression instead of the thing taught. */
export const VAGUE_VOICE_RULES = [
  {
    id: "vague-concretizing-claim",
    patterns: {
      de: /\b(?:macht|machen|machte|machten)\b[^.!?\n]{0,120}\b(?:anschaulich|greifbar|konkret|lebendig)\b/iu,
      en: /\b(?:make|makes|made)\b[^.!?\n]{0,120}\b(?:concrete|tangible|feel(?:s)? (?:more )?(?:real|close|practical)|sound too simple)\b/iu,
      id: /\b(?:membuat|menjadikan)\b[^.!?\n]{0,120}\b(?:lebih konkret|lebih nyata|terasa (?:lebih |terlalu )?(?:nyata|praktis|dekat|sederhana))\b/iu,
      ms: /\b(?:membuat|menjadikan)\b[^.!?\n]{0,120}\b(?:lebih konkrit|lebih nyata|terasa (?:lebih |terlalu )?(?:nyata|praktikal|dekat|ringkas))\b/iu,
    },
  },
  {
    id: "vague-model-fidelity",
    patterns: {
      de: /\brealistischer\b/iu,
      en: /\bmore realistic\b/iu,
      id: /\blebih nyata\b/iu,
      ms: /\blebih (?:nyata|realistik)\b/iu,
    },
  },
  {
    id: "vague-sensory-claim",
    patterns: {
      en: /\b(?:give|gives|gave)\b[^.!?\n]{0,100}\b(?:a )?physical feel\b/iu,
      id: /\bmemberi(?:kan)?\b[^.!?\n]{0,100}\brasa gerak(?:nya)?\b/iu,
      ms: /\bmemberi(?:kan)?\b[^.!?\n]{0,100}\brasa gerak(?:an)?(?:nya)?\b/iu,
    },
  },
  {
    id: "vague-picture-claim",
    patterns: {
      de: /\b(?:gibt|geben|liefert|liefern|vermittelt|vermitteln)\s+(?:uns\s+)?(?:dafür\s+)?(?:ein(?:e[snrme]*)?\s+)?(?:(?:anschauliche[snrme]*|erste[snrme]*|einfache[snrme]*|ähnliche[snrme]*|verzerrte[snrme]*)\s+){0,3}(?:Bild|Eindruck|Vorstellung)\b/iu,
      en: /\b(?:give|gives|gave|provide|provides|provided)\s+(?:us\s+)?(?:a|an|the)?\s*(?:(?:first|initial|simple|useful|visual|clear|similar|better|misleading)\s+){0,3}(?:picture|impression|sense)\b/iu,
      id: /(?<!tanpa )\bmemberi(?:kan)?\s+(?:sebuah\s+|suatu\s+)?(?:gambaran|kesan)\b/iu,
      ms: /(?<!tanpa )\bmemberi(?:kan)?\s+(?:satu\s+|suatu\s+)?(?:gambaran|tanggapan)\b/iu,
    },
  },
  {
    id: "vague-observation-claim",
    patterns: {
      en: /\bmakes?\s+(?:the\s+|this\s+)?(?:claim|observation|signal)\s+(?:clearer|stronger|sharper)\b/iu,
      id: /\bmembuat\s+(?:klaim|pengamatan|observasi|sinyal)\s+(?:lebih\s+)?(?:jelas|kuat|tajam|rapi)\b/iu,
      ms: /\b(?:membuat|menjadikan)\s+(?:dakwaan|pemerhatian|isyarat)\s+(?:lebih\s+)?(?:jelas|kuat|tajam|kemas)\b/iu,
    },
  },
  {
    id: "vague-observation-ease",
    patterns: {
      de: /\b(?:leicht|leichter|einfach|einfacher) zu (?:erkennen|sehen)\b/iu,
      en: /\b(?:easy|easier) to see\b/iu,
      id: /\b(?:mudah|lebih mudah) (?:dilihat|terlihat)\b/iu,
      ms: /\b(?:mudah|lebih mudah) (?:dilihat|kelihatan)\b/iu,
    },
  },
  {
    id: "vague-concrete-transition",
    patterns: {
      en: /\b(?:understand|explain|see)\b[^.!?\n]{0,80}\bmore concretely\b/iu,
      id: /\bsecara lebih konkret\b/iu,
      ms: /\bsecara lebih konkrit\b/iu,
    },
  },
  {
    id: "vague-formula-gives-those",
    patterns: {
      en: /\bgives? those values\b/iu,
      id: /\bmemberikan nilai-nilai tersebut\b/iu,
      ms: /\bmemberikan nilai-nilai (?:tersebut|itu)\b/iu,
    },
  },
] satisfies readonly LessonVoiceRule[];
