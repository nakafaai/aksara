import { Effect } from "effect";

import { germanyTryoutCountry } from "#corpus/tryout/germany/country";
import { tuDarmstadtEntranceReadiness } from "#corpus/tryout/germany/entrance/readiness/darmstadt";
import { tuDarmstadtEntranceTrack } from "#corpus/tryout/germany/entrance/tracks/darmstadt";
import { validateAssessmentSourceReadiness } from "#corpus/tryout/readiness/validation";
import { defineExamSource } from "#corpus/tryout/schema";

/**
 * The entrance examinations of the Studienkollegs, one institution track
 * each. Every Kolleg names its own procedure (Aufnahmeprüfung,
 * Aufnahmetest, Aufnahmeverfahren), so a track's profile carries that name.
 */
const entranceTryoutCatalog = defineExamSource({
  ...germanyTryoutCountry,
  examKey: "entrance-examination",
  examOrder: 1,
  examRouteSlugs: {
    de: "aufnahmepruefung",
    en: "entrance-examination",
    id: "ujian-masuk",
  },
  examTranslations: {
    de: {
      description: "Probetests für die Aufnahmeprüfungen der Studienkollegs.",
      title: "Aufnahmeprüfung",
    },
    en: {
      description: "Try-outs for the entrance examinations of Studienkollegs.",
      title: "Entrance Examination",
    },
    id: {
      description: "Try out ujian masuk Studienkolleg di Jerman.",
      title: "Ujian Masuk",
    },
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
