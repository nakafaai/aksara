import { Schema } from "effect";

import {
  ProgramSnapshotRowSchema,
  ProgramSnapshotSchema,
} from "#contracts/program/snapshot";
import { QuranSnapshotManifestSchema } from "#contracts/quran/snapshot";
import { QuranSnapshotRowSchema } from "#contracts/quran/spec";
import {
  TryoutCatalogRecordSchema,
  TryoutPlacementRecordSchema,
  TryoutSnapshotSchema,
} from "#contracts/tryout/spec";

/** Program manifest selected by one globally signed content release. */
const ProgramManifestSchema = Schema.Struct({
  family: Schema.Literal("program"),
  manifest: ProgramSnapshotSchema,
});

/** Quran manifest selected by one globally signed content release. */
const QuranManifestSchema = Schema.Struct({
  family: Schema.Literal("quran"),
  manifest: QuranSnapshotManifestSchema,
});

/** Try-out manifest selected by one globally signed content release. */
const TryoutManifestSchema = Schema.Struct({
  family: Schema.Literal("tryout"),
  manifest: TryoutSnapshotSchema,
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

/** One immutable Quran record already bound to its snapshot identity. */
const QuranRowSchema = Schema.Struct({
  family: Schema.Literal("quran"),
  record: QuranSnapshotRowSchema,
});

/** One immutable try-out hierarchy record staged before activation. */
const TryoutCatalogRowSchema = Schema.Struct({
  family: Schema.Literal("tryout"),
  record: TryoutCatalogRecordSchema,
  rowKind: Schema.Literal("catalog"),
});

/** One immutable try-out placement record staged before activation. */
const TryoutPlacementRowSchema = Schema.Struct({
  family: Schema.Literal("tryout"),
  record: TryoutPlacementRecordSchema,
  rowKind: Schema.Literal("placement"),
});

/** Complete structured row vocabulary accepted by snapshot publication. */
export const ContentSnapshotRowSchema = Schema.Union(
  ProgramRowSchema,
  QuranRowSchema,
  TryoutCatalogRowSchema,
  TryoutPlacementRowSchema
);
export type ContentSnapshotRow = typeof ContentSnapshotRowSchema.Type;

/** Returns the immutable content-addressed identity of one family manifest. */
export function contentSnapshotId(snapshot: ContentSnapshotManifest) {
  return snapshot.manifest.snapshotId;
}

/** Serializes one family manifest with stable envelope field order. */
export function canonicalizeContentSnapshotManifest(
  snapshot: ContentSnapshotManifest
) {
  return JSON.stringify({
    family: snapshot.family,
    manifest: snapshot.manifest,
  });
}

/** Serializes one structured row with stable envelope field order. */
export function canonicalizeContentSnapshotRow(row: ContentSnapshotRow) {
  if (row.family !== "tryout") {
    return JSON.stringify({ family: row.family, record: row.record });
  }
  return JSON.stringify({
    family: row.family,
    record: row.record,
    rowKind: row.rowKind,
  });
}
