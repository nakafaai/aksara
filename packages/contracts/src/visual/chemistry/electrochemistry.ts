import { Schema } from "effect";
import type { RichSlot } from "#contracts/visual/card";
import { byIds, cardFields, TextSchema } from "#contracts/visual/card";
import { answerAt, figure } from "#contracts/visual/entry";

/** The aqueous electrolytes an electrolysis cell can hold. */
const ELECTROLYTES = [
  "copper-sulfate",
  "silver-nitrate",
  "sodium-chloride-dilute",
  "sodium-chloride-concentrated",
  "sulfuric-acid",
] as const;

/** The electrode materials: two inert, two that dissolve as an anode in their own ions. */
const ELECTRODES = ["carbon", "platinum", "copper", "silver"] as const;

/** The ways the pH of an electrolyte moves while the current flows. */
const TRENDS = ["falls", "rises", "steady"] as const;

/**
 * Props of `ElectrolysisLab`: one cell, or several in series on one battery,
 * each a beaker of electrolyte with two electrodes. A cell caption names its
 * electrolyte and electrodes, one per cell. With `showProducts`, the ions
 * drift and discharge, the products form, and the footer gives each
 * half-equation, the product's amount for `electrons` moles of electrons,
 * and the pH trend, so both are answer state.
 */
function electrolysisLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      cells: Schema.NonEmptyArray(
        Schema.Struct({
          electrode: Schema.Literals(ELECTRODES),
          electrolyte: Schema.Literals(ELECTROLYTES),
        })
      ),
      electrons: Schema.optionalKey(Schema.Finite),
      labels: Schema.Struct({
        anode: TextSchema,
        atAnode: rich,
        atCathode: rich,
        battery: TextSchema,
        cathode: TextSchema,
        cells: Schema.NonEmptyArray(rich),
        electrons: rich,
        ph: rich,
        trends: byIds(TRENDS, rich),
        view: TextSchema,
      }),
      showProducts: Schema.optionalKey(Schema.Boolean),
    }),
    answerAt(["electrons"], ["showProducts"])
  );
}

/** The metals a half-cell of a chemical cell can be made of. */
const METALS = ["magnesium", "zinc", "iron", "copper", "silver"] as const;

/**
 * Props of `ChemicalCellLab`: two metals, each in a solution of its own ions,
 * joined by a salt bridge, with a voltmeter in the external circuit. With
 * `showProducts`, the voltmeter reads the cell voltage and the footer gives
 * each half-equation with the mass that dissolves or deposits for `electrons`
 * moles of electrons, so both are answer state.
 */
function chemicalCellLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      electrons: Schema.optionalKey(Schema.Finite),
      labels: Schema.Struct({
        atNegative: rich,
        atPositive: rich,
        electrons: rich,
        halfCells: rich,
        view: TextSchema,
        voltage: rich,
        voltmeter: TextSchema,
      }),
      metals: Schema.Tuple([Schema.Literals(METALS), Schema.Literals(METALS)]),
      showProducts: Schema.optionalKey(Schema.Boolean),
    }),
    answerAt(["electrons"], ["showProducts"])
  );
}

/** The electrochemistry labs. */
export function electrochemistryVisuals<E>(rich: RichSlot<E>) {
  return {
    ChemicalCellLab: chemicalCellLab(rich),
    ElectrolysisLab: electrolysisLab(rich),
  };
}
