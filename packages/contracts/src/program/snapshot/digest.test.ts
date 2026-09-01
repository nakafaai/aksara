import type { BinaryLike } from "node:crypto";
import { describe, expect, it } from "@effect/vitest";
import { Effect, Schema, Stream } from "effect";

import { Sha256HashSchema } from "#contracts/ids";
import {
  ACTIVE_APP_LOCALES,
  ActiveAppLocaleListSchema,
} from "#contracts/locale";
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

/** Decodes one exact app-locale fixture through the production contract. */
function decodeAppLocales(input: unknown) {
  return Schema.decodeUnknownEffect(ActiveAppLocaleListSchema)(input);
}

/** Returns one typed current program digest failure. */
function reject(
  rows: readonly ProgramSnapshotRow[],
  locales = ACTIVE_APP_LOCALES,
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
  return digestProgramRows(
    expected === undefined ? input : { ...input, expected }
  ).pipe(Effect.flip);
}

describe("program aggregate digest", () => {
  it.effect("authenticates exact active-locale program and route closure", () =>
    Effect.gen(function* () {
      const records = yield* makeProgramTestRecords();
      const summary = yield* digestProgramRows({
        activeAppLocales: ACTIVE_APP_LOCALES,
        rows: Stream.fromIterable(records),
      });
      const firstProgram = yield* Effect.fromNullishOr(
        records.find((record) => record.kind === "program")
      );
      const nonCurriculum = yield* makeProgramSnapshotRow({
        ...firstProgram.row,
        navigation: { levels: ["domain", "set"], model: "exam-domain-set" },
      });
      const nonCurriculumSummary = yield* digestProgramRows({
        activeAppLocales: ACTIVE_APP_LOCALES,
        rows: Stream.make(nonCurriculum),
      });
      expect(summary).toMatchObject({
        curriculumRowCount: 582,
        programRowCount: 6,
        rowCount: 588,
        sitemapCount: 78,
        slugCount: 18,
      });
      expect(nonCurriculumSummary).toMatchObject({
        curriculumRowCount: 0,
        programRowCount: 1,
        rowCount: 1,
      });
    })
  );

  it.effect(
    "rejects wrong locale sets, row integrity, order, keys, and slugs",
    () =>
      Effect.gen(function* () {
        const records = yield* makeProgramTestRecords();
        const programs = programCatalogRows(records);
        const curricula = curriculumRows(records);
        const first = yield* Effect.fromNullishOr(programs[0]);
        const second = yield* Effect.fromNullishOr(programs[1]);
        const firstCurriculum = yield* Effect.fromNullishOr(curricula[0]);
        const duplicateKey = yield* makeProgramSnapshotRow({
          ...second.row,
          key: first.row.key,
        });
        const duplicateSlugRow = yield* Schema.decodeUnknownEffect(
          LearningProgramSchema
        )({
          ...second.row,
          translations: second.row.translations.map((translation, index) => ({
            ...translation,
            publicSlug:
              first.row.translations[index]?.publicSlug ??
              translation.publicSlug,
          })),
        });
        const duplicateSlug = yield* makeProgramSnapshotRow(duplicateSlugRow);
        const germanLocales = yield* decodeAppLocales(["en", "de"]);
        const tamperedProgram = {
          ...first,
          rowHash: Sha256HashSchema.make(`sha256:${"f".repeat(64)}`),
        };
        const tamperedCurriculum = {
          ...firstCurriculum,
          rowHash: Sha256HashSchema.make(`sha256:${"e".repeat(64)}`),
        };
        const errors = yield* Effect.all([
          reject([first], germanLocales),
          reject([tamperedProgram]),
          reject([...programs, tamperedCurriculum]),
          reject([second, first]),
          reject([first, duplicateKey]),
          reject([first, duplicateSlug]),
          reject([...programs, firstCurriculum, first]),
          reject([...programs, firstCurriculum, firstCurriculum]),
          reject(records, ACTIVE_APP_LOCALES, {
            curriculumRowCount: 582,
            programRowCount: 7,
            rowCount: 589,
            sitemapCount: 78,
            slugCount: 18,
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
      })
  );

  it.effect(
    "rejects route ownership, ancestry, roots, and node conflicts",
    () =>
      Effect.gen(function* () {
        const records = yield* makeProgramTestRecords();
        const programs = programCatalogRows(records);
        const curricula = curriculumRows(records);
        const firstRoot = yield* Effect.fromNullishOr(
          curricula.find((record) => record.row.parentPath === undefined)
        );
        const firstRootIndex = curricula.indexOf(firstRoot);
        const firstChild = yield* Effect.fromNullishOr(
          curricula[firstRootIndex + 1]
        );
        const secondChild = yield* Effect.fromNullishOr(
          curricula[firstRootIndex + 2]
        );
        const firstProgram = yield* Effect.fromNullishOr(programs[0]);
        const wrongRoot = yield* makeCurriculumSnapshotRow({
          ...firstRoot.row,
          title: `${firstRoot.row.title} wrong`,
        });
        const duplicateNode = yield* makeCurriculumSnapshotRow({
          ...secondChild.row,
          nodeKey: firstChild.row.nodeKey,
        });
        const priorAppLocales = yield* decodeAppLocales(["en", "id"]);
        const priorProgramRow = yield* Schema.decodeUnknownEffect(
          LearningProgramSchema
        )({
          ...firstProgram.row,
          translations: firstProgram.row.translations.filter(
            ({ appLocale }) => appLocale !== "de"
          ),
        });
        const priorProgram = yield* makeProgramSnapshotRow(priorProgramRow);
        const firstTranslation = yield* Effect.fromNullishOr(
          firstProgram.row.translations[0]
        );
        const inactiveRoute = yield* Schema.decodeEffect(CurriculumRouteSchema)(
          {
            ...firstRoot.row,
            appLocale: "de",
            publicPath: `lehrplaene/${firstTranslation.publicSlug}`,
            title: firstTranslation.title,
          }
        );
        const inactiveLocale = yield* makeCurriculumSnapshotRow(inactiveRoute);
        const nonCurriculum = yield* makeProgramSnapshotRow({
          ...firstProgram.row,
          navigation: { levels: ["domain", "set"], model: "exam-domain-set" },
        });
        const errors = yield* Effect.all([
          reject([priorProgram, inactiveLocale], priorAppLocales),
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
      })
  );

  it.effect("maps digest construction, update, and finalization failures", () =>
    Effect.gen(function* () {
      const records = yield* makeProgramTestRecords();
      yield* Effect.addFinalizer(() =>
        Effect.sync(() => {
          failures.construct = false;
          failures.stage = null;
        })
      );
      yield* Effect.sync(() => {
        failures.construct = true;
      });
      const constructError = yield* reject([]);
      yield* Effect.sync(() => {
        failures.construct = false;
        failures.stage = "update";
      });
      const updateError = yield* reject(records.slice(0, 1));
      yield* Effect.sync(() => {
        failures.stage = "digest";
      });
      const digestError = yield* reject(records);
      for (const error of [constructError, updateError, digestError]) {
        expect(error).toMatchObject({
          _tag: "ProgramRowHashError",
          scope: "digest",
        });
      }
    })
  );
});
