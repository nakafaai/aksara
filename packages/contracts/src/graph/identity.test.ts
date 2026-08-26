import { describe, expect, it } from "@nakafa/testing/effect";
import { Effect } from "effect";

import {
  LearningGraphIdentityError,
  makeLearningGraphIdentity,
} from "#contracts/graph/identity";
import { AppLocaleSchema } from "#contracts/locale";

describe("learning graph identity", () => {
  it.effect(
    "preserves Nakafa's existing deterministic article identities",
    () =>
      Effect.gen(function* () {
        expect(
          yield* makeLearningGraphIdentity({
            appLocale: AppLocaleSchema.make("en"),
            concept: ["article", "politics"],
            learningObject: ["article", "politics", "policy"],
            lens: ["article", "politics"],
          })
        ).toEqual({
          alignmentId: "alignment:article:politics:article:politics:policy",
          assetId: "asset:en:article:politics:article:politics:policy",
          conceptId: "concept:article:politics",
          learningObjectId: "lo:article:politics:policy",
          lensId: "lens:article:politics",
        });
      })
  );

  it.effect("returns a typed failure for unsafe source segments", () =>
    Effect.gen(function* () {
      const error = yield* makeLearningGraphIdentity({
        appLocale: AppLocaleSchema.make("id"),
        concept: ["article", "invalid:value"],
        learningObject: ["article", "invalid:value"],
        lens: ["article"],
      }).pipe(Effect.flip);

      expect(error).toBeInstanceOf(LearningGraphIdentityError);
    })
  );
});
