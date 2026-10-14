import { Array as Arr, Record as Rec, Schema } from "effect";

import { AssetIdSchema } from "#contracts/assessment/identity";
import { RichTextSchema } from "#contracts/assessment/inline";
import {
  LatexSchema,
  NonNegativeIntSchema,
  PlainTextSchema,
  PositiveIntSchema,
} from "#contracts/assessment/scalar";
import {
  MathVisualKeySchema,
  PositiveMeasureSchema,
  SpacePointSchema,
} from "#contracts/math/base";
import { MathVisualSchema, mathVisualLabelKeys } from "#contracts/math/visual";

/**
 * One uploaded image. The text alternative is required, and the pixel size is
 * required so a page can reserve the space before the file loads.
 */
export const ImageSchema = Schema.Struct({
  alt: PlainTextSchema,
  asset: AssetIdSchema,
  height: PositiveIntSchema,
  width: PositiveIntSchema,
});
export type Image = typeof ImageSchema.Type;

/** Three finite numbers, such as a camera position or an offset: x, y, and z. */
const TripleSchema = Schema.Tuple([
  Schema.Finite,
  Schema.Finite,
  Schema.Finite,
]);

/**
 * The width of a line on screen. Zero is a width: the renderer draws no stroke,
 * so a series with `showPoints` shows its points alone, as the answer to TKA
 * compulsory mathematics set 3, question 8, shows its two fixed points.
 */
const LineWidthSchema = Schema.Finite.check(Schema.isGreaterThanOrEqualTo(0));

/** The header every figure card shows: a title and a description. */
const CardFields = {
  description: RichTextSchema,
  title: RichTextSchema,
};

/** Checks that the rich labels match the anchors of the scene, key for key. */
function hasSceneLabels(props: {
  readonly labels: Readonly<Record<string, unknown>>;
  readonly scene: typeof MathVisualSchema.Type;
}) {
  const anchors = mathVisualLabelKeys(props.scene);
  const keys = Rec.keys(props.labels);
  return (
    anchors.length === keys.length &&
    Arr.every(anchors, (anchor) => Arr.contains(keys, anchor))
  );
}

/** Props of `MathVisual`: a plane or space scene and the rich labels it anchors. */
export const MathVisualPropsSchema = Schema.Struct({
  ...CardFields,
  labels: Schema.Record(MathVisualKeySchema, RichTextSchema),
  scene: MathVisualSchema,
}).check(
  Schema.makeFilter(hasSceneLabels, {
    message: "Expected one rich label for each label anchor of the scene.",
  })
);

/** A segment start: a number, or minus infinity, which JSON cannot hold. */
const SegmentStartSchema = Schema.Union([
  Schema.Finite,
  Schema.Literal("-infinity"),
]);

/** A segment end: a number, or plus infinity, which JSON cannot hold. */
const SegmentEndSchema = Schema.Union([
  Schema.Finite,
  Schema.Literal("infinity"),
]);

/** Checks that a segment that has two numbers does not end before it starts. */
function isOrderedSegment(segment: {
  readonly end: number | "infinity";
  readonly start: number | "-infinity";
}) {
  return (
    typeof segment.start !== "number" ||
    typeof segment.end !== "number" ||
    segment.start <= segment.end
  );
}

/**
 * One segment of a number line. The corpus sets a background only to
 * transparent, and an arbitrary color is not part of this contract, because no
 * meaning may ride on color.
 */
const NumberLineSegmentSchema = Schema.Struct({
  backgroundColor: Schema.optionalKey(Schema.Literal("transparent")),
  end: SegmentEndSchema,
  endInclusive: Schema.optionalKey(Schema.Boolean),
  endLabel: Schema.optionalKey(RichTextSchema),
  label: Schema.optionalKey(RichTextSchema),
  shaded: Schema.optionalKey(Schema.Boolean),
  showPoints: Schema.optionalKey(Schema.Boolean),
  start: SegmentStartSchema,
  startInclusive: Schema.optionalKey(Schema.Boolean),
  startLabel: Schema.optionalKey(RichTextSchema),
}).check(
  Schema.makeFilter(isOrderedSegment, {
    message: "Expected a segment that does not end before it starts.",
  })
);

