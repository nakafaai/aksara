import {
  isStaticObject,
  type StaticObject,
  type StaticValue,
} from "#compiler/normalize/value";

export const CIRCLE_MACRO_NAMES = [
  "createCircleArcLine",
  "createCircleChordPoints",
  "createCircleOutlinePoints",
  "createCircleRadiusPoints",
  "createCircleSegmentBoundaryLines",
] as const;
export type CircleMacroName = (typeof CIRCLE_MACRO_NAMES)[number];

const ANGLE_ARC_SEGMENTS = 48;
const FULL_CIRCLE_SEGMENTS = 96;
const SEGMENT_LINE_WIDTH = 4;
const LABEL_PROGRESS = 0.5;

interface CircleAngle {
  readonly radius: number;
  readonly startDegrees: number;
  readonly sweepDegrees: number;
}

interface CircleArc extends CircleAngle {
  readonly segments: number;
}

interface CircleLabel extends StaticObject {
  readonly progress: number;
}

interface CircleLine extends CircleArc {
  readonly color: string;
  readonly label?: CircleLabel;
  readonly lineWidth?: number;
}

/** Reads one finite numeric field from a statically evaluated object. */
function numberField(object: StaticObject, key: string) {
  const value = object[key];
  return typeof value === "number" && Number.isFinite(value)
    ? value
    : undefined;
}

/** Confirms that an object contains no properties beyond one exact shape. */
function hasOnly(object: StaticObject, keys: ReadonlySet<string>) {
  return Object.keys(object).every((key) => keys.has(key));
}

/** Reads the shared radius, start-angle, and sweep-angle input. */
function readAngle(value: StaticValue): CircleAngle | undefined {
  if (!isStaticObject(value)) {
    return;
  }
  const radius = numberField(value, "radius");
  const startDegrees = numberField(value, "startDegrees");
  const sweepDegrees = numberField(value, "sweepDegrees");
  if (
    radius === undefined ||
    startDegrees === undefined ||
    sweepDegrees === undefined
  ) {
    return;
  }
  return { radius, startDegrees, sweepDegrees };
}

/** Reads one optional positive integer sampling budget. */
function readSegments(object: StaticObject) {
  const { segments } = object;
  if (segments === undefined) {
    return ANGLE_ARC_SEGMENTS;
  }
  return typeof segments === "number" && Number.isSafeInteger(segments)
    ? Math.max(1, segments)
    : undefined;
}

/** Reads the measured static circle-line label shape. */
function readLabel(value: StaticValue | undefined) {
  if (value === undefined) {
    return {};
  }
  if (
    !(
      isStaticObject(value) &&
      hasOnly(value, new Set(["offset", "progress", "text"]))
    ) ||
    typeof value.text !== "string"
  ) {
    return;
  }
  const { offset } = value;
  const progress = value.progress ?? LABEL_PROGRESS;
  if (
    typeof progress !== "number" ||
    !Number.isFinite(progress) ||
    (offset !== undefined &&
      (!Array.isArray(offset) ||
        offset.length !== 3 ||
        offset.some(
          (entry) => typeof entry !== "number" || !Number.isFinite(entry)
        )))
  ) {
    return;
  }
  const label: { [key: string]: StaticValue } = { text: value.text };
  if (offset !== undefined) {
    label.offset = offset;
  }
  return { label: { ...label, progress } satisfies CircleLabel };
}

/** Reads the exact arc-line input used by the reviewed circle lessons. */
function readLine(value: StaticValue): CircleLine | undefined {
  if (
    !(
      isStaticObject(value) &&
      hasOnly(
        value,
        new Set([
          "color",
          "label",
          "lineWidth",
          "radius",
          "segments",
          "startDegrees",
          "sweepDegrees",
        ])
      )
    ) ||
    typeof value.color !== "string"
  ) {
    return;
  }
  const angle = readAngle(value);
  const segments = readSegments(value);
  const { lineWidth } = value;
  const decodedLabel = readLabel(value.label);
  if (
    !angle ||
    segments === undefined ||
    (lineWidth !== undefined && typeof lineWidth !== "number") ||
    !decodedLabel
  ) {
    return;
  }
  const line: {
    color: string;
    label?: CircleLabel;
    lineWidth?: number;
    radius: number;
    segments: number;
    startDegrees: number;
    sweepDegrees: number;
  } = {
    ...angle,
    color: value.color,
    segments,
  };
  if (decodedLabel.label) {
    line.label = decodedLabel.label;
  }
  if (typeof lineWidth === "number") {
    line.lineWidth = lineWidth;
  }
  return line;
}

