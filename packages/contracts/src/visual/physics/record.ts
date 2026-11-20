import { Schema } from "effect";
import type { RichSlot } from "#contracts/visual/card";
import { byIds, cardFields, TextSchema } from "#contracts/visual/card";
import { figure } from "#contracts/visual/entry";

/** Props of `TickerTapeMotionLab`: a ticker timer on a lab bench. */
function tickerTapeMotionLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      labels: Schema.Struct({
        acceleration: rich,
        chooseMotion: TextSchema,
        firstStrip: rich,
        interval: rich,
        lastStrip: rich,
        motions: byIds(["uniform", "speeding", "slowing"], rich),
        viewLabel: TextSchema,
      }),
      motion: Schema.optionalKey(
        Schema.Literals(["uniform", "speeding", "slowing"])
      ),
    })
  );
}

/**
 * Props of `StrobePhotoMotionLab`: a strobe photograph built up flash by flash
 * in a dark room.
 */
function strobePhotoMotionLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      labels: Schema.Struct({
        airTime: rich,
        height: rich,
        interval: rich,
        outcome: rich,
        viewLabel: TextSchema,
      }),
      shot: Schema.Literals(["drop", "toss", "launch", "components"]),
    })
  );
}

/**
 * The props of the labs that record a motion. No prop states the conclusion a
 * lab leads to, so none holds answer state.
 */
export function recordVisuals<E>(rich: RichSlot<E>) {
  return {
    TickerTapeMotionLab: tickerTapeMotionLab(rich),
    StrobePhotoMotionLab: strobePhotoMotionLab(rich),
  };
}
