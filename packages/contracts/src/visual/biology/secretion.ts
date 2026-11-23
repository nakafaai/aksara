import { Array as Arr, Schema } from "effect";
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

const ROUTES = ["intracellular", "extracellular"] as const;

type Route = (typeof ROUTES)[number];

/**
 * The stages of each route, in the order the scene plays them. An
 * intracellular enzyme is built on a free ribosome and stays in the
 * cytoplasm; an extracellular enzyme is built on the rough endoplasmic
 * reticulum, folds inside it, travels in a transport vesicle to the Golgi
 * apparatus and leaves in a secretory vesicle by exocytosis.
 */
const ROUTE_STEPS: Readonly<Record<Route, readonly string[]>> = {
  extracellular: [
    "nucleus",
    "boundRibosome",
    "reticulum",
    "transport",
    "golgi",
    "secretory",
    "exocytosis",
  ],
  intracellular: ["nucleus", "freeRibosome", "cytoplasm"],
};

/** The words of every stage, each given exactly when a shown route plays it. */
function stepWords<E>(rich: RichSlot<E>) {
  return Schema.Struct({
    boundRibosome: Schema.optionalKey(rich),
    cytoplasm: Schema.optionalKey(rich),
    exocytosis: Schema.optionalKey(rich),
    freeRibosome: Schema.optionalKey(rich),
    golgi: Schema.optionalKey(rich),
    nucleus: Schema.optionalKey(rich),
    reticulum: Schema.optionalKey(rich),
    secretory: Schema.optionalKey(rich),
    transport: Schema.optionalKey(rich),
  });
}

/**
 * Props of `EnzymeSecretionLab`: one acinar cell of the pancreas opened up to
 * show its organelles. The learner picks one of `routes` (each once, in
 * toggle order) and plays the enzyme's path one stage at a time; the
 * readouts give the stage, an example enzyme and where it works.
 */
function enzymeSecretionLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      labels: Schema.Struct({
        example: rich,
        examples: byPickedIds(ROUTES, rich),
        parts: byIds(
          [
            "nucleus",
            "ribosome",
            "reticulum",
            "golgi",
            "vesicle",
            "membrane",
            "duct",
          ],
          TextSchema
        ),
        place: rich,
        places: byPickedIds(ROUTES, rich),
        route: TextSchema,
        routes: byPickedIds(ROUTES, TextSchema),
        step: rich,
        steps: stepWords(rich),
        view: TextSchema,
      }),
      routes: pickedFrom(ROUTES),
    }).check(
      Schema.makeFilter(
        ({ labels, routes }) =>
          namesEach(routes, labels.routes) &&
          namesEach(routes, labels.examples) &&
          namesEach(routes, labels.places) &&
          namesEach(
            Arr.flatMap(routes, (route) => ROUTE_STEPS[route]),
            labels.steps
          ),
        {
          message:
            "Expected a name, an example and a workplace for every route the lab shows, and words for exactly the stages those routes play.",
        }
      )
    )
  );
}

/** The secretion lab. Every stage is taught as it plays, so none is answer state. */
export function secretionVisuals<E>(rich: RichSlot<E>) {
  return { EnzymeSecretionLab: enzymeSecretionLab(rich) };
}
