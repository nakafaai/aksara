import { createHash, verify as verifyBytes } from "node:crypto";
import { describe, expect, it } from "@effect/vitest";
import { Schema } from "effect";
import { Sha256HashSchema } from "#contracts/ids";
import { EMPTY_RESULT_CATALOG_DIGEST } from "#contracts/release/result/spec";
import {
  canonicalizeContentReleaseManifest,
  canonicalizeContentReleaseSigningInput,
} from "#contracts/release/signing";
import { EMPTY_SNAPSHOT_ROW_DIGEST } from "#contracts/release/snapshot/spec";
import { ContentReleaseManifestSchema } from "#contracts/release/spec";
import { release } from "#contracts/test/request";
import { verificationManifest } from "#contracts/test/verification";
import { encodeJsonText } from "#contracts/text/json";

/** Test-only Ed25519 public key that verifies the pinned release signature below. */
const testPublicKeyPem = `-----BEGIN PUBLIC KEY-----
MCowBQYDK2VwAyEAgCI4g0xGIYe6KCmUuuCfBLq4QIP7z5P+Fd4dgGRbJF0=
-----END PUBLIC KEY-----
`;

/** Ed25519 signature of the pinned release signing input, made by the test-only key. */
// Record again: create a key, sign the same input, and replace the public key and signature literals.
const pinnedSignature =
  "nFwTAzLPhAPe7od0cRFc7rzVivz_3dYuoV0r7fBuRwxpQru7rJS9QyWio4yIHOiD_WycVo_U6F7RERDGDteMBw";

const genesisManifest = Schema.decodeSync(ContentReleaseManifestSchema)({
  activeAppLocales: ["en", "id", "de"],
  baseActiveAppLocales: null,
  baseManifestHash: null,
  baseReleaseId: null,
  baseResultCount: 0,
  baseResultDigest: EMPTY_RESULT_CATALOG_DIGEST,
  deleteCount: 1,
  format: "localized-content-release",
  itemCount: 2,
  itemsDigest: `sha256:${"1".repeat(64)}`,
  origin: { kind: "git", sha: "0123456789abcdef0123456789abcdef01234567" },
  projectionCount: 1,
  projectionDigest: `sha256:${"2".repeat(64)}`,
  releaseId: "test-release-genesis",
  rendererManifestHash: `sha256:${"3".repeat(64)}`,
  resultCount: 1,
  resultDigest: `sha256:${"4".repeat(64)}`,
  rollbackCount: 2,
  rollbackDigest: `sha256:${"5".repeat(64)}`,
  routeCount: 1,
  routeDigest: `sha256:${"6".repeat(64)}`,
  scope: { families: ["material"], snapshots: ["program"] },
  snapshots: {
    program: {
      baseSnapshotId: null,
      mode: "replace",
      resultSnapshotId: `sha256:${"7".repeat(64)}`,
      rowCount: 1,
      rowDigest: `sha256:${"8".repeat(64)}`,
    },
    quran: {
      baseSnapshotId: null,
      mode: "inherit",
      resultSnapshotId: null,
      rowCount: 0,
      rowDigest: EMPTY_SNAPSHOT_ROW_DIGEST,
    },
    tryout: {
      baseSnapshotId: null,
      mode: "inherit",
      resultSnapshotId: null,
      rowCount: 0,
      rowDigest: EMPTY_SNAPSHOT_ROW_DIGEST,
    },
  },
  upsertCount: 1,
});

