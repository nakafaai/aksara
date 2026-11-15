import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "analytical-exposition",
    topic: "main-idea-purpose",
  },
  stimulus: "dim-lights",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "I, II, and III only",
        },
        {
          correct: false,
          label: "I and II only",
        },
        {
          correct: false,
          label: "I, II, III, and V only",
        },
        {
          correct: false,
          label: "I, III, and IV only",
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
