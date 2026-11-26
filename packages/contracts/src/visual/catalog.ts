import { Array as Arr, Order, Record as Rec, Schema } from "effect";

import { RichTextSchema } from "#contracts/assessment/inline";
import { baseVisuals } from "#contracts/visual/base";
import { biologyVisuals } from "#contracts/visual/biology";
import type { RichSlot } from "#contracts/visual/card";
import { chemistryVisuals } from "#contracts/visual/chemistry";
import type { VisualEntry } from "#contracts/visual/entry";
import { mathematicsVisuals } from "#contracts/visual/mathematics";
import { physicsVisuals } from "#contracts/visual/physics";
import { politicsVisuals } from "#contracts/visual/politics";

/**
 * The combined visual catalog type for one rich-text encoding `E`, expressed
 * as an intersection of domain catalogs so declaration emit stays compact.
 */
export type VisualCatalogOf<E> = ReturnType<typeof baseVisuals<E>> &
  ReturnType<typeof biologyVisuals<E>> &
  ReturnType<typeof chemistryVisuals<E>> &
  ReturnType<typeof mathematicsVisuals<E>> &
  ReturnType<typeof physicsVisuals<E>> &
  ReturnType<typeof politicsVisuals<E>>;

/**
 * The Visual Catalog: every component Nakafa's renderer draws, each with the
 * schema of its props and the reader of the answer state they hold. It is the
 * one list of visuals. A lesson element and an assessment figure check the same
 * component against the same schema; only the schema of rich text differs by
 * document kind, so `rich` is the schema a document kind writes rich text in,
 * and every kind decodes it to the same inline nodes.
 * Nakafa's renderer manifest names exactly these components.
 */
export function visualCatalog<E>(rich: RichSlot<E>): VisualCatalogOf<E> {
  return {
    ...baseVisuals(rich),
    ...biologyVisuals(rich),
    ...chemistryVisuals(rich),
    ...mathematicsVisuals(rich),
    ...physicsVisuals(rich),
    ...politicsVisuals(rich),
  };
}

/** The catalog of one document kind, keyed by component name. */
export type VisualCatalog = VisualCatalogOf<unknown>;

/** The name of one catalog component. */
export type VisualName = keyof VisualCatalog;

/**
 * The type of the assessment catalog, named so a declaration refers to it
 * instead of writing out every component's schema.
 */
export type AssessmentVisuals = VisualCatalogOf<typeof RichTextSchema.Encoded>;

/**
 * The catalog of an assessment, which stores rich text as inline nodes. Its
 * names, kinds, and answer state are the same in every document kind.
 */
export const assessmentVisuals: AssessmentVisuals =
  visualCatalog(RichTextSchema);

/** The catalog read for the parts that no document kind changes. */
const plainCatalog: Readonly<Record<VisualName, VisualEntry<Schema.Top>>> =
  assessmentVisuals;

/** Every catalog name, in code-unit order. */
export const VISUAL_NAMES = Arr.sort(Rec.keys(plainCatalog), Order.String);

/** The name of one catalog component that a document draws as a figure. */
export type FigureName = {
  readonly [Name in VisualName]: AssessmentVisuals[Name]["kind"] extends "figure"
    ? Name
    : never;
}[VisualName];

/** Whether a document draws one catalog component as a figure, as its entry's kind says. */
function isFigure(name: VisualName): name is FigureName {
  return plainCatalog[name].kind === "figure";
}

/** The catalog components a document draws as a figure, in code-unit order. */
export const FIGURE_NAMES = Arr.filter(VISUAL_NAMES, isFigure);

/** The name of one catalog component. */
export const VisualNameSchema = Schema.Literals(VISUAL_NAMES);

/** The name of one catalog component that a document draws as a figure. */
export const FigureNameSchema = Schema.Literals(FIGURE_NAMES);

/**
 * Lists the answer state that the props of one component hold, each as the
 * dotted path of a present prop. A prompt or a reading may show none of it.
 */
export function answerState(component: VisualName, props: unknown) {
  return plainCatalog[component].answer(props);
}
