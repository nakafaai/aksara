import { resolve } from "node:path";
import { PageHeadSchema } from "@nakafa/aksara-contracts/release/head";
import { PublicationScopeSchema } from "@nakafa/aksara-contracts/release/snapshot/spec";
import { beforeEach, describe, expect, it } from "@nakafa/testing/effect";
import { Effect, Schema } from "effect";
import { vi } from "vitest";
import {
  checkoutRoot,
  collectPagePublication,
  collectPageResult,
  pageManifest,
  privacyPageScope,
  publishedPageHeads,
  sourceByPath,
} from "#test/page";

const compilerState = vi.hoisted(() => ({ calls: 0 }));
const registryState = vi.hoisted(() => ({ changedPath: false }));

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
                  route: {
                    ...entry.route,
                    publicPath: "privacy-notice",
                  },
                }
              : entry
          )
        )
      ),
  };
});

const publishedHeads = await publishedPageHeads();
/** Requires one exact published page head for focused planning assertions. */
function requireEnglishHead() {
  const head = publishedHeads.find(
    ({ contentKey, artifactLocale }) =>
      contentKey === "pages/privacy-policy" && artifactLocale === "en"
  );
  if (head === undefined) {
    throw new Error("Expected the published English privacy page head.");
  }
  return head;
}
const englishHead = requireEnglishHead();
const fingerprintCases = [
  ["compiler config", { compilerConfigHash: `sha256:${"1".repeat(64)}` }],
  ["delivery", { delivery: "authenticated" }],
  ["public path", { publicPath: "privacy-notice" }],
  ["projection", { projectionHash: `sha256:${"2".repeat(64)}` }],
  ["source", { sourceHash: `sha256:${"3".repeat(64)}` }],
] as const;

/** Decodes a modified published head without bypassing the wire contract. */
function modifyHead(input: unknown) {
  return Schema.decodeUnknownSync(PageHeadSchema)(input, {
    onExcessProperty: "error",
  });
}

/** Replaces one canonical head while preserving the complete sorted catalog. */
function replaceHead(replacement: typeof englishHead) {
  return publishedHeads.map((head) =>
    head.contentKey === replacement.contentKey &&
    head.artifactLocale === replacement.artifactLocale
      ? replacement
      : head
  );
}

beforeEach(() => {
  compilerState.calls = 0;
  registryState.changedPath = false;
});

describe("page plan", () => {
  it("emits no records and performs no compilation for matching heads", async () => {
    const records = await collectPagePublication({ heads: publishedHeads });

    expect(records).toEqual([]);
    expect(compilerState.calls).toBe(0);
  });

  it("compiles only the real page whose source changed", async () => {
    const sources = new Map(sourceByPath);
    const path = resolve(
      checkoutRoot,
      "packages/corpus/pages/privacy-policy/en.mdx"
    );
    const source = sources.get(path);
    expect(source).toBeDefined();
    sources.set(path, `${source}\n`);

    const records = await collectPagePublication({
      heads: publishedHeads,
      sources,
    });

    expect(records).toHaveLength(1);
    expect(records[0]?.record.change).toMatchObject({
      artifactLocale: "en",
      operation: "upsert",
    });
    expect(compilerState.calls).toBe(1);
  });

  it("compiles only the page whose registry projection changed", async () => {
    registryState.changedPath = true;

    const records = await collectPagePublication({ heads: publishedHeads });

    expect(records).toHaveLength(1);
    expect(records[0]).toMatchObject({
      record: {
        change: { artifactLocale: "en", operation: "upsert" },
        projection: { publicPath: "privacy-notice" },
      },
    });
    expect(compilerState.calls).toBe(1);
  });

  it.each(fingerprintCases)(
    "compiles only a head whose %s fingerprint changed",
    async (_field, changed) => {
      const head = modifyHead({ ...englishHead, ...changed });
      const records = await collectPagePublication({
        heads: replaceHead(head),
      });

      expect(records).toHaveLength(1);
      expect(compilerState.calls).toBe(1);
    }
  );

  it("recompiles every page whose renderer contract changes", async () => {
    const renderer = await pageManifest(2);
    const records = await collectPagePublication({
      heads: publishedHeads,
      renderer,
    });

    expect(records).toHaveLength(12);
    expect(compilerState.calls).toBe(12);
  });

  it("emits one tombstone without compiling an absent source", async () => {
    const stale = modifyHead({
      ...englishHead,
      contentKey: "pages/zz-removed-page",
      publicPath: "zz-removed-page",
      sourcePath: "packages/corpus/pages/zz-removed-page/en.mdx",
    });
    const records = await collectPagePublication({
      heads: [...publishedHeads, stale],
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
  });

  it("compiles every canonical source for the first release", async () => {
    const records = await collectPagePublication({ heads: [] });

    expect(records).toHaveLength(12);
    expect(
      records.every(({ record }) => record.change.operation === "upsert")
    ).toBe(true);
    expect(compilerState.calls).toBe(12);
  });

  it("compiles only the scoped privacy page locales for scoped genesis", async () => {
    const records = await collectPagePublication({
      heads: [],
      scope: privacyPageScope,
    });

    expect(
      records.map(({ record }) => [
        record.change.contentKey,
        record.change.artifactLocale,
      ])
    ).toEqual([
      ["pages/privacy-policy", "de"],
      ["pages/privacy-policy", "en"],
      ["pages/privacy-policy", "id"],
    ]);
    expect(compilerState.calls).toBe(3);
  });

  it("preserves base heads and ignores source changes outside scope", async () => {
    const sources = new Map(sourceByPath);
    const path = resolve(
      checkoutRoot,
      "packages/corpus/pages/security-policy/en.mdx"
    );
    const source = sources.get(path);
    expect(source).toBeDefined();
    sources.set(path, `${source}\n`);

    const records = await collectPagePublication({
      heads: publishedHeads,
      scope: privacyPageScope,
      sources,
    });
    const result = await collectPageResult({
      heads: publishedHeads,
      scope: privacyPageScope,
      sources,
    });

    expect(records).toEqual([]);
    expect(result).toEqual(publishedHeads);
    expect(compilerState.calls).toBe(0);
  });

  it("tombstones only one scoped missing source", async () => {
    const stale = modifyHead({
      ...englishHead,
      contentKey: "pages/zz-removed-page",
      publicPath: "zz-removed-page",
      sourcePath: "packages/corpus/pages/zz-removed-page/en.mdx",
    });
    const scope = Schema.decodeSync(PublicationScopeSchema)({
      content: [
        {
          artifactLocale: stale.artifactLocale,
          contentKey: stale.contentKey,
          family: stale.family,
        },
      ],
      families: [],
      snapshots: [],
    });
    const heads = [...publishedHeads, stale];
    const records = await collectPagePublication({ heads, scope });
    const result = await collectPageResult({ heads, scope });

    expect(records).toHaveLength(1);
    expect(records[0]?.record.change).toEqual({
      artifactLocale: "en",
      contentKey: stale.contentKey,
      family: "page",
      operation: "delete",
    });
    expect(result).toEqual(publishedHeads);
    expect(compilerState.calls).toBe(0);
  });
});
