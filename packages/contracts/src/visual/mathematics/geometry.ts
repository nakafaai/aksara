import { Schema } from "effect";

import { LatexSchema } from "#contracts/assessment/scalar";
import {
  cardFields,
  type RichSlot,
  TripleSchema,
} from "#contracts/visual/card";
import { answerAt, figure } from "#contracts/visual/entry";
import { sceneLine } from "#contracts/visual/mathematics/line";
import { numberLine } from "#contracts/visual/mathematics/number";

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

/** The camera of a scene: where it sits and where it looks, each optional. */
const CameraPoseSchema = Schema.Struct({
  cameraPosition: Schema.optionalKey(TripleSchema),
  cameraTarget: Schema.optionalKey(TripleSchema),
});
type CameraPose = typeof CameraPoseSchema.Type;

/**
 * Checks that the camera sits away from the point it looks at, with the
 * renderer's defaults for a pose that is left out. A camera on its target has
 * no direction to look in, and the renderer measures its zoom and its distance
 * limits from that distance, which is then zero.
 */
function hasCameraDistance({
  cameraPosition = DEFAULT_CAMERA_POSITION,
  cameraTarget = DEFAULT_CAMERA_TARGET,
}: CameraPose) {
  const [x, y, z] = cameraPosition;
  const [targetX, targetY, targetZ] = cameraTarget;
  return x !== targetX || y !== targetY || z !== targetZ;
}

/** Props of `LineEquation`: lines, curves, and circle parts in three dimensions. */
function lineEquation<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      ...CameraPoseSchema.fields,
      data: Schema.NonEmptyArray(sceneLine(rich)),
      showZAxis: Schema.optionalKey(Schema.Boolean),
    }).check(
      Schema.makeFilter(hasCameraDistance, {
        message: "Expected a camera that sits away from the point it looks at.",
      })
    )
  );
}

/** The exact sine, cosine, and tangent of the angle, each as LaTeX, such as `5/13`. */
const TrigValuesSchema = Schema.Struct({
  cos: Schema.optionalKey(LatexSchema),
  sin: Schema.optionalKey(LatexSchema),
  tan: Schema.optionalKey(LatexSchema),
});

/** Props of `UnitCircle`: the angle in degrees and its exact values in LaTeX. */
function unitCircle<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      angle: Schema.optionalKey(Schema.Finite),
      trigValues: Schema.optionalKey(TrigValuesSchema),
    }),
    answerAt(["trigValues"])
  );
}

/** Props of `QuadraticEquationReadingRoomProblem`: a room whose sides are unknown. */
function readingRoom<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      description: Schema.optionalKey(rich),
      heightLabel: rich,
      widthLabel: rich,
    })
  );
}

/**
 * The visuals of lines, numbers, and circles. The exact trigonometric values
 * of a unit circle are what a learner is asked to find, so they are answer
 * state.
 */
export function geometryVisuals<E>(rich: RichSlot<E>) {
  return {
    LineEquation: lineEquation(rich),
    NumberLine: numberLine(rich),
    QuadraticEquationReadingRoomProblem: readingRoom(rich),
    UnitCircle: unitCircle(rich),
  };
}
