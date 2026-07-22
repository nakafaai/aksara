import { createHash } from "node:crypto";
import { Sha256HashSchema } from "@nakafaai/aksara-contracts/ids";

/** Produces the canonical SHA-256 identifier for one UTF-8 value. */
export function hashUtf8(value: string) {
  return Sha256HashSchema.make(
    `sha256:${createHash("sha256").update(value).digest("hex")}`
  );
}
