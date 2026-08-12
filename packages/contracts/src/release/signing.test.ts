import { createHash } from "node:crypto";
import { Schema } from "effect";
import { describe, expect, it } from "vitest";
import { Sha256HashSchema } from "#contracts/ids";
import {
  CONTENT_RELEASE_V2_FORMAT,
  ContentReleaseManifestV2Schema,
} from "#contracts/release/manifest/v2";
import {
  canonicalizeContentReleaseManifest,
  canonicalizeContentReleaseManifestV2,
  canonicalizeContentReleaseSigningInput,
  canonicalizeContentReleaseV2SigningInput,
} from "#contracts/release/signing";
import { release } from "#contracts/test/request";

describe("release signing", () => {
  it("canonicalizes the fixed-size manifest and domain-separated signing input", () => {
    const { manifest } = release;
    const canonical = canonicalizeContentReleaseManifest(manifest);
    const manifestHash = Sha256HashSchema.make(
      `sha256:${createHash("sha256").update(canonical).digest("hex")}`
    );

    expect(canonical).not.toContain("test:content");
    expect(canonical).toContain(`"itemCount":${manifest.itemCount}`);
    expect(canonical).toContain(`"itemsDigest":"${manifest.itemsDigest}"`);
    expect(canonical).toContain(
      `"projectionCount":${manifest.projectionCount}`
    );
    expect(canonical).toContain(`"resultDigest":"${manifest.resultDigest}"`);
    expect(canonical).toContain(`"rollbackCount":${manifest.rollbackCount}`);
    expect(canonical).toContain(`"routeCount":${manifest.routeCount}`);
    expect(canonical).toContain(`"scope":${JSON.stringify(manifest.scope)}`);
    expect(canonicalizeContentReleaseSigningInput(manifestHash, manifest)).toBe(
      `nakafa.aksara.content-release.v1\n${manifestHash}\n${canonical}`
    );
  });

  it("binds active locales and editorial review evidence in v2", () => {
    const manifest = Schema.decodeUnknownSync(ContentReleaseManifestV2Schema)({
      activeAppLocales: ["en", "id"],
      ...release.manifest,
      editorialReviewDigest: `sha256:${"1".repeat(64)}`,
      format: CONTENT_RELEASE_V2_FORMAT,
    });
    const canonical = canonicalizeContentReleaseManifestV2(manifest);
    const manifestHash = Sha256HashSchema.make(
      `sha256:${createHash("sha256").update(canonical).digest("hex")}`
    );
    expect(canonical).toContain('"activeAppLocales":["en","id"]');
    expect(canonical).toContain(
      `"editorialReviewDigest":"${manifest.editorialReviewDigest}"`
    );
    expect(
      canonicalizeContentReleaseV2SigningInput(manifestHash, manifest)
    ).toBe(`nakafa.aksara.content-release.v2\n${manifestHash}\n${canonical}`);
  });
});
