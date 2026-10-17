import { Effect, Schema, Stream } from "effect";

import { DigestStream } from "#contracts/hash/stream";
import type { Sha256HashSchema } from "#contracts/ids";
import { compareCodeUnits } from "#contracts/text/order";

/** A snapshot stream is duplicated, unsorted, or tampered. */
export class TryoutDigestError extends Schema.TaggedError<
  TryoutDigestError,
  { readonly brand: unique symbol }
>()("TryoutDigestError", {
  code: Schema.Literals(["integrity", "order"]),
  identity: Schema.String,
}) {}

interface DigestRecord<Row> {
  readonly row: Row;
  readonly rowHash: typeof Sha256HashSchema.Type;
}

/** Keeps one stream digest and previous identity private to its replay. */
class TryoutDigestState {
  readonly #stream = new DigestStream();
  count = 0;
  previous: string | undefined;

  /** Starts one fresh domain-separated digest stream. */
  constructor(domain: string) {
    this.#stream.add(domain);
    this.#stream.add("\n");
  }

  /** Adds one verified canonical record to the digest. */
  update(canonical: string, identity: string) {
    this.#stream.add(canonical);
    this.#stream.add("\n");
    this.count += 1;
    this.previous = identity;
  }

  /** Digests the complete stream once and returns its branded value. */
  digest() {
    return this.#stream.digest();
  }
}

/** Verifies one immutable record and adds its canonical bytes to the digest stream. */
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

/**
 * Digests one canonically ordered record stream. The canonical bytes are held
 * until one Web Crypto digest runs over them, because Web Crypto has no
 * incremental form.
 */
export const digestTryoutRecords = Effect.fn(
  "AksaraContracts.digestTryoutRecords"
)(function* <E, R, Row, HashError>(input: {
  /** Serializes one row into its exact digest bytes. */
  readonly canonicalize: (row: Row) => string;
  readonly domain: string;
  /** Returns one stable ordering identity for a row. */
  readonly identity: (row: Row) => string;
  readonly records: Stream.Stream<DigestRecord<Row>, E, R>;
  /** Recomputes the authenticated row hash for integrity checking. */
  readonly rowHash: (
    row: Row
  ) => Effect.Effect<typeof Sha256HashSchema.Type, HashError>;
}) {
  const state = yield* input.records.pipe(
    Stream.runFoldEffect(
      () => new TryoutDigestState(input.domain),
      (current, record) =>
        Effect.gen(function* () {
          const canonical = input.canonicalize(record.row);
          const expectedHash = yield* input.rowHash(record.row);
          return yield* updateDigest(
            current,
            record,
            input.identity(record.row),
            expectedHash,
            `${canonical}\0${record.rowHash}`
          );
        })
    )
  );
  const digest = yield* state.digest();
  return { count: state.count, digest };
});
