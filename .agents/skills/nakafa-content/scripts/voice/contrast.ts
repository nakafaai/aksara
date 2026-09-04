import type { LessonVoiceRule } from "#nakafa-content/voice/types";

/** Blocks the known renewable-timescale contrast without banning factual negation. */
export const CONTRAST_VOICE_RULES = [
  {
    id: "compressed-renewable-timescale-contrast",
    patterns: {
      de: /\bErneuerbare Energiequellen werden durch natürliche Prozesse innerhalb menschlicher Zeiträume wieder verfügbar\.\s+Fossile Brennstoffe entstehen dagegen über Millionen Jahre\b/iu,
      en: /\bA renewable energy source can be replenished by natural processes on a human time scale rather than over the millions of years required to form fossil fuels\b/iu,
      id: /\bSumber energi terbarukan dapat tersedia kembali melalui proses alam dalam jangka waktu manusia,\s*bukan jutaan tahun seperti bahan bakar fosil\b/iu,
    },
  },
] satisfies readonly LessonVoiceRule[];
