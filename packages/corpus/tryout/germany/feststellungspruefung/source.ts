import { Effect } from "effect";

import { germanyTryoutCountry } from "#corpus/tryout/germany/country";
import { tuDarmstadtFspReadiness } from "#corpus/tryout/germany/feststellungspruefung/readiness/darmstadt";
import { tuDarmstadtFspTrack } from "#corpus/tryout/germany/feststellungspruefung/tracks/darmstadt";
import { validateAssessmentSourceReadiness } from "#corpus/tryout/readiness/validation";
import { defineExamSource } from "#corpus/tryout/schema";

/**
 * The Feststellungsprüfungen of the Studienkollegs, the final examination of
 * the course, grouped by Kolleg. Each track is one written subject paper of
 * one Kolleg, such as the mathematics paper of the T course.
 */
const feststellungspruefungTryoutCatalog = defineExamSource({
  ...germanyTryoutCountry,
  examKey: "feststellungspruefung",
  examName: "Feststellungsprüfung",
  examOrder: 2,
  examRouteSlugs: {
    de: "feststellungspruefung",
    en: "feststellungspruefung",
    id: "feststellungspruefung",
    ms: "feststellungspruefung",
  },
  examTranslations: {
    de: {
      description:
        "Probetests für die Feststellungsprüfungen der Studienkollegs.",
    },
    en: {
      description:
        "Try-outs for the Feststellungsprüfung of the Studienkollegs.",
    },
    id: {
      description: "Try out Feststellungsprüfung Studienkolleg di Jerman.",
    },
    ms: {
      description:
        "Ujian percubaan Feststellungsprüfung Studienkolleg di Jerman.",
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
    ],
  },
  sourceRevision: "2026-11-20",
  tracks: [tuDarmstadtFspTrack],
});

/** Validates the Studienkolleg Feststellungsprüfung catalog against official readiness. */
export const feststellungspruefungTryoutSource = Effect.gen(function* () {
  const [source, ...readinessEntries] = yield* Effect.all([
    feststellungspruefungTryoutCatalog,
    tuDarmstadtFspReadiness,
  ]);
  for (const readiness of readinessEntries) {
    yield* validateAssessmentSourceReadiness(source, readiness);
  }
  return source;
});
