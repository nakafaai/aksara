import { createHash } from "node:crypto";
import { Effect, Schema, Stream } from "effect";
import { canonicalizeLearningGraphIdentity } from "#contracts/graph/spec";
import { Sha256HashSchema } from "#contracts/ids";
import { compareCodeUnits } from "#contracts/text/order";
import { hashTryoutCanonical } from "#contracts/tryout/canonical";
import { tryoutCatalogIdentity } from "#contracts/tryout/identity";
import {
  type TryoutCatalogRecord,
  TryoutCatalogRecordSchema,
  type TryoutCatalogRow,
} from "#contracts/tryout/spec";

const CATALOG_DOMAIN = "nakafa.aksara.tryout-catalog.v1";

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

interface DigestRecord<Row> {
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
  identity: string,
  expectedHash: typeof Sha256HashSchema.Type,
  canonical: string
) {
  if (record.rowHash !== expectedHash) {
    return Effect.fail(
      new TryoutDigestError({
        code: "integrity",
        identity,
      })
    );
  }
  if (
    state.previous !== undefined &&
    compareCodeUnits(state.previous, identity) >= 0
  ) {
    return Effect.fail(new TryoutDigestError({ code: "order", identity }));
  }
  state.update(canonical, identity);
  return Effect.succeed(state);
}

/** Digests one canonically ordered record stream with constant memory. */
export const digestTryoutRecords = Effect.fn(
  "AksaraContracts.digestTryoutRecords"
)(function* <E, R, Row>(input: {
  /** Serializes one row through its version-owned canonical format. */
  readonly canonicalize: (row: Row) => string;
  readonly domain: string;
  /** Returns the stable identity used to enforce canonical row order. */
  readonly identity: (row: Row) => string;
  readonly records: Stream.Stream<DigestRecord<Row>, E, R>;
  /** Recomputes the version-owned hash for one decoded row. */
  readonly rowHash: (row: Row) => typeof Sha256HashSchema.Type;
}) {
  const state = yield* input.records.pipe(
    Stream.runFoldEffect(
      new TryoutDigestState(input.domain),
      (current, record) => {
        const canonical = input.canonicalize(record.row);
        return updateDigest(
          current,
          record,
          input.identity(record.row),
          input.rowHash(record.row),
          `${canonical}\0${record.rowHash}`
        );
      }
    )
  );
  return { count: state.count, digest: state.digest() };
});

/** Digests canonically ordered hierarchy records in constant space. */
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
