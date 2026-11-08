import { Array as Arr, MutableList, Order, Schema } from "effect";

/** One sampled position; a plane curve keeps z at zero. */
export const SamplePointSchema = Schema.Struct({
  x: Schema.Finite,
  y: Schema.Finite,
  z: Schema.Finite,
});
export type SamplePoint = typeof SamplePointSchema.Type;

/** One visible, unbroken run of a sampled curve, in authored coordinates. */
export type SampleBranch = readonly SamplePoint[];

/** The frame a sampled curve is clipped to; a plane frame has no z range. */
export const SampleBoxSchema = Schema.Struct({
  x: Schema.Struct({ max: Schema.Finite, min: Schema.Finite }),
  y: Schema.Struct({ max: Schema.Finite, min: Schema.Finite }),
  z: Schema.optionalKey(
    Schema.Struct({ max: Schema.Finite, min: Schema.Finite })
  ),
});
export type SampleBox = typeof SampleBoxSchema.Type;

/** Where a curve stands for one parameter value; NaN where it is undefined. */
export type SampleTrace = (parameter: number) => SamplePoint;

/** Fewest samples on each visible branch, the Aksara visuals rule. */
export const MINIMUM_BRANCH_SAMPLES = 200;
const BASE_SAMPLES = 2 * MINIMUM_BRANCH_SAMPLES;
const MAXIMUM_DEPTH = 12;
const MAXIMUM_SAMPLES = 24_000;
/** Largest gap between a curve and its chord, as a fraction of the frame. */
const FLATNESS = 0.0015;
/** A chord longer than this is split further even where the curve looks flat. */
const JUMP = 0.2;
/** A chord this long at the deepest split crosses a break, a step, or an asymptote. */
const BREAK = 0.004;

const AXES = ["x", "y", "z"] as const;

/** Whether every coordinate of a point is finite. */
function finite(point: SamplePoint) {
  return (
    Number.isFinite(point.x) &&
    Number.isFinite(point.y) &&
    Number.isFinite(point.z)
  );
}

/** The frame's ranges, with a plane frame's z pinned to zero. */
function ranges(box: SampleBox) {
  return { x: box.x, y: box.y, z: box.z ?? { max: 0, min: 0 } };
}

/** Distance between two points measured in frame spans, so every axis counts alike. */
function spanDistance(box: SampleBox, from: SamplePoint, to: SamplePoint) {
  const all = ranges(box);
  return Math.hypot(
    ...Arr.map(AXES, (axis) => {
      const span = all[axis].max - all[axis].min;
      return span > 0 ? (to[axis] - from[axis]) / span : 0;
    })
  );
}

/** One sample: its parameter, its point, and whether a break follows it. */
interface Sample {
  broken: boolean;
  readonly parameter: number;
  readonly point: SamplePoint;
}

/**
 * Splits one interval until the curve is flat between its samples, and marks
 * a break where the chord still jumps at the deepest split or the curve is
 * undefined inside it.
 */
function refine(
  trace: SampleTrace,
  box: SampleBox,
  from: Sample,
  to: Sample,
  depth: number,
  out: MutableList.MutableList<Sample>
) {
  const parameter = (from.parameter + to.parameter) / 2;
  const middle = { broken: false, parameter, point: trace(parameter) };
  const bothFinite = finite(from.point) && finite(to.point);
  if (out.length >= MAXIMUM_SAMPLES) {
    from.broken = from.broken || !bothFinite;
    return;
  }
  if (depth >= MAXIMUM_DEPTH) {
    from.broken =
      from.broken ||
      !bothFinite ||
      spanDistance(box, from.point, to.point) > BREAK;
    return;
  }
  if (bothFinite && finite(middle.point)) {
    const chordMiddle = {
      x: (from.point.x + to.point.x) / 2,
      y: (from.point.y + to.point.y) / 2,
      z: (from.point.z + to.point.z) / 2,
    };
    const flat = spanDistance(box, chordMiddle, middle.point) <= FLATNESS;
    const short = spanDistance(box, from.point, to.point) <= JUMP;
    if (flat && short) {
      return;
    }
  } else if (
    !(finite(from.point) || finite(to.point) || finite(middle.point))
  ) {
    from.broken = true;
    return;
  }
  refine(trace, box, from, middle, depth + 1, out);
  MutableList.append(out, middle);
  refine(trace, box, middle, to, depth + 1, out);
}

/** Samples a parameter range densely and adaptively, keeping named values exact. */
function sampleRange(
  trace: SampleTrace,
  box: SampleBox,
  min: number,
  max: number,
  named: readonly number[]
) {
  const uniform = Arr.makeBy(
    BASE_SAMPLES + 1,
    (index) => min + ((max - min) * index) / BASE_SAMPLES
  );
  const parameters = Arr.dedupe(
    Arr.sort(
      Arr.appendAll(
        uniform,
        Arr.filter(named, (value) => value > min && value < max)
      ),
      Order.Number
    )
  );
  const base = Arr.map(
    parameters,
    (parameter): Sample => ({
      broken: false,
      parameter,
      point: trace(parameter),
    })
  );
  const out = MutableList.make<Sample>();
  Arr.forEach(base, (sample, index) => {
    MutableList.append(out, sample);
    const next = base[index + 1];
    if (next) {
      refine(trace, box, sample, next, 0, out);
    }
  });
  return Arr.sort(
    MutableList.toArray(out),
    Order.mapInput(Order.Number, (sample: Sample) => sample.parameter)
  );
}

