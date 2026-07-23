import { Schema } from "effect";
import { describe, expect, it } from "vitest";
import { hashContentProjection } from "#contracts/projection/hash";
import { MaterialLessonProjectionSchema } from "#contracts/projection/material";
import { materialGraph } from "#contracts/test/graph";

const projection = Schema.decodeUnknownSync(MaterialLessonProjectionSchema)({
  contentKey: "test:projection",
  graph: materialGraph("en", "test", "projection", "test-projection"),
  kind: "subject-lesson",
  locale: "en",
  materialKey: "lesson.test.projection",
  metadata: {
    authors: [{ name: "Nakafa" }],
    date: "2026-07-22",
    description: "Canonical projection",
    subject: "Mathematics",
    title: "Projection",
  },
  order: 1,
  parentPath: "subjects/test",
  publicPath: "subjects/test/projection",
  sectionKey: "test-projection",
  sitemap: true,
});

describe("content projection hash", () => {
  it("hashes canonical projection bytes with one stable identity", () => {
    expect(hashContentProjection(projection)).toBe(
      "sha256:48cb0acf2b0c22bd5289e14bb2ef84299924ab402700347cdcd95150e8b393c8"
    );
  });
});
