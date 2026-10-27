import { describe, expect, it } from "@effect/vitest";
import { Effect, Schema } from "effect";
import { hashContentProjection } from "#contracts/projection/hash";
import { MaterialLessonProjectionSchema } from "#contracts/projection/material";
import { withNextDigestFailure } from "#contracts/test/digest";
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

describe("content projection hash failures", () => {
  it.effect("maps a failed digest to the typed projection error", () =>
    Effect.gen(function* () {
      const error = yield* withNextDigestFailure(
        hashContentProjection(projection).pipe(Effect.flip)
      );

      expect(error._tag).toBe("ContentProjectionHashError");
    })
  );
});

describe("content projection hash", () => {
  it.effect("hashes canonical projection bytes with one stable identity", () =>
    Effect.gen(function* () {
      expect(yield* hashContentProjection(projection)).toBe(
        "sha256:e47a457bb7c8350b585458b6b16d7ddb7936cc3435764b339aaeb8add2ba3c2f"
      );
    })
  );
});

describe("pinned content projection hashes", () => {
  it.effect("pins the one-shot identity of a material body", () =>
    Effect.gen(function* () {
      expect(
        yield* hashContentProjection(
          yield* Schema.decodeEffect(MaterialLessonProjectionSchema)({
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
    })
  );
});
