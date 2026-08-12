import type { Stream } from "effect";

import { hashTryoutCanonical } from "#contracts/tryout/canonical";
import {
  tryoutPlacementIdentity,
  tryoutPlacementV2Identity,
} from "#contracts/tryout/identity";
import {
  type TryoutPlacementV2,
  type TryoutPlacementV2Record,
  TryoutPlacementV2RecordSchema,
} from "#contracts/tryout/placement";
import { digestTryoutRecords } from "#contracts/tryout/row-hash";
import {
  type TryoutPlacement,
  type TryoutPlacementRecord,
  TryoutPlacementRecordSchema,
} from "#contracts/tryout/spec";

const PLACEMENT_DOMAIN = "nakafa.aksara.tryout-placements.v1";
const PLACEMENT_V2_DOMAIN = "nakafa.aksara.tryout-placements.v2";

/** Serializes one v1 artifact-bound placement with stable field order. */
export function canonicalizeTryoutPlacement(row: TryoutPlacement) {
  return JSON.stringify({
    answerArtifactHash: row.answerArtifactHash,
    answerContentKey: row.answerContentKey,
    choices: canonicalizeChoices(row.choices),
    contentHash: row.contentHash,
    countryKey: row.countryKey,
    examKey: row.examKey,
    locale: row.locale,
    questionArtifactHash: row.questionArtifactHash,
    questionContentKey: row.questionContentKey,
    questionOrder: row.questionOrder,
    questionSourcePath: row.questionSourcePath,
    rendererDomain: row.rendererDomain,
    scope: row.scope,
    sectionKey: row.sectionKey,
    setKey: row.setKey,
    sourceRevision: row.sourceRevision,
    title: row.title,
    trackKey: row.trackKey,
  });
}

/** Serializes one v2 placement with explicit language identities. */
export function canonicalizeTryoutPlacementV2(row: TryoutPlacementV2) {
  return JSON.stringify({
    answerArtifactHash: row.answerArtifactHash,
    answerArtifactLocale: row.answerArtifactLocale,
    answerContentKey: row.answerContentKey,
    appLocale: row.appLocale,
    choices: canonicalizeChoices(row.choices),
    contentHash: row.contentHash,
    countryKey: row.countryKey,
    deliveryLanguage: row.deliveryLanguage,
    examKey: row.examKey,
    questionArtifactHash: row.questionArtifactHash,
    questionArtifactLocale: row.questionArtifactLocale,
    questionContentKey: row.questionContentKey,
    questionOrder: row.questionOrder,
    questionSourcePath: row.questionSourcePath,
    rendererDomain: row.rendererDomain,
    scope: row.scope,
    sectionKey: row.sectionKey,
    setKey: row.setKey,
    sourceRevision: row.sourceRevision,
    title: row.title,
    trackKey: row.trackKey,
  });
}

/** Creates one immutable v1 placement record. */
export function makeTryoutPlacementRecord(
  row: TryoutPlacement
): TryoutPlacementRecord {
  return TryoutPlacementRecordSchema.make({
    row,
    rowHash: hashTryoutCanonical(
      PLACEMENT_DOMAIN,
      canonicalizeTryoutPlacement(row)
    ),
  });
}

/** Creates one immutable v2 placement record. */
export function makeTryoutPlacementV2Record(
  row: TryoutPlacementV2
): TryoutPlacementV2Record {
  return TryoutPlacementV2RecordSchema.make({
    row,
    rowHash: hashTryoutCanonical(
      PLACEMENT_V2_DOMAIN,
      canonicalizeTryoutPlacementV2(row)
    ),
  });
}

/** Digests canonically ordered v1 placements in constant space. */
export function digestTryoutPlacements<E, R>(
  records: Stream.Stream<TryoutPlacementRecord, E, R>
) {
  return digestTryoutRecords({
    canonicalize: canonicalizeTryoutPlacement,
    domain: PLACEMENT_DOMAIN,
    identity: tryoutPlacementIdentity,
    records,
    rowHash: (row) => makeTryoutPlacementRecord(row).rowHash,
  });
}

/** Digests canonically ordered v2 placements in constant space. */
export function digestTryoutPlacementsV2<E, R>(
  records: Stream.Stream<TryoutPlacementV2Record, E, R>
) {
  return digestTryoutRecords({
    canonicalize: canonicalizeTryoutPlacementV2,
    domain: PLACEMENT_V2_DOMAIN,
    identity: tryoutPlacementV2Identity,
    records,
    rowHash: (row) => makeTryoutPlacementV2Record(row).rowHash,
  });
}

/** Serializes answer choices without trusting object insertion order. */
function canonicalizeChoices(
  choices: TryoutPlacement["choices"] | TryoutPlacementV2["choices"]
) {
  return choices.map(({ isCorrect, label, optionKey, order }) => ({
    isCorrect,
    label,
    optionKey,
    order,
  }));
}
