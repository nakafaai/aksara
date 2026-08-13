import { Effect, type Stream } from "effect";

import { canonicalizeLearningGraphIdentity } from "#contracts/graph/spec";
import { compareCodeUnits } from "#contracts/text/order";
import { hashTryoutCanonical } from "#contracts/tryout/canonical";
import {
  type TryoutCatalogRecord,
  TryoutCatalogRecordSchema,
  type TryoutCatalogRow,
} from "#contracts/tryout/catalog";
import { digestTryoutRecords } from "#contracts/tryout/row-hash";

const CATALOG_DOMAIN = "nakafa.aksara.tryout-catalog";

/** Includes an optional field without serializing absence as null. */
function optionalField(key: string, value: string | undefined) {
  return value === undefined ? {} : { [key]: value };
}

/** Builds one deterministic current hierarchy identity including app locale. */
export function tryoutCatalogIdentity(row: TryoutCatalogRow) {
  return [
    row.appLocale,
    row.kind,
    row.countryKey,
    "examKey" in row ? row.examKey : "",
    "trackKey" in row ? row.trackKey : "",
    "setKey" in row ? row.setKey : "",
    "sectionKey" in row ? row.sectionKey : "",
  ].join("\0");
}

/** Compares localized hierarchy rows in their canonical digest order. */
export function compareTryoutCatalog(
  left: TryoutCatalogRow,
  right: TryoutCatalogRow
) {
  return compareCodeUnits(
    tryoutCatalogIdentity(left),
    tryoutCatalogIdentity(right)
  );
}

/** Builds one locale-neutral hierarchy identity for closure checks. */
export function tryoutCatalogLogicalIdentity(row: TryoutCatalogRow) {
  return [
    row.kind,
    row.countryKey,
    "examKey" in row ? row.examKey : "",
    "trackKey" in row ? row.trackKey : "",
    "setKey" in row ? row.setKey : "",
    "sectionKey" in row ? row.sectionKey : "",
  ].join("\0");
}

/** Builds the locale-neutral catalog identity of one section reference. */
export function tryoutSectionLogicalIdentity(input: {
  readonly countryKey: string;
  readonly examKey: string;
  readonly sectionKey: string;
  readonly setKey: string;
  readonly trackKey: string;
}) {
  return [
    "section",
    input.countryKey,
    input.examKey,
    input.trackKey,
    input.setKey,
    input.sectionKey,
  ].join("\0");
}

/** Serializes locale-neutral catalog facts for cross-locale closure checks. */
export function canonicalizeTryoutCatalogFacts(row: TryoutCatalogRow) {
  const graph = {
    alignmentId: row.graph.alignmentId,
    conceptId: row.graph.conceptId,
    learningObjectId: row.graph.learningObjectId,
    lensId: row.graph.lensId,
  };
  const shared = {
    graph,
    kind: row.kind,
    order: row.order,
    sourceRevision: row.sourceRevision,
  };
  if (row.kind === "country") {
    return JSON.stringify({
      ...shared,
      countryCode: row.countryCode,
      countryKey: row.countryKey,
    });
  }
  if (row.kind === "exam") {
    return JSON.stringify({
      ...shared,
      countryKey: row.countryKey,
      examKey: row.examKey,
      scoringStrategy: row.scoringStrategy,
    });
  }
  if (row.kind === "track") {
    return JSON.stringify({
      ...shared,
      countryKey: row.countryKey,
      examKey: row.examKey,
      questionCount: row.questionCount,
      sectionCount: row.sectionCount,
      setCount: row.setCount,
      trackKey: row.trackKey,
      trackKind: row.trackKind,
      visibleSectionCount: row.visibleSectionCount,
    });
  }
  if (row.kind === "set") {
    return JSON.stringify({
      ...shared,
      countryKey: row.countryKey,
      examKey: row.examKey,
      ...optionalField("internalEntrySectionKey", row.internalEntrySectionKey),
      questionCount: row.questionCount,
      scoringStrategy: row.scoringStrategy,
      sectionCount: row.sectionCount,
      setKey: row.setKey,
      trackKey: row.trackKey,
      visibleSectionCount: row.visibleSectionCount,
    });
  }
  return JSON.stringify({
    ...shared,
    countryKey: row.countryKey,
    examKey: row.examKey,
    questionCount: row.questionCount,
    questionSourcePath: row.questionSourcePath,
    sectionKey: row.sectionKey,
    setKey: row.setKey,
    timeLimitSeconds: row.timeLimitSeconds,
    trackKey: row.trackKey,
    visibility: row.visibility,
  });
}

