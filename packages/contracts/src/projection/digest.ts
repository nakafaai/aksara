import { Effect, Stream } from "effect";
import { DigestStream } from "#contracts/hash/stream";
import {
  type ContentProjection,
  canonicalizeContentProjection,
} from "#contracts/projection/spec";

const CONTENT_PROJECTION_DIGEST_DOMAIN = "nakafa.aksara.content-projections";

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

/** Finalizes one projection digest. */
export function finalizeProjectionDigest(state: ProjectionDigestState) {
  return state.digest();
}

/** Digests a projection stream. Its canonical bytes are held until one digest runs. */
export const digestProjections = Effect.fn("AksaraContracts.digestProjections")(
  function* <E, R>(projections: Stream.Stream<ContentProjection, E, R>) {
    const initial = yield* createProjectionDigest;
    const state = yield* projections.pipe(
      Stream.runFoldEffect(
        () => initial,
        (current, projection) => updateProjectionDigest(current, projection)
      )
    );
    const digest = yield* finalizeProjectionDigest(state);
    return { count: state.count, digest };
  }
);
