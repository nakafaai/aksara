import type {
  EditorialReviewManifest,
  EditorialReviewRecord,
} from "@nakafa/aksara-contracts/editorial/review";
import { makeEditorialReviewManifest } from "@nakafa/aksara-contracts/editorial/review";
import { CorpusSourcePathSchema } from "@nakafa/aksara-contracts/ids";
import { ACTIVE_APP_LOCALES } from "@nakafa/aksara-contracts/locale";
import { Effect, Schema } from "effect";

/** Candidate authored copy shares mutable target bytes with active copy. */
export class EditorialReviewTargetOverlapError extends Schema.TaggedError<EditorialReviewTargetOverlapError>()(
  "EditorialReviewTargetOverlapError",
  { targetPath: CorpusSourcePathSchema }
) {}

/** Authenticated review evidence projected onto publication lifecycles. */
export interface EditorialReviewEvidence {
  readonly active: EditorialReviewManifest;
  readonly candidate: EditorialReviewManifest | null;
}

/** Returns whether one reviewed locale belongs to the current publication. */
function isActiveAppLocale(appLocale: EditorialReviewRecord["appLocale"]) {
  return ACTIVE_APP_LOCALES.some((active) => active === appLocale);
}

/** Projects one authenticated catalog without carrying its full digest forward. */
export const projectEditorialReviewEvidence = Effect.fn(
  "AksaraPublisher.projectEditorialReviewEvidence"
)(function* (manifest: EditorialReviewManifest) {
  const active: EditorialReviewRecord[] = [];
  const candidate: EditorialReviewRecord[] = [];
  for (const record of manifest.records) {
    if (isActiveAppLocale(record.appLocale)) {
      active.push(record);
      continue;
    }
    candidate.push(record);
  }

  const activeAuthoredTargets = new Set(
    active
      .filter(({ reviewMode }) => reviewMode === "authored-humanizer-review")
      .map(({ targetPath }) => targetPath)
  );
  for (const record of candidate) {
    if (
      record.reviewMode === "authored-humanizer-review" &&
      activeAuthoredTargets.has(record.targetPath)
    ) {
      return yield* new EditorialReviewTargetOverlapError({
        targetPath: record.targetPath,
      });
    }
  }

  return {
    active: yield* makeEditorialReviewManifest(active),
    candidate:
      candidate.length === 0
        ? null
        : yield* makeEditorialReviewManifest(candidate),
  } satisfies EditorialReviewEvidence;
});
