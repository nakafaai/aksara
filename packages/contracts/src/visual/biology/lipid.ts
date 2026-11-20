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

const MOLECULES = ["triglyceride", "phospholipid"] as const;
const CHAINS = ["saturated", "unsaturated"] as const;

/**
 * Props of `LipidLab`: a triglyceride and a phospholipid, at the scale of one
 * molecule or of many molecules in water. The learner picks one of
 * `molecules` and one of `chains` (each once, in the order the toggles list
 * them); a kinked unsaturated chain packs loosely and stays liquid, a straight
 * saturated chain packs tightly and turns solid, and in water triglycerides
 * gather into a droplet while phospholipids form a bilayer.
 */
function lipidLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      chains: Schema.NonEmptyArray(Schema.Literals(CHAINS)).check(
        Schema.isUnique()
      ),
      labels: Schema.Struct({
        bilayer: rich,
        chain: TextSchema,
        chains: byPickedIds(CHAINS, TextSchema),
        droplet: rich,
        form: rich,
        liquid: rich,
        molecule: TextSchema,
        molecules: byPickedIds(MOLECULES, TextSchema),
        parts: byIds(
          ["glycerol", "fatty", "ester", "phosphate", "head", "tail", "kink"],
          TextSchema
        ),
        scale: TextSchema,
        scales: byIds(["molecule", "water"], TextSchema),
        solid: rich,
        state: rich,
        view: TextSchema,
      }),
      molecules: Schema.NonEmptyArray(Schema.Literals(MOLECULES)).check(
        Schema.isUnique()
      ),
    }).check(
      Schema.makeFilter(
        ({ chains, labels, molecules }) =>
          namesEach(molecules, labels.molecules) &&
          namesEach(chains, labels.chains),
        {
          message:
            "Expected a name for every molecule and chain the lab shows, and no other.",
        }
      )
    )
  );
}

/** The lipid lab. Every prop names what the learner explores; none is answer state. */
export function lipidVisuals<E>(rich: RichSlot<E>) {
  return { LipidLab: lipidLab(rich) };
}
