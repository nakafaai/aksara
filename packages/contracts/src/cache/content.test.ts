import { describe, expect, it } from "@effect/vitest";
import { Effect, Schema } from "effect";
import {
  ArtifactCacheTagSchema,
  ContentCacheChangeSchema,
  ContentCacheReceiptSchema,
  ContentCacheRequestSchema,
  ContentCacheScopeSchema,
  makeArtifactCacheTag,
  makeContentCacheTag,
} from "#contracts/cache/content";
import { ContentFamilySchema } from "#contracts/content";
import { ReleaseIdSchema, Sha256HashSchema } from "#contracts/ids";
import { ContentSnapshotKindSchema } from "#contracts/release/snapshot/scope";

const releaseId = ReleaseIdSchema.make("test-cache-release");
const decodeRequest = Schema.decodeUnknownEffect(ContentCacheRequestSchema, {
  onExcessProperty: "error",
});
const decodeReceipt = Schema.decodeUnknownEffect(ContentCacheReceiptSchema, {
  onExcessProperty: "error",
});

describe("content cache contracts", () => {
  it("derives mutable scopes from every source-owned family and snapshot", () => {
    expect(ContentCacheScopeSchema.literals).toEqual([
      ...ContentFamilySchema.literals,
      ...ContentSnapshotKindSchema.literals,
    ]);
  });

  it.effect.each(ContentCacheScopeSchema.literals)(
    "acknowledges exactly one release-bound %s dependency",
    (scope) =>
      Effect.gen(function* () {
        const request = ContentCacheRequestSchema.make({ releaseId, scope });
        expect(yield* decodeRequest(request)).toEqual(request);
        expect(yield* decodeReceipt({ ...request, revalidated: true })).toEqual(
          { ...request, revalidated: true }
        );
        expect(ContentCacheChangeSchema.make({ scope })).toEqual({ scope });
        expect(makeContentCacheTag(scope)).toBe(`content-scope:${scope}`);
      })
  );

  it.effect.each([
    { releaseId: "INVALID", scope: "material" },
    { releaseId, scope: "unknown" },
    { releaseId, scope: "content-runtime" },
    { releaseId, scope: "content-artifact:sha256:invalid" },
    { releaseId, scope: "material", tags: ["content-runtime"] },
    { family: "material", releaseId, tags: ["content-runtime"] },
  ])("rejects an invalid or predecessor invalidation request", (request) =>
    Effect.gen(function* () {
      expect(yield* Effect.isFailure(decodeRequest(request))).toBe(true);
    })
  );

  it.effect.each([
    { releaseId, revalidated: false, scope: "material" },
    { releaseId, revalidated: true, scope: "unknown" },
    { releaseId, revalidated: true, scope: "material", tags: [] },
  ])("rejects an invalid receipt", (receipt) =>
    Effect.gen(function* () {
      expect(yield* Effect.isFailure(decodeReceipt(receipt))).toBe(true);
    })
  );

  it("keeps immutable artifact tags outside the publication wire contract", () => {
    const hash = Sha256HashSchema.make(`sha256:${"a".repeat(64)}`);
    expect(makeArtifactCacheTag(hash)).toBe(`content-artifact:${hash}`);
    expect(Schema.is(ArtifactCacheTagSchema)("content-artifact:invalid")).toBe(
      false
    );
    expect(Schema.is(ArtifactCacheTagSchema)("content-scope:material")).toBe(
      false
    );
    expect(Schema.is(ContentCacheScopeSchema)(makeArtifactCacheTag(hash))).toBe(
      false
    );
  });
});
