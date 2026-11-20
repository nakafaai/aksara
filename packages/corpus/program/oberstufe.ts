import { LEARNING_PROGRAM_KEYS } from "#corpus/program/keys";

/**
 * The German Gymnasiale Oberstufe: the KMK Bildungsstandards for the
 * Allgemeine Hochschulreife set what a learner reaches by the Abitur, and the
 * Hessen Kerncurriculum orders it into the Einführungsphase and the four
 * Kurshalbjahre Q1 to Q4. The official name stays the title in every locale,
 * as Kurikulum Merdeka does, and so does its public slug.
 */
export const oberstufeProgramSource = {
  defaultCoverageStatus: "partial",
  displayOrder: 46,
  iconKey: "high-school",
  key: LEARNING_PROGRAM_KEYS.gymnasialeOberstufe,
  kind: "school-curriculum",
  navigation: {
    levels: ["class", "subject", "unit", "lesson"],
    model: "curriculum-tree",
  },
  provider: {
    homeCountry: "DE",
    kind: "official",
    name: "Kultusministerkonferenz",
  },
  recommendedCountry: "DE",
  sources: [
    {
      label:
        "Bildungsstandards im Fach Mathematik für die Allgemeine Hochschulreife (Beschluss der Kultusministerkonferenz vom 18.10.2012)",
      retrievedAt: "2026-11-20",
      reviewAfter: "2027-12-31",
      type: "official-policy",
      url: "https://www.kmk.org/fileadmin/Dateien/veroeffentlichungen_beschluesse/2012/2012_10_18-Bildungsstandards-Mathe-Abi.pdf",
    },
    {
      label:
        "Kerncurriculum gymnasiale Oberstufe Mathematik, Hessen, Ausgabe 2024, Stand 01.08.2025",
      retrievedAt: "2026-11-20",
      reviewAfter: "2027-12-31",
      type: "official-blueprint",
      url: "https://kultus.hessen.de/sites/kultus.hessen.de/files/2025-10/kerncurriculum_gymnasiale_oberstufe-mathematik.pdf",
    },
  ],
  translations: [
    {
      appLocale: "en",
      publicSlug: "gymnasiale-oberstufe",
      title: "Gymnasiale Oberstufe",
    },
    {
      appLocale: "id",
      publicSlug: "gymnasiale-oberstufe",
      title: "Gymnasiale Oberstufe",
    },
    {
      appLocale: "de",
      publicSlug: "gymnasiale-oberstufe",
      title: "Gymnasiale Oberstufe",
    },
    {
      appLocale: "ms",
      publicSlug: "gymnasiale-oberstufe",
      title: "Gymnasiale Oberstufe",
    },
  ],
  version: { label: "KMK 2012, Kerncurriculum Hessen 2024" },
} as const;
