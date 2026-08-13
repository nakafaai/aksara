import type { Stream } from "effect";

import { hashTryoutCanonical } from "#contracts/tryout/canonical";
import { tryoutPlacementIdentity } from "#contracts/tryout/identity";
import {
  type TryoutPlacement,
  type TryoutPlacementRecord,
  TryoutPlacementRecordSchema,
} from "#contracts/tryout/placement";
import { digestTryoutRecords } from "#contracts/tryout/row-hash";

const PLACEMENT_DOMAIN = "nakafa.aksara.tryout-placements";

/** Serializes answer choices without trusting object insertion order. */
function canonicalizeChoices(choices: TryoutPlacement["choices"]) {
  return choices.map(({ isCorrect, label, optionKey, order }) => ({
    isCorrect,
    label,
    optionKey,
    order,
  }));
}

/** Serializes one artifact-bound placement with stable field order. */
export function canonicalizeTryoutPlacement(row: TryoutPlacement) {
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
    trackKey: row.trackKey,
  });
}

/** Creates one immutable authenticated placement record. */
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

/** Digests canonically ordered placements in constant space. */
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
