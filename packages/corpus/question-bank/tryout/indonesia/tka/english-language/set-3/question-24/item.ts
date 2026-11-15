import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "analytical-exposition",
    topic: "outline",
  },
  stimulus: "dim-lights",
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
          label: "I, III, IV, and V only",
        },
        {
          correct: false,
          label: "II, III, and V only",
        },
        {
          correct: false,
          label: "I, II, III, and V only",
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
