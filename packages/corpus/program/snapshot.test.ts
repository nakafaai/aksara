import { describe, expect, it } from "@nakafa/testing/effect";
import { Effect, Stream } from "effect";
import { examProgramSources } from "#corpus/program/exam";
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
      activeAppLocales: ["en", "id"],
      curriculumRowCount: 390,
      format: "localized-program-snapshot",
      programRowCount: 6,
      rowCount: 396,
      sitemapCount: 52,
      slugCount: 12,
    });
    const programRows = rows.filter((row) => row.kind === "program");
    const curriculumRows = rows.filter((row) => row.kind === "curriculum");
    expect(
      programRows.map(({ row }) => ({
        en: translation(row, "en").publicSlug,
        id: translation(row, "id").publicSlug,
        key: row.key,
      }))
    ).toEqual([
      { en: "merdeka", id: "merdeka", key: "merdeka" },
      {
        en: "cambridge-international",
        id: "cambridge-international",
        key: "cambridge-international",
      },
      {
        en: "singapore-moe",
        id: "singapore-moe",
        key: "singapore-moe",
      },
      {
        en: "united-states",
        id: "amerika-serikat",
        key: "united-states",
      },
      { en: "tka", id: "tka", key: "tka" },
      { en: "snbt", id: "snbt", key: "snbt" },
    ]);
    expect(curriculumRows).toHaveLength(390);
    expect(curriculumRows.at(0)?.row).toMatchObject({
      appLocale: "en",
      programKey: "cambridge-international",
      publicPath: "curriculum/cambridge-international",
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
      })
    );

    expect(expanded.manifest).toMatchObject({
      curriculumRowCount: 390,
      programRowCount: 7,
      rowCount: 397,
      sitemapCount: 52,
      slugCount: 14,
    });
  });

  it("keeps candidate German program copy outside the active signed snapshot", async () => {
    const [firstSchool] = schoolProgramSources;
    expect(firstSchool).toBeDefined();
    const prepared = await Effect.runPromise(
      prepareProgramSnapshot({
        programLocaleInput: [
          {
            appLocale: "de",
            programKey: firstSchool.key,
            publicSlug: "merdeka-lehrplan",
            title: "Merdeka-Lehrplan",
          },
        ],
      })
    );
    const rows = await Effect.runPromise(Stream.runCollect(prepared.rows));
    const programRows = rows.filter((row) => row.kind === "program");

    expect(prepared.manifest.activeAppLocales).toEqual(["en", "id"]);
    expect(
      programRows.flatMap(({ row }) =>
        row.translations.map(({ appLocale }) => appLocale)
      )
    ).not.toContain("de");
  });
});
