import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "narrative",
    topic: "character",
  },
  stimulus: "reservoir",
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
          label: "I and II only",
        },
        {
          correct: false,
          label: "I, II, and III only",
        },
        {
          correct: false,
          label: "II and IV only",
        },
        {
          correct: false,
          label: "I, II, and IV only",
        },
      ],
    },
  },
};

export default item;
