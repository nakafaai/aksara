import { describe, expect, it } from "@effect/vitest";
import { Exit, Schema } from "effect";
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
} from "#contracts/test/preview";
import {
  previewArtifact,
  previewManifestBase,
  previewRepositories,
  rejectsPreviewManifest,
} from "#contracts/test/preview-manifest";
import {
  testAnswerDocument,
  testAnswerProjection,
  testAssessedAnswerDocument,
  testAssessedAnswerProjection,
  testGermanPromptProjection,
  testPromptDocument,
  testPromptProjection,
} from "#contracts/test/preview-question";

const articleArtifact = previewArtifact(testArticleProjection, "c");
const materialArtifact = previewArtifact(testMaterialProjection, "d");
const pageArtifact = previewArtifact(testPageProjection, "1");
const promptArtifact = previewArtifact(testPromptProjection, "e");
const answerArtifact = previewArtifact(testAnswerProjection, "f");
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
      [pending, ready, failed].map((manifest) =>
        Schema.decodeUnknownSync(LocalPreviewManifestSchema)(manifest)
      )
    ).toEqual([pending, ready, failed]);
  });

  it("accepts one artifact for article, material, page, and prompt documents", () => {
    const readyStates = [
      {
        artifacts: [articleArtifact],
        document: testArticleDocument,
      },
      {
        artifacts: [materialArtifact],
        document: testMaterialDocument,
      },
      {
        artifacts: [pageArtifact],
        document: testPageDocument,
      },
      {
        artifacts: [promptArtifact],
        document: testPromptDocument,
      },
    ].map(({ artifacts, document }, index) => ({
      artifacts,
      document,
      format: LOCAL_PREVIEW_FORMAT,
      rendererManifestHash: `sha256:${String(index + 2).repeat(64)}`,
      repositories: previewRepositories,
      revision: index + 1,
      status: "ready",
    }));

    expect(
      readyStates.map((manifest) =>
        Schema.decodeUnknownSync(LocalPreviewManifestSchema)(manifest)
      )
    ).toEqual(readyStates);
  });

  it("requires exactly ordered prompt and answer artifacts for answer review", () => {
    const manifest = {
      artifacts: [promptArtifact, answerArtifact],
      document: testAnswerDocument,
      format: LOCAL_PREVIEW_FORMAT,
      rendererManifestHash: `sha256:${"6".repeat(64)}`,
      repositories: previewRepositories,
      revision: 1,
      status: "ready",
    };

    expect(
      Schema.decodeUnknownSync(LocalPreviewManifestSchema)(manifest)
    ).toEqual(manifest);
    expect(
      [
        { ...manifest, artifacts: [answerArtifact, promptArtifact] },
        { ...manifest, artifacts: [answerArtifact] },
        { ...manifest, artifacts: [promptArtifact] },
      ].every(rejectsPreviewManifest)
    ).toBe(true);
  });

  it("pairs an assessed-language prompt with its localized answer", () => {
    const localizedAnswerArtifact = previewArtifact(
      testAssessedAnswerProjection,
      "1"
    );
    const manifest = {
      artifacts: [promptArtifact, localizedAnswerArtifact],
      document: testAssessedAnswerDocument,
      format: LOCAL_PREVIEW_FORMAT,
      rendererManifestHash: `sha256:${"2".repeat(64)}`,
      repositories: previewRepositories,
      revision: 1,
      status: "ready",
    } as const;

    expect(Schema.decodeSync(LocalPreviewManifestSchema)(manifest)).toEqual(
      manifest
    );
    expect(
      rejectsPreviewManifest({
        ...manifest,
        artifacts: [
          previewArtifact(testGermanPromptProjection, "3"),
          localizedAnswerArtifact,
        ],
      })
    ).toBe(true);
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
            artifactPath: "/v1/artifacts/other",
          },
        ],
      },
    ];

    expect(invalid.every(rejectsPreviewManifest)).toBe(true);
    expect(
      String(Schema.decodeUnknownExit(LocalPreviewManifestSchema)(invalid[1]))
    ).toContain("Expected at most two preview artifacts.");
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
      {
        artifacts: [answerArtifact],
        document: testPromptDocument,
      },
    ];

    const manifests = cases.map(({ artifacts, document }) => ({
      artifacts,
      document,
      format: LOCAL_PREVIEW_FORMAT,
      rendererManifestHash: `sha256:${"a".repeat(64)}`,
      repositories: previewRepositories,
      revision: 1,
      status: "ready",
    }));

    expect(manifests.every(rejectsPreviewManifest)).toBe(true);
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
