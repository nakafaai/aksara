import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Calling a cost fixed establishes that its quoted price is accurate and that the event is affordable.",
        },
        {
          correct: false,
          label:
            "The definition makes every event-level cost permanent, even when the activity range or contract changes.",
        },
        {
          correct: false,
          label:
            "The term replaces the workshop data by proving that shared costs can never be counted more than once.",
        },
        {
          correct: true,
          label:
            "The definition makes the classification depend on a stated activity range, so fixed does not mean that a cost is immune to every later change.",
        },
        {
          correct: false,
          label:
            "The definition explains why estimated prices and final supplier quotes can be treated as identical evidence.",
        },
      ],
    },
  },
  stimulus: "passage-2",
};

export default item;
