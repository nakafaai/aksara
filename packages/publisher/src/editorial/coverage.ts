import type {
  EditorialReviewManifest,
  EditorialReviewRequirement,
} from "@nakafa/aksara-contracts/editorial/review";
import { CorpusSourcePathSchema } from "@nakafa/aksara-contracts/ids";
import {
  type ActiveAppLocaleList,
  AppLocaleSchema,
  DeliveryLanguageSchema,
} from "@nakafa/aksara-contracts/locale";
import type { ContentHead } from "@nakafa/aksara-contracts/release/head";
import { Chunk, Effect, Schema, Stream } from "effect";

import { requirementsForHead } from "#publisher/editorial/requirements";

const CoverageFieldSchema = Schema.Literal(
  "record",
  "reviewMode",
  "sourcePath",
  "targetHash"
);

/** One published source has no exact editorial record for its language policy. */
export class EditorialReviewCoverageError extends Schema.TaggedError<EditorialReviewCoverageError>()(
  "EditorialReviewCoverageError",
  {
    appLocale: AppLocaleSchema,
    deliveryLanguage: DeliveryLanguageSchema,
    field: CoverageFieldSchema,
    targetPath: CorpusSourcePathSchema,
  }
) {}

/** One authenticated review record belongs to no current authored source. */
export class EditorialReviewCoverageExcessError extends Schema.TaggedError<EditorialReviewCoverageExcessError>()(
  "EditorialReviewCoverageExcessError",
  {
    appLocale: AppLocaleSchema,
    deliveryLanguage: DeliveryLanguageSchema,
    targetPath: CorpusSourcePathSchema,
  }
) {}

/** Returns the manifest record bound to one exact review requirement. */
function findReviewRecord(
  manifest: EditorialReviewManifest,
  requirement: EditorialReviewRequirement
) {
  return manifest.records.find(
    (record) =>
      record.targetPath === requirement.targetPath &&
      record.appLocale === requirement.appLocale &&
      record.deliveryLanguage === requirement.deliveryLanguage
  );
}

/** Serializes the unique policy identity shared by requirements and records. */
function reviewIdentity(input: {
  readonly appLocale: string;
  readonly deliveryLanguage: string;
  readonly targetPath: string;
}) {
  return `${input.targetPath}\0${input.appLocale}\0${input.deliveryLanguage}`;
}

/** Fails with one exact missing or stale editorial policy binding. */
function verifyRequirement(
  manifest: EditorialReviewManifest,
  requirement: EditorialReviewRequirement
) {
  const record = findReviewRecord(manifest, requirement);
  const base = {
    appLocale: requirement.appLocale,
    deliveryLanguage: requirement.deliveryLanguage,
    targetPath: requirement.targetPath,
  };
  if (record === undefined) {
    return Effect.fail(
      new EditorialReviewCoverageError({ ...base, field: "record" })
    );
  }
  if (
    requirement.expectedTargetHash !== null &&
    record.targetHash !== requirement.expectedTargetHash
  ) {
    return Effect.fail(
      new EditorialReviewCoverageError({ ...base, field: "targetHash" })
    );
  }
  if (record.reviewMode !== requirement.reviewMode) {
    return Effect.fail(
      new EditorialReviewCoverageError({ ...base, field: "reviewMode" })
    );
  }
  if (
    requirement.requiredSourcePaths.some(
      (requiredPath) =>
        !record.sources.some(({ sourcePath }) => sourcePath === requiredPath)
    )
  ) {
    return Effect.fail(
      new EditorialReviewCoverageError({ ...base, field: "sourcePath" })
    );
  }
  return Effect.void;
}

/** Derives the complete requirement stream for body and companion sources. */
function reviewRequirements<E, R>(input: {
  readonly activeAppLocales: ActiveAppLocaleList;
  readonly heads: Stream.Stream<ContentHead, E, R>;
  readonly requirements: Stream.Stream<EditorialReviewRequirement>;
}) {
  return input.heads.pipe(
    Stream.mapEffect((head) =>
      requirementsForHead(head, input.activeAppLocales)
    ),
    Stream.mapConcat((requirements) => requirements),
    Stream.concat(input.requirements)
  );
}

/** Requires exact review-record equality with one complete current catalog. */
export const verifyCompleteEditorialReviewCoverage = Effect.fn(
  "AksaraPublisher.verifyCompleteEditorialReviewCoverage"
)(function* <E, R>(input: {
  readonly activeAppLocales: ActiveAppLocaleList;
  readonly heads: Stream.Stream<ContentHead, E, R>;
  readonly manifest: EditorialReviewManifest;
  readonly requirements: Stream.Stream<EditorialReviewRequirement>;
}) {
  const requirements = Chunk.toReadonlyArray(
    yield* reviewRequirements(input).pipe(Stream.runCollect)
  );
  yield* Effect.forEach(
    requirements,
    (requirement) => verifyRequirement(input.manifest, requirement),
    { discard: true }
  );
  const desired = new Set(requirements.map(reviewIdentity));
  for (const record of input.manifest.records) {
    if (!desired.has(reviewIdentity(record))) {
      return yield* new EditorialReviewCoverageExcessError({
        appLocale: record.appLocale,
        deliveryLanguage: record.deliveryLanguage,
        targetPath: record.targetPath,
      });
    }
  }
});
