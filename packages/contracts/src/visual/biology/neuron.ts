import { Schema } from "effect";
import type { RichSlot } from "#contracts/visual/card";
import { cardFields, TextSchema } from "#contracts/visual/card";
import { answerAt, figure } from "#contracts/visual/entry";

/** A length or a diameter the lab divides by: a finite number above zero. */
const PositiveSchema = Schema.Finite.check(Schema.isGreaterThan(0));

/** One nerve fibre the reader can send an impulse along. */
const FibreSchema = Schema.Struct({
  diameter: PositiveSchema,
  myelinated: Schema.Boolean,
  name: TextSchema,
});

/** The words the lab writes beside the parts of the neuron it draws. */
const PartsSchema = Schema.Struct({
  axon: TextSchema,
  dendrite: TextSchema,
  myelin: TextSchema,
  node: TextSchema,
  soma: TextSchema,
  terminal: TextSchema,
});

/**
 * Props of `NeuronImpulseLab`: a motor neuron whose impulse runs `length`
 * metres along one of the `fibres`, each `diameter` micrometres across, with
 * or without a myelin sheath, and the words for the parts it labels. The
 * travel time it reads out is a result a question may ask for, so its label
 * is answer state.
 */
function neuronImpulseLab<E>(rich: RichSlot<E>) {
  return Schema.Struct({
    ...cardFields(rich),
    fibres: Schema.NonEmptyArray(FibreSchema),
    labels: Schema.Struct({
      fibre: TextSchema,
      parts: PartsSchema,
      potential: rich,
      speed: rich,
      time: Schema.optionalKey(rich),
      view: TextSchema,
    }),
    length: PositiveSchema,
  });
}

/** The neuron labs. The read-out travel time is answer state. */
export function neuronVisuals<E>(rich: RichSlot<E>) {
  return {
    NeuronImpulseLab: figure(
      neuronImpulseLab(rich),
      answerAt(["labels", "time"])
    ),
  };
}
