import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Theo kept the uncertain date visible and added a note explaining why it remained uncertain. The choice resolves the whole conflict at once and makes any later review unnecessary.",
        },
        {
          correct: false,
          label:
            "Theo kept the uncertain date visible and added a note explaining why it remained uncertain. The action transfers responsibility for the unresolved task to another character.",
        },
        {
          correct: true,
          label:
            "Marking the date as uncertain and explaining why shows Theo choosing accountable documentation over a falsely complete record.",
        },
        {
          correct: false,
          label:
            "Theo kept the uncertain date visible and added a note explaining why it remained uncertain. The decision shows an immediate, complete transformation unrelated to the earlier uncertainty.",
        },
        {
          correct: false,
          label:
            "Theo kept the uncertain date visible and added a note explaining why it remained uncertain. The setting alone produces the change, so the character's decision has no role in the development.",
        },
      ],
    },
  },
  stimulus: "passage-3",
};

export default item;
