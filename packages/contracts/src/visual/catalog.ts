import { Array as Arr, Order, Record as Rec, Schema } from "effect";

import { RichTextSchema } from "#contracts/assessment/inline";

import { layoutVisuals } from "#contracts/visual/base/layout";
import { mathVisuals } from "#contracts/visual/base/math";
import { mediaVisuals } from "#contracts/visual/base/media";
import { biologyVisuals } from "#contracts/visual/biology";
import { bacteriaVisuals } from "#contracts/visual/biology/bacteria";
import { cellVisuals } from "#contracts/visual/biology/cell";
import { climateVisuals } from "#contracts/visual/biology/climate";
import { ecologyVisuals } from "#contracts/visual/biology/ecology";
import type { RichSlot } from "#contracts/visual/card";
import { atomVisuals } from "#contracts/visual/chemistry/atom";
import { balanceVisuals } from "#contracts/visual/chemistry/balance";
import { bondingVisuals } from "#contracts/visual/chemistry/bonding";
import { discoveryVisuals } from "#contracts/visual/chemistry/discovery";
import { electrochemistryVisuals } from "#contracts/visual/chemistry/electrochemistry";
import { electronVisuals } from "#contracts/visual/chemistry/electron";
import { lawVisuals } from "#contracts/visual/chemistry/laws";
import { particleVisuals } from "#contracts/visual/chemistry/particles";
import { periodicVisuals } from "#contracts/visual/chemistry/periodic";
import { rateVisuals } from "#contracts/visual/chemistry/rate";
import { reactionVisuals } from "#contracts/visual/chemistry/reaction";
import { titrationVisuals } from "#contracts/visual/chemistry/titration";
import type { VisualEntry } from "#contracts/visual/entry";
import { chartVisuals } from "#contracts/visual/mathematics/charts";
import { functionVisuals } from "#contracts/visual/mathematics/function";
import { geometryVisuals } from "#contracts/visual/mathematics/geometry";
import { brakingVisuals } from "#contracts/visual/physics/braking";
import { circularVisuals } from "#contracts/visual/physics/circular";
import { efficiencyVisuals } from "#contracts/visual/physics/efficiency";
import { fallingVisuals } from "#contracts/visual/physics/falling";
import { forceVisuals } from "#contracts/visual/physics/force";
import { instrumentVisuals } from "#contracts/visual/physics/instrument";
import { measurementVisuals } from "#contracts/visual/physics/measurement";
import { motionVisuals } from "#contracts/visual/physics/motion";
import { parabolicVisuals } from "#contracts/visual/physics/parabolic";
import { positionVisuals } from "#contracts/visual/physics/position";
import { powerVisuals } from "#contracts/visual/physics/power";
import { precisionVisuals } from "#contracts/visual/physics/precision";
import { productVisuals } from "#contracts/visual/physics/product";
import { recordVisuals } from "#contracts/visual/physics/record";
import { relativeVisuals } from "#contracts/visual/physics/relative";
import { solarVisuals } from "#contracts/visual/physics/solar";
import { vectorVisuals } from "#contracts/visual/physics/vector";
import { velocityVisuals } from "#contracts/visual/physics/velocity";
import { politicsVisuals } from "#contracts/visual/politics";

/**
 * The Visual Catalog: every component Nakafa's renderer draws, each with the
 * schema of its props and the reader of the answer state they hold. It is the
 * one list of visuals. A lesson element and an assessment figure check the same
 * component against the same schema; only the schema of rich text differs by
 * document kind, so `rich` is the schema a document kind writes rich text in,
 * and every kind decodes it to the same inline nodes.
 * Nakafa's renderer manifest names exactly these components.
 */
export function visualCatalog<E>(rich: RichSlot<E>) {
  return {
    ...layoutVisuals(),
    ...mathVisuals(rich),
    ...mediaVisuals(rich),
    ...biologyVisuals(rich),
    ...atomVisuals(rich),
    ...electronVisuals(rich),
    ...electrochemistryVisuals(rich),
    ...titrationVisuals(rich),
    ...rateVisuals(rich),
    ...lawVisuals(rich),
    ...particleVisuals(rich),
    ...periodicVisuals(rich),
    ...reactionVisuals(rich),
    ...chartVisuals(rich),
    ...functionVisuals(rich),
    ...geometryVisuals(rich),
    ...measurementVisuals(rich),
    ...motionVisuals(rich),
    ...parabolicVisuals(rich),
    ...velocityVisuals(rich),
    ...bacteriaVisuals(rich),
    ...cellVisuals(rich),
    ...climateVisuals(rich),
    ...ecologyVisuals(rich),
    ...balanceVisuals(rich),
    ...bondingVisuals(rich),
    ...discoveryVisuals(rich),
    ...brakingVisuals(rich),
    ...circularVisuals(rich),
    ...efficiencyVisuals(rich),
    ...fallingVisuals(rich),
    ...forceVisuals(rich),
    ...instrumentVisuals(rich),
    ...positionVisuals(rich),
    ...powerVisuals(rich),
    ...precisionVisuals(rich),
    ...productVisuals(rich),
    ...recordVisuals(rich),
    ...relativeVisuals(rich),
    ...solarVisuals(rich),
    ...vectorVisuals(rich),
    ...politicsVisuals(rich),
  };
}

/** The catalog of one document kind, keyed by component name. */
export type VisualCatalog = ReturnType<typeof visualCatalog<unknown>>;

/** The name of one catalog component. */
export type VisualName = keyof VisualCatalog;

/**
 * The type of the assessment catalog, named so a declaration refers to it
 * instead of writing out every component's schema.
 */
export type AssessmentVisuals = ReturnType<
  typeof visualCatalog<typeof RichTextSchema.Encoded>
>;

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
