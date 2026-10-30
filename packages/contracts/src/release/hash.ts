import { Effect } from "effect";

import { hashText } from "#contracts/hash/text";
import { canonicalizeContentReleaseManifest } from "#contracts/release/signing";
import type { ContentReleaseManifest } from "#contracts/release/spec";

/** Computes the immutable identity of one canonical release manifest. */
export const hashContentReleaseManifest = Effect.fn(
  "AksaraContracts.hashContentReleaseManifest"
)((manifest: ContentReleaseManifest) =>
  hashText(canonicalizeContentReleaseManifest(manifest))
);
