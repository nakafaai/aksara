import { describe, expect, it } from "@effect/vitest";
import { Exit, Schema } from "effect";
import {
  ActiveContentReleaseSchema,
  RecoveryLookupSchema,
} from "#contracts/release/current/evidence";
import {
  recoveryRelease,
  release,
  rendererManifest,
  replacementSnapshots,
} from "#contracts/test/request";
import { receiptFor } from "#contracts/test/response";

const otherHash = `sha256:${"f".repeat(64)}`;

/** Builds one completed active release from its signed bundle. */
function activeRelease(signedRelease: typeof release = release) {
  return {
    receipt: receiptFor(signedRelease),
    release: signedRelease,
    rendererManifest,
  };
}

describe("current release evidence", () => {
  it("binds terminal receipt evidence to the active manifest", () => {
    const active = activeRelease();
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
    const recoveredActive = activeRelease(recoveryRelease);
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
});
