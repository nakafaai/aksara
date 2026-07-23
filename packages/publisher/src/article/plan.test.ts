import { resolve } from "node:path";
import { ArticleHeadSchema } from "@nakafa/aksara-contracts/release/head";
import { Effect, Schema } from "effect";
import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  articleEntries,
  checkoutRoot,
  collectArticlePublication,
  publishedArticleHeads,
  sourceByPath,
} from "#test/article";

const compilerState = vi.hoisted(() => ({ calls: 0 }));

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

const publishedHeads = await publishedArticleHeads();
const englishEntry = await Effect.runPromise(
  Effect.gen(function* () {
    const entry = articleEntries.find(
      ({ route }) =>
        route.contentKey ===
          "articles/politics/dynastic-politics-asian-values" &&
        route.locale === "en"
    );
    if (entry === undefined) {
      return yield* Effect.dieMessage("Expected the real English article.");
    }
    return entry;
  })
);
const englishHead = await Effect.runPromise(
  Effect.gen(function* () {
    const head = publishedHeads.find(
      ({ contentKey, locale }) =>
        contentKey === englishEntry.route.contentKey && locale === "en"
    );
    if (head === undefined) {
      return yield* Effect.dieMessage(
        "Expected the published English article."
      );
    }
    return head;
  })
);
const fingerprintCases = [
  ["compiler config", { compilerConfigHash: `sha256:${"1".repeat(64)}` }],
  ["delivery", { delivery: "authenticated" }],
  ["projection", { projectionHash: `sha256:${"2".repeat(64)}` }],
  ["source", { sourceHash: `sha256:${"3".repeat(64)}` }],
] as const;

/** Decodes a modified article head without bypassing the wire contract. */
function modifyHead(input: unknown) {
  return Schema.decodeUnknownSync(ArticleHeadSchema)(input, {
    onExcessProperty: "error",
  });
}

/** Replaces one canonical head while preserving complete catalog order. */
function replaceHead(replacement: typeof englishHead) {
  return publishedHeads.map((head) =>
    head.contentKey === replacement.contentKey &&
    head.locale === replacement.locale
      ? replacement
      : head
  );
}

beforeEach(() => {
  compilerState.calls = 0;
});

describe("article plan", () => {
  it("emits no records and performs no compilation for matching heads", async () => {
    const records = await collectArticlePublication({ heads: publishedHeads });

    expect(records).toEqual([]);
    expect(compilerState.calls).toBe(0);
  });

  it("compiles only the real article whose source changed", async () => {
    const sources = new Map(sourceByPath);
    const absolutePath = resolve(checkoutRoot, englishEntry.sourcePath);
    const english = sources.get(absolutePath);
    expect(english).toBeDefined();
    sources.set(absolutePath, `${english}\n`);

    const records = await collectArticlePublication({
      heads: publishedHeads,
      sources,
    });

    expect(records).toHaveLength(1);
    expect(records[0]?.record.change).toMatchObject({
      locale: "en",
      operation: "upsert",
    });
    expect(compilerState.calls).toBe(1);
  });

  it.each(fingerprintCases)(
    "compiles only a head whose %s fingerprint changed",
    async (_field, changed) => {
      const head = modifyHead({ ...englishHead, ...changed });
      const records = await collectArticlePublication({
        heads: replaceHead(head),
      });

      expect(records).toHaveLength(1);
      expect(compilerState.calls).toBe(1);
    }
  );

  it("emits one tombstone without compiling an absent source", async () => {
    const stale = modifyHead({
      ...englishHead,
      contentKey: "articles/politics/zz-removed-article",
      publicPath: "articles/politics/zz-removed-article",
      sourcePath: "packages/corpus/articles/politics/zz-removed/article/en.mdx",
    });
    const records = await collectArticlePublication({
      heads: [...publishedHeads, stale],
    });

    expect(records).toContainEqual({
      prior: { head: stale, state: "article" },
      record: {
        change: {
          contentKey: stale.contentKey,
          family: "article",
          locale: "en",
          operation: "delete",
        },
      },
    });
    expect(compilerState.calls).toBe(0);
  });

  it("compiles every canonical source for the first release", async () => {
    const records = await collectArticlePublication({ heads: [] });

    expect(records).toHaveLength(14);
    expect(
      records.every(({ record }) => record.change.operation === "upsert")
    ).toBe(true);
    expect(compilerState.calls).toBe(14);
  });
});
