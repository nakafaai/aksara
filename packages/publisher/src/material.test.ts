import { resolve } from "node:path";
import { Path } from "@effect/platform";
import { Effect } from "effect";
import { afterEach, describe, expect, it, vi } from "vitest";
import { prepareMaterialCheckout } from "#publisher/material";
import {
  checkoutRoot,
  collectMaterialRecords,
  englishPath,
  indonesianPath,
  materialFileLayer,
  materialManifest,
  prepareMaterial,
  rendererManifest,
  sourceByPath,
} from "#test/material";

const registryState = vi.hoisted(() => ({
  changedOrder: false,
  withoutEnglish: false,
}));

vi.mock("@nakafaai/aksara-corpus/material/registry", async (importOriginal) => {
  const original =
    await importOriginal<
      typeof import("@nakafaai/aksara-corpus/material/registry")
    >();
  return {
    ...original,
    decodeMaterialRegistry: (input?: unknown) =>
      original.decodeMaterialRegistry(input).pipe(
        Effect.map((entries) => {
          const selected = registryState.withoutEnglish
            ? entries.slice(1)
            : entries;
          if (!registryState.changedOrder) {
            return selected;
          }
          return selected.map((entry) =>
            entry.route.locale === "en"
              ? {
                  ...entry,
                  route: { ...entry.route, order: entry.route.order + 1 },
                }
              : entry
          );
        })
      ),
  };
});

afterEach(() => {
  registryState.changedOrder = false;
  registryState.withoutEnglish = false;
});

describe("material checkout", () => {
  it("compiles the two real sources once and reuses their exact local state", async () => {
    const first = await prepareMaterial({});
    const repeated = await prepareMaterial({ previous: first.snapshot });
    const records = await collectMaterialRecords(first);
    const repeatedRecords = await collectMaterialRecords(repeated);

    expect(first.outcomes.map(({ kind }) => kind)).toEqual([
      "compiled",
      "compiled",
    ]);
    expect(
      first.outcomes.map((outcome) =>
        outcome.kind === "compiled" ? outcome.reason : undefined
      )
    ).toEqual(["missing", "missing"]);
    expect(repeated.outcomes.map(({ kind }) => kind)).toEqual([
      "unchanged",
      "unchanged",
    ]);
    expect(repeatedRecords).toEqual([]);
    expect(
      records.map((record) =>
        record.change.operation === "upsert"
          ? record.change.sourcePath
          : undefined
      )
    ).toEqual([englishPath, indonesianPath]);
    expect(
      records.map((record) =>
        "projection" in record ? record.projection.metadata.title : undefined
      )
    ).toEqual(["Function Concept", "Konsep Fungsi"]);
    expect(
      records.every(
        (record) =>
          "payload" in record &&
          record.change.artifactHash.startsWith("sha256:") &&
          !record.payload.compiledCode.includes("metadata")
      )
    ).toBe(true);
  });

  it("recompiles only the locale whose real source bytes changed", async () => {
    const first = await prepareMaterial({});
    const edited = new Map(sourceByPath);
    const english = edited.get(resolve(checkoutRoot, englishPath));
    expect(english).toBeDefined();
    if (english === undefined) {
      return;
    }
    edited.set(resolve(checkoutRoot, englishPath), `${english}\n`);

    const changed = await prepareMaterial({
      previous: first.snapshot,
      sources: edited,
    });
    const records = await collectMaterialRecords(changed);

    expect(
      changed.outcomes.map((outcome) =>
        outcome.kind === "compiled"
          ? `${outcome.kind}:${outcome.reason}`
          : outcome.kind
      )
    ).toEqual(["compiled:changed", "unchanged"]);
    expect(records).toHaveLength(1);
    expect(records[0]?.change).toMatchObject({
      locale: "en",
      operation: "upsert",
      sourcePath: englishPath,
    });
  });

  it("invalidates only documents owned by the changed renderer domain", async () => {
    const first = await prepareMaterial({});
    const chemistry = await materialManifest({ chemistry: 2, math: 1 });
    const mathematics = await materialManifest({ chemistry: 1, math: 2 });
    const unrelated = await prepareMaterial({
      previous: first.snapshot,
      renderer: chemistry,
    });
    const related = await prepareMaterial({
      previous: first.snapshot,
      renderer: mathematics,
    });

    expect(unrelated.outcomes.map(({ kind }) => kind)).toEqual([
      "unchanged",
      "unchanged",
    ]);
    expect(
      related.outcomes.map((outcome) =>
        outcome.kind === "compiled" ? outcome.reason : outcome.kind
      )
    ).toEqual(["changed", "changed"]);
  });

  it("emits one tombstone when a prior real locale leaves the registry", async () => {
    const first = await prepareMaterial({});
    registryState.withoutEnglish = true;
    const deleted = await prepareMaterial({ previous: first.snapshot });
    const records = await collectMaterialRecords(deleted);

    expect(deleted.outcomes.map(({ kind }) => kind)).toEqual([
      "deleted",
      "unchanged",
    ]);
    expect(records).toEqual([
      {
        change: {
          contentKey:
            "material/lesson/mathematics/function-composition-inverse-function/function-concept",
          locale: "en",
          operation: "delete",
        },
      },
    ]);
  });

  it("emits an upsert without recompiling when registry projection changes", async () => {
    const first = await prepareMaterial({});
    registryState.changedOrder = true;
    const updated = await prepareMaterial({ previous: first.snapshot });
    const records = await collectMaterialRecords(updated);

    expect(updated.outcomes.map(({ kind }) => kind)).toEqual([
      "updated",
      "unchanged",
    ]);
    expect(records).toHaveLength(1);
    expect(records[0]).toMatchObject({
      change: { locale: "en", operation: "upsert" },
      projection: { locale: "en", order: 6 },
    });
  });

  it("fails changed content instead of returning its prior compiled body", async () => {
    const first = await prepareMaterial({});
    const invalid = new Map(sourceByPath);
    const english = invalid.get(resolve(checkoutRoot, englishPath));
    expect(english).toBeDefined();
    if (english === undefined) {
      return;
    }
    invalid.set(
      resolve(checkoutRoot, englishPath),
      english.replace('  title: "Function Concept",\n', "")
    );
    const error = await Effect.runPromise(
      prepareMaterialCheckout({
        checkoutRoot,
        previous: first.snapshot,
        rendererManifest,
      }).pipe(
        Effect.provide(materialFileLayer(invalid)),
        Effect.provide(Path.layer),
        Effect.flip
      )
    );

    expect(error).toMatchObject({
      _tag: "MaterialMetadataError",
      sourcePath: englishPath,
    });
  });

  it("maps checkout read failures to the publisher source error", async () => {
    const error = await Effect.runPromise(
      prepareMaterialCheckout({ checkoutRoot, rendererManifest }).pipe(
        Effect.provide(materialFileLayer(new Map())),
        Effect.provide(Path.layer),
        Effect.flip
      )
    );

    expect(error).toMatchObject({
      _tag: "MaterialSourceError",
      checkoutRoot,
    });
  });
});
