import { assert, describe, it } from "@effect/vitest";
import { HistoricalQuestionBodyProjectionSchema } from "@nakafa/aksara-contracts/projection/question";
import { Effect, Schema } from "effect";
import { auditQuestionRecord } from "#publisher/audit/record";
import type {
  DerivedRollbackRecord,
  DerivedRollbackState,
} from "#publisher/rollback/records";
import { collectQuestionPublication } from "#test/question/spec";
import { makeDerivedRollbackUpsert } from "#test/rollback/authentication";
import { historicalQuestion } from "#test/transport/rollback";

/** Loads one real current Question body as an authenticated derived state. */
const currentQuestion = Effect.fn("QuestionAuditTest.currentQuestion")(
  function* () {
    const records = yield* Effect.tryPromise(() =>
      collectQuestionPublication({ heads: [] })
    );
    const selected = records.find(({ record }) => "payload" in record);
    if (!(selected && "payload" in selected.record)) {
      return yield* Effect.die("Expected one current Question upsert fixture.");
    }
    return makeDerivedRollbackUpsert(selected.record);
  }
);

/** Pairs one current state with a caller-selected prior projection. */
function transition(
  current: Effect.Success<ReturnType<typeof currentQuestion>>,
  priorProjection: typeof current.projection
): DerivedRollbackRecord {
  return {
    current,
    prior: { ...current, projection: priorProjection },
  };
}

describe("Question audit records", () => {
  it.effect("accepts strict current Question bodies on both sides", () =>
    Effect.gen(function* () {
      const current = yield* currentQuestion();
      assert.strictEqual(
        yield* auditQuestionRecord(transition(current, current.projection)),
        1
      );
    })
  );

  it.effect(
    "reports predecessor choice and date fields on the prior side",
    () =>
      Effect.gen(function* () {
        const current = yield* currentQuestion();
        const error = yield* auditQuestionRecord(
          transition(current, historicalQuestion)
        ).pipe(Effect.flip);

        assert.deepStrictEqual(
          {
            choicesCount: error.choicesCount,
            dateCount: error.dateCount,
            reason: error.reason,
            side: error.side,
          },
          {
            choicesCount: 1,
            dateCount: 1,
            reason: "legacy",
            side: "prior",
          }
        );
      })
  );

  it.effect("reports a predecessor date without choices", () =>
    Effect.gen(function* () {
      const current = yield* currentQuestion();
      const historical = yield* Schema.decodeUnknownEffect(
        HistoricalQuestionBodyProjectionSchema
      )(historicalQuestion);
      const dateOnly = yield* Schema.decodeEffect(
        HistoricalQuestionBodyProjectionSchema
      )({
        ...historical,
        bodyKind: "answer",
        contentKey: historical.peerContentKey,
        peerContentKey: historical.contentKey,
      });
      const error = yield* auditQuestionRecord(
        transition(current, dateOnly)
      ).pipe(Effect.flip);

      assert.strictEqual(error.choicesCount, 0);
      assert.strictEqual(error.dateCount, 1);
      assert.strictEqual(error.reason, "legacy");
    })
  );

  it.effect("rejects deleted and non-Question current states", () =>
    Effect.gen(function* () {
      const current = yield* currentQuestion();
      const deleted: DerivedRollbackState = {
        item: {
          change: {
            artifactLocale: current.item.change.artifactLocale,
            contentKey: current.item.change.contentKey,
            family: "question",
            operation: "delete",
          },
          index: current.item.index,
          releaseId: current.item.releaseId,
        },
        kind: "delete",
      };
      const foreign: DerivedRollbackState = {
        ...current,
        item: {
          ...current.item,
          change: { ...current.item.change, family: "material" },
        },
      };

      for (const [reason, state] of [
        ["delete", deleted],
        ["family", foreign],
      ] as const) {
        const error = yield* auditQuestionRecord({
          current: state,
          prior: current,
        }).pipe(Effect.flip);
        assert.strictEqual(error.reason, reason);
        assert.strictEqual(error.side, "current");
      }
    })
  );

  it.effect("rejects excess fields after predecessor fields are absent", () =>
    Effect.gen(function* () {
      const current = yield* currentQuestion();
      const malformed = { ...current.projection, unexpected: true };
      const error = yield* auditQuestionRecord(
        transition(current, malformed)
      ).pipe(Effect.flip);

      assert.strictEqual(error.reason, "schema");
      assert.strictEqual(error.side, "prior");
    })
  );
});
