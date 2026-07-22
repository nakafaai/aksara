import { Sha256HashSchema } from "#contracts/ids";

/** Domain separator shared by canonical result-catalog digest implementations. */
export const RESULT_CATALOG_DIGEST_DOMAIN = "nakafa.aksara.result-catalog.v1";

/** Canonical signed root for a release whose complete result catalog is empty. */
export const EMPTY_RESULT_CATALOG_DIGEST = Sha256HashSchema.make(
  "sha256:a8e29d27cc543a5477725f94a6123c757a81ad94894ab9949b2a2bab8b38e9b2"
);
