import { describe, expect, it } from "@effect/vitest";
import { Effect, Stream } from "effect";
import { examProgramSources } from "#corpus/program/exam";
import { schoolProgramSources } from "#corpus/program/school";
import {
  prepareProgramSnapshot,
  streamProgramRows,
} from "#corpus/program/snapshot";

/** Reads one required canonical active translation from a program row. */
function requireTranslation(
  row: {
    readonly translations: readonly {
      readonly appLocale: string;
      readonly publicSlug: string;
    }[];
  },
  appLocale: string
) {
  return Effect.fromNullishOr(
    row.translations.find((candidate) => candidate.appLocale === appLocale)
  );
}

describe("program snapshot preparation", () => {
  it.effect("prepares exact programs and localized curriculum routes", () =>
    Effect.gen(function* () {
      const prepared = yield* prepareProgramSnapshot();
      const rows = yield* Stream.runCollect(prepared.rows);

      expect(prepared.manifest).toMatchObject({
        activeAppLocales: ["en", "id", "de"],
        curriculumRowCount: 585,
        format: "localized-program-snapshot",
        programRowCount: 6,
        rowCount: 591,
        sitemapCount: 78,
        slugCount: 18,
      });
      const programRows = rows.filter((row) => row.kind === "program");
      const curriculumRows = rows.filter((row) => row.kind === "curriculum");
      const localizedPrograms = yield* Effect.forEach(programRows, ({ row }) =>
        Effect.gen(function* () {
          const [german, english, indonesian] = yield* Effect.all([
            requireTranslation(row, "de"),
            requireTranslation(row, "en"),
            requireTranslation(row, "id"),
          ]);
          return {
            de: german.publicSlug,
            en: english.publicSlug,
            id: indonesian.publicSlug,
            key: row.key,
          };
        })
      );
      expect(localizedPrograms).toEqual([
        { de: "merdeka", en: "merdeka", id: "merdeka", key: "merdeka" },
        {
          de: "cambridge-international",
          en: "cambridge-international",
          id: "cambridge-international",
          key: "cambridge-international",
        },
        {
          de: "singapur-moe",
          en: "singapore-moe",
          id: "singapore-moe",
          key: "singapore-moe",
        },
        {
          de: "vereinigte-staaten",
          en: "united-states",
          id: "amerika-serikat",
          key: "united-states",
        },
        { de: "tka", en: "tka", id: "tka", key: "tka" },
        { de: "snbt", en: "snbt", id: "snbt", key: "snbt" },
      ]);
      expect(curriculumRows).toHaveLength(585);
      expect(curriculumRows.at(0)?.row).toMatchObject({
        appLocale: "de",
        programKey: "cambridge-international",
        publicPath: "lehrplaene/cambridge-international",
      });
    })
  );

  it.effect(
    "replays reproducible rows and rejects malformed source input",
    () =>
      Effect.gen(function* () {
        const [first, second, firstRows] = yield* Effect.all([
          prepareProgramSnapshot(),
          prepareProgramSnapshot(),
          Stream.runCollect(streamProgramRows()),
        ]);
        const replayRows = yield* Stream.runCollect(first.rows);
        const error = yield* prepareProgramSnapshot({
          programInput: [{ invented: true }],
        }).pipe(Effect.flip);

        expect(second.manifest).toEqual(first.manifest);
        expect(replayRows).toEqual(firstRows);
        expect(error._tag).toBe("ProgramCatalogError");
      }),
    { timeout: 30_000 }
  );

  it.effect("derives counts when source control adds another program", () =>
    Effect.gen(function* () {
      const firstExam = yield* Effect.fromNullishOr(examProgramSources[0]);
      const expanded = yield* prepareProgramSnapshot({
        programInput: [
          ...schoolProgramSources,
          ...examProgramSources,
          {
            ...firstExam,
            displayOrder: 70,
            key: "test-only-program",
            translations: [
              {
                appLocale: "en",
                publicSlug: "test-only-program",
                title: "Test-only Program",
              },
              {
                appLocale: "id",
                publicSlug: "program-uji",
                title: "Program Uji",
              },
              {
                appLocale: "de",
                publicSlug: "testprogramm",
                title: "Testprogramm",
              },
            ],
          },
        ],
      });

      expect(expanded.manifest).toMatchObject({
        curriculumRowCount: 585,
        programRowCount: 7,
        rowCount: 592,
        sitemapCount: 78,
        slugCount: 21,
      });
    })
  );
});
