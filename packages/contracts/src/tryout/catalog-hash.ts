import { Effect, type Stream } from "effect";

import { canonicalizeLearningGraphIdentity } from "#contracts/graph/spec";
import { hashTryoutCanonical } from "#contracts/tryout/canonical";
import {
  type TryoutCatalogV2Record,
  TryoutCatalogV2RecordSchema,
  type TryoutCatalogV2Row,
} from "#contracts/tryout/catalog-v2";
import { digestTryoutRecords } from "#contracts/tryout/row-hash";

const CATALOG_DOMAIN = "nakafa.aksara.tryout-catalog.v2";

/** Includes an optional field without serializing absence as null. */
function optionalField(key: string, value: string | undefined) {
  return value === undefined ? {} : { [key]: value };
}

/** Builds one deterministic current hierarchy identity including app locale. */
export function tryoutCatalogV2Identity(row: TryoutCatalogV2Row) {
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

/** Builds one locale-neutral hierarchy identity for closure checks. */
export function tryoutCatalogV2LogicalIdentity(row: TryoutCatalogV2Row) {
  return [
    row.kind,
    row.countryKey,
    "examKey" in row ? row.examKey : "",
    "trackKey" in row ? row.trackKey : "",
    "setKey" in row ? row.setKey : "",
    "sectionKey" in row ? row.sectionKey : "",
  ].join("\0");
}

/** Serializes one current hierarchy row in stable field order. */
export function canonicalizeTryoutCatalogV2(row: TryoutCatalogV2Row) {
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
export function makeTryoutCatalogV2Record(
  row: TryoutCatalogV2Row
): TryoutCatalogV2Record {
  return TryoutCatalogV2RecordSchema.make({
    row,
    rowHash: hashTryoutCanonical(
      CATALOG_DOMAIN,
      canonicalizeTryoutCatalogV2(row)
    ),
  });
}

/** Digests canonically ordered current hierarchy records. */
export const digestTryoutCatalogV2 = Effect.fn(
  "AksaraContracts.digestTryoutCatalogV2"
)(function* <E, R>(records: Stream.Stream<TryoutCatalogV2Record, E, R>) {
  return yield* digestTryoutRecords({
    canonicalize: canonicalizeTryoutCatalogV2,
    domain: CATALOG_DOMAIN,
    identity: tryoutCatalogV2Identity,
    records,
    rowHash: (row) => makeTryoutCatalogV2Record(row).rowHash,
  });
});
