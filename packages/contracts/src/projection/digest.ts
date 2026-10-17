import { Effect, Schema, Stream } from "effect";
import { DigestStream } from "#contracts/hash/stream";
import { type ReleaseId, ReleaseIdSchema } from "#contracts/ids";
import {
  type ContentProjection,
  canonicalizeContentProjection,
} from "#contracts/projection/spec";

const CONTENT_PROJECTION_DIGEST_DOMAIN = "nakafa.aksara.content-projections";

/** SHA-256 computation failed before projection integrity was established. */
export class ProjectionHashError extends Schema.TaggedError<ProjectionHashError>()(
  "ProjectionHashError",
  { releaseId: ReleaseIdSchema }
) {}

/** Keeps the digest stream private while exposing only canonical counters. */
class ProjectionDigestState {
  readonly #stream = new DigestStream();
  count = 0;

  /** Starts one domain-separated projection digest. */
  constructor() {
    this.#stream.add(CONTENT_PROJECTION_DIGEST_DOMAIN);
    this.#stream.add("\n");
  }

  /** Adds one canonical projection to this invocation-owned digest. */
  update(projection: ContentProjection): void {
    this.#stream.add(canonicalizeContentProjection(projection));
    this.#stream.add("\n");
    this.count += 1;
  }

  /** Digests the complete stream once and returns its branded immutable identity. */
  digest() {
    return this.#stream.digest();
  }
}

/** Creates a fresh domain-separated projection digest state. */
export const createProjectionDigest = Effect.sync(
  () => new ProjectionDigestState()
);

/** Adds one canonical content projection to an incremental digest. */
export function updateProjectionDigest(
  state: ProjectionDigestState,
  projection: ContentProjection
) {
  return Effect.sync(() => {
    state.update(projection);
    return state;
  });
}

/** Finalizes one projection digest with a typed hash failure. */
export function finalizeProjectionDigest(
  releaseId: typeof ReleaseIdSchema.Type,
  state: ProjectionDigestState
) {
  return state
    .digest()
    .pipe(Effect.mapError(() => new ProjectionHashError({ releaseId })));
}

/** Digests a projection stream. Its canonical bytes are held until one Web Crypto digest runs. */
export const digestProjections = Effect.fn("AksaraContracts.digestProjections")(
  function* <E, R>(
    releaseId: ReleaseId,
    projections: Stream.Stream<ContentProjection, E, R>
  ) {
    const initial = yield* createProjectionDigest;
    const state = yield* projections.pipe(
      Stream.runFoldEffect(
        () => initial,
        (current, projection) => updateProjectionDigest(current, projection)
      )
    );
    const digest = yield* finalizeProjectionDigest(releaseId, state);
    return { count: state.count, digest };
  }
);
