import { Effect, Stream } from "effect";
import { DigestStream } from "#contracts/hash/stream";
import {
  type ContentRouteItem,
  canonicalizeContentRouteItem,
} from "#contracts/release/route/spec";

const CONTENT_ROUTE_DIGEST_DOMAIN = "nakafa.aksara.content-routes";

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

/** Completes one incremental route digest. */
export function completeRouteDigest(state: RouteDigestState) {
  return state.digest();
}

/** Digests a canonical route stream. Its canonical bytes are held until one digest runs. */
export const digestRoutes = Effect.fn("AksaraContracts.digestRoutes")(
  function* <E, R>(routes: Stream.Stream<ContentRouteItem, E, R>) {
    const initial = yield* createRouteDigest;
    const state = yield* routes.pipe(
      Stream.runFoldEffect(
        () => initial,
        (current, route) => updateRouteDigest(current, route)
      )
    );
    const digest = yield* completeRouteDigest(state);
    return { count: state.count, digest };
  }
);
