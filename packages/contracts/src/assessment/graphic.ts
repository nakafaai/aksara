import { Schema } from "effect";

import { ImageSchema } from "#contracts/assessment/figure";
import { hasUniqueIds, LocalIdSchema } from "#contracts/assessment/identity";
import {
  hasSelectionBounds,
  InteractionFields,
} from "#contracts/assessment/part";
import {
  NonNegativeIntSchema,
  PlainTextSchema,
  PositiveIntSchema,
} from "#contracts/assessment/scalar";
import { PositiveMeasureSchema } from "#contracts/math/base";
import { PlaneMathFrameSchema } from "#contracts/math/plane";

/** A pixel position or length in the image's own space. */
const CoordinateSchema = Schema.Finite.check(Schema.isGreaterThanOrEqualTo(0));

/**
 * What every area has: an identifier, and a text label so that no area is told
 * apart by its looks alone.
 */
const AreaFields = {
  id: LocalIdSchema,
  label: PlainTextSchema,
};

/** A rectangle by its left, top, right, and bottom edges. */
const RectAreaSchema = Schema.Struct({
  ...AreaFields,
  coords: Schema.Tuple([
    CoordinateSchema,
    CoordinateSchema,
    CoordinateSchema,
    CoordinateSchema,
  ]),
  shape: Schema.Literal("rect"),
}).check(
  Schema.makeFilter(
    ({ coords: [left, top, right, bottom] }) => left < right && top < bottom,
    { message: "Expected a rectangle with its left and top edges first." }
  )
);

/** A circle by its center and radius. */
const CircleAreaSchema = Schema.Struct({
  ...AreaFields,
  coords: Schema.Tuple([CoordinateSchema, CoordinateSchema, CoordinateSchema]),
  shape: Schema.Literal("circle"),
}).check(
  Schema.makeFilter(({ coords: [, , radius] }) => radius > 0, {
    message: "Expected a circle with a radius above zero.",
  })
);

/** An ellipse by its center and its horizontal and vertical radius. */
const EllipseAreaSchema = Schema.Struct({
  ...AreaFields,
  coords: Schema.Tuple([
    CoordinateSchema,
    CoordinateSchema,
    CoordinateSchema,
    CoordinateSchema,
  ]),
  shape: Schema.Literal("ellipse"),
}).check(
  Schema.makeFilter(
    ({ coords: [, , horizontal, vertical] }) => horizontal > 0 && vertical > 0,
    { message: "Expected an ellipse with radii above zero." }
  )
);

/** A polygon by at least three corners, each an x and a y. */
const PolyAreaSchema = Schema.Struct({
  ...AreaFields,
  coords: Schema.TupleWithRest(
    Schema.Tuple([
      CoordinateSchema,
      CoordinateSchema,
      CoordinateSchema,
      CoordinateSchema,
      CoordinateSchema,
      CoordinateSchema,
    ]),
    [CoordinateSchema]
  ),
  shape: Schema.Literal("poly"),
}).check(
  Schema.makeFilter(({ coords }) => coords.length % 2 === 0, {
    message: "Expected a polygon whose corners each have an x and a y.",
  })
);

/** The whole image, which needs no coordinates. */
const WholeAreaSchema = Schema.Struct({
  ...AreaFields,
  shape: Schema.Literal("default"),
});

/** One selectable area, in one of the five shapes that QTI allows for a hotspot. */
export const HotspotAreaSchema = Schema.Union([
  RectAreaSchema,
  CircleAreaSchema,
  EllipseAreaSchema,
  PolyAreaSchema,
  WholeAreaSchema,
]);

/**
 * Select areas of an image. Maps to `qti-hotspot-interaction` with one
 * `qti-hotspot-choice` (`shape`, `coords`) for each area.
 */
export const HotspotInteractionSchema = Schema.Struct({
  ...InteractionFields,
  areas: Schema.Array(HotspotAreaSchema).check(Schema.isMinLength(2)),
  image: ImageSchema,
  kind: Schema.Literal("hotspot"),
  maxChoices: PositiveIntSchema,
  minChoices: NonNegativeIntSchema,
}).check(
  Schema.makeFilter(({ areas }) => hasUniqueIds(areas), {
    message: "Expected each area to have its own identifier.",
  }),
  Schema.makeFilter(
    (hotspot) => hasSelectionBounds(hotspot, hotspot.areas.length),
    {
      message:
        "Expected the fewest areas to be at most the most areas, and the most areas to be at most the number of areas.",
    }
  )
);

/**
 * Place points, or draw lines through two points, on a plane of Cartesian
 * axes. `count` is how many points or lines the learner places, and `snap`,
 * when present, is the step that the plane rounds a position to. Maps to
 * `qti-select-point-interaction` over the rendered plane for points, and to
 * `qti-portable-custom-interaction` for lines.
 */
export const GraphPointInteractionSchema = Schema.Struct({
  ...InteractionFields,
  count: PositiveIntSchema,
  frame: PlaneMathFrameSchema,
  kind: Schema.Literal("graphPoint"),
  placing: Schema.Literals(["points", "lines"]),
  snap: Schema.optionalKey(PositiveMeasureSchema),
});
