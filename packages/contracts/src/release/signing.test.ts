import { createHash } from "node:crypto";
import { describe, expect, it } from "vitest";
import { Sha256HashSchema } from "#contracts/ids";
import {
  canonicalizeContentReleaseManifest,
  canonicalizeContentReleaseSigningInput,
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
    expect(canonicalizeContentReleaseSigningInput(manifestHash, manifest)).toBe(
      `nakafa.aksara.content-release.v1\n${manifestHash}\n${canonical}`
    );
  });
});
