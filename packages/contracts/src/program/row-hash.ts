import { createHash } from "node:crypto";

import { Effect, Schema, Stream } from "effect";

import { Sha256HashSchema } from "#contracts/ids";
import {
  PROGRAM_ROW_COUNT,
  PROGRAM_SLUG_COUNT,
  type ProgramSnapshotRow,
  ProgramSnapshotRowSchema,
} from "#contracts/program/snapshot";
import {
  canonicalizeLearningProgram,
  type LearningProgram,
} from "#contracts/program/spec";

const ROW_DOMAIN = "nakafa.aksara.program-row.v1";
const DIGEST_DOMAIN = "nakafa.aksara.program-rows.v1";

/** Node could not complete a deterministic program hash operation. */
export class ProgramHashError extends Schema.TaggedError<ProgramHashError>()(
  "ProgramHashError",
  { scope: Schema.Literal("digest", "row") }
) {}

/** A program snapshot stream is incomplete, duplicated, or tampered. */
export class ProgramDigestError extends Schema.TaggedError<ProgramDigestError>()(
  "ProgramDigestError",
  {
    code: Schema.Literal("count", "integrity", "key", "order", "slug"),
    identity: Schema.String,
  }
) {}

/** Compares program rows by source-owned display order, then stable key. */
export function compareProgramRows(
  left: LearningProgram,
  right: LearningProgram
) {
  const order = left.displayOrder - right.displayOrder;
  if (order !== 0) {
    return order;
  }
  if (left.key < right.key) {
    return -1;
  }
  if (left.key > right.key) {
    return 1;
  }
  return 0;
}

/** Computes one program row's domain-separated content identity. */
export function hashProgramRow(row: LearningProgram) {
  return Effect.try({
    catch: () => new ProgramHashError({ scope: "row" }),
    try: () =>
      Sha256HashSchema.make(
        `sha256:${createHash("sha256")
          .update(`${ROW_DOMAIN}\n${canonicalizeLearningProgram(row)}`)
          .digest("hex")}`
      ),
  });
}

/** Creates one immutable program record from a decoded source row. */
export const makeProgramSnapshotRow = Effect.fn(
  "AksaraContracts.makeProgramSnapshotRow"
)(function* (row: LearningProgram) {
  const rowHash = yield* hashProgramRow(row);
  return ProgramSnapshotRowSchema.make({ row, rowHash });
});

/** Keeps bounded identity and digest state private to one stream replay. */
class ProgramDigestState {
  readonly #hash = createHash("sha256").update(`${DIGEST_DOMAIN}\n`);
  readonly #keys = new Set<string>();
  readonly #slugs = new Set<string>();
  #previous: LearningProgram | undefined;
  count = 0;

  /** Verifies identity ownership before adding one canonical record. */
  add(record: ProgramSnapshotRow) {
    const { row } = record;
    if (this.#keys.has(row.key)) {
      return Effect.fail(
        new ProgramDigestError({ code: "key", identity: row.key })
      );
    }
    if (
      this.#previous !== undefined &&
      this.#previous.displayOrder >= row.displayOrder
    ) {
      return Effect.fail(
        new ProgramDigestError({ code: "order", identity: row.key })
      );
    }
    for (const locale of ["en", "id"] as const) {
      const identity = `${locale}:${row.translations[locale].publicSlug}`;
      if (this.#slugs.has(identity)) {
        return Effect.fail(new ProgramDigestError({ code: "slug", identity }));
      }
      this.#slugs.add(identity);
    }
    this.#keys.add(row.key);
    this.#previous = row;
    this.count += 1;
    return Effect.try({
      catch: () => new ProgramHashError({ scope: "digest" }),
      try: () => {
        this.#hash
          .update(canonicalizeLearningProgram(row))
          .update("\0")
          .update(record.rowHash)
          .update("\n");
      },
    });
  }

  /** Rejects incomplete catalogs before finalizing their digest. */
  validateComplete() {
    if (
      this.count === PROGRAM_ROW_COUNT &&
      this.#slugs.size === PROGRAM_SLUG_COUNT
    ) {
      return Effect.void;
    }
    return Effect.fail(
      new ProgramDigestError({
        code: "count",
        identity: `${this.count}:${this.#slugs.size}`,
      })
    );
  }

  /** Consumes the complete canonical stream digest. */
  digest() {
    return Effect.try({
      catch: () => new ProgramHashError({ scope: "digest" }),
      try: () => Sha256HashSchema.make(`sha256:${this.#hash.digest("hex")}`),
    });
  }
}

/** Verifies one record hash before advancing ordered digest state. */
const updateProgramDigest = Effect.fn("AksaraContracts.updateProgramDigest")(
  function* (state: ProgramDigestState, record: ProgramSnapshotRow) {
    const expected = yield* hashProgramRow(record.row);
    if (expected !== record.rowHash) {
      return yield* new ProgramDigestError({
        code: "integrity",
        identity: record.row.key,
      });
    }
    yield* state.add(record);
    return state;
  }
);

/** Digests the exact six-row program stream in constant row-storage space. */
export const digestProgramRows = Effect.fn("AksaraContracts.digestProgramRows")(
  function* <E, R>(rows: Stream.Stream<ProgramSnapshotRow, E, R>) {
    const state = yield* Effect.try({
      catch: () => new ProgramHashError({ scope: "digest" }),
      try: () => new ProgramDigestState(),
    });
    yield* rows.pipe(
      Stream.runForEach((record) => updateProgramDigest(state, record))
    );
    yield* state.validateComplete();
    const rowDigest = yield* state.digest();
    return {
      rowCount: PROGRAM_ROW_COUNT,
      rowDigest,
      slugCount: PROGRAM_SLUG_COUNT,
    };
  }
);
