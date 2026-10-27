import { assert, describe, expect, it } from "@effect/vitest";
import { Array as Arr, Effect, Stream } from "effect";

import {
  ASSESSMENT_ROW_KINDS,
  assessmentRowCount,
  assessmentRowIdentity,
  digestAssessmentRows,
  makeAssessmentSnapshot,
} from "#contracts/assessment/snapshot";
import { ACTIVE_APP_LOCALES } from "#contracts/locale";
import { hash } from "#contracts/test/assessment/item";
import { makeAssessmentTestRecords } from "#contracts/test/assessment/snapshot";

/** A row digest: a SHA-256 hash in its prefixed hex form. */
const DIGEST_PATTERN = /^sha256:[a-f0-9]{64}$/u;

describe("assessment snapshot", () => {
  it.effect("digests rows in canonical order and counts each kind", () =>
    Effect.gen(function* () {
      const records = yield* makeAssessmentTestRecords();
      const { counts, rowDigest } = yield* digestAssessmentRows(
        Stream.fromIterable(records)
      );

      assert.deepStrictEqual(counts, {
        catalog: 5 * ACTIVE_APP_LOCALES.length,
        explanation: ACTIVE_APP_LOCALES.length,
        family: 1,
        item: 1,
        key: 1,
        paper: 1,
        profile: 1,
        stimulus: 1,
      });
      assert.strictEqual(assessmentRowCount(counts), records.length);
      assert.match(rowDigest, DIGEST_PATTERN);
    })
  );

  it.effect(
    "names a snapshot by its facts, so equal facts have one identity",
    () =>
      Effect.gen(function* () {
        const records = yield* makeAssessmentTestRecords();
        const summary = yield* digestAssessmentRows(
          Stream.fromIterable(records)
        );
        const facts = { activeAppLocales: ACTIVE_APP_LOCALES, ...summary };
        const first = yield* makeAssessmentSnapshot(facts);
        const second = yield* makeAssessmentSnapshot(facts);
        const other = yield* makeAssessmentSnapshot({
          ...facts,
          rowDigest: hash("a"),
        });

        assert.strictEqual(first.format, "assessment-snapshot");
        assert.strictEqual(first.snapshotId, second.snapshotId);
        assert.notStrictEqual(first.snapshotId, other.snapshotId);
      })
  );

  it.effect("refuses a row out of order, repeated, or with a wrong hash", () =>
    Effect.gen(function* () {
      const records = yield* makeAssessmentTestRecords();
      const [first, second] = records;
      if (first === undefined || second === undefined) {
        return assert.fail("Expected at least two test rows.");
      }
      const swapped = yield* digestAssessmentRows(
        Stream.fromIterable([second, first])
      ).pipe(Effect.flip);
      const repeated = yield* digestAssessmentRows(
        Stream.fromIterable([first, first])
      ).pipe(Effect.flip);
      const tampered = yield* digestAssessmentRows(
        Stream.fromIterable([{ ...first, rowHash: hash("b") }])
      ).pipe(Effect.flip);

      assert.deepStrictEqual(
        Arr.map([swapped, repeated, tampered], (error) =>
          "reason" in error ? error.reason : error._tag
        ),
        ["order", "order", "hash"]
      );
    })
  );

  it.effect("gives every row an identity unique within its kind", () =>
    Effect.gen(function* () {
      const records = yield* makeAssessmentTestRecords();
      for (const kind of ASSESSMENT_ROW_KINDS) {
        const identities = Arr.map(
          Arr.filter(records, ({ row }) => row.kind === kind),
          ({ row }) => assessmentRowIdentity(row)
        );
        expect(Arr.dedupe(identities)).toEqual(identities);
      }
    })
  );
});
