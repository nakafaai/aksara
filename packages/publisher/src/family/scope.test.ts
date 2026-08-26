import type { ContentHeadIdentity } from "@nakafa/aksara-contracts/content";
import { ContentKeySchema } from "@nakafa/aksara-contracts/ids";
import { ArtifactLocaleSchema } from "@nakafa/aksara-contracts/locale";
import {
  type MaterialHead,
  MaterialHeadSchema,
} from "@nakafa/aksara-contracts/release/head";
import { PublicationScopeSchema } from "@nakafa/aksara-contracts/release/snapshot/spec";
import { describe, expect, it } from "@nakafa/testing/effect";
import { Effect, Schema, Stream } from "effect";
import { diffScopedFamilyHeads } from "#publisher/family/scope";

const entry = {
  artifactLocale: ArtifactLocaleSchema.make("en"),
  contentKey: ContentKeySchema.make("test:family"),
} satisfies ContentHeadIdentity;

/** Selects the stable artifactLocale identity carried directly by one test entry. */
function identity(value: ContentHeadIdentity) {
  return value;
}

describe("scoped family diff", () => {
  it("selects a whole family without expanding every content identity", async () => {
    const scope = PublicationScopeSchema.make({
      families: ["material"],
      snapshots: [],
    });
    const rows = await Effect.runPromise(
      diffScopedFamilyHeads<ContentHeadIdentity, MaterialHead, never, never>({
        entries: [entry],
        family: "material",
        identity,
        published: Stream.empty,
        scope,
      }).pipe(Stream.runCollect)
    );

    expect([...rows]).toEqual([{ entry, kind: "current", scoped: true }]);
  });

  it("preserves published heads and ignores new entries for an unselected family", async () => {
    const scope = PublicationScopeSchema.make({
      families: ["article"],
      snapshots: [],
    });
    const newEntry = {
      artifactLocale: ArtifactLocaleSchema.make("en"),
      contentKey: ContentKeySchema.make("test:new"),
    } satisfies ContentHeadIdentity;
    const published = Schema.decodeSync(MaterialHeadSchema)({
      artifactHash: `sha256:${"a".repeat(64)}`,
      artifactLocale: "en",
      compilerConfigHash: `sha256:${"b".repeat(64)}`,
      contentKey: "test:published",
      delivery: "public",
      family: "material",
      projectionHash: `sha256:${"c".repeat(64)}`,
      rendererDomain: "mathematics",
      sourceHash: `sha256:${"d".repeat(64)}`,
      sourcePath: "packages/corpus/test/published/en.mdx",
    });
    const rows = await Effect.runPromise(
      diffScopedFamilyHeads<ContentHeadIdentity, MaterialHead, never, never>({
        entries: [newEntry],
        family: "material",
        identity,
        published: Stream.make(published),
        scope,
      }).pipe(Stream.runCollect)
    );

    expect([...rows]).toEqual([
      { head: published, kind: "published", scoped: false },
    ]);
  });
});
