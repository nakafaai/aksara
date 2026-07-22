import { resolve } from "node:path";
import { Path } from "@effect/platform";
import { MaterialHeadSchema } from "@nakafa/aksara-contracts/release/head";
import { Effect, Schema, Stream } from "effect";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { prepareMaterialPublication } from "#publisher/material/publication";
import { testFileLayer } from "#test/files";
import {
  checkoutRoot,
  collectMaterialPublication,
  englishPath,
  materialManifest,
  publishedMaterialHeads,
  rejectMaterialPublication,
  rendererManifest,
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
  return {
    ...original,
    decodeMaterialRegistry: (input?: unknown) =>
      original.decodeMaterialRegistry(input).pipe(
        Effect.map((entries) =>
          entries.map((entry) =>
            registryState.changedOrder && entry.route.locale === "en"
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
const [englishHead, indonesianHead] = await Effect.runPromise(
  Effect.gen(function* () {
    const english = publishedHeads.find(({ locale }) => locale === "en");
    const indonesian = publishedHeads.find(({ locale }) => locale === "id");
    if (!(english && indonesian)) {
      return yield* Effect.dieMessage("Expected both real material locales.");
    }
    return [english, indonesian] as const;
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
const { publicPath: _publicPath, ...withoutPublicPath } = englishHead;
const familyCases = [
  ["content key", { ...englishHead, contentKey: "article:test" }],
  ["public path", withoutPublicPath],
  [
    "source path",
    { ...englishHead, sourcePath: "packages/corpus/article/test/en.mdx" },
  ],
  [
    "locale",
    {
      ...englishHead,
      sourcePath: "packages/corpus/material/lesson/test/id.mdx",
    },
  ],
] as const;

/** Decodes a modified published head without bypassing the wire contract. */
function modifyHead(input: unknown) {
  return Schema.decodeUnknownSync(MaterialHeadSchema)(input, {
    onExcessProperty: "error",
  });
}

beforeEach(() => {
  compilerState.calls = 0;
  registryState.changedOrder = false;
});

describe("material publication", () => {
  it("emits no records and performs no compilation for fresh matching heads", async () => {
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

  it("compiles only the real document whose registry projection changed", async () => {
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
        heads: [head, indonesianHead],
      });

      expect(records).toHaveLength(1);
      expect(compilerState.calls).toBe(1);
    }
  );

  it("recompiles both documents when their selected renderer contract changes", async () => {
    const renderer = await materialManifest({ chemistry: 1, math: 2 });

    const records = await collectMaterialPublication({
      heads: publishedHeads,
      renderer,
    });

    expect(records).toHaveLength(2);
    expect(compilerState.calls).toBe(2);
  });

  it("emits a tombstone without compilation for a published head absent from registry", async () => {
    const stale = modifyHead({
      ...englishHead,
      contentKey: "material/lesson/mathematics/removed/lesson",
      publicPath: "subjects/mathematics/removed/lesson",
      sourcePath:
        "packages/corpus/material/lesson/mathematics/removed/lesson/en.mdx",
    });

    const records = await collectMaterialPublication({
      heads: [englishHead, indonesianHead, stale],
    });

    expect(records).toContainEqual({
      prior: { head: stale, state: "material" },
      record: {
        change: {
          contentKey: stale.contentKey,
          locale: "en",
          operation: "delete",
        },
      },
    });
    expect(compilerState.calls).toBe(0);
  });

  it("compiles every canonical source for the first release", async () => {
    const records = await collectMaterialPublication({ heads: [] });

    expect(records).toHaveLength(2);
    expect(
      records.every(({ record }) => record.change.operation === "upsert")
    ).toBe(true);
    expect(compilerState.calls).toBe(2);
  });

  it("rejects target heads for a genesis release without a signed base", async () => {
    const error = await Effect.runPromise(
      Effect.scoped(
        prepareMaterialPublication({
          baseCatalog: null,
          checkoutRoot,
          published: Stream.make(englishHead),
          rendererManifest,
        })
      ).pipe(
        Effect.provide(testFileLayer(sourceByPath)),
        Effect.provide(Path.layer),
        Effect.flip
      )
    );

    expect(error).toMatchObject({
      _tag: "MaterialGenesisCatalogError",
      actualCount: 1,
    });
  });

  it("rejects duplicate and noncanonical published heads as typed failures", async () => {
    await expect(
      rejectMaterialPublication([englishHead, englishHead])
    ).resolves.toMatchObject({
      _tag: "MaterialHeadDuplicateError",
    });
    await expect(
      rejectMaterialPublication([indonesianHead, englishHead])
    ).resolves.toMatchObject({ _tag: "MaterialHeadOrderError" });
  });

  it.each(familyCases)(
    "rejects a cross-family %s contradiction before compilation",
    async (_field, head) => {
      await expect(
        rejectMaterialPublication([modifyHead(head)])
      ).resolves.toMatchObject({
        _tag: "MaterialHeadFamilyError",
      });
      expect(compilerState.calls).toBe(0);
    }
  );
});
