import { ReleaseVerificationCompleteSchema } from "@nakafa/aksara-contracts/release";
import type {
  ContentReleaseBundle,
  ContentReleaseStatus,
} from "@nakafa/aksara-contracts/release/lifecycle";
import { snapshotRowCount } from "@nakafa/aksara-contracts/release/snapshot";
import { ContentVerificationKeyResolver } from "@nakafa/aksara-contracts/signature/spec";
import { Effect, Stream } from "effect";
import { vi } from "vitest";
import type { PublicationPlan } from "#publisher/publication/plan";
import type { PublicationTarget } from "#publisher/publication/spec";
import { releaseEvidence, releaseReceipt } from "#test/lifecycle-state";
import { rendererManifest } from "#test/publication";
import {
  makeRollbackRelease,
  makeSignedBundle,
  testVerificationResolver,
} from "#test/publication/run";
import { makePublicationTarget } from "#test/target";

export const verificationBundle = await makeSignedBundle("test-lifecycle");
export const verificationRelease = verificationBundle.release;
export const verificationManifest = verificationRelease.manifest;
export const verificationRollback = await makeRollbackRelease(
  "test-lifecycle-recovery"
);
export const verificationRollbackBundle = {
  release: verificationRollback.release,
  rendererManifest,
};
export const verificationReceipt = releaseReceipt(verificationRelease);

interface VerificationPlanState {
  readonly activate: typeof PublicationTarget.Service.activate;
  readonly plan: PublicationPlan<never, never>;
  /** Records each execution of the plan-owned staging effect. */
  readonly stage: () => void;
  readonly stageRecovery: typeof PublicationTarget.Service.stageRecovery;
  readonly stageRelease: typeof PublicationTarget.Service.stageRelease;
  readonly status: typeof PublicationTarget.Service.status;
  readonly verify: typeof PublicationTarget.Service.verify;
}

/** Creates one exact durable status for the requested lifecycle phase. */
function statusFor(
  phase: ContentReleaseStatus["phase"],
  selected: ContentReleaseBundle["release"]
): ContentReleaseStatus {
  const identity = {
    manifestHash: selected.manifestHash,
    releaseId: selected.manifest.releaseId,
  };
  return phase === "completed"
    ? { ...identity, phase, receipt: releaseReceipt(selected) }
    : { ...identity, phase };
}

/** Builds a replayable lifecycle plan around focused target capabilities. */
export function makeVerificationPlan(
  phase: ContentReleaseStatus["phase"],
  overrides: Partial<typeof PublicationTarget.Service> = {},
  selectedBundle: ContentReleaseBundle = verificationBundle
): VerificationPlanState {
  const selected = selectedBundle.release;
  const selectedManifest = selected.manifest;
  const stage = vi.fn();
  const stageRelease = vi.fn(() => Effect.void);
  const stageRecovery = vi.fn(() => Effect.void);
  const status = vi.fn(() => Effect.succeed(statusFor(phase, selected)));
  const verify = vi.fn(() =>
    Effect.succeed(
      ReleaseVerificationCompleteSchema.make({
        evidence: releaseEvidence(selected),
        phase: "verified",
      })
    )
  );
  const activate = vi.fn(() => Effect.succeed(releaseReceipt(selected)));
  const target = makePublicationTarget({
    activate,
    stageRecovery,
    stageRelease,
    status,
    verify,
    ...overrides,
  });
  const plan: PublicationPlan<never, never> = {
    bundle: selectedBundle,
    cacheChanges: () => Stream.empty,
    projectionSummary: { count: selectedManifest.projectionCount },
    routeSummary: { count: selectedManifest.routeCount },
    snapshotSummary: {
      snapshots: selectedManifest.snapshots,
      stagedRows: snapshotRowCount(selectedManifest.snapshots),
    },
    stage: Effect.sync(stage),
    summary: {
      deleteCount: selectedManifest.deleteCount,
      upsertCount: selectedManifest.upsertCount,
    },
    target,
  };
  return { activate, plan, stage, stageRecovery, stageRelease, status, verify };
}

/** Runs one verification program with the release fixture's trusted key. */
export function runVerification<A, E>(
  program: Effect.Effect<A, E, ContentVerificationKeyResolver>
) {
  return Effect.runPromise(
    program.pipe(
      Effect.provideService(
        ContentVerificationKeyResolver,
        testVerificationResolver
      )
    )
  );
}
