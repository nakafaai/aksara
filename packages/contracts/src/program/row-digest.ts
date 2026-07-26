import { createHash } from "node:crypto";

import { Effect, Schema, Stream } from "effect";

import { ContentLocaleSchema } from "#contracts/content";
import { Sha256HashSchema } from "#contracts/ids";
import {
  CURRICULUM_NAMESPACES,
  type CurriculumRoute,
} from "#contracts/program/curriculum";
import {
  canonicalizeProgramSnapshotRow,
  hashCurriculumRow,
  hashProgramRow,
  ProgramHashError,
} from "#contracts/program/row-hash";
import type {
  ProgramCounts,
  ProgramSnapshotRow,
} from "#contracts/program/snapshot";
import type { LearningProgram } from "#contracts/program/spec";
import { compareCodeUnits } from "#contracts/text/order";

const DIGEST_DOMAIN = "nakafa.aksara.program-rows.v3";

/** An aggregate program stream is incomplete, duplicated, or tampered. */
export class ProgramDigestError extends Schema.TaggedError<ProgramDigestError>()(
  "ProgramDigestError",
  {
    code: Schema.Literal(
      "count",
      "integrity",
      "key",
      "order",
      "parent",
      "program",
      "route",
      "root",
      "slug"
    ),
    identity: Schema.String,
  }
) {}

/** Serializes source-derived counts for exact replay comparison. */
function countIdentity(counts: ProgramCounts) {
  return [
    counts.curriculumRowCount,
    counts.programRowCount,
    counts.rowCount,
    counts.sitemapCount,
    counts.slugCount,
  ].join(":");
}

/** Checks that one root is the exact localized route owned by its program. */
function isExactProgramRoot(row: CurriculumRoute, program: LearningProgram) {
  const translation = program.translations[row.locale];
  const namespace = CURRICULUM_NAMESPACES[row.locale];
  return (
    row.iconKey === program.iconKey &&
    row.order === program.displayOrder &&
    row.publicPath === `${namespace}/${translation.publicSlug}` &&
    row.title === translation.title
  );
}

/** Keeps bounded identity and digest state private to one stream replay. */
class ProgramDigestState {
  readonly #hash = createHash("sha256").update(`${DIGEST_DOMAIN}\n`);
  readonly #nodes = new Set<string>();
  readonly #paths = new Set<string>();
  readonly #programs = new Map<string, LearningProgram>();
  readonly #roots = new Set<string>();
  readonly #slugs = new Set<string>();
  #lastCurriculumKey: string | undefined;
  #lastProgramOrder = 0;
  curriculumRowCount = 0;
  programRowCount = 0;
  sitemapCount = 0;

  /** Returns source-independent count evidence collected from accepted rows. */
  counts(): ProgramCounts {
    return {
      curriculumRowCount: this.curriculumRowCount,
      programRowCount: this.programRowCount,
      rowCount: this.curriculumRowCount + this.programRowCount,
      sitemapCount: this.sitemapCount,
      slugCount: this.#slugs.size,
    };
  }

  /** Adds one verified row after checking canonical stream ownership and order. */
  add(record: ProgramSnapshotRow) {
    return record.kind === "program"
      ? this.#addProgram(record)
      : this.#addCurriculum(record);
  }

