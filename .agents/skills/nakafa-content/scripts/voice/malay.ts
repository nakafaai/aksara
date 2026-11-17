import type { LessonVoiceRule } from "#nakafa-content/voice/types";

/**
 * Checks Malaysian Malay prose for the Indonesian forms that read as foreign or
 * mean something else in Malaysia. Each pattern names a form that standard
 * Malaysian Malay (Dewan Bahasa dan Pustaka) writes differently, so a match is
 * never a matter of taste. The learner address lives with the other locales'
 * address rules in `voice/address.ts`, so public pages check it too.
 */
export const MALAY_COPY_RULES = [
  {
    id: "malay-indonesian-function-word",
    patterns: {
      ms: /\b(?:karena|bisa|mau|saja|sih|dong|kok|deh|lho|nggak|enggak|gak|banget|udah|aja)\b/iu,
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
    // Bare "kuadrat" is the Malay ecology quadrat (DBP, KSSM Biologi), so only
    // the Indonesian squared sense is refused; Malay writes it "kuadratik" or
    // "kuasa dua".
    id: "malay-indonesian-science-term",
    patterns: {
      ms: /\b(?:matematika|fisika|genetika|(?:persamaan|fungsi|akar|pangkat) kuadrat|\p{L} kuadrat|kuadrat dari|gradien|garis singgung|pertidaksamaan|energi|listrik|pernapasan|senyawa|asam|kalor)\b/iu,
    },
    protectInlineQuotations: true,
  },
] satisfies readonly LessonVoiceRule[];
