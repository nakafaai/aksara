import { describe, expect, it } from "@effect/vitest";
import { Array as Arr, Effect, Option, Stream } from "effect";
import { examProgramSources } from "#corpus/program/exam";
import { schoolProgramSources } from "#corpus/program/school";
import {
  prepareProgramSnapshot,
  streamProgramRows,
} from "#corpus/program/snapshot";

describe("program snapshot preparation", () => {
  it.effect("prepares exact programs and localized curriculum routes", () =>
    Effect.gen(function* () {
      const prepared = yield* prepareProgramSnapshot();
      const rows = yield* Stream.runCollect(prepared.rows);

      expect(prepared.manifest).toMatchObject({
        activeAppLocales: ["en", "id", "de", "ms"],
        curriculumRowCount: 1176,
        format: "localized-program-snapshot",
        programRowCount: 7,
        rowCount: 1183,
        sitemapCount: 140,
        slugCount: 28,
      });
      const programRows = Arr.filter(rows, (row) => row.kind === "program");
      const curriculumRows = Arr.filter(
        rows,
        (row) => row.kind === "curriculum"
      );
      const localizedPrograms = yield* Effect.forEach(programRows, ({ row }) =>
        Effect.gen(function* () {
          /** Reads one required canonical active translation of this program row. */
          const requireTranslation = (appLocale: string) =>
            Effect.fromOption(
              Arr.findFirst(
                row.translations,
                (candidate) => candidate.appLocale === appLocale
              )
            );
          const [german, english, indonesian, malay] = yield* Effect.all([
            requireTranslation("de"),
            requireTranslation("en"),
            requireTranslation("id"),
            requireTranslation("ms"),
          ]);
          return {
            de: german.publicSlug,
            en: english.publicSlug,
            id: indonesian.publicSlug,
            key: row.key,
            ms: malay.publicSlug,
          };
        })
      );
      expect(localizedPrograms).toEqual([
        {
          de: "merdeka",
          en: "merdeka",
          id: "merdeka",
          key: "merdeka",
          ms: "merdeka",
        },
        {
          de: "cambridge-international",
          en: "cambridge-international",
          id: "cambridge-international",
          key: "cambridge-international",
          ms: "cambridge-international",
        },
        {
          de: "singapur-moe",
          en: "singapore-moe",
          id: "singapore-moe",
          key: "singapore-moe",
          ms: "singapore-moe",
        },
        {
          de: "vereinigte-staaten",
          en: "united-states",
          id: "amerika-serikat",
          key: "united-states",
          ms: "amerika-syarikat",
        },
        { de: "kssm", en: "kssm", id: "kssm", key: "kssm", ms: "kssm" },
        { de: "tka", en: "tka", id: "tka", key: "tka", ms: "tka" },
        { de: "snbt", en: "snbt", id: "snbt", key: "snbt", ms: "snbt" },
      ]);
      expect(curriculumRows).toHaveLength(1176);
      expect(Option.getOrThrow(Arr.head(curriculumRows)).row).toMatchObject({
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
              {
                appLocale: "ms",
                publicSlug: "program-ujian",
                title: "Program Ujian",
              },
            ],
          },
        ],
      });

      expect(expanded.manifest).toMatchObject({
        curriculumRowCount: 1176,
        programRowCount: 8,
        rowCount: 1184,
        sitemapCount: 140,
        slugCount: 32,
      });
    })
  );
});
