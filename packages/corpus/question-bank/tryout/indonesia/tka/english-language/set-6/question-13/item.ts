import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "narrative",
    topic: "character",
  },
  stimulus: "grandfather-bike",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "I, III, and IV only",
        },
        {
          correct: false,
          label: "III, IV, and V only",
        },
        {
          correct: true,
          label: "I, III, IV, and V only",
        },
        {
          correct: false,
          label: "I, II, III, IV, and V",
        },
        {
          correct: false,
          label: "I and V only",
        },
      ],
    },
  },
};

export default item;
