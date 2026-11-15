import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "narrative",
    topic: "prediction",
  },
  stimulus: "radio-shop",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "I only",
        },
        {
          correct: false,
          label: "I, II, and III only",
        },
        {
          correct: false,
          label: "I, II, and IV only",
        },
        {
          correct: true,
          label: "I and II only",
        },
        {
          correct: false,
          label: "II and III only",
        },
      ],
    },
  },
};

export default item;
