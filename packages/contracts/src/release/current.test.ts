import { Either, Schema } from "effect";
import { describe, expect, it } from "vitest";
import {
  ActiveContentReleaseSchema,
  ContentReleaseCurrentSchema,
  RecoveryLookupSchema,
} from "#contracts/release/current";
import {
  invertContentSnapshots,
  restoreContentSnapshot,
} from "#contracts/release/snapshot";
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
const decodeCurrent = Schema.decodeUnknownEither(ContentReleaseCurrentSchema);
/** Strictly checks current-state schema acceptance. */
function accepts(input: unknown) {
  const result = decodeCurrent(input, { onExcessProperty: "error" });
  if (Either.isLeft(result)) {
    String(result.left);
  }
  return Either.isRight(result);
}
/** Builds one candidate derived from the shared active release. */
function candidateRelease() {
  return Schema.decodeUnknownSync(SignedContentReleaseSchema)({
    ...release,
    manifest: {
      ...release.manifest,
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
  return Schema.decodeUnknownSync(RollbackSignedContentReleaseSchema)({
    ...release,
    manifest: {
      ...release.manifest,
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
describe("current release state", () => {
  it("decodes coherent active, genesis, and candidate states", () => {
    const active = { receipt: receiptFor(release), release, rendererManifest };
    const next = candidateRelease();
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
    const active = { receipt: receiptFor(release), release, rendererManifest };
    for (const invalid of [
      { releaseId: "release-other" },
      { activatedHeads: 0, deletedHeads: 2, stagedArtifacts: 0 },
      { deletedHeads: 0, stagedItems: 1 },
      { stagedProjections: 2 },
      { stagedRoutes: 1 },
      { manifestHash: otherHash },
      { projectionDigest: otherHash },
      { resultCount: release.manifest.resultCount + 1 },
      { resultDigest: otherHash },
      { routeDigest: otherHash },
      { snapshots: replacementSnapshots, stagedSnapshotRows: 1 },
    ]) {
      const result = Schema.decodeUnknownEither(ActiveContentReleaseSchema)({
        ...active,
        receipt: { ...active.receipt, ...invalid },
      });
      expect(Either.isLeft(result) ? String(result.left) : "").toContain(
        "Expected the active receipt to match its signed release manifest."
      );
    }
  });
  it("decodes missing and completed historical recovery lookups", () => {
    const active = {
      receipt: receiptFor(completedRecovery),
      release: completedRecovery,
      rendererManifest,
    };
    expect(
      Schema.decodeUnknownSync(RecoveryLookupSchema)({ kind: "missing" })
    ).toEqual({ kind: "missing" });
    expect(
      Schema.decodeUnknownSync(RecoveryLookupSchema)({
        kind: "completed",
        value: active,
      })
    ).toEqual({ kind: "completed", value: active });
    const invalid = Schema.decodeUnknownEither(RecoveryLookupSchema)({
      kind: "completed",
      value: { receipt: receiptFor(release), release, rendererManifest },
    });
    expect(Either.isLeft(invalid) ? String(invalid.left) : "").toContain(
      "Expected a completed rollback release."
    );
  });
  it("accepts resumable inverse phases bound to the candidate", () => {
    const active = { receipt: receiptFor(release), release, rendererManifest };
    const next = candidateRelease();
    const inverse = recoveryRelease(next);
    const candidate = {
      phase: "verified",
      release: next,
      rendererManifest,
    };
    const retained = {
      phase: "verified",
      release: inverse,
      rendererManifest,
    };
    for (const phase of ["staging", "verifying", "verified"] as const) {
      expect(
        accepts({ active, candidate, recovery: { ...retained, phase } })
      ).toBe(true);
    }
    const activated = {
      receipt: receiptFor(next),
      release: next,
      rendererManifest,
    };
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
  it("rejects incoherent candidate and recovery identities", () => {
    const active = { receipt: receiptFor(release), release, rendererManifest };
    const next = candidateRelease();
    const inverse = recoveryRelease(next);
    const candidate = {
      phase: "verified",
      release: next,
      rendererManifest,
    };
    const retained = {
      phase: "verified",
      release: inverse,
      rendererManifest,
    };
    const invalidManifests = [
      { origin: { kind: "git", sha: "a".repeat(40) } },
      { origin: { kind: "rollback", releaseId: "release-other" } },
      { baseReleaseId: "release-other" },
      { baseManifestHash: otherHash },
      { baseResultCount: inverse.manifest.baseResultCount + 1 },
      { baseResultDigest: otherHash },
      { resultCount: inverse.manifest.resultCount + 1 },
      { resultDigest: otherHash },
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
        recovery: {
          ...retained,
          release: {
            ...inverse,
            manifest: { ...inverse.manifest, ...manifest },
          },
        },
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
      { active, candidate: { ...candidate, release }, recovery: null },
      { active: null, candidate, recovery: null },
      {
        active,
        candidate: {
          ...candidate,
          release: {
            ...next,
            manifest: {
              ...next.manifest,
              baseResultCount: next.manifest.baseResultCount + 1,
            },
          },
        },
        recovery: null,
      },
      {
        active,
        candidate: {
          ...candidate,
          release: {
            ...next,
            manifest: { ...next.manifest, baseResultDigest: otherHash },
          },
        },
        recovery: null,
      },
      {
        active,
        candidate,
        recovery: {
          ...retained,
          release: {
            ...inverse,
            manifest: {
              ...inverse.manifest,
              releaseId: release.manifest.releaseId,
            },
          },
        },
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
    expect(Either.isLeft(result) ? String(result.left) : "").toContain(
      "Expected active, candidate, and recovery identities to be coherent."
    );
  });
});
