import { Either, Schema } from "effect";
import { describe, expect, it } from "vitest";
import {
  canonicalizeMaterialProjection,
  MaterialLessonProjectionSchema,
  MaterialLessonRouteSchema,
  MaterialMetadataSchema,
  makeMaterialLessonProjection,
} from "#contracts/projection/material";
import { materialGraph } from "#contracts/test/graph";

const projection = makeMaterialLessonProjection(
  Schema.decodeUnknownSync(MaterialLessonRouteSchema)({
    contentKey: "test:material-a",
    graph: materialGraph("en", "test", "material", "test-lesson"),
    locale: "en",
    materialKey: "lesson.test.material",
    order: 1,
    publicPath: "subjects/test/material/lesson",
    sectionKey: "test-lesson",
  }),
  Schema.decodeUnknownSync(MaterialMetadataSchema)({
    authors: [{ name: "Test Author" }],
    date: "2026-01-31",
    description: "Test body metadata.",
    subject: "Test Subject",
    title: "Body Metadata Title",
  })
);

describe("material projection", () => {
  it("derives route fields while keeping one authored title source", () => {
    expect(JSON.parse(canonicalizeMaterialProjection(projection))).toEqual(
      projection
    );
    expect(projection.metadata.title).toBe("Body Metadata Title");
  });

  it("canonicalizes metadata whose optional fields are absent", () => {
    const minimal = Schema.decodeUnknownSync(MaterialLessonProjectionSchema)({
      ...projection,
      metadata: {
        authors: [],
        date: "2024-02-29",
        title: "Test Minimal Metadata",
      },
    });
    expect(canonicalizeMaterialProjection(minimal)).not.toContain(
      "description"
    );
    expect(canonicalizeMaterialProjection(minimal)).not.toContain('"subject":');
  });

  it("rejects malformed and impossible authored dates", () => {
    for (const date of ["not-a-date", "2026-02-30"]) {
      expect(
        Either.isLeft(
          Schema.decodeUnknownEither(MaterialLessonProjectionSchema)({
            ...projection,
            metadata: { ...projection.metadata, date },
          })
        )
      ).toBe(true);
    }
  });

  it("rejects material paths without a parent route", () => {
    const result = Schema.decodeUnknownEither(MaterialLessonProjectionSchema)({
      ...projection,
      publicPath: "lesson",
    });
    expect(Either.isLeft(result)).toBe(true);
    if (Either.isLeft(result)) {
      expect(String(result.left)).toContain(
        "Expected a material lesson path with a parent route."
      );
    }
  });

  it("rejects a parent route unrelated to its lesson path", () => {
    const result = Schema.decodeUnknownEither(MaterialLessonProjectionSchema)({
      ...projection,
      parentPath: "subjects/unrelated/material",
    });
    expect(Either.isLeft(result)).toBe(true);
    if (Either.isLeft(result)) {
      expect(String(result.left)).toContain(
        "Expected the material parent path to match the lesson public path."
      );
    }
  });

  it("rejects graph identities unrelated to its stable material key", () => {
    const result = Schema.decodeUnknownEither(MaterialLessonProjectionSchema)({
      ...projection,
      graph: materialGraph("en", "test", "other", "test-lesson"),
    });
    expect(Either.isLeft(result)).toBe(true);
    if (Either.isLeft(result)) {
      expect(String(result.left)).toContain(
        "Expected material graph identities"
      );
    }
  });
});
