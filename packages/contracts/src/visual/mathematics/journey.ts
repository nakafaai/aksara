import { Array as Arr, Schema } from "effect";
import type { RichSlot } from "#contracts/visual/card";
import { byIds, cardFields, TextSchema } from "#contracts/visual/card";
import { answerAt, figure } from "#contracts/visual/entry";

/** How a leg moves: away from the start, back toward it, or not at all. */
const MOTIONS = ["away", "back", "still"] as const;

/** The most legs one traveller drives, so the toolbar's leg picker fits a phone. */
const LEG_LIMIT = 5;

/** A whole number of minutes, at least zero. */
const MinuteSchema = Schema.Int.check(Schema.isGreaterThanOrEqualTo(0));

/** A distance from the start of the road in kilometres, never behind it. */
const DistanceSchema = Schema.Finite.check(Schema.isGreaterThanOrEqualTo(0));

/** One leg: how many whole minutes it lasts, and how it changes the distance from the start, in kilometres. */
const LegSchema = Schema.Struct({
  change: Schema.Finite,
  minutes: Schema.Int.check(Schema.isGreaterThan(0)),
});

type Leg = typeof LegSchema.Type;

/** A traveller's legs in order, one to five of them. */
const LegsSchema = Schema.NonEmptyArray(LegSchema).check(
  Schema.isMaxLength(LEG_LIMIT)
);

/** The bus: it leaves the start of the road at minute 0. */
const BusSchema = Schema.Struct({ legs: LegsSchema, name: TextSchema });

/** A second traveller on the same road, leaving at its own minute and place. */
const SecondSchema = Schema.Struct({
  depart: MinuteSchema,
  from: DistanceSchema,
  legs: LegsSchema,
  name: TextSchema,
});

/** A named place on the road, such as a stop, at its distance from the start. */
const StopSchema = Schema.Struct({ at: DistanceSchema, name: TextSchema });

type Bus = typeof BusSchema.Type;
type Second = typeof SecondSchema.Type;
type Stop = typeof StopSchema.Type;

/** Whether a distance is written to at most one decimal place, as the graph's readouts print it. */
function inTenths(value: number) {
  return Math.abs(value * 10 - Math.round(value * 10)) < 1e-9;
}

/** The distances from the start after each leg, beginning at `from`. */
function distancesAfter(from: number, legs: readonly Leg[]) {
  return Arr.scan(legs, from, (distance, leg) => distance + leg.change);
}

/** Whether a traveller's legs keep it on the road, never behind its start. */
function staysOnRoad(from: number, legs: readonly Leg[]) {
  return Arr.every(distancesAfter(from, legs), (distance) => distance >= 0);
}

/** Where the bus is at a minute: it moves steadily through each leg and waits at the end of its last. */
function busAt(legs: readonly Leg[], minute: number) {
  return Arr.reduce(legs, { distance: 0, start: 0 }, (state, leg) => {
    const into = Math.min(Math.max(minute - state.start, 0), leg.minutes);
    return {
      distance: state.distance + (leg.change * into) / leg.minutes,
      start: state.start + leg.minutes,
    };
  }).distance;
}

/** Whether the second traveller sets off apart from the bus, so their first meeting is a real crossing. */
function startsApart(legs: readonly Leg[], second: Second | undefined) {
  return (
    second === undefined ||
    Math.abs(busAt(legs, second.depart) - second.from) > 1e-9
  );
}

/** Whether the stops sit at distinct places within the stretch the bus drives. */
function stopsOnRoute(legs: readonly Leg[], stops: readonly Stop[]) {
  const farthest = Math.max(...distancesAfter(0, legs));
  const places = Arr.map(stops, ({ at }) => at);
  return (
    Arr.dedupe(places).length === places.length &&
    Arr.every(places, (at) => at <= farthest)
  );
}

/**
 * Whether the journey draws a graph the lab can read: every change in
 * tenths of a kilometre, at least one leg of the bus moving, both travellers
 * staying on the road, a second traveller setting off apart from the bus,
 * and the stops on the bus's stretch of road.
 */
function isJourney(
  bus: Bus,
  second: Second | undefined,
  stops: readonly Stop[]
) {
  const legs = Arr.appendAll(bus.legs, second?.legs ?? []);
  return (
    Arr.every(legs, ({ change }) => inTenths(change)) &&
    Arr.some(bus.legs, ({ change }) => change !== 0) &&
    staysOnRoad(0, bus.legs) &&
    (second === undefined || staysOnRoad(second.from, second.legs)) &&
    startsApart(bus.legs, second) &&
    stopsOnRoute(bus.legs, stops)
  );
}

/**
 * Props of `JourneyGraphLab`: a bus drives one straight road through its
 * `stops` while its distance-time graph draws itself on graph paper beside
 * the road, the paper's distance axis running the same way and to the same
 * scale as the road. Each leg is a segment named by its corners O, A, B and
 * on; picking one draws its rise and run, and the footer works out its speed
 * as distance over time, while the whole journey shows its average speed.
 * An optional `second` traveller has its own line, and where the two lines
 * first cross they meet. Speeds are in the unit per hour, worked out from
 * kilometres and minutes. With `showSpeeds`, the footer shows each speed,
 * and with `showMeeting` the meeting time and place and its mark on the
 * graph, so both are answer state.
 */
function journeyGraphLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      bus: BusSchema,
      labels: Schema.Struct({
        average: rich,
        axes: Schema.Struct({ distance: TextSchema, time: TextSchema }),
        distance: rich,
        meeting: Schema.optionalKey(rich),
        motion: byIds(MOTIONS, rich),
        parts: TextSchema,
        speed: rich,
        time: TextSchema,
        units: Schema.Struct({
          distance: TextSchema,
          speed: TextSchema,
          time: TextSchema,
        }),
        viewLabel: TextSchema,
        whole: TextSchema,
      }),
      second: Schema.optionalKey(SecondSchema),
      showMeeting: Schema.optionalKey(Schema.Boolean),
      showSpeeds: Schema.optionalKey(Schema.Boolean),
      stops: Schema.optionalKey(Schema.Array(StopSchema)),
    }).check(
      Schema.makeFilter(
        ({ bus, labels, second, stops = [] }) =>
          isJourney(bus, second, stops) &&
          (second === undefined || labels.meeting !== undefined),
        {
          message:
            "Expected changes in tenths of a kilometre, a bus that moves, travellers that never go behind the start, a second traveller that sets off apart from the bus with a meeting label, and stops at distinct places on the bus's stretch.",
        }
      )
    ),
    answerAt(["showSpeeds"], ["showMeeting"])
  );
}

/** The motion-graph labs, where a journey is read from its distance-time graph. */
export function journeyVisuals<E>(rich: RichSlot<E>) {
  return { JourneyGraphLab: journeyGraphLab(rich) };
}
