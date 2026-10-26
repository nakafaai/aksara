import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "procedure",
    topic: "classification",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "Choose a quiet period.",
        },
        {
          correct: true,
          label: "Check whether essential equipment uses water.",
        },
        {
          correct: false,
          label:
            "Start the irrigation once before the reading to verify that its timer works.",
        },
        {
          correct: false,
          label: "Break a wall to find the pipe.",
        },
      ],
    },
  },
  stimulus: "leak-test",
};

export default item;
