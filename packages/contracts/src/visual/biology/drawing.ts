import { Schema } from "effect";
import type { RichSlot } from "#contracts/visual/card";
import { byIds, cardFields, TextSchema } from "#contracts/visual/card";
import { answerAt, figure } from "#contracts/visual/entry";

/** A length the lab divides by: a finite number above zero. */
const PositiveSchema = Schema.Finite.check(Schema.isGreaterThan(0));

/**
 * How long the learner draws the cell, in millimetres: a range for the slider
 * and its starting value. The longest drawing still fits an A4 sheet.
 */
const DrawingSchema = Schema.Struct({
  max: PositiveSchema.check(Schema.isLessThanOrEqualTo(200)),
  min: PositiveSchema,
  value: PositiveSchema,
}).check(
  Schema.makeFilter(
    ({ max, min, value }) => min < max && min <= value && value <= max,
    {
      message:
        "Expected a drawing size range whose minimum is below its maximum, with the starting size between them.",
    }
  )
);

/**
 * The parts a drawing labels. Every cell drawn shows its nucleus and
 * cytoplasm; a cheek cell is bounded by its plasma membrane and has no cell
 * wall, and an onion epidermis cell is bounded by its cell wall.
 */
const PartsSchema = Schema.Struct({
  cytoplasm: TextSchema,
  membrane: Schema.optionalKey(TextSchema),
  nucleus: TextSchema,
  wall: Schema.optionalKey(TextSchema),
});

/**
 * Props of `SpecimenDrawingLab`: a microscope's field of view of a stained
 * `specimen` next to a sheet of drawing paper, where a pencil drawing of one
 * cell builds up line by line. The cell is `actual` micrometres long; the
 * learner sets how long the drawing is with a slider over `drawing`, in
 * millimetres, and the readout shows the magnification, the drawing length
 * over the actual length in the same unit. A toggle switches to a faulty
 * drawing that breaks each rule in `labels.faults`: shading, doubled sketchy
 * lines, crossed label lines with arrowheads, and no title or magnification.
 * The magnification readout shows only when `labels.magnification` names it,
 * so a question that asks for the magnification leaves it out.
 */
function specimenDrawingLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      actual: PositiveSchema.check(Schema.isLessThanOrEqualTo(1000)),
      drawing: DrawingSchema,
      labels: Schema.Struct({
        drawing: TextSchema,
        faults: byIds(["shading", "sketchy", "arrows", "title"], rich),
        magnification: Schema.optionalKey(rich),
        parts: PartsSchema,
        size: rich,
        version: TextSchema,
        versions: byIds(["correct", "faulty"], TextSchema),
        view: TextSchema,
      }),
      specimen: Schema.Literals(["cheek", "onion"]),
    }).check(
      Schema.makeFilter(
        ({ labels, specimen }) =>
          specimen === "cheek"
            ? labels.parts.membrane !== undefined &&
              labels.parts.wall === undefined
            : labels.parts.wall !== undefined,
        {
          message:
            "Expected a cheek cell labelled with its plasma membrane and no cell wall, or an onion cell labelled with its cell wall.",
        }
      )
    ),
    answerAt(["labels", "magnification"])
  );
}

/**
 * The drawing lab. The magnification is what a question asks a learner to
 * work out, so its readout is answer state.
 */
export function drawingVisuals<E>(rich: RichSlot<E>) {
  return { SpecimenDrawingLab: specimenDrawingLab(rich) };
}
