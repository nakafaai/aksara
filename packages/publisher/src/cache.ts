import {
  type ContentCacheChange,
  ContentCacheChangeSchema,
} from "@nakafa/aksara-contracts/cache/content";
import { ContentFamilySchema } from "@nakafa/aksara-contracts/content";
import type { ContentSnapshotSet } from "@nakafa/aksara-contracts/release/snapshot";
import { Stream } from "effect";

const allFamilies = ContentFamilySchema.literals.map((family) =>
  ContentCacheChangeSchema.make({ family })
);

/** Replays safe family-wide invalidation when exact items are unavailable. */
export function allContentCacheChanges() {
  return Stream.fromIterable<ContentCacheChange>(allFamilies);
}

/**
 * Replays the content families whose structured navigation changed.
 *
 * Programs and Quran data feed material navigation; try-out catalogs feed the
 * question experience. Every resulting family request also carries Nakafa's
 * global runtime tag, covering shared route and catalog caches.
 */
export function contentSnapshotCacheChanges(snapshots: ContentSnapshotSet) {
  const families = new Set<ContentCacheChange["family"]>();
  if (
    snapshots.program.mode !== "inherit" ||
    snapshots.quran.mode !== "inherit"
  ) {
    families.add("material");
  }
  if (snapshots.tryout.mode !== "inherit") {
    families.add("question");
  }
  return Stream.fromIterable(
    [...families].map((family) => ContentCacheChangeSchema.make({ family }))
  );
}
