import { Effect, Either, Schema } from "effect";
import { describe, expect, it } from "vitest";

import {
  canonicalizeEditorialReview,
  EditorialReviewManifestError,
  EditorialReviewRecordListSchema,
  HUMANIZER_WORKFLOW_VERSION,
  hashEditorialReviews,
  makeEditorialReviewManifest,
  verifyEditorialReviewManifest,
} from "#contracts/editorial/review";
import { GitCommitShaSchema } from "#contracts/ids";

const sourceHash = `sha256:${"a".repeat(64)}` as const;
const targetHash = `sha256:${"b".repeat(64)}` as const;
const revision = GitCommitShaSchema.make("c".repeat(40));

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
      makeEditorialReviewManifest({ records: [germanReview], revision })
    );
    expect(manifest.format).toBe("editorial-review-v1");
    expect(manifest.records).toEqual([germanReview]);
    expect(manifest.revision).toBe(revision);
    expect(manifest.digest).toBe(
      await Effect.runPromise(
        hashEditorialReviews({ records: [germanReview], revision })
      )
    );
    await expect(
      Effect.runPromise(verifyEditorialReviewManifest(manifest))
    ).resolves.toEqual(manifest);
  });

  it("rejects duplicate targets and duplicate source paths", async () => {
    const duplicateTargets = makeEditorialReviewManifest({
      records: [germanReview, germanReview],
      revision,
    }).pipe(Effect.flip);
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
      makeEditorialReviewManifest({
        records: [
          preservedReview,
          Schema.decodeUnknownSync(EditorialReviewRecordListSchema)([
            { ...preservedReview, appLocale: "en" },
          ])[0],
        ],
        revision,
      })
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
      makeEditorialReviewManifest({
        records: [germanReview, earlier],
        revision,
      })
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
      hashEditorialReviews({ records: [brokenReview], revision }).pipe(
        Effect.flip
      )
    );
    const manifest = await Effect.runPromise(
      makeEditorialReviewManifest({ records: [germanReview], revision })
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
      makeEditorialReviewManifest({ records: [germanReview], revision })
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

  it("binds the exact reviewed Git revision into the digest", async () => {
    const manifest = await Effect.runPromise(
      makeEditorialReviewManifest({ records: [germanReview], revision })
    );
    const changedRevision = GitCommitShaSchema.make("d".repeat(40));
    const error = await Effect.runPromise(
      verifyEditorialReviewManifest({
        ...manifest,
        revision: changedRevision,
      }).pipe(Effect.flip)
    );

    expect(error).toMatchObject({
      _tag: "EditorialReviewDigestMismatchError",
      expectedDigest: manifest.digest,
    });
  });
});
