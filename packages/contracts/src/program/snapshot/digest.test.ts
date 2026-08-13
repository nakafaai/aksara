import type { BinaryLike } from "node:crypto";

import { Effect, Schema, Stream } from "effect";
import { beforeAll, describe, expect, it, vi } from "vitest";

import { Sha256HashSchema } from "#contracts/ids";
import { ActiveAppLocaleListSchema } from "#contracts/locale";
import { CurriculumRouteSchema } from "#contracts/program/curriculum";
import { digestProgramRows } from "#contracts/program/snapshot/digest";
import type { ProgramSnapshotRow } from "#contracts/program/snapshot/row";
import {
  makeCurriculumSnapshotRow,
  makeProgramSnapshotRow,
} from "#contracts/program/snapshot/row-hash";
import { LearningProgramSchema } from "#contracts/program/spec";
import {
  curriculumRows,
  makeProgramTestRecords,
  programCatalogRows,
} from "#contracts/test/program";

const failures = vi.hoisted(
  (): { construct: boolean; stage: "digest" | "update" | null } => ({
    construct: false,
    stage: null,
  })
);

vi.mock("node:crypto", async (importOriginal) => {
  const crypto = await importOriginal<typeof import("node:crypto")>();
  return {
    ...crypto,
    /** Injects deterministic failures into the current aggregate digest. */
    createHash(algorithm: string) {
      if (failures.construct) {
        throw new TypeError("injected current digest construction failure");
      }
      const hash = crypto.createHash(algorithm);
      let aggregate = false;
      return new Proxy(hash, {
        /** Preserves native binding while intercepting selected operations. */
        get(target, property, receiver) {
          if (property === "update") {
            return (data: BinaryLike) => {
              if (String(data).startsWith("nakafa.aksara.program-rows\n")) {
                aggregate = true;
              } else if (aggregate && failures.stage === "update") {
                throw new TypeError("injected current digest update failure");
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
              throw new TypeError(
                "injected current digest finalization failure"
              );
            };
          }
          const value = Reflect.get(target, property, target);
          return typeof value === "function" ? value.bind(target) : value;
        },
      });
    },
  };
});

const activeAppLocales = Schema.decodeUnknownSync(ActiveAppLocaleListSchema)([
  "en",
  "id",
]);
let records: readonly ProgramSnapshotRow[];

beforeAll(async () => {
  records = await Effect.runPromise(makeProgramTestRecords());
}, 30_000);

/** Returns one typed current program digest failure. */
function reject(
  rows: readonly ProgramSnapshotRow[],
  locales = activeAppLocales,
  expected?: {
    readonly curriculumRowCount: number;
    readonly programRowCount: number;
    readonly rowCount: number;
    readonly sitemapCount: number;
    readonly slugCount: number;
  }
) {
  const input = {
    activeAppLocales: locales,
    rows: Stream.fromIterable(rows),
  };
  return Effect.runPromise(
    digestProgramRows(
      expected === undefined ? input : { ...input, expected }
    ).pipe(Effect.flip)
  );
}

describe("program aggregate digest", () => {
  it("authenticates exact active-locale program and route closure", async () => {
    const summary = await Effect.runPromise(
      digestProgramRows({
        activeAppLocales,
        rows: Stream.fromIterable(records),
      })
    );
    const firstProgram = records.find((record) => record.kind === "program");
    if (firstProgram?.kind !== "program") {
      throw new Error("Expected one current program record.");
    }
    const nonCurriculum = await Effect.runPromise(
      makeProgramSnapshotRow({
        ...firstProgram.row,
        navigation: { levels: ["domain", "set"], model: "exam-domain-set" },
      })
    );
    const nonCurriculumSummary = await Effect.runPromise(
      digestProgramRows({
        activeAppLocales,
        rows: Stream.make(nonCurriculum),
      })
    );

    expect(summary).toMatchObject({
      curriculumRowCount: 390,
      programRowCount: 6,
      rowCount: 396,
      sitemapCount: 54,
      slugCount: 12,
    });
    expect(nonCurriculumSummary).toMatchObject({
      curriculumRowCount: 0,
      programRowCount: 1,
      rowCount: 1,
    });
  });

  it("rejects wrong locale sets, row integrity, order, keys, and slugs", async () => {
    const programs = programCatalogRows(records);
    const curricula = curriculumRows(records);
    const [first, second] = programs;
    const [firstCurriculum] = curricula;
    if (!(first && second && firstCurriculum)) {
      throw new Error("Expected complete current program fixtures.");
    }
    const duplicateKey = await Effect.runPromise(
      makeProgramSnapshotRow({ ...second.row, key: first.row.key })
    );
    const duplicateSlugRow = Schema.decodeUnknownSync(LearningProgramSchema)({
      ...second.row,
      translations: second.row.translations.map((translation, index) => ({
        ...translation,
        publicSlug:
          first.row.translations[index]?.publicSlug ?? translation.publicSlug,
      })),
    });
    const duplicateSlug = await Effect.runPromise(
      makeProgramSnapshotRow(duplicateSlugRow)
    );
    const germanLocales = Schema.decodeUnknownSync(ActiveAppLocaleListSchema)([
      "en",
      "de",
    ]);
    const tamperedProgram = {
      ...first,
      rowHash: Sha256HashSchema.make(`sha256:${"f".repeat(64)}`),
    };
    const tamperedCurriculum = {
      ...firstCurriculum,
      rowHash: Sha256HashSchema.make(`sha256:${"e".repeat(64)}`),
    };
    const errors = await Promise.all([
      reject([first], germanLocales),
      reject([tamperedProgram]),
      reject([...programs, tamperedCurriculum]),
      reject([second, first]),
      reject([first, duplicateKey]),
      reject([first, duplicateSlug]),
      reject([...programs, firstCurriculum, first]),
      reject([...programs, firstCurriculum, firstCurriculum]),
      reject(records, activeAppLocales, {
        curriculumRowCount: 390,
        programRowCount: 7,
        rowCount: 397,
        sitemapCount: 52,
        slugCount: 14,
      }),
    ]);

    expect(
      errors.map((error) =>
        error._tag === "ProgramDigestError" ? error.code : error._tag
      )
    ).toEqual([
      "key",
      "integrity",
      "integrity",
      "order",
      "key",
      "slug",
      "order",
      "order",
      "count",
    ]);
  });

  it("rejects route ownership, ancestry, roots, and node conflicts", async () => {
    const programs = programCatalogRows(records);
    const curricula = curriculumRows(records);
    const firstRoot = curricula.find(
      (record) => record.row.parentPath === undefined
    );
    const firstRootIndex =
      firstRoot === undefined ? -1 : curricula.indexOf(firstRoot);
    const firstChild = curricula[firstRootIndex + 1];
    const secondChild = curricula[firstRootIndex + 2];
    const [firstProgram] = programs;
    if (!(firstProgram && firstRoot && firstChild && secondChild)) {
      throw new Error("Expected current route fixtures.");
    }
    const wrongRoot = await Effect.runPromise(
      makeCurriculumSnapshotRow({
        ...firstRoot.row,
        title: `${firstRoot.row.title} wrong`,
      })
    );
    const duplicateNode = await Effect.runPromise(
      makeCurriculumSnapshotRow({
        ...secondChild.row,
        nodeKey: firstChild.row.nodeKey,
      })
    );
    const germanRoute = Schema.decodeUnknownSync(CurriculumRouteSchema)({
      ...firstRoot.row,
      appLocale: "de",
      publicPath: `lehrplaene/${firstProgram.row.translations[0].publicSlug}`,
      title: firstProgram.row.translations[0].title,
    });
    const inactiveLocale = await Effect.runPromise(
      makeCurriculumSnapshotRow(germanRoute)
    );
    const nonCurriculum = await Effect.runPromise(
      makeProgramSnapshotRow({
        ...firstProgram.row,
        navigation: { levels: ["domain", "set"], model: "exam-domain-set" },
      })
    );
    const errors = await Promise.all([
      reject([...programs, inactiveLocale]),
      reject([nonCurriculum, firstRoot]),
      reject([...programs, wrongRoot]),
      reject([...programs, firstChild]),
      reject([...programs, firstRoot, firstChild, duplicateNode]),
    ]);

    expect(
      errors.map((error) =>
        error._tag === "ProgramDigestError" ? error.code : error._tag
      )
    ).toEqual(["program", "program", "root", "parent", "route"]);
  });

  it("maps digest construction, update, and finalization failures", async () => {
    failures.construct = true;
    const constructError = await reject([]);
    failures.construct = false;
    failures.stage = "update";
    const updateError = await reject(records.slice(0, 1));
    failures.stage = "digest";
    const digestError = await reject(records);
    failures.stage = null;

    expect(constructError).toMatchObject({
      _tag: "ProgramRowHashError",
      scope: "digest",
    });
    expect(updateError).toMatchObject({
      _tag: "ProgramRowHashError",
      scope: "digest",
    });
    expect(digestError).toMatchObject({
      _tag: "ProgramRowHashError",
      scope: "digest",
    });
  });
});
