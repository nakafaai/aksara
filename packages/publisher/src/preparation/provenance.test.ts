import { Sha256HashSchema } from "@nakafa/aksara-contracts/ids";
import {
  QURAN_SNAPSHOT_FORMAT,
  QuranSnapshotManifestSchema,
} from "@nakafa/aksara-contracts/quran/snapshot";
import { Effect } from "effect";
import { describe, expect, it } from "vitest";
import { requireSnapshotProvenance } from "#publisher/preparation/provenance";

const blockedQuran = QuranSnapshotManifestSchema.make({
  chunkCount: 1085,
  format: QURAN_SNAPSHOT_FORMAT,
  locales: ["en", "id"],
  projectionCount: 1427,
  projectionDigest: Sha256HashSchema.make(`sha256:${"1".repeat(64)}`),
  provenanceDigest: Sha256HashSchema.make(`sha256:${"2".repeat(64)}`),
  provenanceStatus: "blocked",
  runtimeCount: 1199,
  runtimeDigest: Sha256HashSchema.make(`sha256:${"3".repeat(64)}`),
  searchCount: 228,
  searchDigest: Sha256HashSchema.make(`sha256:${"4".repeat(64)}`),
  snapshotId: Sha256HashSchema.make(`sha256:${"5".repeat(64)}`),
  sourceBytes: 19_376_634,
  sourceDigest: Sha256HashSchema.make(`sha256:${"6".repeat(64)}`),
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
      manifest: {
        format: "program-v1",
        locales: ["en", "id"],
        rowCount: 0,
        rowDigest: blockedQuran.projectionDigest,
        slugCount: 0,
        snapshotId: blockedQuran.snapshotId,
      },
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
