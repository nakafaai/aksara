import { createHash } from "node:crypto";
import { Sha256HashSchema } from "#contracts/ids";
import {
  type ContentProjectionWire,
  canonicalizeContentProjection,
} from "#contracts/projection/spec";

/** Hashes one canonical projection for authoritative content-head diffing. */
export function hashContentProjection(projection: ContentProjectionWire) {
  const digest = createHash("sha256")
    .update(canonicalizeContentProjection(projection))
    .digest("hex");
  return Sha256HashSchema.make(`sha256:${digest}`);
}
