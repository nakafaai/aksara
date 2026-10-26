import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Mina asked each member to state one concern before choosing the next step. The choice resolves the whole conflict at once and makes any later review unnecessary.",
        },
        {
          correct: false,
          label:
            "Mina asked each member to state one concern before choosing the next step. The action transfers responsibility for the unresolved task to another character.",
        },
        {
          correct: false,
          label:
            "Mina asked each member to state one concern before choosing the next step. The decision shows an immediate, complete transformation unrelated to the earlier uncertainty.",
        },
        {
          correct: false,
          label:
            "Mina asked each member to state one concern before choosing the next step. The setting alone produces the change, so the character's decision has no role in the development.",
        },
        {
          correct: true,
          label:
            "Asking for one concern from each member lets Mina convert disagreement into information before choosing a next step, rather than forcing instant consensus.",
        },
      ],
    },
  },
  stimulus: "passage-3",
};

export default item;
