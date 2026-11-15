import { assert, describe, it } from "@effect/vitest";
import { Array as Arr, Effect, Stream } from "effect";

import { verifyAssessmentClosure } from "#contracts/assessment/closure";
import type { AssessmentRecord } from "#contracts/assessment/snapshot";
import { ACTIVE_APP_LOCALES, ActiveAppLocaleSchema } from "#contracts/locale";
import { hash } from "#contracts/test/assessment/item";
import { makeAssessmentTestRecords } from "#contracts/test/assessment/snapshot";

/** Verifies the closure of one record list and returns the reason it fails, if any. */
function closure(records: readonly AssessmentRecord[]) {
  return verifyAssessmentClosure({
    activeAppLocales: ACTIVE_APP_LOCALES,
    records: Stream.fromIterable(records),
  }).pipe(
    Effect.as("closed"),
    Effect.catchTag("AssessmentClosureError", ({ reason }) =>
      Effect.succeed(reason)
    )
  );
}

/** Leaves out every record of one kind. */
function without(
  records: readonly AssessmentRecord[],
  kind: AssessmentRecord["row"]["kind"]
) {
  return Arr.filter(records, ({ row }) => row.kind !== kind);
}

/** Replaces each record that a test changes. */
function changed(
  records: readonly AssessmentRecord[],
  change: (row: AssessmentRecord["row"]) => AssessmentRecord["row"]
) {
  return Arr.map(records, (record) => ({ ...record, row: change(record.row) }));
}

/** Serves every catalog node of a fixture without its Malay rows, as a set not yet written in Malay. */
function withoutMalay(records: readonly AssessmentRecord[]) {
  const served = Arr.filter(
    ACTIVE_APP_LOCALES,
    (appLocale) => appLocale !== "ms"
  );
  return changed(
    Arr.filter(
      records,
      ({ row }) => !(row.kind === "catalog" && row.row.appLocale === "ms")
    ),
    (row) =>
      row.kind === "catalog"
        ? {
            ...row,
            row: {
              ...row.row,
              appLocales: [
                ActiveAppLocaleSchema.make("en"),
                ...Arr.drop(served, 1),
              ],
            },
          }
        : row
  );
}

describe("assessment closure", () => {
  it.effect("accepts a snapshot whose every reference resolves", () =>
    Effect.gen(function* () {
      assert.strictEqual(
        yield* closure(yield* makeAssessmentTestRecords()),
        "closed"
      );
    })
  );

  it.effect("names each reference that leads nowhere", () =>
    Effect.gen(function* () {
      const records = yield* makeAssessmentTestRecords();

      assert.strictEqual(yield* closure(without(records, "key")), "key");
      assert.strictEqual(yield* closure(without(records, "paper")), "paper");
      assert.strictEqual(
        yield* closure(without(records, "profile")),
        "profile"
      );
      assert.strictEqual(
        yield* closure(without(records, "stimulus")),
        "stimulus"
      );
      assert.strictEqual(yield* closure(without(records, "family")), "family");
      assert.strictEqual(yield* closure(without(records, "item")), "place");
      assert.strictEqual(
        yield* closure(
          Arr.filter(
            records,
            ({ row }) =>
              !(row.kind === "explanation" && row.explanation.language === "id")
          )
        ),
        "explanation"
      );
      assert.strictEqual(
        yield* closure(
          Arr.filter(
            records,
            ({ row }) => !(row.kind === "catalog" && row.row.kind === "section")
          )
        ),
        "section"
      );
      assert.strictEqual(
        yield* closure(
          Arr.filter(
            records,
            ({ row }) =>
              !(
                row.kind === "catalog" &&
                row.row.kind === "country" &&
                row.row.appLocale === "id"
              )
          )
        ),
        "locale"
      );
    })
  );

  it.effect(
    "refuses a paper that does not fit its profile, and rows nothing reaches",
    () =>
      Effect.gen(function* () {
        const records = yield* makeAssessmentTestRecords();

        assert.strictEqual(
          yield* closure(
            changed(records, (row) =>
              row.kind === "profile"
                ? {
                    ...row,
                    profile: {
                      ...row.profile,
                      sections: [{ ...row.profile.sections[0], items: 2 }],
                    },
                  }
                : row
            )
          ),
          "section"
        );
        assert.strictEqual(
          yield* closure(
            changed(records, (row) =>
              row.kind === "paper"
                ? { ...row, paper: { ...row.paper, stimuli: [] } }
                : row
            )
          ),
          "stimulus"
        );
        assert.strictEqual(
          yield* closure(
            changed(records, (row) =>
              row.kind === "paper"
                ? {
                    ...row,
                    paper: {
                      ...row.paper,
                      profile: { ...row.paper.profile, hash: hash("c") },
                    },
                  }
                : row
            )
          ),
          "profile"
        );
        assert.strictEqual(
          yield* closure(
            changed(records, (row) =>
              row.kind === "key"
                ? { ...row, key: { ...row.key, version: hash("d") } }
                : row
            )
          ),
          "key"
        );
        assert.strictEqual(
          yield* closure(
            changed(records, (row) =>
              row.kind === "explanation"
                ? {
                    ...row,
                    explanation: { ...row.explanation, version: hash("e") },
                  }
                : row
            )
          ),
          "explanation"
        );
      })
  );

  it.effect(
    "serves a set only in the locales it is written in, without a Malay explanation it does not need",
    () =>
      Effect.gen(function* () {
        const records = withoutMalay(yield* makeAssessmentTestRecords());

        assert.strictEqual(yield* closure(records), "closed");
        assert.strictEqual(
          yield* closure(
            Arr.filter(
              records,
              ({ row }) =>
                !(
                  row.kind === "explanation" &&
                  row.explanation.language === "ms"
                )
            )
          ),
          "closed"
        );
      })
  );

  it.effect("refuses a set without its explanation in a locale it serves", () =>
    Effect.gen(function* () {
      const records = yield* makeAssessmentTestRecords();

      assert.strictEqual(
        yield* closure(
          Arr.filter(
            records,
            ({ row }) =>
              !(row.kind === "explanation" && row.explanation.language === "ms")
          )
        ),
        "explanation"
      );
    })
  );
});
