import { Schema } from "effect";
import { bacteriaVisuals } from "#contracts/visual/biology/bacteria";
import { binomialVisuals } from "#contracts/visual/biology/binomial";
import { bloodVisuals } from "#contracts/visual/biology/blood";
import { boneVisuals } from "#contracts/visual/biology/bone";
import { cellVisuals } from "#contracts/visual/biology/cell";
import { chromosomeVisuals } from "#contracts/visual/biology/chromosome";
import { climateVisuals } from "#contracts/visual/biology/climate";
import { denatureVisuals } from "#contracts/visual/biology/denature";
import { drawingVisuals } from "#contracts/visual/biology/drawing";
import { ecologyVisuals } from "#contracts/visual/biology/ecology";
import { ecosystemVisuals } from "#contracts/visual/biology/ecosystem";
import { enzymeVisuals } from "#contracts/visual/biology/enzyme";
import { equipmentVisuals } from "#contracts/visual/biology/equipment";
import { flowerVisuals } from "#contracts/visual/biology/flower";
import { gametogenesisVisuals } from "#contracts/visual/biology/gametogenesis";
import { heartVisuals } from "#contracts/visual/biology/heart";
import { homeostasisVisuals } from "#contracts/visual/biology/homeostasis";
import { implantationVisuals } from "#contracts/visual/biology/implantation";
import { jointVisuals } from "#contracts/visual/biology/joint";
import { keyVisuals } from "#contracts/visual/biology/key";
import { kingdomVisuals } from "#contracts/visual/biology/kingdom";
import { lactaseVisuals } from "#contracts/visual/biology/lactase";
import { leafVisuals } from "#contracts/visual/biology/leaf";
import { limbVisuals } from "#contracts/visual/biology/limb";
import { lipidVisuals } from "#contracts/visual/biology/lipid";
import { locomotionVisuals } from "#contracts/visual/biology/locomotion";
import { membraneVisuals } from "#contracts/visual/biology/membrane";
import { mendelianVisuals } from "#contracts/visual/biology/mendelian";
import { menstrualVisuals } from "#contracts/visual/biology/menstrual";
import { metamorphosisVisuals } from "#contracts/visual/biology/metamorphosis";
import { mitochondrionVisuals } from "#contracts/visual/biology/mitochondrion";
import { muscleVisuals } from "#contracts/visual/biology/muscle";
import { neuronVisuals } from "#contracts/visual/biology/neuron";
import { nutritionVisuals } from "#contracts/visual/biology/nutrition";
import { paddyVisuals } from "#contracts/visual/biology/paddy";
import { physiologyVisuals } from "#contracts/visual/biology/physiology";
import { phytohormoneVisuals } from "#contracts/visual/biology/phytohormone";
import { placentaVisuals } from "#contracts/visual/biology/placenta";
import { planesVisuals } from "#contracts/visual/biology/planes";
import { plantVisuals } from "#contracts/visual/biology/plant";
import { proteinVisuals } from "#contracts/visual/biology/protein";
import { respirationVisuals } from "#contracts/visual/biology/respiration";
import { saturationVisuals } from "#contracts/visual/biology/saturation";
import { secretionVisuals } from "#contracts/visual/biology/secretion";
import { spillVisuals } from "#contracts/visual/biology/spill";
import { sugarVisuals } from "#contracts/visual/biology/sugar";
import { synapseVisuals } from "#contracts/visual/biology/synapse";
import { taxonVisuals } from "#contracts/visual/biology/taxon";
import { tissueVisuals } from "#contracts/visual/biology/tissue";
import { twinsVisuals } from "#contracts/visual/biology/twins";
import { variationVisuals } from "#contracts/visual/biology/variation";
import { vascularVisuals } from "#contracts/visual/biology/vascular";
import { vernacularVisuals } from "#contracts/visual/biology/vernacular";
import { vertebraVisuals } from "#contracts/visual/biology/vertebra";
import { vesselVisuals } from "#contracts/visual/biology/vessel";
import { wasteVisuals } from "#contracts/visual/biology/waste";
import { waterVisuals } from "#contracts/visual/biology/water";
import { yeastVisuals } from "#contracts/visual/biology/yeast";
import type { RichSlot } from "#contracts/visual/card";
import { TextSchema } from "#contracts/visual/card";
import { answerAt, figure } from "#contracts/visual/entry";

/** The ways a virus replicates that the replication lab can show. */
const REPLICATION_MODES = ["both", "lytic", "lysogenic"] as const;

/** The fields every item of a biology lab may carry. */
function itemFields<E>(rich: RichSlot<E>) {
  return {
    callouts: Schema.optionalKey(
      Schema.Array(Schema.Struct({ id: TextSchema, label: rich }))
    ),
    caption: Schema.optionalKey(rich),
    focus: Schema.optionalKey(rich),
    tab: TextSchema,
    takeaway: Schema.optionalKey(rich),
  };
}

/**
 * The props every biology lab shares: its items, one scene each, and the
 * words of its controls. The lab opens on `defaultItemIndex`, the first item
 * unless it is set.
 */
function biologyFields<Item extends Schema.Top, E>(
  item: Item,
  rich: RichSlot<E>
) {
  return {
    defaultItemIndex: Schema.optionalKey(
      Schema.Int.check(Schema.isGreaterThanOrEqualTo(0))
    ),
    description: rich,
    labels: Schema.Struct({
      chooseMode: TextSchema,
      focusLabel: Schema.optionalKey(TextSchema),
      items: Schema.NonEmptyArray(item),
      takeawayLabel: Schema.optionalKey(TextSchema),
      viewLabel: TextSchema,
    }),
    title: rich,
  };
}

