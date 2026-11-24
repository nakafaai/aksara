import { Schema } from "effect";
import type { RichSlot } from "#contracts/visual/card";
import {
  byIds,
  byPickedIds,
  cardFields,
  namesEach,
  TextSchema,
} from "#contracts/visual/card";
import { answerAt, figure } from "#contracts/visual/entry";

/** A non-negative finite measure for concentration gradient controls. */
const NonNegativeSchema = Schema.Finite.check(Schema.isGreaterThanOrEqualTo(0));

/** A strictly positive finite upper bound for gradient sliders. */
const PositiveSchema = Schema.Finite.check(Schema.isGreaterThan(0));

/** A non-negative slider whose minimum sits below its maximum. */
const GradientSliderSchema = Schema.Struct({
  max: PositiveSchema,
  min: NonNegativeSchema,
  value: NonNegativeSchema,
}).check(
  Schema.makeFilter(
    ({ max, min, value }) => min < max && min <= value && value <= max,
    {
      message:
        "Expected a gradient range whose minimum is below its maximum, with the starting value between them.",
    }
  )
);

const TRANSPORT_MODES = [
  "simpleDiffusion",
  "facilitated",
  "activePump",
] as const;
const CELL_KINDS = ["plant", "redBlood"] as const;
const TONICITIES = ["hypotonic", "isotonic", "hypertonic"] as const;
const MEMBRANE_PARTS = [
  "phospholipid",
  "cholesterol",
  "integralProtein",
  "glycoprotein",
] as const;

/**
 * Props of `ActiveTransportPumpLab`: a 3D phospholipid bilayer contrasting
 * simple diffusion, facilitated diffusion through channel proteins, and
 * ATP-driven carrier pumps moving solutes against a concentration gradient.
 * ATP usage and direction readouts are optional answer state.
 */
function activeTransportPumpLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      gradient: GradientSliderSchema,
      labels: Schema.Struct({
        atpUse: Schema.optionalKey(rich),
        direction: Schema.optionalKey(rich),
        directions: byIds(["downGradient", "againstGradient"], TextSchema),
        gradient: TextSchema,
        mode: TextSchema,
        modes: byPickedIds(
          TRANSPORT_MODES,
          Schema.Struct({
            mechanism: rich,
            name: TextSchema,
          })
        ),
        parts: byIds(
          ["bilayer", "channelProtein", "carrierPump", "solute", "atp", "adp"],
          TextSchema
        ),
        view: TextSchema,
      }),
      modes: Schema.NonEmptyArray(Schema.Literals(TRANSPORT_MODES)).check(
        Schema.isUnique()
      ),
    }).check(
      Schema.makeFilter(({ labels, modes }) => namesEach(modes, labels.modes), {
        message:
          "Expected a name and mechanism note for every membrane transport mode shown, and no other.",
      })
    ),
    answerAt(["labels", "atpUse"], ["labels", "direction"])
  );
}

/**
 * Props of `PlasmolysisCellLab`: a 3D plant cell and red blood cell compared
 * across hypotonic, isotonic, and hypertonic solutions showing turgor,
 * plasmolysis, haemolysis, and crenation. Cell outcome and net water-flow
 * readouts are optional answer state.
 */
function plasmolysisCellLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      cells: Schema.NonEmptyArray(Schema.Literals(CELL_KINDS)).check(
        Schema.isUnique()
      ),
      labels: Schema.Struct({
        cell: TextSchema,
        cells: byPickedIds(CELL_KINDS, TextSchema),
        outcome: Schema.optionalKey(rich),
        outcomes: byIds(
          ["turgid", "plasmolysed", "haemolysed", "crenated", "normal"],
          TextSchema
        ),
        parts: byIds(
          ["cellWall", "membrane", "vacuole", "cytoplasm", "waterArrow"],
          TextSchema
        ),
        solution: TextSchema,
        solutions: byPickedIds(TONICITIES, TextSchema),
        view: TextSchema,
        waterFlow: Schema.optionalKey(rich),
      }),
      solutions: Schema.NonEmptyArray(Schema.Literals(TONICITIES)).check(
        Schema.isUnique()
      ),
    }).check(
      Schema.makeFilter(
        ({ cells, labels, solutions }) =>
          namesEach(cells, labels.cells) &&
          namesEach(solutions, labels.solutions),
        {
          message:
            "Expected a name for every cell kind and tonicity solution shown, and no other.",
        }
      )
    ),
    answerAt(["labels", "outcome"], ["labels", "waterFlow"])
  );
}

/**
 * Props of `FluidMosaicMembraneLab`: a 3D Singer-Nicolson fluid-mosaic
 * plasma membrane showing hydrophilic heads, hydrophobic fatty-acid tails,
 * cholesterol buffers, integral proteins, and surface glycoproteins with a
 * temperature slider affecting bilayer fluidity. Role and fluidity readouts
 * are optional answer state.
 */
function fluidMosaicMembraneLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      components: Schema.NonEmptyArray(Schema.Literals(MEMBRANE_PARTS)).check(
        Schema.isUnique()
      ),
      labels: Schema.Struct({
        component: TextSchema,
        components: byPickedIds(
          MEMBRANE_PARTS,
          Schema.Struct({
            name: TextSchema,
            role: rich,
          })
        ),
        fluidity: Schema.optionalKey(rich),
        parts: byIds(
          [
            "hydrophilicHead",
            "hydrophobicTail",
            "cholesterol",
            "integralProtein",
            "glycoprotein",
            "glycolipid",
          ],
          TextSchema
        ),
        role: Schema.optionalKey(rich),
        temperature: TextSchema,
        view: TextSchema,
      }),
      temperature: GradientSliderSchema,
    }).check(
      Schema.makeFilter(
        ({ components, labels }) => namesEach(components, labels.components),
        {
          message:
            "Expected a name and role note for every membrane component shown, and no other.",
        }
      )
    ),
    answerAt(["labels", "fluidity"], ["labels", "role"])
  );
}

/**
 * Membrane transport labs covering fluid-mosaic structure, ATP-driven carrier
 * pumps, and osmotic plasmolysis across plant and animal cells.
 */
export function membraneVisuals<E>(rich: RichSlot<E>) {
  return {
    ActiveTransportPumpLab: activeTransportPumpLab(rich),
    FluidMosaicMembraneLab: fluidMosaicMembraneLab(rich),
    PlasmolysisCellLab: plasmolysisCellLab(rich),
  };
}
