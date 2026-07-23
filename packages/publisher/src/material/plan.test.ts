import { resolve } from "node:path";
import { MaterialHeadSchema } from "@nakafa/aksara-contracts/release/head";
import { Effect, Schema } from "effect";
import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  checkoutRoot,
  collectMaterialPublication,
  englishPath,
  materialManifest,
  publishedMaterialHeads,
  sourceByPath,
} from "#test/material";

const compilerState = vi.hoisted(() => ({ calls: 0 }));
const registryState = vi.hoisted(() => ({ changedOrder: false }));

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

vi.mock("@nakafa/aksara-corpus/material/registry", async (importOriginal) => {
  const original =
    await importOriginal<
      typeof import("@nakafa/aksara-corpus/material/registry")
    >();
  const { materialSlicePaths } = await import("#test/material-slice");
  const sourcePaths = new Set<string>(materialSlicePaths);
  return {
    ...original,
    decodeMaterialRegistry: (input?: unknown) =>
      original.decodeMaterialRegistry(input).pipe(
        Effect.map((entries) =>
          entries
            .filter(({ sourcePath }) => sourcePaths.has(sourcePath))
            .map((entry) =>
              registryState.changedOrder &&
              entry.rendererDomain === "mathematics" &&
              entry.route.locale === "en"
                ? {
                    ...entry,
                    route: { ...entry.route, order: entry.route.order + 1 },
                  }
                : entry
            )
        )
      ),
  };
});

const publishedHeads = await publishedMaterialHeads();
const functionContentKey =
  "material/lesson/mathematics/function-composition-inverse-function/function-concept";
const englishHead = await Effect.runPromise(
  Effect.gen(function* () {
    const head = publishedHeads.find(
      ({ contentKey, locale }) =>
        contentKey === functionContentKey && locale === "en"
    );
    if (head === undefined) {
      return yield* Effect.dieMessage(
        "Expected the real English function-concept head."
      );
    }
    return head;
  })
);
const fingerprintCases = [
  ["delivery", { delivery: "authenticated" }],
  ["public path", { publicPath: "subjects/mathematics/old-function-concept" }],
  ["renderer domain", { rendererDomain: "chemistry" }],
  [
    "source path",
    {
      sourcePath: englishHead.sourcePath.replace("/en.mdx", "/old/en.mdx"),
    },
  ],
] as const;

/** Decodes a modified published head without bypassing the wire contract. */
function modifyHead(input: unknown) {
  return Schema.decodeUnknownSync(MaterialHeadSchema)(input, {
    onExcessProperty: "error",
  });
}

/** Replaces one canonical head while preserving the complete sorted catalog. */
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
  registryState.changedOrder = false;
});

describe("material plan", () => {
  it("emits no records and performs no compilation for matching heads", async () => {
    const records = await collectMaterialPublication({ heads: publishedHeads });

    expect(records).toEqual([]);
    expect(compilerState.calls).toBe(0);
  });

  it("compiles only the real document whose source changed", async () => {
    const sources = new Map(sourceByPath);
    const absolutePath = resolve(checkoutRoot, englishPath);
    const english = sources.get(absolutePath);
    expect(english).toBeDefined();
    sources.set(absolutePath, `${english}\n`);

    const records = await collectMaterialPublication({
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

  it("compiles only the document whose registry projection changed", async () => {
    registryState.changedOrder = true;

    const records = await collectMaterialPublication({ heads: publishedHeads });

    expect(records).toHaveLength(1);
    expect(records[0]).toMatchObject({
      record: {
        change: { locale: "en", operation: "upsert" },
        projection: { order: 6 },
      },
    });
    expect(compilerState.calls).toBe(1);
  });

  it.each(fingerprintCases)(
    "compiles only a head whose %s fingerprint changed",
    async (_field, changed) => {
      const head = modifyHead({ ...englishHead, ...changed });
      const records = await collectMaterialPublication({
        heads: replaceHead(head),
      });

      expect(records).toHaveLength(1);
      expect(compilerState.calls).toBe(1);
    }
  );

  it("recompiles both documents whose renderer contract changes", async () => {
    const renderer = await materialManifest({ chemistry: 1, math: 2 });
    const records = await collectMaterialPublication({
      heads: publishedHeads,
      renderer,
    });

    expect(records).toHaveLength(2);
    expect(compilerState.calls).toBe(2);
  });

  it("emits one tombstone without compiling an absent source", async () => {
    const stale = modifyHead({
      ...englishHead,
      contentKey: "material/lesson/mathematics/removed/lesson",
      publicPath: "subjects/mathematics/removed/lesson",
      sourcePath:
        "packages/corpus/material/lesson/mathematics/removed/lesson/en.mdx",
    });
    const records = await collectMaterialPublication({
      heads: [...publishedHeads, stale],
    });

    expect(records).toContainEqual({
      prior: { head: stale, state: "material" },
      record: {
        change: {
          contentKey: stale.contentKey,
          family: "material",
          locale: "en",
          operation: "delete",
        },
      },
    });
    expect(compilerState.calls).toBe(0);
  });

  it("compiles every canonical source for the first release", async () => {
    const records = await collectMaterialPublication({ heads: [] });

    expect(records).toHaveLength(4);
    expect(
      records.every(({ record }) => record.change.operation === "upsert")
    ).toBe(true);
    expect(compilerState.calls).toBe(4);
  });
});
