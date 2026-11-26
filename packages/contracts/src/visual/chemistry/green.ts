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

const PositiveSchema = Schema.Finite.check(Schema.isGreaterThan(0));

const PositiveSliderSchema = Schema.Struct({
  max: PositiveSchema,
  min: PositiveSchema,
  value: PositiveSchema,
}).check(
  Schema.makeFilter(
    ({ max, min, value }) => min < max && min <= value && value <= max,
    {
      message:
        "Expected a positive slider range whose minimum is below its maximum, with the starting value between them.",
    }
  )
);

const SYNTHESIS_ROUTES = [
  "addition",
  "substitution",
  "elimination",
  "fermentation",
] as const;

const CATALYST_MODES = [
  "stoichiometric",
  "homogeneous",
  "heterogeneous",
  "biocatalyst",
] as const;

/**
 * Props of `AtomEconomyReactorLab`: a 3D continuous synthesis reactor
 * comparing how many reactant atoms enter the desired product versus waste
 * byproducts across addition, substitution, elimination, and fermentation
 * routes. Atom economy and waste readouts are optional answer state.
 */
function atomEconomyReactorLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      labels: Schema.Struct({
        atomEconomy: Schema.optionalKey(rich),
        parts: byIds(
          [
            "reactantFeed",
            "reactorChamber",
            "desiredProduct",
            "byproductWaste",
          ],
          TextSchema
        ),
        route: TextSchema,
        routes: byPickedIds(
          SYNTHESIS_ROUTES,
          Schema.Struct({
            economy: rich,
            name: TextSchema,
            wasteNote: rich,
          })
        ),
        view: TextSchema,
        wasteNote: Schema.optionalKey(rich),
      }),
      routes: Schema.NonEmptyArray(Schema.Literals(SYNTHESIS_ROUTES)).check(
        Schema.isUnique()
      ),
    }).check(
      Schema.makeFilter(
        ({ labels, routes }) => namesEach(routes, labels.routes),
        {
          message:
            "Expected a name, economy, and waste note for every synthesis route shown, and no other.",
        }
      )
    ),
    answerAt(["labels", "atomEconomy"], ["labels", "wasteNote"])
  );
}

/**
 * Props of `GreenCatalystCycleLab`: a 3D catalytic recovery loop comparing
 * single-use stoichiometric reagents against recyclable homogeneous,
 * heterogeneous, and enzyme biocatalysts over repeated batch cycles. E-factor
 * and recovery readouts are optional answer state.
 */
function greenCatalystCycleLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      cycles: PositiveSliderSchema,
      labels: Schema.Struct({
        cycles: TextSchema,
        eFactor: Schema.optionalKey(rich),
        mode: TextSchema,
        modes: byPickedIds(
          CATALYST_MODES,
          Schema.Struct({
            eFactor: rich,
            name: TextSchema,
            recoveryNote: rich,
          })
        ),
        parts: byIds(
          [
            "catalystBed",
            "reactantStream",
            "productOut",
            "recoveryLoop",
            "wasteBin",
          ],
          TextSchema
        ),
        recoveryNote: Schema.optionalKey(rich),
        view: TextSchema,
      }),
      modes: Schema.NonEmptyArray(Schema.Literals(CATALYST_MODES)).check(
        Schema.isUnique()
      ),
    }).check(
      Schema.makeFilter(({ labels, modes }) => namesEach(modes, labels.modes), {
        message:
          "Expected a name, E-factor, and recovery note for every green catalysis mode shown, and no other.",
      })
    ),
    answerAt(["labels", "eFactor"], ["labels", "recoveryNote"])
  );
}

/**
 * Green chemistry labs covering atom-economy reaction efficiency and
 * recyclable catalytic cycle waste reduction.
 */
export function greenVisuals<E>(rich: RichSlot<E>) {
  return {
    AtomEconomyReactorLab: atomEconomyReactorLab(rich),
    GreenCatalystCycleLab: greenCatalystCycleLab(rich),
  };
}
