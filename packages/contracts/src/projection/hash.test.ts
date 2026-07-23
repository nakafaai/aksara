import { Schema } from "effect";
import { describe, expect, it } from "vitest";
import { hashContentProjection } from "#contracts/projection/hash";
import { MaterialLessonProjectionSchema } from "#contracts/projection/material";

const projection = Schema.decodeUnknownSync(MaterialLessonProjectionSchema)({
  contentKey: "test:projection",
  kind: "subject-lesson",
  locale: "en",
  materialKey: "test.projection",
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
      "sha256:c1b77297f7acfbbd156f9bc31bde77a397932dbcd260dc140c4205a3e1c6ccbb"
    );
  });
});
