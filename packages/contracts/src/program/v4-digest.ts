import { createHash } from "node:crypto";

import { Effect, Stream } from "effect";

import { Sha256HashSchema } from "#contracts/ids";
import type { ActiveAppLocaleList, AppLocale } from "#contracts/locale";
import {
  type CurriculumRouteV4,
  curriculumNamespace,
} from "#contracts/program/curriculum";
import { ProgramDigestError } from "#contracts/program/row-digest";
import { ProgramHashError } from "#contracts/program/row-hash";
import type { ProgramCounts } from "#contracts/program/snapshot/spec";
import {
  canonicalizeProgramSnapshotV4Row,
  type LearningProgramV4,
  type ProgramSnapshotV4Row,
} from "#contracts/program/v4";
import { verifyProgramSnapshotV4RowHash } from "#contracts/program/v4-hash";
import { compareCodeUnits } from "#contracts/text/order";

const DIGEST_DOMAIN = "nakafa.aksara.program-rows.v4";

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
function translationFor(program: LearningProgramV4, appLocale: AppLocale) {
  return program.translations.find(
    (translation) => translation.appLocale === appLocale
  );
}

/** Checks that one root is the exact localized route owned by its program. */
function isExactProgramRoot(
  row: CurriculumRouteV4,
  program: LearningProgramV4
) {
  const translation = translationFor(program, row.locale);
  return (
    translation !== undefined &&
    row.iconKey === program.iconKey &&
    row.order === program.displayOrder &&
    row.publicPath ===
      `${curriculumNamespace(row.locale)}/${translation.publicSlug}` &&
    row.title === translation.title
  );
}

/** Keeps current locale closure, identity, and digest state in one replay. */
class ProgramV4DigestState {
  readonly #activeAppLocales: ActiveAppLocaleList;
  readonly #hash = createHash("sha256").update(`${DIGEST_DOMAIN}\n`);
  readonly #nodes = new Set<string>();
  readonly #paths = new Set<string>();
  readonly #programs = new Map<string, LearningProgramV4>();
  readonly #roots = new Set<string>();
  readonly #slugs = new Set<string>();
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
      slugCount: this.#slugs.size,
    };
  }

  /** Adds one verified current row after checking ownership and order. */
  add(record: ProgramSnapshotV4Row) {
    return record.kind === "program-v4"
      ? this.#addProgram(record)
      : this.#addCurriculum(record);
  }

  /** Finalizes complete catalog, root, locale, and count evidence. */
  validateComplete(expected?: ProgramCounts) {
    const expectedRoots = new Set<string>();
    for (const program of this.#programs.values()) {
      if (program.navigation.model !== "curriculum-tree") {
        continue;
      }
      for (const locale of this.#activeAppLocales) {
        expectedRoots.add(`${program.key}\0${locale}`);
      }
    }
    const counts = this.counts();
    const expectedCounts = expected ?? counts;
    if (
      this.programRowCount > 0 &&
      this.#slugs.size ===
        this.programRowCount * this.#activeAppLocales.length &&
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

  /** Adds one catalog row before any current curriculum records. */
  #addProgram(record: Extract<ProgramSnapshotV4Row, { kind: "program-v4" }>) {
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
      this.#programs.has(row.key) ||
      JSON.stringify(translationLocales) !==
        JSON.stringify(this.#activeAppLocales)
    ) {
      return Effect.fail(
        new ProgramDigestError({ code: "key", identity: row.key })
      );
    }
    for (const translation of row.translations) {
      const slug = `${translation.appLocale}\0${translation.publicSlug}`;
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

  /** Adds one localized route after validating identity and ancestry. */
  #addCurriculum(
    record: Extract<ProgramSnapshotV4Row, { kind: "curriculum-v4" }>
  ) {
    const { row } = record;
    const program = this.#programs.get(row.programKey);
    if (
      !this.#activeAppLocales.includes(row.locale) ||
      program?.navigation.model !== "curriculum-tree"
    ) {
      return Effect.fail(
        new ProgramDigestError({ code: "program", identity: row.programKey })
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
    if (this.#nodes.has(nodeIdentity) || this.#paths.has(routeIdentity)) {
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
        new ProgramDigestError({ code: "parent", identity: nodeIdentity })
      );
    }
    this.#lastCurriculumKey = orderKey;
    this.#nodes.add(nodeIdentity);
    this.#paths.add(routeIdentity);
    this.curriculumRowCount += 1;
    this.sitemapCount += row.sitemap ? 1 : 0;
    return this.#updateDigest(record);
  }

  /** Adds canonical current record bytes and their authenticated row hash. */
  #updateDigest(record: ProgramSnapshotV4Row) {
    return Effect.try({
      catch: () => new ProgramHashError({ scope: "digest" }),
      try: () => {
        this.#hash
          .update(canonicalizeProgramSnapshotV4Row(record))
          .update("\0")
          .update(record.rowHash)
          .update("\n");
      },
    });
  }
}

/** Verifies one current row hash before advancing aggregate state. */
const updateProgramV4Digest = Effect.fn(
  "AksaraContracts.updateProgramV4Digest"
)(function* (state: ProgramV4DigestState, record: ProgramSnapshotV4Row) {
  const expected = yield* verifyProgramSnapshotV4RowHash(record);
  if (expected !== record.rowHash) {
    return yield* new ProgramDigestError({
      code: "integrity",
      identity:
        record.kind === "program-v4" ? record.row.key : record.row.publicPath,
    });
  }
  yield* state.add(record);
});

/** Digests a complete current program snapshot under its active locale set. */
export const digestProgramV4Rows = Effect.fn(
  "AksaraContracts.digestProgramV4Rows"
)(function* <E, R>(input: {
  readonly activeAppLocales: ActiveAppLocaleList;
  readonly expected?: ProgramCounts;
  readonly rows: Stream.Stream<ProgramSnapshotV4Row, E, R>;
}) {
  const state = yield* Effect.try({
    catch: () => new ProgramHashError({ scope: "digest" }),
    try: () => new ProgramV4DigestState(input.activeAppLocales),
  });
  yield* input.rows.pipe(
    Stream.runForEach((record) => updateProgramV4Digest(state, record))
  );
  yield* state.validateComplete(input.expected);
  const rowDigest = yield* state.digest();
  return { ...state.counts(), rowDigest };
});
