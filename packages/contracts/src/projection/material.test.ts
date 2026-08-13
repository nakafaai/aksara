import { Either, Schema } from "effect";
import { describe, expect, it } from "vitest";
import { AppLocaleSchema } from "#contracts/locale";
import {
  canonicalizeMaterialProjection,
  MaterialKeySchema,
  MaterialLessonProjectionSchema,
  MaterialLessonRouteSchema,
  MaterialMetadataSchema,
  makeMaterialLessonProjection,
  materialPublicNamespace,
} from "#contracts/projection/material";
import { materialGraph } from "#contracts/test/graph";

const projection = makeMaterialLessonProjection(
  Schema.decodeUnknownSync(MaterialLessonRouteSchema)({
    appLocale: "en",
    artifactLocale: "en",
    contentKey: "test:material-a",
    graph: materialGraph("en", "test", "material", "test-lesson"),
    materialKey: "lesson.test.material",
    order: 1,
    publicPath: "subjects/test/material/lesson",
    sectionKey: "test-lesson",
    topicTitle: "Test Material",
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
    expect(projection.topicTitle).toBe("Test Material");
  });

  it("requires the canonical topic label and public discovery state", () => {
    const { topicTitle: _topicTitle, ...missingTopicTitle } = projection;
    for (const input of [
      missingTopicTitle,
      { ...projection, sitemap: false },
    ]) {
      expect(
        Either.isLeft(
          Schema.decodeUnknownEither(MaterialLessonProjectionSchema)(input)
        )
      ).toBe(true);
    }
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

  it("owns the exact public namespace for every application locale", () => {
    expect([
      materialPublicNamespace(Schema.decodeUnknownSync(AppLocaleSchema)("en")),
      materialPublicNamespace(Schema.decodeUnknownSync(AppLocaleSchema)("id")),
      materialPublicNamespace(Schema.decodeUnknownSync(AppLocaleSchema)("de")),
    ]).toEqual(["subjects", "materi", "faecher"]);

    const germanRoute = Schema.decodeUnknownSync(MaterialLessonRouteSchema)({
      ...projection,
      appLocale: "de",
      artifactLocale: "de",
      graph: materialGraph("de", "test", "material", "test-lesson"),
      publicPath: "faecher/test/material/lektion",
    });
    expect(germanRoute.publicPath).toBe("faecher/test/material/lektion");
  });

  it("rejects a material route under another locale namespace", () => {
    const result = Schema.decodeUnknownEither(MaterialLessonRouteSchema)({
      ...projection,
      publicPath: "materi/test/material/lesson",
    });
    expect(Either.isLeft(result)).toBe(true);
    if (Either.isLeft(result)) {
      expect(String(result.left)).toContain("locale-owned namespace");
    }
  });

  it("rejects a public material route whose locales differ", () => {
    const result = Schema.decodeUnknownEither(MaterialLessonRouteSchema)({
      ...projection,
      appLocale: "id",
    });
    expect(Either.isLeft(result)).toBe(true);
    if (Either.isLeft(result)) {
      expect(String(result.left)).toContain(
        "Expected public material route and artifact locales to match."
      );
    }
  });

  it("rejects malformed material keys with its domain message", () => {
    const result = Schema.decodeUnknownEither(MaterialKeySchema)(
      "lesson.Test.material"
    );
    expect(Either.isLeft(result)).toBe(true);
    if (Either.isLeft(result)) {
      expect(String(result.left)).toContain("Invalid material key.");
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