  /** Finalizes complete catalog, root, and count evidence. */
  validateComplete(expected?: ProgramCounts) {
    const expectedRoots = new Set<string>();
    for (const program of this.#programs.values()) {
      if (program.navigation.model !== "curriculum-tree") {
        continue;
      }
      for (const locale of ContentLocaleSchema.literals) {
        expectedRoots.add(`${program.key}\0${locale}`);
      }
    }
    const counts = this.counts();
    const expectedCounts = expected ?? counts;
    if (
      this.programRowCount > 0 &&
      this.#slugs.size ===
        this.programRowCount * ContentLocaleSchema.literals.length &&
      expectedRoots.size === this.#roots.size &&
      [...expectedRoots].every((root) => this.#roots.has(root)) &&
      countIdentity(counts) === countIdentity(expectedCounts)
    ) {
      return Effect.void;
    }
    return Effect.fail(
      new ProgramDigestError({
        code: "count",
        identity: JSON.stringify({
          actual: counts,
          expected,
          rootCount: this.#roots.size,
        }),
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

  /** Adds one catalog row before any curriculum records. */
  #addProgram(record: Extract<ProgramSnapshotRow, { kind: "program" }>) {
    const { row } = record;
    if (
      this.curriculumRowCount > 0 ||
      row.displayOrder <= this.#lastProgramOrder
    ) {
      return Effect.fail(
        new ProgramDigestError({ code: "order", identity: row.key })
      );
    }
    if (this.#programs.has(row.key)) {
      return Effect.fail(
        new ProgramDigestError({ code: "key", identity: row.key })
      );
    }
    for (const locale of ContentLocaleSchema.literals) {
      const slug = `${locale}\0${row.translations[locale].publicSlug}`;
      if (this.#slugs.has(slug)) {
        return Effect.fail(
          new ProgramDigestError({ code: "slug", identity: slug })
        );
      }
      this.#slugs.add(slug);
    }
    this.#programs.set(row.key, row);
    this.#lastProgramOrder = row.displayOrder;
    this.programRowCount += 1;
    return this.#updateDigest(record);
  }

  /** Adds one localized route after validating program, identity, and ancestry. */
  #addCurriculum(record: Extract<ProgramSnapshotRow, { kind: "curriculum" }>) {
    const { row } = record;
    const program = this.#programs.get(row.programKey);
    if (program?.navigation.model !== "curriculum-tree") {
      return Effect.fail(
        new ProgramDigestError({
          code: "program",
          identity: row.programKey,
        })
      );
    }
    const orderKey = `${row.programKey}\0${row.locale}\0${row.publicPath}`;
    if (
      this.#lastCurriculumKey !== undefined &&
      compareCodeUnits(this.#lastCurriculumKey, orderKey) >= 0
    ) {
      return Effect.fail(
        new ProgramDigestError({ code: "order", identity: orderKey })
      );
    }
    const routeIdentity = `${row.locale}\0${row.publicPath}`;
    const nodeIdentity = `${row.programKey}\0${row.locale}\0${row.nodeKey}`;
    if (this.#nodes.has(nodeIdentity)) {
      return Effect.fail(
        new ProgramDigestError({ code: "key", identity: nodeIdentity })
      );
    }
    if (this.#paths.has(routeIdentity)) {
      return Effect.fail(
        new ProgramDigestError({ code: "route", identity: routeIdentity })
      );
    }
    if (row.parentPath === undefined) {
      const rootIdentity = `${row.programKey}\0${row.locale}`;
      if (!isExactProgramRoot(row, program)) {
        return Effect.fail(
          new ProgramDigestError({ code: "root", identity: rootIdentity })
        );
      }
      this.#roots.add(rootIdentity);
    } else if (!this.#paths.has(`${row.locale}\0${row.parentPath}`)) {
      return Effect.fail(
        new ProgramDigestError({
          code: "parent",
          identity: nodeIdentity,
        })
      );
    }
    this.#lastCurriculumKey = orderKey;
    this.#nodes.add(nodeIdentity);
    this.#paths.add(routeIdentity);
    this.curriculumRowCount += 1;
    this.sitemapCount += row.sitemap ? 1 : 0;
    return this.#updateDigest(record);
  }

  /** Adds canonical record bytes and their authenticated row hash. */
  #updateDigest(record: ProgramSnapshotRow) {
    return Effect.try({
      catch: () => new ProgramHashError({ scope: "digest" }),
      try: () => {
        this.#hash
          .update(canonicalizeProgramSnapshotRow(record))
          .update("\0")
          .update(record.rowHash)
          .update("\n");
      },
    });
  }
}

/** Verifies one row hash before advancing aggregate digest state. */
const updateProgramDigest = Effect.fn("AksaraContracts.updateProgramDigest")(
  function* (state: ProgramDigestState, record: ProgramSnapshotRow) {
    const expected =
      record.kind === "program"
        ? yield* hashProgramRow(record.row)
        : yield* hashCurriculumRow(record.row);
    if (expected !== record.rowHash) {
      return yield* new ProgramDigestError({
        code: "integrity",
        identity:
          record.kind === "program" ? record.row.key : record.row.publicPath,
      });
    }
    yield* state.add(record);
    return state;
  }
);

/** Digests all catalog and localized curriculum rows in constant row space. */
export const digestProgramRows = Effect.fn("AksaraContracts.digestProgramRows")(
  function* <E, R>(
    rows: Stream.Stream<ProgramSnapshotRow, E, R>,
    expected?: ProgramCounts
  ) {
    const state = yield* Effect.try({
      catch: () => new ProgramHashError({ scope: "digest" }),
      try: () => new ProgramDigestState(),
    });
    yield* rows.pipe(
      Stream.runForEach((record) => updateProgramDigest(state, record))
    );
    yield* state.validateComplete(expected);
    const rowDigest = yield* state.digest();
    return {
      ...state.counts(),
      rowDigest,
    };
  }
);
