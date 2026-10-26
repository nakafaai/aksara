import { describe, expect, it } from "@effect/vitest";
import { Array as Arr, Exit, Schema } from "effect";
import { CorpusSourcePathSchema, PublicPathSchema } from "#contracts/ids";
import {
  LOCAL_PREVIEW_FORMAT,
  LocalPreviewManifestSchema,
  PreviewEventSchema,
} from "#contracts/preview/spec";
import {
  testArticleDocument,
  testArticleProjection,
  testMaterialDocument,
  testMaterialProjection,
  testPageDocument,
  testPageProjection,
} from "#contracts/test/preview/documents";
import {
  previewArtifact,
  previewManifestBase,
  previewRepositories,
  rejectsPreviewManifest,
} from "#contracts/test/preview/manifest";

const articleArtifact = previewArtifact(testArticleProjection, "c");
const materialArtifact = previewArtifact(testMaterialProjection, "d");
const pageArtifact = previewArtifact(testPageProjection, "1");
const otherPageSourcePath = CorpusSourcePathSchema.make(
  "packages/corpus/pages/security-policy/en.mdx"
);

describe("local preview manifest", () => {
  it("decodes every fail-closed state", () => {
    const pending = {
      ...previewManifestBase(testArticleDocument),
      revision: 1,
      status: "pending",
    };
    const ready = {
      ...previewManifestBase(testArticleDocument),
      artifacts: [articleArtifact],
      rendererManifestHash: `sha256:${"1".repeat(64)}`,
      revision: 2,
      status: "ready",
    };
    const failed = {
      ...previewManifestBase(testArticleDocument),
      failure: {
        code: "TestCompileError",
        message: "The test document did not compile.",
      },
      revision: 3,
      status: "failed",
    };

    expect(
      Arr.map([pending, ready, failed], (manifest) =>
        Schema.decodeUnknownSync(LocalPreviewManifestSchema)(manifest)
      )
    ).toEqual([pending, ready, failed]);
  });

  it("accepts one artifact for article, material, and page documents", () => {
    const readyStates = Arr.map(
      [
        { artifacts: [articleArtifact], document: testArticleDocument },
        { artifacts: [materialArtifact], document: testMaterialDocument },
        { artifacts: [pageArtifact], document: testPageDocument },
      ],
      ({ artifacts, document }, index) => ({
        artifacts,
        document,
        format: LOCAL_PREVIEW_FORMAT,
        rendererManifestHash: `sha256:${String(index + 2).repeat(64)}`,
        repositories: previewRepositories,
        revision: index + 1,
        status: "ready",
      })
    );

    expect(
      Arr.map(readyStates, (manifest) =>
        Schema.decodeUnknownSync(LocalPreviewManifestSchema)(manifest)
      )
    ).toEqual(readyStates);
  });

  it("rejects unbounded, mismatched, and incoherently addressed artifacts", () => {
    const base = {
      ...previewManifestBase(testArticleDocument),
      rendererManifestHash: `sha256:${"7".repeat(64)}`,
      revision: 1,
      status: "ready",
    };
    const invalid = [
      { ...base, artifacts: [] },
      {
        ...base,
        artifacts: [articleArtifact, articleArtifact, articleArtifact],
      },
      { ...base, artifacts: [materialArtifact] },
      { ...base, artifacts: [articleArtifact, articleArtifact] },
      {
        ...base,
        artifacts: [
          {
            ...articleArtifact,
            artifactPath: "/artifacts/other",
          },
        ],
      },
    ];

    expect(Arr.every(invalid, rejectsPreviewManifest)).toBe(true);
    expect(
      String(Schema.decodeUnknownExit(LocalPreviewManifestSchema)(invalid[4]))
    ).toContain("Expected the artifact path to match its signed hash.");
  });

  it("rejects projection identity drift in each document family", () => {
    const cases = [
      {
        artifacts: [
          previewArtifact(
            {
              ...testPageProjection,
              publicPath: PublicPathSchema.make("security-policy"),
            },
            "4"
          ),
        ],
        document: testPageDocument,
      },
      {
        artifacts: [
          previewArtifact(
            {
              ...testPageProjection,
              sourcePath: otherPageSourcePath,
            },
            "5"
          ),
        ],
        document: testPageDocument,
      },
      {
        artifacts: [
          previewArtifact(
            {
              ...testArticleProjection,
              publicPath: PublicPathSchema.make("articles/politics/other"),
            },
            "8"
          ),
        ],
        document: testArticleDocument,
      },
      {
        artifacts: [
          previewArtifact({ ...testMaterialProjection, order: 2 }, "9"),
        ],
        document: testMaterialDocument,
      },
      {
        artifacts: [
          previewArtifact(
            {
              ...testMaterialProjection,
              topicTitle: "Different test material",
            },
            "0"
          ),
        ],
        document: testMaterialDocument,
      },
    ];

    const manifests = Arr.map(cases, ({ artifacts, document }) => ({
      artifacts,
      document,
      format: LOCAL_PREVIEW_FORMAT,
      rendererManifestHash: `sha256:${"a".repeat(64)}`,
      repositories: previewRepositories,
      revision: 1,
      status: "ready",
    }));

    expect(Arr.every(manifests, rejectsPreviewManifest)).toBe(true);
    expect(
      String(Schema.decodeUnknownExit(LocalPreviewManifestSchema)(manifests[3]))
    ).toContain(
      "Expected preview artifacts to match the selected document exactly."
    );
  });

  it("decodes only the derived route in update events", () => {
    const event = {
      format: LOCAL_PREVIEW_FORMAT,
      revision: 3,
      route: {
        appLocale: "en",
        publicPath: "articles/politics/test-article",
      },
      status: "failed",
    };

    expect(Schema.decodeUnknownSync(PreviewEventSchema)(event)).toEqual(event);
    expect(
      Exit.isFailure(
        Schema.decodeUnknownExit(PreviewEventSchema, {
          onExcessProperty: "error",
        })({ ...event, document: testArticleDocument })
      )
    ).toBe(true);
  });
});
