import type { BinaryLike } from "node:crypto";

import { Effect, Schema, Stream } from "effect";
import { describe, expect, it, vi } from "vitest";

import { PublicPathSchema, Sha256HashSchema } from "#contracts/ids";
import { CurriculumRouteSchema } from "#contracts/program/curriculum";
import { digestProgramRows } from "#contracts/program/row-digest";
import {
  makeCurriculumSnapshotRow,
  makeProgramSnapshotRow,
} from "#contracts/program/row-hash";
import {
  ProgramCountsSchema,
  type ProgramSnapshotRow,
} from "#contracts/program/snapshot";
import {
  makeTestCurriculumRoot,
  makeTestProgram,
  makeTestProgramRecords,
} from "#contracts/test/program";

const failures = vi.hoisted(
  (): {
    construct: boolean;
    stage: "digest" | "update" | null;
  } => ({ construct: false, stage: null })
);

vi.mock("node:crypto", async (importOriginal) => {
  const crypto = await importOriginal<typeof import("node:crypto")>();
  return {
    ...crypto,
    /** Injects deterministic failures into the aggregate digest domain. */
    createHash(algorithm: string) {
      if (failures.construct) {
        throw new TypeError("injected digest construction failure");
      }
      const hash = crypto.createHash(algorithm);
      let aggregate = false;
      return new Proxy(hash, {
        /** Preserves native binding while intercepting selected operations. */
        get(target, property, receiver) {
          if (property === "update") {
            return (data: BinaryLike) => {
              if (String(data).startsWith("nakafa.aksara.program-rows.v3\n")) {
                aggregate = true;
              } else if (aggregate && failures.stage === "update") {
                throw new TypeError("injected digest update failure");
              }
              target.update(data);
              return receiver;
            };
          }
          if (
            property === "digest" &&
            aggregate &&
            failures.stage === "digest"
          ) {
            return () => {
              throw new TypeError("injected digest finalization failure");
            };
          }
          const value = Reflect.get(target, property, target);
          return typeof value === "function" ? value.bind(target) : value;
        },
      });
    },
  };
});

/** Returns one typed digest failure without a FiberFailure wrapper. */
function reject(
  rows: readonly ProgramSnapshotRow[],
  expected?: typeof ProgramCountsSchema.Type
) {
  return Effect.runPromise(
    digestProgramRows(Stream.fromIterable(rows), expected).pipe(Effect.flip)
  );
}

