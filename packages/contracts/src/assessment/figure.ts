import { Array as Arr, Record as Rec, Schema } from "effect";

import { ChartPropsSchema } from "#contracts/assessment/chart";
import { AssetIdSchema } from "#contracts/assessment/identity";
import { RichTextSchema } from "#contracts/assessment/inline";
import {
  PlainTextSchema,
  PositiveIntSchema,
} from "#contracts/assessment/scalar";
import { MathVisualKeySchema } from "#contracts/math/base";
import { MathVisualSchema, mathVisualLabelKeys } from "#contracts/math/visual";

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

/** The header every figure card shows: a title and a description. */
const CardFields = {
  description: RichTextSchema,
  title: RichTextSchema,
};

/** Checks that the rich labels match the anchors of the scene, key for key. */
function hasSceneLabels(props: {
  readonly labels: Readonly<Record<string, unknown>>;
  readonly scene: typeof MathVisualSchema.Type;
}) {
  const anchors = mathVisualLabelKeys(props.scene);
  const keys = Rec.keys(props.labels);
  return (
    anchors.length === keys.length &&
    Arr.every(anchors, (anchor) => Arr.contains(keys, anchor))
  );
}

/** Props of `MathVisual`: a plane or space scene and the rich labels it anchors. */
export const MathVisualPropsSchema = Schema.Struct({
  ...CardFields,
  labels: Schema.Record(MathVisualKeySchema, RichTextSchema),
  scene: MathVisualSchema,
}).check(
  Schema.makeFilter(hasSceneLabels, {
    message: "Expected one rich label for each label anchor of the scene.",
  })
);

/** Props of `Mermaid`: a diagram source with a plain title and description. */
export const MermaidPropsSchema = Schema.Struct({
  chart: Schema.String.check(Schema.isNonEmpty()),
  description: PlainTextSchema,
  title: PlainTextSchema,
});

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
 * The attributes of a figure node: one of the three renderer components and the
 * typed props that component takes. Every mathematical figure is a `MathVisual`
 * scene (D36); a `Chart` draws measured values and a `Mermaid` diagram draws
 * relations, which a coordinate scene does not.
 */
export const FigureAttrsSchema = Schema.Union([
  Schema.Struct({
    ...FigureFields,
    component: Schema.Literal("Chart"),
    props: ChartPropsSchema,
  }),
  Schema.Struct({
    ...FigureFields,
    component: Schema.Literal("MathVisual"),
    props: MathVisualPropsSchema,
  }),
  Schema.Struct({
    ...FigureFields,
    component: Schema.Literal("Mermaid"),
    props: MermaidPropsSchema,
  }),
]);
export type FigureAttrs = typeof FigureAttrsSchema.Type;

/** A figure block: an interactive visual with a required text alternative. */
export const FigureNodeSchema = Schema.Struct({
  attrs: FigureAttrsSchema,
  type: Schema.Literal("figure"),
});
export type FigureNode = typeof FigureNodeSchema.Type;
