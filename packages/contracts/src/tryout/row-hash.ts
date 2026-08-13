import { createHash } from "node:crypto";

import { Effect, Schema, Stream } from "effect";

import { Sha256HashSchema } from "#contracts/ids";
import { compareCodeUnits } from "#contracts/text/order";

/** A snapshot stream is duplicated, unsorted, or tampered. */
export class TryoutDigestError extends Schema.TaggedError<TryoutDigestError>()(
  "TryoutDigestError",
  {
    code: Schema.Literal("integrity", "order"),
    identity: Schema.String,
  }
) {}

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
    return Effect.fail(new TryoutDigestError({ code: "integrity", identity }));
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
  /** Serializes one row into its exact digest bytes. */
  readonly canonicalize: (row: Row) => string;
  readonly domain: string;
  /** Returns one stable ordering identity for a row. */
  readonly identity: (row: Row) => string;
  readonly records: Stream.Stream<DigestRecord<Row>, E, R>;
  /** Recomputes the authenticated row hash for integrity checking. */
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
