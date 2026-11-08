import type { LessonVoiceRule } from "#nakafa-content/voice/types";

/**
 * Checks Malaysian Malay prose for the Indonesian forms that read as foreign or
 * mean something else in Malaysia, and for Nakafa's Malay learner address.
 * Each pattern names a form that standard Malaysian Malay (Dewan Bahasa dan
 * Pustaka) writes differently, so a match is never a matter of taste. Malay
 * prose talks to the learner as `kamu`, the way a teacher talks to a student.
 */
export const MALAY_COPY_RULES = [
  {
    id: "malay-indonesian-function-word",
    patterns: {
      ms: /\b(?:karena|bisa|mau|kalian|saja|sih|dong|kok|deh|lho|nggak|enggak|gak|banget|udah|aja)\b/iu,
    },
    protectInlineQuotations: true,
  },
  {
    id: "malay-indonesian-vocabulary",
    patterns: {
      ms: /\b(?:jawaban|unduh|mengunduh|unggah|mengunggah|kata sandi|tautan|pengaturan|persentase|daring|luring|gratis|beasiswa|kantor|mobil|sepeda|uang|rumah sakit)\b/iu,
    },
    protectInlineQuotations: true,
  },
  {
    id: "malay-indonesian-itas-suffix",
    patterns: { ms: /\b\p{L}{2,}itas\b/iu },
    protectInlineQuotations: true,
  },
  {
    id: "malay-indonesian-science-term",
    patterns: {
      ms: /\b(?:matematika|fisika|genetika|kuadrat|gradien|garis singgung|pertidaksamaan|energi|listrik|pernapasan|senyawa|asam|kalor)\b/iu,
    },
    protectInlineQuotations: true,
  },
  {
    id: "malay-learner-address",
    inspectLinkLabels: true,
    patterns: { ms: /\b(?:anda|awak|kau|engkau)\b/iu },
    protectInlineQuotations: true,
  },
] satisfies readonly LessonVoiceRule[];
