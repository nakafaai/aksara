import { Effect, Schema, Stream } from "effect";
import { compareContentHeads, routeIdentity } from "#contracts/content";
import {
  PublicPathSchema,
  ReleaseIdSchema,
  Sha256HashSchema,
} from "#contracts/ids";
import { digestProjections } from "#contracts/projection/digest";
import {
  type MaterialLessonProjection,
  MaterialLessonProjectionSchema,
} from "#contracts/projection/material";
import type { ContentReleaseManifest } from "#contracts/release/spec";

const ProjectionIndexSchema = Schema.Number.pipe(
  Schema.int(),
  Schema.nonNegative()
);

/** One streamed projection failed strict schema decoding. */
export class ProjectionDecodeError extends Schema.TaggedError<ProjectionDecodeError>()(
  "ProjectionDecodeError",
  { projectionIndex: ProjectionIndexSchema }
) {}

/** Projections are duplicated or not in canonical content-head order. */
export class ProjectionOrderError extends Schema.TaggedError<ProjectionOrderError>()(
  "ProjectionOrderError",
  { projectionIndex: ProjectionIndexSchema }
) {}

/** Two material projections claim the same locale-specific public route. */
export class ProjectionRouteError extends Schema.TaggedError<ProjectionRouteError>()(
  "ProjectionRouteError",
  {
    duplicateIndex: ProjectionIndexSchema,
    firstIndex: ProjectionIndexSchema,
    publicPath: PublicPathSchema,
  }
) {}

/** The streamed projection count differs from the signed manifest. */
export class ProjectionCountError extends Schema.TaggedError<ProjectionCountError>()(
  "ProjectionCountError",
  {
    actualCount: ProjectionIndexSchema,
    expectedCount: ProjectionIndexSchema,
    releaseId: ReleaseIdSchema,
  }
) {}

/** The streamed projection digest differs from the signed manifest. */
export class ProjectionDigestError extends Schema.TaggedError<ProjectionDigestError>()(
  "ProjectionDigestError",
  {
    actualDigest: Sha256HashSchema,
    expectedDigest: Sha256HashSchema,
    releaseId: ReleaseIdSchema,
  }
) {}

interface ProjectionState {
  readonly firstIndexByRoute: Map<string, number>;
  previous: MaterialLessonProjection | undefined;
}

/** Count authenticated without retaining complete projection bodies. */
export interface VerifiedContentProjections {
  readonly count: number;
}

/** Decodes one row and applies canonical order and route uniqueness rules. */
function decodeProjection(
  state: ProjectionState,
  source: unknown,
  projectionIndex: number
) {
  return Schema.decodeUnknown(MaterialLessonProjectionSchema)(source, {
    onExcessProperty: "error",
  }).pipe(
    Effect.mapError(() => new ProjectionDecodeError({ projectionIndex })),
    Effect.tap((projection) => {
      if (
        state.previous &&
        compareContentHeads(state.previous, projection) >= 0
      ) {
        return Effect.fail(new ProjectionOrderError({ projectionIndex }));
      }
      state.previous = projection;
      const identity = routeIdentity(projection);
      const firstIndex = state.firstIndexByRoute.get(identity);
      if (firstIndex !== undefined) {
        return Effect.fail(
          new ProjectionRouteError({
            duplicateIndex: projectionIndex,
            firstIndex,
            publicPath: projection.publicPath,
          })
        );
      }
      state.firstIndexByRoute.set(identity, projectionIndex);
      return Effect.void;
    })
  );
}

/** Strictly decodes a replayable canonical material projection stream. */
export function decodeContentProjections<E, R>(
  projections: Stream.Stream<unknown, E, R>
) {
  return Stream.unwrap(
    Effect.sync(() => {
      const state: ProjectionState = {
        firstIndexByRoute: new Map(),
        previous: undefined,
      };
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
