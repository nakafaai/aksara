import { assert, describe, expect, it } from "@effect/vitest";
import { Effect, Exit, Schema } from "effect";
import { ContentKeySchema } from "#contracts/ids";
import { ArtifactLocaleSchema } from "#contracts/locale";
import {
  canonicalizePublicationScope,
  GitPublicationScopeSchema,
  PublicationScopeSchema,
  publicationScopeSelectsContent,
  publicationScopeSelectsSnapshot,
  verifyGitPublicationScope,
} from "#contracts/release/snapshot/scope";

describe("publication scope", () => {
  it("decodes only non-empty canonical unique families", () => {
    const scope = Schema.decodeSync(PublicationScopeSchema)({
      families: ["article", "material"],
      snapshots: ["program", "tryout"],
    });
    expect(canonicalizePublicationScope(scope)).toEqual(scope);
    expect(publicationScopeSelectsSnapshot(scope, "program")).toBe(true);
    expect(publicationScopeSelectsSnapshot(scope, "quran")).toBe(false);

    const failures = [
      { families: [], snapshots: [] },
      { families: ["material", "material"], snapshots: [] },
      { families: ["question", "article"], snapshots: [] },
      { families: ["unknown"], snapshots: [] },
      { families: [], snapshots: ["program", "program"] },
      { families: [], snapshots: ["tryout", "quran"] },
      { families: [], snapshots: ["unknown"] },
    ].map((invalid) =>
      Schema.decodeUnknownExit(PublicationScopeSchema)(invalid)
    );
    expect(failures.every(Exit.isFailure)).toBe(true);
    const [emptyFailure] = failures;
    if (emptyFailure !== undefined && Exit.isFailure(emptyFailure)) {
      expect(String(emptyFailure.cause)).toContain(
        "Expected a non-empty publication scope in canonical unique order."
      );
    }
  });

  it("preserves predecessor bytes without adding them to new releases", () => {
    const current = Schema.decodeSync(PublicationScopeSchema)({
      families: ["article"],
      snapshots: [],
    });
    const predecessor = Schema.decodeSync(PublicationScopeSchema)({
      content: [
        {
          artifactLocale: "en",
          contentKey: "material:algebra",
          family: "material",
        },
      ],
      families: ["article"],
      snapshots: [],
    });

    expect(canonicalizePublicationScope(current)).toEqual({
      families: ["article"],
      snapshots: [],
    });
    expect(canonicalizePublicationScope(predecessor)).toEqual({
      content: [
        {
          artifactLocale: "en",
          contentKey: "material:algebra",
          family: "material",
        },
      ],
      families: ["article"],
      snapshots: [],
    });
    const selected = predecessor.content?.[0];
    assert.isDefined(selected);
    expect(publicationScopeSelectsContent(predecessor, selected)).toBe(true);
    expect(
      publicationScopeSelectsContent(predecessor, {
        ...selected,
        contentKey: ContentKeySchema.make("material:other"),
      })
    ).toBe(false);
    expect(
      publicationScopeSelectsContent(predecessor, {
        ...selected,
        artifactLocale: ArtifactLocaleSchema.make("id"),
      })
    ).toBe(false);
    expect(
      publicationScopeSelectsContent(predecessor, {
        ...selected,
        family: "question",
      })
    ).toBe(false);
    expect(
      publicationScopeSelectsContent(current, {
        ...selected,
        family: current.families[0] ?? selected.family,
      })
    ).toBe(true);
  });

  it.effect("rejects predecessor-only fields from new Git release scope", () =>
    Effect.gen(function* () {
      const current = yield* Schema.decodeEffect(PublicationScopeSchema)({
        families: ["article"],
        snapshots: [],
      });
      const predecessor = yield* Schema.decodeEffect(PublicationScopeSchema)({
        content: [],
        families: ["article"],
        snapshots: [],
      });

      expect(yield* verifyGitPublicationScope(current)).toEqual(
        GitPublicationScopeSchema.make(current)
      );
      const failure = yield* verifyGitPublicationScope(predecessor).pipe(
        Effect.flip
      );
      expect(failure._tag).toBe("GitPublicationScopeError");
    })
  );

  it("rejects noncanonical or overlapping predecessor identities", () => {
    const failures = [
      {
        content: [
          {
            artifactLocale: "id",
            contentKey: "material:algebra",
            family: "material",
          },
          {
            artifactLocale: "en",
            contentKey: "material:algebra",
            family: "material",
          },
        ],
        families: [],
        snapshots: [],
      },
      {
        content: [
          {
            artifactLocale: "en",
            contentKey: "material:algebra",
            family: "material",
          },
        ],
        families: ["material"],
        snapshots: [],
      },
    ].map((invalid) =>
      Schema.decodeUnknownExit(PublicationScopeSchema)(invalid)
    );

    expect(failures.every(Exit.isFailure)).toBe(true);
  });
});
