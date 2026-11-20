import { Schema } from "effect";
import type { RichSlot } from "#contracts/visual/card";
import { byIds, cardFields, TextSchema } from "#contracts/visual/card";
import { figure } from "#contracts/visual/entry";

/** The drugs the synapse lab can add to the cleft. */
const DRUGS = ["nicotine", "curare", "organophosphate", "botulinum"] as const;

/**
 * Props of `SynapseLab`: a cholinergic synapse between two neurons. Impulses
 * arrive at the presynaptic bouton at a rate the reader sets, and each of the
 * `drugs` can be added to see how it changes the transmission. `labels.parts`
 * names the parts the scene points at; `labels.drugs` names the drugs, and is
 * needed whenever `drugs` is set.
 */
function synapseLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      drugs: Schema.optionalKey(Schema.NonEmptyArray(Schema.Literals(DRUGS))),
      labels: Schema.Struct({
        drug: TextSchema,
        drugs: Schema.optionalKey(byIds(DRUGS, TextSchema)),
        fires: rich,
        none: TextSchema,
        parts: Schema.Struct({
          channel: rich,
          cleft: rich,
          enzyme: rich,
          mitochondrion: rich,
          receptor: rich,
          transporter: rich,
          vesicle: rich,
        }),
        potential: rich,
        rate: TextSchema,
        rests: rich,
        response: rich,
        transmitter: rich,
        view: TextSchema,
      }),
    }).check(
      Schema.makeFilter(
        ({ drugs, labels }) =>
          drugs === undefined || labels.drugs !== undefined,
        { message: "Expected names for the drugs whenever drugs are offered." }
      )
    )
  );
}

/**
 * The synapse labs. Each prop sets up the synapse or names its words; none
 * states the conclusion the lab leads to.
 */
export function synapseVisuals<E>(rich: RichSlot<E>) {
  return { SynapseLab: synapseLab(rich) };
}
