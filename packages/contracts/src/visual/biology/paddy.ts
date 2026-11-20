import { Schema } from "effect";
import type { RichSlot } from "#contracts/visual/card";
import { byIds, cardFields, TextSchema } from "#contracts/visual/card";
import { figure } from "#contracts/visual/entry";

/** ATP from one glucose in aerobic respiration: a whole number above zero. */
const AtpSchema = Schema.Int.check(Schema.isGreaterThan(0));

/**
 * The crops the lab grows: paddy rice, a wetland crop with air channels
 * (aerenchyma) in its roots, and a dryland crop with almost none, drawn as
 * maize.
 */
const PlantSchema = Schema.Literals(["rice", "dryland"]);

/**
 * Props of `PaddyRootLab`: a paddy field at real size in endless terrain,
 * flooded or drained, with rice or a dryland crop growing in it, the soil and
 * roots seen in an X-ray view through the mud, an oxygen strip down the soil,
 * and a lens on one root's cross-section. `atp` is the ATP one glucose yields in aerobic respiration as the
 * lesson counts it; fermentation yields 2. `plants` lists the crops in tab
 * order. The lab reads out the soil's oxygen at the root tips, the share of
 * the roots' energy from fermentation, the ethanol made per glucose, and
 * whether the roots stay healthy (`healthy`) or their tips die (`damaged`).
 */
function paddyRootLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      atp: AtpSchema,
      labels: Schema.Struct({
        damaged: rich,
        ethanol: rich,
        fermentation: rich,
        healthy: rich,
        oxygen: rich,
        parts: Schema.Struct({
          aerenchyma: TextSchema,
          mud: TextSchema,
          root: TextSchema,
          water: TextSchema,
        }),
        plant: TextSchema,
        plants: byIds(["rice", "dryland"], TextSchema),
        roots: rich,
        view: TextSchema,
        water: TextSchema,
        waters: byIds(["drained", "flooded"], TextSchema),
      }),
      plants: Schema.NonEmptyArray(PlantSchema),
    })
  );
}

/**
 * The visuals of the paddy lab. Its props set up the field and name its words;
 * none states the conclusion the lab leads to, so none holds answer state.
 */
export function paddyVisuals<E>(rich: RichSlot<E>) {
  return { PaddyRootLab: paddyRootLab(rich) };
}
