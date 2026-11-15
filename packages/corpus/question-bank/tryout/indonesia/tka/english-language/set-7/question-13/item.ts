import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "narrative",
    topic: "character",
  },
  stimulus: "dark-lighthouse",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "I and III only",
        },
        {
          correct: false,
          label: "I, II, and III only",
        },
        {
          correct: false,
          label: "III and V only",
        },
        {
          correct: false,
          label: "I, III, IV, and V only",
        },
        {
          correct: true,
          label: "I, III, and V only",
        },
      ],
    },
  },
};

export default item;
