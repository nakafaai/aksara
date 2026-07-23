import type { ReleaseId } from "@nakafa/aksara-contracts/ids";
import type { ContentReleaseManifest } from "@nakafa/aksara-contracts/release";
import { ContentRouteItemSchema } from "@nakafa/aksara-contracts/release/route";
import type { RouteRollbackRecord } from "@nakafa/aksara-contracts/release/route-page";
import { verifyContentRoutes } from "@nakafa/aksara-contracts/release/routes";
import { Effect, Stream } from "effect";
import type { ReplaySpoolError } from "#publisher/replay/error";
import type { RollbackProofMode } from "#publisher/rollback/proof";

/** Derives one exact inverse route item from its server-proven prior owner. */
function inverseRoute(
  record: RouteRollbackRecord,
  index: number,
  releaseId: ReleaseId
) {
  const { change } = record.current;
  return ContentRouteItemSchema.make({
    change:
      record.priorContentKey === null
        ? {
            locale: change.locale,
            operation: "delete",
            publicPath: change.publicPath,
          }
        : {
            contentKey: record.priorContentKey,
            locale: change.locale,
            operation: "bind",
            publicPath: change.publicPath,
          },
    index,
    releaseId,
  });
}

/** Replays one inverse route item per authenticated current route. */
export function inverseRouteStream(
  records: () => Stream.Stream<RouteRollbackRecord, ReplaySpoolError>,
  releaseId: ReleaseId
) {
  return records().pipe(
    Stream.zipWithIndex,
    Stream.map(([record, index]) => inverseRoute(record, index, releaseId))
  );
}

type VerifyRouteProofError = Effect.Effect.Error<
  ReturnType<typeof verifyContentRoutes<ReplaySpoolError, never>>
>;

/** Authenticates current or inverse routes against the selected proof release. */
export function verifyRouteProof(input: {
  readonly manifest: ContentReleaseManifest;
  readonly mode: RollbackProofMode;
  /** Replays the authoritative route ownership rows for proof verification. */
  readonly records: () => Stream.Stream<RouteRollbackRecord, ReplaySpoolError>;
}): Effect.Effect<void, VerifyRouteProofError> {
  const routes =
    input.mode === "source"
      ? input.records().pipe(Stream.map((record) => record.current))
      : inverseRouteStream(input.records, input.manifest.releaseId);
  return verifyContentRoutes({ manifest: input.manifest, routes }).pipe(
    Effect.asVoid
  );
}
