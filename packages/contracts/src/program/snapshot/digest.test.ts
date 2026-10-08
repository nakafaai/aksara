import type { BinaryLike } from "node:crypto";
import { describe, expect, it } from "@effect/vitest";
import { Effect, Schema, Stream } from "effect";

import { Sha256HashSchema } from "#contracts/ids";
import { ACTIVE_APP_LOCALES } from "#contracts/locale";
import { digestProgramRows } from "#contracts/program/snapshot/digest";
import { makeProgramSnapshotRow } from "#contracts/program/snapshot/hash";
import { LearningProgramSchema } from "#contracts/program/spec";
import {
  decodeAppLocales,
  digestRows,
  reject,
  routeRejectionInputs,
} from "#contracts/test/closure";
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

describe("program aggregate digest golden vectors", () => {
  it.effect(
    "pins the stream digest and counts of a complete program closure",
    () =>
      Effect.gen(function* () {
        const summary = yield* digestProgramRows({
          activeAppLocales: ACTIVE_APP_LOCALES,
          rows: Stream.fromIterable(digestRows),
        });

        expect(summary).toEqual({
          curriculumRowCount: 4,
          programRowCount: 1,
          rowCount: 5,
          rowDigest:
            "sha256:3b3c864411bc6b733384f8f7078bfaa8f388ddfdc83617c4b0aec9ec0a81edb7",
          sitemapCount: 3,
          slugCount: 3,
        });
      })
  );

  it.effect("keeps the same stream digest under two chunkings", () =>
    Effect.gen(function* () {
      const single = yield* digestProgramRows({
        activeAppLocales: ACTIVE_APP_LOCALES,
        rows: Stream.fromIterable(digestRows).pipe(Stream.rechunk(1)),
      });
      const triple = yield* digestProgramRows({
        activeAppLocales: ACTIVE_APP_LOCALES,
        rows: Stream.fromIterable(digestRows).pipe(Stream.rechunk(3)),
      });

      expect(single.rowDigest).toBe(
        "sha256:3b3c864411bc6b733384f8f7078bfaa8f388ddfdc83617c4b0aec9ec0a81edb7"
      );
      expect(triple.rowDigest).toBe(single.rowDigest);
    })
  );

  it.effect("rejects a route stream that is not in canonical order", () =>
    Effect.gen(function* () {
      const failure = yield* digestProgramRows({
        activeAppLocales: ACTIVE_APP_LOCALES,
        rows: Stream.fromIterable([
          ...digestRows.slice(0, 2),
          ...digestRows.slice(4),
          ...digestRows.slice(2, 4),
        ]),
      }).pipe(Effect.flip);

      expect(failure).toMatchObject({
        _tag: "ProgramDigestError",
        code: "order",
      });
    })
  );
});

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
        const route = yield* routeRejectionInputs(records);
        const errors = yield* Effect.all([
          reject(
            [route.priorProgram, route.inactiveLocale],
            route.priorAppLocales
          ),
          reject([route.nonCurriculum, route.firstRoot]),
          reject([...programs, route.wrongRoot]),
          reject([...programs, route.firstChild]),
          reject([
            ...programs,
            route.firstRoot,
            route.firstChild,
            route.duplicateNode,
          ]),
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
