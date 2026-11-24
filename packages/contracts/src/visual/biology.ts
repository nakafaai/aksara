import { Schema } from "effect";
import { flowerVisuals } from "#contracts/visual/biology/flower";
import { mendelianVisuals } from "#contracts/visual/biology/mendelian";
import { nutritionVisuals } from "#contracts/visual/biology/nutrition";
import { phytohormoneVisuals } from "#contracts/visual/biology/phytohormone";
import { variationVisuals } from "#contracts/visual/biology/variation";
import { vascularVisuals } from "#contracts/visual/biology/vascular";
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
    ...flowerVisuals(rich),
    ...mendelianVisuals(rich),
    ...nutritionVisuals(rich),
    ...phytohormoneVisuals(rich),
    ...variationVisuals(rich),
    ...vascularVisuals(rich),
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
