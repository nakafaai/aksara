import { Sha256HashSchema } from "#contracts/ids";

/** Domain separator shared by canonical result-catalog digest implementations. */
export const RESULT_CATALOG_DIGEST_DOMAIN = "nakafa.aksara.result-catalog";

/** Canonical signed root for a release whose complete result catalog is empty. */
export const EMPTY_RESULT_CATALOG_DIGEST = Sha256HashSchema.make(
  "sha256:ed7d49e237dadbd311a1599264b00852ae18657d123c8f9cbc26c1c62c8f81cd"
);
