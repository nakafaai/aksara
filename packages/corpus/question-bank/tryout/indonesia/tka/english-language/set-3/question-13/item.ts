import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "narrative",
    topic: "character",
  },
  stimulus: "radio-shop",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "I and II only",
        },
        {
          correct: true,
          label: "I, II, and V only",
        },
        {
          correct: false,
          label: "I, II, IV, and V only",
        },
        {
          correct: false,
          label: "II, III, and V only",
        },
        {
          correct: false,
          label: "I, II, III, and V only",
        },
      ],
    },
  },
};

export default item;
