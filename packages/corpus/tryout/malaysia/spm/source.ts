import { Effect } from "effect";

import { malaysiaTryoutCountry } from "#corpus/tryout/malaysia/country";
import { spmPhysicsReadiness } from "#corpus/tryout/malaysia/spm/readiness/physics";
import { spmPhysicsTrack } from "#corpus/tryout/malaysia/spm/tracks/physics";
import { validateAssessmentSourceReadiness } from "#corpus/tryout/readiness/validation";
import { defineExamSource } from "#corpus/tryout/schema";

/**
 * SPM, the Sijil Pelajaran Malaysia, sat at the end of Form 5. Its tracks are
 * the objective papers of its subjects, grouped by that grade.
 */
const spmTryoutCatalog = defineExamSource({
  ...malaysiaTryoutCountry,
  examKey: "spm",
  examName: "SPM",
  examOrder: 1,
  examRouteSlugs: { de: "spm", en: "spm", id: "spm", ms: "spm" },
  examTranslations: {
    de: {
      description: "Probetests für das malaysische Sijil Pelajaran Malaysia.",
    },
    en: {
      description: "Try-outs for the Malaysian Sijil Pelajaran Malaysia.",
    },
    id: {
      description: "Try out Sijil Pelajaran Malaysia.",
    },
    ms: {
      description: "Ujian percubaan Sijil Pelajaran Malaysia.",
    },
  },
  grouping: {
    axis: "grade",
    groups: [
      {
        key: "form-5",
        order: 1,
        routeSlugs: {
          de: "form-5",
          en: "form-5",
          id: "tingkatan-5",
          ms: "tingkatan-5",
        },
        translations: {
          de: { title: "Form 5" },
          en: { title: "Form 5" },
          id: { title: "Tingkatan 5" },
          ms: { title: "Tingkatan 5" },
        },
      },
    ],
  },
  sourceRevision: "2026-11-15",
  tracks: [spmPhysicsTrack],
});

/** Validates the SPM catalog against its official readiness. */
export const spmTryoutSource = Effect.gen(function* () {
  const [source, ...readinessEntries] = yield* Effect.all([
    spmTryoutCatalog,
    spmPhysicsReadiness,
  ]);
  for (const readiness of readinessEntries) {
    yield* validateAssessmentSourceReadiness(source, readiness);
  }
  return source;
});
