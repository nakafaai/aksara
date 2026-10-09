import { ReleaseIdSchema, Sha256HashSchema } from "#contracts/ids";
import { ReleaseCountSchema } from "#contracts/release/spec";

/** Fields that name one signed release digest and the replayed digest that failed. */
export const ReleaseDigestMismatchFields = {
  actualDigest: Sha256HashSchema,
  expectedDigest: Sha256HashSchema,
  releaseId: ReleaseIdSchema,
};

/** Fields that name one signed release count and the replayed count that failed. */
export const ReleaseCountMismatchFields = {
  actualCount: ReleaseCountSchema,
  expectedCount: ReleaseCountSchema,
  releaseId: ReleaseIdSchema,
};
