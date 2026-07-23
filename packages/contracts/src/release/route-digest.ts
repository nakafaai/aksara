import { createHash } from "node:crypto";
import { Effect, Schema, Stream } from "effect";
import {
  type ReleaseId,
  ReleaseIdSchema,
  Sha256HashSchema,
} from "#contracts/ids";
import {
  type ContentRouteItem,
  canonicalizeContentRouteItem,
} from "#contracts/release/route";

const CONTENT_ROUTE_DIGEST_DOMAIN = "nakafa.aksara.content-routes.v1";

/** SHA-256 computation failed before route integrity was established. */
export class RouteHashError extends Schema.TaggedError<RouteHashError>()(
  "RouteHashError",
  { releaseId: ReleaseIdSchema }
) {}

/** Keeps incremental route hash state private to one release preparation. */
class RouteDigestState {
  readonly #hash = createHash("sha256");
  count = 0;

  /** Initializes a domain-separated incremental route hash. */
  constructor() {
    this.#hash.update(CONTENT_ROUTE_DIGEST_DOMAIN);
    this.#hash.update("\n");
  }

  /** Adds one canonical route item to this invocation-owned digest. */
  update(item: ContentRouteItem): void {
    this.#hash.update(canonicalizeContentRouteItem(item));
    this.#hash.update("\n");
    this.count += 1;
  }

  /** Consumes the route hash and returns its branded identity. */
  digest() {
    return Sha256HashSchema.make(`sha256:${this.#hash.digest("hex")}`);
  }
}

/** Creates fresh domain-separated route digest state. */
export function createRouteDigest(releaseId: ReleaseId) {
  return Effect.try({
    catch: () => new RouteHashError({ releaseId }),
    try: () => new RouteDigestState(),
  });
}

/** Adds one canonical route item to an incremental digest. */
export function updateRouteDigest(
  releaseId: ReleaseId,
  state: RouteDigestState,
  item: ContentRouteItem
) {
  return Effect.try({
    catch: () => new RouteHashError({ releaseId }),
    try: () => {
      state.update(item);
      return state;
    },
  });
}

/** Completes one incremental route digest with typed hash failures. */
export function completeRouteDigest(
  releaseId: ReleaseId,
  state: RouteDigestState
) {
  return Effect.try({
    catch: () => new RouteHashError({ releaseId }),
    try: () => state.digest(),
  });
}

/** Digests a canonical route stream without retaining its rows. */
export const digestRoutes = Effect.fn("AksaraContracts.digestRoutes")(
  function* <E, R>(
    releaseId: ReleaseId,
    routes: Stream.Stream<ContentRouteItem, E, R>
  ) {
    const initial = yield* createRouteDigest(releaseId);
    const state = yield* routes.pipe(
      Stream.runFoldEffect(initial, (current, route) =>
        updateRouteDigest(releaseId, current, route)
      )
    );
    const digest = yield* completeRouteDigest(releaseId, state);
    return { count: state.count, digest };
  }
);
