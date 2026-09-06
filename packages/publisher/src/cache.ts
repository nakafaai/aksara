import {
  ContentCacheChangeSchema,
  ContentCacheScopeSchema,
} from "@nakafa/aksara-contracts/cache/content";
import { ContentSnapshotKindSchema } from "@nakafa/aksara-contracts/release/snapshot/scope";
import type { ContentSnapshotSet } from "@nakafa/aksara-contracts/release/snapshot/spec";
import { Stream } from "effect";

/** Invalidates every mutable dependency when recovery lacks exact changes. */
export const allContentCacheChanges = Stream.fromIterable(
  ContentCacheScopeSchema.literals.map((scope) =>
    ContentCacheChangeSchema.make({ scope })
  )
);

/** Keeps structured snapshot changes in their actual source-owned domain. */
export function contentSnapshotCacheChanges(snapshots: ContentSnapshotSet) {
  return Stream.fromIterable(ContentSnapshotKindSchema.literals).pipe(
    Stream.filter((scope) => snapshots[scope].mode !== "inherit"),
    Stream.map((scope) => ContentCacheChangeSchema.make({ scope }))
  );
}
