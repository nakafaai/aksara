import { createHash } from "node:crypto";
import { Effect, Schema } from "effect";
import { ReleaseIdSchema, Sha256HashSchema } from "#contracts/ids";
import {
  canonicalizeMaterialProjection,
  type MaterialLessonProjection,
} from "#contracts/projection/material";

export const CONTENT_PROJECTION_DIGEST_DOMAIN =
  "nakafa.aksara.content-projections.v1";

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

/** Computes the signed digest for an already materialized projection iterable. */
export function hashContentProjections(
  projections: Iterable<MaterialLessonProjection>
) {
  const hash = createHash("sha256");
  hash.update(CONTENT_PROJECTION_DIGEST_DOMAIN);
  hash.update("\n");
  for (const projection of projections) {
    hash.update(canonicalizeMaterialProjection(projection));
    hash.update("\n");
  }
  return Sha256HashSchema.make(`sha256:${hash.digest("hex")}`);
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
