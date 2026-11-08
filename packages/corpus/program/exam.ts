import { LEARNING_PROGRAM_KEYS } from "#corpus/program/keys";

/**
 * The official assessment programs. SNBT is named for the sitting learners
 * prepare for, 2027; TKA has no year, because it is divided by school grade.
 * A source keeps the date it was read and the edition it names.
 */
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
    translations: [
      { appLocale: "en", publicSlug: "tka", title: "TKA" },
      { appLocale: "id", publicSlug: "tka", title: "TKA" },
      { appLocale: "de", publicSlug: "tka", title: "TKA" },
    ],
    version: { label: "Pusmendik" },
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
        label: "Framework UTBK-SNBT 2026",
        retrievedAt: "2026-08-30",
        reviewAfter: "2026-12-31",
        type: "official-blueprint",
        url: "https://snpmb.id/fr/",
      },
    ],
    translations: [
      { appLocale: "en", publicSlug: "snbt", title: "SNBT 2027" },
      { appLocale: "id", publicSlug: "snbt", title: "SNBT 2027" },
      { appLocale: "de", publicSlug: "snbt", title: "SNBT 2027" },
    ],
    version: {
      endsAt: "2027-12-31",
      label: "2027",
      startsAt: "2027-01-01",
    },
  },
] as const;
