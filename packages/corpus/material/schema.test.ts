import { describe, expect, it } from "@effect/vitest";
import { Effect, Exit, Schema } from "effect";

import { LessonMaterialSourceSchema } from "#corpus/material/schema";

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
        evidenceUrls: ["https://example.edu/reviewed-source"],
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
      const material = yield* Schema.decodeEffect(LessonMaterialSourceSchema)(
        lessonSource(),
        { onExcessProperty: "error" }
      );

      expect(material).toMatchObject({
        domain: "mathematics",
        key: "lesson.mathematics.function-concept",
        sections: [
          {
            evidenceUrls: ["https://example.edu/reviewed-source"],
            slug: "definition",
          },
        ],
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

  it.each([
    {
      evidenceUrls: ["http://example.edu/insecure-source"] as const,
      message: "Invalid lesson evidence URL.",
    },
    {
      evidenceUrls: ["https://?claim"] as const,
      message: "Invalid lesson evidence URL.",
    },
    {
      evidenceUrls: ["https://%"] as const,
      message: "Invalid lesson evidence URL.",
    },
    {
      evidenceUrls: [
        "https://example.edu/reviewed-source",
        "https://example.edu/reviewed-source",
      ] as const,
      message: "Duplicate lesson evidence URL.",
    },
  ])("rejects $message", ({ evidenceUrls, message }) => {
    const source = lessonSource();
    const result = Schema.decodeExit(LessonMaterialSourceSchema)({
      ...source,
      sections: [{ ...source.sections[0], evidenceUrls }],
    });

    expect(Exit.isFailure(result)).toBe(true);
    if (Exit.isFailure(result)) {
      expect(String(result.cause)).toContain(message);
    }
  });
});
