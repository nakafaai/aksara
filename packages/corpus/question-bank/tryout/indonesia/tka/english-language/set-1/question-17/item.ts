import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "procedure",
    topic: "outline",
  },
  stimulus: "leak-test",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Inspect visible pipes, replace the meter, wait, and compare the new reading.",
        },
        {
          correct: false,
          label:
            "Take one photograph and immediately declare the leak's location.",
        },
        {
          correct: true,
          label:
            "Prepare the period, record, wait, compare, repeat if needed, and report safely.",
        },
        {
          correct: false,
          label: "Run the irrigation system, wait, and ignore the meter.",
        },
        {
          correct: false,
          label: "Disconnect essential equipment before checking the display.",
        },
      ],
    },
  },
};

export default item;
