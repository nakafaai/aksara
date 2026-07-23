import { LEARNING_PROGRAM_KEYS } from "#corpus/program/keys";

/** Exact official assessment-program rows preserved from Nakafa's registry. */
export const examProgramSources = [
  {
    defaultCoverageStatus: "planned",
    displayOrder: 50,
    iconKey: "assessment",
    key: LEARNING_PROGRAM_KEYS.tka,
    kind: "assessment",
    navigation: {
      levels: ["section", "domain", "set"],
      model: "exam-domain-set",
    },
    provider: {
      homeCountry: "ID",
      kind: "official",
      name: "Kemendikdasmen",
    },
    recommendedCountry: "ID",
    sources: [
      {
        label: "Portal TKA",
        retrievedAt: "2026-06-14",
        reviewAfter: "2026-12-31",
        type: "official-portal",
        url: "https://tka.kemendikdasmen.go.id/",
      },
      {
        label: "Penjelasan TKA Rumah Pendidikan",
        retrievedAt: "2026-06-14",
        reviewAfter: "2026-12-31",
        type: "official-policy",
        url: "https://pusatinformasi.rumahpendidikan.kemendikdasmen.go.id/hc/id/articles/52474902769689-Kenali-Tes-Kemampuan-Akademik-TKA",
      },
    ],
    translations: {
      en: { publicSlug: "tka", title: "TKA 2026" },
      id: { publicSlug: "tka", title: "TKA 2026" },
    },
    version: {
      endsAt: "2026-12-31",
      label: "2026",
      startsAt: "2026-01-01",
    },
  },
  {
    defaultCoverageStatus: "partial",
    displayOrder: 60,
    iconKey: "certificate",
    key: LEARNING_PROGRAM_KEYS.snbt,
    kind: "admission-exam",
    navigation: {
      levels: ["section", "domain", "set"],
      model: "exam-domain-set",
    },
    provider: {
      homeCountry: "ID",
      kind: "official",
      name: "SNPMB",
    },
    recommendedCountry: "ID",
    sources: [
      {
        label: "Informasi Umum UTBK-SNBT 2026",
        retrievedAt: "2026-06-14",
        reviewAfter: "2026-12-31",
        type: "official-blueprint",
        url: "https://snpmb.id/utbk-snbt/informasi-umum",
      },
    ],
    translations: {
      en: { publicSlug: "snbt", title: "SNBT 2026" },
      id: { publicSlug: "snbt", title: "SNBT 2026" },
    },
    version: {
      endsAt: "2026-12-31",
      label: "2026",
      startsAt: "2026-01-01",
    },
  },
] as const;
