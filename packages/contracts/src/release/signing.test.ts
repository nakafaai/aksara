import { createHash } from "node:crypto";
import { describe, expect, it } from "@effect/vitest";
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
    expect(canonical).toContain(`"scope":${JSON.stringify(manifest.scope)}`);
    expect(canonical).not.toContain('"scope":{"content"');
    expect(canonicalizeContentReleaseSigningInput(manifestHash, manifest)).toBe(
      `nakafa.aksara.localized-content-release\n${manifestHash}\n${canonical}`
    );
    expect(canonical).toContain('"activeAppLocales":["en","id","de"]');
  });

  it("preserves predecessor scope ordering in authenticated bytes", () => {
    const legacyManifest = {
      ...release.manifest,
      scope: {
        content: [],
        families: release.manifest.scope.families,
        snapshots: release.manifest.scope.snapshots,
      },
    };

    expect(canonicalizeContentReleaseManifest(legacyManifest)).toContain(
      '"scope":{"content":[],"families":["material"],"snapshots":["program"]}'
    );
  });
});
