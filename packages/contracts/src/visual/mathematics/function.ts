import { Schema } from "effect";

import { cardFields, type RichSlot, TextSchema } from "#contracts/visual/card";
import { answerAt, figure, markup } from "#contracts/visual/entry";

/** The ways the bacterial growth animation counts generations. */
const GROWTH_FORMULAS = ["geometric", "exponential"] as const;

/** One element of a set in a relation diagram: an identifier and its label. */
function relationElement<E>(rich: RichSlot<E>) {
  return Schema.Struct({ id: TextSchema, label: rich });
}

/**
 * Props of `FunctionAndNonFunctionDiagram`: the card around one or more
 * relation visualizers, which are its children.
 */
function functionDiagram<E>(rich: RichSlot<E>) {
  return markup(Schema.Struct({ ...cardFields(rich) }));
}

/** Props of `FunctionAndNonFunctionRelationVisualizer`: arrows from a domain to a codomain. */
function relationVisualizer<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      accessibilityLabel: TextSchema,
      codomain: Schema.Array(relationElement(rich)),
      codomainLabel: rich,
      domain: Schema.Array(relationElement(rich)),
      domainLabel: rich,
      mappings: Schema.Array(
        Schema.Struct({ from: TextSchema, to: TextSchema })
      ),
    })
  );
}

/** Props of `FunctionMachine`: an input that a machine turns into an output. */
function functionMachine<E>(rich: RichSlot<E>) {
  return figure(Schema.Struct({ ...cardFields(rich), inputLabel: TextSchema }));
}

/** Props of `InverseFunctionIllustration`: a machine run forward and back. */
function inverseIllustration<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      content: Schema.Struct({ input: rich, output: rich }),
      machineLabel: rich,
    }),
    answerAt(["content", "output"])
  );
}

/** Props of `FunctionExplorationVirusChart`: linear, exponential, and logarithmic spread. */
function virusChart<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      labels: Schema.Struct({
        caption: rich,
        description: rich,
        exponential: rich,
        linear: rich,
        logarithmic: rich,
        phase: TextSchema,
        title: rich,
        yLabel: TextSchema,
      }),
    })
  );
}

/** Props of `BacterialGrowth`: cells that split once in each time interval. */
function bacterialGrowth<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      formulaType: Schema.optionalKey(Schema.Literals(GROWTH_FORMULAS)),
      initialCount: Schema.optionalKey(Schema.Finite),
      labels: Schema.Struct({
        bacterial: Schema.optionalKey(TextSchema),
        description: rich,
        title: rich,
      }),
      maxGenerations: Schema.optionalKey(
        Schema.Int.check(Schema.isGreaterThan(0))
      ),
      ratio: Schema.optionalKey(Schema.Finite),
      timeInterval: Schema.optionalKey(Schema.Finite),
      timeUnit: Schema.optionalKey(TextSchema),
    })
  );
}

/** Props of `SequenceConceptTableChairsAnimation`: tables in a row and the chairs around them. */
function tableChairs<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      labels: Schema.Struct({
        chair: TextSchema,
        pause: TextSchema,
        play: TextSchema,
        reset: TextSchema,
        setSpeed: TextSchema,
        setTableCount: TextSchema,
        table: TextSchema,
        title: rich,
      }),
    })
  );
}

/**
 * The visuals of functions, relations, and sequences. The output of the
 * inverse machine is the value the reader would compute, so it is answer
 * state. A diagram is a card around relation visualizers, its children, so
 * it is markup, and an assessment places the visualizer itself as its figure.
 */
export function functionVisuals<E>(rich: RichSlot<E>) {
  return {
    BacterialGrowth: bacterialGrowth(rich),
    FunctionAndNonFunctionDiagram: functionDiagram(rich),
    FunctionAndNonFunctionRelationVisualizer: relationVisualizer(rich),
    FunctionExplorationVirusChart: virusChart(rich),
    FunctionMachine: functionMachine(rich),
    InverseFunctionIllustration: inverseIllustration(rich),
    SequenceConceptTableChairsAnimation: tableChairs(rich),
  };
}
