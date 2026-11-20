import { NodeServices } from "@effect/platform-node";
import { describe, expect, it } from "@effect/vitest";
import { Array as Arr, Effect, HashSet, Predicate, Record } from "effect";

import {
  CurriculumCatalogError,
  decodeCurriculumCatalog,
  validateCurriculumCatalog,
} from "#corpus/curriculum/source";
import { importCorpusModules } from "#corpus/test/imports";

/** Collects every curriculum node key inside one exported registry value. */
function exportedNodeKeys(value: unknown): string[] {
  if (Arr.isArray(value)) {
    return Arr.flatMap(value, exportedNodeKeys);
  }
  if (!(Predicate.isObject(value) && Predicate.isString(value.key))) {
    return [];
  }
  return [value.key, ...exportedNodeKeys(value.children)];
}

describe("curriculum source catalog", () => {
  it.effect("loads the six real curriculum trees in stable program order", () =>
    Effect.gen(function* () {
      const curricula = yield* decodeCurriculumCatalog();

      expect(Arr.map(curricula, ({ programKey }) => programKey)).toEqual([
        "cambridge-international",
        "gymnasiale-oberstufe",
        "kssm",
        "merdeka",
        "singapore-moe",
        "united-states",
      ]);
    })
  );

  it.effect("canonicalizes reversed real source order", () =>
    Effect.gen(function* () {
      const curricula = yield* decodeCurriculumCatalog();
      const canonical = yield* validateCurriculumCatalog(
        Arr.reverse(curricula)
      );

      expect(canonical).toEqual(curricula);
    })
  );

  it.effect("rejects duplicate program ownership", () =>
    Effect.gen(function* () {
      const [curriculum] = yield* decodeCurriculumCatalog();
      expect(curriculum).toBeDefined();
      if (!curriculum) {
        return;
      }
      const error = yield* validateCurriculumCatalog([
        curriculum,
        curriculum,
      ]).pipe(Effect.flip);

      expect(error).toBeInstanceOf(CurriculumCatalogError);
      expect(error).toMatchObject({ programKey: curriculum.programKey });
    })
  );

  it.effect(
    "registers every node each curriculum registry module exports",
    () =>
      Effect.gen(function* () {
        const modules = yield* importCorpusModules("curriculum/**/*.ts", [
          "curriculum/*/documents.ts",
          "curriculum/context.ts",
          "curriculum/material.ts",
          "curriculum/node.ts",
          "curriculum/ownership.ts",
          "curriculum/projection.ts",
          "curriculum/published.ts",
          "curriculum/route.ts",
          "curriculum/schema.ts",
          "curriculum/source.ts",
        ]);

        const curricula = yield* decodeCurriculumCatalog();
        const registered = HashSet.fromIterable(
          Arr.flatMap(curricula, ({ tree }) => exportedNodeKeys(tree))
        );
        const nodeModules = Arr.filter(
          Arr.map(modules, ({ exports, file }) => ({
            file,
            keys: exportedNodeKeys(
              Predicate.isObject(exports) ? Record.values(exports) : []
            ),
          })),
          ({ keys }) => keys.length > 0
        );
        const unregistered = Arr.flatMap(nodeModules, ({ file, keys }) =>
          Arr.map(
            Arr.filter(keys, (key) => !HashSet.has(registered, key)),
            (key) => `${file}: ${key}`
          )
        );

        expect(unregistered).toEqual([]);
        expect(modules.length - nodeModules.length).toBe(curricula.length);
      }).pipe(Effect.provide(NodeServices.layer))
  );
});
