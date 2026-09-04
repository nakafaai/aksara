import type { LessonVoiceRule } from "#nakafa-content/voice/types";

/** Checks reporting commands used as transitions instead of real assignments. */
export const REPORTING_VOICE_RULES = [
  {
    id: "contextless-measurement-reporting-imperative",
    patterns: {
      de: /^\s*Gib\b[^.!?\n]{0,160}\bmit (?:der|ihrer|seiner) Unsicherheit\b[^.!?\n]{0,40}\b(?:so|wie folgt) an\b/iu,
      en: /^\s*Report\b[^.!?\n]{0,160}\bwith (?:its|the) uncertainty\b[^.!?\n]{0,40}\bas follows\b/iu,
      id: /^\s*Laporkan\b[^.!?\n]{0,160}\b(?:ketidakpastian(?:nya)?|hasil pengukuran)\b[^.!?\n]{0,40}\bsebagai berikut\b/iu,
    },
  },
] satisfies readonly LessonVoiceRule[];
