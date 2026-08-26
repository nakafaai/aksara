import { describe, expect, it } from "@effect/vitest";
import { Effect, Exit, Schema } from "effect";

import {
  classifyLearningGraphAssetId,
  classifyLearningGraphIdentity,
  LearningGraphAssetFamilyError,
  LearningGraphAssetIdSchema,
  LearningGraphFamilyError,
  LearningGraphFamilySchema,
} from "#contracts/graph/family";
import { LearningGraphIdentitySchema } from "#contracts/graph/spec";

const fixtures = [
  {
    expected: "article",
    identity: {
      alignmentId: "alignment:article:politics:article:politics:source",
      assetId: "asset:de:article:politics:article:politics:source",
      conceptId: "concept:article:politics",
      learningObjectId: "lo:article:politics:source",
      lensId: "lens:article:politics",
    },
  },
  {
    expected: "material",
    identity: {
      alignmentId:
        "alignment:material:lesson:math:material-section:math:algebra:intro",
      assetId:
        "asset:id:material:lesson:math:material-section:math:algebra:intro",
      conceptId: "concept:material:lesson:math:algebra",
      learningObjectId: "lo:material-section:math:algebra:intro",
      lensId: "lens:material:lesson:math",
    },
  },
  {
    expected: "quran",
    identity: {
      alignmentId: "alignment:quran:quran-surah:1",
      assetId: "asset:en:quran:quran-surah:1",
      conceptId: "concept:quran:surah:1",
      learningObjectId: "lo:quran-surah:1",
      lensId: "lens:quran",
    },
  },
  {
    expected: "tryout",
    identity: {
      alignmentId:
        "alignment:tryout:indonesia:catalog:tryout-country:indonesia",
      assetId: "asset:en:tryout:indonesia:catalog:tryout-country:indonesia",
      conceptId: "concept:tryout:indonesia",
      learningObjectId: "lo:tryout-country:indonesia",
      lensId: "lens:tryout:indonesia:catalog",
    },
  },
  {
    expected: "tryout",
    identity: {
      alignmentId: "alignment:tryout:root",
      assetId: "asset:en:tryout:root",
      conceptId: "concept:tryout:root",
      learningObjectId: "lo:tryout",
      lensId: "lens:tryout:root",
    },
  },
  {
    expected: "tryout",
    identity: {
      alignmentId: "alignment:tryout:root",
      assetId: "asset:en:tryout:root",
      conceptId: "concept:tryout:root",
      learningObjectId: "lo:tryout:root",
      lensId: "lens:tryout:root",
    },
  },
] as const;

describe("classifyLearningGraphIdentity", () => {
  it.effect.each(fixtures)(
    "classifies $expected asset-only identities",
    (fixture) =>
      Effect.gen(function* () {
        const [, appLocale] = fixture.identity.assetId.split(":");

        expect(
          yield* classifyLearningGraphAssetId(fixture.identity.assetId)
        ).toEqual({
          appLocale,
          family: fixture.expected,
        });
      })
  );

  it.effect.each([
    "concept:en:quran:quran-surah:1",
    "asset:fr:quran:quran-surah:1",
    "asset:en:quran",
    "asset:en:school:course:1",
  ])("rejects an unsupported asset-only identity: %s", (assetId) =>
    Effect.gen(function* () {
      const error = yield* classifyLearningGraphAssetId(assetId).pipe(
        Effect.flip
      );

      expect(error).toBeInstanceOf(LearningGraphAssetFamilyError);
    })
  );

  it("owns the exact schema for asset-only dispatch identities", () => {
    const accepted = Schema.decodeExit(LearningGraphAssetIdSchema)(
      "asset:de:article:politics:source"
    );
    const rejected = [
      Schema.decodeExit(LearningGraphAssetIdSchema)("asset:de:article"),
      Schema.decodeExit(LearningGraphAssetIdSchema)("asset:de:school:course:1"),
    ];

    expect(Exit.isSuccess(accepted)).toBe(true);
    for (const result of rejected) {
      expect(Exit.isFailure(result) ? String(result.cause) : "").toContain(
        "asset:<appLocale>:<family>:<identity>"
      );
    }
  });

  it.effect.each(fixtures)("classifies $expected identities", (fixture) =>
    Effect.gen(function* () {
      const identity = yield* Schema.decodeEffect(LearningGraphIdentitySchema)(
        fixture.identity
      );

      expect(yield* classifyLearningGraphIdentity(identity)).toBe(
        fixture.expected
      );
    })
  );

  it.effect.each([
    {
      alignmentId: "alignment:material:quran-surah:1",
      assetId: "asset:en:quran:quran-surah:1",
      conceptId: "concept:quran:surah:1",
      learningObjectId: "lo:quran-surah:1",
      lensId: "lens:quran",
    },
    {
      alignmentId: "alignment:quran:quran-surah:1",
      assetId: "asset:fr:quran:quran-surah:1",
      conceptId: "concept:quran:surah:1",
      learningObjectId: "lo:quran-surah:1",
      lensId: "lens:quran",
    },
    {
      alignmentId: "alignment:school:course:1",
      assetId: "asset:en:school:course:1",
      conceptId: "concept:school:course:1",
      learningObjectId: "lo:school-course:1",
      lensId: "lens:school",
    },
  ])("rejects an incoherent or unsupported identity", (input) =>
    Effect.gen(function* () {
      const identity = yield* Schema.decodeEffect(LearningGraphIdentitySchema)(
        input
      );
      const error = yield* classifyLearningGraphIdentity(identity).pipe(
        Effect.flip
      );

      expect(error).toBeInstanceOf(LearningGraphFamilyError);
    })
  );

  it("derives its public family type from the runtime schema", () => {
    expect(LearningGraphFamilySchema.literals).toEqual([
      "article",
      "material",
      "quran",
      "tryout",
    ]);
  });
});
