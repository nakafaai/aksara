import { Schema } from "effect";

import type { RichSlot } from "#contracts/visual/card";
import { figure } from "#contracts/visual/entry";

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
 * The geometry visuals that a figure draws with its own model. Lines, number
 * lines, and circles are MathVisual scenes, the one mathematics visual.
 */
export function geometryVisuals<E>(rich: RichSlot<E>) {
  return {
    QuadraticEquationReadingRoomProblem: readingRoom(rich),
  };
}
