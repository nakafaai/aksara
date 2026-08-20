import { describe, expect, it } from "@nakafa/testing/effect";
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
  it.each(fixtures)(
    "classifies $expected asset-only identities",
    async (fixture) => {
      const [, appLocale] = fixture.identity.assetId.split(":");

      await expect(
        Effect.runPromise(
          classifyLearningGraphAssetId(fixture.identity.assetId)
        )
      ).resolves.toEqual({
        appLocale,
        family: fixture.expected,
      });
    }
  );

  it.each([
    "concept:en:quran:quran-surah:1",
    "asset:fr:quran:quran-surah:1",
    "asset:en:quran",
    "asset:en:school:course:1",
  ])("rejects an unsupported asset-only identity: %s", async (assetId) => {
    const error = await Effect.runPromise(
      classifyLearningGraphAssetId(assetId).pipe(Effect.flip)
    );

    expect(error).toBeInstanceOf(LearningGraphAssetFamilyError);
  });

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

  it.each(fixtures)("classifies $expected identities", async (fixture) => {
    const identity = Schema.decodeSync(LearningGraphIdentitySchema)(
      fixture.identity
    );

    await expect(
      Effect.runPromise(classifyLearningGraphIdentity(identity))
    ).resolves.toBe(fixture.expected);
  });

  it.each([
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
  ])("rejects an incoherent or unsupported identity", async (input) => {
    const identity = Schema.decodeSync(LearningGraphIdentitySchema)(input);
    const error = await Effect.runPromise(
      classifyLearningGraphIdentity(identity).pipe(Effect.flip)
    );

    expect(error).toBeInstanceOf(LearningGraphFamilyError);
  });

  it("derives its public family type from the runtime schema", () => {
    expect(LearningGraphFamilySchema.literals).toEqual([
      "article",
      "material",
      "quran",
      "tryout",
    ]);
  });
});
