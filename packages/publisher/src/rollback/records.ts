import { verifySignedContentArtifact } from "@nakafa/aksara-contracts/artifact/verify";
import type { SignedContentArtifact } from "@nakafa/aksara-contracts/content";
import type { ReleaseId } from "@nakafa/aksara-contracts/ids";
import type { MaterialLessonProjection } from "@nakafa/aksara-contracts/projection/material";
import {
  type ContentReleaseItem,
  ContentReleaseItemSchema,
} from "@nakafa/aksara-contracts/release";
import {
  isRollbackUpsert,
  type RollbackRecord,
} from "@nakafa/aksara-contracts/release/rollback";
import type { RendererManifestEnvelope } from "@nakafa/aksara-contracts/renderer/contract";
import { Effect, Stream } from "effect";
import {
  type ReleaseArtifactMismatchError,
  validateArtifactForItem,
} from "#publisher/release-validation";

type ArtifactVerificationError = Effect.Effect.Error<
  ReturnType<typeof verifySignedContentArtifact>
>;

type ArtifactVerificationContext = Effect.Effect.Context<
  ReturnType<typeof verifySignedContentArtifact>
>;

/** One authenticated rollback item and its optional unchanged prior body. */
type DerivedRollbackRecord =
  | { readonly item: ContentReleaseItem; readonly kind: "delete" }
  | {
      readonly artifact: SignedContentArtifact;
      readonly item: ContentReleaseItem;
      readonly kind: "upsert";
      readonly projection: MaterialLessonProjection;
    };

/** Authenticates one exact old envelope against the current renderer. */
function deriveRecord(
  record: RollbackRecord,
  releaseId: ReleaseId,
  rendererManifest: RendererManifestEnvelope
) {
  const item = ContentReleaseItemSchema.make({
    change: record.change,
    index: record.index,
    releaseId,
  });
  if (!isRollbackUpsert(record)) {
    return Effect.succeed<DerivedRollbackRecord>({ item, kind: "delete" });
  }
  return verifySignedContentArtifact({
    artifact: record.artifact,
    rendererContractVersion: rendererManifest.rendererContractVersion,
    rendererManifest,
  }).pipe(
    Effect.tap((artifact) => validateArtifactForItem(item, artifact)),
    Effect.map(
      (artifact): DerivedRollbackRecord => ({
        artifact,
        item,
        kind: "upsert",
        projection: record.projection,
      })
    )
  );
}

/** Replays verified prior-state records without collecting artifact bodies. */
export function deriveRollbackRecords<E, R>(input: {
  readonly records: Stream.Stream<RollbackRecord, E, R>;
  readonly releaseId: ReleaseId;
  readonly rendererManifest: RendererManifestEnvelope;
}): Stream.Stream<
  DerivedRollbackRecord,
  E | ArtifactVerificationError | ReleaseArtifactMismatchError,
  R | ArtifactVerificationContext
> {
  return input.records.pipe(
    Stream.mapEffect((record) =>
      deriveRecord(record, input.releaseId, input.rendererManifest)
    )
  );
}

/** Narrows one derived rollback record to an unchanged prior upsert. */
export function isDerivedRollbackUpsert(
  record: DerivedRollbackRecord
): record is Extract<DerivedRollbackRecord, { readonly kind: "upsert" }> {
  return record.kind === "upsert";
}
