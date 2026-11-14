import { Effect } from "effect";

import { germanyTryoutCountry } from "#corpus/tryout/germany/country";
import { tuDarmstadtEntranceReadiness } from "#corpus/tryout/germany/entrance/readiness/darmstadt";
import { tuDarmstadtEntranceTrack } from "#corpus/tryout/germany/entrance/tracks/darmstadt";
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
        },
        translations: {
          de: { title: "Studienkolleg der TU Darmstadt" },
          en: { title: "TU Darmstadt Studienkolleg" },
          id: { title: "Studienkolleg TU Darmstadt" },
        },
      },
    ],
  },
  sourceRevision: "2026-11-08",
  tracks: [tuDarmstadtEntranceTrack],
});

/** Validates the Studienkolleg entrance catalog against official readiness. */
export const entranceTryoutSource = Effect.gen(function* () {
  const [source, readiness] = yield* Effect.all([
    entranceTryoutCatalog,
    tuDarmstadtEntranceReadiness,
  ]);
  return yield* validateAssessmentSourceReadiness(source, readiness);
});
