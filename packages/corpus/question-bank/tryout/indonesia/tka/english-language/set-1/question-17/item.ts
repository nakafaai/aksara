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
          label:
            "Inspect visible pipes, replace the meter, wait, and compare the new reading.",
        },
        {
          isCorrect: false,
          label:
            "Take one photograph and immediately declare the leak's location.",
        },
        {
          isCorrect: true,
          label:
            "Prepare the period, record, wait, compare, repeat if needed, and report safely.",
        },
        {
          isCorrect: false,
          label: "Run the irrigation system, wait, and ignore the meter.",
        },
        {
          isCorrect: false,
          label: "Disconnect essential equipment before checking the display.",
        },
      ],
    },
  },
  stimulusKey: "leak-test",
};

export default item;
