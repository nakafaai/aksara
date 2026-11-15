import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "narrative",
    topic: "prediction",
  },
  stimulus: "kite-cliff",
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
          label: "I and III only",
        },
        {
          correct: false,
          label: "I, II, III, and IV",
        },
        {
          correct: false,
          label: "II and III only",
        },
        {
          correct: true,
          label: "I, II, and III only",
        },
      ],
    },
  },
};

export default item;
