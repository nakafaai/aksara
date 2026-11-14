import { Effect } from "effect";

import { indonesiaTryoutCountry } from "#corpus/tryout/indonesia/country";
import { tkaAdvancedMathematicsReadiness } from "#corpus/tryout/indonesia/tka/readiness/advanced";
import { tkaCompulsoryMathematicsReadiness } from "#corpus/tryout/indonesia/tka/readiness/compulsory";
import { tkaEnglishReadiness } from "#corpus/tryout/indonesia/tka/readiness/english";
import { tkaIndonesianReadiness } from "#corpus/tryout/indonesia/tka/readiness/indonesian";
import { tkaAdvancedMathematicsTrack } from "#corpus/tryout/indonesia/tka/tracks/advanced";
import { tkaCompulsoryMathematicsTrack } from "#corpus/tryout/indonesia/tka/tracks/compulsory";
import { tkaEnglishTrack } from "#corpus/tryout/indonesia/tka/tracks/english";
import { tkaIndonesianTrack } from "#corpus/tryout/indonesia/tka/tracks/indonesian";
import { validateAssessmentSourceReadiness } from "#corpus/tryout/readiness/validation";
import { defineExamSource } from "#corpus/tryout/schema";

/**
 * TKA, grouped by the school grade each test is set for. It has no year.
 * Today it is the high school grade (SMA, MA, SMK); Pusmendik also sets TKA
 * for SMP and SD, which join as their own groups.
 */
const tkaTryoutCatalog = defineExamSource({
  ...indonesiaTryoutCountry,
  examKey: "tka",
  examName: "TKA",
  examOrder: 2,
  examRouteSlugs: { de: "tka", en: "tka", id: "tka", ms: "tka" },
  examTranslations: {
    de: {
      description:
        "Probetest für den indonesischen akademischen Kompetenztest.",
    },
    en: {
      description: "Indonesian academic competency try-outs.",
    },
    id: {
      description: "Try out Tes Kemampuan Akademik Indonesia.",
    },
    ms: {
      description: "Ujian percubaan kecekapan akademik Indonesia.",
    },
  },
  grouping: {
    axis: "grade",
    groups: [
      {
        key: "senior-high-school",
        order: 1,
        routeSlugs: {
          de: "oberstufe",
          en: "senior-high-school",
          id: "sma-ma-smk",
          ms: "sekolah-menengah-atas",
        },
        translations: {
          de: { title: "Oberstufe" },
          en: { title: "Senior High School" },
          id: { title: "SMA/MA/SMK" },
          ms: { title: "Sekolah Menengah Atas" },
        },
      },
    ],
  },
  sourceRevision: "2026-09-27",
  tracks: [
    tkaCompulsoryMathematicsTrack,
    tkaIndonesianTrack,
    tkaEnglishTrack,
    tkaAdvancedMathematicsTrack,
  ],
});

/** Validates the active TKA catalog against official and editorial readiness. */
export const tkaTryoutSource = Effect.gen(function* () {
  const [source, ...readinessEntries] = yield* Effect.all([
    tkaTryoutCatalog,
    tkaCompulsoryMathematicsReadiness,
    tkaIndonesianReadiness,
    tkaEnglishReadiness,
    tkaAdvancedMathematicsReadiness,
  ]);
  for (const readiness of readinessEntries) {
    yield* validateAssessmentSourceReadiness(source, readiness);
  }
  return source;
});
