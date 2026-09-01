import {
  ReleaseIdSchema,
  Sha256HashSchema,
} from "@nakafa/aksara-contracts/ids";
import { verifyContentReleaseBundle } from "@nakafa/aksara-contracts/release/verify";
import { Effect, Schema, Stream } from "effect";
import { QuestionAuditCountError } from "#publisher/audit/error";
import { auditQuestionRecord } from "#publisher/audit/record";
import { selectQuestionAuditState } from "#publisher/audit/state";
import { streamContentHeads } from "#publisher/heads";
import { createReplaySpool } from "#publisher/replay/spool";
import { mergeRollbackResult } from "#publisher/rollback/catalog";
import { verifyRollbackProof } from "#publisher/rollback/proof";
import {
  DerivedRollbackRecordSchema,
  deriveRollbackRecords,
} from "#publisher/rollback/records";
import { streamRollbackRecords } from "#publisher/rollback/stream";

/** Exact active and retained inverse identities selected for one audit. */
export const QuestionAuditInputSchema = Schema.Struct({
  manifestHash: Sha256HashSchema,
  recoveryId: ReleaseIdSchema,
  recoveryManifestHash: Sha256HashSchema,
  releaseId: ReleaseIdSchema,
});
export type QuestionAuditInput = typeof QuestionAuditInputSchema.Type;

/** Secret-free terminal evidence for one complete Question release audit. */
export const QuestionAuditEvidenceSchema = Schema.Struct({
  currentChoicesCount: Schema.Literal(0),
  currentDateCount: Schema.Literal(0),
  manifestHash: Sha256HashSchema,
  priorChoicesCount: Schema.Literal(0),
  priorDateCount: Schema.Literal(0),
  questionCount: Schema.Finite.pipe(
    Schema.check(Schema.isInt()),
    Schema.check(Schema.isGreaterThan(0))
  ),
  recoveryId: ReleaseIdSchema,
  recoveryManifestHash: Sha256HashSchema,
  releaseId: ReleaseIdSchema,
});
export type QuestionAuditEvidence = typeof QuestionAuditEvidenceSchema.Type;

/**
 * Authenticates every current and prior Question body for one full rebuild.
 * Both sides must already use the stable response and publication metadata.
 */
export const auditQuestionRelease = Effect.fn(
  "AksaraPublisher.auditQuestionRelease"
)(function* (input: QuestionAuditInput) {
  const selected = yield* selectQuestionAuditState(input);
  const active = yield* verifyContentReleaseBundle({
    release: selected.active.release,
    rendererManifest: selected.active.rendererManifest,
  });
  const recovery = yield* verifyContentReleaseBundle({
    release: selected.recovery.release,
    rendererManifest: selected.recovery.rendererManifest,
  });
  const transitions = yield* createReplaySpool({
    prefix: "aksara-question-audit-",
    schema: DerivedRollbackRecordSchema,
    stream: deriveRollbackRecords({
      currentPolicy: {
        kind: "compatible",
        rendererManifest: active.rendererManifest,
      },
      currentReleaseId: input.releaseId,
      priorPolicy: {
        kind: "compatible",
        rendererManifest: recovery.rendererManifest,
      },
      priorReleaseId: input.recoveryId,
      records: streamRollbackRecords(
        input.releaseId,
        input.manifestHash,
        active.release.manifest.rollbackCount
      ),
    }),
  });
  yield* verifyRollbackProof({
    manifest: active.release.manifest,
    mode: "source",
    records: transitions.replay,
  });
  yield* verifyRollbackProof({
    manifest: recovery.release.manifest,
    mode: "recovery",
    records: transitions.replay,
  });
  const activeHeads = streamContentHeads(
    input.releaseId,
    input.manifestHash,
    "question"
  );
  const activeHeadCount = yield* activeHeads.pipe(Stream.runCount);
  if (activeHeadCount !== active.release.manifest.itemCount) {
    return yield* new QuestionAuditCountError({
      actual: activeHeadCount,
      expected: active.release.manifest.itemCount,
      source: "active-heads",
    });
  }
  yield* mergeRollbackResult({
    active: streamContentHeads(input.releaseId, input.manifestHash, "question"),
    transitions: transitions.replay,
  }).pipe(Stream.runDrain);
  const questionCount = yield* transitions.replay.pipe(
    Stream.runFoldEffect(
      () => 0,
      (count, record) =>
        auditQuestionRecord(record).pipe(Effect.map((added) => count + added))
    )
  );
  yield* selectQuestionAuditState(input);
  return QuestionAuditEvidenceSchema.make({
    currentChoicesCount: 0,
    currentDateCount: 0,
    manifestHash: input.manifestHash,
    priorChoicesCount: 0,
    priorDateCount: 0,
    questionCount,
    recoveryId: input.recoveryId,
    recoveryManifestHash: input.recoveryManifestHash,
    releaseId: input.releaseId,
  });
});
