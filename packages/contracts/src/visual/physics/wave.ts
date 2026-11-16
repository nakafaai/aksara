import { Schema } from "effect";

import { cardFields, type RichSlot, TextSchema } from "#contracts/visual/card";
import { figure } from "#contracts/visual/entry";

/** Props of `EchoLab`: a boat heading for a cliff sounds its horn and hears the echo a few seconds later. */
function echoLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      boatSpeed: Schema.Finite,
      echoTime: Schema.Finite,
      labels: Schema.Struct({
        back: rich,
        boat: rich,
        out: rich,
        start: rich,
        viewLabel: TextSchema,
      }),
      soundSpeed: Schema.Finite,
    })
  );
}

/** Props of `DoubleSlitLab`: young's double slit on an optics bench: a laser lights two narrow slits, and the light from them overlaps on a screen in bright and dark fringes x = λD/a apart. */
function doubleSlitLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      distance: Schema.Finite,
      labels: Schema.Struct({
        count: rich,
        distance: rich,
        distanceName: TextSchema,
        separation: rich,
        separationName: TextSchema,
        spacing: rich,
        viewLabel: TextSchema,
      }),
      separation: Schema.Finite,
      span: Schema.optionalKey(Schema.Finite),
      wavelength: Schema.Finite,
    })
  );
}

/** Props of `SpeakerInterferenceLab`: two loudspeakers on one signal generator, seen from above, and a student walking along a line in front of them with a sound meter. */
function speakerInterferenceLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      distance: Schema.Finite,
      frequency: Schema.Finite,
      labels: Schema.Struct({
        frequency: rich,
        frequencyName: TextSchema,
        spacing: rich,
        viewLabel: TextSchema,
        wavelength: rich,
      }),
      separation: Schema.Finite,
      speed: Schema.Finite,
    })
  );
}

/** Props of `RippleTankLab`: a ripple tank seen from above, with a glass plate under one half that makes the water shallow. */
function rippleTankLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      deepSpeed: Schema.Finite,
      incidence: Schema.Finite,
      labels: Schema.Struct({
        frequency: rich,
        incidence: rich,
        incidenceName: TextSchema,
        refraction: rich,
        viewLabel: TextSchema,
        wavelength: rich,
      }),
      shallowSpeed: Schema.Finite,
      wavelength: Schema.Finite,
    })
  );
}

/**
 * The props of the wave labs. Each prop is a value from the item the lab
 * draws, never the conclusion it leads to, so none holds answer state.
 */
export function waveVisuals<E>(rich: RichSlot<E>) {
  return {
    EchoLab: echoLab(rich),
    DoubleSlitLab: doubleSlitLab(rich),
    SpeakerInterferenceLab: speakerInterferenceLab(rich),
    RippleTankLab: rippleTankLab(rich),
  };
}
