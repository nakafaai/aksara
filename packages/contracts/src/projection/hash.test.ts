import { Schema } from "effect";
import { describe, expect, it } from "vitest";
import { hashContentProjection } from "#contracts/projection/hash";
import { MaterialLessonProjectionSchema } from "#contracts/projection/material";
import { materialGraph } from "#contracts/test/graph";

const projection = Schema.decodeSync(MaterialLessonProjectionSchema)({
  appLocale: "en",
  artifactLocale: "en",
  contentKey: "test:projection",
  graph: materialGraph("en", "test", "projection", "test-projection"),
  kind: "subject-lesson",
  materialKey: "lesson.test.projection",
  metadata: {
    authors: [{ name: "Nakafa" }],
    datePublished: "2026-07-22",
    description: "Canonical projection",
    subject: "Mathematics",
    title: "Projection",
  },
  order: 1,
  parentPath: "subjects/test",
  publicPath: "subjects/test/projection",
  sectionKey: "test-projection",
  sitemap: true,
  topicTitle: "Test Projection Topic",
});

describe("content projection hash", () => {
  it("hashes canonical projection bytes with one stable identity", () => {
    expect(hashContentProjection(projection)).toBe(
      "sha256:e47a457bb7c8350b585458b6b16d7ddb7936cc3435764b339aaeb8add2ba3c2f"
    );
  });
});
