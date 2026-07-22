import { Schema } from "effect";
import { GitCommitShaSchema, ReleaseIdSchema } from "#contracts/ids";

/** Exact reviewed Git source used by a normal reproducible release. */
export const GitReleaseOriginSchema = Schema.Struct({
  kind: Schema.Literal("git"),
  sha: GitCommitShaSchema,
});

/** Exact active release whose prior state is restored by a forward rollback. */
export const RollbackReleaseOriginSchema = Schema.Struct({
  kind: Schema.Literal("rollback"),
  releaseId: ReleaseIdSchema,
});

/** Signed provenance for either exact-Git compilation or artifact reuse. */
export const ReleaseOriginSchema = Schema.Union(
  GitReleaseOriginSchema,
  RollbackReleaseOriginSchema
);
export type ReleaseOrigin = typeof ReleaseOriginSchema.Type;

/** Copies one release origin into deterministic manifest field order. */
export function canonicalizeReleaseOrigin(origin: ReleaseOrigin) {
  if (origin.kind === "git") {
    return { kind: origin.kind, sha: origin.sha };
  }
  return { kind: origin.kind, releaseId: origin.releaseId };
}
