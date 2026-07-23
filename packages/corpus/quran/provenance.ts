import { QuranProvenanceRecordSchema } from "@nakafa/aksara-contracts/quran/provenance";

/** Tanzil permits verbatim Quran text distribution with attribution. */
const tanzilArabic = QuranProvenanceRecordSchema.make({
  evidence:
    "Tanzil publishes its Quran text under CC BY 3.0, permits verbatim use in applications, and requires source attribution plus its notice.",
  provider: "Tanzil Project",
  retrievedOn: "2026-07-23",
  scope: "arabic-text",
  sourceUrl: "https://tanzil.net/docs/Text_License",
  status: "approved",
});

/** Tanzil metadata documentation does not state a separate reuse license. */
const tanzilMetadata = QuranProvenanceRecordSchema.make({
  evidence:
    "Tanzil documents Quran structural metadata, but the reviewed metadata page does not state that its reuse is covered by the Quran text license.",
  provider: "Tanzil Project",
  retrievedOn: "2026-07-23",
  scope: "metadata",
  sourceUrl: "https://tanzil.net/docs/Quran_Metadata",
  status: "blocked",
});

/** Al Quran Cloud terms require edition-specific translator attribution. */
const englishTranslation = QuranProvenanceRecordSchema.make({
  evidence:
    "Al Quran Cloud requires republished translations to retain the edition identifier and attribute the translator; the repository has not yet recorded that product attribution.",
  provider: "Al Quran Cloud",
  retrievedOn: "2026-07-23",
  scope: "english-translation",
  sourceUrl: "https://alquran.cloud/terms-and-conditions",
  status: "blocked",
});

/** Al Quran Cloud terms do not establish the exact transliteration edition. */
const transliteration = QuranProvenanceRecordSchema.make({
  evidence:
    "The source values match an Al Quran Cloud transliteration edition, but the repository does not yet record its exact edition owner and required attribution.",
  provider: "Al Quran Cloud",
  retrievedOn: "2026-07-23",
  scope: "transliteration",
  sourceUrl: "https://alquran.cloud/terms-and-conditions",
  status: "blocked",
});

/** Recitation rights remain with reciters or their estates. */
const audio = QuranProvenanceRecordSchema.make({
  evidence:
    "Al Quran Cloud permits personal and educational streaming or embedding while reciters retain copyright; the exact Nakafa production use and attribution have not yet been approved.",
  provider: "Al Quran Cloud",
  retrievedOn: "2026-07-23",
  scope: "audio",
  sourceUrl: "https://alquran.cloud/terms-and-conditions",
  status: "blocked",
});

/** Kemenag translation access requires an approved API application. */
const indonesianTranslation = QuranProvenanceRecordSchema.make({
  evidence:
    "The official LPMQ API registration requires a completed form and formal application letter; no repository evidence proves Nakafa approval or a production token.",
  provider: "LPMQ Kementerian Agama RI",
  retrievedOn: "2026-07-23",
  scope: "indonesian-translation",
  sourceUrl: "https://quran-api.lpmqkemenag.id/",
  status: "blocked",
});

/** Kemenag Tafsir access has the same unproven application boundary. */
const indonesianTafsir = QuranProvenanceRecordSchema.make({
  evidence:
    "The official LPMQ API includes Tafsir Ringkas and Tahlili only after registration, formal application, activation, and token issuance; that permission is not evidenced in the repository.",
  provider: "LPMQ Kementerian Agama RI",
  retrievedOn: "2026-07-23",
  scope: "indonesian-tafsir",
  sourceUrl: "https://quran-api.lpmqkemenag.id/",
  status: "blocked",
});

/** Exact ordered evidence used to derive the Quran production gate. */
export const quranProvenanceRecords = [
  tanzilArabic,
  tanzilMetadata,
  englishTranslation,
  transliteration,
  audio,
  indonesianTranslation,
  indonesianTafsir,
] as const;
