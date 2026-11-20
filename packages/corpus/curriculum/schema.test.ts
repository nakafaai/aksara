import { describe, expect, it } from "@effect/vitest";
import { Array as Arr, Effect, Exit, Schema } from "effect";

import { cambridgeInternationalCurriculum } from "#corpus/curriculum/cambridge-international/source";
import { merdekaCurriculum } from "#corpus/curriculum/merdeka/source";
import {
  CurriculumSourceSchema,
  classNode,
  courseNode,
  defineCurriculum,
  materialNode,
  stageNode,
  subjectNode,
  unitNode,
} from "#corpus/curriculum/schema";
import { singaporeMoeCurriculum } from "#corpus/curriculum/singapore-moe/source";
import { unitedStatesCurriculum } from "#corpus/curriculum/united-states/source";
import { citedOutcomes } from "#corpus/test/curriculum";

/** Builds complete localized translations for one real curriculum node shape. */
function translations(prefix: string) {
  return {
    en: { routeSlug: `${prefix}-en`, title: `${prefix} EN` },
    id: { routeSlug: `${prefix}-id`, title: `${prefix} ID` },
  };
}

describe("curriculum schema", () => {
  it.effect("defines every structure level and a nested material leaf", () =>
    Effect.gen(function* () {
      const leaf = materialNode({
        key: "function-concept",
        level: "lesson",
        materialKeys: ["lesson.mathematics.function-concept"],
        order: 1,
        outcomes: citedOutcomes,
      });
      const nodes = [
        classNode({
          key: "class-node",
          order: 1,
          translations: translations("class"),
        }),
        subjectNode({
          key: "subject-node",
          order: 2,
          translations: translations("subject"),
        }),
        courseNode({
          key: "course-node",
          order: 3,
          translations: translations("course"),
        }),
        stageNode({
          key: "stage-node",
          order: 4,
          translations: translations("stage"),
        }),
        unitNode({
          children: [leaf],
          key: "unit-node",
          levelBand: "upper-secondary",
          order: 5,
          translations: translations("unit"),
        }),
      ];
      const curriculum = yield* defineCurriculum({
        programKey: "merdeka",
        tree: nodes,
      });

      expect(Arr.map(nodes, ({ level }) => level)).toEqual([
        "class",
        "subject",
        "course",
        "stage",
        "unit",
      ]);
      expect(curriculum.tree[4]).toMatchObject({
        children: [{ key: "function-concept" }],
        key: "unit-node",
      });
    })
  );

  it.effect("rejects malformed keys and empty material references", () =>
    Effect.gen(function* () {
      const invalidKey = yield* defineCurriculum({
        programKey: "merdeka",
        tree: [
          unitNode({
            key: "Invalid Node",
            order: 1,
            translations: translations("invalid"),
          }),
        ],
      }).pipe(Effect.flip);
      const emptyMaterial = Schema.decodeUnknownExit(CurriculumSourceSchema)({
        programKey: "merdeka",
        tree: [
          {
            key: "empty-material",
            level: "lesson",
            materialKeys: [],
            order: 1,
            outcomes: citedOutcomes,
          },
        ],
      });

      expect(invalidKey).toMatchObject({ _tag: "CurriculumDecodeError" });
      expect(String(invalidKey.cause)).toContain(
        "Invalid curriculum node key."
      );
      expect(Exit.isFailure(emptyMaterial)).toBe(true);
    })
  );

  it.effect("rejects a mapping without an official citation", () =>
    Effect.sync(() => {
      const mapping = {
        key: "uncited-material",
        level: "lesson",
        materialKeys: ["lesson.mathematics.matrix"],
        order: 1,
      };
      /** Decodes a tree holding only the given mapping. */
      const decode = (node: object) =>
        Schema.decodeUnknownExit(CurriculumSourceSchema)({
          programKey: "merdeka",
          tree: [node],
        });

      expect(Exit.isFailure(decode(mapping))).toBe(true);
      expect(Exit.isFailure(decode({ ...mapping, outcomes: [] }))).toBe(true);
      for (const url of ["matriks.pdf", "http://buku.example.id/matriks.pdf"]) {
        expect(
          Exit.isFailure(
            decode({
              ...mapping,
              outcomes: [{ citation: "Buku Matematika", code: "Bab 1", url }],
            })
          )
        ).toBe(true);
      }
      expect(
        Exit.isSuccess(decode({ ...mapping, outcomes: citedOutcomes }))
      ).toBe(true);
    })
  );

  it.effect("requires every material inside exactly one level band", () =>
    Effect.gen(function* () {
      const leaf = materialNode({
        key: "banded-material",
        level: "lesson",
        materialKeys: ["lesson.mathematics.matrix"],
        order: 1,
        outcomes: citedOutcomes,
      });
      const unbanded = yield* defineCurriculum({
        programKey: "merdeka",
        tree: [
          unitNode({
            children: [leaf],
            key: "unbanded-unit",
            order: 1,
            translations: translations("unbanded"),
          }),
        ],
      }).pipe(Effect.flip);
      const nested = yield* defineCurriculum({
        programKey: "merdeka",
        tree: [
          classNode({
            children: [
              unitNode({
                children: [leaf],
                key: "nested-unit",
                levelBand: "lower-secondary",
                order: 1,
                translations: translations("nested"),
              }),
            ],
            key: "banded-class",
            levelBand: "upper-secondary",
            order: 1,
            translations: translations("banded"),
          }),
        ],
      }).pipe(Effect.flip);

      expect(unbanded).toMatchObject({
        _tag: "CurriculumLevelBandError",
        nodeKey: "banded-material",
        reason: "missing",
      });
      expect(nested).toMatchObject({
        _tag: "CurriculumLevelBandError",
        nodeKey: "nested-unit",
        reason: "nested",
      });
    })
  );

  it.effect("reports duplicate identities anywhere in a recursive tree", () =>
    Effect.gen(function* () {
      const child = unitNode({
        key: "duplicate-node",
        order: 1,
        translations: translations("child"),
      });
      const parent = unitNode({
        children: [child],
        key: "duplicate-node",
        order: 1,
        translations: translations("parent"),
      });
      const error = yield* defineCurriculum({
        programKey: "merdeka",
        tree: [parent],
      }).pipe(Effect.flip);

      expect(error).toMatchObject({
        _tag: "CurriculumDuplicateError",
        nodeKey: "duplicate-node",
        programKey: "merdeka",
      });
    })
  );

  it.effect("validates every authored curriculum source", () =>
    Effect.gen(function* () {
      const curricula = yield* Effect.all([
        cambridgeInternationalCurriculum,
        merdekaCurriculum,
        singaporeMoeCurriculum,
        unitedStatesCurriculum,
      ]);

      expect(Arr.map(curricula, ({ programKey }) => programKey)).toEqual([
        "cambridge-international",
        "merdeka",
        "singapore-moe",
        "united-states",
      ]);
    })
  );
});
