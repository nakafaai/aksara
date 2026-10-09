import { Effect, MutableHashMap, Option, Schema, Stream } from "effect";
import { compareContentHeads, routeIdentity } from "#contracts/content";
import { PublicPathSchema } from "#contracts/ids";
import { digestProjections } from "#contracts/projection/digest";
import {
  type ContentProjection,
  ContentProjectionSchema,
} from "#contracts/projection/spec";
import {
  ReleaseCountMismatchFields,
  ReleaseDigestMismatchFields,
} from "#contracts/release/mismatch";
import {
  type ContentReleaseManifest,
  ReleaseCountSchema,
} from "#contracts/release/spec";

/** One streamed projection failed strict schema decoding. */
export class ProjectionDecodeError extends Schema.TaggedError<ProjectionDecodeError>()(
  "ProjectionDecodeError",
  { projectionIndex: ReleaseCountSchema }
) {}

/** Projections are duplicated or not in canonical content-head order. */
export class ProjectionOrderError extends Schema.TaggedError<ProjectionOrderError>()(
  "ProjectionOrderError",
  { projectionIndex: ReleaseCountSchema }
) {}

/** Two content projections claim the same locale-specific public route. */
export class ProjectionRouteError extends Schema.TaggedError<ProjectionRouteError>()(
  "ProjectionRouteError",
  {
    duplicateIndex: ReleaseCountSchema,
    firstIndex: ReleaseCountSchema,
    publicPath: PublicPathSchema,
  }
) {}

/** The streamed projection count differs from the signed manifest. */
export class ProjectionCountError extends Schema.TaggedError<ProjectionCountError>()(
  "ProjectionCountError",
  { ...ReleaseCountMismatchFields }
) {}

/** The streamed projection digest differs from the signed manifest. */
export class ProjectionDigestError extends Schema.TaggedError<ProjectionDigestError>()(
  "ProjectionDigestError",
  { ...ReleaseDigestMismatchFields }
) {}

/** Creates the replay state that one stream of projections shares while it decodes. */
function projectionState() {
  return {
    firstIndexByRoute: MutableHashMap.empty<string, number>(),
    previous: Option.none<ContentProjection>(),
  };
}

type ProjectionState = ReturnType<typeof projectionState>;

const VerifiedContentProjectionsSchema = Schema.Struct({
  count: Schema.Finite,
});

/** Count authenticated without retaining complete projection bodies. */
export type VerifiedContentProjections =
  typeof VerifiedContentProjectionsSchema.Type;

/** Decodes one row and applies canonical order and route uniqueness rules. */
const decodeProjection = Effect.fn("AksaraContracts.decodeProjection")(
  function* (state: ProjectionState, source: unknown, projectionIndex: number) {
    const projection = yield* Schema.decodeUnknownEffect(
      ContentProjectionSchema
    )(source, { onExcessProperty: "error" }).pipe(
      Effect.mapError(() => new ProjectionDecodeError({ projectionIndex }))
    );
    if (
      Option.isSome(state.previous) &&
      compareContentHeads(state.previous.value, projection) >= 0
    ) {
      return yield* new ProjectionOrderError({ projectionIndex });
    }
    state.previous = Option.some(projection);
    if (projection.kind === "question-body") {
      return projection;
    }
    const { appLocale, publicPath } = projection;
    const identity = routeIdentity({ appLocale, publicPath });
    const firstIndex = Option.getOrUndefined(
      MutableHashMap.get(state.firstIndexByRoute, identity)
    );
    if (firstIndex !== undefined) {
      return yield* new ProjectionRouteError({
        duplicateIndex: projectionIndex,
        firstIndex,
        publicPath,
      });
    }
    MutableHashMap.set(state.firstIndexByRoute, identity, projectionIndex);
    return projection;
  }
);

/** Strictly decodes a replayable canonical content projection stream. */
export function decodeContentProjections<E, R>(
  projections: Stream.Stream<unknown, E, R>
) {
  return Stream.unwrap(
    Effect.sync(() => {
      const state = projectionState();
      return projections.pipe(
        Stream.zipWithIndex,
        Stream.mapEffect(([source, projectionIndex]) =>
          decodeProjection(state, source, projectionIndex)
        )
      );
    })
  );
}

/** Authenticates a replayable projection stream against its signed manifest. */
export const verifyContentProjections = Effect.fn(
  "AksaraContracts.verifyContentProjections"
)(function* <E, R>(input: {
  readonly manifest: ContentReleaseManifest;
  readonly projections: Stream.Stream<unknown, E, R>;
}) {
  const summary = yield* digestProjections(
    input.manifest.releaseId,
    decodeContentProjections(input.projections)
  );
  if (summary.count !== input.manifest.projectionCount) {
    return yield* new ProjectionCountError({
      actualCount: summary.count,
      expectedCount: input.manifest.projectionCount,
      releaseId: input.manifest.releaseId,
    });
  }
  if (summary.digest !== input.manifest.projectionDigest) {
    return yield* new ProjectionDigestError({
      actualDigest: summary.digest,
      expectedDigest: input.manifest.projectionDigest,
      releaseId: input.manifest.releaseId,
    });
  }
  return { count: summary.count } satisfies VerifiedContentProjections;
});
