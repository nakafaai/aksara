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
  topicTitle: "Test Projection Topic",
});

describe("content projection hash", () => {
  it("hashes canonical projection bytes with one stable identity", () => {
    expect(hashContentProjection(projection)).toBe(
      "sha256:8f5ea50020652fd2608bc5aab52a63f8feda4d24d29301eb1b808e24b02a7b5f"
    );
  });
});
