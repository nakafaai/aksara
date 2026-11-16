import { Array as Arr, Schema } from "effect";

import { AssetIdSchema } from "#contracts/assessment/identity";
import { RichTextSchema } from "#contracts/assessment/inline";
import {
  PlainTextSchema,
  PositiveIntSchema,
} from "#contracts/assessment/scalar";
import {
  type AssessmentVisuals,
  assessmentVisuals,
  FIGURE_NAMES,
  type VisualName,
} from "#contracts/visual/catalog";

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
 * The schema of one member of the figure union: a catalog component and the
 * props its schema takes. It is named through the catalog's named type, so a
 * declaration refers to it instead of writing out the props schema of every
 * catalog component.
 */
export type FigureMember = Schema.Struct<
  typeof FigureFields &
    Record<"component", Schema.Literal<VisualName>> &
    Record<"props", AssessmentVisuals[VisualName]["props"]>
>;

/** One member of the figure union, for one catalog component. */
function figureMember(component: VisualName): FigureMember {
  return Schema.Struct({
    ...FigureFields,
    component: Schema.Literal(component),
    props: assessmentVisuals[component].props,
  });
}

/**
 * The attributes of a figure node: any figure component of the Visual
 * Catalog and the props its catalog schema takes, so a figure is checked,
 * edited, and exported through the schema of its component. The catalog is
 * the one list of visuals: a lesson and an assessment draw the same ones.
 */
export const FigureAttrsSchema: Schema.Union<FigureMember[]> = Schema.Union(
  Arr.map(FIGURE_NAMES, figureMember)
);
export type FigureAttrs = typeof FigureAttrsSchema.Type;

/** A figure block: a catalog visual with a required text alternative. */
export const FigureNodeSchema = Schema.Struct({
  attrs: FigureAttrsSchema,
  type: Schema.Literal("figure"),
});
export type FigureNode = typeof FigureNodeSchema.Type;
