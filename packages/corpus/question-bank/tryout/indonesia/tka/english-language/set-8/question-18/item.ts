import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "procedure",
    topic: "supporting-detail",
  },
  stimulus: "rain-gauge",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "I only",
        },
        {
          correct: true,
          label: "I and IV only",
        },
        {
          correct: false,
          label: "I, II, and IV only",
        },
        {
          correct: false,
          label: "IV only",
        },
        {
          correct: false,
          label: "I, III, and IV only",
        },
      ],
    },
  },
};

export default item;