const rollbackManifest = Schema.decodeSync(ContentReleaseManifestSchema)({
  activeAppLocales: ["en", "id"],
  baseActiveAppLocales: ["en", "id"],
  baseManifestHash: `sha256:${"b".repeat(64)}`,
  baseReleaseId: "release-active",
  baseResultCount: 1,
  baseResultDigest: `sha256:${"c".repeat(64)}`,
  deleteCount: 1,
  format: "localized-content-release",
  itemCount: 2,
  itemsDigest: `sha256:${"d".repeat(64)}`,
  origin: { kind: "rollback", releaseId: "release-active" },
  projectionCount: 1,
  projectionDigest: `sha256:${"e".repeat(64)}`,
  releaseId: "test-release-recovery",
  rendererManifestHash: `sha256:${"f".repeat(64)}`,
  resultCount: 1,
  resultDigest: `sha256:${"a".repeat(64)}`,
  rollbackCount: 2,
  rollbackDigest: `sha256:${"1".repeat(64)}`,
  routeCount: 0,
  routeDigest: `sha256:${"2".repeat(64)}`,
  scope: { families: ["material"], snapshots: ["tryout"] },
  snapshots: {
    program: {
      baseSnapshotId: null,
      mode: "inherit",
      resultSnapshotId: null,
      rowCount: 0,
      rowDigest: EMPTY_SNAPSHOT_ROW_DIGEST,
    },
    quran: {
      baseSnapshotId: null,
      mode: "inherit",
      resultSnapshotId: null,
      rowCount: 0,
      rowDigest: EMPTY_SNAPSHOT_ROW_DIGEST,
    },
    tryout: {
      baseSnapshotId: `sha256:${"3".repeat(64)}`,
      mode: "restore",
      resultSnapshotId: null,
      rowCount: 0,
      rowDigest: EMPTY_SNAPSHOT_ROW_DIGEST,
    },
  },
  upsertCount: 1,
});

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
    expect(canonical).toContain(`"scope":${encodeJsonText(manifest.scope)}`);
    expect(canonical).not.toContain('"scope":{"content"');
    expect(canonicalizeContentReleaseSigningInput(manifestHash, manifest)).toBe(
      `nakafa.aksara.localized-content-release\n${manifestHash}\n${canonical}`
    );
    expect(canonical).toContain('"activeAppLocales":["en","id","de"]');
  });

  it("pins the canonical bytes of a genesis release manifest", () => {
    expect(canonicalizeContentReleaseManifest(genesisManifest)).toBe(
      '{"activeAppLocales":["en","id","de"],"baseActiveAppLocales":null,"baseManifestHash":null,"baseReleaseId":null,"baseResultCount":0,"baseResultDigest":"sha256:ed7d49e237dadbd311a1599264b00852ae18657d123c8f9cbc26c1c62c8f81cd","deleteCount":1,"format":"localized-content-release","itemCount":2,"itemsDigest":"sha256:1111111111111111111111111111111111111111111111111111111111111111","origin":{"kind":"git","sha":"0123456789abcdef0123456789abcdef01234567"},"projectionCount":1,"projectionDigest":"sha256:2222222222222222222222222222222222222222222222222222222222222222","releaseId":"test-release-genesis","rendererManifestHash":"sha256:3333333333333333333333333333333333333333333333333333333333333333","resultCount":1,"resultDigest":"sha256:4444444444444444444444444444444444444444444444444444444444444444","rollbackCount":2,"rollbackDigest":"sha256:5555555555555555555555555555555555555555555555555555555555555555","routeCount":1,"routeDigest":"sha256:6666666666666666666666666666666666666666666666666666666666666666","scope":{"families":["material"],"snapshots":["program"]},"snapshots":{"program":{"baseSnapshotId":null,"mode":"replace","resultSnapshotId":"sha256:7777777777777777777777777777777777777777777777777777777777777777","rowCount":1,"rowDigest":"sha256:8888888888888888888888888888888888888888888888888888888888888888"},"quran":{"baseSnapshotId":null,"mode":"inherit","resultSnapshotId":null,"rowCount":0,"rowDigest":"sha256:eb27aa7f59e41b14a3f76d951c5a50cb954a19f3f6e6c44bc21a733f606e888f"},"tryout":{"baseSnapshotId":null,"mode":"inherit","resultSnapshotId":null,"rowCount":0,"rowDigest":"sha256:eb27aa7f59e41b14a3f76d951c5a50cb954a19f3f6e6c44bc21a733f606e888f"}},"upsertCount":1}'
    );
  });

  it("pins the canonical bytes of a rollback release manifest", () => {
    expect(canonicalizeContentReleaseManifest(rollbackManifest)).toBe(
      '{"activeAppLocales":["en","id"],"baseActiveAppLocales":["en","id"],"baseManifestHash":"sha256:bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb","baseReleaseId":"release-active","baseResultCount":1,"baseResultDigest":"sha256:cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc","deleteCount":1,"format":"localized-content-release","itemCount":2,"itemsDigest":"sha256:dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd","origin":{"kind":"rollback","releaseId":"release-active"},"projectionCount":1,"projectionDigest":"sha256:eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee","releaseId":"test-release-recovery","rendererManifestHash":"sha256:ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff","resultCount":1,"resultDigest":"sha256:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa","rollbackCount":2,"rollbackDigest":"sha256:1111111111111111111111111111111111111111111111111111111111111111","routeCount":0,"routeDigest":"sha256:2222222222222222222222222222222222222222222222222222222222222222","scope":{"families":["material"],"snapshots":["tryout"]},"snapshots":{"program":{"baseSnapshotId":null,"mode":"inherit","resultSnapshotId":null,"rowCount":0,"rowDigest":"sha256:eb27aa7f59e41b14a3f76d951c5a50cb954a19f3f6e6c44bc21a733f606e888f"},"quran":{"baseSnapshotId":null,"mode":"inherit","resultSnapshotId":null,"rowCount":0,"rowDigest":"sha256:eb27aa7f59e41b14a3f76d951c5a50cb954a19f3f6e6c44bc21a733f606e888f"},"tryout":{"baseSnapshotId":"sha256:3333333333333333333333333333333333333333333333333333333333333333","mode":"restore","resultSnapshotId":null,"rowCount":0,"rowDigest":"sha256:eb27aa7f59e41b14a3f76d951c5a50cb954a19f3f6e6c44bc21a733f606e888f"}},"upsertCount":1}'
    );
  });

  it("pins the domain-separated signing input of a genesis release manifest", () => {
    const manifestHash = Sha256HashSchema.make(`sha256:${"9".repeat(64)}`);

    expect(
      canonicalizeContentReleaseSigningInput(manifestHash, genesisManifest)
    ).toBe(
      'nakafa.aksara.localized-content-release\nsha256:9999999999999999999999999999999999999999999999999999999999999999\n{"activeAppLocales":["en","id","de"],"baseActiveAppLocales":null,"baseManifestHash":null,"baseReleaseId":null,"baseResultCount":0,"baseResultDigest":"sha256:ed7d49e237dadbd311a1599264b00852ae18657d123c8f9cbc26c1c62c8f81cd","deleteCount":1,"format":"localized-content-release","itemCount":2,"itemsDigest":"sha256:1111111111111111111111111111111111111111111111111111111111111111","origin":{"kind":"git","sha":"0123456789abcdef0123456789abcdef01234567"},"projectionCount":1,"projectionDigest":"sha256:2222222222222222222222222222222222222222222222222222222222222222","releaseId":"test-release-genesis","rendererManifestHash":"sha256:3333333333333333333333333333333333333333333333333333333333333333","resultCount":1,"resultDigest":"sha256:4444444444444444444444444444444444444444444444444444444444444444","rollbackCount":2,"rollbackDigest":"sha256:5555555555555555555555555555555555555555555555555555555555555555","routeCount":1,"routeDigest":"sha256:6666666666666666666666666666666666666666666666666666666666666666","scope":{"families":["material"],"snapshots":["program"]},"snapshots":{"program":{"baseSnapshotId":null,"mode":"replace","resultSnapshotId":"sha256:7777777777777777777777777777777777777777777777777777777777777777","rowCount":1,"rowDigest":"sha256:8888888888888888888888888888888888888888888888888888888888888888"},"quran":{"baseSnapshotId":null,"mode":"inherit","resultSnapshotId":null,"rowCount":0,"rowDigest":"sha256:eb27aa7f59e41b14a3f76d951c5a50cb954a19f3f6e6c44bc21a733f606e888f"},"tryout":{"baseSnapshotId":null,"mode":"inherit","resultSnapshotId":null,"rowCount":0,"rowDigest":"sha256:eb27aa7f59e41b14a3f76d951c5a50cb954a19f3f6e6c44bc21a733f606e888f"}},"upsertCount":1}'
    );
  });

  it("verifies the pinned Ed25519 signature over the exact release signing input", () => {
    const message = canonicalizeContentReleaseSigningInput(
      Sha256HashSchema.make(
        "sha256:3870397f05155a746ba3547365b857ced09710824de414458922b83d19dc8c56"
      ),
      verificationManifest
    );

    expect(
      verifyBytes(
        null,
        Buffer.from(message),
        testPublicKeyPem,
        Buffer.from(pinnedSignature, "base64url")
      )
    ).toBe(true);
    expect(
      verifyBytes(
        null,
        Buffer.from(message.replace("aksara", "aksarb")),
        testPublicKeyPem,
        Buffer.from(pinnedSignature, "base64url")
      )
    ).toBe(false);
  });
});
