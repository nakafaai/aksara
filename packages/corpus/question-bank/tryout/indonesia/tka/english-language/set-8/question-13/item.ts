import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "narrative",
    topic: "character",
  },
  stimulus: "dry-well",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "I, III, and V only",
        },
        {
          correct: false,
          label: "I and III only",
        },
        {
          correct: false,
          label: "I, II, III, and V only",
        },
        {
          correct: false,
          label: "III and V only",
        },
        {
          correct: false,
          label: "I, III, IV, and V only",
        },
      ],
    },
  },
};

export default item;
