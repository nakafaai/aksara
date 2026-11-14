import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "argument-evaluation",
  },
  stimulus: "wind-curtailment",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "Gullrock compared with Saltmarsh",
        },
        {
          correct: false,
          label: "Brackenmoor compared with Saltmarsh",
        },
        {
          correct: true,
          label: "Fellside compared with Saltmarsh",
        },
        {
          correct: false,
          label: "Fellside compared with Brackenmoor",
        },
        {
          correct: false,
          label: "Gullrock compared with Brackenmoor",
        },
      ],
    },
  },
};

export default item;