/**
 * Where a segment enters and leaves the frame, as fractions along it, or
 * nothing when it misses the frame (Liang and Barsky's clipping).
 */
function clipSegment(box: SampleBox, from: SamplePoint, to: SamplePoint) {
  const all = ranges(box);
  let enter = 0;
  let leave = 1;
  for (const axis of AXES) {
    const delta = to[axis] - from[axis];
    const { max, min } = all[axis];
    if (delta === 0) {
      if (from[axis] < min || from[axis] > max) {
        return;
      }
      continue;
    }
    const first = (min - from[axis]) / delta;
    const second = (max - from[axis]) / delta;
    enter = Math.max(enter, Math.min(first, second));
    leave = Math.min(leave, Math.max(first, second));
  }
  return enter <= leave ? { enter, leave } : undefined;
}

/** The point a fraction of the way along a segment, and its parameter. */
function along(from: Sample, to: Sample, fraction: number): Sample {
  const at = (axis: (typeof AXES)[number]) =>
    from.point[axis] + (to.point[axis] - from.point[axis]) * fraction;
  return {
    broken: false,
    parameter: from.parameter + (to.parameter - from.parameter) * fraction,
    point: { x: at("x"), y: at("y"), z: at("z") },
  };
}

/** Whether a point lies inside the frame, its edges included. */
function insideBox(box: SampleBox, point: SamplePoint) {
  const all = ranges(box);
  return (
    finite(point) &&
    Arr.every(
      AXES,
      (axis) => point[axis] >= all[axis].min && point[axis] <= all[axis].max
    )
  );
}

const EDGE_STEPS = 48;

/**
 * Finds where the curve itself crosses the frame edge between a sample inside
 * and a sample outside, by halving the parameter interval, so the edge sample
 * lies on the curve rather than on a chord.
 */
function edge(
  trace: SampleTrace,
  box: SampleBox,
  inner: Sample,
  outer: Sample
): Sample {
  let inside = inner.parameter;
  let outside = outer.parameter;
  for (let step = 0; step < EDGE_STEPS; step += 1) {
    const middle = (inside + outside) / 2;
    if (insideBox(box, trace(middle))) {
      inside = middle;
    } else {
      outside = middle;
    }
  }
  return { broken: false, parameter: inside, point: trace(inside) };
}

/** Splits samples into visible runs inside the frame, cut exactly at its edges. */
function visibleRuns(
  trace: SampleTrace,
  box: SampleBox,
  samples: readonly Sample[]
) {
  const runs = MutableList.make<Arr.NonEmptyReadonlyArray<Sample>>();
  let run = MutableList.make<Sample>();
  const close = () => {
    const items = MutableList.toArray(run);
    if (Arr.isReadonlyArrayNonEmpty(items) && items.length > 1) {
      MutableList.append(runs, items);
    }
    run = MutableList.make<Sample>();
  };
  Arr.forEach(samples, (from, index) => {
    const to = samples[index + 1];
    if (!to || from.broken || !(finite(from.point) && finite(to.point))) {
      close();
      return;
    }
    const clipped = clipSegment(box, from.point, to.point);
    if (!clipped) {
      close();
      return;
    }
    const fromInside = clipped.enter === 0;
    const toInside = clipped.leave === 1;
    if (!fromInside || run.length === 0) {
      close();
      MutableList.append(
        run,
        fromInside
          ? from
          : toInside
            ? edge(trace, box, to, from)
            : along(from, to, clipped.enter)
      );
    }
    MutableList.append(
      run,
      toInside
        ? to
        : fromInside
          ? edge(trace, box, from, to)
          : along(from, to, clipped.leave)
    );
    if (!toInside) {
      close();
    }
  });
  close();
  return MutableList.toArray(runs);
}

/**
 * Samples one curve inside its frame. Every visible branch holds at least 200
 * samples, more where it bends or climbs, with an exact sample at each named
 * parameter value and at each frame edge it crosses. Breaks, undefined
 * stretches, and asymptotes split the curve into separate branches.
 */
export function sampleCurve(
  trace: SampleTrace,
  box: SampleBox,
  range: { readonly max: number; readonly min: number },
  named: readonly number[] = []
): readonly SampleBranch[] {
  const runs = visibleRuns(
    trace,
    box,
    sampleRange(trace, box, range.min, range.max, named)
  );
  return Arr.flatMap(runs, (run) => {
    const dense =
      run.length >= MINIMUM_BRANCH_SAMPLES
        ? [run]
        : visibleRuns(
            trace,
            box,
            sampleRange(
              trace,
              box,
              Arr.headNonEmpty(run).parameter,
              Arr.lastNonEmpty(run).parameter,
              named
            )
          );
    return Arr.map(dense, (each) => Arr.map(each, (sample) => sample.point));
  });
}
