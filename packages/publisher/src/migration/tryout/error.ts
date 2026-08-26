import { Schema } from "effect";

/** One fail-closed retained-history conversion invariant was not satisfied. */
export class TryoutHistoryMigrationError extends Schema.TaggedError<TryoutHistoryMigrationError>()(
  "TryoutHistoryMigrationError",
  {
    reason: Schema.Literals([
      "artifact-contract",
      "artifact-count",
      "artifact-requirement",
      "catalog-conversion",
      "command-evidence",
      "placement-conversion",
      "provenance",
      "receipt-evidence",
      "renderer-conversion",
      "source-count",
      "source-index",
      "status-evidence",
      "target-evidence",
    ]),
  }
) {}

/** Fails one migration step without retaining content or user-linked values. */
export function migrationFail(reason: TryoutHistoryMigrationError["reason"]) {
  return new TryoutHistoryMigrationError({ reason });
}
