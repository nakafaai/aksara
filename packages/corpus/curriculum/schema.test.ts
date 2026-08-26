import { describe, expect, it } from "@effect/vitest";
import { Effect, Exit, Schema } from "effect";

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
import { importCorpusModules } from "#corpus/test/imports";

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
          order: 5,
          translations: translations("unit"),
        }),
      ];
      const curriculum = yield* defineCurriculum({
        programKey: "merdeka",
        tree: nodes,
      });

      expect(nodes.map(({ level }) => level)).toEqual([
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

      expect(curricula.map(({ programKey }) => programKey)).toEqual([
        "cambridge-international",
        "merdeka",
        "singapore-moe",
        "united-states",
      ]);
    })
  );

  it.effect("loads every authored curriculum registry module", () =>
    Effect.gen(function* () {
      const files = yield* importCorpusModules("curriculum/**/*.ts", [
        "curriculum/context.ts",
        "curriculum/material.ts",
        "curriculum/node-route.ts",
        "curriculum/projection.ts",
        "curriculum/route.ts",
        "curriculum/route-source.ts",
        "curriculum/schema.ts",
        "curriculum/source.ts",
      ]);

      expect(files).toHaveLength(20);
    })
  );
});
