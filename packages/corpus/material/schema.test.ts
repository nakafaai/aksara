import { describe, expect, it } from "@effect/vitest";
import { Effect, Exit, Schema } from "effect";

import {
  defineLessonMaterial,
  LessonMaterialSourceSchema,
} from "#corpus/material/schema";
import { importCorpusModules } from "#corpus/test/imports";

/** Builds one exact lesson-source shape so tests change only one contract field. */
function lessonSource() {
  return {
    assetRoot: "material/lesson/mathematics/function-concept",
    domain: "mathematics",
    key: "lesson.mathematics.function-concept",
    kind: "lesson",
    routeSlugs: { en: "function-concept", id: "konsep-fungsi" },
    sections: [
      {
        routeSlugs: { en: "definition", id: "definisi" },
        slug: "definition",
      },
    ],
    slug: "function-concept",
    translations: {
      en: { description: "Learn function concepts.", title: "Functions" },
      id: { description: "Pelajari konsep fungsi.", title: "Fungsi" },
    },
  } as const;
}

describe("material schema", () => {
  it.effect("decodes one complete authored lesson source", () =>
    Effect.gen(function* () {
      const material = yield* defineLessonMaterial(lessonSource());

      expect(material).toMatchObject({
        domain: "mathematics",
        key: "lesson.mathematics.function-concept",
        sections: [{ slug: "definition" }],
      });
    })
  );

  it.effect("maps invalid authored input to one typed source failure", () =>
    Effect.gen(function* () {
      const error = yield* defineLessonMaterial({
        ...lessonSource(),
        slug: "Invalid Slug",
      }).pipe(Effect.flip);

      expect(error).toMatchObject({
        _tag: "LessonMaterialError",
        materialKey: "lesson.mathematics.function-concept",
      });
    })
  );

  it.each([
    {
      field: "assetRoot",
      input: {
        ...lessonSource(),
        assetRoot: "/material/lesson/mathematics/function-concept",
      },
      message: "Invalid material source path.",
    },
    {
      field: "key",
      input: {
        ...lessonSource(),
        key: "lesson/mathematics/function-concept",
      },
      message: "Invalid material key.",
    },
    {
      field: "slug",
      input: { ...lessonSource(), slug: "Invalid Slug" },
      message: "Invalid material slug.",
    },
  ])("rejects an invalid $field", ({ input, message }) => {
    const result = Schema.decodeExit(LessonMaterialSourceSchema)(input);

    expect(Exit.isFailure(result)).toBe(true);
    if (Exit.isFailure(result)) {
      expect(String(result.cause)).toContain(message);
    }
  });

  it.effect("loads every authored lesson material source module", () =>
    Effect.gen(function* () {
      const files = yield* importCorpusModules("material/lesson/**/*.ts", [
        "**/locale/**/*.ts",
      ]);

      expect(files).toHaveLength(44);
    })
  );
});
