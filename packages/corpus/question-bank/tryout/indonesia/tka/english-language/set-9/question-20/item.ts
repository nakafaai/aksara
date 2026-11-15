import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "procedure",
    topic: "reader-response",
  },
  stimulus: "bread-rolls",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "I and II only",
        },
        {
          correct: false,
          label: "I only",
        },
        {
          correct: false,
          label: "I and III only",
        },
        {
          correct: false,
          label: "II and IV only",
        },
        {
          correct: false,
          label: "I, II, and III only",
        },
      ],
    },
  },
};

export default item;
