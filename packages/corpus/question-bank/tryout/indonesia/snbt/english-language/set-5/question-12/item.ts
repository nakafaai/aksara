import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Mina asked each member to state one concern before choosing the next step. The choice resolves the whole conflict at once and makes any later review unnecessary.",
        },
        {
          isCorrect: false,
          label:
            "Mina asked each member to state one concern before choosing the next step. The action transfers responsibility for the unresolved task to another character.",
        },
        {
          isCorrect: false,
          label:
            "Mina asked each member to state one concern before choosing the next step. The decision shows an immediate, complete transformation unrelated to the earlier uncertainty.",
        },
        {
          isCorrect: false,
          label:
            "Mina asked each member to state one concern before choosing the next step. The setting alone produces the change, so the character's decision has no role in the development.",
        },
        {
          isCorrect: true,
          label:
            "Asking for one concern from each member lets Mina convert disagreement into information before choosing a next step, rather than forcing instant consensus.",
        },
      ],
    },
  },
  stimulusKey: "passage-3",
};

export default item;
