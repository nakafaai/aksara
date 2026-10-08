import { describe, expect, it } from "@effect/vitest";
import { Schema } from "effect";
import { ReleaseIdSchema } from "#contracts/ids";
import { canonicalizeContentReleaseItem } from "#contracts/release/canonical";
import {
  ContentChangeSchema,
  ContentReleaseItemSchema,
} from "#contracts/release/spec";

describe("release canonicalization", () => {
  it("serializes authenticated item fields in stable wire order", () => {
    const change = Schema.decodeSync(ContentChangeSchema)({
      artifactHash: `sha256:${"b".repeat(64)}`,
      artifactLocale: "en",
      contentKey: "test:content",
      delivery: "public",
      family: "material",
      operation: "upsert",
      rendererDomain: "mathematics",
      sourcePath: "packages/corpus/test/content/en.mdx",
    });
    const item = ContentReleaseItemSchema.make({
      change,
      index: 0,
      releaseId: ReleaseIdSchema.make("test-release"),
    });

    expect(canonicalizeContentReleaseItem(item)).toBe(
      `{"change":{"artifactHash":"sha256:${"b".repeat(64)}","artifactLocale":"en","contentKey":"test:content","delivery":"public","family":"material","operation":"upsert","rendererDomain":"mathematics","sourcePath":"packages/corpus/test/content/en.mdx"},"index":0,"releaseId":"test-release"}`
    );
  });

  it("pins the canonical bytes of a delete item with a nonzero index", () => {
    const change = Schema.decodeSync(ContentChangeSchema)({
      artifactLocale: "id",
      contentKey: "test:content",
      family: "material",
      operation: "delete",
    });
    const item = ContentReleaseItemSchema.make({
      change,
      index: 3,
      releaseId: ReleaseIdSchema.make("test-release"),
    });

    expect(canonicalizeContentReleaseItem(item)).toBe(
      '{"change":{"artifactLocale":"id","contentKey":"test:content","family":"material","operation":"delete"},"index":3,"releaseId":"test-release"}'
    );
  });
});
