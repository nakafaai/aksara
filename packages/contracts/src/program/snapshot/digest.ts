import { createHash } from "node:crypto";

import {
  Effect,
  MutableHashMap,
  MutableHashSet,
  Option,
  Schema,
  Stream,
} from "effect";

import { Sha256HashSchema } from "#contracts/ids";
import type { ActiveAppLocaleList, AppLocale } from "#contracts/locale";
import {
  type CurriculumRoute,
  curriculumNamespace,
} from "#contracts/program/curriculum";
import {
  ProgramRowHashError,
  verifyProgramSnapshotRowHash,
} from "#contracts/program/snapshot/hash";
import {
  canonicalizeProgramSnapshotRow,
  type ProgramSnapshotRow,
} from "#contracts/program/snapshot/row";
import type { ProgramCounts } from "#contracts/program/snapshot/spec";
import type { LearningProgram } from "#contracts/program/spec";
import { encodeJsonText } from "#contracts/text/json";
import { compareCodeUnits } from "#contracts/text/order";

const DIGEST_DOMAIN = "nakafa.aksara.program-rows";

/** An aggregate program stream is incomplete, duplicated, or tampered. */
export class ProgramDigestError extends Schema.TaggedError<ProgramDigestError>()(
  "ProgramDigestError",
  {
    code: Schema.Literals([
      "count",
      "integrity",
      "key",
      "order",
      "parent",
      "program",
      "route",
      "root",
      "slug",
    ]),
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

/** Resolves one required localized program identity. */
function translationFor(program: LearningProgram, appLocale: AppLocale) {
  return program.translations.find(
    (translation) => translation.appLocale === appLocale
  );
}

/** Checks that one root is the exact localized route owned by its program. */
function isExactProgramRoot(row: CurriculumRoute, program: LearningProgram) {
  const translation = translationFor(program, row.appLocale);
  return (
    translation !== undefined &&
    row.iconKey === program.iconKey &&
    row.order === program.displayOrder &&
    row.publicPath ===
      `${curriculumNamespace(row.appLocale)}/${translation.publicSlug}` &&
    row.title === translation.title
  );
}

/** Keeps current locale closure, identity, and digest state in one replay. */
class ProgramDigestState {
  readonly #activeAppLocales: ActiveAppLocaleList;
  readonly #hash = createHash("sha256").update(`${DIGEST_DOMAIN}\n`);
  readonly #nodes = MutableHashSet.empty<string>();
  readonly #paths = MutableHashSet.empty<string>();
  readonly #programs = MutableHashMap.empty<string, LearningProgram>();
  readonly #routes = MutableHashSet.empty<string>();
  readonly #roots = MutableHashSet.empty<string>();
  readonly #slugs = MutableHashSet.empty<string>();
  #lastCurriculumKey: string | undefined;
  #lastProgramOrder = 0;
  curriculumRowCount = 0;
  programRowCount = 0;
  sitemapCount = 0;

  /** Initializes one isolated replay under the signed active locale set. */
  constructor(activeAppLocales: ActiveAppLocaleList) {
    this.#activeAppLocales = activeAppLocales;
  }

  /** Returns source-independent count evidence collected from accepted rows. */
  counts(): ProgramCounts {
    return {
      curriculumRowCount: this.curriculumRowCount,
      programRowCount: this.programRowCount,
      rowCount: this.curriculumRowCount + this.programRowCount,
      sitemapCount: this.sitemapCount,
      slugCount: MutableHashSet.size(this.#slugs),
    };
  }

  /** Adds one verified current row after checking ownership and order. */
  add(record: ProgramSnapshotRow) {
    return record.kind === "program"
      ? this.#addProgram(record)
      : this.#addCurriculum(record);
  }

  /** Finalizes complete catalog, root, locale, and count evidence. */
  validateComplete(expected?: ProgramCounts) {
    const expectedRoots = MutableHashSet.empty<string>();
    for (const program of MutableHashMap.values(this.#programs)) {
      if (program.navigation.model !== "curriculum-tree") {
        continue;
      }
      for (const locale of this.#activeAppLocales) {
        MutableHashSet.add(expectedRoots, `${program.key}\0${locale}`);
      }
    }
    const counts = this.counts();
    const expectedCounts = expected ?? counts;
    if (
      this.programRowCount > 0 &&
      MutableHashSet.size(this.#slugs) ===
        this.programRowCount * this.#activeAppLocales.length &&
      MutableHashSet.size(expectedRoots) === MutableHashSet.size(this.#roots) &&
      [...expectedRoots].every((root) =>
        MutableHashSet.has(this.#roots, root)
      ) &&
      countIdentity(counts) === countIdentity(expectedCounts)
    ) {
      return Effect.void;
    }
    return Effect.fail(
      new ProgramDigestError({
        code: "count",
        identity: encodeJsonText({
          actual: counts,
          expected,
          rootCount: MutableHashSet.size(this.#roots),
        }),
      })
    );
  }

  /** Consumes the complete canonical stream digest. */
  digest() {
    return Effect.try({
      catch: () => new ProgramRowHashError({ scope: "digest" }),
      try: () => Sha256HashSchema.make(`sha256:${this.#hash.digest("hex")}`),
    });
  }

  /** Adds one catalog row before any current curriculum records. */
  #addProgram(record: Extract<ProgramSnapshotRow, { kind: "program" }>) {
    const { row } = record;
    const translationLocales = row.translations.map(
      (translation) => translation.appLocale
    );
    if (
      this.curriculumRowCount > 0 ||
      row.displayOrder <= this.#lastProgramOrder
    ) {
      return Effect.fail(
        new ProgramDigestError({ code: "order", identity: row.key })
      );
    }
    if (
      MutableHashMap.has(this.#programs, row.key) ||
      encodeJsonText(translationLocales) !==
        encodeJsonText(this.#activeAppLocales)
    ) {
      return Effect.fail(
        new ProgramDigestError({ code: "key", identity: row.key })
      );
    }
    for (const translation of row.translations) {
      const slug = `${translation.appLocale}\0${translation.publicSlug}`;
      if (MutableHashSet.has(this.#slugs, slug)) {
        return Effect.fail(
          new ProgramDigestError({ code: "slug", identity: slug })
        );
      }
      MutableHashSet.add(this.#slugs, slug);
    }
    MutableHashMap.set(this.#programs, row.key, row);
    this.#lastProgramOrder = row.displayOrder;
    this.programRowCount += 1;
    return this.#updateDigest(record);
  }

  /** Adds one localized route after validating identity and ancestry. */
  #addCurriculum(record: Extract<ProgramSnapshotRow, { kind: "curriculum" }>) {
    const { row } = record;
    const program = Option.getOrUndefined(
      MutableHashMap.get(this.#programs, row.programKey)
    );
    if (
      !this.#activeAppLocales.includes(row.appLocale) ||
      program?.navigation.model !== "curriculum-tree"
    ) {
      return Effect.fail(
        new ProgramDigestError({ code: "program", identity: row.programKey })
      );
    }
    const orderKey = `${row.programKey}\0${row.appLocale}\0${row.publicPath}`;
    if (
      this.#lastCurriculumKey !== undefined &&
      compareCodeUnits(this.#lastCurriculumKey, orderKey) >= 0
    ) {
      return Effect.fail(
        new ProgramDigestError({ code: "order", identity: orderKey })
      );
    }
    const pathIdentity = `${row.programKey}\0${row.appLocale}\0${row.publicPath}`;
    const routeIdentity = `${row.appLocale}\0${row.publicPath}`;
    const nodeIdentity = `${row.programKey}\0${row.appLocale}\0${row.nodeKey}`;
    if (
      MutableHashSet.has(this.#nodes, nodeIdentity) ||
      MutableHashSet.has(this.#paths, pathIdentity) ||
      MutableHashSet.has(this.#routes, routeIdentity)
    ) {
      return Effect.fail(
        new ProgramDigestError({ code: "route", identity: routeIdentity })
      );
    }
    if (row.parentPath === undefined) {
      const rootIdentity = `${row.programKey}\0${row.appLocale}`;
      if (!isExactProgramRoot(row, program)) {
        return Effect.fail(
          new ProgramDigestError({ code: "root", identity: rootIdentity })
        );
      }
      MutableHashSet.add(this.#roots, rootIdentity);
    } else if (
      !MutableHashSet.has(
        this.#paths,
        `${row.programKey}\0${row.appLocale}\0${row.parentPath}`
      )
    ) {
      return Effect.fail(
        new ProgramDigestError({ code: "parent", identity: nodeIdentity })
      );
    }
    this.#lastCurriculumKey = orderKey;
    MutableHashSet.add(this.#nodes, nodeIdentity);
    MutableHashSet.add(this.#paths, pathIdentity);
    MutableHashSet.add(this.#routes, routeIdentity);
    this.curriculumRowCount += 1;
    this.sitemapCount += row.sitemap ? 1 : 0;
    return this.#updateDigest(record);
  }

  /** Adds canonical current record bytes and their authenticated row hash. */
  #updateDigest(record: ProgramSnapshotRow) {
    return Effect.try({
      catch: () => new ProgramRowHashError({ scope: "digest" }),
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

/** Verifies one current row hash before advancing aggregate state. */
const updateProgramDigest = Effect.fn("AksaraContracts.updateProgramDigest")(
  function* (state: ProgramDigestState, record: ProgramSnapshotRow) {
    const expected = yield* verifyProgramSnapshotRowHash(record);
    if (expected !== record.rowHash) {
      return yield* new ProgramDigestError({
        code: "integrity",
        identity:
          record.kind === "program" ? record.row.key : record.row.publicPath,
      });
    }
    yield* state.add(record);
  }
);

/** Digests a complete current program snapshot under its active locale set. */
export const digestProgramRows = Effect.fn("AksaraContracts.digestProgramRows")(
  function* <E, R>(input: {
    readonly activeAppLocales: ActiveAppLocaleList;
    readonly expected?: ProgramCounts;
    readonly rows: Stream.Stream<ProgramSnapshotRow, E, R>;
  }) {
    const state = yield* Effect.try({
      catch: () => new ProgramRowHashError({ scope: "digest" }),
      try: () => new ProgramDigestState(input.activeAppLocales),
    });
    yield* input.rows.pipe(
      Stream.runForEach((record) => updateProgramDigest(state, record))
    );
    yield* state.validateComplete(input.expected);
    const rowDigest = yield* state.digest();
    return { ...state.counts(), rowDigest };
  }
);
