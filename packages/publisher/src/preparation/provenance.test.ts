import { describe, expect, it } from "@effect/vitest";
import { Sha256HashSchema } from "@nakafa/aksara-contracts/ids";
import { ACTIVE_APP_LOCALES } from "@nakafa/aksara-contracts/locale";
import { ProgramSnapshotSchema } from "@nakafa/aksara-contracts/program/snapshot/spec";
import { QuranSnapshotSchema } from "@nakafa/aksara-contracts/quran/snapshot/spec";
import { Effect } from "effect";
import { requireSnapshotProvenance } from "#publisher/preparation/provenance";

const blockedQuran = QuranSnapshotSchema.make({
  activeAppLocales: ACTIVE_APP_LOCALES,
  attributionCount: 1,
  chunkCount: 1085,
  format: "localized-quran-snapshot",
  projectionCount: 1542,
  projectionDigest: Sha256HashSchema.make(`sha256:${"1".repeat(64)}`),
  provenanceDigest: Sha256HashSchema.make(`sha256:${"2".repeat(64)}`),
  provenanceStatus: "blocked",
  runtimeCount: 1200,
  runtimeDigest: Sha256HashSchema.make(`sha256:${"3".repeat(64)}`),
  searchCount: 342,
  searchDigest: Sha256HashSchema.make(`sha256:${"4".repeat(64)}`),
  snapshotId: Sha256HashSchema.make(`sha256:${"5".repeat(64)}`),
  sourceBytes: 13_030_246,
  sourceDigest: Sha256HashSchema.make(`sha256:${"6".repeat(64)}`),
  sourceFileCount: 119,
  surahCount: 114,
  tafsirLocales: ["id"],
  verseCount: 6236,
});

describe("snapshot provenance", () => {
  it("rejects a blocked Quran replacement", async () => {
    const error = await Effect.runPromise(
      requireSnapshotProvenance({
        family: "quran",
        manifest: blockedQuran,
      }).pipe(Effect.flip)
    );

    expect(error).toMatchObject({
      _tag: "QuranProvenanceBlockedError",
      provenanceDigest: blockedQuran.provenanceDigest,
    });
  });

  it("accepts an approved Quran replacement and other families", async () => {
    const approved = {
      family: "quran",
      manifest: { ...blockedQuran, provenanceStatus: "approved" },
    } as const;
    const program = {
      family: "program",
      manifest: ProgramSnapshotSchema.make({
        activeAppLocales: ACTIVE_APP_LOCALES,
        curriculumRowCount: 585,
        format: "localized-program-snapshot",
        programRowCount: 6,
        rowCount: 591,
        rowDigest: blockedQuran.projectionDigest,
        sitemapCount: 78,
        slugCount: 18,
        snapshotId: blockedQuran.snapshotId,
      }),
    } as const;

    await expect(
      Effect.runPromise(
        Effect.all([
          requireSnapshotProvenance(approved),
          requireSnapshotProvenance(program),
        ])
      )
    ).resolves.toEqual([undefined, undefined]);
  });
});
