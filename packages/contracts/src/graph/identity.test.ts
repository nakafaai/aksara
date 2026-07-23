import { Effect } from "effect";
import { describe, expect, it } from "vitest";

import {
  LearningGraphIdentityError,
  makeLearningGraphIdentity,
} from "#contracts/graph/identity";

describe("learning graph identity", () => {
  it("preserves Nakafa's existing deterministic article identities", async () => {
    await expect(
      Effect.runPromise(
        makeLearningGraphIdentity({
          concept: ["article", "politics"],
          learningObject: ["article", "politics", "policy"],
          lens: ["article", "politics"],
          locale: "en",
        })
      )
    ).resolves.toEqual({
      alignmentId: "alignment:article:politics:article:politics:policy",
      assetId: "asset:en:article:politics:article:politics:policy",
      conceptId: "concept:article:politics",
      learningObjectId: "lo:article:politics:policy",
      lensId: "lens:article:politics",
    });
  });

  it("returns a typed failure for unsafe source segments", async () => {
    const error = await Effect.runPromise(
      makeLearningGraphIdentity({
        concept: ["article", "invalid:value"],
        learningObject: ["article", "invalid:value"],
        lens: ["article"],
        locale: "id",
      }).pipe(Effect.flip)
    );

    expect(error).toBeInstanceOf(LearningGraphIdentityError);
  });
});
