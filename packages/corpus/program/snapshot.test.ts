import { Sha256HashSchema } from "@nakafa/aksara-contracts/ids";
import { Chunk, Effect, Stream } from "effect";
import { describe, expect, it } from "vitest";
import { examProgramSources } from "#corpus/program/exam";
import { schoolProgramSources } from "#corpus/program/school";
import {
  prepareProgramSnapshot,
  streamProgramRows,
} from "#corpus/program/snapshot";

const editorialReviewDigest = Sha256HashSchema.make(`sha256:${"e".repeat(64)}`);

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
    const prepared = await Effect.runPromise(
      prepareProgramSnapshot({ editorialReviewDigest })
    );
    const rows = Chunk.toReadonlyArray(
      await Effect.runPromise(Stream.runCollect(prepared.rows()))
    );

    expect(prepared.manifest).toMatchObject({
      activeAppLocales: ["en", "id"],
      curriculumRowCount: 390,
      editorialReviewDigest,
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
    const first = await Effect.runPromise(
      prepareProgramSnapshot({ editorialReviewDigest })
    );
    const second = await Effect.runPromise(
      prepareProgramSnapshot({ editorialReviewDigest })
    );
    const firstRows = await Effect.runPromise(
      Stream.runCollect(streamProgramRows())
    );
    const replayRows = await Effect.runPromise(Stream.runCollect(first.rows()));
    const error = await Effect.runPromise(
      prepareProgramSnapshot({
        editorialReviewDigest,
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
        editorialReviewDigest,
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
});
