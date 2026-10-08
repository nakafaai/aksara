import { describe, expect, it } from "@effect/vitest";
import { Effect, Schema } from "effect";
import { hashContentReleaseManifest } from "#contracts/release/hash";
import { EMPTY_RESULT_CATALOG_DIGEST } from "#contracts/release/result/spec";
import { EMPTY_SNAPSHOT_ROW_DIGEST } from "#contracts/release/snapshot/spec";
import { ContentReleaseManifestSchema } from "#contracts/release/spec";
import { release } from "#contracts/test/request";

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
  origin: { kind: "git", sha: "fedcba9876543210fedcba9876543210fedcba98" },
  projectionCount: 1,
  projectionDigest: `sha256:${"2".repeat(64)}`,
  releaseId: "test-release-hash-genesis",
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
  baseReleaseId: "release-hash-active",
  baseResultCount: 1,
  baseResultDigest: `sha256:${"c".repeat(64)}`,
  deleteCount: 1,
  format: "localized-content-release",
  itemCount: 2,
  itemsDigest: `sha256:${"d".repeat(64)}`,
  origin: { kind: "rollback", releaseId: "release-hash-active" },
  projectionCount: 1,
  projectionDigest: `sha256:${"e".repeat(64)}`,
  releaseId: "test-release-hash-recovery",
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

describe("release manifest hash", () => {
  it.effect("binds whole-family publication authorization", () =>
    Effect.gen(function* () {
      const { manifest } = release;
      const materialHash = yield* hashContentReleaseManifest(manifest);
      const articleHash = yield* hashContentReleaseManifest({
        ...manifest,
        scope: {
          families: ["article"],
          snapshots: manifest.scope.snapshots,
        },
      });

      expect(articleHash).not.toBe(materialHash);
    })
  );

  it.effect("binds active application locales", () =>
    Effect.gen(function* () {
      const manifest = yield* Schema.decodeEffect(ContentReleaseManifestSchema)(
        {
          ...release.manifest,
          activeAppLocales: ["en", "id"],
        }
      );
      const changedHash = yield* hashContentReleaseManifest(manifest);
      const releaseHash = yield* hashContentReleaseManifest(release.manifest);

      expect(changedHash).not.toBe(releaseHash);
    })
  );

  it.effect("pins the sha256 identity of a genesis release manifest", () =>
    Effect.gen(function* () {
      expect(yield* hashContentReleaseManifest(genesisManifest)).toBe(
        "sha256:679a9185a64759149272b896abda93830f235c755782068fcf1c2a9c7840e757"
      );
    })
  );

  it.effect("pins the sha256 identity of a rollback release manifest", () =>
    Effect.gen(function* () {
      expect(yield* hashContentReleaseManifest(rollbackManifest)).toBe(
        "sha256:2985fde171e3ade7c4dbc279769b423b59fa18afcdc2990d45f2d4d2cd76d9aa"
      );
    })
  );
});
