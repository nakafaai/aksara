import { PublicationTarget } from "@nakafa/aksara-publisher/publication/spec";
import { PublicationTargetTransportError } from "@nakafa/aksara-publisher/target/errors";
import { Effect, Schedule } from "effect";

const TRANSPORT_RETRY_COUNT = 3;
const TRANSPORT_RETRY_DELAY = "100 millis";

/** Identifies the only idempotent failure class eligible for bounded retry. */
function isTransportFailure(error: unknown) {
  return error instanceof PublicationTargetTransportError;
}

/** Retries only target transport failures with bounded exponential backoff. */
export function retryTransport<A, E, R>(effect: Effect.Effect<A, E, R>) {
  return effect.pipe(
    Effect.retry({
      schedule: Schedule.exponential(TRANSPORT_RETRY_DELAY),
      times: TRANSPORT_RETRY_COUNT,
      while: isTransportFailure,
    })
  );
}

/** Decorates one target operation without retrying surrounding preparation. */
function retryOperation<Arguments extends readonly unknown[], A, E, R>(
  operation: (...args: Arguments) => Effect.Effect<A, E, R>
) {
  return (...args: Arguments) => retryTransport(operation(...args));
}

/** Applies the bounded transport policy independently to every target call. */
export function retryPublicationTarget(
  target: typeof PublicationTarget.Service
): typeof PublicationTarget.Service {
  return PublicationTarget.of({
    abort: retryOperation(target.abort),
    accept: retryOperation(target.accept),
    activate: retryOperation(target.activate),
    activateRecovery: retryOperation(target.activateRecovery),
    cleanup: retryOperation(target.cleanup),
    current: retryOperation(target.current),
    headPage: retryOperation(target.headPage),
    recovery: retryOperation(target.recovery),
    rollbackPage: retryOperation(target.rollbackPage),
    routePage: retryOperation(target.routePage),
    stageArtifactBatch: retryOperation(target.stageArtifactBatch),
    stageItemBatch: retryOperation(target.stageItemBatch),
    stageProjectionBatch: retryOperation(target.stageProjectionBatch),
    stageRecovery: retryOperation(target.stageRecovery),
    stageRelease: retryOperation(target.stageRelease),
    stageRouteBatch: retryOperation(target.stageRouteBatch),
    stageSnapshot: retryOperation(target.stageSnapshot),
    stageSnapshotBatch: retryOperation(target.stageSnapshotBatch),
    status: retryOperation(target.status),
    verify: retryOperation(target.verify),
  });
}
