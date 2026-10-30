import { Effect } from "effect";
import { hashText } from "#contracts/hash/text";
import {
  type ContentProjection,
  canonicalizeContentProjection,
} from "#contracts/projection/spec";

/** Hashes one canonical projection for authoritative content-head diffing. */
export const hashContentProjection = Effect.fn(
  "AksaraContracts.hashContentProjection"
)((projection: ContentProjection) =>
  hashText(canonicalizeContentProjection(projection))
);
