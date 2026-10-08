import { describe, expect, it } from "@effect/vitest";
import { Schema } from "effect";

import { Sha256HashSchema } from "#contracts/ids";
import { reverseObjectKeys } from "#contracts/test/order";
import { canonicalizeTryoutSnapshot } from "#contracts/tryout/snapshot/canonical";
import {
  type TryoutSnapshotFacts,
  TryoutSnapshotFactsSchema,
} from "#contracts/tryout/snapshot/spec";

const input = Schema.decodeSync(TryoutSnapshotFactsSchema)({
  activeAppLocales: ["en", "id", "de"],
  catalogDigest: Sha256HashSchema.make(`sha256:${"a".repeat(64)}`),
  counts: { country: 2, exam: 4, section: 34, set: 10, track: 4 },
  placementCount: 840,
  placementDigest: Sha256HashSchema.make(`sha256:${"b".repeat(64)}`),
  routeCount: 48,
});

describe("try-out snapshot canonical golden bytes", () => {
  it("pins the snapshot bytes of decoded facts with alphabetical counts", () => {
    expect(canonicalizeTryoutSnapshot(input)).toBe(
      '{"activeAppLocales":["en","id","de"],"catalogDigest":"sha256:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa","counts":{"country":2,"exam":4,"section":34,"set":10,"track":4},"format":"localized-tryout-snapshot","placementCount":840,"placementDigest":"sha256:bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb","routeCount":48}'
    );
  });

  it("pins the snapshot bytes that copy counts in the caller's key order", () => {
    const reversed: TryoutSnapshotFacts = {
      activeAppLocales: input.activeAppLocales,
      catalogDigest: input.catalogDigest,
      counts: reverseObjectKeys(input.counts),
      placementCount: input.placementCount,
      placementDigest: input.placementDigest,
      routeCount: input.routeCount,
    };

    expect(canonicalizeTryoutSnapshot(reversed)).toBe(
      '{"activeAppLocales":["en","id","de"],"catalogDigest":"sha256:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa","counts":{"track":4,"set":10,"section":34,"exam":4,"country":2},"format":"localized-tryout-snapshot","placementCount":840,"placementDigest":"sha256:bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb","routeCount":48}'
    );
  });
});
