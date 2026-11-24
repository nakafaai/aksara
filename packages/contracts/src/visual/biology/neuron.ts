import { Schema } from "effect";
import type { RichSlot } from "#contracts/visual/card";
import {
  byIds,
  byPickedIds,
  cardFields,
  namesEach,
  TextSchema,
} from "#contracts/visual/card";
import { answerAt, figure } from "#contracts/visual/entry";

const REFLEX_TYPES = ["withdrawal", "kneeJerk"] as const;

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

/**
 * Props of `ReflexArcLab`: a 3D spinal-cord transverse cross-section and limb
 * reflex arc comparing three-neuron withdrawal and two-neuron knee-jerk
 * pathways from receptor to effector. Pathway sequence and synapse count
 * readouts are optional answer state.
 */
function reflexArcLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      labels: Schema.Struct({
        parts: byIds(
          [
            "receptor",
            "sensoryNeuron",
            "dorsalRoot",
            "relayNeuron",
            "greyMatter",
            "whiteMatter",
            "ventralRoot",
            "motorNeuron",
            "effector",
          ],
          TextSchema
        ),
        pathway: Schema.optionalKey(rich),
        reflex: TextSchema,
        reflexes: byPickedIds(
          REFLEX_TYPES,
          Schema.Struct({
            name: TextSchema,
            response: rich,
            stimulus: rich,
          })
        ),
        step: TextSchema,
        synapses: Schema.optionalKey(rich),
        view: TextSchema,
      }),
      reflexes: Schema.NonEmptyArray(Schema.Literals(REFLEX_TYPES)).check(
        Schema.isUnique()
      ),
    }).check(
      Schema.makeFilter(
        ({ labels, reflexes }) => namesEach(reflexes, labels.reflexes),
        {
          message:
            "Expected a name, stimulus, and response for every reflex arc shown, and no other.",
        }
      )
    ),
    answerAt(["labels", "pathway"], ["labels", "synapses"])
  );
}

/** The neuron and spinal reflex labs. */
export function neuronVisuals<E>(rich: RichSlot<E>) {
  return {
    NeuronImpulseLab: figure(
      neuronImpulseLab(rich),
      answerAt(["labels", "time"])
    ),
    ReflexArcLab: reflexArcLab(rich),
  };
}
