import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "descriptive",
    topic: "comparison",
  },
  stimulus: "data-plan",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "I and II only",
        },
        {
          correct: false,
          label: "I, III, and V only",
        },
        {
          correct: true,
          label: "I and V only",
        },
        {
          correct: false,
          label: "I, IV, and V only",
        },
        {
          correct: false,
          label: "II, III, and V only",
        },
      ],
    },
  },
};

export default item;
