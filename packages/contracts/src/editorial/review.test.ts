import { Effect, Either, Schema } from "effect";
import { describe, expect, it } from "vitest";

import {
  canonicalizeEditorialReview,
  EditorialReviewManifestError,
  EditorialReviewRecordListSchema,
  EditorialReviewRequirementSchema,
  HUMANIZER_WORKFLOW_VERSION,
  hashEditorialReviews,
  makeEditorialReviewManifest,
  verifyEditorialReviewManifest,
} from "#contracts/editorial/review";

const sourceHash = `sha256:${"a".repeat(64)}` as const;
const targetHash = `sha256:${"b".repeat(64)}` as const;

const [germanReview] = Schema.decodeUnknownSync(
  EditorialReviewRecordListSchema
)([
  {
    appLocale: "de",
    deliveryLanguage: "de",
    reviewMode: "authored-humanizer-review",
    sources: [
      {
        sourceHash,
        sourcePath: "packages/corpus/material/example/en.mdx",
      },
    ],
    targetHash,
    targetPath: "packages/corpus/material/example/de.mdx",
    workflowVersion: HUMANIZER_WORKFLOW_VERSION,
  },
]);

describe("editorial review", () => {
  it("canonicalizes every review-owned field", () => {
    expect(canonicalizeEditorialReview(germanReview)).toBe(
      `{"appLocale":"de","deliveryLanguage":"de","reviewMode":"authored-humanizer-review","sources":[{"sourceHash":"${sourceHash}","sourcePath":"packages/corpus/material/example/en.mdx"}],"targetHash":"${targetHash}","targetPath":"packages/corpus/material/example/de.mdx","workflowVersion":"2.9.1"}`
    );
  });

  it("builds a deterministic review manifest", async () => {
    const manifest = await Effect.runPromise(
      makeEditorialReviewManifest([germanReview])
    );
    expect(manifest.format).toBe("editorial-review");
    expect(manifest.records).toEqual([germanReview]);
    expect(manifest.digest).toBe(
      await Effect.runPromise(hashEditorialReviews([germanReview]))
    );
    await expect(
      Effect.runPromise(verifyEditorialReviewManifest(manifest))
    ).resolves.toEqual(manifest);
  });

  it("rejects duplicate targets and duplicate source paths", async () => {
    const duplicateTargets = makeEditorialReviewManifest([
      germanReview,
      germanReview,
    ]).pipe(Effect.flip);
    expect(await Effect.runPromise(duplicateTargets)).toBeInstanceOf(
      EditorialReviewManifestError
    );

    const duplicateSources = {
      ...germanReview,
      sources: [
        germanReview.sources[0],
        {
          ...germanReview.sources[0],
          sourceHash: `sha256:${"c".repeat(64)}`,
        },
      ],
    };
    const sourceError = Schema.decodeUnknownEither(
      EditorialReviewRecordListSchema
    )([duplicateSources]);
    const recordError = Schema.decodeUnknownEither(
      EditorialReviewRecordListSchema
    )([germanReview, germanReview]);
    expect(Either.isLeft(sourceError)).toBe(true);
    expect(String(sourceError)).toContain(
      "Editorial review sources must have unique paths in canonical order."
    );
    expect(Either.isLeft(recordError)).toBe(true);
    expect(String(recordError)).toContain(
      "Editorial review policy bindings must be unique and canonical."
    );
  });

  it("rejects authored review language drift", () => {
    const result = Schema.decodeUnknownEither(EditorialReviewRecordListSchema)([
      { ...germanReview, deliveryLanguage: "en" },
    ]);

    expect(Either.isLeft(result)).toBe(true);
    expect(String(result)).toContain(
      "Authored and immutable reviews must match app and delivery language."
    );
  });

  it("preserves assessed-language identity separately from app locale", () => {
    const [assessed] = Schema.decodeUnknownSync(
      EditorialReviewRecordListSchema
    )([
      {
        ...germanReview,
        deliveryLanguage: "en",
        reviewMode: "assessed-language-preserved",
      },
    ]);
    expect(assessed.appLocale).toBe("de");
    expect(assessed.deliveryLanguage).toBe("en");
  });

  it("decodes canonical structured-source requirements", () => {
    const requirement = Schema.decodeUnknownSync(
      EditorialReviewRequirementSchema
    )({
      appLocale: "de",
      deliveryLanguage: "de",
      expectedTargetHash: null,
      requiredSourcePaths: [
        "packages/corpus/quran/sources/quranenc/terms.html",
        "packages/corpus/quran/sources/tanzil/terms.html",
      ],
      reviewMode: "immutable-official-source",
      targetPath: "packages/corpus/quran/sources/quranenc/de.xml",
    });

    expect(requirement).toMatchObject({
      appLocale: "de",
      expectedTargetHash: null,
      reviewMode: "immutable-official-source",
    });
  });

  it("rejects noncanonical and language-drifted requirements", () => {
    const input = {
      appLocale: "de",
      deliveryLanguage: "de",
      expectedTargetHash: null,
      requiredSourcePaths: [
        "packages/corpus/quran/sources/tanzil/terms.html",
        "packages/corpus/quran/sources/quranenc/terms.html",
      ],
      reviewMode: "immutable-official-source",
      targetPath: "packages/corpus/quran/sources/tanzil/text.txt",
    };
    const sourceOrder = Schema.decodeUnknownEither(
      EditorialReviewRequirementSchema
    )(input);
    const language = Schema.decodeUnknownEither(
      EditorialReviewRequirementSchema
    )({ ...input, deliveryLanguage: "en", requiredSourcePaths: [] });

    expect(Either.isLeft(sourceOrder)).toBe(true);
    expect(String(sourceOrder)).toContain(
      "Required review source paths must be unique and canonical."
    );
    expect(Either.isLeft(language)).toBe(true);
    expect(String(language)).toContain(
      "Authored and immutable review requirements must match app and delivery language."
    );
  });

  it("allows one preserved target to serve distinct app locales", async () => {
    const [preservedReview] = Schema.decodeUnknownSync(
      EditorialReviewRecordListSchema
    )([
      {
        ...germanReview,
        deliveryLanguage: "en",
        reviewMode: "assessed-language-preserved",
      },
    ]);
    const manifest = await Effect.runPromise(
      makeEditorialReviewManifest([
        preservedReview,
        Schema.decodeUnknownSync(EditorialReviewRecordListSchema)([
          { ...preservedReview, appLocale: "en" },
        ])[0],
      ])
    );

    expect(manifest.records).toHaveLength(2);
  });

  it("orders distinct target paths before locale identity", async () => {
    const [earlier] = Schema.decodeUnknownSync(EditorialReviewRecordListSchema)(
      [
        {
          ...germanReview,
          targetPath: "packages/corpus/material/another/de.mdx",
        },
      ]
    );
    const manifest = await Effect.runPromise(
      makeEditorialReviewManifest([germanReview, earlier])
    );

    expect(manifest.records.map(({ targetPath }) => targetPath)).toEqual([
      earlier.targetPath,
      germanReview.targetPath,
    ]);
  });

  it("maps hashing and strict manifest decoding failures", async () => {
    const brokenReview = {
      ...germanReview,
      /** Injects one deterministic read failure into canonical hashing. */
      get appLocale(): never {
        throw new TypeError("injected editorial review failure");
      },
    };
    const hashError = await Effect.runPromise(
      hashEditorialReviews([brokenReview]).pipe(Effect.flip)
    );
    const manifest = await Effect.runPromise(
      makeEditorialReviewManifest([germanReview])
    );
    const decodeError = await Effect.runPromise(
      verifyEditorialReviewManifest({ ...manifest, unexpected: true }).pipe(
        Effect.flip
      )
    );

    expect(hashError).toMatchObject({ _tag: "EditorialReviewHashError" });
    expect(decodeError).toBeInstanceOf(EditorialReviewManifestError);
  });

  it("rejects a stale review manifest digest", async () => {
    const manifest = await Effect.runPromise(
      makeEditorialReviewManifest([germanReview])
    );
    const error = await Effect.runPromise(
      verifyEditorialReviewManifest({
        ...manifest,
        digest: sourceHash,
      }).pipe(Effect.flip)
    );

    expect(error).toMatchObject({
      _tag: "EditorialReviewDigestMismatchError",
      expectedDigest: sourceHash,
    });
  });
});
