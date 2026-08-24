import { Exit, Schema } from "effect";
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
  Schema.decodeSync(MaterialLessonRouteSchema)({
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
  Schema.decodeSync(MaterialMetadataSchema)({
    authors: [{ name: "Test Author" }],
    dateModified: "2026-02-01",
    datePublished: "2026-01-31",
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

  it("rejects legacy, ambiguous, or incomplete projection date shapes", () => {
    const decode = Schema.decodeUnknownExit(MaterialLessonProjectionSchema);
    const base = { authors: [], title: "Migration" };
    for (const invalid of [
      base,
      { ...base, date: "2026-01-01" },
      { ...base, date: "2026-01-01", datePublished: "2026-01-01" },
      { ...base, date: undefined },
      {
        ...base,
        dateModified: undefined,
        datePublished: "2026-01-01",
      },
    ]) {
      expect(
        Exit.isFailure(
          decode(
            { ...projection, metadata: invalid },
            { onExcessProperty: "error" }
          )
        )
      ).toBe(true);
    }
  });

  it("requires the canonical topic label and public discovery state", () => {
    const { topicTitle: _topicTitle, ...missingTopicTitle } = projection;
    for (const input of [
      missingTopicTitle,
      { ...projection, sitemap: false },
    ]) {
      expect(
        Exit.isFailure(
          Schema.decodeUnknownExit(MaterialLessonProjectionSchema)(input)
        )
      ).toBe(true);
    }
  });

  it("canonicalizes metadata whose optional fields are absent", () => {
    const minimal = Schema.decodeSync(MaterialLessonProjectionSchema)({
      ...projection,
      metadata: {
        authors: [],
        datePublished: "2024-02-29",
        title: "Test Minimal Metadata",
      },
    });
    expect(canonicalizeMaterialProjection(minimal)).not.toContain(
      "description"
    );
    expect(canonicalizeMaterialProjection(minimal)).not.toContain(
      "dateModified"
    );
    expect(canonicalizeMaterialProjection(minimal)).not.toContain('"subject":');
  });

  it("accepts an absent modification date and rejects explicit undefined", () => {
    const absent = Schema.decodeExit(MaterialMetadataSchema)({
      authors: [],
      datePublished: "2026-01-01",
      title: "Published",
    });
    const explicitUndefined = Schema.decodeUnknownExit(MaterialMetadataSchema)({
      authors: [],
      dateModified: undefined,
      datePublished: "2026-01-01",
      title: "Undefined",
    });

    expect(Exit.isSuccess(absent)).toBe(true);
    expect(Exit.isFailure(explicitUndefined)).toBe(true);
  });

  it("rejects malformed and impossible authored dates", () => {
    for (const datePublished of ["not-a-date", "2026-02-30"]) {
      expect(
        Exit.isFailure(
          Schema.decodeExit(MaterialLessonProjectionSchema)({
            ...projection,
            metadata: { authors: [], datePublished, title: "Invalid" },
          })
        )
      ).toBe(true);
    }
  });

  it("rejects the legacy date field and non-later modification dates", () => {
    const legacy = Schema.decodeUnknownExit(MaterialMetadataSchema)(
      {
        authors: [],
        date: "2026-01-01",
        title: "Legacy",
      },
      { onExcessProperty: "error" }
    );
    const equal = Schema.decodeExit(MaterialMetadataSchema)({
      authors: [],
      dateModified: "2026-01-01",
      datePublished: "2026-01-01",
      title: "Equal",
    });
    const earlier = Schema.decodeExit(MaterialMetadataSchema)({
      authors: [],
      dateModified: "2025-12-31",
      datePublished: "2026-01-01",
      title: "Earlier",
    });

    expect([legacy, equal, earlier].every(Exit.isFailure)).toBe(true);
    if (Exit.isFailure(earlier)) {
      expect(String(earlier.cause)).toContain(
        "Expected dateModified to be later than datePublished."
      );
    }
  });

  it("rejects material paths without a parent route", () => {
    const result = Schema.decodeExit(MaterialLessonProjectionSchema)({
      ...projection,
      publicPath: "lesson",
    });
    expect(Exit.isFailure(result)).toBe(true);
    if (Exit.isFailure(result)) {
      expect(String(result.cause)).toContain(
        "Expected a material lesson path with a parent route."
      );
    }
  });

  it("owns the exact public namespace for every application locale", () => {
    expect([
      materialPublicNamespace(Schema.decodeSync(AppLocaleSchema)("en")),
      materialPublicNamespace(Schema.decodeSync(AppLocaleSchema)("id")),
      materialPublicNamespace(Schema.decodeSync(AppLocaleSchema)("de")),
    ]).toEqual(["subjects", "materi", "faecher"]);

    const germanRoute = Schema.decodeSync(MaterialLessonRouteSchema)({
      ...projection,
      appLocale: "de",
      artifactLocale: "de",
      graph: materialGraph("de", "test", "material", "test-lesson"),
      publicPath: "faecher/test/material/lektion",
    });
    expect(germanRoute.publicPath).toBe("faecher/test/material/lektion");
  });

  it("rejects a material route under another locale namespace", () => {
    const result = Schema.decodeExit(MaterialLessonRouteSchema)({
      ...projection,
      publicPath: "materi/test/material/lesson",
    });
    expect(Exit.isFailure(result)).toBe(true);
    if (Exit.isFailure(result)) {
      expect(String(result.cause)).toContain("locale-owned namespace");
    }
  });

  it("rejects a public material route whose locales differ", () => {
    const result = Schema.decodeExit(MaterialLessonRouteSchema)({
      ...projection,
      appLocale: "id",
    });
    expect(Exit.isFailure(result)).toBe(true);
    if (Exit.isFailure(result)) {
      expect(String(result.cause)).toContain(
        "Expected public material route and artifact locales to match."
      );
    }
  });

  it("rejects malformed material keys with its domain message", () => {
    const result = Schema.decodeExit(MaterialKeySchema)("lesson.Test.material");
    expect(Exit.isFailure(result)).toBe(true);
    if (Exit.isFailure(result)) {
      expect(String(result.cause)).toContain("Invalid material key.");
    }
  });

  it("rejects a parent route unrelated to its lesson path", () => {
    const result = Schema.decodeExit(MaterialLessonProjectionSchema)({
      ...projection,
      parentPath: "subjects/unrelated/material",
    });
    expect(Exit.isFailure(result)).toBe(true);
    if (Exit.isFailure(result)) {
      expect(String(result.cause)).toContain(
        "Expected the material parent path to match the lesson public path."
      );
    }
  });

  it("rejects graph identities unrelated to its stable material key", () => {
    const result = Schema.decodeExit(MaterialLessonProjectionSchema)({
      ...projection,
      graph: materialGraph("en", "test", "other", "test-lesson"),
    });
    expect(Exit.isFailure(result)).toBe(true);
    if (Exit.isFailure(result)) {
      expect(String(result.cause)).toContain(
        "Expected material graph identities"
      );
    }
  });
});
