import { Array as Arr, Schema } from "effect";
import type { RichSlot } from "#contracts/visual/card";
import { byIds, cardFields, TextSchema } from "#contracts/visual/card";
import { answerAt, figure } from "#contracts/visual/entry";

/** What the learner looks at: the degree of each town, or routes between two towns. */
const NETWORK_MODES = ["degrees", "route"] as const;

/** The fewest and the most towns the board shows legibly on a phone. */
const TOWN_RANGE = { maximum: 8, minimum: 2 } as const;

/** The id a road and a route use to name a town. */
const TownIdSchema = Schema.String.check(Schema.isNonEmpty());

/** One town: a vertex of the network, with the name its sign shows. */
const TownSchema = Schema.Struct({ id: TownIdSchema, name: TextSchema });

/** One road: an edge of the network, weighted by its length in kilometres. */
const RoadSchema = Schema.Struct({
  from: TownIdSchema,
  length: Schema.Finite.check(Schema.isGreaterThan(0)),
  to: TownIdSchema,
});

/** The towns, the roads between them, and the trip's two ends. */
const NetworkSchema = Schema.Struct({
  end: TownIdSchema,
  roads: Schema.NonEmptyArray(RoadSchema),
  start: TownIdSchema,
  towns: Schema.NonEmptyArray(TownSchema).check(
    Schema.isMinLength(TOWN_RANGE.minimum),
    Schema.isMaxLength(TOWN_RANGE.maximum)
  ),
});

type Network = typeof NetworkSchema.Type;

/** The unordered pair a road joins, so a road and its reverse read the same. */
function roadPair({ from, to }: typeof RoadSchema.Type) {
  return from < to ? `${from}|${to}` : `${to}|${from}`;
}

/** The towns a road leads to from the frontier that were not reached before. */
function newTowns(
  { from, to }: typeof RoadSchema.Type,
  frontier: readonly string[],
  reached: readonly string[]
) {
  if (Arr.contains(frontier, from) && !Arr.contains(reached, to)) {
    return [to];
  }
  if (Arr.contains(frontier, to) && !Arr.contains(reached, from)) {
    return [from];
  }
  return [];
}

/** The towns reachable along the roads, widening from the frontier one road at a time. */
function reachedTowns(
  roads: Network["roads"],
  reached: readonly string[],
  frontier: readonly string[]
): readonly string[] {
  const next = Arr.dedupe(
    Arr.flatMap(roads, (road) => newTowns(road, frontier, reached))
  );
  return next.length === 0
    ? reached
    : reachedTowns(roads, Arr.appendAll(reached, next), next);
}

/**
 * Whether the network is one simple, connected graph: each town once, each
 * road joining two different listed towns at most once in either direction,
 * every town reachable, and the trip running between two different towns.
 */
function isSimpleNetwork(network: Network) {
  const ids = Arr.map(network.towns, ({ id }) => id);
  /** Whether the network lists a town with this id. */
  const listed = (id: string) => Arr.contains(ids, id);
  const pairs = Arr.map(network.roads, roadPair);
  return (
    Arr.dedupe(ids).length === ids.length &&
    Arr.every(
      network.roads,
      ({ from, to }) => from !== to && listed(from) && listed(to)
    ) &&
    Arr.dedupe(pairs).length === pairs.length &&
    reachedTowns(network.roads, [ids[0]], [ids[0]]).length === ids.length &&
    network.start !== network.end &&
    listed(network.start) &&
    listed(network.end)
  );
}

/**
 * Props of `RouteNetworkLab`: a network as a model landscape of `towns`
 * joined by weighted `roads`. In the degrees mode each town shows how many
 * roads meet there and the footer adds the degrees up to twice the number of
 * roads; in the route mode the learner picks a route from `start` to `end`, a
 * van drives it, and the footer adds up its roads. With `showShortest`, the
 * footer also names the shortest route and its length, so it is answer state.
 */
function routeNetworkLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      ...NetworkSchema.fields,
      labels: Schema.Struct({
        degreeSum: rich,
        length: rich,
        mode: TextSchema,
        modes: byIds(NETWORK_MODES, TextSchema),
        route: TextSchema,
        shortest: rich,
        town: TextSchema,
        trip: rich,
        twiceRoads: rich,
        viewLabel: TextSchema,
      }),
      mode: Schema.optionalKey(Schema.Literals(NETWORK_MODES)),
      showShortest: Schema.optionalKey(Schema.Boolean),
    }).check(
      Schema.makeFilter(isSimpleNetwork, {
        message:
          "Expected each town once, roads between two different listed towns at most once each, one connected network, and a trip between two different towns.",
      })
    ),
    answerAt(["showShortest"])
  );
}

/** The graph-theory labs, where a network of vertices and edges is read. */
export function networkVisuals<E>(rich: RichSlot<E>) {
  return { RouteNetworkLab: routeNetworkLab(rich) };
}
