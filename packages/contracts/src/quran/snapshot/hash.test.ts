import { describe, expect, it } from "@effect/vitest";
import { Effect, Schema } from "effect";

import { Sha256HashSchema } from "#contracts/ids";
import {
  canonicalizeQuranSnapshot,
  makeQuranSnapshot,
  verifyQuranSnapshotHash,
} from "#contracts/quran/snapshot/hash";
import { QuranSnapshotFactsSchema } from "#contracts/quran/snapshot/spec";
import { withNextDigestFailure } from "#contracts/test/digest";

const digest = Sha256HashSchema.make(`sha256:${"a".repeat(64)}`);
const facts = Schema.decodeSync(QuranSnapshotFactsSchema)({
  activeAppLocales: ["en", "id"],
  attributionCount: 1,
  chunkCount: 1085,
  projectionCount: 1428,
  projectionDigest: digest,
  provenanceDigest: digest,
  provenanceStatus: "blocked",
  runtimeCount: 1200,
  runtimeDigest: digest,
  searchCount: 228,
  searchDigest: digest,
  sourceBytes: 11_506_941,
  sourceDigest: digest,
  sourceFileCount: 119,
  surahCount: 114,
  tafsirLocales: ["id"],
  verseCount: 6236,
});

describe("Quran snapshot golden identities", () => {
  it.effect(
    "pins the canonical bytes and content identity of the snapshot facts",
    () =>
      Effect.gen(function* () {
        const snapshot = yield* makeQuranSnapshot(facts);

        expect(canonicalizeQuranSnapshot(facts)).toBe(
          '{"activeAppLocales":["en","id"],"attributionCount":1,"chunkCount":1085,"format":"localized-quran-snapshot","projectionCount":1428,"projectionDigest":"sha256:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa","provenanceDigest":"sha256:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa","provenanceStatus":"blocked","runtimeCount":1200,"runtimeDigest":"sha256:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa","searchCount":228,"searchDigest":"sha256:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa","sourceBytes":11506941,"sourceDigest":"sha256:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa","sourceFileCount":119,"surahCount":114,"tafsirLocales":["id"],"verseCount":6236}'
        );
        expect(snapshot.snapshotId).toBe(
          "sha256:7b83cb408fa8539620096eaecef6b585a7648d01d3cd15f9a2c4974821f8f9aa"
        );
        expect(yield* verifyQuranSnapshotHash(snapshot)).toBe(
          "sha256:7b83cb408fa8539620096eaecef6b585a7648d01d3cd15f9a2c4974821f8f9aa"
        );
      })
  );
});

describe("Quran snapshot hashing", () => {
  it.effect("creates and verifies one reproducible snapshot identity", () =>
    Effect.gen(function* () {
      const first = yield* makeQuranSnapshot(facts);
      const second = yield* makeQuranSnapshot(facts);
      expect(
        yield* Schema.decodeEffect(
          Schema.fromJsonString(QuranSnapshotFactsSchema)
        )(canonicalizeQuranSnapshot(facts))
      ).toMatchObject(facts);
      expect(first.snapshotId).toBe(second.snapshotId);
      expect(yield* verifyQuranSnapshotHash(first)).toBe(first.snapshotId);
    })
  );

  it.effect("maps a failed digest to the typed contract error", () =>
    Effect.gen(function* () {
      const error = yield* withNextDigestFailure(
        makeQuranSnapshot(facts).pipe(Effect.flip)
      );
      expect(error._tag).toBe("QuranSnapshotHashError");
    })
  );
});
