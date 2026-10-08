import { describe, expect, it } from "@effect/vitest";
import { Schema } from "effect";
import { hashContentProjection } from "#contracts/projection/hash";
import { MaterialLessonProjectionSchema } from "#contracts/projection/material";
import { QuestionBodyProjectionSchema } from "#contracts/projection/question";
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

describe("pinned content projection hashes", () => {
  it("pins the one-shot identity of a material body", () => {
    expect(
      hashContentProjection(
        Schema.decodeSync(MaterialLessonProjectionSchema)({
          appLocale: "en",
          artifactLocale: "en",
          contentKey: "test:projection",
          graph: {
            alignmentId:
              "alignment:material:lesson:test:material-section:test:material:test-lesson",
            assetId:
              "asset:en:material:lesson:test:material-section:test:material:test-lesson",
            conceptId: "concept:material:lesson:test:material",
            learningObjectId: "lo:material-section:test:material:test-lesson",
            lensId: "lens:material:lesson:test",
          },
          kind: "subject-lesson",
          materialKey: "lesson.test.material",
          metadata: {
            authors: [{ name: "Test Author" }],
            datePublished: "2026-01-01",
            title: "Pecahan Ñandú café",
          },
          order: 1,
          parentPath: "subjects/test/material",
          publicPath: "subjects/test/material/lesson",
          sectionKey: "test-lesson",
          sitemap: true,
          topicTitle: "Test Material",
        })
      )
    ).toBe(
      "sha256:f8c1dbb0dd1ae067eb419899063b63b5d5a651f05b4455190277e72c1e077c1a"
    );
  });

  it("pins the one-shot identity of a question answer body", () => {
    expect(
      hashContentProjection(
        Schema.decodeSync(QuestionBodyProjectionSchema)({
          artifactLocale: "en",
          bodyKind: "answer",
          contentKey:
            "question-bank/tryout/test-country/test-exam/test-section-2/test-set/question-1/answer",
          kind: "question-body",
          metadata: {
            authors: [{ name: "Test Author" }],
            datePublished: "2026-01-01",
            title: "Pecahan Ñandú café",
          },
          peerContentKey:
            "question-bank/tryout/test-country/test-exam/test-section-2/test-set/question-1/question",
          questionKey:
            "question-bank/tryout/test-country/test-exam/test-section-2/test-set/question-1",
          questionNumber: 1,
          setKey:
            "question-bank/tryout/test-country/test-exam/test-section-2/test-set",
        })
      )
    ).toBe(
      "sha256:11605ff105af573f195e31d2d9732cec092176c5f8f8edfae65416422ce905ac"
    );
  });
});
