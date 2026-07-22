import { createHash } from "node:crypto";
import { Effect, Schema, Stream } from "effect";
import {
  type ReleaseId,
  ReleaseIdSchema,
  Sha256HashSchema,
} from "#contracts/ids";
import {
  canonicalizeMaterialProjection,
  type MaterialLessonProjection,
} from "#contracts/projection/material";

const CONTENT_PROJECTION_DIGEST_DOMAIN = "nakafa.aksara.content-projections.v1";

/** SHA-256 computation failed before projection integrity was established. */
export class ProjectionHashError extends Schema.TaggedError<ProjectionHashError>()(
  "ProjectionHashError",
  { releaseId: ReleaseIdSchema }
) {}

/** Keeps Node hash state private while exposing only canonical counters. */
class ProjectionDigestState {
  readonly #hash = createHash("sha256");
  count = 0;

  /** Initializes a domain-separated incremental projection hash. */
  constructor() {
    this.#hash.update(CONTENT_PROJECTION_DIGEST_DOMAIN);
    this.#hash.update("\n");
  }

  /** Adds one canonical projection to this invocation-owned digest. */
  update(projection: MaterialLessonProjection): void {
    this.#hash.update(canonicalizeMaterialProjection(projection));
    this.#hash.update("\n");
    this.count += 1;
  }

  /** Consumes the hash and returns its branded immutable identity. */
  digest() {
    return Sha256HashSchema.make(`sha256:${this.#hash.digest("hex")}`);
  }
}

/** Creates a fresh domain-separated projection digest state. */
export function createProjectionDigest(releaseId: typeof ReleaseIdSchema.Type) {
  return Effect.try({
    catch: () => new ProjectionHashError({ releaseId }),
    try: () => new ProjectionDigestState(),
  });
}

/** Adds one canonical material projection to an incremental digest. */
export function updateProjectionDigest(
  releaseId: typeof ReleaseIdSchema.Type,
  state: ProjectionDigestState,
  projection: MaterialLessonProjection
) {
  return Effect.try({
    catch: () => new ProjectionHashError({ releaseId }),
    try: () => {
      state.update(projection);
      return state;
    },
  });
}

/** Finalizes one incremental projection digest with typed hash failures. */
export function finalizeProjectionDigest(
  releaseId: typeof ReleaseIdSchema.Type,
  state: ProjectionDigestState
) {
  return Effect.try({
    catch: () => new ProjectionHashError({ releaseId }),
    try: () => state.digest(),
  });
}

/** Digests a projection stream without retaining its content bodies. */
export const digestProjections = Effect.fn("AksaraContracts.digestProjections")(
  function* <E, R>(
    releaseId: ReleaseId,
    projections: Stream.Stream<MaterialLessonProjection, E, R>
  ) {
    const initial = yield* createProjectionDigest(releaseId);
    const state = yield* projections.pipe(
      Stream.runFoldEffect(initial, (current, projection) =>
        updateProjectionDigest(releaseId, current, projection)
      )
    );
    const digest = yield* finalizeProjectionDigest(releaseId, state);
    return { count: state.count, digest };
  }
);
