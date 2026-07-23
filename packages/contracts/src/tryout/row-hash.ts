import { createHash } from "node:crypto";
import { Effect, Schema, Stream } from "effect";
import { canonicalizeLearningGraphIdentity } from "#contracts/graph/spec";
import { Sha256HashSchema } from "#contracts/ids";
import { hashTryoutCanonical } from "#contracts/tryout/canonical";
import {
  type TryoutCatalogRecord,
  TryoutCatalogRecordSchema,
  type TryoutCatalogRow,
  type TryoutPlacement,
  type TryoutPlacementRecord,
  TryoutPlacementRecordSchema,
  type TryoutPlacementSource,
  tryoutCatalogIdentity,
} from "#contracts/tryout/spec";

const CATALOG_DOMAIN = "nakafa.aksara.tryout-catalog.v1";
const PLACEMENT_DOMAIN = "nakafa.aksara.tryout-placements.v1";

/** Builds the deterministic active-placement identity across locales. */
export function tryoutPlacementIdentity(row: TryoutPlacementSource) {
  return [
    row.countryKey,
    row.examKey,
    row.trackKey,
    row.setKey,
    row.sectionKey,
    row.questionOrder,
    row.questionContentKey,
    row.locale,
  ].join("\0");
}

/** Compares active placements in the order used by question-head binding. */
export function compareTryoutPlacements(
  left: TryoutPlacementSource,
  right: TryoutPlacementSource
) {
  return tryoutPlacementIdentity(left).localeCompare(
    tryoutPlacementIdentity(right)
  );
}

/** An immutable snapshot stream is duplicated, unsorted, or tampered. */
export class TryoutDigestError extends Schema.TaggedError<TryoutDigestError>()(
  "TryoutDigestError",
  {
    code: Schema.Literal("integrity", "order"),
    identity: Schema.String,
  }
) {}

/** Includes an optional field without serializing absent values as null. */
function optionalField(key: string, value: string | undefined) {
  return value === undefined ? {} : { [key]: value };
}

/** Serializes one hierarchy row with stable domain-owned field order. */
export function canonicalizeTryoutCatalog(row: TryoutCatalogRow) {
  const localized = {
    ...optionalField("description", row.description),
    graph: canonicalizeLearningGraphIdentity(row.graph),
    locale: row.locale,
    sourceRevision: row.sourceRevision,
    title: row.title,
  };
  if (row.kind === "country") {
    return JSON.stringify({
      ...localized,
      countryCode: row.countryCode,
      countryKey: row.countryKey,
      kind: row.kind,
      publicPath: row.publicPath,
    });
  }
  if (row.kind === "exam") {
    return JSON.stringify({
      ...localized,
      countryKey: row.countryKey,
      examKey: row.examKey,
      kind: row.kind,
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

/** Serializes one artifact-bound placement with stable field order. */
export function canonicalizeTryoutPlacement(row: TryoutPlacement) {
  return JSON.stringify({
    answerArtifactHash: row.answerArtifactHash,
    answerContentKey: row.answerContentKey,
    choices: row.choices.map(({ isCorrect, label, optionKey, order }) => ({
      isCorrect,
      label,
      optionKey,
      order,
    })),
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

/** Creates one immutable hierarchy record from a canonical row. */
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

/** Creates one immutable placement record from artifact-bound content. */
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

interface DigestRecord<Row> {
  readonly identity: string;
  readonly row: Row;
  readonly rowHash: typeof Sha256HashSchema.Type;
}

/** Keeps one stream digest and previous identity private to its replay. */
class TryoutDigestState {
  readonly #hash;
  count = 0;
  previous: string | undefined;

  /** Creates one fresh domain-separated incremental digest. */
  constructor(domain: string) {
    this.#hash = createHash("sha256").update(domain).update("\n");
  }

  /** Adds one verified canonical record to the digest. */
  update(canonical: string, identity: string) {
    this.#hash.update(canonical).update("\n");
    this.count += 1;
    this.previous = identity;
  }

  /** Consumes the hash and returns its branded value. */
  digest() {
    return Sha256HashSchema.make(`sha256:${this.#hash.digest("hex")}`);
  }
}

/** Verifies and adds one immutable record without retaining prior rows. */
function updateDigest<Row>(
  state: TryoutDigestState,
  record: DigestRecord<Row>,
  expectedHash: typeof Sha256HashSchema.Type,
  canonical: string
) {
  if (record.rowHash !== expectedHash) {
    return Effect.fail(
      new TryoutDigestError({
        code: "integrity",
        identity: record.identity,
      })
    );
  }
  if (
    state.previous !== undefined &&
    state.previous.localeCompare(record.identity) >= 0
  ) {
    return Effect.fail(
      new TryoutDigestError({ code: "order", identity: record.identity })
    );
  }
  state.update(canonical, record.identity);
  return Effect.succeed(state);
}

/** Digests canonically ordered hierarchy records in constant space. */
export const digestTryoutCatalog = Effect.fn(
  "AksaraContracts.digestTryoutCatalog"
)(function* <E, R>(records: Stream.Stream<TryoutCatalogRecord, E, R>) {
  const state = yield* records.pipe(
    Stream.runFoldEffect(
      new TryoutDigestState(CATALOG_DOMAIN),
      (current, record) =>
        updateDigest(
          current,
          { ...record, identity: tryoutCatalogIdentity(record.row) },
          makeTryoutCatalogRecord(record.row).rowHash,
          `${canonicalizeTryoutCatalog(record.row)}\0${record.rowHash}`
        )
    )
  );
  return { count: state.count, digest: state.digest() };
});

/** Digests canonically ordered artifact-bound placements in constant space. */
export const digestTryoutPlacements = Effect.fn(
  "AksaraContracts.digestTryoutPlacements"
)(function* <E, R>(records: Stream.Stream<TryoutPlacementRecord, E, R>) {
  const state = yield* records.pipe(
    Stream.runFoldEffect(
      new TryoutDigestState(PLACEMENT_DOMAIN),
      (current, record) =>
        updateDigest(
          current,
          {
            ...record,
            identity: tryoutPlacementIdentity(record.row),
          },
          makeTryoutPlacementRecord(record.row).rowHash,
          `${canonicalizeTryoutPlacement(record.row)}\0${record.rowHash}`
        )
    )
  );
  return { count: state.count, digest: state.digest() };
});
