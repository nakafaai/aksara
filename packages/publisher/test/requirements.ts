import type { Effect } from "effect";
import {
  publishGitRelease,
  publishRollbackRelease,
} from "#publisher/publication";
import type { PublicationSource } from "#publisher/publication/spec";
import { makeRelease } from "#test/publication";
import { makeRollbackRelease } from "#test/publication/run";

/** Proves exact-Git source context is required only by Git publication. */
export async function publicationRequirements() {
  const git = await makeRelease("test-release-git-requirements");
  const rollback = await makeRollbackRelease(
    "test-release-rollback-requirements"
  );
  const gitEffect = publishGitRelease(git.prepared);
  const rollbackEffect = publishRollbackRelease(rollback.prepared);
  type GitRequirements = Effect.Effect.Context<typeof gitEffect>;
  type RollbackRequirements = Effect.Effect.Context<typeof rollbackEffect>;
  const requirements: {
    readonly git: PublicationSource extends GitRequirements ? true : false;
    readonly rollback: PublicationSource extends RollbackRequirements
      ? true
      : false;
  } = { git: true, rollback: false };
  return requirements;
}