/** Props of a biology lab whose items need nothing but their words. */
function biologyLab<E>(rich: RichSlot<E>) {
  return Schema.Struct(biologyFields(Schema.Struct(itemFields(rich)), rich));
}

/** The scene of one bacteria item: shapes, inner structure, or the Gram wall. */
function bacteriaScene<E>(rich: RichSlot<E>) {
  return Schema.Union([
    Schema.Struct({
      bacillusLabel: Schema.optionalKey(rich),
      coccusLabel: Schema.optionalKey(rich),
      kind: Schema.Literal("shape"),
      spiralLabel: Schema.optionalKey(rich),
    }),
    Schema.Struct({
      kind: Schema.Literal("structure"),
      nucleoidDnaLabel: Schema.optionalKey(rich),
    }),
    Schema.Struct({
      gramNegativeLabel: Schema.optionalKey(rich),
      gramPositiveLabel: Schema.optionalKey(rich),
      kind: Schema.Literal("wall"),
    }),
  ]);
}

/** Props of `BacteriaStructureLab`: shapes, anatomy, and the cell wall of bacteria. */
function bacteriaStructureLab<E>(rich: RichSlot<E>) {
  const item = Schema.Struct({
    ...itemFields(rich),
    scene: bacteriaScene(rich),
  });
  return Schema.Struct(biologyFields(item, rich));
}

/** Props of `VirusReplicationLab`: the lytic and the lysogenic cycle. */
function virusReplicationLab<E>(rich: RichSlot<E>) {
  return Schema.Struct({
    ...biologyFields(Schema.Struct(itemFields(rich)), rich),
    mode: Schema.optionalKey(Schema.Literals(REPLICATION_MODES)),
  });
}

/** Props of `GreenhouseEffectLab`: heat that greenhouse gases keep in. */
function greenhouseEffectLab<E>(rich: RichSlot<E>) {
  return Schema.Struct({
    description: rich,
    labels: Schema.Struct({
      gasControl: TextSchema,
      heatFlow: rich,
      heatFlowLabel: TextSchema,
      meaning: rich,
      meaningLabel: TextSchema,
      viewLabel: TextSchema,
    }),
    title: rich,
  });
}

/** The takeaway of an item states what the scene shows, so it is answer state. */
const takeaway = answerAt(["labels", "items", "*", "takeaway"]);

/**
 * The biology labs, each a three-dimensional scene. The meaning of the
 * greenhouse lab states what the gas level does to the heat, so it is answer
 * state.
 */
export function biologyVisuals<E>(rich: RichSlot<E>) {
  return {
    ...bacteriaVisuals(rich),
    ...binomialVisuals(rich),
    ...bloodVisuals(rich),
    ...boneVisuals(rich),
    ...cellVisuals(rich),
    ...chromosomeVisuals(rich),
    ...climateVisuals(rich),
    ...denatureVisuals(rich),
    ...drawingVisuals(rich),
    ...ecologyVisuals(rich),
    ...ecosystemVisuals(rich),
    ...enzymeVisuals(rich),
    ...equipmentVisuals(rich),
    ...flowerVisuals(rich),
    ...gametogenesisVisuals(rich),
    ...heartVisuals(rich),
    ...homeostasisVisuals(rich),
    ...implantationVisuals(rich),
    ...jointVisuals(rich),
    ...keyVisuals(rich),
    ...kingdomVisuals(rich),
    ...lactaseVisuals(rich),
    ...leafVisuals(rich),
    ...limbVisuals(rich),
    ...lipidVisuals(rich),
    ...locomotionVisuals(rich),
    ...membraneVisuals(rich),
    ...mendelianVisuals(rich),
    ...menstrualVisuals(rich),
    ...metamorphosisVisuals(rich),
    ...mitochondrionVisuals(rich),
    ...muscleVisuals(rich),
    ...neuronVisuals(rich),
    ...nutritionVisuals(rich),
    ...paddyVisuals(rich),
    ...physiologyVisuals(rich),
    ...phytohormoneVisuals(rich),
    ...placentaVisuals(rich),
    ...planesVisuals(rich),
    ...plantVisuals(rich),
    ...proteinVisuals(rich),
    ...respirationVisuals(rich),
    ...saturationVisuals(rich),
    ...secretionVisuals(rich),
    ...spillVisuals(rich),
    ...sugarVisuals(rich),
    ...synapseVisuals(rich),
    ...taxonVisuals(rich),
    ...tissueVisuals(rich),
    ...twinsVisuals(rich),
    ...variationVisuals(rich),
    ...vascularVisuals(rich),
    ...vernacularVisuals(rich),
    ...vertebraVisuals(rich),
    ...vesselVisuals(rich),
    ...wasteVisuals(rich),
    ...waterVisuals(rich),
    ...yeastVisuals(rich),
    BacteriaStructureLab: figure(bacteriaStructureLab(rich), takeaway),
    ClimateObservationLab: figure(biologyLab(rich), takeaway),
    FungiMyceliumLab: figure(biologyLab(rich), takeaway),
    GreenhouseEffectLab: figure(
      greenhouseEffectLab(rich),
      answerAt(["labels", "meaning"])
    ),
    SarsCov2VirionLab: figure(biologyLab(rich), takeaway),
    VirusMorphologyLab: figure(biologyLab(rich), takeaway),
    VirusReplicationLab: figure(virusReplicationLab(rich), takeaway),
    VirusRoleLab: figure(biologyLab(rich), takeaway),
    VirusStructureLab: figure(biologyLab(rich), takeaway),
  };
}
