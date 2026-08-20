import { Exit, Schema } from "effect";
import { describe, expect, it } from "vitest";
import { PublicPathSchema } from "#contracts/ids";
import {
  LOCAL_PREVIEW_FORMAT,
  LocalPreviewManifestSchema,
  type PreviewArtifact,
  PreviewEventSchema,
  PreviewRepositorySchema,
} from "#contracts/preview/spec";
import {
  testAnswerDocument,
  testAnswerProjection,
  testArticleDocument,
  testArticleProjection,
  testAssessedAnswerDocument,
  testAssessedAnswerProjection,
  testGermanPromptProjection,
  testMaterialDocument,
  testMaterialProjection,
  testPromptDocument,
  testPromptProjection,
} from "#contracts/test/preview";

const repositories = {
  aksara: Schema.decodeSync(PreviewRepositorySchema)({
    dirty: true,
    sha: "a".repeat(40),
  }),
  nakafa: Schema.decodeSync(PreviewRepositorySchema)({
    dirty: false,
    sha: "b".repeat(40),
  }),
};

/** Builds one content-addressed artifact reference for a test projection. */
function artifact(
  projection: PreviewArtifact["projection"],
  hashCharacter: string
) {
  const artifactHash = `sha256:${hashCharacter.repeat(64)}` as const;
  return {
    artifactHash,
    artifactPath: `/v1/artifacts/${encodeURIComponent(artifactHash)}`,
    projection,
  };
}

const articleArtifact = artifact(testArticleProjection, "c");
const materialArtifact = artifact(testMaterialProjection, "d");
const promptArtifact = artifact(testPromptProjection, "e");
const answerArtifact = artifact(testAnswerProjection, "f");

/** Builds the state shared by every exact manifest variant in this test. */
function manifestBase(document: typeof testArticleDocument) {
  return {
    document,
    format: LOCAL_PREVIEW_FORMAT,
    repositories,
  };
}

/** Reports whether strict manifest decoding rejects one candidate. */
function rejectsManifest(candidate: unknown) {
  return Exit.isFailure(
    Schema.decodeUnknownExit(LocalPreviewManifestSchema, {
      onExcessProperty: "error",
    })(candidate)
  );
}

describe("local preview manifest", () => {
  it("decodes every fail-closed state", () => {
    const pending = {
      ...manifestBase(testArticleDocument),
      revision: 1,
      status: "pending",
    };
    const ready = {
      ...manifestBase(testArticleDocument),
      artifacts: [articleArtifact],
      rendererManifestHash: `sha256:${"1".repeat(64)}`,
      revision: 2,
      status: "ready",
    };
    const failed = {
      ...manifestBase(testArticleDocument),
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

  it("accepts one artifact for article, material, and prompt documents", () => {
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
        artifacts: [promptArtifact],
        document: testPromptDocument,
      },
    ].map(({ artifacts, document }, index) => ({
      artifacts,
      document,
      format: LOCAL_PREVIEW_FORMAT,
      rendererManifestHash: `sha256:${String(index + 2).repeat(64)}`,
      repositories,
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
      repositories,
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
      ].every(rejectsManifest)
    ).toBe(true);
  });

  it("pairs an assessed-language prompt with its localized answer", () => {
    const localizedAnswerArtifact = artifact(testAssessedAnswerProjection, "1");
    const manifest = {
      artifacts: [promptArtifact, localizedAnswerArtifact],
      document: testAssessedAnswerDocument,
      format: LOCAL_PREVIEW_FORMAT,
      rendererManifestHash: `sha256:${"2".repeat(64)}`,
      repositories,
      revision: 1,
      status: "ready",
    } as const;

    expect(Schema.decodeSync(LocalPreviewManifestSchema)(manifest)).toEqual(
      manifest
    );
    expect(
      rejectsManifest({
        ...manifest,
        artifacts: [
          artifact(testGermanPromptProjection, "3"),
          localizedAnswerArtifact,
        ],
      })
    ).toBe(true);
  });

  it("rejects unbounded, mismatched, and incoherently addressed artifacts", () => {
    const base = {
      ...manifestBase(testArticleDocument),
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

    expect(invalid.every(rejectsManifest)).toBe(true);
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
          artifact(
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
        artifacts: [artifact({ ...testMaterialProjection, order: 2 }, "9")],
        document: testMaterialDocument,
      },
      {
        artifacts: [
          artifact(
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

    expect(
      cases.every(({ artifacts, document }) =>
        rejectsManifest({
          artifacts,
          document,
          format: LOCAL_PREVIEW_FORMAT,
          rendererManifestHash: `sha256:${"a".repeat(64)}`,
          repositories,
          revision: 1,
          status: "ready",
        })
      )
    ).toBe(true);
    expect(
      String(
        Schema.decodeUnknownExit(LocalPreviewManifestSchema)({
          ...cases[2],
          format: LOCAL_PREVIEW_FORMAT,
          rendererManifestHash: `sha256:${"a".repeat(64)}`,
          repositories,
          revision: 1,
          status: "ready",
        })
      )
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
