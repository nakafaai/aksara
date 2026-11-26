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
const NonNegativeSchema = Schema.Finite.check(Schema.isGreaterThanOrEqualTo(0));

const NonNegativeSliderSchema = Schema.Struct({
  max: PositiveSchema,
  min: NonNegativeSchema,
  value: NonNegativeSchema,
}).check(
  Schema.makeFilter(
    ({ max, min, value }) => min < max && min <= value && value <= max,
    {
      message:
        "Expected a slider range whose minimum is below its maximum, with the starting value between them.",
    }
  )
);

const ALLOY_METALS = ["pureIron", "steel", "bronze", "brass"] as const;

const CONTACT_STAGES = [
  "roasting",
  "catalyticOxidation",
  "oleumAbsorption",
  "dilution",
] as const;

const SILICATE_MATERIALS = [
  "sodaLimeGlass",
  "borosilicateGlass",
  "traditionalCeramic",
  "advancedCeramic",
] as const;

/**
 * Props of `AlloySlipPlaneLab`: a 3D atomic lattice comparing how uniform pure
 * metal layers slide under shear force versus foreign alloy atoms disrupting
 * slip planes in steel, bronze, and brass. Hardness and structure readouts are
 * optional answer state.
 */
function alloySlipPlaneLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      labels: Schema.Struct({
        hardnessNote: Schema.optionalKey(rich),
        metal: TextSchema,
        metals: byPickedIds(
          ALLOY_METALS,
          Schema.Struct({
            hardnessNote: rich,
            name: TextSchema,
            structureNote: rich,
          })
        ),
        parts: byIds(
          ["hostAtom", "foreignAtom", "slipPlane", "shearArrow"],
          TextSchema
        ),
        shearForce: TextSchema,
        structureNote: Schema.optionalKey(rich),
        view: TextSchema,
      }),
      metals: Schema.NonEmptyArray(Schema.Literals(ALLOY_METALS)).check(
        Schema.isUnique()
      ),
      shearForce: NonNegativeSliderSchema,
    }).check(
      Schema.makeFilter(
        ({ labels, metals }) => namesEach(metals, labels.metals),
        {
          message:
            "Expected a name, hardness note, and structure note for every metal or alloy shown, and no other.",
        }
      )
    ),
    answerAt(["labels", "hardnessNote"], ["labels", "structureNote"])
  );
}

/**
 * Props of `ContactSulfuricTowerLab`: a 3D Contact-process sulfuric acid plant
 * tracing sulfur roasting to SO2, V2O5-catalysed oxidation to SO3, absorption
 * into concentrated H2SO4 forming oleum, and controlled dilution. Conditions
 * and equation readouts are optional answer state.
 */
function contactSulfuricTowerLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      labels: Schema.Struct({
        conditions: Schema.optionalKey(rich),
        equation: Schema.optionalKey(rich),
        parts: byIds(
          ["burner", "vanadiumBed", "absorptionTower", "oleumTank", "acidPipe"],
          TextSchema
        ),
        stage: TextSchema,
        stages: byPickedIds(
          CONTACT_STAGES,
          Schema.Struct({
            conditions: rich,
            equation: rich,
            name: TextSchema,
          })
        ),
        view: TextSchema,
      }),
      stages: Schema.NonEmptyArray(Schema.Literals(CONTACT_STAGES)).check(
        Schema.isUnique()
      ),
    }).check(
      Schema.makeFilter(
        ({ labels, stages }) => namesEach(stages, labels.stages),
        {
          message:
            "Expected a name, conditions, and equation for every Contact-process stage shown, and no other.",
        }
      )
    ),
    answerAt(["labels", "conditions"], ["labels", "equation"])
  );
}

/**
 * Props of `GlassCeramicLatticeLab`: a 3D silicate microstructure gallery
 * contrasting amorphous soda-lime and borosilicate glass networks against
 * crystalline clay traditional and advanced ceramics. Property and use
 * readouts are optional answer state.
 */
function glassCeramicLatticeLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      labels: Schema.Struct({
        material: TextSchema,
        materials: byPickedIds(
          SILICATE_MATERIALS,
          Schema.Struct({
            name: TextSchema,
            propertyNote: rich,
            useNote: rich,
          })
        ),
        parts: byIds(
          ["silicaTetrahedron", "boronNode", "clayLayer", "crystalGrain"],
          TextSchema
        ),
        propertyNote: Schema.optionalKey(rich),
        useNote: Schema.optionalKey(rich),
        view: TextSchema,
      }),
      materials: Schema.NonEmptyArray(
        Schema.Literals(SILICATE_MATERIALS)
      ).check(Schema.isUnique()),
    }).check(
      Schema.makeFilter(
        ({ labels, materials }) => namesEach(materials, labels.materials),
        {
          message:
            "Expected a name, property note, and use note for every glass or ceramic material shown, and no other.",
        }
      )
    ),
    answerAt(["labels", "propertyNote"], ["labels", "useNote"])
  );
}

/**
 * Manufactured-substances labs covering alloy slip-plane hardening, the
 * Contact sulfuric acid tower, and glass/ceramic silicate microstructures.
 */
export function materialVisuals<E>(rich: RichSlot<E>) {
  return {
    AlloySlipPlaneLab: alloySlipPlaneLab(rich),
    ContactSulfuricTowerLab: contactSulfuricTowerLab(rich),
    GlassCeramicLatticeLab: glassCeramicLatticeLab(rich),
  };
}
