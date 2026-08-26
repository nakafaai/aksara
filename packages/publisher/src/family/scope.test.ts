import { describe, expect, it } from "@effect/vitest";
import type { ContentHeadIdentity } from "@nakafa/aksara-contracts/content";
import { ContentKeySchema } from "@nakafa/aksara-contracts/ids";
import { ArtifactLocaleSchema } from "@nakafa/aksara-contracts/locale";
import type { MaterialHead } from "@nakafa/aksara-contracts/release/head";
import { PublicationScopeSchema } from "@nakafa/aksara-contracts/release/snapshot/spec";
import { Effect, Stream } from "effect";
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
  it.effect(
    "selects a whole family without expanding every content identity",
    () =>
      Effect.gen(function* () {
        const scope = PublicationScopeSchema.make({
          content: [],
          families: ["material"],
          snapshots: [],
        });
        const rows = yield* diffScopedFamilyHeads<
          ContentHeadIdentity,
          MaterialHead,
          never,
          never
        >({
          entries: [entry],
          family: "material",
          identity,
          published: Stream.empty,
          scope,
        }).pipe(Stream.runCollect);

        expect([...rows]).toEqual([{ entry, kind: "current", scoped: true }]);
      })
  );

  it.effect("rejects an unknown exact canary identity", () =>
    Effect.gen(function* () {
      const scope = PublicationScopeSchema.make({
        content: [{ ...entry, family: "material" }],
        families: [],
        snapshots: [],
      });
      const error = yield* diffScopedFamilyHeads<
        ContentHeadIdentity,
        MaterialHead,
        never,
        never
      >({
        entries: [],
        family: "material",
        identity,
        published: Stream.empty,
        scope,
      }).pipe(Stream.runDrain, Effect.flip);

      expect(error).toMatchObject({
        _tag: "PublicationScopeIdentityError",
        ...entry,
        family: "material",
      });
    })
  );
});
