import { Schema } from "effect";
import { ReleaseIdSchema, Sha256HashSchema } from "#contracts/ids";
import { ActiveAppLocaleListSchema } from "#contracts/locale";
import { ContentSnapshotSetSchema } from "#contracts/release/snapshot/spec";
import { ReleaseCountSchema } from "#contracts/release/spec";

/** Immutable identity of the active content catalog that one release builds on or replaces. */
export const ActiveCatalogIdentitySchema = Schema.Struct({
  activeAppLocales: ActiveAppLocaleListSchema,
  manifestHash: Sha256HashSchema,
  releaseId: ReleaseIdSchema,
  resultCount: ReleaseCountSchema,
  resultDigest: Sha256HashSchema,
  snapshots: ContentSnapshotSetSchema,
});
export type ActiveCatalogIdentity = typeof ActiveCatalogIdentitySchema.Type;
