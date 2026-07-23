import {
  type ContentCacheChange,
  ContentCacheChangeSchema,
} from "@nakafa/aksara-contracts/cache/content";
import { ContentFamilySchema } from "@nakafa/aksara-contracts/content";
import { Stream } from "effect";

const allFamilies = ContentFamilySchema.literals.map((family) =>
  ContentCacheChangeSchema.make({ family })
);

/** Replays safe family-wide invalidation when exact items are unavailable. */
export function allContentCacheChanges() {
  return Stream.fromIterable<ContentCacheChange>(allFamilies);
}
