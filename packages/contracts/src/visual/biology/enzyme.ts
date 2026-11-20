import { Schema } from "effect";
import { pickedFrom } from "#contracts/visual/biology/control";
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
 * Three disaccharidases and their substrates. Which substrate fits which
 * active site, and the monosaccharides each makes, are facts the renderer
 * knows: lactase splits lactose into glucose and galactose, sucrase splits
 * sucrose into glucose and fructose, maltase splits maltose into two glucose.
 */
const ENZYMES = ["lactase", "sucrase", "maltase"] as const;
const SUBSTRATES = ["lactose", "sucrose", "maltose"] as const;

/** The two models of how a substrate meets an active site. */
const MODELS = ["lockKey", "inducedFit"] as const;

/**
 * Props of `ActiveSiteLab`: one enzyme molecule with its active site among
 * sugar molecules. The learner picks one of `enzymes`, one of `substrates`
 * and one of `models` (each list holds its options once, in toggle order);
 * the scene shows whether the substrate fits, forms the enzyme-substrate
 * complex, splits it with water into its products and frees the unchanged
 * enzyme, counting the substrates it has broken down.
 */
function activeSiteLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      enzymes: pickedFrom(ENZYMES),
      labels: Schema.Struct({
        enzyme: TextSchema,
        enzymes: byPickedIds(ENZYMES, TextSchema),
        fits: rich,
        model: TextSchema,
        models: byPickedIds(MODELS, TextSchema),
        no: rich,
        parts: byIds(["site", "complex", "water"], TextSchema),
        products: rich,
        reused: rich,
        substrate: TextSchema,
        substrates: byPickedIds(SUBSTRATES, TextSchema),
        sugars: byIds(["glucose", "galactose", "fructose"], TextSchema),
        view: TextSchema,
        yes: rich,
      }),
      models: pickedFrom(MODELS),
      substrates: pickedFrom(SUBSTRATES),
    }).check(
      Schema.makeFilter(
        ({ enzymes, labels, models, substrates }) =>
          namesEach(enzymes, labels.enzymes) &&
          namesEach(substrates, labels.substrates) &&
          namesEach(models, labels.models),
        {
          message:
            "Expected a name for every enzyme, substrate and model the lab shows, and for no other.",
        }
      )
    )
  );
}

/** The active site lab. Whether a substrate fits is what the learner tries out, so none is answer state. */
export function enzymeVisuals<E>(rich: RichSlot<E>) {
  return { ActiveSiteLab: activeSiteLab(rich) };
}