describe("aggregate program row digest", () => {
  it("authenticates six programs and all localized curriculum roots", async () => {
    const { curriculumRecords, programRecords } = await Effect.runPromise(
      makeTestProgramRecords()
    );
    const summary = await Effect.runPromise(
      digestProgramRows(
        Stream.fromIterable([...programRecords, ...curriculumRecords])
      )
    );

    expect(summary).toMatchObject({
      curriculumRowCount: 390,
      programRowCount: 6,
      rowCount: 396,
      sitemapCount: 52,
      slugCount: 12,
    });
  });

  it("rejects tampered, duplicate, reversed, and incomplete program rows", async () => {
    const { curriculumRecords, programRecords } = await Effect.runPromise(
      makeTestProgramRecords()
    );
    const [first, second] = programRecords;
    const [firstCurriculum] = curriculumRecords;
    expect(first && second && firstCurriculum).toBeDefined();
    if (!(first && second && firstCurriculum)) {
      return;
    }
    const duplicateKey = await Effect.runPromise(
      makeProgramSnapshotRow({ ...second.row, key: first.row.key })
    );
    const duplicateSlug = await Effect.runPromise(
      makeProgramSnapshotRow({
        ...second.row,
        translations: {
          ...second.row.translations,
          en: first.row.translations.en,
        },
      })
    );
    const nonCurriculum = await Effect.runPromise(
      makeProgramSnapshotRow({
        ...first.row,
        navigation: {
          levels: ["domain", "set"],
          model: "exam-domain-set",
        },
      })
    );
    const nonCurriculumSummary = await Effect.runPromise(
      digestProgramRows(Stream.make(nonCurriculum))
    );
    const tamperedCurriculum = {
      ...firstCurriculum,
      rowHash: Sha256HashSchema.make(`sha256:${"e".repeat(64)}`),
    };
    const errors = await Promise.all([
      reject([
        {
          ...first,
          rowHash: Sha256HashSchema.make(`sha256:${"f".repeat(64)}`),
        },
      ]),
      reject([...programRecords, tamperedCurriculum]),
      reject([first, duplicateKey]),
      reject([first, duplicateSlug]),
      reject([second, first]),
      reject([first]),
      reject(programRecords.slice(0, 5)),
      reject([...programRecords, firstCurriculum, first]),
      reject(
        [...programRecords, ...curriculumRecords],
        ProgramCountsSchema.make({
          curriculumRowCount: 390,
          programRowCount: 7,
          rowCount: 397,
          sitemapCount: 52,
          slugCount: 14,
        })
      ),
    ]);

    expect(nonCurriculumSummary).toMatchObject({
      curriculumRowCount: 0,
      programRowCount: 1,
      rowCount: 1,
      sitemapCount: 0,
      slugCount: 2,
    });
    expect(
      errors.map((error) =>
        error._tag === "ProgramDigestError" ? error.code : error._tag
      )
    ).toEqual([
      "integrity",
      "integrity",
      "key",
      "slug",
      "order",
      "count",
      "count",
      "order",
      "count",
    ]);
  });

  it("rejects route ownership, order, ancestry, and identity conflicts", async () => {
    const { curriculumRecords, programRecords } = await Effect.runPromise(
      makeTestProgramRecords()
    );
    const [firstCurriculum, firstChild, secondChild] = curriculumRecords;
    expect(firstCurriculum && firstChild && secondChild).toBeDefined();
    if (!(firstCurriculum && firstChild && secondChild)) {
      return;
    }
    const missingProgram = makeTestProgram(7);
    const foreign = await Effect.runPromise(
      makeCurriculumSnapshotRow(makeTestCurriculumRoot(missingProgram, "en"))
    );
    const firstProgram = makeTestProgram(1);
    const duplicateRoute = await Effect.runPromise(
      makeCurriculumSnapshotRow(
        makeTestCurriculumRoot(
          makeTestProgram(2),
          "en",
          "curriculum/test-program-1"
        )
      )
    );
    const duplicateRoot = await Effect.runPromise(
      makeCurriculumSnapshotRow(
        makeTestCurriculumRoot(
          firstProgram,
          "en",
          "curriculum/test-program-1-copy"
        )
      )
    );
    const wrongRoot = await Effect.runPromise(
      makeCurriculumSnapshotRow(
        makeTestCurriculumRoot(
          firstProgram,
          "en",
          "curriculum/test-program-1-wrong"
        )
      )
    );
    const nested = await Effect.runPromise(
      makeCurriculumSnapshotRow(
        Schema.decodeUnknownSync(CurriculumRouteSchema)({
          canonicalPath: PublicPathSchema.make("subjects/mathematics/matrix"),
          iconKey: "mathematics",
          kind: "curriculum-context",
          level: "lesson",
          locale: "en",
          materialContextNodeKey: "test-matrix-group",
          materialContextParentPath: PublicPathSchema.make(
            "curriculum/test-program-1"
          ),
          materialContextPublicPath: PublicPathSchema.make(
            "curriculum/test-program-1/matrix"
          ),
          materialKey: "lesson.mathematics.matrix",
          nodeKey: "test-matrix",
          order: 1,
          parentPath: PublicPathSchema.make("curriculum/test-program-1/matrix"),
          programKey: firstProgram.key,
          publicPath: PublicPathSchema.make(
            "curriculum/test-program-1/matrix/test-matrix"
          ),
          sitemap: false,
          sourcePath: `packages/corpus/curriculum/${firstProgram.key}`,
          title: "Test-only matrix row",
        })
      )
    );
    const errors = await Promise.all([
      reject([...programRecords, foreign]),
      reject([...programRecords, firstCurriculum, secondChild, firstChild]),
      reject([...programRecords, firstCurriculum, firstCurriculum]),
      reject([...programRecords, firstCurriculum, duplicateRoute]),
      reject([...programRecords, firstCurriculum, duplicateRoot]),
      reject([...programRecords, wrongRoot]),
      reject([...programRecords, nested]),
    ]);

    expect(
      errors.map((error) =>
        error._tag === "ProgramDigestError" ? error.code : error._tag
      )
    ).toEqual(["program", "order", "order", "route", "key", "root", "parent"]);
  });

  it("maps digest construction, update, and finalization failures", async () => {
    failures.construct = true;
    const construct = await Effect.runPromise(
      digestProgramRows(Stream.empty).pipe(Effect.flip)
    );
    failures.construct = false;
    const { curriculumRecords, programRecords } = await Effect.runPromise(
      makeTestProgramRecords()
    );
    const rows = [...programRecords, ...curriculumRecords];
    failures.stage = "update";
    const update = await reject(rows);
    failures.stage = "digest";
    const digest = await reject(rows);
    failures.stage = null;

    expect([construct, update, digest].map(({ _tag }) => _tag)).toEqual([
      "ProgramHashError",
      "ProgramHashError",
      "ProgramHashError",
    ]);
  });
});
