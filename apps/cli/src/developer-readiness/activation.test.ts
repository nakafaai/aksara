import {
  ContentKeySchema,
  CorpusSourcePathSchema,
  ReleaseIdSchema,
  Sha256HashSchema,
} from "@nakafa/aksara-contracts/ids";
import { ArtifactLocaleSchema } from "@nakafa/aksara-contracts/locale";
import { ContentReleaseItemSchema } from "@nakafa/aksara-contracts/release";
import { describe, expect, it } from "@nakafa/testing/effect";
import { Effect, Stream } from "effect";
import { activatesDeveloperPage } from "#cli/developer-readiness/activation";

const TEST_HASH = Sha256HashSchema.make(`sha256:${"a".repeat(64)}`);
const TEST_RELEASE_ID = ReleaseIdSchema.make("rollback-readiness-test");

/** Creates one canonical page upsert for rollback-readiness tests. */
function pageUpsert(contentKey: "pages/developers" | "pages/imprint") {
  return ContentReleaseItemSchema.make({
    change: {
      artifactHash: TEST_HASH,
      artifactLocale: ArtifactLocaleSchema.make("en"),
      contentKey: ContentKeySchema.make(contentKey),
      delivery: "public",
      family: "page",
      operation: "upsert",
      rendererDomain: "site",
      sourcePath: CorpusSourcePathSchema.make(
        `packages/corpus/${contentKey}/en.mdx`
      ),
    },
    index: 0,
    releaseId: TEST_RELEASE_ID,
  });
}

describe("developer page activation", () => {
  it.effect("detects an authenticated developer-page upsert", () =>
    Effect.gen(function* () {
      const items = Stream.fromIterable([
        pageUpsert("pages/imprint"),
        pageUpsert("pages/developers"),
      ]);

      expect(yield* activatesDeveloperPage(items)).toBe(true);
      expect(
        yield* items.pipe(Stream.runCollect, Effect.map(Array.from))
      ).toHaveLength(2);
    })
  );

  it.effect("ignores deletion and unrelated page transitions", () =>
    Effect.gen(function* () {
      const developerDelete = ContentReleaseItemSchema.make({
        change: {
          artifactLocale: ArtifactLocaleSchema.make("en"),
          contentKey: ContentKeySchema.make("pages/developers"),
          family: "page",
          operation: "delete",
        },
        index: 0,
        releaseId: TEST_RELEASE_ID,
      });
      const items = Stream.fromIterable([
        developerDelete,
        pageUpsert("pages/imprint"),
      ]);

      expect(yield* activatesDeveloperPage(items)).toBe(false);
    })
  );
});
