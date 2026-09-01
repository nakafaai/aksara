import { beforeEach, expect, layer } from "@effect/vitest";
import { CorpusSourcePathSchema } from "@nakafa/aksara-contracts/ids";
import {
  type PageHead,
  PageHeadSchema,
} from "@nakafa/aksara-contracts/release/head";
import { PublicationScopeSchema } from "@nakafa/aksara-contracts/release/snapshot/scope";
import { Effect, Schema } from "effect";
import {
  collectPagePublication,
  collectPageResult,
  PublishedPageTestFixtures,
  publishedPageTestLayer,
} from "#test/page/publication";
import {
  PageTestFixtures,
  pageFamilyScope,
  pageFixtureIdentities,
  pageManifest,
} from "#test/page/spec";

const compilerState = vi.hoisted(() => ({ calls: 0 }));
const registryState = vi.hoisted(() => ({ changedPath: false }));
const privacySourcePath = CorpusSourcePathSchema.make(
  "packages/corpus/pages/privacy-policy/en.mdx"
);
const securitySourcePath = CorpusSourcePathSchema.make(
  "packages/corpus/pages/security-policy/en.mdx"
);

vi.mock("@nakafa/aksara-compiler/compile", async (importOriginal) => {
  const original =
    await importOriginal<typeof import("@nakafa/aksara-compiler/compile")>();
  return {
    ...original,
    compileContent: (input: unknown) => {
      compilerState.calls += 1;
      return original.compileContent(input);
    },
  };
});

vi.mock("@nakafa/aksara-corpus/pages/registry", async (importOriginal) => {
  const original =
    await importOriginal<
      typeof import("@nakafa/aksara-corpus/pages/registry")
    >();
  return {
    ...original,
    decodePageRegistry: (
      ...args: Parameters<typeof original.decodePageRegistry>
    ) =>
      original.decodePageRegistry(...args).pipe(
        Effect.map((entries) =>
          entries.map((entry) =>
            registryState.changedPath &&
            entry.route.pageKey === "privacy-policy" &&
            entry.route.artifactLocale === "en"
              ? {
                  ...entry,
                  route: { ...entry.route, publicPath: "privacy-notice" },
                }
              : entry
          )
        )
      ),
  };
});

const fingerprintCases = [
  ["compiler config", { compilerConfigHash: `sha256:${"1".repeat(64)}` }],
  ["delivery", { delivery: "authenticated" }],
  ["public path", { publicPath: "privacy-notice" }],
  ["projection", { projectionHash: `sha256:${"2".repeat(64)}` }],
  ["source", { sourceHash: `sha256:${"3".repeat(64)}` }],
] as const;

/** Decodes a modified published head without bypassing the wire contract. */
const modifyHead = Effect.fn("PagePlanTest.modifyHead")((input: unknown) =>
  Schema.decodeUnknownEffect(PageHeadSchema)(input, {
    onExcessProperty: "error",
  })
);

/** Replaces one canonical head while preserving the complete sorted catalog. */
function replaceHead(
  publishedHeads: readonly PageHead[],
  replacement: PageHead
) {
  return publishedHeads.map((head) =>
    head.contentKey === replacement.contentKey &&
    head.artifactLocale === replacement.artifactLocale
      ? replacement
      : head
  );
}

/** Returns a mutable source map with one reviewed page body changed. */
const changedSources = Effect.fn("PagePlanTest.changedSources")(
  (
    fixture: PageTestFixtures["Service"],
    sourcePath: typeof privacySourcePath
  ) =>
    Effect.gen(function* () {
      const sources = new Map(fixture.sources);
      const absolutePath = yield* Effect.fromNullishOr(
        fixture.absolutePaths.get(sourcePath)
      );
      const source = yield* Effect.fromNullishOr(sources.get(absolutePath));
      sources.set(absolutePath, `${source}\n`);
      return sources;
    })
);

/** Combines scoped source fixtures with their canonical published heads. */
const planFixture = Effect.fn("PagePlanTest.fixture")(function* () {
  return {
    ...(yield* PageTestFixtures),
    ...(yield* PublishedPageTestFixtures),
  };
});

beforeEach(() => {
  compilerState.calls = 0;
  registryState.changedPath = false;
});