/** Checks that the visible range of a number line runs upward. */
function isOrderedRange(props: {
  readonly max?: number;
  readonly min?: number;
}) {
  return (
    props.min === undefined || props.max === undefined || props.min < props.max
  );
}

/** Props of `NumberLine`: segments on a line, with an optional visible range. */
export const NumberLinePropsSchema = Schema.Struct({
  ...CardFields,
  max: Schema.optionalKey(Schema.Finite),
  min: Schema.optionalKey(Schema.Finite),
  segments: Schema.NonEmptyArray(NumberLineSegmentSchema),
}).check(
  Schema.makeFilter(isOrderedRange, {
    message: "Expected a visible range whose minimum is below its maximum.",
  })
);

/** Whether the first or last point of a line belongs to it. */
const EndpointStateSchema = Schema.Literals(["open", "closed"]);

/** A label on a line: rich text at one of its points, nudged by an offset. */
const LineLabelSchema = Schema.Struct({
  anchorX: Schema.optionalKey(Schema.Literals(["center", "left", "right"])),
  at: Schema.optionalKey(NonNegativeIntSchema),
  offset: Schema.optionalKey(TripleSchema),
  text: RichTextSchema,
});

/** One line or curve through points, with the markers and labels it shows. */
const LineFieldsSchema = Schema.Struct({
  color: PlainTextSchema,
  cone: Schema.optionalKey(
    Schema.Struct({
      position: Schema.Literals(["start", "end", "both"]),
      size: Schema.optionalKey(PositiveMeasureSchema),
    })
  ),
  endpoints: Schema.optionalKey(
    Schema.Struct({
      end: Schema.optionalKey(EndpointStateSchema),
      start: Schema.optionalKey(EndpointStateSchema),
    })
  ),
  labels: Schema.optionalKey(Schema.NonEmptyArray(LineLabelSchema)),
  lineWidth: Schema.optionalKey(LineWidthSchema),
  pointIndices: Schema.optionalKey(Schema.NonEmptyArray(NonNegativeIntSchema)),
  points: Schema.NonEmptyArray(SpacePointSchema),
  showPoints: Schema.optionalKey(Schema.Boolean),
  smooth: Schema.optionalKey(Schema.Boolean),
});

/** Checks that every index of a line names one of its points. */
function hasIndexedPoints(line: typeof LineFieldsSchema.Type) {
  const count = line.points.length;
  return (
    Arr.every(line.pointIndices ?? [], (index) => index < count) &&
    Arr.every(line.labels ?? [], ({ at }) => at === undefined || at < count)
  );
}

/** One line whose point indices and label places all name a point of it. */
const LineSchema = LineFieldsSchema.check(
  Schema.makeFilter(hasIndexedPoints, {
    message: "Expected every point index to name a point of the line.",
  })
);

/**
 * Where the `LineEquation` card puts the camera when `cameraPosition` is left
 * out: `DEFAULT_CAMERA_POSITION_X`, `_Y`, and `_Z` in
 * `components/contents/mathematics/line/equation.tsx` of Nakafa's design system
 * (read on 13 October 2026).
 */
const DEFAULT_CAMERA_POSITION: typeof TripleSchema.Type = [10, 6, 10];

/**
 * Where the scene looks when `cameraTarget` is left out: the origin, as
 * `DEFAULT_CAMERA_TARGET` in `components/three/camera-controls.tsx` of the
 * same package says (read on 13 October 2026).
 */
const DEFAULT_CAMERA_TARGET: typeof TripleSchema.Type = [0, 0, 0];

