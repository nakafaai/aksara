import { describe, expect, it } from "@nakafa/testing/effect";
import { Effect, Stream } from "effect";
import { examProgramSources } from "#corpus/program/exam";
import { germanProgramLocaleSources } from "#corpus/program/locale/de";
import { schoolProgramSources } from "#corpus/program/school";
import {
  prepareProgramSnapshot,
  streamProgramRows,
} from "#corpus/program/snapshot";

/** Reads one required canonical active translation from a program row. */
function translation(
  row: {
    readonly translations: readonly {
      readonly appLocale: string;
      readonly publicSlug: string;
    }[];
  },
  appLocale: string
) {
  const value = row.translations.find(
    (candidate) => candidate.appLocale === appLocale
  );
  if (value === undefined) {
    throw new Error(`Expected ${appLocale} program translation.`);
  }
  return value;
}

describe("program snapshot preparation", () => {
  it("prepares exact programs and localized curriculum routes", async () => {
    const prepared = await Effect.runPromise(prepareProgramSnapshot());
    const rows = await Effect.runPromise(Stream.runCollect(prepared.rows));

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
    expect(
      programRows.map(({ row }) => ({
        de: translation(row, "de").publicSlug,
        en: translation(row, "en").publicSlug,
        id: translation(row, "id").publicSlug,
        key: row.key,
      }))
    ).toEqual([
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
  });

  it("replays reproducible rows and rejects malformed source input", {
    timeout: 30_000,
  }, async () => {
    const first = await Effect.runPromise(prepareProgramSnapshot());
    const second = await Effect.runPromise(prepareProgramSnapshot());
    const firstRows = await Effect.runPromise(
      Stream.runCollect(streamProgramRows())
    );
    const replayRows = await Effect.runPromise(Stream.runCollect(first.rows));
    const error = await Effect.runPromise(
      prepareProgramSnapshot({
        programInput: [{ invented: true }],
      }).pipe(Effect.flip)
    );

    expect(second.manifest).toEqual(first.manifest);
    expect(replayRows).toEqual(firstRows);
    expect(error._tag).toBe("ProgramCatalogError");
  });

  it("derives counts when source control adds another program", async () => {
    const [firstExam] = examProgramSources;
    const expanded = await Effect.runPromise(
      prepareProgramSnapshot({
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
            ],
          },
        ],
        programLocaleInput: [
          ...germanProgramLocaleSources,
          {
            appLocale: "de",
            programKey: "test-only-program",
            publicSlug: "testprogramm",
            title: "Testprogramm",
          },
        ],
      })
    );

    expect(expanded.manifest).toMatchObject({
      curriculumRowCount: 585,
      programRowCount: 7,
      rowCount: 592,
      sitemapCount: 78,
      slugCount: 21,
    });
  });
});
