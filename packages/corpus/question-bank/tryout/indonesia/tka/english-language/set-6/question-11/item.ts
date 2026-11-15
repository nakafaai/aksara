import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "narrative",
    topic: "synthesis",
  },
  stimulus: "grandfather-bike",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "I and IV only",
        },
        {
          correct: true,
          label: "I, II, and IV only",
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
          label: "I, II, III, and IV",
        },
      ],
    },
  },
};

export default item;
