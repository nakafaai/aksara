import { Effect } from "effect";
import { QuestionAuditStateError } from "#publisher/audit/error";
import type { QuestionAuditInput } from "#publisher/audit/question";
import { PublicationTarget } from "#publisher/publication/spec";

/** Selects the exact active and retained inverse slots for this audit. */
export const selectQuestionAuditState = Effect.fn(
  "AksaraPublisher.selectQuestionAuditState"
)(function* (input: QuestionAuditInput) {
  const target = yield* PublicationTarget;
  const current = yield* target.current;
  if (current.active === null) {
    return yield* new QuestionAuditStateError({
      reason: "active-missing",
    });
  }
  if (current.candidate !== null) {
    return yield* new QuestionAuditStateError({
      reason: "candidate-present",
    });
  }
  if (
    current.active.release.manifest.releaseId !== input.releaseId ||
    current.active.release.manifestHash !== input.manifestHash
  ) {
    return yield* new QuestionAuditStateError({
      reason: "active-identity",
    });
  }
  if (current.recovery === null) {
    return yield* new QuestionAuditStateError({
      reason: "recovery-missing",
    });
  }
  if (
    current.recovery.release.manifest.releaseId !== input.recoveryId ||
    current.recovery.release.manifestHash !== input.recoveryManifestHash
  ) {
    return yield* new QuestionAuditStateError({
      reason: "recovery-identity",
    });
  }
  if (current.recovery.phase !== "verified") {
    return yield* new QuestionAuditStateError({
      reason: "recovery-phase",
    });
  }
  const { manifest } = current.active.release;
  if (
    manifest.scope.families.length !== 1 ||
    manifest.scope.families[0] !== "question" ||
    manifest.scope.snapshots.length !== 1 ||
    manifest.scope.snapshots[0] !== "tryout"
  ) {
    return yield* new QuestionAuditStateError({ reason: "scope" });
  }
  if (
    manifest.itemCount === 0 ||
    manifest.deleteCount !== 0 ||
    manifest.itemCount !== manifest.upsertCount ||
    manifest.itemCount !== manifest.projectionCount ||
    manifest.itemCount !== manifest.rollbackCount
  ) {
    return yield* new QuestionAuditStateError({
      reason: "release-shape",
    });
  }
  return { active: current.active, recovery: current.recovery };
});
