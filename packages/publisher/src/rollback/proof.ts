import type { ReleaseId, Sha256Hash } from "@nakafa/aksara-contracts/ids";
import { verifyContentProjections } from "@nakafa/aksara-contracts/projection/verify";
import type {
  ContentReleaseManifest,
  SignedContentRelease,
} from "@nakafa/aksara-contracts/release";
import { verifyContentReleaseItems } from "@nakafa/aksara-contracts/release/items";
import { RollbackSnapshotEntrySchema } from "@nakafa/aksara-contracts/release/rollback";
import { verifyRollbackSnapshot } from "@nakafa/aksara-contracts/release/rollback-digest";
import { Effect, Stream } from "effect";
import type { ReplaySpoolError } from "#publisher/replay/error";
import { RollbackProofIdentityError } from "#publisher/rollback/errors";
import {
  type DerivedRollbackRecord,
  isDerivedRollbackUpsert,
  snapshotRollbackState,
} from "#publisher/rollback/records";

/** Authenticated proof orientation plus exact recovery-base identity. */
export type RollbackProofSelection =
  | { readonly kind: "source" }
  | {
      readonly baseManifestHash: Sha256Hash;
      readonly baseReleaseId: ReleaseId;
      readonly kind: "recovery";
    };

export type RollbackProofMode = RollbackProofSelection["kind"];
export type RollbackRecordSide = "current" | "prior";

/** Selects which transition orientation one signed release authenticates. */
export function selectRollbackProof(
  proof: SignedContentRelease,
  releaseId: ReleaseId,
  rollbackOf: ReleaseId
) {
  if (proof.manifest.releaseId === rollbackOf) {
    return Effect.succeed<RollbackProofSelection>({ kind: "source" });
  }
  const isRecovery =
    proof.manifest.releaseId === releaseId &&
    proof.manifest.origin.kind === "rollback" &&
    proof.manifest.baseReleaseId === rollbackOf &&
    proof.manifest.baseManifestHash !== null;
  if (isRecovery && proof.manifest.baseManifestHash !== null) {
    return Effect.succeed<RollbackProofSelection>({
      baseManifestHash: proof.manifest.baseManifestHash,
      baseReleaseId: rollbackOf,
      kind: "recovery",
    });
  }
  return Effect.fail(
    new RollbackProofIdentityError({
      actualReleaseId: proof.manifest.releaseId,
      expectedReleaseId: releaseId,
      rollbackOf,
    })
  );
}

/** Selects one authenticated side of a rollback transition. */
export function selectRollbackState(
  record: DerivedRollbackRecord,
  side: RollbackRecordSide
) {
  return side === "current" ? record.current : record.prior;
}

/** Replays canonical items owned by one transition side. */
export function rollbackItemStream(
  records: () => Stream.Stream<DerivedRollbackRecord, ReplaySpoolError>,
  side: RollbackRecordSide
) {
  return records().pipe(
    Stream.map((record) => selectRollbackState(record, side).item)
  );
}

/** Replays material projections owned by one transition side. */
export function rollbackProjectionStream(
  records: () => Stream.Stream<DerivedRollbackRecord, ReplaySpoolError>,
  side: RollbackRecordSide
) {
  return records().pipe(
    Stream.map((record) => selectRollbackState(record, side)),
    Stream.filter(isDerivedRollbackUpsert),
    Stream.map((state) => state.projection)
  );
}

/** Replays compact snapshots under the selected release identity. */
export function rollbackSnapshotStream(
  records: () => Stream.Stream<DerivedRollbackRecord, ReplaySpoolError>,
  releaseId: ReleaseId,
  side: RollbackRecordSide
) {
  return records().pipe(
    Stream.map((record) => {
      const state = selectRollbackState(record, side);
      return RollbackSnapshotEntrySchema.make({
        index: state.item.index,
        releaseId,
        snapshot: snapshotRollbackState(state),
      });
    })
  );
}

type VerifyRollbackProofError =
  | Effect.Effect.Error<
      ReturnType<typeof verifyContentReleaseItems<ReplaySpoolError, never>>
    >
  | Effect.Effect.Error<
      ReturnType<typeof verifyContentProjections<ReplaySpoolError, never>>
    >
  | Effect.Effect.Error<
      ReturnType<typeof verifyRollbackSnapshot<ReplaySpoolError, never>>
    >;

type VerifyRollbackProof = (input: {
  readonly manifest: ContentReleaseManifest;
  readonly mode: RollbackProofMode;
  /** Replays authenticated rollback records for every proof pass. */
  readonly records: () => Stream.Stream<
    DerivedRollbackRecord,
    ReplaySpoolError
  >;
}) => Effect.Effect<void, VerifyRollbackProofError>;

/** Authenticates every target transition against one signed proof release. */
export const verifyRollbackProof: VerifyRollbackProof = Effect.fn(
  "AksaraPublisher.verifyRollbackProof"
)(function* (input: {
  readonly manifest: ContentReleaseManifest;
  readonly mode: RollbackProofMode;
  /** Replays authenticated rollback records for every proof pass. */
  readonly records: () => Stream.Stream<
    DerivedRollbackRecord,
    ReplaySpoolError
  >;
}) {
  const side = input.mode === "source" ? "current" : "prior";
  const snapshotSide = input.mode === "source" ? "prior" : "current";
  yield* verifyContentReleaseItems({
    items: rollbackItemStream(input.records, side),
    manifest: input.manifest,
  });
  yield* verifyContentProjections({
    manifest: input.manifest,
    projections: rollbackProjectionStream(input.records, side),
  });
  yield* verifyRollbackSnapshot({
    entries: rollbackSnapshotStream(
      input.records,
      input.manifest.releaseId,
      snapshotSide
    ),
    manifest: input.manifest,
  });
});
