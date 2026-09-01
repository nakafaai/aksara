import { ReleaseItemIndexSchema } from "@nakafa/aksara-contracts/release";
import { Schema } from "effect";

/** Complete page replay did not contain the signed manifest item count. */
export class QuestionAuditCountError extends Schema.TaggedError<QuestionAuditCountError>()(
  "QuestionAuditCountError",
  {
    actual: Schema.Finite.pipe(
      Schema.check(Schema.isInt()),
      Schema.check(Schema.isGreaterThanOrEqualTo(0))
    ),
    expected: Schema.Finite.pipe(
      Schema.check(Schema.isInt()),
      Schema.check(Schema.isGreaterThan(0))
    ),
    source: Schema.Literal("active-heads"),
  }
) {}

/** One authenticated rollback body is not a current Question projection. */
export class QuestionAuditRecordError extends Schema.TaggedError<QuestionAuditRecordError>()(
  "QuestionAuditRecordError",
  {
    choicesCount: Schema.Literals([0, 1]),
    dateCount: Schema.Literals([0, 1]),
    index: ReleaseItemIndexSchema,
    reason: Schema.Literals(["delete", "family", "legacy", "schema"]),
    side: Schema.Literals(["current", "prior"]),
  }
) {}

/** Authoritative publication state does not match the selected audit. */
export class QuestionAuditStateError extends Schema.TaggedError<QuestionAuditStateError>()(
  "QuestionAuditStateError",
  {
    reason: Schema.Literals([
      "active-missing",
      "active-identity",
      "candidate-present",
      "recovery-missing",
      "recovery-identity",
      "recovery-phase",
      "release-shape",
      "scope",
    ]),
  }
) {}
