import { Exit, Schema } from "effect";
import { describe, expect, it } from "vitest";
import {
  ActiveContentReleaseSchema,
  ContentReleaseCurrentSchema,
  RecoveryLookupSchema,
  StagedRollbackContentReleaseSchema,
} from "#contracts/release/current";
import {
  invertContentSnapshots,
  restoreContentSnapshot,
} from "#contracts/release/snapshot/spec";
import {
  RollbackSignedContentReleaseSchema,
  SignedContentReleaseSchema,
} from "#contracts/release/spec";
import {
  recoveryRelease as completedRecovery,
  hash,
  release,
  rendererManifest,
  replacementSnapshots,
} from "#contracts/test/request";
import { receiptFor } from "#contracts/test/response";

const otherHash = `sha256:${"f".repeat(64)}`;
/** Decodes the authoritative state with exact-property enforcement. */
const decodeCurrent = Schema.decodeUnknownExit(ContentReleaseCurrentSchema);
/** Strictly checks current-state schema acceptance. */
function accepts(input: unknown) {
  const result = decodeCurrent(input, { onExcessProperty: "error" });
  return Exit.isSuccess(result);
}
/** Builds one completed active release from its signed bundle. */
function activeRelease(signedRelease: typeof release = release) {
  return {
    receipt: receiptFor(signedRelease),
    release: signedRelease,
    rendererManifest,
  };
}
/** Builds one candidate derived from the shared active release. */
function candidateRelease() {
  return Schema.decodeSync(SignedContentReleaseSchema)({
    ...release,
    manifest: {
      ...release.manifest,
      baseActiveAppLocales: release.manifest.activeAppLocales,
      baseManifestHash: release.manifestHash,
      baseReleaseId: release.manifest.releaseId,
      baseResultCount: release.manifest.resultCount,
      baseResultDigest: release.manifest.resultDigest,
      releaseId: "release-candidate",
    },
    manifestHash: `sha256:${"d".repeat(64)}`,
  });
}
/** Builds the signed inverse that restores one candidate's base result. */
function recoveryRelease(target = candidateRelease()) {
  return Schema.decodeSync(RollbackSignedContentReleaseSchema)({
    ...release,
    manifest: {
      ...release.manifest,
      baseActiveAppLocales: target.manifest.activeAppLocales,
      baseManifestHash: target.manifestHash,
      baseReleaseId: target.manifest.releaseId,
      baseResultCount: target.manifest.resultCount,
      baseResultDigest: target.manifest.resultDigest,
      origin: { kind: "rollback", releaseId: target.manifest.releaseId },
      releaseId: "release-recovery",
      resultCount: target.manifest.baseResultCount,
      resultDigest: target.manifest.baseResultDigest,
      snapshots: invertContentSnapshots(target.manifest.snapshots),
    },
    manifestHash: `sha256:${"e".repeat(64)}`,
  });
}
const active = activeRelease(),
  next = candidateRelease();
