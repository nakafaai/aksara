import { createHash } from "node:crypto";

import { Sha256HashSchema } from "#contracts/ids";

/** Computes one domain-separated canonical try-out SHA-256 identity. */
export function hashTryoutCanonical(domain: string, canonical: string) {
  const digest = createHash("sha256")
    .update(domain)
    .update("\n")
    .update(canonical)
    .digest("hex");
  return Sha256HashSchema.make(`sha256:${digest}`);
}
