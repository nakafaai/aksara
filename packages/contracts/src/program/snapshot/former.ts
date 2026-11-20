import { Array as Arr, MutableHashSet, Option } from "effect";

/**
 * The former paths a program stream has named so far, each as its locale and
 * path. A former path redirects to the route that named it, so it must never
 * be a route itself or lead to two routes.
 */
export class FormerPathLedger {
  readonly #paths = MutableHashSet.empty<string>();

  /**
   * Records one route's former paths, or returns the first identity that
   * collides: the route's own path that an earlier route named as former, or
   * a former path that is already a route or another route's former path.
   */
  claim(
    route: string,
    formerPaths: readonly string[],
    routes: MutableHashSet.MutableHashSet<string>
  ) {
    if (MutableHashSet.has(this.#paths, route)) {
      return Option.some(route);
    }
    const collision = Arr.findFirst(
      formerPaths,
      (path) =>
        MutableHashSet.has(routes, path) ||
        MutableHashSet.has(this.#paths, path)
    );
    if (Option.isNone(collision)) {
      for (const path of formerPaths) {
        MutableHashSet.add(this.#paths, path);
      }
    }
    return collision;
  }
}
