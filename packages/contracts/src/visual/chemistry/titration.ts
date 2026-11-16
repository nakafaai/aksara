import { Schema } from "effect";

import {
  byIds,
  cardFields,
  type RichSlot,
  TextSchema,
} from "#contracts/visual/card";
import { answerAt, figure } from "#contracts/visual/entry";

/** What the burette can deliver. */
const TITRANTS = [
  "hydrochloric-acid",
  "sulfuric-acid",
  "sodium-hydroxide",
  "potassium-dichromate",
] as const;

/** What the conical flask can hold. */
const ANALYTES = [
  "hydrochloric-acid",
  "sodium-hydroxide",
  "sodium-carbonate",
  "iron-sulfate",
] as const;

/** The indicator in the flask; acidified dichromate needs none. */
const INDICATORS = ["phenolphthalein", "methyl-orange", "none"] as const;

/** The colours the flask can show. */
const HUES = [
  "colourless",
  "pink",
  "yellow",
  "orange",
  "red",
  "green",
  "pale-green",
] as const;

/**
 * Props of `TitrationLab`: a burette of titrant over a conical flask of a
 * measured solution, at bench scale. With `showEndPoint`, a slider runs
 * titrant out, the flask changes colour at the end point, and the footer
 * reads the volume, the colour, the pH of a strong acid and base, the
 * equation, and the working that finds the end point, so it is answer state.
 */
function titrationLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      analyte: Schema.Struct({
        concentration: Schema.Finite,
        solute: Schema.Literals(ANALYTES),
        volume: Schema.Finite,
      }),
      indicator: Schema.Literals(INDICATORS),
      labels: Schema.Struct({
        added: TextSchema,
        analyte: rich,
        endPoint: rich,
        hue: rich,
        hues: byIds(HUES, rich),
        ph: rich,
        reaction: rich,
        titrant: rich,
        view: TextSchema,
      }),
      showEndPoint: Schema.optionalKey(Schema.Boolean),
      titrant: Schema.Struct({
        concentration: Schema.Finite,
        solute: Schema.Literals(TITRANTS),
      }),
    }),
    answerAt(["showEndPoint"])
  );
}

/** The volumetric analysis labs. */
export function titrationVisuals<E>(rich: RichSlot<E>) {
  return {
    TitrationLab: titrationLab(rich),
  };
}
