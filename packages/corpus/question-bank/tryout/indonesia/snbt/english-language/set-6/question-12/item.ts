import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Theo kept the uncertain date visible and added a note explaining why it remained uncertain; the choice resolves the whole conflict at once and makes any later review unnecessary.",
        },
        {
          isCorrect: false,
          label:
            "Theo kept the uncertain date visible and added a note explaining why it remained uncertain; the action transfers responsibility for the unresolved task to another character.",
        },
        {
          isCorrect: true,
          label:
            "Keeping the uncertain date visible and explaining its status shows Theo choosing accountable documentation over a falsely complete record.",
        },
        {
          isCorrect: false,
          label:
            "Theo kept the uncertain date visible and added a note explaining why it remained uncertain; the decision shows an immediate, complete transformation unrelated to the earlier uncertainty.",
        },
        {
          isCorrect: false,
          label:
            "Theo kept the uncertain date visible and added a note explaining why it remained uncertain; the setting alone produces the change, so the character's decision has no role in the development.",
        },
      ],
    },
  },
  stimulusKey: "passage-3",
};

export default item;
