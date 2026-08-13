import {
  EditorialReviewRecordSchema,
  EditorialReviewRequirementSchema,
  makeEditorialReviewManifest,
} from "@nakafa/aksara-contracts/editorial/review";
import { Sha256HashSchema } from "@nakafa/aksara-contracts/ids";
import { ACTIVE_APP_LOCALES } from "@nakafa/aksara-contracts/locale";
import { Effect, Schema, Stream } from "effect";
import { describe, expect, it } from "vitest";

import {
  EditorialReviewCoverageError,
  EditorialReviewCoverageExcessError,
  verifyCompleteEditorialReviewCoverage,
} from "#publisher/editorial/coverage";
import {
  editorialChoicesPath,
  editorialCoverageHeads,
  makeEditorialHead,
  makeEditorialRecord,
  rejectEditorialCoverage,
  verifyEditorialCoverage,
} from "#test/editorial";

const otherHash = Sha256HashSchema.make(`sha256:${"b".repeat(64)}`);
const { answer, englishPrompt, indonesianPrompt, material, ordinaryPrompt } =
  editorialCoverageHeads;

describe("editorial review coverage", () => {
  it("covers authored bodies and ordinary localized prompts", async () => {
    await expect(
      verifyEditorialCoverage({
        heads: [material, answer, ordinaryPrompt],
        records: [
          makeEditorialRecord(material),
          makeEditorialRecord(answer),
          makeEditorialRecord(ordinaryPrompt, {
            sourcePaths: [
              editorialChoicesPath(ordinaryPrompt),
              ordinaryPrompt.sourcePath,
            ],
          }),
        ],
      })
    ).resolves.toBeUndefined();
  });

  it("covers one assessed prompt across every active app locale", async () => {
    const englishSources = [
      englishPrompt.sourcePath.replace("question.en.mdx", "answer.en.mdx"),
      editorialChoicesPath(englishPrompt),
      englishPrompt.sourcePath,
    ];
    await expect(
      verifyEditorialCoverage({
        heads: [englishPrompt, indonesianPrompt],
        records: [
          makeEditorialRecord(englishPrompt, {
            appLocale: "en",
            deliveryLanguage: "en",
            reviewMode: "assessed-language-preserved",
            sourcePaths: englishSources,
          }),
          makeEditorialRecord(englishPrompt, {
            appLocale: "id",
            deliveryLanguage: "en",
            reviewMode: "assessed-language-preserved",
            sourcePaths: englishSources,
          }),
          makeEditorialRecord(indonesianPrompt, {
            appLocale: "en",
            deliveryLanguage: "id",
            reviewMode: "assessed-language-preserved",
            sourcePaths: [editorialChoicesPath(indonesianPrompt)],
          }),
          makeEditorialRecord(indonesianPrompt, {
            appLocale: "id",
            deliveryLanguage: "id",
            reviewMode: "assessed-language-preserved",
            sourcePaths: [editorialChoicesPath(indonesianPrompt)],
          }),
        ],
      })
    ).resolves.toBeUndefined();
  });

  it("rejects missing, stale, and contradictory review bindings", async () => {
    const unrelated = makeEditorialHead({
      artifactLocale: "id",
      family: "material",
      sourcePath: "packages/corpus/material/test/unrelated/id.mdx",
    });
    const missing = await rejectEditorialCoverage({
      records: [
        makeEditorialRecord(material, {
          appLocale: "en",
          deliveryLanguage: "de",
          reviewMode: "assessed-language-preserved",
        }),
        makeEditorialRecord(material, {
          appLocale: "id",
          deliveryLanguage: "id",
          reviewMode: "assessed-language-preserved",
        }),
        makeEditorialRecord(unrelated),
      ],
      target: material,
    });
    const stale = await rejectEditorialCoverage({
      records: [makeEditorialRecord(material, { targetHash: otherHash })],
      target: material,
    });
    const mode = await rejectEditorialCoverage({
      records: [
        makeEditorialRecord(material, {
          reviewMode: "immutable-official-source",
        }),
      ],
      target: material,
    });

    expect(missing).toMatchObject({ field: "record" });
    expect(stale).toMatchObject({ field: "targetHash" });
    expect(mode).toMatchObject({ field: "reviewMode" });
    expect(missing).toBeInstanceOf(EditorialReviewCoverageError);
  });

  it("rejects an assessed prompt without its exact choice source", async () => {
    const error = await rejectEditorialCoverage({
      records: [
        makeEditorialRecord(englishPrompt, {
          appLocale: "en",
          deliveryLanguage: "en",
          reviewMode: "assessed-language-preserved",
        }),
        makeEditorialRecord(englishPrompt, {
          appLocale: "id",
          deliveryLanguage: "en",
          reviewMode: "assessed-language-preserved",
        }),
      ],
      target: englishPrompt,
    });

    expect(error).toMatchObject({ field: "sourcePath" });
  });

  it("rejects authenticated review records outside the current catalog", async () => {
    const unrelated = makeEditorialHead({
      artifactLocale: "id",
      family: "material",
      sourcePath: "packages/corpus/material/test/unrelated/id.mdx",
    });
    const manifest = await Effect.runPromise(
      makeEditorialReviewManifest([
        makeEditorialRecord(material),
        makeEditorialRecord(unrelated),
      ])
    );
    const error = await Effect.runPromise(
      verifyCompleteEditorialReviewCoverage({
        activeAppLocales: ACTIVE_APP_LOCALES,
        heads: Stream.make(material),
        manifest,
        requirements: Stream.empty,
      }).pipe(Effect.flip)
    );

    expect(error).toBeInstanceOf(EditorialReviewCoverageExcessError);
    expect(error).toMatchObject({ targetPath: unrelated.sourcePath });
  });

  it("covers a structured source without duplicating its Git hash", async () => {
    const manifest = await Effect.runPromise(
      makeEditorialReviewManifest([makeEditorialRecord(material)])
    );
    const requirement = Schema.decodeUnknownSync(
      EditorialReviewRequirementSchema
    )({
      appLocale: "en",
      deliveryLanguage: "en",
      expectedTargetHash: null,
      requiredSourcePaths: [material.sourcePath],
      reviewMode: "authored-humanizer-review",
      targetPath: material.sourcePath,
    });

    await expect(
      Effect.runPromise(
        verifyCompleteEditorialReviewCoverage({
          activeAppLocales: ACTIVE_APP_LOCALES,
          heads: Stream.empty,
          manifest,
          requirements: Stream.make(requirement),
        })
      )
    ).resolves.toBeUndefined();
  });

  it("rejects a structured source with incomplete source bindings", async () => {
    const manifest = await Effect.runPromise(
      makeEditorialReviewManifest([makeEditorialRecord(material)])
    );
    const requirement = Schema.decodeUnknownSync(
      EditorialReviewRequirementSchema
    )({
      appLocale: "en",
      deliveryLanguage: "en",
      expectedTargetHash: null,
      requiredSourcePaths: [
        "packages/corpus/material/test/editorial/source.ts",
      ],
      reviewMode: "authored-humanizer-review",
      targetPath: material.sourcePath,
    });
    const error = await Effect.runPromise(
      verifyCompleteEditorialReviewCoverage({
        activeAppLocales: ACTIVE_APP_LOCALES,
        heads: Stream.empty,
        manifest,
        requirements: Stream.make(requirement),
      }).pipe(Effect.flip)
    );

    expect(error).toMatchObject({ field: "sourcePath" });
  });

  it("preserves an upstream head-stream failure", async () => {
    const manifest = await Effect.runPromise(
      makeEditorialReviewManifest([makeEditorialRecord(material)])
    );
    const error = await Effect.runPromise(
      verifyCompleteEditorialReviewCoverage({
        activeAppLocales: ACTIVE_APP_LOCALES,
        heads: Stream.fail("head-stream-failure"),
        manifest,
        requirements: Stream.empty,
      }).pipe(Effect.flip)
    );

    expect(error).toBe("head-stream-failure");
  });

  it("accepts a schema-decoded canonical manifest fixture", async () => {
    const canonical = Schema.decodeUnknownSync(
      Schema.Array(EditorialReviewRecordSchema)
    )([makeEditorialRecord(material)]);

    await expect(
      verifyEditorialCoverage({ heads: [material], records: canonical })
    ).resolves.toBeUndefined();
  });
});
