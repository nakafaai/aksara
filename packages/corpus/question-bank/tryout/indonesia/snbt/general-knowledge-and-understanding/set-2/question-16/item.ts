import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "vocabulary",
    topic: "general-term",
  },
  stimulus: "gerhana",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "dipantulkan",
        },
        {
          correct: true,
          label: "dibiaskan",
        },
        {
          correct: false,
          label: "diserap",
        },
        {
          correct: false,
          label: "dipadamkan",
        },
        {
          correct: false,
          label: "dipancarkan",
        },
      ],
    },
  },
};

export default item;
