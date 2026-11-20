import { Schema } from "effect";
import type { RichSlot } from "#contracts/visual/card";
import {
  byIds,
  byPickedIds,
  cardFields,
  namesEach,
  TextSchema,
} from "#contracts/visual/card";
import { figure } from "#contracts/visual/entry";

/**
 * Everything the school laboratory holds, in three groups the renderer knows:
 * apparatus on the bench, personal protective equipment on its hook, and
 * safety equipment on the wall.
 */
const EQUIPMENT = [
  "beaker",
  "conicalFlask",
  "measuringCylinder",
  "testTube",
  "boilingTube",
  "dropper",
  "petriDish",
  "inoculatingLoop",
  "bunsenBurner",
  "tripod",
  "forceps",
  "scalpel",
  "mountedNeedle",
  "microscope",
  "slide",
  "labCoat",
  "goggles",
  "gloves",
  "mask",
  "extinguisher",
  "fireBlanket",
  "eyewash",
  "firstAid",
  "fumeChamber",
] as const;

const EquipmentSchema = Schema.Literals(EQUIPMENT);

/**
 * Props of `LabEquipmentLab`: one corner of a school biology laboratory, with
 * apparatus on the bench, protective equipment on a hook and safety equipment
 * on the wall. `items` are the ones a learner can pick, each once, in the
 * order the item toggle lists them. Picking one turns the camera to it and the
 * readouts give its name, what it is for and how to handle it safely, words
 * from `labels.items`, one entry for each item and no other.
 */
function labEquipmentLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      items: Schema.NonEmptyArray(EquipmentSchema).check(Schema.isUnique()),
      labels: Schema.Struct({
        care: TextSchema,
        categories: byIds(["apparatus", "protective", "safety"], TextSchema),
        category: TextSchema,
        item: TextSchema,
        items: byPickedIds(
          EQUIPMENT,
          Schema.Struct({ care: rich, name: TextSchema, use: rich })
        ),
        use: TextSchema,
        view: TextSchema,
      }),
    }).check(
      Schema.makeFilter(({ items, labels }) => namesEach(items, labels.items), {
        message: "Expected words for every item the lab shows, and no other.",
      })
    )
  );
}

/** The visuals of this lab. Every prop names or picks equipment; none is answer state. */
export function equipmentVisuals<E>(rich: RichSlot<E>) {
  return { LabEquipmentLab: labEquipmentLab(rich) };
}
