import { Either, Schema } from "effect";
import { describe, expect, it } from "vitest";

import { HistoricalSignedContentReleaseSchema } from "#contracts/history/release";
import { canonicalizeHistoricalContentReleaseManifest } from "#contracts/history/release-bytes";
import {
  alternateHistoricalHash,
  decodeHistoricalEnvelope,
  emptyHistoricalSnapshotDigest,
  restoredHistoricalSnapshot,
  retainedRelease,
  retainedSnapshotId,
} from "#contracts/test/history";

describe("stored release contract", () => {
  it("preserves canonical historical scope and rollback field order", () => {
    const contentManifest = {
      ...retainedRelease.manifest,
      scope: {
        content: [
          { contentKey: "a", family: "article", locale: "en" },
          { contentKey: "a", family: "article", locale: "id" },
          { contentKey: "b", family: "article", locale: "en" },
          { contentKey: "a", family: "material", locale: "en" },
        ],
        families: ["question"],
        snapshots: ["tryout"],
      },
    };
    const allScopeManifest = {
      ...retainedRelease.manifest,
      scope: {
        content: [],
        families: ["article", "material", "question"],
        snapshots: ["program", "quran", "tryout"],
      },
    };
    const rollbackManifest = {
      ...retainedRelease.manifest,
      baseManifestHash: alternateHistoricalHash,
      baseReleaseId: "retained-parent",
      origin: { kind: "rollback", releaseId: "retained-parent" },
      snapshots: {
        ...retainedRelease.manifest.snapshots,
        tryout: restoredHistoricalSnapshot(),
      },
    };
    const decodedContent = Schema.decodeUnknownSync(
      HistoricalSignedContentReleaseSchema
    )({ ...retainedRelease, manifest: contentManifest });
    const decodedAll = Schema.decodeUnknownSync(
      HistoricalSignedContentReleaseSchema
    )({ ...retainedRelease, manifest: allScopeManifest });
    const decodedRollback = Schema.decodeUnknownSync(
      HistoricalSignedContentReleaseSchema
    )({ ...retainedRelease, manifest: rollbackManifest });

    expect(
      JSON.parse(
        canonicalizeHistoricalContentReleaseManifest(decodedContent.manifest)
      ).scope
    ).toEqual(contentManifest.scope);
    expect(decodedAll.manifest.scope.snapshots).toEqual([
      "program",
      "quran",
      "tryout",
    ]);
    expect(
      JSON.parse(
        canonicalizeHistoricalContentReleaseManifest(decodedRollback.manifest)
      ).origin
    ).toEqual(rollbackManifest.origin);
  });

  it("rejects every incoherent historical snapshot transition", () => {
    const invalidStates = [
      {
        ...retainedRelease.manifest.snapshots.program,
        resultSnapshotId: retainedSnapshotId,
      },
      {
        baseSnapshotId: retainedSnapshotId,
        mode: "inherit",
        resultSnapshotId: retainedSnapshotId,
        rowCount: 1,
        rowDigest: alternateHistoricalHash,
      },
      {
        baseSnapshotId: retainedSnapshotId,
        mode: "replace",
        resultSnapshotId: retainedSnapshotId,
        rowCount: 1,
        rowDigest: alternateHistoricalHash,
      },
      {
        baseSnapshotId: retainedSnapshotId,
        mode: "replace",
        resultSnapshotId: null,
        rowCount: 1,
        rowDigest: alternateHistoricalHash,
      },
      {
        baseSnapshotId: null,
        mode: "replace",
        resultSnapshotId: retainedSnapshotId,
        rowCount: 0,
        rowDigest: alternateHistoricalHash,
      },
      {
        baseSnapshotId: null,
        mode: "replace",
        resultSnapshotId: retainedSnapshotId,
        rowCount: 1,
        rowDigest: emptyHistoricalSnapshotDigest,
      },
      {
        baseSnapshotId: null,
        mode: "restore",
        resultSnapshotId: null,
        rowCount: 0,
        rowDigest: emptyHistoricalSnapshotDigest,
      },
      {
        baseSnapshotId: retainedSnapshotId,
        mode: "restore",
        resultSnapshotId: null,
        rowCount: 1,
        rowDigest: alternateHistoricalHash,
      },
    ];

    for (const program of invalidStates) {
      const result = decodeHistoricalEnvelope({
        ...retainedRelease.manifest,
        snapshots: { ...retainedRelease.manifest.snapshots, program },
      });
      expect(Either.isLeft(result)).toBe(true);
    }
    const message = decodeHistoricalEnvelope({
      ...retainedRelease.manifest,
      snapshots: {
        ...retainedRelease.manifest.snapshots,
        program: invalidStates[0],
      },
    });
    expect(Either.isLeft(message) ? String(message.left) : "").toContain(
      "Stored snapshot transition is not coherent."
    );
  });

  it("rejects noncanonical historical publication scopes", () => {
    const identity = { contentKey: "a", family: "article", locale: "en" };
    const invalidScopes = [
      { content: [], families: [], snapshots: [] },
      { content: [identity, identity], families: [], snapshots: [] },
      { content: [identity], families: ["article"], snapshots: [] },
      { content: [], families: ["material", "article"], snapshots: [] },
      { content: [], families: [], snapshots: ["tryout", "program"] },
    ];

    for (const scope of invalidScopes) {
      const result = decodeHistoricalEnvelope({
        ...retainedRelease.manifest,
        scope,
      });
      expect(Either.isLeft(result)).toBe(true);
    }
    const message = decodeHistoricalEnvelope({
      ...retainedRelease.manifest,
      scope: invalidScopes[0],
    });
    expect(Either.isLeft(message) ? String(message.left) : "").toContain(
      "Stored publication scope is not canonical."
    );
  });

  it("rejects incoherent historical release provenance", () => {
    const baseRelease = {
      ...retainedRelease.manifest,
      baseManifestHash: alternateHistoricalHash,
      baseReleaseId: "retained-parent",
    };
    const selectedRestore = {
      ...baseRelease,
      scope: { ...baseRelease.scope, snapshots: ["program", "tryout"] },
      snapshots: {
        ...baseRelease.snapshots,
        program: restoredHistoricalSnapshot(),
      },
    };
    const rollbackRelease = {
      ...baseRelease,
      origin: { kind: "rollback", releaseId: "retained-parent" },
      snapshots: {
        ...baseRelease.snapshots,
        tryout: restoredHistoricalSnapshot(),
      },
    };
    const invalidManifests = [
      {
        ...retainedRelease.manifest,
        baseManifestHash: alternateHistoricalHash,
      },
      { ...retainedRelease.manifest, baseReleaseId: "retained-parent" },
      { ...baseRelease, baseReleaseId: retainedRelease.manifest.releaseId },
      { ...retainedRelease.manifest, deleteCount: 1 },
      { ...retainedRelease.manifest, rollbackCount: 1 },
      {
        ...retainedRelease.manifest,
        scope: { ...retainedRelease.manifest.scope, snapshots: ["program"] },
      },
      { ...retainedRelease.manifest, baseResultCount: 1 },
      {
        ...retainedRelease.manifest,
        baseResultDigest: alternateHistoricalHash,
      },
      {
        ...retainedRelease.manifest,
        scope: {
          ...retainedRelease.manifest.scope,
          snapshots: ["program", "tryout"],
        },
        snapshots: {
          ...retainedRelease.manifest.snapshots,
          program: restoredHistoricalSnapshot(),
        },
      },
      selectedRestore,
      {
        ...rollbackRelease,
        origin: { kind: "rollback", releaseId: "another-parent" },
      },
      {
        ...baseRelease,
        origin: { kind: "rollback", releaseId: "retained-parent" },
      },
    ];

    for (const manifest of invalidManifests) {
      const result = decodeHistoricalEnvelope(manifest);
      expect(Either.isLeft(result)).toBe(true);
    }
    const message = decodeHistoricalEnvelope(invalidManifests[0]);
    expect(Either.isLeft(message) ? String(message.left) : "").toContain(
      "Stored release provenance is not coherent."
    );
  });
});
