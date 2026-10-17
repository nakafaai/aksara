import { Effect, Schema, Stream } from "effect";
import { DigestStream } from "#contracts/hash/stream";
import { type ReleaseId, ReleaseIdSchema } from "#contracts/ids";
import {
  type ContentRouteItem,
  canonicalizeContentRouteItem,
} from "#contracts/release/route/spec";

const CONTENT_ROUTE_DIGEST_DOMAIN = "nakafa.aksara.content-routes";

/** SHA-256 computation failed before route integrity was established. */
export class RouteHashError extends Schema.TaggedError<RouteHashError>()(
  "RouteHashError",
  { releaseId: ReleaseIdSchema }
) {}

/** Keeps incremental route digest state private to one release preparation. */
class RouteDigestState {
  readonly #stream = new DigestStream();
  count = 0;

  /** Starts a domain-separated route digest. */
  constructor() {
    this.#stream.add(CONTENT_ROUTE_DIGEST_DOMAIN);
    this.#stream.add("\n");
  }

  /** Adds one canonical route item to this invocation-owned digest. */
  update(item: ContentRouteItem): void {
    this.#stream.add(canonicalizeContentRouteItem(item));
    this.#stream.add("\n");
    this.count += 1;
  }

  /** Digests the complete route stream once and returns its branded identity. */
  digest() {
    return this.#stream.digest();
  }
}

/** Creates fresh domain-separated route digest state. */
export const createRouteDigest = Effect.sync(() => new RouteDigestState());

/** Adds one canonical route item to an incremental digest. */
export function updateRouteDigest(
  state: RouteDigestState,
  item: ContentRouteItem
) {
  return Effect.sync(() => {
    state.update(item);
    return state;
  });
}

/** Completes one incremental route digest with typed hash failures. */
export function completeRouteDigest(
  releaseId: ReleaseId,
  state: RouteDigestState
) {
  return state
    .digest()
    .pipe(Effect.mapError(() => new RouteHashError({ releaseId })));
}

/** Digests a canonical route stream. Its canonical bytes are held until one Web Crypto digest runs. */
export const digestRoutes = Effect.fn("AksaraContracts.digestRoutes")(
  function* <E, R>(
    releaseId: ReleaseId,
    routes: Stream.Stream<ContentRouteItem, E, R>
  ) {
    const initial = yield* createRouteDigest;
    const state = yield* routes.pipe(
      Stream.runFoldEffect(
        () => initial,
        (current, route) => updateRouteDigest(current, route)
      )
    );
    const digest = yield* completeRouteDigest(releaseId, state);
    return { count: state.count, digest };
  }
);
