import { Schema } from "effect";
import type { RichSlot } from "#contracts/visual/card";
import { byIds, cardFields, TextSchema } from "#contracts/visual/card";
import { figure } from "#contracts/visual/entry";

/**
 * The aerobic ATP one glucose makes, which textbooks give differently: about
 * 30 to 32 in OpenStax Biology 2e, 36 or 38 in many school syllabi. A whole
 * number above the 2 of glycolysis alone and at most the theoretical 38.
 */
const AtpSchema = Schema.Int.check(
  Schema.isGreaterThan(2),
  Schema.isLessThanOrEqualTo(38)
);

/** The cells the lab can show without oxygen: a muscle cell makes lactic acid, a yeast cell ethanol and carbon dioxide. */
const CellSchema = Schema.Literals(["muscle", "yeast"]);

/**
 * Props of `MitochondrionLab`: one mitochondrion cut open lengthwise in the
 * cytoplasm of a cell, where each stage of cellular respiration happens and
 * what oxygen changes. `atp` is the aerobic ATP per glucose the lesson
 * teaches; `cells` the cells a learner can choose between, each at most once
 * and the first shown first. The words name the oxygen and cell toggles, the
 * readouts (ATP and carbon dioxide per glucose, the end products of each
 * condition and, when given, the energy released) and the 3D labels of the
 * parts. No prop states the conclusion, so none holds answer state.
 */
function mitochondrionLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      atp: AtpSchema,
      cells: Schema.NonEmptyArray(CellSchema).check(Schema.isUnique()),
      labels: Schema.Struct({
        atp: rich,
        carbonDioxide: rich,
        cell: TextSchema,
        cells: byIds(["muscle", "yeast"], TextSchema),
        energy: Schema.optionalKey(rich),
        oxygen: TextSchema,
        oxygens: byIds(["present", "absent"], TextSchema),
        parts: byIds(
          ["cytoplasm", "outer", "inner", "cristae", "matrix"],
          TextSchema
        ),
        product: rich,
        products: byIds(["aerobic", "lactic", "alcoholic"], rich),
        view: TextSchema,
      }),
    })
  );
}

/** The visuals of this lab. */
export function mitochondrionVisuals<E>(rich: RichSlot<E>) {
  return { MitochondrionLab: mitochondrionLab(rich) };
}
