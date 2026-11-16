import { Schema } from "effect";

import {
  byIds,
  cardFields,
  type RichSlot,
  TextSchema,
} from "#contracts/visual/card";
import { figure } from "#contracts/visual/entry";

/** Props of `GlassBlockLab`: a ray box aims a narrow beam at the top face of a rectangular glass block. */
function glassBlockLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      incidence: Schema.Finite,
      index: Schema.Finite,
      labels: Schema.Struct({
        critical: rich,
        incidence: rich,
        incidenceName: TextSchema,
        next: rich,
        outcome: rich,
        reflected: rich,
        refracted: rich,
        refraction: rich,
        viewLabel: TextSchema,
      }),
    })
  );
}

/** Props of `ApparentDepthLab`: a coin on the floor of a glass container holding one or more liquids in layers, seen straight down by an eye above. */
function apparentDepthLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      labels: Schema.Struct({
        apparent: rich,
        image: rich,
        liquids: byIds(["water", "oil", "glycerine", "alcohol"], rich),
        real: rich,
        top: TextSchema,
        viewLabel: TextSchema,
      }),
      layers: Schema.NonEmptyArray(
        Schema.Struct({
          index: Schema.Finite,
          liquid: Schema.Literals(["water", "oil", "glycerine", "alcohol"]),
          thickness: Schema.Finite,
        })
      ),
    })
  );
}

/** Props of `ConvexLensLab`: an object arrow in front of a convex lens on an optical bench. */
function convexLensLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      focal: Schema.Finite,
      labels: Schema.Struct({
        distance: rich,
        distanceName: TextSchema,
        image: rich,
        magnification: rich,
        nature: rich,
        noImage: rich,
        presets: TextSchema,
        real: rich,
        viewLabel: TextSchema,
        virtual: rich,
      }),
      object: Schema.Finite,
      presets: Schema.optionalKey(Schema.Array(Schema.Finite)),
    })
  );
}

/** Props of `TelescopeLab`: an astronomical telescope in normal adjustment, drawn to scale with a magnified view of its eyepiece end. */
function telescopeLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      eyepiecePower: Schema.Finite,
      labels: Schema.Struct({
        eyepiece: rich,
        eyepieceName: TextSchema,
        length: rich,
        magnification: rich,
        objective: rich,
        viewLabel: TextSchema,
      }),
      objectivePower: Schema.Finite,
    })
  );
}

/**
 * The props of the light labs. Each prop is a value from the item the lab
 * draws, never the conclusion it leads to, so none holds answer state.
 */
export function lightVisuals<E>(rich: RichSlot<E>) {
  return {
    GlassBlockLab: glassBlockLab(rich),
    ApparentDepthLab: apparentDepthLab(rich),
    ConvexLensLab: convexLensLab(rich),
    TelescopeLab: telescopeLab(rich),
  };
}
