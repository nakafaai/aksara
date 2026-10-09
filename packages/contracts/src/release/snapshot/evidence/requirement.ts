import { Effect, Schema, type Stream } from "effect";

import type { Sha256Hash } from "#contracts/ids";
import type { ContentSnapshotRow } from "#contracts/release/snapshot/data";
import {
  type ContentSnapshotKind,
  ContentSnapshotKindSchema,
} from "#contracts/release/snapshot/scope";

/** Signed snapshot evidence differs from its authenticated row stream. */
export class SnapshotEvidenceError extends Schema.TaggedError<SnapshotEvidenceError>()(
  "SnapshotEvidenceError",
  {
    actual: Schema.String,
    expected: Schema.String,
    family: ContentSnapshotKindSchema,
    field: Schema.String,
  }
) {}

/** Creates a fresh structured-row replay for one verification pass. */
export type SnapshotRowSource<E, R> = Stream.Stream<ContentSnapshotRow, E, R>;

/** Fails with one field-level mismatch without exposing row bodies. */
export function requireSnapshotEvidence(input: {
  readonly actual: number | Sha256Hash;
  readonly expected: number | Sha256Hash;
  readonly family: ContentSnapshotKind;
  readonly field: string;
}) {
  if (input.actual === input.expected) {
    return Effect.void;
  }
  return Effect.fail(
    new SnapshotEvidenceError({
      actual: String(input.actual),
      expected: String(input.expected),
      family: input.family,
      field: input.field,
    })
  );
}
