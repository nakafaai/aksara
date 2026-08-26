import { describe, expect, it } from "@effect/vitest";
import { Effect, Schema } from "effect";
import {
  ArtifactCacheTagSchema,
  CONTENT_CACHE_GLOBAL_TAG,
  ContentCacheChangeSchema,
  ContentCacheReceiptSchema,
  ContentCacheRequestSchema,
  ContentCacheTagsSchema,
  ContentFamilyCacheTagSchema,
  makeArtifactCacheTag,
  makeContentCacheRequest,
  makeContentFamilyCacheTag,
} from "#contracts/cache/content";
import { ContentFamilySchema } from "#contracts/content";
import { ReleaseIdSchema, Sha256HashSchema } from "#contracts/ids";

const decodeRequest = Schema.decodeUnknownEffect(ContentCacheRequestSchema);
const decodeReceipt = Schema.decodeUnknownEffect(ContentCacheReceiptSchema);

/** Returns whether one unknown value satisfies an exact cache contract. */
function accepts(
  decode: (input: unknown) => Effect.Effect<unknown, unknown>,
  input: unknown
) {
  return Effect.isSuccess(decode(input));
}

describe("content cache contracts", () => {
  it("distinguishes body changes from family-only deletion invalidation", () => {
    const artifactHash = Sha256HashSchema.make(`sha256:${"d".repeat(64)}`);

    expect(
      Schema.decodeSync(ContentCacheChangeSchema)({
        artifactHash,
        family: "article",
      })
    ).toEqual({ artifactHash, family: "article" });
    expect(
      Schema.decodeSync(ContentCacheChangeSchema)({
        family: "material",
      })
    ).toEqual({ family: "material" });
  });

  it.effect.each(ContentFamilySchema.literals)(
    "derives canonical ordered %s tags for changed artifacts",
    (family) =>
      Effect.gen(function* () {
        const releaseId = ReleaseIdSchema.make("test-cache-release");
        const first = Sha256HashSchema.make(`sha256:${"a".repeat(64)}`);
        const second = Sha256HashSchema.make(`sha256:${"b".repeat(64)}`);
        const request = makeContentCacheRequest({
          artifactHashes: [first, second],
          family,
          releaseId,
        });

        expect(yield* accepts(decodeRequest, request)).toBe(true);
        expect(
          yield* accepts(decodeReceipt, { ...request, revalidated: true })
        ).toBe(true);
        expect(request.tags).toEqual([
          CONTENT_CACHE_GLOBAL_TAG,
          makeContentFamilyCacheTag(family),
          makeArtifactCacheTag(first),
          makeArtifactCacheTag(second),
        ]);
      })
  );

  it.effect.each([
    {
      family: "material",
      releaseId: "INVALID",
      tags: [CONTENT_CACHE_GLOBAL_TAG, "content-family:material"],
    },
    {
      family: "material",
      releaseId: "test-cache-release",
      tags: [CONTENT_CACHE_GLOBAL_TAG],
    },
    {
      family: "article",
      releaseId: "test-cache-release",
      tags: [CONTENT_CACHE_GLOBAL_TAG, "content-family:material"],
    },
    {
      family: "material",
      releaseId: "test-cache-release",
      tags: [
        CONTENT_CACHE_GLOBAL_TAG,
        "content-family:material",
        "content-artifact:unknown",
      ],
    },
  ])("rejects a noncanonical request", (request) =>
    Effect.gen(function* () {
      expect(yield* accepts(decodeRequest, request)).toBe(false);
    })
  );

  it.effect.each([
    {
      family: "material",
      releaseId: "test-cache-release",
      revalidated: false,
      tags: [CONTENT_CACHE_GLOBAL_TAG, "content-family:material"],
    },
    {
      family: "material",
      releaseId: "test-cache-release",
      revalidated: true,
      tags: [CONTENT_CACHE_GLOBAL_TAG, "content-family:article"],
    },
  ])("rejects a noncanonical receipt", (receipt) =>
    Effect.gen(function* () {
      expect(yield* accepts(decodeReceipt, receipt)).toBe(false);
    })
  );

  it("rejects malformed family and artifact tags", () => {
    expect(() =>
      Schema.decodeSync(ContentFamilyCacheTagSchema)("content-family:unknown")
    ).toThrow("Expected one canonical content-family cache tag.");
    expect(() =>
      Schema.decodeSync(ArtifactCacheTagSchema)(
        "content-artifact:sha256:invalid"
      )
    ).toThrow(
      "Expected content-artifact followed by one canonical SHA-256 hash."
    );
  });

  it("rejects duplicate artifacts and more than 100 ordered tags", () => {
    const validTag = makeArtifactCacheTag(
      Sha256HashSchema.make(`sha256:${"c".repeat(64)}`)
    );
    const base = [
      CONTENT_CACHE_GLOBAL_TAG,
      makeContentFamilyCacheTag("material"),
    ] as const;

    expect(() =>
      Schema.decodeSync(ContentCacheTagsSchema)([...base, validTag, validTag])
    ).toThrow("Expected unique exact artifact cache tags.");
    expect(
      Schema.is(ContentCacheTagsSchema)([
        ...base,
        ...Array.from({ length: 99 }, (_, index) =>
          makeArtifactCacheTag(
            Sha256HashSchema.make(
              `sha256:${index.toString(16).padStart(64, "0")}`
            )
          )
        ),
      ])
    ).toBe(false);
  });

  it("reports explicit family contradictions for requests and receipts", () => {
    const mismatched = {
      family: "article",
      releaseId: "test-cache-release",
      tags: [CONTENT_CACHE_GLOBAL_TAG, "content-family:material"],
    };

    expect(() =>
      Schema.decodeUnknownSync(ContentCacheRequestSchema)(mismatched)
    ).toThrow("Expected the cache family to match its ordered family tag.");
    expect(() =>
      Schema.decodeUnknownSync(ContentCacheReceiptSchema)({
        ...mismatched,
        revalidated: true,
      })
    ).toThrow("Expected the cache family to match its ordered family tag.");
  });
});
