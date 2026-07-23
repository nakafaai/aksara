import { Effect } from "effect";
import { PublicationTarget } from "#publisher/publication/spec";

type TargetOverrides = Partial<typeof PublicationTarget.Service>;

/**
 * Builds a complete publication target for focused tests while failing any
 * capability that the test did not explicitly select.
 */
export function makePublicationTarget(overrides: TargetOverrides) {
  /** Fails any target capability not explicitly owned by the focused test. */
  const unsupported = () => Effect.die("Unexpected publication target call.");
  return PublicationTarget.of({
    abort: unsupported,
    accept: unsupported,
    activate: unsupported,
    activateRecovery: unsupported,
    cleanup: unsupported,
    current: unsupported,
    headPage: unsupported,
    recovery: unsupported,
    rollbackPage: unsupported,
    routePage: unsupported,
    stageArtifactBatch: unsupported,
    stageItemBatch: unsupported,
    stageProjectionBatch: unsupported,
    stageRecovery: unsupported,
    stageRelease: unsupported,
    stageRouteBatch: unsupported,
    stageSnapshot: unsupported,
    stageSnapshotBatch: unsupported,
    status: unsupported,
    verify: unsupported,
    ...overrides,
  });
}