const inverse = recoveryRelease(next);
const candidate = { phase: "verified", release: next, rendererManifest };
const retained = { phase: "verified", release: inverse, rendererManifest };
/** Alters only the candidate manifest for relationship failure coverage. */
function candidateWith(manifest: object) {
  return {
    ...candidate,
    release: { ...next, manifest: { ...next.manifest, ...manifest } },
  };
}
/** Alters only the recovery manifest for relationship failure coverage. */
function recoveryWith(manifest: object) {
  return {
    ...retained,
    release: { ...inverse, manifest: { ...inverse.manifest, ...manifest } },
  };
}
describe("current release state", () => {
  it("decodes coherent active, genesis, and candidate states", () => {
    for (const current of [
      { active, candidate: null, recovery: null },
      {
        active: null,
        candidate: { phase: "staging", release, rendererManifest },
        recovery: null,
      },
      {
        active,
        candidate: { phase: "staging", release: next, rendererManifest },
        recovery: null,
      },
    ]) {
      expect(accepts(current)).toBe(true);
    }
  });
  it("binds terminal receipt evidence to the active manifest", () => {
    for (const invalid of [
      { releaseId: "release-other" },
      { activatedHeads: 0, deletedHeads: 2, stagedArtifacts: 0 },
      { deletedHeads: 0, stagedItems: 1 },
      { stagedProjections: 2 },
      { stagedRoutes: 1 },
      { manifestHash: otherHash },
      { activeAppLocales: ["en"] },
      { projectionDigest: otherHash },
      { resultCount: release.manifest.resultCount + 1 },
      { resultDigest: otherHash },
      { routeDigest: otherHash },
      { snapshots: replacementSnapshots, stagedSnapshotRows: 1 },
    ]) {
      const result = Schema.decodeUnknownExit(ActiveContentReleaseSchema)({
        ...active,
        receipt: { ...active.receipt, ...invalid },
      });
      expect(Exit.isFailure(result) ? String(result.cause) : "").toContain(
        "Expected the active receipt to match its signed release manifest."
      );
    }
  });
  it("decodes missing and completed historical recovery lookups", () => {
    const recoveredActive = activeRelease(completedRecovery);
    expect(
      Schema.decodeSync(RecoveryLookupSchema)({ kind: "missing" })
    ).toEqual({ kind: "missing" });
    expect(
      Schema.decodeSync(RecoveryLookupSchema)({
        kind: "completed",
        value: recoveredActive,
      })
    ).toEqual({ kind: "completed", value: recoveredActive });
    const invalid = Schema.decodeExit(RecoveryLookupSchema)({
      kind: "completed",
      value: { receipt: receiptFor(release), release, rendererManifest },
    });
    expect(Exit.isFailure(invalid) ? String(invalid.cause) : "").toContain(
      "Expected a completed rollback release."
    );
  });
  it("accepts resumable inverse phases bound to the candidate", () => {
    for (const phase of ["staging", "verifying", "verified"] as const) {
      expect(
        accepts({ active, candidate, recovery: { ...retained, phase } })
      ).toBe(true);
    }
    const activated = activeRelease(next);
    expect(
      accepts({ active: activated, candidate: null, recovery: retained })
    ).toBe(true);
    expect(
      accepts({
        active: activated,
        candidate: null,
        recovery: { ...retained, phase: "aborting" },
      })
    ).toBe(true);
  });
  it("retains the inverse of a genesis candidate before and after activation", () => {
    const genesisRecovery = { ...retained, release: recoveryRelease(release) };
    expect(
      accepts({
        active: null,
        candidate: { phase: "verified", release, rendererManifest },
        recovery: genesisRecovery,
      })
    ).toBe(true);
    expect(
      accepts({
        active: activeRelease(release),
        candidate: null,
        recovery: genesisRecovery,
      })
    ).toBe(true);
  });
  it("rejects incoherent candidate and recovery identities", () => {
    const invalidRecovery = Schema.decodeUnknownExit(
      StagedRollbackContentReleaseSchema
    )({ ...retained, release });
    expect(
      Exit.isFailure(invalidRecovery) ? String(invalidRecovery.cause) : ""
    ).toContain("Expected a staged rollback release.");
    const invalidManifests = [
      { origin: { kind: "git", sha: "a".repeat(40) } },
      { origin: { kind: "rollback", releaseId: "release-other" } },
      { baseReleaseId: "release-other" },
      { baseManifestHash: otherHash },
      { baseActiveAppLocales: ["en"] },
      { baseResultCount: inverse.manifest.baseResultCount + 1 },
      { baseResultDigest: otherHash },
      { resultCount: inverse.manifest.resultCount + 1 },
      { resultDigest: otherHash },
      { activeAppLocales: ["en"] },
      {
        snapshots: {
          ...inverse.manifest.snapshots,
          program: restoreContentSnapshot(null, hash),
        },
      },
    ];
    const invalidStates = [
      { active: null, candidate: null, recovery: retained },
      {
        active,
        candidate: { ...candidate, phase: "staging" },
        recovery: retained,
      },
      {
        active,
        candidate,
        recovery: { ...retained, phase: "aborting" },
      },
      {
        active,
        candidate: null,
        recovery: { ...retained, phase: "staging" },
      },
      ...invalidManifests.map((manifest) => ({
        active,
        candidate,
        recovery: recoveryWith(manifest),
      })),
      {
        active,
        candidate,
        recovery: {
          ...retained,
          release: {
            ...inverse,
            manifest: {
              ...inverse.manifest,
              rendererManifestHash: otherHash,
            },
          },
          rendererManifest: { ...rendererManifest, hash: otherHash },
        },
      },
      { active, candidate, recovery: { ...retained, release } },
      { active: null, candidate, recovery: null },
      {
        active,
        candidate: candidateWith({
          baseResultCount: next.manifest.baseResultCount + 1,
        }),
        recovery: null,
      },
      {
        active,
        candidate: candidateWith({ baseActiveAppLocales: ["en"] }),
        recovery: null,
      },
      {
        active,
        candidate: candidateWith({ baseResultDigest: otherHash }),
        recovery: null,
      },
      {
        active,
        candidate,
        recovery: recoveryWith({ releaseId: release.manifest.releaseId }),
      },
      { active, candidate: { ...candidate, phase: "active" }, recovery: null },
      {
        active,
        candidate: { ...candidate, phase: "finalizing" },
        recovery: null,
      },
    ];
    for (const state of invalidStates) {
      expect(accepts(state)).toBe(false);
    }
    const result = decodeCurrent(invalidStates[0]);
    expect(Exit.isFailure(result) ? String(result.cause) : "").toContain(
      "Expected active, candidate, and recovery identities to be coherent."
    );
  });
});
