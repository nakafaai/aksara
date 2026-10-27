/** Structured snapshot manifest and row wire contracts. */
import { Schema } from "effect";

import {
  AssessmentRecordSchema,
  AssessmentSnapshotSchema,
} from "#contracts/assessment/snapshot";
import { ProgramSnapshotRowSchema } from "#contracts/program/snapshot/row";
import { ProgramSnapshotSchema } from "#contracts/program/snapshot/spec";
import { QuranSnapshotRowSchema } from "#contracts/quran/snapshot/row";
import { QuranSnapshotSchema } from "#contracts/quran/snapshot/spec";
import { encodeJsonText } from "#contracts/text/json";

/** Pairs one family literal with the snapshot manifest it selects. */
function familyManifestSchema<
  Family extends string,
  Manifest extends Schema.Top,
>(family: Family, manifest: Manifest) {
  return Schema.Struct({ family: Schema.Literal(family), manifest });
}

/** Assessment manifest selected by one globally signed content release. */
const AssessmentManifestSchema = familyManifestSchema(
  "assessment",
  AssessmentSnapshotSchema
);

/** Program manifest selected by one globally signed content release. */
const ProgramManifestSchema = familyManifestSchema(
  "program",
  ProgramSnapshotSchema
);

/** Quran manifest selected by one globally signed content release. */
const QuranManifestSchema = familyManifestSchema("quran", QuranSnapshotSchema);

/** Complete structured snapshot manifest vocabulary staged before its rows. */
export const ContentSnapshotManifestSchema = Schema.Union([
  AssessmentManifestSchema,
  ProgramManifestSchema,
  QuranManifestSchema,
]);
export type ContentSnapshotManifest = typeof ContentSnapshotManifestSchema.Type;

/** One assessment record staged before activation. */
const AssessmentRowSchema = Schema.Struct({
  family: Schema.Literal("assessment"),
  record: AssessmentRecordSchema,
});

/** One learning-program record staged under its snapshot identity. */
const ProgramRowSchema = Schema.Struct({
  family: Schema.Literal("program"),
  record: ProgramSnapshotRowSchema,
});

/** One Quran record already bound to its snapshot identity. */
const QuranRowSchema = Schema.Struct({
  family: Schema.Literal("quran"),
  record: QuranSnapshotRowSchema,
});

/** Complete current structured row vocabulary accepted by publication. */
export const ContentSnapshotRowSchema = Schema.Union([
  AssessmentRowSchema,
  ProgramRowSchema,
  QuranRowSchema,
]);
export type ContentSnapshotRow = typeof ContentSnapshotRowSchema.Type;

/** Returns the immutable content-addressed identity of one family manifest. */
export function contentSnapshotId(snapshot: ContentSnapshotManifest) {
  return snapshot.manifest.snapshotId;
}

/** Serializes one structured row with stable envelope field order. */
export function canonicalizeContentSnapshotRow(row: ContentSnapshotRow) {
  return encodeJsonText({ family: row.family, record: row.record });
}
