import { Effect } from "effect";

import { indonesiaTryoutCountry } from "#corpus/tryout/indonesia/country";
import { TKA_EXAM_KEY } from "#corpus/tryout/indonesia/tka/identity";
import { tkaEnglishReadiness } from "#corpus/tryout/indonesia/tka/readiness/english";
import { tkaIndonesianReadiness } from "#corpus/tryout/indonesia/tka/readiness/indonesian";
import { tkaMathematicsReadiness } from "#corpus/tryout/indonesia/tka/readiness/mathematics";
import { tkaEnglishTrack } from "#corpus/tryout/indonesia/tka/tracks/english";
import { tkaIndonesianTrack } from "#corpus/tryout/indonesia/tka/tracks/indonesian";
import { tkaMathematicsTrack } from "#corpus/tryout/indonesia/tka/tracks/mathematics";
import { validateAssessmentSourceReadiness } from "#corpus/tryout/readiness/validation";
import { defineTryoutExamSource } from "#corpus/tryout/schema";

/** Lazily validates the source-controlled TKA catalog and placements. */
const tkaTryoutCatalog = defineTryoutExamSource({
  ...indonesiaTryoutCountry,
  examKey: TKA_EXAM_KEY,
  examOrder: 2,
  examRouteSlugs: { de: "tka", en: "tka", id: "tka" },
  examTranslations: {
    de: {
      description:
        "Probetest für den indonesischen akademischen Kompetenztest.",
      title: "TKA",
    },
    en: {
      description: "Indonesian academic competency try-outs.",
      title: "TKA",
    },
    id: {
      description: "Try out Tes Kemampuan Akademik Indonesia.",
      title: "TKA",
    },
  },
  scoringStrategy: "raw",
  sourceRevision: "2026-08-31",
  tracks: [tkaMathematicsTrack, tkaIndonesianTrack, tkaEnglishTrack],
});

/** Validates the active TKA catalog against official and editorial readiness. */
export const tkaTryoutSource = Effect.gen(function* () {
  const [source, ...readinessEntries] = yield* Effect.all([
    tkaTryoutCatalog,
    tkaMathematicsReadiness,
    tkaIndonesianReadiness,
    tkaEnglishReadiness,
  ]);
  for (const readiness of readinessEntries) {
    yield* validateAssessmentSourceReadiness(source, readiness);
  }
  return source;
});
