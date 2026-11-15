import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "descriptive",
    topic: "comparison",
  },
  stimulus: "library-loans",
  versions: {
    en: {
      kind: "choice",
      options: [
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
          label: "I and V only",
        },
        {
          correct: false,
          label: "II, III, and V only",
        },
        {
          correct: false,
          label: "I, II, and V only",
        },
      ],
    },
  },
};

export default item;