/** Returns one exact XY-plane point using Nakafa's degree convention. */
function createPoint(radius: number, degrees: number): StaticObject {
  const angle = (degrees * Math.PI) / 180;
  return {
    x: radius * Math.cos(angle),
    y: radius * Math.sin(angle),
    z: 0,
  };
}

/** Samples one directed circle arc with the exact reviewed point formula. */
function createArcPoints({
  radius,
  segments,
  startDegrees,
  sweepDegrees,
}: CircleArc) {
  return Array.from({ length: segments + 1 }, (_, index) =>
    createPoint(radius, startDegrees + (index / segments) * sweepDegrees)
  );
}

/** Builds one canonical arc-line literal from decoded static input. */
function createArcLine(line: CircleLine): StaticObject {
  const points = createArcPoints(line);
  const output: { [key: string]: StaticValue } = {
    color: line.color,
    points,
    showPoints: false,
    smooth: true,
  };
  if (line.lineWidth !== undefined) {
    output.lineWidth = line.lineWidth;
  }
  if (line.label) {
    const { progress, ...visibleLabel } = line.label;
    const clamped = Math.max(0, Math.min(1, progress));
    output.labels = [
      {
        ...visibleLabel,
        at: Math.round(clamped * (points.length - 1)),
      },
    ];
  }
  return output;
}

/** Resolves the exact one-argument migration helper call. */
function oneArgument(arguments_: readonly StaticValue[]) {
  return arguments_.length === 1 ? arguments_[0] : undefined;
}

/** Expands one of the five circle helpers observed in reviewed Nakafa MDX. */
export function resolveCircle(
  name: CircleMacroName,
  arguments_: readonly StaticValue[]
): StaticValue | undefined {
  const value = oneArgument(arguments_);
  if (value === undefined) {
    return;
  }
  if (name === "createCircleOutlinePoints") {
    return typeof value === "number" && Number.isFinite(value)
      ? createArcPoints({
          radius: value,
          segments: FULL_CIRCLE_SEGMENTS,
          startDegrees: 0,
          sweepDegrees: 360,
        })
      : undefined;
  }
  if (name === "createCircleRadiusPoints") {
    if (
      !(isStaticObject(value) && hasOnly(value, new Set(["degrees", "radius"])))
    ) {
      return;
    }
    const degrees = numberField(value, "degrees");
    const radius = numberField(value, "radius");
    return degrees === undefined || radius === undefined
      ? undefined
      : [{ x: 0, y: 0, z: 0 }, createPoint(radius, degrees)];
  }
  if (name === "createCircleChordPoints") {
    const angle = readAngle(value);
    if (
      !(
        angle &&
        isStaticObject(value) &&
        hasOnly(value, new Set(["radius", "startDegrees", "sweepDegrees"]))
      )
    ) {
      return;
    }
    return [
      createPoint(angle.radius, angle.startDegrees),
      createPoint(angle.radius, angle.startDegrees + angle.sweepDegrees),
    ];
  }
  const line = readLine(value);
  if (!line) {
    return;
  }
  if (name === "createCircleArcLine") {
    return createArcLine(line);
  }
  const lineWidth = line.lineWidth ?? SEGMENT_LINE_WIDTH;
  return [
    createArcLine({ ...line, lineWidth }),
    {
      color: line.color,
      lineWidth,
      points: [
        createPoint(line.radius, line.startDegrees),
        createPoint(line.radius, line.startDegrees + line.sweepDegrees),
      ],
      showPoints: false,
      smooth: false,
    },
  ];
}
