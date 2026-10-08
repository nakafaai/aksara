import { describe, expect, it } from "@effect/vitest";
import { Effect, Stream } from "effect";

import { Sha256HashSchema } from "#contracts/ids";
import { digestTryoutRecords } from "#contracts/tryout/digest";

const first = {
  canonical: '{"order":1,"title":"Matematika é"}',
  hash: "sha256:4d9ad71ab4b5534342439157bf95453b82a71b066ff8b88194b1acd7f7084ee8",
  identity: "en\u00001",
};
const second = {
  canonical: '{"order":2,"title":"Biologi"}',
  hash: "sha256:bebc4c4419cea78b7c35154eae4d6027b0dccff374cb54cb3fd0621ddfc855a5",
  identity: "en\u00002",
};
const third = {
  canonical: '{"order":3,"title":"Fisika é"}',
  hash: "sha256:c30a1b60faac3d9e8670459895dc225a031ffa87d3ac1428c079e130b8efa514",
  identity: "id\u00001",
};
const firstRecord = { row: first, rowHash: Sha256HashSchema.make(first.hash) };
const secondRecord = {
  row: second,
  rowHash: Sha256HashSchema.make(second.hash),
};
const thirdRecord = { row: third, rowHash: Sha256HashSchema.make(third.hash) };
const records = [firstRecord, secondRecord, thirdRecord];

/** Digests one synthetic record stream under a test-only domain. */
function digestStream<E, R>(
  stream: Stream.Stream<(typeof records)[number], E, R>
) {
  return digestTryoutRecords({
    canonicalize: (row) => row.canonical,
    domain: "nakafa.aksara.test.tryout-digest",
    identity: (row) => row.identity,
    records: stream,
    rowHash: (row) => Sha256HashSchema.make(row.hash),
  });
}

describe("try-out streaming digest golden vectors", () => {
  it.effect(
    "pins the count and full digest of an ordered synthetic stream",
    () =>
      Effect.gen(function* () {
        const summary = yield* digestStream(Stream.fromIterable(records));

        expect(summary).toEqual({
          count: 3,
          digest:
            "sha256:c01a7b6662eb02e7e633d12ad0d1ed5711c427857f9a740f5437f870c8920d78",
        });
      })
  );

  it.effect("keeps the same digest under one-row and three-row chunks", () =>
    Effect.gen(function* () {
      const single = yield* digestStream(
        Stream.fromIterable(records).pipe(Stream.rechunk(1))
      );
      const triple = yield* digestStream(
        Stream.fromIterable(records).pipe(Stream.rechunk(3))
      );

      expect(single.digest).toBe(
        "sha256:c01a7b6662eb02e7e633d12ad0d1ed5711c427857f9a740f5437f870c8920d78"
      );
      expect(triple).toEqual(single);
    })
  );

  it.effect(
    "rejects a row whose authenticated hash does not match its bytes",
    () =>
      Effect.gen(function* () {
        const failure = yield* digestStream(
          Stream.make({
            row: first,
            rowHash: Sha256HashSchema.make(second.hash),
          })
        ).pipe(Effect.flip);

        expect(failure).toMatchObject({
          code: "integrity",
          identity: "en\u00001",
        });
      })
  );

  it.effect("rejects a repeated or out-of-order identity", () =>
    Effect.gen(function* () {
      const repeated = yield* digestStream(
        Stream.make(firstRecord, firstRecord)
      ).pipe(Effect.flip);
      const unsorted = yield* digestStream(
        Stream.make(secondRecord, firstRecord)
      ).pipe(Effect.flip);

      expect([repeated.code, unsorted.code]).toEqual(["order", "order"]);
    })
  );
});
