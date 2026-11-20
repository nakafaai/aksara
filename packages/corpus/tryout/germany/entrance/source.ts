import { Effect } from "effect";

import { germanyTryoutCountry } from "#corpus/tryout/germany/country";
import { tuDarmstadtEntranceReadiness } from "#corpus/tryout/germany/entrance/readiness/darmstadt";
import { kaiserslauternEntranceReadiness } from "#corpus/tryout/germany/entrance/readiness/kaiserslautern";
import { tuDarmstadtEntranceTrack } from "#corpus/tryout/germany/entrance/tracks/darmstadt";
import { kaiserslauternEntranceTrack } from "#corpus/tryout/germany/entrance/tracks/kaiserslautern";
import { validateAssessmentSourceReadiness } from "#corpus/tryout/readiness/validation";
import { defineExamSource } from "#corpus/tryout/schema";

/**
 * The entrance examinations of the Studienkollegs, grouped by Kolleg. Every
 * Kolleg names its own procedure (Aufnahmeprüfung, Aufnahmetest,
 * Aufnahmeverfahren), so a track's profile carries that name.
 */
const entranceTryoutCatalog = defineExamSource({
  ...germanyTryoutCountry,
  examKey: "entrance-examination",
  examName: "Aufnahmeprüfung",
  examOrder: 1,
  examRouteSlugs: {
    de: "aufnahmepruefung",
    en: "aufnahmepruefung",
    id: "aufnahmepruefung",
    ms: "aufnahmepruefung",
  },
  examTranslations: {
    de: {
      description: "Probetests für die Aufnahmeprüfungen der Studienkollegs.",
    },
    en: {
      description: "Try-outs for the Aufnahmeprüfung of the Studienkollegs.",
    },
    id: {
      description: "Try out Aufnahmeprüfung Studienkolleg di Jerman.",
    },
    ms: {
      description: "Ujian percubaan Aufnahmeprüfung Studienkolleg di Jerman.",
    },
  },
  grouping: {
    axis: "institution",
    groups: [
      {
        key: "tu-darmstadt",
        order: 1,
        routeSlugs: {
          de: "studienkolleg-der-tu-darmstadt",
          en: "tu-darmstadt-studienkolleg",
          id: "studienkolleg-tu-darmstadt",
          ms: "studienkolleg-tu-darmstadt",
        },
        translations: {
          de: { title: "Studienkolleg der TU Darmstadt" },
          en: { title: "TU Darmstadt Studienkolleg" },
          id: { title: "Studienkolleg TU Darmstadt" },
          ms: { title: "Studienkolleg TU Darmstadt" },
        },
      },
      {
        key: "hs-kaiserslautern",
        order: 2,
        routeSlugs: {
          de: "internationales-studienkolleg-der-hochschule-kaiserslautern",
          en: "hochschule-kaiserslautern-international-studienkolleg",
          id: "studienkolleg-internasional-hochschule-kaiserslautern",
          ms: "studienkolleg-antarabangsa-hochschule-kaiserslautern",
        },
        translations: {
          de: {
            title:
              "Internationales Studienkolleg der Hochschule Kaiserslautern",
          },
          en: {
            title: "Hochschule Kaiserslautern International Studienkolleg",
          },
          id: {
            title: "Studienkolleg Internasional Hochschule Kaiserslautern",
          },
          ms: {
            title: "Studienkolleg Antarabangsa Hochschule Kaiserslautern",
          },
        },
      },
    ],
  },
  sourceRevision: "2026-11-20",
  tracks: [tuDarmstadtEntranceTrack, kaiserslauternEntranceTrack],
});

/** Validates the Studienkolleg entrance catalog against official readiness. */
export const entranceTryoutSource = Effect.gen(function* () {
  const [source, ...readinessEntries] = yield* Effect.all([
    entranceTryoutCatalog,
    tuDarmstadtEntranceReadiness,
    kaiserslauternEntranceReadiness,
  ]);
  for (const readiness of readinessEntries) {
    yield* validateAssessmentSourceReadiness(source, readiness);
  }
  return source;
});
