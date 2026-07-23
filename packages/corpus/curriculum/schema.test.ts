import { Effect } from "effect";
import { describe, expect, it } from "vitest";

import { cambridgeInternationalCurriculum } from "#corpus/curriculum/cambridge-international/source";
import { merdekaCurriculum } from "#corpus/curriculum/merdeka/source";
import {
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
  it("defines every structure level and a nested material leaf", async () => {
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
    const curriculum = await Effect.runPromise(
      defineCurriculum({ programKey: "merdeka", tree: nodes })
    );

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
  });

  it("rejects malformed keys and empty material references", async () => {
    const invalidKey = await Effect.runPromise(
      defineCurriculum({
        programKey: "merdeka",
        tree: [
          unitNode({
            key: "Invalid Node",
            order: 1,
            translations: translations("invalid"),
          }),
        ],
      }).pipe(Effect.flip)
    );
    const emptyMaterial = await Effect.runPromise(
      defineCurriculum({
        programKey: "merdeka",
        tree: [
          materialNode({
            key: "empty-material",
            level: "lesson",
            materialKeys: [],
            order: 1,
          }),
        ],
      }).pipe(Effect.flip)
    );

    expect(invalidKey).toMatchObject({ _tag: "CurriculumDecodeError" });
    expect(String(invalidKey.cause)).toContain("Invalid curriculum node key.");
    expect(emptyMaterial).toMatchObject({ _tag: "CurriculumDecodeError" });
  });

  it("reports duplicate identities anywhere in a recursive tree", async () => {
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
    const error = await Effect.runPromise(
      defineCurriculum({ programKey: "merdeka", tree: [parent] }).pipe(
        Effect.flip
      )
    );

    expect(error).toMatchObject({
      _tag: "CurriculumDuplicateError",
      nodeKey: "duplicate-node",
      programKey: "merdeka",
    });
  });

  it("validates every authored curriculum source", async () => {
    const curricula = await Effect.runPromise(
      Effect.all([
        cambridgeInternationalCurriculum,
        merdekaCurriculum,
        singaporeMoeCurriculum,
        unitedStatesCurriculum,
      ])
    );

    expect(curricula.map(({ programKey }) => programKey)).toEqual([
      "cambridge-international",
      "merdeka",
      "singapore-moe",
      "united-states",
    ]);
  });

  it("loads every authored curriculum registry module", async () => {
    const files = await Effect.runPromise(
      importCorpusModules("curriculum/**/*.ts", ["curriculum/schema.ts"])
    );

    expect(files).toHaveLength(20);
  });
});