/** Serializes one current hierarchy row in stable field order. */
export function canonicalizeTryoutCatalog(row: TryoutCatalogRow) {
  const localized = {
    appLocale: row.appLocale,
    ...optionalField("description", row.description),
    graph: canonicalizeLearningGraphIdentity(row.graph),
    sourceRevision: row.sourceRevision,
    title: row.title,
  };
  if (row.kind === "country") {
    return JSON.stringify({
      ...localized,
      countryCode: row.countryCode,
      countryKey: row.countryKey,
      kind: row.kind,
      order: row.order,
      publicPath: row.publicPath,
    });
  }
  if (row.kind === "exam") {
    return JSON.stringify({
      ...localized,
      countryKey: row.countryKey,
      examKey: row.examKey,
      kind: row.kind,
      order: row.order,
      publicPath: row.publicPath,
      scoringStrategy: row.scoringStrategy,
    });
  }
  if (row.kind === "track") {
    return JSON.stringify({
      ...localized,
      countryKey: row.countryKey,
      examKey: row.examKey,
      kind: row.kind,
      order: row.order,
      publicPath: row.publicPath,
      questionCount: row.questionCount,
      sectionCount: row.sectionCount,
      setCount: row.setCount,
      trackKey: row.trackKey,
      trackKind: row.trackKind,
      visibleSectionCount: row.visibleSectionCount,
    });
  }
  if (row.kind === "set") {
    return JSON.stringify({
      ...localized,
      countryKey: row.countryKey,
      examKey: row.examKey,
      ...optionalField("internalEntrySectionKey", row.internalEntrySectionKey),
      kind: row.kind,
      order: row.order,
      publicPath: row.publicPath,
      questionCount: row.questionCount,
      scoringStrategy: row.scoringStrategy,
      sectionCount: row.sectionCount,
      setKey: row.setKey,
      trackKey: row.trackKey,
      visibleSectionCount: row.visibleSectionCount,
    });
  }
  return JSON.stringify({
    ...localized,
    countryKey: row.countryKey,
    examKey: row.examKey,
    kind: row.kind,
    order: row.order,
    ...optionalField("publicPath", row.publicPath),
    questionCount: row.questionCount,
    questionSourcePath: row.questionSourcePath,
    sectionKey: row.sectionKey,
    setKey: row.setKey,
    timeLimitSeconds: row.timeLimitSeconds,
    trackKey: row.trackKey,
    visibility: row.visibility,
  });
}

/** Creates one authenticated current hierarchy record. */
export function makeTryoutCatalogRecord(
  row: TryoutCatalogRow
): TryoutCatalogRecord {
  return TryoutCatalogRecordSchema.make({
    row,
    rowHash: hashTryoutCanonical(
      CATALOG_DOMAIN,
      canonicalizeTryoutCatalog(row)
    ),
  });
}

/** Digests canonically ordered current hierarchy records. */
export const digestTryoutCatalog = Effect.fn(
  "AksaraContracts.digestTryoutCatalog"
)(function* <E, R>(records: Stream.Stream<TryoutCatalogRecord, E, R>) {
  return yield* digestTryoutRecords({
    canonicalize: canonicalizeTryoutCatalog,
    domain: CATALOG_DOMAIN,
    identity: tryoutCatalogIdentity,
    records,
    rowHash: (row) => makeTryoutCatalogRecord(row).rowHash,
  });
});
