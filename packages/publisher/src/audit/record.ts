import {
  type QuestionBodyProjection,
  QuestionBodyProjectionSchema,
} from "@nakafa/aksara-contracts/projection/question";
import type { ContentProjection } from "@nakafa/aksara-contracts/projection/spec";
import { Effect, Schema } from "effect";
import { QuestionAuditRecordError } from "#publisher/audit/error";
import {
  type DerivedRollbackRecord,
  type DerivedRollbackState,
  isDerivedRollbackUpsert,
} from "#publisher/rollback/records";

/** Identifies predecessor-only fields without accepting them as current data. */
function legacyFields(projection: ContentProjection) {
  return {
    choicesCount: "choices" in projection ? (1 as const) : (0 as const),
    dateCount: "date" in projection.metadata ? (1 as const) : (0 as const),
  };
}

/** Requires one signed transition side to be a strict current Question. */
const auditQuestionState = Effect.fn("AksaraPublisher.auditQuestionState")(
  function* (
    state: DerivedRollbackState,
    index: number,
    side: "current" | "prior"
  ): Effect.fn.Return<QuestionBodyProjection, QuestionAuditRecordError> {
    if (!isDerivedRollbackUpsert(state)) {
      return yield* new QuestionAuditRecordError({
        choicesCount: 0,
        dateCount: 0,
        index,
        reason: "delete",
        side,
      });
    }
    if (state.item.change.family !== "question") {
      return yield* new QuestionAuditRecordError({
        choicesCount: 0,
        dateCount: 0,
        index,
        reason: "family",
        side,
      });
    }
    const legacy = legacyFields(state.projection);
    if (legacy.choicesCount > 0 || legacy.dateCount > 0) {
      return yield* new QuestionAuditRecordError({
        ...legacy,
        index,
        reason: "legacy",
        side,
      });
    }
    return yield* Schema.decodeUnknownEffect(QuestionBodyProjectionSchema)(
      state.projection,
      { onExcessProperty: "error" }
    ).pipe(
      Effect.mapError(
        () =>
          new QuestionAuditRecordError({
            choicesCount: 0,
            dateCount: 0,
            index,
            reason: "schema",
            side,
          })
      )
    );
  }
);

/** Requires both authenticated sides of one transition to be current. */
export const auditQuestionRecord = Effect.fn(
  "AksaraPublisher.auditQuestionRecord"
)(function* (record: DerivedRollbackRecord) {
  yield* auditQuestionState(
    record.current,
    record.current.item.index,
    "current"
  );
  yield* auditQuestionState(record.prior, record.prior.item.index, "prior");
  return 1;
});
