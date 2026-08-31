import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Calling a cost fixed establishes that its quoted price is accurate and that the event is affordable.",
        },
        {
          isCorrect: false,
          label:
            "The definition makes every event-level cost permanent, even when the activity range or contract changes.",
        },
        {
          isCorrect: false,
          label:
            "The term replaces the workshop data by proving that shared costs can never be counted more than once.",
        },
        {
          isCorrect: true,
          label:
            "The definition makes the classification depend on a stated activity range, so fixed does not mean that a cost is immune to every later change.",
        },
        {
          isCorrect: false,
          label:
            "The definition explains why estimated prices and final supplier quotes can be treated as identical evidence.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
