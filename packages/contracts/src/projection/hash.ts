import { createHash } from "node:crypto";
import { Sha256HashSchema } from "#contracts/ids";
import {
  type ContentProjection,
  canonicalizeContentProjection,
} from "#contracts/projection/spec";

/** Hashes one canonical projection for authoritative content-head diffing. */
export function hashContentProjection(projection: ContentProjection) {
  const digest = createHash("sha256")
    .update(canonicalizeContentProjection(projection))
    .digest("hex");
  return Sha256HashSchema.make(`sha256:${digest}`);
}
