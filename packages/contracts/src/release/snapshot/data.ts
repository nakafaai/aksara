/** Structured snapshot manifest and row wire contracts. */
import { Schema } from "effect";

import { ProgramSnapshotRowSchema } from "#contracts/program/snapshot/row";
import { ProgramSnapshotSchema } from "#contracts/program/snapshot/spec";
import { QuranSnapshotRowSchema } from "#contracts/quran/snapshot/row";
import { QuranSnapshotSchema } from "#contracts/quran/snapshot/spec";
import { encodeJsonText } from "#contracts/text/json";
import { TryoutCatalogRecordSchema } from "#contracts/tryout/catalog";
import { TryoutPlacementRecordSchema } from "#contracts/tryout/placement";
import { TryoutSnapshotSchema } from "#contracts/tryout/snapshot/spec";

/** Pairs one family literal with the snapshot manifest it selects. */
function familyManifestSchema<
  Family extends string,
  Manifest extends Schema.Top,
>(family: Family, manifest: Manifest) {
  return Schema.Struct({ family: Schema.Literal(family), manifest });
}

/** Program manifest selected by one globally signed content release. */
const ProgramManifestSchema = familyManifestSchema(
  "program",
  ProgramSnapshotSchema
);

/** Quran manifest selected by one globally signed content release. */
const QuranManifestSchema = familyManifestSchema("quran", QuranSnapshotSchema);

/** Try-out manifest selected by one globally signed content release. */
const TryoutManifestSchema = familyManifestSchema(
  "tryout",
  TryoutSnapshotSchema
);

/** Complete structured snapshot manifest vocabulary staged before its rows. */
export const ContentSnapshotManifestSchema = Schema.Union([
  ProgramManifestSchema,
  QuranManifestSchema,
  TryoutManifestSchema,
]);
export type ContentSnapshotManifest = typeof ContentSnapshotManifestSchema.Type;

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

/** One try-out hierarchy record staged before activation. */
const TryoutCatalogRowSchema = Schema.Struct({
  family: Schema.Literal("tryout"),
  record: TryoutCatalogRecordSchema,
  rowKind: Schema.Literal("catalog"),
});

/** One try-out placement record staged before activation. */
const TryoutPlacementRowSchema = Schema.Struct({
  family: Schema.Literal("tryout"),
  record: TryoutPlacementRecordSchema,
  rowKind: Schema.Literal("placement"),
});

/** Complete current structured row vocabulary accepted by publication. */
export const ContentSnapshotRowSchema = Schema.Union([
  ProgramRowSchema,
  QuranRowSchema,
  TryoutCatalogRowSchema,
  TryoutPlacementRowSchema,
]);
export type ContentSnapshotRow = typeof ContentSnapshotRowSchema.Type;

/** Returns the immutable content-addressed identity of one family manifest. */
export function contentSnapshotId(snapshot: ContentSnapshotManifest) {
  return snapshot.manifest.snapshotId;
}

/** Serializes one structured row with stable envelope field order. */
export function canonicalizeContentSnapshotRow(row: ContentSnapshotRow) {
  if (row.family === "program" || row.family === "quran") {
    return encodeJsonText({ family: row.family, record: row.record });
  }
  return encodeJsonText({
    family: row.family,
    record: row.record,
    rowKind: row.rowKind,
  });
}
