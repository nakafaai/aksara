import { Schema } from "effect";

import {
  byIds,
  cardFields,
  type RichSlot,
  TextSchema,
} from "#contracts/visual/card";
import { figure } from "#contracts/visual/entry";

/**
 * Props of `SignificantZerosLab`: one steel rod read with a tape measure, a
 * steel ruler and a long vernier caliper, and written in millimetres,
 * centimetres or metres.
 */
function significantZerosLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      labels: Schema.Struct({
        chooseTool: TextSchema,
        chooseUnit: TextSchema,
        figures: rich,
        measuredZeros: rich,
        placeZeros: rich,
        reading: rich,
        scientific: rich,
        tools: byIds(["tape", "ruler", "caliper"], rich),
        viewLabel: TextSchema,
      }),
    })
  );
}

/**
 * Props of `DecimalSumLab`: an iron rod read with a caliper joined to a copper
 * rod read with a ruler or the caliper.
 */
function decimalSumLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      labels: Schema.Struct({
        chooseTool: TextSchema,
        copper: rich,
        iron: rich,
        raw: rich,
        reported: rich,
        tools: byIds(["ruler", "caliper"], rich),
        viewLabel: TextSchema,
      }),
    })
  );
}

/** Props of `PaperStackLab`: a stack of paper beside a millimetre ruler. */
function paperStackLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      labels: Schema.Struct({
        chooseStack: TextSchema,
        figures: rich,
        reading: rich,
        sheet: rich,
        viewLabel: TextSchema,
      }),
    })
  );
}

/** Props of `BoltDimensionsLab`: one M10 bolt and six quantities. */
function boltDimensionsLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      labels: Schema.Struct({
        chooseQuantity: TextSchema,
        dimension: rich,
        quantities: byIds(
          ["length", "diameter", "area", "volume", "mass", "density"],
          rich
        ),
        value: rich,
        viewLabel: TextSchema,
      }),
    })
  );
}

/**
 * Props of `DensityMeasurementLab`: three blocks of the same size, pine,
 * aluminium and brass, on a dial scale.
 */
function densityMeasurementLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      labels: Schema.Struct({
        chooseMaterial: TextSchema,
        density: rich,
        densitySi: rich,
        mass: rich,
        materials: byIds(["pine", "aluminium", "brass"], rich),
        sides: rich,
        viewLabel: TextSchema,
        volume: rich,
      }),
    })
  );
}

/**
 * Props of `CommonReferenceLab`: one desk measured with three friends' pencils
 * and with a metre rule.
 */
function commonReferenceLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      labels: Schema.Struct({
        chooseReference: TextSchema,
        count: rich,
        desk: rich,
        length: rich,
        references: byIds(["short", "medium", "long", "rule"], rich),
        viewLabel: TextSchema,
      }),
    })
  );
}

/**
 * Props of `UnitSystemsLab`: a 16 lb bowling ball weighed on a dial scale and
 * measured against a ruler with inches on one edge and centimetres on the
 * other.
 */
function unitSystemsLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      labels: Schema.Struct({
        chooseSystem: TextSchema,
        diameter: rich,
        mass: rich,
        systems: byIds(["fps", "cgs", "mks"], rich),
        time: rich,
        viewLabel: TextSchema,
      }),
    })
  );
}

/**
 * The props of the labs of significant figures, units, and derived quantities.
 * No prop states the conclusion a lab leads to, so none holds answer state.
 */
export function precisionVisuals<E>(rich: RichSlot<E>) {
  return {
    SignificantZerosLab: significantZerosLab(rich),
    DecimalSumLab: decimalSumLab(rich),
    PaperStackLab: paperStackLab(rich),
    BoltDimensionsLab: boltDimensionsLab(rich),
    DensityMeasurementLab: densityMeasurementLab(rich),
    CommonReferenceLab: commonReferenceLab(rich),
    UnitSystemsLab: unitSystemsLab(rich),
  };
}
