import { resolve } from "node:path";
import { beforeEach, expect, layer } from "@effect/vitest";
import { PublicationScopeSchema } from "@nakafa/aksara-contracts/release/snapshot/scope";
import { Effect } from "effect";
import { vi } from "vitest";
import {
  MaterialPlanTestFixtures,
  materialPlanFingerprintCases,
  materialPlanTestLayer,
  modifyMaterialPlanHead,
  replaceMaterialPlanHead,
} from "#test/material/plan";
import {
  atomEnglishPath,
  checkoutRoot,
  collectMaterialPublication,
  collectMaterialResult,
  englishPath,
  functionContentKey,
  materialFamilyScope,
  materialManifest,
  sourceByPath,
} from "#test/material/spec";

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
  const { materialSlicePaths } = await import("#test/material/slice");
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
              entry.route.artifactLocale === "en"
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

beforeEach(() => {
  compilerState.calls = 0;
  registryState.changedOrder = false;
});

layer(materialPlanTestLayer)("material plan", (it) => {
  it.effect(
    "emits no records and performs no compilation for matching heads",
    () =>
      Effect.gen(function* () {
        const { publishedHeads } = yield* MaterialPlanTestFixtures;
        const records = yield* collectMaterialPublication({
          heads: publishedHeads,
        });

        expect(records).toEqual([]);
        expect(compilerState.calls).toBe(0);
      })
  );

  it.effect("compiles only the real document whose source changed", () =>
    Effect.gen(function* () {
      const { publishedHeads } = yield* MaterialPlanTestFixtures;
      const sources = new Map(sourceByPath);
      const absolutePath = resolve(checkoutRoot, englishPath);
      const english = yield* Effect.fromNullishOr(sources.get(absolutePath));
      sources.set(absolutePath, `${english}\n`);

      const records = yield* collectMaterialPublication({
        heads: publishedHeads,
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

  it.effect(
    "compiles only the document whose registry projection changed",
    () =>
      Effect.gen(function* () {
        const { publishedHeads } = yield* MaterialPlanTestFixtures;
        registryState.changedOrder = true;

        const records = yield* collectMaterialPublication({
          heads: publishedHeads,
        });

        expect(records).toHaveLength(1);
        expect(records[0]).toMatchObject({
          record: {
            change: { artifactLocale: "en", operation: "upsert" },
            projection: { order: 6 },
          },
        });
        expect(compilerState.calls).toBe(1);
      })
  );

  it.effect.each(materialPlanFingerprintCases)(
    "compiles only a head whose %s fingerprint changed",
    ([, change]) =>
      Effect.gen(function* () {
        const fixture = yield* MaterialPlanTestFixtures;
        const head = yield* modifyMaterialPlanHead(change(fixture.englishHead));
        const records = yield* collectMaterialPublication({
          heads: replaceMaterialPlanHead(fixture.publishedHeads, head),
        });

        expect(records).toHaveLength(1);
        expect(compilerState.calls).toBe(1);
      })
  );

  it.effect("recompiles both documents whose renderer contract changes", () =>
    Effect.gen(function* () {
      const { publishedHeads } = yield* MaterialPlanTestFixtures;
      const renderer = yield* materialManifest({ chemistry: 1, math: 2 });
      const records = yield* collectMaterialPublication({
        heads: publishedHeads,
        renderer,
      });

      expect(records).toHaveLength(2);
      expect(compilerState.calls).toBe(2);
    })
  );

  it.effect("emits one tombstone without compiling an absent source", () =>
    Effect.gen(function* () {
      const fixture = yield* MaterialPlanTestFixtures;
      const stale = yield* modifyMaterialPlanHead({
        ...fixture.englishHead,
        contentKey: "material/lesson/mathematics/removed/lesson",
        publicPath: "subjects/mathematics/removed/lesson",
        sourcePath:
          "packages/corpus/material/lesson/mathematics/removed/lesson/en.mdx",
      });
      const records = yield* collectMaterialPublication({
        heads: [...fixture.publishedHeads, stale],
      });

      expect(records).toContainEqual({
        prior: { head: stale, state: "material" },
        record: {
          change: {
            artifactLocale: "en",
            contentKey: stale.contentKey,
            family: "material",
            operation: "delete",
          },
        },
      });
      expect(compilerState.calls).toBe(0);
    })
  );

  it.effect("compiles every canonical source for the first release", () =>
    Effect.gen(function* () {
      const records = yield* collectMaterialPublication({ heads: [] });

      expect(records).toHaveLength(4);
      expect(
        records.every(({ record }) => record.change.operation === "upsert")
      ).toBe(true);
      expect(compilerState.calls).toBe(4);
    })
  );

  it.effect("compiles the complete selected family for scoped genesis", () =>
    Effect.gen(function* () {
      const records = yield* collectMaterialPublication({
        heads: [],
        scope: materialFamilyScope,
      });

      expect(
        records.map(({ record }) => [
          record.change.contentKey,
          record.change.artifactLocale,
        ])
      ).toEqual([
        ["material/lesson/chemistry/structure-matter/atom-shell", "en"],
        ["material/lesson/chemistry/structure-matter/atom-shell", "id"],
        [functionContentKey, "en"],
        [functionContentKey, "id"],
      ]);
      expect(compilerState.calls).toBe(4);
    })
  );

  it.effect(
    "preserves every base head and ignores changes in an unselected family",
    () =>
      Effect.gen(function* () {
        const { publishedHeads } = yield* MaterialPlanTestFixtures;
        const sources = new Map(sourceByPath);
        const absolutePath = resolve(checkoutRoot, atomEnglishPath);
        const source = yield* Effect.fromNullishOr(sources.get(absolutePath));
        sources.set(absolutePath, `${source}\n`);

        const scope = PublicationScopeSchema.make({
          families: ["page"],
          snapshots: [],
        });
        const records = yield* collectMaterialPublication({
          heads: publishedHeads,
          scope,
          sources,
        });
        const result = yield* collectMaterialResult({
          heads: publishedHeads,
          scope,
          sources,
        });

        expect(records).toEqual([]);
        expect(result).toEqual(publishedHeads);
        expect(compilerState.calls).toBe(0);
      })
  );

  it.effect(
    "tombstones only one scoped missing source and preserves other heads",
    () =>
      Effect.gen(function* () {
        const fixture = yield* MaterialPlanTestFixtures;
        const stale = yield* modifyMaterialPlanHead({
          ...fixture.englishHead,
          contentKey: "material/lesson/mathematics/removed/lesson",
          publicPath: "subjects/mathematics/removed/lesson",
          sourcePath:
            "packages/corpus/material/lesson/mathematics/removed/lesson/en.mdx",
        });
        const scope = PublicationScopeSchema.make({
          families: ["material"],
          snapshots: [],
        });
        const heads = [...fixture.publishedHeads, stale];
        const records = yield* collectMaterialPublication({ heads, scope });
        const result = yield* collectMaterialResult({ heads, scope });

        expect(records).toHaveLength(1);
        expect(records[0]?.record.change).toEqual({
          artifactLocale: "en",
          contentKey: stale.contentKey,
          family: "material",
          operation: "delete",
        });
        expect(result).toEqual(fixture.publishedHeads);
        expect(compilerState.calls).toBe(0);
      })
  );
});
