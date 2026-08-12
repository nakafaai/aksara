/** Structured snapshot manifest and row wire contracts. */
import { Schema } from "effect";

import {
  ProgramSnapshotRowSchema,
  ProgramSnapshotWireSchema,
} from "#contracts/program/snapshot/spec";
import { ProgramSnapshotV4RowSchema } from "#contracts/program/v4";
import { QuranSnapshotWireSchema } from "#contracts/quran/snapshot/spec";
import { QuranSnapshotRowSchema } from "#contracts/quran/spec";
import { QuranSnapshotV3RowSchema } from "#contracts/quran/v3";
import { TryoutCatalogV2RecordSchema } from "#contracts/tryout/catalog-v2";
import { TryoutPlacementV2RecordSchema } from "#contracts/tryout/placement";
import { TryoutSnapshotWireSchema } from "#contracts/tryout/snapshot/spec";
import {
  TryoutCatalogRecordSchema,
  TryoutPlacementRecordSchema,
} from "#contracts/tryout/spec";

/** Program manifest selected by one globally signed content release. */
const ProgramManifestSchema = Schema.Struct({
  family: Schema.Literal("program"),
  manifest: ProgramSnapshotWireSchema,
});

/** Quran manifest selected by one globally signed content release. */
const QuranManifestSchema = Schema.Struct({
  family: Schema.Literal("quran"),
  manifest: QuranSnapshotWireSchema,
});

/** Try-out manifest selected by one globally signed content release. */
const TryoutManifestSchema = Schema.Struct({
  family: Schema.Literal("tryout"),
  manifest: TryoutSnapshotWireSchema,
});

/** Complete structured snapshot manifest vocabulary staged before its rows. */
export const ContentSnapshotManifestSchema = Schema.Union(
  ProgramManifestSchema,
  QuranManifestSchema,
  TryoutManifestSchema
);
export type ContentSnapshotManifest = typeof ContentSnapshotManifestSchema.Type;

/** One immutable learning-program record staged under its snapshot identity. */
const ProgramRowSchema = Schema.Struct({
  family: Schema.Literal("program"),
  record: ProgramSnapshotRowSchema,
});

/** One current program record with explicit app-locale ownership. */
const ProgramV4RowSchema = Schema.Struct({
  family: Schema.Literal("program"),
  record: ProgramSnapshotV4RowSchema,
  rowKind: Schema.Literal("program-v4"),
});

/** One immutable Quran record already bound to its snapshot identity. */
const QuranRowSchema = Schema.Struct({
  family: Schema.Literal("quran"),
  record: QuranSnapshotRowSchema,
});

/** One current Quran record with explicit application-locale ownership. */
const QuranV3RowSchema = Schema.Struct({
  family: Schema.Literal("quran"),
  record: QuranSnapshotV3RowSchema,
  rowKind: Schema.Literal("quran-v3"),
});

/** One immutable try-out hierarchy record staged before activation. */
const TryoutCatalogRowSchema = Schema.Struct({
  family: Schema.Literal("tryout"),
  record: TryoutCatalogRecordSchema,
  rowKind: Schema.Literal("catalog"),
});

/** One current try-out hierarchy record with explicit app-locale ownership. */
const TryoutCatalogV2RowSchema = Schema.Struct({
  family: Schema.Literal("tryout"),
  record: TryoutCatalogV2RecordSchema,
  rowKind: Schema.Literal("catalog-v2"),
});

/** One immutable try-out placement record staged before activation. */
const TryoutPlacementRowSchema = Schema.Struct({
  family: Schema.Literal("tryout"),
  record: TryoutPlacementRecordSchema,
  rowKind: Schema.Literal("placement"),
});

/** One v2 placement with separate app and delivery language identity. */
const TryoutPlacementV2RowSchema = Schema.Struct({
  family: Schema.Literal("tryout"),
  record: TryoutPlacementV2RecordSchema,
  rowKind: Schema.Literal("placement-v2"),
});

/** Complete structured row vocabulary accepted by snapshot publication. */
export const ContentSnapshotRowSchema = Schema.Union(
  ProgramRowSchema,
  ProgramV4RowSchema,
  QuranRowSchema,
  QuranV3RowSchema,
  TryoutCatalogRowSchema,
  TryoutCatalogV2RowSchema,
  TryoutPlacementRowSchema,
  TryoutPlacementV2RowSchema
);
export type ContentSnapshotRow = typeof ContentSnapshotRowSchema.Type;

/** Returns the immutable content-addressed identity of one family manifest. */
export function contentSnapshotId(snapshot: ContentSnapshotManifest) {
  return snapshot.manifest.snapshotId;
}

/** Serializes one structured row with stable envelope field order. */
export function canonicalizeContentSnapshotRow(row: ContentSnapshotRow) {
  if (
    (row.family === "quran" && !("rowKind" in row)) ||
    (row.family === "program" && !("rowKind" in row))
  ) {
    return JSON.stringify({ family: row.family, record: row.record });
  }
  return JSON.stringify({
    family: row.family,
    record: row.record,
    rowKind: row.rowKind,
  });
}
