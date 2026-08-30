import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "procedure",
    topic: "outline",
  },
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Open every pipe, replace the meter, and remove the wall.",
        },
        {
          isCorrect: false,
          label:
            "Take one photograph and immediately declare the leak's location.",
        },
        {
          isCorrect: false,
          label: "Run the irrigation system, wait, and ignore the meter.",
        },
        {
          isCorrect: false,
          label: "Disconnect essential equipment before checking the display.",
        },
        {
          isCorrect: true,
          label:
            "Prepare the period, record, wait, compare, repeat if needed, and report safely.",
        },
      ],
    },
  },
  stimulusKey: "leak-test",
};

export default item;
