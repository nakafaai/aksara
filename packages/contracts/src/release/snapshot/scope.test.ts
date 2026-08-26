import { describe, expect, it } from "@effect/vitest";
import { Exit, Schema } from "effect";

import {
  canonicalizePublicationScope,
  PublicationScopeSchema,
  publicationScopeSelectsSnapshot,
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
  });

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