const LineEquationFieldsSchema = Schema.Struct({
  ...CardFields,
  cameraPosition: Schema.optionalKey(TripleSchema),
  cameraTarget: Schema.optionalKey(TripleSchema),
  data: Schema.NonEmptyArray(LineSchema),
  showZAxis: Schema.optionalKey(Schema.Boolean),
});

/**
 * Checks that the camera sits away from the point it looks at, with the
 * renderer's defaults for a pose that is left out. A camera on its target has
 * no direction to look in, and the renderer measures its zoom and its distance
 * limits from that distance, which is then zero.
 */
function hasCameraDistance({
  cameraPosition = DEFAULT_CAMERA_POSITION,
  cameraTarget = DEFAULT_CAMERA_TARGET,
}: typeof LineEquationFieldsSchema.Type) {
  const [x, y, z] = cameraPosition;
  const [targetX, targetY, targetZ] = cameraTarget;
  return x !== targetX || y !== targetY || z !== targetZ;
}

/**
 * Props of `LineEquation`: lines in three dimensions, as the question bank uses
 * them. Lessons also draw circle shapes (`kind` set to `circle-arc`,
 * `circle-chord`, `circle-outline`, `circle-radius`, or `circle-segment`); no
 * item uses one, so they are not part of this contract.
 */
export const LineEquationPropsSchema = LineEquationFieldsSchema.check(
  Schema.makeFilter(hasCameraDistance, {
    message: "Expected a camera that sits away from the point it looks at.",
  })
);

/** The exact sine, cosine, and tangent of the angle, each as LaTeX, such as `5/13`. */
const TrigValuesSchema = Schema.Struct({
  cos: Schema.optionalKey(LatexSchema),
  sin: Schema.optionalKey(LatexSchema),
  tan: Schema.optionalKey(LatexSchema),
});

/** Props of `UnitCircle`: the angle in degrees and its exact values in LaTeX. */
export const UnitCirclePropsSchema = Schema.Struct({
  ...CardFields,
  angle: Schema.optionalKey(Schema.Finite),
  trigValues: Schema.optionalKey(TrigValuesSchema),
});

/** Props of `Mermaid`: a diagram source with a plain title and description. */
export const MermaidPropsSchema = Schema.Struct({
  chart: Schema.String.check(Schema.isNonEmpty()),
  description: PlainTextSchema,
  title: PlainTextSchema,
});

/**
 * What every figure carries besides its props. The text alternative is
 * required, because a figure must say in words what it shows, and the caption
 * is rich text or null, as ProseMirror writes an unset attribute.
 */
const FigureFields = {
  alt: PlainTextSchema,
  caption: Schema.NullOr(RichTextSchema),
};

/**
 * The attributes of a figure node: one of the five renderer components and the
 * typed props that component takes.
 */
export const FigureAttrsSchema = Schema.Union([
  Schema.Struct({
    ...FigureFields,
    component: Schema.Literal("MathVisual"),
    props: MathVisualPropsSchema,
  }),
  Schema.Struct({
    ...FigureFields,
    component: Schema.Literal("NumberLine"),
    props: NumberLinePropsSchema,
  }),
  Schema.Struct({
    ...FigureFields,
    component: Schema.Literal("LineEquation"),
    props: LineEquationPropsSchema,
  }),
  Schema.Struct({
    ...FigureFields,
    component: Schema.Literal("Mermaid"),
    props: MermaidPropsSchema,
  }),
  Schema.Struct({
    ...FigureFields,
    component: Schema.Literal("UnitCircle"),
    props: UnitCirclePropsSchema,
  }),
]);
export type FigureAttrs = typeof FigureAttrsSchema.Type;

/** A figure block: an interactive visual with a required text alternative. */
export const FigureNodeSchema = Schema.Struct({
  attrs: FigureAttrsSchema,
  type: Schema.Literal("figure"),
});
export type FigureNode = typeof FigureNodeSchema.Type;
