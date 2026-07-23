import { Effect, Either, ParseResult, Schema } from "effect";
import { describe, expect, it } from "vitest";

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
        translations: {
          en: { title: "Definition" },
          id: { title: "Definisi" },
        },
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
  it("decodes one complete authored lesson source", async () => {
    const material = await Effect.runPromise(
      defineLessonMaterial(lessonSource())
    );

    expect(material).toMatchObject({
      domain: "mathematics",
      key: "lesson.mathematics.function-concept",
      sections: [{ slug: "definition" }],
    });
  });

  it("maps invalid authored input to one typed source failure", async () => {
    const error = await Effect.runPromise(
      defineLessonMaterial({
        ...lessonSource(),
        slug: "Invalid Slug",
      }).pipe(Effect.flip)
    );

    expect(error).toMatchObject({
      _tag: "LessonMaterialError",
      materialKey: "lesson.mathematics.function-concept",
    });
  });

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
    const result = Schema.decodeUnknownEither(LessonMaterialSourceSchema)(
      input
    );

    expect(Either.isLeft(result)).toBe(true);
    if (Either.isLeft(result)) {
      expect(ParseResult.TreeFormatter.formatErrorSync(result.left)).toContain(
        message
      );
    }
  });

  it("loads every authored lesson material source module", async () => {
    const files = await Effect.runPromise(
      importCorpusModules("material/lesson/**/*.ts")
    );

    expect(files).toHaveLength(45);
  });
});
