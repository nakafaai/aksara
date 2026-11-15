import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "descriptive",
    topic: "text-fit",
  },
  stimulus: "bike-share",
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
          label: "I and III only",
        },
        {
          correct: false,
          label: "I, III, and IV only",
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
