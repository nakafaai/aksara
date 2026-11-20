import { mathematicsStandards } from "#corpus/curriculum/kssm/documents";
import { materialNode, unitNode } from "#corpus/curriculum/schema";

/** KSSM Form 4 Matematik chapter 8, measures of dispersion for ungrouped data. */
export const kssmForm4UngroupedDispersionUnit = unitNode({
  children: [
    materialNode({
      key: "form-4-mathematics-measures-of-dispersion-for-ungrouped-data-statistics-foundations",
      level: "lesson",
      materialKeys: ["lesson.mathematics.statistics-foundations"],
      order: 10,
      outcomes: [
        {
          code: "Tingkatan 4, Standard Kandungan 8.2, Standard Pembelajaran 8.2.1 dan 8.2.3",
          document: mathematicsStandards,
        },
      ],
    }),
  ],
  key: "form-4-mathematics-measures-of-dispersion-for-ungrouped-data",
  materialCard: {
    de: {
      description: "Miss, wie weit ungruppierte Daten streuen.",
      title: "Streuungsmaße für Einzeldaten",
    },
    en: {
      description: "Measure how widely ungrouped data spread out.",
      title: "Measures of Dispersion for Ungrouped Data",
    },
    id: {
      description: "Ukur seberapa menyebar data tunggal.",
      title: "Ukuran Penyebaran Data Tunggal",
    },
    ms: {
      description: "Ukur sejauh mana data tak terkumpul tersebar.",
      title: "Sukatan Serakan Data Tak Terkumpul",
    },
  },
  order: 80,
  translations: {
    de: {
      routeSlug: "streuungsmasse-fuer-einzeldaten",
      title: "Streuungsmaße für Einzeldaten",
    },
    en: {
      routeSlug: "measures-of-dispersion-for-ungrouped-data",
      title: "Measures of Dispersion for Ungrouped Data",
    },
    id: {
      routeSlug: "ukuran-penyebaran-data-tunggal",
      title: "Ukuran Penyebaran Data Tunggal",
    },
    ms: {
      routeSlug: "sukatan-serakan-data-tak-terkumpul",
      title: "Sukatan Serakan Data Tak Terkumpul",
    },
  },
});

/** KSSM Form 4 Matematik chapter 9, probability of combined events. */
export const kssmForm4CombinedProbabilityUnit = unitNode({
  children: [
    materialNode({
      key: "form-4-mathematics-probability-of-combined-events-probability",
      level: "lesson",
      materialKeys: ["lesson.mathematics.probability"],
      order: 10,
      outcomes: [
        {
          code: "Tingkatan 4, Standard Kandungan 9.1 (sebahagian) dan 9.3",
          document: mathematicsStandards,
        },
      ],
    }),
  ],
  key: "form-4-mathematics-probability-of-combined-events",
  materialCard: {
    de: {
      description: "Berechne die Chance zweier Ereignisse zusammen.",
      title: "Wahrscheinlichkeit verknüpfter Ereignisse",
    },
    en: {
      description: "Find the chance of two events happening together.",
      title: "Probability of Combined Events",
    },
    id: {
      description: "Hitung peluang dua kejadian yang terjadi bersamaan.",
      title: "Peluang Kejadian Majemuk",
    },
    ms: {
      description: "Cari kebarangkalian dua peristiwa berlaku bersama.",
      title: "Kebarangkalian Peristiwa Bergabung",
    },
  },
  order: 90,
  translations: {
    de: {
      routeSlug: "wahrscheinlichkeit-verknuepfter-ereignisse",
      title: "Wahrscheinlichkeit verknüpfter Ereignisse",
    },
    en: {
      routeSlug: "probability-of-combined-events",
      title: "Probability of Combined Events",
    },
    id: {
      routeSlug: "peluang-kejadian-majemuk",
      title: "Peluang Kejadian Majemuk",
    },
    ms: {
      routeSlug: "kebarangkalian-peristiwa-bergabung",
      title: "Kebarangkalian Peristiwa Bergabung",
    },
  },
});
