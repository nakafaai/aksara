import type { LessonVoiceRule } from "#nakafa-content/voice/types";

/** Checks mechanical text defects that need no sentence meaning. */
export const DEFECT_VOICE_RULES = [
  {
    id: "dash-character",
    patterns: {
      de: /[\u{2013}\u{2014}]/u,
      en: /[\u{2013}\u{2014}]/u,
      id: /[\u{2013}\u{2014}]/u,
    },
  },
  {
    id: "duplicate-adjacent-word",
    patterns: {
      de: /\b(?!(?:acht|alle|das|dem|den|der|des|die|ein|eine|einem|einen|einer|eines|mit|und|von|zwischen)\b)([\p{L}]{3,})[ \t]+\1\b/iu,
      en: /\b(?!(?:and|between|eight|from|had|that|the|with)\b)([\p{L}]{3,})[ \t]+\1\b/iu,
      id: /\b(?!(?:antara|dan|dari|delapan|dengan|jari|rata)\b)([\p{L}]{3,})[ \t]+\1\b/iu,
    },
  },
  {
    // A numbered item already orders the step, so a leading ordinal repeats the
    // number. Label punctuation closes the ordinal as an interjection, which a
    // modifier never does, so `1. First term a`, `1. First ionization energy`,
    // and `1. Pertama kali` stay valid. An ordinal followed directly by a verb,
    // as in `4. First simplify the angles.`, is the same defect and stays a
    // manual review item until the corpus carries none of those.
    id: "duplicated-list-ordinal",
    patterns: {
      de: /^\s*\d+[.)]\s+(?:\*\*)?(?:Zuerst|Zunächst)\s*[,:]/iu,
      en: /^\s*\d+[.)]\s+(?:\*\*)?First\s*[,:]/iu,
      id: /^\s*\d+[.)]\s+(?:\*\*)?Pertama\s*[,:]/iu,
    },
  },
] satisfies readonly LessonVoiceRule[];