layer(publishedPageTestLayer)("page plan", (it) => {
  it.effect.each([false, true])(
    "selects explicit rebuild=%s for matching heads",
    (rebuild) =>
      Effect.gen(function* () {
        const { publishedHeads } = yield* PublishedPageTestFixtures;
        expect(
          yield* collectPagePublication({
            heads: publishedHeads,
            rebuild,
            scope: pageFamilyScope,
          })
        ).toHaveLength(rebuild ? 15 : 0);
        expect(compilerState.calls).toBe(rebuild ? 15 : 0);
      })
  );

  it.effect("compiles only the real page whose source changed", () =>
    Effect.gen(function* () {
      const fixture = yield* planFixture();
      const sources = yield* changedSources(fixture, privacySourcePath);
      const records = yield* collectPagePublication({
        heads: fixture.publishedHeads,
        sources,
      });
      expect(records).toHaveLength(1);
      expect(records[0]?.record.change).toMatchObject({
        artifactLocale: "en",
        operation: "upsert",
      });
      expect(compilerState.calls).toBe(1);
    })
  );

  it.effect("compiles only the page whose registry projection changed", () =>
    Effect.gen(function* () {
      const { publishedHeads } = yield* PublishedPageTestFixtures;
      registryState.changedPath = true;
      const records = yield* collectPagePublication({ heads: publishedHeads });
      expect(records).toHaveLength(1);
      expect(records[0]).toMatchObject({
        record: {
          change: { artifactLocale: "en", operation: "upsert" },
          projection: { publicPath: "privacy-notice" },
        },
      });
      expect(compilerState.calls).toBe(1);
    })
  );

  it.effect.each(fingerprintCases)(
    "compiles only a head whose %s fingerprint changed",
    ([, changed]) =>
      Effect.gen(function* () {
        const fixture = yield* planFixture();
        const head = yield* modifyHead({ ...fixture.englishHead, ...changed });
        const records = yield* collectPagePublication({
          heads: replaceHead(fixture.publishedHeads, head),
        });
        expect(records).toHaveLength(1);
        expect(compilerState.calls).toBe(1);
      })
  );

  it.effect("recompiles every page whose renderer contract changes", () =>
    Effect.gen(function* () {
      const { publishedHeads } = yield* PublishedPageTestFixtures;
      const renderer = yield* pageManifest(2);
      const records = yield* collectPagePublication({
        heads: publishedHeads,
        renderer,
      });
      expect(records).toHaveLength(15);
      expect(compilerState.calls).toBe(15);
    })
  );

  it.effect("emits one tombstone without compiling an absent source", () =>
    Effect.gen(function* () {
      const fixture = yield* planFixture();
      const stale = yield* modifyHead({
        ...fixture.englishHead,
        contentKey: "pages/zz-removed-page",
        publicPath: "zz-removed-page",
        sourcePath: "packages/corpus/pages/zz-removed-page/en.mdx",
      });
      const records = yield* collectPagePublication({
        heads: [...fixture.publishedHeads, stale],
      });
      expect(records).toContainEqual({
        prior: { head: stale, state: "page" },
        record: {
          change: {
            artifactLocale: "en",
            contentKey: stale.contentKey,
            family: "page",
            operation: "delete",
          },
        },
      });
      expect(compilerState.calls).toBe(0);
    })
  );

  it.effect("compiles every canonical source for the first release", () =>
    Effect.gen(function* () {
      const records = yield* collectPagePublication({ heads: [] });
      expect(records).toHaveLength(15);
      expect(
        records.every(({ record }) => record.change.operation === "upsert")
      ).toBe(true);
      expect(compilerState.calls).toBe(15);
    })
  );

  it.effect("compiles the complete selected family for scoped genesis", () =>
    Effect.gen(function* () {
      const records = yield* collectPagePublication({
        heads: [],
        scope: pageFamilyScope,
      });
      expect(
        records.map(({ record }) => [
          record.change.contentKey,
          record.change.artifactLocale,
        ])
      ).toEqual(pageFixtureIdentities);
      expect(compilerState.calls).toBe(15);
    })
  );

  it.effect(
    "preserves base heads and ignores changes in an unselected family",
    () =>
      Effect.gen(function* () {
        const fixture = yield* planFixture();
        const sources = yield* changedSources(fixture, securitySourcePath);
        const scope = PublicationScopeSchema.make({
          families: ["article"],
          snapshots: [],
        });
        const input = { heads: fixture.publishedHeads, scope, sources };
        const records = yield* collectPagePublication(input);
        const result = yield* collectPageResult(input);
        expect(records).toEqual([]);
        expect(result).toEqual(fixture.publishedHeads);
        expect(compilerState.calls).toBe(0);
      })
  );

  it.effect("tombstones only one scoped missing source", () =>
    Effect.gen(function* () {
      const fixture = yield* planFixture();
      const stale = yield* modifyHead({
        ...fixture.englishHead,
        contentKey: "pages/zz-removed-page",
        publicPath: "zz-removed-page",
        sourcePath: "packages/corpus/pages/zz-removed-page/en.mdx",
      });
      const heads = [...fixture.publishedHeads, stale];
      const input = { heads, scope: pageFamilyScope };
      const records = yield* collectPagePublication(input);
      const result = yield* collectPageResult(input);
      expect(records).toHaveLength(1);
      expect(records[0]?.record.change).toEqual({
        artifactLocale: "en",
        contentKey: stale.contentKey,
        family: "page",
        operation: "delete",
      });
      expect(result).toEqual(fixture.publishedHeads);
      expect(compilerState.calls).toBe(0);
    })
  );
});
