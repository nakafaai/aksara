import { Array as Arr, Schema } from "effect";

import { AssetIdSchema } from "#contracts/assessment/identity";
import { RichTextSchema } from "#contracts/assessment/inline";
import {
  PlainTextSchema,
  PositiveIntSchema,
} from "#contracts/assessment/scalar";
import { assessmentVisuals, FIGURE_NAMES } from "#contracts/visual/catalog";

/**
 * One uploaded image. The text alternative is required, and the pixel size is
 * required so a page can reserve the space before the file loads.
 */
export const ImageSchema = Schema.Struct({
  alt: PlainTextSchema,
  asset: AssetIdSchema,
  height: PositiveIntSchema,
  width: PositiveIntSchema,
});
export type Image = typeof ImageSchema.Type;

/**
 * What every figure carries besides its props. The text alternative is
 * required, because a figure must say in words what it shows, and the caption
 * is rich text or null, as ProseMirror writes an unset attribute.
 */
const FigureFields = {
  alt: PlainTextSchema,
  caption: Schema.NullOr(RichTextSchema),
};

/**
 * The attributes of a figure node: any figure component of the Visual
 * Catalog and the props its catalog schema takes, so a figure is checked,
 * edited, and exported through the schema of its component. The catalog is
 * the one list of visuals: a lesson and an assessment draw the same ones.
 */
export const FigureAttrsSchema = Schema.Union(
  Arr.map(FIGURE_NAMES, (component) =>
    Schema.Struct({
      ...FigureFields,
      component: Schema.Literal(component),
      props: assessmentVisuals[component].props,
    })
  )
);
export type FigureAttrs = typeof FigureAttrsSchema.Type;

/** A figure block: a catalog visual with a required text alternative. */
export const FigureNodeSchema = Schema.Struct({
  attrs: FigureAttrsSchema,
  type: Schema.Literal("figure"),
});
export type FigureNode = typeof FigureNodeSchema.Type;
