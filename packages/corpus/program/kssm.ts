import { LEARNING_PROGRAM_KEYS } from "#corpus/program/keys";

/**
 * The Malaysian secondary curriculum (Kurikulum Standard Sekolah Menengah) of
 * Form 4 and Form 5, as the DSKP of each subject lays out its chapters.
 */
export const kssmProgramSource = {
  defaultCoverageStatus: "partial",
  displayOrder: 45,
  iconKey: "school",
  key: LEARNING_PROGRAM_KEYS.kssm,
  kind: "school-curriculum",
  navigation: {
    levels: ["stage", "class", "subject", "topic"],
    model: "curriculum-tree",
  },
  provider: {
    homeCountry: "MY",
    kind: "official",
    name: "Kementerian Pendidikan Malaysia",
  },
  recommendedCountry: "MY",
  sources: [
    {
      label: "Bahagian Pembangunan Kurikulum, Kementerian Pendidikan Malaysia",
      retrievedAt: "2026-11-08",
      reviewAfter: "2027-12-31",
      type: "official-portal",
      url: "https://bpk.moe.gov.my/",
    },
    {
      label: "DSKP KSSM Mathematics Form 4 and 5, English edition",
      retrievedAt: "2026-11-08",
      reviewAfter: "2027-12-31",
      type: "official-blueprint",
      url: "https://asiemodel.net/wp-content/uploads/2022/08/DSKP-KSSM-Mathematics-Form-4-and-5_Versi-English.pdf",
    },
    {
      label: "DSKP KSSM Physics Form 4 and 5, English edition",
      retrievedAt: "2026-11-08",
      reviewAfter: "2027-12-31",
      type: "official-blueprint",
      url: "https://asiemodel.net/wp-content/uploads/2022/08/DSKP-KSSM-Physics-Form-4-and-5_Versi-English.pdf",
    },
    {
      label: "DSKP KSSM Chemistry Form 4 and 5, English edition",
      retrievedAt: "2026-11-08",
      reviewAfter: "2027-12-31",
      type: "official-blueprint",
      url: "https://asiemodel.net/wp-content/uploads/2022/08/DSKP-KSSM-Chemistry-Form-4-and-5_Versi-English-1.pdf",
    },
    {
      label: "DSKP KSSM Biology Form 4 and 5, English edition",
      retrievedAt: "2026-11-08",
      reviewAfter: "2027-12-31",
      type: "official-blueprint",
      url: "https://asiemodel.net/wp-content/uploads/2022/08/DSKP-KSSM-Biology-Form-4-and-5_Versi-English.pdf",
    },
  ],
  translations: [
    {
      appLocale: "en",
      publicSlug: "kssm",
      title: "KSSM Malaysia",
    },
    {
      appLocale: "id",
      publicSlug: "kssm",
      title: "KSSM Malaysia",
    },
    {
      appLocale: "de",
      publicSlug: "kssm",
      title: "KSSM Malaysia",
    },
  ],
  version: { label: "Malaysia" },
} as const;
