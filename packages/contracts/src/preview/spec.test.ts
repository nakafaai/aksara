import { Schema } from "effect";
import { describe, expect, it } from "vitest";
import {
  LOCAL_PREVIEW_FORMAT,
  LocalPreviewManifestSchema,
  PreviewDocumentSchema,
  PreviewEventSchema,
  PreviewRepositorySchema,
} from "#contracts/preview/spec";

const repositories = {
  aksara: Schema.decodeUnknownSync(PreviewRepositorySchema)({
    dirty: true,
    sha: "a".repeat(40),
  }),
  nakafa: Schema.decodeUnknownSync(PreviewRepositorySchema)({
    dirty: false,
    sha: "b".repeat(40),
  }),
};
const document = Schema.decodeUnknownSync(PreviewDocumentSchema)({
  delivery: "public",
  rendererDomain: "mathematics",
  route: {
    contentKey:
      "material/lesson/mathematics/function-composition-inverse-function/function-concept",
    locale: "en",
    materialKey: "lesson.mathematics.function-composition-inverse-function",
    order: 5,
    publicPath:
      "subjects/mathematics/function-composition-inverse-function/function-concept",
    sectionKey: "function-concept",
  },
  sourcePath:
    "packages/corpus/material/lesson/mathematics/function-composition/inverse-function/function-concept/en.mdx",
});
const base = {
  document,
  format: LOCAL_PREVIEW_FORMAT,
  repositories,
};

describe("local preview contracts", () => {
  it("decodes every complete fail-closed manifest state", () => {
    const manifests = [
      { ...base, revision: 1, status: "pending" },
      {
        ...base,
        artifactHash: `sha256:${"c".repeat(64)}`,
        artifactPath: `/v1/artifacts/sha256%3A${"c".repeat(64)}`,
        projection: {
          ...document.route,
          kind: "subject-lesson",
          metadata: {
            authors: [{ name: "Nabil Akbarazzima Fatih" }],
            date: "2025-04-27",
            title: "Function Concept",
          },
          parentPath:
            "subjects/mathematics/function-composition-inverse-function",
          sitemap: true,
        },
        rendererManifestHash: `sha256:${"d".repeat(64)}`,
        revision: 2,
        status: "ready",
      },
      {
        ...base,
        failure: {
          code: "MaterialReadError",
          message: "The selected real document is unavailable.",
        },
        revision: 3,
        status: "failed",
      },
    ];

    expect(
      manifests.map((manifest) =>
        Schema.decodeUnknownSync(LocalPreviewManifestSchema)(manifest)
      )
    ).toEqual(manifests);
  });

  it("rejects incomplete state and decodes the minimal update event", () => {
    expect(() =>
      Schema.decodeUnknownSync(LocalPreviewManifestSchema)({
        ...base,
        artifactHash: `sha256:${"c".repeat(64)}`,
        revision: 2,
        status: "ready",
      })
    ).toThrow();
    expect(() =>
      Schema.decodeUnknownSync(LocalPreviewManifestSchema)({
        ...base,
        artifactHash: `sha256:${"c".repeat(64)}`,
        artifactPath: "/v1/artifacts/../manifest",
        projection: {
          ...document.route,
          kind: "subject-lesson",
          metadata: {
            authors: [{ name: "Nabil Akbarazzima Fatih" }],
            date: "2025-04-27",
            title: "Function Concept",
          },
          parentPath:
            "subjects/mathematics/function-composition-inverse-function",
          sitemap: true,
        },
        rendererManifestHash: `sha256:${"d".repeat(64)}`,
        revision: 2,
        status: "ready",
      })
    ).toThrow();
    expect(
      Schema.decodeUnknownSync(PreviewEventSchema)({
        format: LOCAL_PREVIEW_FORMAT,
        revision: 3,
        status: "failed",
      })
    ).toEqual({
      format: LOCAL_PREVIEW_FORMAT,
      revision: 3,
      status: "failed",
    });
  });
});
