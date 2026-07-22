import { createHash } from "node:crypto";
import { Sha256HashSchema } from "#contracts/ids";
import {
  canonicalizeMaterialProjection,
  type MaterialLessonProjection,
} from "#contracts/projection/material";

/** Hashes one canonical material projection for authoritative head diffing. */
export function hashMaterialProjection(projection: MaterialLessonProjection) {
  const digest = createHash("sha256")
    .update(canonicalizeMaterialProjection(projection))
    .digest("hex");
  return Sha256HashSchema.make(`sha256:${digest}`);
}
