import { Either, ParseResult, Schema } from "effect";
import { describe, expect, it } from "vitest";

import { AppLocaleSchema } from "#contracts/locale";
import {
  CONTENT_RELEASE_V2_FORMAT,
  ContentReleaseManifestV2Schema,
  releaseActivatesAppLocale,
  SignedContentReleaseV2Schema,
  SignedContentReleaseWireSchema,
} from "#contracts/release/manifest/v2";
import { release } from "#contracts/test/request";

const currentManifest = Schema.decodeUnknownSync(
  ContentReleaseManifestV2Schema
)({
  activeAppLocales: ["en", "id"],
  ...release.manifest,
  editorialReviewDigest: `sha256:${"1".repeat(64)}`,
  format: CONTENT_RELEASE_V2_FORMAT,
});

const currentRelease = SignedContentReleaseV2Schema.make({
  ...release,
  manifest: currentManifest,
});

describe("release manifest v2", () => {
  it("decodes historical and current releases without widening history", () => {
    expect(
      Schema.decodeUnknownSync(SignedContentReleaseWireSchema)(release).manifest
        .releaseId
    ).toBe(release.manifest.releaseId);
    expect(
      Schema.decodeUnknownSync(SignedContentReleaseWireSchema)(currentRelease)
        .manifest.releaseId
    ).toBe(release.manifest.releaseId);
  });

  it("binds a canonical active locale subset and editorial digest", () => {
    expect(currentManifest.activeAppLocales).toEqual(["en", "id"]);
    expect(currentManifest.editorialReviewDigest).toBe(
      `sha256:${"1".repeat(64)}`
    );
    expect(
      releaseActivatesAppLocale(currentRelease, AppLocaleSchema.make("en"))
    ).toBe(true);
    expect(
      releaseActivatesAppLocale(currentRelease, AppLocaleSchema.make("de"))
    ).toBe(false);
  });

  it("rejects unordered or duplicated active locales", () => {
    for (const activeAppLocales of [
      ["id", "en"],
      ["en", "en"],
    ] as const) {
      expect(
        Either.isLeft(
          Schema.decodeUnknownEither(ContentReleaseManifestV2Schema)({
            ...currentManifest,
            activeAppLocales,
          })
        )
      ).toBe(true);
    }
  });

  it("reports an incoherent current release origin", () => {
    const result = Schema.decodeUnknownEither(ContentReleaseManifestV2Schema)({
      ...currentManifest,
      origin: {
        kind: "rollback",
        releaseId: currentManifest.releaseId,
      },
    });
    if (Either.isRight(result)) {
      throw new Error("Expected an incoherent current release origin.");
    }

    expect(ParseResult.TreeFormatter.formatErrorSync(result.left)).toContain(
      "Expected a new release identity and a coherent source origin."
    );
  });
});
