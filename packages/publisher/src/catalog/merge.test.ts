import { describe, expect, it } from "@nakafa/testing/effect";
import { Effect, Stream } from "effect";

import { mergeSortedCatalogStreams } from "#publisher/catalog/merge";

type CatalogRow = readonly [key: string, value: number];

/** Merges numeric fixtures through the production sorted-stream seam. */
function merge(
  left: Stream.Stream<CatalogRow, string>,
  right: Stream.Stream<CatalogRow, string>
) {
  return mergeSortedCatalogStreams(left, {
    onBoth: (leftValue, rightValue) => `both:${leftValue + rightValue}`,
    onLeft: (value) => `left:${value}`,
    onRight: (value) => `right:${value}`,
    right,
  });
}

describe("sorted catalog merge", () => {
  it.effect("emits left-only, right-only, and matching rows in key order", () =>
    Effect.gen(function* () {
      const rows = yield* merge(
        Stream.fromIterable<CatalogRow>([
          ["a", 1],
          ["c", 3],
          ["e", 5],
        ]),
        Stream.fromIterable<CatalogRow>([
          ["b", 20],
          ["c", 30],
          ["d", 40],
        ])
      ).pipe(Stream.runCollect);

      expect(rows).toEqual([
        "left:1",
        "right:20",
        "both:33",
        "right:40",
        "left:5",
      ]);
    })
  );

  it.effect("preserves a typed failure from either input stream", () =>
    Effect.gen(function* () {
      const leftFailure = yield* merge(
        Stream.fail("left failed"),
        Stream.empty
      ).pipe(Stream.runCollect, Effect.flip);
      const rightFailure = yield* merge(
        Stream.empty,
        Stream.fail("right failed")
      ).pipe(Stream.runCollect, Effect.flip);

      expect(leftFailure).toBe("left failed");
      expect(rightFailure).toBe("right failed");
    })
  );
});
