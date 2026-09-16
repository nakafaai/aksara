import type { LessonVoiceRule } from "#nakafa-content/voice/types";

/** Checks headings whose demonstrative pronoun has no stated referent. */
export const DEMONSTRATIVE_VOICE_RULES = [
  {
    id: "heading-demonstrative-reference",
    patterns: {
      de: /^#{2,6}[ \t]+[^\n]*\b(?:diese|dieser|dieses|diesen|diesem|solche|solcher|solches|solchen|jene|jener|jenes)\b/iu,
      en: /^#{2,6}[ \t]+[^\n]*\b(?:this|these|those)\b/iu,
      id: /^#{2,6}[ \t]+(?!apa\s+itu\b)[^\n]*\b(?:ini|itu|tersebut)\b/iu,
    },
  },
] satisfies readonly LessonVoiceRule[];
