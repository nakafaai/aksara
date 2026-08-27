import { Effect, Schema } from "effect";

import { hashText } from "#contracts/hash/text";
import { Sha256HashSchema } from "#contracts/ids";

/** One normalized old-to-current identity in a signed migration map. */
export const TryoutHistoryMigrationMapEntrySchema = Schema.Struct({
  identity: Schema.String,
  index: Schema.Int.pipe(Schema.check(Schema.isGreaterThanOrEqualTo(0))),
  kind: Schema.Literals(["artifact", "catalog", "placement"]),
  newHash: Sha256HashSchema,
  oldHash: Sha256HashSchema,
});
export type TryoutHistoryMigrationMapEntry =
  typeof TryoutHistoryMigrationMapEntrySchema.Type;

/** Stable domain separating migration-map evidence from other digests. */
export const TRYOUT_HISTORY_MIGRATION_MAP_DOMAIN =
  "nakafa.aksara.tryout-history-migration-map";

/** Serializes one complete map after enforcing deterministic source order. */
export function canonicalizeTryoutHistoryMigrationMap(
  entries: readonly TryoutHistoryMigrationMapEntry[]
) {
  return JSON.stringify(
    entries.map(({ identity, index, kind, newHash, oldHash }) => ({
      identity,
      index,
      kind,
      newHash,
      oldHash,
    }))
  );
}

/** Hashes one complete ordered old-to-current identity map. */
export const hashTryoutHistoryMigrationMap = Effect.fn(
  "AksaraContracts.hashTryoutHistoryMigrationMap"
)((entries: readonly TryoutHistoryMigrationMapEntry[]) =>
  hashText(
    `${TRYOUT_HISTORY_MIGRATION_MAP_DOMAIN}\n${canonicalizeTryoutHistoryMigrationMap(entries)}`
  )
);
