import { describe, expect, it } from "@effect/vitest";
import { Effect, Stream } from "effect";

import { makeTryoutTestRows } from "#contracts/test/tryout";
import type {
  TryoutCatalogRow,
  TryoutSection,
} from "#contracts/tryout/catalog";
import {
  canonicalizeTryoutCatalog,
  canonicalizeTryoutCatalogFacts,
  compareTryoutCatalog,
  digestTryoutCatalog,
  makeTryoutCatalogRecord,
} from "#contracts/tryout/hash/catalog";

const rows: readonly TryoutCatalogRow[] = makeTryoutTestRows().catalog.map(
  ({ row }) => row
);

describe("try-out catalog identity and hashing", () => {
  it.effect("canonicalizes and digests signed catalog rows", () =>
    Effect.gen(function* () {
      const records = rows.map(makeTryoutCatalogRecord);
      records.sort((left, right) => compareTryoutCatalog(left.row, right.row));
      const first = yield* Effect.fromNullishOr(rows[0]);
      const summary = yield* digestTryoutCatalog(Stream.fromIterable(records));

      expect(JSON.parse(canonicalizeTryoutCatalog(first))).toEqual(first);
      expect(summary.count).toBe(records.length);
    })
  );

  it.effect("keeps unmarked section bytes and binds penalized marks", () =>
    Effect.gen(function* () {
      const section = yield* Effect.fromNullishOr(
        rows.find(
          (row): row is TryoutSection =>
            row.kind === "section" && row.appLocale === "en"
        )
      );
      const marked: TryoutSection = {
        ...section,
        marks: { blank: 0, correct: 4, wrong: -1 },
      };
      const marks = '"marks":{"blank":0,"correct":4,"wrong":-1}';

      expect(makeTryoutCatalogRecord(section).rowHash).toBe(
        "sha256:334369fe2e8fd6bd39a069c89d88a1c1b6dbbc389c9a907073a7f6ba23f0ea3a"
      );
      expect(canonicalizeTryoutCatalog(marked)).toContain(
        `"kind":"section",${marks},"order":1`
      );
      expect(JSON.parse(canonicalizeTryoutCatalog(marked))).toEqual(marked);
      expect(canonicalizeTryoutCatalogFacts(marked)).toContain(
        `"examKey":"snbt",${marks},"questionCount":1`
      );
      expect(makeTryoutCatalogRecord(marked).rowHash).not.toBe(
        makeTryoutCatalogRecord(section).rowHash
      );
    })
  );
});
