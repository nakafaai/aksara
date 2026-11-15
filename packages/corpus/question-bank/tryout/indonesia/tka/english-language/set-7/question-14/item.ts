import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "narrative",
    topic: "prediction",
  },
  stimulus: "dark-lighthouse",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "I and V only",
        },
        {
          correct: false,
          label: "I, II, III, and V only",
        },
        {
          correct: true,
          label: "I, II, and V only",
        },
        {
          correct: false,
          label: "II and V only",
        },
        {
          correct: false,
          label: "I, II, IV, and V only",
        },
      ],
    },
  },
};

export default item;
