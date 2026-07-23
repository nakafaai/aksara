import { Effect, Either } from "effect";
import { describe, expect, it } from "vitest";

import {
  CurriculumSourceDefinitionError,
  classNode,
  courseNode,
  defineCurriculum,
  materialNode,
  stageNode,
  subjectNode,
  unitNode,
} from "#corpus/curriculum/schema";
import { importCorpusModules } from "#corpus/test/imports";

/** Builds complete localized translations for one real curriculum node shape. */
function translations(prefix: string) {
  return {
    en: { routeSlug: `${prefix}-en`, title: `${prefix} EN` },
    id: { routeSlug: `${prefix}-id`, title: `${prefix} ID` },
  };
}

describe("curriculum schema", () => {
  it("defines every structure level and a nested material leaf", () => {
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
    const curriculum = defineCurriculum({
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
  });

  it("rejects malformed keys and empty material references", () => {
    const invalidKey = Either.try({
      catch: (error) => error,
      try: () =>
        unitNode({
          key: "Invalid Node",
          order: 1,
          translations: translations("invalid"),
        }),
    });
    const emptyMaterial = Either.try({
      catch: (error) => error,
      try: () =>
        materialNode({
          key: "empty-material",
          level: "lesson",
          materialKeys: [],
          order: 1,
        }),
    });

    expect(Either.isLeft(invalidKey)).toBe(true);
    expect(Either.isLeft(emptyMaterial)).toBe(true);
    if (Either.isLeft(invalidKey)) {
      expect(String(invalidKey.left)).toContain("Invalid curriculum node key.");
    }
  });

  it("reports duplicate identities anywhere in a recursive tree", () => {
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
    /** Attempts to decode the deliberately duplicated real tree shape. */
    const duplicate = () =>
      defineCurriculum({ programKey: "merdeka", tree: [parent] });

    expect(duplicate).toThrow(CurriculumSourceDefinitionError);
    expect(duplicate).toThrow(
      "Duplicate curriculum node duplicate-node in merdeka."
    );
  });

  it("loads every authored curriculum registry module", async () => {
    const files = await Effect.runPromise(
      importCorpusModules("curriculum/**/*.ts", ["curriculum/schema.ts"])
    );

    expect(files).toHaveLength(20);
  });
});
